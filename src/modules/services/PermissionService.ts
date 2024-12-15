/**
 * Checks if the user has at least one of the permissions in the first array
 * @param allowedPermissions - permissions the user needs to have
 * @param permissions - permissions the user has
 * @returns true if the user has at least one of the permissions in the first array
 */
export function hasPerm(allowedPermissions: string[], permissions: string[]): boolean {
    return allowedPermissions.some((perm) => permissions.includes(perm));
}
