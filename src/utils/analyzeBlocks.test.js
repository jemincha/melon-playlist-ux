import { test } from 'node:test';
import assert from 'node:assert/strict';
import { groupByArtist } from './groupByArtist.js';
import { analyzeBlocks } from './analyzeBlocks.js';
const t = (trackId, artistName, pendingPlacement = false) => ({
  trackId,
  artistName,
  pendingPlacement,
});
test('기존 분리 구간을 오배치로 판단하지 않고 모든 곡을 보존한다', () => {
  const tracks = [t('a1', 'A'), t('b', 'B'), t('a2', 'A'), t('a3', 'A')];
  const blocks = analyzeBlocks(groupByArtist(tracks));
  assert.ok(blocks.every((b) => !b.isMisplaced));
  assert.deepEqual(
    blocks.flatMap((b) => b.tracks),
    tracks
  );
});
test('여러 신곡을 모두 후보로 표시하고 기존 구간들을 목적지로 제공한다', () => {
  const blocks = analyzeBlocks(
    groupByArtist([
      t('a1', 'A'),
      t('b', 'B'),
      t('a2', 'A'),
      t('c', 'C'),
      t('n1', 'A', true),
      t('n2', 'A', true),
    ])
  );
  const candidate = blocks.find((b) => b.isMisplaced);
  assert.equal(candidate.tracks.length, 2);
  assert.equal(candidate.targetBlocks.length, 2);
  assert.equal(blocks.filter((b) => b.isDropTarget).length, 2);
});
test('신규 아티스트와 기존 구간에 연속된 신곡은 이동 후보가 아니다', () => {
  const blocks = analyzeBlocks(
    groupByArtist([t('a', 'A'), t('n', 'A', true), t('c', 'C', true)])
  );
  assert.ok(blocks.every((b) => !b.isMisplaced));
});
