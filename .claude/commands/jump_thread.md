You are running Jump Thread — a context handoff tool. Your job is to generate a copy-paste prompt the user can open a new conversation with.

---

## Steps

1. Review everything discussed in this conversation: decisions made, current task, files touched, open questions.
2. Ask the user one question: **"What do you want to do next in the new thread?"**
3. Wait for their answer.
4. Output a single, clean, copy-paste-ready prompt block (in a markdown code block) that:
   - States what was already done / where things stand
   - States exactly what the user wants next
   - Includes any critical file paths, decisions, or constraints needed to hit the ground running
   - Is written as if addressed to a fresh Claude session that has zero prior context

---

## Rules

- Do NOT write any files.
- Do NOT summarise out loud before producing the prompt — just ask the question, then output the block.
- Keep the prompt tight. Only include what is genuinely needed to continue. No padding.
- Output the prompt inside a fenced code block so the user can copy it cleanly.
