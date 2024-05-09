import { ApiResponse, request } from "@/api/axios"


export async function getAllPaySlip(){
    try {
        const response = await request<ApiResponse<any>>("GET","/payslip")

        return response.data
    } catch (error) {
        throw error
    }
}

export async function createPaySlip(data: any){
    try {
        const response = await request<ApiResponse<any>>("POST","/payslip",data)

        return response.data
    } catch (error) {
        throw error
    }
}