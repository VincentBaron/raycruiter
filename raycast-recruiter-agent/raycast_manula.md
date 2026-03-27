### Install MCP Server Configuration (JSON)

Source: https://manual.raycast.com/model-context-protocol

A JSON configuration example for installing an MCP server in Raycast. This configuration specifies the command to run and its arguments for the server. It's used when copying a configuration before opening the 'Install Server' command.

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

--------------------------------

### Google Translate Quicklink Example

Source: https://manual.raycast.com/quicklinks

An example of a dynamic Quicklink URL for Google Translate. It uses placeholders for source language, target language, and the text to translate, allowing for flexible queries.

```plaintext
https://translate.google.com/?sl={argument name="source language" default="auto"}&tl={argument name="target language"}&text={argument name="word"}&op=translate
```

--------------------------------

### Start Focus Session

Source: https://manual.raycast.com/focus

Starts a new focus session with the specified parameters. If a session is already active, this action is ignored.

```APIDOC
## Start Focus Session

### Description
Starts a new focus session with the provided parameters. If a session is already active, no action is taken.

### Method
GET

### Endpoint
`raycast://focus/start`

### Parameters
#### Query Parameters
- **goal** (string) - Optional - The title of the focus session. Should be percent encoded.
- **categories** (string) - Required - A comma-separated list of app/website categories to block.
- **duration** (integer) - Optional - The duration of the focus session in seconds.
- **mode** (string) - Optional - The filtering mode of the session (`block` or `allow`). Defaults to `block`.

### Request Example
```
raycast://focus/start?goal=Deep%20Focus&categories=social,gaming&duration=300&mode=block
```

### Response
#### Success Response (200)
This deeplink does not return a specific response body, but the action is performed on the Raycast application.
```

--------------------------------

### Programmatically Install MCP Server (Deeplink)

Source: https://manual.raycast.com/model-context-protocol

A deeplink format for programmatically installing an MCP Server in Raycast. The deeplink includes a percent-encoded JSON configuration detailing the server's name, type, command, arguments, and environment variables.

```text
raycast://mcp/install?<configuration-json-percent-encoded>
```

--------------------------------

### Custom Date Formatting Examples

Source: https://manual.raycast.com/dynamic-placeholders

Demonstrates various custom date formats using the `{date format="..."}` placeholder. These formats are system-dependent and case-sensitive. Single quotes can be used to include literal text within the format string.

```text
{date format="EEEE, MMM d, yyyy"}
{date format="MM/dd/yyyy"}
{date format="MM-dd-yyyy HH:mm"}
{date format="MMM d, h:mm a"}
{date format="MMMM yyyy"}
{date format="MMM d, yyyy"}
{date format="E, d MMM yyyy HH:mm:ss Z"}
{date format="yyyy-MM-dd'T'HH:mm:ssZ"}
{date format="dd.MM.yy"}
{date format="HH:mm:ss.SSS"}
{date format="yyyy-MM-dd" offset="+3M -5d"}
{date format="h:mm 'on the eve of' MMMM d"}
```

--------------------------------

### AI Chat Preset JSON Format Example

Source: https://manual.raycast.com/ai/how-to-import-ai-chat-presets

This snippet demonstrates the required JSON format for importing AI Chat Presets. It includes essential properties like name, model, and optional settings such as creativity, instructions, web search, and image generation.

```json
[
   {
      "name": "Preset Name",
      "model": "openai-gpt-4",
      "creativity": "medium",
      "instructions": "Instructions for the AI.\nContinuing here.",
      "web_search": false,
      "image_generation": true
   }
]
```

--------------------------------

### Import Focus Categories JSON Format Example

Source: https://manual.raycast.com/focus/how-to-import-focus-categories

This JSON structure defines how to import focus categories into Raycast. Each category requires a unique 'title' and can optionally include arrays of application bundle identifiers ('apps') and website hostnames ('websites') to block.

```json
[
  {
    "title" : "Gambling",
    "websites" : [
      "winamax.com",
      "stake.com"
    ]
  },
  {
    "title": "French News",
    "apps" : [
      "com.apple.news"
    ],
    "websites": [
      "lefigaro.fr",
      "lemonde.fr",
      "liberation.fr",
      "lequipe.fr"
    ]
  }
]
```

--------------------------------

### Toggle Focus Session

Source: https://manual.raycast.com/focus

Toggles the current focus session. If no session is active, it starts a new one. If a session is active, it completes the session.

```APIDOC
## Toggle Focus Session

### Description
Toggles the current focus session on or off. If no session is active, it will start a new one with the provided parameters. If a session is already active, it will complete the session.

### Method
GET

### Endpoint
`raycast://focus/toggle`

### Parameters
#### Query Parameters
- **goal** (string) - Optional - The title of the focus session. Should be percent encoded.
- **categories** (string) - Required - A comma-separated list of app/website categories to block.
- **duration** (integer) - Optional - The duration of the focus session in seconds.
- **mode** (string) - Optional - The filtering mode of the session (`block` or `allow`). Defaults to `block`.

### Request Example
```
raycast://focus/toggle?goal=Deep%20Focus&categories=social,gaming&duration=300&mode=block
```

### Response
#### Success Response (200)
This deeplink does not return a specific response body, but the action is performed on the Raycast application.
```

--------------------------------

### Argument Placeholder Usage

Source: https://manual.raycast.com/dynamic-placeholders

Illustrates how to use argument placeholders, including named arguments for reuse and optional arguments with default values. Options can also be provided for selection.

```text
{argument name="tone"}
{argument name="email"}
{argument default="happy"}
{argument name="sport" default="skiing"}
{argument name="tone" options="happy, sad, professional"}
```

--------------------------------

### Custom Window Management Commands (Pro Subscription)

Source: https://manual.raycast.com/window-management

Create your own window management commands with custom size, pinning position, and offset using absolute or percentage values.

```APIDOC
## Custom Window Management Commands (Pro Subscription)

### Description
This feature requires an active Pro subscription. You can setup your own window commands by customising window size, pinning position and offset. Use absolute values in points or percentage values relative to the display size.

### Window Layout
Besides single-window commands, you can set up multiple apps window layouts. Use the **Create Window Layout** command to add app windows on designated displays. You can also specify file or link to be opened with the app.

### Deeplinks
Custom commands support _Deeplinks_ that can be used outside of Raycast app. The _Deeplinks_ should be created in the following format with selected absolute / relative values:

```
raycast://customWindowManagementCommand?&name=MyCommand&position=center&absoluteWidth=500.0&relativeHeight=0.5&absoluteXOffset=0.0&absoluteYOffset=0.0
```

### Parameters

| Argument | Description | Required |
|---|---|---|
| `name` | Command name. If a corresponding single-window command with the same name is found, all other arguments will be ignored. If no name is provided, a temporary command will be used with the provided arguments. | No |
| `position` | Window pinning position. If no position is provided and a temporary command is used, top left position will be used. | No |
| `absoluteWidth` | Window width in points. | No |
| `relativeWidth` | Window width in percentage relative to screen’s width. Ignored if absolute width is provided. | No |
| `absoluteHeight` | Window height in points. | No |
| `relativeHeight` | Window height in percentage relative to screen’s height. Ignored if absolute height is provided. | No |
| `absoluteXOffset` | Window position’s horizontal offset in points. | No |
| `relativeXOffset` | Window position’s horizontal offset in percentage relative to screen’s width. Ignored if absolute X offset is provided. | No |
| `absoluteYOffset` | Window position’s vertical offset in points. | No |
| `relativeYOffset` | Window position’s vertical offset in percentage relative to screen’s height. Ignored if absolute Y offset is provided. | No |

### Usage Notes

You can create a temporary _Deeplink_ - simply do not specify any name to be used for querying existing commands. That way a transient custom command will be used to position and resize a window on the fly.

Window Layout _Deeplinks_ only support name argument meaning that only existing window layouts can be used.

For more info on using _Deeplinks_ for Window Management Commands, refer to this troubleshooting guide.
```

--------------------------------

### Browser Tab Content Formatting

Source: https://manual.raycast.com/dynamic-placeholders

Demonstrates how to specify the content format for browser tab data using the `{browser-tab format="..."}` placeholder. Available formats include markdown, text, and html.

```text
{browser-tab format="markdown"}
{browser-tab format="text"}
{browser-tab format="html"}
```

--------------------------------

### Raycast Window Management Commands

Source: https://manual.raycast.com/window-management

This section details the predefined commands available for managing your focused window.

```APIDOC
## Raycast Window Management Commands

### Description
Raycast allows you to resize, reorganize and move your focused window effortlessly, without lifting your hands from the keyboard.

### Commands

*   **Toggle Fullscreen:** Toggle the focused window in a Fullscreen state
*   **Maximize:** Maximize the focused window to the full height and width.
*   **Maximize height:** Maximise the focused window to its full height.
*   **Maximize Width:** Maximise the focused window to its full width.
*   **Left/Right/Bottom/Top Half:** Move the focused window to fill one half of the screen. Perfect for focused work in 2 documents.
*   **Center:** Center the focused window. Height and width stay the same.
*   **Move Up/Down/Left/Right:** Move the focused window to the edge of the screen in any direction.
*   **Restore:** Restore the focused window to the position and size that it was before.
*   **Reasonable size:** Resize the focused window to 60% of the screen (maximum: 1025x900px)
*   **Previous/Next Display:** For multi-display setups; easily move your windows between displays.
*   **First, First Two, Center, Last Two, Last Third:** Resize and move the focused window to fill a third of the screen.
*   **First, Second, Third, Last Fourth:** Resize focused window to the specified fourth of the screen.
*   **Top Left/Top Right, Bottom Left/Bottom Right Quarter:** Resize and move the focused window to fit a quarter corner of the screen.
*   **Top Left/Top Center/Top Right Sixth:** Resize and realign the focused window to the specified sixth at the top of the screen.
*   **Bottom Left/Center/Right Sixth:** Resize and realign the focused window to the specified sixth at the bottom of the screen.

### Preferences
Customize your workspace - set a gap around the window edge between 0px to 128px.

### Troubleshooting
The Window Management extension requires Accessibility permissions to be turned on in your Security and Privacy settings. When you run a window management command for the first time, you will see some dialog regarding this.
```

--------------------------------

### Deeplink for Custom Window Management Command

Source: https://manual.raycast.com/window-management

This deeplink allows for the creation of custom window management commands within Raycast. It supports various parameters to define the window's name, position, size, and offsets, either in absolute points or relative percentages. If no name is provided, a temporary command is executed.

```text
raycast://customWindowManagementCommand?&name=MyCommand&position=center&absoluteWidth=500.0&relativeHeight=0.5&absoluteXOffset=0.0&absoluteYOffset=0.0
```

--------------------------------

### Browser Tab Content Selection with CSS Selector

Source: https://manual.raycast.com/dynamic-placeholders

Explains how to use a CSS selector with the `{browser-tab selector="..."}` placeholder to extract specific content from a browser tab.

```text
{browser-tab selector="a.author.text-bold"}
```

--------------------------------

### Run a Command

Source: https://manual.raycast.com/deeplinks

Execute any enabled Raycast command via its unique deeplink.

```APIDOC
## Run a Command

### Description
Execute any command available in Raycast by constructing a specific deeplink. Raycast will prompt for confirmation before running the command, unless configured otherwise.

### Method
GET

### Endpoint
`raycast://extensions/<author-or-owner>/<extension-name>/<command-name>`

### Parameters
#### Path Parameters
- **author-or-owner** (string) - Required - The author or owner of the Raycast extension.
- **extension-name** (string) - Required - The name of the Raycast extension.
- **command-name** (string) - Required - The name of the command to execute.

### Request Example
```
raycast://extensions/raycast/calculator/calculate
```

### Response
This action triggers the specified command within Raycast. A confirmation prompt may appear. Successful execution leads to the command's functionality being initiated.
```

--------------------------------

### MCP Server Configuration JSON Schema

Source: https://manual.raycast.com/model-context-protocol

The JSON schema for configuring an MCP server. It outlines the required fields: 'name' for the server's identifier, 'type' for the connection method (e.g., 'stdio'), 'command' to execute the server, 'args' for command-line arguments, and 'env' for environment variables.

```json
{
  "name": "Sequantial Thinking",
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"],
  "env": {"API_KEY": "…”}
}
```

--------------------------------

### Run Raycast Command

Source: https://manual.raycast.com/deeplinks

Execute any enabled Raycast command using its deeplink. The format includes the author/owner, extension name, and command name. Raycast will prompt for confirmation before running the command, unless 'Always Open Command' is selected.

```url
raycast://extensions/<author-or-owner>/<extension-name>/<command-name>
```

--------------------------------

### Clipboard History Offset

Source: https://manual.raycast.com/dynamic-placeholders

Shows how to access older copied text using the `{clipboard offset=N}` placeholder, where N is the position in the clipboard history. Requires Clipboard History to be enabled.

```text
{clipboard offset=1}
{clipboard offset=2}
```

--------------------------------

### Troubleshooting Window Management Commands

Source: https://manual.raycast.com/deeplinks

Workaround for issues with Window Management commands triggered via deeplinks, ensuring the target app remains focused.

```APIDOC
## Troubleshooting Window Management Commands

### Description
When deeplinks cause Raycast to steal focus, Window Management commands may fail because they require the target application to be active. Using `open -g` in the terminal bypasses this focus issue.

### Method
GET (via shell command)

### Endpoint
`raycast://extensions/<author-or-owner>/<extension-name>/<command-name>` (when opened with `open -g`)

### Parameters
#### Shell Command Example
```bash
open -g "raycast://extensions/raycast/window-management/left-half"
```

### Usage
To ensure Window Management commands work correctly when triggered by a deeplink, prefix the `open` command with the `-g` flag in your terminal or script. This flag prevents the application opening the URL (Raycast) from coming to the foreground.

### Response
This method ensures that the Window Management command is executed correctly by maintaining focus on the intended target application.
```

--------------------------------

### Run a Script Command

Source: https://manual.raycast.com/deeplinks

Execute script commands directly from external sources using their deeplinks.

```APIDOC
## Run a Script Command

### Description
Execute enabled script commands in Raycast using their respective deeplinks. For scripts accepting arguments, use the `arguments` query parameter. Values must be URL-encoded.

### Method
GET

### Endpoint
`raycast://script-commands/<slugified-file-name-without-extension>`

### Parameters
#### Path Parameters
- **slugified-file-name-without-extension** (string) - Required - The URL-friendly name of the script command file.
#### Query Parameters
- **arguments** (string) - Optional - An argument to pass to the script command. Can be repeated for multiple arguments. Must be URL-encoded.

### Request Example 1 (No Arguments)
```
raycast://script-commands/my-script
```

### Request Example 2 (With Arguments - e.g., Color Conversion)
```
raycast://script-commands/color-conversion?arguments=%23FF0000&arguments=rgb
```

### Response
Executes the specified script command within Raycast, passing any provided arguments.
```

--------------------------------

### Import AI Commands JSON Structure

Source: https://manual.raycast.com/ai/how-to-import-ai-commands

This JSON structure defines an array of AI commands, each with properties like title, prompt, creativity, icon, and model. The 'title' and 'prompt' are required, while 'creativity', 'icon', and 'model' are optional. The 'model' property requires GPT-4.

```json
[
   {
      "title":"Write 10 Alternatives",
      "prompt":"Give me 10 alternative versions of the text. Ensure that the alternatives are all distinct from one another.\n\nText:\n\nAlternatives:",
      "creativity":"high",
      "icon":"shuffle"
   },
   {
      "title":"Find Synonyms",
      "prompt":"Find synonyms for the word {selection} and format the output as a list. Words should exist. Do not write any explanations. Do not include the original word in the list. The list should not have any duplicates.",
      "creativity":"medium",
      "icon":"text",
      "model":"openai-gpt-4"
   }
]
```

--------------------------------

### Snippet Import JSON Structure

Source: https://manual.raycast.com/snippets/how-to-import-snippets

This JSON structure defines how to format snippets for import into Raycast. Each snippet object requires a 'name' and 'text', with an optional 'keyword' for auto-expansion. This format is used by the 'Import Snippets' command.

```json
[
  {
    "name": "Personal Email",
    "text": "sherlock@gmail.com",
    "keyword": "@@"
  },
  {
    "name": "Home Address",
    "text": "221B Baker St., London"
  },
  {
    "name": "Catchphrase 1",
    "text": "Elementary, my dear Watson",
    "keyword": "!elementary"
  }
]
```

--------------------------------

### Run an AI Command

Source: https://manual.raycast.com/deeplinks

Trigger Raycast AI commands programmatically via deeplinks.

```APIDOC
## Run an AI Command

### Description
Initiate Raycast AI commands using their unique deeplinks. This allows for programmatic integration of AI features into your workflow.

### Method
GET

### Endpoint
`raycast://ai-commands/<slugified-command-name>`

### Parameters
#### Path Parameters
- **slugified-command-name** (string) - Required - The URL-friendly name of the AI command.

### Request Example
```
raycast://ai-commands/summarize-text
```

### Response
Launches the specified AI command within Raycast, ready for execution.
```

--------------------------------

### Troubleshoot Window Management Deeplinks with Shell Script

Source: https://manual.raycast.com/deeplinks

When Window Management commands fail via deeplink due to Raycast gaining focus, use a shell script with the `open -g` flag to prevent Raycast from focusing. This ensures the target application remains active for the window management command.

```shell
open -g raycast://extensions/raycast/window-management/left-half
```

--------------------------------

### Complete Focus Session

Source: https://manual.raycast.com/focus

Completes the currently active focus session. If no session is active, the deeplink is ignored.

```APIDOC
## Complete Focus Session

### Description
Completes the currently active focus session. If no session is active, the deeplink is ignored.

### Method
GET

### Endpoint
`raycast://focus/complete`

### Parameters
This endpoint does not accept any parameters.

### Request Example
```
raycast://focus/complete
```

### Response
#### Success Response (200)
This deeplink does not return a specific response body, but the action is performed on the Raycast application.
```

--------------------------------

### Run Raycast Script Command

Source: https://manual.raycast.com/deeplinks

Trigger a script command in Raycast using its deeplink. The deeplink format uses the slugified file name without the extension. Arguments can be passed using the `arguments` query parameter, ensuring values are URL-encoded.

```url
raycast://script-commands/<slugified-file-name-without-extension>
```

```url
raycast://script-commands/color-conversion?arguments=%23FF0000&arguments=rgb
```

--------------------------------

### Run Raycast AI Command

Source: https://manual.raycast.com/deeplinks

Execute an AI command within Raycast via its deeplink. The deeplink format uses the slugified command name. Similar to other commands, confirmation is required unless 'Always Open Command' is set.

```url
raycast://ai-commands/<slugified-command-name>
```

--------------------------------

### Pass fallbackText to a Command

Source: https://manual.raycast.com/deeplinks

Provide initial data or context to a command when launching it via deeplink.

```APIDOC
## Pass fallbackText to a Command

### Description
Enhance command execution by passing the `fallbackText` query parameter. This parameter pre-fills input fields or provides context, similar to Fallback Commands. The text must be URL-encoded.

### Method
GET

### Endpoint
`raycast://extensions/<author-or-owner>/<extension-name>/<command-name>?fallbackText=<url-encoded-text>`

### Parameters
#### Path Parameters
- **author-or-owner** (string) - Required - The author or owner of the Raycast extension.
- **extension-name** (string) - Required - The name of the Raycast extension.
- **command-name** (string) - Required - The name of the command to execute.
#### Query Parameters
- **fallbackText** (string) - Required - The text to pass as initial data to the command. Must be URL-encoded.

### Request Example 1 (File Search)
```
raycast://extensions/raycast/file-search/search-files?fallbackText=~/Library/Application%20Support/
```

### Request Example 2 (Create Quicklink)
```
raycast://extensions/raycast/raycast/create-quicklink?fallbackText=https://raycast.com
```

### Response
Launches the specified command with the provided `fallbackText` pre-filled or utilized as initial input.
```

--------------------------------

### Stream Raycast Logs to File (Terminal)

Source: https://manual.raycast.com/troubleshooting/getting-logs-via-consoleapp

This command streams Raycast's debug logs to a timestamped file on the desktop. Ensure the terminal remains open while reproducing the issue. The log file is created using the `log stream` command with a specific predicate for the Raycast subsystem.

```shell
log stream --predicate "subsystem == 'com.raycast.macos'" --level debug --style compact >> ~/Desktop/ray.$(date +%Y%m%d_%H%M%S).log
```

--------------------------------

### Pass fallbackText to Raycast Command

Source: https://manual.raycast.com/deeplinks

Provide initial data to a Raycast command using the `fallbackText` query parameter. This parameter works similarly to Fallback Commands and must be URL-encoded.

```url
raycast://extensions/raycast/file-search/search-files?fallbackText=~/Library/Application%20Support/
```

```url
raycast://extensions/raycast/raycast/create-quicklink?fallbackText=https://raycast.com
```

--------------------------------

### Show Confetti

Source: https://manual.raycast.com/deeplinks

Trigger a confetti animation within Raycast using a simple deeplink.

```APIDOC
## Show Confetti

### Description
Use the `raycast://confetti` URL scheme to trigger a confetti animation in Raycast. This is useful for adding visual flair to the completion of long-running scripts or tasks.

### Method
GET

### Endpoint
`raycast://confetti`

### Parameters
None

### Request Example
```
raycast://confetti
```

### Response
This action triggers a visual effect within the Raycast application and does not return a discernible HTTP response.
```

--------------------------------

### Show Raycast Confetti

Source: https://manual.raycast.com/deeplinks

Use the `raycast://confetti` URL scheme to trigger a confetti animation within Raycast. This is useful for adding visual feedback to long-running scripts or processes.

```url
raycast://confetti
```

=== COMPLETE CONTENT === This response contains all available snippets from this library. No additional content exists. Do not make further requests.