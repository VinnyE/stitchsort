import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";

const MACHINES = [
  {
    name: "Brother CS7000X",
    subtitle: "Computerized Versatility",
    price: "$219.00",
    project: "Quilting & Garments",
    fabricHandling: {
      text: "Fluid feed system",
      detail: "Excellent for knits",
      icon: "check_circle",
      color: "text-tertiary",
    },
    throat: '6.4" (Wide table incl.)',
    bestFor: { label: "Artisan Quilter", style: "bg-tertiary/10 text-tertiary" },
    isTopMatch: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7XjnnTZIEDI5Qfp7mdM31QgYClLIIGTtJ4_7aHdV9CPDxzzcsO-zgjEuHKvCD3E-Or5j551ycPh2Rr3-OQmtpuMtyZhewtXrgBO_izogi0WvhDzO6OpdSeLR6lX2MtY_VkrnzHXUiAo2f31lOAEjpA1q0yMs_RIbTxyShwCoKSCWXQydcVYBpMQsPVK6sN8ZHP42BlbzS8y4BXdA7Yg8EHUe60UYCcmEAHOKFQt8yGZ2hEUdocjHmIrKcvM7VJb3WHfbgXcFa0YA",
  },
  {
    name: "Singer 4423",
    subtitle: "Heavy Duty Strength",
    price: "$199.99",
    project: "Upholstery & Denim",
    fabricHandling: {
      text: "High speed motor",
      detail: "Perfect for 8+ layers",
      icon: "check_circle",
      color: "text-tertiary",
    },
    throat: '5.5" (Compact)',
    bestFor: {
      label: "Structural Projects",
      style: "bg-tertiary/10 text-tertiary",
    },
    isTopMatch: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVcF-GYu4zKrEAm6mp1WMYqA5mzkhCKstvpTKr8MYqeS2-1P3KoLp2-UhFTBmX_93WEEpSVeecCe5CxvzOoTzLjCqXvkmdm9o9GOY74ftk3R7IG4NDIn91xb3bAAbWyCvG5AhAeAlU3DFriBaGx2aX-h4VsuhR81Vk8nDy1cm_5fpOPo2_LuogKDrmt6q_738ibQ0NrypFAqyxU7RIk1kM_Y9TEinVLxA-pXesF7PLxAc1eb3S3a7_49KHi8NR0ytDRnp_zql8ImI",
  },
  {
    name: "Brother XM2701",
    subtitle: "Lightweight Everyday",
    price: "$144.99",
    project: "Repairs & Alterations",
    fabricHandling: {
      text: "Standard motor",
      detail: "May struggle with leather",
      icon: "warning",
      color: "text-secondary",
    },
    throat: '5.7"',
    bestFor: {
      label: "New Hobbyist",
      style: "bg-secondary-container/20 text-on-secondary-container",
    },
    isTopMatch: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0silmK6k-B91S_7Uw1GwG67R6fkANWEhoBwDY9oPrUJM_HaLmmsG7OX9MK5gIU1FHy6EKlNLdqI7eNcEHQ3m5Ut7ZuADfNlq0sP1yS0JOyKV0EUoa4c2ncD9LYQ2cyHMFOBuIMiCoi9PlBJUxpkpFclER3drj0jN1ktuJTaoJrnFC0qjbPxaZft0CG1cSQrEEkRkTcKxAtd9lnZvn6V_KyDK3gc_pVXo3bUEVXBBcgSfEg1RL4vfVbSQ_U5e1-24rqwR8wYwjNtk",
  },
];

const SPEC_LABELS = [
  "Price Range",
  "Project Type",
  "Fabric Handling",
  "Throat Space",
  "Best For",
];

export default function ComparisonView() {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-fixed-dim selection:text-on-primary-fixed">
      <TopNav />

      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
        <header className="mb-16">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary mb-3 block">
            Match Comparison
          </span>
          <h1 className="font-headline text-5xl md:text-6xl text-on-background leading-tight max-w-2xl">
            Tailored Results for Your Workshop
          </h1>
          <p className="mt-6 text-on-surface-variant max-w-xl leading-relaxed">
            We've narrowed down the ideal machines for your specific needs.
            Compare the technical specifications and artisanal capabilities of
            your top three matches.
          </p>
        </header>

        {/* Comparison Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[1000px] grid grid-cols-4 gap-x-6">
            {/* Labels column */}
            <div className="col-span-1 pt-64 space-y-16">
              {SPEC_LABELS.map((label) => (
                <div key={label} className="h-12 flex items-center">
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant/60">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Machine columns */}
            {MACHINES.map((machine) => (
              <div
                key={machine.name}
                className={`col-span-1 bg-surface-container-low p-6 rounded-lg transition-all duration-300 hover:translate-y-[-4px] hover:bg-surface-container-high ${
                  machine.isTopMatch ? "ring-1 ring-primary/20" : ""
                }`}
              >
                {/* Image */}
                <div className="mb-8 aspect-[4/5] bg-surface-container-highest rounded-sm overflow-hidden flex items-center justify-center p-4">
                  <img
                    className="w-full h-full object-cover rounded-sm grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                    alt={machine.name}
                    src={machine.image}
                  />
                </div>

                {/* Title */}
                <div className="mb-12">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline text-2xl text-on-surface">
                        {machine.name}
                      </h3>
                      <p className="text-sm text-on-surface-variant mt-1">
                        {machine.subtitle}
                      </p>
                    </div>
                    {machine.isTopMatch && (
                      <span className="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                        TOP MATCH
                      </span>
                    )}
                  </div>
                </div>

                {/* Specs */}
                <div className="space-y-16">
                  <div className="h-12 flex items-center text-lg font-medium text-primary">
                    {machine.price}
                  </div>
                  <div className="h-12 flex items-center text-sm">
                    {machine.project}
                  </div>
                  <div className="h-12 flex flex-col justify-center">
                    <span
                      className={`inline-flex items-center gap-2 text-sm ${machine.fabricHandling.color}`}
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={
                          machine.fabricHandling.icon === "check_circle"
                            ? {
                                fontVariationSettings: "'FILL' 1",
                              }
                            : undefined
                        }
                      >
                        {machine.fabricHandling.icon}
                      </span>
                      {machine.fabricHandling.text}
                    </span>
                    <span className="text-[11px] text-on-surface-variant/60 ml-6 italic">
                      {machine.fabricHandling.detail}
                    </span>
                  </div>
                  <div className="h-12 flex items-center text-sm">
                    {machine.throat}
                  </div>
                  <div className="h-12 flex items-center">
                    <span
                      className={`${machine.bestFor.style} px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full`}
                    >
                      {machine.bestFor.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Advice Section */}
        <section className="mt-24 bg-surface-container px-8 py-12 rounded-lg flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="inline-block bg-secondary-container text-on-secondary-container px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-4">
              Pro Advice
            </span>
            <h2 className="font-headline text-3xl text-on-background mb-4">
              The Artisan's Choice
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              While the{" "}
              <span className="text-primary font-semibold">Singer 4423</span>{" "}
              offers unparalleled power for heavy structural projects, the{" "}
              <span className="text-primary font-semibold">
                Brother CS7000X
              </span>{" "}
              provides the delicate precision needed for couture garment work. We
              recommend the Singer if you plan to work with denim or heavy linen
              regularly.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/results"
              className="px-8 py-4 bg-primary text-on-primary rounded-sm font-medium hover:bg-primary-container transition-all shadow-lg shadow-primary/10 no-underline"
            >
              Confirm Top Match
            </Link>
            <Link
              to="/quiz"
              className="px-8 py-4 border border-outline-variant/20 text-primary rounded-sm font-medium hover:bg-surface-container-high transition-all no-underline"
            >
              Refine Search
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
