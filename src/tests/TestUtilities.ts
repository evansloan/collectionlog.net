export class TestUtilities {
  static createCollectionLogItem(
    name = 'Collection log',
    obtained = true
  ): CollectionLogItem {
    return {
      name,
      obtained,
      obtainedAt: '01/01/2023',
      quantity: 1,
      username: 'Test User',
      id: 1,
      sequence: 1,
    };
  }
}
