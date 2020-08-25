import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik'
import {
    TextField, FormControl, InputLabel,
    Button, Select, FormHelperText,
    MenuItem, Checkbox, FormControlLabel,
} from '@material-ui/core';

export const Submit = async (values, { resetForm }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    alert(JSON.stringify(values, null, 2));
    resetForm({});
}

const DefaultField = ({ fullWidth = true, autoComplete = "off", ...props }) => {
    return <Field fullWidth={fullWidth} autoComplete="off" {...props} />
}

export const SubmitButton = ({ disabled, text }) => {
    return <div className="pt-4 d-flex justify-content-center">
        <Button
            type="submit"
            disabled={disabled}
            size="large"
            disableElevation
            variant="contained"
            color="primary"
        >{text}</Button>
    </div>
}

export const FormikText = ({ name, type = "text", ...props }) => {
    return (
        <DefaultField
            as={TextField}
            type={type}
            name={name}
            autoComplete="off"
            helperText={<ErrorMessage name={name} />}
            {...props}
        />
    );
}

export const FormikChecbox = ({ ...props }) => {
    return (
        <Field as={FormControlLabel} control={<Checkbox />}{...props} />
    );
}

const MaterialUISelectField = ({ name, label, required, children, fullWidth, ...props }) => {
    return (
        <FormControl fullWidth={fullWidth}>
            <InputLabel required={required} >{label}</InputLabel>
            <Select name={name} {...props}>
                {children}
            </Select>
            <FormHelperText>
                <ErrorMessage name={name} />
            </FormHelperText>
        </FormControl>
    );
}

export const FormikSelect = ({ items, ...props }) => {
    return (
        <div className="formik-select">
            <DefaultField as={MaterialUISelectField}{...props}>
                {items.map(item => (
                    < MenuItem key={item.id} value={item.id} >{item.name}</MenuItem>
                ))}
            </DefaultField>
        </div >
    );
}

const IconThumbnail = ({ file, height = 200, width = 200, onClose }) => {
    return (
        <article className="p-2">
            <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="img-thumbnail mt-2"
                height={height}
                width={width} />
            <div className="d-flex justify-content-center">
                <Button
                    color="secondary"
                    size="small"
                    variant="contained"
                    onClick={onClose}>Delete</Button>
            </div>
        </article>
    );
}

const MaterialUIFileUpload = ({ icons, name, setFieldValue, multiple }) => {
    const [files, _setFiles] = useState([]);

    const handleChange = (event) => {
        const newFiles = [...event.currentTarget.files];

        if (newFiles.length > 0) {
            multiple ? setFiles(files.concat(newFiles)) : setFiles(newFiles);
        }
    }
    const setFiles = value => {
        setFieldValue(name, value);
        _setFiles(value);
    };

    const handleClose = index => {
        var newFiles = files;
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    return (
        <FormControl fullWidth >
            <div className="relative d-flex flex-wrap justify-content-center">
                {icons.length > 0 &&
                    icons.map((file, index) => {
                        return (
                            <IconThumbnail
                                key={index}
                                file={file}
                                onClose={() => handleClose(index)}
                            />
                        );
                    })
                }
            </div>
            <Button
                size="large"
                disableElevation
                variant="outlined"
                color="secondary"
                onClick={() => document.getElementById(name).click()}
            >
                Upload File
                <input multiple={multiple} id={name} className="d-none" type="file" onChange={handleChange} />
            </Button>
        </FormControl>
    );
}

export const FormikFileField = ({ label, required, ...props }) => {
    console.log(props.values)
    return (
        <div className="pt-2 d-block">
            <InputLabel className="py-2" required={required} disableAnimation={true} >{label}</InputLabel>
            <DefaultField as={MaterialUIFileUpload}{...props} />
            <ErrorMessage name={props.name} />
        </div>
    );
};
