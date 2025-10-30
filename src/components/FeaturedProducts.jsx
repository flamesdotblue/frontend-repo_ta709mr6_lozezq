import { motion } from "framer-motion";

const products = [
  {
    name: "Almond Croissant",
    desc: "Buttery pastry layered with almond cream and toasted almonds.",
    price: "$4.50",
    img: "https://images.unsplash.com/photo-1524182576065-1c814ad3a8be?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Sourdough Loaf",
    desc: "Naturally leavened, crackly crust, tender and tangy crumb.",
    price: "$6.00",
    img: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Cannoli",
    desc: "Classic ricotta filling with citrus zest and chocolate chips.",
    price: "$3.75",
    img: "https://images.unsplash.com/photo-1619527492558-2ec3cf1134f9?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Tiramisu Slice",
    desc: "Espresso-soaked ladyfingers layered with mascarpone cream.",
    price: "$5.25",
    img: "https://images.unsplash.com/photo-1613478223719-e5e4766473a6?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function FeaturedProducts() {
  return (
    <section id="menu" className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl tracking-tight text-stone-900 sm:text-4xl">
              Fresh from the oven
            </h2>
            <p className="mt-2 text-stone-600">
              A few customer favorites you can pick up today.
            </p>
          </div>
          <a
            href="#contact"
            className="hidden rounded-full bg-stone-900 px-4 py-2 text-sm text-white shadow-sm transition hover:bg-stone-800 sm:inline-block"
          >
            Order ahead
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="space-y-1 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-stone-900">{item.name}</h3>
                  <span className="text-sm font-medium text-amber-700">{item.price}</span>
                </div>
                <p className="text-sm text-stone-600">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
