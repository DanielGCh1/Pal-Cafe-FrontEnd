import React, { createContext, useState } from 'react';
import axios from 'axios'


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

  const editPromocion = async (values, actions, _id) => {
    try {
      const response = await axios.put(`/promociones/edit/${_id}`, values);

      if(response.status == 200){
        // Find the index of the edited promotion in the promotions array
        const editedPromotionIndex = promotions.findIndex(promotion => promotion._id === _id);
    
        // Replace the edited promotion with the updated promotionif 
        const updatedPromotions = [...promotions];
        updatedPromotions[editedPromotionIndex] = { ...promotions[editedPromotionIndex], ...values };
        
        setPromociones(updatedPromotions);
    }else{
      console.log("Errror al ingresar la promocion");
    }
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false);
  };

  const getPromotions = async () => {
    try {
      const res = await axios.get('/promociones/get-all', {
        withCredentials: true
      });
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
        console.log('Ocurrió un error al eliminar la promoción');
      }
    } catch (error) {
      console.error('Ocurrió un error al eliminar la promoción', error);
    }
  };

  const modifitedPromotions = async (promotions) => {
    axios.put('/promociones/edit-all-stock/', promotions)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
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
        modifitedPromotions
      }}
    >
      {props.children}
    </PromotionContext.Provider>
  );
};

export { PromotionProvider }
export default PromotionContext;
