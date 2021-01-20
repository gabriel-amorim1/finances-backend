import { Between, FindOperator, Raw } from 'typeorm';
import moment from 'moment';

import { RequestGetAllInterface } from '../../interfaces/pagination';

export const dynamicFilter = <T>(
    data: T & RequestGetAllInterface,
): Record<string, unknown> => {
    const { dateFilter, startDateFilter, endDateFilter } = data;

    const queryParams = data;

    if (queryParams.page) delete queryParams.page;
    if (queryParams.size) delete queryParams.size;
    if (queryParams.sortParam) delete queryParams.sortParam;
    if (queryParams.sortOrder) delete queryParams.sortOrder;
    if (queryParams.dateFilter) delete queryParams.dateFilter;
    if (queryParams.startDateFilter) delete queryParams.startDateFilter;
    if (queryParams.endDateFilter) delete queryParams.endDateFilter;

    const queryDataEntries = Object.entries(data);

    let query: Record<string, unknown> = {};

    for (const [key, value] of queryDataEntries) {
        query = {
            ...query,
            // TODO ilike não funciona no sqlite
            // [key]: Raw(alias => `CAST(${alias} AS VARCHAR) ILIKE '%${value}%'`),
            [key]: Raw(alias => `CAST(${alias} AS VARCHAR) LIKE '%${value}%'`),
        };
    }

    if (dateFilter && startDateFilter && endDateFilter)
        query[dateFilter] = betweenDataFilter(startDateFilter, endDateFilter);

    return query;
};

export const betweenDataFilter = (
    startDate: string,
    endDate: string,
): FindOperator<moment.Moment> => {
    return Between(
        moment(startDate, 'YYYY-MM-DD').subtract(1, 'days'),
        moment(endDate, 'YYYY-MM-DD').add(1, 'days'),
    );
};
