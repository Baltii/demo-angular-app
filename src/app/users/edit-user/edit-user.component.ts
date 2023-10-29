import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/services.service';
import { User } from '../model/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  constructor(
    private activatedRoute : ActivatedRoute,
    private service : UserService,
    private formBuilder : FormBuilder,
    private router : Router){}

  User? : User;
  //Reactive Form
  editForm = this.formBuilder.group({
    name : '',
    email : '',
    password : ''
  });




  editUser = ()=>{
    //console.log(this.editForm);
    const values = this.editForm.value;
    this.service.editUser(
      new User(this.User!.id, values.name!, values.email!, values.password!)
    ).subscribe(
      User => this.router.navigate(['/users'])
    );
  }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params=>{
        //this.User = this.service.getUserById(+params['id']);
        this.service.getUserById(+params['id']).subscribe(
          User=> {
            this.User = User;

            //console.log(this.User);
            this.editForm.setValue({
              name : this.User.name,
              email : this.User.email,
              password : this.User.password + ''
            })
          }
        )
      }
    )

  }
}
