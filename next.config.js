import nextEnv from 'next-env';
const prod = process.env.NODE_ENV === 'production'


const withNextEnv = nextEnv();

export default withNextEnv({
    async redirects() {
        return [
            {
                source: '/list',
                destination: '/',
                permanent: true
            },
        ];
    },
    env: {
        ROOT_DIR: process.env.ROOT_DIR,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
    images: {
        domains: ['res.cloudinary.com', 'cdn.filestackcontent.com'],
        minimumCacheTTL: 60,
    },
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    }
});
