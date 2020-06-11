import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withRouter } from "react-router";
import { getAllProducts } from '../../api/api';



class Searchbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }


    async componentDidMount() {
        await getAllProducts()
            .then(res => {
                this.setState({
                    data: res.data.product_details
                })
            })
    }


    onChangeHandle = (e, itemname) => {
        e.preventDefault()
        const index = this.state.data.findIndex(res => {
            return (res.product_name === itemname)
        })

        if (index >= 0) {
            localStorage.setItem('specificProductId', this.state.data[index].product_id)
            this.props.history.push({
                pathname: "/specificProduct",
                
            })
        }


    }
    render() {
        return (
            <div>
                <Autocomplete
                    id="combo-box-demo"
                    size="small"
                    options={this.state.data.map(option => { return option.product_name }
                    )}
                    onChange={(event, value) => this.onChangeHandle(event, value)}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} margin="normal" placeholder="Search..." variant="outlined" style={{ backgroundColor: "white" }} />
                    )}
                />
            </div>
        );
    }
}


export default (withRouter(Searchbox));