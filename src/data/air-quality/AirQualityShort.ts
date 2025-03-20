// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { AirQualityLevel } from "./AirQuality";

/**
 * Simplified structure
 */
export interface AirQualityShort {
  scode: string;
  sname: string;
  tdescription: string;

  mvalue: AirQualityLevel;
  value: AirQualityShortValue;

  mvalidtime: string;
  validtime: Date;
  validtimeLocalized: string;

  coordinate: {
    lng: number;
    lat: number;
  };
}

export enum AirQualityShortValue {
  UNKNOWN = 0,
  VERY_GOOD = 1,
  GOOD = 2,
  PRETTY_GOOD = 3,
  BAD = 4,
  VERY_BAD = 5,
}

