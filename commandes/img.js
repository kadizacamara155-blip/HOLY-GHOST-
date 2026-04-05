importer axios depuis "axios";

fonction asynchrone img(message, client) {
    const remoteJid = message.key.remoteJid;

    const text =
        message.message?.conversation ||
        message.message?.extendedTextMessage?.text ||
        "";

    const args = text.trim().split(/\s+/).slice(1);
    const requête = args.join(" ");

    si (!requête) {
        return await client.sendMessage(remoteJid, {
            text: "ðŸ–¼ï¸ Fournis des mots-clés\nExemple : configuration du hacker .img"
        });
    }

    essayer {
        attendre client.sendMessage(remoteJid, {
            text: `ðŸ” Recherche d'images pour "${query}"...`
        });

        const apiUrl = `https://christus-api.vercel.app/image/Pinterest?query=${encodeURIComponent(query)}&limit=10`;

        const réponse = await axios.get(apiUrl, { timeout: 15000 });

        si (
            !response.data ||
            !response.data.status ||
            !Array.isArray(response.data.results) ||
            response.data.results.length === 0
        ) {
            return await client.sendMessage(remoteJid, {
                texte : "â Œ Aucune image trouvée."
            });
        }

        const images = response.data.results
            .filter(élément =>
                item.imageUrl &&
                /\.(jpg|jpeg|png|webp)$/i.test(item.imageUrl)
            )
            .tranche(0, 5);

        si (images.length === 0) {
            return await client.sendMessage(remoteJid, {
                texte : "â Œ Aucune image valide trouvée."
            });
        }

        pour (const image de images) {
            essayer {
                attendre client.sendMessage(remoteJid, {
                    image: { url: image.imageUrl },
                    légende:
                        `ðŸ“· ${query}\n` +
                        `${image.title && image.title !== "Pas de titre" ? image.title + "\n" : ""}` +
                        `© Digital Crew 243`
                });

                attendre une nouvelle promesse(r => setTimeout(r, 1000));
            } attraper (erreur) {
                continuer;
            }
        }

    } attraper (erreur) {
        console.error("ERREUR D'IMAGE :", error.message);

        attendre client.sendMessage(remoteJid, {
            texte : "â Œ Erreur API Pinterest."
        });
    }
}

exporter l'image par défaut ;