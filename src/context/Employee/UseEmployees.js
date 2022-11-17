import { useContext } from "react"
import EmployeeContext from "./EmployeeContext"

const useEmployees = () => {
    return useContext(EmployeeContext)
}
export default useEmployees