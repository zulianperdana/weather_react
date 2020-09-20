const flex = (direction: string): string => `
display: flex;
flex-direction: ${direction};
`;

const alignCenter = `align-items:center;`;

const spaceBetween = `justify-content:space-between`;

export { flex, alignCenter, spaceBetween };
