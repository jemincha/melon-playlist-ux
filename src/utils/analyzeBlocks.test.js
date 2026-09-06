// src/utils/analyzeBlocks.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { groupByArtist } from './groupByArtist.js';
import { analyzeBlocks } from './analyzeBlocks.js';

function track(trackId, artistName) {
  return { trackId, artistName, title: trackId, album: '', albumArt: '', addedAt: '' };
}

test('블록이 1개뿐인 아티스트는 misplaced/dropTarget 둘 다 false', () => {
  const blocks = groupByArtist([track('t1', 'A'), track('t2', 'A')]);
  const analyzed = analyzeBlocks(blocks);

  assert.equal(analyzed[0].isMisplaced, false);
  assert.equal(analyzed[0].isDropTarget, false);
});

test('같은 아티스트 블록이 2개면, 더 큰 쪽이 dropTarget이고 작은 쪽이 misplaced', () => {
  const tracks = [track('t1', 'A'), track('t2', 'A'), track('t3', 'B'), track('t4', 'A')];
  const analyzed = analyzeBlocks(groupByArtist(tracks));

  const bigABlock = analyzed.find((b) => b.artistName === 'A' && b.tracks.length === 2);
  const smallABlock = analyzed.find((b) => b.artistName === 'A' && b.tracks.length === 1);

  assert.equal(bigABlock.isDropTarget, true);
  assert.equal(bigABlock.isMisplaced, false);
  assert.equal(smallABlock.isDropTarget, false);
  assert.equal(smallABlock.isMisplaced, true);
});

test('같은 아티스트 블록 크기가 동점이면 먼저 나온 블록을 메인으로 취급한다', () => {
  const tracks = [track('t1', 'A'), track('t2', 'B'), track('t3', 'A')];
  const analyzed = analyzeBlocks(groupByArtist(tracks));

  const firstABlock = analyzed.find((b) => b.blockId === 'block-t1');
  const secondABlock = analyzed.find((b) => b.blockId === 'block-t3');

  assert.equal(firstABlock.isDropTarget, true);
  assert.equal(secondABlock.isMisplaced, true);
});