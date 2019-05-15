import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "form-input-item",
  templateUrl: "./form-input-item.component.html",
  styleUrls: ["./form-input-item.component.css"]
})
export class FormInputItemComponent implements OnInit {
  @Input() inputItemType;
  @Input() inputItemId;
  @Input() inputItemName;
  constructor() {}

  ngOnInit() {}
}
