import { ApiResponse, request } from "@/api/axios";
import { Department } from "@/lib/types";

export async function sumbitDepartmentData(data: Department){

    try{
         const response = await request<ApiResponse<any>>("POST","/department", data);
         return response.data; 
     }
    catch(error){
     console.error("Error sending data: ", error);
    }
 }

 export async function DeleteEmployeeById(id:string){
    try{
        const response = await request<ApiResponse<any>>("DELETE",`/department/${id}`)
        return response.data.content;
    }catch(error){
        console.log(error);
    }
}

export async function getAllDepartments() {
    try{
      const response = await request<ApiResponse<any>>("GET","/department")
      return response.data
    } catch(error){
        console.log(error)
    }
  }

  export async function getTopNDepartment(count:string){
    try{
        if(count === undefined) count =''
    
        const response = await request<ApiResponse<any>>("GET",`/department/top?count=${count}`)
        return response.data.content;
    }catch(error){
        console.log(error);
    }
}