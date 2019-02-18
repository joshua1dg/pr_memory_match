class Media{
    playAudio(fileName, volume=1){
        var audio = new Audio(`./media/audio/${fileName}.mp3`);
        audio.volume = volume;
        return audio.play();
    };

    createVideoObj(fileName){
        const videoElement = $('<video>').attr({
            class: 'video-cut-scene',
            id: fileName,
            src: `media/video/${fileName}.mov`
        });

        $('.card-container').append(videoElement);

    }

    playVideo(){
        $('.video-cut-scene')[0].play();
    }

    removeVideoObject(){
        $('.video-cut-scene').remove();
    }
}