const sizes = {
  sm: '320px',
  md: '768px',
  lg: '1024px',
  xlg: '1280px',
}

export const screen = {
  sm: `@media (min-width: ${sizes.sm})`,
  md: `@media (min-width: ${sizes.md})`,
  lg: `@media (min-width: ${sizes.lg})`,
  xlg: `@media (min-width: ${sizes.xlg})`,
  max: `${sizes.xlg}`,
}
