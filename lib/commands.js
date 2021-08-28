const axios = require("axios").default;
const { wd } = require("./wd")

axios.defaults.baseURL = "http://localhost:9515/session"

exports.newSession = async function(){
    try {
        let request = await axios.post(``, {capabilities:{browserName:"chrome"}});
        wd.sessionId = request.data.value.sessionId;
        
    } catch (error) {
        console.log(error.response);
        throw Error(`[${error.response.status}] ${error.response.data.value.message}`)
    }
}

exports.deleteSession = async function(){
    try {
        await axios.delete(`/${wd.sessionId}`);
        wd.sessionId = undefined;
        
    } catch (error) {
        console.log(error.response);
        throw Error(`[${error.response.status}] ${error.response.data.value.message}`)
    }
}

exports.go = async function(url) {
    try {
        await axios.post(`/${wd.sessionId}/url`, {url: url});        
        
    } catch (error) {
        console.log(error.response);
        throw Error(`[${error.response.status}] ${error.response.data.value.message}`)
    }
}

exports.getUrl = async function() {
    let url = undefined;
    try {
        let request = await axios.get(`/${wd.sessionId}/url`); 
        url = request.data.value;      
        
    } catch (error) {
        console.log(error.response);
        throw Error(`[${error.response.status}] ${error.response.data.value.message}`)
    }
    return url;
}

exports.getElement = async function(element) {
    let ele;
    try {
        let response = await axios.post(`/${wd.sessionId}/element`, {using: element.by, value: element.value});   
        ele = {id: response.data.value['element-6066-11e4-a52e-4f735466cecf']};
        
    } catch (error) {
        console.log(error.response);
        throw Error(`[${error.response.status}] ${error.response.data.value.message}`)
    }
    return ele;
}

exports.getElementText = async function(element) {
    let text;
    try {
        let response = await axios.get(`/${wd.sessionId}/element/${element.id}/text`);   
        text = response.data.value;
        
    } catch (error) {
        console.log(error.response);
        throw Error(`[${error.response.status}] ${error.response.data.value.message}`)
    }
    return text;
}