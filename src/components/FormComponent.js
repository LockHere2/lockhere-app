import React from 'react';
import { Formik } from 'formik';

export default ({ formComponent, validationSchema, validate, initialValues, onSubmit }) => {
    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
            >
            {formComponent}
        </Formik>
    );
}