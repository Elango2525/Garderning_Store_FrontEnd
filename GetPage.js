import React, { Component } from 'react';
import './GetPage.css';
import axios from 'axios';

class Get extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    axios.get('http://localhost:8080/showProduct')
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="getch">
        <h1><center>View Products</center></h1>
        <br /><br />
        <table className="product-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Original Price</th>
              <th>Discount Price</th>
              <th>Quantity</th>
              <th>Shipping</th>
              <th>Delivery Charge</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.category}</td>
                <td>{user.subcategory}</td>
                <td>{user.imageUrl}</td>
                <td>{user.productname}</td>
                <td>&#8377;{user.originalprice}</td>
                <td>&#8377;{user.discountprice}</td>
                <td>{user.quantity}</td>
                <td>{user.shipping}</td>
                <td>&#8377;{user.customdeliveryprice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Get;
