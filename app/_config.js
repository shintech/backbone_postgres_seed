const config = {}

config.domainName = 'dev.shintech.ninja',

config.development = {
  url: 'http://' + config.domainName + ':8000/'
}

config.production = {
  url: 'https://' + config.domainName + ':443/'
}

export default config
