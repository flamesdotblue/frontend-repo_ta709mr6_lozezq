import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Facebook, Instagram } from "lucide-react";

export default function ContactFooter() {
  return (
    <footer id="contact" className="relative border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-display text-2xl text-stone-900">Visit us</h3>
            <p className="text-stone-600">
              Stop in for coffee and a pastry or place an order for your next
              celebration. We can’t wait to serve you.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-stone-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-stone-900">
                  <MapPin className="h-5 w-5" /> Address
                </div>
                <p className="text-sm text-stone-600">
                  123 Main St
                  <br /> Your Town, ST 00000
                </p>
              </div>
              <div className="rounded-2xl bg-stone-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-stone-900">
                  <Clock className="h-5 w-5" /> Hours
                </div>
                <p className="text-sm text-stone-600">
                  Mon–Fri: 7:00a – 6:00p
                  <br /> Sat–Sun: 7:00a – 4:00p
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="rounded-3xl bg-gradient-to-br from-amber-100 to-rose-100 p-6 ring-1 ring-black/5">
              <h4 className="text-lg font-semibold text-stone-900">Get in touch</h4>
              <div className="mt-4 space-y-3 text-stone-700">
                <a href="tel:+1-000-000-0000" className="flex items-center gap-2 hover:text-stone-900">
                  <Phone className="h-5 w-5" /> (000) 000-0000
                </a>
                <a href="mailto:orders@mazzarellisbakery.com" className="flex items-center gap-2 hover:text-stone-900">
                  <Mail className="h-5 w-5" /> orders@mazzarellisbakery.com
                </a>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm ring-1 ring-stone-200 hover:bg-stone-50"
                    href="#"
                  >
                    <Facebook className="h-4 w-4" /> Facebook
                  </a>
                  <a
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm ring-1 ring-stone-200 hover:bg-stone-50"
                    href="#"
                  >
                    <Instagram className="h-4 w-4" /> Instagram
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-200 pt-6 text-sm text-stone-500 md:flex-row">
          <div>© {new Date().getFullYear()} Mazzarelli's Bakery. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#home" className="hover:text-stone-700">Home</a>
            <a href="#menu" className="hover:text-stone-700">Menu</a>
            <a href="#about" className="hover:text-stone-700">About</a>
            <a href="#contact" className="hover:text-stone-700">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
