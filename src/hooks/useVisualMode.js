import { useState } from "react";

// state:
// store the history []
// arrays have intrinsic order
// stores the current "view" (mode)

// methods/ways to interact with state:
// add/forward/transition - add a new "view" to history
// back - remove a "view" from history

// mode = 'SHOW'
// history = ['EMPTY', 'CREATE', 'SAVING', 'SHOW']
// useVisualMode('EMPTY');

// transition('ERROR_SAVING', true); // replace, don't add
// ['EMPTY', 'CREATE', 'SAVING', 'ERROR_SAVING']
// ['EMPTY', 'CREATE']
// ['EMPTY', 'SAVING']



export function useVisualMode(initialMode) {
  const [history, setHistory] = useState([initialMode]);

  const transition = (newView, replace = false) => {
    if (replace) {
      // we want the history to stay the same length, just replace the last index
      return setHistory((prev) => {
        const copy = [
          ...prev.slice(0, prev.length - 1),
          newView
        ];

        return copy;
      });
    }

    // we want to add the new view to the history
    setHistory((prev) => {
      const copy = [...prev, newView];
      return copy;
    });
  };

  const back = () => {
    setHistory((prev) => {
      if (prev.length > 1) {
        const copy = prev.slice(0, prev.length - 1);
        return copy;
      }

      return prev;
    });
  };

  return {
    mode: history[history.length - 1],
    transition,
    back
  };
};