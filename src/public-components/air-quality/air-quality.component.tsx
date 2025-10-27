// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Component, Element, forceUpdate, h, Host, Method, Prop, State, Watch } from "@stencil/core";
import { DivIcon, LayerGroup, Map, Marker, Polyline, Popup } from 'leaflet';
import { getLayoutClass, resolveLayoutAuto, ViewLayout } from "../../data/breakpoints";
import { LanguageDataService } from "../../data/language/language-data-service";
import { StencilComponent } from "../../utils/StencilComponent";
import { AirQualityDataService } from "../../data/air-quality/air-quality-data-service";
import { AirQualityShort } from "../../data/air-quality/AirQualityShort";

/**
 * Road air quality component
 *
 * @part list - stations list
 * @part map - Map
 * @part marker - Map marker
 * @part marker-icon - Map marker icon
 * @part popup - Popup dialog
 */
@Component({
  tag: 'noi-a22-air-quality',
  styleUrl: 'air-quality.css',
  shadow: true,
})
export class AirQualityComponent implements StencilComponent {

  /**
   * Language
   */
  @Prop({mutable: true})
  language = 'en';

  /**
   * Layout appearance
   */
  @Prop({mutable: true})
  layout: ViewLayout = 'auto';

  @State()
  layoutResolved: ViewLayout;

  sizeObserver: ResizeObserver = null;

  map: Map;
  markersLayer: LayerGroup;
  markerMap: { [stationId: string]: Marker } = {};

  selectedStationId: string = null;
  selectedMarker: Marker = null;

  @State()
  stationsList: AirQualityShort[] | null = [];

  @State()
  selectedStation: AirQualityShort = null;

  @Element() el: HTMLElement;

  airQualityDataService: AirQualityDataService;
  languageService: LanguageDataService;

  constructor() {
    this.onBackdropClick = this.onBackdropClick.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this._onLanguageChanged = this._onLanguageChanged.bind(this);
    this.mapReady = this.mapReady.bind(this);

    this.languageService = LanguageDataService.getInstance();
    this.airQualityDataService = new AirQualityDataService();
  }

  connectedCallback() {
    this.languageService.onLanguageChange.bind(this._onLanguageChanged);
    this.languageService.useLanguage(this.language);
    this._recalculateLayoutClass();
    this._watchSize();
  }

  disconnectedCallback() {
    this.languageService.onLanguageChange.unbind(this._onLanguageChanged);
    this._unwatchSize();
  }

  _onLanguageChanged() {
    forceUpdate(this.el);
  }

  /**
   * Reload camera data
   */
  @Method()
  async refreshData() {
    // re-subscribe to data source
    if (this.map) {
      await this.airQualityDataService.getAirQuality()
        .then(stationsList => {
          this.stationsList = stationsList;
          this._recalculateMarkers();
        });
    }
    forceUpdate(this.el);
  }

  @Watch('language')
  onLanguageChange() {
    return this.languageService.useLanguage(this.language);
  }

  async mapReady(event: CustomEvent<Map>) {
    this.map = event.detail;

    this.markersLayer = new LayerGroup();
    this.map.addLayer(this.markersLayer);

    // get route points
    const routePath = await this.airQualityDataService.getRoutePath();
    const roadLine = new Polyline([], {className: 'noi-map-line'});
    for (const p of routePath) {
      roadLine.addLatLng(p);
    }
    this.map.addLayer(roadLine);

    // center on line
    const bounds = roadLine.getBounds();
    this.map.setView(bounds.getCenter());
    this.map.setZoom(8); // TODO: zoom to fill the line

    ///
    this.map.addEventListener('popupclose', () => {
      this._selectStation(null);
    });

    //
    this.refreshData();
  }

  _recalculateMarkers() {
    for (const station of this.stationsList) {

      if ( !station.scode) {
        console.warn('Item skipped: missing camera ID');
        continue;
      }
      if (this.markerMap[station.scode]) {
        // marker already present on the map.
        // there is no update of marker label
        // also, removing camera is not supported
        continue;
      }

      //// create map marker
      const markerIcon = new DivIcon({
        html: `<div class="noi-marker air-quality--${station.value}" part="marker"
            ><noi-icon name="pointer" part="marker-icon"></noi-icon></div>`,
        className: 'noi-marker-leaflet',
        // className: markerID + " icona-multipla-" + nMarkers + " direzione-" + IDTratta.toLowerCase(),

        iconSize: [24, 24], // size of the icon
        iconAnchor: [12, 22] // point of the icon which will correspond to marker's location
      });

      const marker = new Marker(station.coordinate, {icon: markerIcon});
      this.markerMap[station.scode] = marker;
      marker.addEventListener('click', () => {
        this._selectStation(station.scode);
      });
      this.markersLayer.addLayer(marker);
    }
  }

  _selectStation(stationId?: string) {
    // remove selection
    if (this.selectedMarker) {
      this.selectedMarker.getElement().classList.remove('selected');
    }

    // assign new data
    this.selectedStationId = stationId;
    this.selectedMarker = this.markerMap[this.selectedStationId];
    this.selectedStation = this.stationsList.find(wc => wc.scode === this.selectedStationId);

    // add selection
    if (this.selectedMarker) {
      this.selectedMarker.getElement().classList.add('selected');

      // popup is destroyed by leaflet when it's closed
      new Popup(this.selectedMarker.getLatLng(), {
        offset: [0, -14],
        content: this.getPopupHTML(),
        closeButton: false, // 'closeButton' is not declared in types
        autoPan: true,
      } as any).openOn(this.map);
    }

    forceUpdate(this.el);
  }

  onBackdropClick() {
    this._selectStation(null);
  }

  itemClick(event: CustomEvent<AirQualityShort>) {
    this._selectStation(event.detail.scode);
  }

  @Watch('layout')
  _recalculateLayoutClass() {
    this.layoutResolved = resolveLayoutAuto(this.el.offsetWidth, this.layout);
  }

  _watchSize() {
    if (typeof window.ResizeObserver === 'function') {
      this.sizeObserver = new ResizeObserver(() => {
        this._recalculateLayoutClass();
      });
      this.sizeObserver.observe(this.el);
    } else {
      console.warn('ResizeObserver is not supported');
    }
  }

  _unwatchSize() {
    if (this.sizeObserver) {
      this.sizeObserver.unobserve(this.el);
      this.sizeObserver = null;
    }
  }


  render() {
    return (
      <Host class={getLayoutClass(this.layoutResolved)}>
        <div class="layout__content">
          <noi-air-quality-list class="layout__list"
                                part="list"
                                layout={this.layoutResolved}
                                idSelected={this.selectedStationId}
                                stationArr={this.stationsList}
                                onItemClick={e => this.itemClick(e)}></noi-air-quality-list>
          <div class="layout__center">
            <noi-map part="map" onMapReady={e => this.mapReady(e)}></noi-map>
            {/*
          <noi-backdrop hidden={ !this.selectedStation} onBackdropClick={() => this.onBackdropClick()}>
            {this.selectedStation ? this._renderPopup() : null}
          </noi-backdrop>
          */}
          </div>
        </div>
        {this._renderFooter()}
      </Host>
    );
  }

  getPopupHTML() {
    return `<div class="popup" part="popup">
      <div class="popup__title">
        <span class="popup__title-box air-quality--${this.selectedStation.value}"></span>
        <span class="popup__title-text">${this.selectedStation.sname}</span>
      </div>
      <div class="popup__border"></div>
      <div class="popup__values">
        <span class="popup__values-label">${this.languageService.translate('app.parameter.no2')} </span>
        <span class="popup__values-value">${this.languageService.translate('app.air.quality--' + this.selectedStation.value)}</span>
      </div>
      <div class="popup__border"></div>
      <div class="popup__date">
        <noi-icon name="info"></noi-icon>
        <span>${this.languageService.translate('app.measureTime')}: ${this.selectedStation.validtimeLocalized}</span>
      </div>
    </div>`;
  }

  _renderFooter() {
    return (<div class="layout__footer" part="footer">
      <div class="legend">
        <div class="legend__item air-quality--1">
          <div class="legend__item-content air-quality-contrast--1">{this.languageService.translate('app.air.quality--1')}</div>
        </div>
        <div class="legend__item air-quality--2">
          <div class="legend__item-content air-quality-contrast--2">{this.languageService.translate('app.air.quality--2')}</div>
        </div>
        <div class="legend__item air-quality--3">
          <div class="legend__item-content air-quality-contrast--3">{this.languageService.translate('app.air.quality--3')}</div>
        </div>
        <div class="legend__item air-quality--4">
          <div class="legend__item-content air-quality-contrast--4">{this.languageService.translate('app.air.quality--4')}</div>
        </div>
        <div class="legend__item air-quality--5">
          <div class="legend__item-content air-quality-contrast--5">{this.languageService.translate('app.air.quality--5')}</div>
        </div>
        <div class="legend__item air-quality--6">
          <div class="legend__item-content air-quality-contrast--6">{this.languageService.translate('app.air.quality--6')}</div>
        </div>
      </div>
    </div>);
  }
}
