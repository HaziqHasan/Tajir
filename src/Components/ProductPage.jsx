'use client'

import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup, Radio } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductPage() {
  const { state } = useLocation()
  const product = state?.product

  // Handle missing product
  if (!product) {
    return (
      <div className="p-10 text-center text-xl font-semibold text-red-600">
        Product not found. Please go back and select a product.
      </div>
    )
  }

  const reviews = { href: '/productpage', average: 4, totalCount: 117 }

  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.find((size) => size.inStock) || product.sizes[0]
  )

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg className="h-5 w-4 text-gray-300" fill="currentColor" viewBox="0 0 16 20" aria-hidden="true">
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <img src={product.images[0].src} alt={product.images[0].alt} className="hidden w-full rounded-lg object-cover lg:block" />
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <img src={product.images[1].src} alt={product.images[1].alt} className="w-full rounded-lg object-cover" />
            <img src={product.images[2].src} alt={product.images[2].alt} className="w-full rounded-lg object-cover" />
          </div>
          <img src={product.images[3].src} alt={product.images[3].alt} className="w-full rounded-lg object-cover" />
        </div>

        {/* Product details */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>

            {/* Reviews */}
            <div className="mt-6 flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(
                    reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                    'h-5 w-5'
                  )}
                  aria-hidden="true"
                />
              ))}
              <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {reviews.totalCount} reviews
              </a>
            </div>

            {/* Colors */}
            <form className="mt-10">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4 flex gap-x-3">
                  {product.colors.map((color) => (
                    <Radio
                      key={color.name}
                      value={color}
                      className={classNames(
                        color.selectedClass,
                        'relative flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-2 ring-transparent focus:outline-none data-checked:ring-black'
                      )}
                    >
                      <span
                        className={classNames(color.class, 'h-8 w-8 rounded-full border border-black/10')}
                        aria-hidden="true"
                      />
                    </Radio>
                  ))}
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-4 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                >
                  {product.sizes.map((size) => (
                    <Radio
                      key={size.name}
                      value={size}
                      disabled={!size.inStock}
                      className={classNames(
                        size.inStock
                          ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                          : 'cursor-not-allowed bg-gray-50 text-gray-200',
                        'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase'
                      )}
                    >
                      {size.name}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>

              <button
                type="submit"
                className="mt-10 w-full rounded-md bg-indigo-600 px-8 py-3 text-white hover:bg-indigo-700"
              >
                Add to Bag
              </button>
            </form>
          </div>

          {/* Description */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pt-6">
            <div className="space-y-6">
              <p className="text-base text-gray-900">{product.description}</p>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
              <ul className="mt-4 list-disc space-y-2 pl-4 text-sm text-gray-600">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Details</h3>
              <p className="mt-4 text-sm text-gray-600">{product.details}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
