import puppeteer from "puppeteer";

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
      console.error("No user list found on the page.");
      return [];
    }

    return Array.from(dataList).map((event) => {
      const title =
        event.querySelector(".double-wrap")?.innerText.trim() || "N/A";
      const institution = event.querySelector("p")?.innerText.trim() || "N/A";
      const prize =
        event
          .querySelector(".prize")
          ?.innerText.trim()
          .replace(/[^\d,]/g, "") || "N/A";
      const daysLeft =
        event
          .querySelector(".seperate_box.align-center:nth-of-type(3)")
          ?.childNodes[1]?.textContent.trim() || "N/A";

      return { title, institution, prize, daysLeft };
    });
  });

  console.log(data);

  await browser.close();
};

getQuotes();
