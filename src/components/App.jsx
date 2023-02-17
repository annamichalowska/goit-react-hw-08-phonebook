import React, { useState, useEffect } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const normalizationName = name.toLowerCase();

    const alreadyInContacts = contacts.some(
      ({ name }) => name.toLocaleLowerCase() === normalizationName
    );
    if (alreadyInContacts) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      name: name,
      number: number,
      id: nanoid(),
    };

    setContacts([...contacts, newContact]);
  };

  const getContacts = () => {
    const normalizationFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizationFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  useEffect(() => {
    const list = localStorage.getItem('contacts-list');
    if (!list) return;

    try {
      setContacts(JSON.parse(list));
    } catch (evt) {
      console.error(evt);
    }
  }, []);

  useEffect(() => {
    const contactsListStringified = JSON.stringify(contacts);
    localStorage.setItem('contacts-list', contactsListStringified);
  }, [contacts]);

  return (
    <div className={css.box}>
      <h2 className={css.title}>Phonebook</h2>
      <ContactForm onSubmit={addContact} />
      <h2 className={css.title}>Contacts</h2>
      {contacts.length > 0 ? (
        <>
          <Filter
            value={filter}
            onChange={evt => setFilter(evt.currentTarget.value)}
          />
          <ContactList contacts={getContacts()} deleteContact={deleteContact} />
        </>
      ) : (
        <h2 className={css['empty-list']}>Contact list is empty</h2>
      )}
    </div>
  );
};

export default App;
