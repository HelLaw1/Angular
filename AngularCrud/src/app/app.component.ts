import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularCrud';

  public username: string = "";
  public password: string = "";

  public i: number = 0;

  public Login(): void{
  
     this.i = 1;
  }
}

