class Media{
    playAudio(fileName, volume=1){
        var audio = new Audio(`./media/audio/${fileName}.mp3`);
        audio.volume = volume;
        return audio.play();
    };

}