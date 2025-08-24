import { produce } from "immer";
import {
  SERVER_ERROR_CODE,
  SUCCESS_CODE,
  SUCCESS_CODE_CREATED,
  VALIDATION_CODE,
} from "./contants";

// Fonction de création de tableau
export const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

// Affichage du dialoge pour erreur.
export const emitServerErrorEvent = (code, redirectionUrl?) => {
  if (code != 200 || code != 201) {
    const event = new CustomEvent("ServeurError", {
      detail: {
        code: code,
        redirectionUrl: redirectionUrl,
      },
    });
    window.dispatchEvent(event);
  }
};

export const fetchSuccess = (status) => {
  return [SUCCESS_CODE, SUCCESS_CODE_CREATED].includes(status);
};
export const fetchValidationError = (status) => {
  return status == VALIDATION_CODE;
};
export const fetchServerError = (status) => {
  return status == SERVER_ERROR_CODE;
};

export function handleGenericChange<T>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  obj: {
    event?: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >;
    name?: string;
    value?: any;
    inputType?: string;
  }
) {
  let name = obj.name;
  let value = obj.value;

  if (obj.inputType === "switch") {
    // cas des switch (toggle booléen)
    name = obj.name!;
    value = !obj.value;
  } else if (obj.event) {
    // cas classique input, select, textarea
    name = obj.event.target.name;
    value = obj.event.target.value;
  }

  if (!name) return;

  const keys = name.replace(/\[(\d+)\]/g, ".$1").split(".");

  setState((prev) =>
    produce(prev, (draft: any) => {
      let current = draft;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
    })
  );
}
