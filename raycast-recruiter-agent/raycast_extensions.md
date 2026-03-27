# Raycast Extensions

## Introduction

Raycast Extensions is the official repository containing all extensions available in the Raycast Store, along with comprehensive developer documentation, tools, and examples for building custom extensions. Raycast is a productivity application for macOS and Windows that allows users to control their tools with a few keystrokes, and this repository serves as both the source code for over 2,400 community-built extensions and the complete development platform for creating new ones. The repository provides a React-based API built on TypeScript, enabling developers to create rich, interactive user interfaces with components like lists, forms, grids, and detail views, all rendered within Raycast's native window.

The extension ecosystem covers a wide range of use cases including developer tools, productivity utilities, API integrations, automation scripts, and AI-powered features. Extensions can display searchable lists, collect user input through forms, interact with external APIs, manage local storage, execute shell commands, and leverage Raycast's built-in AI capabilities. The development experience includes hot-reload support, TypeScript type safety, comprehensive documentation, and a vibrant community. All extensions in the repository share a common structure with a manifest file (package.json), entry point commands, reusable components, and assets, making it straightforward to learn from existing extensions and contribute new functionality.

## API Reference and Code Examples

### List Component - Display Searchable Items

The List component is the primary UI for displaying searchable, filterable data with built-in fuzzy search, sections, and pagination support.

```typescript
import { List, ActionPanel, Action, Icon } from "@raycast/api";
import { useState, useEffect } from "react";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const items = ["Augustiner Helles", "Camden Hells", "Leffe Blonde", "Sierra Nevada IPA"];

  useEffect(() => {
    setFilteredItems(items.filter(item => item.toLowerCase().includes(searchText.toLowerCase())));
  }, [searchText]);

  return (
    <List
      filtering={false}
      onSearchTextChange={setSearchText}
      navigationTitle="Search Beers"
      searchBarPlaceholder="Search your favorite beer"
    >
      {filteredItems.map((item) => (
        <List.Item
          key={item}
          title={item}
          icon={Icon.Star}
          accessories={[{ text: "Available" }]}
          actions={
            <ActionPanel>
              <Action
                title="Select"
                onAction={() => console.log(`${item} selected`)}
              />
              <Action.CopyToClipboard content={item} />
              <Action.OpenInBrowser url={`https://example.com/beer/${item}`} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
```

### List with Detail View - Rich Content Display

Display detailed information with markdown, images, and metadata alongside list items.

```typescript
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

export default function Command() {
  const [showingDetail, setShowingDetail] = useState(true);
  const { data, isLoading } = useCachedPromise(() =>
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then(res => res.json())
      .then(data => data.results)
  );

  return (
    <List isLoading={isLoading} isShowingDetail={showingDetail}>
      {data?.map((pokemon: any, index: number) => (
        <List.Item
          key={pokemon.name}
          title={pokemon.name}
          subtitle={`#${String(index + 1).padStart(3, "0")}`}
          detail={
            <List.Item.Detail
              markdown={`![Illustration](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png)\n\n**Type:** Grass/Poison`}
              metadata={
                <List.Item.Detail.Metadata>
                  <List.Item.Detail.Metadata.Label title="Height" text="7 dm" />
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Label title="Weight" text="69 kg" />
                  <List.Item.Detail.Metadata.Separator />
                  <List.Item.Detail.Metadata.Link
                    title="Pokédex"
                    target={`https://www.pokemon.com/us/pokedex/${pokemon.name}`}
                    text="View Details"
                  />
                </List.Item.Detail.Metadata>
              }
            />
          }
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={`https://www.pokemon.com/us/pokedex/${pokemon.name}`} />
              <Action title="Toggle Detail" onAction={() => setShowingDetail(!showingDetail)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
```

### Form with Validation - Collect User Input

Forms collect structured data from users with comprehensive validation support.

```typescript
import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";
import { useForm, FormValidation } from "@raycast/utils";

interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  birthDate?: Date;
  gender: string;
  hobbies: string[];
  newsletter: boolean;
}

export default function Command() {
  const { handleSubmit, itemProps } = useForm<SignUpFormValues>({
    onSubmit(values) {
      console.log("Form submitted:", values);
      showToast({
        style: Toast.Style.Success,
        title: "Account Created",
        message: `Welcome ${values.name}!`,
      });
    },
    validation: {
      name: FormValidation.Required,
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Invalid email format";
        }
      },
      password: (value) => {
        if (!value) return "Password is required";
        if (value.length < 8) {
          return "Password must be at least 8 characters";
        }
      },
    },
  });

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Account" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField
        title="Full Name"
        placeholder="John Doe"
        {...itemProps.name}
      />
      <Form.TextField
        title="Email"
        placeholder="john@example.com"
        {...itemProps.email}
      />
      <Form.PasswordField
        title="Password"
        {...itemProps.password}
      />
      <Form.DatePicker
        id="birthDate"
        title="Date of Birth"
        type={Form.DatePicker.Type.Date}
      />
      <Form.Separator />
      <Form.Dropdown id="gender" title="Gender" defaultValue="prefer-not-to-say">
        <Form.Dropdown.Item value="male" title="Male" />
        <Form.Dropdown.Item value="female" title="Female" />
        <Form.Dropdown.Item value="prefer-not-to-say" title="Prefer not to say" />
      </Form.Dropdown>
      <Form.TagPicker id="hobbies" title="Hobbies">
        <Form.TagPicker.Item value="reading" title="Reading" icon="📖" />
        <Form.TagPicker.Item value="gaming" title="Gaming" icon="🎮" />
        <Form.TagPicker.Item value="sports" title="Sports" icon="⚽" />
        <Form.TagPicker.Item value="music" title="Music" icon="🎵" />
      </Form.TagPicker>
      <Form.Checkbox id="newsletter" label="Subscribe to newsletter" />
    </Form>
  );
}
```

### Actions and Action Panel - User Interactions

Actions provide interactive functionality accessed via Cmd+K or keyboard shortcuts.

```typescript
import { Detail, ActionPanel, Action, Icon, showHUD, showToast, Toast, confirmAlert, Alert, Color } from "@raycast/api";
import { homedir } from "os";
import { resolve } from "path";

export default function Command() {
  const downloadsDir = resolve(homedir(), "Downloads");

  return (
    <Detail
      markdown="# Actions Demo\n\nPress ⌘+K to see all available actions."
      actions={
        <ActionPanel>
          <ActionPanel.Section title="Built-in Actions">
            <Action.CopyToClipboard
              content="Text copied to clipboard"
              title="Copy Text"
            />
            <Action.OpenInBrowser
              url="https://raycast.com"
              title="Open Raycast"
            />
            <Action.ShowInFinder
              title="Open Downloads"
              path={downloadsDir}
            />
            <Action.Paste
              content="Pasted to frontmost app"
              title="Paste Text"
            />
          </ActionPanel.Section>

          <ActionPanel.Section title="Custom Actions">
            <Action
              title="Show Success Toast"
              icon={Icon.Check}
              shortcut={{ modifiers: ["cmd"], key: "s" }}
              onAction={() => {
                showToast({
                  style: Toast.Style.Success,
                  title: "Success!",
                  message: "Operation completed successfully",
                });
              }}
            />

            <Action
              title="Delete with Confirmation"
              style={Action.Style.Destructive}
              icon={Icon.Trash}
              shortcut={{ modifiers: ["ctrl"], key: "x" }}
              onAction={async () => {
                const confirmed = await confirmAlert({
                  icon: { source: Icon.Trash, tintColor: Color.Red },
                  title: "Are you sure?",
                  message: "This action cannot be undone",
                  primaryAction: {
                    title: "Delete",
                    style: Alert.ActionStyle.Destructive,
                  },
                });

                if (confirmed) {
                  await showHUD("Item deleted");
                }
              }}
            />

            <ActionPanel.Submenu title="Open with…" icon={Icon.Globe}>
              <Action
                title="Chrome"
                onAction={() => console.log("Opening in Chrome")}
              />
              <Action
                title="Safari"
                onAction={() => console.log("Opening in Safari")}
              />
            </ActionPanel.Submenu>
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}
```

### usePromise Hook - Async Data Loading

Load async data with automatic loading states, error handling, and revalidation.

```typescript
import { List, ActionPanel, Action } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { useRef } from "react";

interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
}

export default function Command() {
  const abortable = useRef<AbortController>();

  const { isLoading, data, error, revalidate } = usePromise(
    async (username: string) => {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=stars&per_page=10`,
        { signal: abortable.current?.signal }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.statusText}`);
      }

      const repos: Repository[] = await response.json();
      return repos;
    },
    ["raycast"],
    {
      abortable,
      onError: (error) => {
        console.error("Error loading repositories:", error);
      },
    }
  );

  return (
    <List isLoading={isLoading}>
      {error ? (
        <List.EmptyView
          icon={Icon.ExclamationMark}
          title="Failed to Load Repositories"
          description={error.message}
        />
      ) : (
        data?.map((repo) => (
          <List.Item
            key={repo.id}
            title={repo.name}
            subtitle={repo.description || "No description"}
            accessories={[
              { text: `⭐ ${repo.stargazers_count}` }
            ]}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser url={repo.html_url} />
                <Action
                  title="Reload"
                  icon={Icon.ArrowClockwise}
                  onAction={revalidate}
                />
              </ActionPanel>
            }
          />
        ))
      )}
    </List>
  );
}
```

### Pagination with usePromise - Large Data Sets

Handle paginated API responses with built-in support in usePromise hook.

```typescript
import { setTimeout } from "node:timers/promises";
import { useState } from "react";
import { List } from "@raycast/api";
import { usePromise } from "@raycast/utils";

interface SearchResult {
  index: number;
  page: number;
  text: string;
}

export default function Command() {
  const [searchText, setSearchText] = useState("");

  const { isLoading, data, pagination } = usePromise(
    (searchText: string) =>
      async (options: { page: number; cursor?: string }) => {
        // Simulate API delay
        await setTimeout(200);

        // Generate sample data for the current page
        const pageSize = 25;
        const newData = Array.from({ length: pageSize }, (_v, index) => ({
          index,
          page: options.page,
          text: searchText || "No search",
        }));

        // Return data with hasMore flag
        const hasMore = options.page < 10;

        return {
          data: newData,
          hasMore,
          // Optional: return cursor for cursor-based pagination
          cursor: hasMore ? `cursor_${options.page + 1}` : undefined
        };
      },
    [searchText]
  );

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      pagination={pagination}
      searchBarPlaceholder="Search items..."
    >
      {data?.map((item, idx) => (
        <List.Item
          key={`${item.page}-${item.index}-${idx}`}
          title={`Page ${item.page} - Item ${item.index}`}
          subtitle={item.text}
          accessories={[{ text: `#${idx + 1}` }]}
        />
      ))}
    </List>
  );
}
```

### Local Storage - Persistent Data

Store and retrieve data with encrypted local storage shared across extension commands.

```typescript
import { List, ActionPanel, Action, showToast, Toast, Icon } from "@raycast/api";
import { LocalStorage } from "@raycast/api";
import { useEffect, useState } from "react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export default function Command() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      const storedTodos = await LocalStorage.getItem<string>("todos");
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error("Failed to load todos:", error);
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to load todos",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function saveTodos(newTodos: Todo[]) {
    try {
      await LocalStorage.setItem("todos", JSON.stringify(newTodos));
      setTodos(newTodos);
      await showToast({
        style: Toast.Style.Success,
        title: "Todo saved",
      });
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to save todo",
      });
    }
  }

  async function addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    await saveTodos([...todos, newTodo]);
  }

  async function toggleTodo(id: string) {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    await saveTodos(updated);
  }

  async function deleteTodo(id: string) {
    await saveTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <List isLoading={isLoading}>
      {todos.map((todo) => (
        <List.Item
          key={todo.id}
          title={todo.title}
          icon={todo.completed ? Icon.CheckCircle : Icon.Circle}
          accessories={[
            { date: new Date(todo.createdAt) },
            { text: todo.completed ? "Done" : "Pending" }
          ]}
          actions={
            <ActionPanel>
              <Action
                title={todo.completed ? "Mark Incomplete" : "Mark Complete"}
                onAction={() => toggleTodo(todo.id)}
              />
              <Action
                title="Delete"
                style={Action.Style.Destructive}
                onAction={() => deleteTodo(todo.id)}
              />
              <Action.Push
                title="Add New Todo"
                target={<TodoForm onSubmit={addTodo} />}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

function TodoForm({ onSubmit }: { onSubmit: (title: string) => Promise<void> }) {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Add Todo"
            onSubmit={(values: { title: string }) => onSubmit(values.title)}
          />
        </ActionPanel>
      }
    >
      <Form.TextField id="title" title="Title" placeholder="Enter todo title" />
    </Form>
  );
}
```

### AI Integration - AI-Powered Features

Leverage Raycast's built-in AI capabilities with streaming support.

```typescript
import { Detail, ActionPanel, Action, showToast, Toast, environment, AI } from "@raycast/api";
import { useState } from "react";
import { useAI } from "@raycast/utils";

export default function Command() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if user has access to AI
  const hasAIAccess = environment.canAccess(AI);

  async function askAI(userPrompt: string) {
    if (!hasAIAccess) {
      await showToast({
        style: Toast.Style.Failure,
        title: "AI Access Required",
        message: "You need Raycast Pro to use AI features",
      });
      return;
    }

    setIsLoading(true);
    setAnswer("");

    try {
      let streamedAnswer = "";

      // Create AI request with streaming
      const aiPromise = AI.ask(userPrompt, {
        creativity: "medium",
        model: AI.Model["OpenAI_GPT4o"],
      });

      // Listen to streaming data
      aiPromise.on("data", (data) => {
        streamedAnswer += data;
        setAnswer(streamedAnswer);
      });

      // Wait for completion
      await aiPromise;

      await showToast({
        style: Toast.Style.Success,
        title: "Answer generated",
      });
    } catch (error) {
      console.error("AI Error:", error);
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to generate answer",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Detail
      markdown={answer || "# AI Assistant\n\nAsk me anything using the action below."}
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.Push
            title="Ask Question"
            target={
              <Form
                actions={
                  <ActionPanel>
                    <Action.SubmitForm
                      title="Generate Answer"
                      onSubmit={(values: { question: string }) => {
                        setPrompt(values.question);
                        askAI(values.question);
                      }}
                    />
                  </ActionPanel>
                }
              >
                <Form.TextArea
                  id="question"
                  title="Question"
                  placeholder="What would you like to know?"
                />
                <Form.Dropdown id="creativity" title="Creativity" defaultValue="medium">
                  <Form.Dropdown.Item value="none" title="None (Precise)" />
                  <Form.Dropdown.Item value="low" title="Low" />
                  <Form.Dropdown.Item value="medium" title="Medium" />
                  <Form.Dropdown.Item value="high" title="High" />
                </Form.Dropdown>
              </Form>
            }
          />
          {answer && (
            <>
              <Action.CopyToClipboard content={answer} />
              <Action title="Clear" onAction={() => setAnswer("")} />
            </>
          )}
        </ActionPanel>
      }
    />
  );
}
```

### OAuth Authentication - Secure API Access

Implement OAuth flow for secure third-party API authentication.

```typescript
import { OAuth, getPreferenceValues } from "@raycast/api";
import { OAuthService } from "@raycast/utils";

// Configure OAuth client
const client = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "GitHub",
  providerIcon: "github-logo.png",
  providerId: "github",
  description: "Connect your GitHub account",
});

// OAuth service with token management
const github = new OAuthService({
  client,
  clientId: getPreferenceValues().githubClientId,
  scope: "repo user",
  authorizeUrl: "https://github.com/login/oauth/authorize",
  tokenUrl: "https://github.com/login/oauth/access_token",
  refreshTokenUrl: "https://github.com/login/oauth/access_token",
  onAuthorize: async ({ authorizationCode }) => {
    const params = new URLSearchParams({
      client_id: getPreferenceValues().githubClientId,
      code: authorizationCode,
      grant_type: "authorization_code",
    });

    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const tokenResponse = await response.json();
    return tokenResponse;
  },
});

export async function authorize() {
  const tokenSet = await github.authorize();
  return tokenSet.accessToken;
}

export async function fetchGitHubData(accessToken: string) {
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json();
}

export default async function Command() {
  try {
    const accessToken = await authorize();
    const userData = await fetchGitHubData(accessToken);
    console.log("GitHub user:", userData);
  } catch (error) {
    console.error("OAuth error:", error);
  }
}
```

### Extension Manifest - package.json Configuration

Define extension metadata, commands, preferences, and dependencies.

```json
{
  "$schema": "https://www.raycast.com/schemas/extension.json",
  "name": "my-productivity-extension",
  "title": "My Productivity Extension",
  "description": "Boost your productivity with custom commands and integrations",
  "icon": "icon.png",
  "author": "yourusername",
  "platforms": ["macOS", "Windows"],
  "categories": ["Productivity", "Developer Tools"],
  "license": "MIT",
  "commands": [
    {
      "name": "search-items",
      "title": "Search Items",
      "subtitle": "My Service",
      "description": "Search through your items quickly",
      "mode": "view",
      "icon": "search-icon.png",
      "keywords": ["find", "search", "query"],
      "preferences": [
        {
          "name": "apiKey",
          "type": "password",
          "required": true,
          "title": "API Key",
          "description": "Your API key for authentication",
          "placeholder": "Enter your API key"
        }
      ],
      "arguments": [
        {
          "name": "query",
          "type": "text",
          "placeholder": "Search query",
          "required": false
        }
      ]
    },
    {
      "name": "quick-action",
      "title": "Quick Action",
      "description": "Perform a quick action without UI",
      "mode": "no-view",
      "icon": "action-icon.png"
    },
    {
      "name": "status-indicator",
      "title": "Status Indicator",
      "description": "Show status in menu bar",
      "mode": "menu-bar",
      "interval": "5m"
    }
  ],
  "preferences": [
    {
      "name": "theme",
      "type": "dropdown",
      "required": false,
      "title": "Theme",
      "description": "Choose your preferred theme",
      "default": "auto",
      "data": [
        { "title": "Auto", "value": "auto" },
        { "title": "Light", "value": "light" },
        { "title": "Dark", "value": "dark" }
      ]
    },
    {
      "name": "enableNotifications",
      "type": "checkbox",
      "required": false,
      "title": "Notifications",
      "label": "Enable notifications",
      "description": "Show desktop notifications for important events",
      "default": true
    }
  ],
  "dependencies": {
    "@raycast/api": "^1.80.0",
    "@raycast/utils": "^1.16.0"
  },
  "devDependencies": {
    "@raycast/eslint-config": "^1.0.11",
    "@types/node": "^20.8.10",
    "@types/react": "^18.3.3",
    "eslint": "^8.57.0",
    "prettier": "^3.2.5",
    "typescript": "^5.4.5"
  },
  "scripts": {
    "build": "ray build -e dist",
    "dev": "ray develop",
    "fix-lint": "ray lint --fix",
    "lint": "ray lint",
    "publish": "npx @raycast/api@latest publish"
  }
}
```

### No-View Command - Background Operations

Execute commands without UI for quick operations and automation.

```typescript
import { showHUD, showToast, Toast, Clipboard, getSelectedText } from "@raycast/api";

export default async function Command() {
  try {
    // Get selected text from any application
    const selectedText = await getSelectedText();

    if (!selectedText) {
      await showHUD("No text selected");
      return;
    }

    // Transform the text (example: convert to uppercase)
    const transformed = selectedText.toUpperCase();

    // Copy to clipboard
    await Clipboard.copy(transformed);

    // Show confirmation
    await showHUD("✓ Converted to uppercase and copied");
  } catch (error) {
    console.error("Command failed:", error);
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to process text",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
```

### Menu Bar Command - System Tray Integration

Create menu bar extras with dropdowns and quick actions (macOS only).

```typescript
import { MenuBarExtra, Icon, open, getPreferenceValues } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

interface Status {
  title: string;
  status: "operational" | "degraded" | "outage";
  lastUpdated: Date;
}

export default function Command() {
  const { data, isLoading, revalidate } = useCachedPromise(
    async () => {
      const response = await fetch("https://api.example.com/status");
      const status: Status = await response.json();
      return status;
    },
    [],
    {
      initialData: {
        title: "Loading...",
        status: "operational",
        lastUpdated: new Date(),
      },
    }
  );

  const statusIcon = {
    operational: Icon.CheckCircle,
    degraded: Icon.ExclamationMark,
    outage: Icon.XMarkCircle,
  };

  const statusColor = {
    operational: "#00D66F",
    degraded: "#FFA500",
    outage: "#FF0000",
  };

  return (
    <MenuBarExtra
      icon={{
        source: statusIcon[data.status],
        tintColor: statusColor[data.status],
      }}
      tooltip={`Status: ${data.title}`}
      isLoading={isLoading}
    >
      <MenuBarExtra.Item
        title={data.title}
        subtitle={data.status.toUpperCase()}
      />
      <MenuBarExtra.Separator />
      <MenuBarExtra.Item
        title="Last Updated"
        subtitle={new Date(data.lastUpdated).toLocaleString()}
      />
      <MenuBarExtra.Separator />
      <MenuBarExtra.Item
        title="Refresh"
        icon={Icon.ArrowClockwise}
        onAction={revalidate}
      />
      <MenuBarExtra.Item
        title="Open Dashboard"
        icon={Icon.Globe}
        onAction={() => open("https://example.com/dashboard")}
      />
      <MenuBarExtra.Separator />
      <MenuBarExtra.Item
        title="Preferences..."
        icon={Icon.Gear}
        onAction={() => open("raycast://extensions/my-extension/preferences")}
      />
    </MenuBarExtra>
  );
}
```

## Summary and Integration

The Raycast Extensions repository provides a comprehensive platform for building productivity-enhancing extensions with a rich, type-safe API. The primary use cases include creating custom search interfaces for APIs and databases, building form-based workflows for data collection and submission, developing no-view commands for quick automation tasks, integrating with external services via OAuth, managing local state with encrypted storage, and leveraging AI capabilities for intelligent features. Extensions can display rich content with lists, forms, grids, and detail views, all styled consistently with Raycast's native UI. The component-based architecture makes it easy to compose complex interfaces from reusable parts, while hooks like usePromise, useCachedPromise, and useForm simplify common patterns like async data loading, caching, and form validation.

Integration patterns emphasize declarative React components for UI, TypeScript for type safety, and async/await for asynchronous operations. Extensions access Raycast APIs through the @raycast/api package, with utility functions available in @raycast/utils for common tasks. The manifest file (package.json) defines all extension metadata, commands, preferences, and dependencies, serving as the single source of truth for configuration. Extensions can store persistent data using LocalStorage, execute shell commands via Node.js APIs, interact with the file system, make HTTP requests to external APIs, and integrate with system features like the clipboard and Finder. The development workflow includes hot-reload with `ray develop`, type checking with TypeScript, linting with ESLint, and publishing to the Raycast Store with `ray publish`. With over 2,400 existing extensions as reference implementations, developers have extensive examples to learn from, making it straightforward to build new extensions that integrate seamlessly into users' workflows.
