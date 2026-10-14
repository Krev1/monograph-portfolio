export const projectIds = ["001", "002", "003"] as const;
export type ProjectId = (typeof projectIds)[number];
export type DriverState =
  | "idle"
  | "opening"
  | "open"
  | "cardDragging"
  | "inserting"
  | "loaded"
  | "closing"
  | "transforming"
  | "active"
  | "reopening"
  | "ejecting";

export type DriverModel = {
  state: DriverState;
  cardId: ProjectId | null;
  draggingId: ProjectId | null;
  openness: number;
  settling: boolean;
  origin: "idle" | "active" | "loaded" | "open" | null;
  run: number;
};

export type DriverEvent =
  | { type: "HANDLE_START" | "HANDLE_KEY" }
  | { type: "HANDLE_MOVE"; openness: number }
  | { type: "HANDLE_RELEASE"; committed: boolean }
  | { type: "HANDLE_CANCEL" }
  | { type: "CARD_START" | "INSERT_KEY"; cardId: string }
  | { type: "CARD_DROP"; valid: boolean }
  | { type: "CARD_CANCEL" }
  | { type: "EJECT_START" | "EJECT_KEY" | "EJECT_CANCEL" }
  | { type: "EJECT_RELEASE"; committed: boolean }
  | { type: "COMPLETE"; run: number; state: DriverState };

export const initialDriver: DriverModel = {
  state: "idle",
  cardId: null,
  draggingId: null,
  openness: 0,
  settling: false,
  origin: null,
  run: 0,
};
export const clamp = (value: number) =>
  Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
const knownCard = (id: string): id is ProjectId =>
  projectIds.some((card) => card === id);
const movingHandle = (state: DriverState) =>
  ["opening", "reopening", "closing"].includes(state);

function restoreHandle(model: DriverModel): DriverModel {
  if (!model.origin) return model;
  return {
    ...model,
    state: model.origin,
    openness: model.origin === "loaded" || model.origin === "open" ? 1 : 0,
    origin: null,
    settling: false,
  };
}

export function driverReducer(
  model: DriverModel,
  event: DriverEvent,
): DriverModel {
  switch (event.type) {
    case "HANDLE_START":
    case "HANDLE_KEY": {
      if (!["idle", "active", "loaded", "open"].includes(model.state))
        return model;
      const origin = model.state as "idle" | "active" | "loaded" | "open";
      const state =
        origin === "idle"
          ? "opening"
          : origin === "active"
            ? "reopening"
            : "closing";
      const settling = event.type === "HANDLE_KEY";
      return {
        ...model,
        state,
        origin,
        settling,
        openness: settling ? (state === "closing" ? 0 : 1) : model.openness,
        run: model.run + 1,
      };
    }
    case "HANDLE_MOVE":
      return movingHandle(model.state) && !model.settling
        ? { ...model, openness: clamp(event.openness) }
        : model;
    case "HANDLE_CANCEL":
      return movingHandle(model.state) && !model.settling
        ? restoreHandle(model)
        : model;
    case "HANDLE_RELEASE":
      if (!movingHandle(model.state) || model.settling) return model;
      return event.committed
        ? {
            ...model,
            openness: model.state === "closing" ? 0 : 1,
            settling: true,
            run: model.run + 1,
          }
        : restoreHandle(model);
    case "CARD_START":
    case "INSERT_KEY":
      if (model.state !== "open" || model.cardId || !knownCard(event.cardId))
        return model;
      return event.type === "CARD_START"
        ? { ...model, state: "cardDragging", draggingId: event.cardId }
        : {
            ...model,
            state: "inserting",
            cardId: event.cardId,
            run: model.run + 1,
            settling: true,
          };
    case "CARD_CANCEL":
      return model.state === "cardDragging"
        ? { ...model, state: "open", draggingId: null }
        : model;
    case "CARD_DROP":
      if (model.state !== "cardDragging" || !model.draggingId) return model;
      return event.valid
        ? {
            ...model,
            state: "inserting",
            cardId: model.draggingId,
            draggingId: null,
            settling: true,
            run: model.run + 1,
          }
        : { ...model, state: "open", draggingId: null };
    case "EJECT_START":
    case "EJECT_KEY":
      if (model.state !== "loaded" || !model.cardId) return model;
      return {
        ...model,
        state: "ejecting",
        settling: event.type === "EJECT_KEY",
        run: model.run + 1,
      };
    case "EJECT_CANCEL":
      return model.state === "ejecting" && !model.settling
        ? { ...model, state: "loaded" }
        : model;
    case "EJECT_RELEASE":
      if (model.state !== "ejecting" || model.settling) return model;
      return event.committed
        ? { ...model, settling: true, run: model.run + 1 }
        : { ...model, state: "loaded", settling: false };
    case "COMPLETE": {
      if (event.run !== model.run || event.state !== model.state) return model;
      if (model.state === "transforming" && model.cardId)
        return { ...model, state: "active" };
      if (!model.settling) return model;
      switch (model.state) {
        case "opening":
          return { ...model, state: "open", origin: null, settling: false };
        case "reopening":
          return { ...model, state: "loaded", origin: null, settling: false };
        case "closing":
          return model.cardId
            ? {
                ...model,
                state: "transforming",
                origin: null,
                settling: false,
                run: model.run + 1,
              }
            : {
                ...model,
                state: "idle",
                openness: 0,
                origin: null,
                settling: false,
              };
        case "inserting":
          return { ...model, state: "loaded", settling: false };
        case "ejecting":
          return { ...model, state: "open", cardId: null, settling: false };
        default:
          return model;
      }
    }
  }
}

export function driverInvariants(model: DriverModel): boolean {
  const requiresCard = [
    "inserting",
    "loaded",
    "transforming",
    "active",
    "reopening",
    "ejecting",
  ].includes(model.state);
  const empty = ["idle", "opening", "open", "cardDragging"].includes(
    model.state,
  );
  return (
    (!requiresCard || model.cardId !== null) &&
    (!empty || model.cardId === null) &&
    (model.state !== "closing" ||
      (model.origin === "open" && model.cardId === null) ||
      (model.origin === "loaded" && model.cardId !== null)) &&
    (model.state !== "cardDragging" || model.draggingId !== null) &&
    (model.state === "cardDragging" || model.draggingId === null) &&
    model.openness >= 0 &&
    model.openness <= 1
  );
}
