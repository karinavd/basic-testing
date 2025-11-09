// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';
jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));
describe('throttledGetDataFromApi', () => {
  const mockGet = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    mockGet.mockResolvedValue({ data: 'testData' });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });
  });

  test('should create instance with provided base url', async () => {
    // Write your test here

    await throttledGetDataFromApi('/posts');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    await throttledGetDataFromApi('/users/1');
    expect(mockGet).toHaveBeenCalledWith('/users/1');
  });

  test('should return response data', async () => {
    // Write your test here
    const mockData = { id: 1, title: 'Post' };
    mockGet.mockResolvedValue({ data: mockData });
    const result = await throttledGetDataFromApi('/posts/1');
    expect(result).toEqual(mockData);
  });
});
