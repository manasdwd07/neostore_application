import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { getAllProducts, addToCartApi } from '../../api/api';
import { getProductBySearchText } from '../../api/api';
import { getSpecificProduct } from '../../api/api';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import sweetalert2 from 'sweetalert2';


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
    handleLogout = async () => {

        let cartData = localStorage.getItem("cart").length>0
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
        console.log(cartData)
        let finalData=cartData.map(el=>{
            return el.product_id
        })
        
        
        // let quant=cartData.map(el=>{
        //     return finalData.map(data=>{
        //         data.quantity=el.quantity
        //     })
        // })
        
        // let array=[];
        // for(var i=0;i<finalData.length-1;i++){
        //     return array.push( finalData[i]['quantity']=quantity[i])
        // }
        // console.log(array)

        const quantArray=cartData.map(el=>{
            return {'quantity':el.quantity}
        })
        
        for(let i=0;i<finalData.length;i++){
            Object.assign(finalData[i],quantArray[i])
        }
        
        // console.log(quantArray)

        console.log(finalData)
      if (finalData!==null) {
        finalData.push({ flag: "logout" });
        await addToCartApi(finalData).then(()=>{
        localStorage.removeItem('loginUserData');
        localStorage.removeItem('loginData');
        localStorage.removeItem('token');
        localStorage.removeItem('editAddress');
        localStorage.removeItem('specificProductId');
        localStorage.setItem('cart_count',0);
        localStorage.setItem('cart', [[]]);
        this.setState({ login: false })
        // this.props.history.push('/login')

        sweetalert2.fire({
            text:'User logged out successfully'
        })
        
        })
      }else
      { 
        
        localStorage.removeItem('loginUserData');
        localStorage.removeItem('loginData');
        localStorage.removeItem('token');
        localStorage.removeItem('editAddress');
        localStorage.removeItem('specificProductId');
        localStorage.setItem('cart_count',0);
        localStorage.setItem('cart', [[]]);
        this.setState({ login: false })
        // this.props.history.push('/login')

        sweetalert2.fire({
            text:'User logged out successfully'
        })
      }
        
    
        // localStorage.removeItem('loginUserData');
        // localStorage.removeItem('loginData');
        // localStorage.removeItem('token');
        // localStorage.removeItem('editAddress');
        // localStorage.removeItem('specificProductId');
        // localStorage.setItem('cart_count',0);
        // localStorage.setItem('cart', [[]]);

        
        
        // this.props.history.push('/login')


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

    componentDidUpdate(){
        localStorage.setItem('cart_count',localStorage.getItem('cart').length)
    }



    render() {

        const localCartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem("cart")) : []
        const cartCount = localCartData.length;
        // const cartCount=localStorage.getItem('cart_count')
        // const cartCount=this.props.count        
        return (

            <header className="top_header">

                <nav className="navbar navbar-inverse" style={{ backgroundColor: "black" }}>
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <div className="navbar-brand" href="#"><span style={{ color: "white" }}>Neo</span><span className="top_header_store">STORE</span></div>
                        </div>
                       
                            <div className="nav navbar-nav navbar-expand">
                                
                                <div className="nav">
                                    <label for="toggle">&#9776;</label>
                                    <input type="checkbox" id="toggle"/>
                                    <div className="menu">
                                    <Link to="/" className="btn top_header_buttons">Home</Link>
                                    <Link to="/products" className="btn top_header_buttons">Products</Link>
                                    <Link to="/order" className="btn top_header_buttons">Orders</Link>
                                    
                                    
                                
                                    

                                       
                                    
                                </div>
                                <SearchBar />

                                
                            </div>
                                
                                
                                
                                
                                
                                
                                
                                
                                {/* <ul className="navbar-nav">
                                    <Link to="/" className="btn top_header_buttons">Home</Link>
                                    <Link to="/products" className="btn top_header_buttons">Products</Link>
                                    <Link to="/order" className="btn top_header_buttons">Orders</Link>
                                </ul> */}
                            </div>

                            {/* </div> */}
                            
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
                                {localStorage.getItem('loginUserData')? <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

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
