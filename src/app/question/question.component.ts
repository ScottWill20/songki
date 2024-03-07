import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import fetchFromSpotify, { request } from "../../services/api";
import { Howl } from 'howler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {


  @Input() playlists: any;
  @Output() passIsCorrectEvent = new EventEmitter<boolean>();
  
  token: any;
  correctSong: any;
  options!: any[];
  selectedOption: any;
  isCorrect: boolean = false;
  items: Object [] = [];
  previewURL: string ='';
  albumArtUrl: string='';
  isPlaying: boolean = false;
  song : Howl | null = null;
  seekPosition: number = 0;
  

  constructor( private router: Router) { }

  ngOnInit() {

    this.items = this.playlists.playlists.items;

    let t = localStorage.getItem('token')

    if(t){
      this.token = JSON.parse(t);
    }

    console.log(this.items);
    this.generateQuestion();
    if(!this.playlists){
      this.router.navigateByUrl('/')
    }
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pauseSong();
    } else {
      this.playSong();
    }
  }

  playSong() {
    if (!this.song) {
      this.song = new Howl({
        src: [this.previewURL],
        format: ['mp3'],
        volume: 0.1,
        preload: true,
        onend: () => {
          this.isPlaying = false;
        },
      });
    }

    this.song.seek(this.seekPosition);
    this.song.play();
    this.isPlaying = true;
  }

  pauseSong() {
    if (this.song) {
      this.seekPosition = this.song.seek(); 
      this.song.pause();
    }

    this.isPlaying = false;
  }


  checkAnswer() {
        if (this.selectedOption) {
      this.pauseSong();
    }
    this.isCorrect = this.selectedOption === this.correctSong;
  }

  passIsCorrect(isCorrect: boolean){
    this.passIsCorrectEvent.emit(isCorrect);
  }


async generateQuestion() {
  const randomPlaylist = this.getRandomPlaylist();

  if (randomPlaylist) {
    try {
      const playlistTracks = await fetchFromSpotify({
        token: this.token.value,
        endpoint: `playlists/${randomPlaylist.id}/tracks`,
      });

      console.log(playlistTracks);

      if (playlistTracks.items && playlistTracks.items.length > 0) {
        const filteredTracks = playlistTracks.items.filter((track: any) =>
        track.track && track.track['preview_url'] !== null
        );
        console.log(filteredTracks);

        // Check if there are enough filtered tracks 
        if (filteredTracks.length >= 4) {
          const randomTracks: any[] = [];
          const usedAlbumIds: Set<string> = new Set();

          while (randomTracks.length < 4) {
            const randomTrack = this.getRandomTrack(filteredTracks);
            const albumId = randomTrack.track['album']['id'];

            // Check if the album ID is not already used
            if (!usedAlbumIds.has(albumId)) {
              usedAlbumIds.add(albumId);

              const albumArtURL = randomTrack.track['album']['images'][0]?.url || '';
              randomTracks.push({ ...randomTrack, albumArtURL });
            }
          }

          this.options = randomTracks;
          this.correctSong = this.options[Math.floor(Math.random() * this.options.length)];

          if (this.correctSong.track['preview_url'] !== null) {
            this.previewURL = this.correctSong.track['preview_url'];
          }
        } else {
          this.generateQuestion();
          console.log("new playlist triggered")
        }
      } else {
        console.error("Playlist tracks are empty.");
      }
    } catch (error) {
      console.error("Error fetching playlist tracks:", error);
    }
  }
}

getRandomTrack(tracks: any[]): any {
  return tracks[Math.floor(Math.random() * tracks.length)];
}

  getRandomPlaylist(): any {
    if (this.items && this.items.length > 0) {
      const randomPlaylist = this.items[Math.floor(Math.random() * this.items.length)];
      console.log("Random Playlist:", randomPlaylist);
      return randomPlaylist;
    }
    return null;
  }

  shuffleArray(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  onSubmit(){
    return this.isCorrect;
  }

}
