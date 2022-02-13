import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {v4} from "uuid";

import '../styles/basket.scss'
import {BasketButton, Main, PageTitle} from "../styles/Component.styles";
import {numberWithSpaces} from "../lib/helper";
import styled from "styled-components";
import {useAlert} from "react-alert";
import {addProductToBasket, checkout, removeProductFromBasket} from "../redux/actions/basketActions";
import {Link, useNavigate} from "react-router-dom";
import {select} from "../redux/actions/productActions";
import {setBoughtAmount, updateMember} from "../redux/actions/userActions";

const BasketDetails = styled.div`
  padding: 10px;
  letter-spacing: 0;

`;

const BasketDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Basket() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const basket = useSelector(state => state.basket)
    const user = useSelector(state => state.user)

    let productsNum = 0;
    let sum = 0;

    basket.forEach(product => {
        productsNum += product.quantity;
        if (user.isMember) {
            sum += product.quantity * Math.round(product.price * 0.9);
        } else {
            sum += product.quantity * product.price;
        }
    })

    useEffect(() => {
        document.title = "Your basket"
    }, []);

    async function handleCheckout() {
        if (!user.isLoggedIn) {
            navigate('/join')
            alert.error('You have to be an user to buy products!');
            return;
        }

        dispatch(checkout());
        dispatch(setBoughtAmount(user.boughtAmount + productsNum))
        dispatch(updateMember());


        alert.success('Checkout successful!');
    }

    return (
        <Main>
            <PageTitle>Your basket</PageTitle>

            <div className="basket-page-wrap">
                {basket.length !== 0 ?
                    <BasketDetailsContainer>
                        <BasketDetails>
                            <img src="https://image.flaticon.com/icons/png/512/68/68892.png" alt={'basket'}
                                 style={{width: '20px', display: 'inline', marginRight: 5, marginBottom: 6}}/>
                            <span>
                                 You have {productsNum} item{productsNum === 1 ? '' : 's'} for a total of <b>{numberWithSpaces(sum)}</b> Ft in your basket.
                            </span>
                        </BasketDetails>

                        <BasketButton w={200} h={40} onClick={handleCheckout}>
                            Checkout
                        </BasketButton>
                    </BasketDetailsContainer>
                    :
                    <div className="basket-empty">Your basket is empty!</div>
                }

                <div className="basket-page-container">
                    {basket.length !== 0 ?
                        basket.map(product => <BasketProduct product={product} key={v4()}/>)
                        :
                        null
                    }
                </div>
            </div>
        </Main>

    )
}

function BasketProduct({product}) {
    const dispatch = useDispatch();
    const isMember = useSelector(state => state.user.isMember);


    return (
        <div className="basket-product-wrap">
            <Link to={`/product/${product.title}`} onClick={() => dispatch(select(product))}>
                <img className='product-image' src={product.imageUrl} alt="alt"/>
            </Link>

            <div className='product-description-container'>
                <Link to={`/product/${product.title}`} onClick={() => dispatch(select(product))}>
                    <h3 className="product-title">{product.title}</h3>
                </Link>

                <h4 className="product-author">{product.author}</h4>
                <div className="price-container">
                    {isMember ?
                        <h3 className="original-price">{numberWithSpaces(isMember ? product.price : '')} Ft</h3>
                        : null
                    }

                    <h2 className="product-price">
                        {numberWithSpaces(isMember ? Math.round(product.price * 0.9) : product.price)} Ft
                    </h2>
                </div>
            </div>

            <div className="product-actions-container">
                <div className="quantity-wrap">
                    <span>Quantity: {product.quantity}</span>
                    <button className="product-quantity" onClick={() => dispatch(addProductToBasket(product))}>
                        +
                    </button>
                </div>
                <h3 className="product-price">{numberWithSpaces(isMember ? product.quantity * Math.round(product.price * 0.9) : product.quantity * product.price)} Ft</h3>
                <button className="product-remove" onClick={() => dispatch(removeProductFromBasket(product.title))}>
                    Remove
                </button>
            </div>
        </div>
    );
}