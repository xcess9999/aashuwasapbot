import { addExif } from '../lib/sticker.js'


let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!m.quoted) throw `ᴛᴀɢ ᴀ sᴛɪᴄᴋᴇʀ ᴡɪᴛʜ ᴄᴏᴍᴍᴀɴᴅ *_"${usedPrefix + command}"_*`
  let stiker = false
  try {
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) throw 'ʀᴇᴩʟʏ sᴛɪᴄᴋᴇʀ﹗'
    let img = await m.quoted.download()
    if (!img) throw `ʀᴇᴩʟʏ ᴀ sᴛɪᴄᴋᴇʀ﹗`
    stiker = await addExif(img, packname || '', author || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m, false, { asSticker: true })
    else throw `ᴛᴀɢ ᴀ sᴛɪᴄᴋᴇʀ ᴡɪᴛʜ ᴄᴏᴍᴍᴀɴᴅ *_"${usedPrefix + command}"_*`
  }
}
handler.help = ['watermark <packname>|<author>']
handler.tags = ['Sticker']
handler.command = /^(wm|watermark)$/i

export default handler