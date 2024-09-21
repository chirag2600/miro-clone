"use client";

import { ReactNode } from "react";

import { Layer } from "@/types/canvas";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";

export function Room({
  id,
  children,
  fallback,
}: {
  id: string;
  children: ReactNode;
  fallback: NonNullable<ReactNode> | null;
}) {
  return (
    <LiveblocksProvider
      // publicApiKey={
      //   "pk_dev_LopcOnSw86RVTIVUNuNxFBpqr31EhM5-WURM3aUItSbq0FXLp2msS4RAPAbgDMuy"
      // }
      authEndpoint="/api/liveblocks-auth"
      throttle={16}
    >
      <RoomProvider
        initialStorage={{
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList([]),
        }}
        initialPresence={{
          cursor: null,
          selection: [],
          pencilDraft: null,
          penColor: null,
        }}
        id={id}
      >
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
