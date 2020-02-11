import React, { useState } from 'react';
import { connect } from 'react-redux';
import './OrderFilter.scss';
import { filterByPrice } from "../../actions";
import "react-input-range/lib/css/index.css";
import InputRange from 'react-input-range';

const OrderFilter = (
    {
        dispatch,
    }
) => {
    const [value, setvalue] = useState({ min: 10, max: 1000 });
    return (
        <>
            <h3>Filters</h3>
            <br />
            <InputRange
                maxValue={1000}
                minValue={10}
                value={value}
                onChange={value => setvalue(value)} />
            <div className="contentCenter">Price</div>
            <br /><br />
            <button
                onClick={() => {
                    dispatch(filterByPrice({ value }))
                }}
                className="btn product__add-to-cart">Apply
                </button>
        </>
    );
};

export default connect()(OrderFilter);