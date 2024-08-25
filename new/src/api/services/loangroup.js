import axios from "axios";
import { BASE_URL } from '../../config.env'
var ls = require('local-storage');

const extendedUrl = `${BASE_URL}/api`;

// let token = ls.get('apiKey');
let token = "5b2bba40ef2844949a3dbe98d14c43c7ee04faed"

const apiHeaders = {
    'Authorization': `Token ${token}`,
    'Accept'       : 'application/json'
}

const add = async(req) => {
    console.log(req);
    const data =  axios.post(extendedUrl + "/loan-groups/", req, {
        headers: apiHeaders
      }
    );
    console.log(data);
    return data;
};

const getAll = async() => {
    const data = await axios.get(extendedUrl + "/loan-groups/?page=1", {
        headers: apiHeaders
    });
    console.log("getall", data);
    return data;
};

const getById = async(id) => {
    const data = await axios.get(extendedUrl + `/loan-groups/${id}/`, {
        headers: apiHeaders
    });
    console.log(data);
    return data;
};

const update = async(id, req) => {
    const data = await axios.put(extendedUrl + `/loan-groups/${id}/`, req, {
        headers: apiHeaders,
    });
    console.log(data);
    return data;
};

const updatePatch = async(id, req) => {
    const data = await axios.patch(extendedUrl + `/loan-groups/${id}/`,  req,{
        headers: apiHeaders,
    });
    console.log(data);
    return data;
};

const deletebyId = async(id) => {
    const data = await axios.delete(extendedUrl + `/loan-groups/${id}/`, {
        headers: apiHeaders
    });
    console.log(data);
    return data;
};

export const LoanGroupType = {
    getAll,
    add,
    getById,
    update,
    updatePatch,
    deletebyId
}