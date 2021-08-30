const { newSession, deleteSession, go, getUrl, getElement, getElementText, click, getElementUntil } = require("../lib/commands");

(async () => {
    await newSession();
    await go("https://www.seleniumeasy.com/test/jquery-download-progress-bar-demo.html")  
    console.log(await getUrl());
    let element = await getElement({by: "xpath", value: "//button[@id='downloadButton']"});
    let text = await getElementText(element);
    await click(element);
    console.log(text);

    element = await getElementUntil({by: "xpath", value: "//button[text() = 'Close']"}, 15);
    text = await getElementText(element);
    console.log(text);
    await deleteSession();
    require("./index2").index2();
})();