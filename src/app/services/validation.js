const _apply_to_all = (arr, ...func_arr) => {
    for (const obj of arr) {
        for (const func of func_arr) {
            if (!func(obj)) {
                return false;
            }
        }
    }
    return true;
};

export const isNotEmpty = (...strings) => _apply_to_all(strings, str => !!str);


export const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const isValidEmail = (...strings) => isNotEmpty(strings) && _apply_to_all(strings, emailRegex.test.bind(emailRegex));

export const passRegex = /(((?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\\$%\\^&\\+=]))|((?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\+=]))|((?=.*[0-9])(?=.*[A-Z])(?=.*[!@#\\$%\\^&\\+=]))).{8,30}/;
export const isValidPass = (...strings) => isNotEmpty(strings) && _apply_to_all(strings, isNotEmpty, passRegex.test.bind(passRegex));

export const zipCodeRegex = /[0-9]{5}/;
export const isValidZipCode = (...strings) => _apply_to_all(strings, zipCodeRegex.test.bind(zipCodeRegex));
