import {Component, OnInit, Input} from '@angular/core';
import {AngularFire} from 'angularfire2/index';
@Component({
  selector: 'app-coments',
  templateUrl: './coments.component.html',
  styleUrls: ['./coments.component.css']
})
export class ComentsComponent implements OnInit {
  @Input()
  noticiaId: string;
  mensagens : any;
  constructor(private af: AngularFire) { }

  ngOnInit() {
    const messages = this.af.database.list('messages/' + this.noticiaId)
      .subscribe(r => this.mensagens = r);
  }

}

