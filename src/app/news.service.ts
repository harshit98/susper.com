import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsService {

  public sportsNews: string = 'http://sports.espn.go.com/espn/rss/news';

  constructor(
    private http: Http,
    private jsonp: Jsonp
  ) { }

  getNews() {
    return this.http.get(this.sportsNews).map(response => {
      response.json()
    });
  }
}
