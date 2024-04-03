import axios from "axios"

export async function getAllPosition(){
    try {
        const response = await axios.get("http://localhost:8080/positions")
        return response.data
    } catch (error) {
        
    }
}