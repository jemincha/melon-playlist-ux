// src/utils/insertIntoArtistBlock.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { insertIntoArtistBlock } from './insertIntoArtistBlock.js';

function track(trackId, artistName) {
  return {
    trackId,
    artistName,
    title: trackId,
    album: '',
    albumArt: '',
    addedAt: '',
  };
}

test('떨어져 나온 곡을 같은 아티스트 블록 바로 뒤로 옮긴다', () => {
  const tracks = [
    track('t1', 'A'),
    track('t2', 'A'),
    track('t3', 'B'),
    track('new1', 'A'),
  ];
  const result = insertIntoArtistBlock(tracks, 'new1');

  assert.deepEqual(
    result.map((t) => t.trackId),
    ['t1', 't2', 'new1', 't3']
  );
});

test('매칭되는 기존 블록이 없으면(처음 나온 아티스트) 원래 자리를 유지한다', () => {
  const tracks = [track('t1', 'A'), track('t2', 'B'), track('new1', 'C')];
  const result = insertIntoArtistBlock(tracks, 'new1');

  assert.deepEqual(
    result.map((t) => t.trackId),
    ['t1', 't2', 'new1']
  );
});

test('같은 아티스트 블록이 여러 개로 쪼개져 있으면 가장 큰 블록 뒤로 합친다', () => {
  const tracks = [
    track('t1', 'A'),
    track('t2', 'A'),
    track('t3', 'B'),
    track('t4', 'A'),
    track('t5', 'C'),
    track('new1', 'A'),
  ];
  const result = insertIntoArtistBlock(tracks, 'new1');

  assert.deepEqual(
    result.map((t) => t.trackId),
    ['t1', 't2', 'new1', 't3', 't4', 't5']
  );
});

test('존재하지 않는 trackId면 원본 배열을 그대로 반환한다', () => {
  const tracks = [track('t1', 'A'), track('t2', 'B')];
  const result = insertIntoArtistBlock(tracks, 'no-such-id');

  assert.deepEqual(result, tracks);
});

test('지정한 작은 구간으로 이동하고 다른 곡의 상대 순서를 보존한다', () => {
  const tracks = [
    track('a1', 'A'),
    track('a2', 'A'),
    track('b', 'B'),
    track('a3', 'A'),
    track('c', 'C'),
    { ...track('n', 'A'), pendingPlacement: true },
  ];
  const result = insertIntoArtistBlock(tracks, 'n', 'block-a3');
  assert.deepEqual(
    result.map((t) => t.trackId),
    ['a1', 'a2', 'b', 'a3', 'n', 'c']
  );
  assert.deepEqual(
    result.filter((t) => t.trackId !== 'n'),
    tracks.filter((t) => t.trackId !== 'n')
  );
  assert.equal(result.find((t) => t.trackId === 'n').pendingPlacement, false);
  assert.equal(tracks.at(-1).pendingPlacement, true);
});
test('다른 아티스트나 없는 목적지로는 이동하지 않는다', () => {
  const tracks = [track('a', 'A'), track('b', 'B'), track('n', 'A')];
  assert.equal(insertIntoArtistBlock(tracks, 'n', 'block-b'), tracks);
  assert.equal(insertIntoArtistBlock(tracks, 'n', 'missing'), tracks);
});
test('목적지가 없으면 중간에 있는 곡도 원래 위치를 유지한다', () => {
  const tracks = [track('a', 'A'), track('c', 'C'), track('b', 'B')];
  assert.equal(insertIntoArtistBlock(tracks, 'c'), tracks);
});

test('기본 목적지 크기가 같으면 먼저 나온 기존 구간을 사용한다', () => {
  const tracks = [
    track('a1', 'A'),
    track('b', 'B'),
    track('a2', 'A'),
    track('c', 'C'),
    track('n', 'A'),
  ];
  assert.deepEqual(
    insertIntoArtistBlock(tracks, 'n').map((t) => t.trackId),
    ['a1', 'n', 'b', 'a2', 'c']
  );
});

test('다른 미배치 신곡만 있는 구간은 목적지로 사용하지 않는다', () => {
  const tracks = [
    track('a', 'A'),
    track('b', 'B'),
    { ...track('n1', 'A'), pendingPlacement: true },
    { ...track('n2', 'A'), pendingPlacement: true },
  ];
  assert.equal(insertIntoArtistBlock(tracks, 'n1', 'block-n1'), tracks);
  assert.deepEqual(
    insertIntoArtistBlock(tracks, 'n1').map((t) => t.trackId),
    ['a', 'n1', 'b', 'n2']
  );
});
