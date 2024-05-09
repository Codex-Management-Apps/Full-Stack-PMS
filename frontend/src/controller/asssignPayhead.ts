import { ApiResponse, request } from "@/api/axios"

export async function createAssignPayhead(data:any){
    try{
        const response = await request<ApiResponse<any>>("POST","/assign/payhead",data)

        return response
    } catch(error){
        throw error
    }
} 
export async function getAllAssignPayheads(){
    try{
        const response = await request<ApiResponse<any>>("GET","/assign/payhead")

        return response.data
    } catch(error){
        throw error
    }
} 
export async function getAssignPayheadById(id:string){
    try{
        console.log(id)
    } catch(error){
        throw error
    }
} 
export async function updateAssignPayhead(id:string,data:any){
    try{
        const response = await request<ApiResponse<any>>("POST",`/assign/payhead/${id}`,data)
        return response
    } catch(error){
        throw error
    }
} 
export async function deleteAssignPayhead(id:string){
    try{
        const response = await request<ApiResponse<any>>("DELETE",`/assign/payhead/${id}`)

        return response
    } catch(error){
        throw error
    }
} 
// 
export async function getAllTypeUnderEmployeeID(id: any, condition:string){
    try {
        const response = await request<ApiResponse<any>>("GET",`/assign/payhead/data?id=${id}&type=${condition}`)

        return response.data;
    } catch (error) {
        throw error
    }
}
export async function getAllAssignPayheadUnderEmployeeID(id:string){
    if (id == "") return [];
    try {
        const response = await request<ApiResponse<any>>("GET",`/assign/payhead/data?id=${id}`) 
        return response.data
    } catch (error) {
        
    }
}