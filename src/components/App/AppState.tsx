import React, { createContext, useReducer } from "react";
import { ImageProps } from "./Image";

export interface ResultItem {
  url: string;
  source: string;
  title: string;
}

export interface Item {
  query: string;
  items: Array<ResultItem>;
}

export interface Played {
  query: string;
  time: number;
}

interface AppState {
  query: string;
  items: Array<ImageProps>;
  allItems: Array<Item>;
  playedItems: Array<Played>;
  timer: number;
  gameRunning: boolean;
  guessCorrect: boolean;
  currentIncorrectGuesses: Array<string>;
}

const initialState: AppState = {
  query: "",
  items: [],
  allItems: [],
  playedItems: [],
  timer: 0,
  gameRunning: false,
  guessCorrect: false,
  currentIncorrectGuesses: [],
};

export enum AppStateActionTypes {
  ADD_ITEM = "ADD_ITEM",
  ADD_INCORRECT_GUESS = "ADD_INCORRECT_GUESS",
  STOP_GAME = "STOP_GAME",
  START_GAME = "START_GAME",
  SET_TIMER = "SET_TIMER",
  VALIDATE_GUESS = "VALIDATE_GUESS",
  NEXT = "NEXT",
}

export type AppStateAction = {
  type: AppStateActionTypes;
  payload?: any;
};

export interface AppStateAndFunctions extends AppState {
  addItem: (payload: Played) => void;
  next: () => void;
  addIncorrectGuess: (payload: string) => void;
  validateGuess: (payload: string) => void;
  setTimer: (payload: number) => void;
  startGame: () => void;
  stopGame: () => void;
}

const AppStateContext = createContext<AppStateAndFunctions>({
  addItem(): void {
    return;
  },
  next(): void {
    return;
  },
  addIncorrectGuess(): void {
    return;
  },
  stopGame(): void {
    return;
  },
  startGame(): void {
    return;
  },
  setTimer(): void {
    return;
  },
  validateGuess(): void {
    return;
  },
  ...initialState,
});

export const AppStateReducer = (
  state: AppState,
  action: AppStateAction
): AppState => {
  switch (action.type) {
    case AppStateActionTypes.ADD_ITEM:
      if (action.payload) {
        const payload: Played = action.payload;
        const items = [...state.playedItems];
        items.push(payload);
        return {
          ...state,
          playedItems: items,
        };
      }
      break;
    case AppStateActionTypes.NEXT:
      const { allItems, playedItems } = state;
      const nextUnplayedItem = getNextUnplayedItem(allItems, playedItems);
      return {
        ...state,
        items: nextUnplayedItem.items,
        query: nextUnplayedItem.query,
        currentIncorrectGuesses: [],
        timer: 20,
        gameRunning: true,
        guessCorrect: false,
      };
    case AppStateActionTypes.ADD_INCORRECT_GUESS:
      if (action.payload) {
        const strings: Array<string> = [...state.currentIncorrectGuesses];
        strings.push(action.payload);
        return {
          ...state,
          currentIncorrectGuesses: strings,
        };
      }
      break;
    case AppStateActionTypes.VALIDATE_GUESS:
      if (action.payload) {
        if (action.payload === state.query) {
          const items = [...state.playedItems];
          items.push({ query: action.payload, time: state.timer });
          return {
            ...state,
            gameRunning: false,
            guessCorrect: true,
            playedItems: items,
          };
        } else {
          const strings: Array<string> = [...state.currentIncorrectGuesses];
          strings.push(action.payload);
          return {
            ...state,
            currentIncorrectGuesses: strings,
          };
        }
      }
      break;
    case AppStateActionTypes.START_GAME:
      return {
        ...state,
        gameRunning: true,
      };
    case AppStateActionTypes.SET_TIMER:
      if (action.payload) {
        return {
          ...state,
          timer: action.payload,
        };
      }
      break;
    case AppStateActionTypes.STOP_GAME:
      return {
        ...state,
        gameRunning: false,
      };
    default:
      return state;
  }
  return state;
};

const randomIntFromInterval = (min: number, max: number): number => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getNextUnplayedItem = (
  items: Array<Item>,
  playedItems: Array<Played>
): Item => {
  const indexToUse = randomIntFromInterval(1, items.length) - 1;
  const item = items[indexToUse];

  let playedBefore: Played | undefined = undefined;
  if (playedItems && playedItems.length > 0) {
    playedBefore = playedItems.find((value) => {
      return value.query === item.query;
    });
  }
  if (!playedBefore && item) {
    return item;
  } else {
    return getNextUnplayedItem(items, playedItems);
  }
};

interface Props {
  allItems: Array<Item>;
}

export const AppStateProvider: React.FC<Props> = ({ allItems, children }) => {
  const [state, dispatch] = useReducer(AppStateReducer, {
    allItems: allItems,
    query: "",
    items: [],
    playedItems: [],
    timer: 0,
    gameRunning: false,
    currentIncorrectGuesses: [],
    guessCorrect: false,
  });

  const addItem = (payload: Played) => {
    dispatch({ type: AppStateActionTypes.ADD_ITEM, payload });
  };

  const next = () => {
    dispatch({ type: AppStateActionTypes.NEXT });
  };

  const startGame = () => {
    dispatch({ type: AppStateActionTypes.START_GAME });
  };

  const stopGame = () => {
    dispatch({ type: AppStateActionTypes.STOP_GAME });
  };

  const addIncorrectGuess = (payload: string) => {
    dispatch({ type: AppStateActionTypes.ADD_INCORRECT_GUESS, payload });
  };

  const validateGuess = (payload: string) => {
    dispatch({ type: AppStateActionTypes.VALIDATE_GUESS, payload });
  };
  const setTimer = (payload: number) => {
    dispatch({ type: AppStateActionTypes.SET_TIMER, payload });
  };

  const contextValues: AppStateAndFunctions = {
    addItem,
    next,
    startGame,
    stopGame,
    setTimer,
    addIncorrectGuess,
    validateGuess,
    ...state,
  };

  return (
    <AppStateContext.Provider value={contextValues}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppStateState = (): AppStateAndFunctions => {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppStateState must be used within a AppStateProvider");
  }
  return context;
};
