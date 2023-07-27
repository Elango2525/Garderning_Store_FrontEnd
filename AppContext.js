import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("Appcontext must be within appContextProvider!");
  }
  return context;
};

const AppContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (value) => {
    const oldFavourites = [...favourites];
    const newFavourites = oldFavourites.concat(value);
    setFavourites(newFavourites);
  };

  const removeFromFavourites = (id) => {
    const oldFavourites = [...favourites];
    const newFavourites = oldFavourites.filter((value) => value.id !== id);
    setFavourites(newFavourites);
  };

  return (
    <AppContext.Provider value={{ favourites, addToFavourites, removeFromFavourites }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
