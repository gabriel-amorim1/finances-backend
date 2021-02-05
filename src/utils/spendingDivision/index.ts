export const calculatePercentage = (
    totalValue: number,
    partialValue?: number,
): number => {
    if (!partialValue) return 0;

    return Math.round((partialValue * 100) / totalValue) / 100;
};
