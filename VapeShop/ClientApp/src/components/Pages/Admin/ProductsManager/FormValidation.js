import * as Yup from 'yup';
import axios from 'axios'

export const MAX_FILE_SIZE = 10000000;

export const SUPPORTED_FORMATS = [
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/png'
];

export const IconSchema = (required) => {
    const schema = Yup.mixed()
        .test('fileSize', "File Size is too large!",
            icons => {
                if (icons == null) return true
                return Array.isArray(icons)
                    ? icons.every(icon => icon.size <= MAX_FILE_SIZE)
                    : icons.size <= MAX_FILE_SIZE
            })
        .test('fileType', "Unsupported File Format!",
            icons => {
                if (icons == null) return true
                return Array.isArray(icons)
                    ? icons.every(icon => SUPPORTED_FORMATS.includes(icon.type))
                    : SUPPORTED_FORMATS.includes(icons.type)
            });

    return required
        ? schema.test('fileCount', "An icon is required!",
            icons => icons != null && Array.isArray(icons) ? icons.length > 0 : true)
            .required("An icon is required!")
        : schema;
}

export const DataToFormData = (values) => {
    const formData = new FormData();

    for (let key in values) {
        if (Array.isArray(values[key])) {
            for (let elem of values[key]) {
                formData.append(key, elem);
            }
        } else {
            formData.append(key, values[key]);
        }
    }
    for (let [key, value] of formData.entries()) {
        console.log(key + ' ' + value);
    }
    return formData;
};

export const Exists = async (url, data) => {
    let result = await axios.post(url, DataToFormData(data));
    return result['data'];
}