import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup, Radio } from '@headlessui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductPage() {
  const { id } = useParams(); // get product ID from URL
  const [product, setProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://mocki.io/v1/4df98aab-f6cc-454d-982a-3fe4505c6183');
        const data = await res.json();
        const foundProduct = data.find((item) => item.id === id || item._id === id);
        setProduct(foundProduct);
      } catch (error) {
        console.error('Failed to load product:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!product) {
    return (
      <div className="p-10 text-center text-xl font-semibold text-red-600">
        Product not found. Please go back and select a product.
      </div>
    );
  }

  // Default fallback data
  const reviews = { href: '#', average: 4, totalCount: 117 };
  const colors = product.colors || [{ name: 'Default', class: 'bg-gray-200', selectedClass: 'ring-gray-400' }];
  const sizes = product.sizes || [{ name: 'One Size', inStock: true }];
  const images = product.images || [{ src: product.image, alt: product.imageAlt || product.name }];
  const breadcrumbs = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Products', href: '/products' },
  ];
  const highlights = product.highlights || ['Premium quality', 'Great value'];
  const description = product.description || 'A high-quality product with excellent craftsmanship.';
  const details = product.details || 'Designed for durability and style.';
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes.find((size) => size.inStock) || sizes[0]);

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg className="h-5 w-4 text-gray-300" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm text-gray-500">{product.name}</li>
          </ol>
        </nav>

        {/* Main content */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
          <Swiper
            modules={[Navigation, Pagination, Thumbs]}
            navigation
            pagination={{ clickable: true }}
            thumbs={{ swiper: thumbsSwiper }}
            spaceBetween={10}
            className="mb-4 rounded-lg"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-96 object-contain rounded-lg bg-gray-100"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Product details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
              <p className="mt-2 text-gray-700">{description}</p>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                <ul className="mt-2 list-disc pl-4 text-sm text-gray-600">
                  {highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Details</h3>
                <p className="text-sm text-gray-600">{details}</p>
              </div>
            </div>

            {/* Pricing + options */}
            <div>
              <p className="text-3xl font-semibold text-gray-900">{product.price}</p>

              <div className="mt-6">
                <RadioGroup value={selectedColor} onChange={setSelectedColor}>
                  <RadioGroup.Label className="text-sm font-medium text-gray-900">Color</RadioGroup.Label>
                  <div className="mt-2 flex space-x-3">
                    {colors.map((color) => (
                      <Radio
                        key={color.name}
                        value={color}
                        className={({ checked }) =>
                          classNames(
                            checked ? 'ring-black' : 'ring-transparent',
                            'h-8 w-8 rounded-full border border-black/10 ring-2 cursor-pointer'
                          )
                        }
                      >
                        <span className={classNames(color.class, 'h-full w-full rounded-full')} />
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>

                <div className="mt-6">
                  <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                    <RadioGroup.Label className="text-sm font-medium text-gray-900">Size</RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-3 mt-2">
                      {sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ checked }) =>
                            classNames(
                              checked ? 'ring-2 ring-black' : '',
                              !size.inStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
                              'border px-4 py-2 text-sm font-medium rounded-md'
                            )
                          }
                        >
                          {size.name}
                        </Radio>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <button
                  type="button"
                  className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
