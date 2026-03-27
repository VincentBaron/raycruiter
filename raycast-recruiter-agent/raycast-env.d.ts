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
  /** Preferences accessible in the `raycruiter-menu` command */
  export type RaycruiterMenu = ExtensionPreferences & {}
  /** Preferences accessible in the `power-dialer` command */
  export type PowerDialer = ExtensionPreferences & {}
  /** Preferences accessible in the `search-databases` command */
  export type SearchDatabases = ExtensionPreferences & {}
  /** Preferences accessible in the `configure-integrations` command */
  export type ConfigureIntegrations = ExtensionPreferences & {}
  /** Preferences accessible in the `view-crm` command */
  export type ViewCrm = ExtensionPreferences & {}
  /** Preferences accessible in the `jobs` command */
  export type Jobs = ExtensionPreferences & {}
  /** Preferences accessible in the `source-prospects` command */
  export type SourceProspects = ExtensionPreferences & {}
  /** Preferences accessible in the `persons` command */
  export type Persons = ExtensionPreferences & {}
  /** Preferences accessible in the `view-candidates` command */
  export type ViewCandidates = ExtensionPreferences & {}
  /** Preferences accessible in the `match-candidates` command */
  export type MatchCandidates = ExtensionPreferences & {}
  /** Preferences accessible in the `top-talents` command */
  export type TopTalents = ExtensionPreferences & {}
  /** Preferences accessible in the `query-kalent` command */
  export type QueryKalent = ExtensionPreferences & {}
  /** Preferences accessible in the `switch-ai-model` command */
  export type SwitchAiModel = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `raycruiter-menu` command */
  export type RaycruiterMenu = {}
  /** Arguments passed to the `power-dialer` command */
  export type PowerDialer = {}
  /** Arguments passed to the `search-databases` command */
  export type SearchDatabases = {}
  /** Arguments passed to the `configure-integrations` command */
  export type ConfigureIntegrations = {}
  /** Arguments passed to the `view-crm` command */
  export type ViewCrm = {}
  /** Arguments passed to the `jobs` command */
  export type Jobs = {}
  /** Arguments passed to the `source-prospects` command */
  export type SourceProspects = {}
  /** Arguments passed to the `persons` command */
  export type Persons = {}
  /** Arguments passed to the `view-candidates` command */
  export type ViewCandidates = {}
  /** Arguments passed to the `match-candidates` command */
  export type MatchCandidates = {}
  /** Arguments passed to the `top-talents` command */
  export type TopTalents = {}
  /** Arguments passed to the `query-kalent` command */
  export type QueryKalent = {}
  /** Arguments passed to the `switch-ai-model` command */
  export type SwitchAiModel = {}
}

