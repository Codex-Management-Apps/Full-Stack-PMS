import { AddRequestFileLeaveSchema, LeaveRequest } from "@/lib/types"
import axios from "axios"


export async function createFileLeaveRequest( data: AddRequestFileLeaveSchema){
    try {
        const response = await axios.post(`http://localhost:8080/leaveRequest`,data)

        return response.data
    } catch (error) {
        throw error   
    }
}

export async function getAllRequestByEmployeeSuperiorID(id: string){
    try{

    } catch (error) {
        throw error
    }
}

export async function getAllLeaveRequest(){
    try {
        
        const response = await axios.get(`http://localhost:8080/leaveRequest`)

        return response.data;

    } catch (error) {
        throw error
    }
}
export async function getLeaveRequestById(id: string){
    try{
        const response = await axios.get(`http://localhost:8080/leaveRequest/${id}`)

        return response.data;

    } catch(error){
        throw error
    }
}

export async function updateLeaveRequest(data: LeaveRequest){
    try{
        const response = await axios.put(`http://localhost:8080/leaveRequest/${data.id}`, data)

        return response.data;

    } catch(error){
        throw error
    }
}