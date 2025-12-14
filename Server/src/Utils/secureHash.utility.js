

export const getHashSecret = (fixedTime = '') => {
  const part1 =process.env.HASH_SECRET || 'fallbackSecret123';
  const time = fixedTime ;  
  const part2 = 'XyZ123!#$_@' + time;

  return [...part1].map((ch, i) => ch + (part2[i] || '')).join('');
};
