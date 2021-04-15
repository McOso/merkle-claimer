const withImages = require('next-images')

const isProduction = process.env.NODE_ENV === 'production'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = {
  future: {
    webpack5: true,
    strictPostcssConfiguration: true
  },
  inlineImageLimit: 48, // make it tiny so that it doesn't inline,
}

const allConfig = withBundleAnalyzer(
  withImages({
    ...nextConfig,
    webpack (config, options) {
      config.optimization.minimizer = []

      config.mode = isProduction ? 'production' : 'development'

      // var appVars = _.keys(process.env).filter((key) => key.startsWith('NEXT_JS_'))

      // config.plugins.push(new webpack.EnvironmentPlugin(_.pick(process.env, appVars)))

      return config
    }
  })
)

module.exports = allConfig