import React from "react"
import { useNavigate } from "react-router-dom"
import ProductPage from "./ProductPage";
const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '/product/1',
    price: '$48',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    breadcrumbs: [
      { id: 1, name: 'Home', href: '/' },
      { id: 2, name: 'Drinkware', href: '/category/drinkware' },
    ],
    images: [
      {
        src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
        alt: 'Main product image',
      },
      {
        src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-product-shot-01.jpg',
        alt: 'Side angle',
      },
      {
        src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-product-shot-02.jpg',
        alt: 'In use',
      },
      {
        src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-product-shot-03.jpg',
        alt: 'Packaging',
      },
    ],
    colors: [
      { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
      { name: 'Clay', class: 'bg-amber-900', selectedClass: 'ring-amber-500' },
    ],
    sizes: [
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: false },
      { name: 'XL', inStock: true },
    ],
    description:
      'This bottle is crafted from sustainable clay and finished with a food-safe glaze.',
    highlights: ['Handmade', 'Eco-friendly materials', 'Food-safe finish'],
    details:
      'Earthenware is a sustainable material that holds up well over time. Each bottle is unique, thanks to its handmade nature.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '/product/2',
    price: '$35',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '/product/3',
    price: '$89',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '/product/4',
    price: '$35',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
]

export default function Products() {
  const navigate = useNavigate();

  const handleClick = (product) => {
    navigate("/productpage", { state: { product } });
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-500 to-gray-100 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-10 text-4xl font-bold tracking-wide text-center text-white">Explore Our Collection</h2>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleClick(product)}
              className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:bg-white/10"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-xl bg-black/30 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              <div className="mt-4 space-y-1 text-center">
                <h3 className="text-lg font-semibold text-white group-hover:underline">{product.name}</h3>
                <p className="text-md font-medium text-gray-300">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
