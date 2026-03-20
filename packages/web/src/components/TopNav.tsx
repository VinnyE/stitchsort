import { Link } from "react-router-dom";

interface TopNavProps {
  showDesktopLinks?: boolean;
}

export default function TopNav({ showDesktopLinks = true }: TopNavProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl transition-colors duration-300">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link
          to="/"
          className="text-2xl font-headline italic text-primary no-underline"
        >
          StitchMatch
        </Link>
        {showDesktopLinks && (
          <nav className="hidden md:flex items-center gap-x-8">
            <Link
              to="/stitchmatch"
              className="text-on-surface/70 hover:text-primary transition-colors font-label text-sm tracking-wide no-underline"
            >
              How it Works
            </Link>
            <Link
              to="/results"
              className="text-on-surface/70 hover:text-primary transition-colors font-label text-sm tracking-wide no-underline"
            >
              Machine Library
            </Link>
            <Link
              to="/compare"
              className="text-on-surface/70 hover:text-primary transition-colors font-label text-sm tracking-wide no-underline"
            >
              Resources
            </Link>
          </nav>
        )}
        <div className="flex items-center gap-4">
          <Link
            to="/quiz"
            className="bg-primary text-on-primary px-6 py-2 rounded-sm text-sm font-medium hover:bg-primary-container transition-all active:scale-95 duration-200 ease-out no-underline"
          >
            Start Quiz
          </Link>
          <span className="material-symbols-outlined text-primary cursor-pointer text-[28px]">
            account_circle
          </span>
        </div>
      </div>
    </header>
  );
}
