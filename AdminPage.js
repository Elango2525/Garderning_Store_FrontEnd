import React, { useState,useContext } from 'react';
import './AdminPage.css';
import axios from 'axios';
import { ProductContext } from './ProductContext';

const AdminPage = () => {
  const [id,setId]=useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [imageUrl, setImageUrl]=useState('');
  const [productname, setProductname] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [originalprice, setOriginalprice] = useState(0);
  const [discountprice, setDiscountprice] = useState(0);
  const [shipping, setShipping] = useState('Free Delivery');
  const [customdeliveryprice, setCustomdeliveryprice] = useState('');
  const { setProducts } = useContext(ProductContext);

  const handleAddId = (event) => {
    setId(event.target.value);
  };

  const handleAddCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleAddSubcategory = (event) => {
    setSubcategory(event.target.value);
  };

  const handleAddProductname = (event) => {
    setProductname(event.target.value);
  };
  const handleAddImageUrl = (event) => {
    setImageUrl(event.target.value);
  };

  const handleAddQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddOriginalprice = (event) => {
    setOriginalprice(event.target.value);
  };

  const handleAddDiscountprice = (event) => {
    setDiscountprice(event.target.value);
  };

  const handleShippingchange = (event) => {
    setShipping(event.target.value);
    if (event.target.value === 'Free Delivery') {
      setCustomdeliveryprice('');
    }
  };
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Step 1


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', {
      id,
      category,
      subcategory,
      productname,
      imageUrl,
      quantity,
      originalprice,
      discountprice,
      shipping,
      customdeliveryprice,
    });
    const data = {
      id,
      category,
      subcategory,
      productname,
      imageUrl,
      quantity,
      originalprice,
      discountprice,
      shipping,
      customdeliveryprice,
    };
    axios.post('http://localhost:8080/addProduct', data)
      .then((response) => {
        console.log('Response from the server:', response.data);
        setProducts((prevProducts) => [...prevProducts, response.data]);
        setShowSuccessMessage(true); // Step 2
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000); 
        
      })
      .catch((error) => {
        console.error('Error submitting the form:', error);
        // Handle the error here if needed
      });
      

    // Reset the form fields after successful submission if needed.
    setId('');
    setCategory('');
    setSubcategory('');
    setProductname('');
    setImageUrl('');
    setQuantity(0);
    setOriginalprice(0);
    setDiscountprice(0);
    setShipping('Free Delivery');
    setCustomdeliveryprice('');
  };

  return (
    <div className="admin-page">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
     
        <div className="form-group">
          <label>Add Category:</label>
          <select value={category} onChange={handleAddCategory}>
            <option value="">Select Category</option>
            <option value="Tools">Tools</option>
            <option value="Equipment">Equipment</option>
            <option value="Plants">Plants</option>
            <option value="Seeds">Seeds</option>
            <option value="Fertilizers">Fertilizers</option>
            <option value="Pesticides">Pesticides</option>
            <option value="Garden Decor">Garden Decor</option>
            <option value="Offers">Offers</option>
          </select>
        </div>
        {category && (
          <div className="form-group">
            <label>Add Subcategory:</label>
            <select value={subcategory} onChange={handleAddSubcategory}>
              <option value="">Select Subcategory</option>
              {category === 'Tools' && (
                <>
                  <option value="Hand Tools">Hand Tools</option>
                  <option value="Power Tools">Power Tools</option>
                  <option value="Gardening gloves">Gardening gloves</option>
                </>
              )}
              {category === 'Equipment' && (
                <>
                  <option value="Lawn mowers">Lawn mowers</option>
                  <option value="Pruning mowers">Pruning mowers</option>
                  <option value="Watering cans">Watering cans</option>
                </>
              )}
              {category === 'Plants' && (
                <>
                  <option value="Flowering plants">Flowering plants</option>
                  <option value="Indoor plants">Indoor plants</option>
                  <option value="Herbs">Herbs</option>
                </>
              )}
              {category === 'Seeds' && (
                <>
                  <option value="Flowering seeds">Flowering seeds</option>
                  <option value="Vegetables seeds">Vegetables seeds</option>
                  <option value="Grass seeds">Grass seeds</option>
                </>
              )}
              {category === 'Fertilizers' && (
                <>
                  <option value="Organic fertilizer">Organic fertilizer</option>
                  <option value="Chemical fertilizer">Chemical fertilizer</option>
                  <option value="Compost">Compost</option>
                </>
              )}
              {category === 'Pesticides' && (
                <>
                  <option value="Insecticides">Insecticides</option>
                  <option value="Herbicides">Herbicides</option>
                  <option value="Fungicides">Fungicides</option>
                </>
              )}
              {category === 'Garden Decor' && (
                <>
                  <option value="Statues">Statues</option>
                  <option value="Outdoor lightning">Outdoor lightning</option>
                  <option value="Bird baths">Bird baths</option>
                </>
              )}
              {category === 'Offers' && (
                <>
                  <option value="Super offers">Super offers</option>
                  <option value="Bank offers">Bank offers</option>
                </>
              )}
            </select>
          </div>
        )}
        <div className="form-group">
          <label>Add Image Url:</label>
          <input type="text" value={imageUrl} onChange={handleAddImageUrl} />
        </div>
        <div className="form-group">
          <label>Add Product Name:</label>
          <input type="text" value={productname} onChange={handleAddProductname} />
        </div>
        <div className="form-group">
          <label>Add Quantity:</label>
          <input type="number" value={quantity} onChange={handleAddQuantity} />
        </div>
        <div className="form-group">
          <label>Original Price:</label>
          <input type="number" value={originalprice} onChange={handleAddOriginalprice} />
        </div>
        <div className="form-group">
          <label>Discounted Price:</label>
          <input type="number" value={discountprice} onChange={handleAddDiscountprice} />
        </div>
        <div className="form-group">
          <label>Shipping:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="Free Delivery"
                checked={shipping === 'Free Delivery'}
                onChange={handleShippingchange}
              />
              Free Delivery
            </label>
            <label>
              <input
                type="radio"
                value="paid"
                checked={shipping === 'paid'}
                onChange={handleShippingchange}
              />
              Delivery @ &lt;some price&gt;
            </label>
          </div>
        </div>
        {shipping === 'paid' && (
          <div className="form-group">
            <label>Delivery Price:</label>
            <input
              type="number"
              value={customdeliveryprice}
              onChange={(e) => setCustomdeliveryprice(e.target.value)}
            />
          </div>
        )}
        <button type="submit">Submit</button>
        {showSuccessMessage && (
        <div className="success-message">
          Product was successfully added
        </div>
      )}
      </form>
    </div>
  );
};

export default AdminPage;
