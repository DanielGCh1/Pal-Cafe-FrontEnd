import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Text,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Container,
    VStack,
    HStack,
    Button,
    background,
    Image,
    Input,
} from '@chakra-ui/react'
import { useState, useEffect, useRef, useContext } from 'react'
import useHover from "@react-hook/hover";
import useIngredients from '../context/Ingredients/UseIngredients';

const Fila = ({ props }) => {
    const [desbloquear, setDesbloquear] = useState(true);
    const { getIngredient, agregarIngredientePrelista} = useIngredients();
    const [selected, setSelected] = useState(null)


    useEffect(() => {
        agregarIngredientePrelista({selected});
    }, [selected])


    const handleClickEditar = (id) => {
        return () => {
            desbloquear ? setDesbloquear(false) : setDesbloquear(true);
            setSelected(getIngredient(id))
        }
    };

    return (
        <Tr >
            <Td><input
                type="text"
                name="nombre"
                autoComplete="off"
                disabled={desbloquear ? true : false}
                value={desbloquear ? props.ing_nombre : (selected ? selected.ing_nombre : '')}
                onChange={(ev) => setSelected({ ...selected, ing_nombre: ev.target.value })}
            ></input></Td>
            <Td><input
                type="text"
                name="nombre"
                autoComplete="off"
                disabled={desbloquear ? true : false}
                value={desbloquear ? props.ing_descripcion : (selected ? selected.ing_descripcion : '')}
                onChange={(ev) => setSelected({ ...selected, ing_descripcion: ev.target.value })}
            ></input></Td>
            <Td><input
                type="text"
                name="nombre"
                autoComplete="off"
                disabled={desbloquear ? true : false}
                value={desbloquear ? props.ing_precio : (selected ? selected.ing_precio : '')}
                onChange={(ev) => setSelected({ ...selected, ing_precio: ev.target.value })}
            ></input></Td>
            <Td><input
                type="text"
                name="nombre"
                autoComplete="off"
                disabled={desbloquear ? true : false}
                value={desbloquear ? props.ing_cantidad : (selected ? selected.ing_cantidad : '')}
                onChange={(ev) => setSelected({ ...selected, ing_cantidad: ev.target.value })}
            ></input></Td>
            <Td><input
                type="text"
                name="nombre"
                autoComplete="off"
                disabled={desbloquear ? true : false}
                value={desbloquear ? props.ing_unidadMedida : (selected ? selected.ing_unidadMedida : '')}
                onChange={(ev) => setSelected({ ...selected, ing_unidadMedida: ev.target.value })}
            ></input></Td>
            <Td>
                <Container className="btnEditarImage" w='35px' h='35px' onClick={handleClickEditar(props._id)} />
            </Td>
            <Td>
                <Container className="btnEliminarImage" w='35px' h='35px' />
            </Td>
        </Tr>
    )
}

export default function BuscarMaterial() {
    const { ingredients, selected, getIngredients, getIngredient, setSelected, } = useIngredients();

    useEffect(() => {
        getIngredients();
    }, []);
    const handleSavedChanges = () => {

    }

    return <>
        <VStack color='white' bg='blackAlpha.800' width="100%" h='calc(100vh)' padding="50px 0px 20px 0px" >
            <VStack>
                <HStack>
                    <h1 className="title">Buscar Materiales</h1>
                </HStack>
            </VStack>
            <TableContainer width='80%' bg='white' color='black'>
                <Table variant='striped' colorScheme='blackAlpha'>
                    <Thead bg='red.900'>
                        <Tr>
                            <Th color='white' textAlign="center">Nombre</Th>
                            <Th color='white' textAlign="center">Descripcion</Th>
                            <Th color='white' textAlign="center">Precio</Th>
                            <Th color='white' textAlign="center">Cantidad Actual</Th>
                            <Th color='white' textAlign="center">UnidadMedia</Th>
                            <Th color='white' textAlign="center">Editar</Th>
                            <Th color='white' textAlign="center">Eliminar</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {ingredients && ingredients.map((p) => {
                            return (
                                <Fila key={p._id} props={p} />
                            );
                        })}
                    </Tbody>
                    <Tfoot bg='red.900'>
                        <Th color='white' textAlign="center">Ventas</Th>
                        <Th color='white' textAlign="center">Regalias</Th>
                        <Th color='white' textAlign="center">Experidos</Th>
                        <Th color='white' textAlign="center">Sobrantes</Th>
                        <Th color='white' textAlign="center">Producto</Th>
                        <Th color='white' textAlign="center">Editar</Th>
                        <Th color='white' textAlign="center">Eliminar</Th>
                    </Tfoot>
                </Table>
            </TableContainer>



            {/* Elelementos absolutos */}
            <Button
                color='White'
                bgColor='#822424'
                _hover={{ bg: 'red.900', color: 'White' }}
                position='absolute'
                right='12px'
                top='10px'
                _hover={{ bg: '#FFDB58', color: 'red.900', borderColor: "red.900", borderStyle: "solid", borderWidth: "2px" }}
            >
                Configuracion
            </Button>
            <Button
                color='White'
                bgColor='#822424'
                position='absolute'
                left='12px'
                top='10px'
                _hover={{ bg: '#FFDB58', color: 'red.900', borderColor: "red.900", borderStyle: "solid", borderWidth: "2px" }}
                onClick={{handleSavedChanges}}
            >
                Guardar Cambios
            </Button>

        </VStack>
    </>
}


