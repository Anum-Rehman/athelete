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

    const inputFields = ['description', 'location', 'team', 'interest'];

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
                    return (
                        <Form className="form">
                            <div className="profile__form">
                                {
                                    inputFields.map((field, index) => <FormTextInput
                                        key={index}
                                        className={classNames("form-input", { "field-error": errors[field] && touched[field] })}
                                        name={field}
                                        label={field}
                                        type='text'
                                        testId={`${field}Field`}
                                        value={values[field] || ''}
                                        onChange={handleChange}
                                        touched={touched[field]}
                                        multiline={field === 'description'}
                                        error={errors[field] && touched[field] ? errors[field]
                                            : errors.message
                                                ? errors.message
                                                : ' '}
                                    />)
                                }
                            </div>
                            <div className='form-buttons__container'>
                                <FormButton
                                    type="submit"
                                    disabled={(submitCount > 0 && !isValid && !errors.message) || !values.team || !values.location || !values.description || !values.interest}
                                    label="Next"
                                    testId="btnSubmit"
                                />
                                <FormButton onClick={() => handleEdit(values)} label="Back" />
                            </div>
                        </Form>
                    )
                }
            }
        </Formik>
    )
}

export default About;