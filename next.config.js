/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack(config) {
        config.ignoreWarnings = [
            ...(config.ignoreWarnings || []),
            {
                module: /@opentelemetry\/instrumentation/,
                message: /Critical dependency: the request of a dependency is an expression/,
            },
        ];
        return config;
    },
    async redirects() {
        return [
            { source: '/new', destination: '/diagnose', permanent: false },
            { source: '/advisory', destination: '/blueprint', permanent: false },
            { source: '/experiments', destination: '/lab', permanent: false },
            { source: '/library', destination: '/memory', permanent: false },
            { source: '/kb', destination: '/physics', permanent: false },
            { source: '/kb/:path*', destination: '/physics/:path*', permanent: false },
        ];
    },
};

module.exports = nextConfig;
