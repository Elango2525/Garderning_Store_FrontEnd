import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Drop from './Drop';
import Payment from './Payment';
import Receipt from './Receipt';
import Forgot from './Forgot';
import OrderTracking from './OrderTracking';
import FeedbackForm from './FeedbackForm';
import HandTool from './HandTool';
import ProductCatalog from './ProductCatalog';
import Flowering from './Flowering';
import Cart from './Cart'; // Import the Cart component
import AdminLogin from './AdminLogin';
import AdminPage from './AdminPage';
import ButtonMain from './ButtonMain';
import GetPage from './GetPage';
import PutPage from './PutPage';
import DeletePage from './DeletePage';
import FeedbackFormMicro from './FeedbackFormMicro';
import ReviewsPage from './ReviewsPage';
import FeedbackDisplayPage from './FeedbackDisplayPage';
import PowerTool from './PowerTool';
import Gloves from './Gloves';
import LawnMowers from './LawnMowers';
import SeedFlower from './SeedFlower.js';
import OrganicFertilizer from './OrganicFertilizer';
import Insecticides from './Insecticides';
import PlasticPot from './PlasticPot';
import SuperOffer from './SuperOffer';
import BankOffer from './BankOffer';
import GetReview from './GetReview';
import AdminSignup from './AdminSignup';
const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/drop" component={Drop} />
          <Route exact path="/product-catalog" component={ProductCatalog} />
          <Route exact path="/forgot" component={Forgot} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/rec" component={Receipt} />
          <Route exact path="/order" component={OrderTracking} />
          <Route exact path="/feedback" component={FeedbackForm} />
          <Route exact path="/AdminLogin" component={AdminLogin}/>
          <Route exact path="/AdminSignup" component={AdminSignup}/>
          <Route exact path="/AdminPage" component={AdminPage}/>
          <Route exact path="/ButtonMain" component={ButtonMain}/>
          <Route exact path="/GetPage" component={GetPage}/>
          <Route exact path="/PutPage" component={PutPage}/>
          <Route exact path="/DeletePage" component={DeletePage}/>
          <Route exact path="/Feedbacks" component={FeedbackFormMicro}/>
          <Route exact path="/feedbackdis" component={FeedbackDisplayPage} />
          <Route exact path="/powerTool" component={PowerTool}/>
          <Route exact path="/gloves" component={Gloves}/>
          <Route exact path="/lawn" component={LawnMowers}/>
          <Route exact path="/flower" component={Flowering}/>
          <Route exact path="/flowerSeeds" component={SeedFlower}/>
          <Route exact path="/organic" component={OrganicFertilizer}/>
          <Route exact path="/insect" component={Insecticides}/>
          <Route exact path="/plastic" component={PlasticPot}/>
          <Route exact path="/super" component={SuperOffer}/>
          <Route exact path="/bank" component={BankOffer}/>
          <Route exact path="/getRev" component={GetReview}/>
          
          <Route
            exact
            path="/handTool"
            render={(props) => <HandTool {...props} handleAddToCart={handleAddToCart} />}
          />
         <Route exact path="/carts" component={Cart}/>
          
           <Route path="/reviews/:productId" component={ReviewsPage} />

        </Switch>
      </div>
    </Router>
  );
};

export default App;
