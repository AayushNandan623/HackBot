const puppeteer= require("puppeteer");

const getQuotes = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("https://unstop.com/hackathons", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector(".content", { timeout: 10000 });

  const data = await page.evaluate(() => {
    const dataList = document.querySelectorAll(".content");

    if (!dataList || dataList.length === 0) {
      console.error("No event list found on the page.");
      return [];
    }

    return Array.from(dataList).map((event) => {
   

      const title =
        event.querySelector(".double-wrap")?.innerText.trim() || "N/A";
    if(title==="N/A"){
        return {};
    }
      const institution = event.querySelector("p")?.innerText.trim() || "N/A";
    
      const prizeElement = event.querySelector(".prize");
      const prize =
        prizeElement?.innerText.trim().replace(/[^\d,]/g, "") || "No prize";

      const daysLeftElem = event.querySelectorAll(
        ".seperate_box.align-center.ng-star-inserted"
      );

      let daysLeft = "Date not available";
      if (daysLeftElem.length === 2) {

        daysLeft = daysLeftElem[1]?.innerText.trim() || "Date not available";
      } else if (daysLeftElem.length === 1) {

        daysLeft = daysLeftElem[0]?.innerText.trim() || "Date not available";
      }

      return { title, institution, prize, daysLeft };
    });
  });

  console.log(data);

  await browser.close();
};

getQuotes();

