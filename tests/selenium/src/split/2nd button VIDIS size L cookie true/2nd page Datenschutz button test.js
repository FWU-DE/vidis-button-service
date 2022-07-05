const { Builder, until, By, Key } = require ("selenium-webdriver");
const { Action } = require("selenium-webdriver/lib/input");
const assert = require ("assert");
    
    
async function Datenschutz(){

    //select the browser
    let driver = await new Builder().forBrowser("firefox").build();
    
    //navigate to website
    await driver.get("https://tp.fwu.intension.eu/?version=latest")
    
    //click on first VIDIS button
    await driver.findElement(By.css("vidis-login[size='L'] button.entrance-button")).click();
    
    //verify "datenschutz" button
    await driver.findElement(By.css("a.footer-links:nth-child(1)")).click(); 
    

    //scroll at the bottom of the page
    await driver.executeScript("window.scrollTo(0,7594.98)");

    //wait to load
    await driver.wait(until.elementLocated(By.className('whole-layout')), 90000);
    
    //scroll up
    await driver.executeScript("window.scrollTo(7594.98,0)");


}

Datenschutz()