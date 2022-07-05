const { Builder, until, By, Key } = require ("selenium-webdriver");
const { Action } = require("selenium-webdriver/lib/input");
const assert = require ("assert");
    
    
async function Wiefunktioniertes(){

//select the browser
let driver = await new Builder().forBrowser("firefox").build();

//navigate to website
await driver.get("https://tp.fwu.intension.eu/?version=latest")

//click on first VIDIS button
await driver.findElement(By.css("vidis-login[size='L'] button.entrance-button")).click();

//verify "Wie funktioniert es?" button
await driver.findElement(By.css("button.linkButton:nth-child(1)")).click();

//verify "X" button and exit "Wie funktioniert's?" page
await driver.findElement(By.className("p-button p-component p-button-link closeHelpButton")).click();

}

Wiefunktioniertes()
