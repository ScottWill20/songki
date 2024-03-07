import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score-popup',
  templateUrl: './score-popup.component.html',
  styleUrls: ['./score-popup.component.css']
})
export class ScorePopupComponent implements OnInit {

  @Input() userScore: number = 0;
  @Output() closePopup = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClose() {
    this.closePopup.emit();
  }

  tryMoreQuizzes() {
    this.router.navigate(['/']);
  }

}
