export function filterProfiles(profiles) {
    if (Array.isArray(profiles)) {
        return profiles.map(({ owner, phone, email, ...rest }) => rest);
    }
    const { owner, phone, email, ...filteredProfile } = profiles;
    return filteredProfile;
}
