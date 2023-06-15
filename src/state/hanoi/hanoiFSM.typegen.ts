
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "deSelect": "SELECT";
"resetGameState": "RESET";
"resetGameStateLessOnePeg": "RESETLESSONEPEG";
"resetGameStatePlusOneDisk": "RESETPLUSONEDISK";
"saveMove": "SELECT";
"setSelectedPeg": "SELECT";
"undoMove": "UNDO";
"updateGameState": "";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "gameCompleteCheck": "";
        };
        eventsCausingServices: {
          
        };
        matchesStates: "diskSelection" | "diskSelection.awaitSelection" | "diskSelection.diskSelected" | "diskSelection.emptyPegSelected" | "diskSelection.immoveableDiskSelected" | "gameComplete" | "moveComplete" | "moveSelected" | "moveSelection" | "moveSelection.alreadySelected" | "moveSelection.awaitSelection" | "moveSelection.invalidMoveAttempt" | "moveSelection.moveSelected" | "movingDisk" | "reset" | "resetLessOnePeg" | "resetPlusOneDisk" | "start" | "undo" | { "diskSelection"?: "awaitSelection" | "diskSelected" | "emptyPegSelected" | "immoveableDiskSelected";
"moveSelection"?: "alreadySelected" | "awaitSelection" | "invalidMoveAttempt" | "moveSelected"; };
        tags: never;
      }
  