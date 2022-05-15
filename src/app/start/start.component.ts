import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collectionData,addDoc, collection, doc, docData,setDoc } from '@angular/fire/firestore';
import { Game } from '../models/game';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(private firestore: Firestore, private router: Router) { }

  ngOnInit(): void {
  }


  startGame(){
    let game = new Game;
    addDoc(collection(this.firestore,"games"),game.toJson())
    .then((gameInfo => {
      this.router.navigateByUrl("/game/" + gameInfo.id);
    }));
  }
}
