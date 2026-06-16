import { useState, useMemo } from 'react';

export interface VideoTimestamp {
  time: string;
  seconds: number;
  label: string;
}

export interface KDGVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  publishedAt: string;
  category: string;
  summary: string;
  timestamps: VideoTimestamp[];
  discussionIdeas: string[];
}

// Rich local catalog of KDG Videos (using real gameplay video IDs for embedding)
const KDG_VIDEOS_DATABASE: KDGVideo[] = [
  {
    id: 'P_B_7LqXjO0',
    title: 'ВЕДЬМАК 3: ДИКАЯ ОХОТА — Новое прохождение на Смерти! #1: Белый Сад',
    description: 'Добро пожаловать на новое детальное прохождение Ведьмак 3: Дикая Охота (The Witcher 3: Wild Hunt) на максимальной сложности "На смерть!" с дополнениями Каменные Сердца и Кровь и Вино. Сегодня начинаем наше приключение в Белом Саду, проходим все квесты, зачищаем знаки вопроса и готовимся к битве с грифоном!',
    thumbnail: 'https://img.youtube.com/vi/P_B_7LqXjO0/mqdefault.jpg',
    duration: '1:45:20',
    views: '128K просмотров',
    publishedAt: '3 дня назад',
    category: 'Witcher 3',
    summary: 'В этом видео Добрый Геймер начинает новое полное прохождение легендарной RPG «Ведьмак 3: Дикая Охота» на максимальном уровне сложности «На смерть!». Первая серия посвящена стартовой локации — Белому Саду. Автор детально проходит сюжетные задания (разговор в таверне, встреча с Йеннифэр в воспоминаниях), зачищает все точки интереса («вопросики»), собирает ценные рецепты для алхимии, создает первые мечи школы Змеи и готовится к заказу на Грифона.',
    timestamps: [
      { time: '00:00', seconds: 0, label: 'Вступление и настройки сложности' },
      { time: '12:30', seconds: 750, label: 'Бой с гулями и встреча с Весемиром' },
      { time: '28:15', seconds: 1695, label: 'Прибытие в таверну Белого Сада' },
      { time: '45:10', seconds: 2710, label: 'Квест «Лихо у колодца» (Прохождение полуденницы)' },
      { time: '1:10:05', seconds: 4205, label: 'Поиск чертежей мечей школы Змеи' },
      { time: '1:32:40', seconds: 5560, label: 'Подготовка к бою с королевским грифоном' }
    ],
    discussionIdeas: [
      'Какую сборку (билд) лучше всего качать на сложности "На смерть" в обновленной версии игры?',
      'Стоит ли зачищать абсолютно все знаки вопроса в Белом Саду перед отправкой в Вызиму?',
      'Какое зелье/масло больше всего помогает при битве с Грифоном?'
    ]
  },
  {
    id: 'c4sO1d9XNns',
    title: 'CYBERPUNK 2077: PHANTOM LIBERTY — Полное прохождение #1: Догтаун и спасение Президента',
    description: 'Начинаем прохождение сюжетного дополнения Phantom Liberty (Призрачная Свобода) для Cyberpunk 2077. Мы отправляемся в опасный закрытый район Найт-Сити — Пёсий город (Dogtown), чтобы спасти президента НСША Розалинд Майерс после крушения её шаттла.',
    thumbnail: 'https://img.youtube.com/vi/c4sO1d9XNns/mqdefault.jpg',
    duration: '2:12:45',
    views: '94K просмотров',
    publishedAt: '1 неделю назад',
    category: 'Cyberpunk 2077',
    summary: 'Прохождение начинается с получения звонка от загадочной Сойки (Songbird), которая обещает Ви спасение от чипа Сабуро Арасаки в обмен на спасение президента Майерс. Ви проникает в Пёсий город через заброшенные тоннели под охраной корпорации «Баргест». Основная часть серии сфокусирована на динамичных перестрелках вокруг места крушения шаттла Space Force One и безопасном выводе президента в заброшенное убежище.',
    timestamps: [
      { time: '00:00', seconds: 0, label: 'Вводная часть и звонок Сойки' },
      { time: '18:40', seconds: 1120, label: 'Проникновение в Песий Город (Dogtown)' },
      { time: '40:15', seconds: 2415, label: 'Крушение президентского шаттла' },
      { time: '1:05:30', seconds: 3930, label: 'Спасение Розалинд Майерс из обломков' },
      { time: '1:35:10', seconds: 5710, label: 'Оборона отеля в Песьем Городе от солдат Баргеста' },
      { time: '2:05:00', seconds: 7500, label: 'Разговор по душам с Президентом в убежище' }
    ],
    discussionIdeas: [
      'Верите ли вы Сойке с самого начала игры, или её мотивы кажутся подозрительными?',
      'Как вам атмосфера Пёсьего города по сравнению со стандартными районами Найт-Сити?',
      'Какое оружие эффективнее против бойцов Хансена на высоком уровне сложности?'
    ]
  },
  {
    id: 'h86jV6V-r1A',
    title: 'ГОТИКА 2: НОЧЬ ВОРОНА — Возвращение легенды! #1: Из башни Ксардаса в Хоринис',
    description: 'Культовая классика RPG! Начинаем прохождение Готики 2 с аддоном Ночь Ворона. Безымянный герой просыпается в башне некроманта Ксардаса после победы над Спящим. Нам предстоит отправиться в город Хоринис, заручиться поддержкой магов огня, паладинов и добыть Глаз Инноса.',
    thumbnail: 'https://img.youtube.com/vi/h86jV6V-r1A/mqdefault.jpg',
    duration: '1:50:30',
    views: '156K просмотров',
    publishedAt: '2 недели назад',
    category: 'Gothic',
    summary: 'Первый эпизод ностальгического прохождения Gothic 2: Night of the Raven. Герой узнает от Ксардаса о новой угрозе — армии драконов. В этой серии: обыск башни Ксардаса, встреча с Лестером в долине, первый бой с молодыми волками и гоблинами, встреча с Кавалорном и разбойниками, а также хитрый способ проникновения в Хоринис в обход стражи у ворот.',
    timestamps: [
      { time: '00:00', seconds: 0, label: 'Вводное интро и диалог с Ксардасом' },
      { time: '15:20', seconds: 920, label: 'Спуск в долину к Лестеру' },
      { time: '34:40', seconds: 2080, label: 'Встреча с Кавалорном и разборка с бандитами' },
      { time: '55:15', seconds: 3315, label: 'Ферма Лобарта и покупка одежды крестьянина' },
      { time: '1:12:45', seconds: 4365, label: 'Хитрый проход в Хоринис через стены (фарм опыта)' },
      { time: '1:30:20', seconds: 5420, label: 'Знакомство с мастерами Хориниса и Ватрасом' }
    ],
    discussionIdeas: [
      'Какой гильдии отдать предпочтение в этом прохождении: Наемники, Паладины или Маги Огня?',
      'Стоит ли сразу качать силу/ловкость или лучше сэкономить очки обучения для прокачки кругов магии?',
      'Какой ваш любимый квест в первой главе Хориниса?'
    ]
  },
  {
    id: 'zE48w3c3vE4',
    title: 'RED DEAD REDEMPTION 2 — Шедевр Rockstar #1: Законники и Снежная буря',
    description: 'Начинаем кинематографичное прохождение Red Dead Redemption 2. Глава 1: Колтер. После неудачного ограбления в Блэкуотере банда Датча ван дер Линде пытается выжить в суровых зимних условиях в горах Гризли.',
    thumbnail: 'https://img.youtube.com/vi/zE48w3c3vE4/mqdefault.jpg',
    duration: '1:30:00',
    views: '82K просмотров',
    publishedAt: '3 недели назад',
    category: 'RPG',
    summary: 'Первая серия прохождения RDR2 посвящена выживанию банды Датча в заброшенном шахтерском городке Колтер во время метели. Главный герой Артур Морган вместе с Датчем отправляется на поиски припасов, натыкается на лагерь банды О\'Дрисколлов на ранчо Сэйди Адлер, спасает её саму и спасает замерзающего Джона Марстона в горах.',
    timestamps: [
      { time: '00:00', seconds: 0, label: 'Начало игры и кинематографичное вступление' },
      { time: '12:00', seconds: 720, label: 'Поиски припасов с Датчем' },
      { time: '26:50', seconds: 1610, label: 'Перестрелка с О\'Дрисколлами на ранчо' },
      { time: '48:30', seconds: 2910, label: 'Спасение Сэйди Адлер' },
      { time: '1:05:00', seconds: 3900, label: 'Поиски Джона Марстона на заснеженной вершине' },
      { time: '1:20:45', seconds: 4845, label: 'Первое ограбление поезда Левитика Корнуолла' }
    ],
    discussionIdeas: [
      'Как вам темп первой главы? Считаете ли вы зимний пролог затянутым или он отлично задает атмосферу?',
      'Поведение Артура Моргана на ранчо: спасение Сэйди как первый шаг к искуплению.',
      'Какая деталь в RDR2 поразила вас больше всего при первом просмотре?'
    ]
  },
  {
    id: 'QeDlh7q_wQY',
    title: 'GTA V — Прохождение Истории #1: Ограбление в Людендорфе и Франклин',
    description: 'Вспоминаем классику Rockstar! Начинаем прохождение сюжетного режима Grand Theft Auto V. Пролог в заснеженном Северном Янктоне 9 лет назад, и начало приключений Франклина Клинтона в солнечном Лос-Сантосе.',
    thumbnail: 'https://img.youtube.com/vi/QeDlh7q_wQY/mqdefault.jpg',
    duration: '1:15:10',
    views: '67K просмотров',
    publishedAt: '1 месяц назад',
    category: 'Indie & Retro',
    summary: 'Старт прохождения GTA V. Пролог показывает ограбление банка Майклом, Тревором и Брэдом в Северном Янктоне, завершившееся трагедией. Девять лет спустя действие переносится в Лос-Сантос, где Франклин Клинтон и его друг Ламар занимаются конфискацией автомобилей для автосалона Симона Етаряна.',
    timestamps: [
      { time: '00:00', seconds: 0, label: 'Пролог: Ограбление банка в Северном Янктоне' },
      { time: '14:20', seconds: 860, label: 'Встреча с Франклином и Ламаром' },
      { time: '28:10', seconds: 1690, label: 'Конфискация спортивных машин и гонка по городу' },
      { time: '45:00', seconds: 2700, label: 'Квест «Франклин и Ламар» и возвращение домой' },
      { time: '58:40', seconds: 3520, label: 'Визит к Симону Етаряну и драка с байкерами' },
      { time: '1:10:15', seconds: 4215, label: 'Знакомство с Майклом де Сантой' }
    ],
    discussionIdeas: [
      'Кто ваш любимый персонаж из троицы героев GTA V и почему?',
      'Считаете ли вы ограбления лучшей механикой в игре?',
      'Сравнение физики вождения GTA V с GTA IV: какая вам ближе?'
    ]
  }
];

export function useYouTube() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // List of unique categories for filters
  const categories = useMemo(() => {
    const list = new Set(KDG_VIDEOS_DATABASE.map(v => v.category));
    return ['All', ...Array.from(list)];
  }, []);

  // Filtered videos based on category and search query
  const filteredVideos = useMemo(() => {
    return KDG_VIDEOS_DATABASE.filter(video => {
      const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            video.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Fetch a single video by ID
  const getVideoById = (id: string): KDGVideo | undefined => {
    return KDG_VIDEOS_DATABASE.find(video => video.id === id);
  };

  return {
    videos: filteredVideos,
    allVideos: KDG_VIDEOS_DATABASE,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    getVideoById
  };
}
