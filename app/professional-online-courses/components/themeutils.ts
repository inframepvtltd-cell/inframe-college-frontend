// utils/themeUtils.ts

/**
 * Generate color shades from a base color
 */
export const generateThemeShades = (hexColor: string) => {
  if (!hexColor || !hexColor.startsWith('#')) {
    hexColor = '#FFD700'; // Default to yellow
  }
  
  // Convert hex to RGB
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Generate shades with proper contrast
  const shades: Record<string, string> = {
    // Base colors
    '50': `rgba(${r}, ${g}, ${b}, 0.05)`,
    '100': `rgba(${r}, ${g}, ${b}, 0.1)`,
    '200': `rgba(${r}, ${g}, ${b}, 0.2)`,
    '300': `rgba(${r}, ${g}, ${b}, 0.3)`,
    '400': `rgba(${r}, ${g}, ${b}, 0.4)`,
    '500': hexColor,
    '600': `rgb(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)})`,
    '700': `rgb(${Math.max(0, r - 60)}, ${Math.max(0, g - 60)}, ${Math.max(0, b - 60)})`,
    '800': `rgb(${Math.max(0, r - 90)}, ${Math.max(0, g - 90)}, ${Math.max(0, b - 90)})`,
    '900': `rgb(${Math.max(0, r - 120)}, ${Math.max(0, g - 120)}, ${Math.max(0, b - 120)})`,
    
    // Useful combinations
    'gradient': `linear-gradient(135deg, ${hexColor}, rgb(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)}))`,
    'gradientLight': `linear-gradient(135deg, rgba(${r}, ${g}, ${b}, 0.8), rgba(${r}, ${g}, ${b}, 0.3))`,
    'gradientSubtle': `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0.1), rgba(${r}, ${g}, ${b}, 0.05))`,
  };
  
  return shades;
};

/**
 * Calculate brightness and determine text color
 */
export const getTextColor = (hexColor: string): string => {
  if (!hexColor || !hexColor.startsWith('#')) return '#000000';
  
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate brightness (YIQ formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

/**
 * Get complementary color
 */
export const getComplementaryColor = (hexColor: string): string => {
  if (!hexColor || !hexColor.startsWith('#')) return '#0000FF';
  
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  const compR = (255 - r).toString(16).padStart(2, '0');
  const compG = (255 - g).toString(16).padStart(2, '0');
  const compB = (255 - b).toString(16).padStart(2, '0');
  
  return `#${compR}${compG}${compB}`;
};

/**
 * Get course type from string
 */
export const getCourseType = (courseType: string): string => {
  if (!courseType) return 'interior';
  
  const typeMap: Record<string, string> = {
    'interior design': 'interior',
    'interior design course': 'interior',
    'graphic design': 'graphic',
    'uiux design': 'uiux',
    'motion design': 'motion',
    'digital marketing': 'digital',
    'fashion design': 'fashion',
    'animation vfx': 'animation',
    'jewellery design': 'jewellery',
    'fine arts': 'finearts',
    'civil': 'civil'
  };
  
  return typeMap[courseType.toLowerCase()] || 'interior';
};

/**
 * Get appropriate text color based on background color
 */
export const getContrastTextColor = (bgColor: string): string => {
  const textColor = getTextColor(bgColor);
  
  // If background is very light, use darker theme color
  if (textColor === '#000000') {
    const shades = generateThemeShades(bgColor);
    return shades['700']; // Return darker shade for better contrast on light backgrounds
  }
  
  return textColor;
};