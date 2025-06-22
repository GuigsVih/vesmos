import { capitalizeFirstLetter } from './format';

export const createRequestErrorObject = (params) => {
    let errors = {};
    params.length > 0 && params.map(data => {
        errors = { ...errors, ...{ [data["field"]]: capitalizeFirstLetter(data.message) } };
    });

    return errors;
}