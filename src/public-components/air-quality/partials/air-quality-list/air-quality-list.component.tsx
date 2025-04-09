// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Component, Element, Event, EventEmitter, forceUpdate, h, Host, Prop, State, Watch } from "@stencil/core";
import { prepareSearchString } from "../../../../utils/quickSearch";
import { LanguageDataService } from "../../../../data/language/language-data-service";
import { getLayoutClass, ViewLayout } from "../../../../data/breakpoints";
import { AirQualityShort } from "../../../../data/air-quality/AirQualityShort";
import { StencilComponent } from "../../../../utils/StencilComponent";

/**
 * (INTERNAL) part of 'noi-a22-air-quality'
 */
@Component({
  tag: 'noi-air-quality-list',
  styleUrl: 'air-quality-list.css',
  scoped: true,
})
export class AirQualityListComponent implements StencilComponent {

  @Prop({mutable: true})
  stationArr: AirQualityShort[] | null = null;

  @Prop({mutable: true})
  idSelected: string = null;

  @Prop({mutable: true})
  layout: ViewLayout;

  @State()
  searchString: string = null;

  @State()
  stationArrFiltered: AirQualityShort[] = [];

  @Event()
  itemClick: EventEmitter<AirQualityShort>;

  @Element() el: HTMLElement;

  languageService: LanguageDataService;

  constructor() {
    this._renderItem = this._renderItem.bind(this);
    this._onLanguageChanged = this._onLanguageChanged.bind(this);

    this.languageService = LanguageDataService.getInstance();
  }

  connectedCallback() {
    this.languageService.onLanguageChange.bind(this._onLanguageChanged);
  }

  disconnectedCallback() {
    this.languageService.onLanguageChange.unbind(this._onLanguageChanged);
  }

  _onLanguageChanged() {
    forceUpdate(this.el);
  }

  filterData(searchString: string) {
    this.searchString = searchString;
  }

  @Watch('searchString')
  @Watch('stationArr')
  onDataChange() {
    if ( !this.searchString) {
      this.stationArrFiltered = this.stationArr;
      return;
    }

    const searchToken = prepareSearchString(this.searchString);
    this.stationArrFiltered = [];
    for (const wc of this.stationArr) {
      const wcToken = prepareSearchString(wc.sname);
      if (wcToken.includes(searchToken)) {
        this.stationArrFiltered.push(wc);
      }
    }
  }

  render() {
    return <Host class={getLayoutClass(this.layout)}>
      <div class="title-wrapper">
        <div class="title ellipsis">
          <noi-icon class="title__icon" name="stations"></noi-icon>
          <span class="title__text">{this.languageService.translate('app.list.title')}</span>
        </div>
        <noi-input class="title__search"
                   placeholder={this.languageService.translate('app.list.search.placeholder')}
                   onValueChange={v => this.filterData(v.detail)}></noi-input>
      </div>
      <div class="list">
        {this.stationArrFiltered.map(this._renderItem)}
        {this.stationArrFiltered.length ? '' :
          <div class="no-data">{this.languageService.translate('app.list.empty')}</div>}
      </div>
    </Host>
  }

  _renderItem(station: AirQualityShort) {
    let itemClass = 'item';
    if (this.idSelected === station.scode) {
      itemClass += ' item--selected';
    }
    return (<button type="button"
                    class={itemClass}
                    onClick={() => this.itemClick.emit(station)}>
      <div class="item__wrapper">
        <div class={'item__box air-quality--' + station.value}></div>
        <div class="item__inner">
          <div class="item__title">{station.sname}</div>
          <div class="item__values">
            <span class="item__values-label">{this.languageService.translate('app.parameter.no2')} </span>
            <span class="item__values-value">{this.languageService.translate('app.air.quality--' + station.value)}</span>
          </div>
        </div>
        <div class=" item__date">{station.validtimeLocalized}</div>
      </div>
    </button>);
  }
}
