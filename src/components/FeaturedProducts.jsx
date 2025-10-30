import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const formatPrice = (cents) => `$${(cents / 100).toFixed(2)}`;

export default function FeaturedProducts({ onAdd }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || window.location.origin.replace(":3000", ":8000");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length === 0) {
            // try seed once
            await fetch(`${backendUrl}/api/seed`, { method: "POST" });
            const res2 = await fetch(`${backendUrl}/api/products`);
            const data2 = await res2.json();
            setProducts(data2.map((p, i) => ({ ...p, id: p.id || `${i}` })));
          } else {
            setProducts(data.map((p, i) => ({ ...p, id: p.id || `${i}` })));
          }
        } else {
          setProducts([]);
        }
      } catch (e) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [backendUrl]);

  return (
    <section id="menu" className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl tracking-tight text-stone-900 sm:text-4xl">
              Fresh from the oven
            </h2>
            <p className="mt-2 text-stone-600">A few customer favorites you can pick up today.</p>
          </div>
        </div>

        {loading ? (
          <p className="text-stone-600">Loading menu…</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-2 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-stone-900">{item.name}</h3>
                    <span className="text-sm font-medium text-amber-700">{formatPrice(item.price_cents)}</span>
                  </div>
                  <p className="text-sm text-stone-600 line-clamp-2">{item.description}</p>
                  <button
                    onClick={() => onAdd?.(item)}
                    className="mt-2 w-full rounded-md bg-stone-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-stone-800"
                  >
                    Add to cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
