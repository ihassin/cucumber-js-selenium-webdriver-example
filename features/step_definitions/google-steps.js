'use strict';

var {defineSupportCode} = require('cucumber');
var {By, until, Key} = require('selenium-webdriver');
var {expect} = require('chai');

defineSupportCode(function({When, Then}) {

  When(/^I search Google for "([^"]*)"$/, function (searchQuery, next) {
    this.driver.get(process.env.SITE_URL);
    this.driver.findElement(By.name('username'))
      .sendKeys(process.env.SITE_USERNAME);
    this.driver.findElement(By.xpath('//div[text()="Login"]'))
      .click()
        .then(function() {
          next();
        });
  });

  Then(/^I should see some results$/, function (next) {
    this.driver.findElement(By.name('password'))
      .sendKeys(process.env.SITE_PASSWORD);

    this.driver.findElement(By.xpath('//div[text()="Login"]'))
      .click();

    this.driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div[3]/div/div[1]/div/div/div/div/div/div[1]/div/div/div/div/button')));
    this.driver.findElement(By.xpath('//*[@id="root"]/div/div/div[3]/div/div[1]/div/div/div/div/div/div[1]/div/div/div/div/button'))
      .click();

    this.driver.findElement(By.xpath('//*[contains(text(), "Let\'s")]'))
      .then(function() {
        next();
      });
  });

});

