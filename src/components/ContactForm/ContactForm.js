import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export class ContactForm extends Component {
    
  
    render() {
        return (
            <div>
                
                <div className="card text-center" style={{width:"40%",marginLeft:"30%",marginTop:"5%",marginBottom:"5%",backgroundColor:"#EEEEEE"}}>
                    <div className="card-body">
                        <h2 style={{marginBottom:"10%"}}>Contact Form</h2>
                        <form>
                            <div className="form-group" style={{marginBottom:"10%"}}>
                                <input type="text" className="form-control" placeholder="Name"/>
                            </div>

                            <div className="form-group" style={{marginBottom:"10%"}}>
                                <input type="email" className="form-control" placeholder="Email"/>
                            </div>

                            <div className="form-group" style={{marginBottom:"10%"}}>
                                <input type="text" className="form-control" placeholder="Mobile Number"/>
                            </div>

                            <div className="form-group" style={{marginBottom:"10%"}}>
                                <input type="text" className="form-control" placeholder="Subject"/>
                            </div>

                            <div className="form-group" style={{marginBottom:"15%"}}>
                                <input type="text" className="form-control" placeholder="Message"/>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                
                
            </div>
        )
    }
}

export default ContactForm
