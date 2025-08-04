// ✅ This page displays the list of products added to the cart with their quantities, totals, and allows modification/removal.
// We used a global CartContext so cart syncs with SingleProduct page and survives navigation.

import React from "react";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

function Button({
  children,
  className = "",
  variant = "default",
  size = "md",
  ...props
}) {
  const base = "rounded-xl transition font-medium";
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
    ghost: "text-gray-600 hover:bg-gray-100",
  };
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    icon: "p-2",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white shadow-md rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

function CartPage() {
  const { cart, updateQuantity, removeItem } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 6.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-[#fefefe] min-h-screen p-4 md:p-10">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-20">
          <img
            src="/img/empty-cart.png"
            alt="Empty cart"
            className="mx-auto w-40 mb-4"
          />
          <p className="text-gray-500">
            Your cart is empty. Start exploring handmade treasures.
          </p>
          <Button className="mt-4">Browse Products</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              // console.log(item)

              <Card key={item.id} className="flex items-center p-4">
                <img
                  src={item.images?.[0]?.image_url || ""}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="ml-4 flex-1">
                  <h2 className="font-medium text-lg">{item.name}</h2>
                  <p className="text-sm text-gray-500">${item.price}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </Button>
                    <span className="px-2">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
              </Card>
            ))}
          </div>

          <div className="sticky top-6 h-fit">
            <Card>
              <CardContent className="space-y-4">
                <h2 className="text-xl font-semibold">Summary</h2>
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button className="w-full" disabled={cart.length === 0}>
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
