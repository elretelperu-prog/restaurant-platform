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
- User proceeded after reviewing micro-cleanup 28 and requested two cleanup rounds per verification cycle.
- **Micro-cleanup 29** completed: removed a superseded `physical-book-cover` geometry/border/shadow block. Cleanup commit: `21e7e7debb5a0fccb685e03ace3eff321163d978`.
- **Micro-cleanup 30** completed: removed a superseded `physical-book-cover` background/border/shadow block. Cleanup commit: `6f90d8bbb58901044715ce9b36275e4227cdd6e8`.
- Later approved cover rules remain intact and fully replace these properties.
- User proceeded after reviewing micro-cleanups 29 + 30.
- **Micro-cleanup 31** completed: removed the penultimate superseded `physical-book-cover` appearance/geometry block; the final approved cover rule remains intact. Cleanup commit: `82feb10a0b9ec54965fcb7775cc7f06c33a71615`.
- **Micro-cleanup 32** completed: removed an early superseded `bookWrap` drop-shadow override; multiple later approved rules replace the shadow. Cleanup commit: `21b54168d3360fc256b25807b26a03e8f3619e75`.
- User proceeded after reviewing micro-cleanups 31 + 32.
- **Micro-cleanup 33** completed: removed a superseded `bookWrap` drop-shadow block; later approved shadow rules remain. Cleanup commit: `61c1ddfe72626fdccaa1658259d8bd10421146d7`.
- **Micro-cleanup 34** completed: removed a duplicate `bookWrap{width:89%!important}` override; the later final approved `bookWrap` block already sets the same width. Cleanup commit: `a8a0dce943095ed37ae2bf906e5ed11ae6a21439`.
- User proceeded after reviewing micro-cleanups 33 + 34.
- **Micro-cleanup 35** completed: removed a superseded `bookWrap` width/shadow block; later final rules set the approved width and shadow. Cleanup commit: `44641a9ee5eafc86132ee7e3407f7a3cfcc9d60d`.
- **Micro-cleanup 36** completed: removed an older superseded `bookWrap` height/alignment/shadow override; later approved layout rules replace all three properties. Cleanup commit: `eb7d08029691a599ad2ec0b7bf527f883059bee1`.
- User proceeded after reviewing micro-cleanups 35 + 36.
- **Micro-cleanup 37** completed: removed a superseded `bookWrap` layout/perspective/shadow block; the later final approved block replaces its width, height, margin, alignment, perspective and shadow. Cleanup commit: `c99e6e6e152f15017f2689646a6bfee7cc2711d0`.
- **Micro-cleanup 38** completed: removed a superseded `bookWrap` 92% width / mobile sizing override; the later final approved sizing is 89% with its current height/margin. Cleanup commit: `14ec9702fb95dd23f0a3f418875c60c881643b01`.
- User proceeded after reviewing micro-cleanups 37 + 38 and asked to continue two rounds at a time.
- **Micro-cleanup 39** completed: removed a duplicate final `bookWrap` sizing rule; the preceding final approved block already contains the exact same width, height and margin. Cleanup commit: `3c1778d395e6d989c3af604e4c6f5af73e704db8`.
- **Micro-cleanup 40** completed: removed the oldest superseded odd-page paper background/shadow rule; four later odd-page rules remain, with the final approved one still controlling appearance. Cleanup commit: `4d91fa1aa03b6f41cd62e053d8ea746f17703228`.
- User proceeded after reviewing micro-cleanups 39 + 40.
- **Micro-cleanup 41** completed: removed the oldest superseded even-page paper background/shadow rule; later even-page rules remain and control the approved appearance. Cleanup commit: `7dca250ad6e082b8b3b30c16126f98e510eb8c17`.
- **Micro-cleanup 42** completed: removed the next superseded odd-page paper background/shadow rule; later odd-page rules remain and control the approved appearance. Cleanup commit: `c761ab2a7f0e958b9bd01392d90c1b592c731973`.
- User proceeded after reviewing micro-cleanups 41 + 42.
- **Micro-cleanup 43** completed: removed the next superseded even-page paper background/shadow rule; later even-page rules remain. Cleanup commit: `888256a0abe6a77a8fed0bf81b1785ff5d1d7130`.
- **Micro-cleanup 44** completed: removed a superseded odd-page depth/background/shadow rule; the later approved odd-page styling remains. Cleanup commit: `4d664b69bb696259132769c41c2fd387e3cc3674`.
- User proceeded after reviewing micro-cleanups 43 + 44.
- **Micro-cleanup 45** completed: removed a superseded even-page depth/background/shadow rule; later approved even-page styling remains. Cleanup commit: `d77c49021db95496b8f15972681becb5bf0e4000`.
- **Micro-cleanup 46** completed: removed superseded odd-page background/shadow declarations from a mixed block while preserving its still-active `border-radius`. Cleanup commit: `8d61c8ed4b963689e7d0154b6ef92e12e06f36f0`.
- This completes the planned clearly-safe cleanup sequence. Remaining layered CSS includes structural or still-active declarations, so do not continue deleting mechanically.
- **Final cleanup audit completed after micro-cleanup 46.** No additional deletion is recommended: the remaining duplicate-looking `bookWrap`, `physical-book-cover`, and odd/even page rules still contain structural or active declarations (for example isolation/overflow, positioning/pointer-events, border-radius, and final approved appearance). Cleanup is therefore closed at micro-cleanup 46 to avoid changing the approved UI.
- Next development phase: functionality fixes for the fold/PageFlip/page-turn gesture, still on Preview only.
- **Stage 2 PageFlip closed-loop work started.** Commit `73800b06b2b05a00efdf7ee3dbbd7e399e4f8041` stabilizes touch ownership: normal one-finger page gestures are left to StPageFlip, idle fold animation is stopped while PageFlip is folding/flipping, and a conservative horizontal-swipe fallback completes next/previous turns if a mobile browser interrupts PageFlip's internal gesture. Dish tap interception and pinch/pan paths remain intact.
- Static code checks passed for PageFlip fallback, state guard, dish tap capture, pinch and pan paths. Await physical iPhone + Android verification. Do not start Stage 3 until the user explicitly says `Etapa 2 aprobada`.


- User supplied video `IMG_1543.mp4`: observed failure is not merely swipe recognition; during the turn the destination spread is not progressively revealed and instead appears abruptly at completion. Root cause identified in V41 Safari isolation CSS: inactive logical pages were forced to `visibility:hidden`, `opacity:0`, `content-visibility:hidden`, `contain:strict`, preventing PageFlip from painting the reverse/destination sheet during the fold. Stage 2 repair commit `c11793b07dfac7acad98cd2e03325aa7e7d6bb39` keeps all PageFlip sheets paintable during animation while inactive pages remain non-interactive. Await physical verification; Stage 3 remains blocked.


- User screenshot after `4203f18` exposed all four logical pages simultaneously during a partial turn (duplicated/overlapping menu text). Diagnosis: V41's custom `v41-visible-page` controller is fundamentally incompatible with PageFlip's temporary page re-parenting/stacking during a physical turn. Making its hidden pages visible fixed the abrupt reveal but exposed all logical faces. Stage 2 corrective commits: `7d3c698d2e21c53bdf5cbf972dd4e50b96fbeaaf` removes the custom visibility controller/class from `MenuBook.jsx`; `480b84d05c3eee302e8b70b13c00be74991b5b93` removes the associated V41 scene-isolation CSS. PageFlip again exclusively owns which sheet is rendered/stacked during the turn. Await physical iPhone/Android verification; Stage 3 remains blocked.


- User screenshots after `c24540d` still showed severe duplicate/overlapping menu faces both during a turn and during zoom. Further diagnosis found a second, independent conflict in the late `single-face-pageflip` CSS: it forced `transform:none!important`, `transform-style:flat!important`, and hidden backfaces on the actual `.page` DOM nodes/content. Those rules override the transforms StPageFlip applies to its HTML pages, so logical pages collapse onto the same plane; zoom makes the overlap especially obvious and the physical curl cannot render correctly. Stage 2 commit `6caa3c6221fcb0abccc6ad7a1d3d6b44345216e7` removes the transform cancellation/backface suppression and restores `preserve-3d`/transform ownership to PageFlip while retaining the approved transparent visual skin. Await physical verification; Stage 3 remains blocked.


- Video `IMG_1547.mp4` after `915bd94` showed improvement in curl geometry but printed faces still mixed during the fold. Diagnosis: previous repair correctly stopped cancelling PageFlip transforms, but then over-corrected by forcing `preserve-3d`/`will-change:transform` onto the page/content plane. Stage 2 commit `a99fdcc82e6ab4155126fcedc5931079f266320c` removes that forced inner 3D promotion while NOT restoring the harmful `transform:none`; PageFlip retains ownership of its wrapper transforms and printed content stays on a flat sheet plane. Await physical verification; Stage 3 remains blocked.


- Screenshots `IMG_1548.jpeg` (turn) and `IMG_1549.jpeg` (zoom) after `c66bfe1` still showed individual menu rows/photos peeling and overlapping instead of one coherent sheet. Final conflicting CSS was identified: `.single-face-pageflip{transform-style:flat!important}` flattened the PageFlip scene, while custom `.stf__parent .stf__item/.stf__block` rules were overriding PageFlip-generated renderer wrappers (background/shadow/filter). Stage 2 commit `83aa97db41aaea618d1d9cbea82e59d33b6fdee0` removes both renderer-level overrides and also stops forcing `will-change` on page nodes. Visual skin/padding remains; PageFlip now fully owns its generated wrappers and scene transforms. Await physical iPhone/Android verification; Stage 3 remains blocked.


- **Stage 2 architectural reset (closed loop):** compared current implementation with earlier known-good PageFlip implementations, especially V16 `e643c11` and V5.9 `23cd14d`. Root cause was architectural drift: later CSS changed the actual logical `.page` from V16's opaque, clipped, flat single-sheet surface into `transform-style:preserve-3d`, allowing descendants to become independently composited during curl/zoom; later Stage-2 fallback/state hooks also diverged from the proven touch path. Commit `8085381e2b6013004825a38293906987e072eeea` restores the proven sheet invariants (`isolation`, `overflow:hidden`, opaque page, hidden backface, flat content plane) without touching PageFlip-generated wrappers. Commit `fb877a01c80928bd6d1ab16f731f4e0d52ae1488` removes the added swipe fallback/changeState interference and returns normal one-finger turns to PageFlip's native event flow while retaining existing pinch/pan and dish-tap behavior. Static audit confirms no V41 scene controller, no `.stf__item/.stf__block` overrides, no `turnTouch` fallback, and no page-level `preserve-3d`. Await physical iPhone/Android verification. Stage 3 remains blocked until literal `Etapa 2 aprobada`.


- User approved an isolation experiment because the real menu still showed the same corruption after architectural cleanup. Added a **diagnostic-only PageFlip scene** activated with query `pfdiag=1`; normal Preview behavior is unchanged. Commit `985fb38599c31176cf068e0c2dc110c91fda5fc6` adds four extremely simple PAGE 1–4 sheets and bypasses restaurant page skin, stationary book surface, idle fold hooks, zoom/pan interception, and dish logic in diagnostic mode. Commit `a82fcc4e0d2000e9b240f2d4990ab32542d72674` adds isolated diagnostic CSS with no perspective/filter/transform on the outer wrapper. Purpose: determine whether native `page-flip` itself renders correctly on physical iPhone/Android. If diagnostic pages curl correctly, fault is in integration/restaurant page composition; if diagnostic pages also corrupt, fault is PageFlip configuration/library/browser path. Stage 3 remains blocked.

- Diagnostic viewport correction: commit `c58ccfe2d246356d3ee63d19343d4d41ac59b242` moves/sizes only the `?pfdiag=1` isolated scene so PAGE 1–4 stay fully visible above the fixed bottom dock on mobile. Normal app unchanged. Await slow physical turn test.

- Diagnostic usability update: commits `cddfaec00fd94334a36ee46bbff3b74c3355281f` and `633a95ba154f93af9d4b0e3796a8aa4f8dff67fc` expose the isolated scene at clean path `/pageflip-test` (query `?pfdiag=1` still works) and give its host landscape/two-page geometry. Await physical verification that PAGE 1 | PAGE 2 render side by side and native curl behavior.

- **Proven clean-engine backup:** `aea0246aa54e0178b3e0c777c17ac16d43b86f30` is the first valid isolated PageFlip baseline physically verified by user video: PAGE 1–4 curl as coherent sheets on Android. Preserve as rollback checkpoint.
- **Layer 1:** commits `1ba7ec1`, `80d0402`, `cd92636` add only real restaurant headings + 10 dish names + page number to the same fixed clean engine at `/pageflip-layer1`. No photos, prices, futuristic row SVG, stationary physical-book skin, idle fold, zoom/pan, or dish interactions yet. Test sheet coherence before Layer 2.

- **Physical verification:** user approved Layer 1 on iPhone: real headings + 10 dish names remain glued to the curling sheet during slow turns. Layer 1 is now a stable rollback checkpoint at `c41e8f8`.

- **Layer 2 candidate:** `f41d50a`, `f31d412`, `b40bad7` add isolated row hierarchy, item numbering and real descriptions on the exact clean PageFlip geometry at `/pageflip-layer2`. Still intentionally excludes photos, prices/connectors, physical book skin, idle corner fold and zoom/pan. Await physical slow-turn verification before Layer 3.

- **Physical verification:** user approved Layer 2 on iPhone; row hierarchy + names + descriptions remain coherent during page turn. Stable rollback point before Layer 3: `1e85510`.
- **Layer 3 candidate:** `0c4b2b7`, `a4bfa69`, `bc6442a` add real dish photos and prices to the clean engine at `/pageflip-layer3`, still excluding futuristic SVG/connectors, physical skin, idle corner fold and zoom/pan. Await physical verification.
- **Preview usability requirement:** user does not want to copy changing deployment URLs. Prefer the stable branch alias for `preview-v57-number-test` once confirmed in Vercel; do not invent it. Per-deployment URLs remain fallback only.

## Next action

1. Cleanup audit is complete; do not continue mechanical CSS deletion.
2. Stage 2: user physically verifies PageFlip on iPhone and Android; continue fixing Stage 2 from their results until explicitly approved.
3. Preserve the approved visual design while repairing functionality.
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

## 3D page-turn architecture experiment — 2026-10-06

- User approved starting an isolated Three.js / React Three Fiber prototype after the StPageFlip Layer 4 geometry dead-end.
- TRUE protected baseline for this experiment: user-verified Layer 3 commit `b94e4866a1e7ebee809f19d09b4d33bdd1366074`.
- Experimental branch: `preview-r3f-book-prototype`. **Never merge to or modify main without explicit user approval.**
- Experimental route: `/book3d-prototype`.
- First validation goal only: two-page 3D spread + curved/deforming page controlled continuously by finger drag; release completes or returns. Do not port the full menu, zoom/pan, idle fold, or production UI until physical iPhone/Android validation.
- Added `three` + `@react-three/fiber`, `Book3DPrototype.jsx`, isolated route, and Vercel rewrite. Current route commit: `ad4e137f540a0245cc2d558bc9c662ada7cb3cae`.


## 3D prototype checkpoint — 2026-10-06
- Branch: `preview-r3f-book-prototype`; production/main remains untouched.
- Fixed preview route: `/book3d-prototype`.
- iPhone verification at `98dffd1`: spread aligns at spine; finger deforms real subdivided mesh and menu content stays attached.
- `0e8d9a7` initially failed build due duplicate `u`; fixed by `635fd74`.
- `7d1f222`: independent front/back page surfaces.
- Current Phase 1 checkpoint: `8ecc9c5`. Replaced cylindrical formula with hinged 3D turn plus progressive curl, added readable reverse texture, left/right underpages, center gutter and dynamic lighting/shadows.
- Next action: physical iPhone/Android validation of this checkpoint before further tuning. Do not merge to main.

- Closed-loop continuation after user rejection of 8ecc9c5: screenshots showed whole-sheet wall/rotation, not a localized paper fold.
- 55a5df6/4483676 introduced moving fold-line geometry and preserved shared front/back geometry.
- Current checkpoint candidate: da4a4b3 (geometry core 3b84d78). Uses a 64x40 subdivided sheet, bottom-corner-led diagonal fold line, localized curl band, stable flat remainder, spine lift, separate front/back surfaces, and slower finger mapping. Await physical iPhone validation before declaring Phase 1 complete.
