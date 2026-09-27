const { chromium } = require('playwright');

(async () => {
  let browser;

  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1200 },
    });

    console.log('Opening the page...');
    await page.goto('https://test.netlify.app/', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });
    console.log('Page loaded. URL:', page.url());

    const fillField = async (fieldName, value) => {
      const locator = page
        .getByLabel(new RegExp(fieldName, 'i'))
        .or(page.getByPlaceholder(new RegExp(fieldName, 'i')))
        .or(page.locator(`input[name*="${fieldName}" i], input[id*="${fieldName}" i], input[placeholder*="${fieldName}" i]`));
      if ((await locator.count()) === 0) {
        console.warn(`Field "${fieldName}" not found - skipping.`);
        return;
      }
      await locator.first().fill(value);
    };

    console.log('Filling form fields...');
    await fillField('name', 'Amit Halfon');
    await fillField('email', 'amithalfon@gmail.com');
    await fillField('phone', '0501234567');
    await fillField('company', 'Jones');
    await fillField('website', 'https://amithalfon.com');
    console.log('Form fields filled.');

    const targetOption = '51-500';
    const employeesSelect = page.getByLabel(/number of employees/i);
    console.log('Updating employee range to:', targetOption);
    if ((await employeesSelect.count()) > 0) {
      await employeesSelect.selectOption({ label: targetOption });
      console.log('Employee range selected via label selector.');
    } else {
      const fallbackSelect = page.locator('select').last();
      const hasOption = (await fallbackSelect.count()) > 0 ? await fallbackSelect.locator('option', { hasText: targetOption }).count() : 0;
      if (hasOption > 0) {
        await fallbackSelect.selectOption({ label: targetOption });
        console.log('Employee range selected via fallback selector.');
      } else {
        console.log('Employee range option not found.');
      }
    }

    console.log('Taking screenshot before submit...');
    await page.screenshot({
      path: 'screenshots/before-callback-request.png',
      fullPage: true,
    });
    console.log('Screenshot saved as screenshots/before-callback-request.png');

    console.log('Clicking "Request a call back" button...');
    await page.getByRole('button', { name: /request a call back/i }).click();
    console.log('Submit button clicked.');

    try {
      console.log('Waiting for thank you page...');
      await page.waitForFunction(
        () => {
          const text = document.body.innerText.toLowerCase();
          return text.includes('thank you') || text.includes('thanks');
        },
        { timeout: 20000 }
      );
      console.log('Reached the thank you page.');
    } catch (error) {
      const bodyText = await page.locator('body').innerText();
      console.log('Thank you page was not reached. Current URL:', page.url());
      console.log('Current page text:', bodyText.slice(0, 300));
    }
  } catch (error) {
    console.error('Automation failed:', error);
    process.exit(1);
  }finally {
    console.log('Closing browser...');
    await browser.close();
    console.log('Browser closed.');
  }
})();
