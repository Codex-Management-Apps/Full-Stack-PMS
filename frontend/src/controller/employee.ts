
import axios from "axios";

export async function sumbitEmployeeData(data: any){

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

        return response.data;
    }catch(error){
        console.log(error);
    }
}

export async function getAllEmployee() {
    try{
      const response = await axios.get("http://localhost:8080/employee")

      return response.data
    } catch(error){
        console.log(error)
    }
  }

export async function getEmployeeById(id: any){
    try{
        const response = await axios.get(`http://localhost:8080/employee/${id}`)

        return response.data
    }
    catch(error){
        console.error("Error sending data: ", error);
    }
}

export async function UpdateEmployee(data:any,id:string){
    try{
        if(id === '') throw Error
        const response = await axios.put(`http://localhost:8080/employee/${id}`,data)

        return response.data
    } catch (error) {
        console.log(error);
    }
}


export async function getEmployeeCount() {
    try{
      const response = await axios.get("http://localhost:8080/employee")

      return response.data.length +1
    } catch(error){
        console.log(error)
    }
  }
