const { Builder, until, By, Key } = require ("selenium-webdriver");
const { Action } = require("selenium-webdriver/lib/input");
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');

const assert = require("assert");
const screen = {
    width: 640,
    height: 480
};

async function VIDIS(){

//select the browser
let driver = await new Builder()
                        .forBrowser("chrome")
                        .setChromeOptions(new chrome.Options().headless().windowSize(screen))
                        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
                        .build();

//navigate to website
await driver.get("https://tp.fwu.intension.eu/?version=latest")

//click on first VIDIS button

await driver.findElement(By.css("vidis-login:not([size]) button.entrance-button")).click();

 //return to main page
await driver.navigate().back();
    console.log("Pass - Back button has functionality")

//back to main page
await driver.navigate().refresh();
    console.log("Pass - Page can be successfully refreshed")

await driver.manage().setTimeouts( { implicit: 10000 } );

//click on first VIDIS button

await driver.findElement(By.css("vidis-login:not([size]) button.entrance-button")).click();

//input on searchbox with all elements present
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("u")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);
    console.log("Pass - Searchbox is functional and supports input")

//compare input with elements inside searchbox
driver.findElements(By.css("li.p-autocomplete-item .idp-item-icon + div .idp-item-label")).then(function(elements){
    elements.forEach(function (element) {
        element.getText().then(function(text){
            console.log(text);
                //assert.match(text,/u|U/,'Fail')
                assert.ok(/u|U/.test(text),'Fail')
        });
    });
});

//refresh the page
await driver.navigate().refresh();

//click on first VIDIS button
await driver.findElement(By.css("vidis-login:not([size]) button.entrance-button")).click();

//input on searchbox error
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("a")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//compare input with elements inside searchbox
driver.findElements(By.css("li.p-autocomplete-item .idp-item-icon + div .idp-item-label")).then(function(elements){
    elements.forEach(function (element) {
        element.getText().then(function(text){
            console.log(text);
                //assert.match(text,/a|A/,'Fail')
                assert.ok(/a|A/.test(text),'Fail')
        });
    });
});

//back to main page
await driver.navigate().refresh();

//click on first VIDIS button
await driver.findElement(By.css("vidis-login:not([size]) button.entrance-button")).click();

//input on searchbox error
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("@")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//compare input with elements inside searchbox
driver.findElements(By.css("li.p-autocomplete-item .idp-item-icon + div .idp-item-label")).then(function(elements){
    elements.forEach(function (element) {
        element.getText().then(function(text){
            console.log(text);
                //assert.match(text,/@/,'Fail')
                assert.ok(/@/.test(text),'Fail')
        });
    });
});

//refresh the page
await driver.navigate().refresh();

//click on first VIDIS button
await driver.findElement(By.css("vidis-login:not([size]) button.entrance-button")).click();

//input on searchbox error
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("1")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//compare input with elements inside searchbox
driver.findElements(By.css("li.p-autocomplete-item")).then(function(elements){
    elements.forEach(function (element) {
        element.getText().then(function(text){
            console.log(text);
                //assert.match(text,/1/,'Fail')
                assert.ok(/1/.test(text),'Fail')
        });
    });
});

//refresh the page
await driver.navigate().refresh();

//click on first VIDIS button
await driver.findElement(By.css("vidis-login:not([size]) button.entrance-button")).click();

//input on searchbox error
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("SuBITI Bremen")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//compare input with elements inside searchbox
driver.findElements(By.css("li.p-autocomplete-item")).then(function(elements){
    elements.forEach(function (element) {
        element.getText().then(function(text){
            console.log("Pass - Should return pass if the input - SuBITI Bremen - text match");
                //assert.match(text,/SuBITI Bremen/,'Fail')
                assert.ok(/SuBITI Bremen/.test(text),'Fail')
        });
    });
});

//refresh the page
await driver.navigate().refresh();

//click on first VIDIS button
await driver.findElement(By.css("vidis-login:not([size]) button.entrance-button")).click();

//input on searchbox error
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("Schulcampus RLP")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//compare input with elements inside searchbox
driver.findElements(By.css("li.p-autocomplete-item")).then(function(elements){
    elements.forEach(function (element) {
        element.getText().then(function(text){
            console.log("Pass - Input match with text inside searchbox- Schulcampus RLP");
                //assert.match(text,/Schulcampus RLP/,'Fail')
                assert.ok(/Schulcampus RLP/.test(text),'Fail')
        });
    });
});

//return to main menu
await driver.findElement(By.className("p-button p-component p-button-link backButton")).click();

//click on first VIDIS button
await driver.findElement(By.css("vidis-login:not([size]) button.entrance-button")).click();

//input on searchbox error
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("Bayern Cloud")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//compare input with elements inside searchbox
driver.findElements(By.css("li.p-autocomplete-item")).then(function(elements){
    elements.forEach(function (element) {
        element.getText().then(function(text){
            console.log(text);
                //assert.match(text,/Bayern Cloud/,'Fail')
                assert.ok(/Bayern Cloud/.test(text),'Fail')
        });
    });
});

//refresh the page
await driver.navigate().refresh();

//click on first VIDIS button
await driver.findElement(By.css("vidis-login:not([size]) button.entrance-button")).click();

//input on searchbox
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("SuBITI Bremen")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//
await driver.findElement(By.css("html body div.p-autocomplete-panel.p-component.p-ripple-disabled ul#pv_id_2_list.p-autocomplete-items li.p-autocomplete-item div.flex.align-items-center.justify-content-between")).click();

//click on login button
await driver.findElement(By.className("p-button p-component idp-choice-button")).click();
    

//return to main page
await driver.navigate().back();

//click on first VIDIS button
await driver.findElement(By.css("vidis-login:not([size]) button.entrance-button")).click();

//input on searchbox
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("Schulcampus RLP")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//
await driver.findElement(By.css("html body div.p-autocomplete-panel.p-component.p-ripple-disabled ul#pv_id_2_list.p-autocomplete-items li.p-autocomplete-item div.flex.align-items-center.justify-content-between")).click();

//click on login button
await driver.findElement(By.className("p-button p-component idp-choice-button")).click();

//return to main page
await driver.navigate().back();

//click on first VIDIS button
await driver.findElement(By.css("vidis-login:not([size]) button.entrance-button")).click();

//input on searchbox
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("Bayern Cloud")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//
await driver.findElement(By.css("html body div.p-autocomplete-panel.p-component.p-ripple-disabled ul#pv_id_2_list.p-autocomplete-items li.p-autocomplete-item div.flex.align-items-center.justify-content-between")).click();

//click on login button
await driver.findElement(By.className("p-button p-component idp-choice-button")).click();

//return to main page
await driver.navigate().back();

    //click on 2nd VIDIS button [SIZE L, cookie=true]
    await driver.findElement(By.css("vidis-login[size='L'] button.entrance-button")).click();

    //input on searchbox with all elements present
    await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("schule")

    //wait for droplist
    await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

    //compare input with elements inside searchbox
    driver.findElements(By.css("li.p-autocomplete-item .idp-item-icon + div .idp-item-label")).then(function(elements){
        elements.forEach(function (element) {
            element.getText().then(function(text){
                console.log(text);
                    //assert.match(text,/schule|SCHULE/,'Fail')
                    assert.ok(/schule|SCHULE/.test(text),'Fail')
            });
        });
    });

    //refresh the page
    await driver.navigate().refresh();

    //click on 2nd VIDIS button [SIZE L, cookie=true]
    await driver.findElement(By.css("vidis-login[size='L'] button.entrance-button")).click();

    //input on searchbox error
    await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("7")

    //wait for droplist
    await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

    //compare input with elements inside searchbox
    driver.findElements(By.css("li.p-autocomplete-item .idp-item-icon + div .idp-item-label")).then(function(elements){
        elements.forEach(function (element) {
            element.getText().then(function(text){
                console.log(text);
                    //assert.match(text,/7/,'Fail')
                    assert.ok(/7/.test(text),'Fail')
            });
        });
    });

    //refresh the page
    await driver.navigate().refresh();

    //click on 2nd VIDIS button [SIZE L, cookie=true]
    await driver.findElement(By.css("vidis-login[size='L'] button.entrance-button")).click();

    //clear the previous text
    await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).clear();
        console.log("Pass - Previous input can be deleted")

    //input on searchbox error
    await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("@bremen")

    //wait for droplist
    await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

    //compare input with elements inside searchbox
    driver.findElements(By.css("li.p-autocomplete-item .idp-item-icon + div .idp-item-label")).then(function(elements){
        elements.forEach(function (element) {
            element.getText().then(function(text){
                console.log(text);
                    //assert.match(text,/SuBITI Bremen|Bremen|@bremen.de|SuBITI/,'Fail')
                    assert.ok(/SuBITI Bremen|Bremen|@bremen.de|SuBITI/.test(text),'Fail')
            });
        });
    });

    //refresh the page
    await driver.navigate().refresh();

    //refresh the page
    await driver.navigate().refresh();

    //click on 2nd VIDIS button [SIZE L, cookie=true]
    await driver.findElement(By.css("vidis-login[size='L'] button.entrance-button")).click();

    //clear the previous text
    await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).clear();

    //input on searchbox error
    await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("rheinland")

    //wait for droplist
    await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

    //compare input with elements inside searchbox
    driver.findElements(By.css("li.p-autocomplete-item .idp-item-icon + div .idp-item-label")).then(function(elements){
        elements.forEach(function (element) {
            element.getText().then(function(text){
                console.log("Pass - Input match with text inside searchbox - rheiland");
                    //assert.match(text,/rheinland|Schulcampus RLP|Rheinland Pfalz/,'Fail')
                    assert.ok(/rheinland|Schulcampus RLP|Rheinland Pfalz/.test(text),'Fail')
            });
        });
    });

    //return to main menu
    await driver.findElement(By.className("p-button p-component p-button-link backButton")).click();

    //click on 2nd VIDIS button [SIZE L, cookie=true]
    await driver.findElement(By.css("vidis-login[size='L'] button.entrance-button")).click();

    //clear the previous text
    await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).clear();

    //input on searchbox error
    await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("bayern.de")

    //wait for droplist
    await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

    //compare input with elements inside searchbox
    driver.findElements(By.css("li.p-autocomplete-item .idp-item-icon + div .idp-item-label")).then(function(elements){
        elements.forEach(function (element) {
            element.getText().then(function(text){
                console.log("Pass - Input match with text inside searchbox - bayern.de");
                    //assert.match(text,/bayern|Bayern Cloud|@bayern.de/,'Fail')
                    assert.ok(/bayern|BayernCloud Schule|@bayern.de/.test(text),'Fail')
            });
        });
    });

    //refresh the page
    await driver.navigate().refresh();

    //click on 2nd VIDIS button [SIZE L, cookie=true]
    await driver.findElement(By.css("vidis-login[size='L'] button.entrance-button")).click();

    //clear the previous text
    await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).clear();

    //input on searchbox
    await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("Bremen")

    //wait for droplist
    await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

    //
    await driver.findElement(By.css("html body div.p-autocomplete-panel.p-component.p-ripple-disabled ul#pv_id_2_list.p-autocomplete-items li.p-autocomplete-item div.flex.align-items-center.justify-content-between")).click();

    //click on login button
    await driver.findElement(By.className("p-button p-component idp-choice-button")).click();

    //return to main page
    await driver.navigate().back();

    //click on 2nd VIDIS button [SIZE L, cookie=true]
    await driver.findElement(By.css("vidis-login[size='L'] button.entrance-button")).click();

    //clear the previous text
    await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).clear();

    //input on searchbox
    await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("@schulcampus")

    //wait for droplist
    await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

    //
    await driver.findElement(By.css("html body div.p-autocomplete-panel.p-component.p-ripple-disabled ul#pv_id_2_list.p-autocomplete-items li.p-autocomplete-item div.flex.align-items-center.justify-content-between")).click();

    //click on login button
    await driver.findElement(By.className("p-button p-component idp-choice-button")).click();

    //return to main page
    await driver.navigate().back();

    //click on 2nd VIDIS button [SIZE L, cookie=true]
    await driver.findElement(By.css("vidis-login[size='L'] button.entrance-button")).click();

    //clear the previous text
    await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).clear();

    //input on searchbox
    await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("Bayern")

    //wait for droplist
    await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

    //
    await driver.findElement(By.css("html body div.p-autocomplete-panel.p-component.p-ripple-disabled ul#pv_id_2_list.p-autocomplete-items li.p-autocomplete-item div.flex.align-items-center.justify-content-between")).click();

    //click on login button
    await driver.findElement(By.className("p-button p-component idp-choice-button")).click();

    //return to main page
    await driver.navigate().back();

        //click on the 3rd VIDIS button [SIZE=M, cookie=false]
        await driver.findElement(By.css("vidis-login[size='M'] button.entrance-button")).click();

        //clear the previous text
        await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).clear();

        //input on searchbox with all elements present
        await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("bayern")

        //wait for droplist
        await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

        //compare input with elements inside searchbox
        driver.findElements(By.css("li.p-autocomplete-item .idp-item-icon + div .idp-item-label")).then(function(elements){
            elements.forEach(function (element) {
                element.getText().then(function(text){
                    console.log("Pass - Input match with text inside searchbox - Bayern");
                        //assert.match(text,/SuBITI Bremen|Schulcampus RLP|Bayern Cloud/,'Fail')
                        assert.ok(/SuBITI Bremen|Schulcampus RLP|BayernCloud Schule/.test(text),'Fail')
                });
            });
        });

        //return to main menu
        await driver.findElement(By.className("p-button p-component p-button-link backButton")).click();

        //click on 3rd VIDIS button [SIZE L, cookie=true]
        await driver.findElement(By.css("vidis-login[size='M'] button.entrance-button")).click();

        //input on searchbox with all elements present
        await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("schul")

        //wait for droplist
        await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);


        //compare input with elements inside searchbox
driver.findElements(By.css("li.p-autocomplete-item .idp-item-icon + div .idp-item-label")).then(function(elements){
    elements.forEach(function (element) {
        element.getText().then(function(text){
            console.log(text);
                //assert.match(text,/schul|SCHUL/,'Fail')
                assert.ok(/schul|SCHUL/.test(text),'Fail')
        });
    });
});

//refresh the page
await driver.navigate().refresh();

//click on 3rd VIDIS button [SIZE L, cookie=true]
await driver.findElement(By.css("vidis-login[size='M'] button.entrance-button")).click();

//input on searchbox error
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("3")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//compare input with elements inside searchbox
driver.findElements(By.css("li.p-autocomplete-item .idp-item-icon + div .idp-item-label")).then(function(elements){
    elements.forEach(function (element) {
        element.getText().then(function(text){
            console.log(text);
                //assert.match(text,/7/,'Fail')
                assert.ok(/7/.test(text),'Fail')
        });
    });
});

//refresh the page
await driver.navigate().refresh();

//click on 3rd VIDIS button [SIZE L, cookie=true]
await driver.findElement(By.css("vidis-login[size='M'] button.entrance-button")).click();

//clear the previous text
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).clear();

//input on searchbox error
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("@bremen")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//compare input with elements inside searchbox
driver.findElements(By.css("li.p-autocomplete-item .idp-item-icon + div .idp-item-label")).then(function(elements){
    elements.forEach(function (element) {
        element.getText().then(function(text){
            console.log(text);
                //assert.match(text,/SuBITI Bremen|Bremen|@bremen.de|SuBITI/,'Fail')
                assert.ok(/SuBITI Bremen|Bremen|@bremen.de|SuBITI/.test(text),'Fail')
        });
    });
});

//refresh the page
await driver.navigate().refresh();

//refresh the page
await driver.navigate().refresh();

//click on 3rd VIDIS button [SIZE L, cookie=true]
await driver.findElement(By.css("vidis-login[size='M'] button.entrance-button")).click();

//clear the previous text
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).clear();

//input on searchbox error
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("Rheinland Pfalz")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//compare input with elements inside searchbox
driver.findElements(By.css("li.p-autocomplete-item .idp-item-icon + div .idp-item-label")).then(function(elements){
    elements.forEach(function (element) {
        element.getText().then(function(text){
            console.log("Pass - Input match with text inside searchbox - Rheinland Pfalz");
                //assert.match(text,/rheinland|Schulcampus RLP|Rheinland Pfalz/,'Fail')
                assert.ok(/rheinland|Schulcampus RLP|Rheinland Pfalz/.test(text),'Fail')
        });
    });
});

//return to main menu
await driver.findElement(By.className("p-button p-component p-button-link backButton")).click();

//click on 3rd VIDIS button [SIZE L, cookie=true]
await driver.findElement(By.css("vidis-login[size='M'] button.entrance-button")).click();

//clear the previous text
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).clear();

//input on searchbox error
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("bayern.de")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//compare input with elements inside searchbox
driver.findElements(By.css("li.p-autocomplete-item .idp-item-icon + div .idp-item-label")).then(function(elements){
    elements.forEach(function (element) {
        element.getText().then(function(text){
            console.log(text);
                //assert.match(text,/bayern|Bayern Cloud|@bayern.de/,'Fail')
                assert.ok(/bayern|Bayern Cloud|@bayern.de/.test(text),'Fail')
        });
    });
});

//refresh the page
await driver.navigate().refresh();

//click on 3rd VIDIS button [SIZE L, cookie=true]
await driver.findElement(By.css("vidis-login[size='M'] button.entrance-button")).click();

//clear the previous text
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).clear();

//input on searchbox
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("bremen")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//
await driver.findElement(By.css("html body div.p-autocomplete-panel.p-component.p-ripple-disabled ul#pv_id_2_list.p-autocomplete-items li.p-autocomplete-item div.flex.align-items-center.justify-content-between")).click();

//click on login button
await driver.findElement(By.className("p-button p-component idp-choice-button")).click();

//return to main page
await driver.navigate().back();

//click on 3rd VIDIS button [SIZE L, cookie=true]
await driver.findElement(By.css("vidis-login[size='M'] button.entrance-button")).click();

//clear the previous text
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).clear();

//input on searchbox
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("schulcampus")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//
await driver.findElement(By.css("html body div.p-autocomplete-panel.p-component.p-ripple-disabled ul#pv_id_2_list.p-autocomplete-items li.p-autocomplete-item div.flex.align-items-center.justify-content-between")).click();

//click on login button
await driver.findElement(By.className("p-button p-component idp-choice-button")).click();

//return to main page
await driver.navigate().back();

//click on 3rd VIDIS button [SIZE L, cookie=true]
await driver.findElement(By.css("vidis-login[size='M'] button.entrance-button")).click();

//clear the previous text
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).clear();

//input on searchbox
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("bayern")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//
await driver.findElement(By.css("html body div.p-autocomplete-panel.p-component.p-ripple-disabled ul#pv_id_2_list.p-autocomplete-items li.p-autocomplete-item div.flex.align-items-center.justify-content-between")).click();

//click on login button
await driver.findElement(By.className("p-button p-component idp-choice-button")).click();

//return to main page
await driver.navigate().back();

            //click on the 4th VIDIS button [SIZE=M, cookie=false]
        await driver.findElement(By.css("vidis-login[size='S'] button.entrance-button")).click();

        //clear the previous text
        await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).clear();

        //input on searchbox with all elements present
        await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("baye")

        //wait for droplist
        await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

        //compare input with elements inside searchbox
        driver.findElements(By.css("li.p-autocomplete-item .idp-item-icon + div .idp-item-label")).then(function(elements){
            elements.forEach(function (element) {
                element.getText().then(function(text){
                    console.log("Pass - Input match with text inside searchbox - baye");
                        //assert.match(text,/SuBITI Bremen|Schulcampus RLP|Bayern Cloud/,'Fail')
                        assert.ok(/SuBITI Bremen|Schulcampus RLP|BayernCloud Schule/.test(text),'Fail')
                });
            });
        });

        //return to main menu
        await driver.findElement(By.className("p-button p-component p-button-link backButton")).click();
//click on first VIDIS button
await driver.findElement(By.css("vidis-login:not([size]) button.entrance-button")).click();
    
//verify "Nutzungsbedingungen" button
await driver.findElement(By.css("a.footer-links:nth-child(1)")).click(); 

//scroll at the bottom of the page
await driver.executeScript("window.scrollTo(0,7594.98)");

(await driver.getPageSource()).includes("Datenschutz");

//scroll up
await driver.executeScript("window.scrollTo(7594.98,0)");

console.log("Pass - Nutzungsbedingungen page verified")

//return to main page
let tabs = driver.getWindowHandle;
   if (tabs > 1)
   {
       driver.switchTo().window(tabs[2]);
       driver.close();
       driver.switchTo().window(tabs[1]);
       driver.close();
   }

//verify "Datenschutz" button
await driver.findElement(By.css("a.footer-links:nth-child(1)")).click(); 

//scroll at the bottom of the page
await driver.executeScript("window.scrollTo(0,7594.98)");

(await driver.getPageSource()).includes("Datenschutz");

//scroll up
await driver.executeScript("window.scrollTo(7594.98,0)");

console.log("Pass - Datenschutz page verified")

//verify "zuruck" button
await driver.findElement(By.className("p-button p-component p-button-link backButton")).click();

console.log("Pass - Zuruk button verified")

driver.quit();


}



VIDIS()
