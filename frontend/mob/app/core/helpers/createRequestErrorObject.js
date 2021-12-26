import { capitalizeFirstLetter } from './format';

export const createRequestErrorObject = (params) => {
    let errors = {};
    params.map(data => {
        errors = { ...errors, ...{ [data["field"]]: capitalizeFirstLetter(data.message) } };
    });

    return errors;
}