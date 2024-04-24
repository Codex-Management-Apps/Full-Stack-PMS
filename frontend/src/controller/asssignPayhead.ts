import axios from "axios"


export async function createAssignPayhead(data:any){
    try{
        const response = axios.post("http://localhost:8080/assign/payhead",data)

        return response
    } catch(error){
        throw error
    }
} 
export async function getAllAssignPayheads(){
    try{
        const response = await axios.get("http://localhost:8080/assign/payhead")

        return response.data
    } catch(error){
        throw error
    }
} 
export async function getAssignPayheadById(id:string){
    try{

    } catch(error){
        throw error
    }
} 
export async function updateAssignPayhead(id:string,data:any){
    try{
        const response = await axios.put(`http://localhost:8080/assign/payhead/${id}`,data)
        return response
    } catch(error){
        throw error
    }
} 
export async function deleteAssignPayhead(id:string){
    try{
        const response = await axios.delete(`http://localhost:8080/assign/payhead/${id}`)

        return response
    } catch(error){
        throw error
    }
} 
// 
export async function getAllTypeUnderEmployeeID(id: string, condition:string){
    try {
        const response = await axios.get(`http://localhost:8080/assign/payhead/data?id=${id}&type=${condition}`)

        return response.data;
    } catch (error) {
        throw error
    }
}
export async function getAllAssignPayheadUnderEmployeeID(id:string){
    if (id == "") return [];
    try {
        const response = await axios.get(`http://localhost:8080/assign/payhead/data?id=${id}`) 
        return response.data
    } catch (error) {
        
    }
}