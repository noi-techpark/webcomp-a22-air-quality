// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { AirQuality, AirQualityLevel } from "./AirQuality";
import { AirQualityShort, AirQualityShortValue } from "./AirQualityShort";

export class AirQualityUtils {


  /**
   *
   */
  static convertToShortInfo(dataArr: AirQuality[]): AirQualityShort[] {
    const shortArr: AirQualityShort[] = [];
    for (const item of dataArr) {
      shortArr.push({
        scode: item.scode,
        sname: AirQualityUtils.normalizeName(item.sname),
        tdescription: item.tdescription,
        mvalue: item.mvalue,
        value: AirQualityUtils.getLevel(item.mvalue),
        mvalidtime: item.mvalidtime,
        validtime: new Date(item.mvalidtime),
        validtimeLocalized: AirQualityUtils.formatDate(new Date(item.mvalidtime)),
        coordinate: {
          lng: item.scoordinate.x,
          lat: item.scoordinate.y,
        },
      });
    }

    // sort from north to south
    const shortArrSorted = shortArr.sort((a, b) => b.coordinate.lat - a.coordinate.lat);

    return shortArrSorted;
  }

  /**
   *
   */
  static getLevel(level: AirQualityLevel): AirQualityShortValue {
    switch (level) {
      case "very good":
        return AirQualityShortValue.VERY_GOOD;
      case "good":
        return AirQualityShortValue.GOOD;
      case "pretty good":
        return AirQualityShortValue.PRETTY_GOOD;
      case "bad":
        return AirQualityShortValue.BAD;
      case "very bad":
        return AirQualityShortValue.VERY_BAD;
      default:
        console.error('Unknown level', level);
        return AirQualityShortValue.UNKNOWN;
    }

  }

  /**
   *
   */
  static normalizeName(stationName: string): string {
    return stationName.replace(/_/g, ' ');
  }

  /**
   *
   */
  static formatDate(date: Date): string {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    const hh = date.getHours();
    const mm = date.getMinutes();
    return `${d}/${zeropad(m)}/${y} - ${zeropad(hh)}:${zeropad(mm)}`;
  }


}


function zeropad(v: number): string {
  return v > 9 ? '' + v : ('0' + v);
}
