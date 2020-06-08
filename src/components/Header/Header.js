import React, { Component, Fragment } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../api/api';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { getProductBySearchText } from '../../api/api';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {getSpecificProduct} from '../../api/api';
import {connect} from 'react-redux';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            login: false,
            searchText: []
        }
    }

    handleLogout = () => {

        localStorage.removeItem('loginUserData');
        localStorage.removeItem('editAddress')
        localStorage.setItem('cart',[[]])   

        this.setState({ login: false })


    }

    componentDidMount() {
        if (this.props.login == 'true') {
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


    clickHandler=async (id)=>{
        const result = await getSpecificProduct(id);
        result.then(res=>{
            localStorage.setItem('specificProduct',id)
            this.props.history.push('/specificProduct')
        })
        

    }

    // handleSearchText = (e) => {
    //     this.setState({
    //         searchText: e.target.value
    //     })

    // }

    // handleClickText = e => {
    //     let data = e.target.value;

    //     // this.props.searchProductId(data);
    //     this.props.history.push("\productdetails")
    //   };


    handleSearchText = async e => {
        try {
            let value = e.target.value;
            
            let result = await getProductBySearchText(value);
            this.setState({
                searchText: Array.isArray(result.data.product_details)
                    ? result.data.product_details
                    : [{ product_name: "No Data Found" }]
            });
            console.log("this is search state", this.state.searchText);

            
        } catch (error) {
            console.log(error);
        }
    };

    

    render() {
        const data1 = localStorage.getItem('loginUserData');
        const userData = JSON.parse(data1);
        const filterOptions = createFilterOptions({
            matchFrom: 'start',
            stringify: option => option.product_name,
          });
        
        
		const localCartData = localStorage.getItem('cart') ?JSON.parse(localStorage.getItem("cart")):[]
		const cartCount = localCartData.length;
        return (
            <header className="top_header">
                <nav className="navbar navbar-inverse" style={{ backgroundColor: "black" }}>
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#"><span style={{ color: "white" }}>Neo</span><span className="top_header_store">STORE</span></a>
                        </div>
                        <div className="nav navbar-nav navbar-expand">
                            <ul className="navbar-nav">
                                <Link to="/" className="btn top_header_buttons">Home</Link>
                                <Link to="/products" className="btn top_header_buttons">Products</Link>
                                <Link to="/order" className="btn top_header_buttons">Orders</Link>
                            </ul>

                        </div>
                        <form className="navbar-form navbar-left top_header_searchBox">
                            <div className="input-group">
                                {/* <input type="text" className="form-control" placeholder="Search..." onChange={(e)=>this.handleSearch(e)}/> */}
                                {/* ----------------------------------------------------------------------------------------- */}






                                <Autocomplete
                                    id="combo-box-demo"
                                    size="small"
                                    options={this.state.searchText}
                                    getOptionLabel={option=>option.product_name}
                                    style={{ width: 300 }}
                                    renderOption={option=>option.product_name}
                                    renderInput={(params) => <TextField {...params} onChange={e=>this.handleSearchText(e)} onClick={(option)=>this.clickHandler(option.product_id)} label="Search" variant="outlined" />}
                                    
                                />


                                {/* --------------------------------------------------------------------------------------------------------- */}
                                <span className="input-group-btn top_header_searchIcon">
                                    <button className="btn btn-default">
                                        <i className="fa fa-search" />
                                    </button>
                                </span>
                            </div>
                        </form>
                        <div className="nav navbar-nav">
                            <Link to="/cart" className="btn top_header_cartButton">
                                <i className="fa fa-shopping-cart"></i>&nbsp;
                                {/* <span ><sup className="top_header_cart_count">{userData?userData.cart_count:this.state.count}</sup></span>
                                 */}
                                <span ><sup className="top_header_cart_count">{cartCount}</sup></span>
                                <span>Cart</span>
                            </Link>
                        </div>
                        <div className="dropdown nav top_header_right">
                            <button className="btn top_header_userButton dropdown-toggle" data-toggle="dropdown" id="dropdownMenuButton">
                                <span><i className="fa fa-user"></i></span>&nbsp;

                            </button>
                            {this.props.login == 'true' ? <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

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

const mapStateToProps=(state)=>{
    return{
        count:state.cartCount
    }
}

export default connect(mapStateToProps)(Header)
