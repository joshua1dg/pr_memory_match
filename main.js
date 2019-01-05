$(document).ready(initializer);

//Cards Flipped
var firstFlipped = null;
var secondFlipped = null;
var cardsFlippedArray = [];
var cardsEventArray = [];


//Health Meter
var currentHealth = 100;
var booleanGuessedMatch = false;


//Stats
var gamesPlayed = 0;
var attempts = 0;
var correctMatches = 0;

var audioTrack = null;


function initializer(){
    cardCreation();

    $('.start-button').click(gameSetUp);
    $('#videoBackground').playbackRate = 0.5;
    $('.cardsContainer').on('click', '.card', cardFlips);
    $('.reset').click(gameReset);
    $('.end-game-button').click(gameReset);


};

function cardCreation(){
    var indivCardsArray = ['blackRanger', 'blueRanger', 'dragonzord', 'greenRanger', 'megazord', 'pinkRanger',
    'redRanger', 'whiteRanger', 'yellowRanger'];

    var duplicatedCardsArray = cardDuplicator(indivCardsArray);
    var shuffledCards = cardShuffler(duplicatedCardsArray);
    dynamicCardDisplayer(shuffledCards);

}

function cardDuplicator(cardsArray){
    var duplicatedCardsArray = [];
    for (var indivCardsArrayIndex = 0; indivCardsArrayIndex < cardsArray.length; indivCardsArrayIndex++){
        var indivCard = cardsArray[indivCardsArrayIndex];
        duplicatedCardsArray.push(indivCard);
        duplicatedCardsArray.push(indivCard);
    }
    return duplicatedCardsArray
}

function dynamicCardDisplayer(cardsArray){
    for (var indivCardsArrayIndex = 0; indivCardsArrayIndex < cardsArray.length; indivCardsArrayIndex++){
        var indivCard = cardsArray[indivCardsArrayIndex];
        var cardContainer = $('.cardsContainer');
        var cardDiv = $('<div>').addClass('card');
        var frontOfCardDiv = $('<div>').addClass('front').css('background-image', `url('media/cardImages/${indivCard}.jpg')`);
        var backOfCardDiv = $('<div>').addClass('back');

        var completeCardDiv = cardDiv.append(frontOfCardDiv).append(backOfCardDiv);

        cardContainer.prepend(completeCardDiv);
    }
}

function cardShuffler(cardsArray) {
    var currentArrayLength = cardsArray.length;
    var temporaryValue, randomIndex;

    while (0 !== currentArrayLength) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentArrayLength);
        currentArrayLength -= 1;

        // And swap it with the current element.
        temporaryValue = cardsArray[currentArrayLength];
        cardsArray[currentArrayLength] = cardsArray[randomIndex];
        cardsArray[randomIndex] = temporaryValue;
    }
    return cardsArray;
}

function gameSetUp(){

    $('.start-screen').addClass('hide');

    $('#intro-vid').removeClass('hide');
    var zeddIntroPlay = $('#intro-vid').click(afterInitialVideoSetup);
    zeddIntroPlay[0].play();
    zeddIntroPlay.on('ended', afterInitialVideoSetup);

    $('.game-area').removeClass('hide');
    $('.videoOverlay').removeClass('hide');
    $('.header-container').removeClass('hide');
    $('.left-column-container').removeClass('hide');

    $('.villan-container').removeClass('hide');
    // $('.health-bar').removeClass('hide');



}

function afterInitialVideoSetup(){
    console.log('afterInitialVideoSetup CAlled')

    $('#youLoseVideo').addClass('hide');
    $('#youWinVideo').addClass('hide');
    $('#intro-vid')[0].pause();
    $('#intro-vid').addClass('hide');
    $('.videoCutSceneContainer').addClass('hide');
    $('.picOverVideo').removeClass('hide');
    $('.cardsContainer').removeClass('hide');
    $('.stats-container').removeClass('hide');

    statsDisplayer();

    initialAudio();

    if (audioTrack === null){
        audioTrack = new Audio('media/audio/gameAudio.mp3');
        audioTrack.volume = 0.35;
        audioTrack.play();
        audioTrack.loop = true;
    }
}

function gameResultDisplayer(gameResult){
    $(`#${gameResult}Video`).removeClass('hide');
    var resultVideo = $(`#${gameResult}Video`);
    $(`#${gameResult}Video`)[0].load();
    var resultVideoPlay = resultVideo[0].play();
    resultVideo.volume = 0.1;
    beforeEndGameVideo(gameResult)
    $(`#${gameResult}Video`).click(
        function(){afterEndGameVideo(gameResult, resultVideo)});
    resultVideo.on('ended', function(){afterEndGameVideo(gameResult, resultVideo)});
}


function beforeEndGameVideo(gameResult){
    $('.game-area').removeClass('hide');
    $('.videoCutSceneContainer').removeClass('hide');
    $(`#${gameResult}Video`).removeClass('hide');
    $('#youWinVideo').removeClass('hide');
    $('#intro-vid').addClass('hide');
    $('.picOverVideo').addClass('hide');
    $('.cardsContainer').addClass('hide');

    $('.stats-container').addClass('hide');

    audioTrack.pause();
}

function afterEndGameVideo(gameResult, resultVideo){
    resultVideo[0].pause();
    $(`#${gameResult}Video`).addClass('hide');
    $('.videoCutSceneContainer').addClass('hide');
    audioTrack.play();

    $('.end-game-logo').attr('src', `media/${gameResult}Image.png`)
    $('.end-game-info-container').removeClass('hide');

    if (gameResult === 'youWin'){
        $('.result-of-game-text').text('You Won! Play Again?')
    }
    else{
        $('.result-of-game-text').text('You Lose! Play Again?')
    }

}


function cardFlips(event){
    var cardSelected = $(event.currentTarget);
    if (cardsFlippedArray.includes(findNameOfCard(cardSelected))){
        console.log('card is already open and matched')
        return;
    }else if (cardSelected.find('.back').hasClass('hide')){
        console.log('you chose the exact same card as before!')
        return;
    }

    cardsEventArray.push(cardSelected);

    if (firstFlipped === null){
        firstFlipped = cardSelected
        selectedAudio(findNameOfCard(firstFlipped));
        $(firstFlipped).find('.back').addClass('hide');
    }else if (secondFlipped === null){
        secondFlipped = cardSelected
        selectedAudio(findNameOfCard(secondFlipped));
        $(secondFlipped).find('.back').addClass('hide');
        setTimeout(function(){cardComparison(firstFlipped, secondFlipped)}, 1500);
    }

}

function findNameOfCard(card){
    var frontOfCardDiv = card.find('.front').attr('style');
    var frontCardName = frontOfCardDiv.slice(frontOfCardDiv.lastIndexOf('/')+1, frontOfCardDiv.lastIndexOf("."));
    return frontCardName;
}

function cardComparison(card1, card2){
    var frontCardOneName = findNameOfCard(card1);
    var frontCardTwoName = findNameOfCard(card2);

    if (frontCardOneName !== frontCardTwoName){
        $(firstFlipped).find('.back').removeClass('hide');
        $(secondFlipped).find('.back').removeClass('hide');
        console.log('THEY ARE NOT EQUAL')
        booleanGuessedMatch = false;
        attempts += 1;
    }

    else{
        console.log('THEY ARE EQUIVALENT')
        booleanGuessedMatch = true;
        attempts += 1;
        correctMatches +=1;
        cardsFlippedArray.push(frontCardOneName);
    }

    firstFlipped = null;
    secondFlipped = null;
    healthModifier();
    statsDisplayer();
}

function healthModifier(){
    if (!booleanGuessedMatch){
        currentHealth -= 10;
        if (currentHealth%20 == 0){
            selectedAudio('lordZeddLaugh');
        }
        if (currentHealth == 0){
            gameResultDisplayer('youLose');
        }
    }

    else if (correctMatches === 9){//9){
        console.log('You Won!');
        gameResultDisplayer('youWin');

    }
}

function statsDisplayer(){
    if (attempts === 0){
        $('.attempts > .value').text('0');
        $('.accuracy > .value').text('100%');
        $('.current-health > .value').text('100%');
        }else{
        $('.current-health > .value').text(currentHealth + '%');
        $('.attempts > .value').text(attempts);
        $('.accuracy > .value').text((correctMatches/attempts).toFixed(2)*100 + '%');
    }
}

function selectedAudio(audioFileName){
    var audioMatchedToCard = new Audio(`media/audio/${audioFileName}.mp3`);
    audioMatchedToCard.play();
}

function initialAudio(){
    var zeddIntroAudio = new Audio('media/audio/lordZeddAudioOnStart.mp3');

    zeddIntroAudio.play();
    zeddIntroAudio.addEventListener("ended", function() {
        setTimeout(function(){selectedAudio('zordon')}, 500);
    });
}


function gameReset(){
    console.log('gameResetCalled');

    for (var indivCardEventIndex = 0; indivCardEventIndex < cardsEventArray.length; indivCardEventIndex++){
        $(cardsEventArray[indivCardEventIndex]).find('.back').removeClass('hide');
    }

    $('.videoCutSceneContainer > .video-cut-scene').each(function(){
        var videoId = $(this).attr('id');
        console.log(videoId);
        $(`#${videoId}`)[0].pause();
    });
    audioTrack.pause();
    audioTrack.play();


    gamesPlayed += 1;
    attempts = 0;
    correctMatches = 0;
    currentHealth = 100;
    firstFlipped = null;
    secondFlipped = null;

    cardsFlippedArray = [];
    cardsEventArray = [];

    statsDisplayer();

    $('.cardsContainer > *').remove();
    cardCreation();

    $('.end-game-info-container').addClass('hide')

    afterInitialVideoSetup();
}


//make buttons look amazing