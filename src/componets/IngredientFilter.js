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

export default function IngredientFilter({ ingredientsAux, setIngredients }) {
    const [searchValue, setSearchValue] = useState('');

    const handleFilterIngredients = () => {
        const filteredIngredients = ingredientsAux.filter((ingredient) =>
            ingredient.ing_nombre.toLowerCase().includes(searchValue.toLowerCase())
        );

        if (!isUndefinedOrNull(filteredIngredients)) {
            const list = [];
            filteredIngredients.map((element) => {
                const ing = {
                    _id: element._id,
                    ing_nombre: element.ing_nombre, ing_descripcion: element.ing_descripcion,
                    ing_precio: element.ing_precio, ing_tipo_unidad: element.ing_tipo_unidad, ing_cantidad: element.ing_cantidad,
                    ing_imagen: element.ing_imagenURL, ing_existencias: element.ing_existencias
                }
                list.push(ing);
            }
            )
            setIngredients(list);
        }
    };
    useEffect(() => {
        handleFilterIngredients();
    },[searchValue])
    return (
        <InputGroup size="md" width="300px" marginBottom="4">
            <Input
                color='white'
                placeholder="Buscar ingredientes..."
                _placeholder={{ color: 'white' }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </InputGroup>
    );
}
