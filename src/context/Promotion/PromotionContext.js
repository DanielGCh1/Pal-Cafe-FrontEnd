import React, { createContext, useState } from 'react';
import axios from '../api';
import { useEffect } from "react";

const PromotionContext = createContext(null)

const PromotionProvider = props => {
  const [selected, setSelected] = useState(null)
  const [promotions, setPromociones] = useState([]);


  const addPromocion = async (values, actions) => {
    try {
      await axios.post("/promociones/add", values);
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false)
  };

  const editPromocion = async (values, actions) => {
    try {
      const response = await axios.post("/promociones/edit/:id", values);
      setPromociones([...promotions, response.data]);
      console.log(promotions)
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false)
  };


  const getPromotions = async () => {
    try {
      const res = await axios.get('/promociones/get-all');
      const data = res.data;
      setPromociones(data)
    } catch (error) {
      console.error(error);
    }
  };
  const findPromotionById = (id) => {
    const promotion = promotions.find(promo => promo._id === id);
    return promotion;
  }

  const deletePromotions = async (id) => {
    try {
      const response = await axios.delete(`/promociones/delete/${id}`);
      if (response.status === 200) {
        setPromociones((promotions) => promotions.filter((promocion) => promocion._id !== id));
      } else {
        console.error('Ocurrió un error al eliminar la promoción');
      }
    } catch (error) {
      console.error('Ocurrió un error al eliminar la promoción', error);
    }
  };

  return (
    <PromotionContext.Provider
      value={{
        promotions,
        selected,
        getPromotions,
        editPromocion,
        addPromocion,
        deletePromotions,
        findPromotionById,
      }}
    >
      {props.children}
    </PromotionContext.Provider>
  );
};

export { PromotionProvider }
export default PromotionContext;
