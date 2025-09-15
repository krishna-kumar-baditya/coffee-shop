import React, { useEffect } from "react";
import ProductListsComponent from "../../Components/ProductListsComponents/ProductListsComponents";
import Dashboard from "../../Dashboards/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { productLists } from "../../Redux/Slice/productSlice";
function ProductsLists() {
    const dispatch = useDispatch()
    const {products} = useSelector((state)=> state.prodKey)
    useEffect(()=>{
        dispatch(productLists())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <>
            <Dashboard>
                <ProductListsComponent products={products} />
            </Dashboard>
        </>
    );
}

export default ProductsLists;
