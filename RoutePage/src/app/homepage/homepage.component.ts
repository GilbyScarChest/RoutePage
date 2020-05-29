import { Component, OnInit, Output } from '@angular/core';
import { RouteServiceService } from '../route-service.service';
import { User } from 'src/Interfaces/User';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    users: User[];
    // user: User;

    user: User = {
        userId: 0,
        userName: "",
        password: "",
        email: "",
        address: ""
    };

    form: FormGroup;
    userModel: Observable<User>;

    deleteForm: FormGroup;

    // email = new FormControl('') // demo of FormControl in Reactive Forms

  constructor(private service: RouteServiceService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.service.getAllUsers().subscribe(
            (resp: User[]) => {
                this.users = resp
            }
        );
        

        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', Validators.required],
            address: ['', Validators.required]
        });

        this.deleteForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        })
    }

    // @Output() refresh = new EventEmitter(); // trying to refresh the component after submit

    submit() {
        if(this.form.valid) {
            console.log(this.form.value);
            this.user.userId *= 1; // making sure the UserId is an integer not a string
            this.service.postUser(this.form.value).subscribe(
                resp => console.log(resp)
                // () => this.refresh.emit();
            );
            
        }
    }

    deleteByForm() {
        if(this.deleteForm.valid) {
            let formValues = this.deleteForm.value
            let foundUser = this.users.filter(({password}) => password == formValues.password)
            // let deleteUser: User = foundUser // how do I get my Array selection down to a single instance of User??
            // this.service.deleteUser(deleteUser)
            console.log(foundUser)
        }
    }

    deleteWhole() {
        
        
    }

    edit() {
        console.log("edit");
    }

}
