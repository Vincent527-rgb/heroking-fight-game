// Simplifier la prise des potions - solutions Olivier

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