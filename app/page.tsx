"use client";
import type { ContextStore } from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import React from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type OnChange = (
  value?: string,
  event?: React.ChangeEvent<HTMLTextAreaElement>,
  state?: ContextStore
) => void;

// Comando personalizado para imprimir o HTML
const printHTMLCommand = {
  name: "Print HTML",
  keyCommand: "printHtml",
  buttonProps: { "aria-label": "Print HTML" },
  icon: (
    <svg width="12" height="12" viewBox="0 0 20 20">
      <path fill="currentColor" d="M10 2v12h4l-5 5-5-5h4V2z" />
    </svg>
  ),
  execute: () => {
    const renderedHtml = document.querySelector(".wmde-markdown");
    if (renderedHtml) {
      console.log("HTML Gerado:", renderedHtml.innerHTML);
    } else {
      console.warn("Nenhum HTML foi encontrado!");
    }
  },
};

export default function Home() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  const { theme } = useTheme();

  const onChange = React.useCallback<OnChange>((val) => {
    setValue(val ?? "");
  }, []);

  return (
    <main className="w-auto mx-auto p-4">
      <MDEditor
        height={window.innerHeight - 200}
        value={value}
        onChange={onChange}
        data-color-mode={theme === "dark" ? "dark" : "light"}
        commands={[printHTMLCommand]} // Adiciona o comando no toolbar
      />
    </main>
  );
}
