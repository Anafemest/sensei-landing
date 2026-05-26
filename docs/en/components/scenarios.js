// Sensei demo scenarios — English version.

window.SENSEI_SCENARIOS = [
  {
    id: "analyst",
    role: "AI Task Analyst",
    ticket: "ISS-054",
    who: "PM · 10:14",
    segments: [
      { text: "Analyze ticket " },
      { text: "ISS-054", code: true },
      { text: ": what's been done, where's the blocker, and what to do next?" },
    ],
    statuses: [
      "Loading messages, comments and attachments",
      "Identifying key decisions and disputed points",
      "Gathering what's been done and which checks passed",
      "Determining current status and main blocker",
      "Forming a brief summary for the task card",
    ],
    result: {
      bullets: [
        "Subscriber moved to switch SW-HKI-214 at 10:42",
        "After migration — packet loss, intermittent drops",
        "NOC: link up, but traffic is unstable",
        "In logs: 17× MAC flapping, 4× storm control",
        "Verify VLAN 312 on intermediate devices",
      ],
    },
  },

  {
    id: "modernization",
    role: "AI Modernization Engineer",
    ticket: "MOD-1192",
    who: "Sales · 12:08",
    segments: [
      { text: "Can the subscriber be connected to the " },
      { text: "1 Gbps", code: true },
      { text: " plan without equipment replacement?" },
    ],
    statuses: [
      "Checking equipment chain to network core",
      "Verifying device models and limitations",
      "Checking tariff compatibility with the scheme",
    ],
    result: {
      rows: [
        { label: "Verdict",       value: "No replacement needed", ok: true },
        { label: "Chain to core", value: "Intact" },
        { label: "Switch port",   value: "1 Gbps supported" },
        { label: "Uplink load",   value: "48% · headroom available" },
      ],
      note: "Upgrade to new plan — no site visit required. Monitor uplink for 7 days.",
    },
  },

  {
    id: "noc",
    role: "AI NOC Engineer",
    ticket: "INC-48217",
    who: "NOC · 03:21",
    segments: [
      { text: "Check for network anomalies and what could be causing the incident?" },
    ],
    statuses: [
      "Collecting data from switches and monitoring",
      "Looking for errors, event spikes and deviations",
      "Correlating with similar incidents",
      "Determining probable cause",
      "Preparing task for manual review",
    ],
    result: {
      rows: [
        { label: "Anomaly",        value: "Node SPb-Aggr-7", accent: true },
        { label: "Probable cause", value: "SFP degradation on uplink" },
        { label: "Similar cases",  value: "3 in 30 days" },
        { label: "Next step",      value: "Module replacement", ok: true },
      ],
      note: "Engineer task created automatically with recommendations.",
    },
  },

  {
    id: "subscriber",
    role: "AI Network & Subscriber Analyst",
    ticket: "SUB-7741",
    who: "Support · 19:54",
    segments: [
      { text: "What's happening with subscriber " },
      { text: "John Smith", code: true },
      { text: " — connection is unstable?" },
    ],
    statuses: [
      "Collecting data from CRM, billing and NMS",
      "Subscriber status, balance, activity",
      "Analyzing node and port load",
      "Comparing with historical patterns",
    ],
    result: {
      rows: [
        { label: "Connection",   value: "Active", ok: true },
        { label: "Access node",  value: "Increasing port errors", accent: true },
        { label: "Evening peak", value: "High load" },
        { label: "Balance",      value: "OK, no risks" },
      ],
      note: "Check node uplink, monitor load for 24 hours.",
    },
  },

  {
    id: "config",
    role: "AI Network Configurator",
    ticket: "CFG-3308",
    who: "L2 Engineer · 14:02",
    segments: [
      { text: "Prepare config for subscriber connection on " },
      { text: "SW-MSK-Aggr-12", code: true },
      { text: "." },
    ],
    statuses: [
      "Reading device parameters and current config",
      "Selecting port and connection parameters",
      "Comparing with working templates",
      "Generating ready config",
    ],
    result: {
      rows: [
        { label: "Config",  value: "config-CFG-3308.txt", accent: true },
        { label: "Port",    value: "Gi0/0/14 · VLAN 312" },
        { label: "Diff",    value: "8 lines · highlighted" },
        { label: "Apply",   value: "By engineer button", ok: true },
      ],
      note: "Engineer only reviews and applies — no manual assembly.",
    },
  },
];
