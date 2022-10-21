const axios = require('axios').default;

const baseURL= 'https://api.apis.net.pe';


const sunatApi = axios.create({
    baseURL,
})


sunatApi.interceptors.request.use(function(config){
        config.headers.Authorization = 'Bearer apis-token-3049.dHYrf6srx3u0HC60wv0tXhm0TaaHaEQQ';
        config.headers.Accept ='application/json';
        return config;
    },null, {synchronous:true}
);

module.exports = sunatApi;