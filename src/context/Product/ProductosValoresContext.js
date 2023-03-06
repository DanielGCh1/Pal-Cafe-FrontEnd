import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const ProductosValoresContext = createContext();

const ProductosValoresProvider = ({ children }) => {

  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
  //  console.log(selected)
  }, [selected])

  const getProducts = async () => {
    try {
      const res = await axios.get('https://reqres.in/api/users');
      const data = res.data.data;
      setProducts(data)
      console.log(products)
    } catch (error) {
      console.error(error);
    }
  };

  const getProduct = id => {
    try {
      const product = products.find((product) => {return product.id === id})
      console.log(product)
       setSelected(product)
      
    } catch (error) {}
  };

  const data = {products, selected, setSelected, getProducts, getProduct}

  return (
    <ProductosValoresContext.Provider value={{
      products,
      selected,
      setSelected,
      setProducts,
      getProducts,
      getProduct,
    }}>{children}</ProductosValoresContext.Provider>
  );
};

export { ProductosValoresProvider }
export default ProductosValoresContext;
