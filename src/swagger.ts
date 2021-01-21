import swaggerJSDoc, { SwaggerDefinition, Options } from 'swagger-jsdoc';

import definitionsOfRoutes from './routes/doc';

const swaggerDefinition = {
    info: {
        title: 'API Finances',
        version: '1.0.0',
    },
    host: process.env.HOST || 'localhost:3333',
    basePath: '/',
} as SwaggerDefinition;

const options = {
    swaggerDefinition,
    apis: [
        './dist/routes/index.js',
        './dist/routes/user.routes.js',
        './dist/routes/financialMovement.routes.js',
        './dist/routes/spendingDivision.routes.js',
    ],
} as Options;

const swaggerSpec = swaggerJSDoc(options) as SwaggerDefinition;
swaggerSpec.definitions = { ...swaggerSpec.definitions, ...definitionsOfRoutes };

export { swaggerSpec };
