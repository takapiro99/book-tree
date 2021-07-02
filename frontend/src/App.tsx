import { BrowserRouter, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Mypage from "./pages/Mypage";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Top from "./pages/Top";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="mainBody">
          <Switch>
            <Route exact path="/" component={Top} />
            <Route exact path="/signin" component={SignIn} />
            {/* TODO: reviewsはnestさせて/reviews/newってする */}
            {/* <Route exact path="/reviews" component={SignIn} /> */}
            <Route path="/@:id" component={Mypage} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
