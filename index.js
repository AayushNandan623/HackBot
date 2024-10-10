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

// const puppeteer = require("puppeteer");

// (async () => {
//   // Launch the browser
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   // Navigate to the page you want to scrape
//   await page.goto("https://unstop.com/hackathons", {
//     waitUntil: "networkidle2",
//   });

//   // Wait for the relevant elements to load (adjust the selector as needed)
//   await page.waitForSelector(".j-between-start.user_img.opp_content");

//   // Extract data from all event cards
//   const eventData = await page.evaluate(() => {
//     // Get all event cards
//     const eventCards = Array.from(
//       document.querySelectorAll(".j-between-start.user_img.opp_content")
//     );

//     return eventCards.map((card) => {
//       // Extract title
//       const title =
//         card.querySelector("h2.double-wrap")?.innerText.trim() || "No Title";

//       // Extract organizer
//       const organizer =
//         card.querySelector("p")?.innerText.trim() || "No Organizer";

//       // Extract days left - ensure you get the correct selector
//       const daysLeftElem = card.querySelectorAll(
//         ".seperate_box.align-center.ng-star-inserted"
//       );

//       let daysLeft = "No Days Left";
//       if (daysLeftElem.length === 2) {
//         // Sometimes there are two elements: one for prize, one for days left
//         daysLeft = daysLeftElem[1]?.innerText.trim() || "No Days Left";
//       } else if (daysLeftElem.length === 1) {
//         // If there's only one element, it's likely to be the days left
//         daysLeft = daysLeftElem[0]?.innerText.trim() || "No Days Left";
//       }

//       return {
//         title,
//         organizer,
//         days_left: daysLeft,
//       };
//     });
//   });

//   // Log the extracted data
//   console.log(eventData);

//   // Close the browser
//   await browser.close();
// })();
