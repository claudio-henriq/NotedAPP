import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public formRegister: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userProvider: UserProvider,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit(){
    this.formRegister = new FormGroup({
        name: new FormControl(''),
        user: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      }
    );
  }

  submit(){
    if(this.formRegister.valid){
      this.userProvider.registerUser(this.formRegister.value).then(register =>{
        if(register)
          this.navCtrl.pop();
      });
    }else{
      this.validateForm();
    }
  }

  register(){
    this.navCtrl.setRoot(RegisterPage);
  }

  validateForm(){
    if(!this.formRegister.controls.user.valid){
      this.shoswToast("Verifique o nome de usuário");
    }else{
      if(!this.formRegister.controls.password.valid)
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
