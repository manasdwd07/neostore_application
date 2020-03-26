import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core/';
import { getAllProducts } from '../../api/api';
import AllProducts from '../AllProducts/AllProducts';
import { getAllCategories } from '../../api/api';
import { getAllColors,getSpecificProduct } from '../../api/api';
import Pagination from "react-js-pagination";
import { getProductByCategory, getProductByColor } from '../../api/api';
import Header from '../Header/Header';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import StarIcon from '@material-ui/icons/Star';
import {getProductsByRating,getDescendingProducts,getAscendingProducts} from '../../api/api';



export class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allProducts: [],
            categories: [],
            colors: [],
            activePage: 1,
            
        }
    }



    async componentDidMount() {
        const allImages = await getAllProducts();
        this.setState({ allProducts: allImages.data.product_details })

        console.log('All products :- ', this.state.allProducts);

        const allCategories = await getAllCategories();
        this.setState({
            categories: allCategories.data.category_details
        })
        console.log('All categories inside state', this.state.categories);


        const allColors = await getAllColors();
        this.setState({
            colors: allColors.data.color_details
        })
    }

    starRatingHandler=async()=>{
        const starRatingProducts=await getProductsByRating()
        this.setState({
            allProducts:starRatingProducts.data.product_details
        })
    }

    highToLowHandler=async()=>{
        const highToLowPriceProducts= await getDescendingProducts()
        this.setState({
            allProducts:highToLowPriceProducts.data.product_details
        })
    }

    lowToHighHandler=async()=>{
        const lowToHighPriceProducts= await getAscendingProducts()
        this.setState({
            allProducts:lowToHighPriceProducts.data.product_details
        })
    }

    handlePageChange = (pageNumber) => {
        this.setState({
            activePage: pageNumber
        })
    }

    handleClick = async (el) => {
        const categoryData = await getProductByCategory(el.category_id)
        this.setState({
            allProducts: categoryData.data.product_details
        })

    }

    colorClick = async (el) => {
        const colorData = await getProductByColor(el.color_id)
        this.setState({
            allProducts: Array.isArray(colorData.data.product_details) ? colorData.data.product_details : []
        })
    }

    handleAllProducts = async (el) => {
        const allImages = await getAllProducts();
        this.setState({ allProducts: allImages.data.product_details })
    }


    render() {
        const categories = this.state.categories;
        const colors = this.state.colors;

        return (
            <div><Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                <div className="row" style={{ marginTop: "5%", marginLeft: "2%" }}>
                    <div className="col-lg-3">


                        <ExpansionPanel>
                            <ExpansionPanelSummary

                                onClick={this.handleAllProducts}
                            >
                                <Typography>All Products</Typography>
                            </ExpansionPanelSummary>

                        </ExpansionPanel>
                        <br />
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Categories</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    <div className="row">
                                        {categories.map(el => {
                                            return (
                                                <div className="col-12 btn" onClick={() => { this.handleClick(el) }}>{el.category_name}<hr /></div>
                                            )
                                        })}
                                    </div>
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <br />
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Color</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    <div className="row">
                                        {colors.map(el => {
                                            return (
                                                <div className="col-4 mb-2"><button className="btn" onClick={() => this.colorClick(el)} style={{ border: "0.5px solid", borderRadius: "5px", backgroundColor: el.color_code, width: "70%", height: "100%" }}></button></div>
                                            )
                                        })}
                                    </div>
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                    <div className="col-lg-9">

                        {this.state.allProducts.length ? <div>
                            <div className="row mb-2" style={{ width: "100%" }}>
                                <h2 style={{ float: "left" }}>{}All Categories</h2>
                                <p style={{ marginLeft: "40%" }}>Sort by</p>
                                <button className="btn btn-light"><StarIcon onClick={this.starRatingHandler}/></button>
                                <button className="btn btn-light"><ArrowUpwardIcon onClick={this.highToLowHandler}/></button>
                                <button className="btn btn-light"><ArrowDownwardIcon onClick={this.lowToHighHandler}/></button>
                            </div>
                            <AllProducts page={this.state.activePage} data={this.state.allProducts} />
                            <div className="pagination" style={{ marginLeft: "35%" }}>
                                <Pagination
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={8}
                                    totalItemsCount={43}
                                    pageRangeDisplayed={5}
                                    onChange={this.handlePageChange.bind(this)}>

                                </Pagination>
                            </div></div> : <div className="container text-center mt-5"><CircularProgress color="inherit" /></div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductPage
