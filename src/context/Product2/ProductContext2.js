import React, { createContext, useState, useMemo ,useEffect } from 'react';
import axios from 'axios';
import API from '../api';
import { string } from 'yup';

const ProductContext2 = createContext(null)

const ProductProvider2 = props => {

  const [products2, setProducts2] = useState([])
  const [selected2, setSelected2] = useState(null)

  // Prueba de useMemo

  const [idProduct, setIdProduct] = useState(null);

  

  const idProdu = useMemo(() => ({ idProduct, setIdProduct }), [idProduct, setIdProduct]);

  // Prueba de useMemo

  const getProducts2 = async () => {
    try {
      const res = await API.get('https://reqres.in/api/users');
      const data = res.data.data;
      setProducts2(data)
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessageWhatsApp = async () => {
    let numero = '+50661282136';

    //Definir el contenido del mensaje.
    let mensaje = 'Hola, ¿cómo estás?';

    console.log("sendMessageWhatsApp");

    // Verificar si el navegador soporta la API de WhatsApp
  if (!navigator.share) {
    alert('Tu navegador no soporta la API de WhatsApp');
    return;
  }

  // Enviar el mensaje usando la API de WhatsApp
  navigator.share({
    title: 'Mensaje',
    text: mensaje,
    url: 'https://api.whatsapp.com/send?phone=' + numero + '&text=' + mensaje,
  })

  .then(() => console.log('Mensaje enviado'))

  .catch((error) => console.log('Error al enviar el mensaje', error));   

  };

  const getProduct2 = id => {
    try {
      console.log("1)El id del pruducto que busco es el ", id , ".");
      setIdProduct(id);
      console.log("1.1)El id del pruducto de useMemo es ", idProduct , ".");

      const product = products2.find((product) => {return product.id === id})   
      setSelected2(product)
      console.log("2) El producto selecionado fue el ", selected2 , ".");
      console.log("3) Lista de productos ", products2 , ".");
    } catch (error) {}
  };

  return (
    <ProductContext2.Provider
      value={{
        products2,
        selected2,
        setSelected2,
        getProducts2,
        sendMessageWhatsApp,
        getProduct2,
        idProdu
      }}
    >
      {props.children}
    </ProductContext2.Provider>
  );
};

export { ProductProvider2 }
export default ProductContext2;
