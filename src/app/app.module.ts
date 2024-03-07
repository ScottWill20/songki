import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { QuestionComponent } from './question/question.component';
import { AlbumArtComponent } from './album-art/album-art.component';
import { CompetitiveComponent } from './competitive/competitive.component';
import { FriendlyComponent } from "./friendly/friendly.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UsernameInputComponent } from './competitive/username-input/username-input.component';

import { ScorePopupComponent } from './score-popup/score-popup.component';
import { HighScoresComponent } from './high-scores/high-scores.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [{ path: "", component: HomeComponent },
{ path: "competitive", component: CompetitiveComponent },
{ path: "friendly", component: FriendlyComponent},
{ path: "high-scores", component: HighScoresComponent}
];

@NgModule({
  declarations: [AppComponent, HomeComponent, QuestionComponent, AlbumArtComponent, CompetitiveComponent, FriendlyComponent, ScorePopupComponent, UsernameInputComponent, HighScoresComponent, HeaderComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes), FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
