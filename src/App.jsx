import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

import styles from './app.module.scss';

class App extends Component {

  state = {
        contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
        ],
        filter: '',
  }
    
    componentDidMount() {
        const data = localStorage.getItem('contacts');
        const contacts = JSON.parse(data);

        if (contacts && contacts.length) {
            this.setState({
                contacts: contacts
            })
        }
    };

    componentDidUpdate(prevProps, prevState) {
        const { contacts } = this.state;

        if (prevState.contact !== contacts) {
            const contactsUpdate = JSON.stringify(contacts);
            localStorage.setItem('contacts', contactsUpdate);
        }
    };

    addContact = (data) => {

      const { contacts } = this.state;
      
      const duplicate = contacts.find(contact => contact.name === data.name);
          if (duplicate) {
              alert(`${data.name} is already in contacts.`);
              return;
          };


      this.setState(prevState => {
        const { contacts } = prevState;
        const { name, number } = data;
          const newContact = {
              name,
              number,
              id: nanoid()
          };

          return {
              contacts: [...contacts, newContact],
              name: '',
              number: '',
          };
        })
    };

    deleteContact = (id) => {
        this.setState(prevState => {
            const { contacts } = prevState;

            return {
                contacts: contacts.filter(contact => contact.id !== id)
            };
        })
    };

    changeFilter = ({ target }) => {
        this.setState({
            filter: target.value
        })
    };

    getFilteredContacts() {

        const { filter, contacts } = this.state;
        if (!filter) {
            return contacts;
        };

        const filterText = filter.toLowerCase();

        const filteredContacts = contacts.filter(({ name }) => {
            const result = name.toLowerCase().includes(filterText);

            return result;
        });

        return filteredContacts;
    };

    render() {
        const { filter } = this.state;
        const { addContact, deleteContact, changeFilter } = this;

        const contacts = this.getFilteredContacts();

        

        return (
          <div className={styles.container}>
            <h1>Phonebook</h1>
            <ContactForm onSubmit={addContact} />
            <h2>Contacts</h2>
            <Filter changeFilter={changeFilter} filter={filter}/>
            <ContactList contacts={contacts} deleteContact={deleteContact}/>
          </div>
        )
    }

};

export default App;