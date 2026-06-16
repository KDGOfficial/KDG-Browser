export const MOCK_GAMING_RESPONSES = {
  witcher: [
    "В прохождении «Ведьмака 3» на сложности «На смерть!» Добрый Геймер делает упор на ветку фехтования (Быстрые атаки, Вихрь) и активное использование знаков Квен (для защиты) и Аксий (для контроля врагов). Для борьбы с боссами он рекомендует всегда наносить масла на мечи и вовремя обновлять зелье Ласточки и Гром.",
    "Ключевой момент прохождения в Велене — квесты Кровавого Барона. Рекомендуется тщательно исследовать приют на Кривоуховых топях и прочитать книги о Хозяйках Леса, чтобы сделать правильный выбор, спасающий жену Барона.",
    "В Белом Саду обязательно соберите все места силы (всего их 6). Каждое место силы дает очко умений, что критически важно для раннего развития на максимальной сложности."
  ],
  cyberpunk: [
    "В дополнении Phantom Liberty Пёсий город (Dogtown) контролируется полковником Куртом Хансеном и его группировкой «Баргест». Добрый Геймер советует исследовать переулки на предмет сброшенных грузов (Air Drops) — это лучший источник оранжевого (легендарного) снаряжения.",
    "Для спасения президента Майерс воспользуйтесь скрытным прохождением через технические шахты. Встреча с Розалинд Майерс раскроет её боевой характер: она сама неплохо обращается со штурмовой винтовкой.",
    "Сойка (Songbird) — крайне неоднозначный персонаж. Её мотивы раскроются ближе к финалу, поэтому следите за диалогами и обращайте внимание на её эмоциональное состояние во время миссий."
  ],
  gothic: [
    "В «Готике 2: Ночь Ворона» лучшая гильдия для новичков — Паладины, так как они сочетают крепкую броню, отличные мечи и базовую рунную магию исцеления. Маги Огня требуют глубокого знания игры и бережного расхода маны.",
    "Перед входом в Хоринис обязательно поговорите с Кавалорном и заберите его кожаный доспех. Также не забудьте прокрасться за городскую стену со стороны моря — это даст вам легкий опыт и золото без боя с охраной.",
    "Для победы над драконами в Рудниковой долине используйте свитки призыва «Армии Мрака» или свиток «Сморщивание монстра» — они нейтрализуют сильных противников за секунды."
  ],
  general: [
    "Привет! Я ИИ-помощник KDG Browser. Я могу помочь тебе проанализировать любое видео 'Канала Доброго Геймера', составить краткий обзор прохождения, найти интересные моменты или подсказать тактику борьбы с боссами.",
    "Отличный выбор видео! Это прохождение славится подробным исследованием мира, чтением всех записок и лора, а также ламповой атмосферой в комментариях. Хочешь, я сделаю краткую выжимку?",
    "Для этого прохождения автор рекомендует использовать геймпад и играть на большом экране, чтобы полностью погрузиться в атмосферу шедевра от разработчиков."
  ]
};

export function getLocalAIResponse(prompt: string, videoTitle?: string): string {
  const query = prompt.toLowerCase();
  const title = (videoTitle || '').toLowerCase();

  // Determine context
  if (query.includes('ведьмак') || query.includes('witcher') || query.includes('геральт') || title.includes('ведьмак')) {
    if (query.includes('босс') || query.includes('убить') || query.includes('драться')) {
      return `[Локальный ИИ KDG] ${MOCK_GAMING_RESPONSES.witcher[0]}`;
    }
    if (query.includes('барон') || query.includes('квест') || query.includes('топях')) {
      return `[Локальный ИИ KDG] ${MOCK_GAMING_RESPONSES.witcher[1]}`;
    }
    return `[Локальный ИИ KDG] ${MOCK_GAMING_RESPONSES.witcher[2]}`;
  }

  if (query.includes('киберпанк') || query.includes('cyberpunk') || query.includes('песий') || query.includes('сойка') || title.includes('cyberpunk')) {
    if (query.includes('груз') || query.includes('дроп') || query.includes('оружие')) {
      return `[Локальный ИИ KDG] ${MOCK_GAMING_RESPONSES.cyberpunk[0]}`;
    }
    if (query.includes('президент') || query.includes('майерс')) {
      return `[Локальный ИИ KDG] ${MOCK_GAMING_RESPONSES.cyberpunk[1]}`;
    }
    return `[Локальный ИИ KDG] ${MOCK_GAMING_RESPONSES.cyberpunk[2]}`;
  }

  if (query.includes('готик') || query.includes('gothic') || query.includes('хоринис') || title.includes('готик')) {
    if (query.includes('гильдия') || query.includes('кем играть')) {
      return `[Локальный ИИ KDG] ${MOCK_GAMING_RESPONSES.gothic[0]}`;
    }
    if (query.includes('начало') || query.includes('старт')) {
      return `[Локальный ИИ KDG] ${MOCK_GAMING_RESPONSES.gothic[1]}`;
    }
    return `[Локальный ИИ KDG] ${MOCK_GAMING_RESPONSES.gothic[2]}`;
  }

  // General fallbacks
  if (query.includes('привет') || query.includes('hello') || query.includes('кто ты')) {
    return MOCK_GAMING_RESPONSES.general[0];
  }
  if (query.includes('обзор') || query.includes('выжимка') || query.includes('саммари')) {
    return MOCK_GAMING_RESPONSES.general[1];
  }

  const randomIndex = Math.floor(Math.random() * MOCK_GAMING_RESPONSES.general.length);
  return MOCK_GAMING_RESPONSES.general[randomIndex];
}
