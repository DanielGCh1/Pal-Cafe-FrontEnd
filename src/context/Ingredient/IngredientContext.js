import React, { createContext, useState } from 'react';
import Axios from 'axios'

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

function searchItemList(data, itemId) {
  let itemSearch = null;
  if (!isUndefinedOrNull(data) && data.length > 0) {
    itemSearch = data.find((element) => { return element._id == itemId })
  }
  return itemSearch;
};

const IngredientContext = createContext(null)

const IngredientProvider = (props) => {

  const [ingredients, setIngredients] = useState([])
  const [ingredientsAux, setIngredientsAux] = useState([])//TODO:
  const [ingredient, setIngredient] = useState(null)
  const [ingredientUrl, setIngredientUrl] = useState(null)

  const getIngredients = async () => {
    try {
      const res = await Axios.get('/api/ingredientes/get-all');
      const data = res.data;
      if (data.length > 0) {
        setIngredients(data);
        addIngredientsAux(data);
      }
      console.log("los ingredientes llegan al contex");
    } catch (error) {
      window.alert("Error al optener los ingredientes");
    }
  };
  const addIngredientsAux = async (data) => {
    if (!isUndefinedOrNull(data) && data.length > 0) {
      const list = [];
      data.map((element) => {
        const ing = {
          _id: element._id,
          ing_nombre: element.ing_nombre, ing_descripcion: element.ing_descripcion,
          ing_precio: element.ing_precio, ing_tipo_unidad: element.ing_tipo_unidad, ing_cantidad: element.ing_cantidad,
          ing_imagen: element.ing_imagenURL, ing_existencias: element.ing_existencias
        }
        list.push(ing);
      }
      )
      setIngredientsAux(list);
    }
  };
  const getIngredient = async id => {
    try {
      const response = await Axios.get(`/api/ingredientes/${id}`);
      const data = response.data;
      setIngredient(data);
      if (response.status != 200) {
        window.alert(response.data.message);
      }
    } catch (error) {
      console.log(error)
      window.alert("Error inesperado al buscar el ingrediente");
    }
  };
  const getIngredientImageUrl = async id => {
    try {
      const response = await Axios.get(`/api/ingredientes/imagen/${id}`);
      if (response.status = 200) {
        setIngredientUrl(`http://localhost:3001/api/ingredientes/imagen/${id}`);
      }
      else {
        setIngredientUrl(require('../../assets/ImagenNoEncontrada.png'));
      }
    } catch (error) {
      console.log('La consulta para obtener la imagen del ingrediente falló');
      setIngredientUrl(require('../../assets/ImagenNoEncontrada.png'));
    }
  };


  const addIngredient = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('drive_type', values.drive_type);
      formData.append('amount', values.amount);
      formData.append('image', values.image);
      formData.append('stock', values.stock);
      console.log(formData);
      const response = await Axios.post('/api/ingredientes/add', formData, {
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
      window.alert("Error inesperado al agregar el ingrediente");
    }
    actions.setSubmitting(false);
  };

  const deliteIngredient = async (id) => {
    console.log(id);
    try {
      let response;
      await Axios.delete(`/api/ingredientes/delete/${id}`).then((data => response = data));
      if (response.status == 200) {
        setIngredientsAux((current) => current.filter((ingredientsAux) => ingredientsAux._id != id))
        setIngredients((current) => current.filter((ingredients) => ingredients._id != id))
        window.alert(response.data.message);
      }
      else {
        window.alert(response.data.message);
      }
    } catch (error) {
      window.alert("Error inesperado al eliminar el ingrediente");
    }
  };
  const editIngredient = async (values, actions) => {
    try {
      const formDataEdit = new FormData();
      formDataEdit.append('name', values.name);
      formDataEdit.append('description', values.description);
      formDataEdit.append('price', values.price);
      formDataEdit.append('drive_type', values.drive_type);
      formDataEdit.append('amount', values.amount);
      formDataEdit.append('image', values.image);
      formDataEdit.append('stock', values.stock);
      formDataEdit.append('newImage', values.newImage);

      console.log(formDataEdit);
      //const response = await Axios.put(`/api/ingredientes/edit/${values._id}`, formData, {
      const response = await Axios.put(`/api/ingredientes/edit/${values._id}`, formDataEdit, {
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
      window.alert("Error inesperado al editar el ingrediente");
    }
    actions.setSubmitting(false);
  };
  const editIngredientList = async (values, ingAux) => { //TODO:
    try {
      const ing = {
        _id: values._id,
        name: values.ing_nombre, description: values.ing_descripcion,
        price: values.ing_precio, drive_type: values.ing_tipo_unidad, amount: values.ing_cantidad,
        image: values.ing_imagenURL, stock: values.ing_existencias
      }

      const response = await Axios.put(`/api/ingredientes/edit/${values._id}`, ing);
      if (response.status == 200) {
        ingAux.ing_existencias = values.ing_existencias;
      }
      else {
        window.alert(response.data.message + " " + values.ing_nombre);
      }

    } catch (error) {
      window.alert("Error inesperado al editar el ingrediente");
    }
  };
  const editIngredients = async () => {//TODO:
    try {
      for (let i = 0; i < ingredients.length; i++) {
        var aux = searchItemList(ingredientsAux, ingredients[i]._id);
        if (ingredients[i].ing_existencias !== aux.ing_existencias) {
          console.log("el ingrediente ");
          console.log(ingredients[i].ing_existencias);
          console.log("cambio");
          editIngredientList(ingredients[i], aux);
        }
      }
    } catch (error) {
      window.alert("Hubo un error inesperado al editar los ingredientes");
    }
  };
  return (
    <IngredientContext.Provider
      value={{//TODO:
        ingredients,
        ingredient,
        getIngredients,
        getIngredient,
        setIngredient,
        addIngredient,
        deliteIngredient,
        editIngredients,
        setIngredient,
        editIngredient,
        getIngredientImageUrl,
        ingredientUrl,
        setIngredientUrl,
        ingredientsAux,
        setIngredients
      }}
    >
      {props.children}
    </IngredientContext.Provider>
  );
};

export { IngredientProvider }
export default IngredientContext;