const nombres = [
    { chiffre: 60, lettres: "soixante" },
    { chiffre: 61, lettres: "soixante et un" },
    { chiffre: 62, lettres: "soixante-deux" },
    { chiffre: 63, lettres: "soixante-trois" },
    { chiffre: 64, lettres: "soixante-quatre" },
    { chiffre: 65, lettres: "soixante-cinq" },
    { chiffre: 66, lettres: "soixante-six" },
    { chiffre: 67, lettres: "soixante-sept" },
    { chiffre: 68, lettres: "soixante-huit" },
    { chiffre: 69, lettres: "soixante-neuf" }
];

let score = 0;
let questionActuelle = {};

// Sélection des éléments HTML
const questionElt = document.getElementById("question");
const reponsesElt = document.getElementById("reponses");
const messageElt = document.getElementById("message");
const boutonSuivant = document.getElementById("suivant");

// Fonction pour mélanger un tableau (algorithme de Fisher-Yates)
function melangerTableau(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Générer une nouvelle question
function nouvelleQuestion() {
    messageElt.textContent = "";
    reponsesElt.innerHTML = "";

    // Choisir un nombre au hasard
    questionActuelle = nombres[Math.floor(Math.random() * nombres.length)];
    questionElt.textContent = `Quel est le nombre correspondant à "${questionActuelle.chiffre}" ?`;

    // Générer les options (une correcte et deux aléatoires)
    let options = [questionActuelle.lettres];

    while (options.length < 3) {
        let choixAleatoire = nombres[Math.floor(Math.random() * nombres.length)].lettres;
        if (!options.includes(choixAleatoire)) {
            options.push(choixAleatoire);
        }
    }

    // Mélanger les options
    melangerTableau(options);

    // Afficher les réponses sous forme de boutons
    options.forEach(option => {
        let bouton = document.createElement("button");
        bouton.textContent = option;
        bouton.onclick = () => verifierReponse(option);
        reponsesElt.appendChild(bouton);
    });
}

// Vérifier la réponse
function verifierReponse(reponse) {
    if (reponse === questionActuelle.lettres) {
        messageElt.textContent = "✅ Bonne réponse !";
        score++;
    } else {
        messageElt.textContent = `❌ Mauvaise réponse ! La bonne réponse était "${questionActuelle.lettres}".`;
    }
}

// Passer à la question suivante
boutonSuivant.addEventListener("click", nouvelleQuestion);

// Lancer la première question au chargement de la page
nouvelleQuestion();
