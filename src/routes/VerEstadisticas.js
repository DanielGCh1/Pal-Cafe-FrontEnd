import { Text, VStack, HStack, Box } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';

const productos = {
    producto1 : "sda",
    producto3 : "sss",  
}

export default function VerEstadisticas() {

    useEffect(() => {
      
    }, [])
    

    return <>
        <VStack>
            <Text>
                Estadisticas
            </Text>
            <HStack>
                <VStack>
                    <Text>
                        Productos
                    </Text>
                    <HStack>
                        <HStack>
                            <Box></Box>
                        </HStack>
                    </HStack>
                </VStack>
            </HStack>
        </VStack>
    </>;
};

