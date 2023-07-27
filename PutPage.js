import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PutPage = () => {
  const [id, setId] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [productname, setProductname] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [originalprice, setOriginalprice] = useState(0);
  const [discountprice, setDiscountprice] = useState(0);
  const [shipping, setShipping] = useState('free');
  const [customdeliveryprice, setCustomdeliveryprice] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Fetch the existing product data based on the ID
    const productId = 1; // Replace with the actual product ID from your app's state or URL
    axios.get(`http://localhost:8080/showProduct`)
      .then((response) => {
        const productData = response.data;
        setId(productData.id);
        setCategory(productData.category);
        setSubcategory(productData.subcategory);
        setProductname(productData.productname);
        setQuantity(productData.quantity);
        setOriginalprice(productData.originalprice);
        setDiscountprice(productData.discountprice);
        setShipping(productData.shipping);
        setCustomdeliveryprice(productData.customdeliveryprice);
        
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
        // Handle the error here if needed
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', {
      id,
      category,
      subcategory,
      productname,
      quantity,
      originalprice,
      discountprice,
      shipping,
      customdeliveryprice,
    });
    const updatedProduct = {
      id,
      category,
      subcategory,
      productname,
      quantity,
      originalprice,
      discountprice,
      shipping,
      customdeliveryprice,
    };
    axios.put(`http://localhost:8080/updateProduct/${id}`, updatedProduct)
      .then((response) => {
        console.log('Response from the server:', response.data);
        setShowSuccessMessage(true);
        // Hide the success message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
        // Show a success message to the user or redirect to a success page
      })
      .catch((error) => {
        console.error('Error updating the product:', error);
        // Handle the error here if needed
      });
  };
  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Id:</label>
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Add Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
            <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
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
          <label>Add Product Name:</label>
          <input type="text" value={productname} onChange={(e) => setProductname(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Add Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Original Price:</label>
          <input type="number" value={originalprice} onChange={(e) => setOriginalprice(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Discounted Price:</label>
          <input type="number" value={discountprice} onChange={(e) => setDiscountprice(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Shipping:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="free"
                checked={shipping === 'free'}
                onChange={(e) => setShipping(e.target.value)}
              />
              Free Delivery
            </label>
            <label>
              <input
                type="radio"
                value="paid"
                checked={shipping === 'paid'}
                onChange={(e) => setShipping(e.target.value)}
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
            Product was successfully updated!
          </div>
        )}

      </form>
    </div>
  );
};
export default PutPage;