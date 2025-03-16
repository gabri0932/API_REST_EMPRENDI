export function filterProfiles(profiles) {
    if (Array.isArray(profiles)) {
        return profiles.map(({ owner, ...rest }) => rest);
    }
    const { owner, ...filteredProfile } = profiles;
    return filteredProfile;
}