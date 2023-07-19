import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HeaderComponent }   from './header/header.component';
import { BodyComponent }   from './body/body.component';

@NgModule({
    imports:      [ BrowserModule, FormsModule ],
    declarations: [ HeaderComponent, BodyComponent ],
    bootstrap:    [ HeaderComponent, BodyComponent]
})
export class AppModule { }