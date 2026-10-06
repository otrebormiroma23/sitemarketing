/* =========================================================
   PROJETOS — detalhes exibidos no modal
   ▶ EDITE AQUI: use o mesmo "id" do atributo data-id do card
     correspondente em index.html.
   ========================================================= */
window.PROJECTS = {
  "resort-camboinhas": {
    titulo: "Resort Camboinhas — Aquisição de Hóspedes",
    categoria: "Tráfego Pago · Meta Ads",
    imagem: "assets/img/projeto-1.webp",
    alt: "Fachada do Santa Bárbara Resort Residence, projeto de campanha de tráfego pago para reservas diretas",
    desafio:
      "O resort dependia fortemente de plataformas terceiras (OTA) e pagava comissões altas por reserva. O desafio era gerar reservas diretas com custo por reserva abaixo da comissão paga aos intermediários, sem diluir a percepção de valor da marca.",
    solucao:
      "Estrutura de campanhas segmentada por intenção (famílias, casais e grupos), públicos semelhantes construídos sobre base de hóspedes anteriores e criativos divididos em três linhas: prova social, oferta com data e experiência do lugar. Landing page enxuta com reserva em dois passos e pixel de conversão orientado a valor (receita), não apenas a clique.",
    resultados: [
      { valor: "4,7x", label: "ROAS médio no período de alta temporada" },
      { valor: "-38%", label: "no custo por reserva em relação ao trimestre anterior" },
      { valor: "+62%", label: "em reservas diretas pelo site" }
    ]
  },

  "vista-gardens": {
    titulo: "Vista Gardens — Lançamento Imobiliário",
    categoria: "Tráfego Pago · Estratégia de Lançamento",
    imagem: "assets/img/projeto-2.webp",
    alt: "Peças da campanha de captação de leads do lançamento imobiliário Vista Gardens",
    desafio:
      "Empreendimento em pré-lançamento precisava formar uma lista de interessados qualificados antes da abertura oficial de vendas, com orçamento de mídia limitado e alta concorrência por lead no mercado imobiliário local.",
    solucao:
      "Funil em três etapas: conteúdo de valor para esquentar a audiência, anúncio de captação com material rico segmentado por perfil (investidor x morador) e nutrição automatizada via e-mail e WhatsApp. Criativos em direção de arte autoral destacando a vista e a localização, com testes A/B contínuos de headline e oferta.",
    resultados: [
      { valor: "+3.200", label: "leads qualificados no ciclo de pré-lançamento" },
      { valor: "R$ 21", label: "custo médio por lead (CPL) qualificado" },
      { valor: "1 em 34", label: "leads convertidos em visita agendada" }
    ]
  },

  "verao-2025": {
    titulo: "Campanha Verão — Identidade de Campanha",
    categoria: "Direção de Arte",
    imagem: "assets/img/projeto-3.webp",
    alt: "Chave gráfica da campanha de verão com tipografia de impacto e paleta vermelho e preto",
    desafio:
      "Marca de moda de verão precisava de uma campanha 360° com identidade reconhecível em mídia exterior, redes sociais e ponto de venda — mantendo unidade visual entre formatos muito diferentes.",
    solucao:
      "Conceito criativo construído a partir de uma chave gráfica única: tipografia de alto contraste, recortes fotográficos e o vermelho como elemento de destaque. Criei o manual da campanha, os layouts mestres e acompanhei a produção das peças, garantindo consistência de cor, hierarquia e legibilidade em todos os formatos.",
    resultados: [
      { valor: "+47%", label: "de engajamento médio nas peças da campanha" },
      { valor: "28", label: "formatos padronizados em um único manual" },
      { valor: "+21%", label: "de recall de marca no pós-campanha" }
    ]
  },

  "cafe-serra": {
    titulo: "Café da Serra — Rebranding",
    categoria: "Direção de Arte · Branding",
    imagem: "assets/img/projeto-4.webp",
    alt: "Nova identidade visual do Café da Serra aplicada em embalagem e materiais de comunicação",
    desafio:
      "Produtor de café especial com identidade visual fragmentada entre rótulo, redes sociais e mercado. A marca tinha produto bom, mas não comunicava origem nem premiumidade — e perdia espaço na gôndola e no feed.",
    solucao:
      "Redesenho completo da identidade: símbolo, tipografia, paleta e sistema de rótulos por torra. Defini a arquitetura de marca, o manual de aplicação e as diretrizes de fotografia e conteúdo, alinhando o discurso de origem e qualidade ao público-alvo.",
    resultados: [
      { valor: "+35%", label: "de reconhecimento da marca nas prateleiras" },
      { valor: "3x", label: "crescimento de seguidores engajados em 6 meses" },
      { valor: "100%", label: "de consistência visual via manual de marca" }
    ]
  },

  "black-friday": {
    titulo: "Black Friday — Escala com ROI",
    categoria: "Tráfego Pago · Meta e Google Ads",
    imagem: "assets/img/projeto-5.webp",
    alt: "Painel de métricas da campanha de Black Friday com gráficos de retorno sobre investimento",
    desafio:
      "E-commerce com histórico de Black Friday no vermelho: verba escalada sem controle de margem, campanhas genéricas disputando leilões caros e remarketing mal configurado desperdiçando orçamento.",
    solucao:
      "Reestruturei as contas por margem de produto, criei campanhas de máximo valor de conversão com verba separada por faixa de ROI, bloqueei leilões de termos sem margem e operei remarketing em funis distintos por recência de visita. Rotina diária de leitura de métricas com ajuste de lance e verba em horários de pico.",
    resultados: [
      { valor: "6,3x", label: "de ROAS no pico da Black Friday" },
      { valor: "-29%", label: "no custo por aquisição (CPA)" },
      { valor: "+88%", label: "de receita em relação ao ano anterior" }
    ]
  },

  "perfomark": {
    titulo: "Perfomark — Lançamento de Curso",
    categoria: "Estratégia de Lançamento · Direção de Arte",
    imagem: "assets/img/projeto-6.webp",
    alt: "Materiais do lançamento do curso Perfomark: página de vendas, criativos e sequência de e-mails",
    desafio:
      "Lançamento de curso online para público de marketing precisava de autoridade e de volume de inscrições no webinário, com pouca base de audiência e verba de mídia enxuta.",
    solucao:
      "Estratégia em quatro blocos: conteúdo de aquecimento, anúncio de inscrição com prova social, sequência de e-mails de nutrição e páginas de captura testadas em três variações de headline. Direção de arte dos criativos, dos materiais do webinário e da página de vendas, mantendo um único sistema visual do topo ao rodapé do funil.",
    resultados: [
      { valor: "+1.850", label: "inscrições no webinário de lançamento" },
      { valor: "42%", label: "de taxa de presença na aula ao vivo" },
      { valor: "5,1x", label: "de retorno sobre a verba investida em mídia" }
    ]
  }
};
