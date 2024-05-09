
import { ApiResponse, request } from "@/api/axios";

export type Designation = {
    id: string,
    departmentId: string | null,
    designationName: string,
    status: string,
}

export async function getAllDesignation(){
    try {
    
        const response = await request<ApiResponse<any>>("GET","/designation");
        
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
export async function sumbitDesignationData(data: Designation){

    try{
         const response = await request<ApiResponse<any>>("POST","/designation", data);
         return response.data; 
     }
    catch(error){
     console.error("Error sending data: ", error);
    }
 }
export async function getTopNDesignation(count:string){
    try{
        if(count === undefined) count =''
    
        const response = await request<ApiResponse<any>>("GET",`/designation/top?count=${count}`)
        return response.data.content;
    }catch(error){
        console.log(error);
    }
}