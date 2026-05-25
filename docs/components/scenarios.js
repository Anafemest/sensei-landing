// Sensei demo scenarios — the right-hand terminal cycles through these.
// Each scenario:
//   id            — short slug
//   role          — short label shown as Sensei's job title
//   ticket        — fake ticket id, used in the chrome
//   who           — engineer name/time, left side
//   segments      — user message split into plain text + highlighted code spans
//                   ({ text, code? }) — code: true renders as the "parsed entity" pill
//   statuses      — array of status lines that appear one-by-one in "thinking" phase
//   result        — { rows?, bullets?, note? }
//                     rows    — KV rows ({label, value, ok?, accent?})
//                     bullets — array of strings (rendered as ✓ list)
//                     note    — closing sentence under the card

window.SENSEI_SCENARIOS = [
  {
    id: "analyst",
    role: "AI-аналитик задач",
    ticket: "ISS-054",
    who: "PM · 10:14",
    segments: [
      { text: "Разберись по задаче " },
      { text: "ISS-054", code: true },
      { text: ": что уже сделали, где сейчас стопор и что делать дальше?" },
    ],
    statuses: [
      "Загружаю переписку, комментарии и вложения",
      "Выделяю ключевые решения и спорные моменты",
      "Собираю, что уже сделано и какие проверки прошли",
      "Определяю текущий статус и главный блокер",
      "Формирую краткий summary для карточки задачи",
    ],
    result: {
      bullets: [
        "Абонент переведён на коммутатор SW-HKI-214 в 10:42",
        "После переноса — потери пакетов, периодические обрывы",
        "NOC: линк up, но трафик идёт нестабильно",
        "В логах: 17× MAC flapping, 4× storm control",
        "Сверить VLAN 312 на промежуточных устройствах",
      ],
    },
  },

  {
    id: "modernization",
    role: "AI-инженер по модернизации",
    ticket: "MOD-1192",
    who: "Сэйлз · 12:08",
    segments: [
      { text: "Можно ли подключить абонента на тариф " },
      { text: "1 Гбит/с", code: true },
      { text: " без замены оборудования?" },
    ],
    statuses: [
      "Проверяю цепочку оборудования до ядра сети",
      "Сверяю модели устройств и ограничения",
      "Проверяю совместимость тарифа со схемой",
    ],
    result: {
      rows: [
        { label: "Вердикт",         value: "Замена не нужна", ok: true },
        { label: "Цепочка до ядра", value: "Целая" },
        { label: "Порт коммутатора", value: "1 Гбит/с поддерживает" },
        { label: "Загрузка аплинка", value: "48% · запас есть" },
      ],
      note: "Перевод на новый тариф — без выезда. Контроль аплинка 7 дней.",
    },
  },

  {
    id: "noc",
    role: "AI NOC Engineer",
    ticket: "INC-48217",
    who: "NOC · 03:21",
    segments: [
      { text: "Проверь, есть ли аномалии в сети и что может быть причиной инцидента?" },
    ],
    statuses: [
      "Снимаю данные с коммутаторов и мониторинга",
      "Ищу ошибки, всплески событий и отклонения",
      "Сопоставляю с похожими инцидентами",
      "Определяю вероятную причину",
      "Готовлю задачу на ручной контроль",
    ],
    result: {
      rows: [
        { label: "Аномалия",        value: "Узел СПб-Агр-7", accent: true },
        { label: "Вероятная причина", value: "Деградация SFP на uplink" },
        { label: "Похожие кейсы",   value: "3 за 30 дней" },
        { label: "Следующий шаг",   value: "Замена модуля", ok: true },
      ],
      note: "Задача на инженера создана автоматически с рекомендациями.",
    },
  },

  {
    id: "subscriber",
    role: "ИИ-аналитик сети и абонентов",
    ticket: "SUB-7741",
    who: "Поддержка · 19:54",
    segments: [
      { text: "Что происходит у абонента " },
      { text: "Иванов И.В.", code: true },
      { text: " — связь нестабильная?" },
    ],
    statuses: [
      "Собираю данные из CRM, биллинга и NMS",
      "Состояние абонента, баланс, активность",
      "Анализирую загрузку узлов и портов",
      "Сравниваю с историческими паттернами",
    ],
    result: {
      rows: [
        { label: "Связь",          value: "Активна", ok: true },
        { label: "Узел доступа",   value: "Рост ошибок по порту", accent: true },
        { label: "Вечерний пик",   value: "Повышенная загрузка" },
        { label: "Баланс",         value: "В норме, рисков нет" },
      ],
      note: "Проверить uplink узла, наблюдать нагрузку 24 часа.",
    },
  },

  {
    id: "config",
    role: "ИИ-конфигуратор сети",
    ticket: "CFG-3308",
    who: "Инженер L2 · 14:02",
    segments: [
      { text: "Подготовь конфиг для подключения абонента на " },
      { text: "SW-MSK-Aggr-12", code: true },
      { text: "." },
    ],
    statuses: [
      "Читаю параметры устройства и текущий конфиг",
      "Подбираю порт и параметры подключения",
      "Сравниваю с рабочими шаблонами",
      "Генерирую готовый конфиг",
    ],
    result: {
      rows: [
        { label: "Конфиг",     value: "config-CFG-3308.txt", accent: true },
        { label: "Порт",       value: "Gi0/0/14 · VLAN 312" },
        { label: "Diff",       value: "8 строк · подсвечены" },
        { label: "Применить",  value: "По кнопке инженером", ok: true },
      ],
      note: "Инженер только проверяет и применяет — без ручной сборки.",
    },
  },
];
