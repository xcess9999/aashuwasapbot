# Frequently Asked Questions

### Q: How to Customise Message Display?

**Text, Image, Buttons**
```js
// Syntax
conn.sendButton(
      jid, // jid of the user to send the message to
      header, // text to send
      foooter, // footer to send
      buffer, // buffer to send (optional), if you want to send button image, location, etc
      buttons, // buttons to send, example [['text1', 'id1'], ['text2', 'id2']]
      quoted, // quoted message to send (optional)
      options // options to send, example { asLocation: true }
)
```
```js
// Code Format
conn.sendButton(jid, '<header>', '<footer>', '<buffer>',
[
['<BUTTON-1>', 'button-1'],
['<BUTTON-2>', '<button-2>'],
['<BUTTON-3>', '<button-3>']
], <options>
)
```
```js
// Example With Location Image
conn.sendButton(m.chat, 'Hello World!', 'By Valor_Bot', 'valor.jpg',
[
['Hello', 'hello'],
['Hi', 'hi'],
['Bye', 'bye']
], m, { asLocation: true })
```

**Text, Image, URL, Call, Buttons**
```js
// Syntax
conn.sendHydrated(
      jid, // jid of the user to send the message to
      header, // text to send
      foooter, // footer to send
      buffer, // buffer to send (optional), if you want to send button image, location, etc
      url-link, // url link as a button to send
      url-name, // display name of url link as a button to send
      contact-number, // contact number as a button to send
      contact-name, // display name of contact number as a button to send
      buttons, // buttons to send, example [['text1', 'id1'], ['text2', 'id2']]
      quoted, // quoted message to send (optional)
      options // options to send, example { asLocation: true }
)
```
```js
// Code Format
conn.sendHydrated(jid, '<header>', '<footer>', '<buffer>', '<url-link>', '<url-name>', '<contact-number>', '<contact-name>',
[
['<BUTTON-1>', 'button-1'],
['<BUTTON-2>', '<button-2>'],
['<BUTTON-3>', '<button-3>']
], <options>)
```
```js
// Example
conn.sendHydrated(m.chat, 'Hello World!', '@Valor_Bot', 'https://raw.githubusercontent.com/DineshValor/valor/bot/docs/images/upi-qrcode.jpg', 'https://github.com/DineshValor/', 'GitHub', '+919971107409', 'Call',
[
['Hello', 'hello'],
['Bye', 'bye']
], m)
```
Tip: Want to use `conn.sendHydrated` without url/call button, just replace with `null`.
```js
// Code Format
conn.sendHydrated(jid, '<header>', '<footer>', '<buffer>', null, null, null, null,
[
['<BUTTON-1>', 'button-1'],
['<BUTTON-2>', '<button-2>'],
['<BUTTON-3>', '<button-3>']
], <options>)
```
```js
// Example
conn.sendHydrated(m.chat, 'Hello World!', '@Valor_Bot', 'https://raw.githubusercontent.com/DineshValor/valor/bot/docs/images/upi-qrcode.jpg', null, null, null, null,
[
['Hello', 'hello'],
['Bye', 'bye']
], m)
```
