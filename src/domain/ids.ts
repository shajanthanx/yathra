/**
 * Local id generation. Ids only need to be unique on one device, so a
 * timestamp plus randomness is enough and avoids pulling in a uuid library.
 */
let counter = 0;

export function createId(prefix: string): string {
  counter = (counter + 1) % 100000;
  const time = Date.now().toString(36);
  const random = Math.floor(Math.random() * 0xffffff).toString(36);
  return `${prefix}_${time}${counter.toString(36)}${random}`;
}

export function taskId(): string {
  return createId('t');
}

export function sessionId(): string {
  return createId('s');
}

export function pastPaperId(subjectId: string, year: number): string {
  return `${subjectId}:${year}`;
}
