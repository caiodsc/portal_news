import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { NewsComponent } from './news/news.component';
import { CpanelComponent } from './cpanel/cpanel.component';
import { NewsListComponent } from './news-list/news-list.component';
import {RouterModule} from "@angular/router";
import {routerConfig} from "./router.config";
import { NewDetailComponent } from './new-detail/new-detail.component';
import {AngularFireModule} from 'angularfire2/index'
import {firebaseConfig, authConfig} from "../environments/firebase.config";
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from "./shared/security/auth.service";
import {AuthGuard} from "./shared/security/auth.guard";
import { NewNewComponent } from './new-new/new-new.component';
import { NewEditComponent } from './new-edit/new-edit.component';
import { NewFormComponent } from './new-form/new-form.component';
import {NoticiasService} from "./shared/model/noticias.service";
import {LiDirective} from "./shared/extras/li.directive";
import { MessagesFormComponent } from './messages-form/messages-form.component';
import { ComentsComponent } from './coments/coments.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopMenuComponent,
    NewsComponent,
    CpanelComponent,
    NewsListComponent,
    NewDetailComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NewNewComponent,
    NewEditComponent,
    NewFormComponent,
    LiDirective,
    MessagesFormComponent,
    ComentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routerConfig),
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard, NoticiasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
