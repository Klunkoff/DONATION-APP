import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnChanges {

  @Input() data: string[] = [];
  @Input() value: string = '';
  @Input() name: string = '';

  @Output() currentCategory: EventEmitter<string> = new EventEmitter();

  title: string = 'Select Category';
  selectedValue: string = '';

  onChange(): void { 

    if(this.selectedValue !== this.title) {
      this.currentCategory.emit(this.selectedValue);
      
    }
  }


  ngOnChanges(): void {
    this.selectedValue = this.value ?? this.title;
  }

}
