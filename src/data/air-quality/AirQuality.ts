// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Datatype, Measurement, Provenance, Station } from "./api-types";

export type AirQualityLevel = "good" | "fair" | "moderate" | "poor" | "very poor" | "extremely poor";
export type AirQuality_Flat = Datatype & Measurement<AirQualityLevel> & Provenance & Station;
