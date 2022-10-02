import db from '../lib/database.js'
const cooldown = 300000
let handler = async (m, { conn, usedPrefix }) => {
    let user = db.data.users[m.sender]
    let timers = (cooldown - (new Date - user.lastadventure))
    if (user.health < 80) return conn.sendButton(m.chat, `*–––––『 LOW HEALTH 』–––––*`, `
ʏᴏᴜʀ ʜᴇᴀʟᴛʜ ɪs ʙᴇʟᴏᴡ *80*﹗ᴩʟᴇᴀsᴇ ʜᴇᴀʟ ❤ ғɪʀsᴛ ᴛᴏ ᴀᴅᴠᴇɴᴛᴜʀᴇ ᴀɢᴀɪɴ.

===========================
★ ᴛᴏ ʜᴇᴀʟ:
${usedPrefix}heal
`.trim(), `./media/lowhealth.jpg`, [
[`ʜᴇᴀʟ ❤`, `${usedPrefix}heal`]
], m, {asLocation: true})
    if (new Date - user.lastadventure <= cooldown) return conn.sendButton(m.chat, `*–––––『 COOLDOWN 』–––––*`, `
ʏᴏᴜ'ᴠᴇ ʀᴇᴄᴇɴᴛʟʏ *ᴀᴅᴠᴇɴᴛᴜʀᴇ*, ᴩʟᴇᴀsᴇ ᴡᴀɪᴛ ᴛɪʟʟ ᴄᴏᴏʟᴅᴏᴡɴ ғɪɴɪsʜ.

⏱️ ${timers.toTimeString()}

===========================
`.trim(), `./media/cooldown.jpg`, [
[`ᴏᴋ 👌`, `${usedPrefix}ok`]
], m, {asLocation: true})
    const rewards = reward(user)
    let text = 'ʏᴏᴜ\'ᴠᴇ ʙᴇᴇɴ ᴀᴅᴠᴇɴᴛᴜʀᴇ ᴀɴᴅ ᴅᴇᴄʀᴇᴀsᴇ'
    for (const lost in rewards.lost) if (user[lost]) {
        const total = rewards.lost[lost].getRandom()
        user[lost] -= total * 1
        if (total) text += `\n${global.rpg.emoticon(lost)}${lost}: -${total}`
    }
    text += '\n\n🔖 ᴀᴅᴠᴇɴᴛᴜʀᴇ ʀᴇᴡᴀʀᴅ ʀᴇᴄᴇɪᴠᴇᴅ :'
    for (const rewardItem in rewards.reward) if (rewardItem in user) {
        const total = rewards.reward[rewardItem].getRandom()
        user[rewardItem] += total * 1
        if (total) text += `\n⮕ ${global.rpg.emoticon(rewardItem)}${rewardItem}: ${total}`
    }
    text += '\n\n========================='
    conn.sendButton(m.chat, `*––––『 ADVENTURE 』––––*`, text.trim(), './media/adventure.jpg', [
[`ᴅᴀɪʟʏ`, `${usedPrefix}daily`],
[`ᴍᴏɴᴛʜʟʏ`, `${usedPrefix}monthly`]
], m, {asLocation: true})
    user.lastadventure = new Date * 1
}
handler.help = ['adventure']
handler.tags = ['User']
handler.command = /^(adventure|adv)$/i

handler.cooldown = cooldown
handler.disabled = false

export default handler

function reward(user = {}) {
    let rewards = {
        reward: {
            money: 201,
            exp: 301,
            trash: 101,
            potion: 2,
            rock: 2,
            wood: 2,
            string: 2,
            common: 2 * (user.dog && (user.dog > 2 ? 2 : user.dog) * 1.2 || 1),
            uncommon: [0, 0, 0, 1, 0].concat(
                new Array(5 - (
                    (user.dog > 2 && user.dog < 6 && user.dog) || (user.dog > 5 && 5) || 2
                )).fill(0)
            ),
            mythic: [0, 0, 0, 0, 0, 1, 0, 0, 0].concat(
                new Array(8 - (
                    (user.dog > 5 && user.dog < 8 && user.dog) || (user.dog > 7 && 8) || 3
                )).fill(0)
            ),
            legendary: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0].concat(
                new Array(10 - (
                    (user.dog > 8 && user.dog) || 4
                )).fill(0)
            ),
            iron: [0, 0, 0, 1, 0, 0],
            gold: [0, 0, 0, 0, 0, 1, 0],
            diamond: [0, 0, 0, 0, 0, 0, 1, 0].concat(
                new Array(5 - (
                    (user.fox < 6 && user.fox) || (user.fox > 5 && 5) || 0
                )).fill(0)
            ),
        },
        lost: {
            health: 101 - user.cat * 4,
            armordurability: (15 - user.armor) * 7
        }
    }
    return rewards
}