import { ApiResponse, request } from "@/api/axios";

export async function createSignatory(data: any){
    try {
        const response= await request<ApiResponse<any>>("POST",`/signatory`,data);

        return response.data
    } catch (error) {
        throw error
    }
}
export async function getAllSignatory(){
    try{
        const response = await request<ApiResponse<any>>("GET","/signatory")

        return response.data
    } catch (error) {
        throw error
    }
}

export async function getSignatoryByID(id : string){
    try {
        const response = await request<ApiResponse<any>>("GET",`/signatory/${id}`)
        
        return response.data
    } catch (error) {
        throw error
    }
}

export async function deleteSignatoryByID(id:string){
    try {
        const response = await request<ApiResponse<any>>("DELETE",`/signatory/${id}`)

        return response
    } catch (error) {
        throw error
    }
}

export async function UpdateSignatoryByID(data:any, id:Number) {
    try {
        const response= await request<ApiResponse<any>>("PUT",`/signatory/${id}`,data);

        return response.data
    } catch (error) {
        throw error
    }
}