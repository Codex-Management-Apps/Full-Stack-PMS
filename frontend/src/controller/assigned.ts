import { Employee } from "./employee"
import { Designation } from "./designation"
import axios from "axios"

export type AssignDesignation = {
    id: string,
    employeeType: string,
    status: string,
    designation: Designation,
    employee: Employee,
}
export type AssignDesignationSubmission = {
    employeeType: string,
    status: string,
    designation:{
        id:string
    },
    employee:{
        id:string
    }
}


export async function getAssignDesignationByEmployeeId(id:string){
    
    try{
        if(id === "") throw Error;
        const response = await axios.get(`http://localhost:8080/assigned/employee?id=${id}`)
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.error("Error sending data: ", error);
    }
}

export async function isEmployeeAssigned(id:string) {
    if( id === "") throw Error;
    try {
        const response = await axios.get(`http://localhost:8080/assigned?id=${id}`)
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending data: ", error);
    }
}

export async function newAssignDesignation(data:AssignDesignationSubmission) {
    try{
        console.log(data)
        const response = await axios.post("http://localhost:8080/assigned", data);
        console.log(response.data);
        return response.data; 
    } 
    catch(error){
        console.error("Error sending data: ", error);
    }
}

export async function updateAssignDesignation(data:AssignDesignationSubmission, id : string) {
    try{
        if(id === undefined) throw Error
        const response = await axios.put(`http://localhost:8080/assigned/${id}`,data)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error);
    }
}