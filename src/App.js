import { useState } from 'react';
import './App.css';
import contactsJSON from './contacts.json';

function App() {
  const [contacts, setContacts] = useState(contactsJSON.slice(0, 5));

  const randomContact = () => {
    let min = 5;
    let max = contactsJSON.length;
    const index = Math.floor(Math.random() * (max - min)) + min;
    let toAdd = [contactsJSON[index]];
    setContacts(contacts.concat(toAdd));
    // console.log(contacts);
  };

  const sortByPopularity = () => {
    let sortedPopularity = [...contacts].sort(function (a, b) {
      if (a.popularity > b.popularity) {
        return -1;
      }
      if (a.popularity < b.popularity) {
        return 1;
      }
      return 0;
    });
    setContacts(sortedPopularity);
  };

  const sortByName = () => {
    let sortedName = [...contacts].sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    setContacts(sortedName);
  };

  const deleteContact = (contactId) => {
    const filteredContact = contacts.filter((contact) => {
      return contact.id !== contactId;
    });
    setContacts(filteredContact);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>

      <button onClick={() => randomContact()}>Add Random Contact</button>
      <button onClick={() => sortByPopularity()}>Sort by popularity</button>
      <button onClick={() => sortByName()}>Sort by name</button>

      {contacts.map((celebrity) => {
        return (
          <table>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Won an Oscar</th>
              <th>Won an Emmy</th>
              <th>Actions</th>
            </tr>
            <tr>
              <td>
                <img src={celebrity.pictureUrl} alt="celebs" width="70" />
              </td>
              <td>{celebrity.name}</td>
              <td>{Math.round(celebrity.popularity)}</td>
              <td>{celebrity.wonOscar && <p>🏆</p>}</td>
              <td>{celebrity.wonEmmy && <p>🏆</p>}</td>
              <button onClick={() => deleteContact(celebrity.id)}>
                Delete
              </button>
            </tr>
          </table>
        );
      })}
    </div>
  );
}

export default App;
