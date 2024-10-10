import puppeteer from "puppeteer";

const getCards = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });

  const page = await browser.newPage();

  await page.goto("https://unstop.com/hackathons", {
    waitUntil: "networkidle2",
  });

  const data = await page.evaluate(() => {
    const dataList = document.querySelectorAll(".content");

    if (!dataList || dataList.length === 0) {
      console.error("No event list found on the page.");
      return [];
    }

    return Array.from(dataList).map((event) => {
      const title =
        event.querySelector(".double-wrap")?.innerText.trim() || "N/A";
      if (title === "N/A") {
        return {};
      }
      const institution = event.querySelector("p")?.innerText.trim() || "N/A";

      // Check if prize exists
      const prizeElement = event.querySelector(".prize");
      const prize =
        prizeElement?.innerText.trim().replace(/[^\d,]/g, "") || "No prize";

      const daysLeftElem = event.querySelectorAll(
        ".seperate_box.align-center.ng-star-inserted"
      );

      let daysLeft = "Date not available";
      if (daysLeftElem.length === 2) {
        // Sometimes there are two elements: one for prize, one for days left
        daysLeft = daysLeftElem[1]?.innerText.trim() || "Date not available";
      } else if (daysLeftElem.length === 1) {
        // If there's only one element, it's likely to be the days left
        daysLeft = daysLeftElem[0]?.innerText.trim() || "Date not available";
      }

      return { title, institution, prize, daysLeft };
    });
  });

  console.log(data);

  await browser.close();
};

getCards();

