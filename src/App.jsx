import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './Components/Body';
import Login from './Components/Login';
import Profile from './Components/Profile';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Parent route */}
                <Route path="/" element={<Body />}>
                 {/* Child routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
