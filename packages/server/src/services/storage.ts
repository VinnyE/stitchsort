import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const uploadsRoot = resolve(process.cwd(), process.env.UPLOAD_DIR ?? "uploads");

const hasR2Config =
  Boolean(process.env.R2_ENDPOINT) &&
  Boolean(process.env.R2_ACCESS_KEY_ID) &&
  Boolean(process.env.R2_SECRET_ACCESS_KEY) &&
  Boolean(process.env.R2_BUCKET);

const s3Client = hasR2Config
  ? new S3Client({
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
      },
      region: "auto",
      forcePathStyle: true,
    })
  : null;

function sanitizeName(fileName: string): string {
  return (
    fileName.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") ||
    "upload.bin"
  );
}

export async function storeUploadedFile(params: {
  namespace: string;
  objectId: string;
  fileName: string;
  contentType: string;
  buffer: Buffer;
}): Promise<string> {
  const key = `${params.namespace}/${params.objectId}/${sanitizeName(params.fileName)}`;

  if (s3Client) {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
        Body: params.buffer,
        ContentType: params.contentType,
      }),
    );
    return key;
  }

  const fullPath = join(uploadsRoot, key);
  await mkdir(dirname(fullPath), { recursive: true });
  await writeFile(fullPath, params.buffer);
  return key;
}

export async function deleteStoredFile(key: string): Promise<void> {
  if (!key) {
    return;
  }

  if (s3Client) {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
      }),
    );
    return;
  }

  const fullPath = join(uploadsRoot, key);
  await unlink(fullPath).catch((error: NodeJS.ErrnoException) => {
    if (error.code !== "ENOENT") {
      throw error;
    }
  });
}

export async function getStoredFile(key: string): Promise<Buffer> {
  if (!key) {
    throw new Error("Missing storage key");
  }

  if (s3Client) {
    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
      }),
    );

    if (!response.Body) {
      throw new Error(`Stored object not found for key "${key}"`);
    }

    const byteArray = await response.Body.transformToByteArray();
    return Buffer.from(byteArray);
  }

  const fullPath = join(uploadsRoot, key);
  return readFile(fullPath);
}
