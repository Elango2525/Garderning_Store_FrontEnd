import React, { useEffect,useState,useContext } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faUser, faCog, faStar } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './HandTool.css';
import axios from 'axios';
import { ProductContext } from './ProductContext';

const HandTool = ({ handleAddToCart }) => {
  const addToWishlist = async (book) => {
    try {
      await axios.post('http://localhost:8080/addtoWishlist', book);
      console.log(`Added book with ID ${book.id} to wishlist.`);
    } catch (error) {
      console.error('Error occurred while adding to wishlist:', error);
    } 
};
  
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
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleAddToCartClick = (product) => {
    axios.post('/api/cartitem', product)
      .then((response) => {
        console.log('Product added to cart:', response.data);
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  };
  




  const handToolsProducts = [
    {
      "id": 21,
      "productname": "Velcro Fastener",
      "quantity": 1,
      "price": 499,
      "discountedPrice": 399,
      "shippingCost": "Free delivery",
      "offer": "39% OFFER",
      "imageUrl": "https://cdn.shopify.com/s/files/1/2313/4671/products/Gardening_Gloves.jpg?v=1517532921",
      "reviews": [
        {
          "customerName": "John Doe",
          "rating": 3,
          "comment": "Great product! I use it regularly in my garden."
        },{
          "customerName": "John Doe",
          "rating": 3,
          "comment": "Great product! I use it regularly in my garden."
        }
      ]
    },
    {
      "id": 22,
      "productname": "Digz signature (L)",
      "quantity": 1,
      "price": 699,
      "discountedPrice": 396,
      "shippingCost": "Free delivery",
      "offer": "SUPER OFFER",
      "imageUrl": "https://images.homedepot-static.com/productImages/6e344c59-7e5f-4518-a52e-8c1148c6df86/svn/multi-digz-work-gloves-7654-010-64_1000.jpg",
      "reviews": [
        {
          "customerName": "John Doe",
          "rating": 3,
          "comment": "Great product! I use it regularly in my garden."
        },{
          "customerName": "John Doe",
          "rating": 3,
          "comment": "Great product! I use it regularly in my garden."
        }
      ]
    },
    {
      "id": 23,
      "productname": "Tool Set gloves",
      "quantity": 1,
      "price": 599,
      "discountedPrice": 399,
      "shippingCost": "Free delivery",
      "offer": "45% OFFER",
      "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/81oO7XhxcaL.jpg",
      "reviews": [
        {
          "customerName": "John Doe",
          "rating": 3,
          "comment": "Great product! I use it regularly in my garden."
        },{
          "customerName": "John Doe",
          "rating": 3,
          "comment": "Great product! I use it regularly in my garden."
        }
      ]
    },
    {
      "id": 24,
      "productname": "Floral Pruning",
      "quantity": 1,
      "price": 435,
      "discountedPrice": 139,
      "offer": "60% OFFER",
      "shippingCost": "Delivery @ 19",
      "imageUrl": "https://www.thehomemarket.co.uk/wp-content/uploads/2021/02/pruning-2450013.jpg",
      "reviews": [
        {
          "customerName": "John Doe",
          "rating": 3,
          "comment": "Great product! I use it regularly in my garden."
        },{
          "customerName": "John Doe",
          "rating": 3,
          "comment": "Great product! I use it regularly in my garden."
        }
      ]
    },
    
    
  ];
  const allSections = [...dropdownSections, ...products];

  // Filter the combined sections based on the search query
  const filteredSections = allSections.filter((section) => {
    const matchedCategory = section.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchedSubcategories = section.subcategories.some((subcategory) =>
      subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchedCategory || matchedSubcategories;
  });

  const handToolsRows = [];
  for (let i = 0; i < handToolsProducts.length; i += 2) {
    handToolsRows.push(handToolsProducts.slice(i, i + 2));
  }
  const handleReviewsClick = (productId) => {
    // Use the product ID to fetch reviews for that specific product from the server
    axios.get(`/api/products/${productId}/reviews`)
      .then((response) => {
        const reviews = response.data;
        // Now you have the reviews data, you can use it to display the reviews or navigate to a reviews page
        console.log('Reviews:', reviews);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  };
  
  

  return (
    <div className="product-catalog">
      <div className="top-section"><div>
        </div>
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
      filteredSections.map((section, index) => (
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
                .filter((subcategory) => subcategory.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((subcategory) => (
                  <li
                    key={subcategory}
                    className={
                      subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ? 'highlight' : ''
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
              Oops, nothing in dropdown.
            </div>
          )}
           <div className="cart-container">
        <Link to="/carts">
          <FontAwesomeIcon icon={faCartPlus} className="cart-icon" />
          {cartItems.length > 0 && <span className="cart-notifications">{cartItems.length}</span>}
        </Link>
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
        
      </Carousel>
      
        
      <br></br><br></br>
      {handToolsRows.map((row, rowIndex) => (
        <div className="image-row" key={rowIndex}>
          {row.map((product) => (
            <div className="image-column" key={product.id}>
              <div className="image-reItem">
                <img src={product.imageUrl} alt={product.productname} />
                <p className="price-info">
                  <h2>
                    <div className="prod-name">
                      {product.productname}
                      <div className="ajai">
                        <input
                          type="number"
                          defaultValue={product.quantity}
                          min={1}
                          style={{ width: "35px" }}
                          />
                      </div>
                    </div>
                  </h2>
                  <span className="original-price">&#8377;{product.price}</span>
                  <span className="discounted-price">From &#8377;{product.discountedPrice}</span>
                  <span className="shipping">/ {product.shippingCost}</span><br></br>
                   <div className='ratingreview'>   {product.reviews && (
                        <Link to={`/reviews/${product.id}`} className="review-link" >
                          <div className="rating">
                            {[...Array(5)].map((_, i) => (
                              <FontAwesomeIcon key={i} icon={faStar} className="star-icon" />
                            ))}
                          <span className="reviews">({product.reviews.length})</span>
                          </div>
                        </Link>
                      )}</div>
                </p>
                <div children="buy-now-button">
                  <button className="add-to-cart-button" onClick={() => addToWishlist(product)}>
                    ADD TO CART
                  </button>
                </div>
                <br />
                <button className="buy-now-button">BUY PRODUCT</button>
                {product.offer && <div className="text-overlay"><h2>{product.offer}</h2></div>}
                
            </div></div>
          ))}
        </div>
      ))}





    <div className="underline"></div>

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




    
  );
};

export default HandTool;
