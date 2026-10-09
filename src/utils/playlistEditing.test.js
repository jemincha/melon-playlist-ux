import { test } from 'node:test';
import assert from 'node:assert/strict';
import { artistView, insertionTargets, addAtPosition, moveSegment, moveTrack } from './playlistEditing.js';

const source = [
  { trackId: 'a1', artistName: 'B' }, { trackId: 'a2', artistName: 'B' },
  { trackId: 'b1', artistName: 'A' }, { trackId: 'a3', artistName: 'B' },
  { trackId: 'c1', artistName: 'C' },
];
const ids = (tracks) => tracks.map((track) => track.trackId);

test('아티스트 보기는 원본과 같은 아티스트 내 순서를 보존한다', () => {
  const before = ids(source);
  assert.deepEqual(ids(artistView(source)), ['b1', 'a1', 'a2', 'a3', 'c1']);
  assert.deepEqual(ids(source), before);
});

test('같은 아티스트의 분리된 모든 구간을 독립 삽입 후보로 제공한다', () => {
  const targets = insertionTargets(source, 'B');
  assert.deepEqual(targets.map(({ start, end, afterId }) => [start, end, afterId]),
    [[0, 2, 'a2'], [3, 4, 'a3']]);
  assert.deepEqual(insertionTargets(source, 'unknown'), []);
});

test('사용자가 선택한 작은 구간에 삽입해 기존 곡의 상대 순서를 보존한다', () => {
  const track = { trackId: 'new', artistName: 'B' };
  const result = addAtPosition(source, track, 'a3');
  assert.deepEqual(ids(result), ['a1', 'a2', 'b1', 'a3', 'new', 'c1']);
  assert.deepEqual(ids(result.filter((item) => item.trackId !== 'new')), ids(source));
});

test('처음·끝 추가와 중복·존재하지 않는 위치를 처리한다', () => {
  const track = { trackId: 'new', artistName: 'D' };
  assert.equal(addAtPosition(source, track, 'head')[0], track);
  assert.equal(addAtPosition(source, track, 'tail').at(-1), track);
  assert.equal(addAtPosition(source, source[0], 'tail'), source);
  assert.equal(addAtPosition(source, track, 'missing'), source);
});

test('블록 이동은 여러 곡을 모두 보존하고 분산된 별도 구간을 합치지 않는다', () => {
  const result = moveSegment(source, 'block-a1', 'block-c1');
  assert.deepEqual(ids(result), ['b1', 'a3', 'c1', 'a1', 'a2']);
  assert.deepEqual([...ids(result)].sort(), [...ids(source)].sort());
  assert.equal(moveSegment(source, 'missing', 'block-c1'), source);
});

test('단일 곡은 아티스트가 다른 위치로도 이동하고 모든 곡을 보존한다', () => {
  assert.deepEqual(ids(moveTrack(source, 'c1', 'a1')), ['c1', 'a1', 'a2', 'b1', 'a3']);
  assert.equal(moveTrack(source, 'missing', 'a1'), source);
});
