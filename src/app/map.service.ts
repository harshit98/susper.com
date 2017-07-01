import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from './shared/maps/location.class';
import { Map, L } from 'leaflet';

@Injectable()
export class MapService {
  map: Map;
  _baseMap: any;

    constructor(private http: Http) {
        this._baseMap = {
            OpenStreetMap: L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
            }),
        };
    }

   _disableMouseEvent(elementId: string) {
     let element = <HTMLElement>document.getElementById(elementId);

     L.DomEvent.disableClickPropagtion(element);
     L.DomEvent.disableScrollPropagtion(element);
   }

}
