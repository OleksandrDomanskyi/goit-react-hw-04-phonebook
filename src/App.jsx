import { useState, useEffect, useRef, useCallback } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

import styles from './app.module.scss';

const App = () => {

    const [contacts, setContacts] = useState([
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]);

    const [filter, setFilter] = useState('');

    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            const data = localStorage.getItem('contacts');
            const contacts = JSON.parse(data);
            if (data?.length) {
                setContacts(contacts);
            };
            firstRender.current = false;
        };
    }, []);

    useEffect(() => {
        if (!firstRender.current) {
            localStorage.setItem('contacts', JSON.stringify(contacts));
        }
    }, [contacts]);

    const addContact = (data) => {
        const duplicate = contacts.find(contact => contact.name === data.name);
        if (duplicate) {
            alert(`${data.name} is already in contacts.`);
            return;
        };

        setContacts(prevContacts => {
            const { name, number } = data;
            const newContact = {
                name,
                number,
                id: nanoid()
            };

            return [...prevContacts, newContact];
        });
    };

    const deleteContact = useCallback((id) => {
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
    }, [setContacts]);

    const changeFilter = useCallback(({ target }) => setFilter(target.value), [setFilter]);

    const getFilteredContacts = () => {

        if (!filter) {
            return contacts;
        };
        const filterText = filter.toLowerCase();
        const filteredContacts = contacts.filter(({ name }) => name.toLowerCase().includes(filterText));
        return filteredContacts;
    };

    const filteredContacts = getFilteredContacts();

    return (
        <div className={styles.container}>
            <h1>Phonebook</h1>
            <ContactForm onSubmit={addContact} />
            <h2>Contacts</h2>
            <Filter changeFilter={changeFilter} filter={filter} />
            <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
        </div>
    );
};

export default App;