const { newSession, deleteSession, go, getUrl, getElement, getElementText } = require("../lib/commands");

(async () => {
    await newSession();
    await go("https://github.com/Darkensses")  
    console.log(await getUrl());
    let element = await getElement({by: "xpath", value: "//span[@itemprop='name']"});
    let text = await getElementText(element);
    console.log(text);
    await deleteSession();
    require("./index2").index2();
})();