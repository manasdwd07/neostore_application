import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../api/api';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { getProductBySearchText } from '../../api/api';
import { getSpecificProduct } from '../../api/api';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            login: false,
            searchText: [],
            products: [],
            searchValue: ''
        }
    }

    // Logout Handler
    handleLogout = () => {

        localStorage.removeItem('loginUserData');
        localStorage.removeItem('editAddress');
        localStorage.removeItem('specificProductId');
        localStorage.setItem('cart', [[]])

        this.setState({ login: false })


    }

    // Getting login status of user on component mount
    async componentDidMount() {
        const originalArray = await getAllProducts();
        this.setState({ products: originalArray ? originalArray.data.product_details : [] })




        if (this.props.login === 'true') {
            this.setState({
                login: true
            })
        }
        else {
            this.setState({
                login: false
            })
        }





    }


    clickHandler = async (id) => {
        await getSpecificProduct(id)
            .then(res => {
                localStorage.setItem('specificProduct', id)
                this.props.history.push('/specificProduct')
            })


    }


    // For getting products on basis of search text
    handleSearchText = async e => {
        const array = this.state.products;


        try {
            // ------------------------------

            let value = e.target.value;
            this.setState({ searchValue: value })
            // const filterValue=value.toUpperCase();


            for (var i = 0; i < array.length; i++) {

            }



            // ---------------------------------

            let result = await getProductBySearchText(value);
            this.setState({
                searchText: Array.isArray(result.data.product_details)
                    ? result.data.product_details
                    : [{ product_name: "No Data Found" }]
            });

        } catch (error) {
            // alert(error);
        }
    };



    render() {

        const localCartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem("cart")) : []
        const cartCount = localCartData.length;
        return (

            <header className="top_header">

                <nav className="navbar navbar-inverse" style={{ backgroundColor: "black" }}>
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <div className="navbar-brand" href="#"><span style={{ color: "white" }}>Neo</span><span className="top_header_store">STORE</span></div>
                        </div>
                        {/* <div className="nav navbar-nav navbar-expand"> */}

                            {/* ------------- */}


                            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent15"
                            aria-controls="navbarSupportedContent15" aria-expanded="true" aria-label="Toggle navigation"><i className="navbar-toggler-icon">{DehazeIcon}</i></button>

 
                            <div className="collapse navbar-collapse" id="navbarSupportedContent15">

    
                                <ul className="navbar-nav ">
                                        <li className="nav-item active">
                                            <Link to="/" className="btn top_header_buttons">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/products" className="btn top_header_buttons">Products</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/order" className="btn top_header_buttons">Orders</Link>
                                        </li>
                                </ul>
    

                            </div> */}
  




                            <div className="nav navbar-nav navbar-expand">
                                <ul className="navbar-nav">
                                    <Link to="/" className="btn top_header_buttons">Home</Link>
                                    <Link to="/products" className="btn top_header_buttons">Products</Link>
                                    <Link to="/order" className="btn top_header_buttons">Orders</Link>
                                </ul>
                            </div>

                            {/* </div> */}
                            <form className="navbar-form navbar-left top_header_searchBox">
                                <div className="nav navbar">

                                    <SearchBar />

                                </div>
                            </form>
                            <div className="nav navbar-nav">
                                <Link to="/cart" className="btn top_header_cartButton">
                                    <i className="fa fa-shopping-cart"></i>&nbsp;
                                <span ><sup className="top_header_cart_count">{cartCount}</sup></span>
                                    <span>Cart</span>
                                </Link>
                            </div>
                            <div className="dropdown nav top_header_right">
                                <button className="btn top_header_userButton dropdown-toggle" data-toggle="dropdown" id="dropdownMenuButton">
                                    <span><i className="fa fa-user"></i></span>&nbsp;
    
                            </button>
                                {this.props.login === 'true' ? <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                                    <Link className="dropdown-item" to="/profile">Profile</Link>
                                    <Link className="dropdown-item" to="/login" onClick={this.handleLogout}>Logout</Link>
                                </div> :
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                                        <Link className="dropdown-item" to="/login">Login</Link>
                                        <Link className="dropdown-item" to="/register">Register</Link>
                                    </div>
                                }

                            </div>
                        
                    </div>
                </nav>

            </header>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.cartCount
    }
}

export default connect(mapStateToProps)(Header)
