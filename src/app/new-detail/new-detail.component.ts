import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFireDatabase, FirebaseAuth, FirebaseRef} from 'angularfire2/index';
import {Noticia} from "../shared/model/noticia";
import {NoticiasService} from "../shared/model/noticias.service";
@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.component.html',
  styleUrls: ['./new-detail.component.css']
})
export class NewDetailComponent implements OnInit {
  noticiaId: string;
  noticia: Noticia;
  sdkDb: any;
  constructor(@Inject(FirebaseRef) fb, private route: ActivatedRoute, private db: AngularFireDatabase, private noticiasService: NoticiasService, private auth: FirebaseAuth) {
    this.sdkDb = fb.database().ref();

  }

  ngOnInit() {

    this.route.params.subscribe((param: any) => this.noticiaId = param['id']);
    const noticia$ =  this.db.object('noticias/' + this.noticiaId)
      .subscribe(result => this.noticia = result);

    this.route.params.switchMap(params =>{
      return this.db.object('noticias/' + this.noticiaId);
    })
      .subscribe(result => this.noticia = result);


  }


 increase(noticia){
    if(!this.auth.getAuth()){
      alert("Usuário deve estar logado para votar.");
      return;
    } else {
      this.noticiasService.increment(noticia, noticia.$key);
    }
 }

 decrease(noticia){
   if(!this.auth.getAuth()){
     alert("Usuário deve estar logado para votar.");
     return;
   } else {
     this.noticiasService.decrement(noticia, noticia.$key);
   }
   }

  save(form){
    this.noticiasService.createNewMessage(form.value, form, this.noticia.$key)
      .subscribe(
        () =>{
          form.reset();
          alert("Mensagem enviada com sucesso!");
        },
        err => alert(`Erro ao enviar mensagem ${err}`)
      );

  }

}
