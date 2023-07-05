import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fa, faker } from '@faker-js/faker';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchText: string = '';

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getUserData();
    this.userService.newUser$.subscribe((user) => {
      this.users.push(user);
      // this.filteredUsers.push(user);
    });

    this.userService.keyword$.subscribe((keyword) => {
      this.filteredUsers = this.users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(keyword) ||
          user.lastName.toLowerCase().includes(keyword)
      );
    });
  }

  getUserData() {
    this.userService.getUsersList().subscribe((users: User[]) => {
      this.users = users.map(user => {
        const random = Math.floor(Math.random() * 50);
        user.avatar = `https://i.pravatar.cc/150?img=${random}`;
        return user;
      });
      this.filteredUsers = this.users;
    });
  }


  editUser(userId: number) {
    this.router.navigate(['dashboard/users', userId]);
    this.userService.isEditStatus(true);
  }

}
