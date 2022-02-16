import React, {useEffect, useState} from "react";

import {useSelector} from "react-redux";
import {Main, PageTitle,} from "../styles/Component.styles";
import Axios from "axios";
import {shuffleArray} from "../lib/helper";
import {v4} from "uuid";
import '../styles/relatedProducts.scss'
import {ProductL, ProductSM} from "./templates/TemplateProducts";


export default function ProductPage() {
    const product = useSelector(state => state.product);

    return (
        <Main>
            <div id="product-page">
                <PageTitle>Product Details</PageTitle>

                {Object.keys(product).length !== 0 ?
                    <>
                        <ProductL product={product}/>

                        <RelatedProducts />
                    </>
                        :
                    'Please select a product!:)'
                }
            </div>
        </Main>
    );
};


function RelatedProducts() {
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/all-books')
            .then(response => {
                shuffleArray(response.data);
                setRelatedProducts(response.data.splice(0, 6));
            })
            .catch(response => {
                console.log(response)
            });
    }, [])

    return (
        <div style={{marginTop: 30}}>
            <h2 className="secondary-title">People who bought this also bought</h2>

            <div className="related-wrap">
                <div className="related-products-container">
                    {relatedProducts.map(product => <ProductSM product={product} key={v4()}/>)}
                </div>
            </div>
        </div>
    )
}