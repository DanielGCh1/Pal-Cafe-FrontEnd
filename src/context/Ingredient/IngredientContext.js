import React, { createContext, useState } from 'react';
import Axios from "axios";
import API from '../api';

const IngredientContext = createContext(null)

const IngredientProvider = props => {

  const [ingredients, setIngredients] = useState([])
  const [ingredientsfilter, setIngredientsfilter] = useState([])
  const [ingredient, setIngredient] = useState(null)

  const getIngredients = async () => {
    try {
      const res = await Axios.get('/api/ingredientes/get-all');
      const data = res.data;
      setIngredients(data);
      console.log(data)
      console.log("los ingredientes llegan al contex");
    } catch (error) {
      console.log("La consulta de optener ingredientes, fallo");
    }
  };

  const getIngredient = async id => {

  };
  const getIngredientFilter = async name => {
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
  const deliteIngredient = async id => {

  };
  const editIngredient = async (values) => {
    /*try {
      Axios.post('/api/ingredientes/add', {
        ing_nombre: values.name, ing_descripcion: values.description,
        ing_precio: values.price, ing_tipo_unidad: values.drive_type, ing_cantidad: values.amount,
        ing_imagen: values.image, ing_existencias: values.stock
      }, {
        withCredentials: true
      }).then((data => console.log(data)))
    } catch (error) { }*/
  };
  const editIngredients = async (listIngredients, editIngredientsFilter) => {
    try {
      if (!editIngredientsFilter) {
        if (listIngredients.length == ingredients.length) {
          for (let i = 0; i < listIngredients.length; i++) {
            if (listIngredients[i] != ingredients[i]) {
              console.log("el ingrediente ");
              console.log(listIngredients[i]);
              console.log("cambio");
              editIngredient(listIngredients[i]);
            }
          }
        }
        else {
          setTimeout(() => {
            alert(JSON.stringify("Las listas de ingredientes no son el mismo tamaño", null, 2))

          }, 1000)
        }
      }
      else {
        if (listIngredients.length == ingredientsfilter.length) {
          for (let i = 0; i < listIngredients.length; i++) {
            if (ingredientsfilter[i] != listIngredients[i]) {
              console.log("el ingrediente ");
              console.log(listIngredients[i]);
              console.log("cambio");
              editIngredient(listIngredients[i]);
            }
          }
        }
        else {
          setTimeout(() => {
            alert(JSON.stringify("Las listas de ingredientes no son el mismo tamaño", null, 2))

          }, 1000)
        }
      }

    } catch (error) { }
  };
  return (
    <IngredientContext.Provider
      value={{
        ingredients,
        ingredient,
        getIngredients,
        ingredientsfilter,
        getIngredient,
        setIngredient,
        addIngredient,
        deliteIngredient,
        editIngredients,
      }}
    >
      {props.children}
    </IngredientContext.Provider>
  );
};

export { IngredientProvider }
export default IngredientContext;