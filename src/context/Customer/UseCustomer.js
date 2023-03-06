import { useContext } from "react"
import CustomerContext from "./CustomerContext"

const useCustomer = () => {
    return useContext(CustomerContext)
}
export default useCustomer