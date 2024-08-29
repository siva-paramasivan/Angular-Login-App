import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements OnInit {
  users: User[] | undefined = [];

  constructor(
    private userService: UserService,
    protected changeDetectorRef: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.userService.getAllUsers().pipe(first()).subscribe(users => {
      this.users = users;
      this.changeDetectorRef.detectChanges();       //To detect the changes manually in onPush Strategy
    });
  }
}
