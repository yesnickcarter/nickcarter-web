# MCP Spec Proposal

Tool Audit works today as a Claude Code skill because skills can see the full tool manifest. But the limitation is real: an MCP server can't see sibling servers' tools. The protocol has no mechanism for cross-server awareness. This means the audit functionality is locked to Claude Code and can't work in Claude Desktop, Cursor, Windsurf, or any other MCP client.

This proposal was drafted for submission to the MCP specification repository as a discussion. It adds a client capability that lets servers request the aggregated tool manifest — a read-only list of all tools from all connected servers.

## The Core Idea

Add a new request type, `tools/listAll`, that a server can send to the client. The client responds with the full tool manifest — names, descriptions, schemas, and source server identifiers. The client retains full control: it decides what to share, can filter by opt-in/opt-out, and can omit source details if privacy is a concern.

## What This Enables

Without cross-server visibility, these tools are impossible to build as MCP servers:

- **Tool collision auditor** — detects overlapping tools across the environment and reports conflicts
- **Adaptive tool naming** — checks if tool names conflict at registration time and adjusts
- **Intelligent router** — intercepts ambiguous requests and asks for clarification
- **Environment dashboard** — structured view of all tools, grouped by server, with conflict annotations

## Three Options

The proposal presents three approaches, from most complete to simplest:

### Option A: `tools/listAll` (recommended)

A new request type. Servers declare a `toolAudit` capability. Clients honor the request or return an empty result. On-demand, works at any point during the session, and the client retains full control.

### Option B: Extend `sampling/createMessage`

When a server sends `sampling/createMessage` with `includeContext: "allServers"`, the client adds a structured `toolManifest` field to the response. No new request type — but overloading sampling for introspection is semantically confusing.

### Option C: Tool manifest in `InitializeResult`

The client includes a snapshot of all known tools when connecting to each server. Simplest — but the snapshot is stale the moment another server connects or disconnects.

## Security Considerations

- The client must control what's shared. A server should never enumerate sibling tools without the client's explicit participation.
- Tool descriptions may contain sensitive information. The client should allow users to configure which servers' tools are included.
- A malicious server could fingerprint the user's environment. Clients should consider this when honoring `tools/listAll` requests.
- The source field should be optional — clients may omit server identification.

## Status

The full proposal is in the Tool Audit repository as `mcp-spec-proposal.md`, ready for submission to the MCP specification discussions. The reference implementation (these skills) demonstrates the use case and provides a working proof of concept.
