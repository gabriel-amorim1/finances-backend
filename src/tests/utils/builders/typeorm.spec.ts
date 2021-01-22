import { buildGetAllOptions } from '../../../utils/builders/typeorm';

describe('Typeorm Filters', () => {
    it('buildGetAllOptions - no params', () => {
        const options = buildGetAllOptions({});

        const expectedRes = {
            take: 20,
            skip: 0,
        };

        expect(options).toEqual(expectedRes);
    });

    it('buildGetAllOptions - all params', () => {
        const options = buildGetAllOptions({ size: 10, page: 2 });

        const expectedRes = {
            take: 10,
            skip: 1,
        };

        expect(options).toEqual(expectedRes);
    });
});
