/**
 * The six official A/L streams and their approved subject combinations.
 * Sources: UGC Admissions Handbook 2024/25 (§2.2) and MOE Circular 2016/13.
 * Only subjects bundled with a syllabus are offered (see ./subject-ids.ts);
 * approved third subjects without bundled syllabi are omitted for now.
 * Arts: UGC basket rules are not enforced — a free choice of three.
 */
import type { Stream, StreamId, SubjectId } from '@/types/content';

const TECHNOLOGY_THIRD_SUBJECTS: readonly SubjectId[] = [
  'ict',
  'economics',
  'business-studies',
  'accounting',
  'agricultural-science',
];

export const STREAMS: readonly Stream[] = [
  {
    id: 'physical-science',
    name: { en: 'Physical Science', si: 'භෞතික විද්‍යා අංශය', ta: 'பௌதிக விஞ்ஞானப் பிரிவு' },
    subjectIds: ['combined-mathematics', 'physics', 'chemistry', 'ict'],
    rule: {
      core: ['combined-mathematics', 'physics'],
      choose: { count: 1, from: ['chemistry', 'ict'] },
    },
  },
  {
    id: 'biological-science',
    name: { en: 'Biological Science', si: 'ජීව විද්‍යා අංශය', ta: 'உயிரியல் விஞ்ஞானப் பிரிவு' },
    subjectIds: ['biology', 'chemistry', 'physics', 'agricultural-science', 'combined-mathematics'],
    rule: {
      core: ['biology', 'chemistry'],
      choose: { count: 1, from: ['physics', 'agricultural-science', 'combined-mathematics'] },
    },
  },
  {
    id: 'commerce',
    name: { en: 'Commerce', si: 'වාණිජ අංශය', ta: 'வர்த்தகப் பிரிவு' },
    subjectIds: ['accounting', 'business-studies', 'economics', 'business-statistics', 'ict'],
    rule: {
      core: [],
      choose: { count: 3, from: ['accounting', 'business-studies', 'economics', 'business-statistics', 'ict'] },
      atLeast: { count: 2, from: ['accounting', 'business-studies', 'economics'] },
    },
  },
  {
    id: 'arts',
    name: { en: 'Arts', si: 'කලා අංශය', ta: 'கலைப் பிரிவு' },
    subjectIds: ['economics', 'ict', 'agricultural-science', 'business-statistics'],
    rule: {
      core: [],
      choose: { count: 3, from: ['economics', 'ict', 'agricultural-science', 'business-statistics'] },
    },
  },
  {
    id: 'engineering-technology',
    name: {
      en: 'Engineering Technology',
      si: 'ඉංජිනේරු තාක්ෂණවේදය අංශය',
      ta: 'பொறியியற் தொழினுட்பவியல் பிரிவு',
    },
    subjectIds: ['engineering-technology', 'science-for-technology', ...TECHNOLOGY_THIRD_SUBJECTS],
    rule: {
      core: ['engineering-technology', 'science-for-technology'],
      choose: { count: 1, from: TECHNOLOGY_THIRD_SUBJECTS },
    },
  },
  {
    id: 'bio-systems-technology',
    name: {
      en: 'Bio Systems Technology',
      si: 'ජෛව පද්ධති තාක්ෂණවේදය අංශය',
      ta: 'உயிர் முறைமைகள் தொழினுட்பவியல் பிரிவு',
    },
    subjectIds: ['bio-systems-technology', 'science-for-technology', ...TECHNOLOGY_THIRD_SUBJECTS],
    rule: {
      core: ['bio-systems-technology', 'science-for-technology'],
      choose: { count: 1, from: TECHNOLOGY_THIRD_SUBJECTS },
    },
  },
];

export const STREAM_IDS: readonly StreamId[] = STREAMS.map((s) => s.id);

const STREAM_BY_ID: ReadonlyMap<StreamId, Stream> = new Map(STREAMS.map((s) => [s.id, s]));

export function getStream(id: StreamId): Stream {
  const stream = STREAM_BY_ID.get(id);
  if (!stream) throw new Error(`Unknown stream: ${id}`);
  return stream;
}

export function isStreamId(value: unknown): value is StreamId {
  return typeof value === 'string' && STREAM_BY_ID.has(value as StreamId);
}
