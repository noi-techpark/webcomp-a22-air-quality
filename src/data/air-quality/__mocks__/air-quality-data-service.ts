// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later


import { AirQualityShort } from "../AirQualityShort";

export class AirQualityDataService {

  async getAirQuality(): Promise<AirQualityShort[]> {
    return [];
  }

  async getStationData(_: string): Promise<AirQualityShort> {
    return null;
  }

}
