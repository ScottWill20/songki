import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnyARecord } from 'dns';

@Component({
  selector: 'app-competitive',
  templateUrl: './competitive.component.html',
  styleUrls: ['./competitive.component.css']
})
export class CompetitiveComponent implements OnInit {

  playlists: any;
  isCorrectCompetitive: any;
  promptUserScore: boolean = false;
  currentScore: number = 0;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    let unparsed = localStorage.getItem('playlists')
    if(unparsed){
      this.playlists = JSON.parse(unparsed)
    }
  
    console.log(this.playlists)
  }

  receivedIsCorrect(isCorrect: boolean){
    this.isCorrectCompetitive = isCorrect;
    console.log(this.isCorrectCompetitive)
  }

  submitAnswer(isCorrect: boolean){
    this.currentScore = parseInt(localStorage['score'])
    
    if(isCorrect===true){
     
     
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.currentScore += 10

        localStorage.setItem('score', JSON.stringify(this.currentScore))
       
        this.router.navigate(['/competitive']); 
   
    });
    }else if(isCorrect === false){
      this.promptUserScore = true;
      localStorage.setItem('score', '0')
      
    }else{
      alert("Select an album before submitting.")
    }
  }

}
