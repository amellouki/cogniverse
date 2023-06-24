export default function nameToColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const c = (hash & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  const color = "00000".substring(0, 6 - c.length) + c;

  let r = parseInt(color.substring(0,2), 16);
  let g = parseInt(color.substring(2,4), 16);
  let b = parseInt(color.substring(4,6), 16);

  let max = Math.max(r, g, b);
  if (max <= 200) {
    switch (hash % 3) {
      case 0: r = 200 + (hash % 56); break;
      case 1: g = 200 + (hash % 56); break;
      case 2: b = 200 + (hash % 56); break;
    }
  }

  const background = 'rgb(' + r + ',' + g + ',' + b + ')';

  const compR = 255 - r;
  const compG = 255 - g;
  const compB = 255 - b;

  const foreground = 'rgb(' + compR + ',' + compG + ',' + compB + ')';

  return {background, foreground};
}
