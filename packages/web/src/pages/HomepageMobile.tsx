import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import ThreadDivider from "../components/ThreadDivider";

export default function HomepageMobile() {
  return (
    <div className="bg-background text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      <TopNav showDesktopLinks={false} />

      <main className="pt-20 pb-24">
        {/* Hero Section */}
        <section className="px-6 py-12 flex flex-col items-center text-center">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary mb-4">
            The Atelier Guide
          </span>
          <h1 className="text-5xl md:text-6xl font-headline text-on-surface leading-tight mb-8">
            Which sewing machine is{" "}
            <span className="italic text-primary">right for you?</span>
          </h1>

          <div className="w-full aspect-[4/5] relative mb-12 rounded-sm overflow-hidden bg-surface-container">
            <img
              alt="Vintage sewing machine on a wooden desk"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG8N_oOkk8vO4QTLRkHCmDlu5e4UoY0y1zId7aZ6WRALFvs7mNefLANvD-PhMQrZettUFBwcXqsco6KHwCkTgRtzNiYRoCZaGVmTKEOtyV8HKa3mMnicUv74e-JgB8W359Ohsik5gtYtwM8O-zQ6BrH7veiaw8LQBRfD4IM769IeKk-yLh6WEUPysDukFad04E7TBC3khImSHEwxu6EoE58wiODHwFGB0GungRST9Xt_y7LeZf_h6RCqSCQ4Luzvf83OhNKuImWiQ"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>

          <Link
            to="/quiz"
            className="w-full bg-primary text-on-primary py-5 rounded-sm text-lg font-medium shadow-sm hover:bg-primary-container transition-all active:scale-95 flex justify-center items-center gap-2 no-underline"
          >
            Take the Quiz
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </section>

        {/* Trust Signals */}
        <section className="bg-surface-container-low py-16 px-6">
          <div className="max-w-md mx-auto space-y-12">
            {[
              {
                icon: "verified_user",
                title: "Free & Independent",
                desc: "Our recommendations are unbiased. We are not paid by brands to favor their machines.",
              },
              {
                icon: "grid_view",
                title: "Cross-Brand",
                desc: "Comparing Brother, Janome, Singer, and boutique Swiss manufacturers in one place.",
              },
              {
                icon: "visibility",
                title: "Transparent Methodology",
                desc: "Every score is based on raw data: stitch speed, motor torque, and long-term durability.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 24 }}
                  >
                    {item.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-headline mb-2">{item.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed font-body">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ThreadDivider />

        {/* Artisan Tip */}
        <section className="px-6 py-8">
          <div className="bg-secondary-container p-8 rounded-sm">
            <span className="font-label text-[10px] uppercase tracking-widest text-on-secondary-container font-bold mb-4 block">
              Artisan Tip
            </span>
            <p className="font-headline text-lg text-on-secondary-container italic">
              "The best machine is not the most expensive one, but the one that
              disappears into your creative process."
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
