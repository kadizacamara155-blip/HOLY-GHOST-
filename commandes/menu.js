importer fs depuis "fs";
importer os depuis "os";
importer le chemin depuis "chemin";
import { fileURLToPath } from "url";
importer les configurations depuis "../utils/configmanager.js";
import { getDevice } from "baileys";
import stylizedChar from "../utils/fancy.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



fonction formatUptime(secondes) {
  const h = Math.floor(secondes / 3600);
  const m = Math.floor((secondes % 3600) / 60);
  const s = Math.floor(secondes % 60);
  renvoie `${h}h ${m}m ${s}s`;
}

fonction getCategoryIcon(category) {
  const c = catégorie.toLowerCase();

  si (c === "utils") retourner "âš™ï¸ ";
  si (c === "media") retourner "ðŸ“¸";
  si (c === "groupe") retourner "ðŸ'¥";
  si (c === "bug") retourner "ðŸ ž";
  si (c === "tags") retourner "ðŸ ·ï¸ ";
  si (c === "modération") retourner "ðŸ˜¶â€ ðŸŒ«ï¸ ";
  si (c === "propriétaire") retourner "âœ¨";
  si (c === "créateur") retourner "ðŸ''";

  renvoyer "ðŸŽ¯";
}


export default async function info(client, message) {
  essayer {
    const remoteJid = message.key.remoteJid;
    const userName = message.pushName || "Inconnu";

    
    const usedRam = (process.memoryUsage().rss / 1024 / 1024).toFixed(1);
    const totalRam = (os.totalmem() / 1024/1024).toFixed(1);
    const uptime = formatUptime(process.uptime());
    const platform = os.platform();

   
    const botId = client.user.id.split(":")[0];
    const prefix = configs.config.users?.[botId]?.prefix || "!";

    
    const maintenant = nouvelle Date();
    const joursFR = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi"
    ];

    const date =
      `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const jour = joursFR[maintenant.getDay()];

    
    const handlerPath = path.join(__dirname, "../events/messageHandler.js");
    const handlerCode = fs.readFileSync(handlerPath, "utf-8",);

    const commandRegex =
      /case\s+['"](\w+)['"]\s*:\s*\/\/\s*@cat:\s*([^\n\r]+)/g;

    const catégories = {};
    laisser correspondre;

    tant que ((match = commandRegex.exec(handlerCode)) !== null) {
      const commande = match[1];
      const catégorie = match[2].trim();

      si (!categories[category]) categories[category] = [];
      catégories[catégorie].push(commande);
    }

    
let menu = `
Équipe DigiX ðŸŽ¯
â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
• Préfixe : ${prefix}
• Utilisateur : ${stylizedChar(userName)}
• Version : 1.0.0
• Disponibilité : ${uptime}
• RAM : ${usedRam}/${totalRam} Mo
• Plateforme : ${platform}
• Date : ${date} - ${stylizedChar(day)}
â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
`;

    pour (const [catégorie, commandes] de Object.entries(catégories)) {
      const icône = getCategoryIcon(catégorie);
      const catName = stylizedChar(category);
      menu += `â” â” â” â” ${icon} ${catName} â” â” â”
`;
commandes.forEach(cmd => {
  menu += `â”ƒ â€º ${stylizedChar(cmd)}\n`;
});
menu += `â”—â” â” â” â” â” â” â” â” â” â” â” â” â” â”
`;
    }

    menu = menu.trim();

    
    essayer {
      const device = getDevice(message.key.id);

      si (appareil === "android") {
        attendre client.sendMessage(remoteJid, {
          image: { url: "database/menu.jpg" },
          légende : stylizedChar(menu),
          contextInfo: {
            participant : "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            Message cité : { conversation : « Équipe Digix » },
            isForwarded: vrai
          }
        });
      } autre {
        attendre client.sendMessage(
          RemoteJid,
          {
            vidéo : { url : "database/DigiX.mp3" },
            légende : stylizedChar(menu)
          },
          { citation : message }
        );
      }
    } attraper (erreur) {
      attendre client.sendMessage(
        RemoteJid,
        { text: "â Œ Erreur lors de l'envoi du menu : " + err.message },
        { citation : message }
      );
    }

    console.log(menu);

  } attraper (erreur) {
    console.log("erreur lors de l'affichage du menu :", err);
  }
}