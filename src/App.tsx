import './App.css';

import ReactQueryProvider from './ReactQueryProvider';
import UsersDataTable from './UsersDataTable';

function App() {
  return (
    <ReactQueryProvider>
      <UsersDataTable />
    </ReactQueryProvider>
  );
}

export default App;
