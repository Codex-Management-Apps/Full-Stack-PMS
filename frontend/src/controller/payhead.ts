import axios from "axios"


export async function createPayhead(data:any){
    try{
        const response = axios.post("")
    } catch(error){
        throw error
    }
} 
export async function getAllPayheads(){
    try{
        const response = await axios.get("http://localhost:8080/payhead")

        return response.data
    } catch(error){
        throw error
    }
} 
export async function getPayheadById(id:string){
    try{

    } catch(error){
        throw error
    }
} 
export async function updatePayhead(data:any){
    try{

    } catch(error){
        throw error
    }
} 
export async function deletePayhead(id:string){
    try{

    } catch(error){
        throw error
    }
} 