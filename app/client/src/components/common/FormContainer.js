import React, { PropTypes } from 'react';


class FormContainer extends React.Component {
    getFormData(obj) {
        const params = {
            ...this.state,
            ...obj
        }
        return {
            params
        };
    }
}

export default FormContainer;
