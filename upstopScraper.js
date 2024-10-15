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
        const id = event.parentElement.id.slice(4);

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
          daysLeft =
            daysLeftElem[1]?.innerText.split("\n")[0].trim() ||
            "Date not available";
        } else if (daysLeftElem.length === 1) {
          daysLeft =
            daysLeftElem[0]?.innerText.split("\n")[0].trim() ||
            "Date not available";
        }
        const imgSrc =
          event.querySelector("img")?.getAttribute("src") || "No Image";
        return { title, institution, prize, daysLeft, imgSrc, id };
      })
      .filter((arr) => arr !== null);
  });

  console.log(data);

  await browser.close();

  return data;
};

const getMoreDetails = async ({ link }) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });

  const page = await browser.newPage();

  await page.goto(`https://unstop.com/hackathons/${link}`, {
    waitUntil: "networkidle2",
  });

  const data = await page.evaluate(() => {
    const eventDetails = document.querySelector(".about_game");

    const aboutEventInString = Array.from(eventDetails.querySelectorAll("p,ul"))
      .map((paragraph) => paragraph.textContent.trim())
      .join("\n");

    return aboutEventInString;
  });
  await browser.close();
  return data;
};

export default { getCards, getMoreDetails };
