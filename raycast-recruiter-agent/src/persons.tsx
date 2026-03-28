import React, { useState, useMemo } from "react";
import {
  List,
  ActionPanel,
  Action,
  Icon,
  Color,
  showToast,
  Toast,
} from "@raycast/api";
import fs from "fs";
import path from "path";

function readPartialJsonArray(filePath: string, bytesToRead = 4 * 1024 * 1024) {
  try {
    const fd = fs.openSync(filePath, "r");
    const buffer = Buffer.alloc(bytesToRead);
    const bytesRead = fs.readSync(fd, buffer as any, 0, bytesToRead, 0);
    fs.closeSync(fd);

    let partial = buffer.toString("utf8", 0, bytesRead);

    const lastObjIdx = partial.lastIndexOf("},");
    if (lastObjIdx > 0) {
      return JSON.parse(partial.substring(0, lastObjIdx + 1) + "]");
    }

    const fullEndIdx = partial.lastIndexOf("}]");
    if (fullEndIdx > 0) {
      return JSON.parse(partial.substring(0, fullEndIdx + 2));
    }
    return JSON.parse(partial);
  } catch (e) {
    console.error("Partial JSON parse error:", e);
    return [];
  }
}

export default function Persons() {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const persons = useMemo(() => {
    try {
      const data = readPartialJsonArray(
        "/Users/vincentbaron/raycruiter/raycast-recruiter-agent/persons_cache_2026-03-22_12-18-43.json",
      );
      return data;
    } catch (e) {
      return [];
    }
  }, []);

  const filteredPersons = useMemo(() => {
    if (!searchText) return persons.slice(0, 100);

    return persons
      .filter(
        (p: any) =>
          p.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          p.emails?.some((e: any) =>
            e.value.toLowerCase().includes(searchText.toLowerCase()),
          ) ||
          p.job_title?.toLowerCase().includes(searchText.toLowerCase()),
      )
      .slice(0, 50);
  }, [searchText, persons]);

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Search persons natively..."
      onSearchTextChange={setSearchText}
    >
      {filteredPersons.map((person: any) => {
        const primaryEmail =
          person.emails?.find((e: any) => e.primary)?.value ||
          person.emails?.[0]?.value ||
          "No Email";
        const primaryPhone =
          person.phones?.find((p: any) => p.primary)?.value ||
          person.phones?.[0]?.value ||
          "No Phone";

        let orgName = "No Org";
        if (primaryEmail !== "No Email") {
          const domain = primaryEmail.split("@")[1];
          if (
            domain &&
            !domain.includes("gmail") &&
            !domain.includes("yahoo") &&
            !domain.includes("hotmail")
          ) {
            orgName = domain.split(".")[0].toUpperCase(); // Automatic Org detection directly from the domain
          }
        }

        return (
          <List.Item
            key={person.id}
            title={person.name}
            subtitle={
              person.job_title ? `${person.job_title} @ ${orgName}` : orgName
            }
            icon={Icon.PersonCircle}
            accessories={[
              { text: primaryPhone, icon: Icon.Phone },
              { text: primaryEmail, icon: Icon.Envelope },
            ]}
            actions={
              <ActionPanel>
                <ActionPanel.Section title="Next Steps in Pipeline">
                  <Action
                    title="Push & Convert to Deal"
                    icon={Icon.ArrowRightCircle}
                    onAction={() =>
                      showToast({
                        style: Toast.Style.Success,
                        title: "Deal Triggered!",
                        message:
                          "Pipeline logic: Deal filled -> Job generated -> MultiDiffusion triggered -> Organisation Created.",
                      })
                    }
                  />
                  <Action.CopyToClipboard
                    title="Copy Email"
                    content={primaryEmail}
                    shortcut={{ modifiers: ["cmd"], key: "e" }}
                  />
                </ActionPanel.Section>
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
