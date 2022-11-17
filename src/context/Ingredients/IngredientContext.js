import React, { createContext, useState } from 'react';
import axios from 'axios';

const IngredientContext = createContext(null)

const IngredientProvider = props => {

  const [ingredients, setIngredients] = useState([])
  const [selected, setSelected] = useState(null)

  const getIngredients = async () => {
    try {
      const res = await axios.get('https://reqres.in/api/users');
      const data = res.data.data;
      setIngredients(data)
    } catch (error) {
      console.error(error);
    }
  };

  const getIngredient = async id => {
    try {
      // const res = axios.get('https://reqres.in/api/users' + id)
      //   .then((res) => {
      //     setSelectedProduct(res.data.data)
      //   })
      const ingredient = await ingredients.find((ingredient) => {return ingredient.id === id})
      console.log(ingredient)
      setSelected(ingredient)
      console.log(selected)
    } catch (error) {}
  };

  return (
    <IngredientContext.Provider
      value={{
        ingredients,
        selected,
        getIngredients,
        getIngredient,
      }}
    >
      {props.children}
    </IngredientContext.Provider>
  );
};

export { IngredientProvider }
export default IngredientContext;