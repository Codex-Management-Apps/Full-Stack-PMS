import axios from "axios"
import { getEmployeeById } from "./employee";


export async function getAssignDesignationByEmployeeId(id:string){
    
    try{
        if(id === "") throw Error;
        const response = await axios.get(`http://localhost:8080/assigned/designation/employee?id=${id}`)

        return response.data;
    }
    catch(error){
        console.error("Error sending data: ", error);
    }
}

export async function isEmployeeAssigned(id:string) {
    if( id === "") throw Error;
    try {
        const response = await axios.get(`http://localhost:8080/assigned/designation/employee/find?id=${id}`)

        return response.data;
    } catch (error) {
        return error
    }
}

export async function submitAssignDesignation(data: AddAssignDesignationSchema, designations : Designation[]) {
    try{
        const designationData = designations.find(value => value.designationName === data.designation)
        const employeeData = await getEmployeeById(data.employee)
        const newData= {
            ...data,
            designation: designationData,
            employee: employeeData,
        }
        
        const response = await axios.post("http://localhost:8080/assigned/designation", newData);
        return response.data; 
    } 
    catch(error){
       throw error
    }
}

export async function updateAssignDesignation(newData:AddAssignDesignationSchema, currentData:AssignDesignation,designations : Designation[] ,id : string) {
    try{
        if(id === undefined) throw Error
        const designationData = designations.find(value => value.designationName === newData.designation)

        const updatedData: AssignDesignation = {
            ...currentData,
            employeeType: newData.employeeType,
            status: newData.status,
            designation: designationData!
        };
        
        const response = await axios.put(`http://localhost:8080/assigned/${id}`,updatedData)
        return response.data
    } catch (error) {
       throw Error
    }
}

export async function getTopNAssignDesignation(count:string){
    try{
        if(count === undefined) count =''
        const response = await axios.get(`http://localhost:8080/assigned/top?count=${count}`)
        return response.data.content;
    }catch(error){
        console.log(error);
    }
}