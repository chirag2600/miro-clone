"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import Hint from "@/components/hint";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization(); // current organization
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return; // setActive can be undefined

    setActive({ organization: id });
  };

  return (
    <div className="aspect-square relative">
      <Hint
        label={name}
        side="right"
        align="start"
        alignOffset={18}
      >
        <Image
          src={imageUrl}
          alt={name}
          onClick={onClick}
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
          width={140}
          height={140}
        />
      </Hint>
    </div>
  );
};

export default Item;
