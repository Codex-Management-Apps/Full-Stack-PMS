import axios from "axios"


export type PayrollSubmission = {
    signatory: string,
    employee: string,
    start: string,
    end: string,
}

export async function getAllPayRoll(){
    try {
        const response = await axios.get("http://localhost:8080/payroll")

        return response.data
    } catch (error) {
        throw error
    }
}

export async function createPayroll(data : PayrollSubmission){
    try {
        // Data Format for creating
        // {
        //     "signatory": "1",
        //     "employee": "1",
        //     "start": "2024-04-21 17:37:17",
        //     "end": "2024-05-20 17:37:17"
        // }
        console.log(data)
        
    } catch (error) {
        throw error
    }
}

export async function getPayrollByID(id : string){
    if (id == "") return null
    try {
        const response = await axios.get(`http://localhost:8080/payroll/${id}`)
        
        return response.data
    } catch (error) {
        throw error
    }
}



export async function UpdatePayroll(data: PayrollSubmission){
    try {
        // Data Format for creating
        // {
        //     "signatory": "1",
        //     "employee": "1",
        //     "start": "2024-04-21 17:37:17",
        //     "end": "2024-05-20 17:37:17"
        // }
        console.log(data)
    } catch (error) {
        throw error
    }
}

// =====================================================================================
// Extra functions

export async function getPayrollByEmployeeID(id: string){
    try {
        const response = await axios.get(`http://localhost:8080/payroll/employee?id=${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}