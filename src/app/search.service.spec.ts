/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { MockConnection, MockBackend } from '@angular/http/testing';
import { Http, Jsonp, BaseRequestOptions, RequestMethod, Response, ResponseOptions, HttpModule, JsonpModule } from '@angular/http';
import { SearchService } from './search.service';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/index';
import { MockSearchApi } from './shared/mock-backend/item.mock';

const mockJsonp_provider = {
  provide: Jsonp,
  deps: [MockBackend, BaseRequestOptions],
  useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
    return new Jsonp(backend, options);
  }
};

describe('Service: SearchService', () => {
  let service: SearchService = null;
  let backend: MockBackend = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule,
        JsonpModule,
        StoreModule.provideStore(reducer)
      ],
      providers: [
        SearchService,
        MockBackend,
        BaseRequestOptions,
        mockJsonp_provider
      ]
    });
  });

  beforeEach(inject([SearchService, MockBackend], (searchService: SearchService, mockBackend: MockBackend) => {
    service = searchService;
    backend = mockBackend;
  }));

  const searchquery = 'Berlin';
  const result = MockSearchApi;

  it('should create an instance of search service',
    inject([SearchService, MockBackend], () => {
      expect(service).toBeTruthy();
    })
  );

  it('should call the search api and return search results', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(result)
      });
      connection.mockRespond(new Response(options));
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual(
        `http://yacy.searchlab.eu/solr/select` +
                `?&wt=${searchquery}` +
                `&callback=JSONP_CALLBACK` +
                `&facet=true&facet.mincount=1` +
                `&facet.field=host_s&facet.field=url_protocol_s` +
                `&facet.field=author_sxt&facet.field=collection_sxt` 
      );
    });

    service.getsearchresults(searchquery).subscribe((res) => {
      expect(res).toEqual(result);
    });
  });

});
