import React, { useState } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { IntlProvider} from 'react-intl';
import UserList from './component/UserList';
import CreateUserForm from './component/CreateUser';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal'


const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <ApolloProvider client={client}>
      <IntlProvider >
        <div>
          <div>
            <button className="btn btn-sm btn-success mm-40" onClick={onOpenModal}>Add new User</button>
            <Modal open={open} onClose={onCloseModal} center>
              <h2>Create User</h2>
              <CreateUserForm />
            </Modal>
          </div>
          <UserList />
        </div>
      </IntlProvider>
    </ApolloProvider>
  );
}

export default App;