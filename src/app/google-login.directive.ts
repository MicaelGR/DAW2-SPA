import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { HandlerService } from './services/handler.service';

@Directive({
  selector: '[appGoogleLogin]'
})
export class GoogleLoginDirective {
  constructor(private afAuth: AngularFireAuth, private service: HandlerService, private router: Router) {}

  @HostListener('click')
  async onclick() {
    try {
      await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.router.navigate(['/entrevistas']);
    } catch(err) {
      console.log(err);
    }
  }
}
