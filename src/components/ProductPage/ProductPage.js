import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getCommonProducts} from '../../api/api';
import AllProducts from '../AllProducts/AllProducts';
import { getAllCategories } from '../../api/api';
import { getAllColors } from '../../api/api';
import Header from '../Header/Header';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import StarIcon from '@material-ui/icons/Star';
import './ProductPage.css'


export class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allProducts: [],
            tempProducts: [],
            categories: [],
            colors: [],
            activePage: 1,
            categoryName: '',
            showPagination:true


        }
    }


    async componentDidMount() {
        this.setState({showPagination:true})
        const url = window.location.href;
        const categoryId = url.slice(31, url.length);
        switch(categoryId){
            case '5cfe3c5aea821930af69281e': this.setState({categoryName:'Sofa'})
                                                break;
            case '5cfe3c65ea821930af69281f': this.setState({categoryName:'Bed'})
                                                break;
            case '5cfe3c6fea821930af692820': this.setState({categoryName:'Chair'})
                                                break;
            case '5cfe3c79ea821930af692821': this.setState({categoryName:'Table'})
                                                break;
            case '5d14c15101ae103e6e94fbe0':this.setState({categoryName:'Almirah'})
                                                break;
            default : this.setState({categoryName:'All Categories'})
                                break;

        }
        const result = categoryId === "" ? await getCommonProducts({"category_id":""}) : await getCommonProducts({"category_id":categoryId});

        // let data = await getCommonProducts()
        this.setState({
            tempProducts: result.data.product_details,
            allProducts: result.data.product_details.slice(0, 10)
        })

        const allCategories = await getAllCategories();
        this.setState({
            categories: allCategories.data.category_details
        })
        
        const allColors = await getAllColors();
        this.setState({
            colors: allColors.data.color_details
        })
        
        // --------------
        
        if(this.state.categoryName==='All Categories'){
            this.setState({showPagination:true})
        }
        else{
            this.setState({showPagination:false})
        }
    }

  

    

    // For getting products by rating
    starRatingHandler = async (data) => {
        const starRatingProducts = await getCommonProducts(data)
        this.setState({
            allProducts: starRatingProducts.data.product_details
        })
    }

    // High to low price handler
    highToLowHandler = async (data) => {
        const highToLowPriceProducts = await getCommonProducts(data)
        this.setState({
            allProducts: highToLowPriceProducts.data.product_details
        })
    }

    // Low To High Price Handler
    lowToHighHandler = async (data) => {
        const lowToHighPriceProducts = await getCommonProducts(data)
        this.setState({
            allProducts: lowToHighPriceProducts.data.product_details
        })
    }

    // Handler for page change
    handlePageChange = (pageNumber) => {
        this.setState({
            activePage: pageNumber
        })
    }

    // For getting products according to category selected
    handleClick = async (data,name) => {
        // myFunction();
        const categoryData = await getCommonProducts(data)
        this.setState({
            allProducts: categoryData.data.product_details,
            categoryName: name,
            showPagination:false
        })
        // this.props.history.push(`/products/${id}`)
        

    }

    // For getting poducts according to color selected
    colorClick = async (id) => {
        const colorData = await getCommonProducts({category_id:this.state.category_id,color_id:id})
        this.setState({
            allProducts: Array.isArray(colorData.data.product_details) ? colorData.data.product_details : [],
            showPagination:false
        })
    }

    // For getting all products
    handleAllProducts = async (el) => {
        this.setState({showPagination:true})
        
        const allImages = await getCommonProducts({"category_id":""});
        this.setState({ allProducts: allImages.data.product_details ,
        categoryName:'All Categories',
        showPagination:true
        })
        this.props.history.push('/products')
    }

    // Handler for pagination
    handlePagination = (Index) => {
        let productResult = this.state.tempProducts.slice(Index * 10 - 10, Index * 10);
        this.setState({
            allProducts: productResult
        })
    }

    // Below method for creating pagination
    initiatePagination = () => {
        let table = [];
        let pageNumber = this.state.tempProducts.length / 10
        for (let i = 1; i <= pageNumber; i++) {
            table.push(
                <li className="page-item" key={i}>
                    <span className="page-link btn" onClick={() => this.handlePagination(i)}>{i}</span>
                </li>
            );
        }
        return table
    };




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
                        
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Categories</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                {/* <Typography> */}
                                    <div className="row">
                                        {categories.map((data,i) => {
                                            return (
                                                <div className="col-12 btn" key={i}><button className="btn" onClick={() => { this.handleClick(data={"category_id":data.category_id,"category_name":data.category_name},data.category_name) }}>{data.category_name}</button></div>
                                                // <div className="col-12 btn chosenCategory" key={i} onClick={() => { this.handleClick(data={"category_id":data.category_id,"category_name":data.category_name},data.category_name) }}>{data.category_name}</div>
                                            )
                                        })}
                                    </div>
                                {/* </Typography> */}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Color</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                {/* <Typography> */}
                                    <div className="row">
                                        {colors.map((data,i) => {
                                            return (
                                                <div className="col-4 mb-2" key={i}><button className="btn" onClick={() => this.colorClick(data.color_id)} style={{ border: "0.5px solid", borderRadius: "5px", backgroundColor: data.color_code, width: "70%", height: "100%" }}></button></div>
                                            )
                                            
                                        })}
                                    </div>
                                    
                                {/* </Typography> */}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                    <div className="col-lg-9">

                        {this.state.allProducts.length ? <div>
                            <div className="row mb-2" style={{ width: "100%" }}>
                        <h2 style={{ float: "left" }}>{this.state.categoryName? this.state.categoryName:'All Categories'}</h2>
                                <p style={{ marginLeft: "40%" }}>Sort by</p>
                                <button className="btn btn-light"><StarIcon onClick={()=>this.starRatingHandler({category_id:this.state.category_id,sortBy:"product_rating",sortIn:true})} /></button>
                                <button className="btn btn-light"><ArrowUpwardIcon onClick={()=>this.highToLowHandler({category_id:this.state.category_id,sortBy:"product_cost",sortIn:false})} /></button>
                                <button className="btn btn-light"><ArrowDownwardIcon onClick={()=>this.lowToHighHandler({category_id:this.state.category_id,sortBy:"product_cost",sortIn:true})} /></button>
                            </div>
                            

                            <AllProducts page={this.state.activePage} data={this.state.allProducts} categories={this.state.categories}/>
                            {this.state.showPagination===true ? 
                            <div className="pagination" style={{ marginLeft: "35%" }}>
                                <ul className="pagination">
                                    {this.initiatePagination()}
                                </ul>
                            </div>


                            
                            :null}
                            
                            </div> : <div className="container text-center mt-5"><CircularProgress color="inherit" /></div>}
                    </div>
                </div>


            </div>
        )
    }
}

export default ProductPage
