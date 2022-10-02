let handler = async (m, { conn, usedPrefix, command }) => {
conn.sendButton(m.chat, `*––––『 TRAINER LIST 』––––*`, `
⮕ *Delhi & NCR*

Enter Trainer Code Here:
https://bit.ly/Pokemon_Go_Trainer_Code_Delhi_NCR_Form

View Trainer List Here: (Access Required)
https://bit.ly/Pokemon_Go_Trainer_Code_Delhi_NCR_List

*_FAQ:_*
*Q.* _Why restriction necessary?_
*=>* _To secure our data from unauthorised access and prevent from misuse. It's also help to keep data in safe hand._

===========================
⮕ *PoGo Raids*

Enter Trainer Code Here:
https://docs.google.com/forms/d/e/1FAIpQLSe4aGmYNM1BViWoicKwVPK2ynpbpm1hhMs3aVNAvqnDO6m12A/viewform

View Trainer List Here:
https://docs.google.com/spreadsheets/u/0/d/1iUP6iBhY7GGEFBJE0w59UYuszFkqHOxusLARCtxPVq0/htmlview

Telegram Group:
https://t.me/joinchat/eQh39KlXrP1lMzk1

===========================
⮕ *Kanpur, UP*

Enter Trainer Code Here:
https://tinyurl.com/PoGoKanpurForm

View Trainer List Here:
https://tinyurl.com/PoGoKanpurCodes

WhatsApp Group:
https://chat.whatsapp.com/K6xVvUykwZTHGOyNQgN3Ws

===========================
`.trim(), `./media/trainerlist.jpg`, [
[`ᴏᴋ 👌`, `${usedPrefix}ok`]
], m, {asLocation: true})
}
handler.help = ['trainerlist']
handler.tags = ['Pokémon Go']
handler.command = /^(trainerlist|tl|trainercode|tc)$/i

export default handler