
import { ApiResponse, request } from "@/api/axios";
import { Employee } from "@/lib/types";

export async function sumbitEmployeeData(data: any){

    try{
        
         const response = await request<ApiResponse<Employee>>("POST","/employee", data);
         return response.data; 
     }
    catch(error){
     console.error("Error sending data: ", error);
    }
 }

 export async function DeleteEmployeeById(id:string){
    try{
        await request("DELETE",`/employee/${id}`)

    }catch(error){
        console.log(error);
    }
}

export async function getAllEmployee() {
    try{
      const response = await request<ApiResponse<Employee>>("GET","/employee")
    
      return response.data
    } catch(error){
        console.log(error)
    }
  }

export async function getEmployeeById(id: any){
    try{
        const response = await request<ApiResponse<Employee>>("GET",`/employee/${id}`)

        return response.data
    }
    catch(error){
        console.error("Error sending data: ", error);
    }
}

export async function UpdateEmployee(data:any,id:string){
    try{
        if(id === '') throw Error
        const response = await  request<ApiResponse<Employee>>("PUT",`/employee/${id}`,data)

        return response.data
    } catch (error) {
        console.log(error);
    }
}


export async function getEmployeeCount() {
    try{
      const response = await request<ApiResponse<any>>("GET","/employee")

      return response.data.length +1
    } catch(error){
        console.log(error)
    }
  }
