import './App.css';
import UsersDataTable from './assets/table/UsersDataTable';
import ReactQueryProvider from './ReactQueryProvider';

function App() {
  return (
    <ReactQueryProvider>
      <UsersDataTable />
    </ReactQueryProvider>
  );
}

export default App;
