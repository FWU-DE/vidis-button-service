const { Builder, until, By, Key } = require ("selenium-webdriver");
const { Action } = require("selenium-webdriver/lib/input");
const assert = require ("assert");
const test = require("selenium-webdriver/testing");
    
 
async function firefoxVIDIS(){

//select the browser
let driver = await new Builder().forBrowser("firefox").build();

//navigate to website
await driver.get("https://tp.fwu.intension.eu/?version=latest")

//click on first VIDIS button
await driver.findElement(By.css("vidis-login:not([size]) button.entrance-button")).click();

//verify "zuruck" button
await driver.findElement(By.className("p-button p-component p-button-link backButton")).click();

driver.quit();
    

}

firefoxVIDIS()


