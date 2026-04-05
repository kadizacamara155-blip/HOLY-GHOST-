importer readline depuis 'readline'

export default async function deployAsPremium(){

    clé constante = "D07895461fdgdrq3ez8aaeqQ"

    const rl = readline.createInterface({

        entrée : process.stdin,

        sortie : process.stdout,
    })
retourner une nouvelle promesse((résolu) => {


    rl.question('Avez-vous un mot de passe pour un achat administrateur ? o/n ?', (response) => {

        réponse = réponse.toLowerCase()
        rl.close()

        si (réponse == 'oui'){
            rl.question('Veuillez saisir le mot de passe ici', (mot de passe) => {
                rl.close()
                si (mot de passe === clé){
                    console.log('succès')
                    résoudre(vrai)

               } autre {
                    rl.close()
                    résoudre(faux)
                }
            })
        } sinon si (réponse === 'n' ){
            rl.close()
            résoudre(faux)

        } autre {
            rl.close()
            console.log('Vous serez connecté sans aucun privilège. Redémarrez le serveur si vous possédez une clé d'accès premium')
            résoudre(faux)
        }
    })

})
}