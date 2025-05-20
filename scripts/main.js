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
const potionBtn         = document.querySelector(".potion-btn");
// ~~~~ Arena ~~~~
const yourPlayerCard    = document.querySelector(".your-player__card-status");
const yourEnnemyCard    = document.querySelector(".your-ennemy__card-status");
const arena             = document.querySelector(".arena");
const yourPlayerDialog  = document.querySelector(".your-player__dialog");
const yourEnnemyDialog  = document.querySelector(".your-ennemy__dialog");


// ==== Variables ====
const knights = [];
const tabMissMessagesYourPlayer = ["Oh non, encore raté !", "Il va falloir que je me concentre...", "J'y étais presque", "Tiens bon, on y est presque", "Je t'aurai la prochaine fois !"];
const tabMissMessagesYourEnnemy = ["Maudit sois-tu !", "Arrête de bouger moustique !", "Mmmm ça m'énerve !", "Tu vas courir encore longtemps comme ça?!", "Evidemment, je n'ai jamais de chance..."]

// ==== Fonctions ====
// ~~~~ Build your Hero ~~~~
class Knight {
    constructor (name, strength, magic, mana, potions, hp) {
        this.name       = name;
        this.strength   = strength;
        this.magic      = magic;
        this.mana       = mana;
        this.potions    = potions;
        this.hp         = hp;
    }
    shout(isAttacker) {
        if (isAttacker) {
            yourPlayerDialog.innerHTML = `<div>Je m'appelle &nbsp;<span class="highlight-blue">${this.name}</span>.</div>`;
        } else {
            yourEnnemyDialog.innerHTML = `<div>Retiens &nbsp;<span class="highlight">${this.name}</span>,<wbr> c'est mon nom... et le jour de ta défaite !</div>`;
        }
    }
    attack(attacker, defender) {
        // Calculer dégat
        let damage          = parseFloat((attacker.strength * Math.random()).toFixed());
        let isCritical      = Math.random() < 0.1;
        let criticalIndex   = isCritical ? 2 : 1;
        let totalDamage     = damage * criticalIndex;


        // Appliquer dégats
        defender.hp = Math.max(defender.hp-totalDamage, 0);

        // Mettre à jour les cartes
        yourEnnemyCard.querySelector(".character-card__hp").innerHTML = `<div>❤️ Vitality :</div> <div>${defender.hp}</div>`;

        const hpBar = yourEnnemyCard.querySelector(".character-card__hp-bar-bg-green");
        const hpPercentage = (defender.hp / 100) * 100;
        hpBar.style.width = `${hpPercentage}%`;

        // Mettre à jour les dialogues
        if (totalDamage === 0) {
            const randomTxtMsg = tabMissMessagesYourPlayer[Math.floor(Math.random()*tabMissMessagesYourPlayer.length)];
            yourPlayerDialog.innerHTML = `<div>${randomTxtMsg}</div>`;

        } else {
            yourPlayerDialog.innerHTML = `<div><span class="highlight-blue">${attacker.name}</span>&nbsp; attaque &nbsp; <span class="highlight">${defender.name}</span>&nbsp; et inflige ${totalDamage} points de dégâts.</div> `
            if (isCritical && totalDamage > 0) {
                const divYourPlayerCritical = document.createElement("div");
                divYourPlayerCritical.className = "your-player__critical critical"
                divYourPlayerCritical.innerHTML = `Coup critique X2 !!!`
                arena.append(divYourPlayerCritical);
                setTimeout(() => {
                    arena.prepend(divYourPlayerCritical);
                }, 2000)
            }
        }
        // Faire disparaitre le message
        setTimeout(()=> {
            yourPlayerDialog.innerHTML = "";
        }, 2000);

        // Vérifier si le défenseur a besoin de prendre une potion
        if (defender.hp < 50 && defender.potions > 0) {
            defender.takeAPotion(false);
        }
    }
    counterAttack(attacker, defender) {
        // Calculer dégat
        let damage          = parseFloat((defender.strength * Math.random()).toFixed());
        let isCritical      = Math.random() < 0.1;
        let criticalIndex   = isCritical ? 2 : 1;
        let totalDamage     = damage * criticalIndex;

        attacker.hp = Math.max(attacker.hp-totalDamage, 0);

        // Mettre à jour les cartes
        yourPlayerCard.querySelector(".character-card__hp").innerHTML = `<div>❤️ Vitality :</div> <div>${attacker.hp}</div>`;

        const hpBar = yourPlayerCard.querySelector(".character-card__hp-bar-bg-green");
        const hpPercentage = (attacker.hp/100) * 100;
        hpBar.style.width = `${hpPercentage}%`;

        // Mettre à jour les dialogues
        if (totalDamage === 0) {
            const randomTxtMsg = tabMissMessagesYourEnnemy[Math.floor(Math.random()*tabMissMessagesYourEnnemy.length)];
            yourEnnemyDialog.innerHTML = `<div>${randomTxtMsg}</div>`;

        } else {
            yourEnnemyDialog.innerHTML = `<div><span class="highlight">${defender.name}</span> &nbsp; attaque <span class="highlight-blue">${attacker.name}</span> &nbsp; et inflige ${totalDamage} points de dégâts. </div>`;
            if (isCritical && totalDamage > 0) {
                const divYourEnnemyCritical = document.createElement("div");
                divYourEnnemyCritical.className = "your-ennemy__critical critical"
                divYourEnnemyCritical.innerHTML = "Coup critique X2 !!!"
                arena.append(divYourEnnemyCritical);

                setTimeout(() => {
                    arena.prepend(divYourEnnemyCritical);
                }, 2000)
            }
        }

        // Faire disparaitre le message
        setTimeout(()=> {
            yourEnnemyDialog.innerHTML = "";
        }, 2000);
    }
    magicAttack(attacker, defender) {
        if (attacker.mana < 20) {
            yourPlayerDialog.innerHTML = `<div>Je suis à cours de mana...mais il me reste la force physique !</div>`;
            return
        }

        // Calculer dégat
        let damage = parseFloat((attacker.strength * Math.random()).toFixed());
        let isCritical = Math.random() < 0.2;
        let criticalIndex = isCritical ? 2 : 1;
        let totalDamage = damage * criticalIndex;

        defender.hp = Math.max(defender.hp-totalDamage, 0);
        attacker.mana -= 20;

        // Mettre à jour les cartes
        yourEnnemyCard.querySelector(".character-card__hp").innerHTML = `<div>❤️ Vitality :</div> <div>${defender.hp}</div>`;

        const hpBar = yourEnnemyCard.querySelector(".character-card__hp-bar-bg-green");
        const hpPercentage = (defender.hp / 100) * 100;
        hpBar.style.width = `${hpPercentage}%`;

        yourPlayerCard.querySelector(".character-card__mana").innerHTML = `<div>🔮 Mana :</div> <div>${attacker.mana}</div>`;

        // Mettre à jour les dialogues
        if (totalDamage === 0) {
            const randomTxtMsg = tabMissMessagesYourPlayer[Math.floor(Math.random()*tabMissMessagesYourPlayer.length)];
            yourPlayerDialog.innerHTML = `<div>${randomTxtMsg}</div>`;

        } else {
            yourPlayerDialog.innerHTML = `<div><span class="highlight-blue">${attacker.name}</span>&nbsp; attaque &nbsp; <span class="highlight">${defender.name}</span>&nbsp; et inflige ${totalDamage} points de dégâts.</div> `
            if (isCritical && totalDamage > 0) {
                const divYourPlayerCritical = document.createElement("div");
                divYourPlayerCritical.className = "your-player__critical critical"
                divYourPlayerCritical.innerHTML = "Coup critique X2 !!!"
                arena.append(divYourPlayerCritical);
                setTimeout(() => {
                    arena.prepend(divYourPlayerCritical);
                }, 2000)
            }
        }
        
        // Faire disparaitre le message
        setTimeout(()=> {
            yourPlayerDialog.innerHTML = "";
        }, 2000);

        // Vérifier si le défenseur a besoin de prendre une potion
        if (defender.hp < 50 && defender.potions > 0) {
            defender.takeAPotion(false);
        }
    }
    counterMagicAttack(attacker, defender) {
        if (defender.mana < 20) {
            yourEnnemyDialog.innerHTML = `<div>Oh non ! Mes pouvoirs m'abandonnent !</div>`;
            return
        }

        // Calculer dégat
        let damage = parseFloat((defender.strength * Math.random()).toFixed());
        let isCritical = Math.random() < 0.2;
        let criticalIndex = isCritical ? 2 : 1;
        let totalDamage = damage * criticalIndex;

        attacker.hp = Math.max(attacker.hp-totalDamage, 0);
        defender.mana -= 20;
        
        // Mettre à jour les cartes
        yourPlayerCard.querySelector(".character-card__hp").innerHTML = `<div>❤️ Vitality :</div> <div>${attacker.hp}</div>`;

        const hpBar = yourPlayerCard.querySelector(".character-card__hp-bar-bg-green");
        const hpPercentage = (attacker.hp/100)*100;
        hpBar.style.width = `${hpPercentage}%`;

        yourEnnemyCard.querySelector(".character-card__mana").innerHTML = `<div>🔮 Mana :</div> <div>${defender.mana}</div>`;

        // Mettre à jour les dialogues
        if (totalDamage === 0) {
            const randomTxtMsg = tabMissMessagesYourEnnemy[Math.floor(Math.random()*tabMissMessagesYourEnnemy.length)];
            yourEnnemyDialog.innerHTML = `<div>${randomTxtMsg}</div>`;

        } else {
            yourEnnemyDialog.innerHTML = `<div><span class="highlight">${defender.name}</span> &nbsp; attaque <span class="highlight-blue">${attacker.name}</span> &nbsp; et inflige ${totalDamage} points de dégâts.</div> `;
            if (isCritical && totalDamage > 0) {
                const divYourEnnemyCritical = document.createElement("div");
                divYourEnnemyCritical.className = "your-ennemy__critical critical"
                divYourEnnemyCritical.innerHTML = "Coup critique X2 !!!"
                arena.append(divYourEnnemyCritical);

                setTimeout(() => {
                    arena.prepend(divYourEnnemyCritical);
                }, 2000)
            }
        }
        

        // Faire disparaitre le message
        setTimeout(()=> {
            yourEnnemyDialog.innerHTML = "";
        }, 2000);
    }
    takeAPotion(isAttacker) {

        if (isAttacker && this.potions > 0) {
            this.potions -= 1;
            this.hp = Math.min(this.hp + 30, 100);
            
            // Mettre à jour les cartes l'attacker
            yourPlayerCard.querySelector(".character-card__potions").innerHTML = `<div>🧉 Potions :</div> ${this.potions}`;
            yourPlayerCard.querySelector(".character-card__hp").innerHTML = `<div>❤️ Vitality :</div> ${this.hp}`;
            const hpBar = yourPlayerCard.querySelector(".character-card__hp-bar-bg-green");
            const hpPercentage = (this.hp/100)*100;
            hpBar.style.width = `${hpPercentage}%`;

        } else if (!isAttacker && this.potions > 0) {
            this.potions -= 1;
            this.hp = Math.min(this.hp + 30, 100);

            // Mettre à jour les cartes pour le defender
            yourEnnemyCard.querySelector(".character-card__potions").innerHTML = `<div>🧉 Potions :</div> ${this.potions}`;
            yourEnnemyCard.querySelector(".character-card__hp").innerHTML = `<div>❤️ Vitality :</div> ${this.hp}`;
            const hpBar = yourEnnemyCard.querySelector(".character-card__hp-bar-bg-green");
            const hpPercentage = (this.hp / 100) * 100;
            hpBar.style.width = `${hpPercentage}%`;
        }
    }
}
// Construire une nouvelle carte personnage
function addKnight(name, strength, magic, mana, potions, hp) {
    if (name === "") {
        alert("Veuillez remplir les champs");
        return;
    }

    // Vérifier si un Knight avec le même nom existe déjà
    const knightExists = knights.some(knight => knight.name === name);
    if (knightExists) {
        alert("A hero with that name already exists!");
        return;
    }

    const newKnight = new Knight(name, strength, magic, mana, potions, hp);
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

            console.log("HP in display:", knight.hp);
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
        
    } else if (selectClass.value === "battlemage") {
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
        divClassScoreStrength.innerHTML     = "+3";
        divClassInfoIntelligence.innerHTML  = "Intelligence";
        divClassScoreIntelligence.innerHTML = "+3";
        divClassInfoConstitution.innerHTML  = "Constitution";
        divClassScoreConstitution.innerHTML = "+10";

        // Insertion des balises dans le container class-character-info
        tagListClass.append(divClassInfoStrength);
        tagListClass.append(divClassScoreStrength);
        tagListClass.append(divClassInfoIntelligence);
        tagListClass.append(divClassScoreIntelligence);
        tagListClass.append(divClassInfoConstitution);
        tagListClass.append(divClassScoreConstitution);
    } else if (selectClass.value === "cleric") {
        // Créer mes éléments
        const divClassInfoStrength          = document.createElement("p");
        const divClassScoreStrength         = document.createElement("div");
        const divClassInfoIntelligence      = document.createElement("p");
        const divClassScoreIntelligence     = document.createElement("div");
        const divClassInfoConstitution      = document.createElement("p");
        const divClassScoreConstitution     = document.createElement("div");
        const divClassInfoPotions           = document.createElement("p");
        const divClassScorePotions          = document.createElement("div");

        // Ajouter une classe
        divClassInfoStrength.className      = "info-strength";
        divClassScoreStrength.className     = "score-strength";
        divClassInfoIntelligence.className  = "info-intelligence";
        divClassScoreIntelligence.className = "score-intelligence";
        divClassInfoConstitution.className  = "info-constitution";
        divClassScoreConstitution.className = "score-constitution";
        divClassInfoPotions.className       = "info-potions"
        divClassScorePotions.className      = "score-potions"

        // Insertion contenu
        divClassInfoStrength.innerHTML      = "Strength:";
        divClassScoreStrength.innerHTML     = "+3";
        divClassInfoIntelligence.innerHTML  = "Intelligence";
        divClassScoreIntelligence.innerHTML = "+3";
        divClassInfoConstitution.innerHTML  = "Constitution";
        divClassScoreConstitution.innerHTML = "+0";
        divClassInfoPotions.innerHTML       = "Potions"
        divClassScorePotions.innerHTML      = "+2"

        // Insertion des balises dans le container class-character-info
        tagListClass.append(divClassInfoStrength);
        tagListClass.append(divClassScoreStrength);
        tagListClass.append(divClassInfoIntelligence);
        tagListClass.append(divClassScoreIntelligence);
        tagListClass.append(divClassInfoConstitution);
        tagListClass.append(divClassScoreConstitution);
        tagListClass.append(divClassInfoPotions);
        tagListClass.append(divClassScorePotions);

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
    const hpPercentage = Math.min((knight.hp / 100) * 100, 100);
    
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

                // Dialogue fin de partie
                setTimeout(()=>{
                   yourEnnemyDialog.innerHTML = `<div>NOOOooon ! La victoire était à moi !</div>`;
                }, 1000)
                setTimeout(()=>{
                    yourPlayerDialog.innerHTML = `<div>Le jour de ma défaite, as-tu dit? Tu t'es trompé lourdement.</div>`;
                }, 3000)
                setTimeout(() => {
                    yourEnnemyDialog.innerHTML += `<div>&nbsp; Ah, je meurs...</div>`;
                }, 5000)

            } else if (attacker.hp < 1) {
                confirm("GAME OVER")

                // Dialogue fin de partie
                setTimeout(()=>{
                    yourEnnemyDialog.innerHTML = `<div>Tu n'as rien pu faire face à ma toute puissance !</div>`;
                }, 1000)
                setTimeout(()=>{
                    yourPlayerDialog.innerHTML = `<div>Espèce de gredin !</div>`
                }, 3000)
                setTimeout(() => {
                    yourEnnemyDialog.innerHTML += `<div>&nbsp; Meurs, mécréant !</div>`;
                }, 5000)

            } else {
                // Timer avant la contreattaque
                setTimeout(()=> {
                    attacker.counterAttack(attacker, defender);
                }, 1000);
                
            }
        }

    } else if (selectAttackType.value === "magic") {
        // alert("Not available yet !")
        if (attacker && defender) {
        attacker.magicAttack(attacker, defender);

            if (defender.hp < 1) {
                confirm("VICTORY")

                // Dialogue fin de partie
                setTimeout(()=>{
                   yourEnnemyDialog.innerHTML = `<div>NOOOooon ! La victoire était à moi !</div>`;
                }, 1000)
                setTimeout(()=>{
                    yourPlayerDialog.innerHTML = `<div>Le jour de ma défaite, as-tu dit? Tu t'es trompé lourdement.</div>`;
                }, 3000)
                setTimeout(() => {
                    yourEnnemyDialog.innerHTML += `<div>&nbsp; Ah, je meurs...</div>`;
                }, 5000)

            } else if (attacker.hp < 1) {
                confirm("GAME OVER")

                // Dialogue fin de partie
                setTimeout(()=>{
                    yourEnnemyDialog.innerHTML = `<div>Tu n'as rien pu faire face à ma toute puissance !</div>`;
                }, 1000)
                setTimeout(()=>{
                    yourPlayerDialog.innerHTML = `<div>Espèce de gredin !</div>`
                }, 3000)
                setTimeout(() => {
                    yourEnnemyDialog.innerHTML += `<div>&nbsp; Meurs, mécréant !</div>`;
                }, 5000)

            } else {
                // Timer avant la contreattaque
                setTimeout(()=> {
                    attacker.counterMagicAttack(attacker, defender);
                }, 1000);
            }
        }

    } else {
        alert("Please, select an attack and win this fight...")
    }
}

// ==== Evénements ====
// ~~~~ Hero creation ~~~~
addBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (selectClass.value === "warrior") {
        const name      = inputname.value;
        let strength    = 15;
        let magic       = 9;
        let mana        = 40;
        let potions     = 2;
        let hp          = 120;

        addKnight(name, strength, magic, mana, potions, hp);
        displayKnights();
        resetInputs();     
    } else if (selectClass.value === "mage") {
        const name      = inputname.value;
        let strength    = 9;
        let magic       = 15;
        let mana        = 60;
        let potions     = 2;
        let hp          = 100;

        addKnight(name, strength, magic, mana, potions, hp);
        displayKnights();
        resetInputs();      
    } else if (selectClass.value === "battlemage")    {
        const name      = inputname.value;
        let strength    = 13;
        let magic       = 13;
        let mana        = 60;
        let potions     = 2;
        let hp          = 110;

        addKnight(name, strength, magic, mana, potions, hp);
        displayKnights();
        resetInputs();      
    } else if (selectClass.value === "cleric")    {
        const name      = inputname.value;
        let strength    = 13;
        let magic       = 13;
        let mana        = 40;
        let potions     = 4;
        let hp          = 100;

        addKnight(name, strength, magic, mana, potions, hp);
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
potionBtn.addEventListener("click", function (e) {
    e.preventDefault();
    
    // Récupérer les noms des personnages sélectionnés
    const attackerName = selectAttacker.value;
    const attacker = knights.find(knight => knight.name === attackerName);

    attacker.takeAPotion(true);
})


// todo: changer la dispo? faire une maquette
    // Refaire une base html et css solide
    // Permettre le choix des contre-attaques (magiques, phyisques ou spéciales)
    // Ajouter un Dexterity/Precision et armure (indice éviter, indice résister) pour améliorer les formules d'attaque
    // Créer des boss sélectionnables dans les defender avec des attaques spéciales
    // Créer des attaques spéciales limitées pour chaque classe + ajouter dans select (base 30; 0.5 chance de coup critique)
    // Mieux gérer la barre de vie et la vitality (hp/totalHp + barre de vie devant?
    // Créer une animation combat (strength & magic)? => une autre fois peut-être
    // Enable combat 3 héros vs 1 super boss (hp*2, chance de coup critique ↗️, 2 spéciales)
    // Améliorer l'interface utilisateur

    // ? Classe: Base de 10 points de stats, mana 40, potions 2
    // ==== Warrior ====
    // const warrior = {
    //  strength: "+5",
    //  magic: "-1",
    //  mana: "0",
    //  hp: "+20",
    //  armour: "5",
    //  dexterity: "0",
    //  potions: "0",
    //  special: "30"
    // };
    //* HpBar
    //* HpMana
    //* Nom de la spéciale: "Overpower"
    // ==== Mage ====
    // const mage = {
    //  strength: "-1",
    //  magic: "+5",
    //  mana: "+60",
    //  hp: "0",
    //  armour: "0",
    //  dexterity: "5",
    //  potions: "0",
    //  special: "30"
    // };
    //* HpBar
    //* HpMana
    //* Nom de la spéciale: "Dragon's blaze"
    // ==== Battlemage ====
    // const battlemage = {
    //  strength: "+3",
    //  magic: "+3",
    //  mana: "+20",
    //  hp: "+10",
    //  armour: "3",
    //  dexterity: "2",
    //  potions: "0",
    //  special: "30"
    // };
    //* HpBar
    //* HpMana
    //* Nom de la spéciale: "Divine sword"
    // ==== Cleric ====
    // const cleric = {
    //  strength: "+3",
    //  magic: "+3",
    //  mana: "0",
    //  hp: "0",
    //  armour: "2",
    //  dexterity: "3",
    //  potions: "+2",
    //  special: "30"
    // };
    //* HpBar
    //* HpMana
    //* Nom de la spéciale: "Absolution"

    // ? Boss
    // ==== Boss1 : Norbert le preu (class Cleric) ====
    // const clericBoss = {
    //  strength: "+5",
    //  magic: "+5",
    //  mana: "+40",
    //  hp: "+100",
    //  armour: "2",
    //  dexterity: "+3",
    //  potions: "+2",
    //  special: "30"
    // };
    //* HpBar
    //* HpMana
    //* Nom de la spéciale: "Absolution"
    //* Nom de la spéciale: "Palm of heaven, destroyer of hell"
    // ==== Boss2 : Haki (class warrior)
    // const warriorBoss = {
    //  strength: "+10",
    //  magic: "0",
    //  mana: "0",
    //  hp: "+120",
    //  armour: "5",
    //  dexterity: "0",
    //  potions: "0",
    //  special: "30"
    // };
    //* HpBar
    //* HpMana
    //* Nom de la spéciale: "Overpower"
    //* Nom de la spéciale: "Wind sword"
    // ==== Boss3 : Zuwyn (class mage) ====
    // const mageBoss = {
    //  strength: "0",
    //  magic: "+10",
    //  mana: "+100",
    //  hp: "+100",
    //  armour: "0",
    //  dexterity: "5",
    //  potions: "0",
    //  special: "30"
    // };
    //* HpBar
    //* HpMana
    //* Nom de la spéciale: "Dragon's blaze"
    //* Nom de la spéciale: "Ice storm"