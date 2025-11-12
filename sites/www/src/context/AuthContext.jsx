// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, setToken as apiSetToken } from "../lib/api";

const AuthContext = createContext(null);

// decode jwt no signature verification
function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    // JWT base64url -> base64
    const b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(b64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// authentication provider component
export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiSetToken(token);
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // response can vary: { token: '...' } or { accessToken: '...' } or { data: { token: '...' } }
      const resp = await api.post("/auth/signin", { email, password });

      const t = resp?.token || resp?.accessToken || resp?.data?.token; // 👈 AICI e tokenul tău

      if (!t) throw new Error("Token lipsește din răspuns");

      // decoode user info from token jwt payload
      const payload = decodeJwt(t) || {};
      const u = {
        id: payload._id || payload.id,
        email: payload.email,
        role: payload.role,
        name: payload.name,
        picture: payload.picture,
      };

      setToken(t);
      setUser(u);
      localStorage.setItem("token", t);
      localStorage.setItem("user", JSON.stringify(u));
      apiSetToken(t);

      return { token: t, user: u };
    } finally {
      setLoading(false);
    }
  };

  // logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    apiSetToken(null);
  };

  const isAdmin = user?.role === "admin";
  const isGuest = user?.role === "guest";

  // prepare context value
  
  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      login,
      logout,
      isAdmin,
      isGuest,
      setUser,
    }),
    [token, user, loading, isAdmin, isGuest]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
