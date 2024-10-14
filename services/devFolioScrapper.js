import puppeteer from "puppeteer";
import calculateDateDifference from "../utilis/devFolioDate.js"; 

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

            const themeElement = card.querySelector(".bnveKZ");
            const theme = themeElement
                ? themeElement.innerText.trim()
                : "Theme not available";

            const dateElement = card.querySelector(".gWTYl");
            const dateText = dateElement ? dateElement.innerText.trim() : "Date not available";
            const dateMatch = dateText.match(/\d{2}\/\d{2}\/\d{2,4}/);
            const date = dateMatch ? dateMatch[0] : "Date not available";

            const modeElement = card.querySelector(".ifkmYk");
            const mode = modeElement ? modeElement.innerText.trim() : "Mode not available";

            const linkElement = card.querySelector(".kIgbEq a");
            const links = linkElement ? linkElement.href : "Link not available";

            const applyElement = card.querySelector(".gmACUu");
            const apply = applyElement ? applyElement.innerText.trim() : "No info";

            return { title, theme, date, mode, links, apply };
        });
    });
    await browser.close();

   
    data = data.map(event => {
        const dateMatch = event.date.match(/(\d{2})\/(\d{2})\/(\d{2,4})/);
        if (dateMatch) {
            const [_, day, month, year] = dateMatch; 
           
            const futureDateString = `${year.length === 2 ? '20' + year : year}-${month}-${day}`;
            const {  diffInDays } = calculateDateDifference(futureDateString);
            return { ...event, diffInDays };
        }
       
        return { ...event, diffInDays: null };
    });

    console.log(data);
    return data;
}

devFolioHackathon();