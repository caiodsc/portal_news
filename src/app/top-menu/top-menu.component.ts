import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/security/auth.service";
import {FirebaseAuth, AngularFire} from 'angularfire2/index';
import {AuthInfo} from "../shared/security/auth-info";
import {Noticia} from "../shared/model/noticia";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  noticias: Noticia[];
  filtered: Noticia[];
  authInfo: AuthInfo;
  constructor(private authService: AuthService, private auth: FirebaseAuth, private af: AngularFire, private router: Router) {
  }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);
    const list$ = this.af.database.list(`noticias`)
      .subscribe(results => this.noticias = this.filtered = results);
  }

  pesquisar(){
    if(this.filtered.length ==0){
      alert('Não há notícias com esse nome!');
      return;
    }
    this.router.navigate([`noticias/${this.filtered[0].$key}`]);
  }

  logout(){
    this.authService.logout();
  }

  search(search:string){
    this.filtered = this.noticias.filter(results => results.title.includes(search));
  }
}
