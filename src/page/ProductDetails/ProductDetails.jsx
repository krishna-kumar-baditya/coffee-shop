import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../Redux/Slice/productSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
    const { specificProducts } = useSelector((state) => state.prodKey);

    useEffect(() => {
        if (id) {
            dispatch(getProducts(id));
        }
    }, [id, dispatch]);

  if (!specificProducts) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-amber-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-800 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex text-sm text-amber-600" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li>
                <a href="/" className="hover:underline hover:text-amber-800">
                  Home
                </a>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <a
                  href="/products"
                  className="hover:underline hover:text-amber-800"
                >
                  Products
                </a>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <span className="text-amber-900 font-medium">
                  {specificProducts.name}
                </span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Section */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative bg-white p-6 rounded-3xl shadow-lg max-w-md w-full">
              {/* Placeholder Image — Replace with actual product image later */}
              <div className="w-full h-96 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center rounded-2xl">
                <span className="text-8xl text-amber-400">☕</span>
              </div>

              {/* Optional: Add “New” or “Sale” Badge */}
              {specificProducts.discountPrice > 0 && (
                <div className="absolute top-6 left-6 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {Math.round(
                    ((specificProducts.discountPrice - specificProducts.price) /
                      specificProducts.discountPrice) *
                      -100
                  )}
                  % OFF
                </div>
              )}

              {specificProducts.isNew && (
                <div className="absolute top-6 right-6 bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  NEW
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-amber-900 leading-tight">
              {specificProducts.name}
            </h1>

            {specificProducts.weight && (
              <p className="text-amber-700 mt-2 text-lg">
                <strong>Weight:</strong> {specificProducts.weight}
              </p>
            )}

            {specificProducts.roastLevel && (
              <p className="text-amber-700 mt-1">
                <strong>Roast Level:</strong> {specificProducts.roastLevel}
              </p>
            )}

            {/* Price */}
            <div className="mt-6">
              {specificProducts.discountPrice > 0 ? (
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-extrabold text-amber-900">
                    ₹{specificProducts.price.toFixed(2)}
                  </span>
                  <span className="text-xl text-amber-500 line-through">
                    ₹{specificProducts.discountPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-4xl font-extrabold text-amber-900">
                  ₹{specificProducts.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-amber-900 mb-3">
                About This Blend
              </h3>
              <p className="text-amber-800 leading-relaxed text-lg">
                {specificProducts.description}
              </p>
            </div>

            {/* Features / Highlights */}
            {specificProducts.highlights && specificProducts.highlights.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-amber-900 mb-3">
                  Why You’ll Love It
                </h3>
                <ul className="space-y-2">
                  {specificProducts.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-amber-800">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                className="flex-1 py-4 px-6 bg-amber-900 text-white font-bold text-lg rounded-2xl hover:bg-amber-800 transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-300"
              >
                Add to Cart
              </button>
              <button
                className="flex-1 py-4 px-6 bg-white border-2 border-amber-300 text-amber-800 font-bold text-lg rounded-2xl hover:bg-amber-50 hover:border-amber-400 transition-all duration-300"
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-amber-700">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Secure Checkout
              </div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Loved by Coffee Lovers
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Tabs (Optional) */}
        <div className="mt-20 bg-white rounded-3xl shadow-lg p-8 border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center">
            Brewing Guide & Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-3">
                Brew Method
              </h3>
              <p className="text-amber-700 leading-relaxed">
                Best brewed as espresso, pour-over, or French press. Grind fresh
                before brewing for maximum aroma and flavor.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-3">
                Origin & Notes
              </h3>
              <p className="text-amber-700 leading-relaxed">
                Sourced from high-altitude farms in Colombia. Flavor notes:
                chocolate, caramel, and a hint of citrus.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products (Optional) */}
        {/* <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-10">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {specificProducts
              .filter((p) => p._id !== specificProducts._id)
              .slice(0, 3)
              .map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-amber-100 group"
                >
                  <div className="h-40 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                    <span className="text-5xl text-amber-400">☕</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-amber-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-amber-700 text-sm mt-1 line-clamp-1">
                      {p.weight}
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="font-bold text-amber-900">
                        ₹{p.price.toFixed(2)}
                      </span>
                      <Link
                        to={`/product/${p._id}`}
                        className="text-amber-600 hover:text-amber-800 font-medium text-sm"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetailPage;