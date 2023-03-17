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

    const [editedItemId, setEditedItemId] = useState(null);
    const [deletedItemId, setDeletedItemId] = useState(null);

    const handleEdit = (id) => {
        console.log(`Editar ${id}`);
        setEditedItemId(id);
    };

    const handleDelete = (id) => {
        console.log(`Eliminar ${id}`);
        setDeletedItemId(id);
    };
    return <>
        <VStack h='100vh' alignItems='center'>

            <Box p='6' display="flex" justifyContent={'center'}>
                <Heading color="white" fontWeight="bold" size='2xl'>Administrar Productos</Heading>
            </Box>

            <VStack maxWidth="600px" margin="0 auto" display="flex" flexDirection='column'>
                <TableComponent data={list} onEdit={handleEdit} onDelete={handleDelete} />
                <Button marginTop="20px" bg="red" color="white" onClick={() => console.log('Guardar')}>
                    Guardar cambios
                </Button>
            </VStack>
        </VStack>

    </>
}