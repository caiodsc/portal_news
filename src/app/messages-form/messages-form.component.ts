import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-messages-form',
  templateUrl: './messages-form.component.html',
  styleUrls: ['./messages-form.component.css']
})
export class MessagesFormComponent implements OnInit {
  form:FormGroup;
  constructor(private  fb: FormBuilder) {
    this.form=this.fb.group({
      nome:['',Validators.required],
      mensagem: ['',Validators.required]
    });
  }

  ngOnInit() {
  }

  isErrorVisible(field:string, error:string){
    return this.form.controls[field].dirty
      && this.form.controls[field].errors
      && this.form.controls[field].errors[error];
  }
  reset(){
    this.form.reset();
  }
  get valid (){
    return this.form.valid;
  }
  get value(){
    return this.form.value;
  }

}
