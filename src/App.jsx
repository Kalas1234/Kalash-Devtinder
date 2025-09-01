import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Body from './Components/Body';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Feed from './Components/Feed';
import Connections from './Components/Connections';
import Request from './Components/Request';
import appStore from '../utils/appStore';

function App() {
    return (
      <>
        <Provider store = {appStore}>
        <BrowserRouter>
            <Routes>
                {/* Parent route */}
                <Route path="/" element={<Body />}>
                 {/* Child routes */}
                      <Route path="/" element={<Feed />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path = "/connections" element = {<Connections />} />
                    <Route path = "/requests" element = {<Request />} />
                </Route>
            </Routes>
        </BrowserRouter>
        </Provider>
        </>
    );
}

export default App;
