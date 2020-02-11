import React, {useState} from 'react';
import {connect} from 'react-redux';
import {formatMoney} from "../../pipes/priceFormatter";
import './Product.scss';
import {addProductToCart} from "../../actions";


const Product = (props) => {
    const {
        name,
        price,
        img_url,
        discount,
        id,
    } = props.item;

    return (
        <div className="card h-100 product">
            <img className="card-img-top product__img" src={img_url} alt={name}/>
            <div className="card-body product__text">
                <h4 className="card-title product__title">
                    {name}
                </h4>
                <h4 className="product__price">₹{formatMoney(price - (price/100)*discount)}</h4>
                <h5 className="product__price strikeText">₹{formatMoney(price)}</h5>
                <p className="card-text product__description">{discount}% off</p>
                <button
                    onClick={() => {
                        props.dispatch(addProductToCart({...props.product}))
                    }}
                    className="btn product__add-to-cart">Add to cart
                </button>
            </div>
        </div>
    );
};

export default connect()(Product);

