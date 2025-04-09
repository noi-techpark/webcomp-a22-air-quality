// SPDX-FileCopyrightText: 2025 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Datatype, Measurement, Provenance, Station } from "./api-types";

export type AirQualityLevel = "very good" | "good" | "pretty good" | "bad" | "very bad";
export type AirQuality = Datatype & Measurement<AirQualityLevel> & Provenance & Station;
