import axios from "axios";
import { BASE_URL } from '../../config.env'

const extendedUrl = `${BASE_URL}/api`;

const add = async(req) => {
    const data = await axios.post(extendedUrl + "/products", req);
    console.log(data);
    return data;
};

const getAll = async() => {
    const data = await axios.get(extendedUrl + "/products");
    console.log(data);
    return data;
};

const getById = async(id) => {
    const data = await axios.get(extendedUrl + `/products/${id}`);
    console.log(data);
    return data;
};

const update = async(id, req) => {
    const data = await axios.get(extendedUrl + `/products/${id}`, req);
    console.log(data);
    return data;
};

const deletebyId = async(id) => {
    const data = await axios.get(extendedUrl + `/products/${id}`);
    console.log(data);
    return data;
};

export const ProductType = {
    getAll,
    add,
    getById,
    update,
    deletebyId
}