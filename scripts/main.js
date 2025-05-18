// ==== Sélections ====
// ~~~~ Character ~~~~
const inputname         = document.querySelector("#name");
const selectClass       = document.querySelector("#class-character");
const tagListClass      = document.querySelector(".class-character-info");
const addBtn            = document.querySelector(".add-btn");
// ~~~~ Players display ~~~~
const tagListPlayer     = document.querySelector(".list-player");
// ~~~~ Players controls ~~~~
const selectAttacker    = document.querySelector("#attacker");
const selectDefender    = document.querySelector("#defender");
// ~~~~ Fight controls ~~~~
const selectAttackType  = document.querySelector("#attack-type");
const attackBtn         = document.querySelector(".attack-btn");
// ~~~~ Arena ~~~~
const yourPlayerCard    = document.querySelector(".your-player__card-status");
const yourPlayerDialog  = document.querySelector(".your-player__dialog");
const yourEnnemyCard    = document.querySelector(".your-ennemy__card-status");
const yourEnnemyDialog  = document.querySelector(".your-ennemy__dialog");

// ==== Variables ====
const knights = [];

// ==== Fonctions ====
// ~~~~ Build your Hero ~~~~
class Knight {
    constructor (name, strength, magic) {
        this.name       = name;
        this.strength   = strength;
        this.magic      = magic;
        this.mana       = 50;
        this.potions    = 2;
        this.hp         = 100;
    }
    shout(isAttacker) {
        if (isAttacker) {
            yourPlayerDialog.innerHTML = `Je m'appelle <span class="highlight-blue">${this.name}</span>.`;
        } else {
            yourEnnemyDialog.innerHTML = `Retiens <span class="highlight">${this.name}</span>, c'est mon nom... et le jour de ta défaite !`;
        }
    }
    attack(attacker, defender) {
        const damage = attacker.strength * Math.random().toFixed(0);
        defender.hp = Math.max(defender.hp-damage, 0);
        yourEnnemyCard.querySelector(".character-card__hp").textContent = `❤️ Vitality : ${defender.hp}`;
        console.log(damage);

        const hpBar = yourEnnemyCard.querySelector(".character-card__hp-bar-bg-green");
        const hpPercentage = (defender.hp / 100) * 100;
        hpBar.style.width = `${hpPercentage}%`;

        yourPlayerDialog.innerHTML = `<span class="highlight-blue">${attacker.name}</span> attaque <span class="highlight">${defender.name}</span> et inflige ${damage} points de dégâts !`;
    }
    counterAttack(attacker, defender) {
        const damage = defender.strength * Math.random().toFixed(0);
        attacker.hp = Math.max(attacker.hp-damage, 0);;
        console.log(damage);

        yourPlayerCard.querySelector(".character-card__hp").textContent = `❤️ Vitality : ${attacker.hp}`;

        const hpBar = yourPlayerCard.querySelector(".character-card__hp-bar-bg-green");
        const hpPercentage = (attacker.hp/100)*100;
        hpBar.style.width = `${hpPercentage}%`;

        yourEnnemyDialog.innerHTML = `<span class="highlight">${defender.name}</span> attaque <span class="highlight-blue">${attacker.name}</span> et inflige ${damage} points de dégâts !`;
    }
    magicAttack(attacker, defender) {
        const damage = attacker.magic * Math.random().toFixed(0);
        defender.hp = Math.max(defender.hp-damage, 0);
        attacker.mana -= 20;
        console.log(damage);

        yourEnnemyCard.querySelector(".character-card__hp").textContent = `❤️ Vitality : ${defender.hp}`;

        const hpBar = yourEnnemyCard.querySelector(".character-card__hp-bar-bg-green");
        const hpPercentage = (defender.hp / 100) * 100;
        hpBar.style.width = `${hpPercentage}%`;

        yourPlayerCard.querySelector(".character-card__mana").textContent = `🔮 Mana : ${attacker.mana}`;
        yourPlayerDialog.innerHTML = `<span class="highlight-blue">${attacker.name}</span> attaque <span class="highlight">${defender.name}</span> et inflige ${damage} points de dégâts !`;
    }
    counterMagicAttack(attacker, defender) {
        const damage = defender.magic * Math.random().toFixed(0);
        attacker.hp = Math.max(attacker.hp-damage, 0);
        defender.mana -= 20;
        console.log(damage);
        

        yourPlayerCard.querySelector(".character-card__hp").textContent = `❤️ Vitality : ${attacker.hp}`;

        const hpBar = yourPlayerCard.querySelector(".character-card__hp-bar-bg-green");
        const hpPercentage = (attacker.hp/100)*100;
        hpBar.style.width = `${hpPercentage}%`;

        yourEnnemyCard.querySelector(".character-card__mana").textContent = `🔮 Mana : ${defender.mana}`;
        yourEnnemyDialog.innerHTML = `<span class="highlight">${defender.name}</span> attaque <span class="highlight-blue">${attacker.name}</span> et inflige ${damage} points de dégâts !`;
    }
}

// Construire une nouvelle carte personnage
function addKnight(name, strength, magic) {
    if (name === "") {
        alert("Veuillez remplir les champs");
        return;
    }

    const newKnight = new Knight(name, strength, magic);
    knights.push(newKnight);
    addAttacker(newKnight);
    addDefender(newKnight);
}

// Afficher les personnages créés
function displayKnights() {
    // Vider ma div container
    tagListPlayer.innerHTML = "";

    if (knights.length === 0) {
        const emptyMessage              = document.createElement("div");
        emptyMessage.className          = "character-card";
        emptyMessage.textContent        = "No player logged in.";
        tagListPlayer.append(emptyMessage);

    } else {
        knights.forEach((knight, index) => {
            // Création container pour afficher mes card personnage
            const divListCharacter      = document.createElement("div");
            divListCharacter.className  = "character-card";
            tagListPlayer.append(divListCharacter);

            // Création des mes div (infos personnage)
            const divCardName           = document.createElement("div");
            const divCardStrength       = document.createElement("div");
            const divCardMagic          = document.createElement("div");
            const divCardMana           = document.createElement("div");
            const divCardHp             = document.createElement("div");
            const divCardPotions        = document.createElement("div");
            const divCardHpBar          = document.createElement("div");
            const divCardHpBarGreen     = document.createElement("div");


            // Création d'une classe pour CSS
            divCardName.className       = "character-card__name";
            divCardStrength.className   = "character-card__strength";
            divCardMagic.className      = "character-card__magic";
            divCardMana.className       = "character-card__mana";
            divCardHp.className         = "character-card__hp";
            divCardPotions.className    = "character-card__potions";
            divCardHpBar.className      = "character-card__hp-bar";
            divCardHpBarGreen.className = "character-card__hp-bar-bg-green";

            // Insertion du contenu 
            divCardName.innerHTML     = `${knight.name}`
            divCardStrength.innerHTML = `<div>💪 Strength :</div> <div>${knight.strength}</div>`
            divCardMagic.innerHTML    = `<div>✨ Intelligence :</div> <div>${knight.magic}</div>`
            divCardMana.innerHTML     = `<div>🔮 Mana :</div> <div>${knight.mana}</div>`
            divCardHp.innerHTML       = `<div>❤️ Vitality :</div> <div>${knight.hp}</div>`
            divCardPotions.innerHTML  = `<div>🧉 Potions :</div> <div>${knight.potions}</div>`
            
            // Création btn delete
            const deleteBtn             = document.createElement("button");
            deleteBtn.className         = "delete-btn";
            deleteBtn.dataset.index     = index;
            deleteBtn.dataset.title     = "Delete item"
            deleteBtn.textContent       = "❌";

            // Mise des div infos dans le container (dans l'ordre d'affichage)
            divCardHpBar.append(divCardHpBarGreen)
            
            divListCharacter.append(divCardName);
            divListCharacter.append(divCardStrength);
            divListCharacter.append(divCardMagic);
            divListCharacter.append(divCardMana);
            divListCharacter.append(divCardHp);
            divListCharacter.append(divCardPotions);
            divListCharacter.append(divCardHpBar);
            divListCharacter.append(deleteBtn);
        })
    }
}

// Remettre les champs input à 0
function resetInputs() {
    inputname.value     = "";
    inputname.focus();
}

// Afficher la classe choisie avant création personnage
function displayClass() {
    // Vider la liste
    tagListClass.innerHTML = ""

    if (selectClass.value === "warrior") {
        // Créer mes éléments
        const divClassInfoStrength          = document.createElement("p");
        const divClassScoreStrength         = document.createElement("div");
        const divClassInfoIntelligence      = document.createElement("p");
        const divClassScoreIntelligence     = document.createElement("div");
        const divClassInfoConstitution      = document.createElement("p");
        const divClassScoreConstitution     = document.createElement("div");

        // Ajouter une classe
        divClassInfoStrength.className      = "info-strength";
        divClassScoreStrength.className     = "score-strength";
        divClassInfoIntelligence.className  = "info-intelligence";
        divClassScoreIntelligence.className = "score-intelligence";
        divClassInfoConstitution.className  = "info-constitution";
        divClassScoreConstitution.className = "score-constitution";

        // Insertion contenu
        divClassInfoStrength.innerHTML      = "Strength:";
        divClassScoreStrength.innerHTML     = "+5";
        divClassInfoIntelligence.innerHTML  = "Intelligence";
        divClassScoreIntelligence.innerHTML = "-1";
        divClassInfoConstitution.innerHTML  = "Constitution";
        divClassScoreConstitution.innerHTML = "+20";

        // Insertion des balises dans le container class-character-info
        tagListClass.append(divClassInfoStrength);
        tagListClass.append(divClassScoreStrength);
        tagListClass.append(divClassInfoIntelligence);
        tagListClass.append(divClassScoreIntelligence);
        tagListClass.append(divClassInfoConstitution);
        tagListClass.append(divClassScoreConstitution);

    } else if (selectClass.value === "mage") {
        // Créer mes éléments
        const divClassInfoStrength          = document.createElement("p");
        const divClassScoreStrength         = document.createElement("div");
        const divClassInfoIntelligence      = document.createElement("p");
        const divClassScoreIntelligence     = document.createElement("div");
        const divClassInfoConstitution      = document.createElement("p");
        const divClassScoreConstitution     = document.createElement("div");

        // Ajouter une classe
        divClassInfoStrength.className      = "info-strength";
        divClassScoreStrength.className     = "score-strength";
        divClassInfoIntelligence.className  = "info-intelligence";
        divClassScoreIntelligence.className = "score-intelligence";
        divClassInfoConstitution.className  = "info-constitution";
        divClassScoreConstitution.className = "score-constitution";

        // Insertion contenu
        divClassInfoStrength.innerHTML      = "Strength:";
        divClassScoreStrength.innerHTML     = "-1";
        divClassInfoIntelligence.innerHTML  = "Intelligence";
        divClassScoreIntelligence.innerHTML = "+5";
        divClassInfoConstitution.innerHTML  = "Constitution";
        divClassScoreConstitution.innerHTML = "+0";

        // Insertion des balises dans le container class-character-info
        tagListClass.append(divClassInfoStrength);
        tagListClass.append(divClassScoreStrength);
        tagListClass.append(divClassInfoIntelligence);
        tagListClass.append(divClassScoreIntelligence);
        tagListClass.append(divClassInfoConstitution);
        tagListClass.append(divClassScoreConstitution);
    } else {
        tagListClass.textContent = "Veuillez choisir une classe"
    }
}
displayClass();

// ~~~~ Select your Hero ~~~~
// Select attacker
function addAttacker(knight) {
    if (knights.length !== 0) {
        
        // Création d'un élément option à rajouter à la liste
        const optionAttacker        = document.createElement("option");
        optionAttacker.value        = knight.name;
        optionAttacker.textContent  = knight.name;
        selectAttacker.append(optionAttacker);
    }
}

// Select defender
function addDefender(knight) {
    if (knights.length !== 0) {

        // Création d'un élément option à rajouter à la liste
        const optionDefender        = document.createElement("option");
        optionDefender.value        = knight.name;
        optionDefender.textContent  = knight.name;
        selectDefender.append(optionDefender);
    }
}

// Désactiver le personnage des champs select quand choisi
function disabledOptionKnight(selectFighter, selectedFighter) {
    for (let i = 0; i < selectFighter.options.length; i++) {
        const option = selectFighter.options[i];

        if (option.value === selectedFighter) {
            option.disabled = true;
        } else {
            option.disabled = false;
        }
    }
}

// Suppression du héro dans les listes select
function deleteOptionKnight(knightName) {
    const optionsAttacker = selectAttacker.querySelectorAll("option");
    optionsAttacker.forEach(option => {
        if (option.value === knightName) {
            option.remove();
        }
    })
    const optionsDefender = selectDefender.querySelectorAll("option");
    optionsDefender.forEach(option => {
        if (option.value === knightName) {
            option.remove();
        }
    })
}

// Afficher la carte du Chevalier choisi dans l'arène
function displayOptionKnight(knight, element) {
    // Vider l'élément
    element.innerHTML = "";

    // Création container pour afficher mes card personnage
    const divCharacter          = document.createElement("div");
    divCharacter.className      = "character-card";

    // Création des div pour les informations du chevalier
    const divCardName           = document.createElement("div");
    const divCardStrength       = document.createElement("div");
    const divCardMagic          = document.createElement("div");
    const divCardMana           = document.createElement("div");
    const divCardHp             = document.createElement("div");
    const divCardPotions        = document.createElement("div");
    const divCardHpBar          = document.createElement("div");
    const divCardHpBarGreen     = document.createElement("div");

    // Ajouter des classes pour le CSS
    divCardName.className       = "character-card__name";
    divCardStrength.className   = "character-card__strength";
    divCardMagic.className      = "character-card__magic";
    divCardMana.className       = "character-card__mana";
    divCardHp.className         = "character-card__hp";
    divCardPotions.className    = "character-card__potions";
    divCardHpBar.className      = "character-card__hp-bar";
    divCardHpBarGreen.className = "character-card__hp-bar-bg-green";

    // Insérer le contenu
    divCardName.innerHTML     = `${knight.name}`
    divCardStrength.innerHTML = `<div>💪 Strength :</div> <div>${knight.strength}</div>`
    divCardMagic.innerHTML    = `<div>✨ Intelligence :</div> <div>${knight.magic}</div>`
    divCardMana.innerHTML     = `<div>🔮 Mana :</div> <div>${knight.mana}</div>`
    divCardHp.innerHTML       = `<div>❤️ Vitality :</div> <div>${knight.hp}</div>`
    divCardPotions.innerHTML  = `<div>🧉 Potions :</div> <div>${knight.potions}</div>`

    // Mettre jour la barre hp de mes perso
    const hpBar = divCardHpBarGreen;
    const hpPercentage = (knight.hp / 100) * 100;
    console.log(hpPercentage);
    
    hpBar.style.width = `${hpPercentage}%`;

    // Ajouter les div à l'élément (ordre affichage)
    divCardHpBar.append(divCardHpBarGreen);

    divCharacter.append(divCardName);
    divCharacter.append(divCardStrength);
    divCharacter.append(divCardMagic);
    divCharacter.append(divCardMana);
    divCharacter.append(divCardPotions);
    divCharacter.append(divCardHp);
    divCharacter.append(divCardHpBar);
    
    element.append(divCharacter)
}

// ~~~~ Fight with your Hero ~~~~
// Choisir un type d'attaque
function chooseTypeOfAttack(attacker, defender) {
    if (selectAttackType.value === "swords") {
        if (attacker && defender) {
            attacker.attack(attacker, defender);

            if (defender.hp < 1) {
                confirm("VICTORY")
            } else if (attacker.hp < 1) {
                confirm("GAME OVER")
            } else {
                attacker.counterAttack(attacker, defender);
            }
        }

    } else if (selectAttackType.value === "magic") {
        // alert("Not available yet !")
        if (attacker && defender) {
        attacker.magicAttack(attacker, defender);

            if (defender.hp < 1) {
                confirm("VICTORY")
            } else if (attacker.hp < 1) {
                confirm("GAME OVER")
            } else {
                attacker.counterMagicAttack(attacker, defender);
            }
        }

    } else {
        alert("Please, select an attack et win this fight...")
    }
}

// ==== Evénements ====
// ~~~~ Hero creation ~~~~
addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Button clicked");

    if (selectClass.value === "warrior") {
        const name      = inputname.value;
        let strength    = 15;
        let magic       = 9;

        addKnight(name, strength, magic);
        displayKnights();
        resetInputs();     
    } else if (selectClass.value === "mage") {
        const name      = inputname.value;
        let strength    = 9;
        let magic       = 15;

        addKnight(name, strength, magic);
        displayKnights();
        resetInputs();      
    }    
})

// ~~~~ Delete hero ~~~~
tagListPlayer.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        // Index de l'élément à supprimer
        const index = event.target.dataset.index;
        const knightName = knights[index].name;
        
        knights.splice(index, 1);
        console.log(knights);
        
        deleteOptionKnight(knightName);
        displayKnights();
    }
})

// ~~~~ Select class ~~~~
selectClass.addEventListener("change", function () {
    displayClass();
})

// ~~~~ Select attacker/defender ~~~~
selectAttacker.addEventListener("change", function () {
    const selectedAttacker = this.value;
    disabledOptionKnight(selectDefender, selectedAttacker)

    // Trouver le chevalier sélectionné et appeler shout()
    const attacker = knights.find(knight => knight.name === selectedAttacker);
    if (attacker) {
        attacker.shout(true);
        displayOptionKnight(attacker, yourPlayerCard);
    }
})
selectDefender.addEventListener("change", function () {
    const selectedDefender = this.value;
    disabledOptionKnight(selectAttacker, selectedDefender)

    // Trouver le chevalier sélectionné et appeler shout()
    const defender = knights.find(knight => knight.name === selectedDefender);
    if (defender) {
        defender.shout(false);
        displayOptionKnight(defender, yourEnnemyCard);
    }
})

// ~~~~ ATTACK ~~~~
attackBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Récupérer les noms des personnages sélectionnés
    const attackerName = selectAttacker.value;
    const defenderName = selectDefender.value;

    const attacker = knights.find(knight => knight.name === attackerName);
    const defender = knights.find(knight => knight.name === defenderName);

    chooseTypeOfAttack(attacker, defender);
})


// todo4: prendre une potion => rajouter code html button?
// todo7: transformer l'exo en projet pro pour portfolio (factoring, design, responsive)
// todo: problème lors de la suppression des cards (si même nom, les deux disparaissent de sélect)
// todo: créer un bouton prendre une potion + règles pour le defender (vie<50 && potion > 0)
// todo: limiter les attaques magiques à la mana qu'on peut utiliser
// todo: créer un délai aux contre-attaques
// todo: changer la dispo? faire une maquette
    // Améliorer les boîtes de dialogue
    // Créer des boss sélectionnables dans les defender avec des attaques spéciales
    // Générer automatiquement un nombre aléatoire pour la force et la magie => l'afficher avec ??? pour laisser le mystère
    // Choisir son symbole à la place
    // Faire un chiffre sur 20 pour éviter les attaques trop puissantes?
    // Jeter un dé de précision à chaque attaque
    // Créer des attaques spéciales limitées (exemple avec attaques magiques => feu, eau, vent, terre ou nom d'attaque pour le fun - Coup de grâce, coup virevoltant)
    // Faire des héros précongifurés (classe : warrior, magician, druid?)
    // Créer une animation combat (strength & magic)
