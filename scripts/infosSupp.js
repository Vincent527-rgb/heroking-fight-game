//! Simplifier la prise des potions - solutions Olivier

// takeAPotion(isAttacker) {
//     if (this.potions > 0) {
//         this.potions -= 1;
//         this.hp = Math.min(this.hp + 30, 100);
//         this.updateCard(isAttacker, this);
//     }
// }

// updateCard(isAttacker, knight) {
//     const card = isAttacker ? yourPlayerCard : yourEnnemyCard;

//     card.querySelector(".character-card__potions").innerHTML = `<div>🧉 Potions :</div> ${knight.potions}`;
//     card.querySelector(".character-card__hp").innerHTML = `<div>❤️ Vitality :</div> ${knight.hp}`;
    
//     const hpBar = card.querySelector(".character-card__hp-bar-bg-green");
//     const hpPercentage = (knight.hp / 100) * 100;
//     hpBar.style.width = `${hpPercentage}%`;
// }

// ! Simplifier la création d'éléments
// ---- Fonction utilitaire pour créer un élément DOM
// function createElement(tag, className, content) {
//     const element = document.createElement(tag);
//     if (className) {
//         element.className = className;
//     }
//     if (content) {
//         element.innerHTML = content;
//     }
//     return element;
// }

// ---- Fonction utilitaire pour append un élément à un parent
// function appendElement(parent, child) {
//     parent.append(child);
// }

// function displayKnights() {
//     tagListPlayer.innerHTML = "";

//     if (knights.length === 0) {
//         const emptyMessage = createElement("div", "character-card", "No player logged in.");
//         appendElement(tagListPlayer, emptyMessage);
//     } else {
//         knights.forEach((knight, index) => {
//             const divListCharacter = createElement("div", "character-card");

//             //? Tableau des propriétés du chevalier et leurs icônes
//             const properties = [
//                 { name: "name", icon: "", value: knight.name },
//                 { name: "strength", icon: "💪", label: "Strength", value: knight.strength },
//                 { name: "magic", icon: "✨", label: "Intelligence", value: knight.magic },
//                 { name: "mana", icon: "🔮", label: "Mana", value: knight.mana },
//                 { name: "hp", icon: "❤️", label: "Vitality", value: knight.hp },
//                 { name: "potions", icon: "🧉", label: "Potions", value: knight.potions }
//             ];

//             //? Création et ajout des éléments pour chaque propriété
//             properties.forEach(prop => {
//                 const divCard = createElement("div", `character-card__${prop.name}`, prop.icon ? `<div>${prop.icon} ${prop.label} :</div> <div>${prop.value}</div>` : prop.value);
//                 appendElement(divListCharacter, divCard);
//             });

//             //? Création et ajout de la barre de vie
//             const divCardHpBar = createElement("div", "character-card__hp-bar");
//             const divCardHpBarGreen = createElement("div", "character-card__hp-bar-bg-green");
//             appendElement(divCardHpBar, divCardHpBarGreen);
//             appendElement(divListCharacter, divCardHpBar);

//             //? Création et ajout du bouton de suppression
//             const deleteBtn = createElement("button", "delete-btn", "❌");
//             deleteBtn.dataset.index = index;
//             deleteBtn.dataset.title = "Delete item";
//             appendElement(divListCharacter, deleteBtn);

//             appendElement(tagListPlayer, divListCharacter);
//         });
//     }
// }
