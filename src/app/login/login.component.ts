import { AutenticacaoFirebaseService } from './../servicosInterface/autenticacao-firebase.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    formularioLogin = this.loginBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required)
  });

  hasUnitNumber = false;

  constructor(
    private loginBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public conteudo: string,
    private toast: HotToastService,
    private rotas: Router,
    private autenticacaoFirebaseService: AutenticacaoFirebaseService
    ) {}

    get email(){
      return this.formularioLogin.get('email');
    }

    get senha() {
      return this.formularioLogin.get('senha')
    }

  loginFirebase(): void {
    if(!this.formularioLogin.valid){
      return;
    }

    const {email, senha} = this.formularioLogin.value;
    this.autenticacaoFirebaseService.loginUsuario(email, senha)
    .pipe(
      this.toast.observe({
        success: 'Login válido, obrigada!',
        loading: 'Redirecionando...',
        error: 'Algo deu errado, confira as informações'
      })
      ).subscribe(()=>{
        this.rotas.navigate(['/cdd'])
      })
  }
}
