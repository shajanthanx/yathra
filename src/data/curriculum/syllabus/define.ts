/**
 * Compact builder for syllabus files.
 *
 * Ids are derived from the English name (slugged) rather than from position, so
 * inserting or reordering a unit in a future release does not silently move a
 * student's progress onto a different topic.
 */
import type { LocalizedText, SubjectId, SubjectSyllabus, SyllabusTopic, SyllabusUnit } from '@/types/content';

export interface TopicSpec {
  name: LocalizedText;
  /** Relative size within the unit; defaults to 1. */
  weight?: number;
}

export interface UnitSpec {
  name: LocalizedText;
  periods?: number;
  grade?: 12 | 13;
  /** Omit for unit-level tracking: the unit becomes its own single topic. */
  topics?: readonly TopicSpec[];
}

export interface SyllabusSpec {
  subjectId: SubjectId;
  source: string;
  syllabusRevision: number;
  /** Whether the Sinhala and Tamil names are from official editions. */
  nameSource: 'official' | 'translated';
  units: readonly UnitSpec[];
}

export function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

export function defineSyllabus(spec: SyllabusSpec): SubjectSyllabus {
  const seenUnitIds = new Set<string>();
  const units: SyllabusUnit[] = spec.units.map((unitSpec, unitIndex) => {
    const base = `${spec.subjectId}:${slug(unitSpec.name.en)}`;
    let unitId = base;
    let suffix = 2;
    while (seenUnitIds.has(unitId)) unitId = `${base}-${suffix++}`;
    seenUnitIds.add(unitId);

    const topicSpecs: readonly TopicSpec[] =
      unitSpec.topics && unitSpec.topics.length > 0 ? unitSpec.topics : [{ name: unitSpec.name }];

    const seenTopicIds = new Set<string>();
    const topics: SyllabusTopic[] = topicSpecs.map((topicSpec, topicIndex) => {
      const topicBase = `${unitId}/${slug(topicSpec.name.en)}`;
      let topicId = topicBase;
      let topicSuffix = 2;
      while (seenTopicIds.has(topicId)) topicId = `${topicBase}-${topicSuffix++}`;
      seenTopicIds.add(topicId);
      return {
        id: topicId,
        unitId,
        subjectId: spec.subjectId,
        order: topicIndex + 1,
        name: topicSpec.name,
        weight: topicSpec.weight ?? 1,
      };
    });

    return {
      id: unitId,
      subjectId: spec.subjectId,
      order: unitIndex + 1,
      name: unitSpec.name,
      ...(unitSpec.periods === undefined ? {} : { periods: unitSpec.periods }),
      ...(unitSpec.grade === undefined ? {} : { grade: unitSpec.grade }),
      topics,
    };
  });

  const hasTopics = spec.units.some((u) => u.topics && u.topics.length > 0);

  return {
    subjectId: spec.subjectId,
    depth: hasTopics ? 'topics' : 'units',
    nameSource: spec.nameSource,
    source: spec.source,
    syllabusRevision: spec.syllabusRevision,
    units,
  };
}
