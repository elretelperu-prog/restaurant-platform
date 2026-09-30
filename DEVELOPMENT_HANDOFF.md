# Restaurant Platform — Development Handoff

> This file is the continuity checkpoint for development across ChatGPT conversations.
> Read this file and verify the referenced GitHub branch/commits before making changes.

## Current working state

- Repository: `elretelperu-prog/restaurant-platform`
- Approved/test baseline: **V56**
- Baseline commit: `8fefb0c447ce31ed41fdb22295fb1a9d60902672`
- Baseline message: `V56 micro-cleanup 12: remove superseded odd-page paper rule`
- Current test branch: `preview-v57-number-test`
- Environment: **Vercel Preview only**
- Production/approved version: **DO NOT MODIFY unless the user explicitly approves it.**

## Current temporary verification

A temporary visual test was added to confirm that ChatGPT can modify the correct Preview branch:

- Page 1 displays a very large **1**.
- Page 2 displays a very large **2**.
- The original pagination indicator (`1 / 4`, `2 / 4`, etc.) was restored after the first test.
- File changed: `src/components/MenuPage.jsx`
- Temporary visual-test commit: `dea48f67109d9b1874a5c0477a0838e484ca45ea`
- User visually confirmed in Vercel Preview that the large **1** and **2** are visible.

## Next action

1. Remove the temporary large **1** and **2** markers completely.
2. Preserve all approved visual appearance and behaviour.
3. Continue incremental code cleanup from the confirmed V56 lineage.
4. Each cleanup must be small and isolated.
5. After each meaningful change: commit -> Vercel Preview -> user verifies -> continue.

## Development rules

- Never use Production/main as an experimental workspace.
- Never change the approved version without explicit user approval.
- Do not redesign the UI during cleanup.
- Do not change functionality during cleanup unless explicitly requested.
- Prefer small, reversible commits.
- If a cleanup causes any visual or behavioural difference, stop and revert/repair before continuing.
- When the user says "hazlo en la aplicación", modify the actual application code; do not create a mockup/image instead.
- Before starting work in a new ChatGPT conversation, read this file and verify the referenced branch and latest commit in GitHub.

## Handoff maintenance

Update this file whenever:
- the working branch changes;
- a version is approved;
- a significant test is completed;
- the next development objective changes;
- development is about to continue in a new ChatGPT conversation.

The purpose is to make GitHub the durable source of truth instead of relying on a single ChatGPT conversation's length.
