import * as filters from '../../../utils/dataBase/filters';

describe('Database Filters', () => {
    it('buildFilterGetAll - Without parameters', () => {
        const expectedRes = {
            where: {},
            order: { created_at: 'DESC' },
            take: 20,
            skip: 0,
            orderBy: { columnName: 'created_at', order: 'DESC' },
        };

        const res = filters.buildFilterGetAll({});

        expect(res).toEqual(expectedRes);
    });

    it('buildFilterGetAll - With all parameters', () => {
        const expectedRes = {
            where: {},
            order: { sort_param: 'ASC' },
            take: 20,
            skip: 0,
            orderBy: { columnName: 'sort_param', order: 'ASC' },
        };

        const res = filters.buildFilterGetAll({
            sortParam: 'sort_param',
            sortOrder: 'asc',
        });

        expect(res).toEqual(expectedRes);
    });
});
