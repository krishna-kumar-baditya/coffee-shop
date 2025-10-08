import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkToken } from "../Redux/Slice/authSlice";

// Lazy imports
const Home = lazy(() => import("../page/Home/Home"));
const SignUp = lazy(() => import("../page/Auth/SignUp/SignUp"));
const SignIn = lazy(() => import("../page/Auth/SignIn/SignIn"));
const ForgotPasswordForm = lazy(() => import("../page/Auth/ForgotPassword/ForgotPassword"));
const Dashboard = lazy(() => import("../Dashboards/Dashboard/Dashboard"));
const ProductsLists = lazy(() => import("../page/ProductsLists/ProductsLists"));
const EditProductLists = lazy(() => import("../page/EditProductLists/EditProductLists"));
const NotFoundPage = lazy(() => import("../NotFoundPage"));
const CreateProductForm = lazy(() => import("../page/CreateProduct/CreateProduct"));
const ProfilePage = lazy(() => import("../page/Profile/Profile"));
const About = lazy(() => import("../page/AboutUs/AboutUs"));
const Contact = lazy(() => import("../page/Contact/Contact"));
const PublicProductShowcase = lazy(() => import("../page/Products/Products"));
const ProductDetailPage = lazy(() => import("../page/ProductDetails/ProductDetails"));

// Layouts
import Footer from "../Layout/Footer/Footer";
import Header from "../Layout/Header/Header";

// Wrapper component to conditionally show Header/Footer
function LayoutWrapper({ children }) {
    const location = useLocation();

    // Hide header/footer on dashboard routes
    const hideHeaderFooter = location.pathname.startsWith("/dashboard");

    return (
        <>
            {!hideHeaderFooter && <Header />}
            {children}
            {!hideHeaderFooter && <Footer />}
        </>
    );
}

function Routing() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkToken());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function PrivateRoute({ children }) {
        const token = localStorage.getItem("token");
        return token ? children : <Navigate to={`/signin`} />;
    }

    const PublicRoutes = [
        { path: "/", component: <Home /> },
        { path: "/products", component: <PublicProductShowcase /> },
        { path: "/productsdetails/:id", component: <ProductDetailPage /> },
        { path: "/signup", component: <SignUp /> },
        { path: "/signin", component: <SignIn /> },
        { path: "/aboutus", component: <About /> },
        { path: "/contact", component: <Contact /> },
        { path: "/forgot-password", component: <ForgotPasswordForm /> },
    ];

    const PrivateRoutes = [
        { path: "/dashboard", component: <Dashboard /> },
        { path: "/dashboard/insertProduct", component: <CreateProductForm /> },
        { path: "/dashboard/productlists", component: <ProductsLists /> },
        { path: "/dashboard/editproductlists/:id", component: <EditProductLists /> },
        { path: "/dashboard/profile", component: <ProfilePage /> },
    ];

    return (
        <Router>
            <LayoutWrapper>
                <Suspense fallback="Loading...">
                    <Routes>
                        {PublicRoutes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.component}
                            />
                        ))}

                        {PrivateRoutes.map((route, index) => (
                            <Route
                                key={index + 100}
                                path={route.path}
                                element={
                                    <PrivateRoute>
                                        {route.component}
                                    </PrivateRoute>
                                }
                            />
                        ))}

                        {/* Catch-all 404 route */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
            </LayoutWrapper>
        </Router>
    );
}

export default Routing;
