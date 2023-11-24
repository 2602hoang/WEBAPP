import './App.css';
import Login from './Gui/Login';
import Bills from './Gui/Bills';
import Home from './Gui/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRouteNoLogin from './routing/ProtectedRouteNoLogin';
import ProtectedRoute from './routing/ProtectedRoute';
import Tables from './Gui/Tables';
import Billaccepted from './Gui/Billaccepted';
import Blog from './Gui/Blog';
// import Thongtin from './Gui/thongtin';
// import Me from './Gui/me';
// import Thongtin from './Gui/thongtin';


// import Login from './auth/Login';

function App() {
  return (
    <div  >
     <BrowserRouter>
     <Routes>
        <Route path='/Login'element={
            <ProtectedRouteNoLogin>
              <Login/>
            </ProtectedRouteNoLogin>
          }  />
        <Route path='/' element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
          <Route path='/Tables'element={
            <ProtectedRoute>
              <Tables/>
            </ProtectedRoute>
          }/>
          <Route path='/Bills'element={
            <ProtectedRoute>
              <Bills/>
            </ProtectedRoute>
          }/>
          <Route path='/Billaccepted'element={
            <ProtectedRoute>
              <Billaccepted/>
            </ProtectedRoute>
          }/>
          <Route path='/Blog'element={
            <ProtectedRoute>
             <Blog/>
            </ProtectedRoute>
          }/>
          

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
