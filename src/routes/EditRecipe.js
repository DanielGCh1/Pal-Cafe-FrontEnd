import { Button, Box, Heading, VStack, Spacer, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import useIngredient from '../context/Ingredient/UseIngredient';
import TableComponent from '../componets/TableIngredientsAddRecipe';
import { Link, useNavigate } from "react-router-dom";
import useAdmProduct from '../context/AdministrativeProduct/AdmUseProduct';
import { useParams } from 'react-router-dom';
import TableComponentEditRecipe from '../componets/TableIngredientsEditRecipe';

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

export default function EditRecipe() {
    const { ingredient, ingredients, setIngredient, getIngredients } = useIngredient();
    const { admProduct, editAdmProduct, getAdmProduct, addIngredientList, editAdmProductRecipe, deliteIngredientList } = useAdmProduct();
    //const navigate = useNavigate();
    const params = useParams();

    const [ingredientList, setIngredientList] = useState([]);


    useEffect(() => {
        if (typeof ingredients == 'undefined' || ingredients.length <= 0) {
            getIngredients();//TODO:
        }
        if (!isUndefinedOrNull(params.id) && isUndefinedOrNull(admProduct)) {
            console.log("Si encontró el id del producto");
            getAdmProduct(params.id);
        }
        if (!isUndefinedOrNull(admProduct)) {
            setIngredientList(admProduct.pro_ingredientes);
          }
    }, [ingredients, admProduct])

    const handleAdd = (value) => {//TODO:
        if (window.confirm("¿Estás seguro de que quieres agregar este ingrediente?")) {
            addIngredientList(value);
            setIngredientList([...ingredientList, value]);
        }
    };

    const handleDelite = (value) => {//TODO:
        if (window.confirm("¿Estás seguro de que quieres eliminar este ingrediente?")) {
            deliteIngredientList(value);
            setIngredientList(admProduct.pro_ingredientes);
        }
    };

    return <>

        {(!isUndefinedOrNull(admProduct) &&!isUndefinedOrNull(ingredients) )
            ?
            <VStack h='100vh' alignItems='center' overflowY="scroll" maxHeight="55rem" sx={{
                "&::-webkit-scrollbar": {
                    width: "7px",
                    backgroundColor: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                    bg: "gray.400",
                    borderRadius: "full",
                    opacity: "0.4",
                    "&:hover": {
                        opacity: "0.7",
                    },
                },
            }}>

                <Box p='6' display="flex" justifyContent={'center'}>
                    <Heading color="white" fontWeight="bold" size='2xl'>Editar Receta de {admProduct.pro_nombre}</Heading>
                </Box>

                <VStack maxWidth="600px" margin="0 auto" display="flex" flexDirection='column'>
                    <TableComponent data={ingredients} onAdd={handleAdd} />
                </VStack>

                <Box p='2' display="flex" justifyContent={'center'}>
                    <Heading color="white" fontWeight="bold" size='1x2'>Lista de ingredientes</Heading>
                </Box>

                <VStack maxWidth="600px" margin="0 auto" display="flex" flexDirection='column'>
                    <TableComponentEditRecipe data={admProduct.pro_ingredientes} ingredients={ingredients} saveChangesRecipe={editAdmProductRecipe} onDelete={handleDelite}/>
                </VStack>
            </VStack>
            : null}
    </>
}