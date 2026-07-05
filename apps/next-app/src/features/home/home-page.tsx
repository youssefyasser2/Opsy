import CTASection from "./components/cta-section";
import Features from "./components/features";
import Footer from "./components/footer";
import Header from "./components/header";
import Hero from "./components/hero";
import Integrations from "./components/integrations";
import Security from "./components/security";

export function HomePage() {
  return (
    <main className="relative overflow-hidden text-foreground">
      {/* ================= Background ================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Full Page Grid Layer */}
        <div className="absolute inset-0 bg-grid" />

        {/* Main Aurora */}
        <div className="animate-aurora-1 absolute left-1/2 top-[-12%] h-[52rem] w-[72rem] -translate-x-1/2 rounded-full bg-cyan/10 blur-[150px]" />

        {/* Right Glow */}
        <div className="animate-aurora-2 absolute bottom-[-8%] right-[-8%] h-[38rem] w-[46rem] rounded-full bg-cyan/6 blur-[130px]" />

        {/* Left Glow */}
        <div className="animate-aurora-3 absolute left-[-8%] top-[35%] h-[34rem] w-[42rem] rounded-full bg-purple/5 blur-[130px]" />

        {/* Small Accent */}
        <div className="absolute left-1/2 top-40 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-cyan/5 blur-[120px]" />
      </div>

      {/* ================= Content ================= */}

      <div className="relative flex min-h-screen flex-col">
        <Header />
        <Hero />
        <Features />
        <Integrations />
        <Security />

        <section className="relative">
          <div className="absolute inset-0 flex justify-center">
            <div className="h-[24rem] w-[48rem] rounded-full bg-cyan/5 blur-[160px]" />
          </div>

          <div className="relative">
            <CTASection />
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}