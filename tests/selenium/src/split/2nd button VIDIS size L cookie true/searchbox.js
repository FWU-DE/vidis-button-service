
const { Builder, until, By, Key } = require ("selenium-webdriver");
const { Action } = require("selenium-webdriver/lib/input");
const assert = require ("assert");
    
    
async function searchbox2Vidis(){

//select the browser
let driver = await new Builder().forBrowser("firefox").build();

//navigate to website
await driver.get("https://tp.fwu.intension.eu/?version=latest")

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
                assert.match(text,/schule|SCHULE/,'Fail')
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
                assert.match(text,/7/,'Fail')
        });
    });
});

//refresh the page
await driver.navigate().refresh();

//click on 2nd VIDIS button [SIZE L, cookie=true]
await driver.findElement(By.css("vidis-login[size='L'] button.entrance-button")).click();

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
                assert.match(text,/SuBITI Bremen|Bremen|@bremen.de|SuBITI/,'Fail')
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
            console.log(text);
                assert.match(text,/rheinland|Schulcampus RLP|Rheinland Pfalz/,'Fail')
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
            console.log(text);
                assert.match(text,/bayern|Bayern Cloud|@bayern.de/,'Fail')
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



}

searchbox2Vidis()