import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Jsonp, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import * as search from './actions/search';
import { Observable } from 'rxjs';

@Injectable()
export class NewsService {

  server = 'http://www.espn.in';
  searchURL = this.server + '/search/results?';
  homepage = 'http://susper.com';
  logo = '../images/susper.svg';

  constructor(
    private http: Http,
    private jsonp: Jsonp,
    private store: Store<fromRoot.State>
  ) { }

  getSearchResults(searchQuery) {
    let params = new URLSearchParams();
    params.set('q', searchQuery);

    let headers = new Headers({ 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers, search: params});
    return this.http
        .get(this.searchURL, options)
        .map(response => {
          response.json()
        })
        .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
