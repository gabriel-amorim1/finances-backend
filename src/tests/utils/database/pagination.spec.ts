import * as pagination from '../../../utils/dataBase/pagination';

describe('Database Pagination', () => {
    it('buildPaginatedGetAll - Without parameters', () => {
        const expectedRes = {
            data: ['data'],
            count: 1,
            limit: 20,
            page: 1,
            totalPages: 1,
        };

        const res = pagination.buildPaginatedGetAll(
            {},
            { data: ['data'], count: 1 },
        );

        expect(res).toEqual(expectedRes);
    });

    it('buildPaginatedGetAll - With page and size', () => {
        const expectedRes = {
            data: ['data'],
            count: 1,
            limit: 5,
            page: 2,
            totalPages: 1,
        };

        const res = pagination.buildPaginatedGetAll(<any>{ size: 5, page: 2 }, {
            data: ['data'],
            count: 1,
        });

        expect(res).toEqual(expectedRes);
    });

    it('getTotalPages - will returns one page', () => {
        const res = pagination.getTotalPages(3, 5);

        expect(res).toEqual(1);
    });

    it('buildSortParams - Without parameters', () => {
        const expectedRes = { sortParam: 'created_at', sortOrder: 'DESC' };

        const res = pagination.buildSortParams({});

        expect(res).toEqual(expectedRes);
    });

    it('buildSortParams - With sortParam and sortOrder', () => {
        const expectedRes = { sortParam: 'sort_param', sortOrder: 'ASC' };

        const res = pagination.buildSortParams({
            sortParam: 'sort_param',
            sortOrder: 'ASC',
        });

        expect(res).toEqual(expectedRes);
    });

    it('getSortParam - sortParam not sent', () => {
        const res = pagination.getSortParam();

        expect(res).toEqual('created_at');
    });

    it('getSortParam - sortParam returned as it was sent', () => {
        const res = pagination.getSortParam('sort_param');

        expect(res).toEqual('sort_param');
    });

    it('getSortOrder - sortOrder not sent', () => {
        const res = pagination.getSortOrder('created_at');

        expect(res).toEqual('DESC');
    });

    it('getSortOrder - sortOrder as asc sent', () => {
        const res = pagination.getSortOrder('created_at', 'asc');

        expect(res).toEqual('ASC');
    });

    it('getPaginationParams - Without parameters', () => {
        const res = pagination.getPaginationParams({});

        expect(res).toEqual({ skip: 0, take: 20 });
    });

    it('getPaginationParams - Without size and page sent', () => {
        const res = pagination.getPaginationParams(<any>{ size: 30, page: 2 });

        expect(res).toEqual({ skip: 30, take: 30 });
    });

    it('getTake - Size not sent', () => {
        const res = pagination.getTake();

        expect(res).toEqual(20);
    });

    it('getTake - Size returned as it was sent', () => {
        const res = pagination.getTake(10);

        expect(res).toEqual(10);
    });

    it('getSkip - Page not sent', () => {
        const res = pagination.getSkip(20);

        expect(res).toEqual(0);
    });

    it('getSkip - Page sent', () => {
        const res = pagination.getSkip(20, 3);

        expect(res).toEqual(40);
    });
});
