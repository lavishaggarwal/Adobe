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
        <div className="h-100 product">
            <img className="card-img-top product__img" src={img_url} alt={name}/>
            <div className="card-body product__text">
                <h4 className="card-title product__title">
                    {name}
                </h4>
                <div className="pull-left"><span className="product__price">₹{formatMoney(price - (price/100)*discount)}</span>
                <span className="product__price strikeText">₹{formatMoney(price)}</span>
                </div>
                <div className="pull-right"><p className="card-text product__description">{discount}% off</p></div>
                <div className="clearfix"></div>
                <div className="text-right"><button
                    onClick={() => {
                        props.dispatch(addProductToCart({...props.item}))
                    }}
                    className="btn product__add-to-cart">Add to cart
                </button>
                </div>
            </div>
        </div>
    );
};

export default connect()(Product);

