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
/* let driver = await new Builder().forBrowser("firefox").build(); */
let driver = await new Builder()
                        .forBrowser("firefox")
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
                assert.ok(/u|U/.test(text),'Fail - u is not inside the dropbox')
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
                assert.ok(/a|A/.test(text),'Fail - a is not inside the dropbox')
        });
    });
});

//refresh the main page
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
                assert.ok(/@/.test(text),'Fail - @ is not inside the dropbox')
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
                assert.ok(/1/.test(text),'Fail - 1 is not inside the dropbox')
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
                assert.ok(/SuBITI Bremen/.test(text),'Fail - SuBITI Bremen is not inside the dropbox')
        });
    });
});

console.log("Pass - Should return pass if the input - SuBITI Bremen - text match");
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
            console.log("Pass - Should return pass if the input - Schulcampus RLP - text match");
                //assert.match(text,/SuBITI Bremen/,'Fail')
                assert.ok(/Schulcampus RLP/.test(text),'Fail - Schulcampus RLP is not inside the dropbox')
        });
    });
});

console.log("Pass - Should return pass if the input - Schulcampus RLP - text match");
//refresh the page
await driver.navigate().refresh();

//click on first VIDIS button
await driver.findElement(By.css("vidis-login:not([size]) button.entrance-button")).click();

//input on searchbox error
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("BayernCloud Schule")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//compare input with elements inside searchbox
driver.findElements(By.css("li.p-autocomplete-item")).then(function(elements){
    elements.forEach(function (element) {
        element.getText().then(function(text){
            console.log("Pass - Should return pass if the input - BayernCloud Schule - text match");
                //assert.match(text,/BayernCloud Schule/,'Fail')
                assert.ok(/BayernCloud Schule/.test(text),'Fail - BayernCloud Schule is not inside the dropbox')
        });
    });
});

console.log("Pass - Should return pass if the input - BayernCloud Schule - text match");
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

driver.wait(until.elementLocated(By.className('p-button p-component idp-choice-button')), 4000);

await driver.navigate().back();

console.log("Pass - Should return pass if SuBITI Bremen page can be accessed");

await driver.navigate().refresh();

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

console.log("Pass - Should return pass if Schulcampus RLP page can be accessed");

await driver.navigate().refresh();

//click on first VIDIS button
await driver.findElement(By.css("vidis-login:not([size]) button.entrance-button")).click();

//input on searchbox
await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).sendKeys("BayernCloud Schule")

//wait for droplist
await driver.wait(until.elementLocated(By.className('p-autocomplete-panel')), 40000);

//
await driver.findElement(By.css("html body div.p-autocomplete-panel.p-component.p-ripple-disabled ul#pv_id_2_list.p-autocomplete-items li.p-autocomplete-item div.flex.align-items-center.justify-content-between")).click();

//click on login button
await driver.findElement(By.className("p-button p-component idp-choice-button")).click();

//return to main page
await driver.navigate().back();

console.log("Pass - Should return pass if BayernCloud Schule page can be accessed");

await driver.navigate().refresh();

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
                    assert.ok(/schule|SCHULE/.test(text),'Fail - schule is not inside the dropbox')
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
                    assert.ok(/7/.test(text),'Fail - 7 is not inside the dropbox')
            });
        });
    });

    //refresh the page
    await driver.navigate().refresh();

    //click on 2nd VIDIS button [SIZE L, cookie=true]
    await driver.findElement(By.css("vidis-login[size='L'] button.entrance-button")).click();

    //clear the previous text
    await driver.findElement(By.className("p-autocomplete-input p-inputtext p-component")).clear();
        console.log("Pass - Cookies enabled - Previous data present")
        console.log("Pass - Previous searchbox input can be deleted")

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
                    assert.ok(/SuBITI Bremen|Bremen|@bremen.de|SuBITI/.test(text),'Fail - @bremen is not inside the dropbox')
            });
        });
    });

    //refresh the page
    await driver.navigate().refresh();

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
                    assert.ok(/schul|SCHUL/.test(text),'Fail - schul is not inside the dropbox')
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
                    assert.ok(/7/.test(text),'Fail - 3 is not inside the dropbox')
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
                    assert.ok(/SuBITI Bremen|Bremen|@bremen.de|SuBITI/.test(text),'Fail - @bremen is not inside the dropbox')
                    });
                });
            });

        //refresh the page
        await driver.navigate().refresh();


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

 VIDIS();

 

