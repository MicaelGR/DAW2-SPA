import { Component } from '@angular/core';
import { CdkDragDrop, DropListOrientation, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Oferta } from '../oferta';
import { OfertaDialogComponent } from '../oferta-dialog/oferta-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HandlerService } from '../services/handler.service';
import { AngularFireAuth } from '@angular/fire/auth';

const orientation: DropListOrientation = 'horizontal';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss'],
})
export class OfertasComponent {
  index: number = 0;
  orientation: DropListOrientation;

  stage1$: Observable<Oferta[]>;
  stage2$: Observable<Oferta[]>;
  stage3$: Observable<Oferta[]>;

  stage1list: string = "stage1";
  stage2list: string = "stage2";
  stage3list: string = "stage3";
  stageTitle1: string = 'Fase 1';
  stageTitle2: string = 'Fase 2';
  stageTitle3: string = 'Fase 3';

  constructor(private service: HandlerService, public dialog: MatDialog, private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.orientation = orientation;

    this.stage1$ = this.service.getOfertasStage1$();
    this.stage2$ = this.service.getOfertasStage2$();
    this.stage3$ = this.service.getOfertasStage3$();

    this.service.getOfertasStage1$().forEach(item => {
      item.find(of => {
        this.index = of.index || this.index;
      });
    });
  }

  drop(event: CdkDragDrop<Oferta[] | null>): void {                                              // Controla el movimiento de las ofertas
    const previous = event.previousContainer.data || [];
    const current = event.container.data || [];

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data || [], event.previousIndex, event.currentIndex);
      this.db.firestore.runTransaction(() => {
        var promise: any[] = [];
        if (event.currentIndex > event.previousIndex) {
          for(let i = event.previousIndex; i <= event.currentIndex; i++) {                     // Actualiza las posiciones en la BBDD en
            let item = current[i];                                                             // el mismo stage
            i !== event.currentIndex ? item.index = (item.index || 0) - 1 : item.index = i;
            promise.push(new Promise(() => this.db.collection(event.previousContainer.id).doc(item.id).update(item)));
          }
        } else {
          for(let i = event.currentIndex; i <= event.previousIndex; i++) {
            let item = current[i];
            item.index = i;
            promise.push(new Promise(() => this.db.collection(event.container.id).doc(item.id).update(item)));
          }
        }
        return Promise.all(promise);
      });

    } else {
      transferArrayItem(
        event.previousContainer.data ||[],
        event.container.data||[],
        event.previousIndex,
        event.currentIndex
      );
      this.db.firestore.runTransaction(() => {
        let item = current[event.currentIndex];
        var promise: any[] = [];
        item.index = event.currentIndex;
        promise.push(new Promise(() =>                                                        // Elimina la entrevista de la tabla y
                    this.db.collection(event.previousContainer.id).doc(item.id).delete()));   // la añade en la nueva
        promise.push(new Promise(() =>
                    this.db.collection(event.container.id).add(item)));

        for(let i = event.previousIndex; i < previous.length; i++) {                          // Actualiza las posiciones en la BBDD al mover
          let item = previous[i];                                                             // las entrevistas de un stage al otro
          item.index = (item.index || 0) - 1;
          promise.push(new Promise(() => this.db.collection(event.previousContainer.id).doc(item.id).update(item)));
        }
        for(let i = event.currentIndex; i < current.length; i++) {
          let item = current[i];
          item.index = i;
          promise.push(new Promise(() => this.db.collection(event.container.id).doc(item.id).update(item)));
        }
        return Promise.all(promise);
      });
    }
  }

  openBoardDialog() {
    const dialogRef = this.dialog.open(OfertaDialogComponent, {
      width: '500px',
      data: {  }
    });
    dialogRef.afterClosed().subscribe((result: Oferta) => {
      if (result) {
        result.id = Math.random() + result.empresa + "";
        console.log(typeof result.id);
        this.index++;
        result.index = this.index;
        this.db.collection('stage1').add(result);   // Añade las ofertas al stage 1
      }
    });
  }
}
