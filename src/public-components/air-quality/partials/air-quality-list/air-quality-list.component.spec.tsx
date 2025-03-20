// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// mocks should come before other imports
import "../../../mocks";

import { h } from '@stencil/core';
import { newSpecPage } from "@stencil/core/testing";
import { AirQualityListComponent } from "./air-quality-list.component";

describe('noi-road-webcam-list', () => {
  it('should render component', async () => {

    const page = await newSpecPage({
      components: [AirQualityListComponent],
      template: () => (<noi-road-webcam-list layout="desktop"></noi-road-webcam-list>),
    });

    expect(page.root).toEqualHtml(`
        <noi-road-webcam-list class="layout layout--desktop">
          <div class="title-wrapper">
            <div class="title ellipsis">
              <noi-icon class="title__icon" name="stations"></noi-icon>
              <span class="title__text">T:app.list.title</span>
            </div>
            <noi-input class="title__search" placeholder="T:app.list.search.placeholder"></noi-input>
          </div>
          <div class="list">
              <div class="no-data">T:app.list.empty</div>
          </div>
        </noi-road-webcam-list>
      `);
  });

  it('should render layout class: desktop', async () => {
    const page = await newSpecPage({
      components: [AirQualityListComponent],
      template: () => (<noi-road-webcam-list layout="desktop"></noi-road-webcam-list>),
    });

    expect(page.root.classList.contains('layout--desktop')).toBe(true);
  });

  it('should render layout class: tablet', async () => {

    const page = await newSpecPage({
      components: [AirQualityListComponent],
      template: () => (<noi-road-webcam-list layout="tablet"></noi-road-webcam-list>),
    });

    expect(page.root.classList.contains('layout--tablet')).toBe(true);
  });

  it('should render layout class: mobile', async () => {
    const page = await newSpecPage({
      components: [AirQualityListComponent],
      template: () => (<noi-road-webcam-list layout="mobile"></noi-road-webcam-list>),
    });

    expect(page.root.classList.contains('layout--mobile')).toBe(true);
  });
});
