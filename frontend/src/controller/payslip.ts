import axios from "axios"


export async function getAllPaySlip(){
    try {
        const response = await axios.get("http://localhost:8080/payslip")

        return response.data
    } catch (error) {
        throw error
    }
}