// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const callback = jest.fn();
    const timeout = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);
    expect(timeout).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    const callback = jest.fn();
    const timeout = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);
    expect(timeout).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
    const pathToFile = 'file.txt';
    const mockPathFile = '/mocked/path/file.txt';
    const joinValue = jest.spyOn(path, 'join').mockReturnValue(mockPathFile);
    await readFileAsynchronously(pathToFile);
    expect(joinValue).toHaveBeenCalledWith(__dirname, pathToFile);
    joinValue.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    const pathToFile = 'file.txt';
    const readAsync = await readFileAsynchronously(pathToFile);
    expect(readAsync).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    const pathToFile = 'file.txt';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(Buffer.from('content') as any);
    const readAsync = await readFileAsynchronously(pathToFile);
    expect(readAsync).toBe('content');
  });
});
