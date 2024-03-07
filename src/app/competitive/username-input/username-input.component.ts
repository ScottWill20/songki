import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-username-input',
  templateUrl: './username-input.component.html',
  styleUrls: ['./username-input.component.css']
})
export class UsernameInputComponent implements OnInit {

  @Input() score: number = 0;

  username: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  //  localStorage['highScores'] = undefined;
  //  console.log(localStorage['highScores'])
  }

  onSubmitScore(username:string, score: number){
    let existingHighScores = []
    if(username== ''){
      alert("Enter a username.")
    }else{
      let newHighScore = {
      username: username,
      score: score,
      genre: localStorage.getItem('genre')
    }
    
    
    
    if(localStorage['highScores'] != undefined){
      
      existingHighScores = JSON.parse(localStorage['highScores'])
      
    }else{
      existingHighScores = []
    }
    
    existingHighScores.push(newHighScore)
    localStorage.setItem('highScores', JSON.stringify(existingHighScores))

    console.log(JSON.parse(localStorage['highScores']).flat(Infinity))

    this.router.navigate(['/high-scores'])
  }
  }
}
