import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../configs/firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import '../App.css'; // Import CSS file

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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
          </div>
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
}

export default ProductDetail;
