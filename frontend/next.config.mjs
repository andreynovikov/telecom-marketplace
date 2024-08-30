/** @type {import('next').NextConfig} */

import path from 'path'
import { fileURLToPath } from 'url'

import pkg from '@next/env';
const { loadEnvConfig } = pkg;

loadEnvConfig(".")

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: process.env.MEDIA_PROTOCOL,
                hostname: process.env.MEDIA_HOSTNAME,
                port: process.env.MEDIA_PORT,
                pathname: '/media/**',
            },
        ],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    }
}

export default nextConfig;
