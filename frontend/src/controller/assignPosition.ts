import { AddSignatorySchema, Position, AssignPosition, AddPositionSchema, AddPositionSubmission, SignatorySubmissionSchema, AddAssignPositionSubmissionSchema } from "@/lib/types";
import axios from "axios";
import { getAssignDesignationByEmployeeId } from "./assigned";
import { createSignatory, getSignatoryBySuperiorID } from "./signatory";


export async function getAllPosition(){
    try {
        const response = await axios.get("http://localhost:8080/assigned/position")
        return response.data
    } catch (error) {
        
    }
}

export async function isPositionAssigned(id :string){
    if( id === "") throw Error;
    try {
        const response = await axios.get(`http://localhost:8080/assigned/position/employee/find?id=${id}`)
        return response.data;
    } catch (error) {
        console.error("Error sending data: ", error);
    }
}

export async function getPositionByEmployeeId(id: string){
    if( id === "") throw Error;
    try {
        const response = await axios.get(`http://localhost:8080/assigned/position/employee?id=${id}`)
        return response.data;
    } catch (error) {
        console.error("Error sending data: ", error);
    }
}

export async function getAssignPositionEmployeeUnderItsSuperior(id: string){
    if( id === "") throw Error;
    try {
        const response = await axios.get(`http://localhost:8080/assigned/position/employee/superior?id=${id}`)
        return response.data;
    } catch (error) {
        console.error("Error sending data: ", error);
    }
}

export async function submitAssignPosition(data: any, positions: Position[], employeeID: string){
    if(employeeID === "") throw Error;
    try {
        
        if(data.position === "Supervisor"){
            console.log("this is supervisor")
            
            const positionData:any = positions.find(value => value.positionName === data.position);
            const employeeData = await getAssignDesignationByEmployeeId(employeeID)

            // Create data for position
            const assignPositionData = {
                employee: employeeData,
                position: positionData,
                superior: null
            };
            console.log(assignPositionData)
            const response = await axios.post(`http://localhost:8080/assigned/position`, assignPositionData)
            
            return response.data
            
        } else {
            const positionData:any = positions.find(value => value.positionName === data.position);
            const employeeData = await getAssignDesignationByEmployeeId(employeeID)
            const superiorData = await getSignatoryBySuperiorID(data.superior)
        
            const newData= {
                superior: superiorData,
                employee: employeeData,
                position: positionData,
            };
            console.log(newData)
            const response = await axios.post(`http://localhost:8080/assigned/position`, newData)
            return response.data
        }

    } catch (error) {
        throw error
    }
}