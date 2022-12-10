import { Component, OnInit } from '@angular/core';
import { Asset } from '../../_models/interface';

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
