import React from "react";
import Mypage from "./pages/Mypage";
import {AuthProvider} from "./lib/AuthProvider";

function App() {

  return (
    <AuthProvider>
      <div className="App">
        <Mypage />
      </div>
    </AuthProvider>
    
  );
}

export default App;
