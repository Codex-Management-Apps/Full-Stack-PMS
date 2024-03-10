
import axios from "axios";


export type Designation = {
    id: string,
    departmentId: string | null,
    designationName: string,
    status: string,
}

export async function getAllDesignation(){
    try {
    
        const response = await axios.get("http://localhost:8080/designation");
        
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
export async function sumbitDesignationData(data: Designation){

    try{
         const response = await axios.post("http://localhost:8080/designation", data);
         console.log(response.data);
         return response.data; 
     }
    catch(error){
     console.error("Error sending data: ", error);
    }
 }
export async function getTopNDesignation(count:string){
    try{
        if(count === undefined) count =''
    
        const response = await axios.get(`http://localhost:8080/designation/top?count=${count}`)
        console.log(response.data.content);
        return response.data.content;
    }catch(error){
        console.log(error);
    }
}