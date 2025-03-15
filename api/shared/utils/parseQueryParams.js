const MAX_SIZE_LIMIT_QUERY_PARAM = 50;

export function parseQueryParams(query) {
    const filters = {
        page: 1,
        limit: 10,
        name: null,
        service: null,
        technology: null,
        minPrice: null,
        maxPrice: null
    };
    
    const queries = {
        page: query.page,
        limit: page.limit,
        name: page.name,
        service: page.service,
        technology: page.technology,
        minPrice: page.minPrice,
        maxPrice: page.maxPrice,
    }

    filters.page = !isNaN(Number(queries.page))
        ? Number(queries.page)
        : filters.page;

    filters.page = filters.page < 1
        ? 1
        : filters.page;
    
    filters.limit = !isNaN(Number(queries.limit))
        ? Number(queries.limit)
        : filters.limit;
    
    filters.limit = filters.limit > MAX_SIZE_LIMIT_QUERY_PARAM
        ? MAX_SIZE_LIMIT_QUERY_PARAM
        : filters.limit;

    filters.limit = filters.limit < 1 ? 1 : filters.limit;

    queries.name = queries.name && typeof queries.name === 'string'
        ? filters.name = queries.name.trim()
        : null;
    
    queries.service = queries.service && typeof queries.service === 'string'
        ? filters.service = queries.service.trim()
        : null;
    
    queries.technology = queries.technology && typeof queries.technology === 'string'
        ? filters.technology = queries.technology.trim()
        : null;

    queries.minPrice = queries.minPrice && !isNaN(Number(queries.minPrice))
        ? filters.minPrice = Number(queries.minPrice)
        : null;

    queries.maxPrice = queries.maxPrice && !isNaN(Number(queries.maxPrice))
        ? filters.maxPrice = Number(queries.maxPrice)
        : null;

    return Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== null));
}
