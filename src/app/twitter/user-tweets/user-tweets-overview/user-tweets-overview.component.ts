import { Component, Input, OnInit } from '@angular/core';
import { UserOverviewModel } from '../../../models/user-overview.model';

@Component({
  selector: 'app-user-tweets-overview',
  templateUrl: './user-tweets-overview.component.html',
  styleUrls: ['./user-tweets-overview.component.css']
})
export class UserTweetsOverviewComponent {

  @Input() userOverview: UserOverviewModel;

}
