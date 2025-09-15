import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productLists } from "../../Redux/Slice/productSlice";
import { useEffect } from "react";
const PublicProductShowcase = () => {
        const dispatch = useDispatch();
    const {products} = useSelector((state)=> state.prodKey)
    useEffect(()=>{
        dispatch(productLists())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div className="py-12 px-4 bg-gradient-to-b from-amber-50 to-white min-h-screen">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-900 tracking-tight">
          Our Finest Coffee Blends
        </h1>
        <p className="text-lg text-amber-700 mt-4 max-w-2xl mx-auto leading-relaxed">
          Handcrafted with love, roasted to perfection. Discover the aroma that
          awakens your soul.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-white rounded-3xl shadow-lg border border-amber-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-amber-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.268M8 4L7 5m9 0v5.268M8 4l1 1m8-1l-1 1"
                />
              </svg>
              <h3 className="text-xl font-semibold text-amber-800 mb-2">
                Brewing Something Special...
              </h3>
              <p className="text-amber-600">No products available right now.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-amber-100 hover:border-amber-300 flex flex-col"
              >
                {/* Product Image Placeholder (You can replace with actual image later) */}
                <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <span className="text-amber-400 text-4xl">
                    ☕
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-amber-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    {product.weight && (
                      <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded-full">
                        {product.weight}
                      </span>
                    )}
                  </div>

                  <p className="text-amber-700 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="mb-4">
                    {product.discountPrice > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-extrabold text-amber-900">
                          ₹{product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-amber-500 line-through">
                          ₹{product.discountPrice.toFixed(2)}
                        </span>
                        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                          {Math.round(
                            ((product.discountPrice - product.price) /
                              product.discountPrice) *
                              -100
                          )}
                          % OFF
                        </span>
                      </div>
                    ) : (
                      <span className="text-2xl font-extrabold text-amber-900">
                        ₹{product.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={`/productsdetails/${product._id}`}
                      className="flex-1 py-3 px-4 bg-amber-900 text-white font-semibold rounded-2xl text-center hover:bg-amber-800 transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                      View Details
                    </Link>
                    <button
                      className="p-3 bg-white border-2 border-amber-300 text-amber-700 rounded-2xl hover:bg-amber-50 hover:border-amber-400 hover:text-amber-900 transition-all duration-300"
                      aria-label="Add to cart"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicProductShowcase;