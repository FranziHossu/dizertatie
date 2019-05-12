
const myEmails = [
    'andreea@gmail.com',
    'bianca@gmail.com',
    'ionut@gmail.com',
    'diana@gmail.com',
    'mihai@gmail.com',
    'lorena@gmail.com',
    'francesca@gmail.com',
    'ionel@gmail.com',
    'florin@gmail.com',
    'flavia@gmail.com',
]
/** Run */
cleanAndRepopulate();


/** Populate the database */
function cleanAndRepopulate() {
    clean();
    populate();
}

function populate() {
    addEmails();
}

function clean() {
    removeEmails();
}

/**
 *  Remove all the logs from the database 
 */
function removeEmails() {
    print('Clean Emails...');
    try {
        db.emails.remove({});
    } catch (error) {
        print('Error at removing all emails: ', error);
    }
    print('Completed!');
}


/**
 *  Add emails to the database for development
 */
function addEmails() {
    print('Insert Emails..');

    let emails = new Array();
    for (i = 1; i <= 1000; i++) {
        let email = Object();
        email.date = 'username' + i;
        email.to = myEmails[Math.floor((Math.random() * 10))];
        email.from = myEmails[Math.floor((Math.random() * 10))];

        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var j = 0; j < 10; j++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        email.subject = result;

        let value = Math.floor((Math.random() * 2));
        if (value) {
            email.doc = true;
        } else {
            email.doc = false;
        }

        email.date = randomDate(new Date(2019, 0, 1), new Date(2019,11,31));
        emails.push(email);
    }

    try {
        db.emails.insertMany(emails);
    } catch (error) {
        print('Error at inserting the emails: ', error);
    }
    print('Emails successfully added!');
}


function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}