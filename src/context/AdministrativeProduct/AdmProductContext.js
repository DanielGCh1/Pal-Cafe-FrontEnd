import React, { createContext, useState } from 'react';
import Axios from "axios";
import API from '../api';

const AdmProductContext = createContext(null)

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

const deliteItemList = (data, itemId) => {
  if (!isUndefinedOrNull(data) && data.length > 0) {
    return data.filter((element) => element._id != itemId);
  }
  return [];
};

const searchItemList = (data, itemId) => {
  if (!isUndefinedOrNull(data) && data.length > 0) {
    console.log(data.find((element) => { return element._id == itemId }));
    return data.find((element) => { return element._id == itemId });
  }
  return null;
};

const AdmProductProvider = props => {

  const [admProducts, setAdmProducts] = useState([])
  const [admProductsAux, setAdmProductsAux] = useState([])
  const [admProduct, setAdmProduct] = useState(null)
  const [receta, setReceta] = useState([])
  const [productUrl, setProductUrl] = useState(null)

  const getAdmProducts = async () => {
    try {
      //Obtener todos los productos de la parte del cliente, sin todos los datos
      const res = await Axios.get('/api/productos/get-all');
      const data = res.data;
      setAdmProducts(data);
      addAdmProductsAux(data);
      console.log("los productos llegan al contex")
    } catch (error) {
      console.log("La consulta de optener productos falló");
    }
  };

  const getAdmProduct = async id => {
    try {
      const res = await Axios.get(`/api/producto/${id}`);
      const data = res.data;
      setAdmProduct(data[0]);
      console.log(data)
      console.log("Se buscó el producto");
    } catch (error) {
      console.log("La consulta de obtener el producto falló");
    }
  };
  const getProductImageUrl = async id => {
    try {
      const response = await Axios.get(`/api/productos/imagen/${id}`);
      if (response.status = 200) {
        setProductUrl(`http://localhost:3001/api/productos/imagen/${id}`);
      }
      else {
        setProductUrl(require('../../assets/ImagenNoEncontrada.png'));
      }
    } catch (error) {
      console.log('La consulta para obtener la imagen del productos falló');
      setProductUrl(require('../../assets/ImagenNoEncontrada.png'));
    }
  };

  const addAdmProductsAux = async (data) => {//TODO:
    if (!isUndefinedOrNull(data) && data.length > 0) {
      const list = [];
      data.map((element) => {
        const pro = {
          _id: element._id,
          pro_nombre: element.pro_nombre, pro_valor_venta: element.pro_valor_venta, pro_duracion: element.pro_duracion,
          pro_valor_tiempo: element.pro_valor_tiempo, pro_valor_unidad: element.pro_valor_unidad, pro_cantidad: element.pro_cantidad,
          pro_precio_mano_obra: element.pro_precio_mano_obra, pro_descripcion: element.pro_descripcion, pro_imagen: element.pro_imagen,
          pro_existencias: element.pro_existencias, pro_valor_total_unidad: element.pro_valor_total_unidad
        }
        list.push(pro);
      }
      )
      setAdmProductsAux(list);
    }
  };

  const addAdmProduct = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append('nombre', values.nombre);
      formData.append('valor_venta', values.valor_venta);
      formData.append('duracion', values.duracion);
      formData.append('valor_tiempo', values.valor_tiempo);
      formData.append('valor_total_unidad', values.valor_total_unidad);
      formData.append('cantidad', values.cantidad);
      formData.append('precio_mano_obra', values.precio_mano_obra);
      formData.append('descripcion', values.descripcion);
      formData.append('imagen', values.imagen);
      formData.append('existencias', values.existencias);
      formData.append('receta', receta);


      const response = await Axios.post('/api/productos/add', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status == 200) {
        window.alert(response.data.message);
      }
      else {
        window.alert(response.data.message);
      }
    } catch (error) {
      console.log(error)
      window.alert("Error inesperado al agregar el producto");
    }
    actions.setSubmitting(false);
  };

  const deleteAdmProduct = async (id) => {
    try {
      let response;
      await Axios.delete(`/api/productos/delete/${id}`).then((data => response = data));
      if (response.status == 200) {
        setAdmProductsAux((current) => current.filter((admProductsAux) => admProductsAux._id != id))
        setAdmProducts((current) => current.filter((admProducts) => admProducts._id != id))
        window.alert(response.data.message);
      }
      else {
        window.alert(response.data.message);
      }
    } catch (error) {
      window.alert("Error inesperado al eliminar el producto");
    }
  };
  const editAdmProductRecipe = async () => {
    try {

      Axios.put(`/api/productos/edit/${admProduct._id}`, admProduct).then((data => console.log(data)))
    } catch (error) { }
  };

  const editAdmProduct = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append('nombre', values.nombre);
      formData.append('valor_venta', values.valor_venta);
      formData.append('duracion', values.duracion);
      formData.append('valor_tiempo', values.valor_tiempo);
      formData.append('valor_total_unidad', values.valor_total_unidad);
      formData.append('cantidad', values.cantidad);
      formData.append('precio_mano_obra', values.precio_mano_obra);
      formData.append('descripcion', values.descripcion);
      formData.append('imagen', values.imagen);
      formData.append('existencias', values.existencias);
      formData.append('receta', values.pro_ingredientes);
      formData.append('newImage', values.newImage);


      const response = await Axios.put(`/api/productos/edit/${values._id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status == 200) {
        window.alert(response.data.message);
      }
      else {
        window.alert(response.data.message);
      }
    } catch (error) {
      console.log(error)
      window.alert("Error inesperado al editar el producto");
    }
    actions.setSubmitting(false);
  };

  const editAdmProductList = async (values, proAux) => { //TODO:
    try {
      const pro = {
        _id: values._id,
        nombre: values.pro_nombre, valor_venta: values.pro_valor_venta, duracion: values.pro_duracion,
        valor_tiempo: values.pro_valor_tiempo, pro_valor_unidad: values.pro_valor_unidad, cantidad: values.pro_cantidad,
        precio_mano_obra: values.pro_precio_mano_obra, descripcion: values.pro_descripcion, imagen: values.pro_imagen,
        existencias: values.pro_existencias, valor_total_unidad: values.pro_valor_total_unidad, receta: values.pro_ingredientes
      }

      const response = await Axios.put(`/api/productos/edit/${values._id}`, pro);
      if (response.status == 200) {
        proAux.pro_existencias = values.pro_existencias;
      }
      else {
        window.alert(response.data.message + " " + values.pro_nombre);
      }

    } catch (error) {
      window.alert("Error inesperado al editar el ingrediente");
    }
  };

  const editAdmProducts = async () => {
    console.log('editAdmProducts');
    try {
      for (let i = 0; i < admProducts.length; i++) {
        var aux = searchItemList(admProductsAux, admProducts[i]._id);
        console.log(admProducts[i].pro_existencias);
        console.log(aux.pro_existencias);
        if (admProducts[i].pro_existencias !== aux.pro_existencias) {
          console.log("el producto ");
          console.log(admProducts[i].pro_existencias);
          console.log("cambio");
          editAdmProductList(admProducts[i], aux);
        }
      }
    } catch (error) {
      window.alert("Hubo un error inesperado al editar el producto");
    }
  }


  const addIngredientList = (ingredient) => {
    var ingredientPro = null;
    var list = [];
    var ing = null;
    if (!isUndefinedOrNull(ingredient)) {
      console.log(ingredient);
      ing = searchItemList(admProduct.pro_ingredientes, ingredient._id);
      console.log(ing);
      if (isUndefinedOrNull(ing)) {
        ingredientPro = {
          _id: ingredient._id,
          nombre_ingrediente: ingredient.ing_nombre,
          cantidad_original_ingrediente: ingredient.ing_cantidad,
          unidad: ingredient.ing_tipo_unidad,
          cantidad_ingrediente: 0,
          precio_original_ingrediente: ingredient.ing_precio
        }
        list = admProduct.pro_ingredientes;
        list.push(ingredientPro);
        admProduct.pro_ingredientes = list;
        window.alert("Se agregó el ingrediente");
      }
    }
    else {
      window.alert("El ingrediente no existe")
    }
    console.log(admProduct.pro_ingredientes);
  };

  const deliteIngredientList = (ingredient) => {
    var list = [];
    var ing = null;
    if (!isUndefinedOrNull(ingredient)) {
      ing = searchItemList(admProduct.pro_ingredientes, ingredient);
      console.log(ingredient);
      console.log(admProduct.pro_ingredientes);
      if (!isUndefinedOrNull(ing)) {
        admProduct.pro_ingredientes = deliteItemList(admProduct.pro_ingredientes, ing._id);
        console.log("Se elimino el ingrediente");
        window.alert("Se elimino el ingrediente");
      }
    }
    else {
      console.log("El ingrediente no existe en la lista");
      window.alert("El ingrediente no existe en la lista")
    }
    console.log(admProduct.pro_ingredientes);
  };
  return (
    <AdmProductContext.Provider
      value={{
        admProduct,
        admProducts,
        setAdmProduct,
        setAdmProducts,
        getAdmProducts,
        getAdmProduct,
        addAdmProduct,
        deleteAdmProduct,
        editAdmProducts,
        editAdmProduct,
        addIngredientList,
        editAdmProductRecipe,
        deliteIngredientList,
        productUrl,
        setProductUrl,
        getProductImageUrl,
        editAdmProducts,
        setAdmProducts,
        admProductsAux
      }}
    >
      {props.children}
    </AdmProductContext.Provider>
  );
};

export { AdmProductProvider }
export default AdmProductContext;
