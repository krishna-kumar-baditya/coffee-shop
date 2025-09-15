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
        watch,
        formState: { errors, isSubmitting },
        setValue,
        reset,
    } = useForm({
        defaultValues: {
            name: "",
            description: "",
            price: "",
            discountPrice: "",
            stock: "",
            weight: "250g",
            type: "bean",
            brewGuide: "",
            origin: "India",
            roastLevel: "Medium",
            inStock: true,
            isActive: false,
            image: null, // Single image field
        },
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { specificProducts, loading, error } = useSelector((state) => state.prodKey);
    const { id } = useParams();

    // Watch the single image file
    const watchedImage = watch("image");
    console.log(watchedImage);
    
    // File validation constants
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    // State for existing product image URL (from API)
    const [existingImageUrl, setExistingImageUrl] = useState("");
    // State for preview URL of newly selected file
    const [imagePreview, setImagePreview] = useState("");

    // Ref to store current image URL — persists across renders even if form resets
    const currentImageRef = useRef("");

    // Load product data on ID change
    useEffect(() => {
        if (id) {
            dispatch(getProducts(id));
        }
    }, [id, dispatch]);

    // Reset form and load existing image when product data arrives
    useEffect(() => {
        if (specificProducts) {
            reset({
                name: specificProducts.name || "",
                description: specificProducts.description || "",
                price: specificProducts.price || "",
                discountPrice: specificProducts.discountPrice || "",
                stock: specificProducts.stock || "",
                weight: specificProducts.weight || "250g",
                type: specificProducts.type || "bean",
                brewGuide: specificProducts.brewGuide || "",
                origin: specificProducts.origin || "India",
                roastLevel: specificProducts.roastLevel || "Medium",
                inStock: specificProducts.inStock ?? true,
                isActive: specificProducts.isActive ?? false,
                // 👇 Do NOT set image here — we manage it separately
            });

            // Store current image URL in ref and preview state
            const imageUrl = specificProducts.image || "";
            currentImageRef.current = imageUrl;
            setExistingImageUrl(imageUrl);
            setImagePreview(imageUrl);
        }
    }, [specificProducts, reset]);

    // Handle single image upload
    const handleImageChange = (e) => {
        const file = e.target.files?.[0]; // Only first file
        if (!file) return;

        // Validate file type
        if (!allowedTypes.includes(file.type)) {
            alert("Invalid format. Only JPG, JPEG, PNG allowed.");
            e.target.value = "";
            return;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            alert("File exceeds 5MB limit.");
            e.target.value = "";
            return;
        }

        // Set file in form state
        setValue("image", file, { shouldValidate: true });

        // Generate preview
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        // Clear input to allow re-selecting same file
        e.target.value = "";
    };

    // Remove image
    const removeImage = () => {
        setValue("image", null, { shouldValidate: true });
        setImagePreview("");
    };

    const onSubmit = (data) => {
        const formData = new FormData();

        // Append all non-file fields
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("discountPrice", data.discountPrice || "");
        formData.append("stock", data.stock);
        formData.append("weight", data.weight);
        formData.append("type", data.type);
        formData.append("brewGuide", data.brewGuide || "");
        formData.append("origin", data.origin);
        formData.append("roastLevel", data.roastLevel || "");
        formData.append("inStock", data.inStock);
        formData.append("isActive", data.isActive);

        // ✅ ALWAYS append the current image URL — even if no new file is uploaded
        // If user uploaded a new file → use that File
        // If user didn't upload → use the existing URL stored in ref
        if (data.image instanceof File) {
            // New file uploaded → send as File
            formData.append("image", data.image);
        } else {
            // No new file → send existing URL as string
            formData.append("image", currentImageRef.current);
        }

        // Dispatch update action
        dispatch(updateProducts({ id, formData }))
            .unwrap()
            .then((res) => {
                console.log(res);
                
                toast.success("Product updated successfully!");
                navigate("/dashboard/productlists")
            })
            .catch((err) => {
                toast.err("Failed to update product: " + err);
            });
    };

    // Loading / Error states
    if (loading) {
        return (
            <Dashboard>
                <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 p-4 flex items-center justify-center">
                    <p className="text-amber-800">Loading product details...</p>
                </div>
            </Dashboard>
        );
    }

    if (error) {
        return (
            <Dashboard>
                <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 p-4 flex items-center justify-center">
                    <p className="text-red-600">Error loading product: {error}</p>
                </div>
            </Dashboard>
        );
    }

    if (!specificProducts && !loading) {
        return (
            <Dashboard>
                <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 p-4 flex items-center justify-center">
                    <p className="text-amber-800">Product not found.</p>
                </div>
            </Dashboard>
        );
    }

    return (
        <>
            <Dashboard>
                <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 p-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-amber-900">
                                Edit Product
                            </h1>
                            <p className="mt-2 text-amber-700">
                                Update details for your coffee offering
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-amber-100"
                        >
                            {/* Name */}
                            <div className="mb-6">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-amber-800 mb-2"
                                >
                                    Product Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register("name", {
                                        required: "Product name is required",
                                        maxLength: {
                                            value: 100,
                                            message: "Name cannot exceed 100 characters",
                                        },
                                    })}
                                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 bg-white/90 ${
                                        errors.name
                                            ? "border-red-500 bg-red-50"
                                            : "border-amber-300 hover:border-amber-400 shadow-sm"
                                    }`}
                                    placeholder="e.g., Ethiopian Yirgacheffe"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-amber-800 mb-2"
                                >
                                    Description *
                                </label>
                                <textarea
                                    id="description"
                                    {...register("description", {
                                        required: "Description is required",
                                        maxLength: {
                                            value: 1000,
                                            message: "Description cannot exceed 1000 characters",
                                        },
                                    })}
                                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 bg-white/90 resize-none h-24 ${
                                        errors.description
                                            ? "border-red-500 bg-red-50"
                                            : "border-amber-300 hover:border-amber-400 shadow-sm"
                                    }`}
                                    placeholder="Describe the flavor profile, origin, or brewing method..."
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-amber-800 mb-2"
                                >
                                    Price (₹) *
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    {...register("price", {
                                        required: "Price is required",
                                        min: {
                                            value: 0,
                                            message: "Price cannot be negative",
                                        },
                                    })}
                                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 bg-white/90 ${
                                        errors.price
                                            ? "border-red-500 bg-red-50"
                                            : "border-amber-300 hover:border-amber-400 shadow-sm"
                                    }`}
                                    placeholder="249"
                                    step="0.01"
                                />
                                {errors.price && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.price.message}
                                    </p>
                                )}
                            </div>

                            {/* Discount Price */}
                            <div className="mb-6">
                                <label
                                    htmlFor="discountPrice"
                                    className="block text-sm font-medium text-amber-800 mb-2"
                                >
                                    Discount Price (₹) (Optional)
                                </label>
                                <input
                                    type="number"
                                    id="discountPrice"
                                    {...register("discountPrice", {
                                        min: {
                                            value: 0,
                                            message: "Discount price cannot be negative",
                                        },
                                        validate: (value) =>
                                            !value ||
                                            value < watch("price") ||
                                            "Discount price must be less than regular price",
                                    })}
                                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 bg-white/90 ${
                                        errors.discountPrice
                                            ? "border-red-500 bg-red-50"
                                            : "border-amber-300 hover:border-amber-400 shadow-sm"
                                    }`}
                                    placeholder="219"
                                    step="0.01"
                                />
                                {errors.discountPrice && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.discountPrice.message}
                                    </p>
                                )}
                            </div>

                            {/* Stock */}
                            <div className="mb-6">
                                <label
                                    htmlFor="stock"
                                    className="block text-sm font-medium text-amber-800 mb-2"
                                >
                                    Stock Quantity *
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    {...register("stock", {
                                        required: "Stock quantity is required",
                                        min: {
                                            value: 0,
                                            message: "Stock cannot be negative",
                                        },
                                    })}
                                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 bg-white/90 ${
                                        errors.stock
                                            ? "border-red-500 bg-red-50"
                                            : "border-amber-300 hover:border-amber-400 shadow-sm"
                                    }`}
                                    placeholder="45"
                                />
                                {errors.stock && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.stock.message}
                                    </p>
                                )}
                            </div>

                            {/* Weight */}
                            <div className="mb-6">
                                <label
                                    htmlFor="weight"
                                    className="block text-sm font-medium text-amber-800 mb-2"
                                >
                                    Weight *
                                </label>
                                <select
                                    id="weight"
                                    {...register("weight", {
                                        required: "Weight is required",
                                    })}
                                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 bg-white/90 ${
                                        errors.weight
                                            ? "border-red-500 bg-red-50"
                                            : "border-amber-300 hover:border-amber-400 shadow-sm"
                                    }`}
                                >
                                    <option value="">Select weight</option>
                                    <option value="250g">250g</option>
                                    <option value="500g">500g</option>
                                    <option value="1kg">1kg</option>
                                </select>
                                {errors.weight && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.weight.message}
                                    </p>
                                )}
                            </div>

                            {/* Type */}
                            <div className="mb-6">
                                <label
                                    htmlFor="type"
                                    className="block text-sm font-medium text-amber-800 mb-2"
                                >
                                    Product Type *
                                </label>
                                <select
                                    id="type"
                                    {...register("type", {
                                        required: "Type is required",
                                    })}
                                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 bg-white/90 ${
                                        errors.type
                                            ? "border-red-500 bg-red-50"
                                            : "border-amber-300 hover:border-amber-400 shadow-sm"
                                    }`}
                                >
                                    <option value="">Select type</option>
                                    <option value="bean">Whole Bean</option>
                                    <option value="ground">Ground Coffee</option>
                                    <option value="kit">Brewing Kit</option>
                                    <option value="spice">Spice Blend</option>
                                    <option value="merch">Merchandise</option>
                                    <option value="gift">Gift Set</option>
                                </select>
                                {errors.type && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.type.message}
                                    </p>
                                )}
                            </div>

                            {/* Roast Level */}
                            <div className="mb-6">
                                <label
                                    htmlFor="roastLevel"
                                    className="block text-sm font-medium text-amber-800 mb-2"
                                >
                                    Roast Level (Optional)
                                </label>
                                <select
                                    id="roastLevel"
                                    {...register("roastLevel")}
                                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 bg-white/90 ${
                                        errors.roastLevel
                                            ? "border-red-500 bg-red-50"
                                            : "border-amber-300 hover:border-amber-400 shadow-sm"
                                    }`}
                                >
                                    <option value="">Select roast level</option>
                                    <option value="Light">Light</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Dark">Dark</option>
                                </select>
                            </div>

                            {/* Origin */}
                            <div className="mb-6">
                                <label
                                    htmlFor="origin"
                                    className="block text-sm font-medium text-amber-800 mb-2"
                                >
                                    Origin *
                                </label>
                                <input
                                    type="text"
                                    id="origin"
                                    {...register("origin", {
                                        required: "Origin is required",
                                    })}
                                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 bg-white/90 ${
                                        errors.origin
                                            ? "border-red-500 bg-red-50"
                                            : "border-amber-300 hover:border-amber-400 shadow-sm"
                                    }`}
                                    placeholder="e.g., Ethiopia, Colombia"
                                />
                                {errors.origin && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.origin.message}
                                    </p>
                                )}
                            </div>

                            {/* Brew Guide */}
                            <div className="mb-6">
                                <label
                                    htmlFor="brewGuide"
                                    className="block text-sm font-medium text-amber-800 mb-2"
                                >
                                    Brew Guide (Optional)
                                </label>
                                <textarea
                                    id="brewGuide"
                                    {...register("brewGuide")}
                                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 bg-white/90 resize-none h-24 ${
                                        errors.brewGuide
                                            ? "border-red-500 bg-red-50"
                                            : "border-amber-300 hover:border-amber-400 shadow-sm"
                                    }`}
                                    placeholder="E.g., Use pour-over at 92°C for 3:30 minutes..."
                                />
                            </div>

                            {/* Image Upload — SINGLE FILE ONLY */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-amber-800 mb-2">
                                    Product Image (JPG, JPEG, PNG | Max 5MB)
                                </label>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <label className="relative cursor-pointer flex-1 flex flex-col items-center justify-center border-2 border-dashed border-amber-300 rounded-2xl h-40 hover:border-amber-400 transition-colors group">
                                        <input
                                            type="file"
                                            accept="image/png,image/jpg,image/jpeg"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            key={imagePreview} // Ensures input resets
                                        />
                                        <svg
                                            className="w-10 h-10 text-amber-400 group-hover:text-amber-600 mb-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            ></path>
                                        </svg>
                                        <span className="text-sm text-amber-600 group-hover:text-amber-800">
                                            Click to upload image
                                        </span>
                                        <p className="text-xs text-amber-500 mt-1">
                                            One image only
                                        </p>
                                    </label>

                                    {/* Preview */}
                                    {(imagePreview || existingImageUrl) && (
                                        <div className="flex flex-col items-start gap-2">
                                            <img
                                                src={imagePreview || existingImageUrl}
                                                alt="Product preview"
                                                className="w-20 h-20 object-cover rounded-xl shadow-md border-2 border-amber-200"
                                            />
                                            {imagePreview && (
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="text-red-500 text-sm underline hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* In Stock Toggle */}
                            <div className="mb-6">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        {...register("inStock")}
                                        className="sr-only"
                                    />
                                    <div className="relative inline-block w-12 h-6 mr-3">
                                        <div
                                            className={`absolute inset-0 bg-amber-300 rounded-full transition-colors duration-200 ${
                                                watch("inStock")
                                                    ? "bg-amber-500"
                                                    : ""
                                            }`}
                                        ></div>
                                        <div
                                            className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                                                watch("inStock")
                                                    ? "transform translate-x-6"
                                                    : ""
                                            }`}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-amber-800">
                                        In Stock
                                    </span>
                                </label>
                            </div>

                            {/* Active Toggle */}
                            <div className="mb-6">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        {...register("isActive")}
                                        className="sr-only"
                                    />
                                    <div className="relative inline-block w-12 h-6 mr-3">
                                        <div
                                            className={`absolute inset-0 bg-gray-300 rounded-full transition-colors duration-200 ${
                                                watch("isActive")
                                                    ? "bg-amber-500"
                                                    : ""
                                            }`}
                                        ></div>
                                        <div
                                            className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                                                watch("isActive")
                                                    ? "transform translate-x-6"
                                                    : ""
                                            }`}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-amber-800">
                                        Active (Visible on Site)
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-amber-800 hover:bg-amber-900 disabled:bg-amber-400 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg
                                                className="animate-spin h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Updating...
                                        </>
                                    ) : (
                                        "Update Product"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Dashboard>
        </>
    );
}

export default EditProductLists;