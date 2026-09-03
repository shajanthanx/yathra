# Implementation plan

The plan the application was built to, kept in the repository as a record of the decisions and the reasoning behind them. `README.md` describes the result; this file explains why it is shaped the way it is.

---

## 1. What this product is

A student opens Yathra for thirty seconds and learns three things: where they are in the A/L journey, what to do today, and whether they are on track. Everything else is secondary.

The deliberate non-goals are as important as the goals. Yathra is not a learning-management system, a classroom, a tutor, a content library or a productivity suite. There are no streaks, points, badges or leaderboards. Where a simpler feature solves the same problem, the simpler feature wins.

---

## 2. Constraints that shaped the design

**Fully offline.** No backend, no API, no cloud database, no analytics, no remote configuration, no model calls. All content ships with the app; all student data stays on the device. This is not only a technical constraint but a product promise the app states plainly.

**Three first-class languages.** English, Sinhala and Tamil. Not English with translation bolted on afterwards: the dictionary shape is enforced by the type system, bundled content carries all three languages in the data itself, and the type scale was adjusted so Indic glyphs are not clipped.

**The design system is the source of truth.** `design-guidelines.md` supplies the tokens, the type scale, the pill shape language, the flat hairline-bordered surfaces and the tint panels. It is a general-purpose system, so it was adapted to a phone rather than copied: the display sizes are compressed, the 48px step is reserved for the single hero stat on Home, and leading is more generous than the Latin-oriented ratios.

---

## 3. Architecture

```
UI (app/ routes + src/components)
  ↓ hooks          thin; select from the store, memoise derived values
  ↓ store          one immutable state object, actions, persistence scheduling
  ↓ domain         pure, deterministic, React-free, heavily tested
  ↓ storage        repository, schema/migrations, backup, key-value adapter
data                bundled curriculum and academic calendar
i18n                typed dictionaries and formatters
theme               design tokens
```

**Decisions and their reasons**

| Decision | Reason |
| --- | --- |
| Expo SDK 57 + Expo Router | Current SDK; file-based routing covers tabs, stacks and modals without extra navigation wiring. |
| Minimal template, packages added deliberately | The default template ships `@expo/ui`, glass effects, Reanimated and Worklets. None are needed; a lightweight app should not carry them. |
| A ~60-line store over Redux or Zustand | One user, one device, a handful of collections. `useSyncExternalStore` over an immutable object is enough, and it is easier to reason about than a library. |
| Business logic outside React | Progress, the countdown, on-track status, catch-up and the weekly review are pure functions. They can be tested exhaustively without rendering anything, which is why they carry most of the test suite. |
| AsyncStorage behind a `KeyValueStore` interface | The amount of structured data does not justify SQLite. The interface means swapping the backing store later is one file. |
| System fonts, no font assets | The platform fonts cover Sinhala and Tamil. Shipping none means nothing to download, no load-time flash, and no risk of a webfont failing offline. |
| RN `Animated`, no Reanimated | Only progress bars and sheets animate. Reanimated is an optional peer of Expo Router 57, so it can be left out. |
| Notifications deferred | Not needed for the core loop; adding local reminders later touches no data-layer code. |

---

## 4. Data model

Bundled content and user data are strictly separated. Content types live in `src/types/content.ts`, persisted types in `src/types/models.ts`.

Everything is referenced by **id**, never by display name — `subjectId: 'physics'`, not `subjectName: 'Physics'` — so a name can be translated or corrected without touching a student's records.

Dates that matter to a student are plain local calendar dates (`YYYY-MM-DD`), never derived from `toISOString()`, which would shift the day near midnight. All date arithmetic goes through `src/utils/date.ts`, which parses at local noon so day arithmetic survives daylight-saving changes.

Persisted collections, one JSON document each under the `yathra:` prefix: `meta`, `settings`, `profile`, `topicProgress`, `tasks`, `sessions`, `activeSession`, `pastPapers`.

---

## 5. Curriculum data

Structure only: `Stream → Subject → Unit → Topic`. The purpose is tracking, not teaching.

Sources: NIE syllabi for Grades 12 and 13 (2017 revision), the Department of Examinations trilingual subject list, and the UGC admissions handbook for stream rules. Each syllabus file records its source, its revision and whether its Sinhala and Tamil names are official or translated.

**Nothing is invented.** Subjects whose syllabus could not be verified are not bundled, and subjects whose sub-topics could not be verified are tracked at unit level and say so. This is why Arts coverage is thin; the alternative — plausible-looking but unverified topic lists — would be worse than an honest gap.

Ids derive from the English name, not from position, so reordering or inserting a unit in a future release cannot move a student's progress onto a different topic.

---

## 6. Domain logic

All pure, all deterministic, all tested.

**Progress.** A topic contributes a fraction of its weight by status — not started 0, learning 0.4, practising 0.75, completed 1 — so a student sees movement as soon as they start something. Units are weighted by their published period allocation, so a 195-period unit counts for more than a 5-period one. Subjects count equally in the overall figure.

**On track.** Compare how far through the syllabus a student should be by now with how far they actually are, then temper that with overdue work and recent completion. Thresholds are explicit constants. A new cohort, or a student who has recorded nothing, is `just_started` rather than `behind` — saying "behind" there would be both wrong and unkind. The wording throughout points at a next step and never grades the student.

**Catch-up.** The most important recovery feature, and the one most easily got wrong. Overdue work is moved first, then the next few unfinished topics per subject are added round-robin so one subject cannot monopolise the week. A hard ceiling of three tasks and about 150 minutes a day applies; work that does not fit simply waits rather than piling up. Fully deterministic — identical inputs give an identical plan.

**Weekly review.** Computed on demand, never generated by the student. Suggests finishing half-started topics before starting new ones.

---

## 7. Storage and recovery

Reads never throw. Every record passes a hand-written type guard, so a corrupt or hand-edited file degrades to defaults rather than crashing on launch. Collections that failed are reported, and the student chooses to retry, continue with what was recovered, or start fresh.

`meta.schemaVersion` plus a small explicit migration table handles future shape changes: one function per version step, not a framework.

Backup is a JSON file on the device, shared through the system sheet. Import validates the document, rejects a backup from a newer version, drops individual bad records and confirms before replacing anything.

---

## 8. Localization

Three typed dictionaries and a ~40-line translator. `en.ts` defines the shape; `si.ts` and `ta.ts` are typed against it, so a missing key is a compile error.

Plurals use paired `.one` / `.other` keys, which covers all three languages. Singular forms may drop the count where that reads better — Sinhala "දිනක් ඉතිරියි" is more natural than "දින 1ක් ඉතිරියි" — and the test suite allows exactly that omission and nothing else.

Weekday and month names are bundled rather than taken from `Intl`, whose Sinhala and Tamil data varies by platform.

Layout rules for text expansion: no fixed-height text containers, buttons wrap to two lines, truncation only where a row title can safely truncate, and `maxFontSizeMultiplier` on dense rows so large-text settings do not clip.

---

## 9. Screens

Five destinations, each with a clear reason to exist: **Home**, **Subjects**, **Plan**, **Progress**, **More**. Detail screens, the task editor and the study timer sit above them in the stack; the task editor and timer are modals.

Onboarding is five short steps — language, year, stream, subjects, ready — with the draft held in memory and written only at the end. Core subjects for a stream are pre-selected and locked; anything that could not complete a valid combination is greyed out rather than rejected after the fact.

Low-friction targets that drove the interaction design: complete a task in one tap, change a topic's status in one or two, add a task in a short form with intelligent defaults, and see progress without navigating anywhere.

---

## 10. Testing and verification

Domain logic first, because that is where correctness lives: dates, progress, countdown, on-track thresholds, task queries, the catch-up planner, the weekly review, past-paper averages, combination rules, validation. Then storage round trips and damaged-data recovery, content integrity, dictionary completeness, store integration through the real repository, and component rendering in all three languages.

Because no device or emulator was available, verification used TypeScript, Jest, `expo-doctor`, `expo export` for all three platforms, and a headless-Chrome harness in `devtools/` that seeds realistic data into local storage and screenshots every screen at a phone viewport in three languages and two themes. That harness found three real defects — clipped tab-bar labels, insufficient line height for Indic descenders, and missing `expo-font` and `expo-asset` dependencies — which are fixed.

---

## 11. What was deliberately left out

Notifications, a full calendar, charts beyond simple bars, any form of gamification, accounts, sync, and any subject whose syllabus could not be verified. Each of these was cheaper to leave out than to include badly, and none of them is needed for a student to answer the three questions the product exists to answer.
