import { useContext } from "react"
import ProductContext from "./ProductContext"

const useProducts = () => {
    return useContext(ProductContext)
}
export default useProducts