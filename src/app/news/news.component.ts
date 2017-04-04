import {Component, OnInit, Inject} from '@angular/core';
import {AngularFire, FirebaseRef} from 'angularfire2/index';
import {Noticia} from "../shared/model/noticia";
import {NoticiasService} from "../shared/model/noticias.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  noticias: Noticia[];
  noticias2: Noticia[];
  noticias3: Noticia[];
  noticias4: Noticia;
  sdkDb: any;
  constructor(private af: AngularFire, private noticiasService: NoticiasService, private router: Router,  @Inject(FirebaseRef) fb) {
    this.sdkDb = fb.database().ref();

  }

  ngOnInit() {
    const listNots = this.af.database.list('noticias', {
      query: {
        limitToFirst: 5
      }
    })
      .do(console.log)
      .subscribe(results => this.noticias = this.noticias2 = this.noticias3 = results);
    const listNots2 = this.af.database.list('noticias', {
      query: {
        limitToLast: 1
      }
    })
      .do(console.log)
      .subscribe(results => this.noticias4);
  }

  next(){
    const listNots = this.af.database.list('noticias', {
      query: {
        orderByKey : true,
        startAt: this.noticias2[this.noticias.length -1].$key,
        limitToFirst: 6
      }
    })
      .map(results => results.slice(1, results.length))
      .subscribe(results => this.noticias = this.noticias2 = results);
  }

  previous(){
    const listNots = this.af.database.list('noticias', {
      query: {
        orderByKey : true,
        endAt: this.noticias2[0].$key,
        limitToLast: 6
      }
    })
      .map(results => results.slice(0, results.length -1))
      .subscribe(results => this.noticias = this.noticias2 = results);
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
