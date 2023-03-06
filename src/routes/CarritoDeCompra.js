import { Grid, GridItem } from '@chakra-ui/react'

export default function CarritoDeCompra() {
    return (
        <>
            <Grid
                h='200px'
                templateRows='repeat(3, 1fr)'
                templateColumns={['repeat(2, 1fr)' ,'repeat(3, 1fr)', 'repeat(4, 1fr)','repeat(5, 1fr)']}
                gap={4}
            >
                <GridItem rowSpan={2} colSpan={1} bg='blue' />
                <GridItem bg='papayawhip' />
                <GridItem bg='papayawhip' />
                <GridItem  bg='tomato' />
                <GridItem bg='blue'  />
                <GridItem bg='green'  />
                <GridItem bg='papayawhip' />
                <GridItem bg='papayawhip' />
                <GridItem  bg='tomato' />
                <GridItem bg='blue'  />
                <GridItem bg='green'  />
                
            </Grid>
        </>
    );
}
