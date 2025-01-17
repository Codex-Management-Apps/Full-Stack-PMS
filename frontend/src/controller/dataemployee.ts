
import { ApiResponse, request } from "@/api/axios";

export async function sumbitEmployeeData(data: any){

    try{
        
         const response = await request<ApiResponse<any>>("POST","/employee/info", data);

         return response.data
     }
    catch(error){
        throw error
    }
 }

 export async function DeleteEmployeeDataById(id:string){
    try{
        const response = await request<ApiResponse<any>>("DELETE",`/employee/info/${id}`)
        console.log(response);
        return response.data;
    }catch(error){
        console.log(error);
    }
}

export async function getAllEmployee() {
    try{
      const response = await request<ApiResponse<any>>("GET","/employee/info")
      return response.data
    } catch(error){
        console.log(error)
    }
  }

export async function getEmployeeDataById(id:any){
    try{
        const response = await request<ApiResponse<any>>("GET",`/employee/info/${id}`)
        return response.data
    }
    catch(error){
        console.error("Error sending data: ", error);
    }
}

export async function UpdateEmployee(data:any,id:string){
    try{
        if(id === '') throw Error
        const response = await request<ApiResponse<any>>("PUT",`/employee/info/${id}`,data)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export async function getAssignedEmployeeData(condition:boolean){
    try {
        const response = await request<ApiResponse<any>>("GET",`/employee/info/find?isAssigned=${condition}`)

        return response.data
    } catch (error) {
        throw error
    }
}

export async function getAssignedEmpoloyeeDataCount(condition:boolean){
    try {
        const response = await request<ApiResponse<any>>("GET",`/employee/info/find?isAssigned=${condition}`)

        return response.data.length
    } catch (error) {
        throw error
    }
}