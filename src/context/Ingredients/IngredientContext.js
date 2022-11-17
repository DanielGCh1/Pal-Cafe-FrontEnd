import React, { createContext, useState } from 'react';
import axios from 'axios';
import API from '../api';

const IngredientContext = createContext(null)

const IngredientProvider = props => {

  const [ingredients, setIngredients] = useState([])
  const [selected, setSelected] = useState(null)
  const [ingredientesModify, setIngredientesModify] = useState([])


  const getIngredients = async () => {
    try {
      const res = await API.get('/ingredientes/get-all');
      const data = res.data;
      setIngredients(data)
    } catch (error) {
      console.error(error);
    }
  };

  const getIngredient = async id => {
    try {
      const ingredient = await ingredients.find((ingredient) => { return ingredient._id === id })
      return ingredient
    } catch (error) { }
  };

  const modificarIngredientes = async () => {
    try {
      await ingredientesModify?.map((ing) => {
         API.put("/ingredientes/edit/:" + ing._id, ing)
      });
    } catch (error) {
      console.log(error)
    }
  };

  const agregarIngredientePrelista = ({selc}) => {
    try {
      setIngredientesModify(selc)
      console.log(ingredientesModify)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <IngredientContext.Provider
      value={{
        ingredients,
        selected,
        getIngredients,
        getIngredient,
        setSelected,
        modificarIngredientes,
        agregarIngredientePrelista,
        ingredientesModify,
        setIngredientesModify
      }}
    >
      {props.children}
    </IngredientContext.Provider>
  );
};

export { IngredientProvider }
export default IngredientContext;