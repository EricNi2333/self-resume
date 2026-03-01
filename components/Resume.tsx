import { ResumeData } from "@/lib/types";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

interface ResumeProps {
  data: ResumeData;
  lang?: "zh" | "en";
}

/* ── CSS-variable-aware style helpers ── */
const iv = (v: string) => `var(${v})`;

const iconBox: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  width: "22px", height: "22px", borderRadius: "4px",
  border: `1px solid ${iv("--icon-border")}`,
  background: iv("--icon-bg"),
  flexShrink: 0,
  textDecoration: "none",
};

const LABELS = {
  zh: { about:"About", work:"Work Experience", education:"Education",
        skills:"Skills", projects:"Projects", awards:"Awards & Honors",
        certs:"Certifications", lang:"Languages", patents:"专利", papers:"发表论文" },
  en: { about:"About", work:"Work Experience", education:"Education",
        skills:"Skills", projects:"Projects", awards:"Awards & Honors",
        certs:"Certifications", lang:"Languages", patents:"Patents", papers:"Publications" },
};

export function Resume({ data, lang = "zh" }: ResumeProps) {
  const L = LABELS[lang];
  const iconColor = iv("--icon-color");

  return (
    <div className="a4-page">

      {/* ══ HEADER ══ */}
      <header style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"10px" }}>
        <div style={{ flex:1, paddingRight:"16px" }}>
          <h1 style={{ fontSize:"22pt", fontWeight:700, lineHeight:1.15, marginBottom:"5px", color:iv("--text-primary") }}>
            {data.name}
          </h1>
          {data.tagline && (
            <p style={{ fontSize:"9pt", color:iv("--text-secondary"), lineHeight:1.65, marginBottom:"8px", maxWidth:"420px" }}>
              {data.tagline}
            </p>
          )}
          {data.location && (
            <p style={{ fontSize:"8.5pt", color:iv("--text-muted"), marginBottom:"8px", display:"flex", alignItems:"center", gap:"4px" }}>
              <MapPin size={11} style={{ flexShrink:0, color:iv("--text-muted") }} />
              {data.location}
            </p>
          )}

          {/* Contact row */}
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", alignItems:"center", marginTop:"2px" }}>

            {/* Email — icon + text */}
            {data.email && (
              <a href={"mailto:"+data.email} style={{ display:"flex", alignItems:"center", gap:"5px", fontSize:"8.5pt", color:iv("--link"), textDecoration:"none" }}>
                <span style={iconBox}><Mail size={12} color={iv("--icon-color")} /></span>
                {data.email}
              </a>
            )}

            {/* Phone — icon + text */}
            {data.phone && (
              <span style={{ display:"flex", alignItems:"center", gap:"5px", fontSize:"8.5pt", color:iv("--text-secondary") }}>
                <span style={iconBox}><Phone size={12} color={iv("--icon-color")} /></span>
                {data.phone}
              </span>
            )}

            {/* WeChat — icon + text (same as email/phone) */}
            {data.wechat && (
              <span style={{ display:"flex", alignItems:"center", gap:"5px", fontSize:"8.5pt", color:iv("--text-secondary") }}>
                <span style={iconBox}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M9.5 11.5C9.5 12.33 8.83 13 8 13s-1.5-.67-1.5-1.5S7.17 10 8 10s1.5.67 1.5 1.5z M13 13c.83 0 1.5-.67 1.5-1.5S13.83 10 13 10s-1.5.67-1.5 1.5.67 1.5 1.5 1.5z" fill="currentColor" style={{color:iv("--icon-color")}}/>
                    <path d="M20.94 11.46C20.72 8.38 18.06 6 14.82 6c-.31 0-.62.02-.92.06C12.89 4.2 10.85 3 8.55 3 4.91 3 2 5.82 2 9.28c0 1.44.51 2.76 1.36 3.8L2.5 15.5l2.5-.75c.82.44 1.75.7 2.75.72-.05-.25-.08-.5-.08-.75 0-3.13 2.77-5.66 6.13-5.66.18 0 .36.01.54.02.07-.36.11-.73.11-1.08zM22 16.5c0-2.76-2.69-5-6-5s-6 2.24-6 5 2.69 5 6 5c.95 0 1.84-.2 2.63-.54L21 22l-.75-2.19C21.34 18.82 22 17.72 22 16.5zm-7.5-.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="currentColor" style={{color:iv("--icon-color")}}/>
                  </svg>
                </span>
                {data.wechat}
              </span>
            )}

            {/* Divider before icon-only links */}
            {(data.website || data.linkedin || data.github) && (
              <span style={{ width:"1px", height:"16px", background:iv("--border"), display:"inline-block" }} />
            )}

            {/* Website — icon only */}
            {data.website && (
              <a href={data.website} target="_blank" rel="noopener noreferrer" title={data.website} style={iconBox}>
                <Globe size={12} color={iv("--icon-color")} />
              </a>
            )}

            {/* LinkedIn — icon only */}
            {data.linkedin && (
              <a href={"https://"+data.linkedin} target="_blank" rel="noopener noreferrer" title={data.linkedin} style={iconBox}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill={iv("--icon-color")}>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            )}

            {/* GitHub — icon only */}
            {data.github && (
              <a href={"https://"+data.github} target="_blank" rel="noopener noreferrer" title={data.github} style={iconBox}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={iv("--icon-color")} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Avatar */}
        {data.avatar ? (
          <div style={{ width:"88px", height:"110px", flexShrink:0, border:`1px solid ${iv("--border")}`, borderRadius:"4px", overflow:"hidden", background:iv("--tag-bg") }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.avatar} alt={data.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          </div>
        ) : (
          <div style={{ width:"88px", height:"110px", flexShrink:0, border:`1.5px dashed ${iv("--border")}`, borderRadius:"4px", display:"flex", alignItems:"center", justifyContent:"center", background:iv("--tag-bg"), color:iv("--text-faint"), fontSize:"8pt", textAlign:"center", lineHeight:1.5 }}>
            {lang==="zh" ? "1寸照片" : "Photo"}
          </div>
        )}
      </header>

      <div style={{ borderBottom:`1px solid ${iv("--border")}` }} />

      {/* ══ ABOUT ══ */}
      {data.summary && (
        <section className="no-break">
          <div className="section-title">{L.about}</div>
          <p style={{ fontSize:"9pt", color:iv("--text-secondary"), lineHeight:1.75 }}>{data.summary}</p>
        </section>
      )}

      {/* ══ WORK EXPERIENCE ══ */}
      {data.experience?.length > 0 && (
        <section>
          <div className="section-title">{L.work}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            {data.experience.map((exp, i) => (
              <div key={i} className="no-break">
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap" }}>
                    <span style={{ fontSize:"10.5pt", fontWeight:700, color:iv("--text-primary") }}>{exp.title}</span>
                    {exp.location && (
                      <span style={{ fontSize:"7.5pt", color:iv("--badge-text"), background:iv("--badge-bg"), borderRadius:"3px", padding:"1px 7px", fontWeight:500 }}>
                        {exp.location}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize:"8.5pt", color:iv("--text-muted"), whiteSpace:"nowrap", marginLeft:"12px", flexShrink:0 }}>
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p style={{ fontSize:"8.5pt", color:iv("--text-muted"), marginBottom:"5px" }}>
                  {exp.company}
                  {exp.employmentType && <span style={{ marginLeft:"6px", color:iv("--text-faint") }}>· {exp.employmentType}</span>}
                </p>
                <ul style={{ margin:0, padding:0, listStyle:"none" }}>
                  {exp.description.map((item, j) => (
                    <li key={j} style={{ display:"flex", gap:"6px", fontSize:"9pt", color:iv("--text-secondary"), lineHeight:1.7, marginBottom:"1px" }}>
                      <span style={{ color:iv("--text-faint"), flexShrink:0 }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ EDUCATION ══ */}
      {data.education?.length > 0 && (
        <section>
          <div className="section-title">{L.education}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
            {data.education.map((edu, i) => (
              <div key={i}>
                <div className="no-break">
                  {/* Single row: Institution ←── Degree · Field ──→ Date */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:"8px" }}>
                    <span style={{ fontSize:"10.5pt", fontWeight:700, color:iv("--text-primary"), whiteSpace:"nowrap" }}>
                      {edu.institution}
                    </span>
                    <span style={{ fontSize:"9pt", color:iv("--text-secondary"), flex:1, textAlign:"center", whiteSpace:"nowrap" }}>
                      {edu.degree}{edu.field && ` · ${edu.field}`}
                    </span>
                    <span style={{ fontSize:"8.5pt", color:iv("--text-muted"), whiteSpace:"nowrap" }}>
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  {/* GPA / Honors row */}
                  {(edu.gpa || edu.honors) && (
                    <p style={{ fontSize:"8.5pt", color:iv("--text-muted"), marginTop:"3px" }}>
                      {edu.honors}{edu.honors && edu.gpa && " · "}{edu.gpa && "GPA "+edu.gpa}
                    </p>
                  )}
                </div>

                {/* Patents */}
                {edu.patents?.length > 0 && (
                  <div style={{ marginTop:"8px" }}>
                    <p style={{ fontSize:"8.5pt", fontWeight:600, color:iv("--text-secondary"), marginBottom:"4px" }}>{L.patents}</p>
                    <ul style={{ margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:"3px" }}>
                      {edu.patents.map((p, j) => (
                        <li key={j} className="no-break" style={{ display:"flex", gap:"6px", fontSize:"8.5pt", color:iv("--text-secondary"), lineHeight:1.65 }}>
                          <span style={{ color:iv("--text-faint"), flexShrink:0, marginTop:"1px" }}>›</span>
                          <span>
                            <span style={{ color:iv("--text-muted") }}>{p.authors} </span>
                            {p.title}
                            {p.number && <span style={{ color:iv("--text-faint") }}> [{p.number}]</span>}
                            {p.status && (
                              <span style={{ marginLeft:"6px", fontSize:"7.5pt", color:iv("--badge-text"), background:iv("--badge-bg"), borderRadius:"3px", padding:"0px 5px" }}>
                                {p.status}
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Papers */}
                {edu.papers?.length > 0 && (
                  <div style={{ marginTop:"8px" }}>
                    <p style={{ fontSize:"8.5pt", fontWeight:600, color:iv("--text-secondary"), marginBottom:"4px" }}>{L.papers}</p>
                    <ul style={{ margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:"5px" }}>
                      {edu.papers.map((p, j) => (
                        <li key={j} className="no-break" style={{ display:"flex", gap:"6px", fontSize:"8.5pt", color:iv("--text-secondary"), lineHeight:1.65 }}>
                          <span style={{ color:iv("--text-faint"), flexShrink:0, marginTop:"1px" }}>›</span>
                          <span>
                            <span style={{ color:iv("--text-muted") }}>{p.authors} </span>
                            <em>{p.title}</em>
                            {" "}<span style={{ color:iv("--text-secondary") }}>{p.journal}.</span>
                            {p.doi && (
                              <a href={p.doi} target="_blank" rel="noopener noreferrer"
                                style={{ color:iv("--link"), marginLeft:"4px", textDecoration:"none", fontSize:"7.5pt" }}>
                                [DOI]
                              </a>
                            )}
                            {p.note && (
                              <span style={{ marginLeft:"6px", fontSize:"7.5pt", color:iv("--green-text"), background:iv("--green-bg"), border:`1px solid ${iv("--green-border")}`, borderRadius:"3px", padding:"0px 5px" }}>
                                {p.note}
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ SKILLS ══ */}
      {data.skills?.length > 0 && (
        <section className="no-break">
          <div className="section-title">{L.skills}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
            {data.skills.map((cat) => {
              /*
               * Justify-align pure-CJK labels so every label's right edge
               * lines up with the longest one ("云原生与 DevOps").
               * Mixed CJK+ASCII labels (containing ASCII letters/digits) use
               * left-align to avoid ugly spacing inside the ASCII part.
               */
              const isMixed = /[A-Za-z0-9&+/]/.test(cat.category);
              const labelW = lang === "en" ? "148px" : "108px";
              return (
                <div key={cat.category} style={{ display:"flex", alignItems:"flex-start" }}>
                  {/* Category label — fixed width, justified for pure-CJK */}
                  <span
                    className="skill-label"
                    data-mixed={isMixed ? "true" : "false"}
                    style={{
                      fontSize:"8pt", fontWeight:600, color:iv("--text-muted"),
                      width: labelW,
                      minWidth: labelW,
                      paddingTop:"3px",
                      flexShrink:0,
                    }}
                  >
                    {cat.category}
                  </span>
                  {/* Tags */}
                  <div style={{ flex:1, display:"flex", flexWrap:"wrap", gap:"4px", alignContent:"flex-start" }}>
                    {cat.items.map((skill) => (
                      <span key={skill} style={{
                        fontSize:"8.5pt", color:iv("--tag-text"),
                        background:iv("--tag-bg"), border:`1px solid ${iv("--tag-border")}`,
                        borderRadius:"4px", padding:"2px 10px", whiteSpace:"nowrap",
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ══ PROJECTS ══ */}
      {data.projects?.length > 0 && (
        <section>
          <div className="section-title">{L.projects}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {data.projects.map((proj, i) => (
              <div key={i} className="no-break">
                <div style={{ display:"flex", alignItems:"baseline", gap:"8px" }}>
                  <span style={{ fontSize:"10pt", fontWeight:700, color:iv("--text-primary") }}>{proj.name}</span>
                  {proj.url && (
                    <a href={"https://"+proj.url} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize:"8pt", color:iv("--link") }}>{proj.url}</a>
                  )}
                </div>
                <p style={{ fontSize:"9pt", color:iv("--text-secondary"), lineHeight:1.65, marginTop:"2px" }}>{proj.description}</p>
                {proj.technologies && (
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"4px", marginTop:"4px" }}>
                    {proj.technologies.map((t) => (
                      <span key={t} style={{ fontSize:"8pt", background:iv("--tag-bg"), border:`1px solid ${iv("--tag-border")}`, borderRadius:"3px", padding:"1px 8px", color:iv("--tag-text") }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ AWARDS ══ */}
      {data.awards?.length > 0 && (
        <section className="no-break">
          <div className="section-title">{L.awards}</div>
          <ul style={{ margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:"4px" }}>
            {data.awards.map((award, i) => (
              <li key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:"12px" }}>
                <span style={{ display:"flex", gap:"6px", fontSize:"9pt", color:iv("--text-secondary"), lineHeight:1.65 }}>
                  <span style={{ color:iv("--text-faint"), flexShrink:0 }}>•</span>
                  <span>{award.name}</span>
                </span>
                {award.date && (
                  <span style={{ fontSize:"8.5pt", color:iv("--text-muted"), whiteSpace:"nowrap", flexShrink:0 }}>{award.date}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ══ CERTIFICATIONS ══ */}
      {data.certifications?.length > 0 && (
        <section className="no-break">
          <div className="section-title">{L.certs}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
            {data.certifications.map((cert, i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
                <div>
                  <span style={{ fontSize:"9.5pt", fontWeight:600, color:iv("--text-primary") }}>{cert.name}</span>
                  <span style={{ fontSize:"8.5pt", color:iv("--text-muted"), marginLeft:"8px" }}>{cert.issuer}</span>
                </div>
                <span style={{ fontSize:"8.5pt", color:iv("--text-muted"), whiteSpace:"nowrap", marginLeft:"12px" }}>{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ LANGUAGES ══ */}
      {data.languages?.length > 0 && (
        <section className="no-break">
          <div className="section-title">{L.lang}</div>
          <div style={{ display:"flex", gap:"24px", flexWrap:"wrap" }}>
            {data.languages.map((l) => (
              <span key={l.name} style={{ fontSize:"9pt", color:iv("--text-secondary") }}>
                <strong style={{ color:iv("--text-primary") }}>{l.name}</strong>
                <span style={{ color:iv("--text-muted"), marginLeft:"4px" }}>— {l.proficiency}</span>
              </span>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
