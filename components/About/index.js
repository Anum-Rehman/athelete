import React from 'react';
import { Form, Formik } from 'formik';
import classNames from 'classnames';
import * as Yup from 'yup';
import FormTextInput from '../FormTextInput';
import FormButton from '../FormButton';

const AboutSchema = Yup.object().shape({
    description: Yup.string()
        .min(4).max(250),
    team: Yup.string().required("Required"),
    location: Yup.string().required("Required")
});
const About = ({
    handleNextClick,
    data,
    handleEdit
}) => {

    return (
        <Formik
            initialValues={{
                description: data.description || '',
                location: data.location || '',
                team: data.team || '',
                interest: data.interest || ''
            }}
            validationSchema={AboutSchema}
            onSubmit={handleNextClick}
        >
            {
                ({ values, errors, touched, handleChange, submitCount, isValid }) => {
                    console.log({errors, values})
                    return (
                        <Form className="form">
                            <div className="profile__form">
                                <FormTextInput
                                    className={classNames("form-input", { "field-error": errors.description && touched.description })}
                                    name="description"
                                    label="Description"
                                    type='text'
                                    value={values.description || ''}
                                    onChange={handleChange}
                                    touched={touched.description}
                                    multiline
                                    error={errors.description && touched.description ? errors.description
                                        : errors.message
                                            ? errors.message
                                            : ' '}
                                />
                                <FormTextInput
                                    className={classNames("form-input", { "field-error": errors.location && touched.location })}
                                    name="location"
                                    label="Location"
                                    type='text'
                                    value={values.location || ''}
                                    onChange={handleChange}
                                    touched={touched.location}
                                    error={errors.location && touched.location ? errors.location
                                        : errors.message
                                            ? errors.message
                                            : ' '}
                                />
                                <FormTextInput
                                    className={classNames("form-input", { "field-error": errors.team && touched.team })}
                                    name="team"
                                    label="team"
                                    type='text'
                                    value={values.team || ''}
                                    onChange={handleChange}
                                    touched={touched.team}
                                    error={errors.team && touched.team ? errors.team
                                        : errors.message
                                            ? errors.message
                                            : ' '}
                                />
                                <FormTextInput
                                    className={classNames("form-input", { "field-error": errors.interest && touched.interest })}
                                    name="interest"
                                    label="interest"
                                    type='text'
                                    value={values.interest || ''}
                                    onChange={handleChange}
                                    touched={touched.interest}
                                    error={errors.interest && touched.interest ? errors.interest
                                        : errors.message
                                            ? errors.message
                                            : ' '}
                                />
                            </div>
                            <div className='form-buttons__container'>
                            <FormButton
                                type="submit"
                                disabled={(submitCount > 0 && !isValid && !errors.message) || !values.team || !values.location || !values.description || !values.interest}
                                label="Next"
                            />
                            <FormButton onClick={handleEdit} label="Back" />
                            </div>
                        </Form>
                    )
                }
            }
        </Formik>
    )
}

export default About;