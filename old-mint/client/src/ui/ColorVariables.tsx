import hexRgb from 'hex-rgb';

import { useColors } from '@/hooks/useColors';

const hexToRbgNumbers = (hex: string) => {
  const rgb = hexRgb(hex);
  return `${rgb.red} ${rgb.green} ${rgb.blue}`;
};

export function ColorVariables() {
  const colors = useColors();

  const cssVariables = `:root {
    --primary: ${hexToRbgNumbers(colors.primary)};
    --primary-light: ${hexToRbgNumbers(colors.primaryLight)};
    --primary-dark: ${hexToRbgNumbers(colors.primaryDark)};
    --background-light: ${hexToRbgNumbers(colors.backgroundLight)};
    --background-dark: ${hexToRbgNumbers(colors.backgroundDark)};
  }`;

  return <style>{cssVariables}</style>;
}
