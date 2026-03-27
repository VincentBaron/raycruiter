/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** API Key - API Key for AI Providers */
  "apiKey"?: string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `ask-raycruiter` command */
  export type AskRaycruiter = ExtensionPreferences & {}
  /** Preferences accessible in the `search-databases` command */
  export type SearchDatabases = ExtensionPreferences & {}
  /** Preferences accessible in the `my-pipeline` command */
  export type MyPipeline = ExtensionPreferences & {}
  /** Preferences accessible in the `view-multidiffusion` command */
  export type ViewMultidiffusion = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `ask-raycruiter` command */
  export type AskRaycruiter = {}
  /** Arguments passed to the `search-databases` command */
  export type SearchDatabases = {}
  /** Arguments passed to the `my-pipeline` command */
  export type MyPipeline = {}
  /** Arguments passed to the `view-multidiffusion` command */
  export type ViewMultidiffusion = {}
}

