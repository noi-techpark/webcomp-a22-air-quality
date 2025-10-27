// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later


import { AirQualityUtils } from "./air-quality.utils";
import { AirQualityShortValue } from "./AirQualityShort";

describe("AirQualityUtils", () => {


  describe('getLevel', () => {

    it('should calculate level', () => {
      expect(AirQualityUtils.getLevel("good")).toBe(AirQualityShortValue.GOOD);
      expect(AirQualityUtils.getLevel("fair")).toBe(AirQualityShortValue.FAIR);
      expect(AirQualityUtils.getLevel("moderate")).toBe(AirQualityShortValue.MODERATE);
      expect(AirQualityUtils.getLevel("poor")).toBe(AirQualityShortValue.POOR);
      expect(AirQualityUtils.getLevel("very poor")).toBe(AirQualityShortValue.VERY_POOR);
      expect(AirQualityUtils.getLevel("extremely poor")).toBe(AirQualityShortValue.EXTREMELY_POOR);
    });

    it('should calculate level: capital letters', () => {
      expect(AirQualityUtils.getLevel("good")).toBe(AirQualityShortValue.GOOD);
      expect(AirQualityUtils.getLevel("Good" as any)).toBe(AirQualityShortValue.GOOD);
      expect(AirQualityUtils.getLevel("GOOD" as any)).toBe(AirQualityShortValue.GOOD);
    });

    it('should calculate level: spaces', () => {
      expect(AirQualityUtils.getLevel("very poor")).toBe(AirQualityShortValue.VERY_POOR);
      expect(AirQualityUtils.getLevel(" very poor" as any)).toBe(AirQualityShortValue.VERY_POOR);
      expect(AirQualityUtils.getLevel(" very poor " as any)).toBe(AirQualityShortValue.VERY_POOR);
      expect(AirQualityUtils.getLevel("very  poor" as any)).toBe(AirQualityShortValue.VERY_POOR);
    });

    it('should calculate level: unknown', () => {
      expect(AirQualityUtils.getLevel(null as any)).toBe(AirQualityShortValue.UNKNOWN);
      expect(AirQualityUtils.getLevel("some-invalid-value" as any)).toBe(AirQualityShortValue.UNKNOWN);
    });
  });


  describe('normalizeName', () => {

    it('should replace underscore with a space', () => {
      expect(AirQualityUtils.normalizeName("Hello_world")).toBe('Hello world');
      expect(AirQualityUtils.normalizeName("Hello__world")).toBe('Hello  world');
      expect(AirQualityUtils.normalizeName("Hello world")).toBe('Hello world');
    });

  });
  describe('formatDate', () => {

    it('should format date', () => {
      expect(AirQualityUtils.formatDate(new Date('2025-02-20T12:00'))).toBe('20/02/2025 - 12:00');
      expect(AirQualityUtils.formatDate(new Date('2025-02-01T01:00'))).toBe('1/02/2025 - 01:00');
      expect(AirQualityUtils.formatDate(new Date('2025-12-01T01:00'))).toBe('1/12/2025 - 01:00');
    });

    it('should return invalid', () => {
      expect(AirQualityUtils.formatDate(new Date('some-invalid-date'))).toBe('Invalid date');
    });

  });

});
