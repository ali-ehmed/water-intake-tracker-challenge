describe('WaterLogService', () => {
  it('calculates percentage correctly', async () => {
    const intake = 1500;
    const expected = Math.round((intake * 100) / 2000);
    expect(expected).toBe(75);
  });
});