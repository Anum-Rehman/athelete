import React from 'react';
import { Form, Formik } from 'formik';
import classNames from 'classnames';
import * as Yup from "yup";
import FormTextInput from '../FormTextInput';
import FormDateInput from '../FormDateInput';
import FormSelectInput from '../FormSelectInput';
import FormMultiSelect from '../FormMultiSelect';
import FormButton from "../FormButton";
import { Avatar } from '@mui/material';
import fetchJson from '../../lib/fetchJson';
import dayjs from 'dayjs';

const BasicInfoSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
    dob: Yup.string()
        .required('Required'),
    gender: Yup.string()
        .required('Required')
});


const BasicInfo = ({
    handleNextClick,
    data
}) => {

    const genders = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ];

    const uploadImage = async (e) => {
        // e.preventDefault();
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append('file', file);


        // try {
        //     fetchJson("/api/upload", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //             "Access-Control-Allow-Origin": "*",
        //         },
        //         file: formData,
        //     })
        //         .then((res) => {
        //             console.log({ res })
        //         })
        //         .catch((err) => {
        //             console.log({ err })
        //         });
        // } catch (error) {
        //     console.error("An unexpected error happened:", error);
        // }
    };

    return (
        <Formik
            initialValues={{
                name: data.name || '',
                dob: data.dob || dayjs(new Date()).format('MM/DD/YYYY'),
                gender: data.gender || '',
                image: '',
                sports: data.sports || []
            }}
            validationSchema={BasicInfoSchema}
            onSubmit={handleNextClick}
        >
            {
                ({ values, errors, touched, handleChange, setFieldValue, submitCount, isValid }) => {
                    return (
                        <Form className="form">
                            <div className='profile-image'>
                                <input
                                    type="file"
                                    onChange={uploadImage}
                                    id="upload"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="upload">
                                    <Avatar
                                        src="/img/placeholder.png"
                                        className='profile_image__avatar'
                                    />
                                </label>
                            </div>
                            <div>
                                <FormTextInput
                                    className={classNames("form-input", { "field-error": errors.name && touched.name })}
                                    name="name"
                                    label="Name"
                                    type='alpha'
                                    value={values.name || ''}
                                    onChange={handleChange}
                                    touched={touched.name}
                                    error={errors.name && touched.name ? errors.name
                                        : errors.message
                                            ? errors.message
                                            : ' '}
                                />
                                <FormSelectInput
                                    className={classNames("form-input", { "field-error": errors.gender && touched.gender })}
                                    name="gender"
                                    label="Gender"
                                    placeholder=""
                                    value={values.gender}
                                    onChange={e => setFieldValue('gender', e.target.value)}
                                    options={genders}
                                    touched={touched.gender}
                                    error={errors.gender && touched.gender ? errors.gender : ' '}
                                />
                                <FormDateInput
                                    className={classNames("form-input", { "field-error": errors.dob && touched.dob })}
                                    name="dob"
                                    label="Date of Birth"
                                    placeholder="mm/dd/yyyy"
                                    value={values.dob}
                                    onChange={e => setFieldValue('dob', e)}
                                    touched={touched.dob}
                                    error={errors.dob && touched.dob ? errors.dob : ' '}
                                />
                                <FormMultiSelect
                                    className={classNames("form-input", { "field-error": errors.options && touched.sports })}
                                    name="sports"
                                    label="Sport"
                                    value={values.sports}
                                    onChange={e => setFieldValue('sports', e.target.value)}
                                    touched={touched.sports}
                                    error={errors.sports && touched.sports ? errors.sports : ' '}
                                />
                            </div>
                            <FormButton
                                type="submit"
                                disabled={(submitCount > 0 && !isValid && !errors.message) || (!values.dob || !values.gender || !values.name ||
                                    !values.sports.length)}
                                label="Next"
                            />
                        </Form>
                    )
                }
            }
        </Formik>
    )
}

export default BasicInfo;