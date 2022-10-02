import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) throw `*ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴛᴏ ʀᴇᴛʀɪᴇᴠᴇ ᴀᴜᴅɪᴏ ᴏʀ ᴠɪᴅᴇᴏ sᴇᴀʀᴄʜ ʀᴇsᴜʟᴛ ғʀᴏᴍ ʏᴏᴜᴛᴜʙᴇ sᴇʀᴠᴇʀ.*

===========================
★ ᴜsᴀɢᴇ:
${usedPrefix + command} <name>

★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix + command} bolenath ji`
  const { video, channel } = await youtubeSearch(text)
  const listSections = []
  let teks = [...video, ...channel].map(v => {
    switch (v.type) {
      case 'video': {
        listSections.push([`${v.title}`, [
          ['Video 🎥', `${usedPrefix}ytv ${v.url} yes`, `download ${v.title} (${v.url})`],
          ['Audio 🎧', `${usedPrefix}yta ${v.url} yes`, `download ${v.title} (${v.url})`]
        ]])
        return `
🔖 ᴛɪᴛʟᴇ: *${v.title}*
🔗 ᴜʀʟ: ${v.url}
⌛ ᴅᴜʀᴀᴛɪᴏɴ: ${v.durationH}
📡 ᴩᴜʙʟɪsʜᴇᴅ: ${v.publishedTime}
👀️ ᴠɪᴇᴡs: ${v.view}
      `.trim()
      }
      case 'channel': return `
📌 *${v.channelName}* (${v.url})
🧑‍🤝‍🧑 _${v.subscriberH} (${v.subscriber}) Subscriber_
🎥 ${v.videoCount} video
`.trim()
    }
  }).filter(v => v).join('\n\n==========================\n\n')
  conn.sendButton(m.chat, `*––––『 YT SEARCH 』––––*`, teks, `./media/ytsearch.jpg`, [
      [`ᴏᴋ 👌`, `${usedPrefix}ok`]
      ], m, {asLocation: true})
}
handler.help = ['ytsearch'].map(v => v + ' <name>')
handler.tags = ['YouTube']
handler.command = /^(yts|ytsearch)$/i

export default handler