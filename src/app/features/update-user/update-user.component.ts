import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { UsersStateService } from '../../services/users.services/users.state/users.state.service';
import { User } from '../../models/users.models/users.models';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="updateFormUser" (ngSubmit)="updateUser()">
      <label><input type="file" #archive (change)="addFile()" /></label>
      <label><input type="text" formControlName="name" /></label>
      <label><input type="email" formControlName="email" /></label>
      <button type="submit">guardar cambios</button>
    </form>
  `,
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent implements OnInit {
  state = inject(UsersStateService);
  @Output() changesSaved = new EventEmitter<void>();
  personalData!: User;
  updateFormUser!: FormGroup;
  @ViewChild('archive') archive!: ElementRef;

  ngOnInit() {
    this.personalData = this.state.state.currentUser as User;
    this.initializeForm();
  }

  initializeForm() {
    this.updateFormUser = new FormGroup({
      name: new FormControl(this.personalData?.name),
      email: new FormControl(this.personalData?.email),
      archive: new FormControl(this.personalData?.imageUrl),
    });
  }

  updateUser() {
    const newName = this.updateFormUser.value.name?.toLowerCase();
    const formData = new FormData();

    formData.append('name', newName);
    formData.append('email', this.updateFormUser.value.email);
    formData.append('archive', this.updateFormUser.value.archive);

    this.state.updateUser(this.personalData.id, formData);
    this.changesSaved.emit();
  }

  addFile() {
    const htmlElement: HTMLInputElement = this.archive.nativeElement;
    const file = htmlElement.files![0];
    this.updateFormUser.patchValue({ archive: file });
  }
}
