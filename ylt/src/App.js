import "./App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import Home from "./pages"
import SignInPage from "./pages/SignIn"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={SignInPage} exact />
      </Switch>
    </Router>
  )
}

export default App
