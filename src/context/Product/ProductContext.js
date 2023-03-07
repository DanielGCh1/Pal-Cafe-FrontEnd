import React, { createContext, useState } from 'react';
import axios from 'axios';
import API from '../api';
import { string } from 'yup';

const ProductContext = createContext(null)

const ProductProvider = props => {

  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState(null)

  const getProducts = async () => {
    try {
      const res = await API.get('https://reqres.in/api/users');
      const data = res.data;
      setProducts(data)
    } catch (error) {
      console.error(error);
    }
  };

  const getProduct = id => {
    try {
      const product = products.find((product) => {return product._id === id})   
      setSelected(product)
    } catch (error) {}
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        selected,
        setSelected,
        getProducts,
        getProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export { ProductProvider }
export default ProductContext;
