import axios from "axios";


export async function createSignatory(data: any){
    try {
        const response= await axios.post(`http://localhost:8080/signatory`,data);

        return response.data
    } catch (error) {
        throw error
    }
}
export async function getAllSignatory(){
    try{
        const response = await axios.get("http://localhost:8080/signatory")

        return response.data
    } catch (error) {
        throw error
    }
}

export async function getSignatoryByID(id : string){
    try {
        const response = await axios.get(`http://localhost:8080/signatory/${id}`)
        
        return response.data
    } catch (error) {
        throw error
    }
}

export async function deleteSignatoryByID(id:string){
    try {
        const response = await axios.delete(`http://localhost:8080/signatory/${id}`)

        return response
    } catch (error) {
        throw error
    }
}

export async function UpdateSignatoryByID(data:any, id:Number) {
    try {
        const response= await axios.put(`http://localhost:8080/signatory/${id}`,data);

        return response.data
    } catch (error) {
        throw error
    }
}