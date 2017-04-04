/**
 * Created by pc on 01/04/2017.
 */
import {Route} from "@angular/router"
import {HomeComponent} from "./home/home.component";
import {NewsListComponent} from "./news-list/news-list.component";
import {NewsComponent} from "./news/news.component";
import {CpanelComponent} from "./cpanel/cpanel.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./shared/security/auth.guard";
import {NewNewComponent} from "./new-new/new-new.component";
import {NewEditComponent} from "./new-edit/new-edit.component";
import {NewDetailComponent} from "./new-detail/new-detail.component";

export const routerConfig: Route[] =[
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'noticias',
    children:[
      {
        path: ':id',
        component: NewDetailComponent
      },
      {
        path: '',
        component: NewsComponent
      }
    ]
  },
  {
    path: 'painel-de-controle',
    canActivate: [AuthGuard],
    children:
      [
        {
         path: 'nova-noticia',
          component: NewNewComponent
        },
        {
         path: 'editar-noticia:id',
          component: NewEditComponent
        },
        {
          path: '',
          component: CpanelComponent
        }
      ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
