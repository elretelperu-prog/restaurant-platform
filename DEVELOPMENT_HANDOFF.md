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

- The temporary large **1** and **2** markers were successfully shown and visually confirmed by the user in Vercel Preview.
- They have now been removed completely.
- The original pagination indicator (`1 / 4`, `2 / 4`, etc.) remains unchanged.
- Verification-test commit: `dea48f67109d9b1874a5c0477a0838e484ca45ea`
- Marker-removal commit: `9b76ec799dbb23a84d9aaa63e5cff04c30a64ec0`
- `src/components/MenuPage.jsx` is back to its V56 content.

## Latest cleanup

- **Micro-cleanup 13** completed.
- Commit: `2fbc9cd76d27f8823e31d82e973199c103a1b5ee`
- Removed an older `.theme-futurista .page:nth-child(even)` background/box-shadow rule that is superseded later in the stylesheet.
- Expected effect: none; visual appearance and behaviour must remain unchanged.
- User verified micro-cleanup 13 successfully in Vercel Preview.
- **Micro-cleanup 14** completed: removed superseded physical-book spine/spine-light styling; these elements are disabled by later approved CSS.
- Cleanup commit: `e62db0262748cc4220d33b304a5526bd4420f2d1`
- User verified micro-cleanup 14 successfully in Vercel Preview.
- **Micro-cleanup 15** completed: removed the remaining obsolete base styling for `physical-book-spine` and `physical-book-spine-light`; both are disabled by the approved later CSS.
- Cleanup commit: `8d11666e35743bb519932b9005fd47b173d9871f`
- User verified micro-cleanup 15 successfully in Vercel Preview.
- **Micro-cleanup 16** completed: removed an older superseded style block for the physical left/right page-stack layers. These layers are disabled by the later approved V40 CSS.
- Cleanup commit: `30c4ee0c1a190fc8f15c8ddca35c6fd5102acfa8`
- User proceeded after micro-cleanup 16 review.
- **Micro-cleanup 17** completed: removed an obsolete `box-shadow` override for `physical-book-pages-left/right`; those legacy page-stack layers are disabled by later approved V40 CSS.
- Cleanup commit: `c0b4c7b4e1109f439f83f1664b65ed0afe5ab5e3`
- User verified micro-cleanup 17 successfully in Vercel Preview.
- **Micro-cleanup 18** completed: removed obsolete stronger contact-shadow rules for the legacy physical left/right page-stack layers, which are disabled later by the approved CSS.
- Cleanup commit: `0fd2527189b69545eeef1920a02361402ba85e9c`
- User verified micro-cleanup 18 successfully in Vercel Preview.
- **Micro-cleanup 19** completed: removed obsolete left/right positioning, border-radius and contact-shadow styling for the legacy physical page-stack layers, which are disabled later by approved CSS.
- Cleanup commit: `9b1f3288ce8e54263b8f2930100f7b966b90097d`
- User verified micro-cleanup 19 successfully in Vercel Preview.
- **Micro-cleanup 20** completed: removed an obsolete `bottom:2px` override for the legacy physical page-stack layers, which are disabled later by approved CSS.
- Cleanup commit: `d3625ef152c9298969b9e30e9f91ff2e0230dfe7`
- User proceeded after reviewing micro-cleanup 20.
- **Micro-cleanup 21** completed: removed obsolete left/right positioning and border-radius rules for the legacy physical page-stack layers, which are disabled later by approved CSS.
- Cleanup commit: `4b685ba6d52ac304dd08332d21627a82116268e2`
- User proceeded after reviewing micro-cleanup 21.
- **Micro-cleanup 22** completed: removed the obsolete base styling block for the legacy `physical-book-pages-left/right` layers (position, dimensions, border, paper gradient and shadow), which are disabled later by approved CSS.
- Cleanup commit: `ad08d077c87ec04aa13f61782169c56bf44dab20`
- User proceeded after reviewing micro-cleanup 22.
- **Micro-cleanup 23** completed: removed an earlier duplicate `display:none!important` rule for the legacy physical page-stack layers; the later approved V40 hide rule remains in place.
- Cleanup commit: `affe366f07a5f828c86a2dbbf1c5cadad8b3b10a`
- User proceeded after reviewing micro-cleanup 23.
- **Micro-cleanup 24** completed: removed an earlier duplicate `display:none!important` rule for the legacy spine/spine-light layers; the later approved combined V40 hide rule remains intact.
- Cleanup commit: `910c39c5dc2dd910365ebe1db82022387f9eef3d`
- User proceeded after reviewing micro-cleanup 24.
- **Micro-cleanup 25** completed: removed a superseded `bottom:-5px!important` override for `physical-book-cover`; multiple later approved cover rules replace its bottom position, with the final rule setting `bottom:-10px!important`.
- Cleanup commit: `dcf213c5f32dc9c5e229af64389493f5569f2d1e`
- User proceeded after reviewing micro-cleanup 25.
- **Micro-cleanup 26** completed: removed a superseded `physical-book-cover` block containing an old inset and shadow; later approved cover rules fully replace those properties.
- Cleanup commit: `e76e5b16b281b9df022f96378da6722d78613558`
- User proceeded after reviewing micro-cleanup 26.
- **Micro-cleanup 27** completed: removed an older superseded `physical-book-cover` geometry/shadow block (`inset`, border width/radius and shadow); later approved rules fully replace those properties.
- Cleanup commit: `8351add350ea2d1ceedc61a4c111632c4407ce8d`
- User proceeded after reviewing micro-cleanup 27.
- **Micro-cleanup 28** completed: removed a superseded `physical-book-cover` geometry/shadow block (`left/right/top/bottom`, radius and shadow); later approved cover rules fully replace those properties.
- Cleanup commit: `d2f5ac8b97f4845f5ec25bda39b67111ce710643`
- Expected effect: none; awaiting user verification before micro-cleanup 29.

## Next action

1. User verifies micro-cleanup 28 in Vercel Preview.
2. Continue incremental code cleanup from the confirmed V56 lineage.
2. Preserve all approved visual appearance and behaviour.
3. Each cleanup must be small and isolated.
4. After each meaningful change: commit -> Vercel Preview -> user verifies -> continue.

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
