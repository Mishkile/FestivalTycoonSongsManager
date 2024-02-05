// u_[genre ID]_[song ID]_[length]-[text]
class Song {
    constructor(
        public id: number,
        public genre: number,
        public length: number,
        public text: string
    ) {
        this.id = id;
        this.genre = genre;
        this.length = length;
        this.text = text;
    }

    returnSongData() {
        return `u_${this.genre}_${this.id}_${this.length}-${this.text}`;
    }
}