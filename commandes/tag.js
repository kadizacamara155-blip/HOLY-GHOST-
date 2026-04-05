import { createWriteStream } from 'fs'
import { downloadMediaMessage } from "baileys"
importer configmanager depuis '../utils/configmanager.js'

export async function tagall(client, message) {
    const remoteJid = message.key.remoteJid
    si (!remoteJid.includes('@g.us')) retourner

    essayer {
        const groupMetadata = await client.groupMetadata(remoteJid)
        const participants = groupMetadata.participants.map(user => user.id)
        const text = participants.map(user => `@${user.split('@')[0]}`).join(' \n')

        attendre client.sendMessage(remoteJid, {
            texte : `â•â"€âŒˆ ðŸš€ Diffusion numérique de l'équipe âŒ‹\nâ"‚\n${text}\nâ"‚\nâ•°â"€âŒŠ Alimenté par DC243 âŒ‰`,
            mentions : participants
        })

    } attraper (erreur) {
        console.error("Erreur Tagall :", erreur)
    }
}

export async function tagadmin(client, message) {
    const remoteJid = message.key.remoteJid
    const botNumber = client.user.id.split(':')[0] + '@s.whatsapp.net'
    si (!remoteJid.includes('@g.us')) retourner

    essayer {
        const { participants } = await client.groupMetadata(remoteJid)
        const admins = participants.filter(p => p.admin && p.id !== botNumber).map(p => p.id)
        
        si (admins.length === 0) retourner

        const text = `â•â”€âŒˆ ðŸ›¡ï¸ Alerte Équipe Numérique âŒ‹\nâ”‚ Alerte Admin\nâ”‚\n${admins.map(user => `@${user.split('@')[0]}`).join('\n')}\nâ”‚\nâ•°â”€âŒŠ Contrôle DC243 âŒ‰`

        await client.sendMessage(remoteJid, { text, mentions: admins })

    } attraper (erreur) {
        console.error("Erreur Tagadmin :", erreur)
    }
}

export async function respond(client, message) {
    const nombre = client.user.id.split(':')[0]
    const remoteJid = message.key.remoteJid
    const messageBody = message.message?.extendedTextMessage?.text || message.message?.conversation || ''
    si (!configmanager.config.users[number]) retourner

    const tagRespond = configmanager.config.users[number].response
    si ((!message.key.fromMe) && tagRespond) {
        const lid = client.user?.lid.split(':')[0]
        si (messageBody.includes(`@${lid}`)) {
            attendre client.sendMessage(remoteJid, {
                audio: { url: "database/DigiX.mp3" },
                type mime : "audio/mp4",
                ptt : vrai,
                contextInfo: {
                    stanzaId: message.key.id,
                    participant : message.key.participant || lid,
                    Message cité : message.message
                }
            })
        }
    }
}

export async function tag(client, message) {
    const remoteJid = message.key.remoteJid
    si (!remoteJid.includes('@g.us')) retourner

    essayer {
        const groupMetadata = await client.groupMetadata(remoteJid)
        const participants = groupMetadata.participants.map(user => user.id)
        const messageBody = message.message?.conversation || message.message?.extendedTextMessage?.text || ""
        const commandAndArgs = messageBody.slice(1).trim()
        const parts = commandAndArgs.split(/\s+/)
        const text = parts.slice(1).join(' ') || 'Alerte équipage numérique'

        const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage
        si (message cité) {
            si (quotedMessage.stickerMessage) {
                attendre client.sendMessage(remoteJid, {
                    autocollant : quotedMessage.stickerMessage,
                    mentions : participants
                })
                retour
            }
            const quotedText = quotedMessage.conversation || quotedMessage.extendedTextMessage?.text || ""
            attendre client.sendMessage(remoteJid, {
                texte : `${quotedText}`,
                mentions : participants
            })
            retour
        }

        attendre client.sendMessage(remoteJid, {
            texte : `${texte}`,
            mentions : participants
        })

    } attraper (erreur) {
        console.error("Erreur de balise :", erreur)
    }
}

exporter par défaut { tagall, tagadmin, répondre, tag }