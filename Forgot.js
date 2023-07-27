import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Library.css'

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "react-toastify/dist/ReactToastify.min.css";
import './HandTool.css';
import { Link,useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faUser, faCog, faStar } from '@fortawesome/free-solid-svg-icons';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
  const allSections = [...dropdownSections, ...products];

  // Filter the combined sections based on the search query
  const filteredSections = allSections.filter((section) => {
    const matchedCategory = section.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchedSubcategories = section.subcategories.some((subcategory) =>
      subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchedCategory || matchedSubcategories;
  });
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

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/showProduct'); // Replace with the actual endpoint for fetching all books
      setBooks(response.data);
    } catch (error) {
      console.error('Error occurred while fetching books:', error);
      // Handle error, show an error message or something
    }
  };

  // Filter books based on search term
  const filteredBooks = books.filter((book) => {
    return book.productname.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Create groups of two books each for rendering in rows
  const bookRows = [];
  for (let i = 0; i < filteredBooks.length; i += 2) {
    const row = filteredBooks.slice(i, i + 2);
    bookRows.push(row);
  }

  const addToWishlist = async (book) => {
    try {
      await axios.post('http://localhost:8080/addtoWishlist', book);
      console.log(`Added book with ID ${book.id} to wishlist.`);
    } catch (error) {
      console.error('Error occurred while adding to wishlist:', error);
    }
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
    <div>
      
        <h2 className="head-view1">New Products</h2>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="book-gallery">
        {bookRows.map((row, index) => (
          <div key={index} className="book-row">
            {row.map((book) => (
              <div key={book.id} className="book-container1">
                <Link to={`/bookdetails/${book.id}`}>
                  <img
                    src={book.imageUrl}
                    alt={`Cover of ${book.productname}`}
                    className="book-cover1"
                  />
                </Link>
                <div className="book-details1">
                  <h3>{book.productname}</h3>
                  <p>₹{book.discountprice}</p>
                  <p>{book.shipping}</p>
                  <button
                    onClick={() => addToWishlist(book)}
                    className="wishlist-button"
                  >
                    Add to wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div></div>
  );
};

export default Library;
