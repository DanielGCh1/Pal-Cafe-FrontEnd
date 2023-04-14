import { useContext } from "react"
import OrderContext from "./OrderContext"

const useOrders = () => {
    return useContext(OrderContext)
}
export default useOrders