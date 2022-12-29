import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { environment } from './environment';
import { UserProvider } from './user';

/*
  Generated class for the NoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NoteProvider {

  private httpOptions;

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public toastCtrl: ToastController,
    private userProvider: UserProvider,
  ){ }

  public async setHeader(){
    let session = await this.userProvider.getUser('sessionID');

    if(!session){
      session = "";
    }

    this.httpOptions = {
      headers: {
        'token': environment.token,
        'session-id': session,
      }
    }
  }

  //----------------- TREATMENT REQUESTS -----------------
  public async registerNote(note: Object){
    return new Promise((resolve) => {
      this.register(note).then((response:any) =>{
        this.shoswToast(response.data);
        resolve(response.status);
      }).catch(err => console.log('Erro no cadastro', err));
    });
  }

  public async editNote(id: number, note: Object){
    return new Promise((resolve) => {
      this.update(id, note).then((response:any) =>{
        this.shoswToast(response.data);
        resolve(response.status);
      }).catch(err => console.log('Erro na atualização', err));
    });
  }

  public async deleteNote(id: number){
    return new Promise((resolve) => {
      this.delete(id).then((response:any) =>{
        this.shoswToast(response.data);
        resolve(response.status);
      }).catch(err => console.log('Erro ao excluir', err));
    });
  }

  public async getNotes(params:any = {}){
    return new Promise((resolve) => {
      this.get(params).then((response:any) =>{
        if(response.status){
          resolve(response.data);
        }else{
          this.shoswToast(response.data);
          resolve(false);
        }
      }).catch(err => console.log('Erro na busca', err));
    });
  }

  //----------------- HTTP REQUESTS -----------------
  private async register(note: Object){
    await this.setHeader();
    return this.http.post(`${environment.url}/note/register`, this.setForm(note), this.httpOptions).toPromise();
  }

  private async update(id: number, note: Object){
    await this.setHeader();
    return this.http.post(`${environment.url}/note/edit/${id}`, this.setForm(note), this.httpOptions).toPromise();
  }

  private async delete(id: number){
    await this.setHeader();
    return this.http.post(`${environment.url}/note/delete_account/${id}`, {}, this.httpOptions).toPromise();
  }

  private async get(params: Object = {}){
    await this.setHeader();
    let query = this.setParams(params);
    return this.http.get(`${environment.url}/note${query}`, this.httpOptions).toPromise();
  }

  private setForm(data: Object){
    let form = new FormData();

    Object.keys(data).forEach(k =>{
      form.append(k, data[k]);
    });

    return form;
  }

  private setParams(data: Object){
    let query = "?";
    Object.keys(data).forEach(k =>{
      query = `${query}${k}=${data[k]}&`
    });

    return query != "?" ? query: "";
  }

  /**
   * 
   * @param message Texto para exibir
   * @param time tempo em segundos
   */
  private shoswToast(message: string, time: any = false){
    this.toastCtrl.create({
      message: message,
      duration: time? time *1000: 3000,
      position: 'bottom',
      cssClass: 'toast-spacer'
    }).present();
  }
}
