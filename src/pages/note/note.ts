import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoteProvider } from '../../providers/note';

/**
 * Generated class for the NotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
})
export class NotePage {

  action = "Nova nota";
  note = null;
  colors = ['note-1', 'note-2', 'note-3', 'note-4', 'note-5', 'note-6'];
  background = this.colors[0];
  public formNote: FormGroup;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private noteProvider: NoteProvider,
  ) {
    this.note = this.navParams.get('note');
    if(this.note){
      this.action = "Editar nota";
      this.background = this.note.color;
      this.formNote = new FormGroup({
        title: new FormControl(this.note.title),
        text: new FormControl(this.note.content),
        color: new FormControl(this.note.color),
      });
    }else{
      this.formNote = new FormGroup({
        title: new FormControl(''),
        text: new FormControl(''),
        color: new FormControl('note-1'),
      });
    }

  }

  ionViewWillLeave(){
    if(this.note)
      this.noteProvider.editNote(this.note.id, this.formNote.value);
    else
      this.noteProvider.registerNote(this.formNote.value);
  }

  setColor(color){
    this.background = color;
  }

}
