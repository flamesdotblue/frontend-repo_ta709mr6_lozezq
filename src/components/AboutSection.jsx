import { motion } from "framer-motion";
import { Leaf, Sparkles, Users } from "lucide-react";

const perks = [
  {
    icon: Leaf,
    title: "Quality Ingredients",
    text: "Locally sourced flour, real butter, and seasonal produce. No shortcuts.",
  },
  {
    icon: Sparkles,
    title: "Baked Daily",
    text: "We mix, proof, and bake every morning for peak freshness and flavor.",
  },
  {
    icon: Users,
    title: "Family Owned",
    text: "A neighborhood staple for decades, serving our community with pride.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-amber-100 shadow-lg ring-1 ring-black/5">
              <img
                src="https://images.unsplash.com/photo-1549931319-e995b2f1f04f?q=80&w=1400&auto=format&fit=crop"
                alt="Handcrafted bread being prepared"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="font-display text-3xl tracking-tight text-stone-900 sm:text-4xl">
              A tradition of craftsmanship
            </h2>
            <p className="text-stone-600">
              From the first loaf pulled from our ovens to the cakes we craft for
              your biggest celebrations, we believe in simple ingredients, careful
              technique, and treating everyone like family.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {perks.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5"
                >
                  <Icon className="mb-3 h-6 w-6 text-amber-600" />
                  <div className="font-medium text-stone-900">{title}</div>
                  <p className="mt-1 text-sm text-stone-600">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
