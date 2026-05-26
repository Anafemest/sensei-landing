// Team — English version.

const TEAM = [
  {
    name: "Alexander Pogrebnyak",
    role: "CEO",
    photo: "../assets/team/pogrebnyak.png",
    bio: "Provides strategic vision for what business challenges AI is being built to solve, and secures the necessary resources for the project.",
    size: 34,
    sizeLabel: "members",
    tags: ["AI-based Business Automation"],
  },
  {
    name: "Alexey Mikhailov",
    role: "AI Architect",
    photo: "../assets/team/mikhailov.png",
    bio: "Designs the fundamental technical structure of the entire AI system, ensuring its scalability and reliability.",
    size: 12,
    sizeLabel: "members",
    tags: ["Business Analysts", "ML Engineers"],
  },
  {
    name: "Evgeny Grebenshchikov",
    role: "Head of Creative",
    photo: "../assets/team/grebenshchikov.png",
    bio: "Using user experience (UX/UI), makes the product interface convenient and intuitive for every user.",
    size: 6,
    sizeLabel: "members",
    tags: ["UX/UI Designers", "Frontend Developers"],
  },
  {
    name: "Stanislav Karakovsky",
    role: "Head of Web Development",
    photo: "../assets/team/karakovsky.png",
    bio: "Responsible for building user interfaces and APIs across the entire platform.",
    size: 8,
    sizeLabel: "members",
    tags: ["Frontend & Backend Developers", "Full-Stack Developers"],
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
          src={member.photo} alt={member.name} loading="lazy"
          onError={(e) => {
            const wrap = e.currentTarget.parentElement;
            if (wrap) { wrap.classList.add("team-card__photo--fallback"); wrap.textContent = initials(member.name); }
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
            <span>Team</span>
            <b>{member.size} {member.sizeLabel}</b>
          </div>
          <ul className="team-card__tags">
            {member.tags.map(t => <li key={t} className="team-card__tag">— {t}</li>)}
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
          <span className="section__eyebrow">Team</span>
          <h2><em>34 AI experts</em></h2>
          <p className="section__sub">
            The expertise of ICEROCK specialists in artificial intelligence
            plays a key role in creating innovative solutions.
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
