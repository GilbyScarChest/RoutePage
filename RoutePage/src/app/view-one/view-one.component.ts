import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RouteServiceService } from '../route-service.service';
import { User } from 'src/Interfaces/User';
import { ViewOneChild1Component } from '../view-one-child1/view-one-child1.component';

@Component({
  selector: 'app-view-one',
  templateUrl: './view-one.component.html',
  styleUrls: ['./view-one.component.css']
})
export class ViewOneComponent implements OnInit {

    
    constructor(private service: RouteServiceService, private changedetector: ChangeDetectorRef) { }

  @ViewChild(ViewOneChild1Component) child;

  ngOnInit(): void {
      this.getListUsers()
  }

  ngAfterViewInit() {
      this.variable = this.child.childSubmitText;
      this.changedetector.detectChanges();
  }

  users: User[];
  user: User;
  variable = "this works";


  getListUsers(): void {
      this.service.getAllUsers().subscribe(
          (resp: User[]) => {
              this.users = resp
          }
      );
  }

}
