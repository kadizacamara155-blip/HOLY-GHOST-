import { DigixNew } from '../utils/DigixNew.js';

import { downloadMediaMessage } from 'baileys';

importer fs depuis 'fs';

importer le chemin depuis 'chemin';

export async function viewonce(client, message) {

    const remoteJid = message.key.remoteJid;
    
    const bot = client.user.id.split(':')[0] + "@s.whatsapp.net";

    // Récupérer le message cité
    const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    // Vérifier s'il s'agit d'un message ViewOnce valide
    si (!quotedMessage?.imageMessage?.viewOnce && !quotedMessage?.videoMessage?.viewOnce && !quotedMessage?.audioMessage?.viewOnce) {

        await client.sendMessage(remoteJid, { text: '_Répondre à un message ViewOnce valide._' });

        retour;
    }

    const content = DigixNew(quotedMessage);

    // Fonction permettant de modifier la propriété 'viewOnce'
    fonction modifierViewOnce(obj) {

        si (typeof obj !== 'object' || obj === null) retourner;

        pour (const clé dans obj) {

            si (clé === 'viewOnce' && typeof obj[clé] === 'booléen') {

                obj[key] = false; // Désactiver 'viewOnce'

            } sinon si (typeof obj[key] === 'object') {

                modifierViewOnce(obj[clé]);
            }
        }
    }

    // Modifier le contenu
    modifierViewOnce(contenu);

    essayer {

        si (content?.imageMessage) {

            // Télécharger le média
            const mediaBuffer = attendre downloadMediaMessage (

                { message: content }, // Transmettre le contenu modifié

                'buffer', // Enregistrer comme tampon

                {} // Fournir les informations d'authentification si nécessaire
            );

            si (!mediaBuffer) {

                console.error('Échec du téléchargement du média.');

                return await client.sendMessage(remoteJid, {

                    texte : « Échec du téléchargement du média ViewOnce. Veuillez réessayer. »
                });
            }

            // Sauvegarder temporairement le média
            const tempFilePath = path.resolve('./temp_view_once_image.jpeg');

            fs.writeFileSync(tempFilePath, mediaBuffer);

            // Envoyer le média téléchargé
            attendre client.sendMessage(bot, {

                image : { url : chemin_du_fichier_temporaire },
                
            });

            // Nettoyer le fichier temporaire
            fs.unlinkSync(tempFilePath);

        } sinon si (content?.videoMessage) {

            // Télécharger le média
            const mediaBuffer = attendre downloadMediaMessage (

                { message: content }, // Transmettre le contenu modifié

                'buffer', // Enregistrer comme tampon

                {} // Fournir les informations d'authentification si nécessaire
            );

            si (!mediaBuffer) {

                console.error('Échec du téléchargement du média.');

                return await client.sendMessage(remoteJid, {

                    texte : « Échec du téléchargement du média ViewOnce. Veuillez réessayer. »
                });
            }

            // Sauvegarder temporairement le média
            const tempFilePath = path.resolve('./temp_view_once_image.mp4');

            fs.writeFileSync(tempFilePath, mediaBuffer);

            // Envoyer le média téléchargé
            attendre client.sendMessage(bot, {

                vidéo : { url : chemin_fichier_temporaire },
                
            });

            // Nettoyer le fichier temporaire
            fs.unlinkSync(tempFilePath);

        } sinon si (content?.audioMessage) {

            // Télécharger le média
            const mediaBuffer = attendre downloadMediaMessage (

                { message: content }, // Transmettre le contenu modifié

                'buffer', // Enregistrer comme tampon

                {} // Fournir les informations d'authentification si nécessaire
            );

            si (!mediaBuffer) {

                console.error('Échec du téléchargement du média.');

                return await client.sendMessage(remoteJid, {

                    texte : « Échec du téléchargement du média ViewOnce. Veuillez réessayer. »
                });
            }

            // Sauvegarder temporairement le média
            const tempFilePath = path.resolve('./temp_view_once_image.mp3');

            fs.writeFileSync(tempFilePath, mediaBuffer);

            // Envoyer le média téléchargé
            attendre client.sendMessage(bot, {

                audio: { url: cheminFichierTemporaire },
                
            });

            // Nettoyer le fichier temporaire
            fs.unlinkSync(tempFilePath);

        }autre {

            console.error('Aucun message image trouvé dans le message cité.');

            attendre client.sendMessage(remoteJid, {

                texte : '_Aucune imageMessage valide à modifier et à envoyer._',

            });
        }
    } attraper (erreur) {

        console.error('Erreur lors de la modification et de l'envoi du message ViewOnce :', erreur);

        attendre client.sendMessage(remoteJid, {

            texte : '_Une erreur s'est produite lors du traitement du message ViewOnce._',
            
        });
    }
}

exporter par défaut viewonce;