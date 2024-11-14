import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { employee } from './model/employee';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  empForm: FormGroup = new FormGroup({});
  empObj: employee = new employee();
  empList: employee[] = [];
  show:boolean=false
  constructor() {
    this.createForm();
    const oldData = localStorage.getItem('empData');
    if (oldData) {
      this.empList = JSON.parse(oldData);
    }
  }
  createForm() {
    this.empForm = new FormGroup({
      empId: new FormControl(this.empObj.empId),
      empName: new FormControl(this.empObj.empName),
      empEmail: new FormControl(this.empObj.empEmail),
      empNumber: new FormControl(this.empObj.empNumber),
      empState: new FormControl(this.empObj.empState),
      empAddress: new FormControl(this.empObj.empAddress),
      empPassword: new FormControl(this.empObj.empPassword),
    });
  }
  onSave() {
    const oldData = localStorage.getItem('empData');
    if (oldData) {
      this.empForm.controls['empId'].setValue(this.empList.length + 1);
      this.empList.unshift(this.empForm.value);
    } else {
      this.empList.unshift(this.empForm.value);
    }
    localStorage.setItem('empData', JSON.stringify(this.empList));
    this.createForm();
  }
  delete(id: number) {
    this.empList.splice(id, 1);
    localStorage.setItem('empData', JSON.stringify(this.empList));
  }
  edit(item: employee) {
    this.showEdit()
    this.empObj = item;
    this.createForm();
    this.showEdit()
  }
  showEdit(){
    this.show = true
    return this.show
  }
  onUpdate(id: number) {
    this.show = false
    const record = this.empList.find((x) => x.empId === id);
    if (record) {
      record.empName = this.empForm.controls['empName'].value;
      record.empEmail = this.empForm.controls['empEmail'].value;
      record.empNumber = this.empForm.controls['empNumber'].value;
      record.empState = this.empForm.controls['empState'].value;
      record.empAddress = this.empForm.controls['empAddress'].value;
      record.empPassword = this.empForm.controls['empPassword'].value;
    }
    localStorage.setItem('empData', JSON.stringify(this.empList));
    this.empForm.reset();
  }
}
