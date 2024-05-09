import { ApiResponse, request } from "@/api/axios"


export type PayrollSubmission = {
    signatory: string,
    employee: string,
    start: string,
    end: string,
}

export async function getAllPayRoll(){
    try {
        const response = await request<ApiResponse<any>>("GET","/payroll")

        return response.data
    } catch (error) {
        throw error
    }
}

export async function createPayroll(data : any){
    try {
        const response = await request<ApiResponse<any>>("POST","/payroll",data)

        return response
    } catch (error) {
        throw error
    }
}

export async function getPayrollByID(id : string){
    if (id == "") return null
    try {
        const response = await request<ApiResponse<any>>("GET",`/payroll/${id}`)
        
        return response.data
    } catch (error) {
        throw error
    }
}



export async function UpdatePayroll(data: any, id: string){
    try {
       console.log(data)
        if(id === '') throw Error
        const response = await request<ApiResponse<any>>("PUT",`/payroll/${id}`,data)

        return response.data
    } catch (error) {
        throw error
    }
}

// =====================================================================================
// Extra functions

export async function getPayrollByEmployeeID(id: string){
    try {
        const response = await request<ApiResponse<any>>("GET",`/payroll/employee?id=${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}