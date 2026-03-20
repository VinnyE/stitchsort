export interface Item {
  id: string;
  title: string;
  notes: string | null;
  fileKey: string | null;
  fileName: string | null;
  fileType: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ApiError {
  error?: string;
}

export interface AuthInfo {
  enabled: boolean;
  authenticated: boolean;
}

function apiFetch(input: string, init?: RequestInit): Promise<Response> {
  return fetch(input, {
    ...init,
    credentials: "same-origin",
  });
}

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as ApiError;
    throw new Error(data.error ?? `Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function checkAuth(): Promise<AuthInfo> {
  const response = await apiFetch("/api/auth/me");
  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as ApiError;
    throw new Error(data.error ?? "Failed to read auth status");
  }

  const data = (await response.json().catch(() => ({}))) as Partial<AuthInfo>;
  return {
    enabled: Boolean(data.enabled),
    authenticated: Boolean(data.authenticated),
  };
}

export async function login(password: string): Promise<void> {
  const response = await apiFetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as ApiError;
    throw new Error(data.error ?? "Login failed");
  }
}

export async function logout(): Promise<void> {
  await apiFetch("/api/auth/logout", { method: "POST" });
}

export async function listItems(): Promise<Item[]> {
  const response = await apiFetch("/api/items");
  return parseJson<Item[]>(response);
}

export async function createItem(payload: {
  title: string;
  notes: string;
  file: File | null;
}): Promise<Item> {
  const formData = new FormData();
  formData.set("title", payload.title);
  formData.set("notes", payload.notes);
  if (payload.file) {
    formData.set("file", payload.file);
  }

  const response = await apiFetch("/api/items", {
    method: "POST",
    body: formData,
  });

  return parseJson<Item>(response);
}

export async function deleteItem(id: string): Promise<void> {
  const response = await apiFetch(`/api/items/${id}`, { method: "DELETE" });
  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as ApiError;
    throw new Error(data.error ?? "Delete failed");
  }
}
