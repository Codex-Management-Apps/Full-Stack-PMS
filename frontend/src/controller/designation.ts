import { Department } from "@/lib/types";
import axios from "axios";


export type Designation = {
    id: string,
    departmentId: Department,
    designationName: string,
    status: string,
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