// src/utils/downloadStatus.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isTrackDownloaded } from './downloadStatus.js';

test('같은 trackId는 항상 같은 결과를 반환한다 (결정론적)', () => {
  const first = isTrackDownloaded('t042');
  const second = isTrackDownloaded('t042');
  assert.equal(first, second);
});

test('결과는 boolean이다', () => {
  assert.equal(typeof isTrackDownloaded('t001'), 'boolean');
});