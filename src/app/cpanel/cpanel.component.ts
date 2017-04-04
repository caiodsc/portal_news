import {Component, OnInit, Inject} from '@angular/core';
import {Noticia} from "../shared/model/noticia";
import {AngularFire, FirebaseAuth, AngularFireDatabase, FirebaseApp, FirebaseRef} from 'angularfire2/index';
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-cpanel',
  templateUrl: './cpanel.component.html',
  styleUrls: ['./cpanel.component.css']
})
export class CpanelComponent implements OnInit {
  noticias: Noticia[];
  firebase: any;
  noticiaKey: string;
  sdkDb: any;
  constructor(private af: AngularFire, private auth: FirebaseAuth, private route: ActivatedRoute, private db: AngularFireDatabase, private router: Router,
  @Inject (FirebaseApp) firebase: any, @Inject(FirebaseRef) fb) {
  this.firebase = firebase;
  this.sdkDb = fb.database().ref();
  }
  ngOnInit() {
    const noticiasPorAutor = this.af.database.list('noticiasPorAutor/' + this.auth.getAuth().uid);
    const noticiasDoAutor = noticiasPorAutor
      .map(lspc => lspc.map(lpc => this.af.database.object('noticias/' + lpc.$key)) )
      .flatMap(fbojs => Observable.combineLatest(fbojs) ).do(console.log)
      .subscribe(results => this.noticias = results);

  }

  removeNew(noticia){
    const noticiaKey: string = noticia.$key;
    var r = confirm('Deseja excluir essa noticia?');
    if (r==true) {
      var storageRef = this.firebase.storage().ref(`/images/${noticiaKey}`);
      storageRef.delete().then(function() {
      }).catch(function(error) {
        alert(`Erro em deletar noticia ${error}`);
      });
      const noticia$ = this.db.list(`noticias`);
      const noticia: any = this.db.object(`noticias/${noticiaKey}`);
      noticia$.remove(noticia)
        .then(
          () => {
            const noticiaPorAutor$ = this.db.list(`noticiasPorAutor`);
            const noticiaPorAutor: any = this.db.object(`noticiasPorAutor/${this.auth.getAuth().uid}/${noticiaKey}`);
            noticiaPorAutor$.remove(noticiaPorAutor)
              .then(
                () => {
                  this.router.navigate(['/home']);
                  alert("noticia deletada com sucesso");
                },
                err => alert(`error em deletar noticia ${err}`)
              );
          },
          err => alert(`error em deletar noticia ${err}`)
        );
    }
  }

  navigateToNoticia(noticia: Noticia){
    const noticia$ = this.af.database.object('noticias/' + noticia.$key);
    let dataToSave = {};
    const vis = noticia.visualizacoes+1;
    dataToSave['noticias/' + noticia.$key + '/visualizacoes'] = vis;
    this.sdkDb.update(dataToSave)
      .then(val => {
        }
      );
    this.router.navigate(['noticias', noticia.$key]);
  }

}

