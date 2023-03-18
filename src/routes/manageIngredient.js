import { Button, Box, Heading, VStack, Spacer } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import useIngredient from '../context/Ingredient/UseIngredient';
import TableComponent from '../componets/TableComponentManagerIngredients';
import { Link, useNavigate } from "react-router-dom";

export default function ManageIngredient() {
    const { ingredient, ingredients, deliteIngredient, editIngredients, setIngredient, getIngredients, getIngredientsAux } = useIngredient();
    const navigate = useNavigate();

    useEffect(() => {
        if (typeof ingredients == 'undefined' || ingredients.length <= 0) {
            getIngredients();//TODO:
        }
    }, [ingredients])

    const handleEdit = (value) => {//TODO:
        if (window.confirm("¿Estás seguro de que quieres habandonar esta pagina, para cargar la ventana de editar este ingrediente?")) {
            setIngredient(null);
            navigate(`/home/EditarIngrediente/${value._id}`)
        }
    };

    const handleDelete = (id) => {//TODO:
        if (window.confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
            console.log(`Eliminar ${id}`);
            deliteIngredient(id);
        }
    };

    const handleEditIngredients = () => {//TODO:
        editIngredients();
    };
    return <>
        <VStack h='100vh' alignItems='center'>

            <Box p='6' display="flex" justifyContent={'center'}>
                <Heading color="white" fontWeight="bold" size='2xl'>Administrar Ingredientes</Heading>
            </Box>

            <VStack maxWidth="600px" margin="0 auto" display="flex" flexDirection='column'>
                <TableComponent data={ingredients} onEdit={handleEdit} onDelete={handleDelete} saveChangesIngredients={handleEditIngredients} />
            </VStack>
        </VStack>

    </>
}