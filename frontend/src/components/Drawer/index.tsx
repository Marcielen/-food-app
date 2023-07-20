import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "components/Button";

export type ItensHeaderProps = {
  title: string;
  path: string;
};

type DrawerProps = {
  label: string;
  children: React.ReactNode;
  handleSubmit: () => void;
  open: boolean;
  onClose: () => void;
};

export function Drawer({
  label,
  open,
  onClose,
  children,
  handleSubmit,
}: DrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[rgba(0,_0,_0,_0.2)] data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed right-0 top-[50%] z-50 h-screen w-full max-w-[500px] translate-y-[-50%] bg-white p-[20px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="text-[17px] font-medium">
            <span className="flex w-full text-2xl text-[#FF7426] font-bold border-b-2 pb-[10px] justify-start">
              {label}
            </span>
          </Dialog.Title>
          <div className="mt-3 h-[85%]">{children}</div>
          <div className="mt-3 h-full flex justify-center">
            <Dialog.Close asChild>
              <div className="w-[120px]">
                <Button
                  label="Cancel"
                  aria-label="Close"
                  className="text-gray-600 border-gray-400 border-2 h-[32px] pb-8  rounded-[12px] font-bold bg-white"
                />
              </div>
            </Dialog.Close>
            <div className="w-[120px]">
              <Button
                label="Confirm"
                onClick={handleSubmit}
                className=" rounded-[12px] font-bold h-[32px] ml-4 text-white pb-8 bg-green-500"
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
