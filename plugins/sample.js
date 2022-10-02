let handler = async (m, { conn, usedPrefix, command }) => {
    const header = `*––––––『 HEADER 』––––––*`
    const footer = `
FOOTER
`
    const buffer = './media/sample.jpg'
    const button = [
[`ᴏᴋ 👌`, `${usedPrefix}ok`]
]
conn.sendHydrated(m.chat, header, footer.trim(), buffer, 'dineshvalor.github.io', 'Valor_Bot', null, null, button, m, {asLocation: true})
}
handler.help = ['']
handler.tags = ['']
handler.command = /^()$/i

export default handler