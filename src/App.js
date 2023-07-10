import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./context/auth";
import SinglePost from "./components/SinglePost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Navbar />
          <Routes>
            <Route exact forceRefresh={true} path="/" Component={Home} />
            <Route exact path="/login" Component={Login} />
            <Route exact path="/register" Component={Register} />
            <Route exact path="/posts/:postId" Component={SinglePost} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
