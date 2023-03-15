import { Button, Box, Heading, VStack, Spacer } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import useIngredient from '../context/Ingredient/UseIngredient';
import TableComponent from '../componets/TableComponentManagerIngredients';
import { Link, useNavigate } from "react-router-dom";

export default function ManageIngredient() {

    /*
    const handleChange = (e, i) => {
        const { name, value } = e.target
        const vector = [...list]
        vector[i][name] = value
        setList(vector)
        console.log(list)
    }
    
    const saveChanges = () => {
        editIngredients(list, editIngredientsFilter);
    }
    const addElement = (element) => {
        setList([...list,
            {
                ing_nombre: element.ing_nombre, ing_descripcion: element.ing_descripcion,
                ing_precio: element.ing_precio, ing_tipo_unidad: element.ing_tipo_unidad, ing_cantidad: element.ing_cantidad,
                ing_imagen: element.ing_imagen, ing_existencias: element.ing_existencias
            }
        ])
    }
    const addElements = () => {
        
        const listIng = ingredients.map(row => (
            {
                ing_nombre: row.ing_nombre, ing_descripcion: row.ing_descripcion,
                ing_precio: row.ing_precio, ing_tipo_unidad: row.ing_tipo_unidad, ing_cantidad: row.ing_cantidad,
                ing_imagen: row.ing_imagen, ing_existencias: row.ing_existencias
            })
            )
            setList(listIng);
        }
        */

    const { ingredient, ingredients, deliteIngredient, editIngredients, setIngredient, getIngredients, getIngredientsAux } = useIngredient();
    let editIngredientsFilter = false;
    const navigate = useNavigate();

    const [list, setList] = useState([]);

    useEffect(() => {
        if (typeof ingredients == 'undefined' || ingredients.length <= 0) {
            getIngredients();
            getIngredientsAux();
        }
        if (ingredients != null) {
            //addElements();
            //const l = [...ingredients];
            const nuevaLista = ingredients.concat([]);
            setList(nuevaLista);
        }
    }, [ingredients])

    const [editedItemId, setEditedItemId] = useState(null);
    const [deletedItemId, setDeletedItemId] = useState(null);

    const handleEdit = (value) => {
        if (window.confirm("¿Estás seguro de que quieres habandonar esta pagina, para cargar la ventana de editar este ingrediente?")) {
            setIngredient(null);
            navigate(`/home/EditarIngrediente/${value._id}`)
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
            console.log(`Eliminar ${id}`);
            deliteIngredient(id);
        }
    };

    const handleEditIngredients = (listIngredients) => {
        editIngredients(listIngredients, editIngredientsFilter);
    };
    return <>
        <VStack h='100vh' alignItems='center'>

            <Box p='6' display="flex" justifyContent={'center'}>
                <Heading color="white" fontWeight="bold" size='2xl'>Administrar Ingredientes</Heading>
            </Box>

            <VStack maxWidth="600px" margin="0 auto" display="flex" flexDirection='column'>
                <TableComponent data={list} onEdit={handleEdit} onDelete={handleDelete} saveChangesIngredients={handleEditIngredients} />
            </VStack>
        </VStack>

    </>
}