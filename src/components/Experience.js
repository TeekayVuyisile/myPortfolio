import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUp } from 'react-bootstrap-icons';
import { scrollToElement } from '../utils/scrollTo';

const TECH_GROUPS = [
  { label: 'Frontend', items: ['HTML', 'CSS', 'Bootstrap', 'React', 'Vite', 'Leaflet', 'Mapbox'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'REST API', 'Socket.IO', 'JWT'] },
  { label: 'Data & AI', items: ['PostgreSQL', 'Google Gemini AI'] },
  { label: 'Tools', items: ['Git'] },
];

// Newest first. `end: null` means the role is ongoing.
const ROLES = [
  {
    id: 'developer',
    shortLabel: 'Developer',
    title: 'Junior Full Stack Web Developer',
    company: 'Department of Economic Development & Tourism',
    start: '2026-05-01',
    end: null,
    projects: [
      {
        name: 'Programme Delivery Dashboard',
        summary: 'Sole developer of a real-time dashboard that replaced Excel-based tracking with a live source of truth across departments.',
        stack: ['React', 'Node.js', 'PostgreSQL', 'Socket.IO', 'Gemini AI'],
        responsibilities: [
          "Sole developer of a real-time, collaborative dashboard replacing manual Excel-based tracking with a live single source of truth for portfolio, task, KPI, and risk management across departments",
          "Designed the PostgreSQL schema and built a Node.js/Express REST API with a layered routes → controllers → models architecture (no ORM), including transactional multi-location inserts",
          "Implemented a real-time layer with Socket.IO so task edits, comments, and status changes propagate instantly to every connected client",
          "Built the React (Vite) frontend, including a dual-view spreadsheet/Kanban project tracker and interactive Leaflet/Mapbox-based multi-site location tracking",
          "Developed an intelligent Excel import pipeline that auto-detects header rows, lets users map columns to the schema, and validates data before commit",
          "Built a Financial Year/KPI subsystem for government-style quarterly reporting, including output indicators, quarter-tagged progress updates, and automatic snapshotting via scheduled jobs",
          "Integrated AI-assisted report generation (Google Gemini with Groq fallback) to produce Word/Excel reports combining logged data with narrative analysis, with transparent disclosure of when AI was used",
          "Implemented JWT authentication with email OTP verification and an immutable audit log for governance and accountability"
        ]
      },
      {
        name: 'DEDAT Internal LMS — Maintenance & Support',
        summary: 'Keeping the LMS I built as an intern reliable: bug fixes, performance monitoring and new feature requests.',
        stack: ['React', 'Node.js', 'PostgreSQL'],
        responsibilities: [
          "Maintain and support the internal Learning Management System built during the internship, resolving bugs and handling ongoing feature requests",
          "Monitor system performance and reliability, troubleshooting issues raised by internal users",
          "Ship updates across the React frontend and Node.js/PostgreSQL backend while preserving existing functionality",
          "Coordinate with stakeholders to prioritize fixes and small enhancements based on usage feedback"
        ]
      }
    ],
    technologies: ["HTML", "CSS", "Bootstrap", "React", "Node.js", "Express", "PostgreSQL", "Socket.IO", "Vite", "REST API", "JWT", "Google Gemini AI", "Leaflet", "Mapbox", "Git"]
  },
  {
    id: 'intern',
    shortLabel: 'Intern',
    title: 'Full Stack Web Developer Intern',
    company: 'Awrise Internship (Hosted by Dept. of Economic Development & Tourism)',
    start: '2025-03-01',
    end: '2026-03-01',
    projects: [
      {
        name: 'DEDAT Internal LMS',
        summary: 'Built a full-featured Learning Management System to modernise internal training and e-learning.',
        stack: ['React', 'Bootstrap', 'Node.js', 'PostgreSQL'],
        responsibilities: [
          "Developed a full-featured Learning Management System (LMS) to improve internal training and e-learning processes",
          "Built responsive interfaces using HTML, CSS, Bootstrap, and React",
          "Implemented RESTful APIs with Node.js and managed data using PostgreSQL",
          "Collaborated with stakeholders to gather requirements, troubleshoot issues, and deliver scalable technical solutions",
          "Applied best practices in version control, testing, and deployment to ensure system reliability"
        ]
      },
      {
        name: 'Educational Intervention Management System (Awrise)',
        summary: 'Led end-to-end development of a platform for learner assessments, attendance sign-offs and performance analytics.',
        stack: ['React', 'Bootstrap', 'Node.js', 'PostgreSQL'],
        responsibilities: [
          "Led end-to-end development of a platform for managing learner assessments & materials, attendance tracking with digital signoffs, and performance analytics dashboards",
          "Collaborated with team members on requirements gathering and solution design, while independently developing the full system",
          "Built responsive interfaces using React and Bootstrap",
          "Developed backend services with Node.js (REST API) and PostgreSQL"
        ]
      }
    ],
    technologies: ["HTML", "CSS", "Bootstrap", "React", "Node.js", "Express", "PostgreSQL", "REST API", "Git"]
  }
];

const STATS = [
  { value: null, label: 'Experience' }, // filled with the live total below
  { value: '3', label: 'Systems deployed' },
  { value: '2', label: 'Built solo, end to end' },
];

const WAVE_BARS = 60;

const toDate = (str) => (str ? new Date(`${str}T00:00:00`) : new Date());

const monthsBetween = (start, end) =>
  (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

const formatLong = (months) => {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const y = years ? `${years} year${years !== 1 ? 's' : ''}` : '';
  const m = rest ? `${rest} month${rest !== 1 ? 's' : ''}` : '';
  return [y, m].filter(Boolean).join(' ') || 'Less than a month';
};

const formatShort = (months) => {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years ? `${years} yr` : '', rest ? `${rest} mo` : ''].filter(Boolean).join(' ') || '< 1 mo';
};

const formatMonth = (date) => date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

const groupTechnologies = (technologies) =>
  TECH_GROUPS
    .map(group => ({ label: group.label, items: group.items.filter(item => technologies.includes(item)) }))
    .filter(group => group.items.length > 0);

const ProjectRow = ({ project, isOpen, onToggle }) => {
  const panelId = `exp-${project.name.replace(/\W+/g, '-').toLowerCase()}`;

  return (
    <div className={`track-row ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="track-row-head"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="track-row-text">
          <span className="track-row-name">{project.name}</span>
          <span className="track-row-summary">{project.summary}</span>
          <span className="track-row-stack">
            {project.stack.map(tech => <span key={tech}>{tech}</span>)}
          </span>
        </span>
        <span className="track-row-toggle">
          {isOpen ? 'Hide' : `${project.responsibilities.length} contributions`}
          <ChevronDown size={14} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            className="track-row-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="track-row-list">
              {project.responsibilities.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Experience = () => {
  const [openRows, setOpenRows] = useState({});
  const [marker, setMarker] = useState(0);
  const [activeLabel, setActiveLabel] = useState(ROLES[0].title);
  const itemRefs = useRef([]);

  const timeline = useMemo(() => {
    const now = new Date();
    const first = toDate(ROLES[ROLES.length - 1].start);
    const span = now - first;
    // 0 = today (top of the rail), 1 = first day of the earliest role (bottom)
    const toT = (date) => Math.min(1, Math.max(0, (now - date) / span));

    const roles = ROLES.map(role => {
      const start = toDate(role.start);
      const end = toDate(role.end);
      return {
        ...role,
        months: monthsBetween(start, end),
        period: `${formatMonth(start)} – ${role.end ? formatMonth(end) : 'Present'}`,
        range: [toT(end), toT(start)],
      };
    });

    // Scroll items alternate role, transition, role… so the marker can glide through gaps too
    const items = [];
    roles.forEach((role, i) => {
      items.push({ kind: 'role', label: role.title, range: role.range });
      if (i < roles.length - 1) {
        items.push({ kind: 'link', label: 'Hired full-time', range: [role.range[1], roles[i + 1].range[0]] });
      }
    });

    const amplitude = (i) => 0.35 + 0.65 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45));
    const bars = Array.from({ length: WAVE_BARS }, (_, i) => {
      const t = (i + 0.5) / WAVE_BARS;
      const role = roles.find(r => t >= r.range[0] && t <= r.range[1]);
      return { t, role: role ? role.id : null, size: role ? amplitude(i) : 0.12 };
    });

    const totalMonths = roles.reduce((sum, role) => sum + role.months, 0);

    return { roles, items, bars, totalMonths, firstLabel: formatMonth(first) };
  }, []);

  useEffect(() => {
    let frame = null;
    const update = () => {
      frame = null;
      const probe = window.innerHeight * 0.45;
      const els = itemRefs.current;
      if (!els[0]) return;

      let index = 0;
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= probe) index = i;
      });
      const rect = els[index].getBoundingClientRect();
      const fraction = Math.min(1, Math.max(0, (probe - rect.top) / rect.height));
      const [from, to] = timeline.items[index].range;

      setMarker(from + (to - from) * fraction);
      setActiveLabel(timeline.items[index].label);
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [timeline]);

  const toggleRow = (key) => setOpenRows(prev => ({ ...prev, [key]: !prev[key] }));

  const jumpTo = (itemIndex) => scrollToElement(itemRefs.current[itemIndex], 110);

  const stats = STATS.map(stat => (stat.value ? stat : { ...stat, value: formatShort(timeline.totalMonths) }));

  return (
    <section id="experience" className="section experience-studio">
      <div className="container-custom">
        <div className="studio-heading">
          <p className="studio-eyebrow">Career · {formatShort(timeline.totalMonths)} so far</p>
          <h2 className="studio-title">Work Experience</h2>
          <p className="studio-lede">
            From intern to full-time developer at the Department of Economic Development &amp; Tourism,
            designing, building and supporting internal systems end to end.
          </p>
        </div>

        <div className="career-layout">
          <aside className="career-rail" aria-label="Career timeline">
            <dl className="rail-stats">
              {stats.map(stat => (
                <div key={stat.label} className="rail-stat">
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>

            <div className="rail-player">
              <div className="rail-wave-wrap">
                <span className="rail-edge rail-edge-start">Now</span>
                <div className="rail-wave" style={{ '--marker': marker }}>
                  {timeline.bars.map((bar, i) => (
                    <span
                      key={i}
                      className={`rail-bar ${bar.role ? `is-${bar.role}` : 'is-gap'} ${bar.t <= marker ? 'is-played' : ''}`}
                      style={{ '--size': bar.size }}
                    ></span>
                  ))}
                  <span className="rail-marker" aria-hidden="true"></span>
                  {timeline.roles.map((role, i) => (
                    <button
                      key={role.id}
                      type="button"
                      className={`rail-segment is-${role.id}`}
                      style={{ '--from': role.range[0], '--to': role.range[1] }}
                      onClick={() => jumpTo(i * 2)}
                    >
                      {role.shortLabel}
                      <small>{formatShort(role.months)}</small>
                    </button>
                  ))}
                </div>
                <span className="rail-edge rail-edge-end">{timeline.firstLabel}</span>
              </div>
              <p className="rail-now" aria-live="polite">
                <span>Viewing</span>
                <strong>{activeLabel}</strong>
              </p>
            </div>
          </aside>

          <div className="career-roles">
            {timeline.roles.map((role, roleIndex) => (
              <React.Fragment key={role.id}>
                <motion.article
                  ref={el => { itemRefs.current[roleIndex * 2] = el; }}
                  className={`role-card is-${role.id}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <header className="role-head">
                    <span className={`role-badge ${role.end ? '' : 'is-current'}`}>
                      {!role.end && <span className="live-dot ambient" aria-hidden="true"></span>}
                      {role.end ? 'Internship' : 'Current role'}
                    </span>
                    <h3 className="role-title">{role.title}</h3>
                    <p className="role-company">{role.company}</p>
                    <p className="role-period">
                      {role.period} <span aria-hidden="true">·</span> {formatLong(role.months)}
                    </p>
                  </header>

                  <div className="role-projects">
                    {role.projects.map((project, i) => {
                      const key = `${role.id}-${i}`;
                      return (
                        <ProjectRow
                          key={key}
                          project={project}
                          isOpen={!!openRows[key]}
                          onToggle={() => toggleRow(key)}
                        />
                      );
                    })}
                  </div>

                  <div className="role-stack">
                    {groupTechnologies(role.technologies).map(group => (
                      <div key={group.label} className="role-stack-group">
                        <span className="role-stack-label">{group.label}</span>
                        <span className="role-stack-items">
                          {group.items.map(item => <span key={item}>{item}</span>)}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.article>

                {roleIndex < timeline.roles.length - 1 && (
                  <div
                    ref={el => { itemRefs.current[roleIndex * 2 + 1] = el; }}
                    className="role-link"
                  >
                    <span className="role-link-line" aria-hidden="true"></span>
                    <span className="role-link-badge">
                      <ArrowUp size={14} />
                      Hired full-time after the internship
                    </span>
                    <span className="role-link-line" aria-hidden="true"></span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
