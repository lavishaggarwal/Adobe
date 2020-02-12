import React, { useState } from 'react';
import { connect } from 'react-redux';
import './SearchBar.scss';
import { filterByName } from "../../actions";
import "react-input-range/lib/css/index.css";

const SearchBar = (
    {
        dispatch,
    }
) => {
    const [nameFilter, setNameFilter] = useState("");
    return (
        <>
            <div>
                <div className="md-form form-lg pull-left">
                    <input type="text" id="inputSMEx" className="form-control form-control-sm" onChange={event => {
                        setNameFilter(event.target.value);
                    }} />
                </div>
                <div className="navbar-brand pull-right"
                    onClick={() => {
                        dispatch(filterByName({ nameFilter }))
                    }}><i className="fa fa-search mr-2" aria-hidden="true" /></div>
                <div className="clearfix"></div>
            </div>
        </>
    );
};

export default connect()(SearchBar);