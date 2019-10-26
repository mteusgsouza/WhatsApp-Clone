class CameraController {

    constructor(videoEl) {
        this._videoEl = videoEl;

        navigator.mediaDevices.getUserMedia({
            //pede a permissão para usar a câmera
            video: true
        }).then(screenStream => {
            //recebe o video da camera e renderiza na tela
            this._screenStream = screenStream;
            this._videoEl.srcObject = screenStream;
            this._videoEl.play();
        }).catch(err => {
            console.error(err);
        });
    }
}