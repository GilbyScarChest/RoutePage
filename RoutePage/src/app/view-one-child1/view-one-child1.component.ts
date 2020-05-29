import { Component, OnInit, Input, Output, ChangeDetectorRef } from '@angular/core';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-view-one-child1',
  templateUrl: './view-one-child1.component.html',
  styleUrls: ['./view-one-child1.component.css']
})
export class ViewOneChild1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() newVariable: string; // passing information from the parent to the child.

  childSubmitText: string;
//   testProperty: string = "this is a test";

//   @Output() public outputVariable = new EventEmitter();

  childSubmit() {
      this.childSubmitText = "This child text is working!";
  }



}
