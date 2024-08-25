import axios from "axios";
import { BASE_URL } from '../../config.env'

const extendedUrl = `${BASE_URL}/api-auth`;

const login = async(req) => {
    const data = await axios.post(extendedUrl + "/login/", req);
    console.log(data);
    return data;
};

const logout = async() => {
    const data = await axios.post(extendedUrl + "/logout/");
    console.log(data);
    return data;
};

export const AuthType = {
    login,
    logout
}