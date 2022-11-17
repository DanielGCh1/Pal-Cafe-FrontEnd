import HeaderPaginaPrincipal from '../componets/headerPaginaPrincipal'
import { Container, } from '@chakra-ui/react'
import { Outlet } from "react-router-dom";
import ProductoPresentacion from '../componets/productoPresentacion'

import { SimpleGrid } from '@chakra-ui/react'

export default function ProductosVentaPaginaPrincipal() {

    return <>
        <SimpleGrid columns={[1, null, 3]} spacing='40px'>
            <ProductoPresentacion />
            <ProductoPresentacion />
            <ProductoPresentacion />
            <ProductoPresentacion />
            <ProductoPresentacion />
            <ProductoPresentacion />
        </SimpleGrid>
    </>
}