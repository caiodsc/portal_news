/**
 * Created by pc on 01/04/2017.
 */
import {AuthProviders, AuthMethods} from 'angularfire2/index';

export const firebaseConfig ={
  apiKey: "AIzaSyCDKPfE10jwtZELhkt6SnBKyfXUadETJNc",
  authDomain: "portal-news-eab7f.firebaseapp.com",
  databaseURL: "https://portal-news-eab7f.firebaseio.com",
  projectId: "portal-news-eab7f",
  storageBucket: "portal-news-eab7f.appspot.com",
  messagingSenderId: "199043880727"
};

export  const authConfig={
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};


