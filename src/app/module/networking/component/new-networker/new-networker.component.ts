import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { INetworker } from "../../interface/networker.interface";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-new-networker",
  templateUrl: "./new-networker.component.html",
  styleUrls: ["./new-networker.component.css"],
})
export class NewNetworkerComponent implements OnInit {

  public networkingForm: FormGroup;

  @Output()
  public onNew = new EventEmitter<INetworker>();

  @Output()
  public onBack = new EventEmitter();

  public constructor(private _formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.networkingForm = this._formBuilder.group({
      "firstName": [
        "", Validators.compose([
          Validators.required,
        ]),
      ],
      "lastName": [
        "", Validators.compose([
          Validators.required,
        ]),
      ],
      "email": [
        "", Validators.compose([
          Validators.required,
          Validators.email,
        ]),
      ],
      "want": [
        "",
      ],
      "offer": [
        "",
      ],
    })
    ;
  }

  public onSubmit(): void {
    this.onNew.emit(this.networkingForm.value);
    this.networkingForm.reset();
  }

  public onReject(): void {
    this.onBack.emit();
  }

}
