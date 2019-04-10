$(document).ready(() => {
    new initializer()
});

class initializer{

    constructor() {
        this.card = new Card();
        this.card.renderCardsNewGame();

        this.gameLogic = new GameLogic();
        this.media = new Media();

        this.clickHandlers();
        this.handleStartPage();

        this.backgroundMusic = null;

    };


    clickHandlers() {

        $('.card-container').on('click', '.singleCardDiv', (event) => {
            this.handleCardClick(event)});

        $('.headerResetButton').on('click', this.handleReset);

        $('.game-container').on('click', '.video-cut-scene', () => {
            this.media.removeVideoObject();
            this.backgroundMusic = this.media.playAudio('gameAudio', .4, true);
        })

        $('.instructions>button').on('click', () => {
            $('.instructions').remove();
            $('.card-container').removeClass('disableClick');
            this.media.playAudio('lordZeddAudioOnStart');
        })

        $('.end-game-info-container > button').on('click', () => {
            $('.end-game-info-container').addClass('hide');
            $('.card-container').removeClass('disableClick');
            this.handleReset();
        })


    };

    handleStartPage(){
        const music = this.media.playAudio('startPageMusic', 1, true);

        $('.start-button').on('click tapend', () => {
            $('.start-screen').remove();
            music.pause();
            this.handleGameStart();
        })
    };

    handleCardClick(event) {
        $(event.currentTarget).addClass('disableClick');
        this.gameLogic.cardShow(event);
        this.media.playAudio(event.currentTarget.attributes.cardName.value);


        if (this.gameLogic.firstCardEventInSequence !== null && this.gameLogic.secondCardEventInSequence !== null) {
            $('.card-container *').addClass('disableClick');
            setTimeout(() => {
                const cardMatch = this.gameLogic.cardMatchCheck();
                $('.card-container *').removeClass('disableClick');
                this.handleStats();
                this.handleHealth(cardMatch);
                if(this.gameLogic.matches === 9){
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
        } else if (currentHealth % 30 === 0) {
            this.media.playAudio('lordZeddLaugh');
        }
    }

    handleGameStart(){
        $('.card-container').addClass('disableClick');
        const videoElement = this.media.createVideoObj('lordZeddIntroVid');
        this.media.playVideo();
        videoElement.on('ended', () => {
            videoElement.remove();
            this.backgroundMusic = this.media.playAudio('gameAudio', .4, true);
            this.media.playAudio('zordon');
        })
    }

    handleReset = () => {
        if(this.backgroundMusic !== null){
            this.backgroundMusic.pause()
            this.backgroundMusic.currentTime = 0;
        } else{
            this.backgroundMusic = this.media.playAudio('gameAudio', .4, true);
        }

        this.media.removeVideoObject();
        this.gameLogic.resetLogic();
        this.handleStats(100);
        this.handleHealth();
        this.card.resetCards();
        this.backgroundMusic.play();
        this.media.playAudio('lordZeddAudioOnStart');
    }

    handleEndGame(videoToShow){
        $('.card-container *').addClass('disableClick');

        const videoElement = this.media.createVideoObj(videoToShow);
        this.media.playVideo();
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;

        $('.end-game-info-container').removeClass('hide');

        if (videoToShow === 'youWin'){
            $('.result-of-game-text').text('You Win! Play Again?');
            $('.end-game-logo').attr('src', '/media/miscImages/youWinImage.png');
        } else{
            $('.result-of-game-text').text('You Lose! Try Again?');
            $('.end-game-logo').attr('src', '/media/miscImages/youLoseImage.png');
        }

        videoElement.on('ended', () => {
            videoElement.remove();
            this.backgroundMusic = this.media.playAudio('gameAudio', .4, true);

        })
    }


}

