### Initialize Raycast Extension with npm

Source: https://developers.raycast.com/information/developer-tools/templates

This command initializes a new Raycast extension using a specified template. It requires Node.js and npm to be installed. The template name determines the starting structure and features of the extension.

```bash
npm init raycast-extension -t <template-name>
```

--------------------------------

### List with Custom Empty View Example

Source: https://developers.raycast.com/api-reference/user-interface/list

Provides an example of how to display a custom empty view when the list has no items or when the user starts typing a search query. This enhances user experience by providing guidance.

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
      <bos>
    </List>
  );
}
```

--------------------------------

### Full Example: Paginated List in Raycast

Source: https://developers.raycast.com/utilities/react-hooks/usefetch

A complete example demonstrating how to use the `useFetch` hook with pagination to display a list of companies in a Raycast command. It includes setting up state for search text, fetching data with pagination, and rendering the results using Raycast's `List` component.

```tsx
import { Icon, Image, List } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useState } from "react";

type SearchResult = { companies: Company[]; page: number; totalPages: number };
type Company = { id: number; name: string; smallLogoUrl?: string };
export default function Command() {
  const [searchText, setSearchText] = useState("");
  const { isLoading, data, pagination } = useFetch(
    (options) =>
      "https://api.ycombinator.com/v0.1/companies?" +
      new URLSearchParams({ page: String(options.page + 1), q: searchText }).toString(),
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

### Ask AI and copy to clipboard using TypeScript

Source: https://developers.raycast.com/api-reference/ai

This example demonstrates how to use the `AI.ask` function to get an answer from the AI and then copy that answer to the user's clipboard. It requires the `@raycast/api` library.

```typescript
import { AI, Clipboard } from "@raycast/api";

export default async function command() {
  const answer = await AI.ask("Suggest 5 jazz songs");

  await Clipboard.copy(answer);
}
```

--------------------------------

### List Item with Actions Example

Source: https://developers.raycast.com/api-reference/user-interface/list

Illustrates how to add interactive actions to list items. This example includes a 'Copy to Clipboard' action for an item.

```jsx
import { ActionPanel, Action, List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item
        title="Item 1"
        actions={
          <ActionPanel>
            <Action.CopyToClipboard content="👋" />
          </ActionPanel>
        }
      />
    </List>
  );
}
```

--------------------------------

### Install @raycast/utils Package

Source: https://developers.raycast.com/utilities/getting-started

Installs the @raycast/utils package using npm. This package has a peer dependency on @raycast/api, meaning a specific version of utils requires a version above a certain version of api. npm will warn if this condition is not met.

```bash
npm install --save @raycast/utils
```

--------------------------------

### Basic List Item Example

Source: https://developers.raycast.com/api-reference/user-interface/list

Demonstrates how to create a simple list with basic items using the Raycast List component. Each item can have a title and an optional subtitle.

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

### List with Sections Example

Source: https://developers.raycast.com/api-reference/user-interface/list

Shows how to organize list items into sections, each with a title and an optional subtitle. This helps in structuring and categorizing content within the list.

```jsx
import { List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Section title="Section 1">
        <List.Item title="Item 1" />
      </List.Section>
      <List.Section title="Section 2" subtitle="Optional subtitle">
        <List.Item title="Item 1" />
      </List.Section>
    </List>
  );
}
```

--------------------------------

### Example Usage of Form.TagPicker.Item

Source: https://developers.raycast.com/api-reference/user-interface/form

A complete TypeScript example demonstrating how to use Form.TagPicker.Item within a Raycast Form. It showcases setting up a TagPicker with multiple color options and an onSubmit action to log the selected values.

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

### Implement Tool Confirmation (TypeScript)

Source: https://developers.raycast.com/api-reference/tool

Provides an example implementation of a `Tool.Confirmation` function in TypeScript. This specific example creates a confirmation to ask the user if they are sure they want to greet a provided name. It returns a confirmation object with a descriptive message.

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

### Image Component Examples (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/icons-and-images

Provides examples of different ways to use the Image component, including built-in icons, tinted icons, bundled assets with masks, and theme-aware images. It showcases how to specify image sources and apply transformations.

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

### List with Detail View and Actions Example

Source: https://developers.raycast.com/api-reference/user-interface/list

Demonstrates a dynamic list where items can display detailed information in a separate pane. It includes toggling the detail view and opening a browser action.

```jsx
import { useState } from "react";
import { Action, ActionPanel, List } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  id: string;
  types: string[];
  abilities: Array<{ name: string; isMainSeries: boolean }>;
}

const pokemons: Pokemon[] = [
  {
    name: "bulbasaur",
    height: 7,
    weight: 69,
    id: "001",
    types: ["Grass", "Poison"],
    abilities: [
      { name: "Chlorophyll", isMainSeries: true },
      { name: "Overgrow", isMainSeries: true },
    ],
  },
  {
    name: "ivysaur",
    height: 10,
    weight: 130,
    id: "002",
    types: ["Grass", "Poison"],
    abilities: [
      { name: "Chlorophyll", isMainSeries: true },
      { name: "Overgrow", isMainSeries: true },
    ],
  },
];

export default function Command() {
  const [showingDetail, setShowingDetail] = useState(true);
  const { data, isLoading } = useCachedPromise(() => new Promise<Pokemon[]>((resolve) => resolve(pokemons)));

  return (
    <List isLoading={isLoading} isShowingDetail={showingDetail}>
      {data &&
        data.map((pokemon) => {
          const props: Partial<List.Item.Props> = showingDetail
            ? {
                detail: (
                  <List.Item.Detail
                    markdown={`![Illustration](https://assets.pokemon.com/assets/cms2/img/pokedex/full/${
                      pokemon.id
                    }.png)\n\n${pokemon.types.join(" ")}`}
                  />
                ),
              }
            : { accessories: [{ text: pokemon.types.join(" ") }] };
          return (
            <List.Item
              key={pokemon.id}
              title={pokemon.name}
              subtitle={`#${pokemon.id}`}
              {...props}
              actions={
                <ActionPanel>
                  <Action.OpenInBrowser url={`https://www.pokemon.com/us/pokedex/${pokemon.name}`} />
                  <Action title="Toggle Detail" onAction={() => setShowingDetail(!showingDetail)} />
                </ActionPanel>
              }
            />
          );
        })}
    </List>
  );
}
```

--------------------------------

### Install ESLint Configuration Dependency (npm)

Source: https://developers.raycast.com/migration/v1.48.8

Installs the `@raycast/eslint-config` package as a development dependency using npm. This is the first step in migrating to the new ESLint configuration.

```bash
npm install @raycast/eslint-config --save-dev
```

--------------------------------

### Example: Using withAccessToken with onAuthorize Callback (TypeScript)

Source: https://developers.raycast.com/utilities/oauth/withaccesstoken

Shows how to configure `withAccessToken` with an `onAuthorize` callback to initialize services like `LinearClient` after successful OAuth. This is useful for setting up SDK clients.

```tsx
import { OAuthService } from "@raycast/utils";
import { LinearClient, LinearGraphQLClient } from "@linear/sdk";

let linearClient: LinearClient | null = null;

const linear = OAuthService.linear({
  scope: "read write",
  onAuthorize({ token }) {
    linearClient = new LinearClient({ accessToken: token });
  },
});

function MyIssues() {
  return; // ...
}

export default withAccessToken(linear)(View);
```

--------------------------------

### useAI Hook Example Usage

Source: https://developers.raycast.com/utilities/react-hooks/useai

Demonstrates a practical implementation of the useAI hook within a React component. It shows how to call the hook with a prompt, display loading states, and render the AI-generated content using the Detail component from @raycast/api.

```typescript
import { Detail } from "@raycast/api";
import { useAI } from "@raycast/utils";

export default function Command() {
  const { data, isLoading } = useAI("Suggest 5 jazz songs");

  return <Detail isLoading={isLoading} markdown={data} />;
}
```

--------------------------------

### Example: Using withAccessToken in a No-View Command (TypeScript)

Source: https://developers.raycast.com/utilities/oauth/withaccesstoken

Illustrates the usage of `withAccessToken` for a 'no-view' command. This example shows how to wrap an asynchronous function that performs an action after authorization.

```tsx
import { showHUD } from "@raycast/api";
import { withAccessToken } from "@raycast/utils";
import { authorize } from "./oauth";

async function AuthorizedCommand() {
  await showHUD("Authorized");
}

export default withAccessToken({ authorize })(AuthorizedCommand);
```

--------------------------------

### Get Desktops - TypeScript

Source: https://developers.raycast.com/api-reference/window-management

Retrieves a list of all available desktops across all connected screens. This function helps in understanding the user's multi-desktop setup. It returns a Promise that resolves with an array of Desktop objects.

```typescript
import { WindowManagement, showToast } from "@raycast/api";

export default function Command() {
  const desktops = await WindowManagement.getDesktops();
  const screens = Set(desktops.map((desktop) => desktop.screenId));
  showToast({ title: `Found ${desktops.length} desktops on ${screens.size} screens.` });
}
```

--------------------------------

### Get Applications Raycast API

Source: https://developers.raycast.com/api-reference/utilities

Retrieves a list of applications that can open a given file or URL. If no path is provided, it returns all installed applications. This function is crucial for checking application availability and deep-linking.

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

### Configure Zoom OAuth Service

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This example illustrates the configuration of the OAuthService for Zoom, which requires a custom client setup. Using the static `zoom` property, it expects `ProviderOptions` including `clientId` and the specific `scope` for desired permissions, like 'meeting:write'.

```tsx
const zoom = OAuthService.zoom({
  clientId: "custom-client-id",
  scope: "meeting:write",
});
```

--------------------------------

### Install React Developer Tools Globally - npm

Source: https://developers.raycast.com/basics/debug-an-extension

Install the `react-devtools` package globally using npm. This enables you to run the standalone DevTools application from your terminal, which Raycast will automatically connect to for debugging your component tree.

```bash
npm install -g react-devtools@6.1.1
```

--------------------------------

### Create a Form with Dropdown Item (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/form

This example demonstrates how to create a basic form with a dropdown menu containing a single item using the Raycast API. It includes the necessary imports and the structure for a submit action.

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

### Install React Developer Tools - npm

Source: https://developers.raycast.com/basics/debug-an-extension

Add the `react-devtools` package as a development dependency to your extension using npm. This allows you to inspect and debug React components within your Raycast extension. After installation, rebuild your extension and launch the tools via a keyboard shortcut.

```bash
npm install --save-dev react-devtools@6.1.1
```

--------------------------------

### Full Example: Paginated List Component

Source: https://developers.raycast.com/utilities/react-hooks/usecachedpromise

This is a complete React component example using the useCachedPromise hook with pagination. It displays a list of items, fetches them in pages, and integrates with Raycast's List component for a seamless pagination experience.

```typescript
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

### Example Usage of useLocalStorage in a Raycast Command (TypeScript/React)

Source: https://developers.raycast.com/utilities/react-hooks/uselocalstorage

Demonstrates how to use the useLocalStorage hook within a Raycast command to manage a list of todos. It shows initializing, displaying, and updating todo items stored in local storage.

```tsx
import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";
import { useLocalStorage } from "@raycast/utils";

const exampleTodos = [
  { id: "1", title: "Buy milk", done: false },
  { id: "2", title: "Walk the dog", done: false },
  { id: "3", title: "Call mom", done: false },
];

export default function Command() {
  const { value: todos, setValue: setTodos, isLoading } = useLocalStorage("todos", exampleTodos);

  async function toggleTodo(id: string) {
    const newTodos = todos?.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)) ?? [];
    await setTodos(newTodos);
  }

  return (
    <List isLoading={isLoading}>
      {todos?.map((todo) => (
        <List.Item
          icon={todo.done ? { source: Icon.Checkmark, tintColor: Color.Green } : Icon.Circle}
          key={todo.id}
          title={todo.title}
          actions={
            <ActionPanel>
              <Action title={todo.done ? "Uncomplete" : "Complete"} onAction={() => toggleTodo(todo.id)} />
              <Action title="Delete" style={Action.Style.Destructive} onAction={() => toggleTodo(todo.id)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
```

--------------------------------

### Structuring Raycast Lists with Sections

Source: https://developers.raycast.com/api-reference/user-interface/list

Shows how to organize List.Item components into logical groups using List.Section. This example categorizes different beers into 'Lager' and 'IPA' sections for better user navigation.

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
  );
}
```

--------------------------------

### Example Raycast Manifest File (JavaScript)

Source: https://developers.raycast.com/information/manifest

This code snippet demonstrates a typical package.json manifest file for a Raycast extension. It includes essential Raycast-specific fields such as name, title, description, icon, author, platforms, categories, license, and command configurations.

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

### Implement Optimistic UI Updates in Raycast

Source: https://developers.raycast.com/utilities/react-hooks/usefetch

This example shows how to implement optimistic UI updates using the `mutate` function from `useFetch` in Raycast. It includes an `optimisticUpdate` function to immediately reflect changes and a `rollbackOnError` function (implicitly handled by Raycast if not provided) to revert changes if the asynchronous update fails, enhancing responsiveness.

```tsx
import { Detail, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import { useFetch } from "@raycast/utils";

export default function Command() {
  const { isLoading, data, mutate } = useFetch("https://api.example");

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

### Directory Picker in TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/form

This example configures a file picker specifically for selecting directories. It uses `canChooseDirectories` and `canChooseFiles={false}` to restrict selection to directories only. The selected directory path is logged.

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
            onSubmit={(values: { folders: string[] }) => {
              const folder = values.folders[0];
              if (!fs.existsSync(folder) || fs.lstatSync(folder).isDirectory()) {
                return false;
              }
              console.log(folder);
            }}
          />
        </ActionPanel>
      }
    >
      <Form.FilePicker id="folders" allowMultipleSelection={false} canChooseDirectories canChooseFiles={false} />
    </Form>
  );
}
```

--------------------------------

### Example Usage of runAppleScript

Source: https://developers.raycast.com/utilities/functions/runapplescript

Demonstrates how to use the runAppleScript function to execute an AppleScript that returns a greeting. It imports necessary functions from '@raycast/api' and '@raycast/utils', defines an async function to run the script with an argument, and displays the result using showHUD.

```typescript
import { showHUD } from "@raycast/api";
import { runAppleScript } from "@raycast/utils";

export default async function () {
  const res = await runAppleScript(
    `
on run argv
  return "hello, " & item 1 of argv & "."
end run
`,
    ["world"],
  );
  await showHUD(res);
}
```

--------------------------------

### Example: Raycast Grid with Dropdown

Source: https://developers.raycast.com/api-reference/user-interface/grid

Demonstrates how to implement a Raycast Grid with a search bar accessory that includes a dropdown menu. The dropdown allows users to select from predefined items, showcasing the integration of Grid.Dropdown and Grid.Dropdown.Item.

```typescript
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

### Form.Separator Example in TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/form

Demonstrates how to use Form.Separator to visually group and separate form elements in a Raycast command. It requires importing necessary components from '@raycast/api'.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Form" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.TextField id="textfield" />
      <Form.Separator />
      <Form.TextArea id="textarea" />
    </Form>
  );
}
```

--------------------------------

### Raycast Image.URL Example

Source: https://developers.raycast.com/api-reference/user-interface/icons-and-images

Demonstrates using a URL string directly as an image source in Raycast. This is a straightforward way to display remote images within the extension.

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

### Raycast Image.Asset Example

Source: https://developers.raycast.com/api-reference/user-interface/icons-and-images

Illustrates how to reference an image asset from the Raycast extension's `assets/` folder using its filename. This is used for local image resources.

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

### React Example of useFetch for Data Display

Source: https://developers.raycast.com/utilities/react-hooks/usefetch

Demonstrates how to use the `useFetch` hook within a React component to fetch data from an API and display it in a Raycast `Detail` view. It shows how to handle loading states, render fetched data, and provide a 'Reload' action using the `revalidate` function.

```tsx
import { Detail, ActionPanel, Action } from "@raycast/api";
import { useFetch } from "@raycast/utils";

export default function Command() {
  const { isLoading, data, revalidate } = useFetch("https://api.example");

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

### Initialize and Use Cache in TypeScript

Source: https://developers.raycast.com/api-reference/cache

Demonstrates how to initialize a Cache instance, set stringified data, and retrieve/parse it for use in a Raycast List component. This example assumes the data is JSON-serializable.

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

### Execute Shell Command with useExec Hook (TypeScript)

Source: https://developers.raycast.com/utilities/react-hooks/useexec

Demonstrates how to use the `useExec` hook to run a shell command and process its JSON output. It fetches installed formulae using the 'brew' command and displays them in a List. The hook handles loading states and parsing of the command's output.

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

### usePromise Hook Example Usage in a React Component

Source: https://developers.raycast.com/utilities/react-hooks/usepromise

Demonstrates how to use the usePromise hook within a React component to fetch data from a URL and display it. It includes setting up an AbortController for cancellation and provides a reload action.

```tsx
import { Detail, ActionPanel, Action } from "@raycast/api";
import { usePromise } from "@raycast/utils";

export default function Command() {
  const abortable = useRef<AbortController>();
  const { isLoading, data, revalidate } = usePromise(
    async (url: string) => {
      const response = await fetch(url, { signal: abortable.current?.signal });
      const result = await response.text();
      return result;
    },
    ["https://api.example"],
    {
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

### Customizing ESLint Configuration with Raycast Plugin Rules

Source: https://developers.raycast.com/information/developer-tools/eslint

This example demonstrates how to customize the default ESLint configuration by adding or modifying specific rules. It includes the @raycast/prefer-placeholders rule, setting its severity to 'warn'. This allows for tailored linting based on project needs.

```javascript
const { defineConfig } = require("eslint/config");
const raycastConfig = require("@raycast/eslint-config");

module.exports = defineConfig([
  ...raycastConfig,
  {
    rules: {
      "@raycast/prefer-placeholders": "warn",
    },
  },
]);
```

--------------------------------

### Example Usage of useSQL Hook

Source: https://developers.raycast.com/utilities/react-hooks/usesql

Demonstrates how to use the useSQL hook in a React component to fetch and display data from a local SQL database. It includes handling loading states and permission views.

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

### Create a Menu Bar Command with Menu Items

Source: https://developers.raycast.com/api-reference/menu-bar-commands

This TypeScript example demonstrates how to create a menu bar command that displays items in the menu bar. It utilizes `MenuBarExtra` to define sections and individual menu items, each with an action to open a URL. The command fetches and displays bookmark data.

```typescript
import { Icon, MenuBarExtra, open } from "@raycast/api";

const data = {
  archivedBookmarks: [{ name: "Google Search", url: "www.google.com" }],
  newBookmarks: [{ name: "Raycast", url: "www.raycast.com" }]
};

export default function Command() {
  return (
    <MenuBarExtra icon={Icon.Bookmark}>
      <MenuBarExtra.Section title="New">
        {data?.newBookmarks.map((bookmark) => (
          <MenuBarExtra.Item key={bookmark.url} title={bookmark.name} onAction={() => open(bookmark.url)} />
        ))}
      </MenuBarExtra.Section>
      <MenuBarExtra.Section title="Archived">
        {data?.archivedBookmarks.map((bookmark) => (
          <MenuBarExtra.Item key={bookmark.url} title={bookmark.name} onAction={() => open(bookmark.url)} />
        ))}
      </MenuBarExtra.Section>
    </MenuBarExtra>
  );
}
```

--------------------------------

### Configure AI Instructions in package.json

Source: https://developers.raycast.com/ai/learn-core-concepts-of-ai-extensions

Specifies custom instructions for the AI within the `package.json` file under the `ai.instructions` key. This guides the AI's behavior and response generation for the extension.

```json
{
  "ai": {
    "instructions": "When you don't know the user's first name, ask for it."
  }
}
```

--------------------------------

### Uncontrolled DatePicker Example (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/form

Demonstrates how to use the Form.DatePicker component in an uncontrolled manner, where the component manages its own state. This is suitable for simple forms where explicit state management is not required.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Form" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.DatePicker id="dateOfBirth" title="Date of Birth" defaultValue={new Date(1955, 1, 24)} />
    </Form>
  );
}
```

--------------------------------

### Single Selection File Picker in TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/form

This example demonstrates a file picker configured for single file selection. It validates that the selected path exists and is a file before logging it. The `allowMultipleSelection` prop is set to `false`.

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

### Open File/Directory with Application using Raycast API

Source: https://developers.raycast.com/api-reference/user-interface/actions

This example demonstrates using the Action.OpenWith action to open a file or directory with a specific application. It requires the '@raycast/api' and 'os' packages and takes a file path as input.

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

### Configure Asana OAuth Service

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This example demonstrates how to easily configure the OAuthService for Asana using its static `asana` property. It requires minimal configuration, typically just specifying the desired scope, as Raycast has a pre-configured OAuth app for Asana.

```tsx
const asana = OAuthService.asana({ scope: "default" });
```

--------------------------------

### Initialize OAuth PKCE Client

Source: https://developers.raycast.com/api-reference/oauth

Creates a new OAuth PKCE client instance. Configure it with a provider name, icon, description, and choose a redirect method. The redirect URI must be configured in your provider's OAuth app settings.

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

### Example: Using withAccessToken in a View Command (TypeScript)

Source: https://developers.raycast.com/utilities/oauth/withaccesstoken

Demonstrates how to use the `withAccessToken` higher-order function to wrap a React component for a 'view' command. It requires an `authorize` function and imports necessary components from Raycast.

```tsx
import { List } from "@raycast/api";
import { withAccessToken } from "@raycast/utils";
import { authorize } from "./oauth";

function AuthorizedComponent(props) {
  return; // ...
}

export default withAccessToken({ authorize })(AuthorizedComponent);
```

--------------------------------

### Initialize PKCEClient and OAuthService

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This snippet demonstrates how to initialize a PKCEClient for a specific provider (GitHub) and then use it to create an instance of the OAuthService. It configures essential details like redirect method, provider information, client ID, scopes, and authorization/token URLs.

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

### Authorize OAuth Flow

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This code example shows how to initiate the OAuth authorization process using the `authorize` method of an `OAuthService` instance. It returns a promise that resolves with the access token obtained after the user completes the authorization flow.

```typescript
const accessToken = await oauthService.authorize();
```

--------------------------------

### Example Usage of useFrecencySorting with Raycast UI Components

Source: https://developers.raycast.com/utilities/react-hooks/usefrecencysorting

Demonstrates how to use the useFrecencySorting hook within a Raycast command. It fetches data using `useFetch`, sorts it with `useFrecencySorting`, and renders a `List` component. Actions within list items call `visitItem` on interaction and `resetRanking` for resetting.

```typescript
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

### Configure Linear OAuth Service

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This example demonstrates configuring the OAuthService for Linear using its static `linear` property. It requires `ProviderOptions` and typically involves specifying read and write scopes for the integration.

```tsx
const linear = OAuthService.linear({ scope: "read write" });
```

--------------------------------

### Create MenuBarExtra with Items and Submenus (TypeScript)

Source: https://developers.raycast.com/api-reference/menu-bar-commands

This example shows how to create a basic menu bar extra with static menu items and nested submenus. It utilizes the `MenuBarExtra` and `MenuBarExtra.Item` components from the `@raycast/api` library. The `open` function is used to navigate to URLs when menu items are clicked.

```typescript
import { Icon, MenuBarExtra, open } from "@raycast/api";

export default function Command() {
  return (
    <MenuBarExtra icon={Icon.Bookmark}>
      <MenuBarExtra.Item icon="raycast.png" title="Raycast.com" onAction={() => open("https://raycast.com")} />
      <MenuBarExtra.Submenu icon="github.png" title="GitHub">
        <MenuBarExtra.Item title="Pull Requests" onAction={() => open("https://github.com/pulls")} />
        <MenuBarExtra.Item title="Issues" onAction={() => open("https://github.com/issues")} />
      </MenuBarExtra.Submenu>
      <MenuBarExtra.Submenu title="Disabled"></MenuBarExtra.Submenu>
    </MenuBarExtra>
  );
}
```

--------------------------------

### Add Actions to List Item in React

Source: https://developers.raycast.com/examples/hacker-news

This component renders an ActionPanel with options to open a story in the browser or copy its link. It takes an 'item' object as a prop, which should contain 'title', 'link', and 'guid' properties. The actions are conditionally rendered based on the presence of 'link' and 'guid'.

```typescript
function Actions(props: { item: Parser.Item }) {
  return (
    <ActionPanel title={props.item.title}>
      <ActionPanel.Section>
        {props.item.link && <Action.OpenInBrowser url={props.item.link} />}
        {props.item.guid && <Action.OpenInBrowser url={props.item.guid} title="Open Comments in Browser" />}
      </ActionPanel.Section>
      <ActionPanel.Section>
        {props.item.link && (
          <Action.CopyToClipboard
            content={props.item.link}
            title="Copy Link"
            shortcut={Keyboard.Shortcut.Common.Copy}
          />
        )}
      </ActionPanel.Section>
    </ActionPanel>
  );
}
```

--------------------------------

### OAuthService Initialization

Source: https://developers.raycast.com/utilities/oauth/oauthservice

Demonstrates how to initialize the OAuthService with a PKCEClient for a specific provider like GitHub.

```APIDOC
## OAuthService Initialization

### Description
Initializes the `OAuthService` with a configured `PKCEClient` for a specific OAuth provider.

### Method
`constructor(options: OAuthServiceOptions)`

### Parameters
#### Request Body
- **client** (OAuth.PKCEClient) - Required - An instance of `PKCEClient` configured for the desired provider.
- **clientId** (string) - Required - The client ID obtained from the OAuth provider.
- **scope** (string) - Required - The requested scopes for the authorization.
- **authorizeUrl** (string) - Required - The authorization endpoint URL of the OAuth provider.
- **tokenUrl** (string) - Required - The token endpoint URL of the OAuth provider.

### Request Example
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
```

--------------------------------

### Check API Access with environment.canAccess (TypeScript)

Source: https://developers.raycast.com/api-reference/environment

This example shows how to use the `environment.canAccess` function to determine if the current Raycast environment has access to a specific API, like the AI API. It conditionally executes code based on access.

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

### Grid with Actions in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/grid

Illustrates how to add interactive actions to Grid items in Raycast. This example shows a CopyToClipboard action associated with a grid item.

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

--------------------------------

### Launch Command with Context (JavaScript)

Source: https://developers.raycast.com/misc/changelog

Demonstrates how to launch commands with specific context, such as for creating quicklinks or snippets. This requires specifying the owner, extension name, command name, launch type, and a context object containing relevant details like application name, text, or keywords.

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

### Integrate Todo Creation Action into Raycast List

Source: https://developers.raycast.com/examples/todo-list

Integrates the `CreateTodoAction` into the main Raycast List component. This allows users to create new todos when the list is empty. It manages the state of the todos array and updates it upon successful creation of a new todo.

```typescript
import { List, ActionPanel } from "@raycast/api";
import { useState } from "react";

interface Todo {
  title: string;
  isCompleted: boolean;
}

function CreateTodoForm(props: { onCreate: (todo: Todo) => void }) {
  const { pop } = useNavigation();

  function handleSubmit(values: { title: string }) {
    props.onCreate({ title: values.title, isCompleted: false });
    pop();
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Todo" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="title" title="Title" />
    </Form>
  );
}

function CreateTodoAction(props: { onCreate: (todo: Todo) => void }) {
  return (
    <Action.Push
      icon={Icon.Pencil}
      title="Create Todo"
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      target={<CreateTodoForm onCreate={props.onCreate} />}
    />
  );
}

export default function Command() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function handleCreate(todo: Todo) {
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  }

  return (
    <List
      actions={
        <ActionPanel>
          <CreateTodoAction onCreate={handleCreate} />
        </ActionPanel>
      }
    >
      {todos.map((todo, index) => (
        <List.Item key={index} title={todo.title} />
      ))}
    </List>
  );
}
```

--------------------------------

### Uncontrolled Form Dropdown Example

Source: https://developers.raycast.com/api-reference/user-interface/form

Demonstrates an uncontrolled dropdown in a Raycast Form. The component manages its own state, and the selected value is accessed upon form submission.

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

### InterExtensionLaunchOptions

Source: https://developers.raycast.com/api-reference/command

Defines the structure for options when launching a command from a different extension. It includes essential details about the target extension and command, along with optional parameters for arguments, context, and fallback text.

```APIDOC
## InterExtensionLaunchOptions

### Description
The options that can be used when launching a command from a different extension.

### Method
N/A (This describes a data structure, not an API endpoint)

### Endpoint
N/A

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **extensionName** (string) - Required - When launching command from a different extension, the extension name (as defined in the extension's manifest) is necessary.
- **name** (string) - Required - Command name as defined in the extension's manifest.
- **ownerOrAuthorName** (string) - Required - When launching command from a different extension, the owner or author (as defined in the extension's manifest) is necessary.
- **type** (LaunchType) - Required - LaunchType.UserInitiated or LaunchType.Background.
- **arguments** (Arguments or null) - Optional - Optional object for the argument properties and values as defined in the extension's manifest, for example: `{ "argument1": "value1" }`.
- **context** (LaunchContext or null) - Optional - Arbitrary object for custom data that should be passed to the command and accessible as LaunchProps; the object must be JSON serializable (Dates and Buffers supported).
- **fallbackText** (string or null) - Optional - Optional string to send as fallback text to the command.

### Request Example
```json
{
  "extensionName": "my-other-extension",
  "name": "my-command",
  "ownerOrAuthorName": "my-username",
  "type": "LaunchType.UserInitiated",
  "arguments": {
    "searchQuery": "example"
  },
  "context": {
    "source": "my-extension"
  },
  "fallbackText": "Default search result"
}
```

### Response
#### Success Response (200)
N/A (This describes a data structure, not an API endpoint)

#### Response Example
N/A
```

--------------------------------

### Type-Safe Form Values Submission in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/form

Demonstrates how to define a TypeScript interface for type-safe form values and handle form submissions using onSubmit. This example uses Form.TextField and Form.DatePicker, requiring the '@raycast/api' package.

```typescript
import { Form, Action, ActionPanel } from "@raycast/api";

interface Values {
  todo: string;
  due?: Date;
}

export default function Command() {
  function handleSubmit(values: Values) {
    console.log(values);
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="todo" title="Todo" />
      <Form.DatePicker id="due" title="Due Date" />
    </Form>
  );
}
```

--------------------------------

### Grid.EmptyView

Source: https://developers.raycast.com/api-reference/user-interface/grid

A view to display when there are no items available in the Grid. Useful for guiding users when input is needed.

```APIDOC
## Grid.EmptyView

### Description
A view to display when there aren't any items available. Use to greet users with a friendly message if the extension requires user input before it can show any items e.g. when searching for an image, a gif etc.

Raycast provides a default `EmptyView` that will be displayed if the Grid component either has no children, or if it has children, but none of them match the query in the search bar. This too can be overridden by passing an empty view alongside the other `Grid.Item`s.

Note that the `EmptyView` is *never* displayed if the `Grid`'s `isLoading` property is true and the search bar is empty.

### Props

#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```typescript
<Grid.EmptyView icon={{ source: "https://placekitten.com/500/500" }} title="Type something to get started" />
```

### Response
#### Success Response (200)
This component does not have a direct response. It modifies the UI.

#### Response Example
None
```

--------------------------------

### Create Todo Form and Action for Raycast

Source: https://developers.raycast.com/examples/todo-list

Implements a form to create new todos and an action to trigger this form within Raycast. The form includes a text field for the todo title and uses `Action.SubmitForm` to handle submission. The `CreateTodoAction` uses `Action.Push` to navigate to the form.

```typescript
import { Form, ActionPanel, Action, useNavigation } from "@raycast/api";

interface Todo {
  title: string;
  isCompleted: boolean;
}

function CreateTodoForm(props: { onCreate: (todo: Todo) => void }) {
  const { pop } = useNavigation();

  function handleSubmit(values: { title: string }) {
    props.onCreate({ title: values.title, isCompleted: false });
    pop();
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Todo" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="title" title="Title" />
    </Form>
  );
}

function CreateTodoAction(props: { onCreate: (todo: Todo) => void }) {
  return (
    <Action.Push
      icon={Icon.Pencil}
      title="Create Todo"
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      target={<CreateTodoForm onCreate={props.onCreate} />}
    />
  );
}
```

--------------------------------

### Raycast Image.Fallback Example

Source: https://developers.raycast.com/api-reference/user-interface/icons-and-images

Shows how to use the Image.Fallback property in Raycast to specify a fallback image when the primary source fails to load. This can be a local asset or an icon, and it respects theme-aware settings.

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

### Displaying Metadata with Separator in Raycast List

Source: https://developers.raycast.com/api-reference/user-interface/list

Demonstrates how to use List.Item.Detail.Metadata.Separator to visually group metadata items within a Raycast List. This example shows how to add labels for different types of a Pokemon, separated by a line.

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
                <List.Item.Detail.Metadata.Separator />
                <List.Item.Detail.Metadata.Label title="Type" icon="pokemon_types/poison.svg" text="Poison" />
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

### Enable Page-Based Pagination with useFetch

Source: https://developers.raycast.com/utilities/react-hooks/usefetch

Demonstrates how to configure the `useFetch` hook for page-based pagination. The `url` parameter is changed to a function that accepts pagination options, and `mapResult` must return `data` and `hasMore` to indicate if more pages are available.

```typescript
const { isLoading, data, pagination } = useFetch(
  (options) =>
    "https://api.ycombinator.com/v0.1/companies?" +
    new URLSearchParams({ page: String(options.page + 1), q: searchText }).toString(),
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

```

--------------------------------

### Get Frontmost Application Raycast API

Source: https://developers.raycast.com/api-reference/utilities

Retrieves information about the currently active (frontmost) application on the system. This can be used for context-aware actions or automation.

```typescript
import { getFrontmostApplication } from "@raycast/api";

export default async function Command() {
  const frontmostApplication = await getFrontmostApplication();
  console.log(`The frontmost application is: ${frontmostApplication.name}`);
}
```

--------------------------------

### Provide user feedback during AI generation in TypeScript

Source: https://developers.raycast.com/api-reference/ai

This example shows how to provide immediate user feedback while an AI task is in progress using `showHUD`. It then calls `AI.ask` to generate content, writes it to a file, and notifies the user upon completion.

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

### Clone and Test Raycast Extension from Pull Request (Bash)

Source: https://developers.raycast.com/basics/review-pullrequest

This snippet clones a specific branch and directory of a Raycast extension from a fork. It uses Git commands like `git clone`, `git sparse-checkout`, and `npm install` to set up the extension for local development. Ensure you replace `BRANCH`, `FORK_URL`, and `EXTENSION_NAME` with the correct values from the pull request.

```bash
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

### Pick Date Action in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/actions

Illustrates the usage of Action.PickDate for allowing users to select a date within Raycast. This example shows how to integrate it into a List.Item's ActionPanel.

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

### Uncontrolled File Picker in TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/form

This example shows an uncontrolled file picker that allows users to select multiple files. It filters the selected paths to ensure they exist and are files before logging them. No explicit state management is required for the picker itself.

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

### Configure Command Arguments in package.json

Source: https://developers.raycast.com/information/lifecycle/arguments

This JSON snippet demonstrates how to define arguments for a Raycast command within the `package.json` manifest file. It includes examples of text, password, and dropdown argument types, specifying their names, placeholders, and whether they are required. The order of arguments in the manifest determines their display order in Root Search.

```json
{
  "name": "arguments",
  "title": "API Arguments",
  "description": "Example of Arguments usage in the API",
  "icon": "command-icon.png",
  "author": "raycast",
  "license": "MIT",
  "commands": [
    {
      "name": "my-command",
      "title": "Arguments",
      "subtitle": "API Examples",
      "description": "Demonstrates usage of arguments",
      "mode": "view",
      "arguments": [
        {
          "name": "title",
          "placeholder": "Title",
          "type": "text",
          "required": true
        },
        {
          "name": "subtitle",
          "placeholder": "Secret Subtitle",
          "type": "password"
        },
        {
          "name": "favoriteColor",
          "type": "dropdown",
          "placeholder": "Favorite Color",
          "required": true,
          "data": [
            {
              "title": "Red",
              "value": "red"
            },
            {
              "title": "Green",
              "value": "green"
            },
            {
              "title": "Blue",
              "value": "blue"
            }
          ]
        }
      ]
    }
  ],
  "dependencies": {
    "@raycast/api": "1.38.0"
  },
  "scripts": {
    "dev": "ray develop",
    "build": "ray build -e dist",
    "lint": "ray lint"
  }
}
```

--------------------------------

### Render a List with a Dropdown Accessory

Source: https://developers.raycast.com/api-reference/user-interface/list

Example of how to use the List.Dropdown component as a search bar accessory in Raycast. This allows users to filter the main list items based on dropdown selections.

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

### Display Favicon in Raycast List (React/TypeScript)

Source: https://developers.raycast.com/utilities/icons/getfavicon

Example demonstrating how to use the getFavicon function to set the icon for a List.Item in a Raycast extension. Imports necessary components from Raycast libraries.

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

### Optimistic Update with Rollback on Error in Raycast

Source: https://developers.raycast.com/utilities/react-hooks/usepromise

Demonstrates how to use optimistic updates to immediately reflect UI changes before server confirmation. Includes a rollback mechanism for when the asynchronous update fails, ensuring data consistency. This example uses Raycast API components and the usePromise hook.

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

### Authorize User and Get Authorization Code

Source: https://developers.raycast.com/api-reference/oauth

Initiates the OAuth authorization flow by calling the `authorize` method with the authorization request. This displays the Raycast OAuth overlay, allowing the user to consent and open the consent page in a web browser. The promise resolves with the authorization code after the redirect back to Raycast.

```typescript
const { authorizationCode } = await client.authorize(authRequest);
```

--------------------------------

### Render Todo List in Raycast

Source: https://developers.raycast.com/examples/todo-list

Renders a list of todos using Raycast's List component. It defines a Todo interface and uses React's useState hook to manage the todo items. The list is populated with initial todo items.

```typescript
import { List } from "@raycast/api";
import { useState } from "react";

interface Todo {
  title: string;
  isCompleted: boolean;
}

export default function Command() {
  const [todos, setTodos] = useState<Todo[]>([
    { title: "Write a todo list extension", isCompleted: false },
    { title: "Explain it to others", isCompleted: false },
  ]);

  return (
    <List>
      {todos.map((todo, index) => (
        <List.Item key={index} title={todo.title} />
      ))}
    </List>
  );
}
```

--------------------------------

### Form Component

Source: https://developers.raycast.com/api-reference/user-interface/form

Demonstrates the basic usage of the Form component with a description and a submit action.

```APIDOC
## Form Component

### Description

Represents a form element within the Raycast application, allowing users to input data.

### Method

N/A (Component)

### Endpoint

N/A (Component)

### Parameters

#### Props

- **actions** (ActionPanel) - Required - The action panel for the form.
- **children** (ReactNode) - Required - The content of the form.

### Request Example

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.Description
        title="Import / Export"
        text="Exporting will back-up your preferences, quicklinks, snippets, floating notes, script-command folder paths, aliases, hotkeys, favorites and other data."
      />
    </Form>
  );
}
```

### Response

N/A (Component)
```

--------------------------------

### Get Default Application Raycast API

Source: https://developers.raycast.com/api-reference/utilities

Returns the default application designated to open a specific file or URL. This is useful for ensuring consistency when launching files or links.

```typescript
import { getDefaultApplication } from "@raycast/api";

export default async function Command() {
  const defaultApplication = await getDefaultApplication(__filename);
  console.log(`Default application for JavaScript is: ${defaultApplication.name}`);
}
```

--------------------------------

### Controlled Form in TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/form

An example of a controlled form in Raycast using TypeScript. This form manages the state of each input field using the useState hook. It includes text, textarea, and date picker fields.

```typescript
import { Form, ActionPanel, Action, popToRoot, LaunchProps } from "@raycast/api";
import { useState } from "react";

interface TodoValues {
  title: string;
  description?: string;
  dueDate?: Date;
}

export default function Command(props: LaunchProps<{ draftValues: TodoValues }> ) {
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

--------------------------------

### Show Failure Toast with TypeScript

Source: https://developers.raycast.com/utilities/functions/showfailuretoast

Demonstrates how to use the showFailureToast function to display an error message when an AppleScript fails. This example catches an error and then calls showFailureToast with a custom title.

```tsx
import { showHUD } from "@raycast/api";
import { runAppleScript, showFailureToast } from "@raycast/utils";

export default async function () {
  try {
    const res = await runAppleScript(
      `
      on run argv
        return "hello, " & item 1 of argv & "."
      end run
      `,
      ["world"],
    );
    await showHUD(res);
  } catch (error) {
    showFailureToast(error, { title: "Could not run AppleScript" });
  }
}
```

--------------------------------

### Launch No-View Command in Raycast (TypeScript)

Source: https://developers.raycast.com/information/lifecycle

This example shows how to export an async function for a no-view command in Raycast, allowing for asynchronous operations like showing a HUD. It utilizes the '@raycast/api' library.

```typescript
import { showHUD } from "@raycast/api";

// Runs async. code in a no-view command
export default async function Command() {
  await showHUD("Hello");
}
```

--------------------------------

### Create Menu Bar Command UI with MenuBarExtra

Source: https://developers.raycast.com/api-reference/menu-bar-commands

Implements the UI for a menu bar command using the `MenuBarExtra` component from `@raycast/api`. It displays a GitHub icon and includes example menu items with associated actions.

```typescript
import { MenuBarExtra } from "@raycast/api";

export default function Command() {
  return (
    <MenuBarExtra icon="https://github.githubassets.com/favicons/favicon.png" tooltip="Your Pull Requests">
      <MenuBarExtra.Item title="Seen" />
      <MenuBarExtra.Item
        title="Example Seen Pull Request"
        onAction={() => {
          console.log("seen pull request clicked");
        }}
      />
      <MenuBarExtra.Item title="Unseen" />
      <MenuBarExtra.Item
        title="Example Unseen Pull Request"
        onAction={() => {
          console.log("unseen pull request clicked");
        }}
      />
    </MenuBarExtra>
  );
}
```

--------------------------------

### Pagination with usePromise Hook in Raycast (Page-based)

Source: https://developers.raycast.com/utilities/react-hooks/usepromise

Enables pagination for the usePromise hook by modifying the function signature to return an async function. This example demonstrates page-based pagination where the hook manages page numbers and fetches subsequent data.

```ts
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

### Default ESLint Configuration for Raycast Extensions

Source: https://developers.raycast.com/information/developer-tools/eslint

This snippet shows the default ESLint configuration provided by Raycast. It imports the necessary defineConfig from ESLint and the raycastConfig from the @raycast/eslint-config package, combining them for a standard setup.

```javascript
const { defineConfig } = require("eslint/config");
const raycastConfig = require("@raycast/eslint-config");

module.exports = defineConfig([...raycastConfig]);
```

--------------------------------

### Implementing Dynamic Tint Colors with Contrast Adjustment (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/colors

Shows how to create List items with dynamic tint colors that adjust to the Raycast theme (light or dark). It includes examples of both enabling and disabling automatic contrast adjustment.

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

### Stream AI answers to a file using TypeScript

Source: https://developers.raycast.com/api-reference/ai

This example demonstrates how to stream an AI-generated answer directly to a file. It uses the `AI.ask` function and listens for the 'data' event to append incoming data chunks to a specified file. It also provides user feedback using `showHUD`.

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

### Add Screenshots to Raycast Extension Metadata

Source: https://developers.raycast.com/basics/prepare-an-extension-for-store

Screenshots are displayed on the extension details screen, allowing users to preview the extension's functionality before installation. A maximum of six screenshots are supported, with a recommendation of at least three for optimal presentation. Ensure screenshots adhere to the specified size (2000x1250 pixels) and aspect ratio (16:10).

--------------------------------

### Uncontrolled Text Area Example (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/form

Demonstrates how to use an uncontrolled Form.TextArea component. The component manages its own state, and its initial value is set using `defaultValue`. This is suitable for simple text inputs where explicit state management is not required.

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

### Uncontrolled Form in TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/form

An example of an uncontrolled form in Raycast using TypeScript. This form uses default values and does not manage state explicitly within the component. It includes text, textarea, and date picker fields.

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

### Define Keyboard Shortcut in TypeScript

Source: https://developers.raycast.com/api-reference/keyboard

Example demonstrating how to define keyboard shortcuts for actions within a Raycast command using TypeScript. It utilizes the `Keyboard.Shortcut` type for defining modifier keys and key equivalents, and shows how to integrate these shortcuts into an `ActionPanel`.

```typescript
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

### Define an Eval Structure in package.json

Source: https://developers.raycast.com/ai/learn-core-concepts-of-ai-extensions

Outlines the structure for defining Evals in `package.json` under the `ai` key. Evals include user input prompts, mocked tool responses, and expected outcomes for testing and examples.

```json
{
  "ai": {
    "evals": [
      {
        "input": "@your-extension-name What are my todos?",
        "mocks": {
          "get-todos": []
        },
        "expected": [
          "You have no todos."
        ],
        "usedAsExample": true
      }
    ]
  }
}
```

--------------------------------

### Use getAvatarIcon in a Raycast List Item (TypeScript)

Source: https://developers.raycast.com/utilities/icons/getavataricon

An example demonstrating how to use the getAvatarIcon function to set the icon for a List.Item in a Raycast command. It imports necessary components and the utility function.

```tsx
import { List } from "@raycast/api";
import { getAvatarIcon } from "@raycast/utils";

export default function Command() {
  return (
    <List>
      <List.Item icon={getAvatarIcon("John Doe")} title="John Doe" />
    </List>
  );
}
```

--------------------------------

### Read Clipboard as Plain Text using Raycast API

Source: https://developers.raycast.com/api-reference/clipboard

Provides an example of using `Clipboard.readText` to specifically retrieve the clipboard content as plain text. It also allows accessing clipboard history with an optional `offset`. Requires the `@raycast/api` package.

```typescript
import { Clipboard } from "@raycast/api";

export default async function Command() {
  const text = await Clipboard.readText();
  console.log(text);
}
```

--------------------------------

### Configure Google OAuth Service

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This example illustrates how to configure the OAuthService for Google, which requires a custom client ID and specific scopes due to Google's verification processes. It uses the static `google` property and expects `ProviderOptions` including `clientId` and `scope`.

```tsx
const google = OAuthService.google({
  clientId: "custom-client-id",
  scope: "https://www.googleapis.com/auth/drive.readonly",
});
```

--------------------------------

### Uncontrolled Password Field Example (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/form

Demonstrates how to create an uncontrolled password field in a Raycast form. This field does not manage its state internally, relying on the form's submission to capture its value. It requires the '@raycast/api' package.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Password" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.PasswordField id="password" title="Enter Password" />
    </Form>
  );
}
```

--------------------------------

### Get Selected Finder Items (TypeScript)

Source: https://developers.raycast.com/api-reference/environment

Retrieves the items currently selected in the Finder application. This function returns a Promise that resolves with an array of FileSystemItem objects. It will reject if Finder is not the active application.

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

### Example Usage of createDeeplink (React/TypeScript)

Source: https://developers.raycast.com/utilities/functions/createdeeplink

Demonstrates how to use the createDeeplink function within a Raycast List component to create quicklinks for different types of deeplinks (extension, external extension, script command).

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

### Create a Controlled Tag Picker in Raycast (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/form

This TypeScript example demonstrates how to create a controlled tag picker in a Raycast command. It uses the `useState` hook to manage the selected tags, allowing for dynamic updates. The `value` and `onChange` props of `Form.TagPicker` are used to control its state.

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

### Configurable Grid Component in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/grid

An example of a configurable Grid component in Raycast, allowing customization of columns, inset, navigation title, and search bar placeholder. It also demonstrates using keywords for filtering.

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

--------------------------------

### Displaying Detail View in Raycast List

Source: https://developers.raycast.com/api-reference/user-interface/list

This TypeScript example demonstrates how to use the `List.Item.Detail` component within a Raycast `List`. It shows a basic `List.Item` with a title, subtitle, and a detail view containing an image specified via markdown. This is useful for presenting richer content associated with list items.

```typescript
import { List } from "@raycast/api";

export default function Command() {
  return (
    <List isShowingDetail>
      <List.Item
        title="Pikachu"
        subtitle="Electric"
        detail={
          <List.Item.Detail markdown="![Illustration](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png)" />
        }
      />
    </List>
  );
}
```

--------------------------------

### ProviderWithDefaultClientOptions

Source: https://developers.raycast.com/utilities/oauth/oauthservice

Configuration options for setting up an OAuth provider with default client settings.

```APIDOC
## ProviderWithDefaultClientOptions

### Description
Configuration options for setting up an OAuth provider with default client settings. This includes details for authorization, token exchange, and response parsing.

### Method
N/A (Configuration Object)

### Endpoint
N/A (Configuration Object)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **scope** (string | Array<string>) - Required - The scope of the access requested from the provider.
- **clientId** (string) - Optional - The app's client ID.
- **authorizeUrl** (string) - Optional - The URL to start the OAuth flow.
- **tokenUrl** (string) - Optional - The URL to exchange the authorization code for an access token.
- **refreshTokenUrl** (string) - Optional - The URL to refresh the access token if applicable.
- **personalAccessToken** (string) - Optional - A personal token if the provider supports it.
- **onAuthorize** (string) - Optional - A callback function that is called once the user has been properly logged in through OAuth when used with `withAccessToken`.
- **bodyEncoding** (json | url-encoded) - Optional - Specifies the format for sending the body of the request.
- **tokenResponseParser** (function) - Optional - Some providers return non-standard token responses. Specifies how to parse the JSON response to get the access token.
- **tokenRefreshResponseParser** (function) - Optional - Some providers return non-standard refresh token responses. Specifies how to parse the JSON response to get the access token.

### Request Example
```json
{
  "scope": "read_data",
  "clientId": "your_client_id",
  "authorizeUrl": "https://example.com/oauth/authorize",
  "tokenUrl": "https://example.com/oauth/token"
}
```

### Response
#### Success Response (N/A for configuration object)
N/A

#### Response Example
N/A
```

--------------------------------

### Enable Cursor-Based Pagination with useFetch

Source: https://developers.raycast.com/utilities/react-hooks/usefetch

Shows how to implement cursor-based pagination using `useFetch`. The `url` function receives the cursor, and `mapResult` should return `data`, `hasMore`, and the `cursor` for the next page. This is useful for APIs that use cursors instead of page numbers.

```typescript
const { isLoading, data, pagination } = useFetch(
  (options) =>
    "https://api.ycombinator.com/v0.1/companies?" +
    new URLSearchParams({ cursor: options.cursor, q: searchText }).toString(),
  {
    mapResult(result: SearchResult) {
      const { companies, nextCursor } = result;
      const hasMore = nextCursor !== undefined;
      return { data: companies, hasMore, cursor: nextCursor, };
    },
    keepPreviousData: true,
    initialData: [],
  },
);

```

--------------------------------

### Implement Todo Completion with TypeScript in Raycast

Source: https://developers.raycast.com/examples/todo-list

This TypeScript code demonstrates how to add a toggle functionality to list items in a Raycast application. It manages the completion state of todos and provides a UI action to toggle the status. Dependencies include React's useState and Raycast's List, ActionPanel, and Action components.

```typescript
import { useState } from "react";
import { Action, ActionPanel, Icon, List } from "@raycast/api";

interface Todo {
  title: string;
  isCompleted: boolean;
}

// Assume CreateTodoAction and other necessary components are defined elsewhere

export default function Command() {
  const [todos, setTodos] = useState<Todo[]>([
    { title: "Buy groceries", isCompleted: false },
    { title: "Walk the dog", isCompleted: true },
  ]);

  function handleCreate(title: string) {
    setTodos([{ title, isCompleted: false }, ...todos]);
  }

  function handleToggle(index: number) {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }

  return (
    <List
      actions={
        <ActionPanel>
          {/* Assuming CreateTodoAction is defined and passed here */}
          {/* <CreateTodoAction onCreate={handleCreate} /> */}
        </ActionPanel>
      }
    >
      {todos.map((todo, index) => (
        <List.Item
          key={index}
          icon={todo.isCompleted ? Icon.Checkmark : Icon.Circle}
          title={todo.title}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <ToggleTodoAction todo={todo} onToggle={() => handleToggle(index)} />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

function ToggleTodoAction(props: { todo: Todo; onToggle: () => void }) {
  return (
    <Action
      icon={props.todo.isCompleted ? Icon.Circle : Icon.Checkmark}
      title={props.todo.isCompleted ? "Uncomplete Todo" : "Complete Todo"}
      onAction={props.onToggle}
    />
  );
}

```

--------------------------------

### Local Storage API Operations (JavaScript)

Source: https://developers.raycast.com/migration/v1.28.0

Illustrates the new `LocalStorage` namespace for managing data, including getting, setting, removing, and clearing items. Deprecated methods are shown for migration context.

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

// we didn't expect you to use the Storage interfaces
// but they are now also under LocalStorage

// deprecated LocalStorageValue
LocalStorage.Value;

// deprecated LocalStorageValues
LocalStorage.Values;
```

--------------------------------

### Negative JSON Expectation for Tool Call

Source: https://developers.raycast.com/ai/learn-core-concepts-of-ai-extensions

This example demonstrates how to assert that a specific tool is *not* called by the AI. It uses the 'not' operator to negate the 'callsTool' expectation, ensuring that the 'create-issue' tool is not invoked.

```json
{
  "ai": {
    "evals": [
      {
        "expected": [
          {
            "not": {
              "callsTool": "create-issue"
            }
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### Display Custom Empty View in Raycast List

Source: https://developers.raycast.com/api-reference/user-interface/list

Shows how to implement a custom List.EmptyView in Raycast to display a user-friendly message when no list items are available. This is useful for guiding users when input is required or when search results are empty.

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

### Raycast Image.Source Type Example

Source: https://developers.raycast.com/api-reference/user-interface/icons-and-images

Illustrates the Image.Source type in Raycast, which accepts URLs, assets, icons, or theme-aware objects for image sources. This allows for flexible image handling, including different sources for light and dark modes.

```typescript
import { Icon, List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item title="URL" icon={{ source: "https://raycast.com/uploads/avatar.png" }} />
      <List.Item title="Asset" icon={{ source: "avatar.png" }} />
      <List.Item title="Icon" icon={{ source: Icon.Circle }} />
      <List.Item
        title="Theme"
        icon={{
          source: {
            light: "https://raycast.com/uploads/avatar.png",
            dark: "https://raycast.com/uploads/avatar.png",
          },
        }}
      />
    </List>
  );
}
```

--------------------------------

### Controlled File Picker in TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/form

This example demonstrates a controlled file picker where the selected files are managed by React state. The `value` prop is bound to the `files` state, and the `onChange` prop updates the state when selections change. The selected files are logged upon form submission.

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

### Get Selected Text (TypeScript)

Source: https://developers.raycast.com/api-reference/environment

Retrieves the text currently selected in the frontmost application. This function returns a Promise that resolves with the selected text as a string. It will reject if no text is currently selected.

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

### Get Avatar Icon Function Signature (TypeScript)

Source: https://developers.raycast.com/utilities/icons/getavataricon

Defines the TypeScript signature for the getAvatarIcon function. It takes a name string and an optional options object for background color and gradient, returning an Image.Asset.

```typescript
function getAvatarIcon(
  name: string,
  options?: {
    background?: string;
    gradient?: boolean;
  },
): Image.Asset;
```

--------------------------------

### Implement React Suspense for Data Fetching in Raycast List

Source: https://developers.raycast.com/misc/migration/v1.37.0

This example demonstrates how to use React Suspense with the `usePromise` hook to asynchronously fetch and display data in a Raycast List component. It handles loading states and potential errors during data retrieval, and includes an action for user logout. Dependencies include `@raycast/api`, `react`, and custom modules for Twitter API interaction.

```jsx
import { List, Toast, showToast, ActionPanel, Action, Icon, popToRoot } from "@raycast/api";
import { useState, useCallback } from "react";
import * as twitter from "./oauth/twitter";

// a hook that suspends until a promise is resolved
import { usePromise } from "./suspense-use-promise";

const promise = async (search: string) => {
  try {
    await twitter.authorize();
    return await twitter.fetchItems(search);
  } catch (error) {
    console.error(error);
    showToast({ style: Toast.Style.Failure, title: String(error) });
    return [];
  }
};

export default function Command() {
  const [search, setSearch] = useState("");

  const items = usePromise(promise, [search]);

  const logout = useCallback(() => {
    twitter.logout();
    popToRoot();
  }, []);

  const actionPanel = (
    <ActionPanel>
      <Action title="Logout" onAction={logout} />
    </ActionPanel>
  );

  // no need to set the `isLoading` prop, Raycast will set it automatically
  // until the React application isn't suspended anymore
  return (
    <List onSearchTextChange={setSearch} throttle>
      {items.map((item) => {
        return (
          <List.Item key={item.id} id={item.id} icon={Icon.TextDocument} title={item.title} actions={actionPanel} />
        );
      })}
    </List>
  );
}
```

--------------------------------

### Grid Dropdown with Sections Example

Source: https://developers.raycast.com/api-reference/user-interface/grid

Demonstrates how to use Grid.Dropdown and Grid.Dropdown.Section to create a searchable dropdown menu within the Raycast Grid component. This allows users to filter grid items based on predefined categories.

```typescript
import { Grid } from "@raycast/api";

export default function Command() {
  return (
    <Grid
      searchBarAccessory={
        <Grid.Dropdown tooltip="Dropdown With Sections">
          <Grid.Dropdown.Section title="First Section">
            <Grid.Dropdown.Item title="One" value="one" />
          </Grid.Dropdown.Section>
          <Grid.Dropdown.Section title="Second Section">
            <Grid.Dropdown.Item title="Two" value="two" />
          </Grid.Dropdown.Section>
        </Grid.Dropdown>
      }
    >
      <Grid.Item content="https://placekitten.com/400/400" title="Item in the Main Grid" />
    </Grid>
  );
}
```

--------------------------------

### ProviderOptions Configuration

Source: https://developers.raycast.com/utilities/oauth/oauthservice

Configuration options for setting up an OAuth provider.

```APIDOC
## ProviderOptions

### Description
Configuration options for setting up an OAuth provider.

### Parameters
#### Request Body
- **clientId** (string) - Required - The app's client ID
- **scope** (string | Array<string>) - Required - The scope of the access requested from the provider
- **authorizeUrl** (string) - Required - The URL to start the OAuth flow
- **tokenUrl** (string) - Required - The URL to exchange the authorization code for an access token
- **refreshTokenUrl** (string) - Optional - The URL to refresh the access token if applicable
- **personalAccessToken** (string) - Optional - A personal token if the provider supports it
- **onAuthorize** (string) - Optional - A callback function that is called once the user has been properly logged in through OAuth when used with `withAccessToken`
- **bodyEncoding** (json | url-encoded) - Optional - Specifies the format for sending the body of the request.
- **tokenResponseParser** (function) - Optional - Some providers returns some non-standard token responses. Specifies how to parse the JSON response to get the access token
- **tokenRefreshResponseParser** (function) - Optional - Some providers returns some non-standard refresh token responses. Specifies how to parse the JSON response to get the access token

### Request Example
```json
{
  "clientId": "your_client_id",
  "scope": "read write",
  "authorizeUrl": "https://provider.com/oauth/authorize",
  "tokenUrl": "https://provider.com/oauth/token",
  "refreshTokenUrl": "https://provider.com/oauth/refresh",
  "personalAccessToken": "your_personal_access_token",
  "onAuthorize": "(token) => console.log('Authorized')",
  "bodyEncoding": "json",
  "tokenResponseParser": "(response) => response.access_token",
  "tokenRefreshResponseParser": "(response) => response.refresh_token"
}
```

### Response
#### Success Response (200)
This section is not applicable as ProviderOptions is a configuration object and not an endpoint that returns data directly.
```

--------------------------------

### Get Preference Values in TypeScript

Source: https://developers.raycast.com/api-reference/preferences

Accesses preference values passed to a Raycast command. It maps preference names to their values, using defined defaults as fallbacks. The preference types are auto-generated in `raycast-env.d.ts`.

```typescript
import { getPreferenceValues } from "@raycast/api";

export default async function Command() {
  const preferences = getPreferenceValues<Preferences>();
  console.log(preferences);
}
```

--------------------------------

### PaginationOptions Object

Source: https://developers.raycast.com/utilities/react-hooks/usefetch

Details about the PaginationOptions object and its properties.

```APIDOC
## PaginationOptions Object

### Description
An object passed to a `PaginatedRequestInfo`, it has two properties: `page`, `lastItem`, and `cursor`.

### Properties

#### `page`
- **type**: `number`
- **description**: 0-indexed, this is incremented every time the promise resolves, and is reset whenever `revalidate()` is called.

#### `lastItem`
- **type**: `T` (generic type)
- **description**: This is a copy of the last item in the `data` array from the last time the promise was executed. Provided for APIs that implement cursor-based pagination.

#### `cursor`
- **type**: `any`
- **description**: This is the `cursor` property returned after the previous execution of `PaginatedPromise`. Useful when working with APIs that provide the next cursor explicitly.

### TypeScript Definition
```ts
export type PaginationOptions<T = any> = {
  page: number;
  lastItem?: T;
  cursor?: any;
};
```
```

--------------------------------

### Submit Form Action in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/actions

Demonstrates how to use the Action.SubmitForm component to capture user input within a form. It includes a checkbox example and specifies the onSubmit callback for handling form values.

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

### Controlled DatePicker Example (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/form

Illustrates the controlled usage of the Form.DatePicker component, where the parent component manages the date state using React's useState hook. This provides more control over the date selection process and allows for dynamic updates.

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

### Add AI Extension Evals to package.json

Source: https://developers.raycast.com/ai/write-evals-for-your-ai-extension

This JSON snippet demonstrates how to define evals for an AI Extension within the `package.json` file. It includes an example of an eval with input, mock tool responses, and expected tool calls, serving as a test case for the AI's interaction with tools.

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

### Adding a Link to Pikachu's Evolution using Detail.Metadata.Link

Source: https://developers.raycast.com/api-reference/user-interface/detail

This example shows how to add a clickable link to the Raycast Detail component's metadata section. It specifically links to Raichu, Pikachu's evolution, using the Detail.Metadata.Link component with target, text, and title props.

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
          <Detail.Metadata.Link title="Evolution" target="https://www.pokemon.com/us/pokedex/pikachu" text="Raichu" />
        </Detail.Metadata>
      }
    />
  );
}

```

--------------------------------

### Authenticate with Built-in GitHub Provider using OAuthService

Source: https://developers.raycast.com/utilities/oauth

Demonstrates how to use the built-in GitHub OAuth provider with `OAuthService`, `withAccessToken`, and `getAccessToken`. It requires specifying the necessary scopes for GitHub access and returns the access token for use in a Raycast command.

```tsx
import { Detail, LaunchProps } from "@raycast/api";
import { withAccessToken, getAccessToken, OAuthService } from "@raycast/utils";

const github = OAuthService.github({
  scope: "notifications repo read:org read:user read:project",
});

function AuthorizedComponent(props: LaunchProps) {
  const { token } = getAccessToken();
  return <Detail markdown={`Access token: ${token}`} />;
}

export default withAccessToken(github)(AuthorizedComponent);
```

--------------------------------

### Implement Delete Todo Action in Raycast (TypeScript)

Source: https://developers.raycast.com/examples/todo-list

This code snippet demonstrates how to implement a 'Delete Todo' action within a Raycast extension. It includes the `DeleteTodoAction` component and its integration into the `List.Item`'s actions, allowing users to delete items with a keyboard shortcut. The `handleDelete` function updates the state to remove the selected todo.

```typescript
export default function Command() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // ...

  function handleDelete(index: number) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <List
      actions={
        <ActionPanel>
          <CreateTodoAction onCreate={handleCreate} />
        </ActionPanel>
      }
    >
      {todos.map((todo, index) => (
        <List.Item
          key={index}
          icon={todo.isCompleted ? Icon.Checkmark : Icon.Circle}
          title={todo.title}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <ToggleTodoAction todo={todo} onToggle={() => handleToggle(index)} />
              </ActionPanel.Section>
              <ActionPanel.Section>
                <CreateTodoAction onCreate={handleCreate} />
                <DeleteTodoAction onDelete={() => handleDelete(index)} />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

// ...

function DeleteTodoAction(props: { onDelete: () => void }) {
  return (
    <Action
      icon={Icon.Trash}
      title="Delete Todo"
      shortcut={{ modifiers: ["ctrl"], key: "x" }}
      onAction={props.onDelete}
    />
  );
}
```

```typescript
import { Action, ActionPanel, Form, Icon, List, useNavigation } from "@raycast/api";
import { useState } from "react";

interface Todo {
  title: string;
  isCompleted: boolean;
}

export default function Command() {
  const [todos, setTodos] = useState<Todo[]>([
    { title: "Write a todo list extension", isCompleted: false },
    { title: "Explain it to others", isCompleted: false },
  ]);

  function handleCreate(todo: Todo) {
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  }

  function handleToggle(index: number) {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }

  function handleDelete(index: number) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <List
      actions={
        <ActionPanel>
          <CreateTodoAction onCreate={handleCreate} />
        </ActionPanel>
      }
    >
      {todos.map((todo, index) => (
        <List.Item
          key={index}
          icon={todo.isCompleted ? Icon.Checkmark : Icon.Circle}
          title={todo.title}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <ToggleTodoAction todo={todo} onToggle={() => handleToggle(index)} />
              </ActionPanel.Section>
              <ActionPanel.Section>
                <CreateTodoAction onCreate={handleCreate} />
                <DeleteTodoAction onDelete={() => handleDelete(index)} />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

function CreateTodoForm(props: { onCreate: (todo: Todo) => void }) {
  const { pop } = useNavigation();

  function handleSubmit(values: { title: string }) {
    props.onCreate({ title: values.title, isCompleted: false });
    pop();
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Todo" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="title" title="Title" />
    </Form>
  );
}

function CreateTodoAction(props: { onCreate: (todo: Todo) => void }) {
  return (
    <Action.Push
      icon={Icon.Pencil}
      title="Create Todo"
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      target={<CreateTodoForm onCreate={props.onCreate} />}
    />
  );
}

function ToggleTodoAction(props: { todo: Todo; onToggle: () => void }) {
  return (
    <Action
      icon={props.todo.isCompleted ? Icon.Circle : Icon.Checkmark}
      title={props.todo.isCompleted ? "Uncomplete Todo" : "Complete Todo"}
      onAction={props.onToggle}
    />
  );
}

function DeleteTodoAction(props: { onDelete: () => void }) {
  return (
    <Action
      icon={Icon.Trash}
      title="Delete Todo"
      shortcut={{ modifiers: ["ctrl"], key: "x" }}
      onAction={props.onDelete}
    />
  );
}
```

--------------------------------

### Example Usage of useCachedPromise Hook

Source: https://developers.raycast.com/utilities/react-hooks/usecachedpromise

Demonstrates how to use the useCachedPromise hook within a React component to fetch and display data from an API. It shows the integration with Raycast's Detail component and includes functionality for revalidating data.

```tsx
import { Detail, ActionPanel, Action } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { useRef } from "react";

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

### Controlled Password Field Example (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/form

Illustrates how to implement a controlled password field in a Raycast form using React's useState hook. This approach allows for real-time state management of the password input. It depends on the '@raycast/api' package and React.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [password, setPassword] = useState<string>("");

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Password" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.PasswordField id="password" value={password} onChange={setPassword} />
    </Form>
  );
}
```

--------------------------------

### Get Website Favicon (TypeScript)

Source: https://developers.raycast.com/utilities/icons/getfavicon

Retrieves the favicon for a given website URL. Supports fallback icons, custom sizes, and image masks. Returns an ImageLike object compatible with Raycast UI elements.

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

### Display Progress Icon in Raycast List (TypeScript)

Source: https://developers.raycast.com/utilities/icons/getprogressicon

An example demonstrating how to use the getProgressIcon function within a Raycast List component. It imports necessary components and the utility function to display an item with a progress icon.

```typescript
import { List } from "@raycast/api";
import { getProgressIcon } from "@raycast/utils";

export default function Command() {
  return (
    <List>
      <List.Item icon={getProgressIcon(0.1)} title="Project" />
    </List>
  );
}
```

--------------------------------

### Redirect Type: AppURI

Source: https://developers.raycast.com/api-reference/oauth

Configures a URI-style app scheme that directly opens Raycast. This is useful for specific OAuth app configurations, like those requiring a single slash in the URI.

```APIDOC
## Redirect Type: AppURI

### Description
Use this type for a URI-style app scheme that directly opens Raycast. In the OAuth app, configure `com.raycast:/oauth?package_name=Extension`.

(Note the single slash – Google, for example, would require this flavor for an OAuth app where the Bundle ID is `com.raycast`)

### Method
N/A (Configuration)

### Endpoint
N/A (Configuration)

### Parameters
N/A

### Request Example
N/A

### Response
N/A

```

--------------------------------

### Close Raycast Window and Control Spotify

Source: https://developers.raycast.com/examples/spotify-controls

This example demonstrates closing the Raycast main window before executing an AppleScript command to toggle Spotify's play/pause state. This provides a snappier user experience by immediately closing the Raycast UI. It depends on '@raycast/api' for `closeMainWindow` and 'run-applescript' for script execution.

```typescript
import { closeMainWindow } from "@raycast/api";
import { runAppleScript } from "run-applescript";

export default async function Command() {
  await closeMainWindow();
  await runAppleScript('tell application "Spotify" to playpause');
}
```

--------------------------------

### Configure Command Interval in Manifest

Source: https://developers.raycast.com/information/background-refresh

Add the 'interval' property to a command in your Raycast extension's manifest file to schedule its background execution. The interval can be specified in seconds (s), minutes (m), hours (h), or days (d), with a minimum of 10 seconds. Note that actual scheduling may vary due to macOS energy optimization and battery status.

```json
{
    "name": "unread-notifications",
    "title": "Show Unread Notifications",
    "description": "Shows the number of unread notifications in root search",
    "mode": "no-view",
    "interval": "10m"
}
```

--------------------------------

### Add Link to Raycast List Item Detail

Source: https://developers.raycast.com/api-reference/user-interface/list

This TypeScript example shows how to add a clickable link to the detail view of a List.Item in a Raycast extension. It uses the Metadata.Link component to display a title, link text, and the target URL.

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

### Grouping Actions with Sections in ActionPanel (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/action-panel

This example demonstrates how to organize actions within an ActionPanel using sections. It shows how to create distinct groups like 'Copy' and 'Danger zone' for better user experience. This is particularly useful when dealing with a large number of actions.

```typescript
import { ActionPanel, Action, List } from "@raycast/api";

export default function Command() {
  return (
    <List navigationTitle="Open Pull Requests">
      <List.Item
        title="Docs: Update API Reference"
        subtitle="#1"
        actions={
          <ActionPanel title="#1 in raycast/extensions">
            <ActionPanel.Section title="Copy">
              <Action.CopyToClipboard title="Copy Pull Request Number" content="#1" />
              <Action.CopyToClipboard
                title="Copy Pull Request URL"
                content="https://github.com/raycast/extensions/pull/1"
              />
              <Action.CopyToClipboard title="Copy Pull Request Title" content="Docs: Update API Reference" />
            </ActionPanel.Section>
            <ActionPanel.Section title="Danger zone">
              <Action title="Close Pull Request" onAction={() => console.log("Close PR #1")} />
            </ActionPanel.Section>
          </ActionPanel>
        }
      />
    </List>
  );
}
```

--------------------------------

### Implement Optimistic Updates with Rollback in React

Source: https://developers.raycast.com/utilities/react-hooks/useexec

Shows how to implement optimistic UI updates for a more responsive user experience using `optimisticUpdate` and `rollbackOnError` with the `useFetch` hook. This allows the UI to reflect changes immediately while handling potential errors.

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

### Get All Items from Local Storage (TypeScript)

Source: https://developers.raycast.com/api-reference/storage

Retrieves all stored key-value pairs from an extension's local storage. It returns a Promise that resolves with an object containing all items. This is useful for inspecting or processing all stored data at once.

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

### Get Windows on Active Desktop - TypeScript

Source: https://developers.raycast.com/api-reference/window-management

Fetches all windows currently open on the active desktop. This is useful for iterating through windows to find specific applications or to perform batch operations. The function returns a Promise resolving to an array of Window objects.

```typescript
import { WindowManagement, showToast } from "@raycast/api";

export default async function Command() {
  const windows = await WindowManagement.getWindowsOnActiveDesktop();
  const chrome = windows.find((x) => x.application?.bundleId === "com.google.Chrome");
  if (!chrome) {
    showToast({ title: "Couldn't find chrome", style: Toast.Style.Failure });
    return;
  }
  WindowManagement.setWindowBounds({ id: chrome.id, bounds: { position: { x: 100 } } });
}
```

--------------------------------

### useCachedState Hook Signature and Usage

Source: https://developers.raycast.com/utilities/react-hooks/usecachedstate

Defines the TypeScript signature for the useCachedState hook and provides an example of its usage within a React component for Raycast. This hook is useful for maintaining state that should persist between command invocations.

```typescript
function useCachedState<T>(
  key: string,
  initialState?: T,
  config?: {
    cacheNamespace?: string;
  },
): [T, (newState: T | ((prevState: T) => T)) => void];
```

```tsx
import { List, ActionPanel, Action } from "@raycast/api";
import { useCachedState } from "@raycast/utils";

export default function Command() {
  const [showDetails, setShowDetails] = useCachedState("show-details", false);

  return (
    <List
      isShowingDetail={showDetails}
      actions={
        <ActionPanel>
          <Action title={showDetails ? "Hide Details" : "Show Details"} onAction={() => setShowDetails((x) => !x)} />
        </ActionPanel>
      }
    >
      ...
    </List>
  );
}
```

--------------------------------

### Initialize SDK with onAuthorize using OAuthService

Source: https://developers.raycast.com/utilities/oauth

Illustrates using the `onAuthorize` callback within `OAuthService` to initialize third-party SDKs, such as the Linear client. This allows the initialized client to be shared across the extension's codebase.

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

### Nested JSON Expectation for Tool Call with Argument Matching

Source: https://developers.raycast.com/ai/learn-core-concepts-of-ai-extensions

This example shows a nested expectation to check if the AI calls the 'create-comment' tool. It specifically verifies that the 'body' argument includes the substring 'waiting for design', allowing for partial string matching within arguments.

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

### Execute Background Commands and Update Metadata

Source: https://developers.raycast.com/information/background-refresh

Implement the main async function of your command to handle background execution. For 'no-view' commands, the command runs until the Promise resolves. For menu bar commands, it runs until 'isLoading' is false. Use 'environment.launchType' to differentiate between user-initiated and background launches. Update command metadata, such as the subtitle, using 'updateCommandMetadata'.

```typescript
import { environment, updateCommandMetadata } from "@raycast/api";

async function fetchUnreadNotificationCount() {
  return 10;
}

export default async function Command() {
  console.log("launchType", environment.launchType);
  const count = await fetchUnreadNotificationCount();
  await updateCommandMetadata({ subtitle: `Unread Notifications: ${count}` });
}
```

--------------------------------

### Displaying Pikachu Details with Raycast Detail Component

Source: https://developers.raycast.com/api-reference/user-interface/detail

This snippet demonstrates how to use the Raycast Detail component to display information about Pikachu. It includes markdown content, a navigation title, and metadata such as a height label. This is a foundational example for using the Detail component.

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

### Improved Keyword Search Algorithm for Lists and Grids

Source: https://developers.raycast.com/misc/changelog

Enhances the keyword search algorithm to match intersecting keywords, improving search accuracy. For example, 'black cat' will now match keywords ['black', 'cat']. This applies to both List and Grid components.

```javascript
List.SearchBar({
  placeholder: "Search items...",
  onSearchTextChange: (text) => {
    // Search logic using improved algorithm
  }
});
```

--------------------------------

### Create an Uncontrolled Tag Picker in Raycast (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/form

This code example shows how to implement an uncontrolled tag picker in a Raycast command using TypeScript. The tag picker allows users to select multiple tags from a predefined list. It uses the `Form.TagPicker` component from the `@raycast/api` library.

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

### Displaying Actions in a List Item (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/action-panel

This snippet shows how to attach an ActionPanel to a List.Item in Raycast. It includes examples of opening a URL in a browser and copying text to the clipboard. This is useful for providing context-specific actions for list elements.

```typescript
import { ActionPanel, Action, List } from "@raycast/api";

export default function Command() {
  return (
    <List navigationTitle="Open Pull Requests">
      <List.Item
        title="Docs: Update API Reference"
        subtitle="#1"
        actions={
          <ActionPanel title="#1 in raycast/extensions">
            <Action.OpenInBrowser url="https://github.com/raycast/extensions/pull/1" />
            <Action.CopyToClipboard
              title="Copy Pull Request URL"
              content="https://github.com/raycast/extensions/pull/1"
            />
          </ActionPanel>
        }
      />
    </List>
  );
}
```

--------------------------------

### Handle AI API errors with Toast notifications in TypeScript

Source: https://developers.raycast.com/api-reference/ai

This example shows how to implement error handling for the `AI.ask` function. It uses a try-catch block to catch potential errors and displays a failure toast message to the user using `@raycast/api`'s `showToast` function.

```typescript
import { AI, showToast, Toast } from "@raycast/api";

export default async function command() {
  try {
    await AI.ask("Suggest 5 jazz songs");
  } catch (error) {
    // Handle error here, eg: by showing a Toast
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to generate answer",
    });
  }
}
```

--------------------------------

### Handle OAuth Authentication with OAuthService

Source: https://developers.raycast.com/utilities/getting-started

The OAuth utils, added in v1.11.0, provide utilities for handling OAuth authentication flows. This includes services for common providers like Google, Jira, and Zoom, with fixes for token refresh and scope handling in various versions.

```javascript
// Example usage of OAuthService (specific implementation not provided in text)
// const oauthService = new OAuthService({
//   provider: 'google',
//   clientId: 'YOUR_CLIENT_ID',
//   scope: 'email profile',
// });

```

--------------------------------

### Raycast ImageLike Union Type Example

Source: https://developers.raycast.com/api-reference/user-interface/icons-and-images

Demonstrates the use of the ImageLike union type in Raycast, showcasing how to use URLs, assets, icons, file icons, and images as icons for List.Items. This type supports various image representations.

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

### AppURI Redirect Configuration for Raycast OAuth

Source: https://developers.raycast.com/api-reference/oauth

Configures a URI-style app scheme redirect that directly opens Raycast. This format is necessary for certain OAuth providers, like Google, where the Bundle ID requires a specific URI structure.

```plaintext
com.raycast:/oauth?package_name=Extension
```

--------------------------------

### Define a Tool with Input in TypeScript

Source: https://developers.raycast.com/ai/learn-core-concepts-of-ai-extensions

Demonstrates how to define a tool that accepts a typed input object. This allows for dynamic behavior based on provided data, such as a name for a greeting.

```typescript
type Input = {
  name: string;
};

export default function tool(input: Input) {
  return `Hello, ${input.name}!`;
}
```

--------------------------------

### Update Command Metadata

Source: https://developers.raycast.com/api-reference/command

Updates the metadata of the current Raycast command, specifically the subtitle. This is useful for displaying dynamic information, such as a notification count. The update is temporary and applies only while the command is installed. Pass `null` to clear the subtitle.

```typescript
import { updateCommandMetadata } from "@raycast/api";

async function fetchUnreadNotificationCount() {
  return 10;
}

export default async function Command() {
  const count = await fetchUnreadNotificationCount();
  await updateCommandMetadata({ subtitle: `Unread Notifications: ${count}` });
}
```

--------------------------------

### OAuth.PKCEClient

Source: https://developers.raycast.com/api-reference/oauth

The PKCEClient class facilitates the Proof Key for Code Exchange (PKCE) OAuth flow, commonly used for native applications and SPAs.

```APIDOC
### OAuth.PKCEClient

This class is used to configure and manage the OAuth 2.0 PKCE flow.

#### Constructor

```typescript
constructor(options: OAuth.PKCEClient.Options): OAuth.PKCEClient
```

#### Options (`OAuth.PKCEClient.Options`)

- **`redirectMethod`** (`OAuth.RedirectMethod`) - Required - Specifies the method for handling redirects (e.g., `Web`).
- **`providerName`** (`string`) - Required - The name of the OAuth provider (e.g., "Twitter").
- **`providerIcon`** (`string`) - Optional - Path to the provider's icon.
- **`description`** (`string`) - Optional - A brief description for the OAuth overlay.

#### Example Usage

```typescript
import { OAuth } from "@raycast/api";

const client = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "Twitter",
  providerIcon: "twitter-logo.png",
  description: "Connect your Twitter account…",
});
```

#### Methods

- [`authorizationRequest(options: AuthorizationRequestOptions): Promise<AuthorizationRequest>`](#oauth.pkceclient-authorizationrequest)
- [`authorize(options: AuthorizationRequest | AuthorizationOptions): Promise<TokenResponse>`](#oauth.pkceclient-authorize)
- [`setTokens(options: TokenSetOptions | TokenResponse): Promise<void>`](#oauth.pkceclient-settokens)
- [`getTokens(): Promise<TokenSet | undefined>`](#oauth.pkceclient-gettokens)
- [`removeTokens(): Promise<void>`](#oauth.pkceclient-removetokens)
```

--------------------------------

### Group Menu Items Using MenuBarExtra.Section (TypeScript)

Source: https://developers.raycast.com/api-reference/menu-bar-commands

This example illustrates how to group related menu items using the `MenuBarExtra.Section` component. Each section can have an optional title, and a separator is automatically added between sections. This helps organize complex menus.

```typescript
import { Icon, MenuBarExtra, open } from "@raycast/api";

const data = {
  archivedBookmarks: [{ name: "Google Search", url: "www.google.com" }],
  newBookmarks: [{ name: "Raycast", url: "www.raycast.com" }],
};

export default function Command() {
  return (
    <MenuBarExtra icon={Icon.Bookmark}>
      <MenuBarExtra.Section title="New">
        {data?.newBookmarks.map((bookmark) => (
          <MenuBarExtra.Item key={bookmark.url} title={bookmark.name} onAction={() => open(bookmark.url)} />
        ))}
      </MenuBarExtra.Section>
      <MenuBarExtra.Section title="Archived">
        {data?.archivedBookmarks.map((bookmark) => (
          <MenuBarExtra.Item key={bookmark.url} title={bookmark.name} onAction={() => open(bookmark.url)} />
        ))}
      </MenuBarExtra.Section>
    </MenuBarExtra>
  );
}
```

--------------------------------

### Controlled Form Dropdown Example

Source: https://developers.raycast.com/api-reference/user-interface/form

Illustrates a controlled dropdown in a Raycast Form, where the component's state is managed externally using React's useState hook. Changes to the dropdown update the state, and the state determines the dropdown's current value.

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

### Check AI API access before calling in TypeScript

Source: https://developers.raycast.com/api-reference/ai

This example demonstrates how to check if the current user has access to the AI API using `environment.canAccess(AI)` before attempting to use `AI.ask`. If access is granted, it proceeds with the AI call; otherwise, it shows a message indicating lack of access.

```typescript
import { AI, getSelectedFinderItems, showHUD, environment } from "@raycast/api";
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

### Web Redirect Configuration for Raycast OAuth

Source: https://developers.raycast.com/api-reference/oauth

Configures a web-based redirect back to the Raycast website to open an extension. This is the static redirect URL for all extensions. Alternatively, for providers not accepting query parameters, a different endpoint can be used with customization via `extraParameters`.

```html
<https://raycast.com/redirect?packageName=Extension>
```

```html
<https://raycast.com/redirect/extension>
```

--------------------------------

### Displaying Detail View with Metadata and Separator in TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/detail

This snippet shows how to render a Raycast Detail view using markdown content and custom metadata. It utilizes Detail.Metadata.Label for displaying information and Detail.Metadata.Separator to visually divide metadata items. The example requires the '@raycast/api' package.

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
          <Detail.Metadata.Label title="Height" text={`1' 04"`} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label title="Weight" text="13.2 lbs" />
        </Detail.Metadata>
      }
    />
  );
}
```

--------------------------------

### Toggle Quick Look Action in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/actions

Demonstrates how to use the Action.ToggleQuickLook to preview files within Raycast. It requires importing necessary components from '@raycast/api' and setting up a List.Item with the quickLook property.

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
          </ActionActionPanel>
        }
      />
    </List>
  );
}
```

--------------------------------

### Get Active Window - TypeScript

Source: https://developers.raycast.com/api-reference/window-management

Retrieves the currently active window. This function is useful for performing actions on the window that the user is currently interacting with. It returns a Promise that resolves with a Window object or rejects if no window is active.

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

### Cache Class Methods for Data Management

Source: https://developers.raycast.com/api-reference/cache

Provides TypeScript signatures and brief explanations for core Cache class methods: get, has, set, remove, and clear. These methods allow for synchronous retrieval, checking existence, updating, deleting, and clearing cache entries.

```typescript
get(key: string): string | undefined
has(key: string): boolean
set(key: string, data: string): void
remove(key: string): boolean
clear((options = { notifySubscribers: true }));
```

--------------------------------

### Implement Optimistic Update for Creating a New Note

Source: https://developers.raycast.com/utilities/react-hooks/usesql

This snippet demonstrates how to implement an optimistic update when creating a new note. It immediately updates the local data to reflect the new note before the server confirms the creation, enhancing UI responsiveness. Error handling is included to show the rollback mechanism.

```tsx
import { Detail, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import { useSQL } from "@raycast/utils";

const NOTES_DB = resolve(homedir(), "Library/Group Containers/group.com.apple.notes/NoteStore.sqlite");
const notesQuery = `SELECT id, title FROM ...`;
type NoteItem = {
  id: string;
  title: string;
};

export default function Command() {
  const { isLoading, data, mutate, permissionView } = useFetch("https://api.example");

  if (permissionView) {
    return permissionView;
  }

  const createNewNote = async () => {
    const toast = await showToast({ style: Toast.Style.Animated, title: "Creating new Note" });
    try {
      await mutate(
        // we are calling an API to do something
        somehowCreateANewNote(),
        {
          // but we are going to do it on our local data right away,
          // without waiting for the call to return
          optimisticUpdate(data) {
            return data?.concat([{ id: "" + Math.random(), title: "New Title" }]);
          },
        },
      );
      // yay, the API call worked!
      toast.style = Toast.Style.Success;
      toast.title = "Note created";
    } catch (err) {
      // oh, the API call didn't work :(
      // the data will automatically be rolled back to its previous value
      toast.style = Toast.Style.Failure;
      toast.title = "Could not create Note";
      toast.message = err.message;
    }
  };

  return (
    <List isLoading={isLoading}>
      {(data || []).map((item) => (
        <List.Item
          key={item.id}
          title={item.title}
          actions={
            <ActionPanel>
              <Action title="Create new Note" onAction={() => createNewNote()} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

```

--------------------------------

### Displaying a Grid Item with Content and Title

Source: https://developers.raycast.com/api-reference/user-interface/grid

This snippet demonstrates how to use the Grid.Item component within a Grid layout. It shows how to set the content (e.g., an emoji), title, and subtitle for a grid item. This is a fundamental example for creating interactive grid-based UIs in Raycast.

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

### Format Version History (CHANGELOG.md) for Raycast Extensions

Source: https://developers.raycast.com/basics/prepare-an-extension-for-store

A `CHANGELOG.md` file in the extension's root folder enables users to track changes between releases. Each entry should include an H2 header with the change title in square brackets, followed by a hyphen and either `{PR_MERGE_DATE}` or a specific date (YYYY-MM-DD). Detailed descriptions of changes should follow.

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

### Add Publish Script to package.json

Source: https://developers.raycast.com/basics/publish-an-extension

If the `publish` script is missing in your `package.json`, you can add this line to the `scripts` object to enable the `npm run publish` command. This ensures the publishing functionality is available.

```json
"scripts": {
  "publish": "npx @raycast/api@latest publish"
}
```

--------------------------------

### useForm Hook Signature and Usage in TypeScript

Source: https://developers.raycast.com/utilities/react-hooks/useform

This snippet details the TypeScript signature of the useForm hook, outlining its parameters for onSubmit callbacks, initial values, and validation rules. It also describes the returned properties for handling form submission, item properties, validation errors, and value manipulation. The example demonstrates its integration within a React component for form creation.

```typescript
function useForm<T extends Form.Values>(props: {
  onSubmit: (values: T) => void | boolean | Promise<void | boolean>;
  initialValues?: Partial<T>;
  validation?: {
    [id in keyof T]?: ((value: T[id]) => string | undefined | null) | FormValidation;
  };
}): {
  handleSubmit: (values: T) => void | boolean | Promise<void | boolean>;
  itemProps: {
    [id in keyof T]: Partial<Form.ItemProps<T[id]>> & {
      id: string;
    };
  };
  setValidationError: (id: keyof T, error: ValidationError) => void;
  setValue: <K extends keyof T>(id: K, value: T[K]) => void;
  values: T;
  focus: (id: keyof T) => void;
  reset: (initialValues?: Partial<T>) => void;
};

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

### Execute Command with File and Arguments using useExec (TypeScript)

Source: https://developers.raycast.com/utilities/react-hooks/useexec

This signature is preferred for executing a single file and its arguments. The file and arguments do not require manual escaping. It returns an AsyncState object and functions for revalidation and mutation. Options allow customization of shell behavior, output parsing, and error handling.

```typescript
function useExec<T, U>(
  file: string,
  arguments: string[],
  options?: {
    shell?: boolean | string;
    stripFinalNewline?: boolean;
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    encoding?: BufferEncoding | "buffer";
    input?: string | Buffer;
    timeout?: number;
    parseOutput?: ParseExecOutputHandler<T>;
    initialData?: U;
    keepPreviousData?: boolean;
    execute?: boolean;
    onError?: (error: Error) => void;
    onData?: (data: T) => void;
    onWillExecute?: (args: string[]) => void;
    failureToastOptions?: Partial<Pick<Toast.Options, "title" | "primaryAction" | "message">>;
  }
): AsyncState<T> & {
  revalidate: () => void;
  mutate: MutatePromise<T | U | undefined>;
};
```

--------------------------------

### Use Standard Colors in Raycast List Items (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/colors

Demonstrates how to apply standard colors like Blue, Green, and Red to icons within a Raycast List component. This example utilizes the Color enum from '@raycast/api' to ensure theme consistency.

```typescript
import { Color, Icon, List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item title="Blue" icon={{ source: Icon.Circle, tintColor: Color.Blue }} />
      <List.Item title="Green" icon={{ source: Icon.Circle, tintColor: Color.Green }} />
      <List.Item title="Magenta" icon={{ source: Icon.Circle, tintColor: Color.Magenta }} />
      <List.Item title="Orange" icon={{ source: Icon.Circle, tintColor: Color.Orange }} />
      <List.Item title="Purple" icon={{ source: Icon.Circle, tintColor: Color.Purple }} />
      <List.Item title="Red" icon={{ source: Icon.Circle, tintColor: Color.Red }} />
      <List.Item title="Yellow" icon={{ source: Icon.Circle, tintColor: Color.Yellow }} />
      <List.Item title="PrimaryText" icon={{ source: Icon.Circle, tintColor: Color.PrimaryText }} />
      <List.Item title="SecondaryText" icon={{ source: Icon.Circle, tintColor: Color.SecondaryText }} />
    </List>
  );
}
```

--------------------------------

### Optimistic Updates with useStreamJSON in Raycast

Source: https://developers.raycast.com/utilities/react-hooks/usestreamjson

Illustrates how to implement optimistic updates using the `mutate` function provided by `useStreamJSON`. This example shows how to update the UI immediately after an action, assuming success, and provides a mechanism for rollback if the asynchronous operation fails. It uses `setTimeout` to simulate an asynchronous operation.

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
                  onAction={async () => {
                    mutate(setTimeout(1000), {
                      optimisticUpdate: () => {
                        return [d];
                      },
                    });
                  }}
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
```

--------------------------------

### Fetch Data with useFetch Hook

Source: https://developers.raycast.com/utilities/getting-started

The useFetch hook simplifies making HTTP requests within Raycast extensions. It supports features like pagination, optimistic updates, and customizable error handling. Issues with Content-Type parsing and URLSearchParams were addressed in v1.16.4 and v1.16.3 respectively. Pagination support was added in v1.13.0.

```javascript
// Example usage of useFetch hook (specific implementation not provided in text)
// const { data, error, isLoading } = useFetch('https://api.example.com/data');

```

--------------------------------

### Get Item from Local Storage (TypeScript)

Source: https://developers.raycast.com/api-reference/storage

Retrieves a stored value from Raycast's local encrypted database using a specified key. It returns a Promise that resolves with the value or undefined if the key does not exist. This function is asynchronous and requires the key to be a string.

```typescript
import { LocalStorage } from "@raycast/api";

export default async function Command() {
  await LocalStorage.setItem("favorite-fruit", "apple");
  const item = await LocalStorage.getItem<string>("favorite-fruit");
  console.log(item);
}
```

--------------------------------

### Programmatic Search Bar Update with Raycast List

Source: https://developers.raycast.com/api-reference/user-interface/list

Shows how to programmatically update the search bar's content in a Raycast List. This is achieved using the `searchText` prop, allowing the extension to control the search query, for example, to restore previous search states. It also utilizes `onSearchTextChange` to keep the component's state synchronized.

```typescript
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

--------------------------------

### External AI Configuration in JSON

Source: https://developers.raycast.com/ai/learn-core-concepts-of-ai-extensions

This JSON file demonstrates how to define AI instructions externally. It's useful for keeping configurations separate from the main package.json, improving readability for longer instruction sets. The structure mirrors the inline configuration.

```json
{
  "instructions": "When you don't know the user's first name, ask for it."
}
```

--------------------------------

### Controlled Text Area Example (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/form

Illustrates the use of a controlled Form.TextArea component. The component's value is managed by React's `useState` hook, and changes are handled via the `onChange` prop. This provides fine-grained control over the text area's state and is useful for more complex form interactions.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [description, setDescription] = useState<string>("");

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Description" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.TextArea id="description" value={description} onChange={setDescription} />
    </Form>
  );
}
```

--------------------------------

### Get Preference Values in Raycast (TypeScript)

Source: https://developers.raycast.com/api-reference/preferences

Demonstrates how to retrieve preference values for a Raycast command. The `getPreferenceValues` function returns an object where keys are preference names and values are their corresponding data types. It supports type safety by allowing a generic type argument.

```typescript
import { getPreferenceValues } from "@raycast/api";

interface Preferences {
  name: string;
  age: number;
  isEnabled: boolean;
}

const preferences = getPreferenceValues<Preferences>();

console.log(preferences.name);
console.log(preferences.age);
console.log(preferences.isEnabled);
```

--------------------------------

### Use Action.ToggleQuickLook for Quick Look Previews

Source: https://developers.raycast.com/misc/changelog

Introduces the Action.ToggleQuickLook action to display additional information with a Quick Look preview. This enhances user experience by providing supplementary details directly within the interface.

```javascript
import { Action, List } from '@raycast/api';

function Component() {
  return (
    <List>
      <List.Item
        title="Item with Quick Look"
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

### Get List of Browser Tabs (TypeScript)

Source: https://developers.raycast.com/api-reference/browser-extension

Fetches a list of all currently open browser tabs. The returned list contains Tab objects, each providing information about a browser tab. This function is useful for allowing users to select or interact with specific tabs.

```typescript
import { BrowserExtension } from "@raycast/api";

export default async function command() {
  const tabs = await BrowserExtension.getTabs();
  console.log(tabs);
}
```

--------------------------------

### Configure GitHub OAuth Service

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This snippet shows the straightforward configuration for the GitHub OAuthService using the static `github` property. Similar to Asana, it leverages Raycast's pre-configured OAuth app, requiring only the specification of scopes like 'repo' or 'user'.

```tsx
const github = OAuthService.github({ scope: "repo user" });
```

--------------------------------

### Render Form for Sharing Secrets in TypeScript

Source: https://developers.raycast.com/examples/doppler

This TypeScript code defines the UI for a form used to collect sensitive information. It includes a text area for the secret and dropdowns for setting expiration based on views and days, utilizing Raycast UI components.

```typescript
import { Action, ActionPanel, Clipboard, Form, Icon, showToast, Toast } from "@raycast/api";
import got from "got";

export default function Command() {
  return (
    <Form>
      <Form.TextArea id="secret" title="Secret" placeholder="Enter sensitive data to securely share…" />
      <Form.Dropdown id="expireViews" title="Expire After Views" storeValue>
        <Form.Dropdown.Item value="1" title="1 View" />
        <Form.Dropdown.Item value="2" title="2 Views" />
        <Form.Dropdown.Item value="3" title="3 Views" />
        <Form.Dropdown.Item value="5" title="5 Views" />
        <Form.Dropdown.Item value="10" title="10 Views" />
        <Form.Dropdown.Item value="20" title="20 Views" />
        <Form.Dropdown.Item value="50" title="50 Views" />
        <Form.Dropdown.Item value="-1" title="Unlimited Views" />
      </Form.Dropdown>
      <Form.Dropdown id="expireDays" title="Expire After Days" storeValue>
        <Form.Dropdown.Item value="1" title="1 Day" />
        <Form.Dropdown.Item value="2" title="2 Days" />
        <Form.Dropdown.Item value="3" title="3 Days" />
        <Form.Dropdown.Item value="7" title="1 Week" />
        <Form.Dropdown.Item value="14" title="2 Weeks" />
        <Form.Dropdown.Item value="30" title="1 Month" />
        <Form.Dropdown.Item value="90" title="3 Months" />
      </Form.Dropdown>
    </Form>
  );
}
```

--------------------------------

### Redirect Type: Web

Source: https://developers.raycast.com/api-reference/oauth

Configures a redirect back to the Raycast website, which then opens the extension. This is a static redirect URL applicable to all extensions.

```APIDOC
## Redirect Type: Web

### Description
Use this type for a redirect back to the Raycast website, which will then open the extension. In the OAuth app, configure `https://raycast.com/redirect?packageName=Extension`.

This is a static redirect URL for all extensions.

If the provider does not accept query parameters in redirect URLs, you can alternatively use `https://raycast.com/redirect/extension` and then customize the AuthorizationRequest via its `extraParameters` property. For example add: `extraParameters: { "redirect_uri": "https://raycast.com/redirect/extension" }`.

### Method
N/A (Configuration)

### Endpoint
N/A (Configuration)

### Parameters
N/A

### Request Example
N/A

### Response
N/A

```

--------------------------------

### Form.Checkbox: Controlled Example (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/form

Illustrates a controlled Form.Checkbox component in Raycast using React's useState hook. This approach allows for explicit management of the checkbox's checked state, enabling real-time updates and conditional logic based on its value. The `onChange` callback updates the component's state.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [checked, setChecked] = useState(true);

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Answer" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.Checkbox id="answer" label="Do you like orange juice?" value={checked} onChange={setChecked} />
    </Form>
  );
}
```

--------------------------------

### Submit Form Values to Doppler API in TypeScript

Source: https://developers.raycast.com/examples/doppler

This TypeScript code defines an action to handle form submission. It validates the secret input, sends the data to the Doppler API using 'got', and copies the resulting shareable URL to the clipboard, providing user feedback via toasts.

```typescript
function ShareSecretAction() {
  async function handleSubmit(values: { secret: string; expireViews: number; expireDays: number }) {
    if (!values.secret) {
      showToast({
        style: Toast.Style.Failure,
        title: "Secret is required",
      });
      return;
    }

    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Sharing secret",
    });

    try {
      const { body } = await got.post("https://api.doppler.com/v1/share/secrets/plain", {
        json: {
          secret: values.secret,
          expire_views: values.expireViews,
          expire_days: values.expireDays,
        },
        responseType: "json",
      });

      await Clipboard.copy((body as any).authenticated_url);

      toast.style = Toast.Style.Success;
      toast.title = "Shared secret";
      toast.message = "Copied link to clipboard";
    } catch (error) {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed sharing secret";
      toast.message = String(error);
    }
  }

  return <Action.SubmitForm icon={Icon.Upload} title="Share Secret" onSubmit={handleSubmit} />;
}
```

--------------------------------

### Get Access Token in TypeScript/React

Source: https://developers.raycast.com/utilities/oauth/getaccesstoken

Retrieves the access token and its type (oauth or personal) from the component's context. This function must be used within a component wrapped by `withAccessToken` to ensure the token is available. It returns an object with 'token' and 'type' properties.

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

### Execute SQL Query with useSQL Hook

Source: https://developers.raycast.com/utilities/getting-started

The useSQL hook allows executing SQL queries. It was fixed to work on Windows in v2.2.0 and v2.2.1. Prior to v2.2.0, it had issues on Windows where the database would be locked.

```javascript
// Example usage of useSQL hook (specific implementation not provided in text)
// const { data, error } = useSQL("SELECT * FROM users");

```

--------------------------------

### Custom Filtering with Grid in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/grid

Demonstrates how to implement custom filtering logic for Grid items in a Raycast extension. By setting `filtering` to false and using `onSearchTextChange`, you can manually filter items based on custom criteria, such as matching keywords. This example filters emoji items based on user input.

```typescript
import { useEffect, useState } from "react";
import { Grid } from "@raycast/api";

const items = [
  { content: "🙈", keywords: ["see-no-evil", "monkey"] },
  { content: "🥳", keywords: ["partying", "face"] },
];

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [filteredList, filterList] = useState(items);

  useEffect(() => {
    filterList(items.filter((item) => item.keywords.some((keyword) => keyword.includes(searchText))));
  }, [searchText]);

  return (
    <Grid
      columns={5}
      inset={Grid.Inset.Large}
      filtering={false}
      onSearchTextChange={setSearchText}
      navigationTitle="Search Emoji"
      searchBarPlaceholder="Search your favorite emoji"
    >
      {filteredList.map((item) => (
        <Grid.Item key={item.content} content={item.content} />
      ))}
    </Grid>
  );
}
```

--------------------------------

### Displaying Form Descriptions in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/form

Demonstrates how to use Form.Description to display informational text within a Raycast form. It requires the '@raycast/api' package and accepts 'title' and 'text' props.

```typescript
import { ActionPanel, Form, Action } from "@raycast/api";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.Description
        title="Import / Export"
        text="Exporting will back-up your preferences, quicklinks, snippets, floating notes, script-command folder paths, aliases, hotkeys, favorites and other data."
      />
    </Form>
  );
}
```

--------------------------------

### OAuth Authorization Request URL Parameters

Source: https://developers.raycast.com/api-reference/oauth

Details the parameters generated by the PKCE client for constructing the authorization URL. These are automatically handled by the client but are useful for understanding the flow.

```APIDOC
## OAuth Authorization URL Parameters

### Description
These parameters are automatically generated by the PKCE client and used in constructing the authorization URL.

### Parameters
#### Request Body (Implicitly generated)
- **codeChallenge** (string) - Required - The PKCE `code_challenge` value.
- **codeVerifier** (string) - Required - The PKCE `code_verifier` value.
- **redirectURI** (string) - Required - The OAuth `redirect_uri` value.
- **state** (string) - Required - The OAuth `state` value.

### Response (Implicitly used in URL construction)
These values are used to build the final authorization URL.
```

--------------------------------

### Access Command Arguments in TypeScript

Source: https://developers.raycast.com/information/lifecycle/arguments

This TypeScript code snippet shows how to access the values of arguments passed to a Raycast command. The arguments are available through the `props.arguments` object, which is typed using the global `Arguments` namespace defined in the manifest. The example logs the received title and subtitle and uses them as default values in a Form.

```typescript
import { Form, LaunchProps } from "@raycast/api";

export default function Todoist(props: LaunchProps<{ arguments: Arguments.MyCommand }>) {
  const { title, subtitle } = props.arguments;
  console.log(`title: ${title}, subtitle: ${subtitle}`);

  return (
    <Form>
      <Form.TextField id="title" title="Title" defaultValue={title} />
      <Form.TextField id="subtitle" title="Subtitle" defaultValue={subtitle} />
    </Form>
  );
}
```

--------------------------------

### Get Browser Tab Content (TypeScript)

Source: https://developers.raycast.com/api-reference/browser-extension

Retrieves content from an open browser tab. Supports specifying a CSS selector, tab ID, and desired format (HTML, text, or markdown). If no CSS selector is provided, it fetches content from the active tab. Markdown format is not compatible with CSS selectors.

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

### useExec Hook - Command String Execution

Source: https://developers.raycast.com/utilities/react-hooks/useexec

This method is suitable for executing more complex commands where the file and arguments are combined into a single string. Ensure proper escaping for spaces if variables are used.

```APIDOC
## useExec (Command String)

### Description
Executes a command specified as a single string, returning its asynchronous state. This method is useful for commands involving shell features or complex argument structures. It also uses stale-while-revalidate caching.

### Method
N/A (This is a hook, not a direct HTTP endpoint)

### Endpoint
N/A

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

#### Hook Arguments
- **command** (string) - Required - The command string to execute. If it contains spaces and is not a constant, escape them with backslashes.
- **options** (object) - Optional - Configuration options for the execution. See the options for 'useExec (Single File)' above.
  - **shell** (boolean | string) - Required if the command uses shell-specific features (e.g., `&&`, `||`). If a string, it specifies the shell to use.
  - **stripFinalNewline** (boolean) - Optional - Whether to remove the final newline character from the output.
  - **cwd** (string) - Optional - The current working directory for the execution.
  - **env** (NodeJS.ProcessEnv) - Optional - Environment variables for the execution.
  - **encoding** (BufferEncoding | "buffer") - Optional - The encoding of the output. Defaults to 'utf8'.
  - **input** (string | Buffer) - Optional - Input to be passed to the command's stdin.
  - **timeout** (number) - Optional - The maximum time in milliseconds to wait for the command to complete.
  - **parseOutput** (ParseExecOutputHandler<T>) - Optional - A function to parse the command's output.
  - **initialData** (U) - Optional - Initial data to be used before the first execution.
  - **keepPreviousData** (boolean) - Optional - Whether to keep the previous data when a new execution starts.
  - **execute** (boolean) - Optional - Whether to automatically execute the command on mount. Defaults to true.
  - **onError** (function) - Optional - A callback function to handle errors.
  - **onData** (function) - Optional - A callback function to handle data chunks as they arrive.
  - **onWillExecute** (function) - Optional - A callback function that is called before execution starts.
  - **failureToastOptions** (Partial<Pick<Toast.Options, "title" | "primaryAction" | "message">>) - Optional - Options for displaying a toast notification on failure.

### Request Example
```javascript
const { data, isLoading, error } = useExec<string, string>("echo Raycast", {
  shell: true, // Necessary for shell features like pipes or redirects
  initialData: "Waiting...",
});

// Example with environment variable and potential space escaping
const supportPath = process.env.RAYCAST_SUPPORTED_PATH;
const command = `ls "${supportPath}"`; // Escaping quotes for safety
const { data: supportFiles } = useExec(command, {
  shell: true
});
```

### Response
Returns an object with the following properties:
- **data** (T | U | undefined): The data returned by the command execution.
- **isLoading** (boolean): True if the command is currently executing.
- **error** (Error | undefined): The error object if the command execution failed.
- **revalidate**: A function to manually trigger a re-execution of the command.
- **mutate**: A function to manually mutate the cached data.

#### Success Response (200)
N/A (This is a hook, not an HTTP endpoint)

#### Response Example
```json
{
  "data": "Raycast version 1.0.0",
  "isLoading": false,
  "error": null
}
```
```

--------------------------------

### Action.ToggleQuickLook

Source: https://developers.raycast.com/api-reference/user-interface/actions

Action that toggles the Quick Look to preview a file. It accepts props for icon, shortcut, and title.

```APIDOC
## Action.ToggleQuickLook

### Description
Action that toggles the Quick Look to preview a file.

### Method
N/A (Component within an ActionPanel)

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

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Props
#### Path Parameters
N/A

#### Query Parameters
```

--------------------------------

### Implement Share Secret Form and Action in Raycast (TypeScript)

Source: https://developers.raycast.com/examples/doppler

This TypeScript code defines a Raycast form with fields for a secret, expiration views, and expiration days. It includes a `ShareSecretAction` that submits the form data to a Doppler API endpoint to generate a shareable, self-destructing URL, which is then copied to the clipboard. Dependencies include '@raycast/api' and 'got'.

```typescript
import { Action, ActionPanel, Clipboard, Form, Icon, showToast, Toast } from "@raycast/api";
import got from "got";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <ShareSecretAction />
        </ActionPanel>
      }
    >
      <Form.TextArea id="secret" title="Secret" placeholder="Enter sensitive data to securely share…" />
      <Form.Dropdown id="expireViews" title="Expire After Views" storeValue>
        <Form.Dropdown.Item value="1" title="1 View" />
        <Form.Dropdown.Item value="2" title="2 Views" />
        <Form.Dropdown.Item value="3" title="3 Views" />
        <Form.Dropdown.Item value="5" title="5 Views" />
        <Form.Dropdown.Item value="10" title="10 Views" />
        <Form.Dropdown.Item value="20" title="20 Views" />
        <Form.Dropdown.Item value="50" title="50 Views" />
        <Form.Dropdown.Item value="-1" title="Unlimited Views" />
      </Form.Dropdown>
      <Form.Dropdown id="expireDays" title="Expire After Days" storeValue>
        <Form.Dropdown.Item value="1" title="1 Day" />
        <Form.Dropdown.Item value="2" title="2 Days" />
        <Form.Dropdown.Item value="3" title="3 Days" />
        <Form.Dropdown.Item value="7" title="1 Week" />
        <Form.Dropdown.Item value="14" title="2 Weeks" />
        <Form.Dropdown.Item value="30" title="1 Month" />
        <Form.Dropdown.Item value="90" title="3 Months" />
      </Form.Dropdown>
    </Form>
  );
}

function ShareSecretAction() {
  async function handleSubmit(values: { secret: string; expireViews: number; expireDays: number }) {
    if (!values.secret) {
      showToast({
        style: Toast.Style.Failure,
        title: "Secret is required",
      });
      return;
    }

    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Sharing secret",
    });

    try {
      const { body } = await got.post("https://api.doppler.com/v1/share/secrets/plain", {
        json: {
          secret: values.secret,
          expire_views: values.expireViews,
          expire_days: values.expireDays,
        },
        responseType: "json",
      });

      await Clipboard.copy((body as any).authenticated_url);

      toast.style = Toast.Style.Success;
      toast.title = "Shared secret";
      toast.message = "Copied link to clipboard";
    } catch (error) {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed sharing secret";
      toast.message = String(error);
    }
  }

  return <Action.SubmitForm icon={Icon.Upload} title="Share Secret" onSubmit={handleSubmit} />;
}

```

--------------------------------

### Open Target with Application - TypeScript

Source: https://developers.raycast.com/api-reference/utilities

Opens a specified target (file, folder, or URL) using either the system's default application or a designated application. It returns a Promise that resolves once the target is opened. Dependencies include the '@raycast/api' package.

```typescript
import { open } from "@raycast/api";

export default async function Command() {
  await open("https://www.raycast.com", "com.google.Chrome");
}
```

--------------------------------

### Implement Search Bar Dropdown with Grid.Dropdown in TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/grid

This snippet shows how to implement a functional dropdown menu within the Raycast search bar using Grid.Dropdown. It allows users to filter content based on selected categories. The example utilizes React state management to handle dropdown changes and dynamically renders grid items.

```typescript
import { Grid, Image } from "@raycast/api";
import { useState } from "react";

const types = [
  { id: 1, name: "Smileys", value: "smileys" },
  { id: 2, name: "Animals & Nature", value: "animals-and-nature" },
];

const items: { [key: string]: { content: Image.ImageLike; keywords: string[] }[] } = {
  smileys: [{ content: "🥳", keywords: ["partying", "face"] }],
  "animals-and-nature": [{ content: "🙈", keywords: ["see-no-evil", "monkey"] }],
};

export default function Command() {
  const [type, setType] = useState<string>("smileys");

  return (
    <Grid
      navigationTitle="Search Beers"
      searchBarPlaceholder="Search your favorite drink"
      searchBarAccessory={
        <Grid.Dropdown tooltip="Select Emoji Category" storeValue={true} onChange={(newValue) => setType(newValue)}>
          <Grid.Dropdown.Section title="Emoji Categories">
            {types.map((type) => (
              <Grid.Dropdown.Item key={type.id} title={type.name} value={type.value} />
            ))}
          </Grid.Dropdown.Section>
        </Grid.Dropdown>
      }
    >
      {(items[type] || []).map((item) => (
        <Grid.Item key={`${item.content}`} content={item.content} keywords={item.keywords} />
      ))}
    </Grid>
  );
}
```

--------------------------------

### Stream JSON Data with Filtering and Transformation in Raycast

Source: https://developers.raycast.com/utilities/react-hooks/usestreamjson

Demonstrates using the useStreamJSON hook to fetch and display a list of formulae from a JSON API. It includes features like pagination, client-side filtering based on search text, and data transformation before rendering. This example utilizes Raycast UI components like List and List.Item.

```typescript
import { Action, ActionPanel, List, environment } from "@raycast/api";
import { useStreamJSON } from "@raycast/utils";
import { join } from "path";
import { useCallback, useState } from "react";

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

  const { data, isLoading, pagination } = useStreamJSON("https://formulae.brew.sh/api/formula.json", {
    initialData: [] as Formula[],
    pageSize: 20,
    filter: formulaFilter,
    transform: formulaTransform
  });

  return (
    <List isLoading={isLoading} pagination={pagination} onSearchTextChange={setSearchText}>
      <List.Section title="Formulae">
        {data.map((d) => (
          <List.Item key={d.name} title={d.name} subtitle={d.desc} />
        ))}
      </List.Section>
    </List>
  );
}
```

--------------------------------

### Define Platform-Specific Keyboard Shortcuts

Source: https://developers.raycast.com/api-reference/keyboard

Illustrates how to define keyboard shortcuts that have different configurations for macOS and Windows. This is useful for 'ambiguous' modifiers like 'ctrl' or 'cmd' that have platform-specific equivalents.

```javascript
{
  macOS: { modifiers: ["cmd", "shift"], key: "c" },
  Windows: { modifiers: ["ctrl", "shift"], key: "c" },
}
```

--------------------------------

### Programmatic Search Bar Update in Raycast Grid

Source: https://developers.raycast.com/api-reference/user-interface/grid

Shows how to programmatically update the search bar's text in a Raycast Grid component. The `searchText` prop allows the extension to control the search bar's content, useful for features like resuming previous searches. This example allows selecting an emoji to set it as the search text.

```typescript
import { useState } from "react";
import { Action, ActionPanel, Grid } from "@raycast/api";

const items = [
  { content: "🙈", keywords: ["see-no-evil", "monkey"] },
  { content: "🥳", keywords: ["partying", "face"] },
];

export default function Command() {
  const [searchText, setSearchText] = useState("");

  return (
    <Grid
      searchText={searchText}
      onSearchTextChange={setSearchText}
      navigationTitle="Search Emoji"
      searchBarPlaceholder="Search your favorite emoji"
    >
      {items.map((item) => (
        <Grid.Item
          key={item.content}
          content={item.content}
          actions={
            <ActionPanel>
              <Action title="Select" onAction={() => setSearchText(item.content)} />
            </ActionPanel>
          }
        />
      ))}
    </Grid>
  );
}
```

--------------------------------

### Simple JSON Expectation for Tool Call

Source: https://developers.raycast.com/ai/learn-core-concepts-of-ai-extensions

This JSON snippet demonstrates a simple expectation to verify if the AI calls a tool named 'greet' with a specific argument 'name' set to 'thomas'. It's a basic way to test tool invocation.

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
                "name": "thomas"
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

### Accessing Form Item Imperative APIs with useRef in TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/form

This TypeScript code snippet demonstrates how to use React's `useRef` hook to obtain references to various Raycast form components. These references allow direct access to imperative methods such as `focus()` and `reset()` on the form elements, enabling programmatic control over their state and behavior. It includes examples for TextField, TextArea, DatePicker, PasswordField, Dropdown, TagPicker, and Checkbox components.

```typescript
import { useRef } from "react";
import { ActionPanel, Form, Action } from "@raycast/api";

interface FormValues {
  nameField: string;
  bioTextArea: string;
  datePicker: string;
}

export default function Command() {
  const textFieldRef = useRef<Form.TextField>(null);
  const textAreaRef = useRef<Form.TextArea>(null);
  const datePickerRef = useRef<Form.DatePicker>(null);
  const passwordFieldRef = useRef<Form.PasswordField>(null);
  const dropdownRef = useRef<Form.Dropdown>(null);
  const tagPickerRef = useRef<Form.TagPicker>(null);
  const firstCheckboxRef = useRef<Form.Checkbox>(null);
  const secondCheckboxRef = useRef<Form.Checkbox>(null);

  async function handleSubmit(values: FormValues) {
    console.log(values);
    datePickerRef.current?.focus();
    dropdownRef.current?.reset();
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
          <ActionPanel.Section title="Focus">
            <Action title="Focus TextField" onAction={() => textFieldRef.current?.focus()} />
            <Action title="Focus TextArea" onAction={() => textAreaRef.current?.focus()} />
            <Action title="Focus DatePicker" onAction={() => datePickerRef.current?.focus()} />
            <Action title="Focus PasswordField" onAction={() => passwordFieldRef.current?.focus()} />
            <Action title="Focus Dropdown" onAction={() => dropdownRef.current?.focus()} />
            <Action title="Focus TagPicker" onAction={() => tagPickerRef.current?.focus()} />
            <Action title="Focus First Checkbox" onAction={() => firstCheckboxRef.current?.focus()} />
            <Action title="Focus Second Checkbox" onAction={() => secondCheckboxRef.current?.focus()} />
          </ActionPanel.Section>
          <ActionPanel.Section title="Reset">
            <Action title="Reset TextField" onAction={() => textFieldRef.current?.reset()} />
            <Action title="Reset TextArea" onAction={() => textAreaRef.current?.reset()} />
            <Action title="Reset DatePicker" onAction={() => datePickerRef.current?.reset()} />
            <Action title="Reset PasswordField" onAction={() => passwordFieldRef.current?.reset()} />
            <Action title="Reset Dropdown" onAction={() => dropdownRef.current?.reset()} />
            <Action title="Reset TagPicker" onAction={() => tagPickerRef.current?.reset()} />
            <Action title="Reset First Checkbox" onAction={() => firstCheckboxRef.current?.reset()} />
            <Action title="Reset Second Checkbox" onAction={() => secondCheckboxRef.current?.reset()} />
          </ActionPanel.Section>
        </ActionPanel>
      }
    >
      <Form.TextField id="textField" title="TextField" ref={textFieldRef} />
      <Form.TextArea id="textArea" title="TextArea" ref={textAreaRef} />
      <Form.DatePicker id="datePicker" title="DatePicker" ref={datePickerRef} />
      <Form.PasswordField id="passwordField" title="PasswordField" ref={passwordFieldRef} />
      <Form.Separator />
      <Form.Dropdown
        id="dropdown"
        title="Dropdown"
        defaultValue="first"
        onChange={(newValue) => {
          console.log(newValue);
        }}
        ref={dropdownRef}
      >
        <Form.Dropdown.Item value="first" title="First" />
        <Form.Dropdown.Item value="second" title="Second" />
      </Form.Dropdown>
      <Form.Separator />
      <Form.TagPicker
        id="tagPicker"
        title="TagPicker"
        ref={tagPickerRef}
        onChange={(t) => {
          console.log(t);
        }}
      >
        {["one", "two", "three"].map((tag) => (
          <Form.TagPicker.Item key={tag} value={tag} title={tag} />
        ))}
      </Form.TagPicker>
      <Form.Separator />
      <Form.Checkbox
        id="firstCheckbox"
        title="First Checkbox"
        label="First Checkbox"
        ref={firstCheckboxRef}
        onChange={(checked) => {
          console.log("first checkbox onChange ", checked);
        }}
      />
      <Form.Checkbox
        id="secondCheckbox"
        title="Second Checkbox"
        label="Second Checkbox"
        ref={secondCheckboxRef}
        onChange={(checked) => {
          console.log("second checkbox onChange ", checked);
        }}
      />
      <Form.Separator />
    </Form>
  );
}

```

--------------------------------

### Create a Form with Dropdown in Raycast (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/form

This snippet demonstrates how to create a form with a dropdown menu in a Raycast command using TypeScript. It utilizes the `@raycast/api` library to define the form structure and options. The dropdown allows users to select from predefined categories and items.

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

### Authenticate with Custom OAuth Client using OAuthService

Source: https://developers.raycast.com/utilities/oauth

Shows how to integrate a custom OAuth client with Raycast's utilities. This involves creating an `OAuth.PKCEClient` instance and then configuring `OAuthService` with your client details, including `clientId`, `scope`, `authorizeUrl`, and `tokenUrl`.

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

### OAuth Provider Configuration

Source: https://developers.raycast.com/api-reference/oauth

Configuration options for setting up an OAuth provider, including mandatory and optional properties.

```APIDOC
## OAuth Provider Configuration

### Description
This section outlines the properties required and optional for configuring an OAuth provider. These settings are crucial for enabling secure authentication flows within your Raycast extension.

### Method
N/A (Configuration Object)

### Endpoint
N/A (Configuration Object)

### Parameters
#### Properties
- **providerName** (string) - Required - The name of the provider, displayed in the OAuth overlay.
- **redirectMethod** (OAuth.RedirectMethod) - Required - The redirect method for the OAuth flow. Must be set to the correct method for the provider (see OAuth.RedirectMethod).
- **description** (string) - Optional - An optional description shown in the OAuth overlay. Used for customizing messages for end-users, such as handling scope changes or migrations. Raycast provides a default message if this is not configured.
- **providerIcon** (Image.ImageLike) - Optional - An icon displayed in the OAuth overlay. Must be at least 64x64 pixels.
- **providerId** (string) - Optional - An optional ID for associating the client with a provider. Only set this if using multiple different clients in your extension.

### Request Example
```json
{
  "providerName": "ExampleProvider",
  "redirectMethod": "web",
  "description": "Connect to ExampleProvider to access your data.",
  "providerIcon": "path/to/icon.png",
  "providerId": "example-client-1"
}
```

### Response
#### Success Response (N/A)
This is a configuration object, not an endpoint that returns a response.

#### Response Example
N/A
```

--------------------------------

### AI.AskOptions

Source: https://developers.raycast.com/api-reference/ai

Defines the configuration options for making AI model requests, including creativity levels, model selection, and cancellation signals.

```APIDOC
## AI.AskOptions

### Description
Configuration options for AI model interactions.

### Properties

#### creativity
Controls the creativity level of the AI model. Accepts a range from 0 to 2. Values outside this range will be clamped to 0 or 2.
- **Type**: [`AI.Creativity`](#ai.creativity)

#### model
Specifies the AI model to be used for the prompt.
- **Type**: [`AI.Model`](#ai.model)

#### signal
An abort signal to cancel the ongoing AI request.
- **Type**: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
```

--------------------------------

### Create Quicklink Action in TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/actions

Illustrates the usage of the Action.CreateQuicklink component for prefilling the Create Quicklink command. It requires a quicklink object with a 'link' property. This action is commonly used within an ActionPanel.

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

### launchCommand

Source: https://developers.raycast.com/api-reference/command

Launches another Raycast command. This function can be used to trigger commands from the same extension or different extensions, optionally passing arguments and context.

```APIDOC
## POST /launchCommand

### Description
Launches another Raycast command. If the command does not exist or is not enabled, an error will be thrown. If the command is part of another extension, the user will be presented with a permission alert. This method is useful for opening commands based on user interaction or triggering background refreshes.

### Method
POST

### Endpoint
/launchCommand

### Parameters
#### Request Body
- **options** (object) - Required - Options to launch a command. This object includes:
  - **name** (string) - Required - The command name as defined in the extension's manifest.
  - **type** (enum) - Required - The type of launch, either `LaunchType.UserInitiated` or `LaunchType.Background`.
  - **arguments** (object | null) - Optional - An object for argument properties and values.
  - **context** (object | null) - Optional - An arbitrary JSON serializable object for custom data.
  - **fallbackText** (string | null) - Optional - Fallback text to send to the command.

### Request Example
```json
{
  "options": {
    "name": "list",
    "type": "UserInitiated",
    "context": {"foo": "bar"}
  }
}
```

### Response
#### Success Response (200)
- **void** - The promise resolves when the command has been launched. Note: this does not indicate that the launched command has finished executing.

#### Response Example
(No response body on success)
```

--------------------------------

### Configure Alert Options with TypeScript

Source: https://developers.raycast.com/api-reference/feedback/alert

Illustrates how to define and use `Alert.Options` to customize the appearance and behavior of a confirmation alert. This includes setting the title, message, and defining a primary action with its own handler. While a handler can be set, the `if (await confirmAlert(...))` pattern is recommended for cleaner code.

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

### Copy Content to Clipboard using Raycast API

Source: https://developers.raycast.com/api-reference/clipboard

Demonstrates how to copy various types of content (text, files, concealed data) to the clipboard using the `Clipboard.copy` function. It handles potential errors when copying files and shows how to use the `concealed` option for sensitive information. Requires the `@raycast/api` package.

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

### useExec Hook - Single File Execution

Source: https://developers.raycast.com/utilities/react-hooks/useexec

This is the preferred method for executing a single file. The file and its arguments do not require escaping.

```APIDOC
## useExec (Single File)

### Description
Executes a command represented by a file and its arguments, returning its asynchronous state. It utilizes a stale-while-revalidate caching strategy.

### Method
N/A (This is a hook, not a direct HTTP endpoint)

### Endpoint
N/A

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

#### Hook Arguments
- **file** (string) - Required - The path to the executable file.
- **arguments** (string[]) - Required - An array of arguments to pass to the file.
- **options** (object) - Optional - Configuration options for the execution.
  - **shell** (boolean | string) - Optional - Whether to execute in a shell. If a string, it specifies the shell to use.
  - **stripFinalNewline** (boolean) - Optional - Whether to remove the final newline character from the output.
  - **cwd** (string) - Optional - The current working directory for the execution.
  - **env** (NodeJS.ProcessEnv) - Optional - Environment variables for the execution.
  - **encoding** (BufferEncoding | "buffer") - Optional - The encoding of the output. Defaults to 'utf8'.
  - **input** (string | Buffer) - Optional - Input to be passed to the command's stdin.
  - **timeout** (number) - Optional - The maximum time in milliseconds to wait for the command to complete.
  - **parseOutput** (ParseExecOutputHandler<T>) - Optional - A function to parse the command's output.
  - **initialData** (U) - Optional - Initial data to be used before the first execution.
  - **keepPreviousData** (boolean) - Optional - Whether to keep the previous data when a new execution starts.
  - **execute** (boolean) - Optional - Whether to automatically execute the command on mount. Defaults to true.
  - **onError** (function) - Optional - A callback function to handle errors.
  - **onData** (function) - Optional - A callback function to handle data chunks as they arrive.
  - **onWillExecute** (function) - Optional - A callback function that is called before execution starts.
  - **failureToastOptions** (Partial<Pick<Toast.Options, "title" | "primaryAction" | "message">>) - Optional - Options for displaying a toast notification on failure.

### Request Example
```javascript
const { data, isLoading, error } = useExec<string, string>("ls", ["-l", "/path/to/directory"], {
  initialData: "Loading...",
  onData: (output) => console.log("Received data:", output),
  onError: (err) => console.error("Execution failed:", err),
});
```

### Response
Returns an object with the following properties:
- **data** (T | U | undefined): The data returned by the command execution.
- **isLoading** (boolean): True if the command is currently executing.
- **error** (Error | undefined): The error object if the command execution failed.
- **revalidate**: A function to manually trigger a re-execution of the command.
- **mutate**: A function to manually mutate the cached data.

#### Success Response (200)
N/A (This is a hook, not an HTTP endpoint)

#### Response Example
```json
{
  "data": "file1.txt\nfile2.txt",
  "isLoading": false,
  "error": null
}
```
```

--------------------------------

### TypeScript Signature for useFetch Hook

Source: https://developers.raycast.com/utilities/react-hooks/usefetch

Defines the TypeScript signature for the `useFetch` hook, outlining its generic types, parameters, options, and return type. It details the `url`, `options` (including `RequestInit` extensions like `parseResponse`, `mapResult`, `initialData`, `keepPreviousData`, `execute`, `onError`, `onData`, `onWillExecute`, `failureToastOptions`), and the returned `AsyncState` object with `revalidate` and `mutate` methods.

```typescript
export function useFetch<V, U, T = V>(
  url: RequestInfo,
  options?: RequestInit & {
    parseResponse?: (response: Response) => Promise<V>;
    mapResult?: (result: V) => { data: T };
    initialData?: U;
    keepPreviousData?: boolean;
    execute?: boolean;
    onError?: (error: Error) => void;
    onData?: (data: T) => void;
    onWillExecute?: (args: [string, RequestInit]) => void;
    failureToastOptions?: Partial<Pick<Toast.Options, "title" | "primaryAction" | "message">>;
  },
): AsyncState<T> & { 
  revalidate: () => void;
  mutate: MutatePromise<T | U | undefined>;
};
```

--------------------------------

### Execute AppleScript with Arguments

Source: https://developers.raycast.com/utilities/functions/runapplescript

Executes an AppleScript script with provided arguments. The script is defined as a string, and an array of strings can be passed as arguments. Options allow for controlling output readability, specifying script language, setting timeouts, and providing a custom output parser. This function is only available on macOS.

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

### Lazy Loading Submenu Content with onOpen Callback

Source: https://developers.raycast.com/api-reference/user-interface/action-panel

Demonstrates how to lazily fetch and set content for a Submenu when it is opened. This is useful for optimizing performance by only loading data when necessary. It utilizes React's useState hook for managing the content state.

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

### List Component Properties

Source: https://developers.raycast.com/api-reference/user-interface/list

This section details the various properties that can be configured for the List component, including callbacks, UI elements, and state management.

```APIDOC
## List Component Properties

### Description

This section details the various properties that can be configured for the List component, including callbacks, UI elements, and state management.

### Method

N/A (Component Properties)

### Endpoint

N/A (Component Properties)

### Parameters

#### Path Parameters

N/A

#### Query Parameters

N/A

#### Request Body

N/A

### Request Example

```json
{
  "onSearchTextChange": "(text: string) => void",
  "onSelectionChange": "(id: string) => void",
  "pagination": "{ hasMore: boolean; onLoadMore: () => void; pageSize: number }",
  "searchBarAccessory": "ReactElement<List.Dropdown.Props, string>",
  "searchBarPlaceholder": "string",
  "searchText": "string",
  "selectedItemId": "string",
  "throttle": "boolean"
}
```

### Response

#### Success Response (200)

N/A (Component Properties)

#### Response Example

N/A
```

--------------------------------

### Create a List Item in Raycast (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/list

Demonstrates how to create a basic list item within a Raycast List component using TypeScript. It utilizes the `List.Item` component and specifies an icon, title, subtitle, and accessories.

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

### LocalStorage.allItems

Source: https://developers.raycast.com/api-reference/storage

Retrieves all stored key-value pairs from the local storage of the extension.

```APIDOC
## GET /storage/all

### Description
Retrieves all stored values in the local storage of an extension.

### Method
GET

### Endpoint
`/storage/all`

### Response
#### Success Response (200)
- **items** (object) - An object containing all key-value pairs stored in the local storage.

#### Response Example
```json
{
  "items": {
    "setting1": "value1",
    "setting2": 123
  }
}
```
```

--------------------------------

### Paste Content to Frontmost Application using Raycast API

Source: https://developers.raycast.com/api-reference/clipboard

Shows how to use the `Clipboard.paste` function to insert text content at the current cursor position in the frontmost application. This is useful for automating text entry. Requires the `@raycast/api` package.

```typescript
import { Clipboard } from "@raycast/api";

export default async function Command() {
  await Clipboard.paste("I really like Raycast's API");
}
```

--------------------------------

### Built-in OAuth Services

Source: https://developers.raycast.com/utilities/oauth/oauthservice

Provides static methods for easy authentication with pre-configured OAuth providers like Asana, GitHub, Google, etc.

```APIDOC
## Built-in OAuth Services

### Description
Provides static methods for easy authentication with pre-configured OAuth providers. Some services have default apps configured by Raycast, while others require custom client configuration.

### Asana
#### Signature
`OAuthService.asana: (options: ProviderWithDefaultClientOptions) => OAuthService`
#### Example
```tsx
const asana = OAuthService.asana({ scope: "default" });
```

### GitHub
#### Signature
`OAuthService.github: (options: ProviderWithDefaultClientOptions) => OAuthService`
#### Example
```tsx
const github = OAuthService.github({ scope: "repo user" });
```

### Google
#### Description
Requires custom client configuration due to verification processes. Refer to [Getting a Google client ID](https://developers.raycast.com/utilities/oauth/getting-google-client-id) for assistance.
#### Signature
`OAuthService.google: (options: ProviderOptions) => OAuthService`
#### Example
```tsx
const google = OAuthService.google({
  clientId: "custom-client-id",
  scope: "https://www.googleapis.com/auth/drive.readonly",
});
```

### Jira
#### Description
Requires scopes to be enabled manually in OAuth app settings. Custom client configuration is necessary.
#### Signature
`OAuthService.jira: (options: ProviderOptions) => OAuthService`
#### Example
```tsx
const jira = OAuthService.jira({
  clientId: "custom-client-id",
  scope: "read:jira-user read:jira-work offline_access",
});
```

### Linear
#### Signature
`OAuthService.linear: (options: ProviderOptions) => OAuthService`
#### Example
```tsx
const linear = OAuthService.linear({ scope: "read write" });
```

### Slack
#### Signature
`OAuthService.slack: (options: ProviderWithDefaultClientOptions) => OAuthService`
#### Example
```tsx
const slack = OAuthService.slack({ scope: "emoji:read" });
```

### Zoom
#### Description
Requires scopes to be enabled manually in OAuth app settings. Custom client configuration is necessary.
#### Signature
`OAuthService.zoom: (options: ProviderOptions) => OAuthService`
#### Example
```tsx
const zoom = OAuthService.zoom({
  clientId: "custom-client-id",
  scope: "meeting:write",
});
```
```

--------------------------------

### Redirect Type: App

Source: https://developers.raycast.com/api-reference/oauth

Configures an app-scheme based redirect that directly opens Raycast. This is used for deep linking into the Raycast application.

```APIDOC
## Redirect Type: App

### Description
Use this type for an app-scheme based redirect that directly opens Raycast. In the OAuth app, configure `raycast://oauth?package_name=Extension`.

### Method
N/A (Configuration)

### Endpoint
N/A (Configuration)

### Parameters
N/A

### Request Example
N/A

### Response
N/A

```

--------------------------------

### Clipboard.copy

Source: https://developers.raycast.com/api-reference/clipboard

Copies specified content to the system clipboard. Supports copying text, files, or HTML content, with an option to mark content as confidential.

```APIDOC
## POST /clipboard/copy

### Description
Copies specified content to the system clipboard. Supports copying text, files, or HTML content, with an option to mark content as confidential.

### Method
POST

### Endpoint
/clipboard/copy

### Parameters
#### Request Body
- **text** (string) - Optional - The plain text content to copy.
- **file** (string) - Optional - The path to the file to copy.
- **html** (string) - Optional - The HTML content to copy.
- **options.concealed** (boolean) - Optional - Indicates whether the content should be treated as confidential. If true, it will not be recorded in the Clipboard History.

### Request Example
```json
{
  "text": "Content to be copied",
  "options": {
    "concealed": true
  }
}
```

### Response
#### Success Response (200)
- **success** (boolean) - Indicates if the copy operation was successful.

#### Response Example
```json
{
  "success": true
}
```
```

--------------------------------

### External AI Configuration in YAML

Source: https://developers.raycast.com/ai/learn-core-concepts-of-ai-extensions

This YAML file shows an alternative way to define AI instructions externally. YAML's block scalar syntax (`|`) makes it suitable for multi-line instructions, offering a more readable format compared to JSON for complex text.

```yaml
instructions: |
  When you don't know the user's first name, ask for it.
```

--------------------------------

### Lazy Fetch Submenu Content with onOpen Callback

Source: https://developers.raycast.com/misc/changelog

The ActionPanel.Submenu now includes an `onOpen` callback. This allows for lazily fetching the submenu's content, improving performance by only loading data when the submenu is actually opened.

```javascript
import { ActionPanel, Action, Submenu } from '@raycast/api';

function LazySubmenu() {
  return (
    <ActionPanel>
      <ActionPanel.Submenu
        title="Dynamic Options"
        onOpen={async () => {
          // Fetch submenu items here
          console.log('Submenu opened, fetching data...');
          return [
            { title: 'Option 1', onAction: () => {} },
            { title: 'Option 2', onAction: () => {} },
          ];
        }}
      />
    </ActionPanel>
  );
}
```

--------------------------------

### Cache Options Configuration (TypeScript)

Source: https://developers.raycast.com/api-reference/cache

Defines the configuration options for creating a new cache instance. This includes setting the capacity in bytes and an optional namespace for separating caches.

```typescript
interface Options {
  capacity?: number; // Default is 10MB
  namespace?: string;
}
```

--------------------------------

### Display Searchable List in Raycast (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/list

This snippet shows how to create a Raycast command that displays a list of items. It utilizes the `@raycast/api` library to define a `List` component with a navigation title and a search bar placeholder. The list items themselves are simple `List.Item` components, each with a `title` property.

```typescript
import { List } from "@raycast/api";

export default function Command() {
  return (
    <List navigationTitle="Search Beers" searchBarPlaceholder="Search your favorite beer">
      <List.Item title="Augustiner Helles" />
      <List.Item title="Camden Hells" />
      <List.Item title="Leffe Blonde" />
      <List.Item title="Sierra Nevada IPA" />
    </List>
  );
}
```

--------------------------------

### New Default ESLint Configuration with @raycast/eslint-config

Source: https://developers.raycast.com/migration/v1.48.8

Shows the simplified ESLint configuration using the `@raycast` preset. This replaces the previous configuration when migrating extensions.

```json
{
  "root": true,
  "extends": [
    "@raycast"
  ]
}
```

--------------------------------

### Displaying List Item Accessories in Raycast (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/list

This snippet demonstrates how to display various types of accessories within a List.Item in a Raycast extension. It covers text, colored text, icons, tooltips, dates, and tags, showcasing the flexibility of the Raycast API for enriching list items.

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

### OAuthServiceOptions Configuration

Source: https://developers.raycast.com/utilities/oauth/oauthservice

Defines the structure and properties for configuring OAuth service options, essential for setting up authentication flows.

```APIDOC
## OAuthServiceOptions

### Description
Configuration options for setting up an OAuth service, including client details, URLs, scopes, and callbacks.

### Method
N/A (Configuration Object)

### Endpoint
N/A (Configuration Object)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **client** (OAuth.PKCEClient) - Required - The PKCE Client defined using `OAuth.PKCEClient` from `@raycast/api`
- **clientId** (string) - Required - The app's client ID
- **scope** (string | Array<string>) - Required - The scope of the access requested from the provider
- **authorizeUrl** (string) - Required - The URL to start the OAuth flow
- **tokenUrl** (string) - Required - The URL to exchange the authorization code for an access token
- **refreshTokenUrl** (string) - Optional - The URL to refresh the access token if applicable
- **personalAccessToken** (string) - Optional - A personal token if the provider supports it
- **onAuthorize** (string) - Optional - A callback function that is called once the user has been properly logged in through OAuth when used with `withAccessToken`
- **extraParameters** (Record<string, string>) - Optional - The extra parameters you may need for the authorization request
- **bodyEncoding** (json | url-encoded) - Optional - Specifies the format for sending the body of the request.
- **tokenResponseParser** (function) - Optional - Some providers returns some non-standard token responses. Specifies how to parse the JSON response to get the access token. Signature: `(response: unknown) => OAuth.TokenResponse`
- **tokenRefreshResponseParser** (function) - Optional - Some providers returns some non-standard refresh token responses. Specifies how to parse the JSON response to get the access token. Signature: `(response: unknown) => OAuth.TokenResponse`

### Request Example
```json
{
  "client": "...",
  "clientId": "your-client-id",
  "scope": "read write",
  "authorizeUrl": "https://example.com/auth",
  "tokenUrl": "https://example.com/token",
  "refreshTokenUrl": "https://example.com/refresh",
  "personalAccessToken": "your-pat",
  "onAuthorize": "handleLogin",
  "extraParameters": {
    "prompt": "consent"
  },
  "bodyEncoding": "json",
  "tokenResponseParser": "(response) => response.access_token",
  "tokenRefreshResponseParser": "(response) => response.refresh_token"
}
```

### Response
#### Success Response (200)
N/A (Configuration Object)

#### Response Example
N/A (Configuration Object)
```

--------------------------------

### Action.PickDate Component Introduction

Source: https://developers.raycast.com/misc/changelog

Introduces a new `Action.PickDate` component that enables users to directly set a date within the action panel. This provides a streamlined way for users to input date information into extensions.

```javascript
import { Action, ActionPanel } from '@raycast/api';

function DatePickerAction() {
  return (
    <ActionPanel>
      <Action.PickDate />
    </ActionPanel>
  );
}
```

--------------------------------

### External AI Configuration in JSON5

Source: https://developers.raycast.com/ai/learn-core-concepts-of-ai-extensions

This JSON5 file provides another option for external AI configuration. JSON5 supports comments and trailing commas, making it more flexible and developer-friendly for configuration files, especially when dealing with longer instructions.

```json5
{
  instructions: "When you don't know the user's first name, ask for it.",
}
```

--------------------------------

### Define a Simple Tool in TypeScript

Source: https://developers.raycast.com/ai/learn-core-concepts-of-ai-extensions

A basic tool function that returns a static string. This serves as the foundation for AI extension interactions, demonstrating a tool's ability to produce an output.

```typescript
export default function tool() {
  return "Hello, world!";
}
```

--------------------------------

### Configure Jira OAuth Service

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This code shows how to set up the OAuthService for Jira, which necessitates a custom client configuration. It uses the static `jira` property and requires `ProviderOptions` with `clientId` and the necessary `scope` values, as Jira scopes need manual enablement.

```tsx
const jira = OAuthService.jira({
  clientId: "custom-client-id",
  scope: "read:jira-user read:jira-work offline_access",
});
```

--------------------------------

### Argument Properties for Raycast Commands

Source: https://developers.raycast.com/information/manifest

Outlines the essential properties for defining arguments within Raycast commands. Key properties include a unique 'name', the 'type' of input expected (e.g., 'text', 'password', 'dropdown'), and a 'placeholder' for user guidance. The 'required' flag determines if the argument must be provided.

```json
{
  "name": "myArgument",
  "type": "text",
  "placeholder": "Enter text here",
  "required": true
}
```

```json
{
  "name": "myPassword",
  "type": "password",
  "placeholder": "Enter your password",
  "required": false
}
```

```json
{
  "name": "myDropdown",
  "type": "dropdown",
  "placeholder": "Select an option",
  "required": true,
  "data": [
    {"title": "Option A", "value": "A"},
    {"title": "Option B", "value": "B"}
  ]
}
```

--------------------------------

### Implement List Pagination Manually - TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/list

This snippet shows how to implement pagination for a Raycast `List` component from scratch without relying on `usePromise`. It manages state for loading, more items, data, and the next page, using `useEffect` and `useCallback` for efficient updates. Requires `@raycast/api` version 1.69.0 or higher.

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

```

--------------------------------

### Keyboard API Interfaces (JavaScript)

Source: https://developers.raycast.com/migration/v1.28.0

Explains the new `Keyboard` namespace for keyboard-related interfaces, such as shortcuts and key modifiers. Deprecated interface names are provided for context.

```javascript
import { Keyboard } from "@raycast/api";

// deprecated KeyboardShortcut
Keyboard.Shortcut;

// deprecated KeyModifier
Keyboard.KeyModifier;

// deprecated KeyEquivalent
Keyboard.KeyEquivalent;
```

--------------------------------

### Create Dropdown Sections in Raycast List

Source: https://developers.raycast.com/api-reference/user-interface/list

Demonstrates how to create visually separated groups of dropdown items within a Raycast List component using List.Dropdown.Section. This allows for better organization of selectable options in the UI.

```typescript
import { List } from "@raycast/api";

export default function Command() {
  return (
    <List
      searchBarAccessory={
        <List.Dropdown tooltip="Dropdown With Sections">
          <List.Dropdown.Section title="First Section">
            <List.Dropdown.Item title="One" value="one" />
          </List.Dropdown.Section>
          <List.Dropdown.Section title="Second Section">
            <List.Dropdown.Item title="Two" value="two" />
          </List.Dropdown.Section>
        </List.Dropdown>
      }
    >
      <List.Item title="Item in the Main List" />
    </List>
  );
}
```

--------------------------------

### App Redirect Configuration for Raycast OAuth

Source: https://developers.raycast.com/api-reference/oauth

Configures an app-scheme based redirect that directly opens the Raycast application. This is used when the OAuth provider supports app-scheme redirects.

```plaintext
raycast://oauth?package_name=Extension
```

--------------------------------

### TypeScript Namespaces for Preferences and Arguments

Source: https://developers.raycast.com/misc/changelog

Introduces global TypeScript namespaces `Preferences` and `Arguments` to provide type safety for command preferences and arguments. This ensures that the types used within a command remain synchronized with its manifest definition, improving developer experience and reducing potential errors.

```typescript
import { getPreferenceValues } from '@raycast/api';

interface ShowTodosPreferences {
  showCompleted: boolean;
}

export default function Command() {
  const preferences = getPreferenceValues<Preferences.ShowTodos>();
  // ... use preferences.showCompleted
}
```

--------------------------------

### Show file or folder in Finder with Action.ShowInFinder in TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/actions

Illustrates how to use Action.ShowInFinder to reveal a specified file or folder in the Finder application. The main window is closed after execution. It requires a 'path' prop.

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

### ItemWithAction.tsx

Source: https://developers.raycast.com/api-reference/menu-bar-commands

Illustrates creating an interactive menu bar item with 'title', 'icon', and an 'onAction' prop.

```APIDOC
## POST /websites/developers_raycast/ItemWithAction

### Description
This endpoint demonstrates creating an interactive menu bar item. When a user clicks this item, the specified `onAction` handler is executed. It can include `title`, `icon`, and `onAction` props.

### Method
POST

### Endpoint
/websites/developers_raycast/ItemWithAction

### Parameters
#### Request Body
- **title** (string) - Required - The main title displayed for this item.
- **icon** (string) - Optional - The icon to display for this item.
- **onAction** (string) - Required - The action to execute when the item is clicked. This should be a URL or a command identifier.

### Request Example
```json
{
  "title": "Raycast.com",
  "icon": "raycast.png",
  "onAction": "https://raycast.com"
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

### Clipboard Copy and Paste with File Paths

Source: https://developers.raycast.com/misc/changelog

The `Clipboard.copy()` and `Clipboard.paste()` methods now support file paths as parameters. This allows extensions to directly copy or paste file paths to and from the clipboard.

```javascript
await Clipboard.copy("/path/to/file.txt");
const pastedPath = await Clipboard.paste();
```

--------------------------------

### AI Pro API Integration (JavaScript)

Source: https://developers.raycast.com/misc/changelog

Shows how to integrate the new AI Pro API to ask prompts and enhance extensions with artificial intelligence. It also demonstrates how to check if a user can access specific APIs like the AI API.

```javascript
const aiResponse = await AI.ask(prompt);

const canAccessAI = environment.canAccess(AI);
```

--------------------------------

### Introduce Grid Component for Media-Heavy Layouts

Source: https://developers.raycast.com/misc/changelog

The `<Grid />` component is now available in the API, ideal for laying out media-heavy content like icons, images, or colors. It supports differently sized items and offers an API similar to `<List />` for easy adoption.

```javascript
import { Grid } from '@raycast/api';

function MediaGrid() {
  return (
    <Grid>
      <Grid.Item
        title="Image 1"
        content={{ src: 'https://example.com/image1.png' }}
      />
      <Grid.Item
        title="Icon A"
        content={{ source: Icon.AppWindow }}
      />
    </Grid>
  );
}
```

--------------------------------

### Form Item Imperative Methods

Source: https://developers.raycast.com/api-reference/user-interface/form

This section covers the imperative methods available for interacting with form items, such as focusing or resetting their state.

```APIDOC
## Form Item Imperative Methods

### Description
Provides methods to programmatically control the state and behavior of form items.

### Methods
#### focus
- **Signature**: `() => void`
- **Description**: Makes the item request focus.

#### reset
- **Signature**: `() => void`
- **Description**: Resets the form item to its initial value, or `defaultValue` if specified.

### Response
#### Success Response (200)
- **status** (string) - Indicates the success status of the operation.

#### Response Example
```json
{
  "status": "success"
}
```
```

--------------------------------

### List.Dropdown Component

Source: https://developers.raycast.com/api-reference/user-interface/list

Documentation for the List.Dropdown component, which is used as an accessory in the search bar.

```APIDOC
## List.Dropdown Component

### Description

A dropdown menu that will be shown in the right-hand-side of the search bar.

### Method

N/A (Component)

### Endpoint

N/A (Component)

### Parameters

#### Path Parameters

N/A

#### Query Parameters

N/A

#### Request Body

N/A

### Request Example

```json
{
  "props": "[Properties for List.Dropdown]"
}
```

### Response

#### Success Response (200)

N/A (Component)

#### Response Example

N/A
```

--------------------------------

### Show Basic and Failure Toasts in TypeScript

Source: https://developers.raycast.com/api-reference/feedback/toast

Demonstrates how to use `showToast` to display a success message or a failure notification. It takes an options object with `title` and `message`, and optionally a `style` for failure cases. This is useful for providing immediate feedback on operations.

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

### Publish Raycast Extension using npm

Source: https://developers.raycast.com/basics/publish-an-extension

This command publishes your Raycast extension by automatically creating a pull request to the official Raycast extensions repository. It handles squashing commits and requires GitHub authentication.

```bash
npm run publish
```

--------------------------------

### OAuthService.authorize

Source: https://developers.raycast.com/utilities/oauth/oauthservice

Initiates the OAuth authorization process or refreshes existing tokens and returns the access token.

```APIDOC
## OAuthService.authorize

### Description
Initiates the OAuth authorization process or refreshes existing tokens if necessary. Returns a promise that resolves with the access token from the authorization flow.

### Method
`authorize(): Promise<string>`

### Endpoint
N/A (Method call on an instance)

### Response
#### Success Response (200)
- **accessToken** (string) - The obtained access token.

#### Response Example
```typescript
const accessToken = await oauthService.authorize();
```
```

--------------------------------

### Execute AppleScript without Arguments

Source: https://developers.raycast.com/utilities/functions/runapplescript

Executes a static AppleScript script. The script is provided as a string. Options can be used to customize the output format, specify the script language, set a timeout for execution, and define a custom function to parse the script's output. This function is restricted to macOS environments.

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

--------------------------------

### Show Loading Indicator in List Component (TypeScript)

Source: https://developers.raycast.com/information/best-practices

Illustrates how to use the `isLoading` prop on the `<List>` component to provide visual feedback to the user while data is being fetched. This improves perceived performance.

```typescript
import { List } from "@raycast/api";
import { useEffect, useState } from "react";

export default function Command() {
  const [items, setItems] = useState<string[]>();

  useEffect(() => {
    setTimeout(() => {
      setItems(["Item 1", "Item 2", "Item 3"]);
    }, 1000);
  }, []);

  return (
    <List isLoading={items === undefined}>
      {items?.map((item, index) => (
        <List.Item key={index} title={item} />
      ))}
    </List>
  );
}
```

--------------------------------

### OAuth.RedirectMethod

Source: https://developers.raycast.com/api-reference/oauth

Defines the supported redirect methods for the OAuth flow.

```APIDOC
## OAuth.RedirectMethod

### Description
Defines the supported redirect methods for the OAuth flow. You can choose between web and app-scheme redirect methods, depending on what the provider requires when setting up the OAuth app. For examples on what redirect URI you need to configure, see the docs for each method.

### Method
N/A (Enum Definition)

### Endpoint
N/A (Enum Definition)

### Parameters
#### Enum Values
- **web**: Uses a web-based redirect URI.
- **app-scheme**: Uses an app-scheme redirect URI.
```

--------------------------------

### Clipboard Read Method

Source: https://developers.raycast.com/misc/changelog

Adds a new `Clipboard.read()` method that allows extensions to read the content of the system clipboard. This method can retrieve the clipboard data as plain text, a file path, or HTML, providing greater flexibility for interacting with user-copied content.

```javascript
import { Clipboard } from '@raycast/api';

async function readClipboard() {
  const text = await Clipboard.readText();
  console.log('Clipboard text:', text);
}
```

--------------------------------

### Tool.Confirmation API

Source: https://developers.raycast.com/api-reference/tool

Defines how to create a confirmation for a tool, allowing the AI to ask the user to validate side-effects before execution.

```APIDOC
## POST /tool/confirmation

### Description
Used to ask the user to validate the side-effects of a tool before it is executed. The confirmation receives the same input as the tool and returns an optional object describing the action.

### Method
POST

### Endpoint
`/tool/confirmation`

### Parameters
#### Request Body
- **input** (object) - Required - The input provided to the tool.
- **style** (Action.Style) - Optional - Defines the visual style of the confirmation (e.g., Regular, Destructive).
- **info** (array of objects) - Optional - Name/value pairs representing the side-effects of the tool.
  - **name** (string) - Required - The name of the information.
  - **value** (string) - Optional - The value of the information.
- **message** (string) - Optional - A string that represents the side-effects of the tool, often a question to the user.
- **image** (Image.URL | FileIcon) - Optional - An image that visually represents the side-effects of the tool.

### Request Example
```json
{
  "input": {
    "name": "John Doe"
  }
}
```

### Response
#### Success Response (200)
- **style** (Action.Style) - Optional - The visual style of the confirmation.
- **info** (array of objects) - Optional - Details about the tool's side-effects.
- **message** (string) - Optional - A message confirming the action.
- **image** (Image.URL | FileIcon) - Optional - An image representing the action.

#### Response Example
```json
{
  "message": "Are you sure you want to greet John Doe?",
  "style": "regular"
}
```

### Error Handling
- **400 Bad Request**: If the input is invalid.
- **500 Internal Server Error**: If there is a server-side issue.
```

--------------------------------

### Manage Local Storage with useLocalStorage Hook

Source: https://developers.raycast.com/utilities/getting-started

The useLocalStorage hook, introduced in v1.15.0, provides a convenient way to interact with the browser's local storage API within Raycast extensions, allowing for persistent data storage.

```javascript
// Example usage of useLocalStorage hook (specific implementation not provided in text)
// const [value, setValue] = useLocalStorage('myKey', 'defaultValue');

```

--------------------------------

### OAuth.PKCEClient#authorizationRequest

Source: https://developers.raycast.com/api-reference/oauth

Generates an authorization request object, including a code verifier and challenge, for the PKCE flow.

```APIDOC
### OAuth.PKCEClient#authorizationRequest

Creates an authorization request object needed before initiating the authorization flow.

#### Signature

```typescript
authorizationRequest(options: AuthorizationRequestOptions): Promise<AuthorizationRequest>;
```

#### Parameters

- **`options`** (`AuthorizationRequestOptions`) - Required - Configuration for the authorization request.
  - **`endpoint`** (`string`) - Required - The authorization endpoint URL of the OAuth provider.
  - **`clientId`** (`string`) - Required - Your application's client ID.
  - **`scope`** (`string`) - Required - The requested OAuth scopes, space-separated.

#### Return Value

A `Promise` that resolves to an `AuthorizationRequest` object. This object contains the necessary parameters (like `codeChallenge` and `codeChallengeMethod`) to be used with the `authorize` method.

#### Example

```typescript
const authRequest = await client.authorizationRequest({
  endpoint: "https://twitter.com/i/oauth2/authorize",
  clientId: "YourClientId",
  scope: "tweet.read users.read follows.read",
});
```
```

--------------------------------

### Handling Form Events (Focus/Blur) in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/form

Illustrates how to capture and log form events, specifically 'onBlur' and 'onFocus', for various form elements like TextField, TextArea, Dropdown, and TagPicker. It utilizes the Form.Event type and requires the '@raycast/api' package.

```typescript
import { Form } from "@raycast/api";

export default function Main() {
  return (
    <Form>
      <Form.TextField id="textField" title="Text Field" onBlur={logEvent} onFocus={logEvent} />
      <Form.TextArea id="textArea" title="Text Area" onBlur={logEvent} onFocus={logEvent} />
      <Form.Dropdown id="dropdown" title="Dropdown" onBlur={logEvent} onFocus={logEvent}>
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <Form.Dropdown.Item value={String(num)} title={String(num)} key={num} />
        ))}
      </Form.Dropdown>
      <Form.TagPicker id="tagPicker" title="Tag Picker" onBlur={logEvent} onFocus={logEvent}>
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <Form.TagPicker.Item value={String(num)} title={String(num)} key={num} />
        ))}
      </Form.TagPicker>
    </Form>
  );
}

function logEvent(event: Form.Event<string[] | string>) {
  console.log(`Event '${event.type}' has happened for '${event.target.id}'. Current 'value': '${event.target.value}'`);
}
```

--------------------------------

### Open File/Folder with Action.Open in TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/actions

Demonstrates how to use the Action.Open component to open a specified file or folder using the default application. This action closes the main window after execution. It requires a target and a title, with optional parameters for application, icon, onOpen callback, and shortcut.

```typescript
import { ActionPanel, Detail, Action } from "@raycast/api";

export default function Command() {
  return (
    <Detail
      markdown="Check out your extension code."
      actions={
        <ActionPanel>
          <Action.Open title="Open Folder" target={__dirname} />
        </ActionPanel>
      }
    />
  );
}
```

--------------------------------

### Basic Grid Component in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/grid

Demonstrates the basic usage of the Grid component in Raycast, rendering a simple grid with a specified number of columns and inset.

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

### OAuth Authorization Request Options

Source: https://developers.raycast.com/api-reference/oauth

Defines the options required for initiating an OAuth authorization request. This includes essential details like client ID, authorization endpoint, and requested scopes.

```APIDOC
## POST /oauth/authorize

### Description
Initiates an OAuth 2.0 authorization request.

### Method
POST

### Endpoint
/oauth/authorize

### Parameters
#### Request Body
- **clientId** (string) - Required - The client ID of the configured OAuth app.
- **endpoint** (string) - Required - The URL to the authorization endpoint for the OAuth provider.
- **scope** (string) - Required - A space-delimited list of scopes for identifying the resources to access on the user's behalf.
- **extraParameters** (object) - Optional - Additional parameters for the authorization request.

### Request Example
```json
{
  "clientId": "your_client_id",
  "endpoint": "https://oauth.example.com/authorize",
  "scope": "read write",
  "extraParameters": {
    "prompt": "consent"
  }
}
```

### Response
#### Success Response (200)
- **codeChallenge** (string) - The PKCE `code_challenge` value.
- **codeVerifier** (string) - The PKCE `code_verifier` value.
- **redirectURI** (string) - The OAuth `redirect_uri` value.
- **state** (string) - The OAuth `state` value.
- **toURL** (function) - A function that constructs the full authorization URL.

#### Response Example
```json
{
  "codeChallenge": "E9Melm2_.",
  "codeVerifier": "krcM",
  "redirectURI": "https://app.example.com/callback",
  "state": "aBcDeFgHiJkLmNoP",
  "toURL": "() => string"
}
```
```

--------------------------------

### Previous Default ESLint Configuration

Source: https://developers.raycast.com/migration/v1.48.8

Displays the previous default ESLint configuration file content. This configuration is used by extensions prior to Raycast v1.48.8.

```json
{
  "root": true,
  "env": {
    "es2020": true,
    "node": true
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"]
}
```

--------------------------------

### Adding Link Accessories to Raycast Forms

Source: https://developers.raycast.com/api-reference/user-interface/form

Shows how to integrate Form.LinkAccessory to add clickable links within the navigation bar of a Raycast form. This component requires 'target' and 'text' props and is part of the '@raycast/api' package.

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

### OAuth TokenSetOptions

Source: https://developers.raycast.com/api-reference/oauth

Options for storing an OAuth token set. This includes the access token, expiration time, ID token, refresh token, and scope.

```APIDOC
## OAuth.TokenSetOptions

### Description
Options for a [TokenSet](#oauth.tokenset) to store via [setTokens](#oauth.pkceclient-settokens).

### Parameters
#### Request Body
- **accessToken** (string) - Required - The access token returned by an OAuth token request.
- **expiresIn** (number) - Optional - An optional expires value (in seconds) returned by an OAuth token request.
- **idToken** (string) - Optional - An optional id token returned by an identity request (e.g. /me, Open ID Connect).
- **refreshToken** (string) - Optional - An optional refresh token returned by an OAuth token request.
- **scope** (string) - Optional - The optional scope value returned by an OAuth token request.

### Request Example
```json
{
  "accessToken": "string",
  "expiresIn": 3600,
  "idToken": "string",
  "refreshToken": "string",
  "scope": "string"
}
```

### Response
#### Success Response (200)
- **accessToken** (string) - The access token returned by an OAuth token request.
- **expiresIn** (number) - An optional expires value (in seconds) returned by an OAuth token request.
- **idToken** (string) - An optional id token returned by an identity request (e.g. /me, Open ID Connect).
- **refreshToken** (string) - An optional refresh token returned by an OAuth token request.
- **scope** (string) - The optional scope value returned by an OAuth token request.

#### Response Example
```json
{
  "accessToken": "string",
  "expiresIn": 3600,
  "idToken": "string",
  "refreshToken": "string",
  "scope": "string"
}
```
```

--------------------------------

### Detail.Metadata.Link

Source: https://developers.raycast.com/api-reference/user-interface/detail

Displays a link item with a title, text, and a target URL.

```APIDOC
## Detail.Metadata.Link

### Description
Displays a link item with a title, text, and a target URL.

### Props

#### Path Parameters
- **target** (string) - Required - The target URL of the link.
- **text** (string) - Required - The text value of the link.
- **title** (string) - Required - The title shown above the link.

### Request Example
```typescript
import { Detail } from "@raycast/api";

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
          <Detail.Metadata.Link title="Evolution" target="https://www.pokemon.com/us/pokedex/pikachu" text="Raichu" />
        </Detail.Metadata>
      }
    />
  );
}
```
```

--------------------------------

### Access Raycast Environment Information (TypeScript)

Source: https://developers.raycast.com/api-reference/environment

This snippet demonstrates how to access various environment variables provided by the Raycast API, such as Raycast version, extension details, command information, and file paths. It logs these details to the console.

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

### Create Deeplinks with createDeeplink

Source: https://developers.raycast.com/utilities/getting-started

The createDeeplink function, added in v1.17.0, simplifies the process of generating deeplinks for Raycast extensions, allowing users to navigate to specific parts of an extension.

```javascript
// Example usage of createDeeplink function (specific implementation not provided in text)
// const deeplink = createDeeplink({ name: 'my-extension', method: 'open-item', arguments: { id: '123' } });

```

--------------------------------

### Implement List Pagination with usePromise Hook - TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/list

This snippet demonstrates how to add pagination to a Raycast `List` using the `usePromise` hook from `@raycast/utils`. It handles asynchronous data loading and updates the list as the user scrolls. Requires `@raycast/api` version 1.69.0 or higher.

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

### Raycast MenuBarExtra.Item with alternate

Source: https://developers.raycast.com/api-reference/menu-bar-commands

Demonstrates using the `alternate` prop to provide a secondary menu item that appears when the user presses the Option (⌥) key. It includes limitations for alternate items.

```typescript
import { Icon, MenuBarExtra, open } from "@raycast/api";

export default function Command() {
  return (
    <MenuBarExtra icon={Icon.Bookmark}>
      <MenuBarExtra.Item
        icon="raycast.png"
        title="Open Raycast Homepage"
        shortcut={{ key: "r", modifiers: ["cmd"] }}
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

### Read Clipboard Content using Raycast API

Source: https://developers.raycast.com/api-reference/clipboard

Illustrates how to read clipboard content using `Clipboard.read`. This function can retrieve content as plain text, a file name, or HTML. It also supports accessing clipboard history via an optional `offset` parameter. Requires the `@raycast/api` package.

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

### Show File in Finder Raycast API

Source: https://developers.raycast.com/api-reference/utilities

Reveals a specified file or directory in the macOS Finder. This utility is helpful for user-initiated file exploration or verification.

```typescript
import { showInFinder } from "@raycast/api";
import { homedir } from "os";
import { join } from "path";

export default async function Command() {
  await showInFinder(join(homedir(), "Downloads"));
}
```

--------------------------------

### Pull Contributions for Raycast Extension

Source: https://developers.raycast.com/basics/publish-an-extension

Run this command in your Git repository to merge contributions from others or edits made directly on GitHub. It will help resolve any conflicts before you can successfully publish your extension.

```bash
npx @raycast/api@latest pull-contributions
```

--------------------------------

### Displaying a Loading Indicator in Raycast UI (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface

Demonstrates how to show a loading indicator in a Raycast extension using the List component. This is achieved by managing the `isLoading` state with `useState` and `useEffect` to simulate a delay before rendering actual content. It's useful for commands that fetch data asynchronously.

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

### JSON Expectation with Dot Notation for Nested Arguments

Source: https://developers.raycast.com/ai/learn-core-concepts-of-ai-extensions

This snippet illustrates using dot notation to access and match nested arguments within a tool call expectation. It checks if the AI calls the 'greet' tool and if a nested user name property, 'user.name', is set to 'thomas'.

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

### Execute SQL with executeSQL Function

Source: https://developers.raycast.com/utilities/getting-started

The executeSQL function, introduced in v1.18.0, allows for direct execution of SQL queries. It was made to work on Windows in v2.2.0.

```javascript
// Example usage of executeSQL function (specific implementation not provided in text)
// const result = await executeSQL('SELECT COUNT(*) FROM logs');

```

--------------------------------

### Define a Tool with Confirmation in TypeScript

Source: https://developers.raycast.com/ai/learn-core-concepts-of-ai-extensions

Implements a confirmation step before executing a tool, ensuring user consent for actions. The `confirmation` function allows defining a message and is called prior to the main tool logic.

```typescript
import { Tool } from "@raycast/api";

type Input = {
  /**
   * The first name of the user to greet
   */
  name: string;
};

export const confirmation: Tool.Confirmation<Input> = async (input) => {
  return {
    message: `Are you sure you want to greet ${input.name}?`,
  };
};

/**
 * Greet the user with a friendly message
 */
export default function tool(input: Input) {
  return `Hello, ${input.name}!`;
}
```

--------------------------------

### Action.ShowInFinder

Source: https://developers.raycast.com/api-reference/user-interface/actions

Action that shows a file or folder in the Finder. The main window is closed after the file or folder is revealed.

```APIDOC
## Action.ShowInFinder

### Description
Action that shows a file or folder in the Finder. The main window is closed after the file or folder is revealed in the Finder.

### Method
N/A (Component)

### Endpoint
N/A (Component)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
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

### Response
#### Success Response (200)
N/A (Component)

#### Response Example
N/A (Component)

### Props
#### `path` (string) - Required
The path to the file or folder to show in Finder.

#### `icon` (Image.ImageLike) - Optional
The icon displayed for the Action.

#### `onPaste` ((content: string | number | Clipboard.Content) => void) - Optional
Callback when the content was pasted into the front-most application.

#### `shortcut` (Keyboard.Shortcut) - Optional
The keyboard shortcut for the Action.

#### `title` (string) - Optional
An optional title for the Action.
```

--------------------------------

### Define a Tool with JSDoc Descriptions in TypeScript

Source: https://developers.raycast.com/ai/learn-core-concepts-of-ai-extensions

Shows how to enhance a tool's usability by adding JSDoc comments to both the tool function and its input parameters. This improves AI's understanding and correct usage of the tool.

```typescript
type Input = {
  /**
   * The first name of the user to greet
   */
  name: string;
};

/**
 * Greet the user with a friendly message
 */
export default function tool(input: Input) {
  return `Hello, ${input.name}!`;
}
```

--------------------------------

### Launch Other Commands with launchCommand Method

Source: https://developers.raycast.com/misc/changelog

Enables commands to launch other commands within the same extension using the `launchCommand` method. This allows for inter-command communication, such as triggering background refreshes or opening companion views.

```javascript
await launchCommand({ name: "other_command_name" });
```

--------------------------------

### Raycast MenuBarExtra.Item with action

Source: https://developers.raycast.com/api-reference/menu-bar-commands

Illustrates creating an interactive menu bar item that executes an action when clicked. This item includes `title`, `icon`, and `onAction` props.

```typescript
import { Icon, MenuBarExtra, open } from "@raycast/api";

export default function Command() {
  return (
    <MenuBarExtra icon={Icon.Bookmark}>
      <MenuBarExtra.Item icon="raycast.png" title="Raycast.com" onAction={() => open("https://raycast.com")} />
    </MenuBarExtra>
  );
}
```

--------------------------------

### Action.OpenWith

Source: https://developers.raycast.com/api-reference/user-interface/actions

An action that opens a file or URL with a specific application.

```APIDOC
## POST /websites/developers_raycast/actions/open-with

### Description
Opens a file or URL using a selected application. This action presents a sub-menu of applications capable of opening the specified item.

### Method
POST

### Endpoint
/websites/developers_raycast/actions/open-with

### Parameters
#### Query Parameters
- **path** (string) - Required - The path to the file or URL to open.
- **icon** (Image.ImageLike) - Optional - The icon displayed for the Action.
- **shortcut** (Keyboard.Shortcut) - Optional - The keyboard shortcut for the Action.
- **title** (string) - Optional - The title for the Action.

#### Request Body
None

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

### useSQL Hook Signature and Options

Source: https://developers.raycast.com/utilities/react-hooks/usesql

Defines the TypeScript signature for the useSQL hook, outlining its parameters, options, and return type. It includes details on database path, query, and various execution/callback options.

```typescript
function useSQL<T>(
  databasePath: string,
  query: string,
  options?: {
    permissionPriming?: string;
    execute?: boolean;
    onError?: (error: Error) => void;
    onData?: (data: T) => void;
    onWillExecute?: (args: string[]) => void;
    failureToastOptions?: Partial<Pick<Toast.Options, "title" | "primaryAction" | "message">>;
  }
): AsyncState<T> & { 
  revalidate: () => void;
  mutate: MutatePromise<T | U | undefined>;
  permissionView: React.ReactNode | undefined;
};
```

--------------------------------

### Clipboard.read

Source: https://developers.raycast.com/api-reference/clipboard

Reads the content of the clipboard, returning text, file path, or HTML. Supports accessing clipboard history via an offset.

```APIDOC
## GET /clipboard/read

### Description
Reads the clipboard content as plain text, file name, or HTML.

### Method
GET

### Endpoint
/clipboard/read

### Parameters
#### Query Parameters
- **offset** (number) - Optional - Specify an offset to access the Clipboard History. Minimum value is 0, maximum value is 5.

### Response
#### Success Response (200)
- **text** (string) - The plain text content of the clipboard.
- **file** (string) - The file path if the clipboard contains a file.
- **html** (string) - The HTML content of the clipboard.

#### Response Example
```json
{
  "text": "Hello, Raycast!",
  "file": "/path/to/document.pdf",
  "html": "<h1>Hello, Raycast!</h1>"
}
```
```

--------------------------------

### Raycast List with usePromise Hook (TypeScript)

Source: https://developers.raycast.com/utilities/react-hooks/usepromise

This snippet demonstrates a Raycast command component that utilizes the `usePromise` hook to fetch and display a paginated list of items. It handles loading states and search input to dynamically update the displayed data. Dependencies include React, Node.js timers, and Raycast UI components.

```tsx
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

### Support Markdown Tasks in Detail View

Source: https://developers.raycast.com/misc/changelog

The Detail view now supports markdown task syntax, allowing for the rendering of `- [ ] task` and `- [x] task`. This enables better organization and tracking of tasks within detailed views.

```javascript
import { Detail } from '@raycast/api';

function TaskDetailView() {
  return (
    <Detail
      markdown="# My Tasks\n\n- [ ] Buy groceries\n- [x] Walk the dog"
    />
  );
}
```

--------------------------------

### OAuth PKCE Client Authorization

Source: https://developers.raycast.com/api-reference/oauth

Provides options for customizing the authorization process using the PKCE client. This includes specifying the full authorization URL.

```APIDOC
## POST /oauth/authorize/custom

### Description
Customizes the authorization process using the PKCE client, allowing for a pre-constructed authorization URL.

### Method
POST

### Endpoint
/oauth/authorize/custom

### Parameters
#### Request Body
- **url** (string) - Required - The full authorization URL, potentially constructed using values from an AuthorizationRequest.

### Request Example
```json
{
  "url": "https://oauth.example.com/authorize?client_id=your_client_id&redirect_uri=https://app.example.com/callback&scope=read&response_type=code&code_challenge=E9Melm2_.&code_challenge_method=S256&state=aBcDeFgHiJkLmNoP"
}
```

### Response
#### Success Response (200)
- **message** (string) - Confirmation that the custom authorization URL has been processed.

#### Response Example
```json
{
  "message": "Custom authorization URL processed successfully."
}
```
```

--------------------------------

### Render Date Objects in List Accessories

Source: https://developers.raycast.com/misc/changelog

List accessories now support rendering date objects. Pass a `Date` object as an accessory to display it in a nicely formatted way within the list item.

```javascript
import { List } from '@raycast/api';

function ListWithDateAccessory() {
  return (
    <List>
      <List.Item
        title="Event"
        accessories={[{ date: new Date() }]} 
      />
    </List>
  );
}
```

--------------------------------

### Detail.Metadata.TagList

Source: https://developers.raycast.com/api-reference/user-interface/detail

Displays a list of tags in a row, with a title for the list.

```APIDOC
## Detail.Metadata.TagList

### Description
Displays a list of tags in a row, with a title for the list.

### Props

#### Path Parameters
- **children** (React.ReactNode) - Required - The tags contained in the TagList.
- **title** (string) - Required - The title shown above the TagList.

### Detail.Metadata.TagList.Item

#### Props

- **text** (string) - Required - The text of the tag.
- **color** (string) - Optional - The color of the tag.

### Request Example
```typescript
import { Detail } from "@raycast/api";

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
          <Detail.Metadata.TagList title="Type">
            <Detail.Metadata.TagList.Item text="Electric" color={"#eed535"} />
          </Detail.Metadata.TagList>
        </Detail.Metadata>
      }
    />
  );
}
```
```

--------------------------------

### Copy Content to Clipboard using Action.CopyToClipboard

Source: https://developers.raycast.com/api-reference/user-interface/actions

Shows how to implement the Action.CopyToClipboard component within a Raycast Detail view. This action allows users to copy specified content to their clipboard, optionally with a keyboard shortcut. It depends on the '@raycast/api' package.

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

### Configure Menu Bar Command in package.json

Source: https://developers.raycast.com/api-reference/menu-bar-commands

Defines a new command in the `package.json` file with the mode set to 'menu-bar'. This configuration includes essential properties like name, title, subtitle, and description for the menu bar item.

```json
{
  "name": "github-pull-requests",
  "title": "Pull Requests",
  "subtitle": "GitHub",
  "description": "See your GitHub pull requests at a glance",
  "mode": "menu-bar"
}
```

--------------------------------

### List.Item.Accessory

Source: https://developers.raycast.com/api-reference/user-interface/list

An interface defining the structure for accessory views that can be displayed within a List.Item.

```APIDOC
## Types

### List.Item.Accessory

An interface describing an accessory view in a `List.Item`.

### Method
Not applicable (Type Definition)

### Endpoint
Not applicable (Type Definition)

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- None

### Request Example
```json
{
  "example": "Not applicable for type definitions"
}
```

### Response
#### Success Response (200)
- None

#### Response Example
```json
{
  "example": "Not applicable for type definitions"
}
```
```

--------------------------------

### Form.Description Component

Source: https://developers.raycast.com/api-reference/user-interface/form

Documentation for the Form.Description component, used for displaying simple text labels within forms.

```APIDOC
## Form.Description Component

### Description
A form item with a simple text label. Do *not* use this component to show validation messages for other form fields.

### Parameters
#### Request Body
- **text** (string) - Required - The text content to display as the description.

### Response
#### Success Response (200)
- **message** (string) - A confirmation message indicating the component was rendered.

#### Response Example
```json
{
  "message": "Form.Description rendered successfully."
}
```
```

--------------------------------

### useForm Hook API

Source: https://developers.raycast.com/utilities/react-hooks/useform

This section details the useForm hook, its parameters, and its return values for managing form state and behavior.

```APIDOC
## useForm Hook

### Description
A hook that provides a high-level interface to work with Forms, and more particularly, with Form validations. It incorporates all the good practices to provide a great User Experience for your Forms.

### Signature
```ts
function useForm<T extends Form.Values>(props: {
  onSubmit: (values: T) => void | boolean | Promise<void | boolean>;
  initialValues?: Partial<T>;
  validation?: {
    [id in keyof T]?: ((value: T[id]) => string | undefined | null) | FormValidation;
  };
}): {
  handleSubmit: (values: T) => void | boolean | Promise<void | boolean>;
  itemProps: {
    [id in keyof T]: Partial<Form.ItemProps<T[id]>> & {
      id: string;
    };
  };
  setValidationError: (id: keyof T, error: ValidationError) => void;
  setValue: <K extends keyof T>(id: K, value: T[K]) => void;
  values: T;
  focus: (id: keyof T) => void;
  reset: (initialValues?: Partial<T>) => void;
};
```

### Arguments
* `onSubmit`: A callback that will be called when the form is submitted and all validations pass.
  * `initialValues`: The initial values to set when the Form is first rendered.
  * `validation`: The validation rules for the Form. A validation for a Form item is a function that takes the current value of the item as an argument and must return a string when the validation is failing. Shorthands for common cases are available via `FormValidation`.

### Return
Returns an object containing methods and props for form management:
* `handleSubmit`: A function to pass to the `<Action.SubmitForm>` `onSubmit` prop. It wraps the initial `onSubmit` with validation logic.
* `itemProps`: Props to be passed to `<Form.Item>` elements for validation handling.
* `setValidationError`: Programmatically set validation error for a specific field.
* `setValue`: Programmatically set the value of a specific field.
* `values`: The current values of the Form.
* `focus`: Programmatically focus a specific field.
* `reset`: Reset the form values. Optionally, specify initial values for reset.

### Example
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
```

--------------------------------

### Raycast List Item with Markdown and Metadata (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/list

This snippet shows how to create a Raycast list item that displays both markdown content and structured metadata. It utilizes the List.Item.Detail component to render rich information, including images, text, and categorized labels with icons. This is useful for presenting detailed information about list entries.

```typescript
import { List } from "@raycast/api";

export default function Metadata() {
  const markdown = `
![Illustration](https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png)
There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.
`;
  return (
    <List isShowingDetail>
      <List.Item
        title="Bulbasaur"
        detail={
          <List.Item.Detail
            markdown={markdown}
            metadata={
              <List.Item.Detail.Metadata>
                <List.Item.Detail.Metadata.Label title="Types" />
                <List.Item.Detail.Metadata.Label title="Grass" icon="pokemon_types/grass.svg" />
                <List.Item.Detail.Metadata.Separator />
                <List.Item.Detail.Metadata.Label title="Poison" icon="pokemon_types/poison.svg" />
                <List.Item.Detail.Metadata.Separator />
                <List.Item.Detail.Metadata.Label title="Chracteristics" />
                <List.Item.Detail.Metadata.Label title="Height" text="70cm" />
                <List.Item.Detail.Metadata.Separator />
                <List.Item.Detail.Metadata.Label title="Weight" text="6.9 kg" />
                <List.Item.Detail.Metadata.Separator />
                <List.Item.Detail.Metadata.Label title="Abilities" />
                <List.Item.Detail.Metadata.Label title="Chlorophyll" text="Main Series" />
                <List.Item.Detail.Metadata.Separator />
                <List.Item.Detail.Metadata.Label title="Overgrow" text="Main Series" />
                <List.Item.Detail.Metadata.Separator />
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

### useFrecencySorting Hook Signature and Options

Source: https://developers.raycast.com/utilities/react-hooks/usefrecencysorting

Defines the TypeScript signature for the useFrecencySorting hook, including its generic type, optional data input, and configuration options for namespace, item key extraction, and sorting of unvisited items. It also details the returned sorted data and methods for updating item frecency.

```typescript
function useFrecencySorting<T>(
  data?: T[],
  options?: {
    namespace?: string;
    key?: (item: T) => string;
    sortUnvisited?: (a: T, b: T) => number;
  },
): {
  data: T[];
  visitItem: (item: T) => Promise<void>;
  resetRanking: (item: T) => Promise<void>;
};
```

--------------------------------

### Use Action Panel and Actions in Raycast List

Source: https://developers.raycast.com/api-reference/user-interface/actions

Demonstrates how to use the ActionPanel and various Action components within a Raycast List item. This includes opening a browser, copying text to the clipboard, and performing a custom action. It requires the '@raycast/api' package.

```typescript
import { ActionPanel, Action, List } from "@raycast/api";

export default function Command() {
  return (
    <List navigationTitle="Open Pull Requests">
      <List.Item
        title="Docs: Update API Reference"
        subtitle="#1"
        actions={
          <ActionPanel title="#1 in raycast/extensions">
            <Action.OpenInBrowser url="https://github.com/raycast/extensions/pull/1" />
            <Action.CopyToClipboard title="Copy Pull Request Number" content="#1" />
            <Action title="Close Pull Request" onAction={() => console.log("Close PR #1")} />
          </ActionPanel>
        }
      />
    </List>
  );
}
```

--------------------------------

### Form.Description

Source: https://developers.raycast.com/api-reference/user-interface/form

Displays descriptive text within a form, often used for instructions or explanations.

```APIDOC
## Form.Description

### Description

Displays descriptive text within a form, often used for instructions or explanations.

### Method

N/A (Component)

### Endpoint

N/A (Component)

### Parameters

#### Props

- **text** (string) - Required - The text to be displayed.
- **title** (string) - Optional - The title displayed on the left side of the description item.

### Request Example

```typescript
<Form.Description
  title="Import / Export"
  text="Exporting will back-up your preferences, quicklinks, snippets, floating notes, script-command folder paths, aliases, hotkeys, favorites and other data."
/>
```

### Response

N/A (Component)
```

--------------------------------

### Clear Clipboard Contents using Raycast API

Source: https://developers.raycast.com/api-reference/clipboard

Demonstrates the usage of `Clipboard.clear` to remove all content from the system clipboard. This function is asynchronous and returns a promise that resolves once the clipboard is cleared. Requires the `@raycast/api` package.

```typescript
import { Clipboard } from "@raycast/api";

export default async function Command() {
  await Clipboard.clear();
}
```

--------------------------------

### Show HUD with Navigation Options (TypeScript)

Source: https://developers.raycast.com/api-reference/feedback/hud

Illustrates using `showHUD` with options to control the behavior after closing the main window, such as clearing the search bar and immediately returning to the root search. Requires importing `PopToRootType`.

```typescript
import { PopToRootType, showHUD } from "@raycast/api";

export default async function Command() {
  await showHUD("Hey there 👋", { clearRootSearch: true, popToRootType: PopToRootType.Immediate });
}
```

--------------------------------

### Clipboard.copy

Source: https://developers.raycast.com/api-reference/clipboard

Copies specified content (text, number, or file) to the clipboard. Supports optional configuration for concealed copying.

```APIDOC
## POST /clipboard/copy

### Description
Copies text or a file to the clipboard.

### Method
POST

### Endpoint
/clipboard/copy

### Parameters
#### Request Body
- **content** (string | number | object) - Required - The content to copy to the clipboard. Can be a string, number, or a Clipboard.Content object.
- **options** (object) - Optional - Options for the copy operation, such as `concealed: true`.

### Request Example
```json
{
  "content": "https://raycast.com",
  "options": {
    "concealed": true
  }
}
```

### Response
#### Success Response (200)
- **message** (string) - Indicates successful copy operation.

#### Response Example
```json
{
  "message": "Content copied successfully."
}
```
```

--------------------------------

### Platform-Specific Default Preferences in JSON

Source: https://developers.raycast.com/misc/changelog

Allows specifying default preferences for Raycast extensions on a per-platform basis. This is useful for settings like file paths that may differ between operating systems. The 'default' key accepts an object with platform keys (e.g., 'macOS', 'Windows') and their respective default values.

```json
"default": {
  "macOS": "foo",
  "Windows": "bar"
}
```

--------------------------------

### Handle Errors with Toasts in TypeScript

Source: https://developers.raycast.com/information/best-practices

Demonstrates how to catch errors during asynchronous operations and display a failure toast message to the user. This prevents disruption and informs the user about issues.

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

--------------------------------

### useAI Hook Signature and Options

Source: https://developers.raycast.com/utilities/react-hooks/useai

Defines the TypeScript signature for the useAI hook, outlining its parameters, options for AI model interaction, and return type. It specifies how to configure AI prompts, creativity levels, model choices, streaming behavior, and error/data handling callbacks.

```typescript
function useAI(
  prompt: string,
  options?: {
    creativity?: AI.Creativity;
    model?: AI.Model;
    stream?: boolean;
    execute?: boolean;
    onError?: (error: Error) => void;
    onData?: (data: T) => void;
    onWillExecute?: (args: Parameters<T>) => void;
    failureToastOptions?: Partial<Pick<Toast.Options, "title" | "primaryAction" | "message">>;
  }
): AsyncState<String> & {
  revalidate: () => void;
};
```

--------------------------------

### Pagination with usePromise Hook in Raycast (Cursor-based)

Source: https://developers.raycast.com/utilities/react-hooks/usepromise

Implements cursor-based pagination using the usePromise hook. The async function returns a cursor, which is then passed to subsequent calls, allowing for efficient fetching of data without relying on page numbers.

```ts
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

### Execute Complex Command String using useExec (TypeScript)

Source: https://developers.raycast.com/utilities/react-hooks/useexec

This signature is used for executing more complex commands provided as a single string. If the command string contains spaces or requires shell features (like `&&`), the `shell` option must be enabled and arguments may need escaping. It returns an AsyncState object and functions for revalidation and mutation, with extensive options for customization.

```typescript
function useExec<T, U>(
  command: string,
  options?: {
    shell?: boolean | string;
    stripFinalNewline?: boolean;
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    encoding?: BufferEncoding | "buffer";
    input?: string | Buffer;
    timeout?: number;
    parseOutput?: ParseExecOutputHandler<T>;
    initialData?: U;
    keepPreviousData?: boolean;
    execute?: boolean;
    onError?: (error: Error) => void;
    onData?: (data: T) => void;
    onWillExecute?: (args: string[]) => void;
    failureToastOptions?: Partial<Pick<Toast.Options, "title" | "primaryAction" | "message">>;
  }
): AsyncState<T> & {
  revalidate: () => void;
  mutate: MutatePromise<T | U | undefined>;
};
```

--------------------------------

### Grid with Custom Empty View

Source: https://developers.raycast.com/api-reference/user-interface/grid

Demonstrates how to implement a custom empty view for the Grid component, displayed when no search results or items are available.

```APIDOC
## Grid with Custom Empty View

### Description
Demonstrates how to implement a custom empty view for the Grid component, displayed when no search results or items are available.

### Method
N/A (Component)

### Endpoint
N/A (Component)

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
```typescript
import { useEffect, useState } from "react";
import { Grid, Image } from "@raycast/api";

export default function CommandWithCustomEmptyView() {
  const [state, setState] = useState({
    searchText: "",
    items: [] as { content: Image.ImageLike; title: string }[],
  });

  useEffect(() => {
    console.log("Running effect after state.searchText changed. Current value:", JSON.stringify(state.searchText));
    // perform an API call that eventually populates `items`.
  }, [state.searchText]);

  return (
    <Grid onSearchTextChange={(newValue) => setState((previous) => ({ ...previous, searchText: newValue }))}>
      {state.searchText === "" && state.items.length === 0 ? (
        <Grid.EmptyView icon={{ source: "https://placekitten.com/500/500" }} title="Type something to get started" />
      ) : (
        state.items.map((item, index) => <Grid.Item key={index} content={item.content} title={item.title} />)
      )}
    </Grid>
  );
}
```

### Response
#### Success Response (200)
N/A (Component)

#### Response Example
N/A (Component)
```

--------------------------------

### Tag Properties

Source: https://developers.raycast.com/api-reference/user-interface/list

This section describes the properties that can be used to define a tag, including its label, optional text, date, and icon.

```APIDOC
## Tag Properties

### Description
This section describes the properties that can be used to define a tag, including its label, optional text, date, and icon.

### Properties

#### `tag`
- **Description**: A string or Date that will be used as the label, optionally colored. The date is formatted relatively to the current time (for example `new Date()` will be displayed as "now", yesterday's Date will be displayed as "1d", etc.). Color changes the text color to the provided color and sets a transparent background with the same color. Defaults to Color.SecondaryText.
- **Type**: `string` or `Date` or `undefined` or `null` or `{ color?: Color.ColorLike; value: string or Date or undefined or null }`
- **Required**: Yes

#### `text`
- **Description**: An optional text that will be used as the label, optionally colored. Color changes the text color to the provided color. Defaults to Color.SecondaryText.
- **Type**: `string` or `null` or `{ color?: Color; value: string or undefined or null }`
- **Required**: No

#### `date`
- **Description**: An optional Date that will be used as the label, optionally colored. The date is formatted relatively to the current time (for example `new Date()` will be displayed as "now", yesterday's Date will be displayed as "1d", etc.). Color changes the text color to the provided color. Defaults to Color.SecondaryText.
- **Type**: `Date` or `null` or `{ color?: Color; value: Date or undefined or null }`
- **Required**: No

#### `icon`
- **Description**: An optional Image.ImageLike that will be used as the icon.
- **Type**: `Image.ImageLike` or `null`
- **Required**: No
```

--------------------------------

### Launch Raycast Command

Source: https://developers.raycast.com/api-reference/command

Launches another Raycast command. This function can be used to trigger commands based on user interaction or for background refreshes. It requires the command name and launch type, and can optionally include arguments, context, and fallback text. An error is thrown if the command does not exist or is not enabled.

```typescript
import { launchCommand, LaunchType } from "@raycast/api";

export default async function Command() {
  await launchCommand({ name: "list", type: LaunchType.UserInitiated, context: { foo: "bar" } });
}
```

--------------------------------

### AI.ask

Source: https://developers.raycast.com/api-reference/ai

Allows you to ask the AI anything. This function is suitable for 'no-view' Commands, effects, or callbacks. For React components, consider using the `useAI` util hook.

```APIDOC
## POST /AI/ask

### Description
Asks the AI a question or provides a prompt to generate a response. This is useful for background tasks or commands without a visual interface.

### Method
POST

### Endpoint
/AI/ask

### Parameters
#### Request Body
- **prompt** (string) - Required - The question or instruction for the AI.
- **options** (object) - Optional - Configuration for the AI model's behavior, such as creativity level.
  - **creativity** (AI.Creativity) - Optional - Controls the creativity of the AI's response. Can be a string ('none', 'low', 'medium', 'high', 'maximum') or a number between 0 and 2.

### Request Example
```json
{
  "prompt": "Suggest 5 jazz songs",
  "options": {
    "creativity": "high"
  }
}
```

### Response
#### Success Response (200)
- **answer** (string) - The AI's generated response to the prompt.

#### Response Example
```json
{
  "answer": "Here are 5 jazz songs: 1. So What - Miles Davis 2. Take Five - Dave Brubeck Quartet 3. My Favorite Things - John Coltrane 4. Giant Steps - John Coltrane 5. A Love Supreme - John Coltrane"
}
```

### Error Handling
- **400 Bad Request**: If the prompt is missing or invalid.
- **403 Forbidden**: If the user does not have access to the AI API and chooses not to grant it.
- **500 Internal Server Error**: If the AI service encounters an issue.
```

--------------------------------

### Provide Dark Theme Option for Local Image Assets

Source: https://developers.raycast.com/misc/changelog

Enables developers to automatically provide a dark theme variant for local image assets. By appending `@dark` to the image filename (e.g., `icon.png` and `icon@dark.png`), Raycast will serve the appropriate image based on the user's theme preference.

```html
<img src="icon@dark.png" alt="Icon">
<img src="icon.png" alt="Icon">
```

--------------------------------

### MenuBarExtra.Item Props

Source: https://developers.raycast.com/api-reference/menu-bar-commands

Defines the properties available for a single menu bar item, allowing customization of its appearance and behavior.

```APIDOC
## MenuBarExtra.Item

### Description
An item in the [MenuBarExtra](#menubarextra) or in a [MenuBarExtra.Submenu](#menubarextra.submenu).

### Method
N/A (Component Prop)

### Endpoint
N/A (Component Prop)

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A (Component Prop)

### Props

| Prop      | Description                                                                                                                                                                                                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children  | `MenuBarExtra.Item`s, `MenuBarExtra.Submenu`s, `MenuBarExtra.Separator` or a mix of either.                                                                                                                                                                                   |
| icon      | The icon that is displayed in the menu bar.                                                                                                                                                                                                                                   |
| isLoading | Indicates to Raycast that it should not unload the command, as it is still executing. If you set make use of `isLoading`, you need to make sure you set it to `false` at the end of the task you are executing (such as an API call), so Raycast can then unload the command. |
| title     | The string that is displayed in the menu bar.                                                                                                                                                                                                                                 |
| tooltip   | A tooltip to display when the cursor hovers the item in the menu bar.                                                                                                                                                                                                         |

### Request Example
```javascript
<MenuBarExtra.Item
  title="My Item"
  icon="https://example.com/icon.png"
  tooltip="This is a tooltip"
  isLoading={true}
/>
```

### Response
#### Success Response (200)
N/A (Component Prop)

#### Response Example
N/A (Component Prop)
```

--------------------------------

### Detail.Metadata.Link Component API

Source: https://developers.raycast.com/api-reference/user-interface/detail

Displays a clickable link within the metadata panel.

```APIDOC
## Detail.Metadata.Link Component

### Description

Displays a clickable link within the metadata panel.

### Props

#### title (string) - Required

The title for the link.

#### target (string) - Required

The URL the link points to.

#### text (string) - Required

The display text for the link.

### Request Example

```typescript
import { Detail } from "@raycast/api";

<Detail.Metadata.Link title="Evolution" target="https://www.pokemon.com/us/pokedex/pikachu" text="Raichu" />
```

### Response Example

(UI Component - No direct response body)
```

--------------------------------

### Create Styled Grid Sections with Custom Props

Source: https://developers.raycast.com/api-reference/user-interface/grid

Illustrates creating a grid with styled sections, including setting a custom aspect ratio for movie items and displaying color swatches from the Color enum. It showcases overriding the 'columns' prop at the section level.

```typescript
import { Grid, Color } from "@raycast/api";

export default function Command() {
  return (
    <Grid columns={6}>
      <Grid.Section aspectRatio="2/3" title="Movies">
        <Grid.Item content="https://api.lorem.space/image/movie?w=150&h=220" />
        <Grid.Item content="https://api.lorem.space/image/movie?w=150&h=220" />
        <Grid.Item content="https://api.lorem.space/image/movie?w=150&h=220" />
        <Grid.Item content="https://api.lorem.space/image/movie?w=150&h=220" />
        <Grid.Item content="https://api.lorem.space/image/movie?w=150&h=220" />
        <Grid.Item content="https://api.lorem.space/image/movie?w=150&h=220" />
      </Grid.Section>
      <Grid.Section columns={8} title="Colors">
        {Object.entries(Color).map(([key, value]) => (
          <Grid.Item key={key} content={{ color: value }} title={key} />
        ))}
      </Grid.Section>
    </Grid>
  );
}
```

--------------------------------

### Implement Grid Pagination with usePromise

Source: https://developers.raycast.com/api-reference/user-interface/grid

This TypeScript code snippet demonstrates how to add pagination to a Raycast `Grid` component using the `usePromise` hook from `@raycast/utils`. It handles loading more items when the user reaches the end of the grid and supports search text changes. Requires `@raycast/api` version 1.69.0 or higher.

```typescript
import { setTimeout } from "node:timers/promises";
import { useState } from "react";
import { Grid } from "@raycast/api";
import { usePromise } from "@raycast/utils";

export default function Command() {
  const [searchText, setSearchText] = useState("");

  const { isLoading, data, pagination } = usePromise(
    (searchText: string) => async (options: { page: number }) => {
      await setTimeout(200);
      const newData = Array.from({ length: 25 }, (_v, index) => ({ index, page: options.page, text: searchText }));
      return { data: newData, hasMore: options.page < 10 };
    },
    [searchText]
  );

  return (
    <Grid isLoading={isLoading} onSearchTextChange={setSearchText} pagination={pagination}>
      {data?.map((item) => (
        <Grid.Item
          key={`${item.index} ${item.page} ${item.text}`}
          content=""
          title={`Page: ${item.page} Item ${item.index}`}
          subtitle={item.text}
        />
      ))}
    </Grid>
  );
}

```

--------------------------------

### ItemWithAlternate.tsx

Source: https://developers.raycast.com/api-reference/menu-bar-commands

Explains how to use the 'alternate' prop to display a secondary menu item when the Option (⌥) key is pressed.

```APIDOC
## POST /websites/developers_raycast/ItemWithAlternate

### Description
This endpoint demonstrates using the `alternate` prop to provide a secondary `MenuBarExtra.Item`. This alternate item is displayed when the user presses the Option (⌥) key. Note the limitations regarding custom shortcuts and nested alternates.

### Method
POST

### Endpoint
/websites/developers_raycast/ItemWithAlternate

### Parameters
#### Request Body
- **icon** (string) - Optional - The icon to display for the main item.
- **title** (string) - Required - The main title displayed for this item.
- **shortcut** (object) - Optional - A shortcut for the main item. Should not use Option (⌥) as a modifier.
  - **key** (string) - Required - The key for the shortcut.
  - **modifiers** (array) - Required - An array of modifiers (e.g., `["cmd"]`).
- **onAction** (string) - Required - The action to execute when the main item is clicked.
- **alternate** (object) - Required - The alternate menu item to display when Option (⌥) is pressed.
  - **icon** (string) - Optional - The icon for the alternate item.
  - **title** (string) - Required - The title for the alternate item.
  - **onAction** (string) - Required - The action to execute when the alternate item is clicked.

### Request Example
```json
{
  "icon": "raycast.png",
  "title": "Open Raycast Homepage",
  "shortcut": {
    "key": "r",
    "modifiers": ["cmd"]
  },
  "onAction": "https://raycast.com",
  "alternate": {
    "icon": "raycast.png",
    "title": "Open Raycast Store",
    "onAction": "https://raycast.com/store"
  }
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

### Form Item Properties

Source: https://developers.raycast.com/api-reference/user-interface/form

This section details the configurable properties for form items, including callbacks, display options, and value management.

```APIDOC
## Form Item Properties

### Description
Configuration options for form items, controlling their behavior, appearance, and data handling.

### Parameters
#### Request Body
- **info** (string) - Optional - An optional info message to describe the form item. It appears on the right side of the item with an info icon. When the icon is hovered, the info message is shown.
- **onBlur** (function) - Optional - The callback that will be triggered when the item loses its focus.
- **onChange** (function) - Optional - The callback which will be triggered when the `value` of the item changes.
- **onFocus** (function) - Optional - The callback which will be triggered should be called when the item is focused.
- **showHiddenFiles** (boolean) - Optional - Indicates whether the file picker displays files that are normally hidden from the user.
- **storeValue** (boolean) - Optional - Indicates whether the value of the item should be persisted after submitting, and restored next time the form is rendered.
- **title** (string) - Optional - The title displayed on the left side of the item.
- **value** (string[]) - Optional - The current value of the item.

### Response
#### Success Response (200)
- **status** (string) - Indicates the success status of the operation.

#### Response Example
```json
{
  "status": "success"
}
```
```

--------------------------------

### Clipboard API Operations (JavaScript)

Source: https://developers.raycast.com/migration/v1.28.0

Demonstrates the new namespace for clipboard operations, including copying, clearing, and pasting text. It shows deprecated methods for reference.

```javascript
import { Clipboard } from "@raycast/api";

// deprecated copyTextToClipboard
await Clipboard.copy("text");

// deprecated clearClipboard
await Clipboard.clear();

// deprecated pasteText
await Clipboard.paste("text");
```

--------------------------------

### Toast and Alert Interfaces (JavaScript)

Source: https://developers.raycast.com/migration/v1.28.0

Details the new locations for Toast and Alert related interfaces and enumerations within their respective namespaces. Deprecated interface names are listed.

```javascript
import { Alert, Toast } from "@raycast/api";

// deprecated ToastOptions
Toast.Options;

// deprecated ToastActionOptions
Toast.ActionOptions;

// deprecated ToastStyle
Toast.Style;

// deprecated AlertOptions
Alert.Options;

// deprecated AlertActionOptions
Alert.ActionOptions;

// deprecated AlertActionStyle
Alert.ActionStyle;
```

--------------------------------

### Display Tags in Raycast List Item Detail

Source: https://developers.raycast.com/api-reference/user-interface/list

This TypeScript code demonstrates how to display a list of tags within the detail section of a Raycast List.Item. It utilizes the Metadata.TagList and Metadata.TagList.Item components to present tags with optional colors.

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

### Detail.Metadata.Label

Source: https://developers.raycast.com/api-reference/user-interface/detail

Displays a label with a title, text value, and an optional icon.

```APIDOC
## Detail.Metadata.Label

### Description
Displays a label with a title, text value, and an optional icon.

### Props

#### Path Parameters
- **title** (string) - Required - The title of the item.
- **icon** (Image.ImageLike) - Optional - An icon to illustrate the value of the item.
- **text** (string or { color?: Color; value: string }) - Required - The text value of the item. Specifying `color` will display the text in the provided color. Defaults to Color.PrimaryText.

### Request Example
```typescript
import { Detail } from "@raycast/api";

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
```

--------------------------------

### isExpired() Method

Source: https://developers.raycast.com/api-reference/oauth

A convenience method for checking whether the access token has expired. It includes a buffer time before the actual expiration.

```APIDOC
## isExpired()

### Description
A convenience method for checking whether the access token has expired. The method factors in some seconds of "buffer", so it returns true a couple of seconds before the actual expiration time. This requires the `expiresIn` parameter to be set.

### Method
`() => boolean`

### Endpoint
N/A (Method within a class)

### Parameters
None

### Request Example
```javascript
// Assuming 'tokenSet' is an instance of TokenSet
const hasExpired = tokenSet.isExpired();
console.log(hasExpired);
```

### Response
#### Success Response (boolean)
- **Returns** (boolean) - `true` if the token is expired (including buffer), `false` otherwise.

#### Response Example
```json
true
```
```

--------------------------------

### Render Markdown String with Raycast Detail

Source: https://developers.raycast.com/api-reference/user-interface/detail

Renders a basic markdown string using the Detail component. This is the simplest way to display formatted text in Raycast.

```typescript
import { Detail } from "@raycast/api";

export default function Command() {
  return <Detail markdown="**Hello** _World_!" />;
}
```

--------------------------------

### List.Item.Detail.Metadata.Link

Source: https://developers.raycast.com/api-reference/user-interface/list

Represents a link within the metadata section of a List.Item.Detail. It displays a title, a target URL, and link text.

```APIDOC
## List.Item.Detail.Metadata.Link

### Description
Represents a link within the metadata section of a List.Item.Detail. It displays a title, a target URL, and link text.

### Method
N/A (Component)

### Endpoint
N/A (Component)

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
```typescript
<List.Item.Detail.Metadata>
  <List.Item.Detail.Metadata.Link
    title="Evolution"
    target="https://www.pokemon.com/us/pokedex/pikachu"
    text="Raichu"
  />
</List.Item.Detail.Metadata>
```

### Response
#### Success Response (200)
N/A (Component)

#### Response Example
N/A
```

--------------------------------

### Form Item Props

Source: https://developers.raycast.com/api-reference/user-interface/form

This section details the available props for the Form Item component, including their types, descriptions, and default values.

```APIDOC
## Form Item Component

### Description
This component represents a form item with various configuration options.

### Method
N/A (Component Props)

### Endpoint
N/A (Component Props)

### Parameters
#### Props
- **id** (string) - Required - ID of the form item. Make sure to assign each form item a unique id.
- **autoFocus** (boolean) - Optional - Indicates whether the item should be focused automatically once the form is rendered.
- **children** (React.ReactNode) - Optional - The list of tags.
- **defaultValue** (string[]) - Optional - The default value of the item. Keep in mind that `defaultValue` will be configured once per component lifecycle. This means that if a user changes the value, `defaultValue` won't be configured on re-rendering. If you're using `storeValue` and configured it as `true` then the stored value will be set. If you configure `value` at the same time with `defaultValue`, the `value` will be set instead of `defaultValue`.
- **error** (string) - Optional - An optional error message to show the form item validation issues. If the `error` is present, the Form Item will be highlighted with red border and will show an error message on the right.
- **info** (string) - Optional - An optional info message to describe the form item. It appears on the right side of the item with an info icon. When the icon is hovered, the info message is shown.
- **onBlur** (function) - Optional - The callback that will be triggered when the item loses its focus. Signature: `(event: FormEvent<string[]>) => void`

### Request Example
N/A (Component Props)

### Response
N/A (Component Props)

#### Success Response (200)
N/A (Component Props)

#### Response Example
N/A (Component Props)
```

--------------------------------

### usePromise Hook Signature and Options

Source: https://developers.raycast.com/utilities/react-hooks/usepromise

Defines the TypeScript signature for the usePromise hook, detailing its generic type, function input, arguments, and configuration options. It also outlines the structure of the returned AsyncState and associated methods.

```typescript
type Result<T> = `type of the returned value of the returned Promise`;

function usePromise<T>(
  fn: T,
  args?: Parameters<T>,
  options?: {
    abortable?: RefObject<AbortController | null | undefined>;
    execute?: boolean;
    onError?: (error: Error) => void;
    onData?: (data: Result<T>) => void;
    onWillExecute?: (args: Parameters<T>) => void;
    failureToastOptions?: Partial<Pick<Toast.Options, "title" | "primaryAction" | "message">>;
  },
): AsyncState<Result<T>> & {
  revalidate: () => void;
  mutate: MutatePromise<Result<T> | undefined>;
};
```

--------------------------------

### Configure Slack OAuth Service

Source: https://developers.raycast.com/utilities/oauth/oauthservice

This snippet shows the configuration for the Slack OAuthService via its static `slack` property. It utilizes Raycast's pre-configured OAuth app, primarily requiring the specification of relevant scopes, such as 'emoji:read'.

```tsx
const slack = OAuthService.slack({ scope: "emoji:read" });
```

--------------------------------

### Implement Optimistic Updates with Rollback in Raycast

Source: https://developers.raycast.com/utilities/react-hooks/usecachedpromise

Shows how to use `mutate` with `optimisticUpdate` and `rollbackOnError` in `useCachedPromise` for a responsive UI. This allows the UI to reflect changes immediately while handling potential errors by rolling back the data.

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

### Clipboard.paste

Source: https://developers.raycast.com/api-reference/clipboard

Pastes content to the current cursor position in the frontmost application.

```APIDOC
## POST /clipboard/paste

### Description
Pastes text or a file to the current selection of the frontmost application.

### Method
POST

### Endpoint
/clipboard/paste

### Parameters
#### Request Body
- **content** (string | number | object) - Required - The content to insert at the cursor. Can be a string, number, or a Clipboard.Content object.

### Request Example
```json
{
  "content": "I really like Raycast's API"
}
```

### Response
#### Success Response (200)
- **message** (string) - Indicates successful paste operation.

#### Response Example
```json
{
  "message": "Content pasted successfully."
}
```
```

--------------------------------

### List.Item.Detail.Metadata.Label

Source: https://developers.raycast.com/api-reference/user-interface/list

Represents a label within the metadata section of a List.Item.Detail. It displays a title, an optional icon, and text.

```APIDOC
## List.Item.Detail.Metadata.Label

### Description
Represents a label within the metadata section of a List.Item.Detail. It displays a title, an optional icon, and text.

### Method
N/A (Component)

### Endpoint
N/A (Component)

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
```typescript
<List.Item.Detail.Metadata>
  <List.Item.Detail.Metadata.Label title="Type" icon="pokemon_types/grass.svg" text="Grass" />
</List.Item.Detail.Metadata>
```

### Response
#### Success Response (200)
N/A (Component)

#### Response Example
N/A
```

--------------------------------

### Cache Data with withCache Utility

Source: https://developers.raycast.com/utilities/getting-started

The withCache function provides a way to cache data, improving performance by avoiding redundant computations or fetches. An issue with arguments not being passed correctly was fixed in v1.19.1.

```javascript
// Example usage of withCache function (specific implementation not provided in text)
// const cachedData = withCache(fetchDataFunction, 'cacheKey');

```

--------------------------------

### Uninstall Deprecated ESLint Dependencies (npm)

Source: https://developers.raycast.com/migration/v1.48.8

Removes deprecated ESLint-related packages from development dependencies using npm. This is the final step after migrating to the new ESLint configuration.

```bash
npm uninstall @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier
```

--------------------------------

### Form Item Component

Source: https://developers.raycast.com/api-reference/user-interface/form

Details the properties available for the Form Item component, including their types, descriptions, and default values.

```APIDOC
## Form Item Component API

### Description
This component represents a single form item within a larger form structure. It allows for input, validation, and user interaction.

### Method
N/A (Component API)

### Endpoint
N/A (Component API)

### Parameters
#### Props
- **id** (`string`) - Required - ID of the form item. Make sure to assign each form item a unique id.
- **autoFocus** (`boolean`) - Optional - Indicates whether the item should be focused automatically once the form is rendered.
- **defaultValue** (`string`) - Optional - The default value of the item. This value is configured once per component lifecycle. If `value` is also configured, `value` takes precedence.
- **error** (`string`) - Optional - An optional error message to display validation issues. If present, the item will be highlighted with a red border.
- **info** (`string`) - Optional - An optional info message to describe the form item. Appears with an info icon on hover.

#### Event Handlers
- **onBlur** (`(event: FormEvent<string>) => void`) - Optional - Callback triggered when the item loses focus.
- **onChange** (`(newValue: string) => void`) - Optional - Callback triggered when the item's value changes.

### Request Example
N/A (Component API)

### Response
N/A (Component API)
```

--------------------------------

### Open URL in Browser with Raycast API

Source: https://developers.raycast.com/api-reference/user-interface/actions

This snippet shows how to use the Action.OpenInBrowser action to open a specified URL in the default web browser. It requires the '@raycast/api' package and takes a URL string as input.

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

### Fix Crash with Empty String Website in List Item

Source: https://developers.raycast.com/misc/changelog

Addresses a crash that occurred when a `List.Item` contained an empty string for the `website` property. This fix ensures stability when handling potentially null or empty website data.

```javascript
import { List } from '@raycast/api';

function StableList() {
  const response = { website: '' }; // Example of potentially empty data
  return (
    <List>
      <List.Item
        title="Item"
        // The fix ensures this doesn't crash when response.website is empty
        subtitle={response?.website || 'No website provided'}
      />
    </List>
  );
}
```

--------------------------------

### Form.Event.Type

Source: https://developers.raycast.com/api-reference/user-interface/form

Defines the possible types for a Form.Event, specifically 'focus' and 'blur'.

```APIDOC
## Form.Event.Type

### Description

The different types of [`Form.Event`](#form.event). Can be "focus" or "blur".

### Method

N/A (Type)

### Endpoint

N/A (Type)

### Parameters

N/A

### Request Example

N/A

### Response

N/A (Type)
```

--------------------------------

### Implement React Suspense for Data Fetching in Raycast Extension

Source: https://developers.raycast.com/migration/v1.37.0

This snippet demonstrates how to use React Suspense with the `usePromise` hook to handle asynchronous data fetching within a Raycast extension. It fetches Twitter items based on a search query and includes error handling with `showToast`. The `isLoading` state is managed automatically by Raycast when Suspense is used.

```typescript
import { List, Toast, showToast, ActionPanel, Action, Icon, popToRoot } from "@raycast/api";
import { useState, useCallback } from "react";
import * as twitter from "./oauth/twitter";

// a hook that suspends until a promise is resolved
import { usePromise } from "./suspense-use-promise";

const promise = async (search: string) => {
  try {
    await twitter.authorize();
    return await twitter.fetchItems(search);
  } catch (error) {
    console.error(error);
    showToast({ style: Toast.Style.Failure, title: String(error) });
    return [];
  }
};

export default function Command() {
  const [search, setSearch] = useState("");

  const items = usePromise(promise, [search]);

  const logout = useCallback(() => {
    twitter.logout();
    popToRoot();
  }, []);

  const actionPanel = (
    <ActionPanel>
      <Action title="Logout" onAction={logout} />
    </ActionPanel>
  );

  // no need to set the `isLoading` prop, Raycast will set it automatically
  // until the React application isn't suspended anymore
  return (
    <List onSearchTextChange={setSearch} throttle>
      {items.map((item) => {
        return (
          <List.Item key={item.id} id={item.id} icon={Icon.TextDocument} title={item.title} actions={actionPanel} />
        );
      })}
    </List>
  );
}

```

--------------------------------

### Image.Source

Source: https://developers.raycast.com/api-reference/user-interface/icons-and-images

Details the Image.Source type, which specifies how to provide an image, supporting URLs, assets, icons, or theme-aware sources.

```APIDOC
## Image.Source

### Description
The source of an [Image](#image). Can be either a remote URL, a local file resource, a built-in [Icon](#icon) or a single emoji. For consistency, it's best to use the built-in [Icon](#icon) in lists, the Action Panel, and other places. If a specific icon isn't built-in, you can reference custom ones from the `assets` folder of the extension by file name, e.g. `my-icon.png`. Alternatively, you can reference an absolute HTTPS URL that points to an image or use an emoji. You can also specify different remote or local assets for light and dark theme.

### Type Definition
```typescript
Image.Source: URL | Asset | Icon | { light: URL | Asset; dark: URL | Asset }
```

### Example
```typescript
import { Icon, List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item title="URL" icon={{ source: "https://raycast.com/uploads/avatar.png" }} />
      <List.Item title="Asset" icon={{ source: "avatar.png" }} />
      <List.Item title="Icon" icon={{ source: Icon.Circle }} />
      <List.Item
        title="Theme"
        icon={{
          source: {
            light: "https://raycast.com/uploads/avatar.png",
            dark: "https://raycast.com/uploads/avatar.png",
          },
        }}
      />
    </List>
  );
}
```
```

--------------------------------

### Raycast List Item with Standalone Metadata (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/list

This snippet demonstrates how to create a Raycast list item displaying only structured metadata, without any accompanying markdown content. It uses the List.Item.Detail.Metadata component to organize and present information such as types, characteristics, and abilities using labels and separators. This is suitable for list items where only factual data needs to be displayed.

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
                <List.Item.Detail.Metadata.Label title="Types" />
                <List.Item.Detail.Metadata.Label title="Grass" icon="pokemon_types/grass.svg" />
                <List.Item.Detail.Metadata.Separator />
                <List.Item.Detail.Metadata.Label title="Poison" icon="pokemon_types/poison.svg" />
                <List.Item.Detail.Metadata.Separator />
                <List.Item.Detail.Metadata.Label title="Chracteristics" />
                <List.Item.Detail.Metadata.Label title="Height" text="70cm" />
                <List.Item.Detail.Metadata.Separator />
                <List.Item.Detail.Metadata.Label title="Weight" text="6.9 kg" />
                <List.Item.Detail.Metadata.Separator />
                <List.Item.Detail.Metadata.Label title="Abilities" />
                <List.Item.Detail.Metadata.Label title="Chlorophyll" text="Main Series" />
                <List.Item.Detail.Metadata.Separator />
                <List.Item.Detail.Metadata.Label title="Overgrow" text="Main Series" />
                <List.Item.Detail.Metadata.Separator />
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

### Show Success Toast with Action in Raycast

Source: https://developers.raycast.com/api-reference/feedback/toast

Demonstrates how to display a success toast message with a primary action in a Raycast extension. It imports necessary components from '@raycast/api' and defines the toast's style, title, message, and a callback for the primary action. The action logs a message and hides the toast.

```typescript
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

--------------------------------

### Token Refresh Flow

Source: https://developers.raycast.com/api-reference/oauth

Demonstrates how to refresh an expired access token using a refresh token. This is crucial for maintaining user sessions without requiring re-authentication.

```APIDOC
## Token Refresh

Access tokens typically expire, necessitating a mechanism to refresh them. Some providers require an `offline_access` scope to issue refresh tokens.

### Method

This flow is typically initiated before the main authorization process.

### Logic

1. Check if a `tokenSet` exists and contains an `accessToken`.
2. If `refreshToken` is available and the `tokenSet` is expired (using `isExpired()` method), refresh the token.
3. Update the `tokenSet` with the newly refreshed tokens.

### Example (TypeScript)

```typescript
const tokenSet = await client.getTokens();
if (tokenSet?.accessToken) {
  if (tokenSet.refreshToken && tokenSet.isExpired()) {
    await client.setTokens(await refreshTokens(tokenSet.refreshToken));
  }
  return;
}
// authorize...
```

### `refreshTokens` Function Example (Node.js with node-fetch)

This function handles the actual token refresh request to the provider's token endpoint.

```typescript
async function refreshTokens(refreshToken: string): Promise<OAuth.TokenResponse> {
  const params = new URLSearchParams();
  params.append("client_id", "YourClientId");
  params.append("refresh_token", refreshToken);
  params.append("grant_type", "refresh_token");

  const response = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    body: params,
  });
  if (!response.ok) {
    console.error("refresh tokens error:", await response.text());
    throw new Error(response.statusText);
  }

  const tokenResponse = (await response.json()) as OAuth.TokenResponse;
  tokenResponse.refresh_token = tokenResponse.refresh_token ?? refreshToken;
  return tokenResponse;
}
```

### Provider-Specific Notes

- **Twitter**: Requires the `offline.access` scope to obtain a refresh token.
```

--------------------------------

### Validate Raycast Extension using npm

Source: https://developers.raycast.com/basics/publish-an-extension

This command validates your Raycast extension for distribution without publishing it to the store. It ensures that your extension is correctly configured and free of errors before you proceed with the publishing process.

```bash
npm run build
```

--------------------------------

### Define Clipboard Content Type (TypeScript)

Source: https://developers.raycast.com/api-reference/clipboard

Defines the structure for content that can be copied to the clipboard. It supports plain text, file paths, or HTML content, with an optional text representation for HTML.

```typescript
type Content =
  | {
      text: string;
    }
  | {
      file: PathLike;
    }
  | {
      html: string;
      text?: string; // The alternative text representation of the content.
    };
```

--------------------------------

### Form.LinkAccessory

Source: https://developers.raycast.com/api-reference/user-interface/form

Adds a clickable link to the right-hand side of the navigation bar in a form.

```APIDOC
## Form.LinkAccessory

### Description

A link that will be shown in the right-hand side of the navigation bar.

### Method

N/A (Component)

### Endpoint

N/A (Component)

### Parameters

#### Props

- **target** (string) - Required - The target URL of the link.
- **text** (string) - Required - The display text for the link.

### Request Example

```typescript
<Form.LinkAccessory
  target="https://developers.raycast.com/api-reference/user-interface/form"
  text="Open Documentation"
/>
```

### Response

N/A (Component)
```

--------------------------------

### Migrate List.Item accessoryTitle and accessoryIcon to accessories prop

Source: https://developers.raycast.com/misc/migration/v1.31.0

Illustrates the migration of a List.Item that uses both 'accessoryTitle' and 'accessoryIcon' to the new 'accessories' prop. Both text and icon are now combined into a single accessory object within the 'accessories' array.

```typescript
<List.Item title="List item with accessory title and accessory icon" accessoryTitle="foo" accessoryIcon={getAccessoryIcon()} />
// becomes
<List.Item title="List item with accessory title and accessory icon" accessories={[{ text: "foo", icon: getAccessoryIcon() }]}
```

--------------------------------

### Prevent UI Flickering with keepPreviousData in Raycast

Source: https://developers.raycast.com/utilities/react-hooks/usefetch

This snippet demonstrates how to use `keepPreviousData: true` with the `useFetch` hook in Raycast to prevent UI flickering when search arguments change. It ensures the previous data is retained if the cache is empty for new arguments, leading to a smoother user experience.

```tsx
import { useState } from "react";
import { List, ActionPanel, Action } from "@raycast/api";
import { useFetch } from "@raycast/utils";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const { isLoading, data } = useFetch(`https://api.example?q=${searchText}`, {
    // to make sure the screen isn't flickering when the searchText changes
    keepPreviousData: true,
  });

  return (
    <List isLoading={isLoading} searchText={searchText} onSearchTextChange={setSearchText} throttle>
      {(data || []).map((item) => (
        <List.Item key={item.id} title={item.title} />
      ))}
    </List>
  );
}
```

--------------------------------

### Detail Component

Source: https://developers.raycast.com/api-reference/user-interface/detail

The main Detail component is used to display rich content, including markdown, navigation titles, and metadata.

```APIDOC
## Detail Component

### Description
The main Detail component is used to display rich content, including markdown, navigation titles, and metadata.

### Props

#### markdown
- **markdown** (string) - Required - The content to display in markdown format.
- **navigationTitle** (string) - Optional - The title to display in the navigation bar.
- **metadata** (React.ReactNode) - Optional - A React node containing metadata elements to display below the content.

### Request Example
```typescript
import { Detail } from "@raycast/api";

const markdown = `
# Pikachu

![Pikachu Image](https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png)

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
```

--------------------------------

### Create Raycast List with Actions (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/action-panel

This TypeScript code defines a Raycast command that renders a List UI. Each list item includes a title, subtitle, and an ActionPanel with submenus for adding labels. It depends on the '@raycast/api' library.

```typescript
import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";

export default function Command() {
  return (
    <List navigationTitle="Open Pull Requests">
      <List.Item
        title="Docs: Update API Reference"
        subtitle="#1"
        actions={
          <ActionPanel title="#1 in raycast/extensions">
            <ActionPanel.Submenu title="Add Label">
              <Action
                icon={{ source: Icon.Circle, tintColor: Color.Red }}
                title="Bug"
                onAction={() => console.log("Add bug label")}
              />
              <Action
                icon={{ source: Icon.Circle, tintColor: Color.Yellow }}
                title="Enhancement"
                onAction={() => console.log("Add enhancement label")}
              />
              <Action
                icon={{ source: Icon.Circle, tintColor: Color.Blue }}
                title="Help Wanted"
                onAction={() => console.log("Add help wanted label")}
              />
            </ActionPanel.Submenu>
          </ActionPanel>
        }
      />
    </List>
  );
}
```

--------------------------------

### Open Extension Preferences in TypeScript

Source: https://developers.raycast.com/api-reference/preferences

Opens the preferences screen for the current Raycast extension. This action is useful when user input is required, such as updating an API key. It returns a Promise that resolves when the screen is opened.

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

### Color API Interfaces (JavaScript)

Source: https://developers.raycast.com/migration/v1.28.0

Highlights the new `Color` namespace for color-related interfaces, including dynamic colors and color definitions. Deprecated interface names are listed.

```javascript
import { Color } from "@raycast/api";

// deprecated DynamicColor
Color.Dynamic;

// deprecated ColorLike
Color.ColorLike;
```

--------------------------------

### List.Item.Detail.Metadata.TagList

Source: https://developers.raycast.com/api-reference/user-interface/list

Represents a list of tags displayed in a row within the metadata section of a List.Item.Detail. It requires a title and child tags.

```APIDOC
## List.Item.Detail.Metadata.TagList

### Description
Represents a list of tags displayed in a row within the metadata section of a List.Item.Detail. It requires a title and child tags.

### Method
N/A (Component)

### Endpoint
N/A (Component)

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
```typescript
<List.Item.Detail.Metadata>
  <List.Item.Detail.Metadata.TagList title="Type">
    <List.Item.Detail.Metadata.TagList.Item text="Electric" color={"#eed535"} />
  </List.Item.Detail.Metadata.TagList>
</List.Item.Detail.Metadata>
```

### Response
#### Success Response (200)
N/A (Component)

#### Response Example
N/A
```

--------------------------------

### Generate Progress Icon (TypeScript)

Source: https://developers.raycast.com/utilities/icons/getprogressicon

Generates an Image.Asset representing task progress. It takes a progress number (0-1), an optional color, and optional background styling. Returns an Image.Asset compatible with Raycast UI elements.

```typescript
function getProgressIcon(
  progress: number,
  color?: Color | string,
  options?: {
    background?: Color | string;
    backgroundOpacity?: number;
  },
): Image.Asset;
```

--------------------------------

### AsyncState Type Definitions

Source: https://developers.raycast.com/utilities/react-hooks/useai

Illustrates the different states an AsyncState object can represent when using the useAI hook. This includes initial loading, successful data retrieval, error states, and states where data is being reloaded.

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
  data: string,
  error: undefined
}

// Error State
{
  isLoading: false,
  data: undefined,
  error: Error
}

// Reloading State
{
  isLoading: true,
  data: string | undefined,
  error: Error | undefined
}
```

--------------------------------

### Set LocalStorage Items in Raycast (TypeScript)

Source: https://developers.raycast.com/api-reference/storage

Demonstrates how to set string, number, and boolean values in Raycast's local storage using the `LocalStorage.setItem` function. This functionality is crucial for persisting user preferences or application state within a Raycast extension.

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

### Implement Grid Pagination Manually

Source: https://developers.raycast.com/api-reference/user-interface/grid

This TypeScript code snippet shows how to implement pagination for a Raycast `Grid` component from scratch. It manages state for loading, hasMore, data, and the next page, using `useCallback` for efficient event handling and `useEffect` to trigger data loading. Requires `@raycast/api` version 1.69.0 or higher.

```typescript
import { setTimeout } from "node:timers/promises";
import { useCallback, useEffect, useRef, useState } from "react";
import { Grid } from "@raycast/api";

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
    await setTimeout(200);
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
    <Grid
      isLoading={state.isLoading}
      onSearchTextChange={onSearchTextChange}

```

--------------------------------

### Define a Tool with Complex Input in TypeScript

Source: https://developers.raycast.com/ai/learn-core-concepts-of-ai-extensions

Illustrates a tool accepting a complex input object with optional fields, described using JSDoc comments. This enables passing detailed context, like task properties, to the tool.

```typescript
type Input = {
  /**
   * The title of the task
   */
  title: string;
  /**
   * The description of the task
   */
  description?: string;
  /**
   * The due date of the task in ISO 8601 format
   */
  dueDate?: string;
};

export default function tool(input: Input) {
  // ... create the task
}
```

--------------------------------

### Render Detail View with Metadata in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/detail

Renders a Detail view with both markdown content and a structured metadata panel. The metadata panel can include labels, tag lists, and links.

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
          <Detail.Metadata.Label title="Height" text={`1' 04"`} />
          <Detail.Metadata.Label title="Weight" text="13.2 lbs" />
          <Detail.Metadata.TagList title="Type">
            <Detail.Metadata.TagList.Item text="Electric" color={"#eed535"} />
          </Detail.Metadata.TagList>
          <Detail.Metadata.Separator />
          <Detail.Metadata.Link title="Evolution" target="https://www.pokemon.com/us/pokedex/pikachu" text="Raichu" />
        </Detail.Metadata>
      }
    />
  );
}
```

--------------------------------

### Toast Notification API (JavaScript)

Source: https://developers.raycast.com/migration/v1.28.0

Shows how to display toast notifications using the updated `showToast` function, which now accepts a `Toast.Options` object. Deprecated styles and constructor are included.

```javascript
import { showToast, Toast } from "@raycast/api";

// deprecated new Toast()
const toast = await showToast({ title: "Toast title" }); // Success by default

// deprecated showToast(ToastStyle.Failure, 'Toast title')
await showToast({ title: "Toast title", style: Toast.Style.Failure });
```

--------------------------------

### Refresh Access Tokens in TypeScript

Source: https://developers.raycast.com/api-reference/oauth

Demonstrates how to check for expired access tokens and refresh them using a provided refresh token. It utilizes a helper function `refreshTokens` which makes a POST request to the token endpoint.

```typescript
const tokenSet = await client.getTokens();
if (tokenSet?.accessToken) {
  if (tokenSet.refreshToken && tokenSet.isExpired()) {
    await client.setTokens(await refreshTokens(tokenSet.refreshToken));
  }
  return;
}
// authorize...
```

```typescript
async function refreshTokens(refreshToken: string): Promise<OAuth.TokenResponse> {
  const params = new URLSearchParams();
  params.append("client_id", "YourClientId");
  params.append("refresh_token", refreshToken);
  params.append("grant_type", "refresh_token");

  const response = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    body: params,
  });
  if (!response.ok) {
    console.error("refresh tokens error:", await response.text());
    throw new Error(response.statusText);
  }

  const tokenResponse = (await response.json()) as OAuth.TokenResponse;
  tokenResponse.refresh_token = tokenResponse.refresh_token ?? refreshToken;
  return tokenResponse;
}
```

--------------------------------

### useLocalStorage Hook Signature (TypeScript)

Source: https://developers.raycast.com/utilities/react-hooks/uselocalstorage

Defines the TypeScript signature for the useLocalStorage hook. It takes a key and an optional initial value, returning the current value, functions to set and remove the value, and a loading state.

```typescript
function useLocalStorage<T>(key: string, initialValue?: T): {
  value: T | undefined;
  setValue: (value: T) => Promise<void>;
  removeValue: () => Promise<void>;
  isLoading: boolean;
}
```

--------------------------------

### Trash File Raycast API

Source: https://developers.raycast.com/api-reference/utilities

Moves one or more files or directories to the system's Trash. This provides a safe way to delete items, allowing for recovery if needed.

```typescript
import { trash } from "@raycast/api";
import { writeFile } from "fs/promises";
import { homedir } from "os";
import { join } from "path";

export default async function Command() {
  const file = join(homedir(), "Desktop", "yolo.txt");
  await writeFile(file, "I will be deleted soon!");
  await trash(file);
}
```

--------------------------------

### Implement Dropdown with List in Raycast (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/list

This TypeScript code demonstrates how to create a custom dropdown component for filtering within a Raycast List. It defines a DrinkType interface and uses List.Dropdown and List.Item components to display options and handle user selection.

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

### Detail Component API

Source: https://developers.raycast.com/api-reference/user-interface/detail

The Detail component renders a markdown string with an optional metadata panel. It's typically used for standalone views or when navigating from a List.

```APIDOC
## Detail Component

### Description

Renders a markdown ([CommonMark](https://commonmark.org)) string with an optional metadata panel. Typically used as a standalone view or when navigating from a [List](https://developers.raycast.com/api-reference/user-interface/list).

### Props

#### markdown (string) - Required

The CommonMark string to be rendered.

#### navigationTitle (string) - Optional

The main title for that view displayed in Raycast.

#### metadata (React.ReactNode) - Optional

The `Detail.Metadata` to be rendered in the right side area.

#### isLoading (boolean) - Optional

Indicates whether a loading bar should be shown or hidden below the search bar.

#### actions (React.ReactNode) - Optional

A reference to an ActionPanel.

### Request Example

```typescript
import { Detail } from "@raycast/api";

export default function Command() {
  return <Detail markdown="**Hello** _World_!" />;
}
```

### Response Example

(UI Component - No direct response body)

### Notes

- Image dimensions can be customized using query strings: `?raycast-width=250&raycast-height=250`.
- Image tint color can be specified: `?raycast-tint-color=blue`.
- LaTeX is supported for inline and display math using `\(...\)`, `\[...\]`, `$$...$$`, etc.
```

--------------------------------

### Clipboard.clear

Source: https://developers.raycast.com/api-reference/clipboard

Clears all content currently stored in the clipboard.

```APIDOC
## DELETE /clipboard/clear

### Description
Clears the current clipboard contents.

### Method
DELETE

### Endpoint
/clipboard/clear

### Parameters
None

### Response
#### Success Response (200)
- **message** (string) - Indicates successful clearing of the clipboard.

#### Response Example
```json
{
  "message": "Clipboard cleared successfully."
}
```
```

--------------------------------

### Action.PickDate Component

Source: https://developers.raycast.com/misc/changelog

Introduces the `Action.PickDate` component, allowing users to select a date directly from the action panel. The `type` prop can be used to control which date components (e.g., year, month, day) are available for selection.

```javascript
import { Action, ActionPanel } from '@raycast/api';

function MyComponent() {
  return (
    <ActionPanel>
      <Action.PickDate type="datetime" />
    </ActionPanel>
  );
}
```

--------------------------------

### Show Basic HUD Message (TypeScript)

Source: https://developers.raycast.com/api-reference/feedback/hud

Demonstrates how to display a simple text message using the `showHUD` function from the `@raycast/api` library. This is useful for confirming actions.

```typescript
import { showHUD } from "@raycast/api";

export default async function Command() {
  await showHUD("Hey there 👋");
}
```

--------------------------------

### Define Clipboard Read Content Type (TypeScript)

Source: https://developers.raycast.com/api-reference/clipboard

Defines the structure for content read from the clipboard. It can represent text, an optional file path, or optional HTML content.

```typescript
type Content =
  | {
      text: string;
    }
  | {
      file?: string;
    }
  | {
      html?: string;
    };
```

--------------------------------

### Trash File Action in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/actions

Shows how to use the Action.Trash component to move a specified file or folder to the system's Trash. It requires the 'paths' prop, which can be a single path or an array of paths.

```typescript
import { ActionPanel, Detail, Action } from "@raycast/api";
import { homedir } from "os";

const FILE = `${homedir()}/Downloads/get-rid-of-me.txt`;

export default function Command() {
  return (
    <Detail
      markdown="Some spring cleaning?"
      actions={
        <ActionPanel>
          <Action.Trash paths={FILE} />
        </ActionPanel>
      }
    />
  );
}
```

--------------------------------

### Open Command Preferences in TypeScript

Source: https://developers.raycast.com/api-reference/preferences

Opens the preferences screen specifically for the current Raycast command. This is helpful for command-specific settings that need user configuration. The function returns a Promise that resolves upon opening the preferences screen.

```typescript
import { ActionPanel, Action, Detail, openCommandPreferences } from "@raycast/api";

export default function Command() {
  const markdown = "API key incorrect. Please update it in command preferences and try again.";

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action title="Open Command Preferences" onAction={openCommandPreferences} />
        </ActionPanel>
      }
    />
  );
}
```

--------------------------------

### Paste Content with Raycast API

Source: https://developers.raycast.com/api-reference/user-interface/actions

This snippet illustrates how to use the Action.Paste action to paste specified content into the front-most application. It requires the '@raycast/api' package and takes the content to be pasted as a string input.

```typescript
import { ActionPanel, Detail, Action } from "@raycast/api";

export default function Command() {
  return (
    <Detail
      markdown="Let us know what you think about the Raycast API?"
      actions={
        <ActionPanel>
          <Action.Paste content="api@raycast.com" />
        </ActionPanel>
      }
    />
  );
}
```

--------------------------------

### Dropdown Preference Data Structure

Source: https://developers.raycast.com/information/manifest

Defines the structure for the 'data' property used in dropdown preferences. It requires an array of objects, where each object must have a 'title' and a 'value'. This is used to populate dropdown menus within Raycast commands.

```json
[
  {"title": "Item 1", "value": "1"},
  {"title": "Item 2", "value": "2"}
]
```

--------------------------------

### showToast API

Source: https://developers.raycast.com/api-reference/feedback/toast

This section details the `showToast` function, used to display toasts with various styles, titles, and messages. It also covers how to update an existing toast.

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
- **options** (Toast.Options) - Required - The options to customize the Toast. See [Toast.Options](#toast.options) for details.

### Request Example
```json
{
  "options": {
    "style": "Toast.Style.Success",
    "title": "Operation Successful",
    "message": "The data has been saved."
  }
}
```

### Response
#### Success Response (200)
- **toast** (Toast) - A Promise that resolves with the shown Toast object, which can be used to update or hide it.

#### Response Example
```json
{
  "toast": {
    "message": "Operation Successful",
    "primaryAction": null,
    "secondaryAction": null,
    "style": "Toast.Style.Success",
    "title": "The data has been saved."
  }
}
```

### Error Handling
- **400 Bad Request**: If the provided options are invalid.
- **500 Internal Server Error**: If an unexpected error occurs during toast display.
```

--------------------------------

### Detail.Metadata.TagList Component API

Source: https://developers.raycast.com/api-reference/user-interface/detail

The Detail.Metadata.TagList component displays a list of tags, each with a text label and an optional color.

```APIDOC
## Detail.Metadata.TagList Component

### Description

A list of tags, each with a text label and an optional color.

### Props

#### title (string) - Optional

The title for the tag list.

#### children (React.ReactNode) - Required

One or more `Detail.Metadata.TagList.Item` components.

### Request Example

```typescript
import { Detail } from "@raycast/api";

<Detail.Metadata.TagList title="Type">
  <Detail.Metadata.TagList.Item text="Electric" color={"#eed535"} />
  <Detail.Metadata.TagList.Item text="Fast" />
</Detail.Metadata.TagList>
```

### Response Example

(UI Component - No direct response body)
```

--------------------------------

### Navigate Back to Raycast Root Search

Source: https://developers.raycast.com/api-reference/window-and-search-bar

Navigates the Raycast interface back to the root search view. This asynchronous function can optionally clear the search bar upon returning to the root. It returns a Promise that resolves when the navigation is complete.

```typescript
import { Detail, popToRoot } from "@raycast/api";
import { useEffect } from "react";
import { setTimeout } from "timers";

export default function Command() {
  useEffect(() => {
    setTimeout(() => {
      popToRoot({ clearSearchBar: true });
    }, 3000);
  }, []);

  return <Detail markdown="See you soon 👋" />;
}

```

```typescript
async function popToRoot(options?: { clearSearchBar?: boolean }): Promise<void>;

```

--------------------------------

### Pagination Data Format for usePromise Hook

Source: https://developers.raycast.com/utilities/react-hooks/usepromise

Defines the expected data structure returned by the async function when using pagination with the usePromise hook. It includes the fetched data, a boolean indicating if more data is available, and an optional cursor for cursor-based pagination.

```ts
{
  data: any[];
  hasMore: boolean;
  cursor?: any;
}
```

--------------------------------

### Accessing Launch Arguments in Raycast Commands (TypeScript)

Source: https://developers.raycast.com/information/lifecycle

This code illustrates how to access various launch properties, such as fallback text, through the `LaunchProps` object passed to the command's default function. It requires the '@raycast/api' library.

```typescript
import { Detail, LaunchProps } from "@raycast/api";

// Access the different launch properties via the argument passed to the function
export default function Command(props: LaunchProps) {
  return <Detail markdown={props.fallbackText || "# Hello"} />;
}
```

--------------------------------

### Migrate List.Item accessoryIcon to accessories prop

Source: https://developers.raycast.com/misc/migration/v1.31.0

Shows the migration process for a List.Item using the deprecated 'accessoryIcon' prop to the new 'accessories' prop. The 'accessoryIcon' value is now passed within an object in the 'accessories' array, keyed by 'icon'.

```typescript
<List.Item title="List item with accessory icon" accessoryIcon={getAccessoryIcon()} />
// becomes
<List.Item title="List item with accessory icon" accessories={[{ icon: getAccessoryIcon() }]}
```

--------------------------------

### Grid Dropdown Configuration Options

Source: https://developers.raycast.com/api-reference/user-interface/grid

Defines the properties for configuring a Raycast Grid.Dropdown component. These include callbacks for selection and search changes, placeholder text, value persistence, event throttling, and the current value.

```typescript
interface DropdownProps {
  onChange?: (newValue: string) => void;
  onSearchTextChange?: (text: string) => void;
  placeholder?: string;
  storeValue?: boolean;
  throttle?: boolean;
  value?: string;
}
```

--------------------------------

### Form Validation with useForm Hook in React

Source: https://developers.raycast.com/information/best-practices

Demonstrates how to use the `useForm` hook from `@raycast/utils` for declarative form validation. It defines validation rules for required fields and custom password complexity directly within the hook configuration. This approach simplifies error handling and submission logic.

```tsx
import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";
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
      name: FormValidation.Required,
      password: (value) => {
        if (value && value.length < 8) {
          return "Password must be at least 8 symbols";
        } else if (!value) {
          return "The item is required";
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
      <Form.TextField title="Full Name" placeholder="Tim Cook" {...itemProps.name} />
      <Form.PasswordField title="New Password" {...itemProps.password} />
    </Form>
  );
}
```

--------------------------------

### ItemWithTitle.tsx

Source: https://developers.raycast.com/api-reference/menu-bar-commands

Demonstrates creating a disabled menu bar item using only the 'title' prop.

```APIDOC
## POST /websites/developers_raycast/ItemWithTitle

### Description
This endpoint demonstrates creating a disabled menu bar item using only the `title` prop. This is useful for creating section titles within the menu bar.

### Method
POST

### Endpoint
/websites/developers_raycast/ItemWithTitle

### Parameters
#### Request Body
- **title** (string) - Required - The main title displayed for this item.

### Request Example
```json
{
  "title": "Raycast.com"
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

### Form.TagPicker.Item Imperative API Methods

Source: https://developers.raycast.com/api-reference/user-interface/form

Provides imperative methods to control the state of a Form.TagPicker.Item. The `focus` method requests focus for the item, and the `reset` method restores it to its initial or default value.

```typescript
focus: () => void;
reset: () => void;
```

--------------------------------

### Launch View Command in Raycast (TypeScript)

Source: https://developers.raycast.com/information/lifecycle

This snippet demonstrates how to export a React component as the default function to render the main UI for a view command in Raycast. It uses the '@raycast/api' library.

```typescript
import { Detail } from "@raycast/api";

// Returns the main React component for a view command
export default function Command() {
  return <Detail markdown="# Hello" />;
}
```

--------------------------------

### ItemWithTitleAndIcon.tsx

Source: https://developers.raycast.com/api-reference/menu-bar-commands

Shows how to create a disabled menu bar item with both a 'title' and an 'icon' prop.

```APIDOC
## POST /websites/developers_raycast/ItemWithTitleAndIcon

### Description
This endpoint demonstrates creating a disabled menu bar item that includes both a `title` and an `icon` prop. This provides a visual identifier for the menu item.

### Method
POST

### Endpoint
/websites/developers_raycast/ItemWithTitleAndIcon

### Parameters
#### Request Body
- **title** (string) - Required - The main title displayed for this item.
- **icon** (string) - Optional - The icon to display for this item.

### Request Example
```json
{
  "title": "Raycast.com",
  "icon": "raycast.png"
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

### Handle Argument Changes with keepPreviousData in React

Source: https://developers.raycast.com/utilities/react-hooks/useexec

Demonstrates how to use `keepPreviousData` to prevent UI flickering when arguments change in a React component using a custom hook `useExec`. This prevents the UI from showing initial data when new arguments are introduced.

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

### Create a Disabled MenuBarExtra Submenu (TypeScript)

Source: https://developers.raycast.com/api-reference/menu-bar-commands

Demonstrates how to create a submenu that appears disabled because it contains no child menu items. This is achieved by rendering a `MenuBarExtra.Submenu` component without any nested `MenuBarExtra.Item` or `MenuBarExtra.Submenu` elements.

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

### Toggle Spotify Play/Pause using AppleScript

Source: https://developers.raycast.com/examples/spotify-controls

This snippet shows how to toggle the play/pause state of the Spotify macOS app using AppleScript. It utilizes the 'run-applescript' package to execute the script. No specific inputs are required, and the output is the change in Spotify's playback state.

```typescript
import { runAppleScript } from "run-applescript";

export default async function Command() {
  await runAppleScript('tell application "Spotify" to playpause');
}
```

--------------------------------

### Use Navigation Hook in TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/navigation

The useNavigation hook provides push and pop functions to manage the navigation stack. It's typically used within React components to control view transitions. The push function takes a React node and an optional callback, while pop removes the current view.

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

### List.Item.Detail.Metadata.TagList.Item

Source: https://developers.raycast.com/api-reference/user-interface/list

Represents a tag within a List.Item's metadata tag list. It can display text, an icon, and handle click actions.

```APIDOC
## List.Item.Detail.Metadata.TagList.Item

### Description
A Tag in a `List.Item.Detail.Metadata.TagList`.

### Props

#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- **color** (Color.ColorLike) - Required/Optional - Changes the text color to the provided color and sets a transparent background with the same color.
- **icon** (Image.ImageLike) - Required/Optional - The optional icon tag icon. Required if the tag has no text.
- **onAction** (() => void) - Required/Optional - Callback that is triggered when the item is clicked.
- **text** (string) - Required/Optional - The optional tag text. Required if the tag has no icon.

### Request Example
```json
{
  "example": "Not applicable for UI components"
}
```

### Response
#### Success Response (200)
- None

#### Response Example
```json
{
  "example": "Not applicable for UI components"
}
```
```

--------------------------------

### Store OAuth Token Set

Source: https://developers.raycast.com/api-reference/oauth

Stores the received token response, which includes access and refresh tokens. Once stored, Raycast automatically adds a logout preference for the extension. This method can also accept `OAuth.TokenSetOptions`.

```typescript
await client.setTokens(tokenResponse);
```

--------------------------------

### popToRoot

Source: https://developers.raycast.com/api-reference/window-and-search-bar

Navigates the navigation stack back to the root search view. It can optionally clear the search bar.

```APIDOC
## POST /popToRoot

### Description
Pops the navigation stack back to the root search. This action can optionally clear the search bar, providing a clean slate for the user.

### Method
POST

### Endpoint
/popToRoot

### Parameters
#### Query Parameters
- **clearSearchBar** (boolean) - Optional - Clears the text in the search bar after popping to root.

### Response
#### Success Response (200)
- **void** - Resolves when Raycast has popped back to root.

### Request Example
```json
{
  "options": {
    "clearSearchBar": true
  }
}
```

### Response Example
```json
null
```
```

--------------------------------

### Check Node Environment in TypeScript

Source: https://developers.raycast.com/basics/debug-an-extension

This snippet demonstrates how to check if the extension is running in the Node development environment using the `process.env.NODE_ENV` variable. This is useful for enabling additional debugging information or features specific to development.

```typescript
if (process.env.NODE_ENV === "development") {
  // running in development Node environment
}
```

--------------------------------

### Show Confirmation Alert with TypeScript

Source: https://developers.raycast.com/api-reference/feedback/alert

Demonstrates how to use the `confirmAlert` function from the `@raycast/api` library to display a confirmation dialog to the user. It returns a boolean indicating whether the user confirmed the action. This is useful for critical operations where user confirmation is required.

```typescript
import { confirmAlert } from "@raycast/api";

export default async function Command() {
  if (await confirmAlert({ title: "Are you sure?" })) {
    console.log("confirmed");
    // do something
  } else {
    console.log("canceled");
  }
}
```

--------------------------------

### Grid with Custom Empty View in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/grid

Demonstrates how to implement a custom empty view for the Raycast Grid component, displayed when no search results are found or the grid is initially empty. It uses `useEffect` to log search text changes.

```typescript
import { useEffect, useState } from "react";
import { Grid, Image } from "@raycast/api";

export default function CommandWithCustomEmptyView() {
  const [state, setState] = useState({
    searchText: "",
    items: [] as { content: Image.ImageLike; title: string }[],
  });

  useEffect(() => {
    console.log("Running effect after state.searchText changed. Current value:", JSON.stringify(state.searchText));
    // perform an API call that eventually populates `items`.
  }, [state.searchText]);

  return (
    <Grid onSearchTextChange={(newValue) => setState((previous) => ({ ...previous, searchText: newValue }))}>
      {state.searchText === "" && state.items.length === 0 ? (
        <Grid.EmptyView icon={{ source: "https://placekitten.com/500/500" }} title="Type something to get started" />
      ) : (
        state.items.map((item, index) => <Grid.Item key={index} content={item.content} title={item.title} />)
      )}
    </Grid>
  );
}
```

--------------------------------

### Enable ESM Imports in Raycast Extensions (TypeScript)

Source: https://developers.raycast.com/faq

This configuration enables the use of ECMAScript Modules (ESM) in Raycast extensions. It requires specific settings in `package.json` and `tsconfig.json`, along with adjustments to import paths and Node.js built-in module usage.

```json
{
  "type": "module"
}
```

```json
{
  "compilerOptions": {
    "module": "node16",
    "moduleResolution": "node16"
  }
}
```

--------------------------------

### Clipboard.readText

Source: https://developers.raycast.com/api-reference/clipboard

Reads the clipboard content specifically as plain text. Supports accessing clipboard history via an offset.

```APIDOC
## GET /clipboard/read/text

### Description
Reads the clipboard as plain text.

### Method
GET

### Endpoint
/clipboard/read/text

### Parameters
#### Query Parameters
- **offset** (number) - Optional - Specify an offset to access the Clipboard History. Minimum value is 0, maximum value is 5.

### Response
#### Success Response (200)
- **text** (string | undefined) - The plain text content of the clipboard, or undefined if no text is found.

#### Response Example
```json
{
  "text": "This is plain text."
}
```
```

--------------------------------

### File Picker Form Item for File Selection

Source: https://developers.raycast.com/misc/changelog

Introduces a new Form Item, `Form.FilePicker`, enabling users to select one or multiple files or directories. This is useful for commands that require file or directory inputs.

```javascript
Form.FilePicker({
  title: "Select Files",
  allowMultipleSelection: true,
  canChooseDirectories: true
});
```

--------------------------------

### Create External Extension Deeplink (TypeScript)

Source: https://developers.raycast.com/utilities/functions/createdeeplink

Generates a deeplink for a command in a different Raycast extension. Requires owner/author name, extension name, command name, and can include launch type, arguments, and fallback text.

```typescript
function createDeeplink(options: {
  type?: DeeplinkType.Extension,
  ownerOrAuthorName: string,
  extensionName: string,
  command: string,
  launchType?: LaunchType,
  arguments?: LaunchProps["arguments"],
  fallbackText?: string,
}): string;
```

--------------------------------

### Enable Background Refresh for Menu Bar Command

Source: https://developers.raycast.com/api-reference/menu-bar-commands

Adds the `interval` property to the command configuration in `package.json` to enable background refresh. This allows the menu bar command to update automatically at a specified frequency (e.g., '5m' for 5 minutes).

```json
{
  "name": "github-pull-requests",
  "title": "Pull Requests",
  "subtitle": "GitHub",
  "description": "See your GitHub pull requests at a glance",
  "mode": "menu-bar",
  "interval": "5m"
}
```

--------------------------------

### Leverage Automated Types for Command Arguments

Source: https://developers.raycast.com/misc/migration/v1.50.0

This snippet illustrates how to update command function signatures to use the automatically generated TypeScript types for arguments. It replaces manual type definitions with the generated `Arguments.CommandName` type for better type safety and code clarity.

```diff
'... 
- export default function Command(props: LaunchProps<{ arguments: { input: string } }>) {
+ export default function Command(props: LaunchProps<{ arguments: Arguments.CommandName }>)'
```

--------------------------------

### Adjusting Import Paths for ESM in Raycast Extensions

Source: https://developers.raycast.com/faq

When using ESM in Raycast extensions, all relative import paths must include the file extension, even for TypeScript files. Additionally, Node.js built-in modules should be imported using the `node:` protocol.

```typescript
// Incorrect import
// import x from '.';

// Correct import for local files
import x from './index.js';

// Correct import for Node.js built-in modules
import fs from 'node:fs';
import path from 'node:path';

// Namespace usage is discouraged, use export instead
// namespace MyNamespace { ... }
// export { MyNamespace };

```

--------------------------------

### Implement Caching with withCache (TypeScript)

Source: https://developers.raycast.com/utilities/functions/withcache

The `withCache` higher-order function from `@raycast/utils` enables caching for asynchronous functions. It accepts the function to be cached and an optional configuration object for cache validation and maximum age. The returned function includes a `clearCache` method.

```tsx
import { withCache } from "@raycast/utils";

function fetchExpensiveData(query) {
  // ... implementation to fetch data
  return Promise.resolve({ data: "some data" });
}

const cachedFunction = withCache(fetchExpensiveData, {
  maxAge: 5 * 60 * 1000, // Cache for 5 minutes
  validate: (data) => {
    // Example validation: check if data is not null or undefined
    return data !== null && data !== undefined;
  }
});

async function run() {
  const query = "example";
  const result = await cachedFunction(query);
  console.log(result);

  // To clear the cache for this specific function:
  // cachedFunction.clearCache(); 
}
```

--------------------------------

### Check Development Version in TypeScript

Source: https://developers.raycast.com/basics/debug-an-extension

This code shows how to determine if the Raycast extension is the local development version or the store version using the `environment.isDevelopment` property. This is crucial for differentiating between local testing and the published extension.

```typescript
import { environment } from "@raycast/api";

if (environment.isDevelopment) {
  // running the development version
}
```

--------------------------------

### Detail.Metadata.Label Component API

Source: https://developers.raycast.com/api-reference/user-interface/detail

The Detail.Metadata.Label component displays a single value, optionally with an icon.

```APIDOC
## Detail.Metadata.Label Component

### Description

A single value with an optional icon.

### Props

#### title (string) - Required

The title for the label.

#### text (string) - Required

The text content of the label.

#### icon (string) - Optional

The icon to display next to the label. Can be a built-in Raycast icon or a custom `NSImage` name.

### Request Example

```typescript
import { Detail } from "@raycast/api";

<Detail.Metadata.Label title="Height" text={`1' 04"`} icon="height.png" />
```

### Response Example

(UI Component - No direct response body)
```

--------------------------------

### Create OAuth Authorization Request

Source: https://developers.raycast.com/api-reference/oauth

Generates an authorization request object containing parameters like code challenge, verifier, state, and redirect URI. These values are standard for OAuth authorization requests and are obtained from your provider's documentation.

```typescript
const authRequest = await client.authorizationRequest({
  endpoint: "https://twitter.com/i/oauth2/authorize",
  clientId: "YourClientId",
  scope: "tweet.read users.read follows.read",
});
```

--------------------------------

### Execute PowerShell Script with runPowerShellScript

Source: https://developers.raycast.com/utilities/functions/runpowershellscript

This function executes a given PowerShell script. It supports optional configurations for aborting the script via an AbortSignal, setting a timeout, and customizing the output parsing. By default, it returns the script's stdout as a string. This function is only available on Windows.

```typescript
import { showHUD } from "@raycast/api";
import { runPowerShellScript } from "@raycast/utils";

export default async function () {
  const res = await runPowerShellScript(
    `
Write-Host "hello, world."
`,
  );
  await showHUD(res);
}
```

--------------------------------

### Image API Interfaces (JavaScript)

Source: https://developers.raycast.com/migration/v1.28.0

Details the new `Image` namespace for image-related interfaces, such as image sources and masks. `Icon` remains a top-level export. Deprecated interface names are included.

```javascript
import { Image } from "@raycast/api";

// deprecated ImageLike
Image.ImageLike;

// deprecated ImageSource
Image.Source;

// deprecated ImageMask
Image.Mask;
```

--------------------------------

### Display Hacker News Stories in List (TypeScript)

Source: https://developers.raycast.com/examples/hacker-news

Completes the Hacker News Raycast extension by rendering the fetched stories in a list. It maps over the 'items' state, passing each story to the 'StoryListItem' component for display. The list is shown only after the stories have been loaded.

```typescript
export default function Command() {
  const [state, setState] = useState<State>({});

  // ... (fetchStories logic)

  return (
    <List isLoading={!state.items && !state.error}>
      {state.items?.map((item, index) => (
        <StoryListItem key={item.guid} item={item} index={index} />
      ))}
    </List>
  );
}

```

--------------------------------

### Action.OpenInBrowser

Source: https://developers.raycast.com/api-reference/user-interface/actions

An action that opens a given URL in the default browser.

```APIDOC
## POST /websites/developers_raycast/actions/open-in-browser

### Description
Opens a specified URL in the user's default web browser.

### Method
POST

### Endpoint
/websites/developers_raycast/actions/open-in-browser

### Parameters
#### Query Parameters
- **url** (string) - Required - The URL to open.
- **icon** (Image.ImageLike) - Optional - The icon displayed for the Action.
- **shortcut** (Keyboard.Shortcut) - Optional - The optional keyboard shortcut for the Action.
- **title** (string) - Optional - An optional title for the Action.

#### Request Body
None

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

### OAuth TokenResponse

Source: https://developers.raycast.com/api-reference/oauth

Defines the standard JSON response for an OAuth token request. This response can be directly used to store a TokenSet.

```APIDOC
## OAuth.TokenResponse

### Description
Defines the standard JSON response for an OAuth token request. The response can be directly used to store a [TokenSet](#oauth.tokenset) via [setTokens](#oauth.pkceclient-settokens).

### Parameters
#### Response Body
- **access_token** (string) - Required - The `access_token` value returned by an OAuth token request.
- **expires_in** (number) - Optional - An optional `expires_in` value (in seconds) returned by an OAuth token request.
- **id_token** (string) - Optional - An optional `id_token` value returned by an identity request (e.g. /me, Open ID Connect).
- **refresh_token** (string) - Optional - An optional `refresh_token` value returned by an OAuth token request.
- **scope** (string) - Optional - The optional `scope` value returned by an OAuth token request.

### Response Example
```json
{
  "access_token": "string",
  "expires_in": 3600,
  "id_token": "string",
  "refresh_token": "string",
  "scope": "string"
}
```
```

--------------------------------

### Clipboard Copy with Transient Option

Source: https://developers.raycast.com/misc/changelog

Introduces a `transient` option to the `Clipboard.copy` method. This option allows developers to control whether the copied content remains in the clipboard temporarily or permanently, affecting user experience and data persistence.

```javascript
import { Clipboard } from '@raycast/api';

async function copyTransiently(text) {
  await Clipboard.copy(text, { transient: true });
}
```

--------------------------------

### Action.Trash

Source: https://developers.raycast.com/api-reference/user-interface/actions

Action that moves a file or folder to the Trash. This action is used to delete files or directories.

```APIDOC
## Action.Trash

### Description
Action that moves a file or folder to the Trash. This action is used to delete files or directories.

### Method
N/A (Component within ActionPanel)

### Endpoint
N/A (Component within ActionPanel)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
* **paths** (string | string[]) - Required - The path or an array of paths to the file(s) or folder(s) to move to the Trash.
* **icon** (Image.ImageLike) - Optional - A optional icon displayed for the Action.
* **onShow** ( (path: "fs".PathLike) => void ) - Optional - Callback when the file or folder was shown in the Finder.
* **shortcut** (Keyboard.Shortcut) - Optional - The keyboard shortcut for the Action.
* **title** (string) - Optional - An optional title for the Action.

### Request Example
```typescript
import { ActionPanel, Detail, Action } from "@raycast/api";
import { homedir } from "os";

const FILE = `${homedir()}/Downloads/get-rid-of-me.txt`;

export default function Command() {
  return (
    <Detail
      markdown="Some spring cleaning?"
      actions={
        <ActionPanel>
          <Action.Trash paths={FILE} />
        </ActionPanel>
      }
    />
  );
}
```

### Response
#### Success Response (N/A)
This component performs an action and does not return a value directly.

#### Response Example
N/A
```

--------------------------------

### Grid Aspect Ratio and Layout Configuration

Source: https://developers.raycast.com/misc/changelog

The Grid component now supports new aspect ratios (4/3, 3/4) and layout properties (`columns`, `fit`). Additionally, Grid Sections can now individually override these layout properties, offering more flexibility in visual presentation.

```javascript
Grid({
  aspectRatio: "4/3",
  columns: 3
});

Grid.Section({
  columns: 2,
  fit: true
});
```

--------------------------------

### Form.DatePicker

Source: https://developers.raycast.com/api-reference/user-interface/form

A form item component that allows users to select a date. It supports both controlled and uncontrolled modes.

```APIDOC
## Form.DatePicker

### Description
A form item with a date picker.

### Properties

#### Common Properties (inherited from Form.Item)

- **id** (string) - Required - A unique identifier for the form item.
- **title** (string) - Required - The title displayed on the left side of the item.
- **defaultValue** (Date) - Optional - The initial value of the date picker.
- **value** (Date | null) - Optional - The current value of the date picker in controlled mode.
- **onChange** (callback) - Optional - The callback triggered when the date value changes.
  - Signature: `(newValue: Date | null) => void`
- **storeValue** (boolean) - Optional - Indicates whether the value should be persisted.

#### Methods (Imperative API)

- **focus** - `() => void` - Makes the date picker request focus.
- **reset** - `() => void` - Resets the date picker to its initial or default value.

### Request Example

#### Uncontrolled Date Picker
```typescript
import { ActionPanel, Form, Action } from "@raycast/api";

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Form" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.DatePicker id="dateOfBirth" title="Date of Birth" defaultValue={new Date(1955, 1, 24)} />
    </Form>
  );
}
```

#### Controlled Date Picker
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

### Response

#### Success Response (200)

- **values** (object) - Contains the submitted form values, including the date selected from the DatePicker.

#### Response Example

```json
{
  "dateOfBirth": "1955-02-24T08:00:00.000Z"
}
```
```

--------------------------------

### Using Raycast Color Types in List Items (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/colors

Demonstrates how to use various Raycast color types (built-in, raw, and dynamic) for tinting icons in a List component. It shows the basic structure for defining List items with different color inputs.

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
            adjustContrast: true,
          },
        }}
      />
    </List>
  );
}
```

--------------------------------

### Render Hacker News Story List Item (TypeScript)

Source: https://developers.raycast.com/examples/hacker-news

Renders a single story item in a list format for the Hacker News Raycast extension. It displays the story's title, creator, points, and comments, along with a numerical icon for ranking. Helper functions are used to extract specific data points from the item's content.

```typescript
function StoryListItem(props: { item: Parser.Item; index: number }) {
  const icon = getIcon(props.index + 1);
  const points = getPoints(props.item);
  const comments = getComments(props.item);

  return (
    <List.Item
      icon={icon}
      title={props.item.title ?? "No title"}
      subtitle={props.item.creator}
      accessories={[{ text: `👍 ${points}` }, { text: `💬  ${comments}` }]}
    />
  );
}

const iconToEmojiMap = new Map<number, string>([
  [1, "1️⃣"],
  [2, "2️⃣"],
  [3, "3️⃣"],
  [4, "4️⃣"],
  [5, "5️⃣"],
  [6, "6️⃣"],
  [7, "7️⃣"],
  [8, "8️⃣"],
  [9, "9️⃣"],
  [10, "🔟"],
]);

function getIcon(index: number) {
  return iconToEmojiMap.get(index) ?? "⏺";
}

function getPoints(item: Parser.Item) {
  const matches = item.contentSnippet?.match(/(?<=Points:\s*)(\d+)/g);
  return matches?.[0];
}

function getComments(item: Parser.Item) {
  const matches = item.contentSnippet?.match(/(?<=Comments:\s*)(\d+)/g);
  return matches?.[0];
}

```

--------------------------------

### Form.TagPicker.Item Properties

Source: https://developers.raycast.com/api-reference/user-interface/form

Defines the configurable properties for a Form.TagPicker.Item. These include callbacks for value changes and focus events, placeholder text, value persistence settings, the item's title, and its current value.

```typescript
onChange: (newValue: string[]) => void;
onFocus: (event: FormEvent<string[]>) => void;
placeholder: string;
storeValue: boolean;
title: string;
value: string[];
```

--------------------------------

### Enable Markdown Code Block Syntax Highlighting

Source: https://developers.raycast.com/misc/changelog

Enables syntax highlighting for Markdown code blocks within Raycast extensions. To activate this feature, developers must explicitly specify the programming language at the beginning of each code block.

```markdown
```javascript
console.log('Hello, World!');
```
```

--------------------------------

### Accessing Preferences

Source: https://developers.raycast.com/api-reference/preferences

Commands receive preference values through the `getPreferenceValues` function, which returns an object mapping preference names to their values. The type of the value depends on the preference type.

```APIDOC
## Accessing Preferences

### Description
Commands receive the values of their preferences via the `getPreferenceValues` function. This function returns an object where the keys are the preference names and the values are their corresponding settings.

### Method
N/A (This is a function call within your command code)

### Endpoint
N/A

### Parameters
N/A

### Request Example
```javascript
const preferences = getPreferenceValues();
// Example: If you have a 'username' textfield preference
const username = preferences.username;
```

### Response
#### Success Response (Object containing preference values)
- **preferenceName** (type) - The value of the preference.

**Preference Type Mapping:**
| Preference type | Value type                                                            |
| --------------- | --------------------------------------------------------------------- |
| `textfield`     | `string`                                                              |
| `password`      | `string`                                                              |
| `checkbox`      | `boolean`                                                             |
| `dropdown`      | `string`                                                              |
| `appPicker`     | [`Application`](https://developers.raycast.com/utilities#application) |
| `file`          | `string`                                                              |
| `directory`     | `string`                                                              |

#### Response Example
```json
{
  "username": "john_doe",
  "enableNotifications": true,
  "theme": "dark"
}
```

### TypeScript Integration
Raycast provides a global TypeScript namespace called `Preferences` for type safety. You can specify the return type of `getPreferenceValues` for better autocompletion and type checking.

#### Request Example
```typescript
// Assuming your manifest defines preferences for a command named 'show-todos'
interface ShowTodosPreferences {
  taskTitle: string;
  priority: "high" | "medium" | "low";
}

const preferences = getPreferenceValues<ShowTodosPreferences>();
const taskTitle: string = preferences.taskTitle;
```
```

--------------------------------

### Adjusting Import Statements for Default Exports in Node.js

Source: https://developers.raycast.com/misc/changelog

This snippet demonstrates how to adjust import statements when the build tool's heuristics for handling default exports change. It specifically addresses scenarios where a library, like 'caniuse-api', might not have a direct default export in a Node environment and requires a namespace import.

```javascript
import caniuse from "caniuse-api"
// has to be changed to
import * as caniuse from "caniuse-api"
```

--------------------------------

### Fetch Hacker News Top Stories (TypeScript)

Source: https://developers.raycast.com/examples/hacker-news

Fetches the top stories from Hacker News using an RSS feed. It relies on the 'rss-parser' library to parse the feed content. The function returns an array of story items or an error if the fetch fails. This code is intended for use within a Raycast extension.

```typescript
import { Action, ActionPanel, List, showToast, Toast, Keyboard } from "@raycast/api";
import { useEffect, useState } from "react";
import Parser from "rss-parser";

const parser = new Parser();

interface State {
  items?: Parser.Item[];
  error?: Error;
}

export default function Command() {
  const [state, setState] = useState<State>({});

  useEffect(() => {
    async function fetchStories() {
      try {
        const feed = await parser.parseURL("https://hnrss.org/frontpage?description=0&count=25");
        setState({ items: feed.items });
      } catch (error) {
        setState({
          error: error instanceof Error ? error : new Error("Something went wrong"),
        });
      }
    }

    fetchStories();
  }, []);

  console.log(state.items); // Prints stories

  return <List isLoading={!state.items && !state.error} />;
}

```

--------------------------------

### Run PowerShell Script Utility in JavaScript

Source: https://developers.raycast.com/misc/changelog

Introduces the `runPowerShellScript` function within the `@raycast/utils` package, enabling cross-platform execution of PowerShell scripts. This utility is part of the effort to make Raycast extensions more compatible across different operating systems.

```javascript
import { runPowerShellScript } from "@raycast/utils";

// Example usage:
// await runPowerShellScript("Get-Process");
```

--------------------------------

### Detail.Metadata.TagList.Item Component API

Source: https://developers.raycast.com/api-reference/user-interface/detail

Represents a single tag within a Detail.Metadata.TagList.

```APIDOC
## Detail.Metadata.TagList.Item Component

### Description

Represents a single tag within a `Detail.Metadata.TagList`.

### Props

#### text (string) - Required

The text label for the tag.

#### color (string) - Optional

The color of the tag. Accepts hex color codes (e.g., `#eed535`).

### Request Example

```typescript
import { Detail } from "@raycast/api";

<Detail.Metadata.TagList.Item text="Electric" color={"#eed535"} />
```

### Response Example

(UI Component - No direct response body)
```

--------------------------------

### AsyncState Type Definitions for Data Fetching

Source: https://developers.raycast.com/utilities/react-hooks/usesql

These TypeScript types define the possible states of an asynchronous operation, including initial loading, success, error, and reloading states. They are crucial for managing the UI feedback during data fetching and mutations.

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
  data: T,
  error: undefined
}

// Error State
{
  isLoading: false,
  data: undefined,
  error: Error
}

// Reloading State
{
  isLoading: true,
  data: T | undefined,
  error: Error | undefined
}

```

--------------------------------

### Image.ImageLike

Source: https://developers.raycast.com/api-reference/user-interface/icons-and-images

Defines the ImageLike type, a union of supported image representations including URL, Asset, Icon, and FileIcon.

```APIDOC
## Image.ImageLike

### Description
Union type for the supported image types.

### Type Definition
```typescript
ImageLike: URL | Asset | Icon | FileIcon | Image;
```

### Example
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
```

--------------------------------

### Image.Fallback

Source: https://developers.raycast.com/api-reference/user-interface/icons-and-images

Explains the Image.Fallback type, used to provide a fallback image when the primary source fails to load.

```APIDOC
## Image.Fallback

### Description
A fallback [Image](#image) that will be displayed in case the source image cannot be loaded. Can be either a local file resource, a built-in [Icon](#icon), a single emoji, or a theme-aware asset. Any specified `mask` or `tintColor` will also apply to the fallback image.

### Type Definition
```typescript
Image.Fallback: Asset | Icon | { light: Asset; dark: Asset }
```

### Example
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
```

--------------------------------

### Push a new view with Action.Push in TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/actions

Demonstrates how to use Action.Push to add a new view to the navigation stack. It requires a target React Node and a title. Optional props include icon, onPop, onPush, and shortcut.

```typescript
import { ActionPanel, Detail, Action } from "@raycast/api";

function Ping() {
  return (
    <Detail
      markdown="Ping"
      actions={
        <ActionPanel>
          <Action.Push title="Push Pong" target={<Pong />} />
        </ActionPanel>
      }
    />
  );
}

function Pong() {
  return <Detail markdown="Pong" />;
}

export default function Command() {
  return <Ping />;
}
```

--------------------------------

### ActionPanel.Submenu Properties

Source: https://developers.raycast.com/api-reference/user-interface/action-panel

This section outlines the configurable properties for the ActionPanel.Submenu component.

```APIDOC
## ActionPanel.Submenu Properties

### Description
Properties that can be passed to the `ActionPanel.Submenu` component.

### Method
N/A (Component Properties)

### Endpoint
N/A (Component Properties)

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Properties
- **isLoading** (`boolean`) - Optional - Indicates whether a loading indicator should be shown or hidden next to the search bar.
- **onOpen** (`() => void`) - Optional - Callback that is triggered when the Submenu is opened. This callback can be used to fetch its content lazily.
- **onSearchTextChange** (`(text: string) => void`) - Optional - Callback triggered when the search bar text changes.
- **shortcut** (`Keyboard.Shortcut`) - Optional - The keyboard shortcut for the submenu.
- **throttle** (`boolean`) - Optional - Defines whether the `onSearchTextChange` handler will be triggered on every keyboard press or with a delay for throttling the events. Recommended to set to `true` when using custom filtering logic with asynchronous operations (e.g. network requests).

### Request Example
```json
{
  "isLoading": true,
  "onOpen": "() => fetchSubmenuContent().then(setContent)",
  "onSearchTextChange": "(text) => console.log(text)",
  "shortcut": {
    "key": "enter",
    "modifiers": ["cmd"]
  },
  "throttle": true
}
```

### Response
#### Success Response (200)
N/A (Component Properties)

#### Response Example
N/A (Component Properties)
```

--------------------------------

### usePromise Hook

Source: https://developers.raycast.com/utilities/react-hooks/usepromise

This hook wraps an asynchronous function or a function that returns a Promise, providing the AsyncState corresponding to the execution of the function. The function is assumed to be constant; changing it won't trigger a revalidation.

```APIDOC
## usePromise Hook

### Description
Wraps an asynchronous function or a function that returns a Promise and returns the [AsyncState](#asyncstate) corresponding to the execution of the function. The function is assumed to be constant (eg. changing it won't trigger a revalidation).

### Method
`usePromise<T>(
  fn: T,
  args?: Parameters<T>,
  options?: {
    abortable?: RefObject<AbortController | null | undefined>;
    execute?: boolean;
    onError?: (error: Error) => void;
    onData?: (data: Result<T>) => void;
    onWillExecute?: (args: Parameters<T>) => void;
    failureToastOptions?: Partial<Pick<Toast.Options, "title" | "primaryAction" | "message">>;
  },
): AsyncState<Result<T>> & { revalidate: () => void; mutate: MutatePromise<Result<T> | undefined>; };

### Parameters
#### Function Argument (`fn`)
- `fn` (Function): An asynchronous function or a function that returns a Promise.

#### Arguments (`args`)
- `args` (Array, Optional): The array of arguments to pass to the function. Every time they change, the function will be executed again. Can be omitted if the function doesn't require arguments.

#### Options (`options`)
- `options.abortable` (RefObject<AbortController | null | undefined>, Optional): A reference to an [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) to cancel a previous call when triggering a new one.
- `options.execute` (Boolean, Optional): A boolean to indicate whether to actually execute the function or not. Useful when arguments depend on values not immediately available.
- `options.onError` (Function, Optional): A function called when an execution fails. Defaults to logging the error and showing a generic failure toast.
- `options.onData` (Function, Optional): A function called when an execution succeeds.
- `options.onWillExecute` (Function, Optional): A function called when an execution will start.
- `options.failureToastOptions` (Object, Optional): Options to customize the title, message, and primary action of the failure toast.

### Returns
An object containing:
- `data` (any): The data returned by the Promise.
- `error` (Error): The error if the Promise rejects.
- `isLoading` (Boolean): Indicates if the Promise is currently executing.
- `revalidate` (Function): A method to manually call the function with the same arguments again.
- `mutate` (Function): A method to wrap an asynchronous update and control how the `usePromise`'s data is updated during the update process.

### Example
```tsx
import { Detail, ActionPanel, Action } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { useRef } from "react";

export default function Command() {
  const abortable = useRef<AbortController>();
  const { isLoading, data, revalidate } = usePromise(
    async (url: string) => {
      const response = await fetch(url, { signal: abortable.current?.signal });
      const result = await response.text();
      return result;
    },
    ["https://api.example.com"],
    {
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
```

--------------------------------

### Update .gitignore for Raycast Env Definitions

Source: https://developers.raycast.com/misc/migration/v1.50.0

This snippet shows how to update the .gitignore file to exclude the newly generated `raycast-env.d.ts` file from version control. This ensures that generated files are not committed to the repository.

```diff
'+ raycast-env.d.ts'
```

--------------------------------

### confirmAlert

Source: https://developers.raycast.com/api-reference/feedback/alert

Creates and displays a confirmation alert to the user. It's used to ask for user consent before performing irreversible actions.

```APIDOC
## POST /confirmAlert

### Description
Creates and shows a confirmation Alert with the given options. This function is crucial for confirming important user actions, such as deletions, to prevent accidental data loss.

### Method
POST

### Endpoint
/confirmAlert

### Parameters
#### Request Body
- **options** (Alert.Options) - Required - The configuration object for the alert, including title, message, and action definitions.

### Request Example
```json
{
  "options": {
    "title": "Are you sure you want to delete this item?",
    "message": "This action cannot be undone.",
    "primaryAction": {
      "title": "Delete",
      "style": "destructive"
    },
    "secondaryAction": {
      "title": "Cancel"
    }
  }
}
```

### Response
#### Success Response (200)
- **result** (boolean) - Returns `true` if the user confirms the primary action, `false` if the user dismisses the alert or selects the secondary action.

#### Response Example
```json
{
  "result": true
}
```

### Types
#### Alert.Options
Configuration options for the confirmation alert.
- **title** (string) - Required - The main text displayed in the alert.
- **message** (string) - Optional - Additional details or context for the user.
- **primaryAction** (Action) - Optional - The main action button for the alert (e.g., 'Confirm', 'Delete').
- **secondaryAction** (Action) - Optional - An alternative action button (e.g., 'Cancel').

#### Action
Represents an action button within the alert.
- **title** (string) - Required - The text displayed on the action button.
- **onAction** (function) - Optional - A callback function executed when the action is triggered. Note: It's generally more elegant to use the `if (await confirmAlert(...)) { ... }` pattern instead of relying solely on `onAction`.
- **style** (string) - Optional - The visual style of the action button (e.g., 'default', 'destructive').
```

--------------------------------

### Focus Action in ActionPanel with autoFocus Prop

Source: https://developers.raycast.com/misc/changelog

Allows specifying an action to focus when opening an ActionPanel or ActionPanel.Submenu by setting the `autoFocus` prop. This improves user experience by directing focus to a desired action upon panel opening.

```javascript
ActionPanel.open({
  actions: [
    <Action title="Action 1" />,
    <Action title="Action 2" autoFocus />
  ]
});
```

--------------------------------

### Create Intra-Extension Deeplink (TypeScript)

Source: https://developers.raycast.com/utilities/functions/createdeeplink

Generates a deeplink for a command within the current Raycast extension. Requires the command name and optionally accepts launch type, arguments, and fallback text.

```typescript
function createDeeplink(options: {
  type?: DeeplinkType.Extension,
  command: string,
  launchType?: LaunchType,
  arguments?: LaunchProps["arguments"],
  fallbackText?: string,
}): string;
```

--------------------------------

### Grid with Sections in Raycast

Source: https://developers.raycast.com/api-reference/user-interface/grid

Shows how to organize Grid items into distinct sections within the Raycast Grid component. Each section can have a title and an optional subtitle.

```typescript
import { Grid } from "@raycast/api";

export default function Command() {
  return (
    <Grid>
      <Grid.Section title="Section 1">
        <Grid.Item content="https://placekitten.com/400/400" title="Item 1" />
      </Grid.Section>
      <Grid.Section title="Section 2" subtitle="Optional subtitle">
        <Grid.Item content="https://placekitten.com/400/400" title="Item 1" />
      </Grid.Section>
    </Grid>
  );
}
```

--------------------------------

### Add onFocus and onBlur Callbacks to Form Items

Source: https://developers.raycast.com/misc/changelog

All form items now support `onFocus` and `onBlur` callbacks. These callbacks can be used to trigger actions or update state when a form item gains or loses focus, enabling more interactive forms.

```javascript
import { Form, ActionPanel, Action } from '@raycast/api';

function InteractiveForm() {
  return (
    <Form>
      <Form.TextField
        title="Input Field"
        onFocus={() => console.log('Field focused')}
        onBlur={() => console.log('Field blurred')}
      />
      <ActionPanel>
        <Action.SubmitForm />
      </ActionPanel>
    </Form>
  );
}
```

--------------------------------

### Action.Push

Source: https://developers.raycast.com/api-reference/user-interface/actions

Action that pushes a new view onto the navigation stack. It requires a target view and a title.

```APIDOC
## Action.Push

### Description
Action that pushes a new view to the navigation stack.

### Method
N/A (Component)

### Endpoint
N/A (Component)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```typescript
import { ActionPanel, Detail, Action } from "@raycast/api";

function Ping() {
  return (
    <Detail
      markdown="Ping"
      actions={
        <ActionPanel>
          <Action.Push title="Push Pong" target={<Pong />} />
        </ActionPanel>
      }
    />
  );
}

function Pong() {
  return <Detail markdown="Pong" />;
}

export default function Command() {
  return <Ping />;
}
```

### Response
#### Success Response (200)
N/A (Component)

#### Response Example
N/A (Component)

### Props
#### `target` (React.ReactNode) - Required
The target view that will be pushed to the navigation stack.

#### `title` (string) - Required
The title displayed for the Action.

#### `icon` (Image.ImageLike) - Optional
The icon displayed for the Action.

#### `onPop` (() => void) - Optional
Callback when the target view will be popped.

#### `onPush` (() => void) - Optional
Callback when the target view was pushed.

#### `shortcut` (Keyboard.Shortcut) - Optional
The keyboard shortcut for the Action.
```

--------------------------------

### Form.Dropdown.Item API

Source: https://developers.raycast.com/api-reference/user-interface/form

Details about the props available for Form.Dropdown.Item, which represents an item within a dropdown menu.

```APIDOC
## Form.Dropdown.Item

### Description
A dropdown item in a [Form.Dropdown](#form.dropdown)

### Props

#### Path Parameters
* None

#### Query Parameters
* None

#### Request Body
* **title** (string) - Required - The title displayed for the item.
* **value** (string) - Required - Value of the dropdown item. Make sure to assign each unique value for each item.
* **icon** (Image.ImageLike) - Optional - A optional icon displayed for the item.
* **keywords** (string[]) - Optional - An optional property used for providing additional indexable strings for search. When filtering the items in Raycast, the keywords will be searched in addition to the title.

### Request Example
```json
{
  "title": "Example Item Title",
  "value": "example_value",
  "icon": "optional_icon_name",
  "keywords": ["search", "filter"]
}
```

### Response
#### Success Response (200)
* **None** - This component is for UI definition and does not have a direct success response.

#### Response Example
```json
{
  "message": "Form.Dropdown.Item configuration applied"
}
```
```

--------------------------------

### Control Data Caching with keepPreviousData in Raycast

Source: https://developers.raycast.com/utilities/react-hooks/usecachedpromise

Demonstrates how to use `keepPreviousData` with `useCachedPromise` to prevent UI flickering when search arguments change. This ensures the previous data is retained if the cache is empty for new arguments.

```tsx
import { useState } from "react";
import { List, ActionPanel, Action } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const { isLoading, data } = useCachedPromise(
    async (url: string) => {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    },
    [`https://api.example?q=${searchText}`],
    {
      // to make sure the screen isn't flickering when the searchText changes
      keepPreviousData: true,
    },
  );

  return (
    <List isLoading={isLoading} searchText={searchText} onSearchTextChange={setSearchText} throttle>
      {(data || []).map((item) => (
        <List.Item key={item.id} title={item.title} />
      ))}
    </List>
  );
}
```

--------------------------------

### List.Section

Source: https://developers.raycast.com/api-reference/user-interface/list

Groups related List.Item elements together within a List, providing structure and organization. It can optionally display a subtitle.

```APIDOC
## List.Section

### Description
A group of related [List.Item](#list.item).

Sections are a great way to structure your list. For example, group GitHub issues with the same status and order them by priority.
This way, the user can quickly access what is most relevant.

### Method
Not applicable (UI Component)

### Endpoint
Not applicable (UI Component)

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- **children** (React.ReactNode) - Required/Optional - The List.Item elements of the section.
- **subtitle** (string) - Required/Optional - An optional subtitle displayed next to the title of the section.
- **title** (string) - Required/Optional - Title displayed above the section.

### Request Example
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
  );
}
```

### Response
#### Success Response (200)
- None

#### Response Example
```json
{
  "example": "Not applicable for UI components"
}
```
```

--------------------------------

### Create Snippet Action in TypeScript

Source: https://developers.raycast.com/api-reference/user-interface/actions

Demonstrates how to use the Action.CreateSnippet component to prefill the Create Snippet command. It requires a snippet object with a 'text' property. This action is typically used within an ActionPanel.

```typescript
import { ActionPanel, Detail, Action } from "@raycast/api";

export default function Command() {
  return (
    <Detail
      markdown="Test out snippet creation"
      actions={
        <ActionPanel>
          <Action.CreateSnippet snippet={{ text: "DE75512108001245126199" }} />
        </ActionPanel>
      }
    />
  );
}
```

--------------------------------

### Clipboard.readText

Source: https://developers.raycast.com/api-reference/clipboard

Reads the current clipboard content as plain text. It supports an optional offset for accessing clipboard history.

```APIDOC
## POST /clipboard/readText

### Description
Reads the current clipboard content as plain text. It supports an optional offset for accessing clipboard history.

### Method
POST

### Endpoint
/clipboard/readText

### Parameters
#### Query Parameters
- **options.offset** (number) - Optional - Specify an offset to access the Clipboard History. Minimum value is 0, maximum value is 5.

### Request Example
```json
{
  "options": {
    "offset": 0
  }
}
```

### Response
#### Success Response (200)
- **text** (string) - The clipboard content as plain text.
- **file** (string) - The path to the file content in the clipboard.
- **html** (string) - The HTML representation of the clipboard content.

#### Response Example
```json
{
  "text": "Copied text content"
}
```
```

--------------------------------

### UI Action Component (JavaScript)

Source: https://developers.raycast.com/migration/v1.28.0

Demonstrates the renaming of `ActionPanel.Item` to `Action` and how specific actions are now nested under `Action`. Deprecated action types are shown.

```javascript
import { Action, List } from '@raycast/api'

// deprecated ActionPanel.Item
<Action title="Action title" onAction={() => {}}>

// deprecated CopyToClipboardAction
<Action.CopyToClipboard content="text">

// deprecated ListProps
List.Props
```

--------------------------------

### withAccessToken Higher-Order Function Signature (TypeScript)

Source: https://developers.raycast.com/utilities/oauth/withaccesstoken

Defines the signature for the `withAccessToken` higher-order function, which takes authorization options and returns a function or component wrapped for token access. It supports generic types for flexibility.

```tsx
function withAccessToken<T = any>(
  options: WithAccessTokenParameters,
): <U extends WithAccessTokenComponentOrFn<T>>(
  fnOrComponent: U,
) => U extends (props: T) => Promise<void> | void ? Promise<void> : React.FunctionComponent<T>;
```

--------------------------------

### Use ColorLike for Grid Item Content

Source: https://developers.raycast.com/misc/changelog

The Grid component now supports `ColorLike` as content for `Grid.Item`. This allows for displaying colors directly within grid items, suitable for color palettes or swatch UIs.

```javascript
import { Grid } from '@raycast/api';

function ColorGrid() {
  return (
    <Grid>
      <Grid.Item
        title="Red"
        content={{ color: '#FF0000' }}
      />
      <Grid.Item
        title="Blue"
        content={{ color: '#0000FF' }}
      />
    </Grid>
  );
}
```

--------------------------------

### Enable Pagination in useCachedPromise (Cursor-based)

Source: https://developers.raycast.com/utilities/react-hooks/usecachedpromise

This snippet shows how to implement cursor-based pagination with useCachedPromise. The asynchronous function returns data, a 'hasMore' flag, and a 'cursor' which is passed to subsequent calls for fetching the next set of results.

```typescript
const { isLoading, data, pagination } = useCachedPromise(
  (searchText: string) => async (options) => {
    const response = await fetch(`https://api.example?q=${searchText}&cursor=${options.cursor}`);
    const { data, nextCursor } = await response.json();
    const hasMore = nextCursor !== undefined;
    return { data, hasMore, cursor: nextCursor };
  },
  [searchText],
  {
    // to make sure the screen isn't flickering when the searchText changes
    keepPreviousData: true,
  },
);
```

--------------------------------

### useCachedPromise Hook Signature and Options

Source: https://developers.raycast.com/utilities/react-hooks/usecachedpromise

Defines the TypeScript signature for the useCachedPromise hook, detailing its generic types, parameters, and options. It outlines how to configure caching, data handling, and error management for asynchronous operations.

```typescript
type Result<T> = `type of the returned value of the returned Promise`;

function useCachedPromise<T, U>(
  fn: T,
  args?: Parameters<T>,
  options?: {
    initialData?: U;
    keepPreviousData?: boolean;
    abortable?: RefObject<AbortController | null | undefined>;
    execute?: boolean;
    onError?: (error: Error) => void;
    onData?: (data: Result<T>) => void;
    onWillExecute?: (args: Parameters<T>) => void;
    failureToastOptions?: Partial<Pick<Toast.Options, "title" | "primaryAction" | "message">>;
  },
): AsyncState<Result<T>> & { 
  revalidate: () => void;
  mutate: MutatePromise<Result<T> | U>;
};
```

--------------------------------

### Grid.Dropdown Properties

Source: https://developers.raycast.com/api-reference/user-interface/grid

This section details the properties available for the Grid.Dropdown component.

```APIDOC
## Grid.Dropdown

### Description
A dropdown component used within the Raycast Grid's search bar accessory.

### Properties

#### `onChange`
- **Type**: `(newValue: string) => void`
- **Description**: Callback triggered when the dropdown selection changes.

#### `onSearchTextChange`
- **Type**: `(text: string) => void`
- **Description**: Callback triggered when the search bar text changes.

#### `placeholder`
- **Type**: `string`
- **Description**: Placeholder text that will be shown in the dropdown search field.

#### `storeValue`
- **Type**: `boolean`
- **Description**: Indicates whether the value of the dropdown should be persisted after selection, and restored next time the dropdown is rendered.

#### `throttle`
- **Type**: `boolean`
- **Description**: Defines whether the `onSearchTextChange` handler will be triggered on every keyboard press or with a delay for throttling the events. Recommended to set to `true` when using custom filtering logic with asynchronous operations (e.g. network requests).

#### `value`
- **Type**: `string`
- **Description**: The currently value of the dropdown.

### Grid.Dropdown.Item

A dropdown item in a [Grid.Dropdown](#grid.dropdown)

#### Example

```typescript
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
```

--------------------------------

### Color API Reference

Source: https://developers.raycast.com/api-reference/user-interface/colors

This section details the standard colors available for use in Raycast components. These colors automatically adapt to the Raycast theme (light or dark) for consistency.

```APIDOC
## Color API

### Description
Provides access to standard colors that automatically adapt to the Raycast theme (light or dark).

### Method
N/A (This is a reference to available color constants)

### Endpoint
N/A

### Parameters
N/A

### Request Example
```typescript
import { Color, Icon, List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item title="Blue" icon={{ source: Icon.Circle, tintColor: Color.Blue }} />
      <List.Item title="Green" icon={{ source: Icon.Circle, tintColor: Color.Green }} />
      <List.Item title="Magenta" icon={{ source: Icon.Circle, tintColor: Color.Magenta }} />
      <List.Item title="Orange" icon={{ source: Icon.Circle, tintColor: Color.Orange }} />
      <List.Item title="Purple" icon={{ source: Icon.Circle, tintColor: Color.Purple }} />
      <List.Item title="Red" icon={{ source: Icon.Circle, tintColor: Color.Red }} />
      <List.Item title="Yellow" icon={{ source: Icon.Circle, tintColor: Color.Yellow }} />
      <List.Item title="PrimaryText" icon={{ source: Icon.Circle, tintColor: Color.PrimaryText }} />
      <List.Item title="SecondaryText" icon={{ source: Icon.Circle, tintColor: Color.SecondaryText }} />
    </List>
  );
}
```

### Response
N/A (This is a reference to available color constants)

### Response Example
N/A
```

--------------------------------

### Detail.Metadata.Separator Component API

Source: https://developers.raycast.com/api-reference/user-interface/detail

Adds a visual separator line within the metadata panel.

```APIDOC
## Detail.Metadata.Separator Component

### Description

Adds a visual separator line within the metadata panel.

### Props

(No props)

### Request Example

```typescript
import { Detail } from "@raycast/api";

<Detail.Metadata.Separator />
```

### Response Example

(UI Component - No direct response body)
```

--------------------------------

### Enable Markdown Highlighting for Form.TextArea

Source: https://developers.raycast.com/misc/changelog

The `Form.TextArea` component now supports markdown highlighting. This feature enhances the editing experience for text areas intended for markdown content by providing syntax highlighting.

```javascript
import { Form, ActionPanel, Action } from '@raycast/api';

function MarkdownTextAreaForm() {
  return (
    <Form>
      <Form.TextArea
        title="Markdown Input"
        info="Supports Markdown syntax highlighting."
      />
      <ActionPanel>
        <Action.SubmitForm />
      </ActionPanel>
    </Form>
  );
}
```

--------------------------------

### Detail.Metadata Component API

Source: https://developers.raycast.com/api-reference/user-interface/detail

The Detail.Metadata component is used to display structured data on the right-hand side of the Detail view.

```APIDOC
## Detail.Metadata Component

### Description

A Metadata view that will be shown in the right-hand-side of the `Detail`. Use it to display additional structured data about the main content shown in the `Detail` view.

### Props

#### children (React.ReactNode) - Required

The elements of the Metadata view. Can include `Detail.Metadata.Label`, `Detail.Metadata.TagList`, `Detail.Metadata.Separator`, and `Detail.Metadata.Link`.

### Request Example

```typescript
import { Detail } from "@raycast/api";

const markdown = "# Pikachu\n\n![](https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png)\n\nPikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.";

export default function Main() {
  return (
    <Detail
      markdown={markdown}
      navigationTitle="Pikachu"
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Height" text={`1' 04"`} />
          <Detail.Metadata.Label title="Weight" text="13.2 lbs" />
          <Detail.Metadata.TagList title="Type">
            <Detail.Metadata.TagList.Item text="Electric" color={"#eed535"} />
          </Detail.Metadata.TagList>
          <Detail.Metadata.Separator />
          <Detail.Metadata.Link title="Evolution" target="https://www.pokemon.com/us/pokedex/pikachu" text="Raichu" />
        </Detail.Metadata>
      }
    />
  );
}
```

### Response Example

(UI Component - No direct response body)
```

--------------------------------

### Define Clipboard Copy Options (TypeScript)

Source: https://developers.raycast.com/api-reference/clipboard

Defines the options available when copying content to the clipboard. The primary option is 'concealed', which prevents the content from being recorded in the Clipboard History.

```typescript
type CopyOptions =
  {
    concealed?: boolean;
  };
```

--------------------------------

### Render Image in Raycast Detail

Source: https://developers.raycast.com/api-reference/user-interface/detail

Renders an image within the Detail view using a markdown image syntax. The image can be from the assets directory or a remote URL.

```typescript
import { Detail } from "@raycast/api";

export default function Command() {
  return <Detail markdown={`![Image Title](example.png)`} />;
}
```

--------------------------------

### FormValidation Type

Source: https://developers.raycast.com/utilities/react-hooks/useform

Details on the FormValidation type, providing shorthands for common validation scenarios.

```APIDOC
### FormValidation

Shorthands for common validation cases.

#### Enumeration members

| Name     | Description                                       |
| -------- | ------------------------------------------------- |
| Required | Show an error when the value of the item is empty |
```

--------------------------------

### Leverage Automated Types for Preferences

Source: https://developers.raycast.com/misc/migration/v1.50.0

This snippet shows how to update the type used for retrieving preference values. It replaces a manually defined preference type with the generated `Preferences.CommandName` type, ensuring consistency and leveraging the automated type generation.

```diff
'... 
- const prefs: { apiKey: string } = getPreferenceValues();
+ const prefs: Preferences.CommandName = getPreferenceValues();'
```

--------------------------------

### Display Pokemon Type in Raycast List Item Detail

Source: https://developers.raycast.com/api-reference/user-interface/list

This TypeScript code snippet demonstrates how to display a Pokemon's type within a List.Item's detail section using Raycast's List component. It utilizes the Metadata.Label component to show the type name and an associated icon.

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

### Custom Filtering with Raycast List

Source: https://developers.raycast.com/api-reference/user-interface/list

Demonstrates how to disable Raycast's default filtering and implement custom filtering logic for List items. This is useful when you need full control over how items are displayed based on user input. It uses `filtering={false}` and `onSearchTextChange` to manage the search state.

```typescript
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

--------------------------------

### Execute SQL Query on SQLite Database (TypeScript)

Source: https://developers.raycast.com/utilities/functions/executesql

Executes a given SQL query on a local SQLite database specified by its path. It returns a Promise that resolves to an array of objects, where each object represents a row from the query result. Ensure the database path and query are correctly formatted.

```typescript
import { closeMainWindow, Clipboard } from "@raycast/api";
import { executeSQL } from "@raycast/utils";

type Message = { body: string; code: string };

const DB_PATH = "/path/to/chat.db";

export default async function Command() {
  const query = `
    SELECT body, code
    FROM message
    ORDER BY date DESC
    LIMIT 1;
  `;

  const messages = await executeSQL<Message>(DB_PATH, query);

  if (messages.length > 0) {
    const latestCode = messages[0].code;
    await Clipboard.paste(latestCode);
    await closeMainWindow();
  }
}
```

--------------------------------

### Log Variables and Messages with Console - TypeScript

Source: https://developers.raycast.com/basics/debug-an-extension

Use the `console` object in TypeScript to log various types of messages during development. This includes simple string logs, debug messages with variables, and error objects. These logs appear in the terminal when the extension is running in development mode. Note that console logging is disabled for store extensions.

```typescript
console.log("Hello World"); // Prints: Hello World

const name = "Thomas";
console.debug(`Hello ${name}`); // Prints: Hello Thomas

const error = new Error("Boom 💥");
console.error(error); // Prints: Boom 💥
```

--------------------------------

### Raycast MenuBarExtra.Item with title and icon (disabled)

Source: https://developers.raycast.com/api-reference/menu-bar-commands

Shows how to create a disabled menu bar item that includes both a `title` and an `icon`. This configuration is also rendered as disabled.

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

### Form Component

Source: https://developers.raycast.com/api-reference/user-interface/form

The Form component is the main container for creating forms in Raycast. It allows for various input types and supports draft saving.

```APIDOC
## Form Component

### Description
The `Form` component is the main container for creating forms in Raycast. It allows for various input types and supports draft saving.

### Props

#### Props

| Prop               | Description                                                                         | Type                                                           | Default |
| ------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------- |
| actions            | A reference to an ActionPanel.                                                      | `React.ReactNode`                                              | -       |
| children           | The Form.Item elements of the form.                                                 | `React.ReactNode`                                              | -       |
| enableDrafts       | Defines whether the Form.Items values will be preserved when user exits the screen. | `boolean`                                                      | -       |
| isLoading          | Indicates whether a loading bar should be shown or hidden below the search bar      | `boolean`                                                      | -       |
| navigationTitle    | The main title for that view displayed in Raycast                                   | `string`                                                       | -       |
| searchBarAccessory | Form.LinkAccessory that will be shown in the right-hand-side of the search bar.     | `ReactElement<`[`Form.LinkAccessory.Props`](#props)`, string>` | -       |

### Request Example
```typescript
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
  <Form.TextField id="title" title="Title" />
  <Form.TextArea id="description" title="Description" />
  <Form.DatePicker id="dueDate" title="Due Date" />
</Form>
```

### Response
#### Success Response (200)
- **values** (object) - The submitted form values.

#### Response Example
```json
{
  "title": "Buy Groceries",
  "description": "Milk, Eggs, Bread",
  "dueDate": "2023-10-27T10:00:00.000Z"
}
```
```

--------------------------------

### Create Script Command Deeplink (TypeScript)

Source: https://developers.raycast.com/utilities/functions/createdeeplink

Generates a deeplink for a script command. Requires the command name and an array of string arguments. The type must be explicitly set to DeeplinkType.ScriptCommand.

```typescript
function createDeeplink(options: {
  type: DeeplinkType.ScriptCommand,
  command: string,
  arguments?: string[],
}): string;
```

--------------------------------

### Migrate List.Item accessoryTitle to accessories prop

Source: https://developers.raycast.com/misc/migration/v1.31.0

Demonstrates how to update a List.Item that uses the deprecated 'accessoryTitle' prop to the new 'accessories' prop. This involves changing the prop name and structuring the accessory as an object with a 'text' property.

```typescript
<List.Item title="List item with accessory title" accessoryTitle="foo" />
// becomes
<List.Item title="List item with accessory title" accessories={[{ text: 'foo' }]}
```

--------------------------------

### WithAccessTokenParameters Type Definition (TypeScript)

Source: https://developers.raycast.com/utilities/oauth/withaccesstoken

Defines the structure of the `WithAccessTokenParameters` object, detailing the optional `client`, required `authorize` function, optional `personalAccessToken`, and optional `onAuthorize` callback.

```ts
type OAuthType = "oauth" | "personal";

type OnAuthorizeParams = {
  token: string;
  type: OAuthType;
  idToken: string | null; // only present if `options.client` has been provided
};

type WithAccessTokenParameters = {
  client?: OAuth.PKCEClient;
  authorize: () => Promise<string>;
  personalAccessToken?: string;
  onAuthorize?: (params: OnAuthorizeParams) => void;
};
```

--------------------------------

### List.Item.Detail.Metadata.Separator

Source: https://developers.raycast.com/api-reference/user-interface/list

A metadata item used to display a separator line, useful for visually grouping and separating metadata items within a List.Item.

```APIDOC
## List.Item.Detail.Metadata.Separator

### Description
A metadata item that shows a separator line. Use it for grouping and visually separating metadata items.

### Method
Not applicable (UI Component)

### Endpoint
Not applicable (UI Component)

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- None

### Request Example
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
                <List.Item.Detail.Metadata.Separator />
                <List.Item.Detail.Metadata.Label title="Type" icon="pokemon_types/poison.svg" text="Poison" />
              </List.Item.Detail.Metadata>
            }
          />
        }
      />
    </List>
  );
}
```

### Response
#### Success Response (200)
- None

#### Response Example
```json
{
  "example": "Not applicable for UI components"
}
```
```

--------------------------------

### LocalStorage.getItem

Source: https://developers.raycast.com/api-reference/storage

Retrieves a stored value from the local storage using its key. Returns undefined if the key does not exist.

```APIDOC
## GET /storage/item/:key

### Description
Retrieves the stored value for the given key from the local storage.

### Method
GET

### Endpoint
`/storage/item/:key`

### Parameters
#### Path Parameters
- **key** (string) - Required - The key of the item to retrieve.

### Response
#### Success Response (200)
- **value** (any) - The stored value associated with the key, or undefined if the key does not exist.

#### Response Example
```json
{
  "value": "stored_data"
}
```
```

--------------------------------

### Run PowerShell Script with runPowerShellScript

Source: https://developers.raycast.com/utilities/getting-started

The runPowerShellScript function allows executing PowerShell scripts from within a Raycast extension. This utility was introduced in v2.0.0.

```javascript
// Example usage of runPowerShellScript function (specific implementation not provided in text)
// const result = await runPowerShellScript('Get-Process');

```

--------------------------------

### Opt-out of Dynamic Color Adjustment for Raw Colors

Source: https://developers.raycast.com/misc/changelog

Allows extensions to opt-out of the dynamic adjustment for raw colors (HEX, rgb, etc.) to ensure accurate color reproduction. Previously opt-in, this feature is now opt-out by default to improve accessibility. Refer to the Raycast documentation for instructions on how to opt-out if precise color rendering is critical for your extension.

```css
/* Example: To opt-out, you might need to configure your extension's settings or manifest */
/* Consult Raycast developer documentation for specific implementation */
```

--------------------------------

### Action.Paste

Source: https://developers.raycast.com/api-reference/user-interface/actions

An action that pastes content into the front-most application.

```APIDOC
## POST /websites/developers_raycast/actions/paste

### Description
Pastes specified content into the currently active application. The Raycast window is closed after the content is pasted.

### Method
POST

### Endpoint
/websites/developers_raycast/actions/paste

### Parameters
#### Query Parameters
- **content** (string) - Required - The content to be pasted.
- **icon** (Image.ImageLike) - Optional - The icon displayed for the Action.
- **shortcut** (Keyboard.Shortcut) - Optional - The keyboard shortcut for the Action.
- **title** (string) - Optional - The title for the Action.

#### Request Body
None

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

### Use Built-in Icon in Raycast List Item (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/icons-and-images

Demonstrates how to import and use a built-in icon (Icon.Circle) for a List.Item in a Raycast extension. Requires the @raycast/api package.

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

### Displaying Pikachu's Type with Detail.Metadata.TagList

Source: https://developers.raycast.com/api-reference/user-interface/detail

This code snippet illustrates how to display a list of tags within the Raycast Detail component's metadata. It uses Detail.Metadata.TagList and Detail.Metadata.TagList.Item to show Pikachu's type as 'Electric' with a specific color.

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
          <Detail.Metadata.TagList title="Type">
            <Detail.Metadata.TagList.Item text="Electric" color={"#eed535"} />
          </Detail.Metadata.TagList>
        </Detail.Metadata>
      }
    />
  );
}

```

--------------------------------

### Image.Asset

Source: https://developers.raycast.com/api-reference/user-interface/icons-and-images

Describes the Image.Asset type, indicating that an image can be a string referencing an asset from the `assets/` folder.

```APIDOC
## Image.Asset

### Description
Image is a string representing an asset from the `assets/` folder

### Example
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
```

--------------------------------

### Log Action Event Type in MenuBarExtra.Item (TypeScript)

Source: https://developers.raycast.com/api-reference/menu-bar-commands

This snippet demonstrates how to access and log the type of action event (e.g., 'left-click', 'right-click') that occurs when a `MenuBarExtra.Item` is interacted with. The `onAction` prop receives an event object containing the event type.

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

### LocalStorage.clear

Source: https://developers.raycast.com/api-reference/storage

Removes all stored values from the local storage of the extension.

```APIDOC
## DELETE /storage/clear

### Description
Removes all stored values for the current extension from the local storage.

### Method
DELETE

### Endpoint
`/storage/clear`

### Response
#### Success Response (200)
- **message** (string) - Confirmation message indicating all items were cleared successfully.

#### Response Example
```json
{
  "message": "All items cleared successfully."
}
```
```

--------------------------------

### OAuth Token Set

Source: https://developers.raycast.com/api-reference/oauth

Represents the token set obtained from an OAuth provider's token response. It includes access tokens, refresh tokens, expiration information, and scopes.

```APIDOC
## OAuth.TokenSet

### Description
Describes the TokenSet created from an OAuth provider's token response. The `accessToken` is the only required parameter but typically OAuth providers also return a refresh token, an expires value, and the scope. Securely store a token set via [setTokens](#oauth.pkceclient-settokens) and retrieve it via [getTokens](#oauth.pkceclient-gettokens).

### Parameters
#### Request Body
- **accessToken** (string) - Required - The access token returned by an OAuth token request.
- **updatedAt** (Date) - Required - The date when the token set was stored via OAuth.PKCEClient.setTokens.
- **isExpired** (() => boolean) - Required - A function that returns whether the token set is expired.
- **expiresIn** (number) - Optional - An optional expires value (in seconds) returned by an OAuth token request.
- **idToken** (string) - Optional - An optional id token returned by an identity request (e.g. /me, Open ID Connect).
- **refreshToken** (string) - Optional - An optional refresh token returned by an OAuth token request.
- **scope** (string) - Optional - The optional space-delimited list of scopes returned by an OAuth token request. You can use this to compare the currently stored access scopes against new access scopes the extension might require in a future version, and then ask the user to re-authorize with new scopes.
```

--------------------------------

### Menu Bar Extra Section Component and Item Subtitle

Source: https://developers.raycast.com/misc/changelog

Introduces a new `Section` component for Menu Bar Extras to group related items and submenus, optionally with a title. The `Item` component now also accepts an optional `subtitle` prop for additional context.

```javascript
MenuBarExtra.Section({
  title: "Tools",
  items: [
    <MenuBarExtra.Item title="Item 1" subtitle="Description 1" />
  ]
});
```

--------------------------------

### Update tsconfig.json to Include Raycast Env Definitions

Source: https://developers.raycast.com/misc/migration/v1.50.0

This snippet demonstrates updating the `tsconfig.json` file to include the `raycast-env.d.ts` file. This allows TypeScript to recognize and utilize the generated type definitions for extension preferences and arguments.

```diff
'- "include": ["src/**/*"],
+ "include": ["src/**/*", "raycast-env.d.ts"],'
```

--------------------------------

### Retrieve OAuth Token Set

Source: https://developers.raycast.com/api-reference/oauth

Retrieves the currently stored token set for the extension. This can be used to check if the user is already logged in before initiating the authorization flow. The token set contains access token, refresh token, expiry, and scope.

```typescript
const tokenSet = await client.getTokens();
```

--------------------------------

### updateCommandMetadata

Source: https://developers.raycast.com/api-reference/command

Updates the metadata properties of the current command, such as the subtitle. This change is temporary and applies only for the current session.

```APIDOC
## POST /updateCommandMetadata

### Description
Updates the values of properties declared in the manifest of the current command. Currently, only the `subtitle` property is supported. Passing `null` will clear the custom subtitle. The actual manifest file is not modified, so the update applies as long as the command remains installed.

### Method
POST

### Endpoint
/updateCommandMetadata

### Parameters
#### Request Body
- **metadata** (object) - Required - An object containing metadata to update.
  - **subtitle** (string | null) - Optional - The new subtitle for the command, or `null` to clear it.

### Request Example
```json
{
  "metadata": {
    "subtitle": "Unread Notifications: 10"
  }
}
```

### Response
#### Success Response (200)
- **void** - A Promise that resolves when the command's metadata have been updated.

#### Response Example
(No response body on success)
```

--------------------------------

### executeSQL Function

Source: https://developers.raycast.com/utilities/functions/executesql

Executes a SQL query on a local SQLite database and returns the query result in JSON format.

```APIDOC
## executeSQL Function

### Description
Executes a SQL query on a local SQLite database and returns the query result in JSON format.

### Method
`executeSQL` (Function)

### Parameters
#### Arguments
- **databasePath** (string) - Required - The path to the local SQL database.
- **query** (string) - Required - The SQL query to run on the database.

### Return
Returns a `Promise` that resolves to an array of objects representing the query results.

### Example
```typescript
import { closeMainWindow, Clipboard } from "@raycast/api";
import { executeSQL } from "@raycast/utils";

type Message = { body: string; code: string };

const DB_PATH = "/path/to/chat.db";

export default async function Command() {
  const query = `
    SELECT body, code
    FROM message
    ORDER BY date DESC
    LIMIT 1;
  `;

  const messages = await executeSQL<Message>(DB_PATH, query);

  if (messages.length > 0) {
    const latestCode = messages[0].code;
    await Clipboard.paste(latestCode);
    await closeMainWindow();
  }
}
```
```

--------------------------------

### Production Error Source Maps

Source: https://developers.raycast.com/misc/changelog

Enables source maps for production builds of extensions, providing cleaner stack traces with accurate source locations in TypeScript files. This significantly improves debugging of production errors by mapping minified JavaScript back to the original source code. Note: Extensions must be re-published to enable this feature.

```javascript
// No direct code snippet to enable, this is a build configuration feature.
// Ensure your build process generates source maps for production.
// Example using a build tool like esbuild:
// esbuild.build({ ..., sourcemap: true, minify: true, outfile: 'dist/index.js' });
```

--------------------------------

### Form.Values

Source: https://developers.raycast.com/api-reference/user-interface/form

Represents the collection of values from all items within a form.

```APIDOC
## Form.Values

### Description

Values of items in the form. For type-safe form values, you can define your own interface. Use the ID's of the form items as the property name.

### Method

N/A (Type)

### Endpoint

N/A (Type)

### Parameters

#### Properties

- **[itemId: string]** (any) - Required - The form value of a given item.

### Request Example

```typescript
import { Form, Action, ActionPanel } from "@raycast/api";

interface Values {
  todo: string;
  due?: Date;
}

export default function Command() {
  function handleSubmit(values: Values) {
    console.log(values);
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="todo" title="Todo" />
      <Form.DatePicker id="due" title="Due Date" />
    </Form>
  );
}
```

### Response

N/A (Type)
```

--------------------------------

### Stream JSON Data with useStreamJSON Hook

Source: https://developers.raycast.com/utilities/getting-started

The useStreamJSON hook, added in v1.14.0, is designed for handling streaming JSON responses, which can be useful for real-time data updates or large datasets. It was fixed to apply failureToastOptions in v1.16.6.

```javascript
// Example usage of useStreamJSON hook (specific implementation not provided in text)
// const { data, error } = useStreamJSON('https://api.example.com/stream');

```

--------------------------------

### Raycast MenuBarExtra.Item with only title (disabled)

Source: https://developers.raycast.com/api-reference/menu-bar-commands

Demonstrates creating a disabled menu bar item using only the `title` prop. This is useful for section titles or non-interactive elements.

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

### Image.URL

Source: https://developers.raycast.com/api-reference/user-interface/icons-and-images

Defines the Image.URL type, specifying that an image can be represented as a string URL.

```APIDOC
## Image.URL

### Description
Image is a string representing a URL.

### Example
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
```

--------------------------------

### Display File Icon in List Item (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/icons-and-images

Shows how to use the `fileIcon` property to display an icon representing a file within a List.Item. This is useful for visually indicating file types or paths.

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

### Fix Dynamic Appearance of Form Item Info Accessory

Source: https://developers.raycast.com/misc/changelog

Corrects the dynamic appearance of the `info` accessory for form items. This ensures that information tooltips associated with form fields update and display correctly as needed.

```javascript
import { Form, ActionPanel, Action } from '@raycast/api';

function FormWithDynamicInfo() {
  return (
    <Form>
      <Form.TextField
        title="Field"
        info="This is dynamic info."
        // Logic to change info dynamically would go here
      />
      <ActionPanel>
        <Action.SubmitForm />
      </ActionPanel>
    </Form>
  );
}
```

--------------------------------

### Enable Pagination in useCachedPromise (Page-based)

Source: https://developers.raycast.com/utilities/react-hooks/usecachedpromise

This snippet demonstrates how to modify the useCachedPromise hook to support page-based pagination. The asynchronous function now accepts pagination options and returns data along with a 'hasMore' flag to indicate if further pages exist.

```typescript
const { isLoading, data, pagination } = useCachedPromise(
  (searchText: string) => async (options) => {
    const response = await fetch(`https://api.example?q=${searchText}&page=${options.page}`);
    const { data } = await response.json();
    const hasMore = options.page < 50;
    return { data, hasMore };
  },
  [searchText],
  {
    // to make sure the screen isn't flickering when the searchText changes
    keepPreviousData: true,
  },
);
```

--------------------------------

### Enable Form Drafts for Data Preservation

Source: https://developers.raycast.com/misc/changelog

Forms now support drafts, preserving non-submitted data to enhance user experience. This feature ensures that users do not lose their input if they navigate away or close the form unexpectedly.

```javascript
import { Form, ActionPanel, Action } from '@raycast/api';

function DraftableForm() {
  return (
    <Form>
      <Form.TextField title="Username" />
      <Form.TextArea title="Bio" />
      <ActionPanel>
        <Action.SubmitForm />
      </ActionPanel>
    </Form>
  );
}
```

--------------------------------

### Fix Tooltip for Grouped List Accessories

Source: https://developers.raycast.com/misc/changelog

Corrects the behavior of tooltips for grouped accessories in lists. Previously, tooltips might have appeared for individual items within a group; now, the tooltip is correctly shown for the entire group.

```javascript
import { List } from '@raycast/api';

function ListWithGroupedAccessories() {
  return (
    <List>
      <List.Item
        title="Item"
        accessories={[
          { text: 'Tag 1', tag: { color: '#FF0000' } },
          { text: 'Tag 2', tag: { color: '#00FF00' } },
        ]}
        tooltip="Group of tags"
      />
    </List>
  );
}
```

--------------------------------

### Integrate Actions Component with List Item in React

Source: https://developers.raycast.com/examples/hacker-news

This function integrates the 'Actions' component into a 'List.Item'. It displays story details like icon, title, subtitle, and accessories. The 'actions' prop of 'List.Item' is set to an instance of the 'Actions' component, passing the current 'item' to it.

```typescript
function StoryListItem(props: { item: Parser.Item; index: number }) {
  // ...

  return (
    <List.Item
      icon={icon}
      title={props.item.title ?? "No title"}
      subtitle={props.item.creator}
      accessories={[{ text: `👍 ${points}` }, { text: `💬  ${comments}` }]}
      // Wire up actions
      actions={<Actions item={props.item} />}
    />
  );
}
```

--------------------------------

### Apply Circle Mask to Image in List Item (TypeScript)

Source: https://developers.raycast.com/api-reference/user-interface/icons-and-images

Demonstrates how to use the Image.Mask.Circle to shape an image within a List.Item component. This is useful for styling avatars or other image elements in a list.

```typescript
import { Image, List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item
        title="Icon"
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

### Manual Form Validation in React

Source: https://developers.raycast.com/information/best-practices

Illustrates manual form validation in Raycast using React's `useState` hook to manage error states for individual form fields. Validation logic is implemented within `onBlur` and `onChange` event handlers. This method offers fine-grained control over validation and error display.

```typescript
import { Form } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [nameError, setNameError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  function dropNameErrorIfNeeded() {
    if (nameError && nameError.length > 0) {
      setNameError(undefined);
    }
  }

  function dropPasswordErrorIfNeeded() {
    if (passwordError && passwordError.length > 0) {
      setPasswordError(undefined);
    }
  }

  return (
    <Form>
      <Form.TextField
        id="nameField"
        title="Full Name"
        placeholder="Tim Cook"
        error={nameError}
        onChange={dropNameErrorIfNeeded}
        onBlur={(event) => {
          if (event.target.value?.length == 0) {
            setNameError("The field should't be empty!");
          } else {
            dropNameErrorIfNeeded();
          }
        }}
      />
      <Form.PasswordField
        id="password"
        title="New Password"
        error={passwordError}
        onChange={dropPasswordErrorIfNeeded}
        onBlur={(event) => {
          const value = event.target.value;
          if (value && value.length > 0) {
            if (!validatePassword(value)) {
              setPasswordError("Password should be at least 8 characters!");
            } else {
              dropPasswordErrorIfNeeded();
            }
          } else {
            setPasswordError("The field should't be empty!");
          }
        }}
      />
      <Form.TextArea id="bioTextArea" title="Add Bio" placeholder="Describe who you are" />
      <Form.DatePicker id="birthDate" title="Date of Birth" />
    </Form>
  );
}

function validatePassword(value: string): boolean {
  return value.length >= 8;
}
```