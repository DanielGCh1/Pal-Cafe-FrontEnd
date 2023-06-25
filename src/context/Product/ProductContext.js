import React, { createContext, useState } from 'react';
import axios from '../api';
import { string } from 'yup';

const ProductContext = createContext(null)

const isUndefined = obj => {
  if (obj === "undefined" || typeof obj === "undefined") {
    return true;
  }
  return false;
};

const isNull = obj => {
  if (obj === null) {
    return true;
  }
  return false;
};

const isUndefinedOrNull = obj => {
  if (isUndefined(obj) || isNull(obj)) {
    return true;
  }
  return false;
};

const ProductProvider = props => {

  const [products, setProducts] = useState([])
  const [productSelected, setProductSelected] = useState(null)
  
  const formatoProducto = (data) => {
    const pro = {
      _id: data._id,
      name: data.pro_nombre,
      image: data.pro_imagenUrl,
      price: data.pro_valor_venta,
      amount: data.pro_cantidad,
      stock: data.pro_existencias,
      description: data.pro_descripcion
    }
    return pro;
  }
  const formatoProductos = (data) => {
    if (!isUndefinedOrNull(data) && data.length > 0) {
      const list = [];
      data.map((element) => {
        const ing = {
          _id: element._id,
          name: element.pro_nombre,
          image: element.pro_imagenUrl,
          price: element.pro_valor_venta,
          amount: element.pro_cantidad,
          stock: element.pro_existencias,
          description: element.pro_descripcion
        }
        list.push(ing);
      }
      )
      setProducts(list);
    }
  }
  const getProducts = async () => {
    try {
      //Obtener todos los productos de la parte del cliente, sin todos los datos
      const res = await axios.get('/api/productos/get-all-homepage');
      //const res = await axios.get('https://reqres.in/api/users');
      const data = res.data;
      formatoProductos(data);
    } catch (error) {
      console.log("La consulta fallo, procedo a setear unos datos por defecto");
    }
  };

  const getProduct = async id => {
    try {
      const res = await axios.get(`/api/producto-homepage/${id}`);
      const data = res.data;
      setProductSelected(formatoProducto(data[0]))
    } catch (error) { }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        productSelected,
        setProducts,
        setProductSelected,
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
