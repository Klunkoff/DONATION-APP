import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {

  @Input() data: string[] = [];
  @Input() value: string = '';

  @Output() currentCategory: EventEmitter<string> = new EventEmitter();

  title: string = 'Select Category';
  selectedValue: string = '';

  onChange(): void { 

    if(this.selectedValue !== this.title) {
      console.log(this.selectedValue);
      
      this.currentCategory.emit(this.selectedValue);
    }

  }

}
