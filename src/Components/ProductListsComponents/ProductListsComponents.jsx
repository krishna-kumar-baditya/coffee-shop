import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteProducts, productLists } from "../../Redux/Slice/productSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const ProductListsComponent = ({ products }) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Filter products by active status if needed
    // const filteredProducts = products.filter(
    //     (p) => p.isActive && !p.isDeleted
    // );

    const openDeleteModal = (product) => {
        setProductToDelete(product);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setProductToDelete(null);
    };

    const handleDeleteConfirm = () => {
        if (productToDelete) {
            console.log("Deleting product:", productToDelete._id);
            // Simulate API call
            // deleteProduct(productToDelete._id); <-- Your backend call here
            dispatch(deleteProducts(productToDelete._id))
                .unwrap()
                .then((res) => {
                    toast.success(res?.message);
                    navigate("/dashboard/productlists");
                    dispatch(productLists());
                })
                .catch((error) => {
                    toast.error(error?.message);
                });
            // Optional: Remove from UI immediately (optimistic update)
            // You can also trigger a re-fetch after successful deletion
            closeDeleteModal();
        }
    };

    // Handle ESC key press
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            closeDeleteModal();
        }
    };

    return (
        <>
            {/* Main Product List */}
            <div className="p-4 bg-amber-50 min-h-screen w-full">
                {/* Header */}
                <div className="mb-6 text-center w-full">
                    <h1 className="text-2xl font-bold text-amber-900">
                        Our Coffee Products
                    </h1>
                    <p className="text-amber-700 mt-1">
                        Discover our handcrafted blends
                    </p>
                </div>

                <div className="mb-4">
                    <Link
                        to="/dashboard/insertProduct"
                        className=" text-2xl font-bold text-fuchsia-50 rounded-2xl bg-amber-900 py-2 px-2.5 "
                    >
                        Add Product
                    </Link>
                </div>

                {/* Mobile: Product Cards */}
                <div className="lg:hidden space-y-4 w-full">
                    {products.length === 0 ? (
                        <div className="text-center py-12 text-amber-600">
                            No products available.
                        </div>
                    ) : (
                        products.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-2xl shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition-shadow"
                            >
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-lg font-bold text-amber-900 line-clamp-1">
                                            {product.name}
                                        </h2>
                                        <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                                            {product.weight}
                                        </span>
                                    </div>

                                    <p className="text-amber-700 text-sm mb-3 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-amber-800">
                                            ₹{product.price.toFixed(2)}
                                        </span>
                                        {product.discountPrice > 0 ? (
                                            <span className="text-sm text-amber-500 line-through">
                                                ₹
                                                {product.discountPrice.toFixed(
                                                    2
                                                )}
                                            </span>
                                        ) : null}
                                    </div>

                                    <div className="mt-4 flex justify-end gap-2">
                                        <Link
                                            to={`/dashboard/editproductlists/${product._id}`}
                                            className="text-amber-600 hover:text-amber-800 text-sm font-medium p-1 rounded-full hover:bg-amber-50 transition-colors"
                                            aria-label="Edit product"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                        </Link>
                                        <button
                                            onClick={() =>
                                                openDeleteModal(product)
                                            }
                                            className="text-red-500 hover:text-red-700 text-sm font-medium p-1 rounded-full hover:bg-red-50 transition-colors"
                                            aria-label="Delete product"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Desktop: Product Table */}
                <div className="hidden lg:block">
                    <div className="overflow-x-auto rounded-2xl shadow-md bg-white border border-amber-100">
                        <table className="min-w-full divide-y divide-amber-200">
                            <thead className="bg-amber-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-amber-800 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-amber-800 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-amber-100">
                                {products.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-6 py-12 text-center text-amber-600 text-sm"
                                        >
                                            No products available.
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr
                                            key={product._id}
                                            className="hover:bg-amber-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-amber-900">
                                                    {product.name}
                                                </div>
                                                <div className="text-xs text-amber-600 mt-1">
                                                    {product.weight} •{" "}
                                                    {product.roastLevel ||
                                                        "N/A"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 max-w-xs">
                                                <div className="text-sm text-amber-700 line-clamp-2">
                                                    {product.description}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-amber-900">
                                                        ₹
                                                        {product.price.toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                    {product.discountPrice >
                                                        0 && (
                                                        <span className="text-xs text-amber-500 line-through">
                                                            ₹
                                                            {product.discountPrice.toFixed(
                                                                2
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                                <div className="flex justify-center gap-2">
                                                    <Link
                                                        to={`/dashboard/editproductlists/${product._id}`}
                                                        className="text-amber-600 hover:text-amber-800 p-1.5 rounded-full hover:bg-amber-50 transition-colors"
                                                        aria-label="Edit product"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                        </svg>
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            openDeleteModal(
                                                                product
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                                                        aria-label="Delete product"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Custom Delete Confirmation Modal */}
            {deleteModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-opacity-50 backdrop-blur-sm"
                    onKeyDown={handleKeyDown}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-modal-title"
                >
                    {/* Modal Content */}
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 transform transition-all duration-300 scale-100 animate-fadeIn">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2
                                id="delete-modal-title"
                                className="text-2xl font-bold text-amber-900"
                            >
                                Delete Product
                            </h2>
                            <button
                                onClick={closeDeleteModal}
                                className="text-amber-500 hover:text-amber-700 transition-colors"
                                aria-label="Close modal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Body */}
                        <p className="text-amber-800 mb-6 leading-relaxed">
                            Are you sure you want to delete{" "}
                            <strong className="text-amber-900">
                                {productToDelete?.name}
                            </strong>
                            ? This action cannot be undone.
                        </p>

                        {/* Warning Icon */}
                        <div className="flex items-center justify-center mb-6 text-red-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={closeDeleteModal}
                                className="flex-1 py-3 px-6 border border-amber-300 text-amber-800 font-medium rounded-2xl hover:bg-amber-50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="flex-1 py-3 px-6 bg-red-600 text-white font-medium rounded-2xl hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Delete Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductListsComponent;
