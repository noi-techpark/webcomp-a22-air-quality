<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->
# noi-air-quality-list



<!-- Auto Generated Below -->


## Overview

(INTERNAL) part of 'noi-a22-air-quality'

## Properties

| Property     | Attribute     | Description | Type                                          | Default     |
| ------------ | ------------- | ----------- | --------------------------------------------- | ----------- |
| `idSelected` | `id-selected` |             | `string`                                      | `null`      |
| `layout`     | `layout`      |             | `"auto" \| "desktop" \| "mobile" \| "tablet"` | `undefined` |
| `stationArr` | --            |             | `AirQualityShort[]`                           | `null`      |


## Events

| Event       | Description | Type                           |
| ----------- | ----------- | ------------------------------ |
| `itemClick` |             | `CustomEvent<AirQualityShort>` |


## Dependencies

### Used by

 - [noi-a22-air-quality](../..)

### Depends on

- [noi-icon](../../../../blocks/icon)
- [noi-input](../../../../blocks/input)

### Graph
```mermaid
graph TD;
  noi-air-quality-list --> noi-icon
  noi-air-quality-list --> noi-input
  noi-input --> noi-icon
  noi-input --> noi-button
  noi-a22-air-quality --> noi-air-quality-list
  style noi-air-quality-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
