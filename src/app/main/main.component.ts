import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  rulesArr = new FormArray([]);
  revenueForm: FormGroup;

  info: any = [];


  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.revenueForm = this.formBuilder.group({
      group_name: ['', Validators.required],
      group_description: ['', Validators.required],
      group_revenue: ['', Validators.required],
      group_rules: this.formBuilder.array([])
    });

    this.rules.push(this.newRules());

  }


  get rules(): FormArray {
    return this.revenueForm.get("group_rules") as FormArray
  }


  // rules function lists //
  newRules(): FormGroup {
    return this.formBuilder.group({
      field: [''],
      operator: [''],
      parameters: this.formBuilder.array([]),
    })
  }

  addRules() {
    this.rules.push(this.newRules());


  }

  removeRules(i: number) {
    this.rules.removeAt(i);
  }



  // rules' parameter function lists
  ruleParameters(i: number): FormArray {
    return this.rules.at(i).get('parameters') as FormArray
  }

  newParameters(): FormGroup {
    return this.formBuilder.group({
      param_name: ['']
    })
  }

  addParameters(i: any) {
    this.ruleParameters(i).push(this.newParameters());
  }

  removeParameters(i: number, j: any) {
    this.ruleParameters(i).removeAt(j);
  }



  submitForm(value: any) {
    console.log(value);

    this.info.push(value);
    console.log(this.info);
    this.revenueForm.reset();



  }

  deleteRulesArr(index: number) {
    // this.info.splice(index)
    Swal.fire({
      title: 'Are you sure to delete this rule?',
      timer: 3000,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        this.info.splice(index)
      } else {

      }
    })
  }

  reset() {
    this.revenueForm.reset();
    this.info = [];
  }
}
