import { Component, OnInit } from '@angular/core';

import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

import { fromEventPattern } from 'rxjs';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  constructor(private leaderService:LeaderService ) { }

  ngOnInit() {
    this.leaderService.getLeaders()
      .then(leader => this.leaders = leader);
  }

}
