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
        <DialogContent className="max-w-md p-0 overflow-hidden border-t-4 border-accent rounded-none">
          <DialogHeader className="px-6 pt-6 pb-2 text-center">
            <DialogTitle className="font-serif text-2xl uppercase tracking-wider text-primary">
              {t("contribute.dialog.title")}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {t("contribute.dialog.desc")}
            </DialogDescription>
          </DialogHeader>
          <div className="px-4 pb-6">
            <img
              src={qrImage}
              alt={t("contribute.dialog.imageAlt")}
              className="w-full h-auto block"
            />
          </div>
        </DialogContent>
      </Dialog>
    </ContributeDialogContext.Provider>
  );
}
