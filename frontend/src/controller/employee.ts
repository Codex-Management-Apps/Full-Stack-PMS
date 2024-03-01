
import { setCurrentDate } from "@/lib/utils";
import axios from "axios";

export type Employee = {
    id?: string,
    address_line: string;
    barangay: string;
    country: string;
    firstname: string;
    lastname: string;
    middlename: string;
    province: string;
    last_update?: string;
};



export async function sumbitEmployeeData(data: Employee){

    try{
        data.last_update = setCurrentDate();
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

export async function UpdateEmployee(data:Employee,id:string){
    try{
        if(id === '') throw Error
        const response = await axios.put(`http://localhost:8080/employee/${id}`,data)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error);
    }
}