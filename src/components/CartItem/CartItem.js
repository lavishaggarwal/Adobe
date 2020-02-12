import React, { useState } from 'react';
import { connect } from 'react-redux';
import { formatMoney } from "../../pipes/priceFormatter";
import './CartItem.scss';
import { decrementCartQuantity, incrementCartQuantity, removeProductToCart } from "../../actions";

const CartItem = (
    {
        name,
        price,
        description,
        quantity,
        id,
        img_url,
        dispatch,
        discount
    }
) => {
    const [itemQuantity, setItemQuantity] = useState(quantity);
    const removeItem = () => {
        dispatch(removeProductToCart(id));
    };

    const handleQuantityChange = (e) => {
        /*  const value = e.target.value;
          console.log(value)
  
          if(value > 0 && value <= 10) {
              setItemQuantity(value);
              dispatch(addProductToCart(id));
          } */
    };

    const incrementOrDecrement = (e, type) => {
        const value = itemQuantity;
        if (type === 'inc' && value < 10) {
            setItemQuantity(itemQuantity + 1);
            dispatch(incrementCartQuantity(id));
        }
        if (type === 'desc' && value > 1) {
            setItemQuantity(itemQuantity - 1);
            dispatch(decrementCartQuantity(id));
        }
    };


    return (
        <div className="row align-items-center mb-3">
            <div className="col-12 col-sm-12 col-md-2 text-center">
                <img className="img-responsive" src={img_url} style={{ height: '60%', width: '60%' }} alt={description}
                />
            </div>
            <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-5">
                <h5 className="product-name"><strong>{name}</strong></h5>
                <div>
                    <span className="product__price">₹{formatMoney(price - (price / 100) * discount)}</span>
                        <span className="product__price strikeText">₹{formatMoney(price)}</span>
                    <p className="card-text product__description">{discount}% off</p>
                    
                    </div>
            </div>
            <div className="col-12 col-sm-12 text-sm-center col-md-5 product-quantity-container">
                <div className="d-flex">
                <div className="col-4 col-sm-4 col-md-8">
                    <div className="quantity">
                        <input
                            onClick={(e) => { incrementOrDecrement(e, 'inc') }}
                            type="button" value="+" className="plus" />
                        <input
                            onChange={handleQuantityChange}
                            type="number" step="1" max="10" min="1" value={itemQuantity} title="Qty"
                            className="qty"
                            size="4" />
                        <input
                            onClick={(e) => { incrementOrDecrement(e, 'desc') }}
                            type="button" value="-" className="minus" />
                    </div>
                </div>
                <div className="col-2 col-sm-2 col-md-4 text-right">
                    <button
                        onClick={removeItem}
                        type="button" className="btn btn-outline-danger btn-xs">
                        Remove
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default connect()(CartItem);
