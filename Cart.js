import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Button } from '@mui/material';
import reactRouterDom from 'react-router-dom';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/view/wishlist');
      console.log(response.data);
      setWishlistItems(response.data);
    } catch (error) {
      console.error('Error occurred while fetching wishlist items:', error);
    }
  };

  const handleDelete = async (wishId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8080/wishdelete/${wishId}`);
      console.log(response);
      // Update the wishlistItems state after successful deletion if needed
    } catch (error) {
      console.error('Error occurred while deleting wishlist items:', error);
    }
  };

  const WishData = wishlistItems.map((wish) => (
    
    <tr key={wish.id}>
      <td>
        <div className='d-flex align-items-center'>
          <img src={wish.imageUrl} alt={wish.productname} style={{ width: '50px', height: '70px' }} />
          <div className='ms-3'>
            <p className='fw-bold mb-1'>{wish.productname}</p>
          </div>
        </div>
      </td>
      <td>
        <p className='fw-normal mb-1'>₹{wish.discountprice}</p>
      </td>
      
      <td>
        <Button variant='contained' onClick={() => handleDelete(wish.id)}>
          Delete
        </Button>
      </td>
    </tr>
        
    // <Button variant='contained' color='primary'>
    //       Order
    //     </Button>
      
  ));

  return (
    <div>
      <h2 className='head-view1'>My Cart</h2>
      <MDBTable align='middle' style={{ width: '170vh', marginLeft: '120px' }}>
        <MDBTableHead>
          <tr>
            <th scope='col'>Product</th>
            <th scope='col'>Price</th>
            <th scope='col'>Action</th>
            
          </tr>
        </MDBTableHead>
        <MDBTableBody>{WishData}</MDBTableBody>
      </MDBTable>
     <Link to="payment"> <Button variant='contained' color='primary' className='ord'>
         Order
       </Button></Link>
    </div>
  );
};

export default Wishlist;
