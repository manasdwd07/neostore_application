import React, { useState } from 'react';
import './App.css';
import Homepage from './components/Homepage/Homepage';
import {BrowserRouter as Router} from 'react-router-dom';
import {Switch,Route} from 'react-router-dom';
import ContactForm from './components/ContactForm/ContactForm';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductPage from './components/ProductPage/ProductPage';
import Cart from './components/Cart/Cart';
import OrderPage from './components/OrderPage/OrderPage';
import UserProfile from './components/UserProfile/UserProfile';
import UserAddress from './components/UserAddress/UserAddress';
import ChangePassword from './components/ChangePassword/ChangePassword';
import SpecificProduct from './components/SpecificProduct/SpecificProduct';
import AddAddress from './components/AddAddress/AddAddress';
import EditProfile from './components/EditProfile/EditProfile';
import EditAddress from './components/EditAddress/EditAddress';
import SelectAddress from './components/SelectAddress/SelectAddress';
import ThankYou from './components/ThankYou/ThankYou';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import RecoverPassword from './components/RecoverPassword/RecoverPassword';

function App() {
  const data1 = localStorage.getItem('loginUserData');
  const userData = JSON.parse(data1);
  

  return (
    <div style={{overflow:"hidden"}}>
      
      
      
      <Router>
      
        <Switch>
          
          <Route exact path="/" component={Homepage}/>
          <Route path="/contactForm" component={ContactForm}/>
          <Route path="/login" component={LoginPage} props={userData ? 'true':'false'}/>
          <Route path="/register" component={RegisterPage}/>
          <Route path="/products" component={ProductPage}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/order" component={OrderPage}/>
          <Route path="/profile" component={UserProfile}/>
          <Route path="/address" component={UserAddress}/>
          <Route path="/changePassword" component={ChangePassword}/>
          <Route path="/specificProduct" component={SpecificProduct}/>
          <Route path="/addAddress" component={AddAddress}/>
          <Route path="/editProfile" component={EditProfile}/>
          <Route path="/editAddress" component={EditAddress}/>
          <Route path="/selectAddress" component={SelectAddress}/>
          <Route path="/forgotPassword" component={ForgotPassword}/>
          <Route path="/recoverPassword" component={RecoverPassword}/>
          <Route path="/thanksPage" component={ThankYou}/>
        </Switch> 
        <Footer/>
      </Router>
     
    </div>
  );
}

export default App;
