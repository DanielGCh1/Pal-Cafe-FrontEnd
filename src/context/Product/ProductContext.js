import React, { createContext, useState } from 'react';
import axios from '../api';
import { string } from 'yup';
import { async } from 'q';

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
  
  const formatoProducto = async (data) => {
    var image = await getImageUrl(data._id);
    const pro = {
      _id: data._id,
      name: data.pro_nombre,
      image: image,
      price: data.pro_valor_venta,
      amount: data.pro_cantidad,
      stock: data.pro_existencias,
      description: data.pro_descripcion
    }
    return pro;
  }
  const formatoProductos = async (data) => {
    if (!isUndefinedOrNull(data) && data.length > 0) {
      const list = [];
      for (const element of data) {
        var image = await getImageUrl(element._id);
        const pro = {
          _id: element._id,
          name: element.pro_nombre,
          image: image,
          price: element.pro_valor_venta,
          amount: element.pro_cantidad,
          stock: element.pro_existencias,
          description: element.pro_descripcion
        };
        list.push(pro);
      }
      setProducts(list);
    }
  };
  const getProducts = async () => {
    try {
      //Obtener todos los productos de la parte del cliente, sin todos los datos
      const res = await axios.get('/productos/get-all-homepage');
      //const res = await axios.get('https://reqres.in/users');
      const data = res.data;
      formatoProductos(data);
    } catch (error) {
      console.log("La consulta fallo, procedo a setear unos datos por defecto");
    }
  };

  async function getImageUrl(id) {
    var imageUrl = '';
    try {
      const response = await Axios.get(`/api/productos/imagen/${id}`);
      if (response.status = 200) {
        imageUrl = `http://localhost:3001/api/productos/imagen/${id}`;
      }
      else {
        imageUrl = require('../../assets/ImagenNoEncontrada.png');
      }
    } catch (error) {
      imageUrl = require('../../assets/ImagenNoEncontrada.png');
    }
    return imageUrl;
  };

  const getProduct = async id => {
    try {
      const res = await axios.get(`/producto-homepage/${id}`);
      const data = res.data;
      setProductSelected(await formatoProducto(data[0]))
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
