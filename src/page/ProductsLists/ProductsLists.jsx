import React, { useEffect, useState } from "react";
import ProductListsComponent from "../../Components/ProductListsComponents/ProductListsComponents";
import Dashboard from "../../Dashboards/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { productLists } from "../../Redux/Slice/productSlice";

function ProductsLists() {
    const dispatch = useDispatch();
    const { products, totalPages, loading } = useSelector(
        (state) => state.prodKey
    );

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;

    useEffect(() => {
        dispatch(productLists({ page: currentPage, limit }));
    }, [dispatch, currentPage]);

    return (
        <Dashboard>
            <ProductListsComponent
                products={products}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                loading={loading}
                limit={limit}
            />
        </Dashboard>
    );
}

export default ProductsLists;
