import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';
import {IntelligenceService} from "../intelligence.service";

@Component({
  selector: 'app-intelligence',
  templateUrl: './intelligence.component.html',
  styleUrls: ['./intelligence.component.css']
})
export class IntelligenceComponent implements OnInit {
  wholequery$: Observable<any>;
  actions: Array<any> = [];
  answer: any;
  visible: boolean;

  constructor(private store: Store<fromRoot.State>, private intelligence: IntelligenceService) {
    this.wholequery$ = store.select(fromRoot.getwholequery);
    this.wholequery$.subscribe(data => {
      this.intelligence.getintelligentresponse(data.query).subscribe(res => {
        if (res && res.answers && res.answers[0].actions) {
          this.actions = res.answers[0].actions;
          for (let action of this.actions){
            if (action.type === 'answer' && action.mood !== 'sabta') {
               this.answer = action.expression;
               this.visible = true;

               if (this.answer === "I can't feel it in here but did you try using fan? It will help you.") {
                 this.visible = false;
               } else {
                 this.visible = true;
               }
            } else {
              this.answer = '';
              this.visible = false;
            }
          }
        } else {
          this.answer = '';
          this.visible = false
        }
      });
    });
  }

  ngOnInit() {

  }


}
