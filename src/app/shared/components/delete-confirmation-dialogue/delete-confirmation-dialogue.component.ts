import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialogue',
  templateUrl: './delete-confirmation-dialogue.component.html',
  styleUrls: ['./delete-confirmation-dialogue.component.css']
})
export class DeleteConfirmationDialogueComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmationDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public formDialogData: any
  ) {}

  ngOnInit() {}
  onDeleteConfirmation(event, confirmation) {
    this.dialogRef.close({
      action: confirmation
    });
  }
}
