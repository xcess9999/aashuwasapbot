let handler = async (m, { conn, usedPrefix, command }) => {
conn.sendHydrated(m.chat, `*––––––『 DONATE 』––––––*`, `
🇮🇳 ₹ ᴅᴏᴍᴇsᴛɪᴄ sᴜᴩᴩᴏʀᴛ:
★ ᴜᴩɪ – dineshvalor@apl
sᴄᴀɴ ǫʀ ᴄᴏᴅᴇ ﹠ ᴅᴏɴᴀᴛᴇ ᴠɪᴀ
ᴩᴀʏᴛᴍ, ᴀᴍᴀᴢᴏɴ ᴩᴀʏ , ʙʜɪᴍ, ғʀᴇᴇᴄʜᴀʀɢᴇ, ɢᴩᴀʏ ﹙ɢᴏᴏɢʟᴇ-ᴩᴀʏ﹚, ᴍᴏʙɪᴋᴡɪᴋ, ᴍʏᴊɪᴏ, ᴩʜᴏɴᴇᴩᴇ, ᴇᴛᴄ.

🌏 $ ɢʟᴏʙᴀʟ sᴜᴩᴩᴏʀᴛ:
★ PᴀʏPᴀʟ
ᴄʟɪᴄᴋ ᴏɴ ᴩᴀʏᴩᴀʟ ʟɪɴᴋ ᴛᴏ ᴍᴀᴋᴇ ɪɴᴛᴇʀɴᴀᴛɪᴏɴᴀʟ ᴛʀᴀɴsᴀᴄᴛɪᴏɴ.

===========================
`.trim(), `./media/donate.jpg`, 'https://www.paypal.me/DineshValor', 'PᴀʏPᴀʟ', null, null, [
[`ᴏᴋ 👌`, `${usedPrefix}ok`]
], m, {asLocation: true})
}
handler.help = ['donate']
handler.tags = ['Bot']
handler.command = /^dona(te|si)$/i

export default handler
