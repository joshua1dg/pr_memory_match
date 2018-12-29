$(document).ready(initializeGame);


var firstFlipped = null;
var secondFlipped = null;

var currentHealth = 100;
var booleanGuessedMatch = false;


function initializeGame(){
    $('#videoBackground').playbackRate = 0.5;
    $('.card').click(cardFlips);
};

function cardFlips(event){
    console.log(event);

    if (firstFlipped === null){
        console.log('made it to first flip');
        firstFlipped = $(event.currentTarget);
        $(firstFlipped).find('.back').addClass('hide');
    }else if (secondFlipped === null){
        console.log('made it to second flip');
        secondFlipped = $(event.currentTarget);
        $(secondFlipped).find('.back').addClass('hide');
        setTimeout(function(){cardComparison(firstFlipped, secondFlipped)}, 1500);

    }
}


function cardComparison(card1, card2){
    var frontOfCardOneDiv = card1.find('.front').attr('style');
    var frontOfCardTwoDiv = card2.find('.front').attr('style');

    var frontCardOneName = frontOfCardOneDiv.slice(frontOfCardOneDiv.lastIndexOf('/')+1, frontOfCardOneDiv.lastIndexOf("'"));
    var frontCardTwoName = frontOfCardTwoDiv.slice(frontOfCardTwoDiv.lastIndexOf('/')+1, frontOfCardTwoDiv.lastIndexOf("'"));

    console.log(frontCardOneName);
    console.log(frontCardTwoName);

    if (frontCardOneName !== frontCardTwoName){
        $(firstFlipped).find('.back').removeClass('hide');
        $(secondFlipped).find('.back').removeClass('hide');
        console.log('THEY ARE NOT EQUAL')
        booleanGuessedMatch = false;
    }

    else{
        // $(event.Target).addClass('hide')
        console.log('THEY ARE EQUIVALENT')
        booleanGuessedMatch = true;
    }

    firstFlipped = null;
    secondFlipped = null;
    healthModifier()
}

function healthModifier(){
    if (!booleanGuessedMatch){
        currentHealth -= 20;
        if (currentHealth == 0){
            console.log('YOU DIED - LORD ZEDD BEAT YO ASS')
        }
        console.log('current health: ', currentHealth)
    }
}


// $(event.currentTarget).addClass('hide');


//transofrm, translate, rotate, 180