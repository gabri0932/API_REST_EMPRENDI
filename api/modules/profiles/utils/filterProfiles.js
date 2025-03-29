export function filterProfiles(data) {
    if (Array.isArray(data)) {
        return data.map(({ owner, phone, email, ...rest }) => rest);
    }
    const { owner, phone, email, ...filteredProfile } = data;
    return filteredProfile;
}
