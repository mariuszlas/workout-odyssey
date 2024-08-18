// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['sequelize'],
        serverMinification: false,
    },
};

export default nextConfig;
