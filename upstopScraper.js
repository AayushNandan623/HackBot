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

  let data = await page.evaluate(() => {
    const eventCards = Array.from(
      document.querySelectorAll(".j-between-start.user_img.opp_content")
    );
    return eventCards
      .map((event) => {
        const title =
          event.querySelector(".double-wrap")?.innerText.trim() || "N/A";
        if (title === "N/A") {
          return null;
        }
        const institution = event.querySelector("p")?.innerText.trim() || "N/A";

        const prizeElement = event.querySelector(".prize");
        const prize =
          prizeElement?.innerText.trim().replace(/[^\d,]/g, "") || "No prize";
        if (prize === "No prize") {
          return null;
        }
        const daysLeftElem = event.querySelectorAll(
          ".seperate_box.align-center.ng-star-inserted"
        );

        let daysLeft = "Date not available";
        if (daysLeftElem.length === 2) {
          daysLeft = daysLeftElem[1]?.innerText.trim() || "Date not available";
        } else if (daysLeftElem.length === 1) {
          daysLeft = daysLeftElem[0]?.innerText.trim() || "Date not available";
        }
        const imgSrc =
          event.querySelector("img")?.getAttribute("src") || "No Image";
        return { title, institution, prize, daysLeft, imgSrc };
      })
      .filter((arr) => arr !== null);
  });
  
  console.log(data);

  await browser.close();

  return data;
};

getCards();
