import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { api } from "../../lib/api";

// Normalizează orice răspuns: {data:{data:[...]}} | {data:[...]} | [...]
function normalizeList(res) {
  if (Array.isArray(res?.data?.data)) return res.data.data;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res)) return res;
  return [];
}

export default function ActivitiesAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // form Add
  const [createForm, setCreateForm] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    image: "",
  });

  // form Update
  const [editForm, setEditForm] = useState({
    _id: "",
    title: "",
    date: "",
    time: "",
    description: "",
    image: "",
  });

  const hasSelection = useMemo(() => !!editForm._id, [editForm._id]);

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const res = await api.get("/activities");
      const list = normalizeList(res);
      setItems(Array.isArray(list) ? list : []);
    } catch (e) {
      setErr("Nu pot încărca activitățile.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function pickForEdit(a) {
    setEditForm({
      _id: a?._id || "",
      title: a?.title || "",
      date: a?.date || a?.when || "",
      time: a?.time || "",
      description: a?.description || "",
      image: a?.image || a?.imageUrl || "",
    });
  }
  function clearEdit() {
    setEditForm({
      _id: "",
      title: "",
      date: "",
      time: "",
      description: "",
      image: "",
    });
  }

  async function onCreate(e) {
    e?.preventDefault?.();
    setErr("");
    const payload = {
      title: createForm.title?.trim(),
      date: createForm.date?.trim(),
      time: createForm.time?.trim(),
      description: createForm.description?.trim(),
      image: createForm.image?.trim(),
    };
    if (!payload.title) {
      setErr("Titlul este obligatoriu.");
      return;
    }
    try {
      await api.post("/activities", payload);
      setCreateForm({
        title: "",
        date: "",
        time: "",
        description: "",
        image: "",
      });
      await load();
    } catch {
      setErr("Nu am putut salva (add).");
    }
  }

  async function onUpdate(e) {
    e?.preventDefault?.();
    setErr("");
    if (!editForm._id) {
      setErr("Selectează o activitate pentru Update.");
      return;
    }
    const payload = {
      title: editForm.title?.trim(),
      date: editForm.date?.trim(),
      time: editForm.time?.trim(),
      description: editForm.description?.trim(),
      image: editForm.image?.trim(),
    };
    if (!payload.title) {
      setErr("Titlul este obligatoriu.");
      return;
    }
    try {
      await api.put(`/activities/${editForm._id}`, payload);
      await load();
    } catch {
      setErr("Nu am putut salva (update).");
    }
  }

  async function onDelete(id) {
    setErr("");
    if (!id) return;
    if (!window.confirm("Ștergi activitatea?")) return;
    try {
      await api.del(`/activities/${id}`); // atenție: metoda ta e `del`, nu `delete`
      if (editForm._id === id) clearEdit();
      await load();
    } catch {
      setErr("Nu am putut șterge.");
    }
  }

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
        Backoffice • Activities
      </Typography>

      {err && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {err}
        </Alert>
      )}

      {/* GRID: listă în stânga, formulare în dreapta */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" },
          gap: 3,
        }}
      >
        {/* STÂNGA: Tabel simplu */}
        <Box>
          <Paper variant="outlined">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1.5fr 1fr 1fr 160px",
                gap: 1,
                px: 2,
                py: 1.2,
                bgcolor: "#f7f7f7",
                borderBottom: "1px solid rgba(0,0,0,.08)",
                fontWeight: 700,
              }}
            >
              <span>Activity</span>
              <span>Date</span>
              <span>Time</span>
              <span>Actions</span>
            </Box>

            {loading && (
              <Box sx={{ px: 2, py: 2 }}>
                <Typography color="text.secondary">Se încarcă...</Typography>
              </Box>
            )}

            {!loading && items.length === 0 && (
              <Box sx={{ px: 2, py: 2 }}>
                <Typography color="text.secondary">Nicio activitate</Typography>
              </Box>
            )}

            {items.map((a) => (
              <Box
                key={a._id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1fr 1fr 160px",
                  gap: 1,
                  px: 2,
                  py: 1.1,
                  alignItems: "center",
                  borderTop: "1px solid rgba(0,0,0,.06)",
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>{a.title}</Typography>
                <Typography color="text.secondary">
                  {a.date || a.when || "-"}
                </Typography>
                <Typography color="text.secondary">{a.time || "-"}</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => pickForEdit(a)}
                  >
                    Update
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(a._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </Paper>
        </Box>

        {/* DREAPTA: Add + Update */}
        <Box sx={{ display: "grid", gap: 3 }}>
          {/* ADD */}
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Add activity
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, display: "grid", gap: 1.5 }}>
              <TextField
                label="Activity"
                placeholder="Enter title"
                value={createForm.title}
                onChange={(e) =>
                  setCreateForm({ ...createForm, title: e.target.value })
                }
              />
              <TextField
                label="Date"
                placeholder="Enter date"
                value={createForm.date}
                onChange={(e) =>
                  setCreateForm({ ...createForm, date: e.target.value })
                }
              />
              <TextField
                label="Time"
                placeholder="Enter time"
                value={createForm.time}
                onChange={(e) =>
                  setCreateForm({ ...createForm, time: e.target.value })
                }
              />
              <TextField
                label="Description"
                placeholder="Enter description"
                multiline
                minRows={4}
                value={createForm.description}
                onChange={(e) =>
                  setCreateForm({ ...createForm, description: e.target.value })
                }
              />
              <TextField
                label="Image"
                placeholder="Upload image URL"
                value={createForm.image}
                onChange={(e) =>
                  setCreateForm({ ...createForm, image: e.target.value })
                }
              />
              <Button variant="contained" onClick={onCreate}>
                Add new activity
              </Button>
            </Paper>
          </Box>

          {/* UPDATE */}
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Update activity {hasSelection ? `– ${editForm.title || ""}` : ""}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, display: "grid", gap: 1.5 }}>
              <TextField
                label="Activity"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
              />
              <TextField
                label="Date"
                value={editForm.date}
                onChange={(e) =>
                  setEditForm({ ...editForm, date: e.target.value })
                }
              />
              <TextField
                label="Time"
                value={editForm.time}
                onChange={(e) =>
                  setEditForm({ ...editForm, time: e.target.value })
                }
              />
              <TextField
                label="Description"
                multiline
                minRows={4}
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
              />
              <TextField
                label="Image"
                value={editForm.image}
                onChange={(e) =>
                  setEditForm({ ...editForm, image: e.target.value })
                }
              />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  onClick={onUpdate}
                  disabled={!hasSelection}
                >
                  Update activity
                </Button>
                <Button
                  variant="text"
                  onClick={clearEdit}
                  disabled={!hasSelection}
                >
                  Clear selection
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
