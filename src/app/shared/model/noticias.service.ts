import {Injectable, Inject} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {AngularFireDatabase, FirebaseAuth, AngularFire, FirebaseRef, FirebaseApp} from 'angularfire2/index';
import {Autor} from "./autor";
import {Noticia} from "./noticia";

@Injectable()
export class NoticiasService {
  private sdkDb: any;
  private firebase: any;
  private list: any;
  private obj: any;
  constructor(private af:AngularFire,
              private db: AngularFireDatabase,
              @Inject(FirebaseRef) fb,
              @Inject(FirebaseApp) firebase: any,
              private auth: FirebaseAuth,
              private router: Router) {
    this.sdkDb = fb.database().ref();
    this.firebase=firebase;
  }

  createNewNoticia(userId:string, noticia:any, imagem:any, form: any, autorObj: Autor): Observable<any>{
    const subject = new Subject();
    const autor = autorObj.nome;

    var metadata = {
      contentType: 'image/jpeg'
    };
    const likes =0;
    const dislikes =0;
    const totalLikes =0;
    const totalDislikes =0;
    const visualizacoes =0;
    const noticiaToSave = Object.assign({}, noticia, {autor}, {likes}, {dislikes}, {totalLikes}, {totalDislikes},{visualizacoes});
    const newNoticiaKey = this.sdkDb.child('noticias').push().key;
    const noticia$ = this.af.database.object(`noticias/${newNoticiaKey}`);

    if(imagem == null){
      alert(`Erro em criar noticia: Upload de arquivo obrigatório`)
      return;
    }
    else{
      if(imagem.size>1000000){
        var input: any = document.getElementById('file');
        var file = input.files[0];
        input.type = '';
        input.type = 'file';
        //  form.reset();
        alert(`Erro em criar noticia: Tamanho superior a 1Mb`);
        return;
      }
    }

    let dataToSave={};
    dataToSave['noticias/' + newNoticiaKey] = noticiaToSave;
    dataToSave['noticiasPorAutor/' + userId + '/' + newNoticiaKey] = true;
    this.sdkDb.update(dataToSave)
      .then(
        val => {
          subject.next(val);
          subject.complete();
        },
        err =>{
          subject.error(err);
          subject.complete();
        }
      );

    var storageRef = this.firebase.storage().ref(`/images/${newNoticiaKey}`);

    var uploadTask = storageRef.put(imagem, metadata);

    uploadTask.on('state_changed', function (snapshot) {
    }, function (error) {
      switch (error.code) {
        case 'storage/unauthorized':
          return this.error(subject);
        case 'storage/canceled':
          return this.error(subject);
        case 'storage/unknown':
          return this.error(subject);
      }
    }, function () {
      const downloadURL = uploadTask.snapshot.downloadURL;
      console.log(downloadURL);
      noticia$.update({imagem: uploadTask.snapshot.downloadURL});
    });

    return subject.asObservable();
  }
  createNewUser(nome: string){

    const subject = new Subject();

    const userToSave = Object.assign({}, {nome});
    const newUserKey = this.auth.getAuth().uid;
    const usuario$ = this.af.database.object(`autores/${newUserKey}`);
    let dataToSave={};
    dataToSave['autores/' + newUserKey] = userToSave;
    this.sdkDb.update(dataToSave)
      .then(
        val => {
          subject.next(val);
          subject.complete();
        },
        err =>{
          subject.error(err);
          subject.complete();
        }
      );
  return subject.asObservable;
  }

  increment(noticia: Noticia, noticiaId: string) {
    const user = this.auth.getAuth().uid;
    const dislikes$ = this.af.database.list('noticias/' + noticiaId + '/dislikes');
    const disliker$ = this.af.database.object('noticias/' + noticiaId + '/dislikes/' + user).subscribe(
      r => this.obj = r);
    dislikes$.remove(this.obj);
    const noticia$ = this.af.database.object('noticias/' + noticiaId);
    let dataToSave = {};
    dataToSave['noticias/' + noticiaId + '/' + 'likes/' + user] = true;
    this.sdkDb.update(dataToSave)
      .then(val => {
          const likes$ = this.af.database.list('noticias/' + noticiaId + '/likes').subscribe(
            r => this.list = r);
          const likes = this.list.length;
          noticia$.update({totalLikes: likes})
            .then(val =>{
              const dislikes$ = this.af.database.list('noticias/' + noticiaId + '/dislikes').subscribe(
                r => this.list = r);
              const dislikes = this.list.length;
              noticia$.update({totalDislikes: dislikes});
        });
        }
      );
  }

  decrement(noticia: Noticia, noticiaId: string) {
    const user = this.auth.getAuth().uid;
    const likes$ = this.af.database.list('noticias/' + noticiaId + '/likes');
    const liker$ = this.af.database.object('noticias/' + noticiaId + '/likes/' + user).subscribe(
      r => this.obj = r);
    likes$.remove(this.obj);
    const noticia$ = this.af.database.object('noticias/' + noticiaId);
    let dataToSave = {};
    dataToSave['noticias/' + noticiaId + '/' + 'dislikes/' + user] = true;
    this.sdkDb.update(dataToSave)
      .then(val => {
          const dislikes$ = this.af.database.list('noticias/' + noticiaId + '/dislikes').subscribe(
            r => this.list = r);
          const dislikes = this.list.length;
          noticia$.update({totalDislikes: dislikes})
            .then(val =>{
              const likes$ = this.af.database.list('noticias/' + noticiaId + '/likes').subscribe(
                r => this.list = r);
              const likes = this.list.length;
              noticia$.update({totalLikes: likes});
            });
        }
      );
  }

  createNewMessage(formv, form, noticiaId){
    const newMessageKey = this.sdkDb.child('noticias/' + noticiaId).push().key;
    const subject = new Subject();
    const messageToSave = Object.assign({}, formv);
    let dataToSave={};
    dataToSave['messages/' + noticiaId + '/' + newMessageKey] = messageToSave;
    this.sdkDb.update(dataToSave)
      .then(
        val => {
          subject.next(val);
          subject.complete();
        },
        err =>{
          subject.error(err);
          subject.complete();
        }
      );
    return subject.asObservable();
  }

}
