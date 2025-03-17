import {
  Component,
  Input,
  forwardRef,
  ElementRef,
  ViewChild,
  OnInit,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";

@Component({
  selector: "app-input",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  imports: [FormsModule],
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.scss",
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @ViewChild("input") public input!: ElementRef;

  @Input() public required: boolean = true;
  @Input() public label: string = "";
  @Input() public type: string = "";
  @Input() public name: string = "";
  @Input() public id: string = "";

  private _value: string = "";

  public ngOnInit(): void {
    this.id = this.id + `-input`;
    this.name = this.name + `Input`;
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
