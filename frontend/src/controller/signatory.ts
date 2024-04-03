import { Signatory, SignatorySubmissionSchema } from "@/lib/types";
import axios from "axios";

export async function getSignatoryByAssignPositionId(id: string){
    
    if( id === "" ) throw Error;
    try{
        const response = await axios.get(`http://localhost:8080/signatory/${id}`)
        return response.data
    } catch(error){
        console.log(error)
    }
}

export async function getAllSuperior(){
    try {
        const response= await axios.get(`http://localhost:8080/signatory`);

        return response.data.map((item :Signatory) => item.superior);

    } catch (error) {
        throw error
    }
}

export async function getSignatoryBySuperiorID( id : string){
    try{
        const response= await axios.get(`http://localhost:8080/signatory/superior?id=${id}`);

        return response.data
    } catch(error){
        throw error
    }
}

export async function createSignatory(data: any){
    try {
        const response= await axios.post(`http://localhost:8080/signatory`,data);

        return response.data
    } catch (error) {
        throw error
    }
}