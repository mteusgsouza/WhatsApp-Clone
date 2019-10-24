class Format {

    static getCamelCase(text) {
        //recebe as ids, formata e retorna como elemetos que apotam para a id correspondente 
        let div = document.createElement('div');

        div.innerHTML = `<div data-${text}="id"></div>`;

        return Object.keys(div.firstChild.dataset)[0];
        

    }

    static toTime(duration) {
        //formata a duração da gravação de áudio
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 60);

        if (hours > 0) {
            return `${hours}:${minutes}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }

}