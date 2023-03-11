import React, { createContext, useState } from 'react';
import axios from 'axios';

const PromotionContext = createContext(null)

const PromotionProvider = props => {
  const [selected, setSelected] = useState(null)
  const [promotions, setPromociones] = useState([]);

  const addPromocion = async (values, actions) => {
    try {
      const response = await axios.post("/api/promociones", values);
      setPromociones([...promotions, response.data]);
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false)
  };

  const getPromotions = async () => {
    try {
      const res = await axios.get('https://reqres.in/api/users');
      const data = res.data.data;
      setPromociones(data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PromotionContext.Provider
      value={{
        promotions,
        selected,
        addPromocion,
      }}
    >
      {props.children}
    </PromotionContext.Provider>
  );
};

export { PromotionProvider }
export default PromotionContext;
