import { useContext } from "react"
import IngredientContext from "./IngredientContext"

const useIngredients = () => {
    return useContext(IngredientContext)
}
export default useIngredients