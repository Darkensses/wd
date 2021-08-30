const axios = require("axios").default;
const { wd } = require("./wd")

axios.defaults.baseURL = "http://localhost:9515/session"

async function newSession(){
    try {
        let request = await axios.post(``, {capabilities:{browserName:"chrome"}});
        wd.sessionId = request.data.value.sessionId;
        
    } catch (error) {
        
        throw Error(`[${error.response.status}] ${error.response.data.value.message}`)
    }
}

async function deleteSession(){
    try {
        await axios.delete(`/${wd.sessionId}`);
        wd.sessionId = undefined;
        
    } catch (error) {
        
        throw Error(`[${error.response.status}] ${error.response.data.value.message}`)
    }
}

async function go(url) {
    try {
        await axios.post(`/${wd.sessionId}/url`, {url: url});        
        
    } catch (error) {
        
        throw Error(`[${error.response.status}] ${error.response.data.value.message}`)
    }
}

async function getUrl() {
    let url = undefined;
    try {
        let request = await axios.get(`/${wd.sessionId}/url`); 
        url = request.data.value;      
        
    } catch (error) {
        
        throw Error(`[${error.response.status}] ${error.response.data.value.message}`)
    }
    return url;
}

async function getElement(element) {    
    let ele;
    try {
        let response = await axios.post(`/${wd.sessionId}/element`, {using: element.by, value: element.value});   
        ele = {id: response.data.value['element-6066-11e4-a52e-4f735466cecf']};
        
    } catch (error) {        
        throw Error(`[${error.response.status}] ${error.response.data.value.message}`)
    }
    return ele;
}

async function getElementText(element) {
    let text;
    try {
        let response = await axios.get(`/${wd.sessionId}/element/${element.id}/text`);   
        text = response.data.value;
        
    } catch (error) {
        
        throw Error(`[${error.response.status}] ${error.response.data.value.message}`)
    }
    return text;
}

async function click(element) {
    try {
        await axios.post(`/${wd.sessionId}/element/${element.id}/click`, {using: element.by, value: element.value});   
        
    } catch (error) {
        
        throw Error(`[${error.response.status}] ${error.response.data.value.message}`)
    }
}

async function getElementUntil(element, maxTime) {
    let endTime = new Date().getTime() + (maxTime * 1000)
    while(true) {
        try {
            let value = await getElement(element);
            if(value) {
                return value;
            }
        } catch (error) {
            // nothing...
        }
        if(new Date().getTime() > endTime) {
            throw Error(`TimeoutException`)
        }
        //await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

module.exports = {
    newSession,
    deleteSession,
    go,
    getUrl,
    getElement,
    getElementText,
    click,
    getElementUntil
}