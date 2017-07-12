const config = {}

config.development = {
  url: 'https://dev.' + (window.location.hostname) + '/'
}

config.production = {
  url: 'https://' + (window.location.hostname) + '/'
}

export default config
