import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Oferta } from '../oferta';
import { OfertaDialogComponent } from '../oferta-dialog/oferta-dialog.component';
import { HandlerService } from '../services/handler.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss']
})
export class OfertaComponent {

  @Input() oferta: Oferta | null = null;

  constructor(private service: HandlerService, public dialog: MatDialog, private db: AngularFirestore) { }

  delete() {
    if(this.oferta){
      var id: string = this.oferta.id;
      var found = this.service.findItem(id);
      if(found == 0) return;
      if(found == 1) {
        this.db.collection('stage1').doc(id).delete();
      } else if(found == 2) {
        this.db.collection('stage2').doc(id).delete();
      } else {
        this.db.collection('stage3').doc(id).delete();
      }
    }
  }
  editDialog() {
    const dialogRef = this.dialog.open(OfertaDialogComponent, {
      width: '500px',
      data: { }
    });
    dialogRef.afterClosed().subscribe((result: Oferta) => {
      if (result) {
        var id: string = '';
        if(this.oferta !== null) {
          id = this.oferta.id || '';
        }
        var found: number = this.service.findItem(id);
        if(found == 0) return;
        if(found == 1) {
          this.db.collection('stage1').doc(id).update(result);
        } else if(found == 2) {
          this.db.collection('stage2').doc(id).update(result);
        } else {
          this.db.collection('stage3').doc(id).update(result);
        }
      }
    });
  }
}
