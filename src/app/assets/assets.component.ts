import { Component, OnInit } from '@angular/core';
import { Asset } from '../shared/schemas/interface';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  constructor() { }

  totalAssets:Asset[] = [];
  ngOnInit(): void {
  }

}
