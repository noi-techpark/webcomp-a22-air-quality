// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ListResponseV2 } from "../ListResponse";
import { AirQuality } from "./AirQuality";
import { AirQualityUtils } from "./air-quality.utils";
import { AirQualityShort } from "./AirQualityShort";
import { getAssetPath } from "../../utils/asset-path";

// origin is used to track usage and traffic patterns
const ORIGIN = 'webcomp-a22-air-quality';


export class AirQualityDataService {

  private cache: AirQualityShort[] = [];


  getAirQuality(): Promise<AirQualityShort[]> {

    return fetch(`https://mobility.api.opendatahub.com/v2/flat/EnvironmentStation/NO2-Alphasense_processed_rating/latest?origin=${ORIGIN}&pagesize=-1`)
      .then(r => r.json() as Promise<ListResponseV2<AirQuality>>)
      .then(r => r.data)
      .then(r => AirQualityUtils.convertToShortInfo(r))
      .then(r => {
        this.cache = r;
        return r;
      });
  }

  async getStationData(scode: string): Promise<AirQualityShort> {
    return this.cache.find(itm => itm.scode === scode);
  }

  getRoutePath() {
    const dataPath = getAssetPath('data_a22-1km.json');
    // console.log('[WebcamDataService] dataPath', dataPath);
    return fetch(dataPath)
      .then(r => r.json() as Promise<Array<{ lat: number, lng: number }>>);
  }

}

