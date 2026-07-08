import { useState } from "react";

// TODO: Integrar API real de Hypnari para obtener recomendaciones personalizadas
// TODO: Conectar Facebook Pixel (fbevents.js) para tracking de conversiones
// TODO: Añadir autenticación de usuario para guardar resultados del quiz

const COLORS = {
  // TODO: Verificar colores exactos de la brand Hypnari desde sus assets CSS
  bg: "#0f0f1a",
  surface: "#1a1a2e",
  surfaceCard: "#16213e",
  primary: "#7c3aed",
  primaryLight: "#a855f7",
  primaryDark: "#5b21b6",
  accent: "#06b6d4",
  accentLight: "#22d3ee",
  text: "#f1f5f9",
  textMuted: "#94a3b8",
  textSubtle: "#64748b",
  border: "#334155",
  borderLight: "#475569",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  white: "#ffffff",
  gradient1: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
  gradient2: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)",
  gradientCard: "linear-gradient(145deg, #1e1b4b 0%, #1a1a2e 100%)",
};

const quizQuestions = [
  {
    id: 1,
    question: "¿Cuál es tu principal objetivo?",
    subtitle: "Selecciona la opción que mejor describe lo que buscas lograr.",
    icon: "🎯",
    options: [
      { id: "a", text: "Reducir el estrés y la ansiedad", icon: "😌", description: "Quiero sentirme más tranquilo/a en mi día a día" },
      { id: "b", text: "Mejorar la calidad del sueño", icon: "🌙", description: "Tengo dificultades para dormir o descansar bien" },
      { id: "c", text: "Aumentar la confianza y autoestima", icon: "💪", description: "Quiero sentirme más seguro/a de mí mismo/a" },
      { id: "d", text: "Superar miedos o fobias", icon: "🦋", description: "Hay algo que me impide avanzar en mi vida" },
    ],
  },
  {
    id: 2,
    question: "¿Con qué frecuencia experimentas estos sentimientos?",
    subtitle: "Tu respuesta nos ayuda a personalizar mejor tu experiencia.",
    icon: "📅",
    options: [
      { id: "a", text: "Todos los días", icon: "🔴", description: "Es algo que siento constantemente" },
      { id: "b", text: "Varias veces a la semana", icon: "🟠", description: "Ocurre con bastante regularidad" },
      { id: "c", text: "Ocasionalmente", icon: "🟡", description: "Aparece en situaciones específicas" },
      { id: "d", text: "Raramente, pero quiero prevenir", icon: "🟢", description: "Busco mejorar de forma preventiva" },
    ],
  },
  {
    id: 3,
    question: "¿Qué tiempo puedes dedicar a tu bienestar?",
    subtitle: "Adaptamos el programa a tu ritmo de vida.",
    icon: "⏰",
    options: [
      { id: "a", text: "5-10 minutos al día", icon: "⚡", description: "Tengo poco tiempo pero quiero empezar" },
      { id: "b", text: "15-20 minutos al día", icon: "🕐", description: "Puedo dedicar un rato moderado" },
      { id: "c", text: "30 minutos o más", icon: "🕐", description: "Tengo tiempo suficiente para dedicarme" },
      { id: "d", text: "Varía según el día", icon: "📱", description: "Mi agenda es irregular" },
    ],
  },
  {
    id: 4,
    question: "¿Has intentado alguna vez técnicas de relajación o meditación?",
    subtitle: "Queremos saber tu punto de partida.",
    icon: "🧘",
    options: [
      { id: "a", text: "Nunca lo he intentado", icon: "🌱", description: "Soy completamente nuevo/a en esto" },
      { id: "b", text: "Lo he intentado brevemente", icon: "🌿", description: "He probado pero sin consistencia" },
      { id: "c", text: "Tengo algo de experiencia", icon: "🌳", description: "Practico ocasionalmente" },
      { id: "d", text: "Soy bastante consistente", icon: "🌲", description: "Ya tengo una práctica establecida" },
    ],
  },
  {
    id: 5,
    question: "¿Cómo prefieres experimentar la hipnoterapia?",
    subtitle: "Tu preferencia determina el formato ideal para ti.",
    icon: "🎧",
    options: [
      { id: "a", text: "Guiado por voz (audio)", icon: "🎙️", description: "Prefiero escuchar instrucciones de voz" },
      { id: "b", text: "Con música y sonidos", icon: "🎵", description: "La música me ayuda a relajarme mejor" },
      { id: "c", text: "Combinación de ambos", icon: "✨", description: "Quiero lo mejor de las dos opciones" },
      { id: "d", text: "No tengo preferencia", icon: "🤷", description: "Estoy abierto/a a cualquier formato" },
    ],
  },
  {
    id: 6,
    question: "¿Cuál es tu mayor desafío actual?",
    subtitle: "Sé honesto/a, esta información es completamente privada.",
    icon: "💭",
    options: [
      { id: "a", text: "Pensamientos negativos recurrentes", icon: "🌀", description: "Mi mente no para de dar vueltas" },
      { id: "b", text: "Falta de motivación", icon: "🔋", description: "Me cuesta encontrar energía y entusiasmo" },
      { id: "c", text: "Relaciones interpersonales", icon: "👥", description: "Dificultades en mis relaciones" },
      { id: "d", text: "Trabajo o productividad", icon: "💼", description: "El estrés laboral me afecta mucho" },
    ],
  },
];

const recommendations = {
  stress: {
    title: "Programa de Relajación Profunda",
    subtitle: "Tu plan personalizado de hipnoterapia",
    description:
      "Basándonos en tus respuestas, hemos diseñado un programa especial enfocado en reducir el estrés y cultivar una paz interior duradera. La hipnoterapia guiada te llevará a un estado de relajación profunda donde tu mente puede sanar y renovarse.",
    features: [
      "Sesiones diarias de 10-20 minutos",
      "Técnicas de respiración consciente",
      "Visualizaciones relajantes guiadas",
      "Reprogramación de patrones de estrés",
      "Seguimiento de tu progreso",
    ],
    badge: "Más popular",
    badgeColor: COLORS.success,
    icon: "🌊",
    color: "#7c3aed",
  },
  sleep: {
    title: "Sueño Reparador",
    subtitle: "Tu plan personalizado de hipnoterapia",
    description:
      "Tu perfil indica que mejorar la calidad del sueño es tu prioridad. Nuestro programa especializado combina hipnoterapia con técnicas probadas para ayudarte a conciliar el sueño naturalmente y despertar renovado/a cada mañana.",
    features: [
      "Rutinas de relajación nocturna",
      "Hipnosis para inducir el sueño",
      "Técnicas de desconexión mental",
      "Programas de sueño profundo",
      "Alarmas de bienestar matutino",
    ],
    badge: "Recomendado",
    badgeColor: COLORS.accent,
    icon: "🌙",
    color: "#06b6d4",
  },
  confidence: {
    title: "Confianza y Empoderamiento",
    subtitle: "Tu plan personalizado de hipnoterapia",
    description:
      "Hemos identificado que construir confianza y autoestima es lo que más necesitas. Nuestro programa de hipnoterapia te ayudará a reprogramar las creencias limitantes y descubrir tu potencial interior más poderoso.",
    features: [
      "Afirmaciones hipnóticas personalizadas",
      "Visualizaciones de éxito",
      "Reprogramación de autoconcepto",
      "Técnicas de PNL integradas",
      "Seguimiento de logros diarios",
    ],
    badge: "Transformador",
    badgeColor: COLORS.warning,
    icon: "⭐",
    color: "#f59e0b",
  },
  fears: {
    title: "Liberación de Miedos",
    subtitle: "Tu plan personalizado de hipnoterapia",
    description:
      "Tu perfil muestra que superar miedos o fobias es tu objetivo principal. La hipnoterapia es una de las técnicas más efectivas para trabajar con miedos a nivel subconsciente, permitiéndote liberarte y vivir con más libertad.",
    features: [
      "Exposición gradual guiada",
      "Reprogramación de respuestas al miedo",
      "Técnicas de anclaje emocional",
      "Sesiones de desensibilización",
      "Apoyo continuo personalizado",
    ],
    badge: "Efectivo",
    badgeColor: COLORS.error,
    icon: "🦋",
    color: "#ef4444",
  },
};

function getRecommendation(answers) {
  const firstAnswer = answers[0];
  if (firstAnswer === "a") return recommendations.stress;
  if (firstAnswer === "b") return recommendations.sleep;
  if (firstAnswer === "c") return recommendations.confidence;
  if (firstAnswer === "d") return recommendations.fears;
  return recommendations.stress;
}

export default function App() {
  const [screen, setScreen] = useState("intro"); // intro | quiz | loading | result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestion) / totalQuestions) * 100;

  const handleStart = () => {
    setScreen("quiz");
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption(null);
  };

  const handleSelectOption = (optionId) => {
    if (animating) return;
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (!selectedOption || animating) return;
    setAnimating(true);
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion + 1 >= totalQuestions) {
        setScreen("loading");
        setTimeout(() => {
          setScreen("result");
          setAnimating(false);
        }, 2800);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setAnimating(false);
      }
    }, 300);
  };

  const handleRestart = () => {
    setScreen("intro");
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption(null);
    setEmail("");
    setEmailSubmitted(false);
  };

  // TODO: Implementar envío real de email a backend/CRM de Hypnari
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubmitted(true);
    }
  };

  const recommendation = answers.length > 0 ? getRecommendation(answers) : recommendations.stress;

  const styles = {
    app: {
      minHeight: "100vh",
      background: COLORS.bg,
      color: COLORS.text,
      fontFamily: "'Inter', 'Manrope', system-ui, sans-serif",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 24px",
      borderBottom: `1px solid ${COLORS.border}`,
      background: COLORS.surface,
      backdropFilter: "blur(10px)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    logo: {
      fontSize: "22px",
      fontWeight: "700",
      background: COLORS.gradient1,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      letterSpacing: "-0.5px",
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
    },
    container: {
      width: "100%",
      maxWidth: "640px",
      margin: "0 auto",
    },
  };

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <span style={styles.logo}>Hypnari</span>
        {screen === "quiz" && (
          <span style={{ color: COLORS.textMuted, fontSize: "14px", fontWeight: "500" }}>
            {currentQuestion + 1} / {totalQuestions}
          </span>
        )}
        {screen !== "intro" && screen !== "quiz" && (
          <button
            onClick={handleRestart}
            style={{
              background: "transparent",
              border: `1px solid ${COLORS.border}`,
              color: COLORS.textMuted,
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = COLORS.primary;
              e.target.style.color = COLORS.primaryLight;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = COLORS.border;
              e.target.style.color = COLORS.textMuted;
            }}
          >
            Reiniciar
          </button>
        )}
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.container}>

          {/* ======== INTRO SCREEN ======== */}
          {screen === "intro" && (
            <div style={{ textAlign: "center", animation: "fadeIn 0.6s ease" }}>
              {/* Hero Icon */}
              <div style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7c3aed20, #06b6d420)",
                border: `2px solid ${COLORS.primary}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 28px",
                fontSize: "42px",
              }}>
                🧠
              </div>

              {/* Badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: `${COLORS.primary}20`,
                border: `1px solid ${COLORS.primary}40`,
                borderRadius: "20px",
                padding: "6px 16px",
                marginBottom: "20px",
                fontSize: "12px",
                color: COLORS.primaryLight,
                fontWeight: "600",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}>
                ✨ Quiz personalizado
              </div>

              <h1 style={{
                fontSize: "clamp(28px, 5vw, 40px)",
                fontWeight: "800",
                lineHeight: "1.15",
                marginBottom: "16px",
                letterSpacing: "-0.5px",
                color: COLORS.text,
              }}>
                Descubre tu plan{" "}
                <span style={{
                  background: COLORS.gradient1,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  personalizado
                </span>
                {" "}de hipnoterapia
              </h1>

              <p style={{
                fontSize: "16px",
                color: COLORS.textMuted,
                lineHeight: "1.65",
                marginBottom: "36px",
                maxWidth: "480px",
                margin: "0 auto 36px",
              }}>
                Responde {totalQuestions} preguntas rápidas y recibirás una recomendación
                adaptada exactamente a tus necesidades y objetivos.
              </p>

              {/* Stats */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "32px",
                marginBottom: "40px",
                flexWrap: "wrap",
              }}>
                {[
                  { value: "50K+", label: "Usuarios activos" },
                  { value: "2 min", label: "Duración del quiz" },
                  { value: "98%", label: "Satisfacción" },
                ].map((stat) => (
                  <div key={stat.label} style={{ textAlign: "center" }}>
                    <div style={{
                      fontSize: "22px",
                      fontWeight: "800",
                      background: COLORS.gradient1,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: "12px", color: COLORS.textSubtle, marginTop: "2px" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={handleStart}
                style={{
                  background: COLORS.gradient1,
                  border: "none",
                  color: COLORS.white,
                  padding: "16px 48px",
                  borderRadius: "50px",
                  fontSize: "17px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: `0 8px 32px ${COLORS.primary}50`,
                  letterSpacing: "0.3px",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = `0 12px 40px ${COLORS.primary}70`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = `0 8px 32px ${COLORS.primary}50`;
                }}
              >
                Comenzar quiz →
              </button>

              <p style={{ marginTop: "16px", fontSize: "13px", color: COLORS.textSubtle }}>
                🔒 Tus respuestas son completamente privadas
              </p>

              {/* Feature Cards */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "12px",
                marginTop: "48px",
              }}>
                {[
                  { icon: "🎯", title: "Personalizado", desc: "Resultados únicos para ti" },
                  { icon: "⚡", title: "Rápido", desc: "Solo 2 minutos" },
                  { icon: "🧘", title: "Efectivo", desc: "Técnicas respaldadas" },
                ].map((feat) => (
                  <div
                    key={feat.title}
                    style={{
                      background: COLORS.surfaceCard,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "16px",
                      padding: "20px 16px",
                      textAlign: "center",
                      transition: "border-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = COLORS.primary + "60";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = COLORS.border;
                    }}
                  >
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>{feat.icon}</div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: COLORS.text, marginBottom: "4px" }}>
                      {feat.title}
                    </div>
                    <div style={{ fontSize: "12px", color: COLORS.textSubtle }}>
                      {feat.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======== QUIZ SCREEN ======== */}
          {screen === "quiz" && (
            <div style={{ opacity: animating ? 0 : 1, transition: "opacity 0.3s ease" }}>
              {/* Progress Bar */}
              <div style={{ marginBottom: "32px" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}>
                  <span style={{ fontSize: "13px", color: COLORS.textMuted, fontWeight: "500" }}>
                    Pregunta {currentQuestion + 1} de {totalQuestions}
                  </span>
                  <span style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    color: COLORS.primaryLight,
                  }}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div style={{
                  height: "6px",
                  background: COLORS.border,
                  borderRadius: "10px",
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: COLORS.gradient1,
                    borderRadius: "10px",
                    transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }} />
                </div>
                {/* Step dots */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "8px",
                  padding: "0 2px",
                }}>
                  {quizQuestions.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: i < currentQuestion
                          ? COLORS.primary
                          : i === currentQuestion
                          ? COLORS.primaryLight
                          : COLORS.border,
                        transition: "background 0.3s ease",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Question Card */}
              <div style={{
                background: COLORS.surfaceCard,
                borderRadius: "24px",
                padding: "28px 24px",
                marginBottom: "20px",
                border: `1px solid ${COLORS.border}`,
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: "12px",
                }}>
                  <span style={{ fontSize: "32px" }}>
                    {quizQuestions[currentQuestion].icon}
                  </span>
                  <div>
                    <h2 style={{
                      fontSize: "clamp(18px, 3vw, 22px)",
                      fontWeight: "800",
                      lineHeight: "1.25",
                      color: COLORS.text,
                      margin: 0,
                    }}>
                      {quizQuestions[currentQuestion].question}
                    </h2>
                  </div>
                </div>
                <p style={{
                  fontSize: "14px",
                  color: COLORS.textMuted,
                  lineHeight: "1.5",
                  margin: 0,
                }}>
                  {quizQuestions[currentQuestion].subtitle}
                </p>
              </div>

              {/* Options */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "24px",
              }}>
                {quizQuestions[currentQuestion].options.map((option) => {
                  const isSelected = selectedOption === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "16px 20px",
                        background: isSelected
                          ? `linear-gradient(135deg, ${COLORS.primary}25, ${COLORS.accent}15)`
                          : COLORS.surface,
                        border: `2px solid ${isSelected ? COLORS.primary : COLORS.border}`,
                        borderRadius: "16px",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s ease",
                        transform: isSelected ? "scale(1.01)" : "scale(1)",
                        boxShadow: isSelected
                          ? `0 4px 20px ${COLORS.primary}30`
                          : "none",
                        width: "100%",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = COLORS.borderLight;
                          e.currentTarget.style.background = COLORS.surfaceCard;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = COLORS.border;
                          e.currentTarget.style.background = COLORS.surface;
                        }
                      }}
                    >
                      {/* Option Icon */}
                      <span style={{
                        fontSize: "22px",
                        minWidth: "32px",
                        textAlign: "center",
                      }}>
                        {option.icon}
                      </span>

                      {/* Option Text */}
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: "15px",
                          fontWeight: "600",
                          color: isSelected ? COLORS.primaryLight : COLORS.text,
                          marginBottom: "3px",
                          lineHeight: "1.3",
                        }}>
                          {option.text}
                        </div>
                        <div style={{
                          fontSize: "12px",
                          color: COLORS.textSubtle,
                          lineHeight: "1.4",
                        }}>
                          {option.description}
                        </div>
                      </div>

                      {/* Check */}
                      <div style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        border: `2px solid ${isSelected ? COLORS.primary : COLORS.border}`,
                        background: isSelected ? COLORS.primary : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.2s ease",
                      }}>
                        {isSelected && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={!selectedOption || animating}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: selectedOption ? COLORS.gradient1 : COLORS.border,
                  border: "none",
                  borderRadius: "16px",
                  color: selectedOption ? COLORS.white : COLORS.textSubtle,
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: selectedOption ? "pointer" : "not-allowed",
                  transition: "all 0.25s ease",
                  boxShadow: selectedOption ? `0 6px 24px ${COLORS.primary}40` : "none",
                  letterSpacing: "0.3px",
                }}
                onMouseEnter={(e) => {
                  if (selectedOption) {
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = `0 10px 32px ${COLORS.primary}60`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  if (selectedOption) {
                    e.target.style.boxShadow = `0 6px 24px ${COLORS.primary}40`;
                  }
                }}
              >
                {currentQuestion + 1 >= totalQuestions ? "Ver mi resultado →" : "Siguiente pregunta →"}
              </button>

              {currentQuestion > 0 && (
                <button
                  onClick={() => {
                    setCurrentQuestion(currentQuestion - 1);
                    setAnswers(answers.slice(0, -1));
                    setSelectedOption(null);
                  }}
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    padding: "12px",
                    background: "transparent",
                    border: "none",
                    color: COLORS.textSubtle,
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.target.style.color = COLORS.textMuted; }}
                  onMouseLeave={(e) => { e.target.style.color = COLORS.textSubtle; }}
                >
                  ← Pregunta anterior
                </button>
              )}
            </div>
          )}

          {/* ======== LOADING SCREEN ======== */}
          {screen === "loading" && (
            <div style={{ textAlign: "center", animation: "fadeIn 0.4s ease" }}>
              {/* Animated Orb */}
              <div style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: `radial-gradient(circle at 35% 35%, ${COLORS.primaryLight}, ${COLORS.primary}, ${COLORS.primaryDark})`,
                margin: "0 auto 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 60px ${COLORS.primary}60, 0 0 120px ${COLORS.primary}30`,
                animation: "pulse 1.5s ease-in-out infinite",
                fontSize: "48px",
              }}>
                🧠
              </div>

              <h2 style={{
                fontSize: "26px",
                fontWeight: "800",
                marginBottom: "12px",
                color: COLORS.text,
              }}>
                Analizando tus respuestas...
              </h2>
              <p style={{
                fontSize: "15px",
                color: COLORS.textMuted,
                marginBottom: "40px",
                lineHeight: "1.6",
              }}>
                Estamos creando tu plan personalizado de hipnoterapia basado en tu perfil único.
              </p>

              {/* Loading Steps */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                maxWidth: "320px",
                margin: "0 auto",
                textAlign: "left",
              }}>
                {[
                  { text: "Procesando tus objetivos personales", delay: "0s" },
                  { text: "Identificando patrones de bienestar", delay: "0.5s" },
                  { text: "Seleccionando técnicas hipnóticas", delay: "1s" },
                  { text: "Generando tu recomendación única", delay: "1.5s" },
                ].map((step, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      background: COLORS.surfaceCard,
                      borderRadius: "12px",
                      border: `1px solid ${COLORS.border}`,
                      animation: `slideInLeft 0.4s ease ${step.delay} both`,
                    }}
                  >
                    <div style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: COLORS.gradient1,
                      animation: `blink 1s ease ${step.delay} infinite`,
                    }} />
                    <span style={{ fontSize: "13px", color: COLORS.textMuted }}>
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======== RESULT SCREEN ======== */}
          {screen === "result" && (
            <div style={{ animation: "fadeIn 0.6s ease" }}>
              {/* Success Header */}
              <div style={{
                textAlign: "center",
                marginBottom: "28px",
              }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: `${COLORS.success}20`,
                  border: `1px solid ${COLORS.success}40`,
                  borderRadius: "20px",
                  padding: "6px 18px",
                  marginBottom: "16px",
                  fontSize: "13px",
                  color: COLORS.success,
                  fontWeight: "600",
                }}>
                  ✅ ¡Tu resultado está listo!
                </div>

                <h1 style={{
                  fontSize: "clamp(22px, 4vw, 32px)",
                  fontWeight: "800",
                  lineHeight: "1.2",
                  color: COLORS.text,
                  marginBottom: "8px",
                }}>
                  Tu plan personalizado
                </h1>
                <p style={{
                  fontSize: "15px",
                  color: COLORS.textMuted,
                }}>
                  Basado en {totalQuestions} respuestas sobre tu perfil
                </p>
              </div>

              {/* Main Recommendation Card */}
              <div style={{
                background: `linear-gradient(145deg, ${recommendation.color}15, ${COLORS.surfaceCard})`,
                border: `2px solid ${recommendation.color}40`,
                borderRadius: "24px",
                padding: "28px 24px",
                marginBottom: "20px",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Badge */}
                <div style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: recommendation.badgeColor,
                  color: COLORS.white,
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  letterSpacing: "0.5px",
                }}>
                  {recommendation.badge}
                </div>

                {/* Background decoration */}
                <div style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: `${recommendation.color}10`,
                  filter: "blur(30px)",
                  pointerEvents: "none",
                }} />

                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                  <div style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    background: `${recommendation.color}20`,
                    border: `1px solid ${recommendation.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    flexShrink: 0,
                  }}>
                    {recommendation.icon}
                  </div>
                  <div>
                    <p style={{
                      fontSize: "12px",
                      color: COLORS.textSubtle,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: "600",
                      marginBottom: "4px",
                    }}>
                      {recommendation.subtitle}
                    </p>
                    <h2 style={{
                      fontSize: "clamp(18px, 3vw, 22px)",
                      fontWeight: "800",
                      color: COLORS.text,
                      lineHeight: "1.2",
                      margin: 0,
                    }}>
                      {recommendation.title}
                    </h2>
                  </div>
                </div>

                <p style={{
                  fontSize: "14px",
                  color: COLORS.textMuted,
                  lineHeight: "1.65",
                  marginBottom: "20px",
                }}>
                  {recommendation.description}
                </p>

                {/* Features */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}>
                  {recommendation.features.map((feat, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: `${recommendation.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5 3.5-4" stroke={recommendation.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span style={{ fontSize: "13px", color: COLORS.textMuted }}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Capture */}
              {!emailSubmitted ? (
                <div style={{
                  background: COLORS.surfaceCard,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: "20px",
                  padding: "24px",
                  marginBottom: "16px",
                  textAlign: "center",
                }}>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    marginBottom: "8px",
                    color: COLORS.text,
                  }}>
                    🎁 Accede a tu plan completo
                  </h3>
                  <p style={{
                    fontSize: "13px",
                    color: COLORS.textMuted,
                    marginBottom: "20px",
                    lineHeight: "1.5",
                  }}>
                    Recibe tu programa personalizado y 7 días de acceso gratuito a Hypnari.
                  </p>
                  {/* TODO: Conectar formulario con backend/CRM de Hypnari */}
                  <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      style={{
                        padding: "14px 18px",
                        background: COLORS.surface,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: "12px",
                        color: COLORS.text,
                        fontSize: "15px",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = COLORS.primary; }}
                      onBlur={(e) => { e.target.style.borderColor = COLORS.border; }}
                    />
                    <button
                      type="submit"
                      style={{
                        padding: "14px",
                        background: COLORS.gradient1,
                        border: "none",
                        borderRadius: "12px",
                        color: COLORS.white,
                        fontSize: "15px",
                        fontWeight: "700",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: `0 6px 20px ${COLORS.primary}40`,
                        letterSpacing: "0.3px",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-1px)";
                        e.target.style.boxShadow = `0 10px 28px ${COLORS.primary}60`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = `0 6px 20px ${COLORS.primary}40`;
                      }}
                    >
                      Obtener acceso gratuito →
                    </button>
                  </form>
                  <p style={{ fontSize: "11px", color: COLORS.textSubtle, marginTop: "12px" }}>
                    Sin tarjeta de crédito · Cancela cuando quieras
                  </p>
                </div>
              ) : (
                <div style={{
                  background: `${COLORS.success}15`,
                  border: `1px solid ${COLORS.success}40`,
                  borderRadius: "20px",
                  padding: "24px",
                  marginBottom: "16px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎉</div>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: COLORS.success,
                    marginBottom: "8px",
                  }}>
                    ¡Listo! Revisa tu email
                  </h3>
                  <p style={{
                    fontSize: "14px",
                    color: COLORS.textMuted,
                    lineHeight: "1.5",
                  }}>
                    Hemos enviado tu plan personalizado a <strong style={{ color: COLORS.text }}>{email}</strong>.
                    Incluye 7 días de prueba gratuita.
                  </p>
                </div>
              )}

              {/* Social Proof */}
              <div style={{
                background: COLORS.surfaceCard,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "20px",
                padding: "20px",
                marginBottom: "16px",
              }}>
                <p style={{
                  fontSize: "12px",
                  color: COLORS.textSubtle,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  fontWeight: "600",
                  marginBottom: "14px",
                }}>
                  Lo que dicen nuestros usuarios
                </p>
                {[
                  {
                    text: "\"Después de solo 2 semanas noté una diferencia increíble en mi calidad de sueño.\"",
                    author: "María G.",
                    stars: 5,
                  },
                  {
                    text: "\"Nunca pensé que la hipnoterapia podría ayudarme tanto con el estrés laboral.\"",
                    author: "Carlos M.",
                    stars: 5,
                  },
                ].map((review, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "12px 0",
                      borderTop: i > 0 ? `1px solid ${COLORS.border}` : "none",
                    }}
                  >
                    <div style={{ display: "flex", gap: "2px", marginBottom: "6px" }}>
                      {[...Array(review.stars)].map((_, s) => (
                        <span key={s} style={{ color: COLORS.warning, fontSize: "14px" }}>★</span>
                      ))}
                    </div>
                    <p style={{
                      fontSize: "13px",
                      color: COLORS.textMuted,
                      lineHeight: "1.5",
                      fontStyle: "italic",
                      marginBottom: "6px",
                    }}>
                      {review.text}
                    </p>
                    <p style={{ fontSize: "12px", color: COLORS.textSubtle, fontWeight: "600" }}>
                      — {review.author}
                    </p>
                  </div>
                ))}
              </div>

              {/* Retake Quiz */}
              <button
                onClick={handleRestart}
                style={{
                  width: "100%",
                  padding: "13px",
                  background: "transparent",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: "12px",
                  color: COLORS.textMuted,
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = COLORS.borderLight;
                  e.target.style.color = COLORS.text;
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = COLORS.border;
                  e.target.style.color = COLORS.textMuted;
                }}
              >
                ↩ Volver a empezar el quiz
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        padding: "20px 24px",
        borderTop: `1px solid ${COLORS.border}`,
        background: COLORS.surface,
      }}>
        <p style={{ fontSize: "12px", color: COLORS.textSubtle }}>
          {/* TODO: Añadir links reales a políticas de privacidad y términos de Hypnari */}
          © 2024 Hypnari · Privacidad · Términos · Soporte
        </p>
      </footer>

      {/* Global Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: ${COLORS.bg};
          color: ${COLORS.text};
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 60px ${COLORS.primary}60, 0 0 120px ${COLORS.primary}30; }
          50% { transform: scale(1.06); box-shadow: 0 0 80px ${COLORS.primary}80, 0 0 160px ${COLORS.primary}40; }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        ::selection {
          background: ${COLORS.primary}40;
          color: ${COLORS.text};
        }

        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: ${COLORS.bg};
        }
        ::-webkit-scrollbar-thumb {
          background: ${COLORS.border};
          border-radius: 3px;
        }

        input::placeholder {
          color: ${COLORS.textSubtle};
        }

        button:focus-visible {
          outline: 2px solid ${COLORS.primary};
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}