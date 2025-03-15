const mongoQueries = {
    name: (input) => ({ name: { $regex: input, $options: "i" } }),
    service: (input) => ({ services: { $in: [ input ] } }),
    technology: (input) => ({ technologies: { $in: [ input ] } }),
    minPrice: (input) => ({ 'price.amount': { $gte: input } }),
    maxPrice: (input) => ({ 'price.amount': { $lte: input } }),
}

export function applyFilters(filters) {
    const queries = Object.entries(filters).reduce((acc, [key, value]) => {
        if (key in mongoQueries) {
            acc.push(mongoQueries[key](value))
        }
        return acc;
    }, []);

    return queries;
}
