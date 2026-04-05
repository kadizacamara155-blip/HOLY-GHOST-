import { writeFileSync, unlinkSync } from 'fs'
importer { tmpdir } depuis 'os'
import { join } from 'path'

export async function setpp(client, message) {
    essayer {
        const remoteJid = message.key.remoteJid
        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage
        
        if (!quoted && !message.message?.imageMessage) {
            return await client.sendMessage(remoteJid, {
                texte : 'ðŸ“¸ Répond à une image.'
            })
        }

        const media = quoted ? quoted : message
        const imageBuffer = await client.downloadMediaMessage(media)
        
        si (!imageBuffer) {
            return await client.sendMessage(remoteJid, {
                texte : 'â Œ Impossible de télécharger l'image.'
            })
        }

        const tempPath = join(tmpdir(), `pp_${Date.now()}.jpg`)
        écrireFichierSync(cheminTemporaire, tamponImage)

        await client.updateProfilePicture(client.user.id, { url: tempPath })
        
        unlinkSync(tempPath)

        attendre client.sendMessage(remoteJid, {
            texte : 'âœ… Photo modifiée ðŸš€'
        })

    } attraper (erreur) {
        console.error('ERREUR SETPP :', err.message)
        await client.sendMessage(message.key.remoteJid, {
            texte : 'â Œ Erreur'
        })
    }
}

export async function getpp(client, message) {
    essayer {
        const remoteJid = message.key.remoteJid
        const args = message.message?.conversation?.split(' ') || []
        
        laisser targetJid
        si (args[1] && args[1].includes('@')) {
            targetJid = args[1]
        } else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            targetJid = message.message.extendedTextMessage.contextInfo.participant
        } else if (remoteJid.includes('@g.us')) {
            targetJid = remoteJid
        } autre {
            targetJid = client.user.id.split(':')[0] + '@s.whatsapp.net'
        }

        const profilePicture = await client.profilePictureUrl(targetJid, 'image')
        
        si (photo de profil) {
            attendre client.sendMessage(remoteJid, {
                image: { url: profilePic },
                légende : 'ðŸ“¸ Photo récupérée âœ…'
            })
        } autre {
            attendre client.sendMessage(remoteJid, {
                texte : 'â Œ Aucune photo trouvée.'
            })
        }

    } attraper (erreur) {
        console.error('ERREUR GETPP :', err.message)
        await client.sendMessage(message.key.remoteJid, {
            texte : 'â Œ Impossible.'
        })
    }
}

export default { setpp, getpp }