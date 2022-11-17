import React, { createContext, useState } from 'react';
import axios from 'axios';

const PromotionContext = createContext(null)

const PromotionProvider = props => {

  const [promotions, setPromotions] = useState([])
  const [selected, setSelected] = useState(null)

  const getPromotions = async () => {
    try {
      const res = await axios.get('https://reqres.in/api/users');
      const data = res.data.data;
      setPromotions(data)
    } catch (error) {
      console.error(error);
    }
  };

  const getPromotion = id => {
    try {
      const promotion = promotions.find((promotion) => {return promotion.id === id})
       setSelected(promotion)  
    } catch (error) {}
  };

  return (
    <PromotionContext.Provider
      value={{
        promotions,
        selected,
        setSelected,
        getPromotions,
        getPromotion,
      }}
    >
      {props.children}
    </PromotionContext.Provider>
  );
};

export { PromotionProvider }
export default PromotionContext;
