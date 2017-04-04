import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Noticia} from "../shared/model/noticia";
import {AngularFire} from 'angularfire2/index';
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  noticias : Noticia[];
  @Input()
  noticia: Noticia[];
  @Output('noticia')
  noticiaEmitter = new EventEmitter<Noticia>();
  constructor(private af: AngularFire) { }

  ngOnInit() {
   //const listNots = this.af.database.list('noticias', {query: {limitToFirst: 5}}).subscribe(results => this.noticias = results);

  }

  selectNoticia(noticia: Noticia){
    this.noticiaEmitter.emit(noticia);
  }
}
