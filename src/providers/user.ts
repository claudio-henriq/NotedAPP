import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { environment } from './environment';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  private httpOptions;

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public toastCtrl: ToastController, 
  ){ }

  public async setHeader(){
    let session = await this.getUser('sessionID');

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

  public async getUser(key:any = false){
    let user = await this.storage.get('user');

    if(key)
      return user && user[key]? user[key]: null;
    else
      return user;
  }

  public setUser(user){
    this.storage.set('user', user);
  }

  public clearUser(){
    this.storage.remove('user');
  }

  //----------------- TREATMENT REQUESTS -----------------
  public async doAuth(user: Object){
    return new Promise((resolve) => {
      this.auth(user).then((response:any) =>{
        if(response.status){
          this.setUser(response.data);
          resolve(true);
        }else{
          this.shoswToast(response.data);
          this.clearUser();
          resolve(false);
        }
      }).catch(err => console.log('Erro na autenticação', err));
    });
  }

  public async registerUser(user: Object){
    return new Promise((resolve) => {
      this.register(user).then((response:any) =>{
        this.shoswToast(response.data);
        resolve(response.status);
      }).catch(err => console.log('Erro no cadastro', err));
    });
  }

  public async updateUser(user: Object){
    return new Promise((resolve) => {
      this.update(user).then((response:any) =>{
        if(response.status){
          this.setUser(response.data);
          this.shoswToast(response.message);
          resolve(true);
        }else{
          this.shoswToast(response.data);
          resolve(false);
        }
      }).catch(err => console.log('Erro na atualização', err));
    });
  }

  public async deleteUser(){
    return new Promise((resolve) => {
      this.delete().then((response:any) =>{
        if(response.status){
          this.shoswToast(response.data);
          this.clearUser();
          resolve(true);
        }else{
          this.shoswToast(response.data);
          resolve(false);
        }
      }).catch(err => console.log('Erro ao excluir', err));
    });
  }

  public async getUserData(params:any = {}){
    return new Promise((resolve) => {
      this.get(params).then((response:any) =>{
        if(response.status){
          this.setUser(response.data);
          resolve(response.data);
        }else{
          this.shoswToast(response.data);
          resolve(false);
        }
      }).catch(err => console.log('Erro na busca', err));
    });
  }

  //----------------- HTTP REQUESTS -----------------
  private async auth(user: Object){
    await this.setHeader();
    return this.http.post(`${environment.url}/user/auth`, this.setForm(user), this.httpOptions).toPromise();
  }

  private async register(user: Object){
    await this.setHeader();
    return this.http.post(`${environment.url}/user/register`, this.setForm(user), this.httpOptions).toPromise();
  }

  private async update(user: Object){
    await this.setHeader();
    return this.http.post(`${environment.url}/user/update`, this.setForm(user), this.httpOptions).toPromise();
  }

  private async delete(){
    await this.setHeader();
    return this.http.post(`${environment.url}/user/delete_account`, {}, this.httpOptions).toPromise();
  }

  private async get(params: Object = {}){
    await this.setHeader();
    let query = this.setParams(params);
    return this.http.get(`${environment.url}/user${query}`, this.httpOptions).toPromise();
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
      duration: time? time*1000: 3000,
      position: 'bottom',
      cssClass: 'toast-spacer'
    }).present();
  }

}
