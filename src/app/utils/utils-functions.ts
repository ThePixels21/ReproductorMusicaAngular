import { ISong } from "../models/ISong";

export class Functions{

    static getSongIds(songs: ISong[]) {
        return songs.map(song => song.id);
    }
    
}
