importer axios depuis 'axios'
import { downloadMediaMessage } from 'baileys'
import { fileTypeFromBuffer } from 'file-type'
importer FormData depuis 'form-data'
import stylizedChar from '../utils/fancy.js'

fonction asynchrone uploadToCatbox(buffer, nom_fichier) {
    const form = new FormData()
    form.append('reqtype', 'fileupload')
    form.append('fileToUpload', buffer, fileName)

    const res = await axios.post(
        'https://catbox.moe/user/api.php',
        formulaire,
        { headers: form.getHeaders() }
    )

    renvoyer res.data.trim()
}

fonction asynchrone url(client, message) {
    const jid = message.key.remoteJid
    const ctx = message.message?.extendedTextMessage?.contextInfo

    si (!ctx?.quotedMessage) {
        retourner client.sendMessage(jid, {
            Texte : « Répondre à une image, une vidéo, un fichier audio ou un document. »
        })
    }

    soit mediaMessage = null
    soit ext = 'bin'

    si (ctx.quotedMessage.imageMessage) {
        mediaMessage = { imageMessage : ctx.quotedMessage.imageMessage }
        ext = 'jpg'
    } sinon si (ctx.quotedMessage.videoMessage) {
        mediaMessage = { videoMessage: ctx.quotedMessage.videoMessage }
        ext = 'mp4'
    } sinon si (ctx.quotedMessage.audioMessage) {
        mediaMessage = { audioMessage: ctx.quotedMessage.audioMessage }
        ext = 'mp3'
    } sinon si (ctx.quotedMessage.documentMessage) {
        mediaMessage = { documentMessage: ctx.quotedMessage.documentMessage }
        ext = ctx.quotedMessage.documentMessage.fileName?.split('.').pop() || 'bin'
    } autre {
        return client.sendMessage(jid, { text: 'Média non pris en charge.' })
    }

    await client.sendMessage(jid, { text: 'Téléchargement en cours…' })

    const buffer = await downloadMediaMessage(
        {
            clé: {
                remoteJid: jid,
                id : ctx.stanzaId,
                de moi : faux
            },
            message: mediaMessage
        },
        'tampon'
    )

    const type = await fileTypeFromBuffer(buffer)
    si (type?.ext) ext = type.ext

    const fileName = `file_${Date.now()}.${ext}`
    const lien = await uploadToCatbox(buffer, nom_fichier)

    await client.sendMessage(jid, { text: lien })
}

URL par défaut d'exportation