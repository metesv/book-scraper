const axios = require('axios');
const cliProgress = require('cli-progress');
const getBooksFromGoogleApi = require('./get-books-from-google-api');

// Mock axios.get to return a fake response
jest.mock('axios');
axios.get.mockResolvedValue({
  data: {
    items: [{
      volumeInfo: {
        authors: ['Test Author'],
        title: 'Test Title',
        industryIdentifiers: [{ type: 'ISBN_13', identifier: '1234567890123' }]
      }
    }]
  }
});

// Mock cliProgress.SingleBar to prevent console output during tests
jest.mock('cli-progress', () => ({
  SingleBar: jest.fn(() => ({
    start: jest.fn(),
    update: jest.fn(),
    stop: jest.fn()
  })),
  Presets: {
    shades_classic: 'shades_classic'
  }
}));

// Mock lodash to use the original implementation of _.mergeWith
jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  mergeWith: jest.requireActual('lodash').mergeWith
}));

describe('getBooksFromGoogleApi', () => {
  let books;

  beforeEach(() => {
    // Reset the books array before each test
    books = [
      { isbn13: '9789759955762', authors: ['Ahmet Hamdi Tanpinar'], title: 'Saatler Ayarlama Enstitus' },
      { isbn13: '9786053608851', authors: ['Sait Faik Abasiyanik'], title: 'Semaver' },
      { isbn13: '9789756004913', authors: ['Ali Seriati'], title: '' }
    ];
  });

  it('should skip books with all required data', async () => {
    // Call the function with a book that has all required data
    const result = await getBooksFromGoogleApi(books);

    // Expect the result to be unchanged
    expect(result).toEqual(books);
  });

  it('should update books with missing data', async () => {
    // Call the function with a book that has missing data
    delete books[1].title;
    const result = await getBooksFromGoogleApi(books);

    // Expect the title to be updated with the fake response data
    expect(result[1].title).toBe('Test Title');
  });

  it('should handle errors', async () => {
    // Mock axios.get to reject the request
    axios.get.mockRejectedValue(new Error('Test Error'));

    // Call the function with all books
    const result = await getBooksFromGoogleApi(books);

    // Expect the result to be unchanged
    expect(result).toEqual(books);
  });
});
