import { buildSortParams, getPaginationParams } from './pagination';
import {
    OptionsTypeOrmGetAll,
    RequestGetAllInterface,
} from '../../interfaces/pagination';
import { dynamicFilter } from './dynamicFilter';

export const buildFilterGetAll = <T>(
    queryParams: T & RequestGetAllInterface,
): OptionsTypeOrmGetAll => {
    const { take, skip } = getPaginationParams(queryParams);
    const { sortParam, sortOrder } = buildSortParams(queryParams);

    const query = { ...queryParams };

    const where = dynamicFilter(query);

    const build: OptionsTypeOrmGetAll = {
        where,
        order: { [sortParam]: `${sortOrder}` },
        take,
        skip,
        orderBy: {
            columnName: sortParam,
            order: <'DESC' | 'ASC'>`${sortOrder}`,
        },
    };

    return build;
};
