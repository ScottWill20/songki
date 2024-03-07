import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-album-art',
  templateUrl: './album-art.component.html',
  styleUrls: ['./album-art.component.css']
})
export class AlbumArtComponent implements OnInit {

  @Input() albumArtURL: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
