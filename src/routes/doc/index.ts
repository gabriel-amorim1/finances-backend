/* eslint-disable @typescript-eslint/no-var-requires */
const definitionUser = require('./definitionsData/user.json');
const definitionFinancialMovement = require('./definitionsData/financial_movement.json');
const definitionValidationError = require('./definitionsData/validation_error.json');
const definitionNotFound = require('./definitionsData/not_found.json');
const definitionSpendingDivision = require('./definitionsData/spending_division.json');

export default {
    ...definitionUser,
    ...definitionFinancialMovement,
    ...definitionValidationError,
    ...definitionNotFound,
    ...definitionSpendingDivision,
};
