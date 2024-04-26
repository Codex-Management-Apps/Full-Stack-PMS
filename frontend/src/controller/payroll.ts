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

export async function createPayroll(data : any){
    try {
        const response = await axios.post("http://localhost:8080/payroll",data)

        return response
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



export async function UpdatePayroll(data: any, id: string){
    try {
       console.log(data)
        if(id === '') throw Error
        const response = await axios.put(`http://localhost:8080/payroll/${id}`,data)

        return response.data
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