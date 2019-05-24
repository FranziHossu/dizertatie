export const config = {
    server: {
        port: 6083
    },
    database: {
        url: 'mongodb://localhost/dizertatie'
    },
    mail: {
        service: 'Gmail',
        auth: {
            user: 'hossu.francesca@ubbcluj.ro',
            pass: 'habdichlieb8'
        },
        tls: {
            rejectUnauthorized: false
        }
    }
};
