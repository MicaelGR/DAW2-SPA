import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HandlerService } from '../services/handler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder, private service: HandlerService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [Validators.minLength(6), Validators.required]
      ],
      password2: ['', []]
    });
  }

  coincidePassword() {
    return this.form.value.password === this.form.value.password2;
  }

  async onSubmit() {
    this.loading = true;

    const email = this.form.value.email;
    const password = this.form.value.password;

    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.router.navigate(['/login']);
    } catch(err) {
      console.log(err);
    }
    this.loading = false;
  }

}
