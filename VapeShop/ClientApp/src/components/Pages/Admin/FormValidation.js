import * as Yup from 'yup';

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
            icons => icons != null && icons.every(icon => icon.size <= MAX_FILE_SIZE))
        .test('fileType', "Unsupported File Format!",
            icons => icons != null && icons.every(icon => SUPPORTED_FORMATS.includes(icon.type)))

    return required
        ? schema.test('fileCount', "An icon is required!", icons => icons.length > 0)
        : schema;
}