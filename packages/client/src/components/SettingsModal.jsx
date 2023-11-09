import * as Dialog from '@radix-ui/react-dialog';

export function SettingsModal({ open, onClose }) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      {/* <Dialog.Trigger asChild>
        <button className="Button violet">Edit profile</button>
      </Dialog.Trigger> */}
      {/* <Dialog.Portal> */}
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 z-10" />
      <Dialog.Content asChild>
        <div className="fixed text-left top-1/2 left-1/2 right-1/2 bottom-1/2 w-full h-fit rounded-3xl max-w-xs z-20 p-4 -translate-x-1/2 -translate-y-1/2 bg-zinc-800">
          <Dialog.Title className="w-full text-left text-lg">
            Olá, <strong>{localStorage.getItem('userName')}</strong>
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            <ul className="list-disc py-4 ml-6 flex flex-col gap-2">
              <li>
                Ao criar a sessão, você sempre joga com as peças brancas. O
                segundo jogador a se conectar joga com as pretas
              </li>
              <li>
                Os demais jogadores entram como espectadores em uma fila,
                assumindo o lugar do último perdedor
              </li>
            </ul>
          </Dialog.Description>

          <footer className="flex flex-col gap-2">
            {/* <button className="bg-orange-600 w-full hover:bg-orange-600/90 transition-all text-white font-semibold border-orange-700 border-b-4 px-2 py-2 hover:border-b-4 hover:border-b-orange-700 rounded-lg flex flex-col items-center leading-5">
              <span>Iniciar partida</span>
              <span className="font-normal">Aguardando jogadores...</span>
            </button> */}
            <Dialog.Close asChild>
              <button className="bg-zinc-700 w-full transition-all text-white border-zinc-800 border-opacity-50 hover:border-opacity-50 border-b-4 px-2 py-2 hover:border-b-4 hover:border-b-zinc-800 hover:brightness-110 rounded-lg">
                Fechar
              </button>
            </Dialog.Close>
          </footer>
        </div>

        {/* <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            fechar
          </button>
        </Dialog.Close> */}
      </Dialog.Content>
      {/* </Dialog.Portal> */}
    </Dialog.Root>
  );
}
