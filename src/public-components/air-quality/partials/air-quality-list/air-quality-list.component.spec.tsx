// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// mocks should come before other imports
import "../../../../mocks";

import { h } from '@stencil/core';
import { newSpecPage } from "@stencil/core/testing";
import { AirQualityListComponent } from "./air-quality-list.component";

describe('noi-air-quality-list', () => {
  it('should render component', async () => {

    const page = await newSpecPage({
      components: [AirQualityListComponent],
      template: () => (<noi-air-quality-list layout="desktop"></noi-air-quality-list>),
    });

    expect(page.root.classList.contains('layout')).toBe(true);
  });

  it('should render layout class: desktop', async () => {
    const page = await newSpecPage({
      components: [AirQualityListComponent],
      template: () => (<noi-air-quality-list layout="desktop"></noi-air-quality-list>),
    });

    expect(page.root.classList.contains('layout--desktop')).toBe(true);
  });

  it('should render layout class: tablet', async () => {

    const page = await newSpecPage({
      components: [AirQualityListComponent],
      template: () => (<noi-air-quality-list layout="tablet"></noi-air-quality-list>),
    });

    expect(page.root.classList.contains('layout--tablet')).toBe(true);
  });

  it('should render layout class: mobile', async () => {
    const page = await newSpecPage({
      components: [AirQualityListComponent],
      template: () => (<noi-air-quality-list layout="mobile"></noi-air-quality-list>),
    });

    expect(page.root.classList.contains('layout--mobile')).toBe(true);
  });
});
