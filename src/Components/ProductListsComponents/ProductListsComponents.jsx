import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteProducts, productLists } from "../../Redux/Slice/productSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const ProductListsComponent = ({
    products,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    limit,
}) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const dispatch = useDispatch();

    const getDiscountedPrice = (price, discountPercent) => {
        if (!discountPercent || discountPercent <= 0) return null;
        return price - (price * discountPercent) / 100;
    };

    const openDeleteModal = (product) => {
        setProductToDelete(product);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setProductToDelete(null);
    };

    const handleDeleteConfirm = () => {
        if (!productToDelete) return;

        dispatch(deleteProducts(productToDelete._id))
            .unwrap()
            .then((res) => {
                toast.success(res?.message);
                dispatch(productLists({ page: currentPage, limit }));
            })
            .catch((error) => {
                toast.error(error?.message);
            });

        closeDeleteModal();
    };

    return (
        <>
            <div className="p-6 bg-amber-50 min-h-screen w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-amber-900">
                        Product Management
                    </h1>

                    <Link
                        to="/dashboard/insertProduct"
                        className="bg-amber-900 text-white px-4 py-2 rounded-xl"
                    >
                        Add Product
                    </Link>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto rounded-2xl shadow-md bg-white border border-amber-100">
                    <table className="min-w-full divide-y divide-amber-200">
                        <thead className="bg-amber-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-amber-800 uppercase">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-amber-800 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-amber-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-8">
                                        Loading...
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center py-8 text-amber-600"
                                    >
                                        No products found.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product._id}>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-amber-900">
                                                {product.title}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 max-w-xs">
                                            <div className="text-sm text-amber-700 line-clamp-2">
                                                {product.description}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="text-amber-900 font-semibold">
                                                    ₹{product.price.toFixed(2)}
                                                </span>

                                                {product.discountPercent > 0 && (
                                                    <span className="text-xs text-amber-500 line-through">
                                                        ₹
                                                        {getDiscountedPrice(
                                                            product.price,
                                                            product.discountPercent
                                                        ).toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center gap-3">
                                                <Link
                                                    to={`/dashboard/editproductlists/${product._id}`}
                                                    className="text-amber-600 hover:text-amber-800"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        openDeleteModal(product)
                                                    }
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <button
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage((prev) => prev - 1)
                            }
                            className="px-4 py-2 bg-amber-200 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() =>
                                        setCurrentPage(pageNumber)
                                    }
                                    className={`px-4 py-2 rounded ${
                                        currentPage === pageNumber
                                            ? "bg-amber-900 text-white"
                                            : "bg-amber-100"
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() =>
                                setCurrentPage((prev) => prev + 1)
                            }
                            className="px-4 py-2 bg-amber-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* DELETE MODAL */}
            {deleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">
                            Delete Product
                        </h2>

                        <p className="mb-6">
                            Are you sure you want to delete{" "}
                            <strong>
                                {productToDelete?.title}
                            </strong>
                            ?
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={closeDeleteModal}
                                className="flex-1 py-2 border rounded-xl"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDeleteConfirm}
                                className="flex-1 py-2 bg-red-600 text-white rounded-xl"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductListsComponent;
