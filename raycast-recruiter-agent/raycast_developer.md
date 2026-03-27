### Install Dependencies and Run Extension Development Server

Source: https://developers.raycast.com/basics/create-your-first-extension

This command installs necessary dependencies and starts the development server for your Raycast extension. It ensures all required packages are present and prepares the extension for live development.

```bash
npm install && npm run dev
```

--------------------------------

### List Installed Brew Packages using useExec

Source: https://developers.raycast.com/utilities/react-hooks/useexec

This example demonstrates using the `useExec` hook to fetch and display a list of installed Homebrew packages. It parses the JSON output and renders the package names in a Raycast `List` component. It includes logic to determine the correct brew path based on the operating system.

```typescript
import { List } from "@raycast/api";
import { useExec } from "@raycast/utils";
import { cpus } from "os";
import { useMemo } from "react";

const brewPath = cpus()[0].model.includes("Apple") ? "/opt/homebrew/bin/brew" : "/usr/local/bin/brew";

export default function Command() {
  const { isLoading, data } = useExec(brewPath, ["info", "--json=v2", "--installed"]);
  const results = useMemo<{ id: string; name: string }[]>(() => JSON.parse(data || "{}").formulae || [], [data]);

  return (
    <List isLoading={isLoading}>
      {results.map((item) => (
        <List.Item key={item.id} title={item.name} />
      ))}
    </List>
  );
}
```

--------------------------------

### Install and Run AI Extension Development Mode

Source: https://context7_llms

This command installs project dependencies and starts the AI extension in development mode, enabling features like hot reloading and error reporting for a smoother development workflow.

```bash
npm install && npm run dev
```

--------------------------------

### Execute Shell Command with useExec (TypeScript)

Source: https://context7_llms

Demonstrates how to use the useExec hook to execute a shell command and process its JSON output. It fetches installed formulae using the brew command and displays them in a List. This example utilizes `os.cpus` to determine the correct brew path for Apple Silicon.

```tsx
import { List } from "@raycast/api";
import { useExec } from "@raycast/utils";
import { cpus } from "os";
import { useMemo } from "react";

const brewPath = cpus()[0].model.includes("Apple") ? "/opt/homebrew/bin/brew" : "/usr/local/bin/brew";

export default function Command() {
  const { isLoading, data } = useExec(brewPath, ["info", "--json=v2", "--installed"]);
  const results = useMemo(() => JSON.parse(data || "{}").formulae || [], [data]);

  return (
    <List isLoading={isLoading}>
      {results.map((item) => (
        <List.Item key={item.id} title={item.name} />
      ))}
    </List>
  );
}
```

--------------------------------

### CLI Development Start

Source: https://context7_llms

The CLI no longer depends on metadata attributes for starting development.

```APIDOC
## CLI Development Start

### Description

For initiating development, the Command Line Interface (CLI) has been updated to remove its dependency on metadata attributes. This streamlines the process of starting new extension development projects.

### Method

N/A (Improvement)

### Endpoint

N/A
```

--------------------------------

### Mutate Data with useExec and Local Updates

Source: https://developers.raycast.com/utilities/react-hooks/useexec

This example illustrates optimistic updates using the `mutate` function returned by `useExec`. It shows how to initiate an action (like installing a package) and immediately update the local state before the asynchronous operation completes, providing a smoother user experience. Error handling with toasts is also included.

```typescript
import { Detail, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import { useFetch } from "@raycast/utils";

export default function Command() {
  const { isLoading, data, revalidate } = useExec("brew", ["info", "--json=v2", "--installed"]);
  const results = useMemo<{}[]>(() => JSON.parse(data || "[]"), [data]);

  const installFoo = async () => {
    const toast = await showToast({ style: Toast.Style.Animated, title: "Installing Foo" });
    try {
      await mutate(
        // we are calling an API to do something
        installBrewCask("foo"),
        {
          // but we are going to do it on our local data right away,
          // without waiting for the call to return

```

--------------------------------

### View Command Example

Source: https://context7_llms

Example of a default function exporting a React component for a view command.

```APIDOC
## POST /launch/view

### Description
This endpoint represents the execution of a Raycast command that requires a user interface. The exported default function returns a React component which is rendered as the root component.

### Method
POST

### Endpoint
/launch/view

### Request Body
```json
{
  "commandId": "string",
  "arguments": {},
  "launchType": "userInitiated" | "background" | "fallback"
}
```

### Request Example
```json
{
  "commandId": "my-view-command",
  "arguments": {},
  "launchType": "userInitiated"
}
```

### Response
#### Success Response (200)
- **component** (ReactElement) - The root React component to render for the command.

#### Response Example
```json
{
  "component": "<Detail markdown=\"# Hello\" />"
}
```
```

--------------------------------

### Get Applications by Path or All Installed

Source: https://context7_llms

Retrieves a list of applications that can open a given file or URL, or all installed applications if no path is provided. Useful for checking application availability and deep-linking.

```typescript
import { getApplications, Application } from "@raycast/api";

// it is a lot more reliable to get an app by its bundle ID than its path
async function findApplication(bundleId: string): Application | undefined {
  const installedApplications = await getApplications();
  return installedApplications.filter((application) => application.bundleId == bundleId);
}
```

```typescript
import { getApplications } from "@raycast/api";

export default async function Command() {
  const installedApplications = await getApplications();
  console.log("The following applications are installed on your Mac:");
  console.log(installedApplications.map((a) => a.name).join(", "));
}
```

--------------------------------

### Site Configuration and Analytics Scripts

Source: https://developers.raycast.com/utilities

This snippet includes JavaScript code for site configuration and analytics. It sets up event listeners for DOMContentLoaded to check for Cloudflare rocket-loader issues and integrates PostHog analytics.

```javascript
document.addEventListener("DOMContentLoaded", () => {
 if (Array.from(document.scripts).find(script => script.src.includes('rocket-loader.min.js'))) {
 const alert = document.createElement('div');
 alert.className = 'p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-8 mx-8';
 alert.innerHTML = `
 <strong>Error in site configuration:</strong>
 It looks like ${window.location.hostname} has been incorrectly configured in Cloudflare. This may lead to unexpected behavior or issues with the page loading. If you are the owner of this site, please refer to <a href="https://gitbook.com/docs/published-documentation/custom-domain/configure-dns#are-you-using-cloudflare" class="underline">GitBook's documentation</a> for steps to fix the problem.
 `;

 document.body.prepend(alert);
 }
 });
```

```javascript
https://integrations.gitbook.com/v1/integrations/posthog/installations/45bb70c02653ecb28893e6b4df7d4c1bd658fb04d678be3ae62f3577b43d012a/sites/site_wqFKp/script.js?version=157.0
```

--------------------------------

### OAuthService.slack Usage Example

Source: https://developers.raycast.com/utilities/oauth/oauthservice

Example of how to instantiate the Slack OAuth service with a specific scope.

```APIDOC
## OAuthService.slack Usage Example

### Description
Demonstrates the instantiation of the Slack OAuth service with a defined scope.

### Method
N/A (Usage Example)

### Endpoint
N/A

### Parameters
None

### Request Example
```tsx
const slack = OAuthService.slack({ scope: "emoji:read" });
```

### Response
N/A (Usage Example)
```

--------------------------------

### Example Usage: Basic Toast

Source: https://developers.raycast.com/api-reference/feedback/toast

Demonstrates how to show a simple success or failure toast based on a condition.

```APIDOC
## POST /example/toast

### Description
Shows a toast message, either success or failure, based on a condition.

### Method
POST

### Endpoint
`/example/toast`

### Request Body
```json
{
  "success": "boolean"
}
```

### Request Example
```json
{
  "success": false
}
```

### Response
#### Success Response (200)
- **message** (string) - Confirmation message.

#### Response Example
```json
{
  "message": "Toast displayed successfully."
}
```

### Code Example
```javascript
import { showToast, Toast } from "@raycast/api";

export default async function Command() {
  const success = false;

  if (success) {
    await showToast({ title: "Dinner is ready", message: "Pizza margherita" });
  } else {
    await showToast({
      style: Toast.Style.Failure,
      title: "Dinner isn't ready",
      message: "Pizza dropped on the floor",
    });
  }
}
```
```

--------------------------------

### Placeholder Text Examples

Source: https://developers.raycast.com/api-reference/user-interface/grid

Provides examples of placeholder text used in UI elements, such as dropdown search fields. These examples illustrate how to inform users about expected input.

```plaintext
placeholder
```

```plaintext
Placeholder text that will be shown in the dropdown search field.
```

--------------------------------

### PKCE Client Configuration

Source: https://developers.raycast.com/utilities/oauth/oauthservice

Demonstrates the setup of a PKCE (Proof Key for Code Exchange) client using the OAuthService.

```APIDOC
## POST /oauth/pkce

### Description
Sets up a PKCE client for OAuth authentication. This is a more secure way to handle authorization codes in public clients, like single-page applications.

### Method
POST

### Endpoint
/oauth/pkce

### Parameters
#### Request Body
- **client** (object) - Required - Configuration object for the PKCE client.
  - **clientId** (string) - Required - The client ID for your application.

### Request Example
```json
{
  "client": {
    "clientId": "your-pkce-client-id"
  }
}
```

### Response
#### Success Response (200)
- **message** (string) - A confirmation message indicating successful PKCE client setup.

#### Response Example
```json
{
  "message": "PKCE client configured successfully."
}
```
```

--------------------------------

### Example Script Execution and Output Handling

Source: https://developers.raycast.com/utilities/functions/runapplescript

Demonstrates a basic example of executing a script and handling its output using the `ParseExecOutputHandler` type. This snippet shows how to capture and potentially display the results of a command.

```typescript
const res = await $executeCommand({
  command: "echo \"hello, \" & item 1 of argv & \".\"",
  arguments: ["world"],
});
await showHUD(res);

```

--------------------------------

### Raycast Extension Setup (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/list

This TypeScript code demonstrates the basic setup for a Raycast extension. It imports necessary components from '@raycast/api' and React hooks for managing component state and side effects. This is a common pattern for creating interactive Raycast commands.

```typescript
import { useEffect, useState } from "react";
import { Action, ActionPanel, List } from "@raycast/api";

```

--------------------------------

### Create Quicklink with Action.CreateQuicklink

Source: https://developers.raycast.com/api-reference/user-interface/actions

This example shows how to create a quicklink that can be used to quickly access a URL, potentially with dynamic query parameters. It uses the Action.CreateQuicklink component.

```typescript
import { ActionPanel, Detail, Action } from "@raycast/api";

export default function Command() {
  return (
    <Detail
      markdown="Test out quicklink creation"
      actions={
        <ActionPanel>
          <Action.CreateQuicklink quicklink={{ link: "https://duckduckgo.com/?q={Query}" }} />
        </ActionPanel>
      }
    />
  );
}
```

--------------------------------

### Example: Sign Up Form with useForm (TypeScript)

Source: https://context7_llms

Demonstrates a complete sign-up form using the useForm hook from @raycast/utils. It includes field validations for required inputs, password length, and a custom dropdown selection, along with basic submission handling.

```typescript
import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";
import { useForm, FormValidation } from "@raycast/utils";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  birthday: Date | null;
  password: string;
  number: string;
  hobbies: string[];
}

export default function Command() {
  const { handleSubmit, itemProps } = useForm<SignUpFormValues>({
    onSubmit(values) {
      showToast({
        style: Toast.Style.Success,
        title: "Yay!",
        message: `${values.firstName} ${values.lastName} account created`,
      });
    },
    validation: {
      firstName: FormValidation.Required,
      lastName: FormValidation.Required,
      password: (value) => {
        if (value && value.length < 8) {
          return "Password must be at least 8 symbols";
        } else if (!value) {
          return "The item is required";
        }
      },
      number: (value) => {
        if (value && value !== "2") {
          return "Please select '2'";
        }
      },
    },
  });
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField title="First Name" placeholder="Enter first name" {...itemProps.firstName} />
      <Form.TextField title="Last Name" placeholder="Enter last name" {...itemProps.lastName} />
      <Form.DatePicker title="Date of Birth" {...itemProps.birthday} />
      <Form.PasswordField
        title="Password"
        placeholder="Enter password at least 8 characters long"
        {...itemProps.password}
      />
      <Form.Dropdown title="Your Favorite Number" {...itemProps.number}>
        {[1, 2, 3, 4, 5, 6, 7].map((num) => {
          return <Form.Dropdown.Item value={String(num)} title={String(num)} key={num} />;
        })}
      </Form.Dropdown>
    </Form>
  );
}
```

--------------------------------

### showHUD with Options

Source: https://developers.raycast.com/api-reference/feedback/hud

Example of using showHUD with options to clear the root search and immediately pop to the root view.

```APIDOC
## showHUD with Options

### Description
Example of using showHUD with options to clear the root search and immediately pop to the root view.

### Method
`async function`

### Endpoint
`@raycast/api`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **title** (string) - Required - The message to display in the HUD.
- **options** (object) - Required - Configuration options for the HUD.
  - **clearRootSearch** (boolean) - Required - Set to `true` to clear the root search.
  - **popToRootType** (PopToRootType) - Required - Set to `PopToRootType.Immediate` to pop to the root view immediately.

### Request Example
```javascript
import { PopToRootType, showHUD } from "@raycast/api";

export default async function Command() {
  await showHUD("Hey there 👋", { clearRootSearch: true, popToRootType: PopToRootType.Immediate });
}
```

### Response
#### Success Response (void)
This function does not return a value upon successful execution.

#### Response Example
None (asynchronous function with no return value)
```

--------------------------------

### Raycast List Examples

Source: https://developers.raycast.com/api-reference/user-interface/list

This section provides various examples of how to implement lists in Raycast, including basic lists, lists with sections, lists with actions, lists with detail views, and lists with empty states.

```typescript
List.tsx
```

```typescript
ListWithSections.tsx
```

```typescript
ListWithActions.tsx
```

```typescript
ListWithDetail.tsx
```

```typescript
ListWithEmptyView.tsx
```

--------------------------------

### Build Production Extension for Raycast

Source: https://developers.raycast.com/information/developer-tools/cli

This command creates an optimized production build of your Raycast extension for distribution. It is automatically installed during setup and is used by CI for publishing to the store.

```bash
npx ray build
```

--------------------------------

### No-View Command Example

Source: https://context7_llms

Example of a default async function for a no-view command, performing API methods using async/await.

```APIDOC
## POST /launch/no-view

### Description
This endpoint represents the execution of a Raycast command that does not require a user interface. The exported default async function is executed, allowing for API calls using async/await.

### Method
POST

### Endpoint
/launch/no-view

### Request Body
```json
{
  "commandId": "string",
  "arguments": {},
  "launchType": "userInitiated" | "background" | "fallback"
}
```

### Request Example
```json
{
  "commandId": "my-no-view-command",
  "arguments": {},
  "launchType": "userInitiated"
}
```

### Response
#### Success Response (200)
- **status** (string) - Indicates the successful completion of the no-view command.

#### Response Example
```json
{
  "status": "completed"
}
```
```

--------------------------------

### OAuthService.linear Usage Example

Source: https://developers.raycast.com/utilities/oauth/oauthservice

Example of how to instantiate the Linear OAuth service with a specific scope.

```APIDOC
## OAuthService.linear Usage Example

### Description
Demonstrates the instantiation of the Linear OAuth service with a defined scope.

### Method
N/A (Usage Example)

### Endpoint
N/A

### Parameters
None

### Request Example
```tsx
const linear = OAuthService.linear({ scope: "read write" });
```

### Response
N/A (Usage Example)
```

--------------------------------

### OAuth Authentication with Custom Client

Source: https://context7_llms

This example shows how to set up OAuth authentication using a custom client configuration with Raycast utilities. It involves creating an `OAuth.PKCEClient` and an `OAuthService` instance with your specific provider details, client ID, scopes, and URLs.

```tsx
import { OAuth, Detail, LaunchProps } from "@raycast/api";
import { withAccessToken, getAccessToken, OAuthService } from "@raycast/utils";

const client = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "Your Provider Name",
  providerIcon: "provider_icon.png",
  providerId: "yourProviderId",
  description: "Connect your {PROVIDER_NAME} account",
});

const provider = new OAuthService({
  client,
  clientId: "YOUR_CLIENT_ID",
  scope: "YOUR_SCOPES",
  authorizeUrl: "YOUR_AUTHORIZE_URL",
  tokenUrl: "YOUR_TOKEN_URL",
});

function AuthorizedComponent(props: LaunchProps) {
  const { token } = getAccessToken();
  return <Detail markdown={`Access token: ${token}`} />;
}

export default withAccessToken(provider)(AuthorizedComponent);
```

--------------------------------

### Example Usage: Animated Toast with Update

Source: https://developers.raycast.com/api-reference/feedback/toast

Shows how to use an animated toast for an ongoing process and update its state upon completion or failure.

```APIDOC
## POST /example/animated_toast

### Description
Displays an animated toast for an upload process and updates it based on the outcome.

### Method
POST

### Endpoint
`/example/animated_toast`

### Request Body
```json
{
  "uploadSuccess": "boolean"
}
```

### Request Example
```json
{
  "uploadSuccess": true
}
```

### Response
#### Success Response (200)
- **message** (string) - Confirmation message.

#### Response Example
```json
{
  "message": "Animated toast process completed."
}
```

### Code Example
```javascript
import { showToast, Toast } from "@raycast/api";
import { setTimeout } from "timers/promises";

export default async function Command() {
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "Uploading image",
  });

  try {
    // upload the image
    await setTimeout(1000);

    toast.style = Toast.Style.Success;
    toast.title = "Uploaded image";
  } catch (err) {
    toast.style = Toast.Style.Failure;
    toast.title = "Failed to upload image";
    if (err instanceof Error) {
      toast.message = err.message;
    }
  }
}
```
```

--------------------------------

### Install Raycast CLI

Source: https://developers.raycast.com/information/developer-tools/cli

This command installs the Raycast CLI, which is necessary for interacting with Raycast features, including LLMs. Ensure you have Node.js and npm installed.

```bash
npx raycast help
```

--------------------------------

### Raycast Extension Pagination Examples (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/grid

This snippet presents two TypeScript code examples for implementing pagination in Raycast extensions: 'GridWithUsePromisePagination.tsx' and 'GridWithPagination.tsx'. These examples likely demonstrate different approaches to handling data fetching and displaying paginated content within a grid layout.

```typescript
import { List, ActionPanel, Action, useNavigation, showToast, Toast } from '@raycast/api';
import { useState, useEffect } from 'react';

interface Item { id: string; title: string; }

const fetchItems = async (page: number, count: number = 10): Promise<{ items: Item[], hasMore: boolean }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const totalItems = 50;
  const startIndex = (page - 1) * count;
  if (startIndex >= totalItems) {
    return { items: [], hasMore: false };
  }
  const endIndex = Math.min(startIndex + count, totalItems);
  const items: Item[] = [];
  for (let i = startIndex; i < endIndex; i++) {
    items.push({ id: `item-${i + 1}`, title: `Item ${i + 1}` });
  }
  return { items, hasMore: endIndex < totalItems };
};

export default function GridWithPagination() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchItems(page);
        setItems(prevItems => [...prevItems, ...result.items]);
        setHasMore(result.hasMore);
      } catch (error) {
        showToast(Toast.Type.Error, 'Failed to load items');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [page]);

  const onLoadMore = () => {
    if (hasMore && !isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <List isLoading={isLoading} onScrollBottom={onLoadMore}>
      {items.map(item => (
        <List.Item key={item.id} title={item.title} />
      ))}
      {isLoading && <List.Item title="Loading more items..." />}
    </List>
  );
}

```

```typescript
import { List, ActionPanel, Action, useNavigation, showToast, Toast } from '@raycast/api';
import { useState, useEffect } from 'react';
import { usePromise } from '@raycast/utils';

interface Item { id: string; title: string; }

const fetchItems = async (page: number, count: number = 10): Promise<{ items: Item[], hasMore: boolean }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const totalItems = 50;
  const startIndex = (page - 1) * count;
  if (startIndex >= totalItems) {
    return { items: [], hasMore: false };
  }
  const endIndex = Math.min(startIndex + count, totalItems);
  const items: Item[] = [];
  for (let i = startIndex; i < endIndex; i++) {
    items.push({ id: `item-${i + 1}`, title: `Item ${i + 1}` });
  }
  return { items, hasMore: endIndex < totalItems };
};

export default function GridWithUsePromisePagination() {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, error } = usePromise(
    async () => {
      const result = await fetchItems(page);
      return {
        items: result.items,
        hasMore: result.hasMore,
        nextPage: result.hasMore ? page + 1 : page
      };
    },
    [page] // Re-fetch when page changes
  );

  if (error) {
    showToast(Toast.Type.Error, 'Failed to load items');
  }

  const onLoadMore = () => {
    if (data?.hasMore && !isLoading) {
      setPage(data.nextPage);
    }
  };

  return (
    <List isLoading={isLoading} onScrollBottom={onLoadMore}>
      {data?.items.map(item => (
        <List.Item key={item.id} title={item.title} />
      ))}
      {isLoading && <List.Item title="Loading more items..." />}
    </List>
  );
}

```

--------------------------------

### Raycast Cache API Reference

Source: https://developers.raycast.com/utilities

Provides access to the Cache API for managing data within Raycast extensions. This allows for storing and retrieving data persistently across extension launches.

```typescript
import { Cache } from "@raycast/api";

const cache = new Cache();

// Example: Store data
await cache.set("myKey", "myValue");

// Example: Retrieve data
const value = await cache.get("myKey");
console.log(value); // Output: "myValue"

// Example: Remove data
await cache.remove("myKey");
```

--------------------------------

### Provider Integrations

Source: https://developers.raycast.com/utilities/oauth/oauthservice

Examples of initializing OAuthService for specific providers like Asana, GitHub, Google, Jira, Linear, Slack, and Zoom.

```APIDOC
## Provider Integrations

### Description
Provides static methods to initialize the `OAuthService` for various third-party providers with default or custom client options.

### Method
Static methods for each provider (e.g., `OAuthService.asana`, `OAuthService.github`, etc.).

### Endpoint
N/A (Static methods of OAuthService)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
*   **options** (ProviderOptions | ProviderWithDefaultClientOptions) - Required - Provider-specific configuration options, which may include `clientId`, `scope`, and other relevant parameters.

### Request Examples
#### Asana
```javascript
const asana = OAuthService.asana({ scope: "default" });
```

#### GitHub
```javascript
const github = OAuthService.github({ scope: "repo user" });
```

#### Google
```javascript
const google = OAuthService.google({
  clientId: "custom-client-id",
  scope: "https://www.googleapis.com/auth/drive.readonly",
});
```

#### Jira
```javascript
const jira = OAuthService.jira({
  clientId: "custom-client-id",
  scope: "read:jira-user read:jira-work offline_access",
});
```

#### Linear
```javascript
const linear = OAuthService.linear({ scope: "read write" });
```

#### Slack
```javascript
const slack = OAuthService.slack({ scope: "emoji:read" });
```

#### Zoom
```javascript
const zoom = OAuthService.zoom({
  clientId: "custom-client-id",
  scope: "meeting:write",
});
```

### Response
#### Success Response (200)
*   **OAuthService** - An initialized instance of the OAuthService configured for the specific provider.

#### Response Example
```json
{
  "example": "// Provider-specific OAuthService instance created"
}
```
```

--------------------------------

### JavaScript Configuration Example for Raycast LLMs

Source: https://developers.raycast.com/information/developer-tools/eslint

This snippet demonstrates how to configure Raycast LLMs using JavaScript. It utilizes the defineConfig function, which is common in Node.js environments for module configuration. Ensure you have the necessary Raycast or LLM-related packages installed.

```javascript
const { defineConfig } = require("raycast-llms");

defineConfig({
  // Configuration options here
});
```

--------------------------------

### Show Downloads Folder with Action.ShowInFinder

Source: https://developers.raycast.com/api-reference/user-interface/actions

This command opens the user's Downloads directory in Finder. It utilizes the `os` module to get the home directory and constructs the path to the Downloads folder.

```typescript
import { ActionPanel, Detail, Action } from "@raycast/api";
import { homedir } from "os";

const DOWNLOADS_DIR = `${homedir()}/Downloads`;

export default function Command() {
  return (
    <Detail
      markdown="Are your downloads pilling up again?"
      actions={
        <ActionPanel>
          <Action.ShowInFinder path={DOWNLOADS_DIR} />
        </ActionPanel>
      }
    />
  );
}
```

--------------------------------

### Example Raycast Extension Manifest (package.json)

Source: https://context7_llms

This JavaScript snippet demonstrates a typical package.json file for a Raycast extension. It includes essential metadata such as name, title, description, icon, platforms, categories, license, and command definitions.

```javascript
{
  "name": "my-extension",
  "title": "My Extension",
  "description": "My extension that can do a lot of things",
  "icon": "icon.png",
  "author": "thomas",
  "platforms": ["macOS", "Windows"],
  "categories": ["Fun", "Communication"],
  "license": "MIT",
  "commands": [
    {
      "name": "index",
      "title": "Send Love",
      "description": "A command to send love to each other",
      "mode": "view"
    }
  ]
}
```

--------------------------------

### Image URL Example (TypeScript)

Source: https://context7_llms

Shows how to use a string representing a URL as an image source in Raycast. This example sets an image icon for a List.Item using a remote URL.

```typescript
import { List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item title="URL" icon={{ source: "https://raycast.com/uploads/avatar.png" }} />
    </List>
  );
}
```

--------------------------------

### Image Asset Example (TypeScript)

Source: https://context7_llms

Illustrates using a string representing an asset file from the `assets/` folder as an image source in Raycast. This example sets an image icon for a List.Item using a local asset.

```typescript
import { List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item title="Asset" icon={{ source: "avatar.png" }} />
    </List>
  );
}
```

--------------------------------

### Full Pagination Example with Raycast List (TypeScript)

Source: https://context7_llms

A complete example of using the usePromise hook with pagination in a Raycast command. It includes setting up state, defining the paginated async function, and rendering a List component that utilizes the pagination object.

```typescript
import { setTimeout } from "node:timers/promises";
import { useState } from "react";
import { List } from "@raycast/api";
import { usePromise } from "@raycast/utils";

export default function Command() {
  const [searchText, setSearchText] = useState("");

  const { isLoading, data, pagination } = usePromise(
    (searchText: string) => async (options: { page: number }) => {
      await setTimeout(200);
      const newData = Array.from({ length: 25 }, (_v, index) => ({
        index,
        page: options.page,
        text: searchText,
      }));
      return { data: newData, hasMore: options.page < 10 };
    },
    [searchText],
  );

  return (
    <List isLoading={isLoading} onSearchTextChange={setSearchText} pagination={pagination}>
      {data?.map((item) => (
        <List.Item
          key={`${item.page} ${item.index} ${item.text}`}
          title={`Page ${item.page} Item ${item.index}`}
          subtitle={item.text}
        />
      ))}
    </List>
  );
}
```

--------------------------------

### React Search Bar Placeholder Example

Source: https://developers.raycast.com/api-reference/user-interface/grid

This snippet shows how to set a placeholder for a search bar component in a React application. It's a simple text string used to guide user input.

```plaintext
searchBarPlaceholder=\"Search your favorite emoji\"
```

--------------------------------

### Full Example: Paginated List Component

Source: https://context7_llms

A complete example of a Raycast List component that utilizes the useFetch hook with pagination to display a list of companies, including search functionality and handling loading states.

```typescript
import { Icon, Image, List } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useState } from "react";

type SearchResult = { companies: Company[]; page: number; totalPages: number };
type Company = { id: number; name: string; smallLogoUrl?: string };
export default function Command() {
  const [searchText, setSearchText] = useState("");
  const { isLoading, data, pagination } = useFetch(
    (options) =>
      "https://api.ycombinator.com/v0.1/companies?"
      + new URLSearchParams({ page: String(options.page + 1), q: searchText }).toString(),
    {
      mapResult(result: SearchResult) {
        return {
          data: result.companies,
          hasMore: result.page < result.totalPages,
        };
      },
      keepPreviousData: true,
      initialData: [],
    },
  );

  return (
    <List isLoading={isLoading} pagination={pagination} onSearchTextChange={setSearchText}>
      {data.map((company) => (
        <List.Item
          key={company.id}
          icon={{ source: company.smallLogoUrl ?? Icon.MinusCircle, mask: Image.Mask.RoundedRectangle }}
          title={company.name}
        />
      ))}
    </List>
  );
}
```

--------------------------------

### Install @raycast/utils Package

Source: https://developers.raycast.com/utilities/getting-started

Installs the @raycast/utils package as a dependency for your project. This package provides utility functions for building Raycast extensions.

```bash
npm install --save @raycast/utils
```

--------------------------------

### Basic AI Ask Usage (TypeScript)

Source: https://context7_llms

Demonstrates the basic usage of the `AI.ask` function to get a response from the AI and copy it to the clipboard. It imports necessary modules from `@raycast/api`.

```typescript
import { AI, Clipboard } from "@raycast/api";

export default async function command() {
  const answer = await AI.ask("Suggest 5 jazz songs");

  await Clipboard.copy(answer);
}
```

--------------------------------

### Raycast LLM Example Heading

Source: https://developers.raycast.com/api-reference/user-interface/action-panel

This JSON structure represents a heading element for an example section within the Raycast LLM documentation. It includes an ID, CSS classes for styling, and the text 'Example'.

```json
{
  "id": "example",
  "className": "text-base @xs:text-lg @lg:text-xl font-semibold heading flex items-baseline scroll-mt-(--content-scroll-margin) text-start self-start justify-start relative group/hash mx-auto page-width-wide:mx-0 w-full decoration-primary/6 max-w-3xl print:break-inside-avoid page-api-block:ml-0 column-first-of-type:pt-0 pt-\\[0.5em\\]",
  "children": [
    [
      "$",
      "div",
      null,
      {
        "className": "relative hash grid grid-area-1-1 h-\\[1em\\] border-0 opacity-0 site-background rounded group-hover/hash:opacity-\\[0\] group-focus/hash:opacity-\\[0\] md:group-hover/hash:opacity-\\[1\] md:group-focus/hash:opacity-\\[1\] -ml-6 pr-2 \[.flip-heading-hash_&\]:order-last \[.flip-heading-hash_&\]:ml-1 \[.flip-heading-hash_&\]:pl-2",
        "children": [
          "$",
          "$L42",
          null,
          {
            "href": "#example",
            "aria-label": "Direct link to heading",
            "className": "inline-flex h-full items-start leading-snug",
            "children": [
              "$",
              "$L47",
              null,
              {
                "icon": "hashtag",
                "className": "self-center transition-colors text-transparent group-hover/hash:text-tint-subtle contrast-more:group-hover/hash:text-tint-strong size-4"
              }
            ]
          }
        ]
      }
    ],
    [
      "$",
      "div",
      null,
      {
        "className": "flex-1 z-1 justify-self-start max-w-full break-words text-start self-start justify-start leading-snug",
        "children": [
          [
            "$",
            "$1",
            "3380525e2743464e92264a123aca09c0",
            {
              "children": [
                [
                  "$",
                  "$1",
                  "0",
                  {
                    "children": "Example"
                  }
                ]
              ]
            }
          ]
        ]
      }
    ]
  ]
}

```

--------------------------------

### OAuth PKCE Client Initialization

Source: https://context7_llms

Demonstrates how to create and configure an OAuth.PKCEClient instance with provider details and redirect method.

```APIDOC
## POST /oauth/pkce/client

### Description
Initializes an OAuth PKCE client with specified provider details and redirect method.

### Method
POST

### Endpoint
/oauth/pkce/client

### Parameters
#### Request Body
- **redirectMethod** (OAuth.RedirectMethod) - Required - The method used for redirecting after authorization.
- **providerName** (string) - Required - The name of the OAuth provider.
- **providerIcon** (string) - Optional - The icon for the OAuth provider.
- **description** (string) - Optional - A description for the OAuth provider.

### Request Example
```json
{
  "redirectMethod": "Web",
  "providerName": "Twitter",
  "providerIcon": "twitter-logo.png",
  "description": "Connect your Twitter account…"
}
```

### Response
#### Success Response (200)
- **client** (OAuth.PKCEClient) - The initialized PKCE client instance.

#### Response Example
```json
{
  "client": "[PKCEClient Instance]"
}
```
```

--------------------------------

### Fetch and Display Homebrew Packages with Raycast API (TypeScript)

Source: https://developers.raycast.com/utilities/react-hooks/useexec

This snippet demonstrates a Raycast command in TypeScript that fetches installed Homebrew packages. It utilizes `@raycast/api` for UI elements and `@raycast/utils` for data fetching. The `useExec` hook fetches package data, and `useMemo` parses the JSON output. The command displays package information and includes an action to install a package.

```tsx
import { Detail, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import { useFetch } from "@raycast/utils";

export default function Command() {
 const { isLoading, data, revalidate } = useExec("brew", ["info", "--json=v2", "--installed"]);

 const results = useMemo<[]>(() => JSON.parse(data || "[]"), [data]);

 const installFoo = async () => {
 const toast = await showToast({ style: Toast.Style.Animated, title: "Installing Foo" });
 try {
 await mutate(
 // we are calling an API to do something
 installBrewCask("foo"),
 );
 toast.style = Toast.Style.Success;
 toast.title = "Installed Foo";
 } catch (error) {
 toast.style = Toast.Style.Failure;
 toast.title = "Failed to install Foo";
 toast.message = error.message;
 }
 };
```

--------------------------------

### Raycast List Dropdown Example with Items (TypeScript)

Source: https://context7_llms

Demonstrates how to create a List.Dropdown component with multiple items in Raycast using TypeScript. This example shows how to integrate a dropdown with search functionality into a main list.

```typescript
import { List } from "@raycast/api";

export default function Command() {
  return (
    <List
      searchBarAccessory={
        <List.Dropdown tooltip="Dropdown With Items">
          <List.Dropdown.Item title="One" value="one" />
          <List.Dropdown.Item title="Two" value="two" />
          <List.Dropdown.Item title="Three" value="three" />
        </List.Dropdown>
      }
    >
      <List.Item title="Item in the Main List" />
    </List>
  );
}
```

--------------------------------

### useFrecencySorting Example Usage

Source: https://developers.raycast.com/utilities/react-hooks/usefrecencysorting

A conceptual example demonstrating how to use the `useFrecencySorting` hook with a list of items. It shows how to initialize the hook, sort the data, and use the `visitItem` function when an item is interacted with.

```javascript
// Assuming 'items' is an array of objects with a unique 'id' property
const { data: sortedItems, visitItem } = useFrecencySorting(items);

// In your JSX, you would render sortedItems
// And when an item is clicked or used:
const handleItemClick = async (item) => {
  await visitItem(item);
  // Perform other actions related to the item click
};
```

--------------------------------

### Asynchronous Data Fetching with usePromise in Raycast

Source: https://developers.raycast.com/utilities/react-hooks/usepromise

Shows a basic example of using the `usePromise` hook to fetch asynchronous data. The hook manages the loading state and provides the fetched data. This snippet is a starting point for any data-dependent UI component within a Raycast extension.

```typescript
const { isLoading, data } = usePromise(
  async (searchText: string) => {
    const data = await getUser(); // or any asynchronous logic you need to perform
    return data;
  },
);
```

--------------------------------

### Launch Quicklink and Snippet with Context (JavaScript)

Source: https://context7_llms

Demonstrates how to launch the 'Create Quicklink' and 'Create Snippet' commands with specific context data. This utilizes the `launchCommand` function with `LaunchContext` to pass parameters like application name, text, or keywords.

```javascript
launchCommand({
  ownerOrAuthorName: "raycast",
  extensionName: "raycast",
  name: "create-quicklink",
  type: LaunchType.UserInitiated,
  context: {
    name: "context name",
    application: "Xcode",
  }
});

launchCommand({
  ownerOrAuthorName: "raycast",
  extensionName: "snippets",
  name: "create-snippet",
  type: LaunchType.UserInitiated,
  context: {
    name: "context name",
    text: "context text",
    keyword: "context keyword"
  }
})
```

--------------------------------

### Attach VS Code Debugger to Raycast Extension

Source: https://context7_llms

Instructions for debugging Raycast extensions using Visual Studio Code. This requires installing the VS Code extension for Raycast and following a sequence of commands to start the extension in development mode and attach the debugger.

```bash
# 1. Activate extension in dev mode:
npm run dev
# or via VSCode command: Raycast: Start Development Mode

# 2. Start VSCode command: Raycast: Attach Debugger

# 3. Set breakpoints in your code.

# 4. Activate your command.
```

--------------------------------

### Raycast Header Logo Link

Source: https://developers.raycast.com/utilities

This snippet defines the structure for the Raycast header logo, which acts as a link to the homepage. It includes accessibility attributes and nested elements for the logo image and text.

```javascript
["$","$L42",null,{"href":"/","className":"group/headerlogo min-w-0 shrink flex items-center","children":["$L43","$L44"]}]

```

--------------------------------

### Example Usage: Toast with Primary Action

Source: https://developers.raycast.com/api-reference/feedback/toast

Demonstrates how to add a primary action button to a toast message, allowing user interaction.

```APIDOC
## POST /example/toast_with_action

### Description
Shows a toast message with a primary action button that can be interacted with.

### Method
POST

### Endpoint
`/example/toast_with_action`

### Request Body
```json
{
  "actionTitle": "string",
  "actionMessage": "string"
}
```

### Request Example
```json
{
  "actionTitle": "Confirm",
  "actionMessage": "Action completed successfully."
}
```

### Response
#### Success Response (200)
- **message** (string) - Confirmation message.

#### Response Example
```json
{
  "message": "Toast with action displayed."
}
```

### Code Example
```javascript
import { showToast, Toast } from "@raycast/api";

export default async function Command() {
  const options: Toast.Options = {
    style: Toast.Style.Success,
    title: "Finished cooking",
    message: "Delicious pasta for lunch",
    primaryAction: {
      title: "Do something",
      onAction: (toast) => {
        console.log("The toast action has been triggered");
        toast.hide();
      },
    },
  };
  await showToast(options);
}
```
```

--------------------------------

### Image Source Examples (TypeScript)

Source: https://context7_llms

Provides examples of different ways to define an image source in Raycast. This includes using built-in icons, icons with tint colors, bundled assets with masks, and theme-aware images using light and dark variants.

```typescript
// Built-in icon
const icon = Icon.Eye;

// Built-in icon with tint color
const tintedIcon = { source: Icon.Bubble, tintColor: Color.Red };

// Bundled asset with circular mask
const avatar = { source: "avatar.png", mask: Image.Mask.Circle };

// Implicit theme-aware icon
// with 'icon.png' and 'icon@dark.png' in the `assets` folder
const icon = "icon.png";

// Explicit theme-aware icon
const icon = { source: { light: "https://example.com/icon-light.png", dark: "https://example.com/icon-dark.png" } };
```

--------------------------------

### Example Usage of useSQL Hook

Source: https://context7_llms

Demonstrates how to use the `useSQL` hook to fetch data from a local SQLite database (Apple Notes). It includes handling loading states, permission views, and rendering a list of items based on the query results.

```tsx
import { useSQL } from "@raycast/utils";
import { resolve } from "path";
import { homedir } from "os";

const NOTES_DB = resolve(homedir(), "Library/Group Containers/group.com.apple.notes/NoteStore.sqlite");
const notesQuery = `SELECT id, title FROM ...`;
type NoteItem = {
  id: string;
  title: string;
};

export default function Command() {
  const { isLoading, data, permissionView } = useSQL<NoteItem>(NOTES_DB, notesQuery);

  if (permissionView) {
    return permissionView;
  }

  return (
    <List isLoading={isLoading}>
      {(data || []).map((item) => (
        <List.Item key={item.id} title={item.title} />
      ))}
    </List>
  );
}
```

--------------------------------

### Optimistic Update Example

Source: https://developers.raycast.com/utilities/react-hooks/useexec

Demonstrates how to perform an optimistic update for a data list, providing immediate user feedback before the API call completes.

```APIDOC
## POST /api/data/optimistic

### Description
This endpoint allows for an optimistic update of data. It immediately updates the UI with new data and then attempts to synchronize with the backend. If the backend operation fails, the UI data is automatically rolled back.

### Method
POST

### Endpoint
/api/data/optimistic

### Parameters
#### Query Parameters
- **None**

#### Request Body
- **data** (Array<Object>) - Required - The current list of data items to be updated.

### Request Example
```json
{
  "data": [
    {"name": "existing_item", "id": "existing_id"}
  ]
}
```

### Response
#### Success Response (200)
- **data** (Array<Object>) - The updated list of data items, including the optimistically added item.

#### Response Example
```json
{
  "data": [
    {"name": "existing_item", "id": "existing_id"},
    {"name": "foo", "id": "foo"}
  ]
}
```

#### Error Response (e.g., 500)
- **message** (String) - An error message detailing the failure.

#### Error Response Example
```json
{
  "message": "Internal Server Error"
}
```
```

--------------------------------

### Get Active Window and Set Bounds (TypeScript)

Source: https://context7_llms

Demonstrates how to use the Window Management API to get the currently active window and attempt to set its bounds. It includes error handling for cases where the API is inaccessible or the window is not positionable.

```typescript
import { WindowManagement, showToast } from "@raycast/api";

export default async function Command() {
  try {
    const window = await WindowManagement.getActiveWindow();
    if (window.positionable) {
      await WindowManagement.setWindowBounds({ id: window.id, bounds: { position: { x: 100 } } });
    }
  } catch (error) {
    showToast({ title: `Could not move window: ${error.message}`, style: Toast.Style.Failure });
  }
}

```

--------------------------------

### Launch Command with Context (JavaScript)

Source: https://context7_llms

Demonstrates how to launch commands with specific context using `launchCommand`. This is useful for creating quick links or snippets with pre-defined information. It requires specifying the owner, extension name, command name, launch type, and context details.

```javascript
launchCommand({
  ownerOrAuthorName: "raycast",
  extensionName: "raycast",
  name: "create-quicklink",
  type: LaunchType.UserInitiated,
  context: {
    name: "context name",
    application: "Xcode",
  }
});

launchCommand({
  ownerOrAuthorName: "raycast",
  extensionName: "snippets",
  name: "create-snippet",
  type: LaunchType.UserInitiated,
  context: {
    name: "context name",
    text: "context text",
    keyword: "context keyword"
  }
})
```

--------------------------------

### Get All Items from Raycast LocalStorage (TypeScript)

Source: https://developers.raycast.com/api-reference/storage

Shows how to retrieve all items stored in Raycast's LocalStorage. It defines an interface for the expected structure of the stored values and then uses `allItems` to fetch them. The example logs the count of items retrieved.

```typescript
import { LocalStorage } from "@raycast/api";

interface Values {
  todo: string;
  priority: number;
}

export default async function Command() {
  const items = await LocalStorage.allItems<Values>();
  console.log(`Local storage item count: ${Object.entries(items).length}`);
}
```

--------------------------------

### Configure GitHub OAuthService

Source: https://context7_llms

Sets up the OAuthService for GitHub integration using a PKCE client. It specifies the client ID, scopes, and authorization/token URLs. This example demonstrates manual configuration of the OAuthService.

```ts
const client = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "GitHub",
  providerIcon: "extension_icon.png",
  providerId: "github",
  description: "Connect your GitHub account",
});

const github = new OAuthService({
  client,
  clientId: "7235fe8d42157f1f38c0",
  scope: "notifications repo read:org read:user read:project",
  authorizeUrl: "https://github.oauth.raycast.com/authorize",
  tokenUrl: "https://github.oauth.raycast.com/token",
});
```

--------------------------------

### Raycast LLM Initialization and Update Script

Source: https://developers.raycast.com/utilities

This JavaScript code appears to be part of the Raycast LLM initialization process. It includes functions for handling script updates and potentially managing performance metrics. The `$RC` function seems to be responsible for initializing or updating elements based on provided IDs and the `$RV` function handles the removal of elements and updates.

```javascript
$RB=\[\];$RV=function(b){$RT=performance.now();for(var a=0;a<b.length;a+=2){var c=b\[a],e=b\[a+1\];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d||"/&"===d)if(0===h)break;else h--;else"$"!==d&&"$?"!==d&&"$~"!==d&&"$!"!==d&&"&"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data="$";g._reactRetry&&g._reactRetry()}}b.length=0}; $RC=function(b,a){if(a=document.getElementById(a))(b=document.getElementById(b))?(b.previousSibling.data="$~",$RB.push(b,a),2===$RB.length&&(b="number"!==typeof $RT?0:$RT,a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:b+300-a))):a.parentNode.removeChild(a)};$RC("B:0","S:0")
```

```javascript
$RC("B:1","S:1")
```

```javascript
$RC("B:2","S:2")
```

--------------------------------

### TypeScript Type Safety for Arguments

Source: https://developers.raycast.com/information/lifecycle/arguments

This example shows how to leverage Raycast's global TypeScript namespace `Arguments` to ensure type safety when accessing command arguments. By defining the `LaunchProps` with the specific argument types, you get autocompletion and compile-time checks for argument names and their values.

```typescript
import { LaunchProps, showHUD } from '@raycast/api';

type ShowTodosArgs = {
  query: string;
  status?: 'open' | 'closed';
};

export default function Command(props: LaunchProps<{ arguments: Arguments.ShowTodos }> ) {
  const { query, status } = props.arguments;

  // Use query and status here
  showHUD(`Query: ${query}, Status: ${status || 'any'}`);
}
```

--------------------------------

### Example: Using withCache for Expensive Data Fetching (TypeScript/TSX)

Source: https://context7_llms

Shows how to wrap an `fetchExpensiveData` function with `withCache` to cache its results for a specified duration (5 minutes in this example). The wrapped function `cachedFunction` can then be called to retrieve cached or fresh data.

```tsx
import { withCache } from "@raycast/utils";

function fetchExpensiveData(query) {
  // ...
}

const cachedFunction = withCache(fetchExpensiveData, {
  maxAge: 5 * 60 * 1000, // Cache for 5 minutes
});

const result = await cachedFunction(query);
```

--------------------------------

### Image Fallback Example (TypeScript)

Source: https://context7_llms

Demonstrates the Image.Fallback type, allowing a fallback image (Asset, Icon, or theme-aware) to be displayed if the primary source fails to load. This example shows a URL source with an asset fallback.

```typescript
import { List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item
        title="URL Source With Asset Fallback"
        icon={{
          source: "https://raycast.com/uploads/avatar.png",
          fallback: "default-avatar.png",
        }}
      />
    </List>
  );
}
```

--------------------------------

### Get and Transform Selected Text in Raycast

Source: https://developers.raycast.com/api-reference/environment

This example retrieves the selected text on the user's screen using `getSelectedText`. It then converts the text to uppercase and pastes it back. Error handling is included to show a toast message upon failure.

```typescript
import { getSelectedText, Clipboard, showToast, Toast } from "@raycast/api";

export default async function Command() {
  try {
    const selectedText = await getSelectedText();
    const transformedText = selectedText.toUpperCase();
    await Clipboard.paste(transformedText);
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Cannot transform text",
      message: String(error),
    });
  }
}
```

--------------------------------

### Get Browser Tab Content as Markdown (TypeScript)

Source: https://context7_llms

Fetches the content of the currently active browser tab and converts it into Markdown format. This functionality is provided by the Browser Extension API and can be used to easily copy or process web page content. The Browser Extension must be installed.

```typescript
import { BrowserExtension, Clipboard } from "@raycast/api";

export default async function command() {
  const markdown = await BrowserExtension.getContent({ format: "markdown" });

  await Clipboard.copy(markdown);
}
```

--------------------------------

### Example Usage of Form.TagPicker.Item in Raycast

Source: https://context7_llms

Demonstrates how to use the Form.TagPicker.Item component within a Raycast Form. This example shows how to define a tag picker for colors with associated titles and icons, and how to submit the form.

```typescript
import { ActionPanel, Color, Form, Icon, Action } from "@raycast/api";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Color" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.TagPicker id="color" title="Color">
        <Form.TagPicker.Item value="red" title="Red" icon={{ source: Icon.Circle, tintColor: Color.Red }} />
        <Form.TagPicker.Item value="green" title="Green" icon={{ source: Icon.Circle, tintColor: Color.Green }} />
        <Form.TagPicker.Item value="blue" title="Blue" icon={{ source: Icon.Circle, tintColor: Color.Blue }} />
      </Form.TagPicker>
    </Form>
  );
}
```

--------------------------------

### OAuth.PKCEClient Initialization and Configuration

Source: https://developers.raycast.com/api-reference/oauth

Learn how to initialize and configure the PKCEClient with provider details and redirect methods.

```APIDOC
## POST /api/oauth/pkceclient

### Description
Initializes and configures the OAuth PKCEClient for an extension. This involves setting up provider details, icons, descriptions, and choosing a redirect method.

### Method
POST

### Endpoint
/api/oauth/pkceclient

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **options** (OAuth.PKCEClient.Options) - Required - Options to configure the PKCE client, including provider name, icon, description, and redirect method.

### Request Example
```json
{
  "options": {
    "providerName": "ExampleProvider",
    "icon": "https://example.com/icon.png",
    "description": "Authenticate with ExampleProvider",
    "redirectMethod": "OAuth.RedirectMethod.Web"
  }
}
```

### Response
#### Success Response (200)
- **client** (OAuth.PKCEClient) - The initialized PKCE client instance.

#### Response Example
```json
{
  "client": "[PKCEClient Instance]"
}
```
```

--------------------------------

### String Parameter Example

Source: https://developers.raycast.com/utilities/oauth/oauthservice

Illustrates a basic string parameter, often used for configuration or identifiers within an API. This example shows a simple string value.

```typescript
const exampleString: string = "someValue";
```

--------------------------------

### Initialize Slack OAuth Service (TypeScript)

Source: https://developers.raycast.com/utilities/oauth/oauthservice

Initializes the Slack OAuth service with specified options. This TypeScript example shows the signature for configuring the Slack provider.

```typescript
OAuthService.slack: (options: ProviderWithDefaultClientOptions) => OAuthService
```

--------------------------------

### Initialize Content and Visitor Session Providers

Source: https://developers.raycast.com/misc/migration

This snippet shows the setup for CurrentContentProvider and VisitorSessionProvider, along with other related context providers. It references specific JavaScript files, indicating their role in managing content display and user session data.

```javascript
self.__next_f.push([
  1,
  "\", \"9014\", \"static/chunks/9014-2de2a842f1453568.js\", \"4078\", \"static/chunks/4078-240c6ceed53849bd.js\", \"3\", \"static/chunks/3-706fe07d48eb98ff.js\", \"559\", \"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/layout-38e0735c1c8235e3.js\" ]", \"CurrentContentProvider\" ]\n27:I[61145, [\"6268\", \"static/chunks/f5718501-b58a5cfb1abadce5.js\", \"2122\", \"static/chunks/9071f66d-390fafe3303b2acb.js\", \"6500\", \"static/chunks/6500-df22b4917e9f7eea.js\", \"711\", \"static/chunks/711-f01ba055e2d09f63.js\", \"9014\", \"static/chunks/9014-2de2a842f1453568.js\", \"1026\", \"static/chunks/1026-7238b3f0a07452e6.js\", \"6782\", \"static/chunks/6782-c774ebb74dd85111.js\", \"9330\", \"static/chunks/9330-58d5f2baf27a33de.js\", \"8617\", \"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/%5BpagePath%5D/page-f5ef1efb17e610fe.js\"]", \"VisitorSessionProvider\" ]\n28:I[14417, [\"6268\", \"static/chunks/f5718501-b58a5cfb1abadce5.js\", \"2122\", \"static/chunks/9071f66d-390fafe3303b2acb.js\", \"6500\", \"static/chunks/6500-df22b4917e9f7eea.js\", \"711\", \"static/chunks/711-f01ba055e2d09f63.js\", \"9014\", \"static/chunks/9014-2de2a842f1453568.js\", \"1026\", \"static/chunks/1026-7238b3f0a07452e6.js\", \"6782\", \"static/chunks/6782-c774ebb74dd85111.js\", \"9330\", \"static/chunks/9330-58d5f2baf27a33de.js\", \"8617\", \"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/%5BpagePath%5D/page-f5ef1efb17e610fe.js\"]", \"InsightsProvider\" ]\n29:I[67652, [\"6268\", \"static/chunks/f5718501-b58a5cfb1abadce5.js\", \"6500\", \"static/chunks/6500-df22b4917e9f7eea.js\", \"4945\", \"static/chunks/4945-430fa5cc2f8244f6.js\"..." ]
```

--------------------------------

### Initialize OAuthService for GitHub

Source: https://developers.raycast.com/utilities/oauth/oauthservice

Demonstrates how to initialize the OAuthService for GitHub using the PKCEClient. This involves configuring the client with redirect method, provider details, and then instantiating OAuthService with specific API endpoints and scopes.

```typescript
const client = new OAuth.PKCEClient({
      redirectMethod: OAuth.RedirectMethod.Web,
      providerName: "GitHub",
      providerIcon: "extension_icon.png",
      providerId: "github",
      description: "Connect your GitHub account",
    });
    
    const github = new OAuthService({
      client,
      clientId: "7235fe8d42157f1f38c0",
      scope: "notifications repo read:org read:user read:project",
      authorizeUrl: "https://github.oauth.raycast.com/authorize",
      tokenUrl: "https://github.oauth.raycast.com/token",
    });
```

--------------------------------

### Full Example: Paginated List in Raycast

Source: https://context7_llms

A complete example demonstrating the use of `useCachedPromise` with pagination in a Raycast List component. It includes state management for search text, the `useCachedPromise` hook configured for page-based pagination, and rendering the data within a `List.Item`. The `pagination` object from the hook is passed directly to the `List` component.

```tsx
import { setTimeout } from "node:timers/promises";
import { useState } from "react";
import { List } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

export default function Command() {
  const [searchText, setSearchText] = useState("");

  const { isLoading, data, pagination } = useCachedPromise(
    (searchText: string) => async (options: { page: number }) => {
      await setTimeout(200);
      const newData = Array.from({ length: 25 }, (_v, index) => ({
        index,
        page: options.page,
        text: searchText,
      }));
      return { data: newData, hasMore: options.page < 10 };
    },
    [searchText],
  );

  return (
    <List isLoading={isLoading} onSearchTextChange={setSearchText} pagination={pagination}>
      {data?.map((item) => (
        <List.Item
          key={`${item.page} ${item.index} ${item.text}`}
          title={`Page ${item.page} Item ${item.index}`}
          subtitle={item.text}
        />
      ))}
    </List>
  );
}
```

--------------------------------

### Fetch Users with Page Pagination (TypeScript)

Source: https://developers.raycast.com/utilities/react-hooks/usepromise

An example of using `usePromise` for fetching users with page-based pagination. It shows how to determine if there are more pages available based on the current page number.

```typescript
const { isLoading, data, pagination } = usePromise(
  (searchText: string) =>
    async ({ page, lastItem, cursor }) => {
      const { data } = await getUsers(page); // or any other asynchronous logic you need to perform
      const hasMore = page < 50;
      return { data, hasMore };
    },
  [searchText],
);
```

--------------------------------

### Raycast Theming CSS Variables

Source: https://developers.raycast.com/utilities

This CSS defines a comprehensive set of CSS variables for theming within Raycast applications. It includes variables for primary, tint, neutral, header, info, warning, and danger color schemes, along with their contrast counterparts. These variables allow for dynamic theming based on user preferences or OS settings.

```css
:root, .light, .dark [data-color-scheme$="light"], .dark [data-follow-color-scheme="true"]:has([data-color-scheme$="light"]) {
  --primary-1: 255 255 255;
  --contrast-primary-1: 29 29 29;
  --primary-2: 255 248 247;
  --contrast-primary-2: 29 29 29;
  --primary-3: 255 243 241;
  --contrast-primary-3: 29 29 29;
  --primary-4: 255 235 233;
  --contrast-primary-4: 29 29 29;
  --primary-5: 255 228 225;
  --contrast-primary-5: 29 29 29;
  --primary-6: 255 218 215;
  --contrast-primary-6: 29 29 29;
  --primary-7: 253 203 199;
  --contrast-primary-7: 29 29 29;
  --primary-8: 245 188 184;
  --contrast-primary-8: 29 29 29;
  --primary-9: 255 99 99;
  --contrast-primary-9: 255 255 255;
  --primary-10: 210 56 63;
  --contrast-primary-10: 255 255 255;
  --primary-11: 150 92 89;
  --contrast-primary-11: 255 255 255;
  --primary-12: 37 26 25;
  --contrast-primary-12: 255 255 255;
  --primary-original: 255 99 99;
  --contrast-primary-original: 255 255 255;
  --tint-1: 255 255 255;
  --contrast-tint-1: 29 29 29;
  --tint-2: 251 249 249;
  --contrast-tint-2: 29 29 29;
  --tint-3: 250 246 246;
  --contrast-tint-3: 29 29 29;
  --tint-4: 246 241 240;
  --contrast-tint-4: 29 29 29;
  --tint-5: 242 235 235;
  --contrast-tint-5: 29 29 29;
  --tint-6: 236 227 226;
  --contrast-tint-6: 29 29 29;
  --tint-7: 224 214 213;
  --contrast-tint-7: 29 29 29;
  --tint-8: 213 201 200;
  --contrast-tint-8: 29 29 29;
  --tint-9: 155 124 122;
  --contrast-tint-9: 255 255 255;
  --tint-10: 143 113 111;
  --contrast-tint-10: 255 255 255;
  --tint-11: 119 107 106;
  --contrast-tint-11: 255 255 255;
  --tint-12: 31 28 28;
  --contrast-tint-12: 255 255 255;
  --tint-original: 120 120 120;
  --contrast-tint-original: 255 255 255;
  --neutral-1: 255 255 255;
  --contrast-neutral-1: 29 29 29;
  --neutral-2: 250 250 250;
  --contrast-neutral-2: 29 29 29;
  --neutral-3: 247 247 247;
  --contrast-neutral-3: 29 29 29;
  --neutral-4: 242 242 242;
  --contrast-neutral-4: 29 29 29;
  --neutral-5: 237 237 237;
  --contrast-neutral-5: 29 29 29;
  --neutral-6: 229 229 229;
  --contrast-neutral-6: 29 29 29;
  --neutral-7: 217 217 217;
  --contrast-neutral-7: 29 29 29;
  --neutral-8: 204 204 204;
  --contrast-neutral-8: 29 29 29;
  --neutral-9: 120 120 120;
  --contrast-neutral-9: 255 255 255;
  --neutral-10: 121 121 121;
  --contrast-neutral-10: 255 255 255;
  --neutral-11: 110 110 110;
  --contrast-neutral-11: 255 255 255;
  --neutral-12: 29 29 29;
  --contrast-neutral-12: 255 255 255;
  --neutral-original: 120 120 120;
  --contrast-neutral-original: 255 255 255;
  --header-background: 255 99 99;
  --header-link: 255 255 255;
  --info-1: 255 255 255;
  --contrast-info-1: 29 29 29;
  --info-2: 250 250 250;
  --contrast-info-2: 29 29 29;
  --info-3: 247 247 247;
  --contrast-info-3: 29 29 29;
  --info-4: 242 242 242;
  --contrast-info-4: 29 29 29;
  --info-5: 237 237 237;
  --contrast-info-5: 29 29 29;
  --info-6: 229 229 229;
  --contrast-info-6: 29 29 29;
  --info-7: 217 217 217;
  --contrast-info-7: 29 29 29;
  --info-8: 204 204 204;
  --contrast-info-8: 29 29 29;
  --info-9: 120 120 120;
  --contrast-info-9: 255 255 255;
  --info-10: 121 121 121;
  --contrast-info-10: 255 255 255;
  --info-11: 110 110 110;
  --contrast-info-11: 255 255 255;
  --info-12: 29 29 29;
  --contrast-info-12: 255 255 255;
  --info-original: 120 120 120;
  --contrast-info-original: 255 255 255;
  --warning-1: 255 255 255;
  --contrast-warning-1: 29 29 29;
  --warning-2: 254 249 244;
  --contrast-warning-2: 29 29 29;
  --warning-3: 255 245 236;
  --contrast-warning-3: 29 29 29;
  --warning-4: 255 239 225;
  --contrast-warning-4: 29 29 29;
  --warning-5: 254 233 214;
  --contrast-warning-5: 29 29 29;
  --warning-6: 250 224 200;
  --contrast-warning-6: 29 29 29;
  --warning-7: 242 211 182;
  --contrast-warning-7: 29 29 29;
  --warning-8: 233 197 164;
  --contrast-warning-8: 29 29 29;
  --warning-9: 254 154 0;
  --contrast-warning-9: 29 29 29;
  --warning-10: 187 92 0;
  --contrast-warning-10: 255 255 255;
  --warning-11: 138 102 66;
  --contrast-warning-11: 255 255 255;
  --warning-12: 35 28 21;
  --contrast-warning-12: 255 255 255;
  --warning-original: 254 154 0;
  --contrast-warning-original: 29 29 29;
  --danger-1: 255 255 255;
  --contrast-danger-1: 29 29 29;
  --danger-2: 255 247 246;
  --contrast-danger-2: 29 29 29;
  --danger-3: 255 242 239;
  --contrast-danger-3: 29 29 29;
  --danger-4: 255 234 230;
  --contrast-danger-4: 29 29 29;
  --danger-5: 255 226 221;
  --contrast-danger-5: 29 29 29;
  --danger-6: 255 215 210;
  --contrast-danger-6: 29 29 29;
  --danger-7: 255 200 193;
  --contrast-danger-7: 29 29 29;
  --danger-8: 254 184 177;
  --contrast-danger-8: 29 29 29;
  --danger-9: 251 44 54;
  --contrast-danger-9: 255 255 255;
  --danger-10: 228 0 33;
  --contrast-danger-10: 255 255 255;
  --danger-11: 158 87 81;
  --contrast-danger-11: 255 255 255;
  --danger-12: 39 25 23;
  --contrast-danger-12: 255 255 255;
  --danger-original: 251 44 54;
  --contrast-danger-original: 255 255 255;
  --success-1: 255 255 255;
  --contrast-success-1: 29 29 29;
  --success-2: 245 252 24
}
```

--------------------------------

### Initialize a Raycast Extension with a Template

Source: https://www.raycast.com/templates

Use this command to quickly start building a new Raycast extension based on a chosen template. This command sets up the basic structure and configuration for your extension, allowing you to customize it to your specific needs.

```bash
npm init raycast-extension -t <template-name>
```

--------------------------------

### Toast API Reference

Source: https://context7_llms

This section details the `showToast` function, its parameters, return value, and provides examples for different use cases.

```APIDOC
## POST /showToast

### Description
Creates and shows a Toast with the given options. Toasts are used to inform the user about asynchronous operations or errors. They can also have associated actions.

### Method
POST

### Endpoint
/showToast

### Parameters
#### Request Body
- **options** (Toast.Options) - Required - The options to customize the Toast. This includes style, title, message, and optional actions.

### Request Example
```json
{
  "title": "Operation Successful",
  "message": "Data has been saved.",
  "style": "Success"
}
```

### Response
#### Success Response (200)
- **Toast** (Toast) - A Toast object that can be used to update or hide the toast.

#### Response Example
```json
{
  "style": "Success",
  "title": "Operation Successful",
  "message": "Data has been saved."
}
```

## Types

### Toast.Options

#### Properties
- **style** (Toast.Style) - Required - The style of the Toast (e.g., `Success`, `Failure`, `Animated`).
- **title** (string) - Required - The main title of the Toast.
- **message** (string) - Optional - An additional message for the Toast.
- **primaryAction** (Alert.ActionOptions) - Optional - The primary action for the Toast.
- **secondaryAction** (Alert.ActionOptions) - Optional - The secondary action for the Toast.

### Toast

#### Properties
- **style** (Toast.Style) - The style of the Toast.
- **title** (string) - The title of the Toast.
- **message** (string) - The message of the Toast.
- **primaryAction** (Alert.ActionOptions) - The primary action of the Toast.
- **secondaryAction** (Alert.ActionOptions) - The secondary action of the Toast.

#### Methods
- **hide()**: Hides the Toast.
- **show()**: Shows the Toast.
```

--------------------------------

### Raycast CLI: Start Extension in Development Mode

Source: https://context7_llms

Launches your Raycast extension in development mode, enabling features like automatic reloading on save, detailed error overlays, and quick access in the Raycast root search. This command is vital for an efficient development feedback loop.

```bash
npx ray develop
```

--------------------------------

### Get Browser Tab Content with CSS Selector (TypeScript)

Source: https://context7_llms

Retrieves the text content of an HTML element from an open browser tab using a CSS selector. This function is part of the Browser Extension API and requires the browser extension to be installed. It returns the content as plain text.

```typescript
import { BrowserExtension, Clipboard } from "@raycast/api";

export default async function command() {
  const title = await BrowserExtension.getContent({ format: "text", cssSelector: "title" });

  await Clipboard.copy(title);
}
```

--------------------------------

### CSS Color Variables for Light Theme

Source: https://developers.raycast.com/utilities

Defines CSS custom properties for color palettes in the light theme. These variables are used to style various UI elements and provide a consistent color scheme. They include primary, success, info, warning, and danger colors with their respective contrast values.

```css
.light, :root:not(.dark) [data-color-scheme^="light"] { --primary-1: 255 255 255; --contrast-primary-1: 29 29 29; --primary-2: 249 249 249; --contrast-primary-2: 29 29 29; --primary-3: 243 243 243; --contrast-primary-3: 29 29 29; --primary-4: 238 238 238; --contrast-primary-4: 29 29 29; --primary-5: 233 233 233; --contrast-primary-5: 29 29 29; --primary-6: 227 227 227; --contrast-primary-6: 29 29 29; --primary-7: 217 217 217; --contrast-primary-7: 29 29 29; --primary-8: 204 204 204; --contrast-primary-8: 29 29 29; --primary-9: 255 99 99; --contrast-primary-9: 255 255 255; --primary-10: 238 83 85; --contrast-primary-10: 255 255 255; --primary-11: 238 173 169; --contrast-primary-11: 29 29 29; --primary-12: 255 251 249; --contrast-primary-12: 29 29 29; --primary-original: 255 99 99; --contrast-primary-original: 255 255 255; --tint-1: 255 255 255; --contrast-tint-1: 29 29 29; --tint-2: 251 251 251; --contrast-tint-2: 29 29 29; --tint-3: 246 246 246; --contrast-tint-3: 29 29 29; --tint-4: 243 243 243; --contrast-tint-4: 29 29 29; --tint-5: 238 238 238; --contrast-tint-5: 29 29 29; --tint-6: 233 233 233; --contrast-tint-6: 29 29 29; --tint-7: 224 224 224; --contrast-tint-7: 29 29 29; --tint-8: 210 210 210; --contrast-tint-8: 29 29 29; --tint-9: 179 179 179; --contrast-tint-9: 29 29 29; --tint-10: 166 166 166; --contrast-tint-10: 29 29 29; --tint-11: 134 134 134; --contrast-tint-11: 29 29 29; --tint-12: 255 255 254; --contrast-tint-12: 29 29 29; --tint-original: 120 120 120; --contrast-tint-original: 255 255 255; --neutral-1: 255 255 255; --contrast-neutral-1: 29 29 29; --neutral-2: 251 251 251; --contrast-neutral-2: 29 29 29; --neutral-3: 246 246 246; --contrast-neutral-3: 29 29 29; --neutral-4: 243 243 243; --contrast-neutral-4: 29 29 29; --neutral-5: 238 238 238; --contrast-neutral-5: 29 29 29; --neutral-6: 233 233 233; --contrast-neutral-6: 29 29 29; --neutral-7: 224 224 224; --contrast-neutral-7: 29 29 29; --neutral-8: 210 210 210; --contrast-neutral-8: 29 29 29; --neutral-9: 179 179 179; --contrast-neutral-9: 29 29 29; --neutral-10: 166 166 166; --contrast-neutral-10: 29 29 29; --neutral-11: 134 134 134; --contrast-neutral-11: 29 29 29; --neutral-12: 255 255 255; --contrast-neutral-12: 29 29 29; --neutral-original: 120 120 120; --contrast-neutral-original: 255 255 255; --header-background: 255 99 99; --header-link: 255 255 255; --success-1: 255 255 255; --contrast-success-1: 29 29 29; --success-2: 249 252 250; --contrast-success-2: 29 29 29; --success-3: 238 252 240; --contrast-success-3: 29 29 29; --success-4: 229 249 231; --contrast-success-4: 29 29 29; --success-5: 219 246 222; --contrast-success-5: 29 29 29; --success-6: 207 240 210; --contrast-success-6: 29 29 29; --success-7: 190 229 194; --contrast-success-7: 29 29 29; --success-8: 172 218 177; --contrast-success-8: 29 29 29; --success-9: 0 201 80; --contrast-success-9: 29 29 29; --success-10: 0 152 23; --contrast-success-10: 255 255 255; --success-11: 74 124 82; --contrast-success-11: 255 255 255; --success-12: 22 32 23; --contrast-success-12: 255 255 255; --success-original: 0 201 80; --contrast-success-original: 29 29 29; }
```

--------------------------------

### Action.ToggleQuickLook Path Expansion

Source: https://context7_llms

The `Action.ToggleQuickLook` component now expands paths that start with `~`, ensuring proper handling of user directory paths.

```APIDOC
## `Action.ToggleQuickLook` Path Expansion

### Description
Handles path expansion for `Action.ToggleQuickLook`, including paths starting with `~`.

### Method
`Action.ToggleQuickLook(props: { file: string | FileWithQSOptions })`

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
- **file** (string | FileWithQSOptions) - Required - The file path or object for which to toggle Quick Look.

### Request Example
```javascript
import { Action, List } from '@raycast/api';

<List>
  <List.Item
    title="View Document"
    actions={
      <ActionPanel>
        <Action.ToggleQuickLook file="~/Documents/report.pdf" />
      </ActionPanel>
    }
  />
</List>
```

### Response
N/A

#### Success Response (200)
N/A

#### Response Example
N/A
```

--------------------------------

### Install PostHog Analytics Script

Source: https://developers.raycast.com/api-reference/feedback/alert

This snippet shows the installation of the PostHog analytics script for tracking user behavior on the site. It includes the script source URL and async loading configuration.

```javascript
self.__next_f.push([1,"32:[[\"$\",\"$L40\",null,{}]],[[\"$\",\"script\",\"https://integrations.gitbook.com/v1/integrations/posthog/installations/45bb70c02653ecb28893e6b4df7d4c1bd658fb04d678be3ae62f3577b43d012a/sites/site_wqFKp/script.js?version=157.0\",{\"async\":true,\"src\":\"https://integrations.gitbook.com/v1/integrations/posthog/installations/45bb70c02653ecb28893e6b4df7d4c1bd658fb04d678be3ae62f3577b43d012a/sites/site_wqFKp/script.js?version=157.0\"}]]])
```

--------------------------------

### Fetch Users with Cursor Pagination (TypeScript)

Source: https://developers.raycast.com/utilities/react-hooks/usepromise

An example of using `usePromise` for fetching users with cursor-based pagination. It demonstrates how to handle the `nextCursor` for subsequent requests and update the `cursor` state.

```typescript
const { isLoading, data, pagination } = usePromise(
  (searchText: string) =>
    async ({ page, lastItem, cursor }) => {
      const { data, nextCursor } = await getUsers(cursor); // or any other asynchronous logic you need to perform
      const hasMore = nextCursor !== undefined;
      return { data, hasMore, cursor: nextCursor };
    },
  [searchText],
);
```

--------------------------------

### Install React Developer Tools Locally

Source: https://context7_llms

Installs the React Developer Tools package as a development dependency for an extension. This allows for debugging React components within the Raycast environment.

```typescript
npm install --save-dev react-devtools@6.1.1
```

--------------------------------

### Display Data in a List with Fetch and Sorting (TypeScript)

Source: https://context7_llms

This example demonstrates how to fetch data from an API, sort it using frecency, and display it in a Raycast List. It utilizes `@raycast/utils` for `useFetch` and `useFrecencySorting`. The `useFetch` hook handles data retrieval, while `useFrecencySorting` allows for personalized sorting based on user interaction. Actions for opening in browser, copying to clipboard, and resetting ranking are included.

```tsx
import { List, ActionPanel, Action, Icon } from "@raycast/api";
import { useFetch, useFrecencySorting } from "@raycast/utils";

export default function Command() {
  const { isLoading, data } = useFetch("https://api.example");
  const { data: sortedData, visitItem, resetRanking } = useFrecencySorting(data);

  return (
    <List isLoading={isLoading}>
      {sortedData.map((item) => (
        <List.Item
          key={item.id}
          title={item.title}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={item.url} onOpen={() => visitItem(item)} />
              <Action.CopyToClipboard title="Copy Link" content={item.url} onCopy={() => visitItem(item)} />
              <Action title="Reset Ranking" icon={Icon.ArrowCounterClockwise} onAction={() => resetRanking(item)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
```

--------------------------------

### CSS Color Variables for Dark Theme

Source: https://developers.raycast.com/utilities

Defines CSS custom properties for color palettes in the dark theme. These variables are crucial for ensuring readability and accessibility in low-light conditions. They include primary, tint, neutral, info, warning, and danger colors with their respective contrast values.

```css
.dark, :root:not(.dark) [data-color-scheme^="dark"] { --primary-1: 29 29 29; --contrast-primary-1: 255 255 255; --primary-2: 39 33 32; --contrast-primary-2: 255 255 255; --primary-3: 53 40 39; --contrast-primary-3: 255 255 255; --primary-4: 61 42 41; --contrast-primary-4: 255 255 255; --primary-5: 71 46 44; --contrast-primary-5: 255 255 255; --primary-6: 80 47 46; --contrast-primary-6: 255 255 255; --primary-7: 95 55 53; --contrast-primary-7: 255 255 255; --primary-8: 110 63 60; --contrast-primary-8: 255 255 255; --primary-9: 255 99 99; --contrast-primary-9: 255 255 255; --primary-10: 238 83 85; --contrast-primary-10: 255 255 255; --primary-11: 238 173 169; --contrast-primary-11: 29 29 29; --primary-12: 255 251 249; --contrast-primary-12: 29 29 29; --primary-original: 255 99 99; --contrast-primary-original: 255 255 255; --tint-1: 29 29 29; --contrast-tint-1: 255 255 255; --tint-2: 35 34 34; --contrast-tint-2: 255 255 255; --tint-3: 45 43 43; --contrast-tint-3: 255 255 255; --tint-4: 49 47 47; --contrast-tint-4: 255 255 255; --tint-5: 55 53 53; --contrast-tint-5: 255 255 255; --tint-6: 60 57 56; --contrast-tint-6: 255 255 255; --tint-7: 71 66 66; --contrast-tint-7: 255 255 255; --tint-8: 81 77 76; --contrast-tint-8: 255 255 255; --tint-9: 144 129 127; --contrast-tint-9: 255 255 255; --tint-10: 156 140 139; --contrast-tint-10: 255 255 255; --tint-11: 197 190 190; --contrast-tint-11: 29 29 29; --tint-12: 255 255 254; --contrast-tint-12: 29 29 29; --tint-original: 120 120 120; --contrast-tint-original: 255 255 255; --neutral-1: 29 29 29; --contrast-neutral-1: 255 255 255; --neutral-2: 34 34 34; --contrast-neutral-2: 255 255 255; --neutral-3: 44 44 44; --contrast-neutral-3: 255 255 255; --neutral-4: 48 48 48; --contrast-neutral-4: 255 255 255; --neutral-5: 53 53 53; --contrast-neutral-5: 255 255 255; --neutral-6: 57 57 57; --contrast-neutral-6: 255 255 255; --neutral-7: 67 67 67; --contrast-neutral-7: 255 255 255; --neutral-8: 78 78 78; --contrast-neutral-8: 255 255 255; --neutral-9: 120 120 120; --contrast-neutral-9: 255 255 255; --neutral-10: 144 144 144; --contrast-neutral-10: 255 255 255; --neutral-11: 192 192 192; --contrast-neutral-11: 29 29 29; --neutral-12: 255 255 255; --contrast-neutral-12: 29 29 29; --neutral-original: 120 120 120; --contrast-neutral-original: 255 255 255; --header-background: 255 99 99; --header-link: 255 255 255; --info-1: 29 29 29; --contrast-info-1: 255 255 255; --info-2: 34 34 34; --contrast-info-2: 255 255 255; --info-3: 44 44 44; --contrast-info-3: 255 255 255; --info-4: 48 48 48; --contrast-info-4: 255 255 255; --info-5: 53 53 53; --contrast-info-5: 255 255 255; --info-6: 57 57 57; --contrast-info-6: 255 255 255; --info-7: 67 67 67; --contrast-info-7: 255 255 255; --info-8: 78 78 78; --contrast-info-8: 255 255 255; --info-9: 120 120 120; --contrast-info-9: 255 255 255; --info-10: 144 144 144; --contrast-info-10: 255 255 255; --info-11: 192 192 192; --contrast-info-11: 29 29 29; --info-12: 255 255 255; --contrast-info-12: 29 29 29; --info-original: 120 120 120; --contrast-info-original: 255 255 255; --warning-1: 29 29 29; --contrast-warning-1: 255 255 255; --warning-2: 38 34 30; --contrast-warning-2: 255 255 255; --warning-3: 50 42 35; --contrast-warning-3: 255 255 255; --warning-4: 57 45 34; --contrast-warning-4: 255 255 255; --warning-5: 66 50 34; --contrast-warning-5: 255 255 255; --warning-6: 73 53 33; --contrast-warning-6: 255 255 255; --warning-7: 87 62 37; --contrast-warning-7: 255 255 255; --warning-8: 101 71 41; --contrast-warning-8: 255 255 255; --warning-9: 254 154 0; --contrast-warning-9: 29 29 29; --warning-10: 213 116 0; --contrast-warning-10: 255 255 255; --warning-11: 224 184 145; --contrast-warning-11: 29 29 29; --warning-12: 255 253 243; --contrast-warning-12: 29 29 29; --warning-original: 254 154 0; --contrast-warning-original: 29 29 29; --danger-1: 29 29 29; --contrast-danger-1: 255 255 255; --danger-2: 40 32 32; --contrast-danger-2: 255 255 255; --danger-3: 55 39 38; --contrast-danger-3: 255 255 255; --danger-4: 64 41 38; --contrast-danger-4: 255 255 255; --danger-5: 75 44 41; --contrast-danger-5: 255 255 255; --danger-6: 84 45 41; --contrast-danger-6: 255 255 255; --danger-7: 100 51 48; --contrast-danger-7: 255 255 255; --danger-8: 115 58 54; --contrast-danger-8: 255 255 255; --danger-9: 255 51 36; --contrast-danger-9: 255 255 255; --danger-10: 238 23 0; --contrast-danger-10: 255 255 255; --danger-11: 255 147 140; --contrast-danger-11: 29 29 29; --danger-12: 255 247 246; --contrast-danger-12: 29 29 29; --danger-original: 255 51 36; --contrast-danger-original: 255 255 255; }
```

--------------------------------

### Fetch and Process Homebrew Package Info (TypeScript)

Source: https://developers.raycast.com/utilities/react-hooks/useexec

This TypeScript code snippet demonstrates how to fetch installed Homebrew package information using the `useExec` hook from '@raycast/utils'. It determines the correct 'brew' executable path based on the CPU architecture and parses the JSON output to extract formula details. The results are memoized for performance.

```tsx
import { List } from "@raycast/api";
import { useExec } from "@raycast/utils";
import { cpus } from "os";
import { useMemo } from "react";

const brewPath = cpus()[0].model.includes("Apple") ? "/opt/homebrew/bin/brew" : "/usr/local/bin/brew";

export default function Command() {
 const { isLoading, data } = useExec(brewPath, ["info", "--json=v2", "--installed"]);

 const results = useMemo<Array<{ id: string; name: string }>>(() => JSON.parse(data || "{}").formulae || [], [data]);

 return (
  <List isLoading={isLoading}>
   {results.map((item) => (
    // ... rest of the List.Item rendering
   ))}
  </List>
 );
}
```

--------------------------------

### IntraExtensionLaunchOptions

Source: https://context7_llms

Options for launching a command from within the same extension.

```APIDOC
## IntraExtensionLaunchOptions

### Description
The options that can be used when launching a command from the same extension.

### Method
N/A (This is a parameter object, not an endpoint)

### Endpoint
N/A

### Parameters
#### Request Body
- **name** (string) - Required - Command name as defined in the extension's manifest
- **type** (LaunchType) - Required - LaunchType.UserInitiated or LaunchType.Background
- **arguments** (Arguments or null) - Optional - Optional object for the argument properties and values as defined in the extension's manifest, for example: `{ "argument1": "value1" }`
- **context** (LaunchContext or null) - Optional - Arbitrary object for custom data that should be passed to the command and accessible as LaunchProps; the object must be JSON serializable (Dates and Buffers supported)
- **fallbackText** (string or null) - Optional - Optional string to send as fallback text to the command

### Request Example
```json
{
  "name": "myCommand",
  "type": "LaunchType.UserInitiated",
  "arguments": {
    "searchQuery": "example"
  },
  "context": {
    "source": "user"
  },
  "fallbackText": "Searching for example..."
}
```

### Response
#### Success Response (200)
N/A (This describes parameters for launching, not a response to a request)

#### Response Example
N/A
```

--------------------------------

### Access Raycast Environment Information (TypeScript)

Source: https://developers.raycast.com/api-reference/environment

This example demonstrates how to import and use the environment API to retrieve various details about the Raycast application, the current extension, and the running command. It logs information such as Raycast version, extension name, command name, and development mode status.

```typescript
import { environment } from "@raycast/api";

export default async function Command() {
  console.log(`Raycast version: ${environment.raycastVersion}`);
  console.log(`Owner or Author name: ${environment.ownerOrAuthorName}`);
  console.log(`Extension name: ${environment.extensionName}`);
  console.log(`Command name: ${environment.commandName}`);
  console.log(`Command mode: ${environment.commandMode}`);
  console.log(`Assets path: ${environment.assetsPath}`);
  console.log(`Support path: ${environment.supportPath}`);
  console.log(`Is development mode: ${environment.isDevelopment}`);
  console.log(`Appearance: ${environment.appearance}`);
  console.log(`Text size: ${environment.textSize}`);
  console.log(`LaunchType: ${environment.launchType}`);
}
```

--------------------------------

### Implementing Dynamic Colors in Raycast (TypeScript)

Source: https://context7_llms

Shows how to define dynamic colors that change based on the Raycast theme (light or dark). Includes examples with and without contrast adjustment.

```typescript
import { Icon, List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item
        title="Dynamic Tint Color"
        icon={{
          source: Icon.Circle,
          tintColor: {
            light: "#FF01FF",
            dark: "#FFFF50",
            adjustContrast: false,
          },
        }}
      />
      <List.Item
        title="Dynamic Tint Color"
        icon={{
          source: Icon.Circle,
          tintColor: { light: "#FF01FF", dark: "#FFFF50" },
        }}
      />
    </List>
  );
}
```

--------------------------------

### WindowManagement.getDesktops

Source: https://context7_llms

Fetches a list of all available desktops across all connected screens. This is useful for understanding the multi-screen setup or managing windows across different virtual desktops.

```APIDOC
## GET /WindowManagement/getDesktops

### Description
Gets the list of Desktops available across all screens.

### Method
GET

### Endpoint
/WindowManagement/getDesktops

### Parameters
None

### Request Example
```typescript
import { WindowManagement, showToast } from "@raycast/api";

async function getDesktopInfo() {
  const desktops = await WindowManagement.getDesktops();
  const screens = new Set(desktops.map((desktop) => desktop.screenId));
  showToast({ title: `Found ${desktops.length} desktops on ${screens.size} screens.` });
}
```

### Response
#### Success Response (200)
- **desktops** (Desktop[]) - An array of Desktop objects.

#### Response Example
```json
[
  {
    "id": "desktop-id-1",
    "screenId": "screen-id-1"
  },
  {
    "id": "desktop-id-2",
    "screenId": "screen-id-1"
  }
]
```
```

--------------------------------

### Raycast Extension UI Text Formatting Example

Source: https://developers.raycast.com/api-reference/user-interface/grid

This snippet shows how text content is structured within a Raycast extension's UI, specifically for displaying informational messages. It includes examples of inline code formatting and descriptive text.

```jsx
self.__next_f.push([1,"c8:[[\"$\",\"p\",\"45c06108a56d48a68eca6a1119eaf5ad\",{\"className\":\"has-[.button,input]:flex has-[.button,input]:flex-wrap has-[.button,input]:gap-2 has-[.button,input]:items-center page-width-wide:mx-0 w-full decoration-primary/6 max-w-3xl print:break-inside-avoid min-h-lh [h2]:pt-0 [h3]:pt-0 [h4]:pt-0 mx-0 text-start self-start justify-start\",\"children\":[[\"$\",\"$1\",\"8915b57d87e0451db3ca0a702898e4cb\",{\"children\":[[\"$\",\"$1\",\"0\",{\"children\":\"updating your imports from \"}],[\"$\",\"$1\",\"1\",{\"children\":[\"$\",\"code\",\"mark\",{\"className\":\"py-px px-1.5 min-w-6.5 justify-center items-center ring-1 ring-inset ring-tint bg-tint rounded-sm text-[.875em] leading-[calc(max(1.20em,1.25rem))]\",\"children\":\"import { List } from '@raycast/api'\"}]],[\"$\",\"$1\",\"2\",{\"children\":\" to \"}],[\"$\",\"$1\",\"3\",{\"children\":[\"$\",\"code\",\"mark\",{\"className\":\"py-px px-1.5 min-w-6.5 justify-center items-center ring-1 ring-inset ring-tint bg-tint rounded-sm text-[.875em] leading-[calc(max(1.20em,1.25rem))]\",\"children\":\"import { Grid } from '@raycast/api'\"}]],[\"$\",\"$1\",\"4\",{\"children\":\";\"}]]}]]}\n"])

```

--------------------------------

### Use Navigation Hook Example (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/navigation

Demonstrates how to use the useNavigation hook to push and pop view components within the Raycast navigation stack. It utilizes the push and pop functions to navigate between Ping and Pong Detail views.

```typescript
import { Action, ActionPanel, Detail, useNavigation } from "@raycast/api";

function Ping() {
  const { push } = useNavigation();

  return (
    <Detail
      markdown="Ping"
      actions={
        <ActionPanel>
          <Action title="Push" onAction={() => push(<Pong />)} />
        </ActionPanel>
      }
    />
  );
}

function Pong() {
  const { pop } = useNavigation();

  return (
    <Detail
      markdown="Pong"
      actions={
        <ActionPanel>
          <Action title="Pop" onAction={pop} />
        </ActionPanel>
      }
    />
  );
}

export default function Command() {
  return <Ping />;
}
```

--------------------------------

### Raycast CLI: Start Extension in Development Mode

Source: https://context7_llms

Initiates your Raycast extension in development mode, offering features like immediate access, automatic reloading on save, detailed error overlays, and log message visibility. This mode significantly speeds up the development and debugging process.

```bash
npx ray develop
```

--------------------------------

### Using Image.Asset in TypeScript

Source: https://context7_llms

Illustrates how to reference local image assets from the 'assets/' folder using their filename. Includes an example within a List item.

```typescript
Image.Asset: string representing an asset from the `assets/` folder

// Example Usage:
import { List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item title="Asset" icon={{ source: "avatar.png" }} />
    </List>
  );
}
```

--------------------------------

### OAuth PKCE Client Initialization

Source: https://developers.raycast.com/api-reference/oauth

Initialize the PKCEClient with provider details and redirect method.

```APIDOC
## POST /api/users

### Description
Initializes the OAuth PKCE client for a specific provider.

### Method
POST

### Endpoint
N/A (Client-side initialization)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **redirectMethod** (OAuth.RedirectMethod) - Required - The method used for redirection.
- **providerName** (string) - Required - The name of the OAuth provider.
- **providerIcon** (string) - Required - The icon for the provider.
- **description** (string) - Optional - A description for the OAuth connection.

### Request Example
```json
{
  "redirectMethod": "Web",
  "providerName": "Twitter",
  "providerIcon": "twitter-logo.png",
  "description": "Connect your Twitter account…"
}
```

### Response
#### Success Response (200)
- **client** (OAuth.PKCEClient) - The initialized PKCE client instance.

#### Response Example
```json
{
  "client": "<PKCEClient Instance>"
}
```
```

--------------------------------

### Uncontrolled Form Example

Source: https://context7_llms

Example of an uncontrolled form using Raycast's Form component, where form state is managed internally.

```APIDOC
## Uncontrolled Form Example

### Description
This example demonstrates an uncontrolled form where the `Form.TextField`, `Form.TextArea`, and `Form.DatePicker` components manage their own state. The `onSubmit` handler receives all form values at once.

### Code

```typescript
import { Form, ActionPanel, Action, popToRoot, LaunchProps } from "@raycast/api";

interface TodoValues {
  title: string;
  description?: string;
  dueDate?: Date;
}

export default function Command(props: LaunchProps<{ draftValues: TodoValues }>)
{
  const { draftValues } = props;

  return (
    <Form
      enableDrafts
      actions={
        <ActionPanel>
          <Action.SubmitForm
            onSubmit={(values: TodoValues) => {
              console.log("onSubmit", values);
              popToRoot();
            }}
          />
        </ActionPanel>
      }
    >
      <Form.TextField id="title" title="Title" defaultValue={draftValues?.title} />
      <Form.TextArea id="description" title="Description" defaultValue={draftValues?.description} />
      <Form.DatePicker id="dueDate" title="Due Date" defaultValue={draftValues?.dueDate} />
    </Form>
  );
}
```
```

--------------------------------

### Create Tag with Tooltip in JavaScript

Source: https://developers.raycast.com/api-reference/user-interface/list

Provides an example of creating a tag with a value, color, and a tooltip. Tooltips offer additional information on hover.

```javascript
{
  tag: {
    value: "User",
    color: Color.Magenta
  },
  tooltip: "Tag with tooltip"
}
```

--------------------------------

### LaunchProps - Accessing Launch Arguments

Source: https://context7_llms

Demonstrates how to access various launch properties passed to the command's default function.

```APIDOC
## POST /launch/command

### Description
This endpoint illustrates how a command can receive and utilize different arguments based on how it was launched, such as fallback text or draft values.

### Method
POST

### Endpoint
/launch/command

### Parameters
#### Request Body
- **props** (object) - Contains properties like `arguments`, `launchType`, `draftValues`, `fallbackText`, and `launchContext`.
  - **arguments** (Arguments) - Use these values to populate the initial state for your command.
  - **launchType** (LaunchType) - The type of launch for the command (user initiated or background).
  - **draftValues** (Form.Values) - Contains user inputs saved as a draft when launching via a draft.
  - **fallbackText** (string) - The text of the root search when the command is launched as a fallback command.
  - **launchContext** (LaunchContext) - The value passed to `context` when the command is launched programmatically via `launchCommand`.

### Request Example
```json
{
  "props": {
    "arguments": {},
    "launchType": "userInitiated",
    "fallbackText": "Search Query",
    "launchContext": {
      "commandId": "another-command"
    }
  }
}
```

### Response
#### Success Response (200)
- **message** (string) - A confirmation message indicating the command was processed.

#### Response Example
```json
{
  "message": "Command processed successfully with provided props."
}
```
```

--------------------------------

### Slack OAuth Configuration

Source: https://developers.raycast.com/utilities/oauth/oauthservice

Information regarding Slack OAuth configuration. Specific setup details are not provided in this section.

```APIDOC
## Slack OAuth Configuration

### Description
Details on configuring Slack OAuth. Please refer to the general provider options for required parameters.

### Method
N/A (Configuration Guide)

### Endpoint
N/A

### Parameters
N/A

### Request Example
N/A

### Response
N/A
```

--------------------------------

### Controlled Form Example

Source: https://context7_llms

Example of a controlled form using Raycast's Form component, where form state is managed using React's useState hook.

```APIDOC
## Controlled Form Example

### Description
This example demonstrates a controlled form where the state for `title`, `description`, and `dueDate` is managed using React's `useState` hook. Each form input component has an `onChange` handler to update its corresponding state.

### Code

```typescript
import { Form, ActionPanel, Action, popToRoot, LaunchProps } from "@raycast/api";
import { useState } from "react";

interface TodoValues {
  title: string;
  description?: string;
  dueDate?: Date;
}

export default function Command(props: LaunchProps<{ draftValues: TodoValues }>)
{
  const { draftValues } = props;

  const [title, setTitle] = useState<string>(draftValues?.title || "");
  const [description, setDescription] = useState<string>(draftValues?.description || "");
  const [dueDate, setDueDate] = useState<Date | null>(draftValues?.dueDate || null);

  return (
    <Form
      enableDrafts
      actions={
        <ActionPanel>
          <Action.SubmitForm
            onSubmit={(values: TodoValues) => {
              console.log("onSubmit", values);
              popToRoot();
            }}
          />
        </ActionPanel>
      }
    >
      <Form.TextField id="title" title="Title" value={title} onChange={setTitle} />
      <Form.TextArea id="description" title="Description" value={description} onChange={setDescription} />
      <Form.DatePicker id="dueDate" title="Due Date" value={dueDate} onChange={setDueDate} />
    </Form>
  );
}
```
```

--------------------------------

### Token Management (Set, Get, Remove)

Source: https://context7_llms

Details methods for storing, retrieving, and removing token sets using the PKCE client, and checking login status.

```APIDOC
## Token Management API

### Description
Provides methods for managing OAuth token sets, including storing, retrieving, and checking for the existence of tokens.

### Methods

#### 1. Set Tokens
##### POST /oauth/pkce/client/setTokens

##### Description
Stores the provided token response as the current token set for the client.

##### Parameters
- **client** (OAuth.PKCEClient) - Required - The initialized PKCE client.
- **tokenResponse** (OAuth.TokenResponse) - Required - The token response object to store.

##### Request Example
```json
{
  "client": "[PKCEClient Instance]",
  "tokenResponse": {
    "access_token": "...",
    "refresh_token": "...",
    "expires_in": 3600,
    "token_type": "Bearer",
    "scope": "..."
  }
}
```

#### 2. Get Tokens
##### GET /oauth/pkce/client/getTokens

##### Description
Retrieves the currently stored token set.

##### Parameters
- **client** (OAuth.PKCEClient) - Required - The initialized PKCE client.

##### Request Example
```json
{
  "client": "[PKCEClient Instance]"
}
```

##### Response (Success)
- **tokenSet** (OAuth.TokenSet | null) - The stored token set, or null if no tokens are stored.

##### Response Example
```json
{
  "tokenSet": {
    "access_token": "...",
    "refresh_token": "...",
    "expires_at": "...",
    "scope": "..."
  }
}
```

#### 3. Remove Tokens (Logout)
##### DELETE /oauth/pkce/client/removeTokens

##### Description
Removes the currently stored token set, effectively logging the user out.

##### Parameters
- **client** (OAuth.PKCEClient) - Required - The initialized PKCE client.

##### Request Example
```json
{
  "client": "[PKCEClient Instance]"
}
```
```

--------------------------------

### TypeScript: Raycast List Component Example

Source: https://developers.raycast.com/utilities/icons/getfavicon

This TypeScript code demonstrates how to use the `List` component from the `@raycast/api` library. It imports the `List` component and the `getFavicon` utility function. The example shows a basic `List` with a single `List.Item` that displays the Raycast website's favicon and title.

```typescript
import { List } from "@raycast/api";
import { getFavicon } from "@raycast/utils";

export default function Command() {
  return (
    <List>
      <List.Item icon={getFavicon("https://raycast.com")} title="Raycast Website" />
    </List>
  );
}
```

--------------------------------

### Clone and Prepare Extension from Pull Request (Shell)

Source: https://context7_llms

This script allows developers to clone a specific branch of a forked Raycast extension repository, set up sparse checkout for a particular extension, and install its dependencies. It's useful for reviewing pull requests locally. Requires Git and Node.js.

```shell
BRANCH="ext/soundboard"
FORK_URL="https://github.com/pernielsentikaer/raycast-extensions.git"
EXTENSION_NAME="soundboard"

git clone -n --depth=1 --filter=tree:0 -b ${BRANCH} ${FORK_URL}
cd raycast-extensions
git sparse-checkout set --no-cone "extensions/${EXTENSION_NAME}"
git checkout
cd "extensions/${EXTENSION_NAME}"
npm install && npm run dev
```

--------------------------------

### Configure PostHog Analytics Script

Source: https://developers.raycast.com/utilities/react-hooks/uselocalstorage

This script configures PostHog analytics for the site. It dynamically loads the PostHog installation script from a CDN. Ensure the installation URL is correct for your PostHog project.

```javascript
self.__next_f.push([1,"32:[[\"$\",\"$L40\",null,{}],[[\"$\",\"script\",\"https://integrations.gitbook.com/v1/integrations/posthog/installations/45bb70c02653ecb28893e6b4df7d4c1bd658fb04d678be3ae62f3577b43d012a/sites/site_wqFKp/script.js?version=157.0\",{\"async\":true,\"src\":\"https://integrations.gitbook.com/v1/integrations/posthog/installations/45bb70c02653ecb28893e6b4df7d4c1bd658fb04d678be3ae62f3577b43d012a/sites/site_wqFKp/script.js?version=157.0\"}]])\n33:[\"$\",\"$19\",null,{\"fallback\":null,\"children\":[\"$\",\"$L41\",null,{\"privacyPolicy\":\"https://www.raycast.com/privacy\"}]]\n
```

--------------------------------

### Use Exec Hook Example

Source: https://developers.raycast.com/utilities/react-hooks/useform

Demonstrates the usage of the 'useExec' hook, likely for executing commands or processes within the Raycast environment. This hook is part of the core utilities for interacting with the system.

```javascript
function useExec() {
  // Implementation details for executing commands
}
```

--------------------------------

### JavaScript Navigation Hook Example

Source: https://developers.raycast.com/api-reference/user-interface/navigation

Demonstrates the usage of the `useNavigation` hook in JavaScript, likely for managing navigation within a React application. It shows how to return navigation-related values or functions.

```javascript
self.__next_f.push([
  1,
  "a0:[\"$\",\"span\",\"10\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-11)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-11))\"},\"children\":\"=\"}],[\"$\",\"span\",\"11\",{\"style\":{\"color\":\"light-dark(rgb(var(--primary-10)), rgb(var(--primary-11)))\",\"--shiki-light\":\"rgb(var(--primary-10))\",\"--shiki-dark\":\"rgb(var(--primary-11))\"},\"children\":\"useNavigation\"}], [\"$\",\"span\",\"12\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\"()\"}]
])
```

--------------------------------

### Example Usage of withCache

Source: https://context7_llms

Illustrates how to use the `withCache` higher-order function to cache the results of `fetchExpensiveData`. The cache is configured to expire after 5 minutes.

```tsx
import { withCache } from "@raycast/utils";

function fetchExpensiveData(query) {
  // ...
}

const cachedFunction = withCache(fetchExpensiveData, {
  maxAge: 5 * 60 * 1000, // Cache for 5 minutes
});

const result = await cachedFunction(query);
```

--------------------------------

### Execute Command with User Input and Caching

Source: https://context7_llms

Demonstrates executing a shell command based on user input and leveraging caching. It handles potential flickering by managing initial and fetched data states. Dependencies include React's useState and Raycast's Detail, ActionPanel, Action, and useFetch.

```tsx
import { useState } from "react";
import { Detail, ActionPanel, Action } from "@raycast/api";
import { useFetch } from "@raycast/utils";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const { isLoading, data } = useExec("brew", ["info", searchText]);

  return <Detail isLoading={isLoading} markdown={data} />;
}
```

--------------------------------

### Form.Dropdown.Item Example in TypeScript

Source: https://context7_llms

Demonstrates how to use Form.Dropdown.Item within a Raycast Form component. This example shows the basic structure for creating a dropdown with a single item, including necessary imports and the onSubmit handler for the form.

```typescript
import { Action, ActionPanel, Form, Icon } from "@raycast/api";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Icon" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="icon" title="Icon">
        <Form.Dropdown.Item value="circle" title="Cirlce" icon={Icon.Circle} />
      </Form.Dropdown>
    </Form>
  );
}
```

--------------------------------

### Grid Items with Actions in Raycast

Source: https://context7_llms

Shows how to attach actions to Grid.Item elements in Raycast. This example includes an Action.CopyToClipboard action for an item.

```typescript
import { ActionPanel, Action, Grid } from "@raycast/api";

export default function Command() {
  return (
    <Grid>
      <Grid.Item
        content="https://placekitten.com/400/400"
        title="Item 1"
        actions={
          <ActionPanel>
            <Action.CopyToClipboard content="👋" />
          </ActionPanel>
        }
      />
    </Grid>
  );
}
```
```

--------------------------------

### Install @raycast/eslint-config for New ESLint Configuration

Source: https://developers.raycast.com/llms-full.txt/1

Provides instructions for installing the `@raycast/eslint-config` package as a development dependency. This is part of the update to a new ESLint configuration for Raycast extensions, simplifying the `.eslintrc.json` file.

```sh
npm install @raycast/eslint-config --save-dev
```

--------------------------------

### Configure AI Instructions in package.json

Source: https://context7_llms

Defines general instructions for the AI that apply to the entire extension. These instructions should be specific to the extension's capabilities and avoid conflicting with other AI extensions. They are configured under the `ai.instructions` key in the `package.json` file.

```json
{
  "ai": {
    "instructions": "When you don't know the user's first name, ask for it."
  }
}
```

--------------------------------

### AI Ask with User Feedback (TypeScript)

Source: https://context7_llms

Provides an example of how to give users feedback during long-running AI operations. It uses `showHUD` to indicate that generation is in progress and again upon completion, improving the user experience.

```typescript
import { AI, getSelectedFinderItems, showHUD } from "@raycast/api";
import fs from "fs";

export default async function main() {
  let allData = "";
  const [file] = await getSelectedFinderItems();

  // If you're doing something that happens in the background
  // Consider showing a HUD or a Toast as the first step
  // To give users feedback about what's happening
  await showHUD("Generating answer...");

  const answer = await AI.ask("Suggest 5 jazz songs");

  await fs.promises.writeFile(`${file.path}`, allData.trim(), "utf-8");

  // Then, when everythig is done, notify the user again
  await showHUD("Done!");
}
```

--------------------------------

### Render LaTeX with Detail Component

Source: https://developers.raycast.com/api-reference/user-interface/detail

This example demonstrates rendering LaTeX mathematical expressions within the Detail component. It supports inline and display math using specified delimiters.

```javascript
import { Detail } from '@raycast/api';

export default function Command() {
  return (
    <Detail markdown="Inline math: \( E = mc^2 \)\n\nDisplay math: \[
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
\]"/>
  );
}
```

--------------------------------

### Navigation Links for Migration Guide

Source: https://developers.raycast.com/migration/v1.28.0

Provides navigation links to previous and next sections of the migration guide. These links are typically used in documentation websites to allow users to move sequentially through related content.

```javascript
{
  href: "/misc/migration",
  children: [
    {
      children: "Previous"
    },
    {
      children: "Migration"
    }
  ]
}
{
  href: "/misc/migration/v1.31.0",
  children: [
    {
      children: "Next"
    },
    {
      children: "v1.31.0"
    }
  ]
}
```

--------------------------------

### GitBook Site Layout and AI Context Provider Configuration

Source: https://developers.raycast.com/examples/doppler

This snippet details the client-side configuration for GitBook's site layout and AI context provider. It includes references to JavaScript chunks necessary for rendering the site and initializing the AI context, which is crucial for the AI assistant's functionality.

```javascript
self.__next_f.push([
  1,
  "22:I[15242,[\"6268\",\"static/chunks/f5718501-b58a5cfb1abadce5.js\",\"6500\",\"static/chunks/6500-df22b4917e9f7eea.js\",\"4945\",\"static/chunks/4945-430fa5cc2f8244f6.js\",\"9014\",\"static/chunks/9014-2de2a842f1453568.js\",\"4078\",\"static/chunks/4078-240c6ceed53849bd.js\",\"3\",\"static/chunks/3-706fe07d48eb98ff.js\",\"559\",\"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/layout-38e0735c1c8235e3.js\"],\"SiteLayoutClientContexts\"
]
23:I[97306,[\"6268\",\"static/chunks/f5718501-b58a5cfb1abadce5.js\",\"6500\",\"static/chunks/6500-df22b4917e9f7eea.js\",\"4945\",\"static/chunks/4945-430fa5cc2f8244f6.js\",\"9014\",\"static/chunks/9014-2de2a842f1453568.js\",\"4078\",\"static/chunks/4078-240c6ceed53849bd.js\",\"3\",\"static/chunks/3-706fe07d48eb98ff.js\",\"559\",\"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/layout-38e0735c1c8235e3.js\"],\"AIContextProvider\"
]
24:I[4788,[\"6268\",\"static/chunks/f5718501-b58a5cfb1abadce5.js\",\"6500\",\"static/chunks/6500-df22b4917e9f7eea.js\",\"4945\",\"static/chunks/4945-430fa5cc2f8244f6.js\",\"9014\",\"static/chunks/9014-2de2a842f1453568.js\",\"4078\",\"static/chunks/4078-240c6ceed53849bd.js\",\"3\",\"static/chunks/3-706fe07d48eb98ff.js\",\"559\",\"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/layout-38e0735c1c8235e3.js\"
]
```

--------------------------------

### TypeScript: Code Example for Paths

Source: https://developers.raycast.com/api-reference/user-interface/actions

This TypeScript code snippet demonstrates a function signature that accepts file paths. It's likely used for operations involving file system interactions.

```typescript
(paths: "fs".PathLike | "fs".PathLike[]) => void
```

--------------------------------

### Configure Raycast Command with Title and Shortcut

Source: https://developers.raycast.com/api-reference/keyboard

This example shows how to configure a Raycast command, including setting a `title` and a keyboard `shortcut`. The `shortcut` property allows defining key combinations for quick access to the command. This is useful for improving user workflow.

```typescript
<Action title="Right" shortcut={{ modifiers: "cmd", key: "k" }} />
```

--------------------------------

### Open Raycast Homepage and Store in Menu Bar

Source: https://developers.raycast.com/api-reference/menu-bar-commands

This example shows how to create a menu bar item that opens the Raycast homepage and an alternate item to open the Raycast Store. It utilizes the `open` function from `@raycast/api`.

```typescript
import { MenuBarExtra, open } from "@raycast/api";

export default function Command() {
  return (
    <MenuBarExtra icon="raycast.png">
      <MenuBarExtra.Item
        title="Open Raycast Homepage"
        onAction={() => open("https://raycast.com")}
        alternate={
          <MenuBarExtra.Item
            icon="raycast.png"
            title="Open Raycast Store"
            onAction={() => open("https://raycast.com/store")}
          />
        }
      />
    </MenuBarExtra>
  );
}
```

--------------------------------

### TypeScript: Confirm Alert with Custom Message and Action

Source: https://developers.raycast.com/api-reference/feedback/alert

This TypeScript example shows how to use `confirmAlert` with more detailed options, including a custom message and a primary action. While a primary action can be defined, the example highlights that using the `if (await confirmAlert(...)) { ... }` pattern is generally more elegant for handling user confirmation.

```typescript
import { Alert, confirmAlert } from "@raycast/api";
    
    export default async function Command() {
      const options: Alert.Options = {
        title: "Finished cooking",
        message: "Delicious pasta for lunch",
        primaryAction: {
          title: "Do something",
          onAction: () => {
            // while you can register a handler for an action, it's more elegant
            // to use the `if (await confirmAlert(...)) { ... }` pattern
            console.log("The alert action has been triggered");
          },
        },
      };
      await confirmAlert(options);
    }
```

--------------------------------

### Initialize Site Layout and AI Context Providers

Source: https://developers.raycast.com/misc/migration

This snippet details the initialization of several context providers for the site layout and AI functionalities. It lists various JavaScript chunks and their corresponding identifiers, likely used for managing application state and features.

```javascript
self.__next_f.push([
  1,
  "22:I[15242, [\"6268\", \"static/chunks/f5718501-b58a5cfb1abadce5.js\", \"6500\", \"static/chunks/6500-df22b4917e9f7eea.js\", \"4945\", \"static/chunks/4945-430fa5cc2f8244f6.js\", \"9014\", \"static/chunks/9014-2de2a842f1453568.js\", \"4078\", \"static/chunks/4078-240c6ceed53849bd.js\", \"3\", \"static/chunks/3-706fe07d48eb98ff.js\", \"559\", \"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/layout-38e0735c1c8235e3.js\"]", \"SiteLayoutClientContexts\" ]\n23:I[97306, [\"6268\", \"static/chunks/f5718501-b58a5cfb1abadce5.js\", \"6500\", \"static/chunks/6500-df22b4917e9f7eea.js\", \"4945\", \"static/chunks/4945-430fa5cc2f8244f6.js\", \"9014\", \"static/chunks/9014-2de2a842f1453568.js\", \"4078\", \"static/chunks/4078-240c6ceed53849bd.js\", \"3\", \"static/chunks/3-706fe07d48eb98ff.js\", \"559\", \"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/layout-38e0735c1c8235e3.js\"]", \"AIContextProvider\" ]\n24:I[4788, [\"6268\", \"static/chunks/f5718501-b58a5cfb1abadce5.js\", \"6500\", \"static/chunks/6500-df22b4917e9f7eea.js\", \"4945\", \"static/chunks/4945-430fa5cc2f8244f6.js\", \"9014\", \"static/chunks/9014-2de2a842f1453568.js\", \"4078\", \"static/chunks/4078-240c6ceed53849bd.js\", \"3\", \"static/chunks/3-706fe07d48eb98ff.js\", \"559\", \"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/layout-38e0735c1c8235e3.js\"]", \"SpaceLayoutContextProvider\" ]\n25:I[86117, [\"6268\", \"static/chunks/f5718501-b58a5cfb1abadce5.js\", \"2122\", \"static/chunks/9071f66d-390fafe3303b2acb.js\", \"6500\", \"static/chunks/6500-df22b4917e9f7eea.js\", \"711\", \"static/chunks/711-f01ba055e2d09f63.js\", \"9014\", \"static/chunks/9014-2de2a842f1453568.js\", \"1026\", \"static/chunks/1026-7238b3f0a07452e6.js\", \"6782\", \"static/chunks/6782-c774ebb74dd85111.js\", \"9330\", \"static/chunks/9330-58d5f2baf27a33de.js\", \"8617\", \"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/%5BpagePath%5D/page-f5ef1efb17e610fe.js\"]", \"AdaptiveVisitorContextProvider\" ]\n26:I[81608, [\"6268\", \"static/chunks/f5718501-b58a5cfb1abadce5.js\", \"6500\", \"static/chunks/6500-df22b4917e9f7eea.js\", \"4945\", \"static/chunks/4945-430fa5cc2f8244f6.js\"..." ]
```

--------------------------------

### Raycast Toast Notification Examples

Source: https://developers.raycast.com/migration/v1.28.0

This code snippet demonstrates how to use the `showToast` function in Raycast for displaying notifications. It includes examples for creating a basic success toast and comments out deprecated methods for reference. The `showToast` function is the current recommended way to display user feedback.

```javascript
import { showToast, Toast } from "@raycast/api";

// deprecated new Toast()
const toast = await showToast({ title: "Toast title" }); // Success by default

// deprecated showToast(ToastStyle.Failure, 'Toast title')
```

--------------------------------

### Basic Text Output from LLM

Source: https://developers.raycast.com/api-reference/user-interface/list

This example demonstrates a simple text output from an LLM, likely representing a response or a generated piece of content. It's a fundamental output format for many LLM applications.

```text
text
```

--------------------------------

### List with Client-Side Filtering

Source: https://developers.raycast.com/api-reference/user-interface/list

This example demonstrates how to create a searchable list in Raycast where the filtering logic is handled on the client-side using React's useState and useEffect hooks.

```APIDOC
## List with Client-Side Filtering

### Description
This endpoint showcases a Raycast List component that filters items based on user input. The filtering is performed client-side using React hooks.

### Method
N/A (Client-side component)

### Endpoint
N/A (Client-side component)

### Parameters
N/A

### Request Example
```javascript
import { useEffect, useState } from "react";
import { Action, ActionPanel, List } from "@raycast/api";

const items = ["Augustiner Helles", "Camden Hells", "Leffe Blonde", "Sierra Nevada IPA"];

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [filteredList, filterList] = useState(items);

  useEffect(() => {
    filterList(items.filter((item) => item.includes(searchText)));
  }, [searchText]);

  return (
    <List
      filtering={false}
      onSearchTextChange={setSearchText}
      navigationTitle="Search Beers"
      searchBarPlaceholder="Search your favorite beer"
    >
      {filteredList.map((item) => (
        <List.Item
          key={item}
          title={item}
          actions={
            <ActionPanel>
              <Action title="Select" onAction={() => console.log(`${item} selected`)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
```

### Response
#### Success Response (200)
N/A (UI component rendering)

#### Response Example
N/A (UI component rendering)
```

--------------------------------

### Example of Command Activation State

Source: https://developers.raycast.com/api-reference/menu-bar-commands

This snippet illustrates the state after a command has been run once, indicating it is now active. This is a common pattern for commands that require an initial execution to become fully functional.

```json
{
  "children": [
    [
      "$",
      "$1",
      "7eddc8854e0648dcbf7a7999135d77df",
      {
        "children": [
          [
            "$",
            "$1",
            "0",
            {
              "children": "Running it once should activate it to:"
            }
          ]
        ]
      }
    ]
  ]
}
```

--------------------------------

### Code Snippet Example

Source: https://developers.raycast.com/api-reference/user-interface/actions

This snippet demonstrates a basic code structure, likely for defining a variable or a function. It includes a placeholder for content and is marked as 'code'.

```javascript
const content = "(content: string | number | \"}"

```

--------------------------------

### Uncontrolled Form.TextArea Example (TypeScript)

Source: https://context7_llms

Demonstrates how to use an uncontrolled Form.TextArea component in Raycast. This example sets a default value for the text area and logs the submitted form values to the console. It requires the '@raycast/api' package.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";

const DESCRIPTION =
  "We spend too much time staring at loading indicators. The Raycast team is dedicated to make everybody interact faster with their computers.";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Description" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.TextArea id="description" defaultValue={DESCRIPTION} />
    </Form>
  );
}
```

--------------------------------

### Basic Raycast Grid with Items

Source: https://developers.raycast.com/api-reference/user-interface/grid

Demonstrates the creation of a basic Raycast Grid component displaying a single item. This is a fundamental example for initializing a grid with content.

```typescript
import { Grid } from "@raycast/api";

export default function Command() {
  return (
    <Grid>
      <Grid.Item content="🥳" title="Partying Face" subtitle="Smiley" />
    </Grid>
  );
}
```

--------------------------------

### Example Usage of useForm Hook in a React Component

Source: https://context7_llms

Demonstrates how to use the useForm hook to create a sign-up form with various input fields and custom validation rules. It shows how to integrate the hook with Raycast's Form and Action components.

```tsx
import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";
import { useForm, FormValidation } from "@raycast/utils";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  birthday: Date | null;
  password: string;
  number: string;
  hobbies: string[];
}

export default function Command() {
  const { handleSubmit, itemProps } = useForm<SignUpFormValues>({
    onSubmit(values) {
      showToast({
        style: Toast.Style.Success,
        title: "Yay!",
        message: `${values.firstName} ${values.lastName} account created`,
      });
    },
    validation: {
      firstName: FormValidation.Required,
      lastName: FormValidation.Required,
      password: (value) => {
        if (value && value.length < 8) {
          return "Password must be at least 8 symbols";
        } else if (!value) {
          return "The item is required";
        }
      },
      number: (value) => {
        if (value && value !== "2") {
          return "Please select '2'";
        }
      },
    },
  });
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField title="First Name" placeholder="Enter first name" {...itemProps.firstName} />
      <Form.TextField title="Last Name" placeholder="Enter last name" {...itemProps.lastName} />
      <Form.DatePicker title="Date of Birth" {...itemProps.birthday} />
      <Form.PasswordField
        title="Password"
        placeholder="Enter password at least 8 characters long"
        {...itemProps.password}
      />
      <Form.Dropdown title="Your Favorite Number" {...itemProps.number}>
        {[1, 2, 3, 4, 5, 6, 7].map((num) => {
          return <Form.Dropdown.Item value={String(num)} title={String(num)} key={num} />;
        })}
      </Form.Dropdown>
    </Form>
  );
}
```

--------------------------------

### Render Detail with Metadata

Source: https://developers.raycast.com/api-reference/user-interface/detail

This example illustrates how to use the Detail component with its metadata panel. The `metadata` prop accepts a `Detail.Metadata` component, which can display structured data alongside the main markdown content.

```javascript
import { Detail } from '@raycast/api';

export default function Command() {
  return (
    <Detail
      markdown="# Main Content\n\nThis is the primary content area."
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Version" text="1.0.0" />
          <Detail.Metadata.TagList title="Tags">
            <Detail.Metadata.Tag text="API" />
            <Detail.Metadata.Tag text="Example" />
          </Detail.Metadata.TagList>
        </Detail.Metadata>
      }
    />
  );
}
```

--------------------------------

### Initiating Authorization Request

Source: https://context7_llms

Shows how to create an authorization request using the PKCE client, specifying the authorization endpoint, client ID, and required scopes.

```APIDOC
## POST /oauth/pkce/client/authorizationRequest

### Description
Creates an authorization request object containing parameters needed for the OAuth authorization flow.

### Method
POST

### Endpoint
/oauth/pkce/client/authorizationRequest

### Parameters
#### Request Body
- **client** (OAuth.PKCEClient) - Required - The initialized PKCE client.
- **endpoint** (string) - Required - The OAuth authorization endpoint URL.
- **clientId** (string) - Required - The client ID obtained from the OAuth provider.
- **scope** (string) - Required - The requested scopes for the authorization.
- **options** (OAuth.AuthorizationOptions) - Optional - Additional options for customizing the authorization URL.

### Request Example
```json
{
  "client": "[PKCEClient Instance]",
  "endpoint": "https://twitter.com/i/oauth2/authorize",
  "clientId": "YourClientId",
  "scope": "tweet.read users.read follows.read"
}
```

### Response
#### Success Response (200)
- **authorizationRequest** (OAuth.AuthorizationRequest) - An object containing the authorization request details, including code challenge, verifier, state, and redirect URI.

#### Response Example
```json
{
  "authorizationRequest": {
    "codeChallenge": "...",
    "codeVerifier": "...",
    "state": "...",
    "redirectURI": "..."
  }
}
```
```

--------------------------------

### Toast and Alert Module Usage

Source: https://developers.raycast.com/migration/v1.28.0

Demonstrates how to import and use Toast and Alert components from the '@raycast/api' package. It also includes examples of deprecated options for Toast.

```APIDOC
## Toast and Alert Module Usage

### Description
This section provides examples of how to import and utilize the `Alert` and `Toast` components from the `@raycast/api` package. It also highlights deprecated options for `Toast`.

### Method
N/A (Import and Usage)

### Endpoint
N/A (Client-side API)

### Parameters
N/A

### Request Example
```javascript
import { Alert, Toast } from "@raycast/api";

// Example of showing a toast with a failure style
await showToast({ title: "Toast title", style: Toast.Style.Failure });

// Deprecated Toast Options (for reference)
// Toast.Options;
// Toast.ActionOptions;
// Toast.Style;

// Deprecated Alert Options (for reference)
// Alert.Options;
```

### Response
#### Success Response
N/A (Function calls that execute actions)

#### Response Example
N/A
```

--------------------------------

### Toast API Reference

Source: https://developers.raycast.com/api-reference/feedback/toast

This section details the `showToast` function and the `Toast` object, including their properties, methods, and usage examples for providing user feedback.

```APIDOC
## POST /api/feedback/toast

### Description
Creates and shows a Toast with the given options. Toasts are used to inform the user about asynchronous operations or errors, and can optionally include actions.

### Method
POST

### Endpoint
/api/feedback/toast

### Parameters
#### Request Body
- **options** (Toast.Options) - Required - The options to customize the Toast, including message, title, style, and actions.

### Request Example
```json
{
  "options": {
    "title": "Operation Complete",
    "message": "Your file has been uploaded successfully.",
    "style": "success",
    "primaryAction": {
      "title": "View File",
      "onAction": () => { /* handle view file action */ }
    }
  }
}
```

### Response
#### Success Response (200)
- **toast** (Toast) - A Toast object that can be used to interact with the shown toast (e.g., hide it).

#### Response Example
```json
{
  "toast": {
    "message": "Your file has been uploaded successfully.",
    "title": "Operation Complete",
    "style": "success",
    "primaryAction": {
      "title": "View File"
    },
    "hide": () => { /* function to hide toast */ },
    "show": () => { /* function to show toast */ }
  }
}
```

### Types
#### Toast
- **message** (string) - Required - An additional message for the Toast.
- **primaryAction** (Alert.ActionOptions) - Required - The primary Action the user can take.
- **secondaryAction** (Alert.ActionOptions) - Optional - The secondary Action the user can take.
- **style** (Action.Style) - Required - The style of the Toast (e.g., 'success', 'warning', 'danger', 'info').
- **title** (string) - Required - The title of the Toast.
- **hide** (() => Promise<void>) - Method to hide the Toast.
- **show** (() => Promise<void>) - Method to show the Toast.

#### Toast.Options
- **message** (string) - Required - An additional message for the Toast.
- **primaryAction** (Alert.ActionOptions) - Required - The primary Action the user can take.
- **secondaryAction** (Alert.ActionOptions) - Optional - The secondary Action the user can take.
- **style** (Action.Style) - Required - The style of the Toast.
- **title** (string) - Required - The title of the Toast.
```

--------------------------------

### AI Instructions Configuration (JSON, YAML, JSON5)

Source: https://context7_llms

Configure AI instructions in separate files (ai.json, ai.yaml, ai.json5) or within package.json for longer instructions. These files allow for cleaner organization of extension logic. The structure mirrors that of package.json, supporting JSON, YAML, and JSON5 formats.

```json
{
  "instructions": "When you don't know the user's first name, ask for it."
}
```

```yaml
instructions: |
  When you don't know the user's first name, ask for it.
```

```json5
{
  instructions: "When you don't know the user's first name, ask for it.",
}
```

--------------------------------

### Configurable Grid with Keywords and Search in Raycast

Source: https://context7_llms

An example of a Raycast Grid component configured with specific column count, insets, navigation title, and search bar placeholder. It also demonstrates using keywords for items to enhance searchability.

```typescript
import { Grid } from "@raycast/api";

const items = [
  { content: "🙈", keywords: ["see-no-evil", "monkey"] },
  { content: "🥳", keywords: ["partying", "face"] },
];

export default function Command() {
  return (
    <Grid
      columns={5}
      inset={Grid.Inset.Large}
      navigationTitle="Search Emoji"
      searchBarPlaceholder="Search your favorite emoji"
    >
      {items.map((item) => (
        <Grid.Item key={item.content} content={item.content} keywords={item.keywords} />
      ))}
    </Grid>
  );
}
```
```

--------------------------------

### Pick Date with Action.PickDate

Source: https://developers.raycast.com/api-reference/user-interface/actions

Demonstrates how to use the Action.PickDate component to allow users to select a date. This example shows a basic date picker without specific logic for handling the selected date.

```typescript
import { ActionPanel, List, Action } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item
        title="Todo"
        actions={
          <ActionPanel>
            <Action.PickDate title="Set Due Date…" />
          </ActionPanel>
        }
      />
    </List>
  );
}
```

--------------------------------

### Create Deeplinks with Raycast Utils

Source: https://context7_llms

Demonstrates how to create various types of deeplinks using the `createDeeplink` function from `@raycast/utils`. This includes extension deeplinks, external extension deeplinks, and script command deeplinks with arguments.

```tsx
import { Action, ActionPanel, LaunchProps, List } from "@raycast/api";
import { createDeeplink, DeeplinkType } from "@raycast/utils";

export default function Command(props: LaunchProps<{ launchContext: { message: string } }>) {
  console.log(props.launchContext?.message);

  return (
    <List>
      <List.Item
        title="Extension Deeplink"
        actions={
          <ActionPanel>
            <Action.CreateQuicklink
              title="Create Deeplink"
              quicklink={{
                name: "Extension Deeplink",
                link: createDeeplink({
                  command: "create-deeplink",
                  context: {
                    message: "Hello, world!",
                  },
                }),
              }}
            />
          </ActionPanel>
        }
      />
      <List.Item
        title="External Extension Deeplink"
        actions={
          <ActionPanel>
            <Action.CreateQuicklink
              title="Create Deeplink"
              quicklink={{
                name: "Create Triage Issue for Myself",
                link: createDeeplink({
                  ownerOrAuthorName: "linear",
                  extensionName: "linear",
                  command: "create-issue-for-myself",
                  arguments: {
                    title: "Triage new issues",
                  },
                }),
              }}
            />
          </ActionPanel>
        }
      />
      <List.Item
        title="Script Command Deeplink"
        actions={
          <ActionPanel>
            <Action.CreateQuicklink
              title="Create Deeplink"
              quicklink={{
                name: "Deeplink with Arguments",
                link: createDeeplink({
                  type: DeeplinkType.ScriptCommand,
                  command: "count-chars",
                  arguments: ["a b+c%20d"],
                }),
              }}
            />
          </ActionPanel>
        }
      />
    </List>
  );
}
```

--------------------------------

### Initialize and Authorize OAuth Service in JavaScript

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This JavaScript code demonstrates the initialization and authorization process for an OAuth service. It includes a constructor for `OAuthService` and a method `authorize()` that returns a Promise resolving to an access token. An example shows how to obtain the access token.

```javascript
constructor(options: OAuthServiceOptions): OAuthService

OAuthService.authorize(): Promise<string>;

const accessToken = await oauthService.authorize();
```

--------------------------------

### Implement SignUp Form with Validation in TypeScript

Source: https://developers.raycast.com/information/best-practices

This snippet demonstrates how to set up a sign-up form using `@raycast/utils` in TypeScript. It includes defining form values, initializing the form with `useForm`, and handling form submission with validation.

```typescript
import { useForm, FormValidation } from "@raycast/utils";

interface SignUpFormValues {
  name: string;
  password: string;
}

export default function Command() {
  const { handleSubmit, itemProps } = useForm<SignUpFormValues>({
    onSubmit(values) {
      showToast({
        style: Toast.Style.Success,
        title: "Yay!",
        message: `${values.name} account created`,
      });
    },
    validation: {
      // Validation rules would go here
    }
  });

  // Rest of the component would use itemProps for form fields
  return (
    <Form onSubmit={handleSubmit} { ...itemProps }>
      {/* Form fields */}
    </Form>
  );
}
```

--------------------------------

### Displaying a String in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/detail

This code example shows how to render a simple string as content within a Raycast interface. It's a basic representation of displaying textual information.

```typescript
self.__next_f.push([1, "c6: [\"$\", \"div\", null, {\"aria-labelledby\": \"$undefined\", \"className\": \"blocks w-full space-y-2 lg:space-y-3 leading-normal self-center **:text-left text-left\", \"children\": [[\"$\", \"p\", \"t5ALAqyRVe4Q\", {\"className\": \"has-[.button,input]:flex has-[.button,input]:flex-wrap has-[.button,input]:gap-2 has-[.button,input]:items-center mx-auto page-width-wide:mx-0 decoration-primary/6 print:break-inside-avoid w-full max-w-[unset] text-start self-start justify-start\", \"children\": [[\"$\", \"$1\", \"WT3suWeI2Da2\", {\"children\": [[\"$\", \"$1\", \"0\", {\"children\": [[\"$\", \"code\", \"mark\", {\"className\": \"py-px px-1.5 min-w-6.5 justify-center items-center ring-1 ring-inset ring-tint bg-tint rounded-sm text-[.875em] leading-[calc(max(1.20em,1.25rem))]\", \"children\": \"string\"}]}]]}]]}]]}]\n"])
```

--------------------------------

### Get Selected Finder Items and Show Toast (TypeScript)

Source: https://developers.raycast.com/api-reference/environment

This TypeScript code snippet demonstrates an asynchronous function to get selected Finder items. It includes error handling that displays a failure toast notification if an error occurs during the process. This is useful for commands that operate on user-selected files or folders.

```typescript
export default async function Command() {
 try {
  const selectedItems = await getSelectedFinderItems();
  console.log(selectedItems);
 } catch (error) {
  await showToast({
   style: Toast.Style.Failure,
   title: "Cannot copy file path",
   message: String(error),
  });
 }
}
```

--------------------------------

### Show HUD and Get AI Response (TypeScript)

Source: https://developers.raycast.com/api-reference/ai

This snippet shows how to display a HUD to inform the user about background processes, interact with an AI model to get a response, and then update the HUD upon completion. It uses `showHUD` for user feedback and `AI.ask` for AI interaction.

```typescript
await showHUD("Generating answer...");
const answer = await AI.ask("Suggest 5 jazz songs");
await showHUD("Done!");
```

--------------------------------

### Manage Local Storage with LocalStorage Namespace

Source: https://context7_llms

Demonstrates how to interact with local storage using the `LocalStorage` namespace in Raycast. This includes operations for getting, setting, removing, and clearing items. It replaces older, deprecated methods.

```javascript
import { LocalStorage } from "@raycast/api";

// deprecated allLocalStorageItems
const items = await LocalStorage.allItems();

// deprecated getLocalStorageItem
const item = await LocalStorage.getItem("key");

// deprecated setLocalStorageItem
await LocalStorage.setItem("key", "value");

// deprecated removeLocalStorageItem
await LocalStorage.removeItem("key");

// deprecated clearLocalStorage
await LocalStorage.clear();

// deprecated LocalStorageValue
LocalStorage.Value;

// deprecated LocalStorageValues
LocalStorage.Values;
```

--------------------------------

### Configure AI Instructions in Separate Files (JSON, YAML, JSON5)

Source: https://context7_llms

Instructions for AI extensions can be moved from package.json to a separate file for better organization. Supported formats include JSON, YAML, and JSON5. These files should be placed in the root of the extension directory.

```json
{
  "instructions": "When you don't know the user's first name, ask for it."
}
```

```yaml
instructions: |
  When you don't know the user's first name, ask for it.
```

```json5
{
  instructions: "When you don't know the user's first name, ask for it.",
}
```

--------------------------------

### Sign-Up Form Example (TSX)

Source: https://developers.raycast.com/utilities/react-hooks/useform

This TSX code snippet demonstrates how to create a sign-up form using Raycast's Form and FormValidation utilities. It includes input fields for first name and last name, with basic validation.

```tsx
import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";
import { useForm, FormValidation } from "@raycast/utils";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
}
```

--------------------------------

### Cache#get Method

Source: https://context7_llms

Retrieves data associated with a specific key from the cache. Returns `undefined` if the key does not exist.

```APIDOC
## Cache#get

### Description
Returns the data for the given key. If there is no data for the key, `undefined` is returned. If you want to just check for the existence of a key, use [has](#cache-has).

### Method
`get(key: string): string | undefined`

### Parameters
#### Path Parameters
- **key** (`string`) - Required - The key of the Cache entry.
```

--------------------------------

### Manual Pagination and State Management (React)

Source: https://developers.raycast.com/api-reference/user-interface/list

This example showcases manual pagination and state management for a Raycast list using React hooks like `useState`, `useCallback`, and `useEffect`. It includes an `AbortController` for managing asynchronous operations and handles loading states and more data availability. Dependencies: `react`, `@raycast/api`.

```typescript
import { setTimeout } from "node:timers/promises";
import { useCallback, useEffect, useRef, useState } from "react";
import { List } from "@raycast/api";

type State = {
  searchText: string;
  isLoading: boolean;
  hasMore: boolean;
  data: {
    index: number;
    page: number;
    text: string;
  }[];
  nextPage: number;
};
const pageSize = 20;
export default function Command() {
  const [state, setState] = useState<State>({ searchText: "", isLoading: true, hasMore: true, data: [], nextPage: 0 });
  const cancelRef = useRef<AbortController | null>(null);

  const loadNextPage = useCallback(async (searchText: string, nextPage: number, signal?: AbortSignal) => {
    setState((previous) => ({ ...previous, isLoading: true }));
    await setTimeout(500);
    const newData = Array.from({ length: pageSize }, (_v, index) => ({
      index,
      page: nextPage,
      text: searchText,
    }));
    if (signal?.aborted) {
      return;
    }
    setState((previous) => ({
      ...previous,
      data: [...previous.data, ...newData],
      isLoading: false,
      hasMore: nextPage < 10,
    }));
  }, []);

  const onLoadMore = useCallback(() => {
    setState((previous) => ({ ...previous, nextPage: previous.nextPage + 1 }));
  }, []);

  const onSearchTextChange = useCallback(
    (searchText: string) => {
      if (searchText === state.searchText) return;
      setState((previous) => ({
        ...previous,
        data: [],
        nextPage: 0,
        searchText,
      }));
    },
    [state.searchText]
  );

  useEffect(() => {
    cancelRef.current?.abort();
    cancelRef.current = new AbortController();
    loadNextPage(state.searchText, state.nextPage, cancelRef.current?.signal);
    return () => {
      cancelRef.current?.abort();
    };
  }, [loadNextPage, state.searchText, state.nextPage]);

  return (
    <List
      isLoading={state.isLoading}
      onSearchTextChange={onSearchTextChange}
      pagination={{ onLoadMore, hasMore: state.hasMore, pageSize }}
    >
      {state.data.map((item) => (
        <List.Item
          key={`${item.page} ${item.index} ${item.text}`}
          title={`Page ${item.page} Item ${item.index}`}
          subtitle={item.text}
        />
      ))}
    </List>
  );
}
```

--------------------------------

### Storage API Reference

Source: https://developers.raycast.com/api-reference/storage

This section details the functions available for interacting with the local storage, including getting, setting, removing, and clearing items.

```APIDOC
## LocalStorage.getItem

### Description
Retrieve the stored value for the given key.

### Method
`async function getItem(key: string): Promise<Value | undefined>;`

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- None

### Request Example
```javascript
import { LocalStorage } from "@raycast/api";

export default async function Command() {
  await LocalStorage.setItem("favorite-fruit", "apple");
  const item = await LocalStorage.getItem<string>("favorite-fruit");
  console.log(item);
}
```

### Response
#### Success Response (200)
- **value** (Value | undefined) - The stored value for the given key, or undefined if the key does not exist.

#### Response Example
```json
{
  "value": "apple"
}
```

## LocalStorage.setItem

### Description
Stores a value for the given key.

### Method
`async function setItem(key: string, value: LocalStorage.Value): Promise<void>;`

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- **key** (string) - Required - The key you want to create or update the value of.
- **value** (LocalStorage.Value) - Required - The value you want to create or update for the given key.

### Request Example
```javascript
import { LocalStorage } from "@raycast/api";

await LocalStorage.setItem("user-name", "John Doe");
```

### Response
#### Success Response (200)
- None

#### Response Example
```json
{}
```

## LocalStorage.removeItem

### Description
Removes the stored value for the given key.

### Method
`async function removeItem(key: string): Promise<void>;`

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- **key** (string) - Required - The key you want to remove the value of.

### Request Example
```javascript
import { LocalStorage } from "@raycast/api";

await LocalStorage.removeItem("user-name");
```

### Response
#### Success Response (200)
- None

#### Response Example
```json
{}
```

## LocalStorage.allItems

### Description
Retrieve all stored values in the local storage of an extension.

### Method
`async function allItems(): Promise<LocalStorage.Values>;`

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- None

### Request Example
```javascript
import { LocalStorage } from "@raycast/api";

const allItems = await LocalStorage.allItems();
console.log(allItems);
```

### Response
#### Success Response (200)
- **values** (LocalStorage.Values) - An object containing all stored key-value pairs.

#### Response Example
```json
{
  "user-name": "John Doe",
  "favorite-fruit": "apple"
}
```

## LocalStorage.clear

### Description
Removes all stored values of an extension.

### Method
`async function clear(): Promise<void>;`

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- None

### Request Example
```javascript
import { LocalStorage } from "@raycast/api";

await LocalStorage.clear();
```

### Response
#### Success Response (200)
- None

#### Response Example
```json
{}
```
```

--------------------------------

### Importing Raycast Components (TypeScript)

Source: https://developers.raycast.com/utilities/icons/getfavicon

Demonstrates how to import the `List` component from '@raycast/api' and the `getFavicon` utility from '@raycast/utils'. This is a common setup for Raycast extensions.

```typescript
import { List } from "@raycast/api";
import { getFavicon } from "@raycast/utils";
```

--------------------------------

### List with Programmatic Search Text Update

Source: https://developers.raycast.com/api-reference/user-interface/list

This example demonstrates a Raycast List component where the search text can be programmatically updated, for instance, by selecting an item from the list.

```APIDOC
## List with Programmatic Search Text Update

### Description
This endpoint demonstrates a Raycast List component where selecting an action can programmatically update the search text, providing a dynamic user experience.

### Method
N/A (Client-side component)

### Endpoint
N/A (Client-side component)

### Parameters
N/A

### Request Example
```javascript
import { useEffect, useState } from "react";
import { Action, ActionPanel, List } from "@raycast/api";

const items = ["Augustiner Helles", "Camden Hells", "Leffe Blonde", "Sierra Nevada IPA"];

export default function Command() {
  const [searchText, setSearchText] = useState("");

  return (
    <List
      searchText={searchText}
      onSearchTextChange={setSearchText}
      navigationTitle="Search Beers"
      searchBarPlaceholder="Search your favorite beer"
    >
      {items.map((item) => (
        <List.Item
          key={item}
          title={item}
          actions={
            <ActionPanel>
              <Action title="Select" onAction={() => setSearchText(item)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
```

### Response
#### Success Response (200)
N/A (UI component rendering)

#### Response Example
N/A (UI component rendering)
```

--------------------------------

### TypeScript LLM State Management Example

Source: https://developers.raycast.com/utilities/react-hooks/usesql

This TypeScript code snippet illustrates how to define the initial and success states for an LLM operation. It includes properties for loading status, data, and error handling. This pattern is useful for managing asynchronous operations and their results.

```typescript
// Initial State
{
  isLoading: true, // or `false` if `options.execute` is `false`
  data: undefined,
  error: undefined
}

// Success State
{
  isLoading: false,
  data: undefined,
  error: undefined
}
```

--------------------------------

### JavaScript Markdown Rendering Example

Source: https://developers.raycast.com/api-reference/user-interface/navigation

Illustrates how to render markdown strings in JavaScript, likely within a UI component. It shows a basic return statement with a markdown string assigned to a variable.

```javascript
self.__next_f.push([
  1,
  "a2:[\"$\",\"span\",\"20\",{\"className\":\"highlight-line\",\"style\":\"$undefined\",\"children\":[false,[\"$\",\"span\",null,{\"className\":\"highlight-line-content\",\"children\":[[[\"$\",\"span\",\"0\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" \"}], [\"$\",\"span\",\"1\",{\"style\":{\"color\":\"light-dark(rgb(var(--danger-10)), rgb(var(--danger-11)))\",\"--shiki-light\":\"rgb(var(--danger-10))\",\"--shiki-dark\":\"rgb(var(--danger-11))\"},\"children\":\"return\"}, [\"$\",\"span\",\"2\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" (\"}]
]]}]]}
]
)
self.__next_f.push([
  1,
  "a3:[\"$\",\"span\",\"21\",{\"className\":\"highlight-line\",\"style\":\"$undefined\",\"children\":[false,[\"$\",\"span\",null,{\"className\":\"highlight-line-content\",\"children\":[[[\"$\",\"span\",\"0\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" \"}, [\"$\",\"span\",\"1\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-11)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-11))\"},\"children\":\"<\"}, [\"$\",\"span\",\"2\",{\"style\":{\"color\":\"light-dark(rgb(var(--warning-10)), rgb(var(--warning-11)))\",\"--shiki-light\":\"rgb(var(--warning-10))\",\"--shiki-dark\":\"rgb(var(--warning-11))\"},\"children\":\"Detail\"}]
]]}]]}
]
)
self.__next_f.push([
  1,
  "a4:[\"$\",\"span\",\"22\",{\"className\":\"highlight-line\",\"style\":\"$undefined\",\"children\":[false,[\"$\",\"span\",null,{\"className\":\"highlight-line-content\",\"children\":[[[\"$\",\"span\",\"0\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" markdown\"}, [\"$\",\"span\",\"1\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-11)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-11))\"},\"children\":\"=\"}], [\"$\",\"span\",\"2\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\"\\\"\"}, [\"$\",\"span\",\"3\",{\"style\":{\"color\":\"light-dark(rgb(var(--success-10)), rgb(var(--success-11)))\",\"--shiki-light\":\"rgb(var(--success-10))\",\"--shiki-dark\":\"rgb(var(--success-11))\"},\"children\":\"Pong\"}, [\"$\",\"span\",\"4\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\"\\\"\"}]
]]}]]}
]
)
self.__next_f.push([
  1,
  "a5:[\"$\",\"span\",\"23\",{\"className\":\"highlight-line\",\"style\":\"$undefined\",\"children\":[false,[\"$\",\"span\",null,{\"className\":\"high
```

--------------------------------

### OAuthService Initialization

Source: https://developers.raycast.com/utilities/oauth/oauthservice

Demonstrates how to initialize the OAuthService with specific options.

```APIDOC
## OAuthService Initialization

### Description
Initializes the OAuthService with the provided options.

### Method
`constructor`

### Endpoint
N/A (Class Constructor)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
*   **options** (OAuthServiceOptions) - Required - Configuration options for the OAuth service.

### Request Example
```json
{
  "example": "new OAuthService({ /* options */ })"
}
```

### Response
#### Success Response (200)
*   **OAuthService** - An instance of the OAuthService.

#### Response Example
```json
{
  "example": "// Instance created successfully"
}
```
```

--------------------------------

### Display List Item in Raycast

Source: https://context7_llms

Demonstrates how to create a List.Item component within a Raycast List. This example shows setting an icon, title, subtitle, and accessory text for a list item, representing a beer.

```typescript
import { Icon, List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item icon={Icon.Star} title="Augustiner Helles" subtitle="0,5 Liter" accessories={[{ text: "Germany" }]} />
    </List>
  );
}
```

--------------------------------

### Get Frontmost Application

Source: https://context7_llms

Returns the currently active (frontmost) application on the system. This can be used for context-aware actions or automation.

```typescript
import { getFrontmostApplication } from "@raycast/api";

export default async function Command() {
  const frontmostApplication = await getFrontmostApplication();
  console.log(`The frontmost application is: ${frontmostApplication.name}`);
}
```

--------------------------------

### DX - Async Entry Point Warning

Source: https://context7_llms

A warning is now displayed in the console when using asynchronous entry points for view and menu-bar commands, improving developer experience.

```APIDOC
## Console Warning for Async Entry Points

### Description
Warns developers in the console when asynchronous functions are used as entry points for view or menu-bar commands.

### Method
Automatic detection and logging of asynchronous entry points.

### Parameters
N/A

### Request Example
N/A

### Response
N/A

#### Success Response (200)
N/A

#### Response Example
N/A
```

--------------------------------

### OAuth.PKCEClient#authorize

Source: https://developers.raycast.com/api-reference/oauth

Starts the authorization flow and displays the OAuth overlay in Raycast. It can accept either a pre-generated authorization request or custom authorization options.

```APIDOC
## POST /oauth/pkceclient/authorize

### Description
Starts the authorization and shows the OAuth overlay in Raycast. As parameter you can either directly use the returned request from [authorizationRequest](/api-reference/oauth#oauth.pkceclient-authorize), or customize the URL by extracting parameters from [AuthorizationRequest](/api-reference/oauth#oauth.authorizationrequest) and providing your own URL via [AuthorizationOptions](/api-reference/oauth#oauth.authorizationoptions). Eventually the URL will be used to open the authorization page of the provider in the web browser.

### Method
POST

### Endpoint
/oauth/pkceclient/authorize

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **options** (AuthorizationRequest | AuthorizationOptions) - Required - The options used to authorize.

### Request Example
```json
{
  "options": {
    "url": "https://example.com/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=scope1%20scope2&response_type=code&code_challenge=...&code_challenge_method=S256"
  }
}
```

### Response
#### Success Response (200)
- **authorizationResponse** (AuthorizationResponse) - Contains the authorization code needed for the token exchange.

#### Response Example
```json
{
  "authorizationResponse": {
    "code": "AUTHORIZATION_CODE"
  }
}
```
```

--------------------------------

### Accessing UI Component Props Interfaces

Source: https://context7_llms

Shows that props interfaces for UI components are now accessible under their respective component namespaces. This includes examples for `List.Props`.

```jsx
import { Action, List } from '@raycast/api'

// deprecated ListProps
List.Props
```

--------------------------------

### Basic Raycast Extension Structure

Source: https://developers.raycast.com/utilities/react-hooks/usecachedpromise

A minimal example of a Raycast extension, demonstrating the import of necessary components like Detail, ActionPanel, and Action.

```tsx
import { Detail, ActionPanel, Action } from "@raycast/api";
```

--------------------------------

### Typical Raycast Extension Directory Structure

Source: https://context7_llms

This bash snippet shows the standard directory layout for a Raycast extension project, including source files, assets, and configuration files for various development tools.

```bash
extension
├── .prettierrc
├── assets
│   └── icon.png
├── eslint.config.js
├── node_modules
├── package-lock.json
├── package.json
├── src
│   ├── command.tsx
└── tsconfig.json
```

--------------------------------

### Get Selected Text API

Source: https://developers.raycast.com/api-reference/environment

Fetches the text that is currently selected by the user in any application.

```APIDOC
## Get Selected Text API

### Description
Retrieves the currently selected text by the user.

### Method
`getSelectedText(): Promise<string>`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```typescript
import { getSelectedText } from "@raycast/api";

const selectedText = await getSelectedText();
console.log(selectedText);
```

### Response
#### Success Response (Promise<string>)
- A string containing the selected text.

#### Response Example
```json
"This is the selected text."
```
```

--------------------------------

### Render Image with Detail Component

Source: https://developers.raycast.com/api-reference/user-interface/detail

This example shows how to render an image within the Detail component. Images can be local assets or remote URLs. Custom dimensions and tint colors can be applied using query strings in the image URL.

```javascript
import { Detail } from '@raycast/api';

export default function Command() {
  return (
    <Detail markdown="![Raycast Logo](https://raycast.com/assets/brand/logo.svg?raycast-width=200&raycast-height=200&raycast-tint-color=blue)"/>
  );
}
```

--------------------------------

### Setup MutationObserver for Content Changes (JavaScript)

Source: https://manual.raycast.com/extensions

Sets up a MutationObserver to monitor the document body for added nodes. If new headings or toggles are detected, it triggers a reinitialization of link icons after a short delay.

```javascript
function setupMutationObserver() {
  console.log("Setting up MutationObserver");
 
  const observer = new MutationObserver((mutations) => {
    let shouldReinitialize = false;
 
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        // Check if any added nodes contain headings or toggles
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            if (node.matches && ( 
              node.matches('h1, h2, h3, .notion-toggle') ||
              node.querySelector('h1, h2, h3, .notion-toggle')
            )) {
              shouldReinitialize = true;
            }
          }
        });
      }
    }
 
    if (shouldReinitialize) {
      console.log("Content changed, reinitializing link icons");
      setTimeout(() => {
        initializeLinkIcons();
      }, 300);
    }
  });
 
  // Observe the entire document body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
```

--------------------------------

### Get Selected Finder Items API

Source: https://developers.raycast.com/api-reference/environment

Retrieve information about the files and folders currently selected in the Finder application.

```APIDOC
## Get Selected Finder Items API

### Description
Retrieves an array of `FileSystemItem` objects representing the items selected in Finder.

### Method
`getSelectedFinderItems(): Promise<FileSystemItem[]>`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```typescript
import { getSelectedFinderItems } from "@raycast/api";

const selectedItems = await getSelectedFinderItems();
console.log(selectedItems);
```

### Response
#### Success Response (Promise<FileSystemItem[]>)
- An array of `FileSystemItem` objects, each containing details about a selected file or folder.

#### Response Example
```json
[
  {
    "type": "file",
    "name": "document.txt",
    "path": "/Users/user/Documents/document.txt"
  }
]
```
```

--------------------------------

### Example Usage of useSQL Hook for Fetching Notes

Source: https://context7_llms

Demonstrates how to use the `useSQL` hook within a React component to fetch notes from a local SQL database. It handles loading states and displays a permission view if full disk access is required. The fetched data is then rendered in a `List` component.

```typescript
import { useSQL } from "@raycast/utils";
import { resolve } from "path";
import { homedir } from "os";

const NOTES_DB = resolve(homedir(), "Library/Group Containers/group.com.apple.notes/NoteStore.sqlite");
const notesQuery = `SELECT id, title FROM ...`;
type NoteItem = {
  id: string;
  title: string;
};

export default function Command() {
  const { isLoading, data, permissionView } = useSQL<NoteItem>(NOTES_DB, notesQuery);

  if (permissionView) {
    return permissionView;
  }

  return (
    <List isLoading={isLoading}>
      {(data || []).map((item) => (
        <List.Item key={item.id} title={item.title} />
      ))}
    </List>
  );
}
```

--------------------------------

### React useEffect and useState Hook Example

Source: https://developers.raycast.com/api-reference/user-interface/grid

This snippet demonstrates the use of `useEffect` and `useState` hooks in React for managing component state and side effects. It imports necessary functions from the 'react' library.

```typescript
import { useEffect, useState } from "react";
```

--------------------------------

### Exchanging Authorization Code for Tokens

Source: https://context7_llms

Provides an example of how to exchange the obtained authorization code for access and refresh tokens using the provider's token endpoint.

```APIDOC
## POST /oauth/token

### Description
Exchanges an authorization code for an access token and refresh token using the OAuth provider's token endpoint.

### Method
POST

### Endpoint
/oauth/token

### Parameters
#### Request Body
- **clientId** (string) - Required - The client ID.
- **code** (string) - Required - The authorization code obtained from the authorization step.
- **codeVerifier** (string) - Required - The code verifier used during the authorization request.
- **grantType** (string) - Required - Should be 'authorization_code'.
- **redirectUri** (string) - Required - The redirect URI used during the authorization request.

### Request Example
```json
{
  "clientId": "YourClientId",
  "code": "received_auth_code_from_provider",
  "codeVerifier": "...",
  "grantType": "authorization_code",
  "redirectUri": "..."
}
```

### Response
#### Success Response (200)
- **tokenResponse** (OAuth.TokenResponse) - An object containing the access token, refresh token, expiry information, and scope.

#### Response Example
```json
{
  "tokenResponse": {
    "access_token": "...",
    "refresh_token": "...",
    "expires_in": 3600,
    "token_type": "Bearer",
    "scope": "..."
  }
}
```
```

--------------------------------

### Action.CreateQuicklink

Source: https://developers.raycast.com/api-reference/user-interface/actions

An action that navigates to the Create Quicklink command, allowing for prefilling of some or all fields.

```APIDOC
## POST /actions/create-quicklink

### Description
Action that navigates to the the Create Quicklink command with some or all of the fields prefilled.

### Method
POST

### Endpoint
/actions/create-quicklink

### Parameters
#### Request Body
- **quicklink** (Quicklink) - Required - The Quicklink to create.
- **icon** (Image.ImageLike) - Optional - A optional icon displayed for the Action. See Image.ImageLike for the supported formats and types.
- **shortcut** (Keyboard.Shortcut) - Optional - The keyboard shortcut for the Action.
- **title** (string) - Optional - An optional title for the Action.
```

--------------------------------

### Action.ToggleQuickLook

Source: https://context7_llms

Action that toggles the Quick Look to preview a file. It accepts optional icon, shortcut, and title props.

```APIDOC
## Action.ToggleQuickLook

### Description
Action that toggles the Quick Look to preview a file.

### Method
N/A (Component within ActionPanel)

### Endpoint
N/A

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
```typescript
import { ActionPanel, List, Action } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item
        title="Preview me"
        quickLook={{ path: "~/Downloads/Raycast.dmg", name: "Some file" }}
        actions={
          <ActionPanel>
            <Action.ToggleQuickLook />
          </ActionPanel>
        }
      />
    </List>
  );
}
```

### Response
#### Success Response (200)
N/A (This is a UI component)

#### Response Example
N/A
```

--------------------------------

### Basic Console Logging in TypeScript

Source: https://context7_llms

Examples of using the console object for debugging in TypeScript. It demonstrates logging strings, formatted strings with variables, and errors. These logs are visible in development mode.

```typescript
console.log("Hello World"); // Prints: Hello World

const name = "Thomas";
console.debug(`Hello ${name}`); // Prints: Hello Thomas

const error = new Error("Boom 💥");
console.error(error); // Prints: Boom 💥
```

--------------------------------

### Raycast API Interaction Example (JavaScript)

Source: https://developers.raycast.com/api-reference/user-interface/navigation

This JavaScript code illustrates a basic handler function for a Raycast command. It shows how to access arguments and potentially interact with external APIs, like pinging a service.

```javascript
export default command({
  name: "ping",
  description: "Ping the API",
  arguments: [
    {
      name: "name",
      type: Argument.text({},
      ,
      )
    }
  ],
  handler: async (args) => {
    const name = args.name.value;
    await showHUD(`Pinging ${name}...`);
    // Placeholder for actual API call
    return [
      List.Element.create({
        title: `Pong: ${name}`,
      }),
    ];
  }
});
```

--------------------------------

### Stream AI Answers to a File (TypeScript)

Source: https://context7_llms

This example demonstrates how to stream the AI's response using the `AI.ask` function and write the received data incrementally to a file. It utilizes event listeners for the 'data' event and Node.js file system promises for writing. It also shows how to provide feedback to the user using `showHUD`.

```typescript
import { AI, getSelectedFinderItems, showHUD } from "@raycast/api";
import fs from "fs";

export default async function main() {
  let allData = "";
  const [file] = await getSelectedFinderItems();

  const answer = AI.ask("Suggest 5 jazz songs");

  // Listen to "data" event to stream the answer
  answer.on("data", async (data) => {
    allData += data;
    await fs.promises.writeFile(`${file.path}`, allData.trim(), "utf-8");
  });

  await answer;

  await showHUD("Done!");
}
```

--------------------------------

### InterExtensionLaunchOptions

Source: https://developers.raycast.com/api-reference/command

Describes the options available when launching a command from a different extension within Raycast.

```APIDOC
## GET /llmstxt/developers_raycast_llms-full_txt

### Description
This endpoint provides information about the launch options for inter-extension commands.

### Method
GET

### Endpoint
/llmstxt/developers_raycast_llms-full_txt

### Parameters
#### Query Parameters
None

#### Request Body
None

### Response
#### Success Response (200)
- **InterExtensionLaunchOptions** (object) - An object detailing the available launch options.
  - **property** (string) - The name of the launch option property.
  - **description** (string) - A description of the launch option.
  - **type** (string) - The data type of the launch option.

#### Response Example
```json
{
  "InterExtensionLaunchOptions": [
    {
      "property": "optionName",
      "description": "Description of the option",
      "type": "string"
    }
  ]
}
```
```

--------------------------------

### Get Default Application for a File/URL

Source: https://context7_llms

Retrieves the default application designated to open a specific file or URL. This is useful for ensuring consistency when launching files or links.

```typescript
import { getDefaultApplication } from "@raycast/api";

export default async function Command() {
  const defaultApplication = await getDefaultApplication(__filename);
  console.log(`Default application for JavaScript is: ${defaultApplication.name}`);
}
```

--------------------------------

### Brew Changelog in Markdown

Source: https://developers.raycast.com/basics/prepare-an-extension-for-store

This Markdown snippet outlines the changelog for a Brew-related project. It details additions, fixes, and new commands across different versions, including dates and specific improvements.

```markdown
# Brew Changelog

## [Added a bunch of new feedback] - {PR_MERGE_DATE}

- Improve reliability of `outdated` command
- Add action to copy formula/cask name
- Add cask name & tap to cask details
- Add Toast action to cancel current action
- Add Toast action to copy error log after failure

## [New Additions] - 2022-12-13

- Add greedy upgrade preference
- Add `upgrade` command

## [Fixes & Bits] - 2021-11-19

- Improve discovery of brew prefix
- Update Cask.installed correctly after installation
- Fix installed state after uninstalling search result
- Fix cache check after installing/uninstalling cask
- Add uninstall action to outdated action panel

## [New Commands] - 2021-11-04

Add support for searching and managing casks

## [Added Brew] - 2021-10-26

Initial version code
```

--------------------------------

### Ask AI and Copy to Clipboard (TypeScript)

Source: https://developers.raycast.com/api-reference/ai

Demonstrates how to use the `AI.ask` function to get a response from the AI and then copy that response to the user's clipboard. This is useful for commands that need to generate text and make it readily available.

```typescript
import {
  AI,
  Clipboard
} from "@raycast/api";

export default async function command() {
  const answer = await AI.ask("Suggest 5 jazz songs");

  await Clipboard.copy(answer);
}
```

--------------------------------

### Initialize Raycast LLM Client

Source: https://developers.raycast.com/utilities/functions/executesql

This JavaScript code initializes the Raycast LLM client. It requires the 'raycast-llm' package to be installed. The client is configured with the API key, and it's ready to be used for making LLM requests.

```javascript
import { LLM } from "raycast-llm";

const llm = new LLM({
  apiKey: process.env.RAYCAST_LLM_API_KEY,
});
```

--------------------------------

### Display List Item with Metadata in Raycast (TypeScript)

Source: https://context7_llms

This example demonstrates how to create a List.Item in Raycast using TypeScript. It shows how to display basic item details and nested metadata, such as labels with text and icons. This is useful for presenting structured information within a list view.

```typescript
import { List } from "@raycast/api";

export default function Metadata() {
  return (
    <List isShowingDetail>
      <List.Item
        title="Bulbasaur"
        detail={
          <List.Item.Detail
            metadata={
              <List.Item.Detail.Metadata>
                <List.Item.Detail.Metadata.Label title="Type" icon="pokemon_types/grass.svg" text="Grass" />
              </List.Item.Detail.Metadata>
            }
          />
        }
      />
    </List>
  );
}
```

--------------------------------

### Importing MenuBarExtra from Raycast API (TypeScript)

Source: https://developers.raycast.com/api-reference/menu-bar-commands

Demonstrates how to import the `MenuBarExtra` component from the `@raycast/api` package. This is a common starting point for creating menu bar extensions in Raycast.

```typescript
import { MenuBarExtra } from "@raycast/api";
```

--------------------------------

### Display Pokemon Type Metadata in Raycast List

Source: https://context7_llms

This example demonstrates how to display a Pokemon's type using a Label within the metadata of a List.Item in Raycast. It requires the '@raycast/api' package.

```typescript
import { List } from "@raycast/api";

export default function Metadata() {
  return (
    <List isShowingDetail>
      <List.Item
        title="Bulbasaur"
        detail={
          <List.Item.Detail
            metadata={
              <List.Item.Detail.Metadata>
                <List.Item.Detail.Metadata.Label title="Type" icon="pokemon_types/grass.svg" text="Grass" />
              </List.Item.Detail.Metadata>
            }
          />
        }
      />
    </List>
  );
}
```

--------------------------------

### Authorize User and Obtain Authorization Code

Source: https://developers.raycast.com/api-reference/oauth

Initiate the authorization flow to get the authorization code after the user grants consent.

```APIDOC
## POST /api/oauth/authorize

### Description
Initiates the OAuth authorization flow by calling the `authorize` method on the PKCE client. This displays the Raycast OAuth overlay and prompts the user to consent, eventually returning the authorization code upon redirect.

### Method
POST

### Endpoint
/api/oauth/authorize

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **request** (AuthorizationRequest) - Required - The authorization request object obtained from a previous step.

### Request Example
```json
{
  "request": {
    "codeChallenge": "...",
    "verifier": "...",
    "state": "...",
    "redirectUri": "https://raycast.com/redirect?packageName=Extension"
  }
}
```

### Response
#### Success Response (200)
- **authorizationCode** (string) - The authorization code received after user consent and redirect.

#### Response Example
```json
{
  "authorizationCode": "received_auth_code_from_provider"
}
```
```

--------------------------------

### Authorizing User and Obtaining Code

Source: https://context7_llms

Explains how to call the `authorize` method on the PKCE client to initiate the user consent flow and retrieve the authorization code.

```APIDOC
## POST /oauth/pkce/client/authorize

### Description
Initiates the user authorization process, displaying the Raycast OAuth overlay and handling the redirect back to the extension to obtain the authorization code.

### Method
POST

### Endpoint
/oauth/pkce/client/authorize

### Parameters
#### Request Body
- **client** (OAuth.PKCEClient) - Required - The initialized PKCE client.
- **authorizationRequest** (OAuth.AuthorizationRequest) - Required - The authorization request object obtained from `authorizationRequest`.

### Request Example
```json
{
  "client": "[PKCEClient Instance]",
  "authorizationRequest": {
    "codeChallenge": "...",
    "codeVerifier": "...",
    "state": "...",
    "redirectURI": "..."
  }
}
```

### Response
#### Success Response (200)
- **authorizationCode** (string) - The authorization code received after successful user consent and redirect.

#### Response Example
```json
{
  "authorizationCode": "received_auth_code_from_provider"
}
```
```

--------------------------------

### Mutation and Optimistic Updates in useExec

Source: https://developers.raycast.com/utilities/react-hooks/useexec

This section of the useExec hook documentation explains how to handle mutations and implement optimistic updates. Optimistic updates allow the UI to reflect changes immediately before the server confirms the operation, improving user experience.

```javascript
const { mutate, isLoading } = useExec({
  mutation: async (data) => {
    // API call to perform mutation
    return await api.updateData(data);
  },
  optimisticUpdates: (cache, data) => {
    // Update cache optimistically
  }
});
```

--------------------------------

### Full Example: Paginated List Component

Source: https://context7_llms

A complete React component using useCachedPromise for pagination within a Raycast List. It demonstrates setting up state, fetching paginated data, and rendering the List component with the pagination prop.

```tsx
import { setTimeout } from "node:timers/promises";
import { useState } from "react";
import { List } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

export default function Command() {
  const [searchText, setSearchText] = useState("");

  const { isLoading, data, pagination } = useCachedPromise(
    (searchText: string) => async (options: { page: number }) => {
      await setTimeout(200);
      const newData = Array.from({ length: 25 }, (_v, index) => ({
        index,
        page: options.page,
        text: searchText,
      }));
      return { data: newData, hasMore: options.page < 10 };
    },
    [searchText],
  );

  return (
    <List isLoading={isLoading} onSearchTextChange={setSearchText} pagination={pagination}>
      {data?.map((item) => (
        <List.Item
          key={`${item.page} ${item.index} ${item.text}`}
          title={`Page ${item.page} Item ${item.index}`}
          subtitle={item.text}
        />
      ))}
    </List>
  );
}
```

--------------------------------

### Optimistic Updates with useFetch

Source: https://context7_llms

Demonstrates how to use optimistic updates with the `useFetch` hook to provide immediate UI feedback for asynchronous operations, with optional rollback functionality.

```APIDOC
## POST /api/notes

### Description
This endpoint is used to create a new note. The `optimisticUpdate` function allows the UI to reflect the new note immediately, while `rollbackOnError` ensures data integrity if the API call fails.

### Method
POST

### Endpoint
/api/notes

### Parameters
#### Query Parameters
None

#### Request Body
This endpoint does not explicitly define a request body in the provided example, but implies an action to create a new note.

### Request Example
```tsx
// Example of calling the function that triggers the optimistic update
await mutate(
  somehowCreateANewNote(),
  {
    optimisticUpdate(data) {
      return data?.concat([{ id: "" + Math.random(), title: "New Title" }]);
    },
    // rollbackOnError is optional, data will automatically roll back if not specified
  },
);
```

### Response
#### Success Response (200)
Returns the updated list of notes including the newly created one.

#### Response Example
```json
{
  "notes": [
    { "id": "1", "title": "Existing Note" },
    { "id": "2", "title": "New Title" } 
  ]
}
```

#### Error Response
If the API call fails, the UI will automatically revert to the state before the optimistic update.

```json
{
  "error": "Failed to create note."
}
```
```

--------------------------------

### Single Selection File Picker in TypeScript

Source: https://context7_llms

This example demonstrates a file picker configured for single selection only. It validates that the selected item is an existing file before logging its path. It utilizes `@raycast/api` and `fs`.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";
import fs from "fs";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Submit Name"
            onSubmit={(values: { files: string[] }) => {
              const file = values.files[0];
              if (!fs.existsSync(file) || !fs.lstatSync(file).isFile()) {
                return false;
              }
              console.log(file);
            }}
          />
        </ActionPanel>
      }
    >
      <Form.FilePicker id="files" allowMultipleSelection={false} />
    </Form>
  );
}
```

--------------------------------

### withAccessToken Usage in Raycast Commands

Source: https://developers.raycast.com/utilities/oauth/withaccesstoken

Demonstrates how to use the `withAccessToken` higher-order function to manage OAuth tokens in different types of Raycast commands. It shows examples for view, no-view, and onAuthorize scenarios, highlighting the flexibility in handling token retrieval and access.

```typescript
import { showHUD } from '@raycast/api';
import { withAccessToken, getAccessToken } from './oauth';

export default withAccessToken(async (token) => {
  await showHUD(`Access Token: ${token}`);
});
```

```typescript
import { LaunchProps } from '@raycast/api';
import { withAccessToken, getAccessToken } from './oauth';

interface MyProps {
  // Define your command props here
}

const Command = (props: MyProps) => {
  // Access token is available via getAccessToken()
  const token = getAccessToken();
  return (
    // Your command UI
    <div>
      Access Token: {token}
    </div>
  );
};

export default withAccessToken(Command);
```

```typescript
import { showHUD } from '@raycast/api';
import { withAccessToken, getAccessToken } from './oauth';

export default withAccessToken({
  authorize: async () => {
    // Implement your authorization logic here
    return 'YOUR_FETCHED_ACCESS_TOKEN';
  },
  onAuthorize: async (token, type, idToken) => {
    await showHUD(`Authorized with token: ${token} (Type: ${type})`);
    if (idToken) {
      console.log('ID Token:', idToken);
    }
  },
});
```

--------------------------------

### Initialize OAuth PKCE Client for Twitter

Source: https://developers.raycast.com/api-reference/oauth

Initializes the OAuth PKCE client for the Twitter provider. This setup is crucial for initiating the authorization flow, specifying the redirect method, provider name, icon, and a brief description for the user.

```typescript
import { OAuth } from "@raycast/api";

const client = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "Twitter",
  providerIcon: "twitter-logo.png",
  description: "Connect your Twitter account…",
});
```

--------------------------------

### Cache API

Source: https://developers.raycast.com/api-reference/cache

This section details the various operations available for the Cache API, including get, has, set, remove, and clear.

```APIDOC
## GET /api/cache

### Description
Retrieves a value from the cache using its key.

### Method
GET

### Endpoint
`/api/cache`

### Parameters
#### Query Parameters
- **key** (string) - Required - The key of the item to retrieve from the cache.

### Response
#### Success Response (200)
- **value** (string | undefined) - The cached value associated with the key, or undefined if not found.

#### Response Example
```json
{
  "value": "cached data"
}
```

## GET /api/cache/has

### Description
Checks if a key exists in the cache.

### Method
GET

### Endpoint
`/api/cache/has`

### Parameters
#### Query Parameters
- **key** (string) - Required - The key to check for in the cache.

### Response
#### Success Response (200)
- **exists** (boolean) - True if the key exists in the cache, false otherwise.

#### Response Example
```json
{
  "exists": true
}
```

## POST /api/cache/set

### Description
Sets a key-value pair in the cache.

### Method
POST

### Endpoint
`/api/cache/set`

### Parameters
#### Request Body
- **key** (string) - Required - The key for the cache entry.
- **data** (string) - Required - The data to be stored in the cache.

### Request Example
```json
{
  "key": "user_session",
  "data": "session_token_12345"
}
```

### Response
#### Success Response (200)
- **status** (string) - Indicates the success of the operation (e.g., "OK").

#### Response Example
```json
{
  "status": "OK"
}
```

## DELETE /api/cache/remove

### Description
Removes a key-value pair from the cache.

### Method
DELETE

### Endpoint
`/api/cache/remove`

### Parameters
#### Query Parameters
- **key** (string) - Required - The key of the item to remove from the cache.

### Response
#### Success Response (200)
- **removed** (boolean) - True if the item was successfully removed, false otherwise.

#### Response Example
```json
{
  "removed": true
}
```

## DELETE /api/cache/clear

### Description
Clears all entries from the cache.

### Method
DELETE

### Endpoint
`/api/cache/clear`

### Response
#### Success Response (200)
- **status** (string) - Indicates the success of the operation (e.g., "Cache cleared").

#### Response Example
```json
{
  "status": "Cache cleared"
}
```
```

--------------------------------

### Implement Sign Up Form with useForm Hook

Source: https://developers.raycast.com/utilities/react-hooks/useform

This JavaScript code snippet demonstrates the implementation of a sign-up form using the useForm hook from a form management library. It handles form submission and displays success notifications.

```javascript
export default function Command() {
  const { handleSubmit, itemProps } = useForm<SignUpFormValues>({
    onSubmit(values) {
      showToast({
        style: Toast.Style.Success,
        title: "Yay!",
        message: `${values.firstName} ${values.lastName} account created`,
      });
    },
    validation: {
      
```

--------------------------------

### Display Evolution Link Metadata in Raycast List

Source: https://context7_llms

This example shows how to add a link to a Pokemon's evolution information within the metadata of a List.Item in Raycast. It utilizes the 'Link' component and requires the '@raycast/api' package.

```typescript
import { List } from "@raycast/api";

export default function Metadata() {
  return (
    <List isShowingDetail>
      <List.Item
        title="Bulbasaur"
        detail={
          <List.Item.Detail
            metadata={
              <List.Item.Detail.Metadata>
                <List.Item.Detail.Metadata.Link
                  title="Evolution"
                  target="https://www.pokemon.com/us/pokedex/pikachu"
                  text="Raichu"
                />
              </List.Item.Detail.Metadata>
            }
          />
        }
      />
    </List>
  );
}
```

--------------------------------

### AI Evaluation Example (JSON)

Source: https://developers.raycast.com/ai/write-evals-for-your-ai-extension

This JSON object defines an AI evaluation for a 'todo-list' task. It includes an input query, mock data for the 'get-todos' tool, and the expected output, which is a call to the 'get-todos' tool.

```json
{
  "ai": {
    "evals": [
      {
        "input": "@todo-list what are my open todos",
        "mocks": {
          "get-todos": [
            {
              "id": "Z5lF8F-lSvGCD6e3uZwkL",
              "isCompleted": false,
              "title": "Buy oat milk"
            },
            {
              "id": "69Ag2mfaDakC3IP8XxpXU",
              "isCompleted": false,
              "title": "Play with my cat"
            }
          ]
        },
        "expected": [
          {
            "callsTool": "get-todos"
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### AI Properties Configuration

Source: https://developers.raycast.com/information/manifest

Configures AI capabilities for an extension. The 'instructions' property allows for custom system messages to guide the AI's behavior. 'evals' can be used for AI extension evaluations.

```json
{
  "instructions": "Always format output as JSON.",
  "evals": "path/to/evals.json"
}
```

--------------------------------

### Basic List Component in Raycast

Source: https://context7_llms

Demonstrates how to create a simple list with basic items using the Raycast API. It imports the List component and renders a few List.Item components.

```jsx
import { List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item title="Item 1" />
      <List.Item title="Item 2" subtitle="Optional subtitle" />
    </List>
  );
}
```

--------------------------------

### Raycast List Component Example (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/list

This TypeScript code snippet demonstrates the basic structure for creating a List component in Raycast. It includes importing the List component and defining a functional component that renders a List with List.Item.

```typescript
import { List } from "@raycast/api";

export default function Metadata() {
 return (
 <List isShowingDetail>
 <List.Item
 title="Bulbasaur"
 
```

--------------------------------

### TypeScript OAuth PKCE Client Setup for Twitter

Source: https://developers.raycast.com/api-reference/oauth

This snippet demonstrates how to set up an OAuth PKCE client for Twitter using the `@raycast/api` library. It configures the redirect method, provider name, and icon.

```typescript
import { OAuth } from "@raycast/api";

const client = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "Twitter",
  providerIcon: "twitter-logo.png",
});
```

--------------------------------

### Raycast CLI: Publish Extension

Source: https://context7_llms

Verifies, builds, and publishes your Raycast extension. If the extension is private, it will be published to the organization's private store. This command is the final step before making your extension available.

```bash
npx ray publish
```

--------------------------------

### Authenticate and Initialize Linear Client (TypeScript)

Source: https://developers.raycast.com/utilities/oauth/withaccesstoken

This snippet demonstrates how to authenticate with an access token and initialize the LinearClient. It's a common pattern for setting up API clients that require authentication.

```typescript
onAuthorize({ token }) {
  linearClient = new LinearClient({ accessToken: token });

});
```

--------------------------------

### Subscriber Callback

Source: https://developers.raycast.com/api-reference/cache

This describes the 'subscriber' parameter for the subscribe function, which is a function that gets called when the cache is updated.

```text
subscriber
A function that is called when the
```

--------------------------------

### Display HUD Message with Async Function

Source: https://developers.raycast.com/information/lifecycle

This example demonstrates how to asynchronously display a HUD (Heads-Up Display) message using the 'showHUD' function. The message 'Hello' is passed as a string argument. This is useful for providing user feedback within the Raycast interface.

```typescript
await showHUD("Hello");
```

--------------------------------

### Display Toast Notification with Options

Source: https://developers.raycast.com/api-reference/feedback/toast

Demonstrates how to display a toast notification with custom title, message, and style. It shows examples for success and failure states, and how to handle asynchronous operations.

```typescript
import { showToast, Toast } from "@raycast/api";

export default async function Command() {
  const success = false;

  if (success) {
    await showToast({ title: "Dinner is ready", message: "Pizza margherita" });
  } else {
    await showToast({
      style: Toast.Style.Failure,
      title: "Dinner isn't ready",
      message: "Pizza dropped on the floor",
    });
  }
}
```

--------------------------------

### Render Markdown String with Detail Component

Source: https://developers.raycast.com/api-reference/user-interface/detail

This example demonstrates how to use the Detail component to render a simple markdown string. The `markdown` prop accepts CommonMark formatted text. This is a basic usage for displaying text content.

```javascript
import { Detail } from '@raycast/api';

export default function Command() {
  return (
    <Detail markdown="# Hello, Raycast!\n\nThis is a **detailed** view rendered using markdown."/>
  );
}
```

--------------------------------

### Define AI Evals with Dot Notation for Tool Arguments

Source: https://context7_llms

Illustrates how to use dot notation to specify nested arguments for tool calls within AI evals. This example checks if the 'greet' tool is called with a user name specified using dot notation, e.g., 'user.name'.

```json
{
  "ai": {
    "evals": [
      {
        "expected": [
          {
            "callsTool": {
              "name": "greet",
              "arguments": {
                "user.name": "thomas"
              }
            }
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### Site Configuration and Analytics Script

Source: https://developers.raycast.com/information/lifecycle/arguments

This snippet includes a script for site configuration, specifically handling potential Cloudflare Rocket Loader issues, and a PostHog analytics script. The configuration script dynamically adds an alert to the page if Rocket Loader is detected and incorrectly configured, providing a link to GitBook's documentation for resolution. The PostHog script is for integrating analytics into the site.

```javascript
document.addEventListener("DOMContentLoaded", () => {
 if (Array.from(document.scripts).find(script => script.src.includes('rocket-loader.min.js'))) {
 const alert = document.createElement('div');
 alert.className = 'p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-8 mx-8';
 alert.innerHTML = `
 <strong>Error in site configuration:</strong>
 It looks like ${window.location.hostname} has been incorrectly configured in Cloudflare. This may lead to unexpected behavior or issues with the page loading. If you are the owner of this site, please refer to <a href="https://gitbook.com/docs/published-documentation/custom-domain/configure-dns#are-you-using-cloudflare" class="underline">GitBook's documentation</a> for steps to fix the problem.
 `;

 document.body.prepend(alert);
 }
 });
```

```html
<script async src="https://integrations.gitbook.com/v1/integrations/posthog/installations/45bb70c02653ecb28893e6b4df7d4c1bd658fb04d678be3ae62f3577b43d012a/sites/site_wqFKp/script.js?version=157.0"></script>
```

--------------------------------

### Initialize Linear OAuth Service (TypeScript)

Source: https://developers.raycast.com/utilities/oauth/oauthservice

Initializes the Linear OAuth service with specified scopes. This is a TypeScript example demonstrating how to configure the Linear provider within the Raycast OAuthService.

```typescript
OAuthService.linear: (options: ProviderOptions) => OAuthService
```

--------------------------------

### Raycast CLI: Display Help Information

Source: https://context7_llms

Displays a list of available commands and their descriptions for the Raycast CLI. This command is essential for understanding the full capabilities of the CLI tool.

```bash
npx ray help
```

--------------------------------

### Uncontrolled Dropdown Example

Source: https://context7_llms

Demonstrates an uncontrolled Form.Dropdown component in TypeScript. The component manages its own state, and the selected value is accessed upon form submission.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Favorite" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="emoji" title="Favorite Emoji" defaultValue="lol">
        <Form.Dropdown.Item value="poop" title="Pile of poop" icon="💩" />
        <Form.Dropdown.Item value="rocket" title="Rocket" icon="🚀" />
        <Form.Dropdown.Item value="lol" title="Rolling on the floor laughing face" icon="🤣" />
      </Form.Dropdown>
    </Form>
  );
}
```

--------------------------------

### Defining Grid Item Properties (React)

Source: https://developers.raycast.com/api-reference/user-interface/grid

This example demonstrates how to define properties for a Grid item, specifically setting its title. This is useful for providing context or labels for grid elements.

```jsx
110:["$","div",null,{
  "aria-labelledby": "$undefined",
  "className": "blocks w-full space-y-2 lg:space-y-3 leading-normal self-center **:text-left text-left",
  "children": [
    ["$","p","rRVqVT6SZSs9",{
      "className": "has-[.button,input]:flex has-[.button,input]:flex-wrap has-[.button,input]:gap-2 has-[.button,input]:items-center mx-auto page-width-wide:mx-0 decoration-primary/6 print:break-inside-avoid w-full max-w-[unset] text-start self-start justify-start",
      "children": [
        ["$","$1","2GnRmp6B2yl1",{
          "children": [
            ["$","$1","0",{
              "children": "The title displayed for the item."
            }]
          ]
        }]
      ]
    }]
  ]
}]

```

--------------------------------

### DevTools: Quote Extension Folder Path

Source: https://context7_llms

The 'Start Development' action in Dev Tools now quotes the extension folder path. This prevents issues with paths containing spaces or special characters when launching development environments.

```javascript
// The 'Start Development' command now handles paths with spaces correctly.
```

--------------------------------

### Display Metadata Label with Icon in Raycast Detail

Source: https://developers.raycast.com/api-reference/user-interface/detail

This example shows how to add an icon to a `Detail.Metadata.Label` in the Raycast `Detail` component. This allows for richer visual representation of metadata entries.

```typescript
import { Detail } from "@raycast/api";

// Define markdown here to prevent unwanted indentation.
const markdown = `
# Pikachu

![](https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png)

Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.
`;

export default function Main() {
  return (
    <Detail
      markdown={markdown}
      navigationTitle="Pikachu"
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Height" text={`1' 04"`} icon="weight.svg" />
        </Detail.Metadata>
      }
    />
  );
}
```

--------------------------------

### React 18 Features in Raycast Extensions

Source: https://context7_llms

Enables the use of React 18 features such as Suspense and `useSyncExternalStore` within Raycast extensions. Refer to the migration guide for detailed instructions.

```javascript
// Example usage of React 18 features (specifics depend on implementation)
// See migration guide for details.
```

--------------------------------

### Keyboard.Shortcut.Common

Source: https://context7_llms

Provides a collection of commonly used keyboard shortcuts across Raycast to ensure a consistent user experience.

```APIDOC
## Keyboard.Shortcut.Common

### Description
A collection of shortcuts that are commonly used throughout Raycast. Using them should help provide a more consistent experience and preserve muscle memory.

### Common Shortcuts

| Name            | macOS     | Windows              |
| --------------- | --------- | -------------------- |
| Copy            | ⌘ + ⇧ + C | `ctrl` + `shift` + C |
| CopyDeeplink    | ⌘ + ⇧ + C | `ctrl` + `shift` + C |
| CopyName        | ⌘ + ⇧ + . | `ctrl` + `alt` + C   |
| CopyPath        | ⌘ + ⇧ + , | `alt` + `shift` + C  |
| Save            | ⌘ + S     | `ctrl` + S           |
| Duplicate       | ⌘ + D     | `ctrl` + `shift` + S |
| Edit            | ⌘ + E     | `ctrl` + E           |
| MoveDown        | ⌘ + ⇧ + ↓ | `ctrl` + `shift` + ↓ |
| MoveUp          | ⌘ + ⇧ + ↑ | `ctrl` + `shift` + ↑ |
| New             | ⌘ + N     | `ctrl` + N           |
| Open            | ⌘ + O     | `ctrl` + O           |
| OpenWith        | ⌘ + ⇧ + O | `ctrl` + `shift` + O |
| Pin             | ⌘ + ⇧ + P | `ctrl` + .           |
| Refresh         | ⌘ + R     | `ctrl` + R           |
| Remove          | ⌃ + X     | `ctrl` + D           |
| RemoveAll       | ⌃ + ⇧ + X | `ctrl` + `shift` + D |
| ToggleQuickLook | ⌘ + Y     | `ctrl` + Y           |
```

--------------------------------

### Display Custom Empty View in Raycast List

Source: https://context7_llms

Shows how to implement a custom List.EmptyView in Raycast to provide user feedback when no items are available. This is useful for guiding users when input is required or search results are empty.

```typescript
import { useEffect, useState } from "react";
import { List } from "@raycast/api";

export default function CommandWithCustomEmptyView() {
  const [state, setState] = useState({ searchText: "", items: [] });

  useEffect(() => {
    // perform an API call that eventually populates `items`.
  }, [state.searchText]);

  return (
    <List onSearchTextChange={(newValue) => setState((previous) => ({ ...previous, searchText: newValue }))}>
      {state.searchText === "" && state.items.length === 0 ? (
        <List.EmptyView icon={{ source: "https://placekitten.com/500/500" }} title="Type something to get started" />
      ) : (
        state.items.map((item) => <List.Item key={item} title={item} />)
      )}
    </List>
  );
}
```

--------------------------------

### Raycast: Ping Action Example (Incomplete)

Source: https://developers.raycast.com/api-reference/user-interface/actions

This Raycast extension command snippet shows a Detail view with the markdown text 'Ping'. It begins to define an ActionPanel but is incomplete, suggesting a placeholder for a 'Ping' action.

```typescript
import { ActionPanel, Detail, Action } from "@raycast/api";

function Ping() {
  return (
    <Detail
      markdown="Ping"
      actions={

```

--------------------------------

### Clipboard.paste Function Example

Source: https://developers.raycast.com/api-reference/clipboard

Demonstrates how to paste content into the clipboard using the `Clipboard.paste` function from the `@raycast/api` library. This function takes a string or a Content object as input and returns a Promise that resolves when the operation is complete.

```typescript
import { Clipboard } from "@raycast/api";

export default async function Command() {
  await Clipboard.paste("I really like Raycast's API");
}
```

--------------------------------

### Initialize Linear SDK with onAuthorize

Source: https://context7_llms

Initializes the Linear SDK using OAuthService's onAuthorize callback. This allows sharing the initialized client across the codebase. It requires the '@raycast/utils' and '@linear/sdk' packages.

```tsx
import { OAuthService } from "@raycast/utils";
import { LinearClient, LinearGraphQLClient } from "@linear/sdk";

let linearClient: LinearClient | null = null;

export const linear = OAuthService.linear({
  scope: "read write",
  onAuthorize({ token }) {
    linearClient = new LinearClient({ accessToken: token });
  },
});

export function withLinearClient<T>(Component: React.ComponentType<T>) {
  return withAccessToken<T>(linear)(Component);
}

export function getLinearClient(): { linearClient: LinearClient; graphQLClient: LinearGraphQLClient } {
  if (!linearClient) {
    throw new Error("No linear client initialized");
  }

  return { linearClient, graphQLClient: linearClient.client };
}
```

--------------------------------

### Initialize Navigation Handling (JavaScript)

Source: https://manual.raycast.com/extensions

Initializes navigation logic for a website, likely Raycast's documentation. It checks the document's ready state and calls an 'init' function. The 'init' function handles different URL patterns, distinguishing between the root URL and subpages.

```javascript
if (document.readyState === "loading") {
 document.addEventListener("DOMContentLoaded", init);
} else {
 init();
}

function init() {
 console.log("Init opentoggles");
 
 const baseUrl = "https://manual.raycast.com";
 const currentUrl = window.location.href;
 const rootUrlPattern = new RegExp(`^${baseUrl}/?(#.*)?$`);

 if (rootUrlPattern.test(currentUrl)) {
 handleRootUrl();
 console.log("handle root");
 } else if (currentUrl.startsWith(baseUrl)) {
 handleSubpages();
 console.log("handle sub")
 }
```

--------------------------------

### Configure Jira OAuth Service in JavaScript

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This JavaScript example demonstrates how to set up the Jira OAuth service for Raycast LLMs. It employs the `OAuthService.jira` method, requiring `ProviderOptions` such as a `clientId` and specific scopes like 'read:jira-user', 'read:jira-work', and 'offline_access' for necessary permissions.

```javascript
OAuthService.jira: (options: ProviderOptions) => OAuthService

const jira = OAuthService.jira({
  clientId: "custom-client-id",
  scope: "read:jira-user read:jira-work offline_access",
});
```

--------------------------------

### Implementing Pagination in Raycast Commands

Source: https://developers.raycast.com/api-reference/user-interface/grid

This section discusses how to add pagination support to Raycast commands. It mentions that many provided data fetching utilities include built-in pagination. The document offers examples for implementing pagination both with these utilities and from scratch.

```plaintext
For convenience, most of the that we provide have built-in pagination support. Here's an example of how to add pagination support to a simple command using , and one "from scratch".
```

--------------------------------

### LLM Return Statement Example in JavaScript

Source: https://developers.raycast.com/information/best-practices

This JavaScript code snippet shows a basic 'return' statement within the context of LLM operations. It highlights the keyword 'return' with specific styling, indicating its use in controlling the flow of LLM-related functions or processes. This is fundamental for defining the output or behavior of LLM interactions.

```javascript
self.__next_f.push([1, "ab:[\"$\",\"span\",\"22\",{\"className\":\"highlight-line\",\"style\":\"$undefined\",\"children\":[false,[\"$\",\"span\",null,{\"className\":\"highlight-line-content\",\"children\":[[[\"$\",\"span\",\"0\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" \"}],[\"$\",\"span\",\"1\",{\"style\":{\"color\":\"light-dark(rgb(var(--danger-10)), rgb(var(--danger-11)))\",\"--shiki-light\":\"rgb(var(--danger-10))\",\"--shiki-dark\":\"rgb(var(--danger-11))\"},\"children\":\"return\"}],[\"$\",\"span\",\"2\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" <\"}],[\"$\",\"span\",\"3\",{\"style\":{\"color\":\"light-dark(rgb(var(--primary-10)), rgb(var(--primary-11)))\",\"--shiki-light\":\"rgb(var(--primary-10))\",\"--shiki-dark\":\"rgb(var(--primary-11))\"}
```

--------------------------------

### Open Extension Preferences in Raycast

Source: https://context7_llms

Opens the preferences screen for the current extension. This function is useful for guiding users to update settings, such as API keys, when an issue is detected. It returns a Promise that resolves when the screen is opened.

```typescript
import { ActionPanel, Action, Detail, openExtensionPreferences } from "@raycast/api";

export default function Command() {
  const markdown = "API key incorrect. Please update it in extension preferences and try again.";

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action title="Open Extension Preferences" onAction={openExtensionPreferences} />
        </ActionPanel>
      }
    />
  );
}
```

--------------------------------

### Handle Pre-Execution Logic with onWillExecute in Raycast LLM

Source: https://developers.raycast.com/utilities/react-hooks/usecachedpromise

A function called before an LLM execution starts. This allows for pre-computation or validation steps to be performed prior to the main execution logic.

```typescript
options.onWillExecute
```

--------------------------------

### Example of Root Search Configuration

Source: https://developers.raycast.com/api-reference/menu-bar-commands

This JSON structure represents a root search configuration, likely used for defining the primary search parameters or entry points for an LLM command within Raycast.

```json
{
  "children": [
    [
      "$",
      "$1",
      "0",
      {
        "children": "Of course, our pull request command wouldn't be of that much use if we had to tell it to update itself every single time. To add "
      }
    ]
  ]
}
```

--------------------------------

### useCachedPromise Hook Example in React

Source: https://context7_llms

Demonstrates the usage of the useCachedPromise hook within a React component to fetch and display data from an API. It shows how to handle loading states, display data, and implement a revalidation action.

```tsx
import { Detail, ActionPanel, Action } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

export default function Command() {
  const abortable = useRef<AbortController>();
  const { isLoading, data, revalidate } = useCachedPromise(
    async (url: string) => {
      const response = await fetch(url, { signal: abortable.current?.signal });
      const result = await response.text();
      return result;
    },
    ["https://api.example"],
    {
      initialData: "Some Text",
      abortable,
    },
  );

  return (
    <Detail
      isLoading={isLoading}
      markdown={data}
      actions={
        <ActionPanel>
          <Action title="Reload" onAction={() => revalidate()} />
        </ActionPanel>
      }
    />
  );
}
```

--------------------------------

### Initialize LLM Data in Raycast

Source: https://developers.raycast.com/utilities/react-hooks/usestreamjson

This snippet demonstrates how to set up initial data for LLM operations. It defines the structure for initial data, likely used for configuring LLM parameters or context. No external dependencies are explicitly mentioned, and the output is structured data for LLM processing.

```javascript
self.__next_f.push([
  1,
  "ab:[\"$\",\"span\",\"6\",{\"className\":\"highlight-line\",\"style\":\"$undefined\",\"children\":[false,[\"$\",\"span\",null,{\"className\":\"highlight-line-content\",\"children\":[[[\"$\",\"span\",\"0\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" initialData\"}],[\"$\",\"span\",\"1\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-11)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-11))\"},\"children\":\"? :\"}],[\"$\",\"span\",\"2\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" \"}],[\"$\",\"span\",\"3\",{\"style\":{\"color\":\"light-dark(rgb(var(--primary-10)), rgb(var(--primary-11)))\",\"--shiki-light\":\"rgb(var(--primary-10))\",\"--shiki-dark\":\"rgb(var(--primary-11))\"},\"children\":\"U\"}],[\"$\",\"span\",\"4\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\";\"}]]},\"\\n\"]}]]}]\n"])
```

--------------------------------

### JSX List Component Example for Raycast

Source: https://developers.raycast.com/api-reference/user-interface/list

This snippet demonstrates how to use the `List` and `List.Item` components from '@raycast/api' in a JSX file. It shows how to create a list with multiple items, including one with a subtitle. This is a common pattern for displaying lists of information in Raycast extensions.

```jsx
import { List } from "@raycast/api";

export default function Command() {
 return (
    <List>
      <List.Item title="Item 1" />
      <List.Item title="Item 2" subtitle="Optional subtitle" />
    </List>
 );
}
```

--------------------------------

### ImageLike Union Type Example (TypeScript)

Source: https://context7_llms

Demonstrates the ImageLike union type, which supports URL, Asset, Icon, FileIcon, and Image types for displaying images in Raycast. It shows how to use different image sources within a List component.

```typescript
import { Icon, Image, List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item title="URL" icon="https://raycast.com/uploads/avatar.png" />
      <List.Item title="Asset" icon="avatar.png" />
      <List.Item title="Icon" icon={Icon.Circle} />
      <List.Item title="FileIcon" icon={{ fileIcon: __filename }} />
      <List.Item
        title="Image"
        icon={{
          source: "https://raycast.com/uploads/avatar.png",
          mask: Image.Mask.Circle,
        }}
      />
    </List>
  );
}
```

--------------------------------

### Adding Accessories to List Items in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/list

This example shows how to enhance a Raycast List.Item by adding accessories, such as text and an icon. This allows for displaying supplementary information directly alongside the main item title, providing quick context.

```jsx
import { Color, Icon, List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item
        title="An Item with Accessories"
        accessories={[ { text: `An Accessory Text`, icon: Icon.Hammer },

```

--------------------------------

### Run AppleScript with Raycast Utilities (TypeScript)

Source: https://context7_llms

Provides examples of using the `runAppleScript` function to execute AppleScript or JavaScript scripts on macOS. The function supports passing static scripts or scripts with arguments, and offers options for output parsing, language selection, and timeout management. It requires the `@raycast/utils` package and is macOS-specific.

```typescript
function runAppleScript<T>(
  script: string,
  options?: {
    humanReadableOutput?: boolean;
    language?: "AppleScript" | "JavaScript";
    signal?: AbortSignal;
    timeout?: number;
    parseOutput?: ParseExecOutputHandler<T>;
  },
): Promise<T>;
```

```typescript
function runAppleScript<T>(
  script: string,
  arguments: string[],
  options?: {
    humanReadableOutput?: boolean;
    language?: "AppleScript" | "JavaScript";
    signal?: AbortSignal;
    timeout?: number;
    parseOutput?: ParseExecOutputHandler<T>;
  },
): Promise<T>;
```

--------------------------------

### Display Pokemon Type TagList Metadata in Raycast List

Source: https://context7_llms

This example demonstrates how to display a Pokemon's type using a TagList within the metadata of a List.Item in Raycast. It requires the '@raycast/api' package and allows for custom colors for tags.

```typescript
import { List } from "@raycast/api";

export default function Metadata() {
  return (
    <List isShowingDetail>
      <List.Item
        title="Bulbasaur"
        detail={
          <List.Item.Detail
            metadata={
              <List.Item.Detail.Metadata>
                <List.Item.Detail.Metadata.TagList title="Type">
                  <List.Item.Detail.Metadata.TagList.Item text="Electric" color={"#eed535"} />
                </List.Item.Detail.Metadata.TagList>
              </List.Item.Detail.Metadata>
            }
          />
        }
      />
    </List>
  );
}
```

--------------------------------

### OAuthService Constructor

Source: https://context7_llms

Initializes the OAuthService with specified options. Use OAuthServiceOptions to configure the service.

```APIDOC
## POST /oauth/authorize

### Description
Initiates the OAuth authorization process or refreshes existing tokens if necessary. Returns a promise that resolves with the access token from the authorization flow.

### Method
POST

### Endpoint
/oauth/authorize

### Parameters
#### Query Parameters
- **token** (string) - Required - The access token for authorization.

### Request Example
```json
{
  "token": "YOUR_ACCESS_TOKEN"
}
```

### Response
#### Success Response (200)
- **accessToken** (string) - The obtained access token.

#### Response Example
```json
{
  "accessToken": "Obtained_Access_Token"
}
```
```

--------------------------------

### Initialize OAuthService with GitHub Client

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This snippet shows how to initialize a new OAuthService instance specifically for GitHub. It defines the necessary client configuration, including the client ID and secret, which are essential for the OAuth flow.

```javascript
const github = new OAuthService({
  client: {
    id: "",
    secret: ""
  }
})
```

--------------------------------

### Import Raycast API Modules

Source: https://developers.raycast.com/utilities/functions/executesql

This snippet demonstrates how to import essential modules from the '@raycast/api' package. It specifically imports 'closeMainWindow' and 'Clipboard' for interacting with the Raycast environment and system clipboard. Ensure '@raycast/api' is installed as a dependency.

```typescript
import { closeMainWindow, Clipboard } from "@raycast/api";
```

--------------------------------

### Clipboard.read Function Example

Source: https://developers.raycast.com/api-reference/clipboard

Illustrates how to read content from the clipboard using the `Clipboard.read` function from the `@raycast/api` library. This function can optionally accept an offset and returns a Promise resolving to a `ReadContent` object containing text, file, and HTML data.

```typescript
import { Clipboard } from "@raycast/api";

export default async () => {
  const { text, file, html } = await Clipboard.read();
  console.log(text);
  console.log(file);
  console.log(html);
};
```

--------------------------------

### Create a Raycast Command with a List (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/list

This snippet shows how to create a basic Raycast command using TypeScript. It imports the 'List' component from '@raycast/api' and structures a command that returns a List with sections and items. This is a foundational example for building LLM-powered commands.

```typescript
import { List } from "@raycast/api";

export default function Command() {
 return (
 <List>
 <List.Section title="Lager">
 <List.Item title="Camden Hells" />
 </List.Section>
 <List.Section title="IPA">
 <List.Item title="Sierra Nevada IPA" />
 </List.Section>
 </List>
 )
```

--------------------------------

### Navigate to useExec Utility in React

Source: https://developers.raycast.com/utilities/react-hooks/useform

This snippet is a navigation link in a React application, pointing to the 'useExec' utility hook documentation. Similar to the 'useFetch' link, it includes styling and analytics tracking for user interaction.

```jsx
<div
  href="/utilities/react-hooks/useexec"
  insights={{
    type: "link_click",
    link: {
      target: {
        k
```

--------------------------------

### Implement List Pagination from Scratch in TypeScript

Source: https://context7_llms

This example shows how to implement pagination for a Raycast List component manually without relying on `usePromise`. It requires `@raycast/api` version 1.69.0 or higher. This approach involves managing state for loading, more data availability, and the next page number, along with handling search text changes and scroll events.

```typescript
import { setTimeout } from "node:timers/promises";
import { useCallback, useEffect, useRef, useState } from "react";
import { List } from "@raycast/api";

type State = {
  searchText: string;
  isLoading: boolean;
  hasMore: boolean;
  data: {
    index: number;
    page: number;
    text: string;
  }[];
  nextPage: number;
};
const pageSize = 20;
export default function Command() {
  const [state, setState] = useState<State>({
    searchText: "",
    isLoading: true,
    hasMore: true,
    data: [],
    nextPage: 0,
  });
  const cancelRef = useRef<AbortController | null>(null);

  const loadNextPage = useCallback(async (searchText: string, nextPage: number, signal?: AbortSignal) => {
    setState((previous) => ({ ...previous, isLoading: true }));
    await setTimeout(500);
    const newData = Array.from({ length: pageSize }, (_v, index) => ({
      index,
      page: nextPage,
      text: searchText,
    }));
    if (signal?.aborted) {
      return;
    }
    setState((previous) => ({
      ...previous,
      data: [...previous.data, ...newData],
      isLoading: false,
      hasMore: nextPage < 10,
    }));
  }, []);

  const onLoadMore = useCallback(() => {
    setState((previous) => ({ ...previous, nextPage: previous.nextPage + 1 }));
  }, []);

  const onSearchTextChange = useCallback(
    (searchText: string) => {
      if (searchText === state.searchText) return;
      setState((previous) => ({
        ...previous,
        data: [],
        nextPage: 0,
        searchText,
      }));
    },
    [state.searchText]
  );

  useEffect(() => {
    cancelRef.current?.abort();
    cancelRef.current = new AbortController();
    loadNextPage(state.searchText, state.nextPage, cancelRef.current?.signal);
    return () => {
      cancelRef.current?.abort();
    };
  }, [loadNextPage, state.searchText, state.nextPage]);

  return (
    <List
      isLoading={state.isLoading}
      onSearchTextChange={onSearchTextChange}
      onLoadMore={state.hasMore ? onLoadMore : undefined}
    >
      {state.data.map((item) => (
        <List.Item
          key={`${item.page} ${item.index} ${item.text}`}
          title={`Page ${item.page} Item ${item.index}`}
          subtitle={item.text}
        />
      ))}
    </List>
  );
}

```

--------------------------------

### Configure GitHub OAuthService (Built-in)

Source: https://context7_llms

Initializes the OAuthService for GitHub using its built-in static property. This leverages Raycast's pre-configured OAuth app for easier integration. Requires specifying the desired scopes.

```tsx
const github = OAuthService.github({ scope: "repo user" });
```

--------------------------------

### Display File Icon (TypeScript)

Source: https://context7_llms

Shows how to display a file's icon within a Raycast List using the `fileIcon` property. This example uses the special `__filename` variable to represent the current file's icon.

```typescript
import { List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item title="File icon" icon={{ fileIcon: __filename }} />
    </List>
  );
}
```

--------------------------------

### Submit Form Data with Action.SubmitForm

Source: https://developers.raycast.com/api-reference/user-interface/actions

An example of creating a simple form with a checkbox. When the form is submitted, the values are logged to the console. This demonstrates basic form handling in Raycast.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Answer" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.Checkbox id="answer" label="Are you happy?" defaultValue={true} />
    </Form>
  );
}
```

--------------------------------

### Raycast Tool Confirmation Example (TypeScript)

Source: https://developers.raycast.com/api-reference/tool

This TypeScript code defines a confirmation dialog for a Raycast tool. It takes a user's name as input and returns a confirmation message asking if the user wants to greet them. This is useful for confirming user actions.

```typescript
import { Tool } from "@raycast/api";

type Input = {
  /**
   * The first name of the user to greet
   */
  name: string;
};

export const confirmation: Tool.Confirmation<Input> = (input) => {
  return {
    message: `Are you sure you want to greet ${input.name}?`,
  };
};
```

--------------------------------

### Display Disabled Submenu in Menu Bar

Source: https://developers.raycast.com/api-reference/menu-bar-commands

This example shows how to create a menu bar item that displays a disabled submenu. It uses `MenuBarExtra.Submenu` from `@raycast/api`.

```typescript
import { Icon, MenuBarExtra, open } from "@raycast/api";

export default function Command() {
  return (
    <MenuBarExtra icon={Icon.Bookmark}>
      <MenuBarExtra.Submenu title="Disabled"></MenuBarExtra.Submenu>
    </MenuBarExtra>
  );
}
```

--------------------------------

### Handle Date Selection with Action.PickDate onChange

Source: https://developers.raycast.com/api-reference/user-interface/actions

An advanced example of Action.PickDate that includes an `onChange` handler. This handler checks if the selected date represents a full day or a specific time, allowing for conditional logic.

```typescript
import { ActionPanel, List, Action } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item
        title="Todo"
        actions={
          <ActionPanel>
            <Action.PickDate
              title="Set Due Date…"
              onChange={(date) => {
                if (Action.PickDate.isFullDay(values.reminderDate)) {
                  // the event is for a full day
                } else {
                  // the event is at a specific time
                }
              }}
            />
          </ActionPanel>
        }
      />
    </List>
  );
}
```

--------------------------------

### Setup MutationObserver for Content Changes (JavaScript)

Source: https://manual.raycast.com/extensions

This function sets up a MutationObserver to monitor the document's body for changes, specifically additions of new nodes. If headings or toggles are added, it triggers a reinitialization of link icons after a short delay to ensure they are applied to the new content.

```javascript
function setupMutationObserver() {
  console.log("Setting up MutationObserver");
  const observer = new MutationObserver((mutations) => {
    let shouldReinitialize = false;
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            if (node.matches && (
              node.matches('h1, h2, h3, .notion-toggle') ||
              node.querySelector('h1, h2, h3, .notion-toggle')
            )) {
              shouldReinitialize = true;
            }
          }
        });
      }
    }
    if (shouldReinitialize) {
      console.log("Content changed, reinitializing link icons");
      setTimeout(() => {
        initializeLinkIcons();
      }, 300);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
```

--------------------------------

### Migrate Clipboard API in Raycast

Source: https://developers.raycast.com/migration/v1.28.0

This snippet demonstrates the updated way to interact with the Clipboard API in Raycast. It shows the deprecated methods and their replacements under the `Clipboard` namespace. Ensure you have '@raycast/api' installed.

```typescript
import { Clipboard } from "@raycast/api";

// deprecated copyTextToClipboard
await Clipboard.copy("text");

// deprecated clearClipboard
await Clipboard.clear();

// deprecated pasteText
await Clipboard.paste("text");
```

--------------------------------

### Basic Raycast Command Structure (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/actions

This is a fundamental Raycast command structure written in TypeScript. It demonstrates the basic setup for a command, including necessary imports and the main command function that returns a Detail component.

```typescript
import { ActionPanel, Detail, Action } from "@raycast/api";

export default function Command() {
 return (
  <Detail
```

--------------------------------

### Initial Data Handling in JavaScript

Source: https://developers.raycast.com/utilities/react-hooks/useexec

This snippet shows how initial data is handled, likely within a UI component or state management system. It appears to be setting up default or initial values for data that will be used. Dependencies are implicit to the framework or library being used.

```javascript
self.__next_f.push([1,"c3:[\"$\",\"span\",\"12\",{\"className\":\"highlight-line\",\"style\":\"$undefined\",\"children\":[false,[\"$\",\"span\",null,{\"className\":\"highlight-line-content\",\"children\":[[[\"$\",\"span\",\"0\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" initialData\"}],[\"$\",\"span\",\"1\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-11)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-11))\"},\"children\":\"?:\"}],[\"$\",\"span\",\"2\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" \"}],[\"$\",\"span\",\"3\",{\"style\":{\"color\":\"light-dark(rgb(var(--primary-10)), rgb(var(--primary-11)))\",\"--shiki-light\":\"rgb(var(--primary-10))\",\"--shiki-dark\":\"rgb(var(--primary-11))\"},\"children\":\"U\"}],[\"$\",\"span\",\"4\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\";\"}]]},\"\\n\"]}]]}]\n"])
```

--------------------------------

### Raycast CLI: Build Extension for Distribution

Source: https://context7_llms

Creates an optimized production build of your Raycast extension. This command is crucial for preparing your extension for distribution and is used by the CI for publishing.

```bash
npx ray build
```

--------------------------------

### Define Keyboard Shortcuts in React - Raycast

Source: https://developers.raycast.com/api-reference/keyboard

This example demonstrates how to define keyboard shortcuts for actions within a Raycast extension using React. It utilizes the `Action` component and specifies shortcuts with modifiers and key equivalents, including common shortcuts like 'Open'.

```javascript
import { Action, ActionPanel, Detail, Keyboard } from "@raycast/api";

export default function Command() {
  return (
    <Detail
      markdown="Let's play some games 👾"
      actions={
        <ActionPanel title="Game controls">
          <Action title="Up" shortcut={{ modifiers: ["opt"], key: "arrowUp" }} onAction={() => console.log("Go up")} />
          <Action
            title="Down"
            shortcut={{ modifiers: ["opt"], key: "arrowDown" }}
            onAction={() => console.log("Go down")}
          />
          <Action
            title="Left"
            shortcut={{ modifiers: ["opt"], key: "arrowLeft" }}
            onAction={() => console.log("Go left")}
          />
          <Action
            title="Right"
            shortcut={{ modifiers: ["opt"], key: "arrowRight" }}
            onAction={() => console.log("Go right")}
          />
          <Action title="Open" shortcut={Keyboard.Shortcut.Common.Open} onAction={() => console.log("Open")} />
        </ActionPanel>
      }
    />
  );
}
```

--------------------------------

### OAuth Utilities - getAccessToken

Source: https://developers.raycast.com/utilities/oauth/getaccesstoken

This section details the `getAccessToken` function within the OAuth Utilities of the Raycast API. It explains the function's signature, return value, and provides an example of its usage.

```APIDOC
## POST /utilities/oauth/getAccessToken

### Description
This endpoint is used to obtain an access token for OAuth authentication within the Raycast ecosystem. It's a crucial part of the authentication flow for applications interacting with Raycast services.

### Method
POST

### Endpoint
/utilities/oauth/getAccessToken

### Parameters
#### Query Parameters
- **code** (string) - Required - The authorization code received after user consent.
- **client_id** (string) - Required - The client ID of your application.
- **client_secret** (string) - Required - The client secret of your application.
- **redirect_uri** (string) - Required - The redirect URI configured for your application.

### Request Body
This endpoint does not typically require a request body, as parameters are passed via query parameters.

### Request Example
```
POST /utilities/oauth/getAccessToken?code=AUTHORIZATION_CODE&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&redirect_uri=YOUR_REDIRECT_URI
```

### Response
#### Success Response (200)
- **access_token** (string) - The obtained access token.
- **token_type** (string) - The type of token (e.g., Bearer).
- **expires_in** (integer) - The time in seconds until the token expires.
- **refresh_token** (string) - The refresh token to obtain a new access token.

#### Response Example
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "REFRESH_TOKEN_SECRET..."
}
```

#### Error Response (400)
- **error** (string) - Description of the error (e.g., invalid_request, invalid_client, invalid_grant).
- **error_description** (string) - More detailed explanation of the error.

#### Error Response Example
```json
{
  "error": "invalid_grant",
  "error_description": "The provided authorization code is invalid or has expired."
}
```
```

--------------------------------

### Adding an Optional Icon Description in Raycast

Source: https://developers.raycast.com/api-reference/menu-bar-commands

Provides an example of adding descriptive text for an optional icon within a submenu in Raycast. This helps users understand the purpose of the icon.

```typescript
An optional icon for this submenu.
```

--------------------------------

### Controlled File Picker in TypeScript

Source: https://context7_llms

This example demonstrates a controlled file picker where the selected files are managed by React state. The `value` prop sets the initial selection, and the `onChange` handler updates the state. It uses `@raycast/api` and `react`.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Name" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.FilePicker id="files" value={files} onChange={setFiles} />
    </Form>
  );
}
```

--------------------------------

### IntraExtensionLaunchOptions

Source: https://developers.raycast.com/api-reference/command

Specifies options for launching commands from within the same extension.

```APIDOC
## IntraExtensionLaunchOptions

### Description
The options that can be used when launching a command from the same extension.

### Method
N/A (This is a data structure definition)

### Endpoint
N/A

### Parameters
(No specific parameters are listed for this structure in the provided text, it's a conceptual object)

### Request Example
```json
{
  "commandId": "another-command-id",
  "arguments": {},
  "context": {}
}
```

### Response
(N/A - This is a request parameter structure)

```

--------------------------------

### Clipboard.readText Function Example

Source: https://developers.raycast.com/api-reference/clipboard

Demonstrates reading only the text content from the clipboard using `Clipboard.readText` from the `@raycast/api` library. This asynchronous function returns a Promise that resolves to a string representing the text content, or undefined if no text is available.

```typescript
import { Clipboard } from "@raycast/api";

export default async function Command() {
  const text = await Clipboard.readText();
  console.log(text);
}
```

--------------------------------

### Asynchronous Data Fetching with usePromise Hook (TypeScript)

Source: https://developers.raycast.com/utilities/react-hooks/usepromise

This example shows how to use a custom `usePromise` hook for handling asynchronous operations, such as fetching user data. It manages loading states and returns the fetched data. The hook takes an async function and an optional dependency array.

```typescript
const { isLoading, data } = usePromise(
  async (searchText: string) => {
    const data = await getUser(); // or any asynchronous logic you need to perform
    return data;
  },
  [searchText]
);
```

--------------------------------

### Display HUD Message in Raycast

Source: https://developers.raycast.com/api-reference/feedback/hud

This snippet shows how to display a Heads-Up Display (HUD) message to the user in Raycast. It includes the function signature and an example of how to call it.

```typescript
async function showHUD(
  title: string,
  options?: { clearRootSearch?: boolean; popToRootType?: PopToRootType }
): Promise<void>;

```

--------------------------------

### Create Basic Grid Dropdown with Raycast API

Source: https://developers.raycast.com/api-reference/user-interface/grid

A simple example of adding a dropdown menu to the Raycast Grid's search bar. It demonstrates the basic usage of `Grid.Dropdown` and `Grid.Dropdown.Item` for providing filter choices.

```javascript
import { Grid } from "@raycast/api";

export default function Command() {
  return (
    <Grid
      searchBarAccessory={
        <Grid.Dropdown tooltip="Dropdown With Items">
          <Grid.Dropdown.Item title="One" value="one" />
          <Grid.Dropdown.Item title="Two" value="two" />
          <Grid.Dropdown.Item title="Three" value="three" />
        </Grid.Dropdown>
      }
    >
      <Grid.Item content="https://placekitten.com/400/400" title="Item in the Main Grid" />
    </Grid>
  );
}
```

--------------------------------

### Navigate to useExec Section in JavaScript

Source: https://developers.raycast.com/utilities/react-hooks/useexec

This snippet represents a navigation element, likely a breadcrumb or link, designed to guide users to the 'useExec' utility function documentation. It specifies the target URL and the text to display for the link.

```javascript
self.__next_f.push([
  1,
  "b2:[\"$\",\"$Lb1\",\"Ys4oj0CgJmJL\",{\"breadcrumbs\":[{\"label\":\"Jump to section\",\"icon\":[\"$\",\"$L47\",null,{\"icon\":\"arrow-down-short-wide\",\"className\":\"size-3\"}]}],\"isExternal\":false,\"isSamePage\":true,\"openInNewTabLabel\":\"Open in new tab\",\"target\":{\"href\":\"/utilities/react-hooks/useexec#parseexecoutputhandler\",\"text\":\"useExec\",\"subText\":\"$undefined\",\"icon\":\"$undefined\"},\"children\":

```

--------------------------------

### Cache Class Methods for Data Management

Source: https://context7_llms

Provides an overview of the core methods available in the Cache class for managing cached data. These include getting, checking existence, setting, removing, and clearing cache entries.

```typescript
const cache = new Cache();

// Get data
const data = cache.get("myKey");

// Check if data exists
const exists = cache.has("myKey");

// Set data
cache.set("myKey", "myValue");

// Remove data
const removed = cache.remove("myKey");

// Clear all data
cache.clear();

// Clear without notifying subscribers
cache.clear({ notifySubscribers: false });
```

--------------------------------

### Get Favicon for a URL

Source: https://context7_llms

Fetches the favicon for a given URL. Supports fallback icons and specifies image size and masking options. Returns an Image.ImageLike object suitable for Raycast UI elements.

```typescript
function getFavicon(
  url: string | URL,
  options?: {
    fallback?: Image.Fallback;
    size?: boolean;
    mask?: Image.Mask;
  },
): Image.ImageLike;
```

--------------------------------

### Preview Files with Quick Look

Source: https://developers.raycast.com/api-reference/user-interface/list

This snippet explains how to preview files using Quick Look functionality within Raycast. It involves toggling the preview using Action.ToggleQuickLook.

```text
Optional information to preview files with Quick Look. Toggle the preview with Action.ToggleQuickLook.
```

--------------------------------

### Input Field Placeholder Text

Source: https://developers.raycast.com/information/manifest

Defines the placeholder text displayed in an input field when no value has been entered by the user. This is a common UI pattern for guiding user input.

```json
["$", "$1", "0", {"children": "Text displayed in the preference's field when no value has been input."}]
```

--------------------------------

### Implement Optimistic Updates and Rollback with useCachedPromise in Raycast

Source: https://context7_llms

This example shows how to implement optimistic UI updates using `mutate` with `useCachedPromise` in Raycast. It allows the UI to reflect a change immediately before server confirmation, providing a smoother user experience. An `optimisticUpdate` function modifies the local data, and `rollbackOnError` (or automatic rollback) handles potential API failures.

```tsx
import { Detail, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

export default function Command() {
  const { isLoading, data, mutate } = useCachedPromise(
    async (url: string) => {
      const response = await fetch(url);
      const result = await response.text();
      return result;
    },
    ["https://api.example"],
  );

  const appendFoo = async () => {
    const toast = await showToast({ style: Toast.Style.Animated, title: "Appending Foo" });
    try {
      await mutate(
        // we are calling an API to do something
        fetch("https://api.example/append-foo"),
        {
          // but we are going to do it on our local data right away,
          // without waiting for the call to return
          optimisticUpdate(data) {
            return data + "foo";
          },
        },
      );
      // yay, the API call worked!
      toast.style = Toast.Style.Success;
      toast.title = "Foo appended";
    } catch (err) {
      // oh, the API call didn't work :(
      // the data will automatically be rolled back to its previous value
      toast.style = Toast.Style.Failure;
      toast.title = "Could not append Foo";
      toast.message = err.message;
    }
  };

  return (
    <Detail
      isLoading={isLoading}
      markdown={data}
      actions={
        <ActionPanel>
          <Action title="Append Foo" onAction={() => appendFoo()} />
        </ActionPanel>
      }
    />
  );
}
```

--------------------------------

### Render Actions with ActionPanel in TypeScript

Source: https://developers.raycast.com/utilities/react-hooks/usecachedpromise

Shows how to use the `ActionPanel` and `Action` components to display interactive elements within a Raycast extension. This example includes an action to 'Append Foo' with an associated callback function.

```typescript
actions={
  <ActionPanel>
    <Action title="Append Foo" onAction={() => appendFoo()} />
  </ActionPanel>
}
```

--------------------------------

### Window Management API

Source: https://context7_llms

APIs for managing windows and desktops.

```APIDOC
## GET /windows/active

### Description
Retrieves a list of all windows currently open on the active desktop.

### Method
GET

### Endpoint
/windows/active

### Parameters
#### Query Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **windows** (Window[]) - An array of Window objects.

#### Response Example
```json
[
  {
    "id": "window-123",
    "active": true,
    "bounds": {
      "position": {"x": 100, "y": 100},
      "size": {"width": 800, "height": 600}
    },
    "desktopId": "desktop-abc",
    "fullScreenSettable": false,
    "positionable": true,
    "resizable": true,
    "application": {
      "bundleId": "com.raycast.mac",
      "name": "Raycast"
    }
  }
]
```

## GET /desktops

### Description
Gets the list of Desktops available across all screens.

### Method
GET

### Endpoint
/desktops

### Parameters
#### Query Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **desktops** (Desktop[]) - An array of Desktop objects.

#### Response Example
```json
[
  {
    "id": "desktop-abc",
    "screenId": "screen-1",
    "isVirtual": false
  }
]
```

## PUT /windows/{id}/bounds

### Description
Move a Window or make it fullscreen.

### Method
PUT

### Endpoint
/windows/{id}/bounds

### Parameters
#### Path Parameters
- **id** (string) - Required - The ID of the window to modify.

#### Query Parameters
None

#### Request Body
- **bounds** (object | "fullscreen") - Required - The new bounds for the window. Can be an object with `position` and `size` properties, or the string "fullscreen".
  - **position** (object) - Optional - The new position of the window.
    - **x** (number) - Optional - The new X coordinate.
    - **y** (number) - Optional - The new Y coordinate.
  - **size** (object) - Optional - The new size of the window.
    - **width** (number) - Optional - The new width.
    - **height** (number) - Optional - The new height.
- **desktopId** (string) - Optional - The ID of the desktop to move the window to.

### Request Example
```json
{
  "bounds": {
    "position": {"x": 100, "y": 100},
    "size": {"width": 800, "height": 600}
  },
  "desktopId": "desktop-abc"
}
```

### Response
#### Success Response (200)
- **message** (string) - Indicates the window bounds were updated successfully.

#### Response Example
```json
{
  "message": "Window bounds updated successfully."
}
```

### Error Handling
- **400 Bad Request**: If the provided bounds are invalid or the window cannot be moved.
- **404 Not Found**: If the specified window ID does not exist.

## Types

### Window
Represents a window from an Application on a Desktop.

#### Properties
- **id** (string) - Unique identifier for the window.
- **active** (boolean) - Indicates if the window is currently active.
- **bounds** ({ position: { x: number; y: number }; size: { height: number; width: number } } | "fullscreen") - The current bounds of the window.
- **desktopId** (string) - The ID of the desktop the window is on.
- **fullScreenSettable** (boolean) - Indicates if the window can be set to fullscreen.
- **positionable** (boolean) - Indicates if the window's position can be changed.
- **resizable** (boolean) - Indicates if the window can be resized.
- **application** (Application) - Information about the application owning the window.

### Desktop
Represents a desktop available across screens.

#### Properties
- **id** (string) - Unique identifier for the desktop.
- **screenId** (string) - The ID of the screen this desktop is associated with.
- **isVirtual** (boolean) - Indicates if the desktop is virtual.

### Application
Represents an application.

#### Properties
- **bundleId** (string) - The unique bundle identifier of the application.
- **name** (string) - The name of the application.
```

--------------------------------

### Fetch Data with useCachedPromise in TypeScript

Source: https://developers.raycast.com/utilities/react-hooks/usecachedpromise

Demonstrates how to use the `useCachedPromise` hook to fetch data asynchronously in a TypeScript Raycast extension. It handles loading states and processes JSON responses from an example API.

```typescript
const { isLoading, data } = useCachedPromise(
  async (searchText: string) => {
    const response = await fetch(`https://api.example?q=${searchText}`);
    const data = await response.json();
    return data;
  }
);
```

--------------------------------

### JSON Code Block Example

Source: https://developers.raycast.com/ai/write-evals-for-your-ai-extension

This snippet demonstrates a JSON code block, likely used for configuration or data representation within the Raycast API context. It shows the basic structure of a JSON object.

```json
{

```

--------------------------------

### Raycast Command: Grid Component Example (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/grid

This TypeScript code snippet demonstrates how to use the Grid and Grid.Item components from '@raycast/api' to display a list of items. It includes imports, the main command function, and the JSX structure for rendering the grid.

```typescript
import { Grid } from "@raycast/api";

export default function Command() {
 return (
    <Grid>
      <Grid.Item content="🥳" title="Partying Face" subtitle="Smiley" />
    </Grid>
 );
}
```

--------------------------------

### Set Description for Raycast LLM Extension

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This snippet demonstrates how to define the 'description' for an LLM extension in Raycast. This text will be displayed to users, explaining the extension's purpose. For example, 'Connect your GitHub account'.

```json
{
  "description": "Connect your GitHub account"
}
```

--------------------------------

### Provide Dark Theme Icons with @dark Suffix

Source: https://context7_llms

Enables providing separate icon assets for dark themes by appending `@dark` to the filename. For example, `icon.png` and `icon@dark.png` will be automatically used based on the system's appearance. This improves the visual consistency of extensions across different themes.

```bash
my-icon.png
my-icon@dark.png
```

--------------------------------

### Next.js Application Routing Structure

Source: https://developers.raycast.com/basics/getting-started

This JavaScript snippet outlines the dependency loading and provider setup for Next.js application routing, specifically for dynamic routes involving mode, site URL, site data, and page path. It indicates the chunks and modules required for page rendering.

```javascript
self.__next_f.push([1,"5b:I[75555,[[\"6268\",\"static/chunks/f5718501-b58a5cfb1abadce5.js\",\"2122\",\"static/chunks/9071f66d-390fafe3303b2acb.js\",\"6500\",\"static/chunks/6500-df22b4917e9f7eea.js\",\"711\",\"static/chunks/711-f01ba055e2d09f63.js\",\"9014\",\"static/chunks/9014-2de2a842f1453568.js\",\"1026\",\"static/chunks/1026-7238b3f0a07452e6.js\",\"6782\",\"static/chunks/6782-c774ebb74dd85111.js\",\"9330\",\"static/chunks/9330-58d5f2baf27a33de.js\",\"8617\",\"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/%5BpagePath%5D/page-f5ef1efb17e610fe.js\"]],\"PageContextProvider\"]\n5f:I[63644,[[\"6268\",\"static/chunks/f5718501-b58a5cfb1abadce5.js\",\"2122\",\"static/chunks/9071f66d-390fafe3303b2acb.js\",\"6500\",\"static/chunks/6500-df22b4917e9f7eea.js\",\"711\",\"static/chunks/711-f01ba055e2d09f63.js\",\"9014\",\"static/chunks/9014-2de2a842f1453568.js\",\"1026\",\"static/chunks/1026-7238b3f0a07452e6.js\",\"6782\",\"static/chunks/6782-c774ebb74dd85111.js\",\"9330\",\"static/chunks/9330-58d5f2baf27a33de.js\",\"8617\",\"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/%5BpagePath%5D/page-f5ef1efb17e610fe.js\"]],\"CurrentPageProvider\"]\n60:I[41341,[[\"6268\",\"static/chunks/f5718501-b58a5cfb1abadce5.js\",\"2122\",\"static/chunks/9071f66d-390fafe3303b2acb.js\",\"6500\",\"static/chunks/6500-df22b4917e9f7eea.js\",\"711\",\"static/chunks/711-f01ba055e2d09f63.js\",\"9014\",\"static/chunks/9014-2de2a842f1453568.js\",\"1026\",\"static/chunks/1026-7238b3f0a07452e6.js\",\"6782\",\"static/chunks/6782-c774ebb74dd85111.js\",\"9330\",\"static/chunks/9330-58d5f2baf27a33de.js\",\"8617\",\"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/%5BpagePath%5D/page-f5ef1efb17e610fe.js\"]],\"PreservePageLayout\"]\n62:I[15943,[[\"6268\","
        }
      ]
    }
  ]
}
```
```

--------------------------------

### Implement List Pagination with usePromise in TypeScript

Source: https://context7_llms

This example demonstrates how to add pagination to a Raycast List component using the `usePromise` hook from `@raycast/utils`. It requires `@raycast/api` version 1.69.0 or higher. The `usePromise` hook handles the asynchronous data fetching and pagination logic, simplifying the implementation.

```typescript
import { setTimeout } from "node:timers/promises";
import { useState } from "react";
import { List } from "@raycast/api";
import { usePromise } from "@raycast/utils";

export default function Command() {
  const [searchText, setSearchText] = useState("");

  const { isLoading, data, pagination } = usePromise(
    (searchText: string) => async (options: { page: number }) => {
      await setTimeout(200);
      const newData = Array.from({ length: 25 }, (_v, index) => ({
        index,
        page: options.page,
        text: searchText,
      }));
      return { data: newData, hasMore: options.page < 10 };
    },
    [searchText]
  );

  return (
    <List isLoading={isLoading} onSearchTextChange={setSearchText} pagination={pagination}>
      {data?.map((item) => (
        <List.Item
          key={`${item.page} ${item.index} ${item.text}`}
          title={`Page ${item.page} Item ${item.index}`}
          subtitle={item.text}
        />
      ))}
    </List>
  );
}
```

--------------------------------

### Log Action Event Type in Menu Bar

Source: https://developers.raycast.com/api-reference/menu-bar-commands

This example demonstrates how to log the type of an action event when a menu bar item is clicked. It uses `MenuBarExtra.ActionEvent` and `console.log`.

```typescript
import { MenuBarExtra } from "@raycast/api";

export default function Command() {
  return (
    <MenuBarExtra>
      <MenuBarExtra.Item
        title="Log Action Event Type"
        onAction={(event: MenuBarExtra.ActionEvent) => console.log("Action Event Type", event.type)}
      />
    </MenuBarExtra>
  );
}
```

--------------------------------

### Initialize Linear SDK Client (TypeScript)

Source: https://developers.raycast.com/utilities/oauth/withaccesstoken

This code sets up the Linear SDK client for use within a Raycast command. It utilizes `OAuthService.linear` from `@raycast/utils` for authentication and imports `LinearClient` and `LinearGraphQLClient` from `@linear/sdk`. The `linearClient` is initialized lazily.

```typescript
import { OAuthService } from "@raycast/utils";
import { LinearClient, LinearGraphQLClient } from "@linear/sdk";

let linearClient: LinearClient | null = null;

const linear = OAuthService.linear({
  scope: "read write",
});
```

--------------------------------

### Import AI and Finder Functions in JavaScript

Source: https://developers.raycast.com/api-reference/ai

This snippet demonstrates how to import necessary AI and finder-related functions from a library. It includes importing AI functionalities and a function to get selected finder items, along with a function to show the HUD.

```javascript
import {
  AI,
  getSelectedFinderItems,
  showHUD
} from "@raycast/utils";
```

--------------------------------

### JavaScript AsyncState and Revalidation Example

Source: https://developers.raycast.com/utilities/react-hooks/useexec

This snippet demonstrates the usage of 'AsyncState' for managing asynchronous operations and 'revalidate' for refreshing data. It's typically used in frontend frameworks to handle data fetching and state updates.

```javascript
self.__next_f.push([
  1,
  "cc:[\"$\",\"span\",\"21\",{\"className\":\"highlight-line\",\"style\":\"$undefined\",\"children\":[false,[\"$\",\"span\",null,{\"className\":\"highlight-line-content\",\"children\":[[[\"$\",\"span\",\"0\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" \"}],[\"$\",\"span\",\"1\",{\"style\":{\"color\":\"light-dark(rgb(var(--primary-10)), rgb(var(--primary-11)))\",\"--shiki-light\":\"rgb(var(--primary-10))\",\"--shiki-dark\":\"rgb(var(--primary-11))\"},\"children\":\"revalidate\"}],[\"$\",\"span\",\"2\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-11)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-11))\"},\"children\":\":\"}],[\"$\",\"span\",\"3\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" \"}],[\"$\",\"span\",\"4\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\"()\"}],[\"$\",\"span\",\"5\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" \"}],[\"$\",\"span\",\"6\",{\"style\":{\"color\":\"light-dark(rgb(var(--danger-10)), rgb(var(--danger-11)))\",\"--shiki-light\":\"rgb(var(--danger-10))\",\"--shiki-dark\":\"rgb(var(--danger-11))\"},\"children\":\"=\u003e\"}],[\"$\",\"span\",\"7\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" \"}],[\"$\",\"span\",\"8\",{\"style\":{\"color\":\"light-dark(rgb(var(--warning-10)), rgb(var(--warning-11)))\",\"--shiki-light\":\"rgb(var(--warning-10))\",\"--shiki-dark\":\"rgb(var(--warning-11))\"},\"children\":\"void\"}],[\"$\",\"span\",\"9\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" \"}]],\"\\n\"]}]],\"\\n\"]}]

```

--------------------------------

### Displaying Item Title Text in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/detail

This code example shows how to display the descriptive text associated with a title in Raycast. It's used to provide context or a label for a specific UI element.

```typescript
self.__next_f.push([1, "c9: [\"$\", \"div\", null, {\"aria-labelledby\": \"$undefined\", \"className\": \"blocks w-full space-y-2 lg:space-y-3 leading-normal self-center **:text-left text-left\", \"children\": [[\"$\", \"p\", \"GH5N0xfO9TgF\", {\"className\": \"has-[.button,input]:flex has-[.button,input]:flex-wrap has-[.button,input]:gap-2 has-[.button,input]:items-center mx-auto page-width-wide:mx-0 decoration-primary/6 print:break-inside-avoid w-full max-w-[unset] text-start self-start justify-start\", \"children\": [[\"$\", \"$1\", \"e6iYoRQnQxhr\", {\"children\": [[\"$\", \"$1\", \"0\", {\"children\": \"The title shown above the item.\"}]]}]]}]]}]\n"])
```

--------------------------------

### Navigate to useFetch Utility in React

Source: https://developers.raycast.com/utilities/react-hooks/useform

This snippet represents a navigation link within a React application, directing users to the 'useFetch' utility hook documentation. It includes styling for visual presentation and an 'insights' object for tracking link clicks, common in analytics-driven platforms.

```jsx
<div
  href="/utilities/react-hooks/usefetch"
  insights={{
    type: "link_click",
    link: {
      target: {
        kind: "page",
        page: "wtmD4cCgvjT6rqAB4vq9",
      },
      position: "content",
    },
  }}
  className='group text-sm p-2.5 flex gap-4 flex-1 flex-row-reverse items-center pl-4 border border-tint-subtle rounded-sm circular-corners:rounded-2xl straight-corners:rounded-none hover:border-primary text-pretty md:p-4 md:text-base'
>
  <span className='flex flex-col flex-1 text-right'>
    <span className='text-xs'>Previous</span>
    <span className='text-tint-strong group-hover:text-primary line-clamp-2'>
      useFetch
    </span>
  </span>
  <span
    icon='chevron-left'
    className='hidden size-4 text-tint-subtle contrast-more:text-tint-strong group-hover:text-primary md:block'
  />
</div>
```

--------------------------------

### Set and Get String Item in LocalStorage (TypeScript)

Source: https://developers.raycast.com/api-reference/storage

Demonstrates how to set a string value in LocalStorage and then retrieve it. This is useful for persisting user preferences or temporary data within a Raycast extension.

```typescript
await LocalStorage.setItem("favorite-fruit", "banana");
console.log(await LocalStorage.getItem<string>("favorite-fruit"));
```

--------------------------------

### Optimistic UI Updates with Rollback in Raycast (TypeScript)

Source: https://context7_llms

This example showcases how to implement optimistic UI updates using the `mutate` function from `usePromise`. It allows the UI to reflect a change immediately while an asynchronous operation is in progress, with an option to automatically roll back if the operation fails.

```tsx
import { Detail, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import { usePromise } from "@raycast/utils";

export default function Command() {
  const { isLoading, data, mutate } = usePromise(
    async (url: string) => {
      const response = await fetch(url);
      const result = await response.text();
      return result;
    },
    ["https://api.example"],
  );

  const appendFoo = async () => {
    const toast = await showToast({ style: Toast.Style.Animated, title: "Appending Foo" });
    try {
      await mutate(
        // we are calling an API to do something
        fetch("https://api.example/append-foo"),
        {
          // but we are going to do it on our local data right away,
          // without waiting for the call to return
          optimisticUpdate(data) {
            return data + "foo";
          },
        },
      );
      // yay, the API call worked!
      toast.style = Toast.Style.Success;
      toast.title = "Foo appended";
    } catch (err) {
      // oh, the API call didn't work :(
      // the data will automatically be rolled back to its previous value
      toast.style = Toast.Style.Failure;
      toast.title = "Could not append Foo";
      toast.message = err.message;
    }
  };

  return (
    <Detail
      isLoading={isLoading}
      markdown={data}
      actions={
        <ActionPanel>
          <Action title="Append Foo" onAction={() => appendFoo()} />
        </ActionPanel>
      }
    />
  );
}
```

--------------------------------

### Basic Raycast Grid Layout with Columns and Inset (JSX)

Source: https://developers.raycast.com/api-reference/user-interface/grid

This example demonstrates a simple Raycast Grid with a specified number of columns and an inset. It displays two Grid.Item components, each with a simple emoji as content. This is useful for creating visually distinct grid arrangements.

```jsx
import { Grid } from "@raycast/api";
    
    export default function Command() {
      return (
        <Grid columns={8} inset={Grid.Inset.Large}>
          <Grid.Item content="🥳" />
          <Grid.Item content="🙈" />
        </Grid>
      );
    }

```

--------------------------------

### Get Access Token Utility Function (TypeScript)

Source: https://context7_llms

Provides a utility function `getAccessToken` to retrieve authentication tokens within a component. This function must be used within a component already wrapped by `withAccessToken`.

```tsx
import { Detail } from "@raycast/api";
import { authorize } from "./oauth";

function AuthorizedComponent() {
  const { token } = getAccessToken();
  return <Detail markdown={`Access token: ${token}`} />;
}

export default withAccessToken({ authorize })(AuthorizedComponent);
```

--------------------------------

### Arguments Configuration and Access

Source: https://developers.raycast.com/information/arguments

This section explains how to define arguments in your command's manifest and how to access their values within your command's code.

```APIDOC
## Arguments API Documentation

### Description
Raycast allows commands to accept arguments, which users can provide directly from the Root Search before launching a command. This enhances user experience by allowing immediate input.

### Method
N/A (Configuration and code access)

### Endpoint
N/A

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
Arguments are configured in the `manifest.json` file under the `argumentProperties` for each command.

**Argument Properties:**
- **type** (string) - Required - The type of the argument (e.g., `text`, `password`, `dropdown`).
- **placeholder** (string) - Optional - Placeholder text for the argument input.
- **choices** (array) - Optional - For `dropdown` type, an array of choices.
- **name** (string) - Required - The name of the argument.
- **required** (boolean) - Optional - Whether the argument is required.

### Request Example
```json
{
  "commands": [
    {
      "name": "myCommand",
      "title": "My Command",
      "description": "A command that accepts arguments.",
      "argumentProperties": [
        {
          "name": "query",
          "type": "text",
          "placeholder": "Enter your query",
          "required": true
        },
        {
          "name": "mode",
          "type": "dropdown",
          "placeholder": "Select a mode",
          "choices": [
            {"value": "fast", "title": "Fast Mode"},
            {"value": "accurate", "title": "Accurate Mode"}
          ],
          "required": false
        }
      ]
    }
  ]
}
```

### Response
#### Success Response (200)
Arguments are accessed via the `arguments` prop within the command's `LaunchProps`. The type of the value depends on the argument's `type`.

- **text** (string) - The string value entered by the user.
- **password** (string) - The string value entered by the user (masked).
- **dropdown** (string) - The string value of the selected choice.

#### Response Example
```json
// Inside your command's code:

import { LaunchProps } from '@raycast/api';

interface Arguments {
  query: string;
  mode?: string; // Optional argument
}

export default function Command(props: LaunchProps<{ arguments: Arguments }>) {
  const { query, mode } = props.arguments;

  // Use query and mode here
  console.log(`Query: ${query}, Mode: ${mode}`);

  return null; // Or your command's UI
}
```

### Error Handling
- **Maximum number of arguments:** 3. For more, contact Raycast support.
- The order of arguments in the manifest determines their display order in Root Search. Place required arguments before optional ones for better UX.
```

--------------------------------

### Lazy Loading Submenu Content with onOpen

Source: https://developers.raycast.com/api-reference/user-interface/action-panel

Demonstrates how to lazily fetch submenu content when the submenu is opened using the `onOpen` callback. This is useful for improving performance by only loading data when it's actually needed. The example shows a React component that fetches submenu content and updates its state.

```javascript
function LazySubmenu() {
  const [content, setContent] = useState(null)
  return (
    <ActionPanel.Submenu onOpen={() => fetchSubmenuContent().then(setContent)}>
      {content}
    </ActionPanel.Submenu>
  )
}
```

--------------------------------

### Implement Copy to Clipboard Action in TypeScript

Source: https://context7_llms

Shows how to use the Action.CopyToClipboard component within a Raycast ActionPanel. This action allows users to copy specified content to their clipboard with a keyboard shortcut. The example uses a Detail view to present information and trigger the copy action.

```typescript
import { ActionPanel, Action, Detail } from "@raycast/api";

export default function Command() {
  return (
    <Detail
      markdown="Press `⌘ + .` and share some love."
      actions={
        <ActionPanel>
          <Action.CopyToClipboard content="I ❤️ Raycast" shortcut={{ modifiers: ["cmd"], key: "." }} />
        </ActionPanel>
      }
    />
  );
}
```

--------------------------------

### Parameters for `withAccessToken`

Source: https://context7_llms

Details the configuration options for the `withAccessToken` higher-order function. This includes functions to initiate authorization, optional personal access tokens, PKCE client instances, and callbacks for post-authorization.

```typescript
interface WithAccessTokenParameters {
  authorize: () => Promise<string>;
  personalAccessToken?: string;
  client?: PKCEClient;
  onAuthorize?: (token: string, type: "oauth" | "personal", idToken?: string) => void;
}
```

--------------------------------

### Raycast List Component with TSX

Source: https://developers.raycast.com/utilities/react-hooks/usepromise

This example demonstrates a basic Raycast UI component using TSX. It imports necessary modules from `react`, `node:timers/promises`, and `@raycast/api`. The code sets up imports for asynchronous operations and Raycast's List component.

```tsx
import { setTimeout } from "node:timers/promises";
import { useState } from "react";
import { List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
```

--------------------------------

### Uncontrolled File Picker with Multiple Selections in TypeScript

Source: https://context7_llms

This example shows an uncontrolled file picker that allows multiple file selections. It filters the selected items to ensure they exist and are files before logging them. It uses the `@raycast/api` and `fs` modules.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";
import fs from "fs";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Submit Name"
            onSubmit={(values: { files: string[] }) => {
              const files = values.files.filter((file: any) => fs.existsSync(file) && fs.lstatSync(file).isFile());
              console.log(files);
            }}
          />
        </ActionPanel>
      }
    >
      <Form.FilePicker id="files" />
    </Form>
  );
}
```

--------------------------------

### Raycast Extension List Item Formatting Example

Source: https://developers.raycast.com/api-reference/user-interface/grid

This snippet illustrates the structure for a list item within a Raycast extension. It includes elements for icons, text, and potentially interactive components, formatted using a combination of HTML-like structure and CSS classes.

```jsx
self.__next_f.push([1,"c9:[\"$\",\"li\",\"1e8b9a909e5b429193b05841e260166d\",{\"className\":\"leading-normal flex items-start\",\"children\":[[\"$\",\"div\",null,{\"className\":\"text-base leading-normal mr-1 flex min-h-lh min-w-6 items-center justify-center text-tint\",\"children\":[\"$\",\"div\",null,{\"className\":\"before:font-var before:content-(--pseudoBefore--content)\",\"style\":{\"--pseudoBefore--content\":\"'•'\",\"--font-family\":\"Arial\",\"fontSize\":\"min(1.5em, 24px)\",\"lineHeight\":1}}]},[\"$\",\"div\",null,{\"className\":\"flex min-w-0 flex-1 flex-col space-y-2\",\"children\":[[\"$\",\"p\",\"6950d033e7f54c80a1ffc84e0e0cc022\",{\"className\":\"has-[.button,input]:flex has-[.button,input]:flex-wrap has-[.button,input]:gap-2 has-[.button,input]:items-center page-width-wide:mx-0 w-full decoration-primary/6 max-w-3xl print:break-inside-avoid min-h-lh [h2]:pt-0 [h3]:pt-0 [h4]:pt-0 mx-0 text-start self-start justify-start\",\"children\":[[\"$\",\"$1\",\"4816ad332dde4987bb13dc09f6854e3a\",{\"children\":[[\"$\",\"$1\",\"0\",{\"children\":\"removing the \"}]]}]]}]]}\n"])
```

--------------------------------

### Initialize Open Toggles and Handle URLs (JavaScript)

Source: https://manual.raycast.com/extensions

This script initializes functionality for 'opentoggles' and handles different URL patterns for a given base URL. It checks the document's ready state before executing initialization functions and differentiates between the root URL and subpages.

```javascript
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

function init() {
  console.log("Init opentoggles");

  const baseUrl = "https://manual.raycast.com";
  const currentUrl = window.location.href;
  const rootUrlPattern = new RegExp(`^${baseUrl}/?(#.*)?$`);

  if (rootUrlPattern.test(currentUrl)) {
    handleRootUrl();
    console.log("handle root");
  } else if (currentUrl.startsWith(baseUrl)) {
    handleSubpages();
    console.log("handle sub");
  }

  // Initialize link icons
  console.log("About to initialize link icons in 500ms");
  setTimeout(() => {
    console.log("No
```

--------------------------------

### Display Grid Items with Raycast API

Source: https://developers.raycast.com/api-reference/user-interface/grid

Demonstrates how to render a list of items within a Raycast Grid component. Each item has content and a title. This is a foundational example for displaying data in a grid format.

```javascript
import { Grid } from "@raycast/api";

const items = [
  { content: "🙈", keywords: ["see-no-evil", "monkey"] },
  { content: "🥳", keywords: ["partying", "face"] },
];

export default function Command() {
  return (
    <Grid
      columns={5}
      inset={Grid.Inset.Large}
      navigationTitle="Search Emoji"
      searchBarPlaceholder="Search your favorite emoji"
    >
      {items.map((item) => (
        <Grid.Item key={item.content} content={item.content} keywords={item.keywords} />
      ))}
    </Grid>
  );
}
```

--------------------------------

### TypeScript: Basic LLM Command Structure

Source: https://developers.raycast.com/information/best-practices

This snippet demonstrates the fundamental structure of a Raycast command that utilizes LLM capabilities. It includes necessary imports for Raycast API and React hooks, along with state management for items. This is a starting point for building LLM-powered commands.

```typescript
import { List } from "@raycast/api";
import { useEffect, useState } from "react";

export default function Command() {
  const [items, setItems] = useState<string[]>();

  useEffect(() => {
    setTimeout(() => {

```

--------------------------------

### OAuth PKCEClient Options

Source: https://developers.raycast.com/api-reference/oauth

Defines the configuration options for creating a PKCEClient. This includes the provider's name, redirect method, an optional description, provider icon, and an optional provider ID.

```typescript
interface PKCEClientOptions {
  providerName: string;
  redirectMethod: OAuth.RedirectMethod;
  description?: string;
  providerIcon?: Image.ImageLike;
  providerId?: string;
}
```

--------------------------------

### Show Failure Toast - JavaScript Example

Source: https://developers.raycast.com/utilities/functions/showfailuretoast

Demonstrates how to use the `showFailureToast` function in JavaScript to display a failure message. This function is part of the Raycast API and is typically used within Raycast extensions.

```javascript
import { showFailureToast } from '@raycast/api';

async function handleAction() {
  try {
    // Some operation that might fail
    await performOperation();
  } catch (error) {
    await showFailureToast({
      title: 'Operation Failed',
      message: error.message,
    });
  }
}
```

--------------------------------

### Initialize Google Analytics Boot Data

Source: https://www.raycast.com/community

Sets initial configuration for Google Analytics, including language preferences and job board tokens. This script runs directly on page load to prepare analytics tracking.

```javascript
GA.boot_data.is_german = false;
GA.boot_data.is_french = false;
GA.boot_data.is_japanese = false;
GA.boot_data.is_portuguese = false;
GA.boot_data.job_board_token = "slack";
GA.boot_data.zd_locale = "en-us";
```

--------------------------------

### Optional Tag Text for LLM

Source: https://developers.raycast.com/api-reference/user-interface/list

This example shows how to define optional tag text for an LLM, specifying that it's required if the tag has certain properties. This is useful for structured LLM inputs or outputs where tags need specific attributes.

```text
The optional tag text. Required if the tag has n
```

--------------------------------

### Define LLM Actions in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/navigation

This snippet demonstrates how to define actions for LLM integrations within Raycast. It includes examples of action titles and the `onAction` handler, which is crucial for triggering LLM functionalities.

```typescript
self.__next_f.push([
  1,
  "95:[\"$\",\"span\",\"7\",{\"className\":\"highlight-line\",\"style\":\"$undefined\",\"children\":[false,[\"$\",\"span\",null,{\"className\":\"highlight-line-content\",\"children\":[[[\"$\",\"span\",\"0\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" markdown\"}],[\"$\",\"span\",\"1\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-11)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-11))\"},\"children\":\"=\"}]},\"\\n\"}]}]}]\n"
]);
self.__next_f.push([
  1,
  "96:[\"$\",\"span\",\"8\",{\"className\":\"highlight-line\",\"style\":\"$undefined\",\"children\":[false,[\"$\",\"span\",null,{\"className\":\"highlight-line-content\",\"children\":[[[\"$\",\"span\",\"0\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" actions\"}],[\"$\",\"span\",\"1\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-11)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-11))\"},\"children\":\"=\"}]},\"\\n\"}]}]}]\n"
]);
self.__next_f.push([
  1,
  "97:[\"$\",\"span\",\"9\",{\"className\":\"highlight-line\",\"style\":\"$undefined\",\"children\":[false,[\"$\",\"span\",null,{\"className\":\"highlight-line-content\",\"children\":[[[\"$\",\"span\",\"0\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" <ActionPanel>\"}]]},\"\\n\"}]}]}]\n"
]);
self.__next_f.push([
  1,
  "98:[\"$\",\"span\",\"10\",{\"className\":\"highlight-line\",\"style\":\"$undefined\",\"children\":[false,[\"$\",\"span\",null,{\"className\":\"highlight-line-content\",\"children\":[[[\"$\",\"span\",\"0\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" <Action title\"}],[\"$\",\"span\",\"1\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-11)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-11))\"},\"children\":\"=\"}]],[\"$\",\"span\",\"2\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\"\\\"\"}],[\"$\",\"span\",\"3\",{\"style\":{\"color\":\"light-dark(rgb(var(--success-10)), rgb(var(--success-11)))\",\"--shiki-light\":\"rgb(var(--success-10))\",\"--shiki-dark\":\"rgb(var(--success-11))\"},\"children\":\"Push\"}],[\"$\",\"span\",\"4\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\"\\\"\"}],[\"$\",\"span\",\"5\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-12)), rgb(var(--tint-12)))\",\"--shiki-light\":\"rgb(var(--tint-12))\",\"--shiki-dark\":\"rgb(var(--tint-12))\"},\"children\":\" onAction\"}],[\"$\",\"span\",\"6\",{\"style\":{\"color\":\"light-dark(rgb(var(--tint-11)), rgb(var(--tint-11)))\",\"--shiki-light\":\"rgb(var(--tint-11))\",\"--shiki-dark\":\"rgb(var(--tint-11))\"},\"children\":

```

--------------------------------

### Basic Raycast Command with LocalStorage (TypeScript)

Source: https://developers.raycast.com/api-reference/storage

This is a fundamental Raycast command implemented in TypeScript. It imports the `LocalStorage` module and demonstrates setting a key-value pair ('favorite-fruit' to 'apple') upon execution. This serves as a starting point for more complex commands.

```typescript
import { LocalStorage } from "@raycast/api";

export default async function Command() {
  await LocalStorage.setItem("favorite-fruit", "apple");
}

```

--------------------------------

### Show Failure Toast - TypeScript Example

Source: https://developers.raycast.com/utilities/functions/showfailuretoast

Illustrates the usage of the `showFailureToast` function in TypeScript, highlighting type safety. This function is essential for providing user feedback on errors within Raycast extensions.

```typescript
import { showFailureToast, Toast } from '@raycast/api';

async function processData() {
  try {
    // Process data logic
    const result = await fetchData();
    if (!result) {
      throw new Error('Failed to fetch data');
    }
  } catch (error: any) {
    await showFailureToast({
      title: 'Data Processing Error',
      message: error.message,
      state: Toast.State.Failure
    });
  }
}
```

--------------------------------

### Console Logging for Debugging in Raycast Extensions

Source: https://context7_llms

Examples of using the `console` object for debugging in Raycast extensions. These logs appear in the terminal during development mode. Supported methods include `log`, `debug`, and `error`. Console logging is automatically disabled for store extensions.

```typescript
console.log("Hello World"); // Prints: Hello World

const name = "Thomas";
console.debug(`Hello ${name}`); // Prints: Hello Thomas

const error = new Error("Boom 💥");
console.error(error); // Prints: Boom 💥
```

--------------------------------

### Define AI Evals with Nested Tool Call Arguments

Source: https://context7_llms

Configures an AI eval to test nested tool call arguments. This example checks if the 'create-comment' tool is called with a specific 'issueId' and if the 'body' argument includes the text 'waiting for design'.

```json
{
  "ai": {
    "evals": [
      {
        "expected": [
          {
            "callsTool": {
              "name": "create-comment",
              "arguments": {
                "issueId": "ISS-1",
                "body": {
                  "includes": "waiting for design"
                }
              }
            }
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### Controlled Dropdown Example

Source: https://context7_llms

Illustrates a controlled Form.Dropdown component using React's useState hook in TypeScript. The dropdown's value is managed by component state, and changes are handled via the onChange prop.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [programmingLanguage, setProgrammingLanguage] = useState<string>("typescript");

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Favorite" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.Dropdown
        id="dropdown"
        title="Favorite Language"
        value={programmingLanguage}
        onChange={setProgrammingLanguage}
      >
        <Form.Dropdown.Item value="cpp" title="C++" />
        <Form.Dropdown.Item value="javascript" title="JavaScript" />
        <Form.Dropdown.Item value="ruby" title="Ruby" />
        <Form.Dropdown.Item value="python" title="Python" />
        <Form.Dropdown.Item value="swift" title="Swift" />
        <Form.Dropdown.Item value="typescript" title="TypeScript" />
      </Form.Dropdown>
    </Form>
  );
}
```

--------------------------------

### Fetch Notes from Local SQLite Database using Raycast Utils

Source: https://developers.raycast.com/utilities/react-hooks/usesql

This JavaScript snippet demonstrates how to fetch notes from a local SQLite database using the `useSQL` hook from `@raycast/utils`. It requires the database path and a SQL query as input and displays the notes in a Raycast List component. Error handling for permissions is included.

```javascript
import {
  useSQL
} from "@raycast/utils";
import {
  resolve
} from "path";
import {
  homedir
} from "os";

const NOTES_DB = resolve(homedir(), "Library/Group Containers/group.com.apple.notes/NoteStore.sqlite");
const notesQuery = `SELECT id, title FROM ...`;
type NoteItem = {
  id: string;
  title: string;
};

export default function Command() {
  const { isLoading, data, permissionView } = useSQL<NoteItem>(NOTES_DB, notesQuery);

  if (permissionView) {
    return permissionView;
  }

  return (
    <List isLoading={isLoading}>
      {(data || []).map((item) => (
        <List.Item key={item.id} title={item.title} />
      ))}
    </List>
  );
}
```

--------------------------------

### Uncontrolled Dropdown Form Item

Source: https://context7_llms

An example of an uncontrolled dropdown form item in Raycast, allowing users to select a favorite emoji from a predefined list. The selected value is logged to the console upon form submission.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Favorite" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="emoji" title="Favorite Emoji" defaultValue="lol">
        <Form.Dropdown.Item value="poop" title="Pile of poop" icon="💩" />
        <Form.Dropdown.Item value="rocket" title="Rocket" icon="🚀" />
        <Form.Dropdown.Item value="lol" title="Rolling on the floor laughing face" icon="🤣" />
      </Form.Dropdown>
    </Form>
  );
}
```

--------------------------------

### Action.PickDate

Source: https://context7_llms

Action to pick a date. It accepts optional title, icon, and shortcut props.

```APIDOC
## Action.PickDate

### Description
Action to pick a date.

### Method
N/A (Component within ActionPanel)

### Endpoint
N/A

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
```typescript
import { ActionPanel, List, Action } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item
        title="Todo"
        actions={
          <ActionPanel>
            <Action.PickDate title="Set Due Date…" />
          </ActionPanel>
        }
      />
    </List>
  );
}
```

### Response
#### Success Response (200)
N/A (This is a UI component)

#### Response Example
N/A
```

--------------------------------

### Configure Slack OAuth Service in JavaScript

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This JavaScript code demonstrates the setup for the Slack OAuth service in Raycast LLMs. It utilizes the `OAuthService.slack` method, which takes `ProviderWithDefaultClientOptions` and allows specifying scopes, such as 'emoji:read' for reading emoji data.

```javascript
OAuthService.slack: (options: ProviderWithDefaultClientOptions) => OAuthService

const slack = OAuthService.slack({ scope: "emoji:read" });
```

--------------------------------

### Create a Form with Dropdown in TypeScript

Source: https://context7_llms

This example demonstrates how to create a form with a dropdown menu using the Raycast API in TypeScript. It includes sections for different categories of items and allows users to select one option. The selected value is logged to the console upon form submission.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Favorite" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="food" title="Favorite Food">
        <Form.Dropdown.Section title="Fruits">
          <Form.Dropdown.Item value="apple" title="Apple" icon="🍎" />
          <Form.Dropdown.Item value="banana" title="Banana" icon="🍌" />
        </Form.Dropdown.Section>
        <Form.Dropdown.Section title="Vegetables">
          <Form.Dropdown.Item value="broccoli" title="Broccoli" icon="🥦" />
          <Form.Dropdown.Item value="carrot" title="Carrot" icon="🥕" />
        </Form.Dropdown.Section>
      </Form.Dropdown>
    </Form>
  );
}
```

--------------------------------

### Implement Optimistic Updates and Rollbacks with Raycast Hooks

Source: https://context7_llms

Shows how to use `optimisticUpdate` and `rollbackOnError` with `useFetch` to provide a responsive user experience. The UI updates immediately, and data is automatically rolled back if the asynchronous operation fails.

```tsx
import { Detail, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import { useFetch } from "@raycast/utils";

export default function Command() {
  const { isLoading, data, revalidate } = useExec("brew", ["info", "--json=v2", "--installed"]);
  const results = useMemo<{}[]>(() => JSON.parse(data || "[]"), [data]);

  const installFoo = async () => {
    const toast = await showToast({ style: Toast.Style.Animated, title: "Installing Foo" });
    try {
      await mutate(
        // we are calling an API to do something
        installBrewCask("foo"),
        {
          // but we are going to do it on our local data right away,
          // without waiting for the call to return
          optimisticUpdate(data) {
            return data?.concat({ name: "foo", id: "foo" });
          },
        },
      );
      // yay, the API call worked!
      toast.style = Toast.Style.Success;
      toast.title = "Foo installed";
    } catch (err) {
      // oh, the API call didn't work :(
      // the data will automatically be rolled back to its previous value
      toast.style = Toast.Style.Failure;
      toast.title = "Could not install Foo";
      toast.message = err.message;
    }
  };

  return (
    <List isLoading={isLoading}>
      {(data || []).map((item) => (
        <List.Item
          key={item.id}
          title={item.name}
          actions={
            <ActionPanel>
              <Action title="Install Foo" onAction={() => installFoo()} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
```

--------------------------------

### Raycast LLMs Success State Example

Source: https://developers.raycast.com/utilities/react-hooks/usecachedpromise

This code snippet demonstrates the success state for Raycast LLMs. It shows how to represent a successful API response, including setting isLoading to false and providing data. This is useful for updating the UI to display fetched information.

```javascript
// Success State
{
 isLoading: false,
 data: T,
 error: undefined
}
```

--------------------------------

### Using Built-in Raycast Icons (TypeScript)

Source: https://context7_llms

Illustrates how to use the predefined `Icon` constants provided by the Raycast API for list items and actions.

```typescript
import { Icon, List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item title="Icon" icon={Icon.Circle} />
    </List>
  );
}
```

--------------------------------

### OAuth.PKCEClient.Options

Source: https://developers.raycast.com/api-reference/oauth

Options for creating a new PKCEClient for OAuth flows.

```APIDOC
## OAuth.PKCEClient.Options

### Description
The options for creating a new [PKCEClient](/api-reference/oauth#oauth.pkceclient).

### Properties

- **providerName** (string) - Required - The name of the provider, displayed in the OAuth overlay.
- **redirectMethod** (OAuth.RedirectMethod) - Required - The redirect method for the OAuth flow. Make sure to set this to the correct method for the provider, see OAuth.RedirectMethod for more information.
- **description** (string) - Optional - An optional description, shown in the OAuth overlay. You can use this to customize the message for the end user, for example for handling scope changes or other migrations. Raycast shows a default message if this is not configured.
- **providerIcon** (Image.ImageLike) - Optional - An icon displayed in the OAuth overlay. Make sure to provide at least a size of 64x64 pixels.
- **providerId** (string) - Optional - An optional ID for associating the client with a provider. Only set this if you use multiple different clients in your extension.
```

--------------------------------

### Adding a Comment in JavaScript

Source: https://developers.raycast.com/api-reference/clipboard

This code snippet shows how to add a single-line comment in JavaScript. Comments are used to explain code and are ignored by the interpreter. This example specifically includes a comment indicating a copy operation.

```javascript
// copy some text
```

--------------------------------

### Add a link accessory to a form in TypeScript

Source: https://context7_llms

This example shows how to add a Form.LinkAccessory to a Raycast form, allowing users to navigate to a specified URL. The form includes a text field and a submit action. The LinkAccessory is configured with a target URL and display text.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";

export default function Command() {
  return (
    <Form
      searchBarAccessory={
        <Form.LinkAccessory
          target="https://developers.raycast.com/api-reference/user-interface/form"
          text="Open Documentation"
        />
      }
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Name" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.TextField id="name" defaultValue="Steve" />
    </Form>
  );
}
```

--------------------------------

### Configure AI Instructions in package.json

Source: https://context7_llms

Defines general instructions for the AI extension to follow, ensuring consistency across conversations. These instructions should focus on the specifics of the extension and avoid conflicting with other AI extensions.

```json
{
  "ai": {
    "instructions": "When you don't know the user's first name, ask for it."
  }
}
```

--------------------------------

### Action.ToggleQuickLook

Source: https://developers.raycast.com/api-reference/user-interface/actions

An action that toggles the Quick Look feature to preview a file.

```APIDOC
## POST /actions/toggle-quicklook

### Description
Action that toggles the Quick Look to preview a file.

### Method
POST

### Endpoint
/actions/toggle-quicklook

### Parameters
#### Request Body
(No specific request body parameters mentioned for this action in the provided text.)
```

--------------------------------

### Stream AI Answer to File (TypeScript)

Source: https://developers.raycast.com/api-reference/ai

Illustrates how to stream the AI's response incrementally and write it to a file. This example uses the `on('data')` event to process the streamed data and `fs.promises.writeFile` to save it, providing user feedback with `showHUD` upon completion.

```typescript
import {
  AI,
  getSelectedFinderItems,
  showHUD
} from "@raycast/api";
import fs from "fs";

export default async function main() {
  let allData = "";
  const [file] = await getSelectedFinderItems();

  const answer = AI.ask("Suggest 5 jazz songs");

  // Listen to "data" event to stream the answer
  answer.on("data", async (data) => {
    allData += data;
    await fs.promises.writeFile(`${file.path}`, allData.trim(), "utf-8");
  });

  await answer;

  await showHUD("Done!");
}
```

--------------------------------

### Raycast Action: SubmitForm (JavaScript)

Source: https://developers.raycast.com/information/best-practices

Example of defining a form submission action within a Raycast extension. This snippet demonstrates how to structure an action that can receive user input via a form.

```javascript
Action.SubmitForm({
  title: "Submit Form",
  description: "Submit data to the LLM.",
  fields: [
    {
      name: "prompt",
      label: "Prompt",
      type: "text",
      placeholder: "Enter your prompt here"
    }
  ],
  onSubmit: async (values) => {
    console.log("Form submitted with values:", values);
    // Add logic here to process the form submission, e.g., send to an LLM API
  }
});
```

--------------------------------

### Launch Other Commands

Source: https://context7_llms

Commands can now launch other commands within the same extension using the new `launchCommand` method. This enables interactions like updating menu bar commands from view commands.

```APIDOC
## `launchCommand` Method

### Description
Allows a command to programmatically launch another command within the same extension.

### Method
`launchCommand(commandName: string, launchType?: LaunchType)`

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
- **commandName** (string) - Required - The name of the command to launch.
- **launchType** (LaunchType) - Optional - Specifies how the command should be launched (e.g., `LaunchType.Background`, `LaunchType.UserInitiated`).

### Request Example
```javascript
import { launchCommand, LaunchType } from '@raycast/api';

// Launch another command in the background
await launchCommand({
  name: 'refreshData',
  type: LaunchType.Background
});

// Launch another command and open its window
await launchCommand({
  name: 'openSettings'
});
```

### Response
N/A

#### Success Response (200)
N/A

#### Response Example
N/A
```

--------------------------------

### AI Chat Suggested Questions and Search Results

Source: https://developers.raycast.com/utilities/react-hooks/useexec

Contains localized strings for suggested questions that the AI assistant can ask and for displaying search results. This helps guide user interaction and provides context for AI-generated responses.

```json
{
  "ai_chat_suggested_questions_title": "Suggested questions",
  "ai_chat_suggested_questions_about_this_page": "What is this page about?",
  "ai_chat_suggested_questions_read_next": "What should I read next?",
  "ai_chat_suggested_questions_example": "Can you give an example?",
  "searched_for": "Searched for ${1}"
}
```

--------------------------------

### Raycast API: Toggle Quick Look Action

Source: https://context7_llms

Introduces the `<Action.ToggleQuickLook />` action, allowing extensions to display additional information with a Quick Look preview.

```javascript
<Action.ToggleQuickLook />
```

--------------------------------

### Accessing Command Arguments in JavaScript/TypeScript

Source: https://developers.raycast.com/information/lifecycle/arguments

This code illustrates how to access the values of arguments passed to a Raycast command. The arguments are available through the `arguments` prop of the `LaunchProps`. The example shows how to retrieve string values for 'text' and 'password' type arguments.

```typescript
import { showHUD } from '@raycast/api';

export default async (props: { arguments: { firstArg: string; secondArg: string; thirdArg: string } }) => {
  const { firstArg, secondArg, thirdArg } = props.arguments;

  await showHUD(`Arguments received: ${firstArg}, ${secondArg}, ${thirdArg}`);
}
```

--------------------------------

### Mutation and Optimistic Updates

Source: https://developers.raycast.com/utilities/react-hooks/usesql

Explains how to use the `mutate` function for optimistic updates, providing a responsive user experience by reflecting changes before server confirmation.

```APIDOC
## Mutation and Optimistic Updates

### Description
This section describes how to implement optimistic updates using the `mutate` function provided by the `useSQL` hook. Optimistic updates enhance user experience by updating the UI immediately, assuming the asynchronous operation will succeed.

### Method
N/A (This describes a React Hook's functionality)

### Endpoint
N/A

### Parameters
#### Request Body (for `mutate` function)
- **optimisticUpdate** (function) - A function that mutates the data to reflect the change introduced by the asynchronous update.
- **rollbackOnError** (function, optional) - A function that mutates the data back if the asynchronous update fails. If not provided, data automatically rolls back.

### Request Example
```javascript
mutate(
  asyncUpdateFunction(),
  {
    optimisticUpdate: (cachedData, newData) => {
      // Update cachedData based on newData
      return { ...cachedData, ...newData };
    },
    rollbackOnError: (cachedData, error) => {
      // Revert changes if error occurs
      return cachedData;
    }
  }
);
```

### Response
#### Success Response
N/A (This describes a function's behavior)

#### Response Example
N/A
```

--------------------------------

### Raycast Cache: Get Data

Source: https://developers.raycast.com/api-reference/cache

Retrieves data from the cache using a specified key. This function returns the cached data if found, otherwise it returns undefined. It is part of the Cache module.

```typescript
get(key: string): string | undefined
```

--------------------------------

### Action.CreateQuicklink

Source: https://context7_llms

The Action.CreateQuicklink component allows you to create a new quicklink in Raycast, with options to prefill fields.

```APIDOC
## Action.CreateQuicklink

### Description
Action that navigates to the the Create Quicklink command with some or all of the fields prefilled.

### Method
Action

### Endpoint
N/A (Component)

### Parameters
#### Props
- **quicklink** (object) - Required - Description for the quicklink object, typically containing a 'link' property.
- **icon** (Image.ImageLike) - Optional - A optional icon displayed for the Action.
- **shortcut** (Keyboard.Shortcut) - Optional - The optional keyboard shortcut for the Action.
- **title** (string) - Optional - An optional title for the Action.

### Request Example
```typescript
import { ActionPanel, Detail, Action } from "@raycast/api";

export default function Command() {
  return (
    <Detail
      markdown="Test out quicklink creation"
      actions={
        <ActionPanel>
          <Action.CreateQuicklink quicklink={{ link: "https://duckduckgo.com/?q={Query}" }} />
        </ActionPanel>
      }
    />
  );
}
```

### Response
#### Success Response (200)
N/A (Component Action)

#### Response Example
N/A
```

--------------------------------

### Get Website Favicon using getFavicon

Source: https://context7_llms

The `getFavicon` function retrieves the favicon for a given URL. It accepts the URL and optional configuration for fallback icons, size, and masking. The function returns an `Image.ImageLike` object suitable for use in Raycast UI elements.

```typescript
function getFavicon(
  url: string | URL,
  options?: {
    fallback?: Image.Fallback;
    size?: boolean;
    mask?: Image.Mask;
  },
): Image.ImageLike;
```

```tsx
import { List } from "@raycast/api";
import { getFavicon } from "@raycast/utils";

export default function Command() {
  return (
    <List>
      <List.Item icon={getFavicon("https://raycast.com")} title="Raycast Website" />
    </List>
  );
}
```

--------------------------------

### Toggle Quick Look for File with Action.ToggleQuickLook

Source: https://developers.raycast.com/api-reference/user-interface/actions

This command displays a list item that allows the user to toggle the Quick Look preview for a specified file. It uses the List and Action.ToggleQuickLook components.

```typescript
import { ActionPanel, List, Action } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item
        title="Preview me"
        quickLook={{ path: "~/Downloads/Raycast.dmg", name: "Some file" }}
        actions={
          <ActionPanel>
            <Action.ToggleQuickLook />
          </ActionPanel>
        }
      />
    </List>
  );
}
```

--------------------------------

### Launch Commands from Other Commands in Raycast

Source: https://context7_llms

Shows how to use the `launchCommand` method to trigger other commands within the same extension. This is useful for scenarios like updating menu bar commands from view commands or vice-versa.

```typescript
import { launchCommand, LaunchType } from "@raycast/api";

async function triggerAnotherCommand() {
  await launchCommand({
    name: "myOtherCommandName",
    type: LaunchType.Background,
  });
}
```

--------------------------------

### Create Raycast Menu Bar Item with Custom Icon in TypeScript

Source: https://developers.raycast.com/api-reference/menu-bar-commands

This TypeScript example shows how to create a Raycast menu bar extra item with a custom icon named 'raycast.png'. The menu bar itself is represented by `Icon.Bookmark`. The item is titled 'Raycast.com'.

```typescript
import { Icon, MenuBarExtra } from "@raycast/api";

export default function Command() {
  return (
    <MenuBarExtra icon={Icon.Bookmark}>
      <MenuBarExtra.Item icon="raycast.png" title="Raycast.com" />
    </MenuBarExtra>
  );
}
```

--------------------------------

### Configure Slack OAuthService (Built-in)

Source: https://context7_llms

Initializes the OAuthService for Slack using its built-in static property. This method uses Raycast's pre-configured OAuth app for simplified integration. Requires specifying the desired scope.

```tsx
const slack = OAuthService.slack({ scope: "emoji:read" });
```

--------------------------------

### Rendering List Items with Keys in JavaScript

Source: https://developers.raycast.com/api-reference/cache

This snippet illustrates how to render a list of items in JavaScript, assigning a unique key to each item. This is crucial for efficient rendering and updates in UI frameworks. The example shows accessing properties like `item.id` to use as the key.

```javascript
<List.Item key="{item.id}" />
```

--------------------------------

### Access Command Arguments with TypeScript Namespace

Source: https://developers.raycast.com/information/arguments

This example shows how to leverage Raycast's global TypeScript namespace `Arguments` for type-safe access to command arguments. By defining the `LaunchProps` with `Arguments.<CommandName>`, you ensure that the types used within your command are synchronized with the manifest, reducing potential runtime errors.

```typescript
import { LaunchProps } from '@raycast/api';

// Assuming your command is named 'show-todos' and its arguments are defined in the manifest
export default function Command(props: LaunchProps<{ arguments: Arguments.ShowTodos }> ) {
  const { todoTitle, dueDate } = props.arguments;

  return (
    // Your command UI and logic here
    console.log(`Todo: ${todoTitle}, Due: ${dueDate}`)
  );
}
```

--------------------------------

### Raycast Extension Code Snippet (TSX)

Source: https://developers.raycast.com/utilities/react-hooks/uselocalstorage

This is a TypeScript/React code snippet for a Raycast extension, demonstrating imports from '@raycast/api' and '@raycast/utils'. It includes an example of defining an array of todos and using useLocalStorage.

```tsx
self.__next_f.push([1,"68:[\"$\",\"$19\",\"594lBZaRXrNE\",{\"fallback\":null,\"children\":[\"$\",\"$L79\",null,{\"block\":{\"object\":\"block\",\"type\":\"code\",\"isVoid\":false,\"data\":{\"syntax\":\"tsx\"},\"nodes\":[[{\"object\":\"block\",\"type\":\"code-line\",\"isVoid\":false,\"data\":{},\"nodes\":[[{\"object\":\"text\",\"leaves\":[[{\"object\":\"leaf\",\"text\":\"import { Action, ActionPanel, Color, Icon, List } from \\\"@raycast/api\\\";\",\"marks\":[]}]],\"key\":\"VPaerhNXgVZp\"}],{\"object\":\"block\",\"type\":\"code-line\",\"isVoid\":false,\"data\":{},\"nodes\":[[{\"object\":\"text\",\"leaves\":[[{\"object\":\"leaf\",\"text\":\"import { useLocalStorage } from \\\"@raycast/utils\\\";\",\"marks\":[]}]],\"key\":\"ueGgPLACQV5J\"}],\"key\":\"ZIWxkSugaEih\"},{\"object\":\"block\",\"type\":\"code-line\",\"isVoid\":false,\"data\":{},\"nodes\":[[{\"object\":\"text\",\"leaves\":[[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]],\"key\":\"Y33JzcHF7xjh\"}],\"key\":\"b0tD118pmpcu\"},{\"object\":\"block\",\"type\":\"code-line\",\"isVoid\":false,\"data\":{},\"nodes\":[[{\"object\":\"text\",\"leaves\":[[{\"object\":\"leaf\",\"text\":\"const exampleTodos = [\",\"marks\":[]}]],\"key\":\"XaFJcuPnwgMA\"}]]}]]}}]]})])
```

--------------------------------

### Create Simple Raycast Menu Bar Item in TypeScript

Source: https://developers.raycast.com/api-reference/menu-bar-commands

This TypeScript code creates a basic Raycast menu bar extra with a single item titled 'Raycast.com'. It uses the `@raycast/api` library and specifies the `Icon.Bookmark` as the menu bar icon. This is a minimal example for a menu bar command.

```typescript
import { Icon, MenuBarExtra } from "@raycast/api";

export default function Command() {
  return (
    <MenuBarExtra icon={Icon.Bookmark}>
      <MenuBarExtra.Item title="Raycast.com" />
    </MenuBarExtra>
  );
}
```

--------------------------------

### File Preview Configuration

Source: https://developers.raycast.com/api-reference/user-interface/grid

Defines how files are previewed using Quick Look within Raycast actions. This configuration is typically part of an action's settings.

```typescript
{
  name?: string;
  path: "fs".PathLike
}
```

--------------------------------

### Embed Image in Raycast Detail Markdown

Source: https://developers.raycast.com/api-reference/user-interface/detail

This example demonstrates how to embed an image within the markdown content displayed by the Raycast `Detail` component. It uses standard markdown image syntax `![alt text](url)`.

```typescript
import { Detail } from "@raycast/api";

export default function Command() {
  return <Detail markdown={`![Image Title](example.png)`} />;
}
```

--------------------------------

### Create Action with Title and Handler in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/navigation

This snippet shows how to create a specific action within Raycast, including its display title and the handler function to be executed when the action is triggered. It uses a 'Pop' action as an example.

```typescript
<Action
  title="Pop"
  onAction={pop}
/>
```

--------------------------------

### Setup Navigation Listener for SPA Routing (JavaScript)

Source: https://manual.raycast.com/extensions

This function sets up listeners to detect navigation changes, crucial for Single Page Applications (SPAs). It listens for 'popstate' events (used by back/forward buttons) and uses a MutationObserver on the title element to detect URL changes. Both events trigger a reinitialization of link icons.

```javascript
function setupNavigationListener() {
  console.log("Setting up navigation listener");
  let lastUrl = location.href;

  window.addEventListener('popstate', () => {
    console.log("Navigation detected (popstate)");
    setTimeout(() => {
      initializeLinkIcons();
    }, 500);
  });

  const urlObserver = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      console.log("URL changed from", lastUrl, "to", location.href);
      lastUrl = location.href;
      setTimeout(() => {
        initializeLinkIcons();
      }, 500);
    }
  });
  urlObserver.observe(document.querySelector('title'), { childList: true, subtree: true, characterData: true });
}
```

--------------------------------

### Next.js Application Initialization and Configuration

Source: https://developers.raycast.com/information/developer-tools/forked-extensions

This JavaScript code snippet appears to be part of a Next.js application's initialization process. It pushes configuration objects into a `self.__next_f` array, which is likely used by Next.js to bootstrap the application. The configuration includes details about static assets, CSS files, and potentially API endpoints or other runtime settings.

```javascript
(self.__next_f=self.__next_f||[]).push([0])
```

```javascript
self.__next_f.push([1,"1:\"$Sreact.fragment\"\n2:I[47132,[],\"\"]\n3:I[75082,[],\"\"]\ne:I[87563,[\"4219\",\"static/chunks/app/global-error-99197ad4868e95f4.js\"],\"default\"]\n:HC[\"https://static-2v.gitbook.com\",\"\"]\n:HL[\"https://static-2v.gitbook.com/_next/static/css/4cf571e71811438f.css\",\"style\"]\n:HL[\"https://static-2v.gitbook.com/_next/static/css/919cadf6c2ad1dbc.css\",\"style\"]\n:HL[\"https://static-2v.gitbook.com/_next/static/css/e4670420fc569cb1.css\",\"style\"]\n:HL[\"https://static-2v.gitbook.gitbook.com/_next/static/css/4964911ca105a4d7.css\",\"style\"]\n:HL[\"https://static-2v.gitbook.com/_next/static/css/aa52f01cc4c56695.css\",\"style\"]\n:HL[\"https://static-2v.gitbook.com/_next/static/css/c36dde9599bfc781.css\",\"style\"]\n:HL[\"https://static-2v.gitbook.com/_next/static/css/dc687769ecbab58a.css\",\"style\"]\n:HL[\"https://static-2v.gitbook.com/_next/static/css/025312793db0b2d4.css\",\"style\"]\n"])
```

```javascript
self.__next_f.push([1,"0:{\"P\":null,\"b\":\"nqIxll0nG7UEyuyPCJYsM\",\"p\":\"https://static-2v.gitbook.com\",\"c\":[\"\",\"sites\",\"static\",\"url-host\",\"developers.raycast.com%2F\",\"(apiToken%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb250ZW50XzAxY2M4MjQ2OWE0ZTBiMGNjODdiZDAxZDkxZTkyNGRmN2NmOThjZGEiLCJ0YXJnZXQiOiJjb250ZW50Iiwia2luZCI6InNpdGUiLCJvcmdhbml6YXRpb24iOiItTWVlekdGbVkwN0pCd0hzWFJqNCIsInNwYWNlcyI6WyItTWVfOEEzOXRGaFpnM1VhVm9TTiJdLCJzaXRlIjoic2l0ZV93cUZLcCIsInNpdGVTcGFjZSI6InNpdGVzcF9WVFhyRCIsInNwYWNlIjoiLU1lXzhBMzl0RmhaZzNVYVZvU04iLCJyYXRlTGltaXRNdWx0aXBsaWVyIjoxMDAwMDAwLCJpYXQiOjE3Njk2NDQ4MDAsImV4cCI6MTc3MDI0OTkwMH0.R3pZrHaKwsv1k-zlYB0ZKnJ4SRBoQsywYsmrbq13axU%2CbasePath%3A%2F%2CimagesContextId%3Adevelopers.raycast.com%2Corganization%3A'-MeezGFmY07JBwHsXRj4'%2Csite%3Asite_wqFKp%2CsiteBasePath%3A%2F%2CsiteSpace%3Asitesp_VTXrD%2Cspace%3A'-Me_8A39tFhZg3UaVoSN)\",\"information%2Fdeveloper-tools%2Fforked-extensions\"],\"i\":false,\"f\":[[[\"\",{\"children\":[\"sites\",{\"children\":[\"static\",{\"children\":[[\"mode\",\"url-host\",\"d\"],{\"children\":[[\"siteURL\",\"developers.raycast.com%2F\",\"d\"],{\"children\":[[\"siteData\",\"(apiToken%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb250ZW50XzAxY2M4MjQ2OWE0ZTBiMGNjODdiZDAxZDkxZTkyNGRmN2NmOThjZGEiLCJ0YXJnZXQiOiJjb250ZW50Iiwia2luZCI6InNpdGUiLCJvcmdhbml6YXRpb24iOiItTWVlekdGbVkwN0pCd0hzWFJqNCIsInNwYWNlcyI6WyItTWVfOEEzOXRGaFpnM1VhVm9TTiJdLCJzaXRlIjoic2l0ZV93cUZLcCIsInNpdGVTcGFjZSI6InNpdGVzcF9WVFhyRCIsInNwYWNlIjoiLU1lXzhBMzl0RmhaZzNVYVZvU04iLCJyYXRlTGltaXRNdWx0aXBsaWVyIjoxMDAwMDAwLCJpYXQiOjE3Njk2NDQ4MDAsImV4cCI6MTc3MDI0OTkwMH0.R3pZrHaKwsv1k-zlYB0ZKnJ4SRBoQsywYsmrbq13axU%2CbasePath%3A%2F%2CimagesContextId%3Adevelopers.raycast.com%2Corganization%3A'-MeezGFmY07JBwHsXRj4'%2Csite%3Asite_wqFKp%2CsiteBasePath%3A%2F%2CsiteSpace%3Asitesp_VTXrD%2Cspace%3A'-Me_8A39tFhZg3UaVoSN)\",\"d\"],{\"children\":[\"site\",\"site_wqFKp\",\"d\"],{\"children\":[\"siteSpace\",\"sitesp_VTXrD\",\"d\"],{\"children\":[\"space\",\"-Me_8A39tFhZg3UaVoSN\",\"d\"],{\"children\":[\"organization\",\"-MeezGFmY07JBwHsXRj4\",\"d\"],{\"children\":[\"siteBasePath\",\"/\",\"d\"],{\"children\":[\"basePath\",\"/\",\"d\"],{\"children\":[\"imagesContextId\",\"developers.raycast.com\",\"d\"],{\"children\":[\"apiToken\",\"(apiToken%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb250ZW50XzAxY2M4MjQ2OWE0ZTBiMGNjODdiZDAxZDkxZTkyNGRmN2NmOThjZGEiLCJ0YXJnZXQiOiJjb250ZW50Iiwia2luZCI6InNpdGUiLCJvcmdhbml6YXRpb24iOiItTWVlekdGbVkwN0pCd0hzWFJqNCIsInNwYWNlcyI6WyItTWVfOEEzOXRGaFpnM1VhVm9TTiJdLCJzaXRlIjoic2l0ZV93cUZLcCIsInNpdGVTcGFjZSI6InNpdGVzcF9WVFhyRCIsInNwYWNlIjoiLU1lXzhBMzl0RmhaZzNVYVZvU04iLCJyYXRlTGltaXRNdWx0aXBsaWVyIjoxMDAwMDAwLCJpYXQiOjE3Njk2NDQ4MDAsImV4cCI6MTc3MDI0OTkwMH0.R3pZrHaKwsv1k-zlYB0ZKnJ4SRBoQsywYsmrbq13axU%2CbasePath%3A%2F%2CimagesContextId%3Adevelopers.raycast.com%2Corganization%3A'-MeezGFmY07JBwHsXRj4'%2Csite%3Asite_wqFKp%2CsiteBasePath%3A%2F%2CsiteSpace%3Asitesp_VTXrD%2Cspace%3A'-Me_8A39tFhZg3UaVoSN)\",\"d\"],{\"children\":[\"rateLimitMultiplier\",1000000,\"d\"],{\"children\":[\"iat\",1769644800,\"d\"],{\"children\":[\"exp\",1770249900,\"d\"],{\"children\":[\"site\",\"site_wqFKp\",\"d\"],{\"children\":[\"siteSpace\",\"sitesp_VTXrD\",\"d\"],{\"children\":[\"space\",\"-Me_8A39tFhZg3UaVoSN\",\"d\"],{\"children\":[\"organization\",\"-MeezGFmY07JBwHsXRj4\",\"d\"],{\"children\":[\"siteBasePath\",\"/\",\"d\"],{\"children\":[\"basePath\",\"/\",\"d\"],{\"children\":[\"imagesContextId\",\"developers.raycast.com\",\"d\"],{\"children\":[\"apiToken\",\"(apiToken%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb250ZW50XzAxY2M4MjQ2OWE0ZTBiMGNjODdiZDAxZDkxZTkyNGRmN2NmOThjZGEiLCJ0YXJnZXQiOiJjb250ZW50Iiwia2luZCI6InNpdGUiLCJvcmdhbml6YXRpb24iOiItTWVlekdGbVkwN0pCd0hzWFJqNCIsInNwYWNlcyI6WyItTWVfOEEzOXRGaFpnM1VhVm9TTiJdLCJzaXRlIjoic2l0ZV93cUZLcCIsInNpdGVTcGFjZSI6InNpdGVzcF9WVFhyRCIsInNwYWNlIjoiLU1lXzhBMzl0RmhaZzNVYVZvU04iLCJyYXRlTGltaXRNdWx0aXBsaWVyIjoxMDAwMDAwLCJpYXQiOjE3Njk2NDQ4MDAsImV4cCI6MTc3MDI0OTkwMH0.R3pZrHaKwsv1k-zlYB0ZKnJ4SRBoQsywYsmrbq13axU%2CbasePath%3A%2F%2CimagesContextId%3Adevelopers.raycast.com%2Corganization%3A'-MeezGFmY07JBwHsXRj4'%2Csite%3Asite_wqFKp%2CsiteBasePath%3A%2F%2CsiteSpace%3Asitesp_VTXrD%2Cspace%3A'-Me_8A39tFhZg3UaVoSN)\",\"d\"],{\"children\":[\"rateLimitMultiplier\",1000000,\"d\"],{\"children\":[\"iat\",1769644800,\"d\"],{\"children\":[\"exp\",1770249900,\"d\"],{\"children\":[\"site\",\"site_wqFKp\",\"d\"],{\"children\":[\"siteSpace\",\"sitesp_VTXrD\",\"d\"],{\"children\":[\"space\",\"-Me_8A39tFhZg3UaVoSN\",\"d\"],{\"children\":[\"organization\",\"-MeezGFmY07JBwHsXRj4\",\"d\"],{\"children\":[\"siteBasePath\",\"/\",\"d\"],{\"children\":[\"basePath\",\"/\",\"d\"],{\"children\":[\"imagesContextId\",\"developers.raycast.com\",\"d\"],{\"children\":[\"apiToken\",\"(apiToken%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb250ZW50XzAxY2M4MjQ2OWE0ZTBiMGNjODdiZDAxZDkxZTkyNGRmN2NmOThjZGEiLCJ0YXJnZXQiOiJjb250ZW50Iiwia2luZCI6InNpdGUiLCJvcmdhbml6YXRpb24iOiItTWVlekdGbVkwN0pCd0hzWFJqNCIsInNwYWNlcyI6WyItTWVfOEEzOXRGaFpnM1VhVm9TTiJdLCJzaXRlIjoic2l0ZV93cUZLcCIsInNpdGVTcGFjZSI6InNpdGVzcF9WVFhyRCIsInNwYWNlIjoiLU1lXzhBMzl0RmhaZzNVYVZvU04iLCJyYXRlTGltaXRNdWx0aXBsaWVyIjoxMDAwMDAwLCJpYXQiOjE3Njk2NDQ4MDAsImV4cCI6MTc3MDI0OTkwMH0.R3pZrHaKwsv1k-zlYB0ZKnJ4SRBoQsywYsmrbq13axU%2CbasePath%3A%2F%2CimagesContextId%3Adevelopers.raycast.com%2Corganization%3A'-MeezGFmY07JBwHsXRj4'%2Csite%3Asite_wqFKp%2CsiteBasePath%3A%2F%2CsiteSpace%3Asitesp_VTXrD%2Cspace%3A'-Me_8A39tFhZg3UaVoSN)\",\"d\"],{\"children\":[\"rateLimitMultiplier\",1000000,\"d\"],{\"children\":[\"iat\",1769644800,\"d\"],{\"children\":[\"exp\",1770249900,\"d\"],{\"children\":[\"site\",\"site_wqFKp\",\"d\"],{\"children\":[\"siteSpace\",\"sitesp_VTXrD\",\"d\"],{\"children\":[\"space\",\"-Me_8A39tFhZg3UaVoSN\",\"d\"],{\"children\":[\"organization\",\"-MeezGFmY07JBwHsXRj4\",\"d\"],{\"children\":[\"siteBasePath\",\"/\",\"d\"],{\"children\":[\"basePath\",\"/\",\"d\"],{\"children\":[\"imagesContextId\",\"developers.raycast.com\",\"d\"],{\"children\":[\"apiToken\",\"(apiToken%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb250ZW50XzAxY2M4MjQ2OWE0ZTBiMGNjODdiZDAxZDkxZTkyNGRmN2NmOThjZGEiLCJ0YXJnZXQiOiJjb250ZW50Iiwia2luZCI6InNpdGUiLCJvcmdhbml6YXRpb24iOiItTWVlekdGbVkwN0pCd0hzWFJqNCIsInNwYWNlcyI6WyItTWVfOEEzOXRGaFpnM1VhVm9TTiJdLCJzaXRlIjoic2l0ZV93cUZLcCIsInNpdGVTcGFjZSI6InNpdGVzcF9WVFhyRCIsInNwYWNlIjoiLU1lXzhBMzl0RmhaZzNVYVZvU04iLCJyYXRlTGltaXRNdWx0aXBsaWVyIjoxMDAwMDAwLCJpYXQiOjE3Njk2NDQ4MDAsImV4cCI6MTc3MDI0OTkwMH0.R3pZrHaKwsv1k-zlYB0ZKnJ4SRBoQsywYsmrbq13axU%2CbasePath%3A%2F%2CimagesContextId%3Adevelopers.raycast.com%2Corganization%3A'-MeezGFmY07JBwHsXRj4'%2Csite%3Asite_wqFKp%2CsiteBasePath%3A%2F%2CsiteSpace%3Asitesp_VTXrD%2Cspace%3A'-Me_8A39tFhZg3UaVoSN)\",\"d\"],{\"children\":[\"rateLimitMultiplier\",1000000,\"d\"],{\"children\":[\"iat\",1769644800,\"d\"],{\"children\":[\"exp\",1770249900,\"d\"],{\"children\":[\"site\",\"site_wqFKp\",\"d\"],{\"children\":[\"siteSpace\",\"sitesp_VTXrD\",\"d\"],{\"children\":[\"space\",\"-Me_8A39tFhZg3UaVoSN\",\"d\"],{\"children\":[\"organization\",\"-MeezGFmY07JBwHsXRj4\",\"d\"],{\"children\":[\"siteBasePath\",\"/\",\"d\"],{\"children\":[\"basePath\",\"/\",\"d\"],{\"children\":[\"imagesContextId\",\"developers.raycast.com\",\"d\"],{\"children\":[\"apiToken\",\"(apiToken%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb250ZW50XzAxY2M4MjQ2OWE0ZTBiMGNjODdiZDAxZDkxZTkyNGRmN2NmOThjZGEiLCJ0YXJnZXQiOiJjb250ZW50Iiwia2luZCI6InNpdGUiLCJvcmdhbml6YXRpb24iOiItTWVlekdGbVkwN0pCd0hzWFJqNCIsInNwYWNlcyI6WyItTWVfOEEzOXRGaFpnM1VhVm9TTiJdLCJzaXRlIjoic2l0ZV93cUZLcCIsInNpdGVTcGFjZSI6InNpdGVzcF9WVFhyRCIsInNwYWNlIjoiLU1lXzhBMzl0RmhaZzNVYVZvU04iLCJyYXRlTGltaXRNdWx0aXBsaWVyIjoxMDAwMDAwLCJpYXQiOjE3Njk2NDQ4MDAsImV4cCI6MTc3MDI0OTkwMH0.R3pZrHaKwsv1k-zlYB0ZKnJ4SRBoQsywYsmrbq13axU%2CbasePath%3A%2F%2CimagesContextId%3Adevelopers.raycast.com%2Corganization%3A'-MeezGFmY07JBwHsXRj4'%2Csite%3Asite_wqFKp%2CsiteBasePath%3A%2F%2CsiteSpace%3Asitesp_VTXrD%2Cspace%3A'-Me_8A39tFhZg3UaVoSN)\",\"d\"],{\"children\":[\"rateLimitMultiplier\",1000000,\"d\"],{\"children\":[\"iat\",1769644800,\"d\"],{\"children\":[\"exp\",1770249900,\"d\"],{\"children\":[\"site\",\"site_wqFKp\",\"d\"],{\"children\":[\"siteSpace\",\"sitesp_VTXrD\",\"d\"],{\"children\":[\"space\",\"-Me_8A39tFhZg3UaVoSN\",\"d\"],{\"children\":[\"organization\",\"-MeezGFmY07JBwHsXRj4\",\"d\"],{\"children\":[\"siteBasePath\",\"/\",\"d\"],{\"children\":[\"basePath\",\"/\",\"d\"],{\"children\":[\"imagesContextId\",\"developers.raycast.com\",\"d\"],{\"children\":[\"apiToken\",\"(apiToken%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb250ZW50XzAxY2M4MjQ2OWE0ZTBiMGNjODdiZDAxZDkxZTkyNGRmN2NmOThjZGEiLCJ0YXJnZXQiOiJjb250ZW50Iiwia2luZCI6InNpdGUiLCJvcmdhbml6YXRpb24iOiItTWVlekdGbVkwN0pCd0hzWFJqNCIsInNwYWNlcyI6WyItTWVfOEEzOXRGaFpnM1VhVm9TTiJdLCJzaXRlIjoic2l0ZV93cUZLcCIsInNpdGVTcGFjZSI6InNpdGVzcF9WVFhyRCIsInNwYWNlIjoiLU1lXzhBMzl0RmhaZzNVYVZvU04iLCJyYXRlTGltaXRNdWx0aXBsaWVyIjoxMDAwMDAwLCJpYXQiOjE3Njk2NDQ4MDAsImV4cCI6MTc3MDI0OTkwMH0.R3pZrHaKwsv1k-zlYB0ZKnJ4SRBoQsywYsmrbq13axU%2CbasePath%3A%2F%2CimagesContextId%3Adevelopers.raycast.com%2Corganization%3A'-MeezGFmY07JBwHsXRj4'%2Csite%3Asite_wqFKp%2CsiteBasePath%3A%2F%2CsiteSpace%3Asitesp_VTXrD%2Cspace%3A'-Me_8A39tFhZg3UaVoSN)\",\"d\"],{\"children\":[\"rateLimitMultiplier\",1000000,\"d\"],{\"children\":[\"iat\",1769644800,\"d\"],{\"children\":[\"exp\",1770249900,\"d\"],{\"children\":[\"site\",\"site_wqFKp\",\"d\"],{\"children\":[\"siteSpace\",\"sitesp_VTXrD\",\"d\"],{\"children\":[\"space\",\"-Me_8A39tFhZg3UaVoSN\",\"d\"],{\"children\":[\"organization\",\"-MeezGFmY07JBwHsXRj4\",\"d\"],{\"children\":[\"siteBasePath\",\"/\",\"d\"],{\"children\":[\"basePath\",\"/\",\"d\"],{\"children\":[\"imagesContextId\",\"developers.raycast.com\",\"d\"],{\"children\":[\"apiToken\",\"(apiToken%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb250ZW50XzAxY2M4MjQ2OWE0ZTBiMGNjODdiZDAxZDkxZTkyNGRmN2NmOThjZGEiLCJ0YXJnZXQiOiJjb250ZW50Iiwia2luZCI6InNpdGUiLCJvcmdhbml6YXRpb24iOiItTWVlekdGbVkwN0pCd0hzWFJqNCIsInNwYWNlcyI6WyItTWVfOEEzOXRGaFpnM1VhVm9TTiJdLCJzaXRlIjoic2l0ZV93cUZLcCIsInNpdGVTcGFjZSI6InNpdGVzcF9WVFhyRCIsInNwYWNlIjoiLU1lXzhBMzl0RmhaZzNVYVZvU04iLCJyYXRlTGltaXRNdWx0aXBsaWVyIjoxMDAwMDAwLCJpYXQiOjE3Njk2NDQ4MDAsImV4cCI6MTc3MDI0OTkwMH0.R3pZrHaKwsv1k-zlYB0ZKnJ4SRBoQsywYsmrbq13axU%2CbasePath%3A%2F%2CimagesContextId%3Adevelopers.raycast.com%2Corganization%3A'-MeezGFmY07JBwHsXRj4'%2Csite%3Asite_wqFKp%2CsiteBasePath%3A%2F%2CsiteSpace%3Asitesp_VTXrD%2Cspace%3A'-Me_8A39tFhZg3UaVoSN)\",\"d\"],{\"children\":[\"rateLimitMultiplier\",1000000,\"
```

--------------------------------

### Platform-Specific Default Preferences Configuration

Source: https://context7_llms

Illustrates how to set default preferences for a Raycast extension that differ based on the operating system. This is useful for settings like file paths that are platform-dependent.

```json
"default": {
  "macOS": "foo",
  "Windows": "bar"
}
```

--------------------------------

### Handle Menu Bar Action Event in JavaScript

Source: https://developers.raycast.com/api-reference/menu-bar-commands

This example shows how to handle an action event for a Menu Bar command using JavaScript. It defines an `ActionEvent` that can be triggered from a menu bar item, allowing for custom logic execution. This is useful for interactive menu bar elements.

```javascript
import { MenuBarExtra, Action, getPreferenceValues } from '@raycast/api';

export default function Command(): JSX.Element {
  const preferences = getPreferenceValues();

  return (
    <MenuBarExtra icon="👁️" title="My App">
      <MenuBarExtra.Item
        title="Perform Action"
        action={(
          <Action
            title="Action"
            onAction={() => {
              console.log('Action performed!');
            }}
          />
        )}
      />
    </MenuBarExtra>
  );
}
```

--------------------------------

### Define Application Tree and Initial Seed Data (JavaScript)

Source: https://www.raycast.com/litomore/forked-extensions

This extensive JavaScript code defines the application's component tree and initial seed data. It specifies the structure of the UI, including marketing sections, handles, and extensions, along with their associated properties and styles. This data is used to bootstrap the application on the client side, ensuring correct rendering and functionality.

```javascript
self.__next_f.push([1,"0:[ \"$\",\"$Ld\",null,{\"buildId\":\"_59UBrVOPMvUgYaHZOosh\",\"assetPrefix\":\"\",\"urlParts\":[\"\",\"litomore\",\"forked-extensions\"],\"initialTree\":[\"\",{\"children\":[\"(marketing)\",{\"children\":[[ \"handle\", \"litomore\", \"d\"],{\"children\":[[ \"name\", \"forked-extensions\", \"d\"],{\"children\":[\"__PAGE__\",{}]}]}}]}},\"$undefined\",\"$undefined\",true\]`,
"initialSeedData":[\"\",{\"children\":[\"(marketing)\",{\"children\":[[ \"handle\", \"litomore\", \"d\"],{\"children\":[[ \"name\", \"forked-extensions\", \"d\"],{\"children\":[\"__PAGE__\",{},[[\"$Le\",\"$Lf\",[[\"$\",\"link\",\"0\",{\"rel\":\"stylesheet\",\"href\":\"/_next/static/css/535e05e2299b473c.css\",\"precedence\":\"next\",\"crossOrigin\":\"$undefined\"}]],[[\"$\",\"link\",\"1\",{\"rel\":\"stylesheet\",\"href\":\"/_next/static/css/cc362b67f4f52da1.css\",\"precedence\":\"next\",\"crossOrigin\":\"$undefined\"}]],[[\"$\",\"link\",\"2\",{\"rel\":\"stylesheet\",\"href\":\"/_next/static/css/3c29f81dc359ec75.css\",\"precedence\":\"next\",\"crossOrigin\":\"$undefined\"}]]]]],null],null]},[[[[\"$\",\"link\",\"0\",{\"rel\":\"stylesheet\",\"href\":\"/_next/static/css/fa32ef778fe1a94e.css\",\"precedence\":\"next\",\"crossOrigin\":\"$undefined\"}]],[[\"$\",\"link\",\"1\",{\"rel\":\"stylesheet\",\"href\":\"/_next/static/css/4660d1b6325a4310.css\",\"precedence\":\"next\",\"crossOrigin\":\"$undefined\"}]]], [ \"$\", \"div\", null, { \"className\": \"PageContent_pageContent__rDAer\", \"children\": [ \"$\", \"div\", null, { \"className\": \"Container_container__pBLEY Container_md__dbYCi\", \"children\": [ \"$\", \"$L10\", null, { \"parallelRouterKey\": \"children\", \"segmentPath\": [ \"children\", \"(marketing)\", \"children\", \"$11\", \"children\" ], \"error\": \"$undefined\", \"errorStyles\": \"$undefined\", \"errorScripts\": \"$undefined\", \"template\": [ \"$\", \"$L13\", null, {} ], \"templateStyles\": \"$undefined\", \"templateScripts\": \"$undefined\", \"notFound\": \"$undefined\", \"notFoundStyles\": \"$undefined\" } ] } ] } ] ], null ] }, [ null, [ \"$\", \"$L10\", null, { \"parallelRouterKey\": \"children\", \"segmentPath\": [ \"children\", \"(marketing)\", \"children\" ], \"error\": \"$undefined\", \"errorStyles\": \"$undefined\", \"errorScripts\": \"$undefined\", \"template\": [ \"$\", \"$L13\", null, {} ], \"templateStyles\": \"$undefined\", \"templateScripts\": \"$undefined\", \"notFound\": \"$undefined\", \"notFoundStyles\": \"$undefined\" } ] ], null ] }, [ null, [ \"$\", \"$L10\", null, { \"parallelRouterKey\": \"children\", \"segmentPath\": [ \"children\", \"(marketing)\", \"children\", \"$11\", \"children\", \"$12\", \"children\" ], \"error\": \"$undefined\", \"errorStyles\": \"$undefined\", \"errorScripts\": \"$undefined\", \"template\": [ \"$\", \"$L13\", null, {} ], \"templateStyles\": \"$undefined\", \"templateScripts\": \"$undefined\", \"notFound\": \"$undefined\", \"notFoundStyles\": \"$undefined\" } ] ], null ] } ] ] )
```

--------------------------------

### Get Browser Tab Content with Raycast API (TypeScript)

Source: https://context7_llms

Retrieves content from an open browser tab using the BrowserExtension.getContent function. Supports specifying format (html, text, markdown) and CSS selectors to target specific elements. Requires the @raycast/api package.

```typescript
import { BrowserExtension, Clipboard } from "@raycast/api";

export default async function command() {
  const markdown = await BrowserExtension.getContent({ format: "markdown" });

  await Clipboard.copy(markdown);
}
```

```typescript
import { BrowserExtension, Clipboard } from "@raycast/api";

export default async function command() {
  const title = await BrowserExtension.getContent({ format: "text", cssSelector: "title" });

  await Clipboard.copy(title);
}
```

--------------------------------

### Open Command Preferences

Source: https://context7_llms

Opens the specific command's preferences screen for user configuration.

```APIDOC
## POST /openCommandPreferences

### Description
Opens the command's preferences screen.

### Method
POST

### Endpoint
/openCommandPreferences

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```typescript
import { openCommandPreferences } from "@raycast/api";

await openCommandPreferences();
```

### Response
#### Success Response (200)
- **void** - Resolves when the preferences screen is opened.

#### Response Example
```json
// No response body, promise resolves on success
```
```

--------------------------------

### Raycast Extension: Enhanced Homebrew Formulae List with Actions

Source: https://developers.raycast.com/utilities/react-hooks/usestreamjson

This Raycast extension is an enhanced version that fetches Homebrew formulae using `useStreamJSON`. It includes the same filtering and transformation logic as the previous example but adds an `ActionPanel` to each list item. This allows for custom actions, demonstrated here with a placeholder action to 'Delete All Items But This One'.

```typescript
import { Action, ActionPanel, List, environment } from "@raycast/api";
    import { useStreamJSON } from "@raycast/utils";
    import { join } from "path";
    import { useCallback, useState } from "react";
    import { setTimeout } from "timers/promises";
    
    type Formula = { name: string; desc?: string };
    
    export default function Main(): React.JSX.Element {
      const [searchText, setSearchText] = useState("");
    
      const formulaFilter = useCallback(
        (item: Formula) => {
          if (!searchText) return true;
          return item.name.toLocaleLowerCase().includes(searchText);
        },
        [searchText],
      );
    
      const formulaTransform = useCallback((item: any): Formula => {
        return { name: item.name, desc: item.desc };
      }, []);
    
      const { data, isLoading, mutate, pagination } = useStreamJSON("https://formulae.brew.sh/api/formula.json", {
        initialData: [] as Formula[],
        pageSize: 20,
        filter: formulaFilter,
        transform: formulaTransform,
      });
    
      return (
        <List isLoading={isLoading} pagination={pagination} onSearchTextChange={setSearchText}>
          <List.Section title="Formulae">
            {data.map((d) => (
              <List.Item
                key={d.name}
                title={d.name}
                subtitle={d.desc}
                actions={
                  <ActionPanel>
                    <Action
                      title="Delete All Items But This One"

```

--------------------------------

### Execute SQL Query in Raycast

Source: https://developers.raycast.com/utilities/functions/executesql

This snippet demonstrates how to execute an SQL query within the Raycast environment. It utilizes a function `executeSQL` which likely takes a database path as an argument. The example shows a basic function definition and its assignment.

```javascript
function executeSQL unknown >(
databasePath: string
): Promise<unknown>
```

--------------------------------

### useLocalStorage Hook Signature and Usage

Source: https://context7_llms

Details the `useLocalStorage` hook for managing data persistence in local storage. It provides functions to get, set, and remove values, along with a loading state indicator. The hook accepts a key and an optional initial value.

```typescript
function useLocalStorage<T>(key: string, initialValue?: T): {
  value: T | undefined;
  setValue: (value: T) => Promise<void>;
  removeValue: () => Promise<void>;
  isLoading: boolean;
}
```

--------------------------------

### Syntax Highlighting for Markdown Code Blocks in Raycast

Source: https://context7_llms

Enables syntax highlighting for markdown code blocks within Raycast extensions. To activate this feature, the programming language must be specified at the beginning of the code block. This improves the readability of code examples displayed in the extension.

```markdown
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```
```

--------------------------------

### Use AI.ask for Prompts in Raycast Extensions

Source: https://context7_llms

Introduces the new `AI.ask` method for seamlessly integrating AI prompts into Raycast extensions. This API enhances extensions by allowing them to leverage artificial intelligence for various tasks. No specific dependencies are mentioned, and the input is a prompt string, with the output being the AI's response.

```javascript
const response = await AI.ask("What is the capital of France?");
console.log(response);
```

--------------------------------

### Raycast Extension Client Code Block Example

Source: https://developers.raycast.com/api-reference/user-interface/grid

This code represents a client-side code block within a Raycast extension, likely used for rendering UI elements or handling logic. It references various JavaScript chunks and modules necessary for its operation.

```javascript
self.__next_f.push([1,"200:I[94078,[\"6268\",\"static/chunks/f5718501-b58a5cfb1abadce5.js\",\"2122\",\"static/chunks/9071f66d-390fafe3303b2acb.js\",\"6500\",\"static/chunks/6500-df22b4917e9f7eea.js\",\"711\",\"static/chunks/711-f01ba055e2d09f63.js\",\"9014\",\"static/chunks/9014-2de2a842f1453568.js\",\"1026\",\"static/chunks/1026-7238b3f0a07452e6.js\",\"6782\",\"static/chunks/6782-c774ebb74dd85111.js\",\"9330\",\"static/chunks/9330-58d5f2baf27a33de.js\",\"8617\",\"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/%5BpagePath%5D/page-f5ef1efb17e610fe.js\"],\"ClientCodeBlock\",1])
self.__next_f.push([42651,[\"6268\",\"static/chunks/f5718501-b58a5cfb1abadce5.js\",\"2122\",\"static/chunks/9071f66d-390fafe3303b2acb.js\",\"6500\",\"static/chunks/6500-df22b4917e9f7eea.js\",\"711\",\"static/chunks/711-f01ba055e2d09f63.js\",\"9014\",\"static/chunks/9014-2de2a842f1453568.js\",\"1026\",\"static/chunks/1026-7238b3f0a07452e6.js\",\"6782\",\"static/chunks/6782-c774ebb74dd85111.js\",\"9330\",\"static/chunks/9330-58d5f2baf27a33de.js\",\"8617\",\"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/%5BpagePath%5D/page-f5ef1efb17e610fe.js\"],\"InlineLinkTooltip\"])
```

--------------------------------

### Form.DatePicker Controlled Example (TypeScript)

Source: https://context7_llms

Illustrates the controlled usage of Form.DatePicker in Raycast. This approach uses React's useState hook to manage the date selection, allowing for real-time updates and dynamic control over the component's value.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Form" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.DatePicker id="launchDate" title="Launch Date" value={date} onChange={setDate} />
    </Form>
  );
}
```

--------------------------------

### Initialize Application Data and Routing (JavaScript)

Source: https://www.raycast.com/litomore/forked-extensions

This JavaScript snippet initializes application data and routing configurations, likely for a Next.js application. It defines initial data structures and segment paths used by the routing system to render specific pages and components. This is crucial for the client-side navigation and content display.

```javascript
self.__next_f.push([1,"d:I[12846,[],\"\"]\n10:I[4707,[],\"\"]\n13:I[36423,[],\"\"]\n16:I[57063, [\"6470\", \"static/chunks/app/global-error-11c179a642c93f00.js\"], \"default\"]\n11: [\"handle\", \"litomore\", \"d\"]\n12: [\"name\", \"forked-extensions\", \"d\"]\n17: []\n"])
```

--------------------------------

### OAuth PKCE Client Constructor (TypeScript)

Source: https://developers.raycast.com/api-reference/oauth

This snippet shows the constructor for the OAuth PKCE client in TypeScript. It initializes the client with provided options.

```typescript
constructor(options: OAuth.PKCEClient.Options): OAuth.PKCEClient
```

--------------------------------

### Get Local Storage Value (TypeScript)

Source: https://developers.raycast.com/api-reference/storage

This snippet demonstrates how to retrieve the value associated with a specific key from the local storage. It's useful for accessing previously stored user preferences or data.

```typescript
Value: string | number | boolean;
```

--------------------------------

### Set Local Storage Values (TypeScript)

Source: https://developers.raycast.com/api-reference/storage

This TypeScript code example shows how to use the `LocalStorage.setItem` function to store different data types (string, number) in Raycast's local storage. It requires the `@raycast/api` package.

```typescript
import { LocalStorage } from "@raycast/api";

export default async function Command() {
  // String
  await LocalStorage.setItem("favorite-fruit", "cherry");

  // Number
  await LocalStorage.setItem("fruit-basket-count", 3);

  // Boolean
  await LocalStorage.setItem("is-fruit-basket-full", true);
}
```

--------------------------------

### Focus Field in Raycast Form

Source: https://developers.raycast.com/utilities/react-hooks/useform

The 'focus' function is used to programmatically set focus on a specific field within a Raycast form. This is useful for guiding user interaction and improving form usability.

```text
focus is a function that can be used to programmatically focus a specific field.
```

--------------------------------

### Command Naming Convention in Raycast

Source: https://developers.raycast.com/api-reference/environment

Defines the expected format for command names within a Raycast extension's package.json. It specifies that the command name should be a string, and provides an example of how this name is used to identify a specific command.

```json
{
  "commandName": "The name of the launched command, as specified in package.json"
}
```

--------------------------------

### Next.js: Dynamic Imports Configuration

Source: https://developers.raycast.com/basics/create-your-first-extension

These snippets represent configurations for Next.js dynamic imports, indicated by 'self.__next_f.push'. They detail the loading of various JavaScript chunks and components required for specific application routes, such as '/sites/static/[mode]/[siteURL]/[siteData]/(content)/[pagePath]/page' and layout components.

```javascript
self.__next_f.push([1,"46:I[4093,[\"6268\",\"static/chunks/f5718501-b58a5cfb1abadce5.js\",\"2122\",\"static/chunks/9071f66d-390fafe3303b2acb.js\",\"6500\",\"static/chunks/6500-df22b4917e9f7eea.js\",\"711\",\"static/chunks/711-f01ba055e2d09f63.js\",\"9014\",\"static/chunks/9014-2de2a842f1453568.js\",\"1026\",\"static/chunks/1026-7238b3f0a07452e6.js\",\"6782\",\"static/chunks/6782-c774ebb74dd85111.js\",\"9330\",\"static/chunks/9330-58d5f2baf27a33de.js\",\"8617\",\"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/%5BpagePath%5D/page-f5ef1efb17e610fe.js\"],\"DropdownMenu\"
47:I[82745,[\"6268\",\"static/chunks/f5718501-b58a5cfb1abadce5.js\",\"2122\",\"static/chunks/9071f66d-390fafe3303b2acb.js\",\"6500\",\"static/chunks/6500-df22b4917e9f7eea.js\",\"711\",\"static/chunks/711-f01ba055e2d09f63.js\",\"9014\",\"static/chunks/9014-2de2a842f1453568.js\",\"1026\",\"static/chunks/1026-7238b3f0a07452e6.js\",\"6782\",\"static/chunks/6782-c774ebb74dd85111.js\",\"9330\",\"static/chunks/9330-58d5f2baf27a33de.js\",\"8617\",\"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/%5BpagePath%5D/page-f5ef1efb17e610fe.js\"],\"Icon\"
49:I[96389,[\"6268\",\"static/chunks/f5718501-b58a5cfb1abadce5.js\",\"6500\",\"static/chunks/6500-df22b4917e9f7eea.js\",\"4945\",\"static/chunks/4945-430fa5cc2f8244f6.js\",\"9014\",\"static/chunks/9014-2de2a842f1453568.js\",\"4078\",\"static/chunks/4078-240c6ceed53849bd.js\",\"3\",\"static/chunks/3-706fe07d48eb98ff.js\",\"559\",\"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/layout-38e0735c1c8235e3.js\"],\"AdminToolbarClient\"
4a:I[52047,[\"6268\",\"static/chunks/f5718501-b58a5cfb1abadce5.js\",\"6500\",\"static/chunks/6500-df22b4917e9f7eea.js\",\"4945\",\"static/chunks/4945-430fa5cc2f8244f6.js\",\"9014\",\"static/chunks/9014-2de2a842f1453568.js\",\"4078\",\"static/chunks/4078-240c6ceed53849bd.js\",\"3\",\"static/chunks/3-706fe07d48eb98ff.js\",\"559\",\"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/layout-38e0735c1c8235e3.js\"],\"SideSheet\"
4c:I[66929,[\"6268\",\"static/chunks/f5718501-b58a5cfb1abadce5.js\",\"6500\",\"static/chunks/6500-df2
```

```javascript
2b4917e9f7eea.js\",\"4945\",\"static/chunks/4945-430fa5cc2f8244f6.js\",\"9014\",\"static/chunks/9014-2de2a842f1453568.js\",\"4078\",\"static/chunks/4078-240c6ceed53849bd.js\",\"3\",\"static/chunks/3-706fe07d48eb98ff.js\",\"559\",\"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/layout-38e0735c1c8235e3.js\"],\"ScrollContainer\"
4d:I[18440,[\"6268\",\"static/chunks/f5718501-b58a5cfb1abadce5.js\",\"6500\",\"static/chunks/6500-df22b4917e9f7eea.js\",\"4945\",\"static/chunks/4945-430fa5cc2f8244f6.js\",\"9014\",\"static/chunks/9014-2de2a842f1453568.js\",\"4078\",\"static/chunks/4078-240c6ceed53849bd.js\",\"3\",\"static/chunks/3-706fe07d48eb98ff.js\",\"559\",\"static/chunks/app/sites/static/%5Bmode%5D/%5BsiteURL%5D/%5BsiteData%5D/(content)/layout-38e0735c1c8235e3.js\"],\"PagesList\"

```

--------------------------------

### Create a searchable list with a dropdown filter in Raycast (TypeScript)

Source: https://context7_llms

This TypeScript code defines a Raycast command that displays a searchable list of drinks. It includes a custom dropdown component to filter the list by drink type. The example uses Raycast UI components like List and List.Dropdown.

```typescript
import { List } from "@raycast/api";

type DrinkType = { id: string; name: string };

function DrinkDropdown(props: { drinkTypes: DrinkType[]; onDrinkTypeChange: (newValue: string) => void }) {
  const { drinkTypes, onDrinkTypeChange } = props;
  return (
    <List.Dropdown
      tooltip="Select Drink Type"
      storeValue={true}
      onChange={(newValue) => {
        onDrinkTypeChange(newValue);
      }}
    >
      <List.Dropdown.Section title="Alcoholic Beverages">
        {drinkTypes.map((drinkType) => (
          <List.Dropdown.Item key={drinkType.id} title={drinkType.name} value={drinkType.id} />
        ))}
      </List.Dropdown.Section>
    </List.Dropdown>
  );
}

export default function Command() {
  const drinkTypes: DrinkType[] = [
    { id: "1", name: "Beer" },
    { id: "2", name: "Wine" },
  ];
  const onDrinkTypeChange = (newValue: string) => {
    console.log(newValue);
  };
  return (
    <List
      navigationTitle="Search Beers"
      searchBarPlaceholder="Search your favorite drink"
      searchBarAccessory={<DrinkDropdown drinkTypes={drinkTypes} onDrinkTypeChange={onDrinkTypeChange} />}
    >
      <List.Item title="Augustiner Helles" />
      <List.Item title="Camden Hells" />
      <List.Item title="Leffe Blonde" />
      <List.Item title="Sierra Nevada IPA" />
    </List>
  );
}
```

--------------------------------

### Create a Raycast Command with List Items (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/colors

This TypeScript code demonstrates how to create a basic Raycast command that displays a list of items. It utilizes components from '@raycast/api' for UI elements and icons. The example shows how to set static and dynamic colors for icons.

```typescript
import { Color, Icon, List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item title="Built-in color" icon={{ source: Icon.Circle, tintColor: Color.Red }} />
      <List.Item title="Raw color" icon={{ source: Icon.Circle, tintColor: "#FF0000" }} />
      <List.Item
        title="Dynamic color"
        icon={{
          source: Icon.Circle,
          tintColor: {
            light: "#FF01FF",
            dark: "#FFFF50",
          }
        }}
      />
    </List>
  );
}
```

--------------------------------

### Initialize Link Icons and Event Listeners (JavaScript)

Source: https://manual.raycast.com/extensions

Initializes link icons and sets up mutation observers and navigation listeners. It uses setTimeout to delay initialization and ensures dynamic content changes are handled.

```javascript
function initialize() {
  console.log("About to initialize link icons in 500ms");
  setTimeout(() => {
    console.log("Now calling initializeLinkIcons");
    initializeLinkIcons();
    setupMutationObserver();
    setupNavigationListener();
  }, 500);
}

// ... other functions like initializeLinkIcons, setupMutationObserver, setupNavigationListener
```

--------------------------------

### Launch Command with Options in JavaScript

Source: https://developers.raycast.com/api-reference/command

This JavaScript code snippet demonstrates how to launch a command within the Raycast environment, passing specific options to it. It utilizes the `launchCommand` function, which is asynchronous and returns a Promise. Ensure the 'options' object is correctly structured according to Raycast's API.

```javascript
export async function launchCommand(options) {
  // Implementation details for launching a command with options
}
```

--------------------------------

### Cache Class Overview

Source: https://context7_llms

The Cache class allows for synchronous get, set, and remove operations on data identified by a key. Data must be stored as strings, and clients are responsible for serialization (e.g., using JSON.stringify/parse). The cache can be namespaced per command using Cache.Options.

```APIDOC
## Cache Class

### Description
Provides CRUD-style methods (get, set, remove) to update and retrieve data synchronously based on a key. The data must be a string and it is up to the client to decide which serialization format to use. A typical use case would be to use `JSON.stringify` and `JSON.parse`.
By default, the cache is shared between the commands of an extension. Use [Cache.Options](#cache.options) to configure a `namespace` per command if needed.

### Constructor
```typescript
constructor(options: Cache.Options): Cache
```

### Properties
- **isEmpty** (`boolean`) - Returns `true` if the cache is empty, `false` otherwise.

### Methods
- **get(key: string): string | undefined** - Returns the data for the given key.
- **has(key: string): boolean** - Returns `true` if data for the key exists, `false` otherwise.
- **set(key: string, data: string): void** - Sets the data for the given key.
- **remove(key: string): boolean** - Removes the data for the given key.
- **clear(options = { notifySubscribers: true }): void** - Clears all stored data.
- **subscribe(subscriber: Cache.Subscriber): Cache.Subscription** - Subscribes to cache changes.
```

--------------------------------

### DevTools: Build Status Tooltip

Source: https://context7_llms

Adds a build status tooltip to the accessory icon of development commands in the root search. This provides immediate feedback on the build status of extensions.

```javascript
// Hover over the accessory icon in root search for build status.
```

--------------------------------

### Cache Management in Raycast (TypeScript)

Source: https://developers.raycast.com/api-reference/cache

Demonstrates how to use the Raycast Cache API to store and retrieve data. It shows setting string data, parsing it as JSON, and displaying it in a List component. This example highlights the typical workflow of using JSON for serialization with the cache.

```typescript
import { List, Cache } from "@raycast/api";

type Item = { id: string; title: string };
const cache = new Cache();
cache.set("items", JSON.stringify([{ id: "1", title: "Item 1" }]));

export default function Command() {
  const cached = cache.get("items");
  const items: Item[] = cached ? JSON.parse(cached) : [];

  return (
    <List>
      {items.map((item) => (
        <List.Item key={item.id} title={item.title} />
      ))}
    </List>
  );
}
```

--------------------------------

### Displaying Loading State in Raycast List Component (TypeScript)

Source: https://context7_llms

Demonstrates how to use the `isLoading` prop on the `List` component in Raycast extensions to show a loading indicator. This is useful for managing asynchronous data fetching and providing immediate feedback to the user. The example uses `useEffect` and `useState` to control the loading state for a duration of 2 seconds.

```typescript
import { List } from "@raycast/api";
import { useEffect, useState } from "react";

export default function Command() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return <List isLoading={isLoading}>{/* Render your data */}</List>;
}
```

--------------------------------

### Raycast API: List Accessories with Dates

Source: https://context7_llms

Allows rendering of `Date` objects as nicely formatted accessories within List views in Raycast extensions.

```javascript
<List.Item
  title="Event"
  accessories={[{ date: new Date() }]} 
/>
```

--------------------------------

### File/Folder Shown Callback (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/actions

Illustrates a TypeScript callback function that is triggered when a file or folder is shown in the Finder. It accepts a path as an argument.

```typescript
export default function Command() {
  // ... other code
}

// Callback when the file or folder was shown in the Finder.
(path: "fs".PathLike) => void
```

--------------------------------

### Configure Zoom OAuth Service in JavaScript

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This JavaScript example illustrates how to configure the Zoom OAuth service for Raycast LLMs. It uses the `OAuthService.zoom` method with `ProviderOptions`, including a custom `clientId` and the 'meeting:write' scope for creating and managing Zoom meetings.

```javascript
OAuthService.zoom: (options: ProviderOptions) => OAuthService

const zoom = OAuthService.zoom({
  clientId: "custom-client-id",
  scope: "meeting:write",
});
```

--------------------------------

### Cache Operations in Raycast LLMs (JavaScript)

Source: https://developers.raycast.com/api-reference/cache

Demonstrates various cache operations for Raycast LLMs using JavaScript. This includes getting, checking for, setting, removing, and clearing cache entries. It also shows how to subscribe to cache changes.

```javascript
requestAnimationFrame(function(){$RT=performance.now()});
$RB=[];$RV=function(b){$RT=performance.now();for(var a=0;a<b.length;a+=2){var c=b[a],e=b[a+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d||"/&"===d)if(0===h)break;else h--;else"$"!==d&&"$?!==d&&"$~"!==d&&"$!"!==d&&"&"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data="$";g._reactRetry&&g._reactRetry()}}b.length=0};
$RC=function(b,a){if(a=document.getElementById(a))(b=document.getElementById(b))?(b.previousSibling.data="$~",$RB.push(b,a),2===$RB.length&&(b="number"!==typeof $RT?0:$RT,a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:b+300-a))):a.parentNode.removeChild(a)};
$RC("B:0","S:0");
sun-brightdesktopmoon
$RC("B:1","S:1");

Copy

    get(key: string): string | undefined

$RC("B:2","S:2");

Copy

    has(key: string): boolean

$RC("B:3","S:3");

Copy

    set(key: string, data: string)

$RC("B:4","S:4");

Copy

    remove(key: string): boolean

$RC("B:5","S:5");

Copy

    clear((options = { notifySubscribers: true }));

$RC("B:6","S:6");

Copy

    subscribe(subscriber: Cache.Subscriber): Cache.Subscription

$RC("B:7","S:7");

Copy

    type Subscriber = (key: string | undefined, data: string | undefined) => void;

$RC("B:8","S:8");

Copy

    type Subscription = () => void;

$RC("B:9","S:9");
sun-brightdesktopmoon
```

--------------------------------

### Open Extension Preferences in Raycast (TypeScript)

Source: https://developers.raycast.com/api-reference/preferences

This TypeScript code demonstrates how to open the current extension's preferences in Raycast. It utilizes the `openExtensionPreferences` function from the `@raycast/api` library. This is useful for guiding users to update settings, such as API keys.

```typescript
import { ActionPanel, Action, Detail, openExtensionPreferences } from "@raycast/api";

export default function Command() {
  const markdown = "API key incorrect. Please update it in extension preferences and try again.";

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action title="Open Extension Preferences" onAction={openExtensionPreferences} />
        </ActionPanel>
      }
    />
  );
}
```

--------------------------------

### Initialize Theme Management Script (JavaScript)

Source: https://manual.raycast.com/extensions

A JavaScript snippet that runs on page load to manage theme preferences. It reads 'color-preference' from localStorage and applies the corresponding class ('theme-light' or 'theme-dark') to the HTML element. Includes error handling.

```javascript
const html = document.getElementsByTagName("html")[0];
try {
 const colorPreference = localStorage
 ? localStorage.getItem("color-preference")
 : null;

 if (true) {
 html.classList.remove("theme-light");
 }
 
 if (true && colorPreference && html) {
 html.classList.add("theme-" + colorPreference);
 } else {
 html.classList.add("theme-light");
 }
 } catch (e) {
 console.log('ERROR themeEffect', e)
 html.classList.add("theme-light");
 }
```

--------------------------------

### Raycast Grid Item with Actions (JSX)

Source: https://developers.raycast.com/api-reference/user-interface/grid

This example illustrates how to add interactive actions to a Raycast Grid item. The `actions` prop accepts an `ActionPanel` which can contain various actions, such as `Action.CopyToClipboard` in this case. This allows users to interact with individual grid items.

```jsx
import { ActionPanel, Action, Grid } from "@raycast/api";
    
    export default function Command() {
      return (
        <Grid>
          <Grid.Item
            content="https://placekitten.com/400/400"
            title="Item 1"
            actions={
              <ActionPanel>
                <Action.CopyToClipboard content="👋" />
              </ActionPanel>
            }
          />
        </Grid>
      );
    }

```

--------------------------------

### Slack App Manifest Configuration (JSON)

Source: https://www.raycast.com/petr/slack-status

This JSON configuration is used to create a new Slack app. It defines the app's display name, necessary OAuth scopes for user profile and presence management, and settings for deployment and token rotation. This is a prerequisite for the manual setup of the Slack Status extension.

```json
{
    "_metadata": {
        "major_version": 1,
        "minor_version": 1
    },
    "display_information": {
        "name": "Raycast - Set Slack Status"
    },
    "oauth_config": {
        "scopes": {
            "user": [
                "emoji:read",
                "users.profile:write",
                "users.profile:read",
                "dnd:write",
                "dnd:read"
            ]
        }
    },
    "settings": {
        "org_deploy_enabled": false,
        "socket_mode_enabled": false,
        "token_rotation_enabled": false
    }
}
```

--------------------------------

### Raycast: Open With Action

Source: https://developers.raycast.com/api-reference/user-interface/actions

This Raycast extension command shows a Detail view. Its ActionPanel contains an Action.OpenWith, configured to open the user's Desktop directory. The path is dynamically determined using the `homedir()` function from the 'os' module.

```typescript
import { ActionPanel, Detail, Action } from "@raycast/api";
import { homedir } from "os";

const DESKTOP_DIR = `${homedir()}/Desktop`;

export default function Command() {
  return (
    <Detail
      markdown="What do you want to use to open your desktop with?"
      actions={
        <ActionPanel>
          <Action.OpenWith path={DESKTOP_DIR} />
        </ActionPanel>
      }
    />
  );
}
```

--------------------------------

### Define Desktop Directory Constant in JavaScript

Source: https://developers.raycast.com/api-reference/user-interface/actions

This snippet defines a constant `DESKTOP_DIR` using a template literal and the `homedir()` function to get the user's home directory. It's a common pattern for setting up file paths within a Raycast command.

```javascript
const DESKTOP_DIR = `${homedir()}/Desktop`;
```

--------------------------------

### Create a Raycast Command with Detail and Actions (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/actions

This snippet demonstrates how to create a basic Raycast command using TypeScript. It utilizes the `Detail` component to display markdown content and `ActionPanel` to provide interactive actions, such as opening a URL in a browser. This is useful for commands that need to present information and allow users to perform related tasks.

```typescript
import { ActionPanel, Detail, Action } from "@raycast/api";

export default function Command() {
  return (
    <Detail
      markdown="Join the gang!"
      actions={
        <ActionPanel>
          <Action.OpenInBrowser url="https://raycast.com/jobs" />
        </ActionPanel>
      }
    />
  );
}

```

--------------------------------

### Uncontrolled Form Example in Raycast (TypeScript)

Source: https://context7_llms

Demonstrates an uncontrolled form in Raycast, where form input values are managed internally by the Form component. This approach is simpler for basic forms. It uses @raycast/api components like Form, ActionPanel, and Form.TextField.

```typescript
import { Form, ActionPanel, Action, popToRoot, LaunchProps } from "@raycast/api";

interface TodoValues {
  title: string;
  description?: string;
  dueDate?: Date;
}

export default function Command(props: LaunchProps<{ draftValues: TodoValues }> ) {
  const { draftValues } = props;

  return (
    <Form
      enableDrafts
      actions={
        <ActionPanel>
          <Action.SubmitForm
            onSubmit={(values: TodoValues) => {
              console.log("onSubmit", values);
              popToRoot();
            }}
          />
        </ActionPanel>
      }
    >
      <Form.TextField id="title" title="Title" defaultValue={draftValues?.title} />
      <Form.TextArea id="description" title="Description" defaultValue={draftValues?.description} />
      <Form.DatePicker id="dueDate" title="Due Date" defaultValue={draftValues?.dueDate} />
    </Form>
  );
}
```

--------------------------------

### Use Full Relative File Paths for Imports

Source: https://developers.raycast.com/faq

When importing modules within your project for Raycast, it's recommended to use full relative file paths. This avoids ambiguity and ensures that Raycast can correctly resolve your module dependencies. For example, use './index.js' instead of just '.'.

```typescript
// Incorrect import
import x from '.';

// Correct import
import x from './index.js';
```

--------------------------------

### useLocalStorage Hook

Source: https://developers.raycast.com/utilities/react-hooks/uselocalstorage

The useLocalStorage hook provides a convenient way to manage state stored in the browser's local storage. It handles setting, getting, and removing values, along with loading states.

```APIDOC
## useLocalStorage Hook

### Description
A hook to manage a value in the local storage.

### Method
N/A (React Hook)

### Endpoint
N/A (React Hook)

### Parameters
#### Arguments
- **key** (string) - Required - The key to use for the value in the local storage.
- **initialValue** (T) - Optional - The initial value to use if the key doesn't exist in the local storage.

### Return
Returns an object with the following properties:
- **value** (T | undefined) - The value from the local storage or the initial value if the key doesn't exist.
- **setValue** (function) - A function to update the value in the local storage. It returns a Promise<void>.
- **removeValue** (function) - A function to remove the value from the local storage. It returns a Promise<void>.
- **isLoading** (boolean) - A boolean indicating if the value is loading.

### Example
```javascript
import { useLocalStorage } from "@raycast/utils";

function MyComponent() {
  const { value, setValue, removeValue, isLoading } = useLocalStorage<string>("myKey", "initialValue");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={() => setValue("newValue")}>Set Value</button>
      <button onClick={removeValue}>Remove Value</button>
    </div>
  );
}
```
```

--------------------------------

### Raycast CLI: Migrate Extension to Latest API Version

Source: https://context7_llms

Automates the process of migrating your Raycast extension to the latest version of the `@raycast/api`. This command simplifies updating your extension to leverage new features and improvements.

```bash
npx ray migrate
```

--------------------------------

### Get Selected Finder Items in JavaScript

Source: https://developers.raycast.com/api-reference/ai

This JavaScript snippet demonstrates how to retrieve the currently selected items in Finder. It utilizes the `getSelectedFinderItems()` function, which is part of the Raycast API. The output is a list of file paths.

```javascript
const selectedItems = await getSelectedFinderItems();
```

--------------------------------

### Initialize OAuth PKCE Client in JavaScript

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This snippet demonstrates the initialization of a new OAuth PKCE client. It is a client-side operation commonly used for secure authentication flows in web applications. The code specifies the client and its configuration, likely for interacting with LLM services.

```javascript
const client = new OAuth.PKCEClient({
  clientId: "",
  redirectUrl: "",
  discovery: {
    authorizationEndpoint: "",
    tokenEndpoint: ""
  }
});
```

--------------------------------

### OAuthService.slack

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This section details how to initialize the OAuthService for the Slack provider, including the necessary scope for authentication.

```APIDOC
## OAuthService.slack

### Description
Initializes the OAuthService for the Slack provider.

### Method
N/A (Initialization)

### Endpoint
N/A

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **options** (ProviderWithDefaultClientOptions) - Required - Options for the Slack provider, including scope.
  - **scope** (string) - Required - The scope of permissions requested for Slack.

### Request Example
```json
{
  "options": {
    "scope": "emoji:read"
  }
}
```

### Response
#### Success Response (200)
- **OAuthService** (OAuthService) - An instance of the OAuthService configured for Slack.

#### Response Example
```json
{
  "instance": "OAuthService"
}
```
```

--------------------------------

### PostHog Analytics Script Integration

Source: https://developers.raycast.com/information/best-practices

This snippet includes a JavaScript script tag for integrating PostHog analytics. It points to a specific PostHog installation URL and is configured to load asynchronously. This is a standard method for embedding third-party analytics services into a web page.

```javascript
"$","script","https://integrations.gitbook.com/v1/integrations/posthog/installations/45bb70c02653ecb28893e6b4df7d4c1bd658fb04d678be3ae62f3577b43d012a/sites/site_wqFKp/script.js?version=157.0",{\"async\":true,\"src\":\"https://integrations.gitbook.com/v1/integrations/posthog/installations/45bb70c02653ecb28893e6b4df7d4c1bd658fb04d678be3ae62f3577b43d012a/sites/site_wqFKp/script.js?version=157.0\"}
```

--------------------------------

### Execute Single File Command with useExec

Source: https://developers.raycast.com/utilities/react-hooks/useexec

This method is preferred for executing a single file. The file and its arguments do not require escaping.

```javascript
useExec('echo', ['Raycast'])
// is the same as
useExec('echo Raycast')
```

--------------------------------

### Add Link Accessory to Form - Raycast TypeScript

Source: https://context7_llms

This example shows how to add a Form.LinkAccessory to a Raycast form using TypeScript. The link accessory allows users to navigate to a specified URL, in this case, the Raycast API reference documentation. The form also includes a text field and a submit action.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";

export default function Command() {
  return (
    <Form
      searchBarAccessory={
        <Form.LinkAccessory
          target="https://developers.raycast.com/api-reference/user-interface/form"
          text="Open Documentation"
        />
      }
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Name" onSubmit={(values) => console.log(values)} />
        </ActionActionPanel>
      }
    >
      <Form.TextField id="name" defaultValue="Steve" />
    </Form>
  );
}
```

--------------------------------

### TypeScript: Raycast Command with Form Input Fields

Source: https://developers.raycast.com/information/best-practices

This snippet demonstrates a basic Raycast command written in TypeScript. It imports necessary components from '@raycast/api' and 'react', and sets up state variables for form input errors. It includes examples of TextField and PasswordField within a Form component.

```typescript
import { Form } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [nameError, setNameError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  function dropNameErrorIfNeeded() {
    if (nameError && nameError.length < 
```

--------------------------------

### TypeScript Raycast Command for Detail View

Source: https://developers.raycast.com/api-reference/user-interface/detail

This TypeScript code defines a basic Raycast command component that renders a Detail view. It imports the 'Detail' component from '@raycast/api' and displays simple markdown text. This is a foundational example for creating interactive commands within Raycast.

```typescript
import { Detail } from "@raycast/api";

export default function Command() {
 return <Detail markdown="**Hello** _World_!" />;
}
```

--------------------------------

### Error Handling Best Practices

Source: https://context7_llms

Recommendations for handling errors gracefully within Raycast extensions to ensure a good user experience.

```APIDOC
## Error Handling Best Practices

### Handle errors

Network requests can fail, permissions to files can be missing… More generally, errors happen. By default, Raycast handles every unhandled exception or unresolved Promise and shows error screens. However, you should handle the "expected" error cases for your command.

You should aim not to disrupt the user's flow just because something went wrong. For example, if a network request fails but you can read the cache, show the cache. A user might not need the fresh data straight away. In most cases, it's best to show a `Toast` with information about the error.

Here is an example of how to show a toast for an error:

```typescript
import { Detail, showToast, Toast } from "@raycast/api";
import { useEffect, useState } from "react";

export default function Command() {
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setTimeout(() => {
      setError(new Error("Booom 💥"));
    }, 1000);
  }, []);

  useEffect(() => {
    if (error) {
      showToast({
        style: Toast.Style.Failure,
        title: "Something went wrong",
        message: error.message,
      });
    }
  }, [error]);

  return <Detail markdown="Example for proper error handling" />;
}
```
```

--------------------------------

### Command Properties Documentation

Source: https://context7_llms

This section outlines the various properties that can be configured for a Raycast command, as presented in the Raycast developer documentation.

```APIDOC
## Command Properties

This documentation details the properties available for configuring a Raycast command.

### Method

N/A (Configuration properties, not an API endpoint)

### Endpoint

N/A

### Parameters

#### Command Properties

- **name** (string) - Required - A unique ID for the command, mapping to the entry point file (e.g., `src/index.ts`).
- **title** (string) - Required - The display name shown to the user in the Store and root search.
- **subtitle** (string) - Optional - The subtitle displayed in the root search, often representing the associated service or domain. Can be updated dynamically.
- **description** (string) - Required - Explains what the command does, displayed in the Store and Preferences.
- **icon** (string) - Optional - A reference to an icon file (png, at least 512x512) in the assets folder. Supports light/dark themes with `@dark` suffix. Defaults to the extension icon if not specified.
- **mode** (string) - Required - Specifies the command's behavior: `view` (shows a main view), `no-view` (no UI, e.g., opening a URL), or `menu-bar` (for Menu Bar Extras).
- **interval** (string) - Optional - For `no-view` or `menu-bar` commands, specifies background execution frequency (e.g., `90s`, `1m`, `12h`, `1d`). Minimum value is `1m`.
- **keywords** (array of strings) - Optional - An array of keywords for searching the command within Raycast.

### Request Example

N/A (Configuration properties)

### Response

N/A (Configuration properties)

#### Success Response (200)

N/A

#### Response Example

N/A
```

--------------------------------

### Uncontrolled Form.TextArea Example (TypeScript)

Source: https://context7_llms

Demonstrates how to use an uncontrolled Form.TextArea in a Raycast extension. The text area's value is managed internally, and the initial value is set using `defaultValue`. This is suitable when the form state doesn't need to be managed externally.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";

const DESCRIPTION =
  "We spend too much time staring at loading indicators. The Raycast team is dedicated to make everybody interact faster with their computers.";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Description" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.TextArea id="description" defaultValue={DESCRIPTION} />
    </Form>
  );
}
```

--------------------------------

### Markdown - Convenience Image References

Source: https://context7_llms

Markdown within the `Detail` component now supports convenience image references for icons and asset folder files, simplifying the inclusion of images.

```APIDOC
## Markdown Image References in `Detail` Component

### Description
Allows using convenience references for images within Markdown content in the `Detail` component.

### Method
Markdown rendering within the `Detail` component now supports specific image reference formats.

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
```markdown
import { Icon } from '@raycast/icons';

<Detail markdown={`
![built-in icon](${Icon.AddPerson})
![local-assets-image](example.png)
`}/>
```

### Response
N/A

#### Success Response (200)
N/A

#### Response Example
N/A
```

--------------------------------

### Create a Form with Uncontrolled Tag Picker in TypeScript

Source: https://context7_llms

This TypeScript example shows how to implement an uncontrolled tag picker in a Raycast form. Users can select multiple tags, and the default selection is 'football'. The form submission logs the selected tags to the console.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Favorite" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.TagPicker id="sports" title="Favorite Sports" defaultValue={"["football"]"}>
        <Form.TagPicker.Item value="basketball" title="Basketball" icon="🏀" />
        <Form.TagPicker.Item value="football" title="Football" icon="⚽️" />
        <Form.TagPicker.Item value="tennis" title="Tennis" icon="🎾" />
      </Form.TagPicker>
    </Form>
  );
}
```

--------------------------------

### Web Redirect Configuration for Raycast Extensions

Source: https://context7_llms

Configures a web-based redirect for OAuth flows, directing users back to the Raycast website to open an extension. This is the default and recommended method. It supports query parameters for package names and can be customized if the provider doesn't accept them.

```plaintext
https://raycast.com/redirect?packageName=Extension
```

```plaintext
https://raycast.com/redirect/extension
```

--------------------------------

### Set Multiple Value Types in Raycast LocalStorage (TypeScript)

Source: https://developers.raycast.com/api-reference/storage

This example illustrates setting different data types (string, number, boolean) into Raycast's LocalStorage using the `setItem` function. It demonstrates the flexibility of the API in handling various value types.

```typescript
import { LocalStorage } from "@raycast/api";

export default async function Command() {
  // String
  await LocalStorage.setItem("favorite-fruit", "cherry");

  // Number
  await LocalStorage.setItem("fruit-basket-count", 3);

  // Boolean
  await LocalStorage.setItem("fruit-eaten-today", true);
}
```

--------------------------------

### Dynamic Script Loading and Initialization in JavaScript

Source: https://developers.raycast.com/information/security

This JavaScript code demonstrates dynamic script loading and initialization, likely for a framework like Next.js. It uses `self.__next_f` to manage script loading and initialization. The code pushes arrays containing script identifiers and configuration data, enabling the framework to load and execute necessary JavaScript chunks and styles dynamically.

```javascript
(self.__next_f=self.__next_f||[]).push([0])
```

```javascript
self.__next_f.push([1,"1:\"$Sreact.fragment\"\n2:I[47132,[],\"\"]\n3:I[75082,[],\"\"]\ne:I[87563,[\"4219\",\"static/chunks/app/global-error-99197ad4868e95f4.js\"],\"default\"]\n:HC[\"https://static-2v.gitbook.com\",\"\"]\n:HL[\"https://static-2v.gitbook.com/_next/static/css/4cf571e71811438f.css\",\"style\"]\n:HL[\"https://static-2v.gitbook.com/_next/static/css/919cadf6c2ad1dbc.css\",\"style\"]\n:HL[\"https://static-2v.gitbook.com/_next/static/css/e4670420fc569cb1.css\",\"style\"]\n:HL[\"https://static-2v.gitbook.com/_next/static/css/4964911ca105a4d7.css\",\"style\"]\n:HL[\"https://static-2v.gitbook.com/_next/static/css/aa52f01cc4c56695.css\",\"style\"]\n:HL[\"https://static-2v.gitbook.com/_next/static/css/c36dde9599bfc781.css\",\"style\"]\n:HL[\"https://static-2v.gitbook.com/_next/static/css/dc687769ecbab58a.css\",\"style\"]\n:HL[\"https://static-2v.gitbook.com/_next/static/css/025312793db0b2d4.css\",\"style\"]\n"])
```

```javascript
self.__next_f.push([1,"0:{\"P\":null,\"b\":\"nqIxll0nG7UEyuyPCJYsM\",\"p\":\"https://static-2v.gitbook.com\",\"c\":[\"\",\"sites\",\"static\",\"url-host\",\"developers.raycast.com%2F\",\"(apiToken%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb250ZW50XzAxY2M4MjQ2OWE0ZTBiMGNjODdiZDAxZDkxZTkyNGRmN2NmOThjZGEiLCJ0YXJnZXQiOiJjb250ZW50Iiwia2luZCI6InNpdGUiLCJvcmdhbml6YXRpb24iOiItTWVlekdGbVkwN0pCd0hzWFJqNCIsInNwYWNlcyI6WyItTWVfOEEzOXRGaFpnM1VhVm9TTiJdLCJzaXRlIjoic2l0ZV93cUZLcCIsInNpdGVTcGFjZSI6InNpdGVzcF9WVFhyRCIsInNwYWNlIjoiLU1lXzhBMzl0RmhaZzNVYVZvU04iLCJyYXRlTGltaXRNdWx0aXBsaWVyIjoxMDAwMDAwLCJpYXQiOjE3Njk2NDQ4MDAsImV4cCI6MTc3MDI0OTkwMH0.R3pZrHaKwsv1k-zlYB0ZKnJ4SRBoQsywYsmrbq13axU%2CbasePath%3A%2F%2CimagesContextId%3Adevelopers.raycast.com%2Corganization%3A'-MezGFmY07JBwHsXRj4'%2Csite%3Asite_wqFKp%2CsiteBasePath%3A%2F%2CsiteSpace%3Asitesp_VTXrD%2Cspace%3A'-Me_8A39tFhZg3UaVoSN')\",\"information%2Fsecurity\"],\"i\":false,\"f\":[[[\"\",{\"children\":[\"sites\",{\"children\":[\"static\",{\"children\":[[\"mode\",\"url-host\",\"d\"],{\"children\":[[\"siteURL\",\"developers.raycast.com%2F\",\"d\"],{\"children\":[[\"siteData\",\"(apiToken%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb250ZW50XzAxY2M4MjQ2OWE0ZTBiMGNjODdiZDAxZDkxZTkyNGRmN2NmOThjZGEiLCJ0YXJnZXQiOiJjb250ZW50Iiwia2luZCI6InNpdGUiLCJvcmdhbml6YXRpb24iOiItTWVlekdGbVkwN0pCd0hzWFJqNCIsInNwYWNlcyI6WyItTWVfOEEzOXRGaFpnM1VhVm9TTiJdLCJzaXRlIjoic2l0ZV93cUZLcCIsInNpdGVTcGFjZSI6InNpdGVzcF9WVFhyRCIsInNwYWNlIjoiLU1lXzhBMzl0RmhaZzNVYVZvU04iLCJyYXRlTGltaXRNdWx0aXBsaWVyIjoxMDAwMDAwLCJpYXQiOjE3Njk2NDQ4MDAsImV4cCI6MTc3MDI0OTkwMH0.R3pZrHaKwsv1k-zlYB0ZKnJ4SRBoQsywYsmrbq13axU%2CbasePath%3A%2F%2CimagesContextId%3Adevelopers.raycast.com%2Corganization%3A'-Me
```

--------------------------------

### Get Selected Finder Items in Raycast

Source: https://developers.raycast.com/api-reference/environment

This code retrieves the currently selected items in Finder using the `getSelectedFinderItems` function. It logs the items to the console or displays a failure toast message if an error occurs.

```typescript
import { getSelectedFinderItems, showToast, Toast } from "@raycast/api";

export default async function Command() {
  try {
    const selectedItems = await getSelectedFinderItems();
    console.log(selectedItems);
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Cannot copy file path",
      message: String(error),
    });
  }
}
```

--------------------------------

### Check AI Access and Use AI Feature in Raycast

Source: https://developers.raycast.com/api-reference/environment

This snippet demonstrates how to check if the AI feature is accessible within the Raycast environment. If accessible, it uses `AI.ask` to get a response and copies it to the clipboard. Otherwise, it shows an error message.

```typescript
import { AI, showHUD, environment } from "@raycast/api";
import fs from "fs";

export default async function main() {
  if (environment.canAccess(AI)) {
    const answer = await AI.ask("Suggest 5 jazz songs");
    await Clipboard.copy(answer);
  } else {
    await showHUD("You don't have access :(");
  }
}
```

--------------------------------

### Execute Command with useExec Hook (TypeScript)

Source: https://context7_llms

This snippet demonstrates how to use the `useExec` hook from `@raycast/utils` to execute a shell command and display the results in a Raycast List. It handles command path detection for different operating systems, parses JSON output, and manages loading states.

```tsx
import { List } from "@raycast/api";
import { useExec } from "@raycast/utils";
import { cpus } from "os";
import { useMemo } from "react";

const brewPath = cpus()[0].model.includes("Apple") ? "/opt/homebrew/bin/brew" : "/usr/local/bin/brew";

export default function Command() {
  const { isLoading, data } = useExec(brewPath, ["info", "--json=v2", "--installed"]);
  const results = useMemo<{ id: string; name: string }[]>(() => JSON.parse(data || "{}").formulae || [], [data]);

  return (
    <List isLoading={isLoading}>
      {results.map((item) => (
        <List.Item key={item.id} title={item.name} />
      ))}
    </List>
  );
}
```

--------------------------------

### Describe PKCE Client Usage (HTML/JSX)

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This code describes the usage of a PKCE client, specifically mentioning 'OAuth.PKCEClient'. It indicates that this client is used for authentication flows that require Proof Key for Code Exchange. The styling suggests it's presented as a code snippet within the UI.

```jsx
<div className="blocks w-full space-y-2 lg:space-y-3 leading-normal self-center **:text-left text-left">
  <p className="has-[.button,input]:flex has-[.button,input]:flex-wrap has-[.button,input]:gap-2 has-[.button,input]:items-center mx-auto page-width-wide:mx-0 decoration-primary/6 print:break-inside-avoid w-full max-w-[unset] text-start self-start justify-start">
    $1
    <div>
      $1
      0
      <div>The PKCE Client defined using </div>
      $1
      1
      <code className="py-px px-1.5 min-w-6.5 justify-center items-center ring-1 ring-inset ring-tint bg-tint rounded-sm text-[.875em] leading-[calc(max(1.20em,1.25rem))]">
        OAuth.PKCEClient
      </code>
      $1
      2
      <div> from </div>
      $1
      3
      <code className="py-px px-1.5 min-w-6.5 justify-center items-center ring-1 ring-inset ring-tint bg-tint rounded-sm text-[.875em] leading-[calc(max(1.20em,1.25rem))]">
        
```

--------------------------------

### Manage Local Storage Data in Raycast Extensions

Source: https://developers.raycast.com/api-reference/storage

Demonstrates how to use Raycast's LocalStorage API to set, get, and remove data. This API allows extensions to store key-value pairs in a local encrypted database. It's important to note that the API is not intended for large data storage.

```typescript
import { LocalStorage } from "@raycast/api";

export default async function Command() {
  // Set an item
  await LocalStorage.setItem("favorite-fruit", "apple");

  // Get an item
  const item = await LocalStorage.getItem<string>("favorite-fruit");
  console.log(item); // Output: "apple"

  // Remove an item
  await LocalStorage.removeItem("favorite-fruit");
  const removedItem = await LocalStorage.getItem<string>("favorite-fruit");
  console.log(removedItem); // Output: undefined

  // Get all items
  const allItems = await LocalStorage.allItems();
  console.log(allItems); // Output: { "some-other-key": "some-value" }

  // Clear all items
  await LocalStorage.clear();
  const clearedItems = await LocalStorage.allItems();
  console.log(clearedItems); // Output: {}
}
```

--------------------------------

### Action.OpenWith API

Source: https://context7_llms

The Action.OpenWith action enables opening a file or URL with a specific application, presenting a sub-menu of compatible applications.

```APIDOC
## POST /actions/open-with

### Description
Opens a file or URL with a specific application. Presents a sub-menu of applications that can handle the specified path.

### Method
POST

### Endpoint
/actions/open-with

### Parameters
#### Request Body
- **path** (string) - Required - The path to open.
- **icon** (Image.ImageLike) - Optional - The icon displayed for the Action.
- **onOpen** (function) - Optional - Callback when the file or folder was opened.
- **shortcut** (Keyboard.Shortcut) - Optional - The keyboard shortcut for the Action.
- **title** (string) - Optional - The title for the Action.

### Request Example
```json
{
  "path": "/Users/user/Documents/example.txt",
  "title": "Open with Text Editor"
}
```

### Response
#### Success Response (200)
- **status** (string) - Indicates the success of the operation.

#### Response Example
```json
{
  "status": "success"
}
```
```

--------------------------------

### Copy Content to Clipboard using Raycast API

Source: https://developers.raycast.com/api-reference/clipboard

Demonstrates how to copy various types of content to the clipboard using the `Clipboard.copy` function. This includes plain text, structured content objects, and files. It also shows how to copy concealed data, which is useful for sensitive information. Error handling for file copying is included.

```typescript
import { Clipboard } from "@raycast/api";

export default async function Command() {
  // copy some text
  await Clipboard.copy("https://raycast.com");

  const textContent: Clipboard.Content = {
    text: "https://raycast.com",
  };
  await Clipboard.copy(textContent);

  // copy a file
  const file = "/path/to/file.pdf";
  try {
    const fileContent: Clipboard.Content = { file };
    await Clipboard.copy(fileContent);
  } catch (error) {
    console.log(`Could not copy file '${file}'. Reason: ${error}`);
  }

  // copy confidential data
  await Clipboard.copy("my-secret-password", { concealed: true });
}
```

--------------------------------

### Define Action Shortcut in TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/actions

This TypeScript code snippet demonstrates how to define a file path for actions within Raycast. It utilizes the 'os' module to get the user's home directory and constructs a path to a file in the Downloads folder. This is typically used for storing or accessing data related to Raycast actions.

```typescript
import { ActionPanel, Detail, Action } from "@raycast/api";
import { homedir } from "os";

const FILE = `${homedir()}/Downloads/get-rid-of-me.txt`;
```

--------------------------------

### Controlled Dropdown Form Item

Source: https://context7_llms

An example of a controlled dropdown form item in Raycast, where the selected value is managed by React's useState hook. The dropdown allows users to select their favorite programming language, and the selection updates the component's state.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [programmingLanguage, setProgrammingLanguage] = useState<string>("typescript");

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Favorite" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.Dropdown
        id="dropdown"
        title="Favorite Language"
        value={programmingLanguage}
        onChange={setProgrammingLanguage}
      >
        <Form.Dropdown.Item value="cpp" title="C++" />
        <Form.Dropdown.Item value="javascript" title="JavaScript" />
        <Form.Dropdown.Item value="ruby" title="Ruby" />
        <Form.Dropdown.Item value="python" title="Python" />
        <Form.Dropdown.Item value="swift" title="Swift" />
        <Form.Dropdown.Item value="typescript" title="TypeScript" />
      </Form.Dropdown>
    </Form>
  );
}
```

--------------------------------

### Create List Item with Detail and Metadata Link

Source: https://developers.raycast.com/api-reference/user-interface/list

This snippet demonstrates how to construct a UI element for a list item, including detailed information and a metadata link. It's useful for displaying structured data related to LLM outputs or search results within Raycast.

```jsx
title="Bulbasaur"
 detail={
  <List.Item.Detail
    metadata={
      <List.Item.Detail.Metadata>
        <List.Item.Detail.Metadata.Link
          title="Evolution"
          target="https://www.pokemon.com/us/pokedex/pikachu"
          text="Raichu"
        />
      </List.Item.Detail.Metadata>
    }
  />
}
/>
```

--------------------------------

### Show File in Finder Raycast API

Source: https://context7_llms

Opens the Finder application and reveals the specified file or directory. This provides a direct way for users to interact with files systemically.

```typescript
import { showInFinder } from "@raycast/api";
import { homedir } from "os";
import { join } from "path";

export default async function Command() {
  await showInFinder(join(homedir(), "Downloads"));
}
```

--------------------------------

### Inter-Extension Launches with launchCommand

Source: https://context7_llms

Extends the `launchCommand` function to facilitate launching other extensions. It also allows passing a `fallbackText` argument, providing a fallback option if the target command cannot be launched or executed. This promotes better integration and communication between different Raycast extensions.

```javascript
await launchCommand({ name: "other-extension-command", fallbackText: "Command not found" });
```

--------------------------------

### Fetch Data with useCachedPromise in TypeScript

Source: https://developers.raycast.com/utilities/react-hooks/usecachedpromise

This snippet demonstrates how to use the `useCachedPromise` hook to fetch data based on a search query. It includes logic for handling loading states, paginating results, and preventing screen flickering. The function fetches data from an example API and returns the data along with a `hasMore` flag for pagination.

```typescript
const { isLoading, data, pagination } = useCachedPromise(
  (searchText: string) => async (options) => {
    const response = await fetch(`https://api.example?q=${searchText}&page=${options.page}`);
    const { data } = await response.json();
    const hasMore = options.page < 50;
    return { data, hasMore };
  },
  [searchText]
);
```

--------------------------------

### Pagination Configuration

Source: https://developers.raycast.com/api-reference/user-interface/list

Provides configuration for pagination, including whether more items are available and a function to load more items.

```APIDOC
## GET /api/pagination-config

### Description
Configuration for pagination. Includes whether more items are available and a function to load more items.

### Method
GET

### Endpoint
/api/pagination-config

### Parameters
#### Query Parameters
- **hasMore** (boolean) - Required - Indicates if there are more items to load.
- **onLoadMore** (function) - Required - A function to call when more items need to be loaded.

### Response
#### Success Response (200)
- **message** (string) - A confirmation message regarding pagination setup.

#### Response Example
```json
{
  "message": "Pagination configured successfully."
}
```
```

--------------------------------

### Get Cached Items in JavaScript

Source: https://developers.raycast.com/api-reference/cache

This JavaScript snippet demonstrates how to retrieve cached items using the `cache.get()` function. It assumes the existence of a cache object and specifies the key for the items to be retrieved. The output is expected to be the cached items.

```javascript
const items = cache.get("items");
```

--------------------------------

### Create a Form with Controlled Tag Picker in TypeScript

Source: https://context7_llms

This example demonstrates a controlled tag picker in a Raycast form using TypeScript and React's useState hook. The selected countries are managed by state, allowing for dynamic updates. The form submission logs the current list of selected countries.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [countries, setCountries] = useState<string[]>(["ger", "ned", "pol"]);

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Countries" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.TagPicker id="countries" title="Visited Countries" value={countries} onChange={setCountries}>
        <Form.TagPicker.Item value="ger" title="Germany" icon="🇩🇪" />
        <Form.TagPicker.Item value="ind" title="India" icon="🇮🇳" />
        <Form.TagPicker.Item value="ned" title="Netherlands" icon="🇳🇱" />
        <Form.TagPicker.Item value="nor" title="Norway" icon="🇳🇴" />
        <Form.TagPicker.Item value="pol" title="Poland" icon="🇵🇱" />
        <Form.TagPicker.Item value="rus" title="Russia" icon="🇷🇺" />
        <Form.TagPicker.Item value="sco" title="Scotland" icon="🏴󠁧󠁢󠁳󠁣󠁴󠁿" />
      </Form.TagPicker>
    </Form>
  );
}
```

--------------------------------

### Get Browser Tab Content

Source: https://context7_llms

Retrieves content from browser tabs based on specified options. Supports HTML, text, and markdown formats. Can filter content using CSS selectors. If no tab ID is provided, it defaults to the active tab in the focused window.

```typescript
import { BrowserExtension } from "@raycast/api";

async function getTabContent(options: {
  cssSelector?: string;
  format?: "html" | "text" | "markdown";
  tabId?: number;
}): Promise<string> {
  return BrowserExtension.getContent(options);
}
```

--------------------------------

### Link Tooltip and Action Localization

Source: https://developers.raycast.com/utilities/react-hooks/useexec

Provides localized strings for various link tooltips and actions within the GitBook interface. This ensures that users understand the purpose of different links and interactive elements, such as external links, email links, and page anchors.

```json
{
  "link_tooltip_external_link": "External link to",
  "link_tooltip_email": "Send an email to",
  "link_tooltip_page_anchor": "Jump to section",
  "open_in_new_tab": "Open in new tab"
}
```

--------------------------------

### List Item with Accessories (TypeScript)

Source: https://context7_llms

Demonstrates how to create a List.Item in Raycast with various types of accessories, including text, colored text, icons, dates, and tags. This allows for rich display of additional information alongside list item titles.

```typescript
import { Color, Icon, List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item
        title="An Item with Accessories"
        accessories={[
          { text: `An Accessory Text`, icon: Icon.Hammer },
          { text: { value: `A Colored Accessory Text`, color: Color.Orange }, icon: Icon.Hammer },
          { icon: Icon.Person, tooltip: "A person" },
          { text: "Just Do It!" },
          { date: new Date() },
          { tag: new Date() },
          { tag: { value: new Date(), color: Color.Magenta } },
          { tag: { value: "User", color: Color.Magenta }, tooltip: "Tag with tooltip" },
        ]}
      />
    </List>
  );
}
```

--------------------------------

### Add Publish Script to package.json

Source: https://developers.raycast.com/basics/publish-an-extension

If the `publish` script is missing in your `package.json`, you can add it manually. This ensures the `npm run publish` command is available to streamline the extension publishing process.

```json
{
  "scripts": {
    "publish": "npx @raycast/api@latest publish"
  }
}
```

--------------------------------

### Configure ESLint Plugins for TypeScript

Source: https://developers.raycast.com/migration/v1.48.8

This snippet demonstrates how to configure ESLint to include the `@typescript-eslint` plugin. This plugin provides additional rules and capabilities for linting TypeScript code, enhancing code quality and consistency. It's a common setup for TypeScript projects using ESLint.

```json
{
  "plugins": [
    "@typescript-eslint"
  ]
}
```

--------------------------------

### Configure Linear OAuthService (Built-in)

Source: https://context7_llms

Initializes the OAuthService for Linear using its built-in static property. This utilizes Raycast's pre-configured OAuth app for streamlined authentication. Requires specifying the desired scopes.

```tsx
const linear = OAuthService.linear({ scope: "read write" });
```

--------------------------------

### Create a Form with Submit Action in React

Source: https://developers.raycast.com/api-reference/user-interface/actions

This snippet shows how to create a React form with a submit button using Raycast's Form and ActionPanel components. The onSubmit function logs the form values to the console. It includes a Checkbox component as an example input.

```jsx
return (
  <Form
    actions={
      <ActionPanel>
        <Action.SubmitForm title="Submit Answer" onSubmit={(values) => console.log(values)} />
      </ActionPanel>
    }
  >
    <Form.Checkbox id="answer" label="Are you happy?" defaultValue={true} />
  </Form>
);
```