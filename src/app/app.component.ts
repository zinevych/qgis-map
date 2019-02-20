import { Component } from '@angular/core';
declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'medium articles';
  lat: number = 36.778259;
  lng: number = -119.417931;
  zoom: number = 6;
  mapInstance: any = null;

  setMapInstance (event: any): void {
    this.mapInstance = event;

    this.mapInstance.overlayMapTypes.clear();
    this.mapInstance.overlayMapTypes.insertAt(0, this.getLayer());
  }

  getLayer() {
    let TILE_URL = 'http://127.0.0.1:8080/wildfire/{z}/{x}/{y}.png';
    let layerID = 'wildfire_layer';

    const layer = new google.maps.ImageMapType({
      name: layerID,
      getTileUrl: function(coord, zoom) {
          let url = TILE_URL
              .replace('{x}', coord.x)
              .replace('{y}', coord.y)
              .replace('{z}', zoom);
          return url;
      },
      tileSize: new google.maps.Size(256, 256)
  });
  return layer;
  }
}
