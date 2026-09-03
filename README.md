# Yathra

An offline-first companion for Sri Lankan G.C.E. Advanced Level students, built with Expo, React Native and TypeScript.

Yathra answers three questions in the time it takes to unlock a phone: **where am I in my A/L journey, what should I do today, and am I on track?** It is not a classroom, a tutor or a social network. It is a small dashboard a student can open for thirty seconds a day.

Everything runs on the device. There is no account, no server, no analytics and no network call of any kind.

---

## Running the app

```bash
npm install
npm start          # Expo dev server: press a for Android, i for iOS, w for web
```

| Command | What it does |
| --- | --- |
| `npm start` | Expo dev server |
| `npm run android` / `npm run ios` / `npm run web` | Start on one platform |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Jest suite |
| `npm run lint` | Expo lint |
| `npm run doctor` | `expo-doctor` dependency and config checks |
| `npm run export:web` / `export:android` / `export:ios` | Bundle a platform to `.export-check/` |

Requires Node 20 or newer. The project targets **Expo SDK 57** (React Native 0.86,
React 19.2). Install native packages with `npx expo install` so versions stay on the
SDK's pinned set.

Dependencies are kept deliberately small. Beyond Expo Router and its peers the app uses
`@react-native-async-storage/async-storage` for persistence, `@expo/vector-icons`
(Feather) for iconography, `react-native-svg` for the progress rings and
`expo-linear-gradient` for the one gradient on Home. There is no state-management
library, no i18n library, no animation library beyond React Native's own `Animated`,
and no font files.

---

## What it does

**Onboarding** — language, examination year, stream, three subjects, done. About a minute, no account.

**Home** — the cohort and how far into the journey the student is, the countdown to the
examination, overall progress measured against the pace the syllabus needs, one calm
line about how it is going, today's tasks, the week at a glance, and the three subjects
with their own colours. A session left running is offered back here rather than lost.

**Subjects** — progress per subject, then the full syllabus unit by unit. A topic moves between *not started*, *learning*, *practising* and *completed* in one tap, or by long-pressing the row.

**Plan** — Today, This week and Later, with the week's workload shown as bars so an
overloaded day is visible before it arrives. Overdue work is pinned above today's list
with one tap to move it forward.

**Progress** — overall progress against the expected pace, what the on-track status
actually means and how to act on it, this week's task completion and study time, then
per-subject progress, past papers and the weekly review.

**Study** — a distraction-free timer that survives the app being backgrounded, and offers
to mark the topic finished at the end.

**Past papers** — which papers a student has worked through, their scores, average and best. The app contains no papers and downloads nothing.

**Catch-up** — when a student falls behind, a deterministic seven-day plan that moves overdue work first, then adds the next few topics per subject, under a firm ceiling of three tasks and about 150 minutes a day.

**Weekly review** — what got done, which subjects need attention, and what to start next.

**Settings** — language, appearance, A/L profile, examination dates, data export/import/reset, and a plain statement of what the app does with your data.

---

## Visual language

`design-guidelines.md` is the source of truth: near-monochrome interactive colour, a
small family of pastel tints, pill-shaped controls, flat hairline-bordered surfaces,
and elevation reserved for things that genuinely float. The interface follows it, with
three deliberate extensions and one deliberate constraint.

**One expressive surface per screen.** Home opens with a full-bleed gradient hero
carrying the cohort, the countdown at the largest type step in the app, and an inset
card holding overall progress. Everything below stays in the flat system. The design
system never mentions gradients — neither defining nor forbidding them — so this is an
extension, expressed as named light and dark tokens and used in exactly one role. The
hero's foreground colours are their own tokens rather than the existing inverse ones,
because the hero is dark in *both* themes: measured against the gradient's lightest
point they clear 4.5:1, where reusing `muted` would have given 3.87:1.

**Progress against the pace the syllabus needs.** The app has always computed where a
student should be by now. `JourneyProgress` puts that on the same axis as what they have
actually done — the fill is progress, the tick above it is the expected pace — which is
what makes "on track" mean something rather than being a bare word. A tick is invisible
to a screen reader, so the component also names both figures.

**A colour per subject, used everywhere.** Each subject owns one of three colours —
`#9381ff`, `#7bf1a8`, `#ff5d8f` — assigned by position in the student's own subject
list, so a subject looks the same in every list, card and row. Subjects are their own
palette rather than one of the tint families, because a tint family pairs a pale panel
with a text colour and that is not enough: a subject needs a solid fill for its mark, a
stroke for its rings and bars, and a quiet ground for a whole panel. Three different
contrast problems, so three sets of values, each measured rather than chosen:

- The **fill** is the colour at full strength, and its text is near-black in both themes.
  White fails 4.5:1 on all three of these hues; near-black clears it on all three.
- The **stroke** is the colour itself in the dark theme. In the light theme it cannot be:
  mint has luminance 0.70 and measures 1.40:1 against a white card, so a ring drawn in it
  would be invisible. Deeper versions carry the strokes — but deeper *in the same hue*,
  because mixing mint toward the ink turned it into a teal that no longer looked like the
  mint tile beside it.
- The **panel** ground is pale, because a saturated colour across an area that size is
  what the design system warns against.

**One calm sentence, chosen from real state.** Home shows a coach line picked by a pure,
priority-ordered function over the on-track status, what was finished today and what was
finished this week. It is never a generic quote, never a reward for nothing, and never a
reproach — falling behind is stated as a next step.

Four things in the visual reference were deliberately not built, because the app has no
feature behind them: an avatar (there is no account), a notification bell (there are no
notifications), a day-streak badge (streak pressure is ruled out), and a rotating
motivational quote (replaced by the coach line).

**The hero carries an illustration, under a scrim.** `assets/sky.svg` — a mountain
horizon under a deep blue sky — sits behind the hero, cropped to fill, with the gradient
drawn over it. That is the design system's own answer for type over media: hold the text
with a scrim rather than a shadow. The illustration reads as atmosphere and depth rather
than as a picture competing with the countdown, which is the balance the brief asks for.

Two things about it are worth knowing. The SVG cannot be rendered on the device —
thirteen of its radial gradients inherit their stops through `xlink:href`, which
react-native-svg does not support, and it depends on seven Gaussian blur filters — so it
is rasterised once by `devtools/sky.js` into the PNG the app loads. And the scrim's
opacity is not a taste decision: it is the value at which the text above it still clears
4.5:1, measured by `devtools/contrast.js` against the composited pixels of the artwork
in the region that actually sits behind the hero's text. The muted hero foreground had
to be lightened to `#e2e4e9` for that reason — it was the binding constraint on how far
the scrim could come down, and therefore on whether the illustration was visible at all.

Motion is React Native's own `Animated` — no Reanimated. Progress bars and rings animate
to new values, percentages count up, and every animated component cuts to its end state
when the system asks for reduced motion. Animated values always start at their real
value, so a platform that cannot drive the animation still renders the correct figure
rather than an empty one.

---

## Architecture

```
app/                     Expo Router routes — thin, they compose components and hooks
src/
  components/            Design-system components and feature rows
  screens/               Screens that are not routes (recovery, onboarding frame)
  hooks/                 Derived data: progress, journey, plan, timer, review
  store/                 One immutable state object + actions (useSyncExternalStore)
  domain/                Pure, deterministic business logic — no React, no IO
  storage/               Repository, schema/migrations, backup, key-value adapter
  data/                  Bundled content: curriculum, streams, subjects, academic years
  i18n/                  Typed en/si/ta dictionaries, translator, formatters
  theme/                 Design tokens and the theme provider
  types/                 Domain and content types
  utils/                 Date handling
devtools/                Development-only screenshot harness (not shipped)
```

Data flows one way:

```
UI → hooks → store actions → domain (pure) → repository → storage
```

Business logic never imports React. Every calculation the product depends on — progress, the countdown, the on-track status, the catch-up plan, the weekly review, past-paper averages — is a pure function in `src/domain`, which is why they are the most heavily tested part of the codebase.

**State management** is a roughly sixty-line store rather than a library. State is one immutable object; each action replaces it and schedules only the collections it touched for persistence, debounced per key. Selectors return values that already live in state so components can subscribe narrowly; anything derived is memoised in a hook.

---

## Local storage

`@react-native-async-storage/async-storage` behind a small `KeyValueStore` interface, so the backing store can be swapped in one file.

One JSON document per collection, all prefixed `yathra:` — `meta`, `settings`, `profile`, `topicProgress`, `tasks`, `sessions`, `activeSession`, `pastPapers`.

Reads never throw. Every record is validated by a hand-written guard on the way in, so a corrupt or hand-edited file degrades to defaults instead of crashing the app; the collections that failed are reported and the student is offered a retry or a clean start.

`meta.schemaVersion` plus a small explicit migration table in `src/storage/schema.ts` handles future shape changes. Adding a migration is one function.

**Backup** is a JSON file written to the device and handed to the system share sheet. Import validates the document, rejects a backup from a newer version of the app, drops individual bad records, and asks for confirmation before replacing anything.

---

## Localization

English, Sinhala and Tamil are equal citizens. There is no i18n library: three typed dictionaries, a placeholder substitution and a one/other plural rule are all this app needs.

`src/i18n/en.ts` defines the shape. `si.ts` and `ta.ts` are typed against it, so **a missing or misspelled key is a compile error**, not a blank label. Tests additionally check that no value is empty, that no translation invents a placeholder English does not have, and that Sinhala and Tamil values are actually written in their own scripts.

Bundled content (subject, unit and topic names) carries all three languages in the data itself and is resolved with `localize()`.

Two decisions worth noting:

- **No font files ship with the app.** The platform's own fonts cover Sinhala and Tamil, so text renders correctly in all three languages with nothing to download and no load-time flash. Line heights across the type scale are a little more generous than the design system's Latin-oriented ratios, because Sinhala and Tamil stack vowel signs above and below the base glyph and a Latin-sized line box clips them.
- **Weekday and month names are bundled** rather than taken from `Intl`, whose Sinhala and Tamil data varies between platforms.

---

## Curriculum data

Structure only — the app tracks a syllabus, it does not teach it.

```
Stream → Subject → Unit → Topic
```

Thirteen subjects are bundled, each in its own file under `src/data/curriculum/syllabus/`, built by a small `defineSyllabus` helper. Unit lists, period allocations and the Grade 12/13 split follow the **National Institute of Education** syllabi for Grades 12 and 13 (2017 revision, still current). Subject names and Department of Examinations subject numbers come from the department's trilingual subject list. Stream rules follow the University Grants Commission admissions handbook.

Ids are derived from the English name rather than from position, so inserting or reordering a unit in a future release cannot silently move a student's progress onto a different topic.

Each file records its `source`, its `syllabusRevision`, and whether its Sinhala and Tamil names are `official` (taken from the NIE Sinhala and Tamil editions) or `translated`. Nothing is invented: subjects whose syllabus could not be verified are simply not bundled.

Academic years live in `src/data/academic-years.ts` with their examination dates and a `confirmed` or `estimated` status. The countdown reads only from there, so correcting a timetable is a data change. A student can also set their own examination date if an official change lands before an app update.

---

## Testing

```bash
npm test
```

**376 tests across 19 suites.**

- **Domain** — date handling (midnight, month and year boundaries, leap days, week grouping), progress arithmetic, the countdown and journey, on-track thresholds, task queries and overdue logic, the catch-up planner (daily ceilings, spread across subjects, determinism), the weekly review, past-paper averages, combination rules and input validation.
- **Storage** — backup round trip, rejection of foreign or newer files, and graceful handling of damaged records.
- **Content** — every unit and topic has a unique id and a name in all three languages; academic-year dates are ordered and leave revision time; every stream can form a valid combination.
- **Localization** — dictionary completeness, placeholder safety, script coverage, the
  narrow weekday names, and the relative-day words (today, tomorrow, yesterday, and
  the month and year boundaries between them).
- **Store integration** — onboarding, tasks, topic progress, the study timer, past papers, profile edits and reset, each verified to survive an app restart through the real repository.
- **Coach line and workload** — the coach message is chosen by a pure, priority-ordered
  function and is asserted to be deterministic and never to scold; per-day workload is
  asserted to normalise against the busiest day and to fall back to task counts rather
  than inventing a duration for a task that has none.
- **Components** — rendering and interaction in all three languages, including
  accessibility roles and values. The progress ring, the pace marker and the workload
  bars each carry meaning a screen reader cannot see, so each is asserted to name its
  own value; subject marks are asserted to render in every language on one line, since
  a truncated Indic mark breaks mid-glyph.

---

## Verification performed

- `npm run typecheck` — clean, with `strict` plus `noUncheckedIndexedAccess`.
- `npm test` — 376 passing.
- `npx expo-doctor` — 21/21 checks pass.
- `npx expo export` for **android**, **ios** and **web** — all three bundle.
- **Offline**: the source contains no `fetch`, `XMLHttpRequest`, `WebSocket` or HTTP client. The app declares no network permissions of its own and works with connectivity disabled.
- **Contrast**: the hero draws text over an illustration, so its legibility is a
  property of the composited pixels rather than of the token values.
  `devtools/contrast.js` measures it — worst case in the light theme 6.05:1 for the
  hero title and 4.75:1 for its muted line, and 9.70:1 / 7.62:1 in the dark theme,
  against a 4.5:1 bar. Every other new colour pair was measured the same way.
- **Development console**: `expo start --web` was loaded with realistic data and its
  console captured over the Chrome DevTools Protocol — no errors, no warnings. This is
  a separate check from the ones above on purpose: React DOM's attribute validation and
  react-native-web's deprecation notices only run in development, so a clean production
  bundle is not evidence of a clean console.
- **Visual**: 24 screens were rendered and reviewed at a 390×844 phone viewport in
  English, Sinhala and Tamil, in both light and dark themes — 204 captures, counting a
  second full-length capture of the ten screens that scroll past a viewport. The set
  includes a running study session, a fresh profile with every empty state, and an
  interrupted session offered back on Home.

To reproduce the visual review:

```bash
npm run export:web
npx jest --testMatch "**/devtools/*.gen.test.ts" --rootDir .   # seed realistic data
node devtools/serve.js &                                        # serve the export
node devtools/shots.js devtools/shots/si-light --lang si --appearance light
```

`--only <name>` narrows the run to one screen while iterating. Screens that scroll
past a phone viewport are captured twice, `name.png` at the real viewport and
`name-tall.png` in full; the viewport shot is the authoritative one, because an
over-tall iframe leaves faint paint artefacts from the fixed tab bar.

---

## Privacy

Your data stays on this device. No account, no server, no analytics, no advertising, no cloud sync. Nothing a student enters leaves the phone unless they export a backup themselves.

---

## Known limitations

- **Arts stream coverage is thin.** Only subjects with a verified NIE syllabus are offered, and several Arts subjects (History, the civilizations, aesthetics and language subjects) could not be verified, so they are not bundled. The stream is selectable and works, but its subject list is short. Adding a subject is one data file plus an entry in `subject-ids.ts` — no architectural change.
- **Higher Mathematics, Business Statistics detail, Geography and Political Science.** Business Statistics is tracked at unit level; the others are not bundled. Engineering Technology is tracked at unit level because the NIE publishes it only in Sinhala and Tamil and its sub-topics could not be verified; its English unit titles are translations, which the file records.
- **Sinhala and Tamil syllabus names.** Unit and topic names are official for Physics, Chemistry, Biology and Combined Mathematics. For the commerce and technology subjects the NIE editions use legacy non-Unicode fonts, so those names are careful translations rather than the official wording, flagged as `nameSource: 'translated'` in each file. A native-speaker review before release would be worthwhile.
- **Examination dates beyond 2027 are estimates**, derived from the recent pattern of an August sitting. They are labelled as estimates in the app, and a student can override the date.
- **The hero illustration's licence should be confirmed.** `assets/sky.svg` came from
  clker.com, which publishes its clipart as public domain, and it is the only
  third-party artwork in the app. That provenance is worth confirming in writing
  before release, and the file is easy to swap: it is rasterised by `devtools/sky.js`
  and referenced from exactly one component.
- **Notifications are not implemented.** They were deliberately deferred: they are not needed for the core loop, and local reminders can be added later without touching the data layer.
- **Subject marks in Sinhala and Tamil.** Each subject carries a two- or three-character
  identity mark, authored per language rather than sliced from the name (a Sinhala or
  Tamil initial is a grapheme cluster, and cutting UTF-16 code units splits it into a
  broken glyph). The technology subjects use the English initialisms that are standard
  in Sinhala and Tamil medium too. Like the translated syllabus names, these deserve a
  native-speaker review.
- **Status bar styling is not verifiable through the harness.** Home always wants light
  status-bar content because its hero is dark in both themes, but `expo-status-bar`
  renders nothing on web, so that one behaviour needs a device or simulator to confirm.
- **The weekly review has no history.** It shows this week and last week, computed on demand; earlier weeks are not retained separately.
