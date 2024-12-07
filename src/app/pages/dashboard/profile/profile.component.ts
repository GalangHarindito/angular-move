import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { profile } from '../../../store/action/profile.action';
import { Observable } from 'rxjs';
import { UserProfileState } from '../../../utils/app.state';
import { ProfileState } from '../../../store/reducers/profile/profile.reducer';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profileUser$ : Observable<ProfileState>
  constructor(private store: Store<UserProfileState>) {
    this.profileUser$ = this.store.select((state) => state.profile);
  }

  ngOnInit(): void {
    this.store.dispatch(profile());
    console.log(this.profileUser$)
  }

}
