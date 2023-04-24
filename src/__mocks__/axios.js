// ./__mocks__/axios.js
export default {
  get: jest.fn().mockResolvedValue({data: {}}),
  post: jest.fn().mockResolvedValue({data: {}}),
};
