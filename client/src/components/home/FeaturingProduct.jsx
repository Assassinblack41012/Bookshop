import React from "react";
import './featuring.scss';
import {addProductToBasket} from "../../redux/actions/basketActions";
import {useDispatch} from "react-redux";

export function FeaturingProduct( {product} ) {
    const dispatch = useDispatch();

    return (
        <div className="featuring-product">
            <img src={product.imageUrl}
                 className="featuring-product-image" alt="img" />


            <div className="featuring-product-description-wrap">
                <h2 className="product-title">
                    {product.title}
                </h2>

                <h2 className="product-author">
                    {product.author}
                </h2>

                <h2 className="product-price">
                    {numberWithSpaces(product.price)} Ft
                </h2>

                <button className="product-basket-btn"
                        onClick={() => dispatch(addProductToBasket(product))}>
                    +
                </button>
            </div>
        </div>
    );
}

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}