const expect = require('chai').use(require('chai-as-promised')).expect
const prot = require('protractor')
const EC = protractor.ExpectedConditions;

var util = require('util')

class Dsl {

  openUrl(url) {
    return browser.get(url);
  }

  sendKeys(element, value, logText) {

    this.waitVisibilityOf(element, 2000, logText);

    logText = logText || 'Function sendKeys:';

    return element.sendKeys(value).then((found) => Promise.resolve(found))
      .catch((waitError) => {
        return Promise.reject(this.logTextFormatted(logText, waitError, element));
      });
  }

  click(element, logText, time) {

    time = time || 2;
    this.waitVisibilityOf(element, time * 1000, logText);
    logText = logText || 'Function click:';

    return element.click().then((found) => Promise.resolve(found))
      .catch((waitError) => {
        return Promise.reject(this.logTextFormatted(logText, waitError, element));
      });
  }

  select(element, option, logText) {
    this.waitVisibilityOf(element, 10000, logText);

    logText = logText || 'Function select';

    return element.select(option).then((found) => Promise.resolve(found))
      .catch((waitError) => {
        return Promise.reject(this.logTextFormatted(logText, waitError, element));
      });
  }

  getText(element, logText) {
      this.waitVisibilityOf(element, 10000, logText);
      logText = logText || 'Function getText';
      return element.getText().then((found) => Promise.resolve(found))
      .catch((waitError) => {
        return Promise.reject(this.logTextFormatted(logText, waitError, element));
      });
  }

  waitVisibilityOf(element, maxWaitTime, logText) {
    logText = logText || 'Function waitVisibilityOf';
    maxWaitTime = maxWaitTime || 10000;
    return browser.wait(ExpectedConditions.visibilityOf(element), maxWaitTime)
      .then((found) => Promise.resolve(found))
      .catch((waitError) => {
        return Promise.reject(this.logTextFormatted(logText, waitError, element));
      });
  }

  waitInvisibilityOf(element, maxWaitTime, logText) {
    logText = logText || 'Function waitInvisibilityOf';
    maxWaitTime = maxWaitTime || 10000;
    return browser.wait(EC.invisibilityOf(element), maxWaitTime).then((found) => Promise.resolve(found))
      .catch((waitError) => {
        return Promise.reject(this.logTextFormatted(logText, waitError, element));
      });
  }

  expectIsElementPresent(element) {
    return expect(element(element).isPresent()).to.eventually.equals(true);
  }

  expectIsElementNotPresent(element) {
    return expect(element(element).isPresent()).to.eventually.equals(false);
  }

  expectTextToBeEqual(element, value) {
    return expect(this.getText(element)).toEqual(value);
  }

  sleep(time) {
    return browser.sleep(time)
  }

  scrollTo(scrollToElement) {
    var wd = browser.driver;
    return scrollToElement.getLocation().then((loc) => {
      return wd.executeScript('window.scrollTo(0,arguments[0]);', loc.y);
    });
  };

  webElement(type, txtElement) {

    if (this.areEqual(type, 'css'))
      return element(by.css(txtElement));
    else if (this.areEqual(type, 'xpath'))
      return element(by.xpath(txtElement));
    else if (this.areEqual(type, 'id'))
      return element(by.id(txtElement));
    else if (this.areEqual(type, 'name'))
      return element(by.name(txtElement));

  }

  areEqual(var1, var2) {
    return var1.toUpperCase() === var2.toUpperCase();
  }

  logTextFormatted(logText, waitError, element) {
    return `${logText} ${waitError} for the element: ${this.convertWebElementToString(element)}`
  }

  convertWebElementToString(element) {
    return util.inspect(element).toString().split('value: \'')[1].split('\' },')[0]
  }
}

module.exports = Dsl