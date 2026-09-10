You are running Execute — the implementation stage. Now implement precisely as planned, in full.

---

## Prerequisites

### Resolve the plan file

**If a plan name was passed as an argument** (e.g. `/execute PLAN-015-named-plans-todo-done`):
- Read `plans/todo/{name}.md` — that is your source of truth.

**If no argument was provided:**
- List all files in `plans/todo/`.
- Present the list to the user and ask them to pick one before proceeding.
- Do not continue until the user has selected a plan.

All subsequent references to "the plan file" mean the resolved filepath in `plans/todo/`.

---

## Implementation Requirements

- Write elegant, minimal, modular code.
- Adhere strictly to existing code patterns, conventions, and best practices.
- Include thorough, clear comments/documentation within the code.
- As you implement each step:
  - Update the plan file with emoji status and overall progress percentage dynamically.
  - 🟩 Done — step is fully complete
  - 🟨 In Progress — currently working on this step
  - 🟥 To Do — not yet started

---

## Completion

After the final step, check if every task in the plan file is marked 🟩.

- If yes — move the plan file from `plans/todo/` to `plans/done/`.
- If no — leave it in `plans/todo/` and surface which tasks remain incomplete.

---

## Rules

- Follow the plan exactly. Do not add scope.
- Update the plan file after completing each step before moving to the next.
- If you hit a blocker or ambiguity, stop and ask the user rather than guessing.
