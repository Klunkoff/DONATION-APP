import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {


  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() city: string = '';

  @Output() cancelEditForm: EventEmitter<boolean> = new EventEmitter();
  @Output() currentEditProfileInfo: EventEmitter<NgForm> = new EventEmitter();

  constructor() {}


  onSave(editProfileForm: NgForm) {
    this.currentEditProfileInfo.emit(editProfileForm.value);
  }

  cancelEdit(): void {
    this.cancelEditForm.emit(false);
  }

}
