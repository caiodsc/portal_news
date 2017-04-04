import {Component, OnInit, SimpleChanges, Input} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})
export class NewFormComponent implements OnInit {
  form:FormGroup;
  @Input()
  initialValue:any;

  constructor(private  fb: FormBuilder) {

    this.form=this.fb.group({
      title:['',Validators.required],
      description: ['',Validators.required]
    });

  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['initialValue']) {
      if (this.form && changes['initialValue']) {
        this.form.patchValue(changes['initialValue'].currentValue);
      }
    }
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
