let aj;
let isSpoofedBot;

async function loadArcjet() {
  if (!aj || !isSpoofedBot) {
    const arcjetModule = await import("../libs/arcjet.mjs");
    aj = arcjetModule.aj;
    isSpoofedBot = arcjetModule.isSpoofedBot;
  }
  return { aj, isSpoofedBot };
}

const arcjetProtection = async (req, res, next) => {
  try {
    const { aj, isSpoofedBot } = await loadArcjet();
    const decision = await aj.protect(req);

    // decision denied
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res.status(429).json({ message: "Rate limit exceeded" });
      else if (decision.reason.isBot())
        return res.status(403).json({ message: "Bot access denied" });
      else
        return res
          .status(403)
          .json({ message: "Access denied by security policy" });
    }

    // spoofed bot
    if (decision.results.some(isSpoofedBot))
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected",
      });

    next();
  } catch (error) {
    console.log("Arcjet error", error);
    next();
  }
};

module.exports = arcjetProtection;
