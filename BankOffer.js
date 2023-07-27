import React, { useState } from 'react';
import { Link,useHistory,useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faUser, faCog, faStar } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './SuperOffer.css';
import './BankOffer.css';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ProductCatalog.css';

const ProductCatalog = () => {
  const [quantity, setQuantity] = useState(1);
  const dropdownSections = [
    {
      name: 'Tools',
      subcategories: ['Hand Tools', 'Power Tools', 'Gardening Gloves'],
      icon: faCartPlus,
    },
    {
      name: 'Equipment',
      subcategories: ['Lawn Mowers', 'Pruning Shears', 'Watering Cans'],
      icon: faCartPlus,
    },
    {
      name: 'Plants',
      subcategories: ['Flowering Plants', 'Indoor Plants', 'Herbs'],
      icon: faCartPlus,
    },
    {
      name: 'Seeds',
      subcategories: ['Flower Seeds', 'Vegetable Seeds', 'Grass Seeds'],
      icon: faCartPlus,
    },
    {
      name: 'Fertilizers',
      subcategories: ['Organic Fertilizers', 'Chemical Fertilizers', 'Compost'],
      icon: faCartPlus,
    },
    {
      name: 'Pesticides',
      subcategories: ['Insecticides', 'Herbicides', 'Fungicides'],
      icon: faCartPlus,
    },
    {
      name: 'Pots/Decor',
      subcategories: ['Plastic Pots', 'Ceramic Pots', 'Plant Stands'],
      icon: faCartPlus,
    },
    {
      name: 'Offers',
      subcategories: ['Super offers', 'Bank offers'],
      icon: faCartPlus,
    },
  ];
  const bankOffers = [
    {
      bankName: 'SBI OFFER',
      offerText: 'Get 10% off on all purchases using SBI Bank Credit Card',
      logoUrl: 'https://img.theweek.in/content/dam/week/news/biztech/sbi-logo-reuters.jpg', // Add the URL of the bank logo image
    },
    {
      bankName: 'HDFC OFFER',
      offerText: 'Flat 20% cashback on orders above ₹2000 using HDFC Bank Debit Card',
      logoUrl: 'https://logodix.com/logo/1620212.png', // Add the URL of the bank logo image
      
    },
    {
        bankName: 'PAYTM OFFER',
        offerText: 'Get 50% off on all purchases using PAYTM',
        logoUrl: 'https://ustechportal.com/wp-content/uploads/2016/09/paytm.jpg', // Add the URL of the bank logo image
      },
    // Add more bank offers here
  ];

  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [quantities, setQuantities] = useState(Array(dropdownSections.length).fill(1));
  const location = useLocation();

  const handleDropdownToggle = (category) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };
  


  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedCategory('');
  };
  const handleProfileIconClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };
  
  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };
  const history = useHistory();

  const handleSubcategoryClick = (subcategory) => {
    if (subcategory === 'Hand Tools') {
      history.push('/handTool'); // Replace '/handTool' with the actual URL of the Hand Tools page
    } else if (subcategory === 'Power Tools') {
      history.push('/powerTool'); // Replace '/powerTool' with the actual URL of the Power Tools page
    } else if (subcategory==='Gardening Gloves'){
      history.push('/gloves');
    } 
    else if (subcategory==='Lawn Mowers'){
      history.push('/lawn');
    }
    else if (subcategory==='Flowering Plants'){
      history.push('/flower');
    }
    else if (subcategory==='Flower Seeds'){
      history.push('/flowerSeeds');
    }
    else if (subcategory==='Organic Fertilizers'){
      history.push('/organic');
    }
    else if (subcategory==='Insecticides'){
      history.push('/insect');
    }
    else if (subcategory==='Plastic Pots'){
      history.push('/plastic');
    } else if (subcategory==='Super offers'){
      history.push('/super');
    }else if (subcategory==='Bank offers'){
      history.push('/bank');
    }else {
      console.log(`Clicked subcategory: ${subcategory}`);
    }
  };
  
 


  const [isScratched, setIsScratched] = useState(false);

  const handleScratch = () => {
    setIsScratched(true);
  };


  const filteredSections = dropdownSections.filter((section) => {
    const matchedCategory = section.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchedSubcategories = section.subcategories.some((subcategory) =>
      subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchedCategory || matchedSubcategories;
  });
  

  

  const handleAddToCart = () => {
    setCartItemsCount(cartItemsCount + 1);
  };
  const handleQuantityChange = (index, event) => {
    const newQuantities = [...quantities];
    newQuantities[index] = parseInt(event.target.value);
    setQuantities(newQuantities);
  };

  return (
    <div className="product-catalog">
      <div className="top-section">
        <div className="top-section-left">
          <h3>Gardening Store</h3>
        </div>
        <div className="top-section-center">
          <h3>Free shipping above &#8377;500</h3>
        </div>
        <div className="top-section-right">
          <h3>Call us: 6384318848</h3>
        </div>
      </div>
      <div className="categories-search-container">
        <input className='searchbar'
          type="text"
          placeholder="Search for seeds, flowers, garden decor etc.,"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchInputChange} />

        <div className="categories-container">
          {filteredSections.length > 0 ? (
            filteredSections.map((section,index) => (
              <div
                key={section.name}
                className={`dropdown-section ${selectedCategory === section.name ? 'active' : ''}`}
                onMouseEnter={() => handleDropdownToggle(section.name)}
                onMouseLeave={() => handleDropdownToggle(section.name)}
              >
                <h2>{section.name}</h2>
                {selectedCategory === section.name && (
                  <ul>
                    {section.subcategories
                      .filter((subcategory) =>
                        subcategory.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((subcategory) => (
                        <li
                          key={subcategory}
                          className={
                            subcategory.toLowerCase().includes(searchQuery.toLowerCase())
                              ? 'highlight'
                              : ''
                          }
                          onClick={() => handleSubcategoryClick(subcategory)}
                        >
                          <Link to={`/category/${subcategory}`}>{subcategory}</Link>
                          
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <div className="no-results">
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.Af21XA7JftJ_GcKHaZE7hgHaDW&pid=Api&P=0&h=180"
                alt="No results"
              />
              Oops, nothing here.
            </div>
          )}
          <div className="cart-container">
            <a href="/cart">
              <FontAwesomeIcon icon={faCartPlus} className="cart-icon" />
              {cartItemsCount > 0 && <span className="cart-notification">{cartItemsCount}</span>}
            </a>
          </div>
          
          <div className="setting-container">
            <a href="/settings">
              <FontAwesomeIcon icon={faCog} className="settings-icon"/>
            </a>
          </div>
          <div className="prof-container"
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
  <a href="/profile">
    <FontAwesomeIcon icon={faUser} className="profile-icon" />
  </a>
  {isDropdownVisible && (
    <div className="dropdown">
      <ul>
        <li>ELANGOVAN S</li>
        <li><Link to='/' className="logout-link">Logout</Link></li>
        <li><Link to='/order' className="logout-link">Order Tracking</Link></li>
        <li><Link to='/Feedbacks' className="logout-link">Feedback</Link></li>
        
      </ul>
    </div>
  )}
</div></div></div>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        showThumbs={false}
        className="carousel"
      >
        <div>
          <img src="https://www.ugaoo.com/cdn/shop/files/Thunder-Sale_60_Desktop-Banner.jpg?v=1689917089" alt="Slide 1" />
        </div>
        <div>
          <img src="https://www.ugaoo.com/cdn/shop/files/Ceramic-Planters_Clearance-Sale_Website-Banner.png?v=1675690407" alt="Slide 2" />
        </div>
        <div>
          <img src="https://www.ugaoo.com/cdn/shop/files/mobiwk_banner-01.jpg?v=1678946634" alt="Slide 3" />
        </div>
      </Carousel>
      
        
      <div>
      <div className="bank-offers-container">
      <h2 className="animated-text">Bank Offers</h2>
      {bankOffers.map((offer, index) => (
        <div key={index} className="bank-offer animated-bank-offer">
          {offer.logoUrl && (
            <div className="bank-logo">
              <img src={offer.logoUrl} alt={offer.bankName} />
            </div>
          )}
          <div className="bank-details">
            <h3>{offer.bankName}</h3>
            <p>{offer.offerText}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="underline"></div>
    <br></br><footer className="footer">
  <div className="footer-links">
    <div className='rowCol'>
    <div className='about'>
    <a>About</a></div></div><div className='about-det'>History</div><div className='about-det1'>Awards</div>
    <div className='rowCol'>
    <div className='contact'>
    <a>Contact</a></div><div className='contact-det'>Fax: +1(555)123-4567</div><div className='contact-det1'>Whatsapp: 6384318848</div>
    
    <div className='follow'>
    <a>Follow us</a></div></div>
    <div className='instaIcon'>
    <a href="https://www.instagram.com/im_elango._/"><FontAwesomeIcon icon={faInstagram} className="insta-icon" /></a>
    </div>
    <div className='fbIcon'><a href="https://www.facebook.com/elango.thangam.315?mibextid=ZbWKwL"><FontAwesomeIcon icon={faFacebook} className="fb-icon"/></a>
  </div></div>
  
  <div className="footer-info">
  <div className='rowCol'>
    <p>&copy; 2023 Gardening Store. All rights reserved.</p>
  </div></div>
</footer>
    

      <div>
        
      </div>
      <div>
        
      </div>
</div>




    </div>
  );
};

export default ProductCatalog;
