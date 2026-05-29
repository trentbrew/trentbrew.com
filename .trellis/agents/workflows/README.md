# Workflows

Place repeatable task procedures here as `.md` files.

Each workflow file should follow the format:

```markdown
---
description: Short description of what this workflow does.
---

## Steps

1. Step one
2. Step two
// turbo
3. Auto-runnable step
```

Add `// turbo` above a step to allow the agent to auto-run it without confirmation.
Add `// turbo-all` anywhere in the file to auto-run every step.
