const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch();
  
    const page = await browser.newPage();
  
    await page.goto('https://dj1jklak2e.28car.com/sell_lst.php');
  
    const cookie = await page.cookies();
  
    console.log(cookie)
  
    await browser.close();
  
  })();

// const puppeteer = require('puppeteer');

// (async () => {

//   const browser = await puppeteer.launch();

//   const page = await browser.newPage();

//   const response = await page.goto('https://dj1jklak2e.28car.com/sell_lst.php');

//   const text = await response.text();

//   console.log(text)

//   await browser.close();

// })();