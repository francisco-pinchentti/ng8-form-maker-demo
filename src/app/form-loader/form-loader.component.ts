import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { CAFormFieldTypeHeader, CAFormFieldTypeDate, CAFormFieldTypeDropdown } from '../models/CAFormFieldTypes';

@Component({
  selector: 'app-form-loader',
  templateUrl: './form-loader.component.html',
  styleUrls: ['./form-loader.component.scss']
})
export class FormLoaderComponent implements OnInit {

  public formJSON: string = '';
  public isValidJSON: boolean = false;

  public form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formJSON = '';
    this.isValidJSON = false;
  }

  onJSONUpdate(newValue: string): void {
    try {
      const formJSON = JSON.parse(newValue);

      const fields = formJSON.fields.map(f => {
        const isMandatory = (f.isMandatory)
          ? Validators.required
          : null;

        const currentValue = (f.fieldType === this.dropdownFieldTypeId)
          ? f.allowedValues.find(av => av.optionValue === fields.currentValue)
          : f.currentValue;

        const group = this.fb.group({
          name: [f.name],
          fieldType: [f.fieldType],
          currentValue: [currentValue, isMandatory],
          allowedValues: this.fb.array(f.allowedValues.map(av => this.fb.group(av)) || [])
        });

        return group;
      });

      const form = this.fb.group({
        name: [formJSON.name],
        fields: this.fb.array(fields)
      });

      this.form = form;
      this.isValidJSON = true;
    } catch (e) {
      console.error(e);
      this.isValidJSON = false;
    }
  }

  get fields(): FormArray {
    return (this.form)
      ? (<FormArray>this.form.get('fields'))
      : this.fb.array([]);
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

  get isValid(): boolean {
    return this.form && this.form.valid;
  }

}
