import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const nav = [
  { to: "/", label: "Forside" },
  { to: "/ophold", label: "Ophold" },
  { to: "/aktiviteter", label: "Aktiviteter" },
  { to: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Top bar, mobile-first */}
      <header className="sticky top-0 z-40 w-full bg-transparent">
        <div className="mx-auto max-w-[1080px] px-3 sm:px-4 md:px-6 lg:px-8 py-2 flex items-center justify-between">
          {/* Left logo coin (G) */}
          <Link
            to="/"
            className="w-8 h-8 rounded-full border border-black/10 bg-white/70 backdrop-blur grid place-items-center font-bold text-[14px] text-ink"
          >
            G
          </Link>
          {/* Burger */}
          <button
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className="w-8 h-8 rounded-full bg-capsule/50 text-white grid place-items-center"
          >
            <span className="sr-only">Open menu</span>
            <div className="w-5 h-5 rounded-full bg-ink/20 grid place-items-center">
              <div className="w-3 h-3 rounded-full border-2 border-white/80" />
            </div>
          </button>
        </div>
      </header>

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-50 transition ${
          open ? "visible" : "invisible"
        }`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <nav
          className={`absolute right-0 top-0 h-full w-[78%] max-w-[360px] bg-sage shadow-xl p-5 transform transition
          ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-black/10 bg-white/80 grid place-items-center font-bold text-ink">
                G
              </div>
              <div className="leading-none">
                <div className="text-[18px]">Gittes</div>
                <div className="font-zen text-[36px] -mt-1">Glamping</div>
              </div>
            </div>
            <button className="text-ink" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          <ul className="space-y-2">
            {nav.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 ${
                      isActive
                        ? "bg-teal text-white"
                        : "text-ink hover:bg-black/5"
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link
            to="/ophold"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center gap-2 bg-beige text-black font-extrabold rounded-xl px-4 py-2 hover:brightness-105"
          >
            BOOK NU
            <span aria-hidden>→</span>
          </Link>
        </nav>
      </div>
    </>
  );
}
