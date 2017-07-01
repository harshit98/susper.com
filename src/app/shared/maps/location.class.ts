import { LatLong } from './latlong.interface';
import { LatLngBounds } from 'leaflet';

export class Location implements LatLong {
    latitude: number;
    longitude: number;
    address: string;
    viewBounds: LatLngBounds;
}
