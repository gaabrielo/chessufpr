import { XMarkIcon } from '@heroicons/react/24/solid';
import * as Dialog from '@radix-ui/react-dialog';

export function VictoryModal({ open, onClose, title, subtitle }) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      {/* <Dialog.Trigger asChild>
        <button className="Button violet">Edit profile</button>
      </Dialog.Trigger> */}
      {/* <Dialog.Portal> */}
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 z-10" />
      <Dialog.Content asChild>
        <div className="fixed text-left top-1/2 left-1/2 right-1/2 bottom-1/2 w-full h-fit rounded-3xl max-w-xs z-20 p-4 -translate-x-1/2 -translate-y-1/2 bg-zinc-800">
          <Dialog.Close asChild>
            <button className="absolute top-3 right-3" aria-label="Close">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </Dialog.Close>

          <Dialog.Title className="w-full flex justify-center">
            <img src="./trophy.svg" alt="Troféu" className="w-40" />
          </Dialog.Title>
          <Dialog.Description className="flex flex-col items-center">
            <span className="font-bold leading-5 text-sm">{subtitle}</span>
            <p>{title}</p>
          </Dialog.Description>

          <footer className="mt-4">
            <Dialog.Close asChild>
              <button className="bg-zinc-700 w-full transition-all text-white border-zinc-800 border-opacity-50 hover:border-opacity-50 border-b-4 px-2 py-2 hover:border-b-4 hover:border-b-zinc-800 hover:brightness-110 rounded-lg">
                Fechar
              </button>
            </Dialog.Close>
          </footer>
        </div>
      </Dialog.Content>
      {/* </Dialog.Portal> */}
    </Dialog.Root>
  );
}
