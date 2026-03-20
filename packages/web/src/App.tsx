import { FormEvent, useEffect, useState } from "react";
import {
  checkAuth,
  createItem,
  deleteItem,
  Item,
  listItems,
  login,
  logout,
} from "./api";

type AuthState = "checking" | "authenticated" | "unauthenticated";

export default function App() {
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [authEnabled, setAuthEnabled] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const authInfo = await checkAuth();
      if (cancelled) {
        return;
      }

      setAuthEnabled(authInfo.enabled);

      if (!authInfo.authenticated) {
        setAuthState("unauthenticated");
        return;
      }

      setAuthState("authenticated");
      const nextItems = await listItems();
      if (!cancelled) {
        setItems(nextItems);
      }
    }

    void bootstrap().catch((bootstrapError) => {
      if (!cancelled) {
        setAuthState("unauthenticated");
        setError(
          bootstrapError instanceof Error
            ? bootstrapError.message
            : "Failed to load app",
        );
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  async function refreshItems() {
    const nextItems = await listItems();
    setItems(nextItems);
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(password);
      setPassword("");
      setAuthState("authenticated");
      await refreshItems();
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : "Login failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCreateItem(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await createItem({ title, notes, file });
      setTitle("");
      setNotes("");
      setFile(null);
      const input = document.getElementById(
        "item-file",
      ) as HTMLInputElement | null;
      if (input) {
        input.value = "";
      }
      await refreshItems();
    } catch (createError) {
      setError(
        createError instanceof Error ? createError.message : "Create failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteItem(id: string) {
    setError(null);
    try {
      await deleteItem(id);
      await refreshItems();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : "Delete failed",
      );
    }
  }

  async function handleLogout() {
    setIsSigningOut(true);
    try {
      await logout();
      setItems([]);
      setAuthState("unauthenticated");
    } finally {
      setIsSigningOut(false);
    }
  }

  if (authState === "checking") {
    return (
      <main className="shell">
        <section className="card">Loading...</section>
      </main>
    );
  }

  if (authState === "unauthenticated") {
    return (
      <main className="shell">
        <section className="card auth-card">
          <p className="eyebrow">Starter Template</p>
          <h1>Sign in</h1>
          <p className="muted">
            Use the shared password from `API_AUTH_TOKEN`.
          </p>
          <form className="stack" onSubmit={(event) => void handleLogin(event)}>
            <label className="stack">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting || password.length === 0}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
          {error ? <p className="error">{error}</p> : null}
        </section>
      </main>
    );
  }

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Hono + React + SQLite + Fly</p>
          <h1>Infrastructure starter</h1>
          <p className="muted">
            Replace this sample UI with your product. The reusable pieces live
            in auth, storage, deployment, and workspace wiring.
          </p>
          <p className="muted">
            {authEnabled ? "Auth mode: private" : "Auth mode: public"}
          </p>
        </div>
        {authEnabled ? (
          <button
            className="secondary"
            type="button"
            onClick={() => void handleLogout()}
            disabled={isSigningOut}
          >
            {isSigningOut ? "Signing out..." : "Sign out"}
          </button>
        ) : null}
      </section>

      <section className="grid">
        <form
          className="card stack"
          onSubmit={(event) => void handleCreateItem(event)}
        >
          <h2>Create item</h2>
          <label className="stack">
            <span>Title</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Quarterly notes"
            />
          </label>
          <label className="stack">
            <span>Notes</span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="This sample route persists text in SQLite."
              rows={5}
            />
          </label>
          <label className="stack">
            <span>Optional file</span>
            <input
              id="item-file"
              type="file"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting || title.trim().length === 0}
          >
            {isSubmitting ? "Saving..." : "Save item"}
          </button>
          {error ? <p className="error">{error}</p> : null}
        </form>

        <section className="card stack">
          <h2>Saved items</h2>
          {items.length === 0 ? <p className="muted">No items yet.</p> : null}
          <div className="stack">
            {items.map((item) => (
              <article key={item.id} className="item">
                <div className="item-header">
                  <div>
                    <h3>{item.title}</h3>
                    <p className="meta">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    className="danger"
                    type="button"
                    onClick={() => void handleDeleteItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
                {item.notes ? <p>{item.notes}</p> : null}
                {item.fileName ? (
                  <a href={`/api/items/${item.id}/file`} className="download">
                    Download {item.fileName}
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
