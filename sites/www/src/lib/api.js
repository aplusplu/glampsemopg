// src/lib/api.js
const BASE = import.meta.env.VITE_API_URL || "http://localhost:3042";

let _token = null;

export function setToken(t) {
  _token = t;
}

async function request(path, { method = "GET", headers = {}, body } = {}) {
  const opts = { method, headers: { ...headers } };

  if (_token) opts.headers["authorization"] = `Bearer ${_token}`;

  if (body && !(body instanceof FormData)) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(body);
  } else if (body instanceof FormData) {
    // leave Content-Type to be set by the browser
    opts.body = body;
  }

  const res = await fetch(`${BASE}${path}`, opts);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

export const api = {
  setToken,
  get: (p) => request(p),
  post: (p, body, headers) => request(p, { method: "POST", body, headers }),
  put: (p, body, headers) => request(p, { method: "PUT", body, headers }),
  del: (p) => request(p, { method: "DELETE" }),
};
