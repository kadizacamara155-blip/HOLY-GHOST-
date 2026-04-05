import stylizedChar from "../utils/fancy.js"

export async function pingTest(client, message) {
    const remoteJid = message.key.remoteJid
    const start = Date.now()

    await client.sendMessage(remoteJid, { text: "ðŸ“¡ Pinging..." }, { quoted: message })

    const latency = Date.now() - début

    attendre client.sendMessage(remoteJid, {
        texte : stylizedChar(
            `ðŸš€ Réseau d'équipage numérique\n\n` +
            `Latence : ${latency} ms\n\n` +
            `Équipe numérique 243`
        )
    }, { citation : message })
}