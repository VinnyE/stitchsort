import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#fcf9f4]/80 backdrop-blur-xl transition-colors duration-300 shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-2xl font-headline italic text-primary no-underline"
          >
            StitchSort
          </Link>
          <nav className="hidden md:flex gap-6 items-center">
            <a
              href="#"
              className="text-on-surface/70 hover:text-primary transition-all duration-300 font-label text-sm no-underline"
            >
              Models
            </a>
            <a
              href="#"
              className="text-on-surface/70 hover:text-primary transition-all duration-300 font-label text-sm no-underline"
            >
              Guides
            </a>
            <a
              href="#"
              className="text-on-surface/70 hover:text-primary transition-all duration-300 font-label text-sm no-underline"
            >
              Workshops
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/quiz"
            className="bg-primary text-on-primary px-6 py-2 rounded-sm text-sm font-medium hover:bg-primary-container transition-all active:scale-95 duration-200 ease-out no-underline"
          >
            Start Quiz
          </Link>
          <span className="material-symbols-outlined text-primary cursor-pointer">
            account_circle
          </span>
        </div>
      </div>
    </header>
  );
}
