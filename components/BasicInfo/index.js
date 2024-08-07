/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import classNames from 'classnames';
import * as Yup from "yup";
import FormTextInput from '../FormTextInput';
import FormDateInput from '../FormDateInput';
import FormSelectInput from '../FormSelectInput';
import FormMultiSelect from '../FormMultiSelect';
import FormButton from "../FormButton";
import { Avatar } from '@mui/material';
import dayjs from 'dayjs';
const cloudinary = require('cloudinary/lib/cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


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
    const [imageUrl, setImageUrl] = useState('');

    const genders = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ];

    const uploadImage = async (e, setFieldValue) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');


        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dw1xlf0tq/image/upload',
            {
                method: 'POST',
                body: formData,
            }
        );
        const data = await res.json();
        setFieldValue('image', data.secure_url)
    };

    return (
        <Formik
            initialValues={{
                name: data.name || '',
                dob: data.dob || dayjs(new Date()).format('MM/DD/YYYY'),
                gender: data.gender || '',
                image: data.image || '',
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
                                    onChange={(e) => uploadImage(e, setFieldValue)}
                                    id="upload"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="upload">
                                    <Avatar
                                        src={values.image || "/img/placeholder.png"}
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
                                    testId="nameField"
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
                                    testId="genderField"
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
                                    testId="dobField"
                                />
                                <FormMultiSelect
                                    className={classNames("form-input", { "field-error": errors.options && touched.sports })}
                                    name="sports"
                                    label="Sport"
                                    value={values.sports}
                                    onChange={e => setFieldValue('sports', e.target.value)}
                                    touched={touched.sports}
                                    error={errors.sports && touched.sports ? errors.sports : ' '}
                                    testId="sportsField"
                                />
                            </div>
                            <FormButton
                                type="submit"
                                disabled={(submitCount > 0 && !isValid && !errors.message) || (!values.dob || !values.gender || !values.name ||
                                    !values.sports.length)}
                                label="Next"
                                testId="btnNext"
                            />
                        </Form>
                    )
                }
            }
        </Formik>
    )
}

export default BasicInfo;