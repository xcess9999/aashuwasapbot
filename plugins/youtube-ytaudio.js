import db from '../lib/database.js'
import fetch from 'node-fetch'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'

let limit = 2000
let handler = async (m, { conn, args, isPrems, isOwner, command, usedPrefix }) => {
  if (!args || !args[0]) throw `*ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴛᴏ ʀᴇᴛʀɪᴇᴠᴇ ᴀᴜᴅɪᴏ ғʀᴏᴍ ʏᴏᴜᴛᴜʙᴇ sᴇʀᴠᴇʀ.*

===========================
★ ᴜsᴀɢᴇ:
${usedPrefix + command} <url>

★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix + command} https://youtu.be/iHdYhdDg1Co`
  let chat = db.data.chats[m.chat]
  const isY = /y(es)/gi.test(args[1])
  const { thumbnail, audio: _audio, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
  const limitedSize = (isPrems || isOwner ? 2000 : limit) * 1024
  let audio, source, res, link, lastError, isLimit
  for (let i in _audio) {
    try {
      audio = _audio[i]
      if (isNaN(audio.fileSize)) continue
      isLimit = limitedSize < audio.fileSize
      if (isLimit) continue
      link = await audio.download()
      if (link) res = await fetch(link)
      isLimit = res?.headers.get('content-length') && parseInt(res.headers.get('content-length')) < limitedSize
      if (isLimit) continue
      if (res) source = await res.arrayBuffer()
      if (source instanceof ArrayBuffer) break
    } catch (e) {
      audio = link = source = null
      lastError = e
    }
  }
  if ((!(source instanceof ArrayBuffer) || !link || !res.ok) && !isLimit) throw `*ɪɴᴠᴀʟɪᴅ ᴜʀʟ ᴏʀ ʟɪɴᴋ﹗*

===========================
★ ᴜsᴀɢᴇ:
${usedPrefix + command} <url>

★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix + command} https://youtu.be/iHdYhdDg1Co`
  if (!isLimit) await conn.sendFile(m.chat, source, title + '.mp3', `
🔖 ᴛɪᴛʟᴇ: ${title}
📁 ғɪʟᴇ sɪᴢᴇ: ${audio.fileSizeH}
`.trim(), m, null, {
    asDocument: chat.useDocument
  })
}
handler.help = ['ytaudio'].map(v => v + ` <url>`)
handler.tags = ['YouTube']
handler.command = /^(yta|ytaudio|ytmp3|song|audio)$/i

handler.exp = 0

export default handler