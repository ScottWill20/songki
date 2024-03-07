import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friendly',
  templateUrl: './friendly.component.html',
  styleUrls: ['./friendly.component.css']
})
export class FriendlyComponent implements OnInit {
  
  playlists: any;
  questionOneActive: boolean = true;
  questionTwoActive: boolean = false;
  questionThreeActive: boolean = false;

  questionOneAnswered: boolean = false;
  questionTwoAnswered: boolean = false;
  questionThreeAnswered: boolean = false;
  
  questionOneCorrect:  any;
  questionTwoCorrect: any;
  questionThreeCorrect: any;
  userScore: number = 0;
  currentIndex: number = 0;

  isPopupVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
    let unparsed = localStorage.getItem('playlists');
    if (unparsed) {
      this.playlists = JSON.parse(unparsed);
    }

    console.log(this.playlists);

    this.initQuiz();
  }

  initQuiz() {

    this.questionOneActive = true;
    this.questionTwoActive = false;
    this.questionThreeActive = false;
    this.questionOneAnswered = false;
    this.questionTwoAnswered = false;
    this.questionThreeAnswered = false;
  }

  updateScore(isCorrect: boolean) {

    if (this.currentIndex === 0) {

      this.questionOneCorrect = isCorrect;

      this.questionOneAnswered = true;
      this.questionOneActive = false;
      this.questionTwoActive = true;

    } else if (this.currentIndex === 1) {
      
      this.questionTwoCorrect = isCorrect;

      this.questionTwoAnswered = true;
      this.questionTwoActive = false;
      this.questionThreeActive = true;
    } else {

      this.questionThreeCorrect = isCorrect;

      this.questionThreeAnswered = true;
      this.questionThreeActive = false;

      this.calculateScore();
      this.showScorePopup();
    }
      this.currentIndex += 1;
    
  }

  calculateScore () {
    if (this.questionOneCorrect == true) {
      this.userScore += 1
    }
    if (this.questionTwoCorrect == true) {
      this.userScore += 1
    }
    if (this.questionThreeCorrect == true) {
      this.userScore += 1
    }
  }

  showScorePopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }
}