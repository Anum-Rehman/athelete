import React from 'react';
import FormButton from '../FormButton';
import FormDateInput from '../FormDateInput';
import FormTextInput from '../FormTextInput';
import styles from './index.module.scss';

export default function Summary({ data, handleSubmit, handleEdit }) {
    return (
        <div className={styles.profileSummary}>
            <fieldset>
                <legend>Basic Info</legend>
                <div className={styles.form} >
                    <FormTextInput
                        value={data.name}
                        label="Name"
                        className="form-input"
                        readOnly
                    />
                    <FormDateInput
                        value={data.dob}
                        label="Date of Birth"
                        className="form-input"
                        readOnly
                    />
                    <FormTextInput
                        value={data.gender}
                        label="Gender"
                        className="form-input"
                        readOnly
                    />
                    <FormTextInput
                        value={data.sports.join(", ")}
                        label="Sports"
                        className="form-input"
                        readOnly
                    />
                </div>
            </fieldset>

            <fieldset>
                <legend>About Info</legend>
                <div className={styles.form} >
                    <FormTextInput
                        value={data.description}
                        label="Description"
                        className="form-input"
                        readOnly
                        multiple
                    />
                    <FormTextInput
                        value={data.location}
                        label="Location"
                        className="form-input"
                        readOnly
                    />
                    <FormTextInput
                        value={data.interest}
                        label="Interests"
                        className="form-input"
                        readOnly
                    />
                    <FormTextInput
                        value={data.team}
                        label="Team"
                        className="form-input"
                        readOnly
                    />
                </div>
            </fieldset>
            <div className='form-buttons__container'>
                <FormButton onClick={handleSubmit} label="Submit" />
                <FormButton onClick={handleEdit} label="Back" />
            </div>
        </div>
    )
}