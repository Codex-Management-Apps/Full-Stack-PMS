import { Department } from "@/lib/types";
import axios from "axios";

export async function sumbitDepartmentData(data: Department){

    try{
         const response = await axios.post("http://localhost:8080/department", data);
         return response.data; 
     }
    catch(error){
     console.error("Error sending data: ", error);
    }
 }

 export async function DeleteEmployeeById(id:string){
    try{
        const response = await axios.delete(`http://localhost:8080/department/${id}`)
        return response.data.content;
    }catch(error){
        console.log(error);
    }
}

export async function getAllDepartments() {
    try{
      const response = await axios.get("http://localhost:8080/department")
      return response.data
    } catch(error){
        console.log(error)
    }
  }

  export async function getTopNDepartment(count:string){
    try{
        if(count === undefined) count =''
    
        const response = await axios.get(`http://localhost:8080/department/top?count=${count}`)
        return response.data.content;
    }catch(error){
        console.log(error);
    }
}