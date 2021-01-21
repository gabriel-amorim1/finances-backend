export interface SpendingDivisionInterface {
    income: ClassificationFormatInterface;
    essentialExpenses: ClassificationFormatInterface;
    nonEssentialExpenses: ClassificationFormatInterface;
    investments: ClassificationFormatInterface;
    waste: ClassificationFormatInterface;
    remnant: ClassificationFormatInterface;
}

export interface ClassificationFormatInterface {
    inPercentage: number;
    inValue: number;
}
