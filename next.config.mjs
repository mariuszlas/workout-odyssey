// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['sequelize', 'mysql2'],
        serverMinification: false,
    },
};

export default nextConfig;
