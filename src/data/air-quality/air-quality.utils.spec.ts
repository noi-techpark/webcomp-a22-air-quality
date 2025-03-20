// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later


import { AirQualityUtils } from "./air-quality.utils";
import { AirQualityShortValue } from "./AirQualityShort";

describe("AirQualityUtils", () => {


  describe('getLevel', () => {

    it('should calculate level', () => {
      expect(AirQualityUtils.getLevel("bad")).toBe(AirQualityShortValue.BAD);
    });

  });
});
