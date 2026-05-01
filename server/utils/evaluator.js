const evaluateTask = (description) => {
  if (!description) {
    return {
      score: 0,
      feedback: "Task description is missing.",
    };
  }

  let score = 0;

  const engineeringKeywords = [
    "api",
    "database",
    "ui",
    "fix",
    "implement",
    "route",
    "middleware",
    "auth",
    "component",
    "deployment",
    "backend",
    "frontend",
    "optimize",
    "jwt",
    "mongodb",
    "dashboard",
    "integration",
    "security",
    "performance",
  ];

  const actionVerbs = [
    "build",
    "create",
    "setup",
    "debug",
    "test",
    "integrate",
    "develop",
    "design",
    "optimize",
    "implement",
  ];

  const words = description
    .toLowerCase()
    .split(/\s+/);

  // ================= LENGTH =================

  if (description.length > 30) score += 3;

  if (description.length > 60) score += 2;

  // ================= ENGINEERING KEYWORDS =================

  const foundKeywords =
    engineeringKeywords.filter((kw) =>
      words.includes(kw)
    );

  score += foundKeywords.length * 1.2;

  // ================= ACTION VERBS =================

  if (
    actionVerbs.some((verb) =>
      words.includes(verb)
    )
  ) {
    score += 2;
  }

  // ================= FINAL SCORE =================

  score = Math.min(
    Math.round(score),
    10
  );

  // ================= FEEDBACK =================

  let feedback = "";

  if (score <= 3) {
    feedback =
      "Task lacks technical specificity and implementation clarity.";
  } else if (score <= 6) {
    feedback =
      "Task has moderate engineering direction but can be more detailed.";
  } else if (score <= 8) {
    feedback =
      "Good engineering task with clear technical scope and measurable intent.";
  } else {
    feedback =
      "Excellent technical task with strong implementation clarity and engineering direction.";
  }

  return {
    score,
    feedback,
  };
};

module.exports = { evaluateTask };