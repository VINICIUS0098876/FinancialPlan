// src/components/ui/Modal.tsx
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Button } from "./button"; // Ajuste o caminho se necessário

export type ModalConfig = {
  isOpen: boolean;
  type: 'success' | 'error' | 'confirm';
  title: string;
  message: string;
  confirmText?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export default function CustomModal({ modal }: { modal: ModalConfig }) {
  if (!modal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200 relative">
        <div className="flex items-center gap-4 mb-3">
          {modal.type === 'success' && <CheckCircle2 className="text-emerald-500 w-8 h-8" />}
          {modal.type === 'error' && <XCircle className="text-red-500 w-8 h-8" />}
          {modal.type === 'confirm' && <AlertCircle className="text-amber-500 w-8 h-8" />}
          <h3 className="text-xl font-bold text-slate-800">{modal.title}</h3>
        </div>

        <p className="text-slate-600 mb-8 leading-relaxed ml-12">{modal.message}</p>

        <div className="flex justify-end gap-3">
          {modal.type === 'confirm' ? (
            <>
              <Button onClick={modal.onClose} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold h-11 px-6">
                Cancelar
              </Button>
              <Button onClick={modal.onConfirm} className="bg-red-500 hover:bg-red-600 text-white font-semibold h-11 px-6 shadow-md shadow-red-500/20">
                {modal.confirmText || "Confirmar"}
              </Button>
            </>
          ) : (
            <Button onClick={modal.onClose} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11 px-8 shadow-md shadow-emerald-600/20">
              OK, entendi
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}