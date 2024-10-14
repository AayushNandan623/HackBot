// devFolioDate.js
export default function calculateDateDifference(futureDateString) {
    const currentDate = new Date();
    const futureDate = new Date(futureDateString); // Assume the date is in yyyy/mm/dd format

    const diffInMs = futureDate.getTime() - currentDate.getTime();
    const msInADay = 1000 * 60 * 60 * 24;
    const diffInDays = Math.round(diffInMs / msInADay);

    // Function to format date as yyyy/mm/dd
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    }

    return {
        currentDateFormatted: formatDate(currentDate),
        futureDateFormatted: formatDate(futureDate),
        diffInDays
    };
}