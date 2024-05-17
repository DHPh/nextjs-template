/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.node$/,
            use: "file-loader",
        });

        return config;
    },
    images: {
        domains: ["localhost"],
    },
    reactStrictMode: false,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    output: "standalone",
};

module.exports = nextConfig;
