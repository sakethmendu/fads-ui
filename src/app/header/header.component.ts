import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

  isClicked:boolean=true

 

  clicked(){
    this.isClicked = !this.isClicked
  }

  home(){
    this.isClicked = true
  }

  
}