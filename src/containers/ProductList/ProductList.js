import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from "../../components/Product/Product";
import { filterByPrice } from "../../pipes/FilterByPrice";
import { filterByName } from "../../pipes/FilterByName";
import './ProductList.scss';

class ProductList extends Component {

    state = {
        items: [],
        sortFilter: "",
    };


    componentDidMount() {
        fetch("https://api.myjson.com/bins/qzuzi")
            .then(res => res.json())
            .then(
                (result) => {
                    result.map(item => item.isAddedToCart = false);
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    sortByPrice = (n) => {
        let _filteredItems = this.state.items;
        _filteredItems.sort(function (a, b) {
            return parseFloat(a.price) - parseFloat(b.price);
        });
        if (n === "LowHigh") {
            this.setState({ items: _filteredItems, sortFilter: "asc" });
        }
        else {
            this.setState({ items: _filteredItems.reverse(), sortFilter: "desc" });
        }
    };

    sortByDiscount = (n) => {
        let _filteredItems = this.state.items;
        _filteredItems.sort(function (a, b) {
            return parseFloat(b.discount) - parseFloat(a.discount);
        });
        this.setState({ items: _filteredItems, sortFilter: "discount" });
    };

    filterProps = (data) => {
        if (this.state.sortFilter == "asc") {
            data.sort(function (a, b) {
                return parseFloat(a.price) - parseFloat(b.price);
            });
        }
        else if (this.state.sortFilter == "desc") {
            data.sort(function (a, b) {
                return parseFloat(a.price) - parseFloat(b.price);
            }).reverse();
        }
        else if (this.state.sortFilter == "discount") {
            data.sort(function (a, b) {
                return parseFloat(b.discount) - parseFloat(a.discount);
            });
        }
        this.setState({ items: data, sortFilter: "" });
    }


    render() {
        return (
            <div className="col-lg-9">
                <div className="row mb-3">
                    <div className="col-12 d-none d-lg-block d-xl-block">
                        <div className="d-flex justify-content-start">
                            <span className="mr-3">Sort By: </span>
                            <div className="col-3"><a href="javascript:void(0)" onClick={() => this.sortByPrice("HighLow")}>Price -- High Low</a></div>
                            <div className="col-3"><a href="javascript:void(0)" onClick={() => this.sortByPrice("LowHigh")}>Price -- Low High</a></div>
                            <div className="col-3"><a href="javascript:void(0)" onClick={() => this.sortByDiscount()}>Discount</a></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        this.props.mode === "Filter" ?
                            this.props.items && this.props.items.length > 0 ?
                                this.state.sortFilter == "" ?
                                    this.props.items.map(item => {
                                        return (<div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                                            <Product key={item.id} item={item} />
                                        </div>)
                                    }) : this.filterProps(this.props.items)
                                :
                                <div className="alert alert-warning customMargin" role="alert">No items found</div>
                            :
                            this.props.items && this.props.items.length > 0 ?
                                this.props.items.map(item => {
                                    return (<div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                                        <Product key={item.id} item={item} />
                                    </div>)
                                }) :
                                this.state.items.map(item => {
                                    return (<div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                                        <Product key={item.id} item={item} />
                                    </div>)
                                })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const priceFilter = state.orderBy;
    const nameFilter = state.nameFilter;
    const filterByNameArr = filterByName(state.shop.items, nameFilter);
    const filterByOrderArr = filterByPrice(filterByNameArr, priceFilter);
    var _mode = "Load";
    if (priceFilter !== "" || nameFilter !== "") {
        _mode = "Filter";
    }
    return { items: (filterByOrderArr !== undefined ? filterByOrderArr : []), mode: _mode }
};

export default connect(mapStateToProps)(ProductList);
