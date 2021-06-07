import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-oferta-dialog',
  templateUrl: './oferta-dialog.component.html',
  styleUrls: ['./oferta-dialog.component.scss']
})
export class OfertaDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<OfertaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public oferta: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
