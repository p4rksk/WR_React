import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import MyRoutine from './components/user/MyRoutine';
import TeamRoutine from './components/team/TeamRoutine';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path="/"element={<Layout />}>
        <Route index element={<MyRoutine />} />
        <Route path="my/routines" element={<MyRoutine />} />
        <Route path="team/routines" element={<TeamRoutine />} />
      </Route>
    </Routes>
  );
}

export default App;
