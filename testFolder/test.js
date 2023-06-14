const puppeteer = require('puppeteer');

async function enterValue() {
  const browser = await puppeteer.launch({headless : false});
  const page = await browser.newPage();

  // Navigate to the page
  await page.goto('http://localhost:5000/',{waitUntil : "domcontentloaded"});

  // Locate the form and enter a value
  await page.focus('.sign-in-form input[name="user_email"]');
  await page.keyboard.type('example@example.com');

  // Submit the form (if needed)
  await page.$eval('.sign-in-form', form => form.submit());

  // Wait for a while to see the result (optional)
  await page.waitForTimeout(2000);

  // Close the browser
  await browser.close();
}

enterValue();
