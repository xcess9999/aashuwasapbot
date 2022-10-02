import db from '../lib/database.js'
import { xpRange } from '../lib/levelling.js'
import { plugins } from '../lib/plugins.js'
let handler = async (m, { conn, usedPrefix, text, command }) => {
    let name = await conn.getName(m.sender)
    let { exp, limit, level, role } = db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let help = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    //conn.sendButton(m.chat, `*––––––『 PROFILE 』––––––*`, `
//🧑🏻‍🏫 ɴᴀᴍᴇ: *${name}*
//🎳 ʟɪᴍɪᴛ: *${limit}*
//🎗️ ʀᴏʟᴇ: *${role}*
//🎖️ ʟᴇᴠᴇʟ: *${level}* ﹙${exp - min} / ${xp}﹚
//☕ ᴛᴏᴛᴀʟ xᴩ: *${exp}*
//〽️ ᴩʀᴇғɪx: *${usedPrefix}*

//===========================
//★ ʟᴇᴠᴇʟ ᴜᴩ:
//${usedPrefix}levelup
//`.trim(), `./media/profile.jpg`, [
//[`ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅ`, `${usedPrefix}leaderboard`],
//[`ɪɴᴠᴇɴᴛᴏʀʏ`, `${usedPrefix}inventory`]
//], m, {asLocation: true})
}

//handler.help = ['profile']
//handler.tags = ['User']
//handler.command = /^(profile|pf|upf|userpf|userprofile|up)$/i

export default handler