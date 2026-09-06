// src/utils/groupByArtist.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { groupByArtist } from './groupByArtist.js';

function track(trackId, artistName) {
  return { trackId, artistName, title: trackId, album: '', albumArt: '', addedAt: '' };
}

test('빈 배열이면 빈 블록 배열을 반환한다', () => {
  assert.deepEqual(groupByArtist([]), []);
});

test('연속된 동일 아티스트 곡은 하나의 블록으로 묶인다', () => {
  const tracks = [track('t1', 'A'), track('t2', 'A'), track('t3', 'A')];
  const blocks = groupByArtist(tracks);

  assert.equal(blocks.length, 1);
  assert.equal(blocks[0].artistName, 'A');
  assert.equal(blocks[0].tracks.length, 3);
  assert.equal(blocks[0].blockId, 'block-t1');
});

test('아티스트가 바뀌면 새 블록으로 분리된다', () => {
  const tracks = [track('t1', 'A'), track('t2', 'B'), track('t3', 'B')];
  const blocks = groupByArtist(tracks);

  assert.equal(blocks.length, 2);
  assert.equal(blocks[0].artistName, 'A');
  assert.equal(blocks[1].artistName, 'B');
  assert.equal(blocks[1].tracks.length, 2);
});

test('같은 아티스트라도 떨어져 있으면(=사이에 다른 아티스트가 끼면) 별개 블록으로 취급한다', () => {
  const tracks = [track('t1', 'A'), track('t2', 'B'), track('t3', 'A')];
  const blocks = groupByArtist(tracks);

  assert.equal(blocks.length, 3);
  assert.equal(blocks[0].artistName, 'A');
  assert.equal(blocks[2].artistName, 'A');
  assert.notEqual(blocks[0].blockId, blocks[2].blockId);
});