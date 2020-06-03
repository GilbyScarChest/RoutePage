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

    user: User = {
        userId: 0,
        username: "",
        password: "",
        email: "",
        address: ""
    };

    // userModel: Observable<User>;
    
    form: FormGroup;
    deleteForm: FormGroup;
    updateForm: FormGroup;

    updateFlag = false;

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
            let foundUser = this.users.find(x => x.username == formValues.username && x.password == formValues.password)
            if (foundUser !== undefined) {

                this.service.deleteUser(foundUser).subscribe(
                    resp => console.log(resp)
                );
                console.log(formValues.username)
            }
            else {
                console.log("No Match Found")
                alert("No Matching Users Found");
            }
        }
    }

    deleteWhole(user: User) {
        this.service.deleteUser(user).subscribe (
            resp => console.log(resp)
        );
    }

    update() {
        let updatedUser = this.updateForm.value
        this.service.updateUser(updatedUser).subscribe (
            resp => console.log(resp)
        );
        this.updateFlag = false;
    }

    edit(user: User) {
        this.updateFlag = true;
        this.updateForm = this.formBuilder.group({
            userId: user.userId,
            username: user.username,
            password: user.password,
            email: user.email,
            address: user.address
        });

    }

}
