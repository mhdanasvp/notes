# Claude Code

Claude Code is Anthropic's CLI for interacting with Claude directly from the terminal.

## Setup

```sh
# install
npm install -g @anthropic-ai/claude-code

# start
claude

# set up terminal integration (enables shortcuts, proper rendering)
/terminal-setup

# initialize CLAUDE.md for the current project
claude init
# or inside a session
/init
```

## CLI Flags

```sh
claude "fix the bug in index.js"        # one-shot prompt, no interactive session
claude --model claude-opus-4-7          # start with a specific model
claude --resume                         # resume the last session
claude -p "explain this" --output-format json   # print output as JSON (non-interactive)
```

## Context

```sh
@file.js          # add a file to context
@src/             # add a folder to context
# type @ to browse and select files interactively
```

## Memory

```sh
#                 # type # to add or reference memory
# memory persists across sessions — good for preferences, recurring context
```

## Shell Commands

```sh
! ls              # run a shell command directly inside a session
# output lands in the conversation context
```

## Slash Commands

| Command | Description |
| --- | --- |
| `/clear` | clear current session |
| `/compact` | compress context into a short summary |
| `/exit` | exit Claude |
| `/init` | create or update CLAUDE.md for the project |
| `/help` | show available commands |
| `/model` | switch model (Opus, Sonnet, Haiku) |
| `/config` | open settings |
| `/review` | review a pull request |
| `/doctor` | check Claude Code health and config |
| `/cost` | show token usage and cost for the session |
| `/bug` | report a bug to Anthropic |

## Modes

```sh
alt + m           # toggle between modes
```

- **Auto** — default, Claude decides when to act
- **Plan** — Claude proposes a plan before making any changes
- **No tools** — chat only, no file edits or commands

## Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Shift + Tab` | toggle auto-accept (approves all tool calls without prompting) |
| `Shift + Enter` | add a new line without submitting |
| `Ctrl + C` | cancel current action |
| `Ctrl + R` | search command history |
| `Esc` | interrupt / go back |

## CLAUDE.md

- Claude reads `CLAUDE.md` at the project root automatically at the start of every session
- Use it to document project commands, architecture, and conventions
- Global memory lives in `~/.claude/CLAUDE.md` (applies to all projects)
