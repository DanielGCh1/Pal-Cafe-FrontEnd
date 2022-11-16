import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const ProductContext = createContext(null)

const ProductProvider = props => {

  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    console.log(selected)
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
