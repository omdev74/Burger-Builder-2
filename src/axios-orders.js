import axios from "axios";
const instance = axios.create({
    baseURL:"https://burger-builder-2-1a861-default-rtdb.asia-southeast1.firebasedatabase.app/"
})
export default instance