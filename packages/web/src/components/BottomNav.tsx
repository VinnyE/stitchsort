import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", icon: "home", label: "Home" },
  { to: "/quiz", icon: "styler", label: "Quiz" },
  { to: "/results", icon: "book_5", label: "Library" },
  { to: "#", icon: "person", label: "Profile" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center pb-safe pt-2 px-2 bg-surface/90 backdrop-blur-lg z-50 shadow-[0_-4px_24px_rgba(138,79,52,0.04)]">
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={item.label}
            to={item.to}
            className={`flex flex-col items-center justify-center py-1 px-4 no-underline transition-all ${
              isActive
                ? "bg-primary text-surface rounded-sm"
                : "text-on-surface/60 hover:bg-surface-container-low"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {item.icon}
            </span>
            <span className="font-body text-[11px] uppercase tracking-wider mt-0.5">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
