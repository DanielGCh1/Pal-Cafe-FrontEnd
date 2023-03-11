import React, { createContext, useState } from 'react';
import Axios from "axios";
import API from '../api';

const IngredientContext = createContext(null)

const IngredientProvider = props => {

  const [ingredients, setIngredients] = useState([])
  const [ingredient, setIngredient] = useState(null)

  const getIngredients = async () => {
    try {
      const res = await Axios.get('https://reqres.in/api/users');
      const data = res.data.data;
      setIngredients(data)
    } catch (error) {
      console.error(error);
    }
  };

  const getIngredient = async id => {
    /*try {
      // const res = axios.get('https://reqres.in/api/users' + id)
      //   .then((res) => {
      //     setSelectedProduct(res.data.data)
      //   })
      const ingredient = await ingredients.find((ingredient) => { return ingredient.id === id })
      console.log(ingredient)
      //setSelected(ingredient)
      //console.log(selected)
    } catch (error) { }*/
  };
  const addIngredient = async (values, actions) => {
    try {
      Axios.post('/api/ingredientes/add', {
        ing_nombre: values.name, ing_descripcion: values.description,
        ing_precio: values.price, ing_tipo_unidad: values.drive_type, ing_cantidad: values.amount,
        ing_imagen: values.image, ing_existencias: values.stock
      }, {
        withCredentials: true
      }).then((data => console.log(data)))
      actions.setSubmitting(false)
    } catch (error) { }
  };

  return (
    <IngredientContext.Provider
      value={{
        ingredients,
        ingredient,
        getIngredients,
        getIngredient,
        setIngredient,
        addIngredient
      }}
    >
      {props.children}
    </IngredientContext.Provider>
  );
};

export { IngredientProvider }
export default IngredientContext;