import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donation-edit',
  templateUrl: './donation-edit.component.html',
  styleUrls: ['./donation-edit.component.css']
})
export class DonationEditComponent implements OnInit {

  postID: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }



  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {

      const currentID = params['id'];

      if(currentID) {
        this.postID = currentID;
        console.log(this.postID);
        
      }

    });
    
  }
}
