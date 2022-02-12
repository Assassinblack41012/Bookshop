import React from "react";

import {useSelector} from "react-redux";
import {
    BasketButton,
    DescriptionContainer,
    ProductAuthor,
    ProductContainer,
    ProductImage,
    ProductPrice,
    ProductTitle
} from "../Component.styles";
import Product from "../home/Product";


export default function ProductPage() {
    const product2 = useSelector(state => state.product);

    const product = {
        title: 'Clean Code',
        imageUrl: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9780/1323/9780132350884.jpg',
        author: 'Robert Martin',
        price: 16500
    }


    return (
        <div className="main-wrap">
            <div id="product-page">
                <h1 className="page-title">Product Details</h1>

                <Product product={product}/>
            </div>
        </div>
    );
};