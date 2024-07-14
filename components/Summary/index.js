import React from 'react';
import FormButton from '../FormButton';
import FormTextInput from '../FormTextInput';
import styles from './index.module.scss';

export default function Summary({ data, handleSubmit, handleEdit }) {
    const basicInfo = [
        { label: "Name", value: data?.name },
        { label: "Date of Birth", value: data?.dob },
        { label: "Gender", value: data?.gender },
        { label: "Sports", value: data?.sports.join(", ") }
    ];

    const aboutInfo = [
        { label: "Description", value: data?.description },
        { label: "Location", value: data?.location },
        { label: "Interests", value: data?.interest },
        { label: "Team", value: data?.team }
    ]
    return (
        <div className={styles.profileSummary}>
            <fieldset>
                <legend>Basic Info</legend>
                <div className={styles.form} >
                    {basicInfo.map((field, index) => <FormTextInput
                        key={index}
                        value={field.value}
                        label={field.label}
                        className="form-input"
                        readOnly
                    />)}
                </div>
            </fieldset>

            <fieldset>
                <legend>About Info</legend>
                <div className={styles.form} >
                    {
                        aboutInfo.map((field, index) => <FormTextInput
                        key={index}
                        value={field.value}
                        label={field.label}
                        className="form-input"
                        readOnly
                        multiple={field.label === "Description"}
                    />)
                    }
                </div>
            </fieldset>
            <div className='form-buttons__container'>
                <FormButton onClick={handleSubmit} label="Submit" testId="formSubmit" />
                <FormButton onClick={() => handleEdit()} label="Back" />
            </div>
        </div>
    )
}