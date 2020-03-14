import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Button} from '@material-ui/core/';
import {getAllProducts} from '../../api/api';
import AllProducts from '../AllProducts/AllProducts';
import {getAllCategories} from '../../api/api';
import {getAllColors} from '../../api/api';

export class ProductPage extends Component {
    constructor(props){
        super(props);
        this.state={
            allProducts:[],
            categories:[],
            colors:[]
        }
    }
    
    
    async componentDidMount(){
        const allImages=await getAllProducts();
        this.setState({allProducts:allImages.data.product_details})

        console.log('All products :- ',this.state.allProducts);

        const allCategories=await getAllCategories();
        this.setState({
            categories:allCategories.data.category_details
        })
         console.log('All categories inside state',this.state.categories);
        

         const allColors=await getAllColors();
         this.setState({
             colors:allColors.data.color_details
         })
    }
    render() {
        const categories=this.state.categories;
        const colors=this.state.colors;
        // const {categories,colors}=this.state;
        // console.log('category ',this.state.categories);
        
        return (
            <div>
                <div className="row" style={{marginTop:"5%",marginLeft:"2%"}}>
                    <div className="col-lg-3">
                    {/* <button className="btn btn-raised" style={{backgroundColor:"white",border:"1px solid grey",width:"100%"}} >All Products</button><br/><br/> */}
                        
                    <ExpansionPanel>
                            <ExpansionPanelSummary
                                // aria-controls="panel1a-content"
                                // id="panel1a-header"
                            >
                                <Typography>All Products</Typography>
                            </ExpansionPanelSummary>
                            
                        </ExpansionPanel>
                        <br/>
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
                                        {categories.map(el=>{
                                            return (
                                            <div className="col-12 btn" >{el.category_name}<hr/></div>
                                            )
                                        })}
                                    </div>
                        </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <br/>
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
                                        {colors.map(el=>{
                                            return (
                                            <div className="col-4 mb-2"><button className="btn" style={{border:"0.5px solid",borderRadius:"5px",backgroundColor:el.color_code,width:"70%",height:"100%"}}></button></div>
                                            )
                                        })}
                                    </div>
                        </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                    <div className="col-lg-9">
                        <AllProducts data={this.state.allProducts}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductPage
