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
      { title: "Escolha seu ponto de embarque", isStart: true, description: "A Lisbon Mates oferece um serviço de recolha conveniente diretamente em hotéis e alojamentos locais (Airbnb) situados no centro de Lisboa." },
      { title: "Santa Luzia", description: "Um dos miradouros mais românticos da cidade, com uma vista deslumbrante sobre os telhados de Alfama e o Rio Tejo." },
      { title: "Se de Lisboa (Catedral)", description: "A igreja mais antiga da cidade, imponente com a sua arquitetura românica e séculos de história." },
      { title: "Senhora do Monte", description: "O ponto mais alto da cidade, oferecendo uma das vistas panorâmicas mais espetaculares e completas de Lisboa." },
      { title: "Panteao Nacional", description: "Originalmente a Igreja de Santa Engrácia, é um dos monumentos mais emblemáticos de Lisboa, servindo hoje como local de repouso para importantes figuras históricas de Portugal." },
      { title: "Alfama", description: "O bairro mais antigo de Lisboa e um dos mais autênticos. Famoso pelas suas ruas estreitas, casas coloridas e cultura tradicional do Fado." },
      { title: "Santo Antonio", description: "A pitoresca igreja construída no local exato onde nasceu Santo António, o padroeiro mais querido de Lisboa." },
      { title: "Portas do Sol", description: "Um dos miradouros mais famosos de Lisboa, localizado no coração de Alfama, com vistas espetaculares sobre o rio Tejo e os telhados históricos." },
      { title: "Graca", description: "Um bairro vibrante e histórico com uma atmosfera artística, famosa pelas suas esplanadas e miradouros icónicos." },
      { title: "Escolha seu ponto de desembarque", isEnd: true, description: "Ao final da sua experiência, podemos deixá-lo no seu hotel, Airbnb no centro de Lisboa ou no nosso ponto de encontro na Avenida da Liberdade, nº 3." }
    ]
  },
  id_2: {
    stops: [
      { title: "Escolha seu ponto de embarque", isStart: true, description: "Buscamos você diretamente no seu hotel ou alojamento na região central de Lisboa. Se estiver hospedado fora do centro, combinamos um ponto de encontro próximo." },
      { title: "Convento do Carmo", description: "Ruínas góticas de um convento do século XIV, parcialmente destruído pelo terramoto de 1755. Ficou sem teto desde então, criando uma atmosfera única a céu aberto." },
      { title: "Livraria Bertrand", description: "Fundada em 1732, é reconhecida oficialmente como a livraria mais antiga do mundo ainda em funcionamento. Fica no coração do Chiado." },
      { title: "Elevador de Santa Justa", description: "Inaugurado em 1902 para ligar a Baixa ao Chiado. Estrutura de ferro com inspiração na arquitetura industrial francesa, com vista panorâmica do topo." },
      { title: "Igreja de Sao Roque", description: "Igreja jesuíta do século XVI, famosa pelo interior barroco ricamente decorado e por suas capelas. Um dos monumentos religiosos mais importantes de Lisboa." },
      { title: "Miradouro de Sao Pedro de Alcantara", description: "Um dos miradouros mais populares da cidade, com vista sobre a Baixa e o Castelo de São Jorge. Combina jardins, terraços e vista panorâmica." },
      { title: "Bairro Alto", description: "Um de bairros mais tradicionais e vibrantes de Lisboa. De dia preserva o charme histórico, e à noite se transforma em um dos points mais animados da cidade." },
      { title: "Praca Luis de Camoes", description: "Praça importante que liga o Chiado ao Bairro Alto. Recebe o nome do maior poeta português e é ponto de encontro tradicional de artistas e visitantes." },
      { title: "Escolha seu ponto de desembarque", isEnd: true, description: "Ao final do passeio, retornamos você ao seu hotel ou alojamento em Lisboa, ou a um ponto de encontro combinado previamente." }
    ]
  },
  id_3: {
    stops: [
      { title: "Escolha seu ponto de embarque", isStart: true, description: "Buscamos você diretamente no seu hotel ou alojamento na região central de Lisboa. Se estiver hospedado fora do centro, combinamos um ponto de encontro próximo." },
      { title: "Torre de Belem", description: "Erguida no século XVI às margens do Tejo, é Património Mundial da UNESCO e símbolo da Era dos Descobrimentos. Sua arquitetura manuelina é um dos cartões-postais mais fotografados de Lisboa." },
      { title: "Pasteis de Belem", description: "Parada na confeitaria onde a receita original do pastel de nata é preservada há gerações. Crocante por fora e cremoso por dentro, é uma tradição gastronómica essencial." },
      { title: "Mosteiro dos Jeronimos", description: "Obra-prima da arquitetura manuelina, construída para celebrar a viagem de Vasco da Gama à Índia. Abriga o túmulo do navegador em seu interior." },
      { title: "Padrao dos Descobrimentos", description: "Monumento em forma de caravela voltado para o Tejo, que homenageia os navegadores portugueses. Traz a figura do Infante Dom Henrique entre outras personalidades históricas." },
      { title: "Pink Street", description: "Antiga rua ligada à vida noturna portuária, hoje uma das áreas mais badaladas de Lisboa. O pavimento rosa e os bares animados marcam a cena social moderna da cidade." },
      { title: "Ponte 25 de Abril", description: "Frequentemente comparada à Golden Gate por sua aparência, liga Lisboa à margem sul do Tejo. Seu nome atual homenageia a Revolução de 25 de abril de 1974." },
      { title: "Time Out Market", description: "Instalado no histórico Mercado da Ribeira, reúne algumas das melhores experiências gastronómicas de Lisboa em um só lugar, do tradicional ao contemporâneo." },
      { title: "Palacio de Belem", description: "Residência oficial do Presidente da República Portuguesa. Edifício histórico cercado de jardins, símbolo do poder político do país." },
      { title: "Escolha seu ponto de desembarque", isEnd: true, description: "Ao final do passeio, garantimos um retorno confortável ao seu hotel ou alojamento, ou a um ponto combinado previamente." }
    ]
  },
  id_4: {
    stops: [
      { title: "Escolha seu ponto de embarque", isStart: true, description: "Serviço de recolha personalizado diretamente no seu hotel ou alojamento para iniciar o seu dia completo por Lisboa." },
      { title: "Belém e monumentos históricos", description: "Explore a Torre de Belém, o Padrão dos Descobrimentos e faça uma paragem deliciosa nos famosos e originais Pastéis de Belém." },
      { title: "Mosteiro dos Jerónimos", description: "Visita guiada exterior a esta magnífica obra-prima da arquitetura manuelina do século XVI." },
      { title: "Baixa Pombalina e Praça do Comércio", description: "Passagem pela zona monumental reconstruída após o sismo de 1755, conectando as grandes praças ao rio Tejo." },
      { title: "Chiado e Almoço Tradicional", description: "Pausa no elegante e boémio bairro do Chiado com tempo livre para saborear um almoço tradicional português." },
      { title: "Miradouros e Colinas Históricas", description: "Subida de Tuk-Tuk até aos pontos mais altos da cidade, incluindo a Senhora do Monte e São Pedro de Alcântara, para vistas de cortar o fôlego." },
      { title: "Alfama Antiga", description: "Caminhada guiada pelas ruelas medievais mais antigas de Lisboa, mergulhando na alma e na história do Fado." },
      { title: "Sé Catedral e Santo António", description: "Visita à Sé de Lisboa e à histórica igreja construída no local de nascimento de Santo António." },
      { title: "Escolha seu ponto de desembarque", isEnd: true, description: "Termine o seu passeio de dia inteiro com retorno direto e confortável ao seu hotel ou ponto central de sua escolha." }
    ]
  },
  id_5: {
    stops: [
      { title: "Escolha seu ponto de embarque", isStart: true, description: "Recolha direta no seu alojamento para começar uma rota panorâmica pelas colinas mais famosas de Lisboa." },
      { title: "Miradouro de São Pedro de Alcântara", description: "Uma vista clássica e monumental sobre a Baixa pombalina, a colina da Graça e o imponente Castelo de São Jorge." },
      { title: "Miradouro de Santa Catarina (Adamastor)", description: "Ambiente descontraído à beira da colina com uma vista ampla sobre o porto de Lisboa, a ponte e o Cristo Rei." },
      { title: "Miradouro da Senhora do Monte", description: "O topo absoluto de Lisboa. A vista panorâmica mais espetacular, onde conseguimos avistar quase toda a extensão da cidade antiga." },
      { title: "Miradouro da Graça", description: "Localizado junto à icónica igreja, é um dos pontos de paragem favoritos dos lisboetas para observar a cidade antiga sob a sombra dos pinheiros." },
      { title: "Miradouro das Portas do Sol", description: "Uma autêntica varanda medieval suspensa sobre os telhados tradicionais de Alfama e a curvatura perfeita do Rio Tejo." },
      { title: "Escolha seu ponto de desembarque", isEnd: true, description: "Desembarque confortável no seu hotel ou num miradouro de sua preferência para desfrutar do fim de tarde." }
    ]
  },
  id_6: {
    stops: [
      { title: "Escolha seu ponto de embarque", isStart: true, description: "Buscamos você ao final da tarde no seu hotel com o Tuk-Tuk totalmente decorado e preparado para a magia do Natal." },
      { title: "Praça do Comércio e Árvore Gigante", description: "Aprecie a grandiosa iluminação da maior praça de Lisboa e a sua tradicional árvore de Natal gigante e brilhante." },
      { title: "Rua Augusta e Baixa Iluminada", description: "Passeio sob os tetos de luzes cintilantes e decorações temáticas das ruas comerciais mais movimentadas da cidade." },
      { title: "Rossio e Mercado de Natal", description: "Passagem pelo Rossio e paragem opcional para explorar as pequenas cabanas de madeira com artesanato, doces típicos e vinho quente." },
      { title: "Avenida da Liberdade", description: "Desfile pela avenida mais luxuosa de Lisboa, completamente ornamentada com milhares de luzes LED nas suas árvores centenárias." },
      { title: "Chiado e Praça Luís de Camões", description: "Mergulhe na atmosfera mágica e artística do Chiado com as suas famosas fachadas luminosas que encantam miúdos e graúdos." },
      { title: "Escolha seu ponto de desembarque", isEnd: true, description: "Retorno confortável ao seu hotel ou num restaurante de sua escolha para desfrutar do jantar de Natal." }
    ]
  },
  id_7: {
    stops: [
      { title: "Escolha seu ponto de embarque", isStart: true, description: "Recolha privada de manhã no seu hotel para iniciarmos uma viagem inesquecível rumo à deslumbrante Serra de Sintra." },
      { title: "Palácio Nacional da Pena", description: "Explore o palácio mais colorido e romântico da Europa, erguido no topo da serra como um verdadeiro castelo de conto de fadas." },
      { title: "Vila Histórica de Sintra", description: "Tempo livre para explorar as ruelas medievais, visitar as lojas locais e saborear as famosas queijadas e travesseiros de Sintra." },
      { title: "Cabo da Roca", description: "Visita ao ponto mais ocidental da Europa continental, onde o mar se encontra com as impressionantes falésias rochosas." },
      { title: "Boca do Inferno", description: "Contemple a força dramática do oceano Atlântico esculpindo as cavernas e formações rochosas na costa de Cascais." },
      { title: "Cascais e Costa do Estoril", description: "Passeio pela charmosa vila costeira de Cascais, antiga residência de veraneio da realeza, retornando pela cénica estrada marginal." },
      { title: "Escolha seu ponto de desembarque", isEnd: true, description: "Retorno com total conforto e segurança diretamente ao seu alojamento em Lisboa." }
    ]
  },
  id_8: {
    stops: [
      { title: "Escolha seu ponto de embarque", isStart: true, description: "Partida privada do seu hotel em Lisboa em direção ao coração histórico, religioso e cultural do centro de Portugal." },
      { title: "Santuário de Fátima", description: "Visita ao local das aparições marianas de 1917, conhecendo a Basílica de Nossa Senhora do Rosário, a Capelinha das Aparições e a Basílica da Santíssima Trindade." },
      { title: "Mosteiro da Batalha", description: "Uma imponente joia da arquitetura gótica e manuelina portuguesa, classificado como Património Mundial pela UNESCO." },
      { title: "Nazaré e Sítio das Ondas Gigantes", description: "Subida ao Sítio da Nazaré para uma vista panorâmica de cortar o fôlego sobre a praia e as icónicas ondas gigantes do Canhão da Nazaré." },
      { title: "Vila Medieval de Óbidos", description: "Viagem no tempo ao caminhar pelas muralhas e ruas de Óbidos, finalizando com a clássica Ginjinha servida em copo de chocolate." },
      { title: "Escolha seu ponto de desembarque", isEnd: true, description: "Retorno confortável e relaxante com desembarque final no seu hotel ou ponto de alojamento em Lisboa." }
    ]
  }
};
