import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../../App.css'
import SearchBar from '../SearchBar/SearchBar'

const Header = ({ cartLength }) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mainHeader fixed-top">
            <div className="container">
                <NavLink className="navbar-brand" to="/"><i className="fa fa-star mr-2" aria-hidden="true" /></NavLink>

                <div>
                    <SearchBar />
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/cart"}><i className="fa fa-shopping-cart mr-2"
                                aria-hidden="true" />{cartLength ? `(${cartLength})` : ''}</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};


const mapStateToProps = (state) => {
    return {
        cartLength: state.shop.cart.length
    }
};

export default connect(mapStateToProps, null)(Header);