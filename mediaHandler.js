class Media{
    playAudio(fileName, volume=1, loop=false){
        var audio = new Audio(`./media/audio/${fileName}.mp3`);
        audio.volume = volume;
        audio.loop = loop;
        audio.play();
        return audio;
    };

    createVideoObj(fileName){
        const videoElement = $('<video>').attr({
            class: 'video-cut-scene',
            id: fileName,
            src: `media/video/${fileName}.mov`
        });

        $('.game-container').prepend(videoElement);

        return videoElement;
    }

    playVideo(){
        const videoElement = $('.video-cut-scene');
        videoElement[0].play();
    }

    removeVideoObject(){
        $('.video-cut-scene').remove();
    }


}