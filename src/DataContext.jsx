import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [analysisData, setAnalysisData] = useState(null);  // this will hold live API data

  return (
    <DataContext.Provider value={{ analysisData, setAnalysisData }}>
      {children}
    </DataContext.Provider>
  );
};
