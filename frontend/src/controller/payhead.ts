import { ApiResponse, request } from "@/api/axios"
import axios from "axios"


export async function createPayhead(data:any){
    try{

    } catch(error){
        throw error
    }
} 
export async function getAllPayheads(){
    try{
        const response = await request<ApiResponse<any>>("GET","/payhead")

        return response.data
    } catch(error){
        throw error
    }
} 
export async function getPayheadById(id:string){
    try{

    } catch(error){
        throw error
    }
} 
export async function updatePayhead(data:any){
    try{

    } catch(error){
        throw error
    }
} 
export async function deletePayhead(id:string){
    try{

    } catch(error){
        throw error
    }
} 