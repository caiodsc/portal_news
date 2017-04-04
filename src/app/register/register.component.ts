import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {AuthService} from "../shared/security/auth.service";
import {Router} from "@angular/router";
import {NoticiasService} from "../shared/model/noticias.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private noticiasService: NoticiasService) {
      this.form = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
      confirm: ['',Validators.required],
      author: ['', Validators.required]
    });
  }


  ngOnInit() {
  }

  signUp() {
    const val = this.form.value;
    const that = this;
    this.authService.signUp(val.email, val.password)
      .subscribe(
        () => {
          that.noticiasService.createNewUser(that.form.value.author.toString());
          alert('Usuário criado com sucesso!');
          this.router.navigateByUrl('/home');
        },
        err => alert(err)
      );
  }

  isPasswordMatch() {
    const val = this.form.value;
    return val && val.password && val.password == val.confirm;
  }


}
