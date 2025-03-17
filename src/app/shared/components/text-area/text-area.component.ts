import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from "@angular/core";
import { FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-text-area",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true,
    },
  ],
  imports: [FormsModule],
  templateUrl: "./text-area.component.html",
  styleUrl: "./text-area.component.scss",
})
export class TextAreaComponent {
  @ViewChild("textarea") public textarea!: ElementRef;

  @Input() public required: boolean = true;
  @Input() public label: string = "";
  @Input() public type: string = "";
  @Input() public name: string = "";
  @Input() public id: string = "";

  private _value: string = "";

  public ngOnInit(): void {
    this.id = this.id + `-textarea`;
    this.name = this.name + `textarea`;
  }

  public get value(): string {
    return this._value;
  }

  public set value(val: string) {
    this._value = val;
    this.onChange(val);
  }

  public onChange: (value: string) => void = () => {};
  public onTouched: () => void = () => {};

  public writeValue(value: string): void {
    if (value) this._value = value;
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
