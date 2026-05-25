// Team — who's behind the platform. Source: icerockdev.ru.
// Photos hot-linked from tildacdn; if any fail to load, the card falls back
// to a gradient tile with the person's initials so the layout stays solid.

const TEAM = [
  {
    name: "Александр Погребняк",
    role: "CEO",
    photo: "assets/team/pogrebnyak.png",
    bio: "Имеет стратегическое видение, для решения каких бизнес-задач создаётся AI, и обеспечивает проект необходимыми ресурсами.\n\n",
    size: 43,
    sizeLabel: "человека",
    tags: ["Автоматизация бизнеса на базе AI"],
  },
  {
    name: "Алексей Михайлов",
    role: "AI-Архитектор",
    photo: "assets/team/mikhailov.png",
    bio: "Проектирует фундаментальную техническую структуру всей AI-системы,  обеспечивая её масштабируемость и надёжность.",
    size: 12,
    sizeLabel: "человек",
    tags: ["Бизнес-аналитики", "ML-инженеры"],
  },
  {
    name: "Евгений Гребенщиков",
    role: "Руководитель креативного отдела",
    photo: "assets/team/grebenshchikov.png",
    bio: "Используя пользовательский опыт (UX/UI), делает интерфейс продукта удобным и интуитивно понятным.\n\n",
    size: 6,
    sizeLabel: "человек",
    tags: ["UX/UI-дизайнеры", "Верстальщики"],
  },
  {
    name: "Станислав Караковский",
    role: "Руководитель WEB-разработки",
    photo: "assets/team/karakovsky.png",
    bio: "Отвечает за создание пользовательских интерфейсов и API.\n\n\n\n",
    size: 8,
    sizeLabel: "человек",
    tags: ["Frontend и Backend-разработчики", "Full-Stack-разработчики"],
  },
];

function initials(name) {
  return name.split(" ").map(w => w[0]).slice(0, 2).join("");
}

function TeamCard({ member }) {
  return (
    <article className="team-card">
      <div className="team-card__photo">
        <img
          src={member.photo}
          alt={member.name}
          loading="lazy"
          onError={(e) => {
            // Tilda image blocked or 404 — swap in an initials fallback so
            // the card doesn't show a broken-image icon.
            const wrap = e.currentTarget.parentElement;
            if (wrap) {
              wrap.classList.add("team-card__photo--fallback");
              wrap.textContent = initials(member.name);
            }
          }}
        />
      </div>
      <div className="team-card__body">
        <div>
          <h3 className="team-card__name">{member.name}</h3>
          <div className="team-card__role">{member.role}</div>
        </div>
        <p className="team-card__bio">{member.bio}</p>
        <div className="team-card__meta">
          <div className="team-card__size">
            <span>Команда</span>
            <b>{member.size} {member.sizeLabel}</b>
          </div>
          <ul className="team-card__tags">
            {member.tags.map(t => (
              <li key={t} className="team-card__tag">— {t}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function Team() {
  return (
    <section className="section" id="team">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Команда</span>
          <h2><em>34 эксперта</em> по AI</h2>
          <p className="section__sub">
            Экспертиза специалистов ICEROCK в области искусственного интеллекта
            играет ключевую роль в создании инновационных решений.
          </p>
        </div>
        <div className="team-grid">
          {TEAM.map((m, i) => <TeamCard key={i} member={m} />)}
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { Team });
