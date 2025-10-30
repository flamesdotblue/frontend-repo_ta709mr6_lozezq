import { motion } from "framer-motion";
import { Phone, MapPin, Star } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-white" />

      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-16 sm:pt-28 sm:pb-24 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-amber-800 ring-1 ring-amber-200">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">Freshly baked every morning</span>
            </div>

            <h1 className="font-display text-4xl leading-tight tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
              Mazzarelli's Bakery
            </h1>
            <p className="max-w-xl text-lg text-stone-600">
              Artisan breads, classic Italian pastries, and celebration cakes made
              with love since 1978. Come by for the warm aroma and leave with your
              new favorite treat.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#menu"
                className="inline-flex items-center justify-center rounded-full bg-stone-900 px-5 py-3 text-white shadow-sm transition hover:bg-stone-800"
              >
                View Menu
              </a>
              <a
                href="tel:+1-000-000-0000"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-stone-900 ring-1 ring-stone-200 transition hover:bg-stone-50"
              >
                <Phone className="h-5 w-5" /> Call to Order
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> 123 Main St, Your Town
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" /> 4.9 average rating
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square w-full max-w-md rounded-3xl bg-gradient-to-br from-amber-200/60 via-rose-200/60 to-amber-100/60 p-2 shadow-xl ring-1 ring-black/5 lg:ml-auto">
              <div className="h-full w-full overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1400&auto=format&fit=crop"
                  alt="Fresh pastries at Mazzarelli's Bakery"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
    </section>
  );
}
