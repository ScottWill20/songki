import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.css']
})
export class HighScoresComponent implements OnInit {

  allHighScores: any
  constructor(private router: Router) { }

  ngOnInit(): void {
    //TODO: only show top ten
      let scoresArray = JSON.parse(localStorage['highScores']).flat(Infinity)
      this.allHighScores = scoresArray.sort( (a: { score: number; }, b: { score: number; }) => a.score - b.score).reverse().slice(0, 9)

    console.log(this.allHighScores)
  }

  returnHome(){
    this.router.navigate(['/'])
  }

}
