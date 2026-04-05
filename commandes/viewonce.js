import { DigixNew } from '../utils/DigixNew.js';
import { downloadMediaMessage } from 'baileys';
importer fs depuis 'fs';
importer le chemin depuis 'chemin';
import stylizedChar from '../utils/fancy.js';

export async function viewonce(client, message) {
    const remoteJid = message.key.remoteJid;
    const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    si (!quotedMessage?.imageMessage?.viewOnce && !quotedMessage?.videoMessage?.viewOnce && !quotedMessage?.audioMessage?.viewOnce) {
        await client.sendMessage(remoteJid, stylizedChar({ text: '_Répondre à un message ViewOnce valide._' }));
        retour;
    }

    const content = DigixNew(quotedMessage);

    fonction modifierViewOnce(obj) {
        si (typeof obj !== 'object' || obj === null) retourner;
        pour (const clé dans obj) {
            si (clé === 'viewOnce' && typeof obj[clé] === 'booléen') {
                obj[clé] = faux ;
            } sinon si (typeof obj[key] === 'object') {
                modifierViewOnce(obj[clé]);
            }
        }
    }

    modifierViewOnce(contenu);

    essayer {
        si (content?.imageMessage) {
            const mediaBuffer = attendre downloadMediaMessage (
                { message: contenu },
                'tampon',
                {}
            );

            si (!mediaBuffer) {
                console.error('Échec du téléchargement du média.');
                return await client.sendMessage(remoteJid, {
                    text: stylizedChar('_Échec du téléchargement du média ViewOnce. Veuillez réessayer._'),
                });
            }

            const tempFilePath = path.resolve('./temp_view_once_image.jpeg');
            fs.writeFileSync(tempFilePath, mediaBuffer);

            attendre client.sendMessage(remoteJid, {
                image : { url : chemin_du_fichier_temporaire },
            });

            fs.unlinkSync(tempFilePath);

        } sinon si (content?.videoMessage) {
            const mediaBuffer = attendre downloadMediaMessage (
                { message: contenu },
                'tampon',
                {}
            );

            si (!mediaBuffer) {
                console.error('Échec du téléchargement du média.');
                return await client.sendMessage(remoteJid, {
                    text: stylizedChar('_Échec du téléchargement du média ViewOnce. Veuillez réessayer._'),
                });
            }

            const tempFilePath = path.resolve('./temp_view_once_image.mp4');
            fs.writeFileSync(tempFilePath, mediaBuffer);

            attendre client.sendMessage(remoteJid, {
                vidéo : { url : chemin_fichier_temporaire },
            });

            fs.unlinkSync(tempFilePath);

        } sinon si (content?.audioMessage) {
            const mediaBuffer = attendre downloadMediaMessage (
                { message: contenu },
                'tampon',
                {}
            );

            si (!mediaBuffer) {
                console.error('Échec du téléchargement du média.');
                return await client.sendMessage(remoteJid, {
                    text: stylizedChar('_Échec du téléchargement du média ViewOnce. Veuillez réessayer._'),
                });
            }

            const tempFilePath = path.resolve('./temp_view_once_image.mp3');
            fs.writeFileSync(tempFilePath, mediaBuffer);

            attendre client.sendMessage(remoteJid, {
                audio: { url: cheminFichierTemporaire },
            });

            fs.unlinkSync(tempFilePath);

        } autre {
            console.error('Aucun message image trouvé dans le message cité.');
            attendre client.sendMessage(remoteJid, {
                text: stylizedChar('_Aucun message image valide à modifier et à envoyer._')
            });
        }
    } attraper (erreur) {
        console.error('Erreur lors de la modification et de l'envoi du message ViewOnce :', erreur);
        attendre client.sendMessage(remoteJid, {
            text: stylizedChar('_Une erreur s'est produite lors du traitement du message ViewOnce._'),
        });
    }
}

exporter par défaut viewonce;