import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { fa, faker } from '@faker-js/faker';
import { Router } from '@angular/router';


interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  zipcode: string;
  country: string;
  avatar: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchText: string = '';
  editMode: boolean = false;
  constructor(private router: Router, private userService: UserService) { }
  

  ngOnInit() {
    this.userService.isEdit$.subscribe((isEdit) => {
      this.editMode = isEdit;
    });
  }
  createUser() {
    const random = Math.floor(Math.random() * 50);
    const newUser: User = {
      id: this.users.length + 1,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      zipcode: faker.address.zipCode(),
      country: faker.address.country(),
      avatar: `https://i.pravatar.cc/150?img=${random}`,
    };
    this.userService.addNewUser(newUser);
  }

  editUser(userId: number) {
    this.router.navigate(['dashboard/users', userId]);
    this.editMode = true;
  }

  search(): void {
    const searchTerm = this.searchText.toLowerCase();
    this.userService.updateKeyword(searchTerm);
  }
}

