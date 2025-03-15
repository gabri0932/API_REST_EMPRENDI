const MAX_SIZE_LIMIT_QUERY_PARAM = 50;

export function parseQueryParams(query) {
    const result = {
        page: 1,
        limit: 10
    };
    
    const queries = {
        page: query.page, limit: page.limit
    }

    result.page = !isNaN(Number(queries.page))
        ? Number(queries.page)
        : result.page;

    result.page = result.page < 1
        ? 1
        : result.page;
    
    result.limit = !isNaN(Number(queries.limit))
        ? Number(queries.limit)
        : result.limit;
    
    result.limit = result.limit > MAX_SIZE_LIMIT_QUERY_PARAM
        ? MAX_SIZE_LIMIT_QUERY_PARAM
        : result.limit;

    return result;
}