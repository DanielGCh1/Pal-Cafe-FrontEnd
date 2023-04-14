import HeaderPaginaPrincipal from './headerPaginaPrincipal'
import { Button, Container, } from '@chakra-ui/react'
import { Outlet } from "react-router-dom";
import ProductoPresentacion from './productoPresentacion'

import { SimpleGrid } from '@chakra-ui/react'

//import useProducts from '../context/Product/UseProduct';

import { useContext, useEffect, useState } from 'react';

import useProducts from '../context/Product/UseProduct';

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

export default function ProductosVentaPaginaPrincipal() {

  const { products, productSelected, setProducts, getProduct, getProducts, setProductSelected } =
    useProducts();

  useEffect(() => {

    if (isUndefinedOrNull(products) || products.length <= 0) {
      getProducts();
    }


  }, [products]);
  /*
    const errors = validate(
      selected ? selected.id : '',
      selected ? selected.last_name : '',
      selected ? selected.first_name : '',
      selected ? selected.email : '',
      selected ? selected.first_name : '',
      selected ? selected.first_name : ''
    );*/

  const hola = id => {
    //setProducts(PRODUCTOS_REPOSTERIA);
    console.log(products);
    console.log(productSelected);
    console.log("Aqui se envia los mensajes de whasapp");
    /*//Para enviar un mensaje de WhatsApp a un número de Costa Rica, puedes usar la API de WhatsApp para programar el envío. Primero, necesitas obtener un token de acceso para la API. Luego, puedes usar el siguiente código para enviar el mensaje:

    //Definir los parámetros del mensaje
    const messageParams = {
      phoneNumber: '+50661282136', //Número al que se enviará el mensaje
      text: 'Hola! Este es mi mensaje.' //Mensaje que se enviará
    };

    //Enviar el mensaje utilizando la API de WhatsApp
    fetch('https://api.whatsapp.com/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}` //Token de acceso a la API de WhatsApp
      },
      body: JSON.stringify(messageParams) //Parámetros del mensaje a enviar como un objeto JSON codificado como cadena de texto.  
    })*/

  };

  return <>
    <Button onClick={hola}>

    </Button>

    <SimpleGrid columns={[1, 2, 3]} spacing='40px'>
      {((typeof products !== 'undefined') && (products.length > 0))
        ? products.map((prod, index) => (
          <ProductoPresentacion key={index} 
          textAlign="center" _id={prod._id} image={prod.image} />
        ))
        : null}

    </SimpleGrid>
  </>
}
/*
const validate = (
  name,
  description,
  amount,
  materialPrice,
  salePrice,
  preparationTime
) => {
  if (name !== undefined) if (name.length === 0) return 'Se requiere un nombre';
  if (description !== undefined)
    if (description.length === 0) return 'Se requiere una descripcion';
  if (amount !== undefined)
    if (amount.length === 0) return 'Se requiere una cantidad';
  if (materialPrice !== undefined)
    if (materialPrice.length === 0)
      return 'Se requiere el gasto en ingredientes';
  if (salePrice !== undefined)
    if (salePrice.length === 0) return 'Se requiere el precio de venta';
  if (preparationTime !== undefined)
    if (preparationTime.length === 0)
      return 'Se requiere el tiempo preparacion';
};*/
