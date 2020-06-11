import React, { Component } from 'react';
import userIcon from '../../assets/images/profile-placeholder.png';
import { Link } from 'react-router-dom';
import ReorderIcon from '@material-ui/icons/Reorder';
import PersonIcon from '@material-ui/icons/Person';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import Header from '../Header/Header';
import { getProfileData } from '../../api/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import sweetalert2 from 'sweetalert2';
import {
    Button,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormHelperText from "@material-ui/core/FormHelperText";
import { editUserProfile } from '../../api/api';



export class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            birthdate: '',
            first_name: '',
            last_name: '',
            gender: '',
            dob: '',
            phone_no: '',
            email: '',
            submitData: {}
        }
    }

    // Getting user profile data on component mounting
    async componentDidMount() {
         await getProfileData()
        .then((res) => {


            this.setState({
                userData: res.data.customer_proile
            })
        })

    }

    // Birthdate change handler
    birthdateHandler = (e) => {
        this.setState({
            birthdate: Date.parse(e.target.value)
        })

    }

    // Image upload handler
    imgHandler = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            var formData = {
                'profile_img': e.target.result,
                'first_name': this.state.userData.first_name,
                'last_name': this.state.userData.last_name,
                'email': this.state.userData.email,
                'dob': this.state.userData.dob,
                'phone_no': this.state.userData.phone_no,
                'gender': this.state.userData.gender
            }
            this.setState({
                submitData: formData
            })
        }

    }

    // onClick Handler for edit Profile
    editHandler = async () => {

        await editUserProfile(this.state.submitData)
        .then(res => {
            sweetalert2.fire({
                'title': 'Profile edited successfully',
                'icon': 'success'
            })
        }).catch(err => {
            sweetalert2.fire({
                'title': 'OOps.. some error occured',
                'text': `Error details: ${err}`
            })
        })
    }

    render() {
        return (
            <div><Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
                <div className="container m-4">
                    <div className="row">
                        <div className="col-12">
                            <h1>My Account</h1>
                        </div>


                    </div><hr />
                    {this.state.userData ?
                        <div className="row">
                            <div className="col-6 text-center">
                                <img src={userIcon} alt="userIcon" height="30%" style={{ borderRadius: "100%" }} />
                                <h4 className="text-danger mt-2">{this.state.userData.first_name} {this.state.userData.last_name}</h4>
                                <div className="mb-2"><Link to="/order"><Button variant="outlined" fullWidth><ReorderIcon /> &nbsp;Order</Button></Link></div>
                                <div className="mb-2"><Link to="/profile"><Button variant="outlined" fullWidth><PersonIcon /> &nbsp; Profile</Button></Link></div>
                                <div className="mb-2"><Link to="/address"><Button variant="outlined" fullWidth><MenuBookIcon /> &nbsp; Addresses</Button></Link></div>
                                <div className="mb-2"><Link to="/changePassword"><Button variant="outlined" fullWidth><SyncAltIcon /> &nbsp; Change Password</Button></Link></div>
                            </div>
                            <div className="col-6 mt-2">

                                <div className="container card ">
                                    <h3 className="mt-2">Edit Profile</h3>
                                    <FormControl className="mb-3 mt-3" variant="outlined" error={this.state.firstNameErrorText ? true : false} fullWidth defaultValue={this.state.userData.first_name} onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                        <label>First Name</label>
                                        <input className="form-control"
                                            id="outlined-adornment-email"
                                            type="text"
                                            name="first_name"
                                            autoComplete="off"
                                            defaultValue={this.state.userData.first_name}

                                            onChange={(e) => { this.setState({ first_name: e.target.value }) }}



                                            labelWidth={70}
                                        />
                                        <FormHelperText id="component-error-text">{this.state.firstNameErrorText}</FormHelperText>
                                    </FormControl>
                                    <FormControl className="mb-3" variant="outlined" error={this.state.lastNameErrorText ? true : false} fullWidth onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                        <label>Last Name</label>
                                        <input className="form-control"
                                            id="outlined-adornment-email"
                                            type="text"
                                            name="last_name"
                                            autoComplete="off"
                                            defaultValue={this.state.userData.last_name}


                                            labelWidth={100}
                                        />
                                        <FormHelperText id="component-error-text">{this.state.lastNameErrorText}</FormHelperText>
                                    </FormControl>

                                    <FormControl className="mb-3" error={this.state.genderErrorText ? true : false} onBlur={this.handleGenderError}>
                                        <label>Gender</label>
                                        <RadioGroup aria-label="gender" name="gender1" onChange={this.handleChangeInput} defaultValue={this.state.userData.gender}>
                                            <FormControlLabel value="female" defaultChecked={true} control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" defaultChecked={this.state.userData.gender === 'male' ? true : false} control={<Radio />} label="Male" />
                                        </RadioGroup>

                                    </FormControl>

                                    <FormControl className="mb-3">
                                        <TextField
                                            id="date"
                                            label="Birthday"
                                            type="date"
                                            defaultValue="2020-03-31"
                                            onChange={(e) => this.birthdateHandler(e)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl className="mb-3" variant="outlined" error={this.state.phoneNoErrorText ? true : false} fullWidth onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                        <label>Mobile No</label>
                                        <input className="form-control"
                                            id="outlined-adornment-password"
                                            type="text"
                                            name="mobile_no"
                                            onChange={this.handleChange}
                                            defaultValue={this.state.userData.phone_no}



                                            labelWidth={150}
                                        />

                                        <FormHelperText id="component-error-text">{this.state.phoneNoErrorText}</FormHelperText>

                                    </FormControl>

                                    <FormControl className="mb-3" variant="outlined" error={this.state.emailErrorText ? true : false} fullWidth onChange={this.handleChangeInput} onBlur={this.handleChangeInput}>
                                        <label>Email id</label>
                                        <input className="form-control"
                                            id="outlined-adornment-email"
                                            type="text"
                                            name="email"
                                            onChange={this.handleChange}
                                            defaultValue={this.state.userData.email}
                                            labelWidth={100}
                                        />
                                        <FormHelperText id="component-error-text">{this.state.emailErrorText}</FormHelperText>
                                        <label className="mb-1 mt-2">Choose Profile picture to upload</label>
                                        <input type='file' className="mb-2 mt-1" onChange={(e) => { this.imgHandler(e) }} id="img" name="profilePicture" accept="image/*" />
                                        <button className="btn btn-info mt-3" onClick={this.editHandler}>Edit</button>
                                    </FormControl>
                                </div>
                            </div>
                        </div> : <div className="row container text-center m-5"><CircularProgress color="inherit" /></div>}
                </div>
            </div>
        )
    }
}

export default EditProfile

