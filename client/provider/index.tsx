import React from "react";
import { useContext } from "react";

export const RefectchContex = React.createContext<(() => void) | undefined>(
  undefined
);

export const useRefetch = () => {
  const refetch = useContext(RefectchContex);
  if (!refetch) {
    throw new Error("error");
  }
  return refetch;
};
