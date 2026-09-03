import { getStream } from '@/data/curriculum';
import {
  canAddSubject,
  coreSubjects,
  isSelectionComplete,
  optionalSubjects,
  remainingChoices,
  toggleSubject,
  validateSelection,
} from '../combinations';

const physical = getStream('physical-science');
const biological = getStream('biological-science');
const commerce = getStream('commerce');
const engineering = getStream('engineering-technology');

describe('core subjects', () => {
  it('are required by the stream', () => {
    expect(coreSubjects(physical)).toEqual(['combined-mathematics', 'physics']);
    expect(coreSubjects(commerce)).toEqual([]);
  });

  it('are excluded from the optional list', () => {
    expect(optionalSubjects(physical)).not.toContain('physics');
    expect(optionalSubjects(physical)).toContain('chemistry');
  });

  it('cannot be removed', () => {
    const selection = ['combined-mathematics', 'physics'] as const;
    expect(toggleSubject(physical, selection, 'physics')).toEqual([...selection]);
  });
});

describe('validating a selection', () => {
  it('accepts the standard Physical Science combination', () => {
    expect(validateSelection(physical, ['combined-mathematics', 'physics', 'chemistry'])).toBeNull();
  });

  it('accepts Physical Science with ICT', () => {
    expect(validateSelection(physical, ['combined-mathematics', 'physics', 'ict'])).toBeNull();
  });

  it('rejects a selection missing a core subject', () => {
    expect(validateSelection(physical, ['physics', 'chemistry', 'ict'])).toBe('incomplete');
  });

  it('rejects fewer than three subjects', () => {
    expect(validateSelection(physical, ['combined-mathematics', 'physics'])).toBe('incomplete');
  });

  it('rejects a subject the stream does not offer', () => {
    expect(validateSelection(physical, ['combined-mathematics', 'physics', 'accounting'])).toBe('incomplete');
  });

  it('accepts Biological Science with Physics', () => {
    expect(validateSelection(biological, ['biology', 'chemistry', 'physics'])).toBeNull();
  });

  it('accepts Biological Science with Agricultural Science', () => {
    expect(validateSelection(biological, ['biology', 'chemistry', 'agricultural-science'])).toBeNull();
  });

  it('accepts Engineering Technology with an approved third subject', () => {
    expect(
      validateSelection(engineering, ['engineering-technology', 'science-for-technology', 'ict']),
    ).toBeNull();
  });
});

describe('Commerce "at least two" rule', () => {
  it('accepts the three main commerce subjects', () => {
    expect(validateSelection(commerce, ['accounting', 'business-studies', 'economics'])).toBeNull();
  });

  it('accepts two main subjects plus one other', () => {
    expect(validateSelection(commerce, ['accounting', 'business-studies', 'ict'])).toBeNull();
  });

  it('rejects only one main subject', () => {
    expect(validateSelection(commerce, ['accounting', 'business-statistics', 'ict'])).toBe(
      'not_enough_core',
    );
  });
});

describe('guiding the choice', () => {
  it('reports how many more subjects are needed', () => {
    expect(remainingChoices(physical, ['combined-mathematics', 'physics'])).toBe(1);
    expect(remainingChoices(physical, ['combined-mathematics', 'physics', 'chemistry'])).toBe(0);
  });

  it('allows a subject that can still lead to a valid set', () => {
    expect(canAddSubject(commerce, ['accounting'], 'business-studies')).toBe(true);
  });

  it('blocks a subject that would make a valid set impossible', () => {
    // Two non-core commerce subjects already chosen: a third cannot satisfy
    // the "at least two of accounting, business studies, economics" rule.
    expect(canAddSubject(commerce, ['business-statistics', 'ict'], 'accounting')).toBe(false);
  });

  it('blocks anything once three subjects are chosen', () => {
    expect(canAddSubject(commerce, ['accounting', 'business-studies', 'economics'], 'ict')).toBe(false);
  });

  it('always allows deselecting an already selected subject', () => {
    expect(canAddSubject(commerce, ['accounting', 'business-studies', 'ict'], 'ict')).toBe(true);
  });
});

describe('toggling', () => {
  it('adds and removes an optional subject', () => {
    const withIct = toggleSubject(commerce, ['accounting', 'business-studies'], 'ict');
    expect(withIct).toContain('ict');
    expect(toggleSubject(commerce, withIct, 'ict')).not.toContain('ict');
  });

  it('refuses to add a fourth subject', () => {
    const full = ['accounting', 'business-studies', 'economics'] as const;
    expect(toggleSubject(commerce, full, 'ict')).toHaveLength(3);
  });

  it('produces a complete selection that validates', () => {
    let selection = coreSubjects(physical);
    selection = toggleSubject(physical, selection, 'chemistry');
    expect(isSelectionComplete(physical, selection)).toBe(true);
  });
});
