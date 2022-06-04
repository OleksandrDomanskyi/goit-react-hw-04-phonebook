import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './contact-form.module.scss';

class ContactForm extends Component {

    state = {
        name: '',
        number: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({
            name: '',
            number: '',
        })
    };

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({
            [name]: value
        })
    };

    render() {
        const { name, number } = this.state;
        const { handleSubmit, handleChange } = this;

        return (
            <div className={styles.container}>
                <form action="" onSubmit={handleSubmit}>
                    <div className={styles.formContainer}>
                        <label className={styles.label} htmlFor="">Name</label>
                        <input
                        value={name}
                        type="text"
                        onChange={handleChange}
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        />
                    </div>
                    <div className={styles.formContainer}>
                        <label className={styles.label} htmlFor="">Number</label>
                        <input
                            value={number}
                            type="tel"
                            onChange={handleChange}
                            name="number"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                        />
                    </div>
                    <button className={styles.btn} type='submit'>Add contact</button>
                </form>
            </div>
        )
    }

};

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default ContactForm;