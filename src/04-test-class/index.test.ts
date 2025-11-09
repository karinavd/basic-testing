// Uncomment the code below and write your tests
import { getBankAccount, TransferFailedError } from '.';
import lodash from 'lodash';
describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    // Write your test here
    expect(getBankAccount(100).getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    expect(() => getBankAccount(50).withdraw(100)).toThrow(
      'Insufficient funds: cannot withdraw more than 50',
    );
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const account = getBankAccount(50);
    expect(() => account.transfer(100, account)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const account = getBankAccount(50);
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    // Write your test here
    expect(getBankAccount(10).deposit(50).getBalance()).toBe(60);
  });

  test('should withdraw money', () => {
    // Write your test here
    expect(getBankAccount(50).withdraw(50).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    // Write your test here
    const value = getBankAccount(60);
    const value1 = getBankAccount(30);
    value.transfer(30, value1);
    expect(value.getBalance()).toBe(30);
    expect(value1.getBalance()).toBe(60);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const getBankAccountValue = getBankAccount(0);
    jest.spyOn(lodash, 'random').mockReturnValueOnce(30).mockReturnValueOnce(1);
    const value = await getBankAccountValue.fetchBalance();
    expect(typeof value).toBe('number');
    jest.restoreAllMocks();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const value = getBankAccount(0);
    jest.spyOn(value, 'fetchBalance').mockResolvedValue(10);
    await value.synchronizeBalance();
    expect(value.getBalance()).toBe(10);
    jest.restoreAllMocks();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    const value = getBankAccount(0);
    jest.spyOn(value, 'fetchBalance').mockResolvedValue(null);
    await expect(value.synchronizeBalance()).rejects.toThrow();
    jest.restoreAllMocks();
  });
});
