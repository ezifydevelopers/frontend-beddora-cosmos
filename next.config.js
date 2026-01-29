/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable to prevent double renders during development
  images: {
    domains: [],
  },
  // Performance optimizations
  swcMinify: true, // Use SWC for faster minification
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console logs in production
  },
  // Optimize bundle size - removed recharts from optimizePackageImports to avoid chunk loading issues
  experimental: {
    optimizePackageImports: ['@/design-system', '@/components'],
  },
  // Webpack optimizations
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      // Ensure proper chunk naming for dynamic imports
      config.output = {
        ...config.output,
        chunkFilename: dev ? '[name].js' : '[name].[contenthash].js',
      }
      
      // Only optimize chunks in production
      if (!dev) {
        config.optimization = {
          ...config.optimization,
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              default: false,
              vendors: false,
              // Separate chunk for recharts to avoid loading issues
              recharts: {
                name: 'recharts',
                test: /[\\/]node_modules[\\/](recharts|d3-.*)[\\/]/,
                priority: 30,
                chunks: 'all',
                enforce: true,
              },
              // Vendor chunk for other node_modules (excluding recharts)
              vendor: {
                name: 'vendor',
                test: (module) => {
                  // Match node_modules but exclude recharts and d3-*
                  const modulePath = module.resource || ''
                  return (
                    /[\\/]node_modules[\\/]/.test(modulePath) &&
                    !/[\\/]node_modules[\\/](recharts|d3-.*)[\\/]/.test(modulePath)
                  )
                },
                priority: 20,
                chunks: 'all',
              },
              // Common chunk for shared code
              common: {
                name: 'common',
                minChunks: 2,
                priority: 10,
                reuseExistingChunk: true,
              },
            },
          },
        }
      }
    }
    return config
  },
}

module.exports = nextConfig

