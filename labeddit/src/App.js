import React, { useState } from "react";
import Router from "./routes";
import LanguageContext from "./contexts/LanguageContext";
import UserContext from "./contexts/UserContext";

const App = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language"));
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("labeddit"))
  );

  return (
    <LanguageContext.Provider value={[language || "pt", setLanguage]}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Router />
      </UserContext.Provider>
    </LanguageContext.Provider>
  );
};


export default App;
