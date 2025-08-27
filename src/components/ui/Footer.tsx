import {Heart, Mail, Phone, MapPin} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white shadow-sm border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-800">Contato</h3>
            <div className="space-y-2 text-stone-600">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 text-stone-700 flex-shrink-0"/>
                <span>Av. dos Livros, 1993 - Centro, São Paulo - SP</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-stone-700"/>
                <span>(11) 91406-0208</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-stone-700"/>
                <span>livraria@pdcb.com</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-800">Informações</h3>
            <ul className="space-y-2 text-stone-600">
              <li><a href="#" className="hover:text-stone-800 transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-stone-800 transition-colors">Perguntas Frequentes</a></li>
              <li><a href="#" className="hover:text-stone-800 transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-stone-800 transition-colors">Termos de Uso</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-800">Newsletter</h3>
            <p className="text-stone-600">Cadastre-se para receber nossas promoções</p>
            <form className="flex flex-col space-y-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
              />
              <button
                type="submit"
                className="bg-stone-600 hover:bg-stone-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-stone-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} PDC Books. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-2 text-stone-600">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-500"/>
              <span>para leitores</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}