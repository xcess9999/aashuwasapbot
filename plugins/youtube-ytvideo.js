import db from '../lib/database.js'
import fetch from 'node-fetch'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'

let limit = 80
let handler = async (m, { conn, args, usedPrefix, command, isPrems, isOwner }) => {
  if (!args || !args[0]) throw `*ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴛᴏ ʀᴇᴛʀɪᴇᴠᴇ ᴠɪᴅᴇᴏ ғʀᴏᴍ ʏᴏᴜᴛᴜʙᴇ sᴇʀᴠᴇʀ.*

===========================
★ ᴜsᴀɢᴇ:
${usedPrefix + command} <url>

★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix + command} https://youtu.be/iHdYhdDg1Co`
  let chat = db.data.chats[m.chat]
  const isY = /y(es)/gi.test(args[1])
  const { thumbnail, video: _video, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
  const limitedSize = (isPrems || isOwner ? 99 : limit) * 1024
  let video, source, res, link, lastError, isLimit
  for (let i in _video) {
    try {
      video = _video[i]
      isLimit = limitedSize < video.fileSize
      if (isLimit) continue
      link = await video.download()
      if (link) res = await fetch(link)
      isLimit = res?.headers.get('content-length') && parseInt(res.headers.get('content-length')) < limitedSize
      if (isLimit) continue
      if (res) source = await res.arrayBuffer()
      if (source instanceof ArrayBuffer) break
    } catch (e) {
      video = source = link = null
      lastError = e
    }
  }
  if ((!(source instanceof ArrayBuffer) || !link || !res.ok) && !isLimit) throw `*ɪɴᴠᴀʟɪᴅ ᴜʀʟ ᴏʀ ʟɪɴᴋ﹗*

===========================
★ ᴜsᴀɢᴇ:
${usedPrefix + command} <url>

★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix + command} https://youtu.be/iHdYhdDg1Co`
  let _thumb = {}
  try { _thumb = { thumbnail: await (await fetch(thumbnail)).buffer() } }
  catch (e) { }
  if (!isLimit) await conn.sendFile(m.chat, link, title + '.mp4', `
🔖 ᴛɪᴛʟᴇ: ${title}
📁 ғɪʟᴇ sɪᴢᴇ: ${video.fileSizeH}
`.trim(), m, false, {
    ..._thumb,
    asDocument: chat.useDocument
  })
}
handler.help = ['ytvideo'].map(v => v + ` <url>`)
handler.tags = ['YouTube']
handler.command = /^(ytv|ytvideo|ytmp4|video)$/i

handler.exp = 0


export default handler