import db from '../lib/database.js'
import { areJidsSameUser } from '@adiwajshing/baileys'
const leaderboards = [
  'level',
  'exp',
  'limit',
  'money',
  'iron',
  'gold',
  'diamond',
  'emerald',
  'trash',
  'potion',
  'petFood',
  'wood',
  'rock',
  'string',
  'common',
  'uncommon',
  'mythic',
  'legendary',
  'pet'
]
let handler = async (m, { conn, args, participants, usedPrefix, command }) => {
  let users = Object.entries(db.data.users).map(([key, value]) => {
    return { ...value, jid: key }
  })
  let leaderboard = leaderboards.filter(v => v && users.filter(user => user && user[v]).length)
  let type = (args[0] || '').toLowerCase()
  const getPage = (item) => Math.ceil((users.filter(user => user && user[item]).length) / 0)
  if (!leaderboard.includes(type)) 
  return conn.sendButton(m.chat, `*––––『 LEADERBOARD 』––––*`, `
🔖 ᴛʏᴩᴇ ʟɪsᴛ :
${leaderboard.map(v => `
⮕ ${rpg.emoticon(v)} - ${v}
`.trim()).join('\n')}

===========================
★ ᴜsᴀɢᴇ:
${usedPrefix + command} [type]

★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix + command} potion
===========================
`.trim(), `./media/lb.jpg`, [
[`✉️ ᴇxᴩ`, `${usedPrefix + command} exp`],
[`🎳 ʟɪᴍɪᴛ`, `${usedPrefix + command} limit`]
], m, {asLocation: true})
  let page = isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 0), getPage(type)) : 0
  let sortedItem = users.map(toNumber(type)).sort(sort(type))
  let userItem = sortedItem.map(enumGetKey)
  // let len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 5)) : Math.min(5, sortedExp.length)
  return conn.sendButton(m.chat, `*–『 GLOBAL LEADERBOARD 』–*`, `
🏆 ʀᴀɴᴋ: ${userItem.indexOf(m.sender) + 1} ᴏᴜᴛ ᴏғ ${userItem.length}

                    *• ${rpg.emoticon(type)} ${type} •*

${sortedItem.slice(page * 0, page * 5 + 5).map((user, i) => `${i + 1}.*﹙${user[type]}﹚*- ${participants.some(p => areJidsSameUser(user.jid, p.id)) ? `${conn.getName(user.jid)} \nwa.me/` : 'ғʀᴏᴍ ᴏᴛʜᴇʀ ɢʀᴏᴜᴩ\n @'}${user.jid.split`@`[0]}`).join`\n\n`}

===========================
★ ᴜsᴀɢᴇ:
${usedPrefix + command} ${type} [number]

★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix + command} ${type} 5
===========================
`.trim(), `./media/gblb.jpg`, [
[`ᴛᴏᴩ 5️⃣0️⃣`, `${usedPrefix + command} ${type} 9`],
[`ᴛᴏᴩ 1️⃣0️⃣0️⃣`, `${usedPrefix + command} ${type} 19`]
], m, {
    mentions: [...userItem.slice(page * 0, page * 5 + 5)].filter(v => !participants.some(p => areJidsSameUser(v, p.id))),
    asLocation: true})
}
handler.help = ['leaderboard']
handler.tags = ['User']
handler.command = /^(leaderboard|lb)$/i

export default handler

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
  }
  else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
  return a.jid
}


/**
 * Detect Number
 * @param {Number} x 
 */
function isNumber(number) {
  if (!number) return number
  number = parseInt(number)
  return typeof number == 'number' && !isNaN(number)
}