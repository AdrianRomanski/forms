import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CarFormData, CarPayload, ComfortFeature} from "../../model/car.model";

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent {
  @Input()
  public set catFormData(data: CarFormData) {
    this.data = data;
    let comfortFeaturesGroup: any = {};
    data.comfortFeatures.forEach((cf:ComfortFeature) => {
        this.comfortFeatureToId[cf.name] = cf.id;
        comfortFeaturesGroup[cf.name] = false
      }
    );
    this.form = this.initializeForm(comfortFeaturesGroup);
  }

  @Output()
  submitClicked: EventEmitter<CarPayload> = new EventEmitter<CarPayload>();

  form!: FormGroup;
  data!: CarFormData;
  comfortFeatureToId: any = {};

  constructor(private fb: FormBuilder) {}

  onPlusClicked(): void {
    this.securityFeatures.push(this.fb.control(''))
  }

  onSubmitClicked(): void {
    /**
     * I was not sure about Security Features and Comfort Features
     * From what I could see on the picture with payload I should send array with ids
     * but in description of exercise it's stated
     * - Comfort Features Form Group with mat-checkbox
     * - Security Features form array with mat-radio-group of security features
     * - "All form should be sent to the endpoint (1 point) (figure 2):"
     * - im not sure if that fit's
     *  I decided to follow form-group and form-array pattern and then map the data to id's
     *  onCheckBoxChange() -> that's my idea with single FormControl holding array of values
     *  its unused now. I had similar idea with ComfortFeatures -> onChange just add id to array
     */
    this.submitClicked.emit(this.createPayloadFromForm());
  }

  castAbstractControlToFormControl(abstractControl: AbstractControl): FormControl {
    return abstractControl as FormControl;
  }

  isTouchedAndDirty(control: AbstractControl<any, any>): boolean {
    return control.touched && control.dirty;
  }

  get model(): FormControl {
    return this.form.get('model') as FormControl;
  }

  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }

  get brandId(): FormControl {
    return this.form.get('brandId') as FormControl;
  }

  get securityFeaturesControls(): AbstractControl<any, any>[] {
    return this.securityFeatures.controls;
  }

  get comfortFeatures(): FormGroup {
    return this.form.get('comfortFeatures') as FormGroup;
  }

  get securityFeatures(): FormArray {
    return this.form.get('securityFeatures') as FormArray;
  }

  get modelRequiredInvalid(): boolean {
    return this.model
      ? this.isTouchedAndDirty(this.model) && this.model?.errors?.['required']
      : false;
  }

  get descriptionRequiredInvalid(): boolean {
    return this.description
      ? this.isTouchedAndDirty(this.description) && this.description?.errors?.['required']
      : false;
  }

  private initializeForm(comfortFeaturesGroup: any): FormGroup {
    return this.fb.group({
        model: ['', Validators.required],
        description: ['', Validators.required],
        brandId: ['', Validators.required],
        comfortFeatures: this.fb.group(comfortFeaturesGroup),
        securityFeatures: this.fb.array([this.fb.control('')]),
      }
    );
  }

  private createPayloadFromForm(): CarPayload {
    const comfortFeatureIds: string[] = [];
    for (const [key, value] of Object.entries(this.comfortFeatures.value)) {
      if (value) {
        comfortFeatureIds.push(this.comfortFeatureToId[key]);
      }
    }
    const securityFeatureIds: string[]  = this.securityFeaturesControls
      .map((control: AbstractControl<any,any>) => control.value.id);
    return {
      brandId: this.brandId.value,
      description: this.description.value,
      model: this.model.value,
      comfortFeatureIds,
      securityFeatureIds
    }
  }

  /**
   * First idea on comfortFeature
   */
  // onCheckBoxChange(isChecked: boolean, comfortFeature: ComfortFeature): void {
  //   const comfortFeaturesIds: string[] = this.comfortFeatures.value;
  //   this.comfortFeatures.setValue(isChecked
  //     ? [comfortFeature, ...comfortFeaturesIds]
  //     : comfortFeaturesIds.filter((id: string) => comfortFeature.id === id)
  //   );
  // }
}
