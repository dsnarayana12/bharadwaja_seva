import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageProvider";
import qrImage from "@assets/bss_qr_code_1777549546948.jpg";

interface ContributeDialogContextValue {
  open: () => void;
  close: () => void;
}

const ContributeDialogContext = createContext<ContributeDialogContextValue | null>(null);

export function useContributeDialog(): ContributeDialogContextValue {
  const ctx = useContext(ContributeDialogContext);
  if (!ctx) {
    throw new Error("useContributeDialog must be used within ContributeDialogProvider");
  }
  return ctx;
}

export function ContributeDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContributeDialogContext.Provider value={{ open, close }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="w-[calc(100vw-2rem)] max-w-sm sm:max-w-md max-h-[calc(100dvh-2rem)] p-0 gap-0 overflow-hidden border-t-4 border-accent rounded-none flex flex-col"
        >
          <DialogHeader className="px-6 pt-6 pb-3 text-center shrink-0 pr-12">
            <DialogTitle className="font-serif text-xl sm:text-2xl uppercase tracking-wider text-primary">
              {t("contribute.dialog.title")}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              {t("contribute.dialog.desc")}
            </DialogDescription>
          </DialogHeader>
          <div className="px-4 pb-6 flex-1 min-h-0 overflow-y-auto flex items-center justify-center">
            <img
              src={qrImage}
              alt={t("contribute.dialog.imageAlt")}
              className="max-w-full max-h-full w-auto h-auto object-contain block"
            />
          </div>
        </DialogContent>
      </Dialog>
    </ContributeDialogContext.Provider>
  );
}
