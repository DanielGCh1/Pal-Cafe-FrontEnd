import React, { createContext, useState } from 'react';
import Axios from 'axios';
import API from '../api';

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

const ProductContext = createContext(null)

const ProductProvider = props => {

  const [products, setProducts] = useState([])
  const [productsAux, setProductsAux] = useState([])
  const [product, setProduct] = useState([null])

  const getProducts = async () => {
    try {
      const res = await Axios.get('/api/productos/get-all');
      const data = res.data;
      setProducts(data);
      addProductsAux(data);//TODO:
      console.log("los productos llegan al contex");
    } catch (error) {
      console.log("La consulta de optener productos falló");
    }
  };

  const addProductsAux = async (data) => {//TODO:
    if (!isUndefinedOrNull(data) && data.length > 0) {
      const list = [];
      data.map((element) => {
        const pro = {
          _id: element._id,
          pro_nombre: element.pro_nombre, pro_valor_venta: element.pro_valor_venta,
          pro_descripcion: element.pro_descripcion, pro_imagen: element.pro_imagen,
          pro_existencias: element.pro_existencias, pro_unidades: element.pro_unidades
        }
        list.push(pro);
      }
      )
      setProductsAux(list);
    }
  };

  const addProduct = async (values, actions) => {
    try {
      Axios.post('/api/products/add', {
        pro_nombre: values.nombre, pro_valor_venta: values.valor_venta,
        pro_descripcion: values.descripcion, pro_imagen: values.imagen, pro_existencias: values.existencias,
        pro_unidades: values.unidades
      }, {
        withCredentials: true
      }).then((data => console.log(data)))
      actions.setSubmitting(false)
    } catch (error) { }
  };

  const deliteProduct = async (id) => {
    console.log(id);
    try {
      // TODO: 
      Axios.delete(`/api/productos/delete/${id}`).then((data => console.log(data)));
      setProductsAux((current) => current.filter((productsAux) => productsAux._id != id))
      setProducts((current) => current.filter((products) => products._id != id))
    } catch (error) { }
  };

  const editProduct = async (values, actions) => {
    try {
      // TODO:
      console.log(values);
      const val = {
        _id: values._id,
        pro_nombre: values.nombre, pro_valor_venta: values.valor_venta,
        pro_descripcion: values.descripcion, pro_imagen: values.imagen, pro_existencias: values.existencias,
        pro_unidades: values.unidades
      };
      Axios.put(`/api/productos/edit/${values._id}`, val).then((data => console.log(data)))
    } catch (error) { }
    actions.setSubmitting(false);
  };

  const editProductList = async (values, proAux) => { //TODO:
    try {
      // TODO: 
      console.log(values);
      Axios.put(`/api/productos/edit/${values._id}`, values).then((data => console.log(data)))
      proAux.pro_existencias = values.pro_existencias;
    } catch (error) { }
  };

  const editProducts = async () => {//TODO:
    try {
      if (products.length == productsAux.length) {
        for (let i = 0; i < products.length; i++) {
          if (products[i].pro_existencias !== productsAux[i].pro_existencias) {
            console.log("el producto ");
            console.log(products[i].pro_existencias);
            console.log("cambio");
            editProductList(products[i], productsAux[i]);
          }
        }
      }
      else {
        setTimeout(() => {
          alert(JSON.stringify("Las listas de productos no son el mismo tamaño", null, 2))

        }, 1000)
      }
    } catch (error) { }
  };

  const getProduct = async id => {
    try {
      const res = await Axios.get(`/api/productos/${id}`);
      const data = res.data;
      setProduct(data);
      console.log(data)
      console.log("Se buscó el producto");
    } catch (error) {
      console.log("La consulta de obtener el producto falló");
    }
  };

  const getProductFilter = async name => {
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        products,
        setProduct,
        setProducts,
        getProducts,
        getProduct,
        addProduct,
        deliteProduct,
        editProducts,
        editProduct
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export { ProductProvider }
export default ProductContext;
