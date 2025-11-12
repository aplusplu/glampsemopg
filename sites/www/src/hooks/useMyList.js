// our imports
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../lib/api";

const KEY = "mylist_ids";

// custom hook for my list management
export default function useMyList() {
  const { user } = useAuth();
  const [ids, setIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  });

  // persist in localStorage
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(ids));
  }, [ids]);

  // helpers for managing the list
  const has = (id) => ids.includes(id);
  const toggle = (id) =>
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  const clear = () => setIds([]);

  // save to saveToServer
  const saveToServer = async () => {
    if (!user?.email) throw new Error("Trebuie să fii logat ca guest/admin");
    const payload = new FormData();
    payload.set("activityIds", ids.join(","));
    payload.set("email", user.email);
    return api.post("/mylist/save", payload);
  };

  return { ids, has, toggle, clear, saveToServer };
}
