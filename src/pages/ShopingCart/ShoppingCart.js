import React from 'react';
import { connect } from 'react-redux';
import { formatMoney } from "../../pipes/priceFormatter";
import CartItem from "../../components/CartItem/CartItem";

const ShoppingCart = (props) => {
    return (
        <>
            <div className="container" style={{ paddingTop: '6rem' }}>
                <div className="row shopping-cart">

                    <div className="col-md-9 card-body">
                        <div className="card">
                        {props.cartItemCount > 0 ? props.cartItems.map(cart => (
                            <CartItem {...cart} img={cart.img_url} key={cart.id} />
                        )) : <h1 className="display-4 mt-5 text-center">There are no products in your cart</h1>}
                        </div>
                    </div>
                    {props.cartItemCount > 0 ?
                        <>
                            <div className="col-md-3 card">
                                <div>Price Details</div>
                                <div className="pull-right" style={{ margin: '10px' }}>
                                    <div className="pull-right" style={{ margin: '5px' }}>
                                        Price: <b>₹{formatMoney(props.itemPrice)}</b>
                                    </div>
                                    <br/>
                                    <div className="pull-right" style={{ margin: '5px' }}>
                                        Discount: <b>₹{formatMoney(props.itemDiscount)}</b>
                                    </div>
                                    <br/>
                                    <div className="pull-right" style={{ margin: '5px' }}>
                                        Total price: <b>₹{formatMoney(props.itemPrice - props.itemDiscount)}</b>
                                    </div>
                                </div>
                            </div>
                        </>
                        : null}
                </div>
            </div>
        </>
    );
};


const mapStateToProps = state => {
    return {
        cartItems: state.shop.cart,
        cartItemCount: state.shop.cart.reduce((count, curItem) => {
            return count + curItem.quantity;
        }, 0),
        itemPrice: state.shop.cart.reduce((count, curItem) => {
            return count + (curItem.price * curItem.quantity);
        }, 0),
        itemDiscount: state.shop.cart.reduce((count, curItem) => {
            return count + (((curItem.price / 100) * curItem.discount) * curItem.quantity);
        }, 0),
    }
}

export default connect(mapStateToProps, null)(ShoppingCart);
