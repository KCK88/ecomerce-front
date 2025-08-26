import {AlertCircle} from "lucide-react";

export default function NoOrders() {

  const randonPhrase = () => {
    const phraseNumber = Math.floor(Math.random() * 5) + 1;
    const phrases: Record<number, string> = {
      1: 'Nenhum livro no carrinho ainda. Vamos começar uma nova leitura?',
      2: 'Seu carrinho está em branco, como uma página esperando uma história!',
      3: 'Nada por aqui ainda... que tal explorar novos mundos literários?',
      4: 'Nenhum pedido por enquanto. Cada grande história começa com a escolha do primeiro livro.',
      5: 'Seu carrinho está vazio, mas sua próxima aventura pode estar a uma página de distância.'
    }
    return phrases[phraseNumber]
  }
  console.log(randonPhrase());
  return (
    <div className="flex justify-center items-center h-64">
      <div className="bg-blue-50 border border-blue-200 text-stone-800 px-4 py-3 rounded-lg max-w-md">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5"/>
          <h3 className="font-medium">Nenhum pedido encontrado</h3>
        </div>
        <p className="mt-2 text-sm">
          {randonPhrase()}
        </p>
      </div>
    </div>
  );
}
