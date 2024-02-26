
import axios from "axios";

export type Employee = {
    addressline: string;
    barangay: string;
    country: string;
    firstname: string;
    lastname: string;
    middlename: string;
    province: string;
    last_update: string;
};

export async function sumbitEmployeeData(data: Employee){

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