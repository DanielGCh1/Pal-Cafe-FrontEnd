import { Button, HStack, Image, Input, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ComboBox from '../componets/ComboBox'

const HistorialProduccion = () => {
    const [selected, setSelected] = useState(true)
    const [list, setList] = useState([])
    const [date, setDate] = useState("")
    //const [productos, setProductos] = useState()

    const productos = [
        {
            id: '1',
            name: 'Harina',
            category: 'Producto'
        },
        {
            id: '2',
            name: 'Mantequilla',
            category: 'Producto'
        },
        {
            id: '3',
            name: 'leche',
            category: 'Producto'
        }
    ]
       
    const promociones = [
        {
            id: '1',
            name: 'rosquillas',
            category: 'Promocion'
        },
        {
            id: '2',
            name: 'Orejas',
            category: 'Promocion'
        },
        {
            id: '3',
            name: 'pizzero',
            category: 'Promocion'
        }
    ]
    const history = [

    ]

    const addElement = (element) => {
        setList([...list,
            {
                id: element.id,
                name: element.name,
                category: element.category,
                sales: 0,
                expired: 0,
                surplus: 0,
                royalties: 0
            }
        ])
    }

    useEffect(() => {
        //getProductosHistorial()
        //getPromocionesHistorial()
    }, [])
    
    const handleChange = (e, i) => {
        const { name, value } = e.target
        const vector = [...list]
        vector[i][name] = value
        setList(vector)
        console.log(list)
    }

    const searchHistory = (date) => {
        console.log(date.target.value)
    }

    const saveData = () => {
        history.push(list)
        console.log(history)
    }

    return (
        <VStack>
            <HStack marginBottom="2%" width="100%" padding="2%" bg="rgba(0,0,0,0.1)" alignItems="center" justifyContent="center">
                    <HStack>
                        <Button bg="rgba(0,0,0,.2)" color={selected ? '#FFDB58' : '#56070C'} borderColor="" fontSize="20px" variant='outline' 
                            onClick={() => setSelected(!selected)}>{selected ? "Productos" : "Promociones"}
                        </Button>
                        <ComboBox          
                            options={(selected === true) ? productos : promociones}
                            onChange={(value) => addElement(value)}
                            searchable
                        />
                    </HStack>                 
                    <VStack>
                        <Input
                            justifyContent="left" width="20%"
                            placeholder="Select Date and Time"
                            size="md"
                            type="datetime-local"
                            width="250px"
                            bg="rgba(0,0,0,.2)"
                            onChange={searchHistory}
                        />
                        <Button width="100%" colorScheme='green' onClick={saveData}>
                            Guardar
                        </Button>
                    </VStack>
                    
            </HStack>

            <TableContainer width="90%">
                <Table variant='simple' bgColor="rgba(0,0,0,.2)" borderRadius="7px" color="#fff">
                    <TableCaption color="#000">Palcafe Historial de Produccion</TableCaption>
                    <Thead>
                    <Tr>
                        <Th color="#000">Nombre</Th>
                        <Th color="#000">Categoria</Th>
                        <Th color="#000">Vendidos</Th>
                        <Th color="#000">Expirados</Th>
                        <Th color="#000">Sobrantes</Th>
                        <Th color="#000">Regalias</Th>
                        <Th color="#000">Eliminar</Th>

                    </Tr>
                    </Thead>
                    <Tbody>
                        {list.map((row, i) => (
                           <tr key={i}>
                            <td>
                                {row.name}
                            </td>
                            <td>
                                {row.category}
                            </td>
                            <td>
                                <Input name='sales' value={row.sales} onChange={e => handleChange(e, i)} />
                            </td>
                            <td>
                                <Input name='expired' value={row.expired} onChange={e => handleChange(e, i)} />
                            </td>
                            <td>
                                <Input name='surplus' value={row.surplus} onChange={e => handleChange(e, i)} />
                            </td>
                            <td>
                                <Input name='royalties' value={row.royalties} onChange={e => handleChange(e, i)} />
                            </td>
                            <td>
                                <Image src={require("../assets/eliminar.png")} width="35px" height="35px" alt="Eliminar" m="auto" borderBlock="1px" borderRadius="5px" bg="rgba(0,0,0,.2)" />
                            </td>
                           </tr> 
                        ))}
                    </Tbody>
                    <Tfoot>
                    <Tr>
                        <Th color="#000">Nombre</Th>
                        <Th color="#000">Categoria</Th>
                        <Th color="#000">Vendidos</Th>
                        <Th color="#000">Expirados</Th>
                        <Th color="#000">Sobrantes</Th>
                        <Th color="#000">Regalias</Th>
                        <Th color="#000">Eliminar</Th>
                    </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </VStack>
    )
}

export default HistorialProduccion