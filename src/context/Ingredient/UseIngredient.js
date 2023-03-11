import { useContext } from "react"
import IngredientContext from "./IngredientContext"

const useIngredient = () => {
    return useContext(IngredientContext)
}
export default useIngredient