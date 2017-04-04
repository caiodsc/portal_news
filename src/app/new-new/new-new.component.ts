import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {FirebaseAuth, FirebaseApp, AngularFire} from 'angularfire2';
import {Router} from "@angular/router";
import {NoticiasService} from "../shared/model/noticias.service";
import {Autor} from "../shared/model/autor";

@Component({
  selector: 'app-new-new',
  templateUrl: './new-new.component.html',
  styleUrls: ['./new-new.component.css']
})
export class NewNewComponent implements OnInit {
  userId:string;
  imgForm: FormGroup;
  url: string;
  autor: Autor;
  constructor(private fb: FormBuilder, private auth: FirebaseAuth,  @Inject(FirebaseApp) firebase: any, private router: Router,
              private noticiasService: NoticiasService, private af: AngularFire) {
    this.imgForm=this.fb.group({
      file:['']
    });
  }


  ngOnInit() {
    this.url = 'http://jobfair-online.net/images/themes/your_img_here.png';
    const teste = 'file';
    this.userId = this.auth.getAuth().uid.toString();
    const user = this.af.database.object('autores/' + this.auth.getAuth().uid)
      .subscribe(result => this.autor = result);
    const that = this;
    document.getElementById(teste).onchange = function() {
      that.setUpFile();
    }
  }

  setUpFile(){
    var input: any = document.getElementById('file');
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      var img = new Image();
      reader.onload = function () {
        var image = new Image();
        image.src = reader.result;
        image.onload = function () {
          image.width = 500;
        };
        var imagem = document.getElementById('noticiaImg');
        imagem.setAttribute('src', window.URL.createObjectURL(input.files[0]));
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  save(form){
    var input: any = document.getElementById('file');
    var file = input.files[0];
    this.noticiasService.createNewNoticia(this.userId, form.value, file, form, this.autor)
      .subscribe(
        () =>{
          this.router.navigate(['painel-de-controle']);
          alert("Noticia criada com sucesso!");
        },
        err => alert(`Erro em criar noticia ${err}`)
      );

  }

}
