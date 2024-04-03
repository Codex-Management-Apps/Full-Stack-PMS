
import { AddEmployeeSchema, Employee } from "@/lib/types";
import axios from "axios";


export async function sumbitEmployeeData(data: AddEmployeeSchema){

    try{
        
         const response = await axios.post("http://localhost:8080/employee", data);
         console.log(response.data);
         return response.data; 
     }
    catch(error){
     console.error("Error sending data: ", error);
    }
 }

 export async function DeleteEmployeeById(id:string){
    try{
        const response = await axios.delete(`http://localhost:8080/employee/${id}`)
        console.log(response);
        return response.data;
    }catch(error){
        console.log(error);
    }
}

export async function getAllEmployee() {
    try{
      const response = await axios.get("http://localhost:8080/employee")
      console.log(response.data)
      return response.data
    } catch(error){
        console.log(error)
    }
  }

export async function getEmployeeById(id?:string){
    try{
        const response = await axios.get(`http://localhost:8080/employee/${id}`)
        console.log(response.data)
        return response.data
    }
    catch(error){
        console.error("Error sending data: ", error);
    }
}

export async function UpdateEmployee(data:AddEmployeeSchema,id:string){
    try{
        if(id === '') throw Error
        const response = await axios.put(`http://localhost:8080/employee/${id}`,data)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
