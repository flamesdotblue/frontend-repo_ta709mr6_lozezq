import { useMemo, useState } from "react";
import { X, ShoppingCart, Trash2 } from "lucide-react";

const formatPrice = (cents) => `$${(cents / 100).toFixed(2)}`;

export default function CartDrawer({ isOpen, onClose, cart, updateQty, removeItem, onOrderComplete }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price_cents * item.quantity, 0),
    [cart]
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL || window.location.origin.replace(":3000", ":8000");

  const handleCheckout = async () => {
    setError("");
    setSuccess(null);
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading(true);
    try {
      const items = cart.map((i) => ({
        product_id: i.id,
        name: i.name,
        quantity: i.quantity,
        unit_price_cents: i.price_cents,
        subtotal_cents: i.price_cents * i.quantity,
      }));
      const orderPayload = {
        items,
        customer_name: name,
        customer_email: email || null,
        customer_phone: phone || null,
        total_cents: subtotal,
        status: "new",
        payment_status: "unpaid",
      };
      const orderRes = await fetch(`${backendUrl}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      if (!orderRes.ok) throw new Error("Failed to create order");
      const orderData = await orderRes.json();

      const payRes = await fetch(`${backendUrl}/api/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderData.order_id,
          amount_cents: subtotal,
          method,
          status: "pending",
        }),
      });
      if (!payRes.ok) throw new Error("Payment failed");
      const payData = await payRes.json();

      if (payData.status !== "succeeded") {
        setError("Payment was not approved. Please try another method.");
        setLoading(false);
        return;
      }

      setSuccess({ orderId: orderData.order_id, paymentId: payData.payment_id });
      onOrderComplete?.();
    } catch (e) {
      setError(e.message || "Something went wrong during checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Your Cart</h3>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-stone-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex h-[calc(100%-64px)] flex-col">
          {/* Items */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {cart.length === 0 && (
              <p className="text-sm text-stone-500">Your cart is empty.</p>
            )}
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 rounded-lg border p-3">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-16 w-16 rounded object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{item.name}</p>
                  <p className="text-sm text-stone-500">{formatPrice(item.price_cents)}</p>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full border">
                    <button
                      className="px-2 py-1 text-stone-700 hover:bg-stone-100"
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      className="px-2 py-1 text-stone-700 hover:bg-stone-100"
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-700"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="border-t p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-stone-600">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>

            <div className="grid gap-3">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500"
              />

              <div className="flex gap-3">
                {[
                  { key: "card", label: "Card" },
                  { key: "cash", label: "Cash" },
                  { key: "apple_pay", label: "Apple Pay" },
                ].map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setMethod(m.key)}
                    className={`flex-1 rounded-md border px-3 py-2 text-sm ${
                      method === m.key ? "border-amber-600 bg-amber-50 text-amber-700" : "hover:bg-stone-50"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && (
                <div className="rounded-md border border-green-300 bg-green-50 p-3 text-sm text-green-700">
                  Thank you! Your order is confirmed. Order ID: {success.orderId}
                </div>
              )}

              <button
                disabled={loading || cart.length === 0}
                onClick={handleCheckout}
                className="inline-flex w-full items-center justify-center rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Processing..." : `Checkout (${formatPrice(subtotal)})`}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
