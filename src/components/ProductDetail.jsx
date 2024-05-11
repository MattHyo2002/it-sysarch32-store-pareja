import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../configs/firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import '../App.css'; // Import CSS file
import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe.js library with your publishable API key
const stripePromise = loadStripe('pk_test_51PF6LDRstIQazR5W2u8lZQOdZYnpPwjDaGV0j4idlQdy3yNgtayP6g8ZrCb7gZn6Wn2tVMgI1GqIiqwhcrIi1zDF00wnViVLGm'); // Replace with your publishable key

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const handleClick = async (productName, price) => {
    const stripe = await stripePromise;

    // Send a request to the backend to create a checkout session
    const response = await fetch('http://localhost:4000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName, price }), // Send product name and price to the backend
    });

    if (response.ok) {
      // If the request is successful, retrieve the session ID from the response
      const session = await response.json();

      // Redirect the user to the Stripe Checkout page using the session ID
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        // If there is an error during the redirect, display the error message
        setError(result.error.message);
      }
    } else {
      // If there is an error creating the checkout session, display an error message
      setError('Error creating checkout session');
    }
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const docRef = doc(db, 'product', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
    fetchProduct();
  }, [id]);



  return (
    <div className="container">
      <h1 className="page-heading">Product Details</h1>
      {product ? (
        <div className="product-card">
          <img src={product.product_image} alt="Product" className="product-image" />
          <div className="product-details">
            <h2>{product.product_name}</h2>
            <p><b>Price:</b> ₱{product.product_price}</p>
            <p><b>Description:</b> {product.product_description}</p>
            <p><b>Quantity:</b> {product.product_quantity}</p>
            <button onClick={()=>handleClick (product.product_name, product.product_price*100)}>Checkout</button>
          </div>
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
}

export default ProductDetail;
