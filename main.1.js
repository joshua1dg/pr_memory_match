$(document).ready(() => {new initializer()});

class initializer{

        //WHY DID IT NOT WORK WHEN CONST EQUALED TO CARD WITH A CAPITAL C
    constructor() {
        this.card = new Card();
        this.card.renderCardsNewGame();

        this.gameLogic = new GameLogic();
        this.media = new Media();

        this.clickHandlers();
        this.handleGameStart();

        this.backgroundMusic = null;
    };


    clickHandlers() {
        $('.card-container').on('click', '.singleCardDiv', (event) => {
            this.handleCardClick(event)});

        $('.headerResetButton').on('click', this.handleReset);

        $('.card-container').on('click', '.video-cut-scene', this.media.removeVideoObject)
    };

    handleCardClick(event) {
        this.gameLogic.cardShow(event);
        console.log('this is the event: ', event.currentTarget.attributes.cardName.value);
        this.media.playAudio(event.currentTarget.attributes.cardName.value);


        if (this.gameLogic.firstCardEventInSequence !== null && this.gameLogic.secondCardEventInSequence !== null) {
            $('.card-container *').addClass('disableClick');
            setTimeout(() => {
                const cardMatch = this.gameLogic.cardMatchCheck();
                $('.card-container *').removeClass('disableClick');
                this.handleStats();
                this.handleHealth(cardMatch);
                if(this.gameLogic.matches === 1){
                    this.handleEndGame('youWin');
                }
            }, 2000);
            this.gameLogic.attempts += 1;
        }
    }

    handleStats(accuracy=null){
        if (accuracy !== null){
            $('.accuracy').text(`Accuracy: ${accuracy}%`);
        } else{
            $('.accuracy').text(`Accuracy: ${((this.gameLogic.matches / this.gameLogic.attempts) * 100).toFixed(2) + '%'}`);
        }
        $('.attempts').text(`Attempts: ${this.gameLogic.attempts}`);

    }

    handleHealth(cardMatchResult){
        const currentHealth = this.gameLogic.healthModifier(cardMatchResult);
        this.gameLogic.lifeBarIconMover(currentHealth);
        if (currentHealth === 0){
            this.handleEndGame('youLose');
        }
    }

    handleGameStart(){
        const introVid = this.media.createVideoObj('lordZeddIntroVid');
        this.media.playVideo();
        this.media.playAudio('gameAudio', .4);
    }

    handleReset = () => {
        this.gameLogic.resetLogic();
        this.handleStats(100);
        this.handleHealth();
        this.card.resetCards();
    }

    handleEndGame(videoToShow){
        this.media.createVideoObj(videoToShow);
        this.media.playVideo();
    }


}

