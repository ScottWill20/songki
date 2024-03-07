import { Component, OnInit } from "@angular/core";
import fetchFromSpotify, { request } from "../../services/api";
import { Router } from "@angular/router";


const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  genres: String[] = [
    "Rock", "Jazz", "Pop", "Alternative", "Indie", 
    "Metal", "HipHop", "Soul", "Reggae", "Latin"];
  selectedGenre: string = "";
  gameMode: string = ""
  authLoading: boolean = false;
  configLoading: boolean = false;
  token: String = "";
  playlists: any 

  ngOnInit(): void {
    this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;
        this.loadGenres(storedToken.value);
       
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      localStorage.setItem('token', JSON.stringify(newToken));
      this.authLoading = false;
      this.token = newToken.value;
      this.loadGenres(newToken.value);
    });
  }

  loadPlaylists = async (genre:String ='') => {
    if(genre == ''){
      alert("Select a genre to start your quiz.")
    }
    request(AUTH_ENDPOINT).then(async ({ access_token, expires_in }) => {
      // const newToken = {
      //   value: access_token,
      //   expiration: Date.now() + (expires_in - 20) * 1000,
      // };
      // localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      // localStorage.setItem('token', JSON.stringify(newToken));

   
      const data = await fetchFromSpotify({
      token: this.token,
      endpoint: `browse/categories/${genre}/playlists`
      
    }); 
    
    console.log(data)
    this.playlists = data
    localStorage.setItem('playlists', JSON.stringify(data))
    console.log(this.playlists.message)

    if(this.gameMode === "Friendly"){
      this.router.navigate(['/friendly'])
    }
    else if(this.gameMode === "Competitive"){
      localStorage.setItem('genre', this.selectedGenre)
      this.router.navigate(['/competitive'])
    }else{
      alert("Select a game mode to start your quiz.")
    }
    
  })}

  loadGenres = async (t: any) => {
    this.configLoading = true;

    // #################################################################################
    // DEPRECATED!!! Use only for example purposes
    // DO NOT USE the recommendations endpoint in your application
    // Has been known to cause 429 errors
    // const response = await fetchFromSpotify({
    //   token: t,
    //   endpoint: "recommendations/available-genre-seeds",
    // });
    // console.log(response);
    // #################################################################################
    

    this.configLoading = false;
  };

  setGenre(selectedGenre: any) {
    this.selectedGenre = selectedGenre;
    console.log(this.selectedGenre);
    console.log(TOKEN_KEY);
  }
  setGameMode(mode: string){
    this.gameMode = mode;
    console.log(this.gameMode)
  }
}
