import { Button, Box, Heading, VStack, Spacer } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import useIngredient from '../context/Ingredient/UseIngredient';
import TableComponent from '../componets/TableComponent ';

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

    const { ingredient, ingredients, deliteIngredient, editIngredients, getIngredients } = useIngredient();
    let editIngredientsFilter = false;

    const [list, setList] = useState([]);

    useEffect(() => {
        if (typeof ingredients == 'undefined' || ingredients.length <= 0) {
            getIngredients();
        }
        if (ingredients != null) {
            //addElements();
            setList(ingredients);
        }
    }, [ingredients])

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
        {/*
        <VStack>
            <Box p='4' bg="rgba(0,0,0,0.1)" display="flex" justifyContent={'center'}>
                <Heading color="white" fontWeight="bold" size='2xl'>Administrar Ingredientes</Heading>
            </Box>
            <HStack marginBottom="2%" width="100%" padding="2%" bg="rgba(0,0,0,0.1)" alignItems="center" justifyContent="center" color='white'>
                <VStack>
                    <Input
                        justifyContent="left" width="20%"
                        placeholder="Nombre"
                        size="md"
                        type="textarea"
                        w="250px"
                        bg="rgba(0,0,0,.2)"
                    />
                    <Button width="100%" colorScheme='green' onClick={editIngredients}>
                        Buscar
                    </Button>
                </VStack>

            </HStack>

            <TableContainer width="90%">
                <Table variant='simple' bgColor="rgba(0,0,0,.2)" borderRadius="7px">
                    <TableCaption color='white'>Palcafe Historial de Produccion</TableCaption>
                    <Thead>
                        <Tr>
                            <Th color='white'>Nombre</Th>
                            <Th color='white'>Existencias</Th>
                            <Th color='white'>Editar</Th>
                            <Th color='white'>Eliminar</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {list.map((row, i) => (
                            <tr key={i}>
                                <td bg="white">
                                    <Text color="white">{row.ing_nombre}</Text>

                                </td>
                                <td>
                                    <Input name='sales' color='white' value={row.ing_existencias} onChange={e => handleChange(e, i)} />
                                </td>
                                <td>
                                    <Image src={require("../assets/eliminar.png")} width="35px" height="35px" alt="Eliminar" m="auto" borderBlock="1px" borderRadius="5px" bg="rgba(0,0,0,.2)" />
                                </td>
                                <td>
                                    <Image src={require("../assets/eliminar.png")} width="35px" height="35px" alt="Eliminar" m="auto" borderBlock="1px" borderRadius="5px" bg="rgba(0,0,0,.2)" />
                                </td>
                            </tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th color='white'>Nombre</Th>
                            <Th color='white'>Existencias</Th>
                            <Th color='white'>Editar</Th>
                            <Th color='white'>Eliminar</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            <Button
                mt={4}
                colorScheme='red'
                onClick={saveChanges}
                type='submit'
            >
                Guardar cambios
            </Button>
                        </VStack>*/}
        <VStack h='100vh' alignItems='center'>

            <Box p='6' display="flex" justifyContent={'center'}>
                <Heading color="white" fontWeight="bold" size='2xl'>Administrar Ingredientes</Heading>
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