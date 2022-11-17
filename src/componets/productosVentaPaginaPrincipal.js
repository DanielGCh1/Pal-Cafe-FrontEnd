import HeaderPaginaPrincipal from '../componets/headerPaginaPrincipal'
import { Container, } from '@chakra-ui/react'
import { Outlet } from "react-router-dom";
import ProductoPresentacion from '../componets/productoPresentacion'

import { SimpleGrid } from '@chakra-ui/react'

import useProducts from '../context/Product/UseProduct';
import { useEffect, useState } from 'react';



export default function ProductosVentaPaginaPrincipal() {
    const { products, selected, getProduct, getProducts, setSelected } =
        useProducts();

    const errors = validate(
        selected ? selected.id : '',
        selected ? selected.last_name : '',
        selected ? selected.first_name : '',
        selected ? selected.email : '',
        selected ? selected.first_name : '',
        selected ? selected.first_name : ''
    ); 

    useEffect(() => {
        getProducts();
    }, []);

    const handleClick = id => {
        getProduct(id);
    };


    return <>
        <SimpleGrid columns={[1, null, 3]} spacing='40px'>
        {products.length
                  ? products.map(prod => (
                    <ProductoPresentacion nombre = {prod.first_name} id = {prod.id}/>
                    ))
                  : null}
        </SimpleGrid>
    </>
}

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
  };
  