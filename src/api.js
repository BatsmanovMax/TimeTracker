import axios from "axios"

export default async function getAllUsersList() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    return res.data
}