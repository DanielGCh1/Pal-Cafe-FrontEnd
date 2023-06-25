import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';

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

export default function ProductFilter({ admProductsAux, setAdmProducts }) {
    const [searchValue, setSearchValue] = useState('');

    const handleFilterProducts = () => {
        const filteredProducts = admProductsAux.filter((product) =>
            product.pro_nombre.toLowerCase().includes(searchValue.toLowerCase())
        );

        if (!isUndefinedOrNull(filteredProducts)) {
            const list = [];
            filteredProducts.map((element) => {
                const pro = {
                    _id: element._id,
                    pro_nombre: element.pro_nombre, pro_valor_venta: element.pro_valor_venta, pro_duracion: element.pro_duracion,
                    pro_valor_tiempo: element.pro_valor_tiempo, pro_valor_unidad: element.pro_valor_unidad, pro_cantidad: element.pro_cantidad,
                    pro_precio_mano_obra: element.pro_precio_mano_obra, pro_descripcion: element.pro_descripcion, pro_imagen: element.pro_imagen,
                    pro_existencias: element.pro_existencias, pro_valor_total_unidad: element.pro_valor_total_unidad
                }
                list.push(pro);
            }
            )
            setAdmProducts(list);
        }
    };
    useEffect(() => {
        handleFilterProducts();
    }, [searchValue])
    return (
        <InputGroup size="md" width="300px" marginBottom="4">
            <Input
                color='white'
                placeholder="Buscar productos..."
                _placeholder={{ color: 'white' }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </InputGroup>
    );
}
