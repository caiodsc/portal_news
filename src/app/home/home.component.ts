import {Component, OnInit, Inject} from '@angular/core';
import $ from 'jquery';
import {AngularFire, FirebaseRef} from 'angularfire2/index';
import {Noticia} from "../shared/model/noticia";
import {Router} from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  noticias: Noticia[];
  i: number = 0;
  sdkDb: any;
  constructor(private af: AngularFire, private router: Router, @Inject(FirebaseRef) fb) {
    this.sdkDb = fb.database().ref();
  }

  ngOnInit() {
    const listNots = this.af.database.list('noticias', {
      query: {
        limitToFirst: 5
      }
    })
      .subscribe(results => this.noticias = results);

    const that =this;
    setInterval(function () {
      if(that.i < 4){
        that.i = that.i + 1;
      }else {
        that.i = 0;
      }
    },3000);
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


      featured(){
        const listNots = this.af.database.list('noticias', {
          query: {
            limitToFirst: 5
          }
        })
          .subscribe(results => this.noticias = results);
      }
      recent(){
        const listNots = this.af.database.list('noticias', {
          query: {
            limitToLast: 5
          }
        })
          .subscribe(results => this.noticias = results);

      }
      popular(){
        const listNots = this.af.database.list('noticias', {
          query: {
            orderByChild: 'totalLikes',
            limitToLast: 5
          }
        })
          .subscribe(results => this.noticias = results);
      }
}
