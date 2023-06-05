import { getSplitTestVersion } from '../src/helpers/helpers.js';

const versionSplits = [
  {
    version: 'version1',
    split: 0.5,
  },
  {
    version: 'version2',
    split: 0.25,
  },
  {
    version: 'version3',
    split: 0.25,
  }
]

describe('getRandomVersion', () => {
  // Mock Math.random() to return a fixed value
  it('should return the correct version based on the random number', () => {
    global.Math.random = jest.fn(() => 0.9);  // force the random number to be 0.4
    const version = getSplitTestVersion(versionSplits);
    expect(version).toBe('version1');
  });

  it('should return the correct version based on the random number', () => {
    global.Math.random = jest.fn(() => 0.7);
    const version = getSplitTestVersion(versionSplits);
    expect(version).toBe('version2');
  });

  it('should return the correct version based on the random number', () => {
    global.Math.random = jest.fn(() => 0.9);
    const version = getSplitTestVersion(versionSplits);
    expect(version).toBe('version3');
  });

  // Additional test cases can be added as needed
});
