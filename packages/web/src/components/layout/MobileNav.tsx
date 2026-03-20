import { Link, useLocation } from "react-router-dom";

const tabs = [
  { label: "Home", icon: "home", path: "/" },
  { label: "Quiz", icon: "styler", path: "/quiz" },
  { label: "Library", icon: "book_5", path: "#" },
  { label: "Profile", icon: "person", path: "#" },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center pb-safe pt-2 px-2 bg-[#fcf9f4]/90 backdrop-blur-lg z-50 shadow-[0_-4px_24px_rgba(138,79,52,0.04)]">
      {tabs.map((tab) => {
        const isActive =
          tab.path === "/"
            ? location.pathname === "/"
            : tab.path !== "#" && location.pathname.startsWith(tab.path);

        return (
          <Link
            key={tab.label}
            to={tab.path}
            className={`flex flex-col items-center justify-center px-4 py-1 no-underline transition-all ${
              isActive
                ? "bg-primary text-[#fcf9f4] rounded-sm"
                : "text-on-surface/60"
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              {tab.icon}
            </span>
            <span className="font-body text-[11px] uppercase tracking-wider mt-0.5">
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
