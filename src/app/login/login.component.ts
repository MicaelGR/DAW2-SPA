import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HandlerService } from '../services/handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  form!: FormGroup;
  loading: boolean = false;

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder, private service: HandlerService, private router: Router) { }

   ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [Validators.minLength(8), Validators.required]
      ]
    });
   }

   async onSubmit() {
    this.loading = true;

    const email = this.form.value.email;
    const password = this.form.value.password;
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/entrevistas']);
    } catch(err) {
      console.log(err);
    }
    this.loading = false;
  }

}
