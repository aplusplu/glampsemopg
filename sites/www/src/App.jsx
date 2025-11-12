// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";

// Pagini
import Forside from "./pages/Forside/Forside.jsx";
import Activities from "./pages/Activities/Activities.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Sent from "./pages/Contact/Sent.jsx";
import MyList from "./pages/MyList/MyList.jsx";
import Login from "./pages/Auth/Login.jsx";
import Stays from "./pages/Stays/Stays.jsx";
import StayDetail from "./pages/Stays/StayDetail.jsx";
import ActivitiesAdmin from "./pages/Backoffice/ActivitiesAdmin.jsx";

// Routing utils
import ProtectedRoute from "./components/routing/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Forside (Home) */}
        <Route path="/" element={<Forside />} />

        {/* Stays / Ophold */}
        <Route path="/ophold" element={<Stays />} />
        <Route path="/ophold/:id" element={<StayDetail />} />

        {/* Activities */}
        <Route path="/aktiviteter" element={<Activities />} />

        {/* My List */}
        <Route path="/min-liste" element={<MyList />} />

        {/* Contact */}
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/kontakt/sendt" element={<Sent />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Backoffice - doar admin */}
        <Route
          path="/backoffice"
          element={
            <ProtectedRoute requireRole="admin">
              <ActivitiesAdmin />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
