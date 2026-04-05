                console.log('â Œ Échec de la suppression :', deleteError.message)
            }
        }
        
        const platforms = []
        if (/tiktok\.com/i.test(messageText)) platforms.push('TikTok')
        if (/instagram\.com/i.test(messageText)) platforms.push('Instagram')
        if (/facebook\.com/i.test(messageText)) platforms.push('Facebook')
        if (/whatsapp\.com/i.test(messageText)) platforms.push('WhatsApp')
        if (/t\.me|telegram/i.test(messageText)) platforms.push('Telegram')
        if (/discord/i.test(messageText)) platforms.push('Discord')
        if (/youtube\.com|youtu\.be/i.test(messageText)) platforms.push('YouTube')
        si (platforms.length === 0) platforms.push('Site Web')
        
        si (setting.action === 'avertissement') {
            const warnKey = `${groupId}_${senderId}`
            warnStorage[warnKey] = (warnStorage[warnKey] || 0) + 1
            const avertit = warnStorage[warnKey]
            
            attendre client.sendMessage(groupId, {
                texte : `ðŸš« *Lien ${platforms.join('/')}*\nAvertissement ${warns}/3\n@${senderId.split('@')[0]}`,
                mentions : [senderId]
            })
            
            si (avertissements >= 3) {
                attendre client.groupParticipantsUpdate(groupId, [senderId], 'remove')
                attendre client.sendMessage(groupId, {
                    text: `âš¡ *Expulsé*\n@${senderId.split('@')[0]}\n3 avertit atteint`
                })
                supprimer warnStorage[warnKey]
            }
            
        } else if (setting.action === 'kick') {
            attendre client.groupParticipantsUpdate(groupId, [senderId], 'remove')
            attendre client.sendMessage(groupId, {
                texte : `âš¡ *Expulsé*\n@${senderId.split('@')[0]}\nRaison : Lien ${platforms.join('/')}`,
                mentions : [senderId]
            })
            
        } else if (setting.action === 'delete') {
            attendre client.sendMessage(groupId, {
                texte: `ðŸš« *Lien supprimé*\n@${senderId.split('@')[0]} - ${platforms.join('/')}`,
                mentions : [senderId]
            })
        }
        
    } attraper (erreur) {
        console.error('Erreur de détection de lien :', error.message)
    }
}

export async function resetwarns(client, message) {
    const groupId = message.key.remoteJid
    const text = message.message?.conversation || message.message?.extendedTextMessage?.text || ''
    const args = text.split(/\s+/).slice(1)
    
    cibler
    si (message.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
        cible = message.message.extendedTextMessage.contextInfo.participant
    } sinon si (args[0]) {
        cible = args[0].replace('@', '') + '@s.whatsapp.net'
    } autre {
        const warnKeys = Object.keys(warnStorage).filter(key => key.startsWith(groupId + '_'))
        const count = warnKeys.length
        
        return await client.sendMessage(groupId, {
            texte : `ðŸ“Š *Avertissements :* ${count} utilisateur(s)\n\nUtilisation : .resetwarns @user`
        })
    }
    
    const warnKey = `${groupId}_${target}`
    si (warnStorage[warnKey]) {
        supprimer warnStorage[warnKey]
        attendre client.sendMessage(groupId, {
            text: `âœ… Avertit les réinitialisations pour @${target.split('@')[0]}`
        })
    } autre {
        attendre client.sendMessage(groupId, {
            text: `â„¹ï¸ Aucun warn pour @${target.split('@')[0]}`
        })
    }
}

export async function checkwarns(client, message) {
    const groupId = message.key.remoteJid
    const warnKeys = Object.keys(warnStorage).filter(key => key.startsWith(groupId + '_'))
    
    si (warnKeys.length === 0) {
        return await client.sendMessage(groupId, {
            texte : 'âœ… Aucun warn dans ce groupe.'
        })
    }
    
    let report = 'ðŸ“Š *Liste des Warns*\n\n'
    
    pour (const clé de warnKeys) {
        const userId = key.split('_')[1]
        const warnCount = warnStorage[clé]
        rapport += `@${userId.split('@')[0]} : ${warnCount}/3 avertissements\n`
    }
    
    attendre client.sendMessage(groupId, { text: rapport })
}

export async function kick(client, message) {
    const groupId = message.key.remoteJid
    si (!groupId.includes('@g.us')) retourner
    
    essayer {
        const text = message.message?.extendedTextMessage?.text || message.message?.conversation || ''
        const args = text.split(/\s+/).slice(1)
        cibler
        
        si (message.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
            cible = message.message.extendedTextMessage.contextInfo.participant
        } sinon si (args[0]) {
            cible = args[0].replace('@', '') + '@s.whatsapp.net'
        } autre {
            return wait client.sendMessage(groupId, { text: 'â Œ Répond à un message ou mentionné.' })
        }
        
        attendre client.groupParticipantsUpdate(groupId, [target], 'remove')
        await client.sendMessage(groupId, { text: `ðŸš« @${target.split('@')[0]} exclu.` })
    } attraper (erreur) {
        await client.sendMessage(groupId, { text: 'â Œ Erreur' })
    }
}

export async function kickall(client, message) {
    const groupId = message.key.remoteJid
    si (!groupId.includes('@g.us')) retourner
    
    essayer {
        const metadata = await client.groupMetadata(groupId)
        const targets = metadata.participants.filter(p => !p.admin).map(p => p.id)
        
        await client.sendMessage(groupId, { text: 'âš¡ Digital Crew - Purge...' })
        
        pour (const cible de cibles) {
            essayer {
                attendre client.groupParticipantsUpdate(groupId, [target], 'remove')
            } attraper {}
        }
        
        await client.sendMessage(groupId, { text: 'âœ… Purge terminÃ©e.' })
    } attraper (erreur) {
        await client.sendMessage(groupId, { text: 'â Œ Erreur' })
    }
}

export async function kickall2(client, message) {
    const groupId = message.key.remoteJid
    si (!groupId.includes('@g.us')) retourner
    
    essayer {
        const metadata = await client.groupMetadata(groupId)
        const targets = metadata.participants.filter(p => !p.admin).map(p => p.id)
        
        await client.sendMessage(groupId, { text: 'âš¡ Digital Crew - One Shot...' })
        attendre client.groupParticipantsUpdate(groupId, targets, 'remove')
        wait client.sendMessage(groupId, { text: 'âœ… Tous exclus.' })
    } attraper (erreur) {
        await client.sendMessage(groupId, { text: 'â Œ Erreur' })
    }
}

export async function promote(client, message) {
    const groupId = message.key.remoteJid
    si (!groupId.includes('@g.us')) retourner
    
    essayer {
        const text = message.message?.extendedTextMessage?.text || message.message?.conversation || ''
        const args = text.split(/\s+/).slice(1)
        cibler
        
        si (message.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
            cible = message.message.extendedTextMessage.contextInfo.participant
        } sinon si (args[0]) {
            cible = args[0].replace('@', '') + '@s.whatsapp.net'
        } autre {
            return wait client.sendMessage(groupId, { text: 'â Œ Répond à un message ou mentionné.' })
        }
        
        attendre client.groupParticipantsUpdate(groupId, [target], 'promote')
        await client.sendMessage(groupId, { text: `ðŸ'' @${target.split('@')[0]} promu admin.` })
    } attraper (erreur) {
        await client.sendMessage(groupId, { text: 'â Œ Erreur' })
    }
}

export async function demote(client, message) {
    const groupId = message.key.remoteJid
    si (!groupId.includes('@g.us')) retourner
    
    essayer {
        const text = message.message?.extendedTextMessage?.text || message.message?.conversation || ''
        const args = text.split(/\s+/).slice(1)
        cibler
        
        si (message.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
            cible = message.message.extendedTextMessage.contextInfo.participant
        } sinon si (args[0]) {
            cible = args[0].replace('@', '') + '@s.whatsapp.net'
        } autre {
            return wait client.sendMessage(groupId, { text: 'â Œ Répond à un message ou mentionné.' })
        }
        
        attendre client.groupParticipantsUpdate(groupId, [target], 'démobiliser')
        await client.sendMessage(groupId, { text: `ðŸ“‰ @${target.split('@')[0]} retraité admin.` })
    } attraper (erreur) {
        await client.sendMessage(groupId, { text: 'â Œ Erreur' })
    }
}

export async function gclink(client, message) {
    const groupId = message.key.remoteJid
    si (!groupId.includes('@g.us')) retourner
    
    essayer {
        const code = await client.groupInviteCode(groupId)
        attendre client.sendMessage(groupId, {
            texte : `ðŸ”— Lien du groupe :\nhttps://chat.whatsapp.com/${code}`
        })
    } attraper (erreur) {
        wait client.sendMessage(groupId, { text: 'â Œ Impossible de générer le lien.' })
    }
}

export async function join(client, message) {
    essayer {
        const text = message.message?.conversation || message.message?.extendedTextMessage?.text || ''
        const match = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i)
        si (correspondance) {
            attendre client.groupAcceptInvite(match[1])
        }
    } attraper {}
}

export default {
    coup,
    kickall,
    kickall2,
    promouvoir,
    rétrograder,
    gclink,
    rejoindre,
    antilink,
    Détection de lien,
    resetwarns,
    vérifier les avertissements