export const config = {
    server: {
        port: 6083
    },
    database: {
        url: 'mongodb://localhost/dizertatie'
    },
    mail: {
        host: 'smtp.ubbcluj.ro',
        port: 26,
        auth: {
            user: 'hossu.francesca@ubbcluj.ro',
            pass: 'habdichlieb8'
        },
        tls: {
            rejectUnauthorized: false
        }
    }
};
