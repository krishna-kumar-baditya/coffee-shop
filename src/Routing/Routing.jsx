import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { checkToken } from "../Redux/Slice/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const Home = lazy(()=>import("../page/Home/Home"));
const SignUp = lazy(()=>import("../page/Auth/SignUp/SignUp"));
const SignIn = lazy(()=>import("../page/Auth/SignIn/SignIn"));
const ForgotPasswordForm = lazy(()=>import("../page/Auth/ForgotPassword/ForgotPassword"));
const Dashboard = lazy(()=>import("../Dashboards/Dashboard/Dashboard"));
const ProductsLists = lazy(()=>import("../page/ProductsLists/ProductsLists"));
const EditProductLists = lazy(()=>import("../page/EditProductLists/EditProductLists"));
const NotFoundPage = lazy(()=>import("../NotFoundPage"));
const CreateProductForm = lazy(()=>import("../page/CreateProduct/CreateProduct"));

const ProfilePage = lazy(()=>import("../page/Profile/Profile"));

import Footer from "../Layout/Footer/Footer";
import Header from "../Layout/Header/Header";
const About = lazy(()=>import("../page/AboutUs/AboutUs"));

const Contact = lazy(()=>import("../page/Contact/Contact"));

const PublicProductShowcase = lazy(()=>import("../page/Products/Products"));

const ProductDetailPage = lazy(()=>import("../page/ProductDetails/ProductDetails"));

function Routing() {
    const dispatch = useDispatch();
    const PublicRoutesNames = [
        {
            path: "/",
            component: <Home />,
        },
        {
            path: "/products",
            component: <PublicProductShowcase />,
        },
        {
            path: "/productsdetails/:id",
            component: <ProductDetailPage />,
        },
        {
            path: "/signup",
            component: <SignUp />,
        },
        {
            path: "/signin",
            component: <SignIn />,
        },
        {
            path: "/aboutus",
            component: <About />,
        },
        {
            path: "/contact",
            component: <Contact />,
        },
        {
            path: "/forgot-password",
            component: <ForgotPasswordForm />,
        },
    ];
    const PrivateRoutesName = [
        {
            path: "/dashboard",
            component: <Dashboard />,
        },
        {
            path: "/dashboard/insertProduct",
            component: <CreateProductForm />,
        },
        {
            path: "/dashboard/productlists",
            component: <ProductsLists />,
        },
        {
            path: "/dashboard/editproductlists/:id",
            component: <EditProductLists />,
        },
        {
            path: "/dashboard/profile",
            component: <ProfilePage />,
        },
    ];
    useEffect(() => {
        dispatch(checkToken());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function PrivateRoute({ children }) {
        const token = localStorage.getItem("token");
        return token !== null && token !== undefined && token !== ""? (
            children
        ) : (
            <Navigate to={`/signin`} />
        );
    }
    return (
        <>
            <Router>
                {/* <Header /> */}
                <Suspense fallback="Loading...">
                    <Routes>
                        {PublicRoutesNames?.map((route, index) => {
                            return (
                                <Route
                                    key={index + 1}
                                    exact
                                    path={route?.path}
                                    element={route?.component}
                                />
                            );
                        })}
                        {PrivateRoutesName?.map((route, index) => {
                            return (
                                <Route
                                    key={index + 2}
                                    path={route?.path}
                                    element={
                                        <PrivateRoute>
                                            {route?.component}
                                        </PrivateRoute>
                                    }
                                />
                            );
                        })}
                        {/* Catch-all 404 route — MUST be last! */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
                <Footer />
            </Router>
        </>
    );
}

export default Routing;
