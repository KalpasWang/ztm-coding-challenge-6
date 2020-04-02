const converter = require('./index');


test('Test hex format', () => {
  const hex1 = '#665544';
  const hex2 = '#fff';
  const wrongHex = '#gtf';

  expect(converter(hex1)).toBe('rgb(102, 85, 68)');
  expect(converter(hex2)).toBe('rgb(255, 255, 255)');
  expect(converter(wrongHex)).toBe('please use valid color code');
});

test('Test rgb format', () => {
  const rgb1 = 'rgb(234, 67, 164)';
  const rgb2 = 'rgb(255,255,0)';
  const wrongRgb = 'rgb(267,-60,7.1)';

  expect(converter(rgb1)).toBe('#ea43a4');
  expect(converter(rgb2)).toBe('#ffff00');
  expect(converter(wrongRgb)).toBe('please use valid color code');
});
