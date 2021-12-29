const add = (a, b) => {
  const filtered = [a, b].filter(Boolean);
  const [nA = 0, nB = 0] = filtered;
  return Number(nA) + Number(nB);
};

const glue = (a, b) => {
  return `${a}${b}`;
};

describe('test 101', () => {
  it('Can add numbers together', () => {
    expect(add(1, 14)).toBe(15);
  });
  it('Can add numbers (strings) together', () => {
    expect(add('1', 14))
      .toBe(15);
  });
  it('Can add numbers (strings) together', () => {
    expect(add(null, 14))
      .toBe(14);
  });
  it('Still outputs 0 when both values are null', () => {
    expect(add(null, null))
      .toBe(0);
  });
  it('Outputs the sum, even when one of them is NaN', () => {
    expect(add(null, NaN))
      .toBe(0);
  });
  it('Does not fail when undefined', () => {
    expect(add(undefined, 2))
      .toBe(2);
  });
  it('Does not fail when using negative numbers', () => {
    expect(add(-1, 2))
      .toBe(1);
  });
  it('Can add the strings together', () => {
    expect(glue('1', '10')).toBe('110');
  });
});

