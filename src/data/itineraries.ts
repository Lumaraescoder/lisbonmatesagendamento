export interface TourStop {
  title: string;
  description?: string;
  isStart?: boolean;
  isEnd?: boolean;
}

export interface TourItinerary {
  stops: TourStop[];
}

export const ITINERARIES: Record<string, TourItinerary> = {
  id1: {
    stops: [
      { title: "Escolha seu ponto de embarque", isStart: true, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Santa Luzia", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Se de Lisboa (Catedral)", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Senhora do Monte", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Panteao Nacional", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Alfama", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Santo Antonio", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Portas do Sol", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Graca", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Escolha seu ponto de desembarque", isEnd: true, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
    ]
  },
  id_2: {
    stops: [
      { title: "Escolha seu ponto de embarque", isStart: true, description: "Buscamos voce diretamente no seu hotel ou alojamento na regiao central de Lisboa. Se estiver hospedado fora do centro, combinamos um ponto de encontro proximo." },
      { title: "Convento do Carmo", description: "Ruinas goticas de um convento do seculo XIV, parcialmente destruido pelo terramoto de 1755. Ficou sem teto desde entao, criando uma atmosfera unica a ceu aberto." },
      { title: "Livraria Bertrand", description: "Fundada em 1732, e reconhecida oficialmente como a livraria mais antiga do mundo ainda em funcionamento. Fica no coracao do Chiado." },
      { title: "Elevador de Santa Justa", description: "Inaugurado em 1902 para ligar a Baixa ao Chiado. Estrutura de ferro com inspiracao na arquitetura industrial francesa, com vista panoramica do topo." },
      { title: "Igreja de Sao Roque", description: "Igreja jesuita do seculo XVI, famosa pelo interior barroco ricamente decorado e por suas capelas. Um dos monumentos religiosos mais importantes de Lisboa." },
      { title: "Miradouro de Sao Pedro de Alcantara", description: "Um dos miradouros mais populares da cidade, com vista sobre a Baixa e o Castelo de Sao Jorge. Combina jardins, terracos e vista panoramica." },
      { title: "Bairro Alto", description: "Um dos bairros mais tradicionais e vibrantes de Lisboa. De dia preserva o charme historico, e a noite se transforma em um dos points mais animados da cidade." },
      { title: "Praca Luis de Camoes", description: "Praca importante que liga o Chiado ao Bairro Alto. Recebe o nome do maior poeta portugues e e ponto de encontro tradicional de artistas e visitantes." },
      { title: "Escolha seu ponto de desembarque", isEnd: true, description: "Ao final do passeio, retornamos voce ao seu hotel ou alojamento em Lisboa, ou a um ponto de encontro combinado previamente." }
    ]
  },
  id_3: {
    stops: [
      { title: "Escolha seu ponto de embarque", isStart: true, description: "Buscamos voce diretamente no seu hotel ou alojamento na regiao central de Lisboa. Se estiver hospedado fora do centro, combinamos um ponto de encontro proximo." },
      { title: "Torre de Belem", description: "Erguida no seculo XVI as margens do Tejo, e Patrimonio Mundial da UNESCO e simbolo da Era dos Descobrimentos. Sua arquitetura manuelina e um dos cartoes-postais mais fotografados de Lisboa." },
      { title: "Pasteis de Belem", description: "Parada na confeitaria onde a receita original do pastel de nata e preservada ha geracoes. Crocante por fora e cremoso por dentro, e uma tradicao gastronomica essencial." },
      { title: "Mosteiro dos Jeronimos", description: "Obra-prima da arquitetura manuelina, construida para celebrar a viagem de Vasco da Gama a India. Abriga o tumulo do navegador em seu interior." },
      { title: "Padrao dos Descobrimentos", description: "Monumento em forma de caravela voltado para o Tejo, que homenageia os navegadores portugueses. Traz a figura do Infante Dom Henrique entre outras personalidades historicas." },
      { title: "Pink Street", description: "Antiga rua ligada a vida noturna portuaria, hoje uma das areas mais badaladas de Lisboa. O pavimento rosa e os bares animados marcam a cena social moderna da cidade." },
      { title: "Ponte 25 de Abril", description: "Frequentemente comparada a Golden Gate por sua aparencia, liga Lisboa a margem sul do Tejo. Seu nome atual homenageia a Revolucao de 25 de abril de 1974." },
      { title: "Time Out Market", description: "Instalado no historico Mercado da Ribeira, reune algumas das melhores experiencias gastronomicas de Lisboa em um so lugar, do tradicional ao contemporaneo." },
      { title: "Palacio de Belem", description: "Residencia oficial do Presidente da Republica Portuguesa. Edificio historico cercado de jardins, simbolo do poder politico do pais." },
      { title: "Escolha seu ponto de desembarque", isEnd: true, description: "Ao final do passeio, garantimos um retorno confortavel ao seu hotel ou alojamento, ou a um ponto combinado previamente." }
    ]
  },
  id_4: {
    stops: [
      { title: "Alfama", isStart: true, description: "Coracao historico de Lisboa, com ruas labirinticas, casas coloridas, escadarias e o autentico Fado. Passeio pelas vielas e miradouros do bairro mais antigo da cidade." },
      { title: "Chiado", description: "Centro cultural e boemio de Lisboa. Paradas em cafes historicos, na livraria mais antiga do mundo, nas ruinas do Carmo e em miradouros do bairro." },
      { title: "Torre de Belem", description: "Um dos monumentos mais emblematicos de Portugal, simbolo da Era dos Descobrimentos. As margens do Tejo, impressiona pela arquitetura manuelina." },
      { title: "Pasteis de Belem", description: "Parada obrigatoria para provar o autentico pastel de Belem, receita tradicional e segredo bem guardado da confeitaria portuguesa." },
      { title: "Palacio de Belem", isEnd: true, description: "Residencia oficial do Presidente da Republica. Edificio historico rodeado de jardins, simbolo do poder politico em Portugal." }
    ]
  },
  id_5: {
    stops: [
      { title: "Escolha seu ponto de embarque", isStart: true, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Santa Luzia", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Se de Lisboa (Catedral)", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Senhora do Monte", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Panteao Nacional", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Alfama", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Santo Antonio", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Portas do Sol", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Graca", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Escolha seu ponto de desembarque", isEnd: true, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
    ]
  },
  id_6: {
    stops: [
      { title: "Escolha seu ponto de embarque", isStart: true, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Santa Luzia", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Se de Lisboa (Catedral)", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Senhora do Monte", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Panteao Nacional", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Alfama", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Santo Antonio", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Portas do Sol", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Graca", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Escolha seu ponto de desembarque", isEnd: true, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
    ]
  },
  id_7: {
    stops: [
      { title: "Escolha seu ponto de embarque", isStart: true, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Santa Luzia", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Se de Lisboa (Catedral)", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Senhora do Monte", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Panteao Nacional", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Alfama", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Santo Antonio", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Portas do Sol", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Graca", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Escolha seu ponto de desembarque", isEnd: true, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
    ]
  },
  id_8: {
    stops: [
      { title: "Escolha seu ponto de embarque", isStart: true, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Santa Luzia", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Se de Lisboa (Catedral)", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Senhora do Monte", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Panteao Nacional", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Alfama", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Santo Antonio", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Portas do Sol", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Graca", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { title: "Escolha seu ponto de desembarque", isEnd: true, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
    ]
  }
};
