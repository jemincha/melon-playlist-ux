// src/utils/insertIntoArtistBlock.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { insertIntoArtistBlock } from './insertIntoArtistBlock.js';

function track(trackId, artistName) {
  return { trackId, artistName, title: trackId, album: '', albumArt: '', addedAt: '' };
}

test('떨어져 나온 곡을 같은 아티스트 블록 바로 뒤로 옮긴다', () => {
  const tracks = [track('t1', 'A'), track('t2', 'A'), track('t3', 'B'), track('new1', 'A')];
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