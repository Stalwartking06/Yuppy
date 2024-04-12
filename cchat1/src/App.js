import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./component/Join/Join";
import Chat from "./component/Chat/Chat"


function App() {
  return (
     // Setting up the router
    <Router>
      {/* Defining routes */}
      <Routes>
      {/* Route for the home page */}
      <Route exact path="/" Component={Join} />
      {/* Route for the chat page */}
      <Route path="/chat" Component={Chat} />
      </Routes>
    </Router>

  );
}
export default App;
