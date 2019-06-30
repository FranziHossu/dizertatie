import {Component} from "@angular/core";
import {UserService} from "@/services/user.service";
import {Router, ActivatedRoute} from "@angular/router";
import {User} from "@/models";

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  public user: User;
  public email: any;
  public username: any;
  public firstName: any;
  public lastName: any;
  public role: number;
  public editInfo = false;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params.id) {
      const subs = this.userService.getUser(this.activatedRoute.snapshot.params.id).subscribe((data: any) => {
        this.user = data;
        this.email = this.user.email;
        this.username = this.user.username;
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.role = this.user.role;
        subs.unsubscribe();
      }, () => {
        subs.unsubscribe();

      })
    }
  }

  public toggleEdit() {
    this.editInfo = !this.editInfo;
  }

  public saveEdit() {
    const user: User = new User();
    user.id = this.user.id;
    user.lastName = this.lastName;
    user.firstName = this.firstName;
    user.email = this.email;
    user.username = this.username;
    user.role = this.role;

    this.userService.updateUser(user).subscribe((data: any) => {
      this.toggleEdit();
    }, () => {
      this.username = this.user.username;
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.email = this.user.email;
    });

  }

  public revertEdit() {
    this.username = this.user.username;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.email = this.user.email;
    this.email = this.user.email;
    this.role = this.user.role;
    this.toggleEdit();
  }

  public onChange(value: any) {
    console.log(value);
  }

}
