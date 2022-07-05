const { Builder, until, By, Key } = require ("selenium-webdriver");
const { Action } = require("selenium-webdriver/lib/input");
const assert = require ("assert");
    
    
async function searchboxVidis(){

//select the browser
let driver = await new Builder().forBrowser("firefox").build();

//navigate to website
await driver.get("https://tp.fwu.intension.eu/?version=latest")

//click on first VIDIS button

await driver.findElement(By.css("vidis-login:not([size]) button.entrance-button")).click();

//input on searchbox with all elements present
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("u")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//compare input with elements inside searchbox
driver.findElements(By.css("li.p-autocomplete-item .idp-item-icon + div .idp-item-label")).then(function(elements){
    elements.forEach(function (element) {
        element.getText().then(function(text){
            console.log(text);
                assert.match(text,/u|U/,'Fail')
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
                assert.match(text,/a|A/,'Fail')
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
                assert.match(text,/@/,'Fail')
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
                assert.match(text,/1/,'Fail')
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
            console.log(text);
                assert.match(text,/SuBITI Bremen/,'Fail')
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
            console.log(text);
                assert.match(text,/Schulcampus RLP/,'Fail')
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
                assert.match(text,/Bayern Cloud/,'Fail')
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

driver.quit();

}

searchboxVidis()