import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Dashboard from "../../Dashboards/Dashboard/Dashboard";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts, updateProducts } from "../../Redux/Slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

function EditProductLists() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            price: "",
            discountPercent: "",
            stock: "",
            brand: "",
            category: "",
            images: [],
        },
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { specificProducts, loading, error } = useSelector(
        (state) => state.prodKey,
    );

    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    const [imagePreview, setImagePreview] = useState([]);
    const existingImagesRef = useRef([]);

    /* ---------------------------------------
     Fetch Product
  ----------------------------------------*/
    useEffect(() => {
        if (id) dispatch(getProducts(id));
    }, [id, dispatch]);

    /* ---------------------------------------
     Populate Form
  ----------------------------------------*/
    useEffect(() => {
        if (specificProducts) {
            reset({
                title: specificProducts.title || "",
                description: specificProducts.description || "",
                price: specificProducts.price || "",
                discountPercent: specificProducts.discountPercent || "",
                stock: specificProducts.stock || "",
                brand: specificProducts.brand || "",
                category: specificProducts.category?._id || "",
            });

            const images = specificProducts.images || [];
            existingImagesRef.current = images;
            setImagePreview(images);
        }
    }, [specificProducts, reset]);

    /* ---------------------------------------
     Handle Image Change (Multiple)
  ----------------------------------------*/
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        const validFiles = files.filter((file) => {
            if (!allowedTypes.includes(file.type)) {
                toast.error("Only JPG, JPEG, PNG allowed.");
                return false;
            }
            if (file.size > MAX_FILE_SIZE) {
                toast.error("File exceeds 5MB.");
                return false;
            }
            return true;
        });

        if (!validFiles.length) return;

        setValue("images", validFiles);
        setImagePreview(validFiles.map((file) => URL.createObjectURL(file)));
    };

    /* ---------------------------------------
     Remove Existing Image
  ----------------------------------------*/
    const removeImage = (index) => {
        const updated = [...imagePreview];
        updated.splice(index, 1);
        setImagePreview(updated);
        existingImagesRef.current = updated;
    };

    /* ---------------------------------------
     Submit
  ----------------------------------------*/
    const onSubmit = (data) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("discountPercent", data.discountPercent || 0);
        formData.append("stock", data.stock);
        formData.append("brand", data.brand);
        formData.append("category", data.category);

        // New images
        if (data.images && data.images.length > 0) {
            data.images.forEach((file) => {
                formData.append("images", file);
            });
        }

        // Existing images
        if (existingImagesRef.current.length > 0) {
            formData.append(
                "existingImages",
                JSON.stringify(existingImagesRef.current),
            );
        }

        dispatch(updateProducts({ id, formData }))
            .unwrap()
            .then(() => {
                toast.success("Product updated successfully");
                navigate("/dashboard/productlists");
            })
            .catch((err) => {
                toast.error(err || "Update failed");
            });
    };

    /* ---------------------------------------
     UI States
  ----------------------------------------*/
    if (loading) {
        return (
            <Dashboard>
                <div className="flex items-center justify-center min-h-screen">
                    Loading...
                </div>
            </Dashboard>
        );
    }

    if (error) {
        return (
            <Dashboard>
                <div className="flex items-center justify-center min-h-screen text-red-600">
                    {error}
                </div>
            </Dashboard>
        );
    }

    /* ---------------------------------------
     Render
  ----------------------------------------*/
    return (
        <Dashboard>
            <div className="min-h-screen bg-amber-50 p-6">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-amber-900">
                        Edit Product
                    </h2>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Title */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Title *
                            </label>
                            <input
                                {...register("title", {
                                    required: "Title is required",
                                })}
                                className="w-full border p-3 rounded-xl"
                            />
                            {errors.title && (
                                <p className="text-red-600 text-sm">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Description *
                            </label>
                            <textarea
                                {...register("description", {
                                    required: "Description required",
                                })}
                                className="w-full border p-3 rounded-xl"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Price *
                            </label>
                            <input
                                type="number"
                                {...register("price", {
                                    required: true,
                                    min: 0,
                                })}
                                className="w-full border p-3 rounded-xl"
                            />
                        </div>

                        {/* Discount */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Discount Percent
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("discountPercent", {
                                    min: 0,
                                    max: 99.99,
                                })}
                                className="w-full border p-3 rounded-xl"
                            />
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Stock *
                            </label>
                            <input
                                type="number"
                                {...register("stock", {
                                    required: true,
                                    min: 0,
                                })}
                                className="w-full border p-3 rounded-xl"
                            />
                        </div>

                        {/* Brand */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Brand
                            </label>
                            <input
                                {...register("brand")}
                                className="w-full border p-3 rounded-xl"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Product Images
                            </label>

                            <input
                                type="file"
                                multiple
                                accept="image/png,image/jpg,image/jpeg"
                                onChange={handleImageChange}
                                className="mb-4"
                            />

                            {imagePreview.length > 0 && (
                                <div className="flex gap-4 flex-wrap">
                                    {imagePreview.map((img, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={img}
                                                alt="Preview"
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeImage(index)
                                                }
                                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="text-right">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-amber-800 text-white px-6 py-3 rounded-xl hover:bg-amber-900"
                            >
                                {isSubmitting
                                    ? "Updating..."
                                    : "Update Product"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Dashboard>
    );
}

export default EditProductLists;
