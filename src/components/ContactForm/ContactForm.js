import React, { Component } from 'react';
import Header from '../Header/Header';
import { postContactForm } from '../../api/api';

export class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            subject: '',
            phoneNo: '',
            message: '',
            customer_id:0
        }

    }

    // Submit Handler for onClick Event in Contact form submit
    submitHandler = (e) => {
        e.preventDefault();

        if (this.state.email == '' || this.state.name == '' || this.state.subject == '' || this.state.phoneNo == '' || this.state.message == '') {
            alert('Please fill in the fields')
        }
        else {
            const mailformat = /^([a-zA-Z])+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (this.state.email.match(mailformat) !== null){
                // const numberFormat = /[^0-9]/gi;
                const numberFormat=/^[0-9]+$/;
                if(this.state.phoneNo.match(numberFormat)!==null){

                const data = {
                    'customer_id':`${this.state.customer_id}`,
                    'email': `${this.state.email}`,
                    'name': `${this.state.name}`,
                    'subject': `${this.state.subject}`,
                    'phone_no': `${this.state.phoneNo}`,
                    'message': `${this.state.message}`
                }
            const result = postContactForm(data)
                .then(res => {
                    alert('Thankyou for your details, we will get back to you soon')
                }).catch(err => {
                    alert(`Some error occured : ${err}`)
                })
            }else if(this.state.phoneNo<1000000000||this.state.phoneNo>9999999999){
                alert('Mob number should be exact 10 digits')
            }
        }
        else
        {
            alert('Please enter valid email')
        }
        }
    }

    render() {
        return (
            <div>
                <Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                <div className="card text-center" style={{ width: "40%", marginLeft: "30%", marginTop: "5%", marginBottom: "5%", backgroundColor: "#EEEEEE" }}>
                    <div className="card-body">
                        <h2 style={{ marginBottom: "10%" }}>Contact Form</h2>
                        <form>
                            <div className="form-group" style={{ marginBottom: "10%" }}>
                                <input type="text" className="form-control" placeholder="Name" onChange={e => this.setState({ name: e.target.value })} />
                            </div>

                            <div className="form-group" style={{ marginBottom: "10%" }}>
                                <input type="email" className="form-control" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} />
                            </div>

                            <div className="form-group" style={{ marginBottom: "10%" }}>
                                <input type="text" className="form-control" placeholder="Mobile Number" onChange={e => this.setState({ phoneNo: e.target.value })} />
                            </div>

                            <div className="form-group" style={{ marginBottom: "10%" }}>
                                <input type="text" className="form-control" placeholder="Subject" onChange={e => this.setState({ subject: e.target.value })} />
                            </div>

                            <div className="form-group" style={{ marginBottom: "15%" }}>
                                <input type="text" className="form-control" placeholder="Message" onChange={e => this.setState({ message: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" onClick={(e) => this.submitHandler(e)}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        )
    }
}

export default ContactForm
