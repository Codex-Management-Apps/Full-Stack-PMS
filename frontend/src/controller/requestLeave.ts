import { ApiResponse, request } from "@/api/axios"
import { LeaveRequest } from "@/lib/types"


export async function createFileLeaveRequest( data: any){
    try {
        const response = await request<ApiResponse<any>>("POST",`/leave`,data)

        return response.data
    } catch (error) {
        throw error   
    }
}

export async function getAllRequestByEmployeeSuperiorID(id: string){
    try{

    } catch (error) {
        throw error
    }
}

export async function getAllLeaveRequest(){
    try {
        
        const response = await request<ApiResponse<any>>("GET",`/leave`)

        return response.data;

    } catch (error) {
        throw error
    }
}
export async function getLeaveRequestById(id: string){
    try{
        const response = await request<ApiResponse<any>>("GET",`/leave/${id}`)

        return response.data;

    } catch(error){
        throw error
    }
}

export async function updateLeaveRequest(data: LeaveRequest){
    try{
        const response = await request<ApiResponse<any>>("PUT",`/leaveRequest/${data.id}`, data)

        return response.data;

    } catch(error){
        throw error
    }
}