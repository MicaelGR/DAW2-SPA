import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Oferta } from '../oferta';

const getObservable = (collection: AngularFirestoreCollection<Oferta>) => {
  const subject = new BehaviorSubject<Oferta[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Oferta[]) => {
    subject.next(val);
  });
  return subject;
};

@Injectable({
  providedIn: 'root'
})
export class HandlerService implements OnInit {

  ofertasStage1$ = getObservable(this.db.collection<Oferta>('stage1', ref => ref.orderBy("index","asc")));
  ofertasStage2$ = getObservable(this.db.collection<Oferta>('stage2', ref => ref.orderBy("index","asc")));
  ofertasStage3$ = getObservable(this.db.collection<Oferta>('stage3', ref => ref.orderBy("index","asc")));

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private r: Router) {
  }

  ngOnInit() {
  }

  getOfertasStage1$(): Observable<Oferta[]> {
    return this.ofertasStage1$ as Observable<Oferta[]>;
  }
  getOfertasStage2$(): Observable<Oferta[]> {
    return this.ofertasStage2$ as Observable<Oferta[]>;
  }
  getOfertasStage3$(): Observable<Oferta[]> {
    return this.ofertasStage3$ as Observable<Oferta[]>;
  }

  findItem(id: string): number {
    let found: number = 0;
    this.getOfertasStage1$().forEach(item => {
      var a = item.find(of => of.id === id);
      if(a != undefined) {
        found = 1;
        return ;
      } else {
        return ;
      }
    });
    this.getOfertasStage2$().forEach(item => {
      var a = item.find(of => of.id === id);
      if(a != undefined) {
        found = 2;
        return ;
      } else {
        return ;
      }
    });
    this.getOfertasStage3$().forEach(item => {
      var a = item.find(of => of.id === id);
      if(a != undefined) {
        found = 3;
        return ;
      } else {
        return ;
      }
    });
    return found;
  }
}
