import React, { useState, useEffect } from 'react';

// Simplified icon mapping using inline SVGs for web compatibility
const iconMap = {
  'tablet': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10"><path d="M7 2a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2H7zm0 2h10v12H7V4zm1 14h8v1H8v-1z"/></svg>`,
  'cog-outline': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11v2h2v-2h-2zm0 4v2h2v-2h-2z"/></svg>`,
  'tshirt-crew': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10"><path d="M12 2c-3.87 0-7 3.13-7 7v4.17L4 16h16l-1-2.83V9c0-3.87-3.13-7-7-7zm0 1.5c2.76 0 5 2.24 5 5v3.17l.5.5H6.5l.5-.5V8.5c0-2.76 2.24-5 5-5z"/></svg>`,
  'notebook-outline': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM11 6h2v6h-2V6zm4 0h2v6h-2V6zM7 6h2v6H7V6z"/></svg>`,
  'bottle-soda-outline': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10"><path d="M16 11V5h-1V3H9v2H8v6c0 3.87 3.13 7 7 7s7-3.13 7-7zm-4 8a4 4 0 01-4-4v-3h8v3a4 4 0 01-4 4z"/></svg>`,
  'bottle-wine-outline': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10"><path d="M13 13.5V11h-2v2.5c0 1.1-.9 2-2 2s-2-.9-2-2v-3H5v3c0 2.21 1.79 4 4 4s4-1.79 4-4zm5-9.5V3h-1v1h-1V3h-1v1h-1V3h-1v1H6V3H5v1H4v17h16V4h-2zm-1 16H6V5h12v15z"/></svg>`,
  'dots-horizontal-circle-outline': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM7 11h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/></svg>`,
  'cogs': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.39-1.1-.65-1.7-.82L14 2h-4L9.69 4.35c-.6.17-1.17.43-1.7.82L5.5 4.12c-.22-.08-.49 0-.61.22l-2 3.46c-.12.22-.07.49.12.64l2.11 1.65c-.04.32-.07.64-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.39 1.1.65 1.7.82L10 22h4l.31-2.35c.6-.17 1.17-.43 1.7-.82l2.49 1c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>`,
  'lightbulb-outline': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.69 2 6 4.69 6 8.5c0 2.23 1.5 3.57 2.68 4.71.74.77 1.32 1.34 1.76 1.93.45.59.56 1.18.56 1.86v.5H9c-.55 0-1 .45-1 1h8c0-.55-.45-1-1-1v-.5c0-.68.11-1.27.56-1.86.44-.59 1.02-1.16 1.76-1.93C16.5 12.07 18 10.73 18 8.5 18 4.69 15.31 2 12 2z"/></svg>`,
  'magnify': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5a6.5 6.5 0 10-6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`,
  'menu-down': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M7 10l5 5 5-5z"/></svg>`,
};

const Colors = {
  primaryGreen: '#4CAF50', // Um verde vibrante
  darkGreen: '#2E7D32',    // Um verde mais escuro
  brown: '#8D6E63',        // Um marrom terroso
  lightBrown: '#BCAAA4',   // Um marrom mais claro
  background: '#F5F5DC',   // Um bege claro para o fundo
  text: '#333333',         // Cor de texto principal
  white: '#FFFFFF',        // Branco
};

// Dados simulados para as categorias e materiais, baseados no documento
const categories = [
  { name: 'Eletrônicos', icon: 'tablet', color: Colors.primaryGreen },
  { name: 'Metais', icon: 'cog-outline', color: Colors.brown },
  { name: 'Têxteis', icon: 'tshirt-crew', color: Colors.primaryGreen },
  { name: 'Papéis e Papelões', icon: 'notebook-outline', color: Colors.brown },
  { name: 'Plásticos', icon: 'bottle-soda-outline', color: Colors.primaryGreen },
  { name: 'Vidros', icon: 'bottle-wine-outline', color: Colors.brown },
  { name: 'Diversos', icon: 'dots-horizontal-circle-outline', color: Colors.primaryGreen },
  { name: 'Componentes e Peças Mistas', icon: 'cogs', color: Colors.brown },
  { name: 'Itens Comuns Subvalorizados', icon: 'lightbulb-outline', color: Colors.primaryGreen },
];

const materialsData = {
  Eletrônicos: [
    {
      id: 'notebook',
      name: 'Notebook ou Computador Antigo',
      image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Notebook', // Placeholder
      parts: [
        { name: 'Fios de cobre internos', price: 'R$ 30-40/kg', instructions: 'Desmontar com cuidado. Cortar fios. Armazenar em local seco.' },
        { name: 'Bateria de notebook', price: 'R$ 10-15/un.', instructions: 'Remover com atenção. Armazenar separadamente. Não furar.' },
        { name: 'Placa-mãe', price: 'R$ 15-20/kg', instructions: 'Desconectar da estrutura. Proteger de quebras. Usar sacolas separadas.' },
        { name: 'Carcaça plástica ou de alumínio', price: 'R$ 1-3/kg', instructions: 'Separar o metal do plástico. Empilhar para economizar espaço.' },
      ],
      whereToSell: [
        { item: 'Fios de cobre', place: 'Ferros-velhos, sucateiros' },
        { item: 'Baterias e placas', place: 'Técnicos, recicladoras de eletrônicos' },
      ],
    },
    {
      id: 'printer',
      name: 'Impressora Velha',
      image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Impressora', // Placeholder
      parts: [
        { name: 'Placa de circuito', price: 'R$ 15-20/kg', instructions: 'Desconectar da estrutura. Proteger de quebras. Usar sacolas separadas.' },
        { name: 'Cartucho de tinta vazio', price: 'R$ 1-2/un.', instructions: 'Guardar em potes fechados para não vazar tinta.' },
        { name: 'Fios internos (com cobre)', price: 'R$ 5-7/kg', instructions: 'Desmontar com cuidado. Cortar fios. Armazenar em local seco.' },
      ],
      whereToSell: [
        { item: 'Cartuchos', place: 'Recarregadoras, gráficas pequenas' },
        { item: 'Placas e fios', place: 'Sucateiros ou recicladores eletrônicos' },
      ],
    },
    {
        id: 'tv',
        name: 'TV de Tubo (ou Tela LCD quebrada)',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=TV', // Placeholder
        parts: [
          { name: 'Placa de circuito principal', price: 'R$ 15-20/kg', instructions: 'Desconectar da estrutura. Proteger de quebras. Usar sacolas separadas.' },
          { name: 'Bobina de cobre', price: 'R$ 30-40/kg', instructions: 'Remover com atenção. Armazenar separadamente. Não furar.' },
          { name: 'Fios internos e cabos', price: 'R$ 5-7/kg', instructions: 'Desmontar com cuidado. Cortar fios. Armazenar em local seco.' },
        ],
        whereToSell: [
          { item: 'Bobinas e fios de cobre', place: 'Ferros-velhos, recicladores' },
          { item: 'Placas eletrônicas', place: 'Cooperativas ou recicladoras' },
        ],
      },
      {
        id: 'celular',
        name: 'Celular quebrado',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Celular', // Placeholder
        parts: [
          { name: 'Placa interna (placa lógica)', price: 'R$ 20-40/kg', instructions: 'Desconectar da estrutura. Proteger de quebras. Usar sacolas separadas.' },
          { name: 'Bateria (não estufada)', price: 'R$ 3-5/un.', instructions: 'Remover com atenção. Armazenar separadamente. Não furar.' },
          { name: 'Tela ou display (se inteira)', price: 'R$ 10-30/un.', instructions: 'Envolver telas e placas com papel ou pano para não quebrar.' },
        ],
        whereToSell: [
          { item: 'Placa, câmera, tela', place: 'Técnicos ou consertadores de celular' },
          { item: 'Bateria', place: 'Técnicos, lojas de manutenção' },
        ],
      },
      {
        id: 'monitor',
        name: 'Monitor LCD ou LED quebrado',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Monitor', // Placeholder
        parts: [
          { name: 'Placa lógica (circuito interno)', price: 'R$ 15-20/kg', instructions: 'Envolver placas e alto-falantes com plástico bolha, pano ou papelão.' },
          { name: 'Cabos (HDMI, VGA, energia)', price: 'R$ 2-4/un.', instructions: 'Organizar cabos por tipo (HDMI com HDMI, energia com energia).' },
          { name: 'Fonte interna (se tiver)', price: 'R$ 5-10/un.', instructions: 'Remover com atenção. Armazenar separadamente.' },
        ],
        whereToSell: [
          { item: 'Cabos e placas', place: 'Ferros-velhos e recicladoras eletrônicas' },
          { item: 'Fonte', place: 'Reparadores de eletrônicos' },
        ],
      },
      {
        id: 'roteador',
        name: 'Roteador / Modem antigo',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Roteador', // Placeholder
        parts: [
          { name: 'Placa de circuito interna', price: 'R$ 15-20/kg', instructions: 'Desconectar da estrutura. Proteger de quebras. Usar sacolas separadas.' },
          { name: 'Fonte de energia externa (bivolt)', price: 'R$ 5-8/un.', instructions: 'Guardar fontes e cabos separados por tipo e sem nós.' },
          { name: 'Cabos de rede / energia', price: 'R$ 2-3/un.', instructions: 'Desmontar com cuidado. Cortar fios. Armazenar em local seco.' },
        ],
        whereToSell: [
          { item: 'Placa e antena', place: 'Técnicos ou sucateiros de eletrônicos' },
          { item: 'Fonte', place: 'Reparadores ou lojas de energia' },
        ],
      },
      {
        id: 'teclado-mouse',
        name: 'Teclado e Mouse',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Teclado+Mouse', // Placeholder
        parts: [
          { name: 'Cabos com cobre', price: 'R$ 5-7/kg', instructions: 'Juntar fios e placas separadamente.' },
          { name: 'Placa eletrônica interna', price: 'R$ 15-20/kg', instructions: 'Desconectar da estrutura. Proteger de quebras.' },
          { name: 'Peças plásticas (botões e carcaça)', price: 'R$ 1-2/kg', instructions: 'Carcaças podem ser separadas por cor (preta, branca).' },
        ],
        whereToSell: [
          { item: 'Fios e placas', place: 'Ferros-velhos, recicladoras de eletrônicos' },
          { item: 'Membranas e botões', place: 'Artesãos, escolas de artes' },
        ],
      },
      {
        id: 'cabos-carregadores',
        name: 'Cabos e Carregadores',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Cabos+Carregadores', // Placeholder
        parts: [
          { name: 'Fio de cobre interno', price: 'R$ 30-40/kg', instructions: 'Juntar cabos por tipo (celular, energia, HDMI...) Enrolar com fita ou elástico para evitar nós.' },
          { name: 'Fonte de alimentação', price: 'R$ 5-10/un.', instructions: 'Fontes quebradas ainda valem pelas peças.' },
          { name: 'Conectores metálicos', price: 'R$ 10-20/kg', instructions: 'Separar os conectores dos fios. Armazenar em local seco.' },
        ],
        whereToSell: [
          { item: 'Fios de cobre', place: 'Ferros-velhos, sucateiros' },
          { item: 'Fontes e transformadores', place: 'Lojas de eletrônicos ou sucata' },
        ],
      },
      {
        id: 'caixas-de-som',
        name: 'Caixas de som pequenas',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Caixas+de+Som', // Placeholder
        parts: [
          { name: 'Ímãs de ferrite', price: 'R$ 5-10/kg', instructions: 'Remover alto-falantes e ímãs com cuidado.' },
          { name: 'Fios de cobre', price: 'R$ 30-40/kg', instructions: 'Fios e placas vão em potes ou sacos pequenos.' },
          { name: 'Placa eletrônica de controle de volume', price: 'R$ 15-20/kg', instructions: 'Guardar botões soltos em potinhos de plástico.' },
        ],
        whereToSell: [
          { item: 'Fios e placas', place: 'Ferros-velhos, recicladoras eletrônicos' },
          { item: 'Ímãs e alto-falantes', place: 'Técnicos ou brechós de som' },
        ],
      },
      {
        id: 'camera-filmadoras',
        name: 'Câmera Digital ou Filmadora Antiga',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Câmera+Filmadora', // Placeholder
        parts: [
          { name: 'Placa de circuito principal', price: 'R$ 15-20/kg', instructions: 'Peças pequenas em sacos etiquetados ou potinhos com tampa.' },
          { name: 'Fios finos de cobre', price: 'R$ 30-40/kg', instructions: 'Fios e placas em sacos resistentes.' },
          { name: 'Tela LCD (pequena)', price: 'R$ 5-10/un', instructions: 'Lentes e telas em pano ou plástico para não arranhar.' },
        ],
        whereToSell: [
          { item: 'Fios e placas', place: 'Recicladoras e sucateiros eletrônicos' },
          { item: 'Lente e botões', place: 'Artesãos, escolas de arte' },
        ],
      },
      {
        id: 'scanner-multifuncional',
        name: 'Scanner ou Impressora Multifuncional',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Scanner+Multifuncional', // Placeholder
        parts: [
          { name: 'Placa principal', price: 'R$ 15-20/kg', instructions: 'Vidros bem protegidos com papelão ou tecido.' },
          { name: 'Cabos de energia e dados', price: 'R$ 2-4/un.', instructions: 'Motores e sensores em caixa pequena.' },
          { name: 'Cartuchos de tinta (se tiver)', price: 'R$ 1-2/un.', instructions: 'Cartuchos em pote com tampa (evitar vazamento).' },
        ],
        whereToSell: [
          { item: 'Placas, cabos e motores', place: 'Recicladoras de eletrônicos' },
          { item: 'Cartuchos', place: 'Recarregadoras de tinta' },
        ],
      },
  ],
  Metais: [
    {
      id: 'latas-aluminio',
      name: 'Latas de Alumínio (bebidas)',
      image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Latas', // Placeholder
      parts: [
        { name: 'Corpo da latinha', price: 'R$ 6-8/kg', instructions: 'Amasse para economizar espaço. Junte em sacos grandes e secos.' },
        { name: 'Anel de abertura', price: 'R$ 6-8/kg', instructions: 'Mesmas instruções do corpo da latinha.' },
      ],
      whereToSell: [
        { item: 'Alumínio', place: 'Ferros-velhos, sucateiros' },
      ],
    },
    {
      id: 'panelas-velhas',
      name: 'Panelas Velhas',
      image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Panelas', // Placeholder
      parts: [
        { name: 'Alumínio (corpo da panela)', price: 'R$ 3-5/kg', instructions: 'Tire os cabos e leve só o metal. Guarde empilhado e limpo, se possível.' },
        { name: 'Tampa de alumínio ou inox', price: 'R$ 2-3/un.', instructions: 'Mesmas instruções do corpo da panela.' },
      ],
      whereToSell: [
        { item: 'Alumínio e inox', place: 'Sucateiros, recicladoras' },
      ],
    },
    {
        id: 'fios-eletricos-grossos',
        name: 'Fios Elétricos Grossos',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Fios+Elétricos', // Placeholder
        parts: [
          { name: 'Cobre interno (fio nu)', price: 'R$ 30-40/kg', instructions: 'Enrole bem os cabos para não embolar. Separe os tipos por cor ou espessura.' },
          { name: 'Isolamento plástico (capa colorida)', price: 'R$ 1-2/kg', instructions: 'Pode juntar os plásticos em saco à parte.' },
          { name: 'Conectores ou terminais metálicos', price: 'R$ 5-10/kg', instructions: 'Mesmas instruções para o cobre.' },
        ],
        whereToSell: [
          { item: 'Cobre e conectores', place: 'Ferros-velhos, sucateiros' },
          { item: 'Plástico da capa', place: 'Recicladoras plásticas' },
        ],
      },
      {
        id: 'molas-colchao',
        name: 'Molas de Colchão',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Molas+Colchão', // Placeholder
        parts: [
          { name: 'Estrutura metálica (aço)', price: 'R$ 3-5/kg', instructions: 'Amarre as estruturas para não se abrirem. Guarde empilhado em local seco. Evite molhar para não enferrujar.' },
          { name: 'Grampos de fixação e suportes', price: 'incluídos no quilo', instructions: 'Retirar o tecido do colchão e limpar antes.' },
        ],
        whereToSell: [
          { item: 'Molas de aço', place: 'Ferros-velhos' },
        ],
      },
      {
        id: 'ferro-construcao',
        name: 'Ferro de Construção',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Ferro+Construção', // Placeholder
        parts: [
          { name: 'Vergalhão e ferragens pesadas', price: 'R$ 1,50-2/kg', instructions: 'Junte tudo em baldões ou sacos resistentes. Amarrar vergalhões com corda ou arame.' },
          { name: 'Pregos e parafusos soltos (ferro)', price: 'R$ 1-3/kg', instructions: 'Separar o metal limpo do enferrujado, se possível.' },
          { name: 'Retalhos de metal', price: 'preço por quilo comum', instructions: 'Mesmas instruções para vergalhão.' },
        ],
        whereToSell: [
          { item: 'Ferro e vergalhões', place: 'Sucateiros, ferros-velhos' },
        ],
      },
      {
        id: 'tampinhas-garrafa',
        name: 'Tampinhas de Garrafa',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Tampinhas', // Placeholder
        parts: [
          { name: 'Alumínio ou aço prensado', price: 'R$ 4-6/kg', instructions: 'Junte em garrafas PET ou sacos firmes. Armazene limpas e secas.' },
          { name: 'Plástico interno (anéis e vedação)', price: 'pode ser separado para artesanato', instructions: 'Mesmas instruções para alumínio.' },
        ],
        whereToSell: [
          { item: 'Tampinhas', place: 'Ferros-velhos ou ONGs que aceitam doações para artesanato' },
        ],
      },
      {
        id: 'chapas-zinco-aluminio',
        name: 'Chapas de Zinco ou Alumínio',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Chapas', // Placeholder
        parts: [
          { name: 'Zinco / alumínio reciclável', price: 'R$ 2-4/kg', instructions: 'Empilhar sem dobrar demais. Separar por tipo de metal, se possível. Tirar parafusos para facilitar a pesagem.' },
          { name: 'Parafusos presos à chapa', price: 'R$ 1-3/kg', instructions: 'Mesmas instruções para zinco/aluminio.' },
        ],
        whereToSell: [
          { item: 'Zinco / alumínio', place: 'Ferros-velhos' },
        ],
      },
      {
        id: 'pregos-parafusos',
        name: 'Pregos e Parafusos Soltos',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Pregos+Parafusos', // Placeholder
        parts: [
          { name: 'Pregos e parafusos de ferro ou aço', price: 'R$ 1-3/kg', instructions: 'Junte em garrafas PET, latas ou potes resistentes. Mantenha seco para evitar ferrugem.' },
          { name: 'Parafusos com cabeça de latão ou cobre', price: 'R$ 4-6/kg', instructions: 'Separar se forem de materiais diferentes (ferro, latão).' },
          { name: 'Arruelas e porcas grandes (aço grosso)', price: 'R$ 3-5/kg', instructions: 'Mesmas instruções para pregos.' },
        ],
        whereToSell: [
          { item: 'Metais mistos', place: 'Sucateiros' },
          { item: 'Latão ou cobre', place: 'Ferros-velhos especializados' },
        ],
      },
      {
        id: 'tampas-utensilios-metalicos',
        name: 'Tampas de Panela e Utensílios Metálicos',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Tampas+Utensílios', // Placeholder
        parts: [
          { name: 'Alumínio (corpo da tampa ou colher grande)', price: 'R$ 2-4/un.', instructions: 'Remover os cabos se possível. Guardar por tipo: alumínio em um lado, inox em outro.' },
          { name: 'Aço inox (talheres, panelas antigas)', price: 'R$ 3-5/kg', instructions: 'Empilhar as tampas para ocupar menos espaço.' },
          { name: 'Cabos plásticos ou de madeira', price: 'descartar ou usar como apoio para artesanato', instructions: 'Mesmas instruções para alumínio.' },
        ],
        whereToSell: [
          { item: 'Alumínio e inox', place: 'Ferros-velhos' },
          { item: 'Talheres inteiros', place: 'Brechós ou bazares (opcional)' },
        ],
      },
  ],
  Têxteis: [
    {
      id: 'camisetas',
      name: 'Camisetas em Bom Estado',
      image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Camisetas', // Placeholder
      parts: [
        { name: 'Camiseta inteira', price: 'R$ 5-10/un.', instructions: 'Camisetas boas: dobrar e empilhar em caixas ou sacolas.' },
        { name: 'Retalhos', price: 'R$ 2-4/kg', instructions: 'Retalhos: guardar limpos em sacos transparentes. Separar por cor ajuda na venda para costureiras.' },
      ],
      whereToSell: [
        { item: 'Camisetas boas', place: 'Brechós, bazares, feiras' },
        { item: 'Retalhos', place: 'Artesãos, costureiras' },
      ],
    },
    {
      id: 'calcas-jeans',
      name: 'Calças Jeans',
      image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Jeans', // Placeholder
      parts: [
        { name: 'Calça inteira', price: 'R$ 10-20/un.', instructions: 'Calças inteiras dobradas separadas por tamanho.' },
        { name: 'Zíper e botões de metal', price: 'R$ 3-5/kg', instructions: 'Zíperes e botões em potinhos pequenos.' },
        { name: 'Jeans para costura ou bolsas', price: 'R$ 5-10/kg', instructions: 'Retalhos e peças cortadas em caixas ou sacos.' },
      ],
      whereToSell: [
        { item: 'Calças inteiras', place: 'Brechós, feiras, doações' },
        { item: 'Retalhos de jeans', place: 'Costureiras, artesãos' },
      ],
    },
    {
        id: 'casacos-jaquetas',
        name: 'Casacos ou Jaquetas',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Casacos', // Placeholder
        parts: [
          { name: 'Casaco completo', price: 'R$ 15-30/un.', instructions: 'Casacos inteiros dobrados e protegidos do mofo.' },
          { name: 'Zíper longo ou duplo', price: 'R$ 2-3/un.', instructions: 'Zíperes e botões limpos em potes com tampa.' },
          { name: 'Botões grandes e metálicos', price: 'R$ 3-5/kg', instructions: 'Mesmas instruções para zíperes.' },
        ],
        whereToSell: [
          { item: 'Casacos inteiros', place: 'Brechós, lojas populares' },
          { item: 'Tecido e enchimento', place: 'Costureiras, ateliês' },
        ],
      },
      {
        id: 'roupas-intimas-novas',
        name: 'Roupas Íntimas Novas',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Roupas+Intimas', // Placeholder
        parts: [
          { name: 'Peça inteira', price: 'R$ 2-5/un.', instructions: 'Guardar em sacos ou caixas limpas. Manter sempre embalado ou muito bem dobrado.' },
          { name: 'Etiqueta ou embalagem', price: 'para agregar valor', instructions: 'Evitar umidade para não manchar ou mofar.' },
        ],
        whereToSell: [
          { item: 'Roupas novas', place: 'Lojas populares, feiras, bazares' },
          { item: 'Lotes maiores', place: 'Revendedores, pequenas fábricas' },
        ],
      },
      {
        id: 'toalhas-usadas',
        name: 'Toalhas Usadas',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Toalhas', // Placeholder
        parts: [
          { name: 'Toalha inteira', price: 'R$ 3-8/un.', instructions: 'Guardar limpas, secas e dobradas. Separar as boas das que serão cortadas.' },
          { name: 'Tecido absorvente', price: 'R$ 2-4/kg', instructions: 'Manter em saco de tecido ou caixa arejada.' },
          { name: 'Bordas decoradas', price: 'R$ 1-2/un.', instructions: 'Mesmas instruções para o tecido absorvente.' },
        ],
        whereToSell: [
          { item: 'Inteiras', place: 'Brechós, bazares, oficinas' },
          { item: 'Retalhos e bordas', place: 'Artesãos, costureiras, petshops' },
        ],
      },
      {
        id: 'lencois-usados',
        name: 'Lençóis Usados',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Lençóis', // Placeholder
        parts: [
          { name: 'Lençol inteiro', price: 'R$ 10-15/un.', instructions: 'Dobrar sempre seco e limpo.' },
          { name: 'Tecido para confecção', price: 'R$ 4-8/kg', instructions: 'Separar os com defeito para corte e reaproveitamento.' },
          { name: 'Elástico do lençol de elástico', price: 'usado em reaproveitamento ou para costura', instructions: 'Elásticos devem ser enrolados separadamente.' },
        ],
        whereToSell: [
          { item: 'Lençóis inteiros', place: 'Brechós, bazares' },
          { item: 'Tecido cortado', place: 'Costureiras, artesãos' },
        ],
      },
      {
        id: 'cortinas',
        name: 'Cortinas',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Cortinas', // Placeholder
        parts: [
          { name: 'Cortina inteira', price: 'R$ 8-12/un.', instructions: 'Cortinas dobradas, em caixas ou sacolas sem umidade.' },
          { name: 'Tecido para costura', price: 'R$ 3-6/kg', instructions: 'Enrolar o tecido, se possível, para não amassar.' },
          { name: 'Argolas ou trilhos', price: 'R$ 3-5/kg', instructions: 'Argolas e trilhos separados em sacos resistentes.' },
        ],
        whereToSell: [
          { item: 'Cortinas inteiras', place: 'Bazar, brechó, costureiras' },
          { item: 'Tecidos cortados', place: 'Ateliês, costureiras' },
        ],
      },
      {
        id: 'uniformes-empresariais',
        name: 'Uniformes Empresariais',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Uniformes', // Placeholder
        parts: [
          { name: 'Uniforme inteiro', price: 'R$ 5-10/un.', instructions: 'Uniformes limpos e secos em sacos ou caixas por tamanho.' },
          { name: 'Logotipo ou estampa', price: 'uso alternativo por empresas de baixo orçamento', instructions: 'Botões e zíperes separados por tipo.' },
          { name: 'Tecido grosso', price: 'R$ 3-6/kg', instructions: 'Retalhos dobrados ou enrolados.' },
        ],
        whereToSell: [
          { item: 'Uniformes inteiros', place: 'Oficinas, pequenas empresas' },
          { item: 'Tecidos grossos', place: 'Costureiras, artesãos' },
        ],
      },
      {
        id: 'calcados',
        name: 'Calçados (parcialmente conservados)',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Calçados', // Placeholder
        parts: [
          { name: 'Calçado inteiro', price: 'R$ 5-15/par', instructions: 'Guardar pares juntos com elástico ou cadarço amarrado.' },
          { name: 'Solado de borracha', price: 'R$ 2-4/kg', instructions: 'Solas em sacos resistentes.' },
          { name: 'Cadarços, palmilhas e fivelas', price: 'R$ 1-3/un.', instructions: 'Cadarços e fivelas em potinhos.' }, 
        ],
        whereToSell: [
          { item: 'Calçados inteiros', place: 'Bazares, feiras, brechós' },
          { item: 'Solados e partes', place: 'Recicladoras de borracha, artesãos' },
        ],
      },
      {
        id: 'retalhos-limpos',
        name: 'Retalhos Limpos (de qualquer tecido)',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Retalhos', // Placeholder
        parts: [
          { name: 'Retalho liso ou estampado', price: 'R$ 2-5/kg', instructions: 'Separar por cor e tipo de tecido. Guardar em sacos transparentes ou caixas.' },
          { name: 'Tecidos coloridos', price: 'mais valorizados por artesãos', instructions: 'Nunca misturar com pano sujo ou contaminado.' },
        ],
        whereToSell: [
          { item: 'Retalhos diversos', place: 'Ateliês, costureiras, ONGs' },
        ],
      },
  ],
  'Papéis e Papelões': [
    {
      id: 'livros-didaticos',
      name: 'Livros Didáticos',
      image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Livros', // Placeholder
      parts: [
        { name: 'Livro inteiro (sem rasgos)', price: 'R$ 2-5/un.', instructions: 'Livros inteiros em pilhas ou caixas.' },
        { name: 'Capas duras (reaproveitáveis)', price: 'para artesanato ou forro de caixas', instructions: 'Separar os rasgados para reciclagem. Guardar em lugar seco.' },
        { name: 'Folhas coloridas ou diagramadas', price: 'para reuso ou arte', instructions: 'Mesmas instruções para capas duras.' },
      ],
      whereToSell: [
        { item: 'Livros inteiros', place: 'Sebos, feiras, ONGs, escolas' },
        { item: 'Capas e folhas', place: 'Recicladoras, artesãos' },
      ],
    },
    {
      id: 'revistas-antigas',
      name: 'Revistas Antigas',
      image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Revistas', // Placeholder
      parts: [
        { name: 'Revista inteira (colecionável ou temática)', price: 'R$ 1-3/un.', instructions: 'Guardar em pilhas separadas por tipo ou ano. Manter longe de água e umidade.' },
        { name: 'Imagens e páginas coloridas', price: 'para artesanato, recorte, colagem', instructions: 'Separar capas rasgadas para reciclagem.' },
      ],
      whereToSell: [
        { item: 'Revistas inteiras', place: 'Sebos, brechós, colecionadores' },
        { item: 'Páginas soltas', place: 'Artesãos, escolas, reciclagem' },
      ],
    },
    {
        id: 'jornais',
        name: 'Jornais',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Jornais', // Placeholder
        parts: [
          { name: 'Jornal inteiro', price: 'R$ 0,50-1/kg', instructions: 'Amarrar com barbante ou fita. Armazenar em local seco e sem mofo. Nunca molhar ou misturar com papel sujo.' },
          { name: 'Folhas para embrulho ou limpeza', price: 'reutilização caseira ou comercial', instructions: 'Mesmas instruções para jornal inteiro.' },
        ],
        whereToSell: [
          { item: 'Jornais', place: 'Recicladoras, depósitos de papel' },
        ],
      },
      {
        id: 'caixas-sapato',
        name: 'Caixas de Sapato',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Caixas+Sapato', // Placeholder
        parts: [
          { name: 'Caixa inteira', price: 'R$ 0,50-1/un.', instructions: 'Desmontar e empilhar para economizar espaço. Separar tampas das bases. Evitar umidade.' },
          { name: 'Papelão interno', price: 'R$ 0,80-1,20/kg', instructions: 'Mesmas instruções para caixa inteira.' },
        ],
        whereToSell: [
          { item: 'Caixas inteiras', place: 'Lojas, artesãos, papelarias' },
          { item: 'Papelão', place: 'Recicladoras de papel' },
        ],
      },
      {
        id: 'papelao-limpo',
        name: 'Papelão Limpo (embalagens em general)',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Papelão+Limpo', // Placeholder
        parts: [
          { name: 'Folhas grandes e limpas', price: 'R$ 0,80-1,50/kg', instructions: 'Empilhar seco, limpo, dobrado. Separar os que estiverem sujos ou rasgados para descarte. Guardar em local sem umidade.' },
          { name: 'Papéis com ondulação interna', price: 'mais valorizado', instructions: 'Mesmas instruções para folhas grandes.' },
        ],
        whereToSell: [
          { item: 'Papelão limpo', place: 'Recicladoras, ferros' },
          { item: 'Caixas especiais', place: 'Pequenos comércios' },
        ],
      },
      {
        id: 'cadernos-usados',
        name: 'Cadernos Usados',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Cadernos', // Placeholder
        parts: [
          { name: 'Folhas em branco', price: 'R$ 0,50-1/kg', instructions: 'Separar folhas boas e capas. Guardar folhas soltas em envelopes ou sacos fechados.' },
          { name: 'Espiral de metal ou plástico', price: 'R$ 3-5/kg', instructions: 'Espirais enrolados juntos em potes ou amarrados.' },
          { name: 'Capas duras', price: 'para reaproveitamento artesanal', instructions: 'Mesmas instruções para folhas em branco.' },
        ],
        whereToSell: [
          { item: 'Papel em branco', place: 'Escolas, recicladoras' },
          { item: 'Capas e espirais', place: 'Artesãos, recicladores' },
        ],
      },
  ],
  Plásticos: [
    {
      id: 'garrafas-pet',
      name: 'Garrafas PET (refrigerantes, sucos, água)',
      image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Garrafas+PET', // Placeholder
      parts: [
        { name: 'Corpo da garrafa PET', price: 'R$ 1,50-2/kg', instructions: 'Tirar tampa e rótulo. Lavar e secar as garrafas. Amassar e armazenar em sacos grandes ou prensar.' },
        { name: 'Tampa de plástico', price: 'R$ 1-2/kg', instructions: 'Separada por cor tem mais valor.' },
      ],
      whereToSell: [
        { item: 'PET limpo', place: 'Cooperativas, recicladoras' },
        { item: 'Tampas', place: 'ONGS, recicladoras' },
      ],
    },
    {
      id: 'embalagens-shampoo',
      name: 'Embalagens de Shampoo ou Produtos de Higiene',
      image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Embalagens+Higiene', // Placeholder
      parts: [
        { name: 'Frasco (PEAD ou PP)', price: 'R$ 1-1,50/kg', instructions: 'Retirar o conteúdo e lavar bem. Separar as partes (tampa, frasco, válvula). Deixar secar antes de guardar.' },
        { name: 'Tampa (plástico rígido colorido)', price: 'R$ 1-2/kg', instructions: 'Mesmas instruções para frasco.' },
      ],
      whereToSell: [
        { item: 'Embalagens plásticas', place: 'Cooperativas, recicladoras' },
        { item: 'Válvulas e bicos', place: 'Técnicos, recicladores de peças' },
      ],
    },
    {
        id: 'baldes-plasticos',
        name: 'Baldes Plásticos',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Baldes+Plásticos', // Placeholder
        parts: [
          { name: 'Corpo do balde', price: 'R$ 2-4/un. ou R$ 1-1,50/kg', instructions: 'Lavar bem para tirar qualquer resíduo químico ou alimentício. Armazenar sem empilhar com peso para não quebrar.' },
          { name: 'Alça plástica ou de metal', price: 'R$ 2-4/kg', instructions: 'Alças metálicas separadas por tipo.' },
        ],
        whereToSell: [
          { item: 'Baldes inteiros', place: 'Bazar, feira, obras' },
          { item: 'Plástico quebrado', place: 'Recicladora de plástico' },
        ],
      },
      {
        id: 'potes-sorvete',
        name: 'Potes de Sorvete e Potes Grandes',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Potes+Sorvete', // Placeholder
        parts: [
          { name: 'Pote (PP ou PEAD)', price: 'R$ 0,50-1/un. ou R$ 1-1,20/kg', instructions: 'Lavar e empilhar com tampa. Separar os danificados para reciclagem. Evitar empilhar com sujeira dentro.' },
          { name: 'Tampa (geralmente flexível)', price: 'R$ 1-1,50/kg', instructions: 'Mesmas instruções para pote.' },
        ],
        whereToSell: [
          { item: 'Potes inteiros', place: 'Feiras, bazares, embalagens reutilizáveis' },
          { item: 'Quebrados', place: 'Recicladora de plásticos' },
        ],
      },
      {
        id: 'sacolas-plasticas',
        name: 'Sacolas Plásticas',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Sacolas+Plásticas', // Placeholder
        parts: [
          { name: 'Sacola comum (PEBD)', price: 'R$ 0,80-1,20/kg', instructions: 'Separar as limpas das sujas. Dobrar e guardar em blocos prensados. Separar por tipo (transparente, colorida, grossa).' },
          { name: 'Alça reforçada (sacola de loja)', price: 'uso artesanal, pode ser cortada e reutilizada', instructions: 'Mesmas instruções para sacola comum.' },
        ],
        whereToSell: [
          { item: 'Sacolas limpas', place: 'Recicladoras, ONGs de artesanato' },
        ],
      },
      {
        id: 'brinquedos-plasticos',
        name: 'Brinquedos Plásticos Quebrados',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Brinquedos+Plásticos', // Placeholder
        parts: [
          { name: 'Corpo de plástico rígido (ABS ou PP)', price: 'R$ 1-2/kg', instructions: 'Separar plástico de metal. Guardar por cor ou tipo (facilita revenda para artesanato). Embalar em sacos por categoria.' },
          { name: 'Rodas de plástico ou borracha', price: 'reaproveitáveis', instructions: 'Mesmas instruções para corpo de plástico.' },
        ],
        whereToSell: [
          { item: 'Plástico rígido', place: 'Recicladoras, artesãos' },
          { item: 'Rodas e peças', place: 'Mecânicos' },
        ],
      },
  ],
  Vidros: [
    {
      id: 'garrafas-cerveja',
      name: 'Garrafas de Cerveja (Long Neck e Retornáveis)',
      image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Garrafas+Cerveja', // Placeholder
      parts: [
        { name: 'Garrafa inteira (retornável)', price: 'R$ 0,30-0,50/un.', instructions: 'Embalar em caixas ou sacos de pano resistentes. Evitar estocar garrafas molhadas. Separar as quebradas das inteiras.' },
        { name: 'Tampa metálica', price: 'R$ 4-6/kg', instructions: 'Retirar antes de vender.' },
      ],
      whereToSell: [
        { item: 'Garrafas inteiras', place: 'Depósitos, cervejarias' },
        { item: 'Cacos de vidro limpo', place: 'Recicladoras específicas' },
      ],
    },
    {
      id: 'potes-conserva',
      name: 'Potes de Conserva (azeitonas, palmito, molho)',
      image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Potes+Conserva', // Placeholder
      parts: [
        { name: 'Pote inteiro (vidro limpo)', price: 'R$ 0,20-0,40/un.', instructions: 'Guardar secos e empilhados com tampa. Separar potes quebrados para vidro reciclável. Nunca misturar com cacos soltos.' },
        { name: 'Tampa metálica rosqueável', price: 'R$ 4-6/kg', instructions: 'Pode ser retirada para reaproveitamento artesanal.' },
      ],
      whereToSell: [
        { item: 'Potes inteiros', place: 'Bazar, feira, reciclagem artesanal' },
        { item: 'Tampas metálicas', place: 'Ferros, recicladoras' },
      ],
    },
    {
        id: 'frascos-perfume',
        name: 'Frascos de Perfume e Cosméticos',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Frascos+Cosméticos', // Placeholder
        parts: [
          { name: 'Vidro do frasco', price: 'R$ 1-2/un.', instructions: 'Separar por tipo de frasco. Evitar deixar com resíduos internos. Guardar de pé para evitar que quebrem.' },
          { name: 'Tampa plástica ou metálica', price: 'R$ 2-4/kg', instructions: 'Borrifador pode ser vendido separado para reuso.' },
        ],
        whereToSell: [
          { item: 'Frascos decorativos', place: 'Artesãos, recicladoras' },
          { item: 'Borrifadores/tampas', place: 'Lojas de cosméticos usados' },
        ],
      },
      {
        id: 'vidro-plano',
        name: 'Vidro Plano (espelhos, janelas quebradas, tampos de mesa)',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Vidro+Plano', // Placeholder
        parts: [
          { name: 'Vidro inteiro', price: 'R$ 5-10/m²', instructions: 'Guardar em pé e bem protegido para não quebrar mais. Separar perfis metálicos das bordas. Evitar exposição ao sol (rachaduras).' },
          { name: 'Cacos grandes', price: 'usado em oficinas ou artesanato', instructions: 'Mesmas instruções para vidro inteiro.' },
        ],
        whereToSell: [
          { item: 'Vidro plano', place: 'Vidraçarias, obras' },
          { item: 'Cacos grandes', place: 'Artesãos, mosaico' }, 
        ],
      },
      {
        id: 'cacos-limpos',
        name: 'Cacos Limpos Separados (vidros diversos)',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Cacos+Limpos', // Placeholder
        parts: [
          { name: 'Cacos transparentes', price: 'R$ 0,10-0,20/kg', instructions: 'Separar em baldes, caixas ou garrafões de boca larga. Nunca misturar cores diferentes se possível. Etiquetar os tipos ajuda na revenda.' },
          { name: 'Cacos coloridos', price: 'mais valorizado por tipo', instructions: 'Mesmas instruções para cacos transparentes.' },
        ],
        whereToSell: [
          { item: 'Cacos limpos', place: 'Recicladoras específicas, artesãos' },
        ],
      },
  ],
  Diversos: [
    {
      id: 'pneus',
      name: 'Pneus (carros, motos, bicicletas)',
      image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Pneus', // Placeholder
      parts: [
        { name: 'Pneu inteiro (recauchutagem ou reuso)', price: 'R$ 5-10/un.', instructions: 'Evitar água parada (foco de mosquito). Empilhar com cuidado em local seco. Cortar para diminuir volume, se possível.' },
        { name: 'Aro metálico', price: 'R$ 4-6/kg', instructions: 'Mesmas instruções para pneu inteiro.' },
      ],
      whereToSell: [
        { item: 'Pneus inteiros', place: 'Borracharias, recicladoras' },
        { item: 'Borracha cortada', place: 'Obras, hortas, artesãos' },
      ],
    },
    {
      id: 'isopor',
      name: 'Isopor (embalagens, bandejas, caixas)',
      image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Isopor', // Placeholder
      parts: [
        { name: 'Placas inteiras (caixas grandes)', price: 'R$ 1-1,50/kg', instructions: 'Guardar seco e limpo, longe de calor. Empilhar por tipo (bandeja, placa). Evitar que esfarele, pois perde valor.' },
        { name: 'Bandejas limpas (alimentação)', price: 'artesanato, construção', instructions: 'Mesmas instruções para placas inteiras.' },
      ],
      whereToSell: [
        { item: 'Isopor limpo', place: 'Recicladoras especializadas' },
        { item: 'Artesanato', place: 'ONGS, escolas, ateliês' },
      ],
    },
    {
        id: 'lampadas-fluorescentes',
        name: 'Lâmpadas Fluorescentes Usadas',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Lâmpadas', // Placeholder
        parts: [
          { name: 'Tubo de vidro', price: 'R$ 0,10-0,20/kg', instructions: 'Importante: Sempre manusear com luvas e NÃO QUEBRAR. Levar a centros de coleta específicos ou pontos de entrega voluntária (PEV).' },
          { name: 'Terminais metálicos', price: 'R$ 5-7/kg', instructions: 'Guardar seco e limpo, longe de calor. Empilhar por tipo.' },
        ],
        whereToSell: [
          { item: 'Lâmpadas inteiras', place: 'Pontos de coleta pública' },
          { item: 'Partes metálicas', place: 'Sucateiros, recicladoras' },
        ],
      },
      {
        id: 'oleo-cozinha',
        name: 'Óleo de Cozinha Usado',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Óleo+Cozinha', // Placeholder
        parts: [
          { name: 'Óleo usado (purificado)', price: 'R$ 1-1,50/litro', instructions: 'Coletar em garrafas PET limpas. Armazenar em local fresco e fechado. Evitar contato com água ou sujeira.' },
          { name: 'Garrafa PET', price: 'R$ 1,50-2/kg', instructions: 'Mesmas instruções para óleo usado.' },
        ],
        whereToSell: [
          { item: 'Óleo usado', place: 'ONGs ambientais, empresas de biodiesel' },
          { item: 'Garrafa PET', place: 'Recicladoras comuns' },
        ],
      },
      {
        id: 'cartuchos-tinta-vazios',
        name: 'Cartuchos de Tinta Vazios',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Cartuchos', // Placeholder
        parts: [
          { name: 'Cartucho inteiro', price: 'R$ 1-3/un.', instructions: 'Separar por marca e modelo. Armazenar sem vazamento ou tinta líquida. Evitar quebrar partes internas.' },
          { name: 'Cabeça de impressão', price: 'reaproveitada ou reciclável', instructions: 'Mesmas instruções para cartucho inteiro.' },
        ],
        whereToSell: [
          { item: 'Cartuchos', place: 'Lojas de recarga, ONGs' },
          { item: 'Circuitos', place: 'Eletrônicos recicláveis' },
        ],
      },
  ],
  'Componentes e Peças Mistas': [
    {
      id: 'fontes-computador',
      name: 'Fontes de Computador',
      image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Fontes+Computador', // Placeholder
      parts: [
        { name: 'Carcaça metálica', price: 'R$ 2-5/kg', instructions: 'Armazenar desmontada por partes.' },
        { name: 'Fios de cobre interno', price: 'R$ 30-40/kg', instructions: 'Separar o cobre em local seguro.' },
        { name: 'Cooler (ventoinha)', price: 'R$ 3-5/un.', instructions: 'Armazenar circuitos e conectores em caixas pequenas.' },
      ],
      whereToSell: [
        { item: 'Cobre', place: 'Sucateiros, recicladoras' },
        { item: 'Placa de circuito', place: 'Recicladoras de eletrônicos' },
      ],
    },
    {
      id: 'aparelhos-dvd-bluray',
      name: 'Aparelhos de DVD / Blu-Ray',
      image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=DVD+Blu-Ray', // Placeholder
      parts: [
        { name: 'Carcaça metálica ou plástica', price: 'R$ 1-4/kg', instructions: 'Separar partes metálicas, elétricas e plásticas. Armazenar em caixas rotuladas. Embalar as placas com cuidado (evitar quebrar).' },
        { name: 'Placa de circuito interno', price: 'R$ 15-20/kg', instructions: 'Mesmas instruções para carcaça.' },
      ],
      whereToSell: [
        { item: 'Circuitos', place: 'Recicladoras de eletrônicos' },
        { item: 'Mecânica do leitor', place: 'Técnicos ou lojas de conserto' },
      ],
    },
    {
        id: 'liquidificadores-quebrados',
        name: 'Liquidificadores Quebrados',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Liquidificador', // Placeholder
        parts: [
          { name: 'Motor interno (cobre)', price: 'R$ 30-40/kg', instructions: 'Separar motor, plástico e inox. Lavar o copo e a tampa antes de armazenar. Guardar as lâminas com segurança (evitar cortes).' },
          { name: 'Lâminas (aço inox)', price: 'R$ 6-8/kg', instructions: 'Mesmas instruções para motor.' },
        ],
        whereToSell: [
          { item: 'Motor/lâmina', place: 'Ferros, técnicos' },
          { item: 'Plásticos', place: 'Recicladoras' },
        ],
      },
      {
        id: 'nobreaks-estabilizadores',
        name: 'Nobreaks / Estabilizadores',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Nobreak', // Placeholder
        parts: [
          { name: 'Bateria interna (chumbo ácido)', price: 'R$ 5-10/un.', instructions: 'Armazenar a bateria separada e em local ventilado. Proteger placas com plástico bolha ou caixa firme. Classificar os conectores por tipo.' },
          { name: 'Transformador interno (cobre)', price: 'R$ 30-40/kg', instructions: 'Mesmas instruções para bateria.' },
        ],
        whereToSell: [
          { item: 'Baterias', place: 'Coleta ambiental, recicladoras especializadas' },
          { item: 'Transformador', place: 'Ferros, recicladoras' },
        ],
      },
      {
        id: 'carregadores-grandes',
        name: 'Carregadores Grandes',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Carregador', // Placeholder
        parts: [
          { name: 'Placa interna (fonte chaveada)', price: 'R$ 15-20/kg', instructions: 'Cortar cabos se necessário. Separar conectores bons dos danificados. Armazenar por tamanho ou uso (TV, impressora, notebook).' },
          { name: 'Fios e conectores (cobre + plástico)', price: 'R$ 4-6/kg', instructions: 'Mesmas instruções para placa interna.' },
        ],
        whereToSell: [
          { item: 'Fios/conectores', place: 'Ferros, recicladoras' },
          { item: 'Placas internas', place: 'Recicladoras de eletrônicos' },
        ],
      },
      {
        id: 'fogoes-danificados',
        name: 'Fogões Danificados (domésticos)',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Fogão', // Placeholder
        parts: [
          { name: 'Grades e trempes (ferro fundido ou aço)', price: 'R$ 3-6/kg', instructions: 'Separar ferro, alumínio, vidro e cobre. Manter peças pequenas organizadas por tipo. Armazenar partes afiadas com segurança.' },
          { name: 'Forno e tampa (aço + vidro)', price: 'vidro pode ser vendido separado', instructions: 'Mesmas instruções para grades.' },
        ],
        whereToSell: [
          { item: 'Metais e grades', place: 'Ferros, recicladoras' },
          { item: 'Fios e botões', place: 'Sucateiros, técnicos' },
        ],
      },
      {
        id: 'microondas-quebrado',
        name: 'Micro-ondas Quebrado',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Micro-ondas', // Placeholder
        parts: [
          { name: 'Transformador de alta voltagem (cobre)', price: 'R$ 30-40/kg', instructions: 'Desconectar todos os fios com cuidado. Guardar os motores e transformadores em caixas reforçadas. Armazenar vidros separados dos metais.' },
          { name: 'Motor do prato giratório', price: 'R$ 5-8/un.', instructions: 'Mesmas instruções para transformador.' },
        ],
        whereToSell: [
          { item: 'Transformador, motor', place: 'Técnicos, sucateiros' },
          { item: 'Placas eletrônicas', place: 'Recicladoras de eletrônicos' },
        ],
      },
  ],
  'Itens Comuns Subvalorizados': [
    {
      id: 'canetas-lapis',
      name: 'Canetas e Lápis Usados',
      image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Canetas+Lápis', // Placeholder
      parts: [
        { name: 'Corpo plástico da caneta', price: 'R$ 1,00-2,00/kg', instructions: 'Separar plásticos dos metais. Armazenar cargas secas em latas. Juntar lápis pequenos por cor e tamanho.' },
        { name: 'Carga com tinta seca (metal fino)', price: 'R$ 3-5/kg', instructions: 'Mesmas instruções para corpo plástico.' },
      ],
      whereToSell: [
        { item: 'Plástico', place: 'Recicladoras plásticas' },
        { item: 'Cargas metálicas', place: 'Sucateiros, recicladoras' },
      ],
    },
    {
      id: 'pregadores-roupa',
      name: 'Pregadores de Roupa (madeira e plástico)',
      image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Pregadores', // Placeholder
      parts: [
        { name: 'Corpo de madeira (pinus)', price: 'usado para artesanato, maquetes', instructions: 'Separar plástico, madeira e metal. Evitar molhar para não enferrujar as molas. Guardar partes iguais em potes distintos.' },
        { name: 'Mola metálica', price: 'R$ 4-6/kg', instructions: 'Mesmas instruções para corpo de madeira.' },
      ],
      whereToSell: [
        { item: 'Molas', place: 'Recicladoras de metais' },
        { item: 'Madeiras', place: 'Oficinas artesanais' },
      ],
    },
    {
        id: 'pentes-escovas',
        name: 'Pentes e Escovas de Cabelo',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Pentes+Escovas', // Placeholder
        parts: [
          { name: 'Plástico rígido', price: 'R$ 1-2/kg', instructions: 'Separar plásticos das cerdas e metais. Guardar em caixas pequenas, por tipo. Higienizar antes de separar.' },
          { name: 'Cerdas (nylon ou sintético)', price: 'para reaproveitamento artesanal', instructions: 'Mesmas instruções para plástico rígido.' },
        ],
        whereToSell: [
          { item: 'Pentes inteiros', place: 'Brechós, bazares' },
          { item: 'Plástico e metal', place: 'Recicladoras' },
        ],
      },
      {
        id: 'bijuterias',
        name: 'Bijuterias e Peças Metálicas de Fantasia',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Bijuterias', // Placeholder
        parts: [
          { name: 'Correntes e brincos', price: 'R$ 4-8/kg', instructions: 'Separar metais por cor (prata, dourado, bronze). Guardar pedrinhas em potes transparentes. Usar envelopes para peças frágeis.' },
          { name: 'Pedras acrílicas', price: 'utilizadas em artesanato ou revenda', instructions: 'Mesmas instruções para correntes.' },
        ],
        whereToSell: [
          { item: 'Metais', place: 'Sucateiros, ferros' },
          { item: 'Pedras/fechos', place: 'Artesãos, ateliês de bijuteria' },
        ],
      },
      {
        id: 'ziperes-botoes',
        name: 'Zíperes e Botões',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Zíperes+Botões', // Placeholder
        parts: [
          { name: 'Zíperes inteiros', price: 'R$ 0,50-1/un.', instructions: 'Separar zíperes bons dos quebrados. Guardar botões separados por cor e tamanho. Usar caixas com divisórias ou envelopes.' },
          { name: 'Cursor metálico', price: 'R$ 4-6/kg', instructions: 'Mesmas instruções para zíperes.' },
        ],
        whereToSell: [
          { item: 'Botões', place: 'Artesanato, brechós' },
          { item: 'Zíperes', place: 'Oficinas de costura' },
        ],
      },
      {
        id: 'espelhos-pequenos',
        name: 'Espelhos Pequenos',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Espelhos', // Placeholder
        parts: [
          { name: 'Vidro plano', price: 'R$ 0,20-0,50/kg', instructions: 'Separar espelhos inteiros dos quebrados. Proteger com papelão para não lascar/quebrar. Evitar empilhar diretamente.' },
          { name: 'Moldura', price: 'reutilizável ou reciclável', instructions: 'Mesmas instruções para vidro plano.' },
        ],
        whereToSell: [
          { item: 'Vidro plano', place: 'Recicladoras, vidraçarias' },
          { item: 'Molduras', place: 'Ateliês, bazares' },
        ],
      },
      {
        id: 'elasticos-cordas',
        name: 'Elásticos e Cordas',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Elásticos+Cordas', // Placeholder
        parts: [
          { name: 'Cordões de algodão ou nylon', price: 'reutilizáveis ou vendidos por peso', instructions: 'Separar por tipo e cor. Evitar embaraçar (enrolar e prender com lacre). Guardar em caixas pequenas.' },
          { name: 'Elásticos grossos', price: 'reaproveitados por artesãos e costureiras', instructions: 'Mesmas instruções para cordões.' },
        ],
        whereToSell: [
          { item: 'Cordas e elásticos', place: 'Costureiras, cooperativas de reaproveitamento' },
          { item: 'Fitas plásticas', place: 'Recicladoras de plásticos' },
        ],
      },
      {
        id: 'cadarcos-fivelas',
        name: 'Cadarços e Fivelas',
        image: 'https://placehold.co/150x150/8D6E63/FFFFFF?text=Cadarços+Fivelas', // Placeholder
        parts: [
          { name: 'Cadarços de algodão/nylon', price: 'reutilizáveis', instructions: 'Separar cadarços por tipo e tamanho. Lavar antes, se necessário.' },
          { name: 'Fivelas metálicas ou plásticas', price: 'R$ 4-6/kg', instructions: 'Guardar fivelas em caixas metálicas.' },
        ],
        whereToSell: [
          { item: 'Cadarços', place: 'Brechós, oficinas de sapato' },
          { item: 'Fivelas', place: 'Ferros, recicladoras' },
        ],
      },
      {
        id: 'cabides',
        name: 'Cabides (plástico, madeira, metal)',
        image: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Cabides', // Placeholder
        parts: [
          { name: 'Cabide inteiro', price: 'R$ 1-2/un.', instructions: 'Separar os inteiros dos quebrados. Empilhar por tipo. Remover ganchos, se possível.' },
          { name: 'Gancho metálico', price: 'R$ 4-6/kg', instructions: 'Mesmas instruções para cabide inteiro.' },
        ],
        whereToSell: [
          { item: 'Cabides bons', place: 'Brechós, bazares' },
          { item: 'Metais e plásticos', place: 'Recicladoras' },
        ],
      },
  ],
};

// Componente da tela de Login
function LoginScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [selectedCooperative, setSelectedCooperative] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Lista de cooperativas (você pode expandir esta lista)
  const cooperatives = [
    { id: 'coop1', name: 'Coop. Renascer DF' },
    { id: 'coop2', name: 'Coop. Recicla Brasília' },
    { id: 'coop3', name: 'Associação Catadores Verde' },
    { id: 'coop4', name: 'Recicla Tudo - Asa Norte' },
    { id: 'coop5', name: 'EcoCoop DF Sul' },
  ];

  const handleLogin = () => {
    if (userName && selectedCooperative) {
      // Aqui você pode adicionar a lógica de autenticação ou de persistência de dados do usuário
      // Por enquanto, vamos navegar para a tela principal (Home)
      navigation.replace('Home', { userName, selectedCooperative });
    } else {
      // Em um app real, você mostraria uma mensagem de erro ao usuário
      console.log('Por favor, preencha seu nome e selecione uma cooperativa.');
    }
  };

  const renderCooperativeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cooperativeItem}
      onPress={() => {
        setSelectedCooperative(item.name);
        setIsModalVisible(false);
      }}
    >
      <Text style={styles.cooperativeItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.loginContainer}>
        <Image 
          source={{ uri: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=EcoLogo' }} // Placeholder para o logo
          style={styles.loginLogo}
        />
        <Text style={styles.loginHeader}>Bem-vindo(a) ao EcoVendas!</Text>
        <Text style={styles.loginSubHeader}>Faça seu login para continuar:</Text>

        <TextInput
          style={styles.loginInput}
          placeholder="Seu nome"
          placeholderTextColor={Colors.lightBrown}
          value={userName}
          onChangeText={setUserName}
        />

        <TouchableOpacity style={styles.dropdownButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.dropdownButtonText}>
            {selectedCooperative ? selectedCooperative : 'Selecione sua cooperativa'}
          </Text>
          <MaterialCommunityIcons name="menu-down" size={24} color={Colors.white} />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                data={cooperatives}
                renderItem={renderCooperativeItem}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.modalCloseButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


// Componente da tela inicial (Home)
function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [filteredMaterials, setFilteredMaterials] = useState([]);

  // Função para lidar com a pesquisa
  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      setFilteredMaterials([]);
      return;
    }

    // Filtra os materiais com base no texto da pesquisa
    const lowercasedText = text.toLowerCase();
    const results = [];
    for (const category in materialsData) {
      materialsData[category].forEach((material) => {
        if (material.name.toLowerCase().includes(lowercasedText)) {
          results.push(material);
        }
      });
    }
    setFilteredMaterials(results);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Guia de Reaproveitamento</Text>

        {/* Campo de busca */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar material..."
            placeholderTextColor={Colors.lightBrown}
            value={searchText}
            onChangeText={handleSearch}
          />
          {/* Utiliza MaterialCommunityIcons diretamente como componente */}
          <MaterialCommunityIcons name="magnify" size={24} color={Colors.brown} style={styles.searchIcon} />
        </View>

        {/* Exibe resultados da pesquisa ou categorias */}
        {filteredMaterials.length > 0 ? (
          <View style={styles.searchResultsContainer}>
            <Text style={styles.sectionTitle}>Resultados da Busca:</Text>
            {filteredMaterials.map((material) => (
              <TouchableOpacity
                key={material.id}
                style={styles.materialCard}
                onPress={() => navigation.navigate('MaterialDetail', { material, category: 'Busca' })}
              >
                <Image source={{ uri: material.image }} style={styles.materialImage} />
                <Text style={styles.materialCardText}>{material.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>Categorias de Materiais</Text>
            {/* Grid de categorias */}
            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.name}
                  style={[styles.categoryCard, { backgroundColor: category.color }]}
                  onPress={() => navigation.navigate('CategoryDetail', { categoryName: category.name })}
                >
                  {/* Utiliza MaterialCommunityIcons diretamente como componente */}
                  <MaterialCommunityIcons name={category.icon} size={40} color={Colors.white} />
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Componente da tela de detalhes da categoria
function CategoryDetailScreen({ route, navigation }) {
  const { categoryName } = route.params;
  const materials = materialsData[categoryName] || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.categoryDetailHeader}>{categoryName}</Text>
        {materials.length > 0 ? (
          materials.map((material) => (
            <TouchableOpacity
              key={material.id}
              style={styles.materialCard}
              onPress={() => navigation.navigate('MaterialDetail', { material, category: categoryName })}
            >
              <Image source={{ uri: material.image }} style={styles.materialImage} />
              <Text style={styles.materialCardText}>{material.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noDataText}>Nenhum material encontrado nesta categoria.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Componente da tela de detalhes do material
function MaterialDetailScreen({ route }) {
  const { material, category } = route.params; // category is passed to allow navigating back to the correct category list

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.materialDetailHeader}>{material.name}</Text>
        <Image source={{ uri: material.image }} style={styles.materialDetailImage} />

        <Text style={styles.sectionTitle}>Partes para Revenda:</Text>
        {material.parts.map((part, index) => (
          <View key={index} style={styles.partCard}>
            <Text style={styles.partName}>{part.name}</Text>
            <Text style={styles.partPrice}>Preço Médio: {part.price}</Text>
            <Text style={styles.partInstructions}>Instruções: {part.instructions}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Onde Revender (Simulado):</Text>
        {material.whereToSell.map((item, index) => (
          <View key={index} style={styles.whereToSellCard}>
            <Text style={styles.whereToSellItem}>Material: {item.item}</Text>
            <Text style={styles.whereToSellPlace}>Local: {item.place}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.simulatedButton}>
          <Text style={styles.simulatedButtonText}>Ver Locais Próximos (Simulado)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.simulatedButton}>
          <Text style={styles.simulatedButtonText}>Atualizar Preços (Simulado)</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos do aplicativo
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background, // Fundo geral do app
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Ajuste para Android StatusBar
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.darkGreen,
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.lightBrown,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: Colors.text,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.brown,
    marginTop: 15,
    marginBottom: 10,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: Dimensions.get('window').width / 2 - 25, // Ajusta para 2 colunas com espaçamento
    height: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    padding: 10,
  },
  categoryText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  materialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  materialImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  materialCardText: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: 'bold',
    flexShrink: 1, // Permite que o texto quebre a linha
  },
  categoryDetailHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkGreen,
    marginBottom: 20,
    textAlign: 'center',
  },
  materialDetailHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.darkGreen,
    marginBottom: 15,
    textAlign: 'center',
  },
  materialDetailImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  partCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: Colors.primaryGreen,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  partName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  partPrice: {
    fontSize: 15,
    color: Colors.brown,
    marginBottom: 5,
  },
  partInstructions: {
    fontSize: 14,
    color: Colors.text,
    fontStyle: 'italic',
  },
  whereToSellCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: Colors.brown,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  whereToSellItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 3,
  },
  whereToSellPlace: {
    fontSize: 15,
    color: Colors.darkGreen,
  },
  simulatedButton: {
    backgroundColor: Colors.darkGreen,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 7,
  },
  simulatedButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: Colors.text,
  },
  searchResultsContainer: {
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  // Estilos específicos da tela de Login
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  loginLogo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
  },
  loginHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.darkGreen,
    marginBottom: 10,
    textAlign: 'center',
  },
  loginSubHeader: {
    fontSize: 18,
    color: Colors.text,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginInput: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.lightBrown,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: Colors.primaryGreen,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  dropdownButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.darkGreen,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 7,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cooperativeItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBrown,
  },
  cooperativeItemText: {
    fontSize: 16,
    color: Colors.text,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.lightBrown,
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: Colors.brown,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Componente principal do aplicativo
export default function App() {
  // Carrega as fontes dos ícones. MaterialCommunityIcons.font é um objeto que contém as informações da fonte.
  const [fontsLoaded] = useFonts(MaterialCommunityIcons.font);


  // Exibe um indicador de carregamento enquanto as fontes não são carregadas
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.darkGreen} />
        <Text style={{ marginTop: 10, color: Colors.text }}>Carregando ícones...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* Removidos espaços em branco/quebras de linha entre os Screen components */}
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} options={({ route }) => ({ title: route.params.categoryName, headerStyle: { backgroundColor: Colors.darkGreen, }, headerTintColor: Colors.white, headerTitleStyle: { fontWeight: 'bold', }, })} />
        <Stack.Screen name="MaterialDetail" component={MaterialDetailScreen} options={({ route }) => ({ title: route.params.material.name, headerStyle: { backgroundColor: Colors.darkGreen, }, headerTintColor: Colors.white, headerTitleStyle: { fontWeight: 'bold', }, })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
