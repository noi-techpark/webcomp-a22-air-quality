// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// mocks should come before other imports
import "../../mocks";

import { h } from '@stencil/core';
import { AirQualityComponent } from "./air-quality.component";
import { newSpecPage } from "@stencil/core/testing";

describe('noi-a22-air-quality', () => {
  it('should render component', async () => {

    AirQualityComponent.prototype._watchSize = () => null; // no ResizeObserver in mock

    const page = await newSpecPage({
      components: [AirQualityComponent],
      template: () => (<noi-a22-air-quality></noi-a22-air-quality>),
    });

    expect(page.root.classList.contains('layout')).toBe(true);

  });


});
