$(document).ready(initializer);


var firstFlipped = null;
var secondFlipped = null;

var currentHealth = 100;
var booleanGuessedMatch = false;

var gamesPlayed = 0;
var attempts = 0;
var correctMatches = 0;
var accuracy = 0;

// var soundOption = null;


function initializer(){
    // var soundOption = confirm('Would you like to run the game with audio?');
    // console.log(soundOption)
    // if (soundOption){
    //     var initialAudio = new Audio('media/startPageMusic.mp3');
    //     initialAudio.play();
    // }

    $('.start-button').click(gameSetUp);
    $('#videoBackground').playbackRate = 0.5;
    $('.card').click(cardFlips);
};

function gameSetUp(){
    $('.start-screen').addClass('hide');
    // setTimeout(function(){addStartVideo}, 10000);

    $('.picOverVideo').removeClass('hide');
    $('.videoOverlay').removeClass('hide');
    $('.header-container').removeClass('hide');
    $('.stats-container').removeClass('hide');

    //giving game-area the class of hide does not work, must be in ID????
    $('#game-area').removeClass('hide');
    $('.villan-container').removeClass('hide')
    $('.health-bar').removeClass('hide')

    var gameAudio = new Audio('media/audio/gameAudio.mp3');
    gameAudio.volume = 0.35;
    gameAudio.play();
    gameAudio.loop = true;
}

function cardFlips(event){
    console.log(event);

    if (firstFlipped === null){
        console.log('made it to first flip');
        firstFlipped = $(event.currentTarget);
        selectedAudio(findNameOfCard(firstFlipped));
        $(firstFlipped).find('.back').addClass('hide');
    }else if (secondFlipped === null){
        console.log('made it to second flip');
        secondFlipped = $(event.currentTarget);
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

    console.log(frontCardOneName);
    console.log(frontCardTwoName);

    if (frontCardOneName !== frontCardTwoName){
        $(firstFlipped).find('.back').removeClass('hide');
        $(secondFlipped).find('.back').removeClass('hide');
        console.log('THEY ARE NOT EQUAL')
        booleanGuessedMatch = false;
        attempts += 1;
    }

    else{
        // $(event.Target).addClass('hide')
        console.log('THEY ARE EQUIVALENT')
        booleanGuessedMatch = true;
        attempts += 1;
        correctMatches +=1;
    }

    firstFlipped = null;
    secondFlipped = null;
    console.log('correct Matches: ', correctMatches, 'attempts: ', attempts)
    var numAccuracy = (correctMatches/attempts)*100;
    accuracy = numAccuracy.toFixed(0)+'%';
    healthModifier();
    statsDisplayer();
}

function healthModifier(){
    if (!booleanGuessedMatch){
        currentHealth -= 20;
        if (currentHealth == 80 || currentHealth == 80 || currentHealth == 40){
            selectedAudio('lordZeddLaugh');
        }
        if (currentHealth == 0){
            console.log('YOU DIED - LORD ZEDD BEAT YO ASS')
        }
        console.log('current health: ', currentHealth)
    }
}

function statsDisplayer(){
    $('.games-played > .value').text('0');
    $('.attempts > .value').text(attempts);
    $('.accuracy > .value').text(accuracy);
}

// function addStartVideo(){
//     var videoIntro = $('<video>', {
//         id: 'video',
//         src: 'media/video/lordZeddIntroVid.mov',
//         type: 'video/mp4',
//     });
//     $('#zeddStartVideoContainer').append(videoIntro);
// }

function selectedAudio(audioFileName){
    var audioMatchedToCard = new Audio(`media/audio/${audioFileName}.mp3`);
    audioMatchedToCard.play();


}

// $(event.currentTarget).addClass('hide');


//transofrm, translate, rotate, 180