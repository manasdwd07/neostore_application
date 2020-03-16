import React from 'react';
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

function App() {
  return (
    <div>
      
      

      <Router>
      <Header/>
        <Switch>
          
          <Route exact path="/" component={Homepage}/>
          <Route path="/contactForm" component={ContactForm}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
          <Route path="/products" component={ProductPage}/>
          <Route path="/cart" component={Cart}/>
        </Switch>
        <Footer/>
      </Router>
     
    </div>
  );
}

export default App;
