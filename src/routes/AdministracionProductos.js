import { Button, Box, Heading, VStack, Spacer } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import useProduct from '../context/AdministrativeProduct/AdmUseProduct';
import TableComponent from '../componets/TableComponentManagerProducts';

export default function AdministracionProductos() {

    const { amdProduct, admProducts, deliteProduct, editProduct, getAdmProducts } = useProduct();
    let editProductsFilter = false;

    const [list, setList] = useState([]);

    useEffect(() => {
        if (typeof admProducts == 'undefined' || admProducts.length <= 0) {
            getAdmProducts();
        }
        if (admProducts != null) {
            //addElements();
            setList(admProducts);
        }
    }, [admProducts])

    const handleEdit = (id) => {
        console.log(id);

    };

    const handleDelete = (id) => {
        console.log(`Eliminar ${id}`);

    };
    //TODO: editar esto a productos
    const handleEditProducts = () => { 
        //editIngredients();
    };
    return <>
        <VStack h='100vh' alignItems='center'>

            <Box p='6' display="flex" justifyContent={'center'}>
                <Heading color="white" fontWeight="bold" size='2xl'>Administrar Productos</Heading>
            </Box>

            <VStack maxWidth="600px" margin="0 auto" display="flex" flexDirection='column'>
                <TableComponent data={list} onEdit={handleEdit} onDelete={handleDelete} saveChangesProducts={handleEditProducts}/>
            </VStack>
        </VStack>

    </>
}