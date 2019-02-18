class GameLogic{

    constructor(){
        this.firstCardEventInSequence = null;
        this.secondCardEventInSequence = null;
        this.matches = 0;
        this.health = 100;
        this.attempts = 0;
    }


    cardShow(selectedCardEvent){
        console.log('full event: ', selectedCardEvent);
        console.log('front of card event: ', selectedCardEvent.currentTarget.parentElement);
        if(event.target.className === 'cardBack'){
            $(selectedCardEvent.target).addClass('hide');
            if (this.firstCardEventInSequence === null){
                this.firstCardEventInSequence = selectedCardEvent;
            } else{
                this.secondCardEventInSequence = selectedCardEvent;
            }
        } 
    }

    cardMatchCheck(){
        let match = false;
        const firstCardValue = this.firstCardEventInSequence.currentTarget.attributes.cardName.value;
        const secondCardValue = this.secondCardEventInSequence.currentTarget.attributes.cardName.value;
        if (firstCardValue !== secondCardValue){
            $(this.firstCardEventInSequence.target).removeClass('hide');
            $(this.secondCardEventInSequence.target).removeClass('hide');
        } else{
            this.matches += 1;
            match = true;
        }

        this.firstCardEventInSequence = null;
        this.secondCardEventInSequence = null;

        return match;
    };

    healthModifier(matchResults=true, health = this.health){
        if (!matchResults){
            health -= 10;
        }
        this.health = health;
        return health;
    }

    lifeBarIconMover(currentHealth){
        console.log('current health: ', currentHealth);
        $('.life-left').css('width', currentHealth+'%');
    }

    resetLogic(){
        this.firstCardEventInSequence = null;
        this.secondCardEventInSequence = null;
        this.matches = 0;
        this.health = 100;
        this.attempts = 0;

    }

}