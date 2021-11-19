import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from "./Profile";
import Home from "./Home";
import SearchScreen from "./SearchScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/search" element={<SearchScreen />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
