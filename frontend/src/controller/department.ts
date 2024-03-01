import axios from "axios";

export type Department = {
    departmentName: string,
    status: string,
}

export async function sumbitDepartmentData(data: Department){

    try{
         const response = await axios.post("http://localhost:8080/department", data);
         console.log(response.data);
         return response.data; 
     }
    catch(error){
     console.error("Error sending data: ", error);
    }
 }

 export async function DeleteEmployeeById(id:string){
    try{
        const response = await axios.delete(`http://localhost:8080/department/${id}`)
        console.log(response);
        return response.data;
    }catch(error){
        console.log(error);
    }
}

export async function getAllEmployee() {
    try{
      const response = await axios.get("http://localhost:8080/department")
      console.log(response.data)
      return response.data
    } catch(error){
        console.log(error)
    }
  }