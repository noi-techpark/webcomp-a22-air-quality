<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# noi-road-webcam-list



<!-- Auto Generated Below -->


## Overview

(INTERNAL) part of 'noi-brennerlec'

## Properties

| Property     | Attribute     | Description | Type                                          | Default     |
| ------------ | ------------- | ----------- | --------------------------------------------- | ----------- |
| `idSelected` | `id-selected` |             | `string`                                      | `null`      |
| `layout`     | `layout`      |             | `"auto" \| "desktop" \| "mobile" \| "tablet"` | `undefined` |
| `webcamArr`  | --            |             | `WebcamInfoShort[]`                           | `null`      |


## Events

| Event       | Description | Type                           |
| ----------- | ----------- | ------------------------------ |
| `itemClick` |             | `CustomEvent<WebcamInfoShort>` |


## Dependencies

### Used by

 - [noi-brennerlec](../..)

### Depends on

- [noi-icon](../../../blocks/icon)
- [noi-input](../../../blocks/input)

### Graph
```mermaid
graph TD;
  noi-road-webcam-list --> noi-icon
  noi-road-webcam-list --> noi-input
  noi-input --> noi-icon
  noi-input --> noi-button
  noi-brennerlec --> noi-road-webcam-list
  style noi-road-webcam-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
