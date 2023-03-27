import { Button, Box, Heading, VStack, Spacer } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import useProduct from '../context/AdministrativeProduct/AdmUseProduct';
import TableComponent from '../componets/TableComponentManagerProducts';
import { Link, useNavigate } from "react-router-dom";

export default function AdministracionProductos() {

    const { amdProduct, admProducts, deliteProduct, editProduct, getAdmProducts, setProduct, getProductsAux } = useProduct();
    const navigate = useNavigate();

    useEffect(() => {
        if (typeof admProducts == 'undefined' || admProducts.length <= 0) {
            getAdmProducts();
        }
    }, [admProducts])

    const handleEdit = (value) => {
        if (window.confirm("¿Estás seguro de que quieres abandonar esta página para cargar la ventana de editar este ingrediente?")) {
            setProduct(null);
            navigate(`/home/EditarProducto/${value._id}`)
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
            console.log(`Eliminar ${id}`);
            deliteProduct(id);
        }
    };
    //TODO: editar esto a productos
    const handleEditProducts = () => {
        editProduct();
    };
    return <>
        <VStack h='100vh' alignItems='center'>

            <Box p='6' display="flex" justifyContent={'center'}>
                <Heading color="white" fontWeight="bold" size='2xl'>Administrar Productos</Heading>
            </Box>

            <VStack maxWidth="600px" margin="0 auto" display="flex" flexDirection='column'>
                <TableComponent data={admProducts} onEdit={handleEdit} onDelete={handleDelete} saveChangesProducts={handleEditProducts} />
            </VStack>
        </VStack>

    </>
}