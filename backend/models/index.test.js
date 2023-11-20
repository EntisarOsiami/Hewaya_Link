import {
  Blog,
  Comment,
  Rating,
  Gallery,
  Portal,
  User,
  Tag,
  Category,
} from './index';

describe('Models', () => {
  test('should export Blog model', () => {
    expect(Blog).toBeDefined();
  });

  test('should export Comment model', () => {
    expect(Comment).toBeDefined();
  });

  test('should export Rating model', () => {
    expect(Rating).toBeDefined();
  });

  test('should export Gallery model', () => {
    expect(Gallery).toBeDefined();
  });

  test('should export Portal model', () => {
    expect(Portal).toBeDefined();
  });

  test('should export User model', () => {
    expect(User).toBeDefined();
  });

  test('should export Tag model', () => {
    expect(Tag).toBeDefined();
  });

  test('should export Category model', () => {
    expect(Category).toBeDefined();
  });
});