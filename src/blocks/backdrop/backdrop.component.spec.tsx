// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { h } from '@stencil/core';
import { newSpecPage } from "@stencil/core/testing";
import { BackdropComponent } from "./backdrop.component";

describe('noi-backdrop', () => {

  it('should be hidden', async () => {

    const page = await newSpecPage({
      components: [BackdropComponent],
      template: () => (<noi-backdrop hidden={true}></noi-backdrop>),
    });

    expect(page.root.classList.contains('hidden')).toEqual(true);
  });

  it('should be visible', async () => {

    const page = await newSpecPage({
      components: [BackdropComponent],
      template: () => (<noi-backdrop hidden={false}></noi-backdrop>),
    });

    expect(page.root.classList.contains('hidden')).toEqual(false);
  });


});
