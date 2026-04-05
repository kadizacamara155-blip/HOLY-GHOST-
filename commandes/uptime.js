export async function uptime(client, message) {
    const remoteJid = message.key.remoteJid
    const uptime = process.uptime()
    
    const jours = Math.floor(uptime / 86400)
    const heures = Math.floor((temps de fonctionnement % 86400) / 3600)
    const minutes = Math.floor((uptime % 3600) / 60)
    const secondes = Math.floor(uptime % 60)
    
    const text = `HOLY GHOST – ÉQUIPE NUMÉRIQUE 224 â”€â”
un",
→ → Durée de fonctionnement : ${days}j ${hours}h ${minutes}m
→ RAM : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)} Mo
un",
— « Au-delà des limites, nous nous élevons. »
— - DC243 -
â""â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"˜`
    
    await client.sendMessage(remoteJid, { text: text })
}

export default uptime