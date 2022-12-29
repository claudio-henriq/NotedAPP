import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public formLogin: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userProvider: UserProvider,
    private toastCtrl: ToastController,
  ) { }

  ionViewDidLoad() {
  }
  
  ngOnInit(){
    this.formLogin = new FormGroup({
        user: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      }
    );
  }

  submit(){
    if(this.formLogin.valid){
      this.userProvider.doAuth(this.formLogin.value).then(login =>{
        if(login)
          this.navCtrl.setRoot(HomePage);
      });
    }else{
      this.validateForm();
    }
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  validateForm(){
    if(!this.formLogin.controls.user.valid){
      this.shoswToast("Verifique o nome de usuário");
    }else{
      if(!this.formLogin.controls.password.valid)
        this.shoswToast("A senha deve conter no mínimo 6 caracteres");
    }
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
