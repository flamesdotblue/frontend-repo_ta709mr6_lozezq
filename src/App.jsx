import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import AboutSection from "./components/AboutSection";
import ContactFooter from "./components/ContactFooter";
import { ChefHat } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-rose-400 text-white shadow">
            <ChefHat className="h-5 w-5" />
          </span>
          <span className="font-semibold tracking-tight text-stone-900">Mazzarelli's</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-stone-700 md:flex">
          <a href="#menu" className="hover:text-stone-900">Menu</a>
          <a href="#about" className="hover:text-stone-900">About</a>
          <a href="#contact" className="hover:text-stone-900">Contact</a>
          <a
            href="tel:+1-000-000-0000"
            className="rounded-full bg-stone-900 px-4 py-2 text-white shadow-sm transition hover:bg-stone-800"
          >
            Call to Order
          </a>
        </nav>
      </div>
    </header>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white text-stone-900">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <AboutSection />
      </main>
      <ContactFooter />
    </div>
  );
}

export default App;
