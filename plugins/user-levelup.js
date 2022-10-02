import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'
import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix }) => {
    let user = db.data.users[m.sender]
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        throw `
ᴩʟᴇᴀsᴇ ɢᴀɪɴ ʀᴇǫᴜɪʀᴇᴅ ᴀᴍᴏᴜɴᴛ ᴏғ xᴩ ᴛᴏ ʟᴇᴠᴇʟ ᴜᴩ.
ᴄᴜʀʀᴇɴᴛ ʟᴇᴠᴇʟ:  *${user.level}* ﹙${user.exp - min} / ${xp}﹚
ʀᴇǫᴜɪʀᴇᴅ xᴩ:  *${max - user.exp}*
`.trim()
    }
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
        user.role = global.rpg.role(user.level).name
        let teks = `
ᴄᴏɴɢʀᴀᴛᴜʟᴀᴛɪᴏɴs 🥳, *${conn.getName(m.sender)}* ʀᴇᴀᴄʜᴇᴅ ɴᴇxᴛ ʟᴇᴠᴇʟ.`
        let str = `
${teks} 

• 🎖 ᴩʀᴇᴠɪᴏᴜs ʟᴇᴠᴇʟ: ${before}
• 🎖 ɴᴇᴡ ʟᴇᴠᴇʟ: ${user.level}
• 🎗️ ʀᴏʟᴇ: ${user.role}
• 📅 ᴅᴀᴛᴇ: ${new Date().toLocaleString('en-IN')}

ᴛɪᴩ: ᴍᴏʀᴇ ᴏғᴛᴇɴ ʏᴏᴜ ɪɴᴛᴇʀᴀᴄᴛ ᴡɪᴛʜ ʙᴏᴛ, ʜɪɢʜᴇʀ ʏᴏᴜʀ ʟᴇᴠᴇʟ.

===========================
`.trim()
        try {
            const img = await levelup(teks, user.level)
            
            conn.sendButton(m.chat, `*–––––『 Level UP 』–––––*`, str, './media/levelup.jpg', [
[`ᴏᴋ 👌`, `${usedPrefix}ok`]
], m, {asLocation: true})
        } catch (e) {
            m.reply(str)
        }
    }
}

handler.help = ['levelup']
handler.tags = ['User']

handler.command = /^level(|up)$/i

export default handler