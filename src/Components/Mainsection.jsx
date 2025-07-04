import React from "react"

const features = [
  { name: 'Origin', description: 'Designed by Good Goods, Inc.' },
  { name: 'Material', description: 'Solid walnut base with rare earth magnets and powder coated steel card cover' },
  { name: 'Dimensions', description: '6.25" x 3.55" x 1.15"' },
  { name: 'Finish', description: 'Hand sanded and finished with natural oil' },
  { name: 'Includes', description: 'Wood card tray and 3 refill packs' },
  { name: 'Considerations', description: 'Made from natural materials. Grain and color vary with each item.' },
]

export default function Mainsection() {
  return (
    <div className="bg-gradient-to-r from-black via-gray-500 to-gray-100 text-white shadow-lg">
    <div className="relative overflow-hidden">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Summer styles are finally here
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Discover our brand new summer collection, designed to turn heads and keep you cool under pressure.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:translate-x-8 lg:-translate-y-1/2">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg shadow-lg sm:opacity-0 lg:opacity-100">
                        <img
                          alt=""
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg shadow-lg">
                        <img
                          alt=""
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg shadow-lg">
                        <img
                          alt=""
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg shadow-lg">
                        <img
                          alt=""
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg shadow-lg">
                        <img
                          alt=""
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg shadow-lg">
                        <img
                          alt=""
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg shadow-lg">
                        <img
                          alt=""
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="/products"
                className="inline-block mt-12 rounded-md border border-white bg-white px-8 py-3 text-center font-semibold text-black transition hover:bg-black hover:text-white hover:border-white"
              >
                Shop Collection
              </a>
            </div>
          </div>
        </div>
      </div>
    </div><br />
<div className="flex justify-center text-3xl font-serif tracking-tight text-white sm:text-4xl underline">
  New arrivals
</div>
  
  <div className=" shadow-lg">
      
      

  <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8 ">
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Technical Specifications</h2>
      <p className="mt-4 text-white">
        The walnut wood card tray is precision milled to perfectly fit a stack of Focus cards. The powder coated
        steel divider separates active cards from new ones, or can be used to archive important task lists.
      </p>

      <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
        {features.map((feature) => (
          <div key={feature.name} className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-white">{feature.name}</dt>
            <dd className="mt-2 text-sm text-white">{feature.description}</dd>
          </div>
        ))}
      </dl>
    </div>
    <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
      <img
        alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
        src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-01.jpg"
        className="rounded-lg bg-gray-100"
      />
      <img
        alt="Top down view of walnut card tray with embedded magnets and card groove."
        src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-02.jpg"
        className="rounded-lg bg-gray-100"
      />
      <img
        alt="Side of walnut card tray with card groove and recessed card area."
        src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-03.jpg"
        className="rounded-lg bg-gray-100"
      />
      <img
        alt="Walnut card tray filled with cards and card angled in dedicated groove."
        src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-04.jpg"
        className="rounded-lg bg-gray-100"
      />
    </div>
  </div>
</div>
</div>
  )
}
