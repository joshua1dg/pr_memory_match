class Card{
    constructor(){
    this.availableCardNamesArray = ['blackRanger', 'blueRanger', 'dragonzord', 'greenRanger', 'megazord', 'pinkRanger',
    'redRanger', 'whiteRanger', 'yellowRanger'];
    };

    cardDuplicator(){
        const originalArrayLength = this.availableCardNamesArray.length;

        for (let cardArrayIndex = 0; cardArrayIndex <= originalArrayLength - 1; cardArrayIndex++) {
            this.availableCardNamesArray.push(this.availableCardNamesArray[cardArrayIndex]);
        }    

    }

    cardShuffler(){
        const array = this.availableCardNamesArray;
        for (let arrayIndex = array.length - 1; arrayIndex > 0; arrayIndex--) {
            const randomCardIndex = Math.floor(Math.random() * (arrayIndex + 1));
            [array[arrayIndex], array[randomCardIndex]] = [array[randomCardIndex], array[arrayIndex]];
        }
    }

    loadCardsOnDom(){
        this.availableCardNamesArray.map((cardName) => {
            const singleCardContainer = $('<div>').addClass('singleCardDiv').attr('cardName', cardName);
            const cardBackDomElement = $('<img>', { src: './media/cardImages/cardBack.png' }).addClass('cardBack');
            const cardFrontDomElement = $('<img>', { src: `./media/cardImages/${cardName}.jpg` }).addClass('cardFront');
            const fullCardElement = singleCardContainer.append(cardBackDomElement, cardFrontDomElement);
            $('.card-container').append(fullCardElement);
        })
    }

    renderCardsNewGame(){
        this.cardDuplicator();
        this.cardShuffler();
        this.loadCardsOnDom();
    }

    resetCards(){
        $('.card-container').empty();
        this.cardShuffler();
        this.loadCardsOnDom();
    }

}