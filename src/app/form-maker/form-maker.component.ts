import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

interface CAFormFieldTypes {
  id: number;
  label: string;
}

const CAFormFieldTypeHeader = { id: 1, label: 'Header'};
const CAFormFieldTypeDate = { id: 2, label: 'Date'};
const CAFormFieldTypeDropdown = { id: 3, label: 'Dropdown'};

@Component({
  selector: 'app-form-maker',
  templateUrl: './form-maker.component.html',
  styleUrls: ['./form-maker.component.scss']
})
export class FormMakerComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    const form = this.fb.group({
      name: ['', Validators.required],
      fields: this.fb.array([]),
    });

    this.form = form;
  }

  ngOnInit() {}

  private buildNewFieldGroup(): FormGroup {
    const newField = this.fb.group({
      name: ['', Validators.required],
      fieldType: [''],
      isRequired: [false],
      currentValue: [],
      allowedValues: this.fb.array([]),
    });
    return newField;
  }

  get fields(): FormArray {
    return (<FormArray>this.form.get('fields'));
  }

  onAddField(index: number = 0) {
    this.fields.insert(index, this.buildNewFieldGroup());
  }

  onRemoveField(index: number) {
    this.fields.removeAt(index);
  }

  get allowedFormFieldTypes(): CAFormFieldTypes[] {
    return [
      CAFormFieldTypeHeader,
      CAFormFieldTypeDate,
      CAFormFieldTypeDropdown
    ]
  }

  get headerFieldTypeId(): number {
    return CAFormFieldTypeHeader.id;
  }

  get dateFieldTypeId(): number {
    return CAFormFieldTypeDate.id;
  }

  get dropdownFieldTypeId(): number {
    return CAFormFieldTypeDropdown.id;
  }

  private buildNewDropdownOption(): FormGroup {
    return this.fb.group({
      optionValue: ['']
    });
  }

  onAddFieldOption(field: FormControl) {
    (<FormArray>field.get('allowedValues')).push(this.buildNewDropdownOption());
  }

  onRemoveFieldOption(field: FormControl, index: number) {
    (<FormArray>field.get('allowedValues')).removeAt(index);
  }

  public get debugForm(): any {
    return (this.form)
      ? this.form.getRawValue()
      : null;
  }

  onGenerateForm(): void {
    console.log(this.form.getRawValue());
  }

}
