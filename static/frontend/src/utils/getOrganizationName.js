export function getOrganizationName(organizations, id) {
    let organization
    for (let i = 0; i < organizations.length; i++) {
        organization = organizations[i]
        for (let key in organization) {
            if (organization['nelementkey'] === id) {
                return organization['celementname']
            }
        }
    }
}