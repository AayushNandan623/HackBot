import puppeteer from "puppeteer";
export default async function devFolioHackathon() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    devtools: true,
  });
  const page = await browser.newPage();

  await page.goto("https://devfolio.co/hackathons", {
    waitUntil: "networkidle2",
  });

  console.log("started");

  let data = await page.evaluate(() => {
    const eventCards = Array.from(
      document.querySelectorAll(
        ".CompactHackathonCard__StyledCard-sc-9ff45231-0"
      )
    );
    return eventCards.map((card) => {
      const titleElement = card.querySelector(".oSdsf");
      const title = titleElement ? titleElement.innerText.trim() : "N/A";

      // const dateElement = card.querySelector(".");
      // const date = dateElement
      //   ? dateElement.innerText.trim()
      //   : "Date not available";

      // const prizeElement = card.querySelector("");
      // const prize = prizeElement ? prizeElement.innerText.trim() : "No prize";

      // const innerText = card.innerText;
      // const mode = innerText.includes("Online")
      //   ? "Online"
      //   : innerText.includes("Offline")
      //   ? "Offline"
      //   : "Not specified";

      return { title };
    });
  });
  await browser.close();
  console.log(data);
  return data;
}

devFolioHackathon();
