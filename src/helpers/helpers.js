import axios from "axios";

export function getLocation() {
    return axios.get('https://ships.stechga.co.uk/', {
        timeout: 300,  // request will catch timeout error after this long
    })
}

export function getSplitTestVersion(versionSplits) {
    // versionSplits [{version: 'version1', split: 0.5}, {version: 'version2', split: 0.5}]
    const randomNumber = Math.random();

    let cumulativeSplit = 0;

    for (let i = 0; i < versionSplits.length; i++) {
        cumulativeSplit += versionSplits[i].split; // Add the current split percentage to the cumulative total

        if (randomNumber <= cumulativeSplit) {
            return versionSplits[i].version; // Return the version if the random number is within the current cumulative split
        }
    }

    return versionSplits[0].version; // just in case something fucks out
}

export function formatDateOrNull(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date)) {
            return null;
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    } catch (error) {
        return null;
    }
}

export function getPrePopData(context) {
    const data = [];

    let possibilities = [
        {'key': 'dob', 'value': ['dob', 'd_o_b', 'date_of_birth', 'd-o-b', 'date-of-birth']},
        {'key': 'age', 'value': ['age']},
        {'key': 'gender', 'value': ['gender', 'g']},
        {'key': 'firstName', 'value': ['firstName', 'first_name', 'firstname', 'fname', 'name', 'f_name']},
        {'key': 'lastName', 'value': ['lastName', 'last_name', 'lastname', 'lname', 'l_name']},
        {'key': 'email', 'value': ['email', 'email_address', 'email-address', 'e-mail']},
        {'key': 'city', 'value': ['city', 'address_city']},
        {'key': 'state', 'value': ['county']},
        {
            'key': 'zipcode',
            'value': ['zip', 'zip_code', 'zip_code', 'postcode', 'post_code', 'pcode', 'postal_code']
        },
        {'key': 'phone', 'value': ['phone', 'tel', 'mob', 'mobile', 'tell', 'telephone']},
    ];

    possibilities.forEach((possibility) => {
        const key = possibility.key;
        let value = null;
        possibility.value.forEach((key) => {
            if (value) {
                return;
            }
            if (context?.query[key]) {
                value = context?.query[key];
            }
        });
        if (key && value) {
            data[key] = value;
        }
    });

    if (data['dob']) {
        data['dob'] = formatDateOrNull(data['dob']);
        if (!data['dob']) {
            delete data['dob'];
        }
    }

    if (data['gender']) {
        if (['M', 'male', 'm'].includes(data['gender'])) {
            data['gender'] = 'male';
        } else if (['F', 'female', 'f'].includes(data['gender'])) {
            data['gender'] = 'female';
        } else {
            delete data['gender'];
        }
    }

    return data;
}
