import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../Api/Api";
import carticon from '../assets/icons/cart.png'

// ✅ Button Component
function Button({
  children,
  className = "",
  variant = "default",
  size = "md",
  ...props
}) {
  const base = "rounded-xl transition font-medium";
  const variants = {
    default: "bg-black text-white hover:bg-gray-900",
    outline: " text-gray-800 hover:bg-gray-100",
    ghost: "text-gray-600 hover:bg-gray-100",
  };
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2",
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

// ✅ Card Wrapper
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl shadow  ${className}`}>{children}</div>
  );
}

// ✅ Card Inner Padding
function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

function CartPage() {
  const { cart, updateQuantity, removeItem, addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 6.99 : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}api/products/`);
        setProducts(res.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-[#fafafa] min-h-screen p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24 px-4 bg-gray-50 rounded-lg  shadow-sm">
            <img

              src={carticon}

             

              alt="Empty cart"
              className="w-40 h-40 object-contain mb-6"
            />
            <h2 className="text-xl font-semibold text-black mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-black max-w-md">

              Looks like you haven’t added anything yet. Explore our handmade art collection!
            </p>
            <Button className="mt-6"
              onClick={() => navigate("/productlist")}
            >Browse Products</Button>


          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">



              {cart.map((item) => (
                <Card
                  key={item.id}
                  className="bg-white shadow-sm rounded-lg p-4 flex items-start gap-4"

                >                <img

                    src={item.images?.[0]?.image_url || ""}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg "
                  />
                  <div className="flex-1">
                    <h2 className="font-medium text-base mb-1">{item.name}</h2>
                    <p className="text-gray-500 text-sm mb-2">₹{item.price}</p>
                    <div className="flex items-center gap-2">
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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="ml-auto"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </Button>

                    </div>
                  </div>
                </Card>
              ))}

              {/* Summary Section */}

              <div className="sticky top-6 h-fit">
                <Card>
                  <CardContent className="space-y-4 p-6">
                    <h2 className="text-lg font-semibold  pb-2">Order Summary</h2>
                    <div className="flex justify-between text-sm text-black">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-800">
                      <span>Shipping</span>
                      <span>₹{shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-semibold  pt-2">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                    <Button className="mt-2 w-full sm:w-auto bg-[#F5ede5]  text-black text-sm px-4 py-2 rounded hover:bg-gray-500"
                      disabled={cart.length === 0}>
                      Check Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>



            {/* Recommended Products */}
            <div className="">
              <h2 className="text-xl font-semibold mb-6">Some Recommended Products</h2>

              <div className="space-y-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition"
                  >
                    {/* Product Image */}
                    <img
                      src={product.images?.[0]?.image_url}
                      alt={product.title}
                      className="w-full sm:w-40 h-40 object-cover rounded-lg"
                    />

                    {/* Product Info */}
                    <div className="flex flex-col justify-between flex-grow">
                      <div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {product.title || "Untitled Product"}
                        </h3>

                        {/* Price with MRP */}
                        <div className="text-sm mb-2">
                          <span className="font-semibold text-gray-900 mr-2">
                            ₹{product.price}
                          </span>
                          {product.mrp && (
                            <span className="line-through text-gray-600 text-sm">
                              ₹{product.mrp}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add To Cart */}
                      <button
                        onClick={() => addToCart(product)}
                        className="mt-2 w-full sm:w-auto bg-[#F5ede5]  text-black text-sm px-4 py-2 rounded hover:bg-gray-500"
                      >
                        Add To Cart
                      </button>

                    </div>
                  </div>
                </Card>
              ))}

              {/* Recommended Products */}
              <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4">
                  Some Recommended Products
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className=" rounded-lg p-3 shadow-sm hover:shadow-md bg-white transition"
                    >
                      {/* Category Label */}
                      <span className="inline-block text-xs bg-black text-white px-2 py-0.5 rounded mb-2">
                        {product.category_name || "Product"}
                      </span>

                      {/* Product Image */}
                      <img
                        src={product.images?.[0]?.image_url}
                        alt={product.title}
                        className="w-full h-40 object-cover rounded mb-2"
                      />

                      {/* Title */}
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                        {product.title || "Untitled Product"}
                      </h3>

                      {/* Price with MRP */}
                      <div className="text-sm mb-3">
                        <span className="font-semibold text-gray-900 mr-2">
                          ₹{product.price}
                        </span>
                        {product.mrp && (
                          <span className="line-through text-gray-800 text-xs">
                            ₹{product.mrp}
                          </span>
                        )}
                      </div>

                      {/* Add To Cart */}
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-black text-white text-sm py-2 rounded hover:bg-gray-800"
                      >
                        Add To Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="sticky top-6 h-fit">
              <Card>
                <CardContent className="space-y-4 p-6">
                  <h2 className="text-lg font-semibold  pb-2">Order Summary</h2>
                  <div className="flex justify-between text-sm text-black">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-800">
                    <span>Shipping</span>
                    <span>₹{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold  pt-2">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <Button className="w-full mt-2" disabled={cart.length === 0}>
                    Check Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
