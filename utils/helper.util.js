const checkEnvVariable = (keyName, keyValue) => {
    if (!keyValue) {
        console.error(`[error]: The "${keyName}" environment variable is required`)
        process.exit(1)
    }
}

module.exports = { checkEnvVariable }