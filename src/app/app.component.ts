import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'expenses-manager';
  constructor(private router:Router){}
  ngOnInit(){
    this.router.events.pipe(
      filter((event)=> event instanceof NavigationStart)
    ).subscribe((e)=>{
      console.log("Navigation Started!!")
    })
    this.router.events.pipe(
      filter((event)=> event instanceof NavigationEnd)
    ).subscribe((e)=>{
      console.log("Navigation Completed!!")
    })
  }
}
