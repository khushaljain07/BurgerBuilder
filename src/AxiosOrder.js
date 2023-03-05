import axios from "axios";
const instance=axios.create({
    baseURL:'https://react-my-burger-b51f2-default-rtdb.firebaseio.com'
});
export default instance;