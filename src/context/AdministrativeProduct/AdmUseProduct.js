import { useContext } from "react"
import AdmProductContext from "./AdmProductContext"

const useAdmProducts = () => {
    return useContext(AdmProductContext)
}
export default useAdmProducts