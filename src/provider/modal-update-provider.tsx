"use client"

import { ModalUpdateTodo } from "@/components/ui/modal-update";
import { useEffect, useState } from "react";

export const ModalUpdateProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ModalUpdateTodo />
    </>
  );
};
