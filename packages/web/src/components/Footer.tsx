import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full border-t border-secondary/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <Link
              to="/"
              className="font-headline text-lg font-semibold text-on-surface no-underline block mb-2"
            >
              StitchMatch
            </Link>
            <p className="text-on-surface/50 font-body text-sm max-w-md">
              © 2024 StitchMatch. Independent recommendations for every sewist.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-4">
            <a
              href="#"
              className="text-on-surface/50 hover:text-secondary transition-colors font-body text-sm tracking-wide no-underline"
            >
              Methodology
            </a>
            <a
              href="#"
              className="text-on-surface/50 hover:text-secondary transition-colors font-body text-sm tracking-wide no-underline"
            >
              Affiliate Disclosure
            </a>
            <a
              href="#"
              className="text-on-surface/50 hover:text-secondary transition-colors font-body text-sm tracking-wide no-underline"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-on-surface/50 hover:text-secondary transition-colors font-body text-sm tracking-wide no-underline"
            >
              Contact
            </a>
          </nav>
        </div>
        <div className="pt-8 border-t border-outline-variant/20">
          <p className="text-xs text-on-surface/40 leading-relaxed italic">
            StitchMatch is a free tool for the sewing community. We may earn a
            small commission if you purchase a machine through our links, but
            this never affects our rankings or matches. We prioritize technical
            specs and community feedback above all else.
          </p>
        </div>
      </div>
    </footer>
  );
}
