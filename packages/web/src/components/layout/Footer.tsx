export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-12 px-6 border-t border-secondary/10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-headline text-lg text-primary italic">
            StitchSort Atelier
          </span>
          <span className="font-body text-sm tracking-tight text-on-surface/80">
            &copy; 2024 StitchSort Atelier. Crafted with Intention.
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a
            href="#"
            className="font-body text-sm tracking-tight text-on-surface/60 hover:text-secondary transition-colors no-underline"
          >
            Methodology
          </a>
          <a
            href="#"
            className="font-body text-sm tracking-tight text-on-surface/60 hover:text-secondary transition-colors no-underline"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="font-body text-sm tracking-tight text-on-surface/60 hover:text-secondary transition-colors no-underline"
          >
            Artisan Terms
          </a>
          <a
            href="#"
            className="font-body text-sm tracking-tight text-on-surface/60 hover:text-secondary transition-colors no-underline"
          >
            Contact
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-outline-variant/20">
        <p className="text-xs text-on-surface/40 leading-relaxed italic text-center md:text-left">
          StitchSort is a free tool for the sewing community. We may earn a
          small commission if you purchase a machine through our links, but this
          never affects our rankings or matches. We prioritize technical specs
          and community feedback above all else.
        </p>
      </div>
    </footer>
  );
}
