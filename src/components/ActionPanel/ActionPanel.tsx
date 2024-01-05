"use client";

import React from "react";
import * as Icon from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useRouter } from "next/navigation";

interface Preferences {
  buttonPrimary?: {
    render?: boolean;
    icon?: keyof typeof Icon | undefined;
    route?: string;
  };
  buttonSecondary?: {
    render?: boolean;
    text?: string;
    route?: string;
  };
  buttonBack?: {
    render?: boolean;
    route?: string;
  };
  viewKeaworks?: boolean;
}

interface Keawork {
  text?: string;
}

interface Props {
  preferences?: Preferences;
  keaworks?: [Keawork?, Keawork?, Keawork?];
  title?: string;
  description?: string;
}

export function ActionPanel({
  title = "Title",
  description = "Description: Lorem ipsum dolor sit...",
  keaworks = [
    { text: "Texto dentro del límite" },
    { text: "Otro texto más largo que excede el límite de caracteres" },
    { text: "Badge" },
  ],
  preferences: {
    buttonBack: {
      render: renderButtonBack = false,
      route: routeButtonBack = "/",
    } = {},
    buttonPrimary: {
      render: renderButtonPrimary = false,
      icon: iconButtonPrimary = undefined,
      route: routeButtonPrimary = "/",
    } = {},
    buttonSecondary: {
      render: renderButtonSecondary = false,
      route: routeButtonSecondary = "/",
      text: textButtonSecondary = "Button Secondary",
    } = {},
    viewKeaworks = false,
  } = {},
}: Props) {
  const { push } = useRouter();
  const IconComponent = iconButtonPrimary && (Icon[iconButtonPrimary] as any);
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[730px] flex flex-col">
        <div className="w-full h-[40px] px-3 flex items-center justify-between">
          {renderButtonBack ? (
            <button
              onClick={() => {
                push(routeButtonBack);
              }}
              className="h-[40px] rounded-md pr-3 text-sm flex items-center gap-1 text-neutral-500"
            >
              <Icon.ArrowLeft size={15} />
              Back
            </button>
          ) : (
            <div />
          )}
          {renderButtonPrimary && (
            <button
              onClick={() => {
                push(routeButtonPrimary);
              }}
              className="h-[40px] w-[40px] rounded-md flex items-center justify-center"
            >
              {IconComponent && <IconComponent size={20} />}
            </button>
          )}
        </div>
        <div className="w-full h-[70px] px-3 flex flex-col justify-center">
          <h1 className="text-3xl whitespace-nowrap font-bold w-full text-ellipsis overflow-hidden">
            {title}
          </h1>
          <p className="text-neutral-500 whitespace-nowrap w-full text-ellipsis overflow-hidden text-base">
            {description}
          </p>
        </div>
        <div className="flex justify-between px-3 h-[50px] items-center gap-3">
          <ScrollArea>
            <div className="flex gap-1 h-[50px] items-center pr-3">
              {viewKeaworks &&
                keaworks &&
                keaworks.map((k, i) => {
                  return (
                    <Badge
                      className="whitespace-nowrap overflow-hidden text-ellipsis"
                      variant="secondary"
                      key={i}
                    >
                      {k?.text}
                    </Badge>
                  );
                })}
            </div>
            <ScrollBar orientation="horizontal"></ScrollBar>
          </ScrollArea>
          {renderButtonSecondary && (
            <Button
              onClick={() => {
                push(routeButtonSecondary);
              }}
            >
              {textButtonSecondary}
            </Button>
          )}
        </div>
        <Separator className="my-3" />
      </div>
    </div>
  );
}
