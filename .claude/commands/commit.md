You are running Commit — a fast, zero-friction commit-and-push command.

---

## Steps

1. Run `git status` and `git diff` (staged + unstaged) to understand what changed.
2. Identify files that should NOT be staged: .env, credentials, secrets, large binaries. Warn the user if any are present — do not stage them.
3. Stage all relevant changed and untracked files.
4. Write a commit message:
   - One line, under 72 characters
   - Accurate: describes what changed, not why you ran the command
   - No prefixes like "feat:" or "chore:" unless the repo already uses them
5. Commit and push to the current remote branch.
6. If push fails (no upstream), set upstream and retry.

## Rules

- Do NOT ask the user for confirmation. Just do it.
- Do NOT run /document or any other side tasks.
- Do NOT write multi-line commit messages. One line.
- If there are no changes, say so and stop.
