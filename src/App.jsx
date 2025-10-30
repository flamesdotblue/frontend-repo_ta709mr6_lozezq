import { useMemo, useState } from "react";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import ContactFooter from "./components/ContactFooter";
import CartDrawer from "./components/CartDrawer";
import { ChefHat, ShoppingCart } from "lucide-react";

function Navbar({ onOpenCart, count }) {
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
          <a href="#contact" className="hover:text-stone-900">Contact</a>
          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-white shadow-sm transition hover:bg-stone-800"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
            {count > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-500 px-1 text-xs font-semibold text-white">
                {count}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const itemCount = useMemo(() => cart.reduce((n, i) => n + i.quantity, 0), [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id, nextQty) => {
    setCart((prev) => {
      if (nextQty <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, quantity: nextQty } : i));
    });
  };

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  return (
    <div className="min-h-screen bg-white text-stone-900">
      <Navbar onOpenCart={() => setCartOpen(true)} count={itemCount} />
      <main>
        <Hero />
        <FeaturedProducts onAdd={addToCart} />
      </main>
      <ContactFooter />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateQty={updateQty}
        removeItem={removeItem}
        onOrderComplete={() => {
          clearCart();
        }}
      />
    </div>
  );
}

export default App;
