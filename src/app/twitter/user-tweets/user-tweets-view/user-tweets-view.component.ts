import {Component, OnInit} from '@angular/core';
import {TweetModel} from "../../../models/tweet.model";
import {TweetService} from "../../../services/tweet/tweet.service";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Params} from "@angular/router";
import { UserOverviewModel } from '../../../models/user-overview.model';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-user-tweets-view',
  templateUrl: './user-tweets-view.component.html',
  styleUrls: ['./user-tweets-view.component.css']
})
export class UserTweetsViewComponent implements OnInit {

  $tweets: Observable<TweetModel[]>;
  $userOverview: Observable<UserOverviewModel>;
  userName: string;

  constructor(private tweetService: TweetService, private userService: UserService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userName = params['username'];
      this.$tweets = this.tweetService.fetchForUser(this.userName);
      this.$userOverview = this.userService.userOverview(this.userName);
    });
  }

}
