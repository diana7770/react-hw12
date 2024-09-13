import { Component } from "react";
import { nanoid } from "nanoid";
import ContactsList from "./components/ContactsList/ContactsList";
import Filter from "./components/Filter/Filter";
import ContactForm from "./components/ContactForm/ContactForm";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (evt) => {
    evt.preventDefault();

    const contactExists = this.state.contacts.some((contact) =>
      contact.name
        .toLowerCase()
        .includes(evt.target.elements.contactName.value.toLowerCase())
    );

    if (contactExists) {
      alert(`${evt.target.elements.contactName.value} is already in contacts.`);
      evt.target.reset();
      return;
    }

    this.setState((prevState) => ({
      contacts: prevState.contacts.concat({
        name: evt.target.elements.contactName.value,
        number: evt.target.elements.contactNumber.value,
        id: nanoid(),
      }),
    }));

    evt.target.reset();
  };

  deleteContact = (evt) => {
    const idContactToDelete = evt.target.getAttribute("data-id");
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== idContactToDelete
      ),
    }));
  };

  findContact = (evt) => {
    this.setState({
      filter: evt.target.value,
    });
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div className="mainBox">
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter findContact={this.findContact} />
        <ContactsList
          contacts={contacts}
          filter={filter}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
