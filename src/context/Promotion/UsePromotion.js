import { useContext } from "react"
import PromotionContext from "./PromotionContext"

const usePromotions = () => {
    return useContext(PromotionContext)
}
export default usePromotions