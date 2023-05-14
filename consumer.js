const axios = require('axios');


const get = (url) => {
    return axios.get(url + "/api/products");
};

const getById = (id, url) => {
    console.log('url', url);
    return axios.get(url + "/api/products/" + id);
}

module.exports = { get, getById };
