import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `*ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴛᴏ ʀᴇᴛʀɪᴇᴠᴇ ᴀᴜᴅɪᴏ ᴏʀ ᴠɪᴅᴇᴏ ғʀᴏᴍ ʏᴏᴜᴛᴜʙᴇ sᴇʀᴠᴇʀ.*

===========================
★ ᴜsᴀɢᴇ:
${usedPrefix + command} <name/url>

★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix + command} bolenath ji`
  let vid = (await youtubeSearch(text)).video[0]
  if (!vid) throw 'ᴀᴜᴅɪᴏ ᴏʀ ᴠɪᴅᴇᴏ ɴᴏᴛ ғᴏᴜɴᴅ﹗'
  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
  const url = 'https://www.youtube.com/watch?v=' + videoId
  await conn.sendHydrated(m.chat, `*–––––––『 YT PLAY 』–––––––*`, `
🔖 ᴛɪᴛʟᴇ: ${title}
📃 ᴅᴇsᴄʀɪᴩᴛɪᴏɴ: ${description}
📡 ᴩᴜʙʟɪsʜᴇᴅ: ${publishedTime}
⌛ ᴅᴜʀᴀᴛɪᴏɴ: ${durationH}
👀️ ᴠɪᴇᴡs: ${viewH}
`.trim(), thumbnail + '.png', url, '📺 ɢᴏ ᴛᴏ ʏᴏᴜᴛᴜʙᴇ﹗', null, null, [
['ᴀᴜᴅɪᴏ 🎧', `${usedPrefix}yta ${url} yes`],
['ᴠɪᴅᴇᴏ 🎥', `${usedPrefix}ytv ${url} yes`],
['ʏᴏᴜᴛᴜʙᴇ sᴇᴀʀᴄʜ 🔎', `${usedPrefix}yts ${url}`]
], m)
}
handler.help = ['play'].map(v => v + ' <name/url>')
handler.tags = ['YouTube']
handler.command = /^(play)$/i

handler.exp = 0
handler.limit = false

export default handler