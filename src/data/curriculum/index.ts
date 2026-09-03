/**
 * The bundled curriculum: streams, subjects and syllabi, plus the lookups the
 * app uses to resolve ids into content. Everything here is static and shipped
 * with the app — nothing is fetched.
 */
import type { StreamId, SubjectId, SubjectSyllabus, SyllabusTopic, SyllabusUnit } from '@/types/content';
import { accountingSyllabus } from './syllabus/accounting';
import { agriculturalScienceSyllabus } from './syllabus/agricultural-science';
import { biologySyllabus } from './syllabus/biology';
import { bioSystemsTechnologySyllabus } from './syllabus/bio-systems-technology';
import { businessStatisticsSyllabus } from './syllabus/business-statistics';
import { businessStudiesSyllabus } from './syllabus/business-studies';
import { chemistrySyllabus } from './syllabus/chemistry';
import { combinedMathematicsSyllabus } from './syllabus/combined-mathematics';
import { economicsSyllabus } from './syllabus/economics';
import { engineeringTechnologySyllabus } from './syllabus/engineering-technology';
import { ictSyllabus } from './syllabus/ict';
import { physicsSyllabus } from './syllabus/physics';
import { scienceForTechnologySyllabus } from './syllabus/science-for-technology';
import { getStream, STREAMS } from './streams';
import { getSubject, SUBJECTS } from './subjects';

export { STREAMS, getStream, isStreamId } from './streams';
export { SUBJECTS, getSubject, findSubject } from './subjects';
export { SUBJECT_IDS, isSubjectId, type SubjectId } from './subject-ids';

const SYLLABI: Record<SubjectId, SubjectSyllabus> = {
  physics: physicsSyllabus,
  chemistry: chemistrySyllabus,
  biology: biologySyllabus,
  'combined-mathematics': combinedMathematicsSyllabus,
  ict: ictSyllabus,
  accounting: accountingSyllabus,
  'business-studies': businessStudiesSyllabus,
  economics: economicsSyllabus,
  'business-statistics': businessStatisticsSyllabus,
  'agricultural-science': agriculturalScienceSyllabus,
  'engineering-technology': engineeringTechnologySyllabus,
  'bio-systems-technology': bioSystemsTechnologySyllabus,
  'science-for-technology': scienceForTechnologySyllabus,
};

export function getSyllabus(subjectId: SubjectId): SubjectSyllabus {
  return SYLLABI[subjectId];
}

export function getSyllabi(subjectIds: readonly SubjectId[]): SubjectSyllabus[] {
  return subjectIds.map(getSyllabus);
}

/** Subjects a stream offers, in the order they should be presented. */
export function subjectsForStream(streamId: StreamId) {
  return getStream(streamId).subjectIds.map(getSubject);
}

// ---- topic and unit lookup ----

interface TopicIndexEntry {
  topic: SyllabusTopic;
  unit: SyllabusUnit;
  syllabus: SubjectSyllabus;
}

const TOPIC_INDEX: ReadonlyMap<string, TopicIndexEntry> = (() => {
  const map = new Map<string, TopicIndexEntry>();
  for (const syllabus of Object.values(SYLLABI)) {
    for (const unit of syllabus.units) {
      for (const topic of unit.topics) {
        map.set(topic.id, { topic, unit, syllabus });
      }
    }
  }
  return map;
})();

const UNIT_INDEX: ReadonlyMap<string, SyllabusUnit> = (() => {
  const map = new Map<string, SyllabusUnit>();
  for (const syllabus of Object.values(SYLLABI)) {
    for (const unit of syllabus.units) map.set(unit.id, unit);
  }
  return map;
})();

export function findTopic(topicId: string): SyllabusTopic | undefined {
  return TOPIC_INDEX.get(topicId)?.topic;
}

export function findTopicContext(topicId: string): TopicIndexEntry | undefined {
  return TOPIC_INDEX.get(topicId);
}

export function findUnit(unitId: string): SyllabusUnit | undefined {
  return UNIT_INDEX.get(unitId);
}

export function topicsForSubject(subjectId: SubjectId): SyllabusTopic[] {
  return getSyllabus(subjectId).units.flatMap((unit) => [...unit.topics]);
}

/** Every subject that has a bundled syllabus, for settings and validation. */
export const ALL_SUBJECTS = SUBJECTS;
export const ALL_STREAMS = STREAMS;
