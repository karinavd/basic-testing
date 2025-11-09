// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    const sum = simpleCalculator({ a: 10, b: 10, action: Action.Add });
    expect(sum).toBe(20);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    const sub = simpleCalculator({ a: 10, b: 10, action: Action.Subtract });
    expect(sub).toBe(0);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    const mult = simpleCalculator({ a: 10, b: 10, action: Action.Multiply });
    expect(mult).toBe(100);
  });

  test('should divide two numbers', () => {
    // Write your test here
    const divide = simpleCalculator({ a: 10, b: 10, action: Action.Divide });
    expect(divide).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    const exponent = simpleCalculator({
      a: 10,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(exponent).toBe(100);
  });

  test('should return null for invalid action', () => {
    // Write your test here
    const value = simpleCalculator({ a: 10, b: 2, action: '' });
    expect(value).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    const value = simpleCalculator({ a: '', b: '', action: Action.Add });
    expect(value).toBe(null);
  });
});
