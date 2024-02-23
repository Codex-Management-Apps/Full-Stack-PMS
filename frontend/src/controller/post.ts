import axios from "axios";


export async function DeletePostById(id:number){
    try{
        const response = await axios.delete(`http://localhost:8080/post/${id}`)
        console.log(response);
        return response.data;
    }catch(error){
        console.log(error);
    }
    
}

export async function sumbitPostData(data : {title: string, content:string}){
    try{
         const response = await axios.post("http://localhost:8080/post", data);
         console.log(response.data);
         return response.data; 
     }
    catch(error){
     console.error("Error sending data: ", error);
    }
 }

export async function getPostById(id?:string){
    try{
        const response = await axios.get(`http://localhost:8080/post/${id}`)
        console.log(response.data)
        return response.data
    }
    catch(error){
        console.error("Error sending data: ", error);
    }
}