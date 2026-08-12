import { formatDate, formatDateDisplay } from '../utils';

describe('Utils', () => {
  describe('formatDate', () => {
    it('formats date correctly for API', () => {
      const date = new Date('2023-12-01T10:30:00.000Z');
      const result = formatDate(date);
      expect(result).toBe('2023-12-01');
    });
  });

  describe('formatDateDisplay', () => {
    it('formats date string for display', () => {
      const dateString = '2023-12-01';
      const result = formatDateDisplay(dateString);
      // This will vary based on locale, but should contain month and day
      expect(result).toMatch(/Dec|12/);
      expect(result).toMatch(/1/);
    });
  });
}); 