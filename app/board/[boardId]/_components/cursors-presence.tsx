"use client";

import { memo } from "react";

import { colorToCSS } from "@/lib/utils";
import {
  shallow,
  useOthersConnectionIds,
  useOthersMapped,
} from "@liveblocks/react/suspense";
import { Cursor } from "./cursor";
import Path from "./path";

const Cursors = () => {
  const ids = useOthersConnectionIds();
  return (
    <div>
      {ids.map((id) => (
        <Cursor key={id} connectionId={id} />
      ))}
    </div>
  );
};

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow
  );

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? colorToCSS(other.penColor) : "#000"}
            />
          );
        }

        return null;
      })}
    </>
  );
};

const CursorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});
export default CursorsPresence;

CursorsPresence.displayName = "CursorsPresence";
