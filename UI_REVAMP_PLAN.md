# Yathra — Complete UI/UX Revamp

## Context

The application is functionally complete and verified: 132 TypeScript files, 28 routes, 23 components, 13 subjects / 194 units / 751 topics of bundled curriculum, 329 passing tests, clean typecheck and lint, 21/21 `expo-doctor`, and android/ios/web exports that all build. Nothing about the data model, domain logic, storage or localization architecture needs to change.

What is wrong is the surface. The app reads as a correct utility rather than something a student wants to open daily. Concretely, from a screen-by-screen audit (§1): Home is six bare `View`s separated by `marginTop`, with no container, no focal point, and the countdown rendered two type steps *smaller* than a percentage; the six-tint subject identity system exists in the tokens and is used almost nowhere, so every subject looks the same; the app computes "where you should be" and never shows it; and there is no motion anywhere except one progress bar and one sheet.

This plan revamps the entire interface — every screen, one visual language — while preserving all existing behaviour, keeping the app fully offline, and keeping all three languages first-class. It also fixes four genuine defects the audit turned up (§1.3).

Design authority, in order: the revamp brief → existing functional behaviour → `design-guidelines.md` → the supplied reference image. The reference sets the *level* of polish and hierarchy; it is not copied. Four elements of it are deliberately **not** built: the avatar (there is no account), the notification bell (there are no notifications), the "7 day streak" badge (streak pressure is ruled out by the brief §52), and the generic quote (replaced by a state-derived coach line). Building UI for features that do not exist is forbidden by brief §41.

---

## 1. UI/UX audit

### 1.1 Structural findings

1. **Home has no composition.** `app/(tabs)/index.tsx` is six unwrapped `View`s spaced by inline `marginTop: md|xl|xxl`. There is no card, panel or hero anywhere on the screen. Rhythm is entirely accidental.
2. **Hierarchy is inverted.** The countdown — the emotionally central number — uses `heading` (22px). The overall percentage uses `display` (48px). The screen's largest element is its least motivating one. A vestigial `flexDirection: 'row'` wrapper sits around the percentage with nothing to align to.
3. **Type scale is barely used.** Of 16 variants, screens lean on `title`/`body`/`caption`. `display`, `stat` and `subtitle` appear a handful of times. Hierarchy is carried by margins, not type — which is exactly backwards from the design system's stated principle that "hierarchy comes from size".
4. **Subject identity is built and never used.** `useSubjectTint()` assigns each subject a stable tint from `SUBJECT_TINT_ORDER`, and `SubjectRow` accepts a `color` prop for exactly this. `useSubjectTint` has **zero consumers** across all 28 routes, and neither `subjects.tsx` nor `progress.tsx` passes `color`. Every subject therefore renders identically grey. This is the single cheapest large win available.
5. **"Am I on track" is a word, not a picture.** `useOnTrack()` returns `expectedProgress`, `actualProgress` and `gap`. The UI renders only a status label and a bar of `actualProgress`. The comparison that gives the status meaning is discarded.
6. **Heavy duplication, therefore inconsistency.** 13 hand-written copies of the `View`+`AppBar`+`Screen` detail shell; 9 copies of the chip wrap row; 3 copies of the onboarding option card with its hand-drawn radio dot; 3 unshared stat-tile variants; hand-rolled hairline rows in `catch-up.tsx` and `weekly-review.tsx` instead of `ListRow`; 5 copies of the centred message screen.
7. **No interaction feedback.** Press states are a background-colour swap. `Animated` appears in exactly two components (`ProgressBar` width, `BottomSheet` translateY). Nothing acknowledges completing a task or a topic.
8. **Tab bar active state is colour-only** (`ink` vs `steel` on icon and label), which the design system explicitly forbids — "always include a word or icon alongside the colour" — and which fails for colour-blind users.
9. **Tokens defined and never referenced:** `sizes.touchTarget`, `sizes.progressBarThin`, `radius.xs`, `radius.sm`, `radius.panel`.

### 1.2 What is already good and must be kept

The token layer is a faithful port of the design system and needs only additive extension. `Screen`, `Button`, `ListRow`, `BottomSheet`, `ConfirmDialog`, `TextField` and `Badge` are well-built and stay. `EmptyState` already uses the right pattern (tinted panel + icon + one line + one action) and needs only visual refinement. `Text` correctly never sets `fontFamily`. The generous Indic line heights and `tabBarHeight: 78` are deliberate fixes that must survive the revamp — do not "tidy" them back to the Latin ratios.

### 1.3 Real defects found during the audit (fix as part of this work)

- `app/study.tsx` duration chips build their label as `` `${option} min` `` — **hardcoded English, bypassing i18n**. Must use `formatMinutes(t, option)`.
- `app/study.tsx` truncates the topic picker to `topics.slice(0, 12)` with no way to reach the rest of a subject's topics.
- `formatRelativeDay` in `src/i18n/format.ts` documents "Today / Tomorrow / Yesterday" but only special-cases today; tomorrow and yesterday fall through to the weekday branch.
- `plan.empty.week.title` exists in all three dictionaries and is never rendered.
- Home offers no way back into a running study session — a student who backgrounds the app mid-session has to find `/study` again.
- `status.behind.label` reads `'Behind'`. Brief §25 asks that falling behind never be stated that bluntly. The four status labels and messages get a copy review in all three languages so the word the student sees points forward ("Let's catch up") rather than passing judgement; the underlying `OnTrackStatus` ids do not change.

---

## 2. Visual language

### 2.1 Token extensions (`src/theme/tokens.ts`)

Every addition below is either already specified in `design-guidelines.md` but absent from code, or added deliberately with light **and** dark values as the system's Iteration Guide requires.

| Addition | Value | Justification |
|---|---|---|
| `typography.heroStat` | 64 / 500 / 76 / -1.5 | The system's `stat-display` (64px), never ported. This is the countdown. |
| `typography.statSm` | 28 / 500 / 38 / 0 | Mid-tier metric for 2-up stat tiles. Uses the existing `heading-3` size; no negative tracking below 28px, per the system. |
| `elevation.level1`, `level2` | Ported from the system's table | The system defines four levels; only a level-4 equivalent (`overlayShadow`) exists in code. Level 2 is what "mobile cards" are specified to use. |
| `easing.standard/enter/exit` | The three documented cubic-béziers | Defined in the markdown, never ported. Needed for `Animated` via `Easing.bezier`. |
| `colors.heroFrom` / `heroTo` | light `#050038` → `#3b3f8f`; dark `#1e2140` → `#141428` | The gradient hero. Derived by interpolating `inkDeep` toward `link` (light) and from `infoSoft`-dark toward `canvas`-dark. |
| `colors.onHero` / `onHeroMuted` | `#ffffff` / `#d5d7e0` in **both** themes | The hero is dark in both themes, so `onSurfaceInverse` (which flips to dark ink) is wrong here. |
| `sizes.ring`, `ringThickness`, `ringSm` | 96 / 8 / 64 | Progress rings. |

Contrast on the new pairs is measured, not assumed. Against the gradient's worst point in each theme: `onHero` scores 9.16:1 (light) and 15.59:1 (dark); `onHeroMuted` scores 6.38:1 and 10.86:1 — all clear the 4.5:1 body-text bar. This is also why dedicated hero foregrounds are needed rather than reusing existing tokens: `muted` on the light hero gives only 3.87:1, and dark `muted` gives 2.50:1, which fails outright.

**On gradients:** `design-guidelines.md` never mentions gradients — it neither defines nor forbids them. Adding one is therefore a deliberate extension, and it is confined to exactly one role: the hero band. It is expressed as two named tokens so it stays theme-aware and reviewable, per Iteration Guide items 2–3. No gradient appears on any button, card, row, badge or icon.

### 2.2 The composition rule

Every screen resolves to the same four-part rhythm, which is what actually produces "one product" rather than 28 designs:

```
HERO or screen title        one focal element, largest type on the screen
PRIMARY SECTION             the thing the student came for
SECONDARY SECTIONS          supporting glances, tinted sparingly
ONE PRIMARY ACTION          full-width pill, above the safe area
```

Constraints held throughout: at most **one** hero per screen; at most **two or three** tinted surfaces per viewport (the system's stated rhythm); cards group, they do not wrap everything; shadows only on the hero inset card and true overlays; every button stays a pill.

### 2.3 Subject identity

Each subject already owns a stable tint. The revamp makes that visible everywhere a subject is named: `SubjectMark` — a rounded-square tile filled with the tint background, holding a two-character monogram in the paired `-on` foreground.

The monogram is **authored per subject per language** as a `mark: LocalizedText` field in `src/data/curriculum/subjects.ts` (e.g. Physics → `en: 'PH'`, `si: 'භෞ'`, `ta: 'பௌ'`). It is not derived by slicing the name: a Sinhala or Tamil "first letter" is a grapheme cluster of a base consonant plus dependent vowel signs, and `slice(0, 2)` on UTF-16 code units splits it into a broken glyph. Thirteen subjects × three languages is 39 reviewable strings; deriving it is both harder and wrong.

---

## 3. Screen-by-screen design

### Home — `app/(tabs)/index.tsx`
Rebuilt around the hero. Order: **gradient hero** (full-bleed, background to y=0, content offset by `insets.top`, bottom corners `radius.xxxl`) containing the cohort label, the journey line, the exam-window chip, `heroStat` countdown, and an inset `surfaceRaised` card holding overall percentage + `JourneyProgress` + status word → **coach line** (one sentence, no card) → **resume-session banner** when a study session is active (fixes §1.3) → **Today's plan** with a `SubjectMark` per task row and a `3 tasks · 2h 15m` summary → **This week** as seven day cells plus a completion figure → **Subjects** as a 3-up row of ring cards → **primary `+ Add task`** with secondary `▶ Start studying`. `StatusPanel` moves into the hero's inset card as a word plus a catch-up affordance, so the screen keeps one status, not two.

### Subjects — `app/(tabs)/subjects.tsx`
`SubjectCard` per subject: tinted header strip with `SubjectMark` and name, large percentage, `ProgressBar` in the subject tint, current-focus topic, `12 of 21 topics`, chevron. Passing `useSubjectTint()` through is the fix for §1.1(4).

### Subject detail — `app/subject/[subjectId].tsx`
Compact tinted subject header (mark, name, `ProgressRing`, current focus, unit-level-tracking note where applicable), then units as numbered sections (`01`, `02`, …) each with a unit percentage, a thin bar and its `TopicRow`s. The status `BottomSheet` keeps its one-tap `SegmentedControl`-style behaviour; long-press still cycles.

### Plan — `app/(tabs)/plan.tsx`
Keeps the Today / This week / Later segmentation and all overdue behaviour. Today gains a load summary line; This week gains a **workload bar row** (one bar per day, height from that day's planned minutes) above the existing `WeekStrip`; Later keeps date groups. Task rows gain `SubjectMark`. The full-width "move all to today" button stays as-is — it exists because the Tamil label overflows a section header.

### Task modal — `app/task.tsx`
Same fields, restaged as a focused sheet-like modal: title field first and autofocused, subject chips carrying their tint, `DayPicker`, duration chips, optional topic row. No enterprise form framing; the primary action is anchored above the safe area.

### Progress — `app/(tabs)/progress.tsx`
Opens with a stat header (overall percentage + `JourneyProgress`), then subject rings, then a **7-day study-time bar row**, then the week's figures as 2-up `StatTile`s, then past papers and weekly review as navigation rows. Replaces the local `Dot` with `Badge`/`SubjectMark`.

### Weekly review — `app/weekly-review.tsx`
Large completion `ProgressRing` with `11 of 14`, 2-up `StatTile`s for topics and study time, per-subject verdict rows using `SubjectMark` + `Badge` (replacing hand-rolled hairline rows), then "Focus next week" as a short list. Reads as a reward, not a report.

### Study — `app/study.tsx`
Setup keeps chips but fixes the untranslated duration label and the 12-topic truncation (searchable/scrollable full list in a sheet). The running state becomes a distraction-free focus screen: subject-tinted calm ground, `ProgressRing` around a `heroStat` monospace-figures clock, and two large pill controls. The completion prompt keeps its current — correct — behaviour where "Did you finish this topic?" is answered *before* the session is finalised.

### Past papers — `app/past-papers/*`
Index: one summary card (completed / average / best) using a shared `StatTile`, then per-subject rows with `SubjectMark` and a mini ring. Detail: years as a **chip grid** rather than a long row list, with state carried by icon *and* colour; the editor sheet stays.

### Catch-up — `app/catch-up.tsx`
Supportive tinted panel headline, per-subject counts as proper `ListRow`s with `SubjectMark` (replacing hand-rolled rows), the 7-day preview as day cards, the daily-limit note, and one primary action. Language stays "let's get you back on track" — never "you are behind".

### More & settings — `app/(tabs)/more.tsx`, `app/settings/*`
Stay minimal and grouped. Gains: a small identity header on More (cohort + stream + subject marks), consistent grouped `ListRow` sections, and the shared detail shell. `settings/data.tsx` gets a proper inline status surface instead of three ad-hoc conditional `Text` lines.

### Onboarding — `app/onboarding/*` + `src/screens/onboarding/OnboardingStep.tsx`
Same five steps, same 1-minute flow, no added slides. The shared frame gains a numbered `StepIndicator` (`01 — 05`) replacing hand-drawn dots, larger question typography, and a sticky footer. Option cards become a shared `OptionCard` (replacing three hand-rolled copies with their raw radio dots). The Ready step becomes a personalised moment: cohort, stream, the three subjects with their marks and tints, then `Start my journey`.

### Empty, error and overlay states
Every empty state is refreshed on the existing tinted-panel pattern with a tint chosen per context. `RecoveryScreen`, `+not-found` and the study/catch-up confirmations move onto a shared `MessageScreen`. `plan.empty.week.title` gets rendered (fixes §1.3).

---

## 4. Components

### New (`src/components/`)
| Component | Purpose |
|---|---|
| `Hero` | Full-bleed gradient band: background to y=0, content offset by `insets.top`, bottom corners rounded, optional inset card. |
| `JourneyProgress` | Actual-progress fill plus an expected-pace marker and label. The flagship fix for §1.1(5). |
| `ProgressRing` | Animated SVG ring with centre label and optional caption. |
| `SubjectMark` | Tinted rounded-square monogram tile, two sizes. |
| `SubjectCard` | Ring/percentage subject card for Home and Subjects. |
| `StatTile` | One metric + label; replaces three unshared copies. |
| `DayCells` | Seven-day state row for Home. |
| `LoadBars` | Per-day workload bars for Plan and Progress. |
| `CoachLine` | Renders the domain-selected coach message. |
| `StepIndicator` | `01 — 05` onboarding progress. |
| `OptionCard` | Selectable card with a proper radio affordance. |
| `ChipGroup` | The wrap row currently copied 9 times. |
| `DetailScreen` | `View` + `AppBar` + `Screen` shell, currently copied 13 times. |
| `MessageScreen` | Centred title/body/actions, currently copied 5 times. |
| `AnimatedNumber` | Counts a figure up on change; reduce-motion aware. |

### Reworked
`Card` (gains an optional `elevation` level and a pressed scale), `ProgressBar` (tint + marker support), `EmptyState`, `SectionHeader` (optional action slot), `TaskRow` / `SubjectRow` / `TopicRow` / `WeekStrip` / `StatusPanel` (subject marks, tints, better rhythm), `Chip` (tint variant, tokenised `minHeight`), `SegmentedControl` (tokenised sizes), the tab bar (adds a non-colour active indicator, keeps `tabBarHeight: 78`).

### Barrel
`src/components/index.ts` currently exports zero types. Export the prop and variant types alongside the components so screens stop deep-importing.

---

## 5. Logic, localization and motion

### 5.1 Domain (brief §45 — no logic in components)
- **New** `src/domain/coach.ts`: `selectCoachMessage(input) → { id: CoachMessageId; params?: Record<string, number> }`. Pure, deterministic, priority-ordered over on-track status, tasks completed today, topics completed this week, days remaining and `journey.notStarted`. Returns an **id**, not a translation key, so `src/domain` keeps no dependency on `src/i18n`; a hook maps id → key. Fully unit-tested.
- **New** `dayLoad(tasks, weekDates)` in `src/domain/tasks.ts`: planned minutes per day, normalised for bar heights. Tested.
- Everything else in `src/domain` and all of `src/storage` is untouched. No persisted type changes, so no schema migration.

### 5.2 Localization
- Roughly 45–60 new keys (coach messages, hero labels, new section headings, stat captions, week/load labels, onboarding step wording), authored in **all three** dictionaries in the same commit. `si.ts`/`ta.ts` are typed against `en.ts`, so a missed key is a compile error — the existing i18n test suite also enforces placeholder parity.
- **New** `weekdayNarrow(t, date)` in `src/i18n/format.ts` plus narrow weekday names in all three dictionaries. Home's day cells need a 1–2 character weekday; Sinhala and Tamil cannot be truncated from the short form without breaking a grapheme cluster.
- **Fix** `formatRelativeDay` to actually implement tomorrow and yesterday.
- **Fix** the hardcoded `` `${option} min` `` in `app/study.tsx`.
- `mark: LocalizedText` added to all 13 subjects.
- Layout rules that must hold: no fixed-height text containers; hero and card labels wrap rather than truncate; `numberOfLines` only where truncation is genuinely acceptable; every new surface reviewed at 200% text scale.

### 5.3 Motion (RN `Animated` only — no Reanimated)
One orchestrated moment per screen, as the design system asks. Progress bars and rings animate to new values; `AnimatedNumber` counts percentages up; task completion plays a short check scale; cards scale slightly on press; the hero fades its content in once on mount; tab changes cross-fade. Durations come from `motion.fast/base/slow` with the newly ported easings. Only `opacity` and `transform` are animated, except progress width/`strokeDashoffset`, which cannot be expressed otherwise.

A new `useReduceMotion()` hook centralises the `AccessibilityInfo` check that `ProgressBar` and `BottomSheet` currently each do themselves, and every animated component cuts to the end state when it is on.

### 5.4 Accessibility
Touch targets stay ≥44/48px. Every state keeps a word or icon, never colour alone — including the new tab-bar indicator and the past-paper year grid. Rings and bars keep `accessibilityRole="progressbar"` with real values; `JourneyProgress` additionally states both figures in text, because a marker position is not perceivable to a screen reader. Icon-only controls keep labels. Headings stay ordered.

---

## 6. Execution order

0. Copy this plan to `UI_REVAMP_PLAN.md` in the repo (brief Phase 3).
1. `npx expo install react-native-svg expo-linear-gradient`; token extensions; `useReduceMotion`; measure every new colour pair for contrast.
2. New primitives: `Hero`, `ProgressRing`, `JourneyProgress`, `SubjectMark`, `StatTile`, `AnimatedNumber`, `ChipGroup`, `DetailScreen`, `MessageScreen`, `OptionCard`, `StepIndicator`.
3. `src/domain/coach.ts` + `dayLoad` + their tests; i18n additions across all three dictionaries; subject marks; `weekdayNarrow`; the three i18n/format fixes.
4. Home. This is the reference implementation of the new language — get it right before propagating.
5. Subjects, subject detail, Plan, task modal.
6. Progress, weekly review, study, past papers, catch-up.
7. Onboarding, More, all six settings screens, empty/error/overlay states, tab bar.
8. Reworked shared components; delete the 13/9/5/3 duplicated shells by migrating every consumer.
9. Functional QA (§7.1), then visual QA (§7.2), then the polish pass.

---

## 7. Verification

### 7.1 Functional — nothing may regress
`npx tsc --noEmit`, `npx expo lint`, `npx jest`, `npx expo-doctor`, and `expo export` for android, ios and web must all be clean. The 329 existing tests must pass; only component-test queries may change (no domain or storage test may need editing — if one does, behaviour was altered and that is a bug in the revamp). Add tests for `coach.ts`, `dayLoad`, `weekdayNarrow`, `formatRelativeDay`'s fixed branches, and the new components' rendering in all three languages.

Then the brief's §55 walkthrough, driven through the web build: fresh install → onboarding in English → Home → add a task → complete it → update a syllabus topic → Progress → start and finish a study session → weekly review → switch to Sinhala → navigate everything → switch to Tamil → navigate everything → reload → confirm all data survived.

Offline proof: `grep` for `fetch(`, `XMLHttpRequest`, `WebSocket`, `http://`, `https://` across `src` and `app` must return nothing runtime-related, and the reviewed build must run with Chrome's network throttling set to offline.

### 7.2 Visual — the existing harness, extended
`devtools/serve.js` + `devtools/shots.js` already seed realistic local data and screenshot 19 screens in headless Chrome inside an exactly-sized iframe (`/__frame?src=…&w=&h=`, because headless Chrome ignores `--window-size` for the CSS viewport). Reuse it, with three scoped additions:

- **Tall capture for scrolling screens.** The revamped Home is well past 844px, and the harness only captures what fits the iframe. Add a `tall: true` flag per screen in `shots.js` that requests `h=2200`, and capture those screens twice — once at the true 844px viewport for fidelity, once tall so nothing below the fold goes unreviewed.
- **Extra seeded states.** `/__seed` currently understands `lang`, `appearance` and `fresh`. Add a `state` parameter with two values: `active-session` (injects a `yathra:activeSession` document so the running timer and Home's new resume banner can be captured) and `empty` (a complete profile with no tasks, progress or sessions, so every empty state is reviewed rather than assumed).
- **Two more viewports**, 360×740 and 430×932, for the hero, tab bar and onboarding footer specifically — the elements most likely to break on a narrow or a very tall screen.

Sweep every screen in en/si/ta × light/dark, then read the captures and fix — not report — clipping, overflow, weak hierarchy, inconsistent margins, bad modal proportions, and safe-area problems.

---

## 8. Risks and constraints

- **Two new dependencies.** Both are Expo-pinned and offline; see §9 for verified integration details. If `react-native-svg` proves not to render in the web export, rings fall back to `ProgressBar` and the visual QA pipeline stays intact — the plan does not depend on rings.
- **The gradient is an extension to the design system**, not something it sanctions. It is confined to the hero, expressed as named light/dark tokens, and used nowhere else.
- **Scope discipline.** No new features. No streaks, XP, badges, leaderboards, social or AI. No backend, API, account, analytics, remote asset or remote config. Nothing is added to the UI that is not already backed by working local functionality.
- **The Indic fixes are load-bearing.** `tabBarHeight: 78`, the generous line heights, the wrapped `SegmentedControl` labels and the full-width "move all to today" button all exist because Sinhala and Tamil broke the Latin-sized versions. They stay.
- **Sinhala and Tamil monograms** are my best reading of standard terminology and, like the existing translated syllabus names, deserve a native-speaker review before release. This will be recorded in the README's limitations.

---

## 9. Dependency integration — verify before building on it

Both packages are pinned by Expo SDK 57 (`react-native-svg` 15.15.4, `expo-linear-gradient` ~57.0.1) and install via `npx expo install`, so versions come from Expo's `bundledNativeModules` and `expo-doctor` stays green. Neither touches the network. Four things must be confirmed at the start of step 1 rather than assumed, because each has a cheap fallback and discovering it late is expensive:

1. **Web rendering.** The entire visual QA pipeline is the web export in headless Chrome. If `react-native-svg` does not render there, rings are invisible to review even if they work on device. Confirm by exporting web and capturing one ring before any screen depends on rings. Fallback: rings degrade to `ProgressBar`; no screen's layout depends on the shape.
2. **Jest.** Component tests render real components under `jest-expo`. Confirm `react-native-svg` and `expo-linear-gradient` transform and render in that environment; if not, add a mock to `jest.setup.js` alongside the existing `expo-font` mock rather than excluding the components from tests.
3. **Animating the ring.** The ring animates `strokeDashoffset` with RN `Animated` and no Reanimated. Confirm whether `Circle` accepts animated props directly or needs `Animated.createAnimatedComponent(Circle)`, and whether `useNativeDriver` must be `false` — then write the component once against the confirmed pattern.
4. **React Compiler lint.** `expo lint` has React Compiler rules on, and they previously rejected `useRef(new Animated.Value(x)).current` read during render, `setState` inside an effect, and a conditionally-memoised hook body. Every new animated component follows the pattern the existing ones were fixed to: `useState(() => new Animated.Value(x))`, no `setState` in effects, no early returns that break memoisation. Run `expo lint` after each new primitive, not at the end.

The gradient hero also needs its layout mechanics settled once: `Screen` already supports `edgeToEdge` (drops horizontal padding) and `topSafeArea`, so the hero should be a full-bleed first child with its own `insets.top` offset while later sections apply their own padding — confirmed against `Screen.tsx` before Home is rebuilt, and adding a prop to `Screen` only if that proves insufficient. A dark hero in *both* themes also means Home needs light status-bar content regardless of theme, while every other screen follows the theme; the per-screen `StatusBar` handling in `app/_layout.tsx` is adjusted accordingly.

---

## 10. What changed during implementation

The plan was followed as written except for the following, each decided against
something found while building or reviewing:

1. **`typography.statSm` was dropped.** At 28px it duplicated the existing `title`
   token within one step, and the design system's iteration guide says to reuse the
   existing token in exactly that case. Two-up stat tiles use `title`/`heading`.
2. **Progress rings are drawn on plain surfaces, not on tinted cards.** Three of the six
   tints (`coral`, `orange`, `rose`) pair with a near-black `-on` foreground, because
   those are text colours for a pale panel rather than graphic colours — a ring drawn in
   one over its own tint gave Chemistry a dark maroon arc on pink. On a white or raised
   surface all six read cleanly. Tint panels are still used as whole surfaces with their
   paired foreground, which is what the design system intends them for.
3. **The ring's default track is `hairlineStrong`, not `hairlineSoft`.** In the dark
   theme a soft hairline is indistinguishable from a raised card, so a ring at zero
   progress disappeared entirely.
4. **The hero does not fade in on mount.** The plan called for it; it was dropped
   deliberately. A hero that fades in is also a hero that renders blank if the animation
   ever fails to run, and it is the most important surface in the app. The screen's one
   orchestrated moment is the progress filling instead.
5. **`LoadBars` went to Plan rather than Progress.** Plan is where "which day am I
   overloading?" is an actionable question. Progress instead received the full
   `StatusPanel` — the one place the on-track *sentence* does not duplicate the coach
   line — plus two-up stat tiles. `DayCells` stayed exclusive to Home, so the three
   screens each show the week for a different reason instead of three times over.
6. **Subject detail keeps a wrapping chip group for topic status**, not a segmented
   control. Four Sinhala or Tamil status words do not fit four equal segments on a phone,
   and the chips are already one tap.
7. **Tab bar labels wrap to two lines and the bar grew from 78px to 86px.** Reducing the
   label to 11px was tried first and "Progress" in Tamil still truncated. Wrapping keeps
   the accurate word rather than trading it for a shorter, less precise one; a fixed
   label block keeps all five items the same height whether their label wraps or not.
8. **The screenshot harness captures twice, not once.** Tall screens get both
   `name.png` at the real viewport and `name-tall.png` in full. An over-tall iframe
   leaves faint paint artefacts from the fixed tab bar, so the viewport shot has to stay
   the authoritative one — this was found by chasing what looked like ghost icons on
   Progress and confirming they do not exist at 390×844.

Defects found and fixed by the visual review, beyond the six the audit listed: the
gradient read as flat because the inset card covered its lighter end (the gradient now
completes at 62% of the hero height); Home's section headers were table dividers rather
than headings; the catch-up button filled the inset card; the day cells printed "0 of 1"
in every cell, which the shape-based indicators replaced; a Tamil subject mark truncated
to an ellipsis inside its tile; and a lone final tile in the past-paper year grid
stretched across its whole row.

### Found after the first review pass: a clean production build with a noisy dev console

The screenshot harness runs against `expo export` — a production web bundle. Running
`expo start --web` afterwards surfaced three console messages per render that the
production build does not print, because React DOM's attribute validation and
react-native-web's deprecation notices are development-only. The rings drew correctly
throughout; the console did not.

1. **`Received `false` for a non-boolean attribute `collapsable`.`** React Native Web's
   `useAnimatedProps` deliberately forces `collapsable={false}` onto whatever
   `Animated.createAnimatedComponent` wraps, and react-native-svg's web layer spreads
   unrecognised props straight onto the DOM node. The fix removes the wrapper: the ring
   now drives `strokeDashoffset` from state fed by an `Animated.Value` listener. That
   costs one re-render of the ring per frame while it animates, which is what
   react-native-web does internally anyway, and it removes a platform-specific code
   path rather than adding one.
2. **``Invalid DOM property `transform-origin`.``** The circle's `rotation`/`origin`
   props become a `transform-origin` attribute on web, which React rejects. The −90°
   start is now an ordinary style transform on the square `Svg` canvas instead. The
   track is a full circle, so rotating the canvas has no other visible effect.
3. **`"shadow*" style props are deprecated. Use "boxShadow".`** Pre-existing, but this
   revamp added `elevation.level1`/`level2` and so made it more frequent. Both shadow
   tokens now use `boxShadow`, which React Native supports on both platforms under the
   New Architecture and which also replaces Android's separate `elevation` value — a
   shadow is described once instead of twice.

**The lesson for the verification approach:** a production bundle passing is not
evidence that the development experience is clean, and the development console is where
this class of defect is visible at all. Both are now checked — the dev-server console is
captured over the Chrome DevTools Protocol and asserted to be empty.

---

## 11. The hero illustration

A sky illustration (`assets/sky.svg`, a mountain horizon under deep blue) was added to
the hero after the revamp, at the request of the brief's author.

**It is rasterised, not rendered.** react-native-svg cannot draw this file: thirteen of
its radial gradients inherit their stops through `xlink:href`, which the library does
not support, and it depends on seven `feGaussianBlur` filters. Rendering it would have
produced gradients with no stops. `devtools/sky.js` rasterises the SVG once, through
headless Chrome, into the 800×600 PNG the app loads — deliberately modest, because the
artwork is soft and has no fine detail, so upscaling it to a phone's pixel density costs
nothing visible while a larger source would only add weight.

**The scrim opacity was measured, not chosen.** The hero draws text over the artwork, so
legibility is a property of the composited pixels. `devtools/contrast.js` measures that
directly: it alpha-composites the scrim over the illustration and reports the worst-case
ratio for each foreground over the region of the artwork that actually sits behind the
text. Three findings shaped the result:

1. Measuring a finished screenshot is useless — it samples the white glyphs and reports
   1:1. The source artwork has to be measured with the scrim applied analytically.
2. Measuring the whole image is far too pessimistic. The illustration's brightest part
   is its horizon glow, which lands behind the opaque inset card; the text sits over the
   plain upper sky. Mapping the `cover` crop to find the region actually behind the text
   moved the usable scrim from 0.78 down to 0.62.
3. The muted hero foreground, not white, was the binding constraint. At `#d5d7e0` it
   failed 4.5:1 at every scrim opacity that left the illustration visible. Lightening it
   to `#e2e4e9` — an existing palette value — bought enough headroom for the artwork to
   read at all.

Final measured worst cases: light theme 6.05:1 (title) and 4.75:1 (muted line); dark
theme 9.70:1 and 7.62:1. The dark theme carries a lighter scrim precisely because it can
afford one, so the illustration is more present there.

**What was left alone.** The illustration is atmosphere, not a picture: it is hidden from
assistive technology, it carries no information the text does not, and the composition
was not rebuilt around it. Making the mountain ridge prominent would have meant moving
the inset card out of the hero — a layout change whose spacing had already been verified
across three languages — and would have pushed the screen toward the illustration-heavy
look the brief rules out.
