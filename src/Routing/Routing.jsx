import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../page/Home/Home";
import SignUp from "../page/Auth/SignUp/SignUp";
import SignIn from "../page/Auth/SignIn/SignIn";
import ForgotPasswordForm from "../page/Auth/ForgotPassword/ForgotPassword";
import Dashboard from "../Dashboards/Dashboard/Dashboard";
import ProductsLists from "../page/ProductsLists/ProductsLists";
import EditProductLists from "../page/EditProductLists/EditProductLists";
import NotFoundPage from "../NotFoundPage";
import CreateProductForm from "../page/CreateProduct/CreateProduct";
import ProfilePage from "../page/Profile/Profile";
import Footer from "../Layout/Footer/Footer";
import Header from "../Layout/Header/Header";
import About from "../page/AboutUs/AboutUs";
import Contact from "../page/Contact/Contact";
import PublicProductShowcase from "../page/Products/Products";
import ProductDetailPage from "../page/ProductDetails/ProductDetails";

function Routing() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/aboutus" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/products" element={<PublicProductShowcase />} />
                    <Route path="/productsdetails/:id" element={<ProductDetailPage />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPasswordForm />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/dashboard/insertProduct"
                        element={<CreateProductForm />}
                    />
                    <Route
                        path="/dashboard/productlists"
                        element={<ProductsLists />}
                    />
                    <Route
                        path="/dashboard/editproductlists/:id"
                        element={<EditProductLists />}
                    />
                    <Route
                        path="/dashboard/profile"
                        element={<ProfilePage />}
                    />
                    {/* Catch-all 404 route — MUST be last! */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default Routing;
