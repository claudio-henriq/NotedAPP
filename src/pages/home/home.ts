import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { NoteProvider } from '../../providers/note';
import { LoginPage } from '../login/login';
import { NotePage } from '../note/note';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private note = {
    title: "Nota de teste",
    content: "Conteudo da nota",
    date: "2022-12-27",
    color: ""
  }

  public notes = [];

  constructor(
    public navCtrl: NavController,
    private noteProvider: NoteProvider,
  ) { }

  ngOnInit(){
  }

  ionViewDidEnter(){
    this.noteProvider.getNotes().then((notes: any) =>{
      this.notes = notes;
    })
  }

  addNote(){
    this.navCtrl.push(NotePage);
  }

  editNote(note: any){
    this.navCtrl.push(NotePage, {note: note});
  }

}
