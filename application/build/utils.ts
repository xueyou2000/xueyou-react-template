const { npm_package_version } = process.env

export const VERSION = `${npm_package_version}`
export const VERSION_TIME = `${npm_package_version}@${Date.now()}`
