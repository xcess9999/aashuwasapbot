import db from '../lib/database.js'
const rewards = {
    exp: 50000,
    money: 49999,
    potion: 10,
    mythic: 3,
    legendary: 1
}

const cooldown = 2592000000
let handler = async (m, { conn, usedPrefix }) => {
    let user = db.data.users[m.sender]
    if (new Date - user.lastmonthly < cooldown) return conn.sendButton(m.chat, 
'*–––––『 COOLDOWN 』–––––*', `
ʏᴏᴜ'ᴠᴇ ᴀʟʀᴇᴀᴅʏ ᴄʟᴀɪᴍᴇᴅ ᴍᴏɴᴛʜʟʏ ʀᴇᴡᴀʀᴅs﹗ᴩʟᴇᴀsᴇ ᴡᴀɪᴛ ᴛɪʟʟ ᴄᴏᴏʟᴅᴏᴡɴ ғɪɴɪsʜ.

*⏱️ ${((user.lastmonthly + cooldown) - new Date()).toTimeString()}*

===========================
`.trim(), `./media/cooldown.jpg`, [
[`ᴏᴋ 👌`, `${usedPrefix}ok`]
], m, {asLocation: true})
    let text = ''
    for (let reward of Object.keys(rewards)) if (reward in user) {
        user[reward] += rewards[reward]
        text += `⮕ ${rpg.emoticon(reward)} ${reward}: ${rewards[reward]}\n`
    }
    conn.sendButton(m.chat,
`*––––––『 MONTHLY 』––––––*`, `
🔖 ᴍᴏɴᴛʜʟʏ ʀᴇᴡᴀʀᴅ ʀᴇᴄᴇɪᴠᴇᴅ :
${text}
===========================
`.trim(), `./media/monthly.jpg`, [
[`ᴏᴋ 👌`, `${usedPrefix}ok`]
], m, {asLocation: true})
    user.lastmonthly = new Date * 1
}
handler.help = ['monthlyreward']
handler.tags = ['User']
handler.command = /^(monthly|mr|mrewar(d|ds)|monthlyrewar(d|ds)|monthlyclaim|mc|mclaim)$/i

handler.cooldown = cooldown

export default handler

