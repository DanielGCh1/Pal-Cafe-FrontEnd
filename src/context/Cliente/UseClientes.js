import { useContext } from "react"
import ClienteContext from "./ClienteContext"

const useClientes = () => {
    return useContext(ClienteContext)
}
export default useClientes