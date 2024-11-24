const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID ||eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0J3d0pKRzF4Rm8wM1lTSGpHTW9meTNOTFloTXk2dkpGT0twZ2FhdUYxTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUIvT1ZWRE9DM1RsMnFhQUJqU2FIV0tiRkc4NFp0bWdGQ1JVa3A5bmR5ND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwQU5BbE0zV1plS1ZuamthbzBXUW9RTTJZeFBEaDFxaGs3NjU1alNoTW1VPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0a1VQSitFODlucC81M3Uxb015dndWOFo3UTY3aVU2d3YrRkRldndXcVhzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdKTE0vVXUzZnhkT2U2cy93dmlvT09RNk5INmR6VnRzMUhYMGhvQWp0MUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJzckt5Z0xodi94ZnZ6ZVlFVStYYTM2NE53dlVkMVY1RzZtZU5JV0k0RG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidVBnbC93aGs1MTkwbVhXTzd6bE1iZUtUWnZVT3BnR0IxL1dVTDcyOVMyYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYjhhWFZXVUxqT0xMT3VsaWdiSTZvS1lQT3NqMFBTOVUzdmpxR2dqZzlUOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVBSlRoK2pnRDRvSnpaMUJ5WXNSVW5oVm4wa2taem9VRjZiOTBKQ1ljTDBYTmpoRUlJVFlBYmpTWVFsUkZ4ZjdOZm9SNzhKQmJ4TXE1UUFTVjVPaENBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA0LCJhZHZTZWNyZXRLZXkiOiJQazNUSkdxSWlMWmtZKzM0WnhyVFlzYkYxQjB0Zm1tSndUaENEVFhIUmxJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJqZEdwcHNoRFJaU2RDWlJBVWZxamdRIiwicGhvbmVJZCI6IjA3ZDZiMjk4LTRmMzItNDMxZS1iZTkzLTU2Y2EzMzU1MTQ4YiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkdUpvUXI5RDA5Wk5jcWo3Snk0eVJtVUN1VGM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHdWdkFpanlaU3Q3YWFSZWxWcFdsMmZoVm9NPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ilk5TkRXRzlUIiwibWUiOnsiaWQiOiI1MDkzNDQwMzE1MjoyMEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT0dXMTVZQkVKQ0lqcm9HR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMFVyd1J1bXZwSHBaRUJOb1FObzZTNkFTN0IyZ3NTZVV3TCtMVjhic3JVUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZU4xYk1WZWNzcmdpRjZCZkw0LzA3emFWNk5rQ09lOGNBU1Q1WklBWm13dTY1MFR5ckhEaFBwVndTK3NvdWZzY1ZITjlVU2d3a3FZK1J6OHZhZVljQnc9PSIsImRldmljZVNpZ25hdHVyZSI6IkRFUnlCSmVGOHJNZVIvRzF1L0EyNUFxSjI1bnR2SHBlNlY5STgvTmxPcUorYWljTWNYLzNraE5yVmFNc1ZITjZlOFJUYlo4SVRxYWY5cTdLOStOREF3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTA5MzQ0MDMxNTI6MjBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZEZLOEVicHI2UjZXUkFUYUVEYU9rdWdFdXdkb0xFbmxNQy9pMWZHN0sxRSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMjQ3Nzk4MSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFESDQifQ== '',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "*☆꧁༒☬  𝐂𝚪𝐔𝐒𝚮 𝐊𝚫𝐋𝚫𝐒𝚮𝐘☬༒꧂☆⁩",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 50934403152",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
