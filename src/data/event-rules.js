// Rules shown in the popup when a visitor clicks REGISTER on an event card.
// Keyed by the registration slug used in each event's `registrationPath`.
// Source: "EVENTS RULES FOR POSTER" PDF. Workshops have no rules and register directly.
export const eventRules = {
  debate: {
    title: "ThiraiVaadham – Debate",
    prizePool: "Rs. 4500",
    rules: [
      "Each team must have exactly 2 registered members.",
      "Round 1 topics will be announced along with registration.",
      "1 minute will be given for preparation before the debate.",
      "Each match will get 6 minutes to present their arguments and rebuttals.",
      "1 minute will be allotted for judging after each debate.",
      "Teams will be judged on content, arguments, communication and teamwork.",
      "Keep the debate respectful – no personal attacks, insults or discrimination.",
    ],
  },
  "stage-play": {
    title: "Stage Play",
    prizePool: "Rs. 5000",
    rules: [
      "Crew Size: 1 – 10 participants per team.",
      "Time Limit: Maximum 15 minutes (curtain to curtain).",
      "Stage Etiquette: Clean content only – no vulgarity, obscenity, or offensive gestures.",
      "Audio & Setup: Upload tracks to the official Drive link in advance; props and costumes permitted.",
      "Participants must maintain discipline and follow the instructions provided by the organizers.",
      "Verdict: Judged on creativity and execution; judges' decisions are final and binding.",
    ],
  },
  quizcorn: {
    title: "Quizcorn",
    prizePool: null,
    rules: [
      "Maximum 3 members per team.",
      "Every participant must register individually.",
      "Round 1 – Preliminary: Online MCQ round conducted at the venue; teams scoring well will qualify for the next round.",
      "Round 2 – Shortlist: Qualified teams compete in the next stage, and the best-performing teams move to the final.",
      "Round 3 – Rapid Fire: A fast-paced final round where shortlisted teams battle it out for the win.",
      "Questions will cover both Tamil and English movies.",
      "Quizmaster's decision will be final.",
    ],
  },
  "graphics-grid": {
    title: "Graphics Grid",
    prizePool: "Rs. 4000",
    rules: [
      "Participants must design an original poster based on the given theme. (Use of AI tools is strictly prohibited.)",
      "Posters must be submitted via the designated Google Drive link before the deadline.",
      "The Top 10 posters will be shortlisted for the final round.",
      "In the final round, participants must create a fresh poster based on new content provided.",
      "Judges will select the Top 3 posters for prizes.",
      "Theme: Cinema – creativity and effective use of elements will be the key criteria.",
    ],
  },
  "stills-of-soul": {
    title: "Stills of Soul",
    prizePool: "Rs. 4000",
    rules: [
      "Register and upload your best original shot via the official Drive link before the deadline.",
      "100% original work only; raw files and EXIF data must be retained for verification.",
      "Top 10 entries advance to the grand finale and will feature in the official Photo Exhibition.",
      "Final Round (On-Campus): Finalists will shoot live inside the CIT campus based on an on-the-spot theme.",
      "Finalists must carry their original soft copies to campus for ownership clearance.",
      "Top 3 standout captures will claim the final prizes.",
    ],
  },
  cineplus: {
    title: "CinePlus",
    prizePool: "Rs. 12000 (subject to change depending on registration)",
    rules: [
      "Each short film must not exceed 3 minutes.",
      "Entries must be submitted via the designated Google Drive link before the deadline.",
      "The Top 10 entries will be shortlisted and invited to campus.",
      "Shortlisted films will be judged, and the Top 3 will be selected.",
      "The final 10 films will be presented before the Guest of Honour, who will decide the winners.",
      "Entries containing political, violent, or religious content are discouraged.",
      "Theme: Thirukkural – choose any one Thirukkural and build your short film around its core message. The Kural must be included in the short film.",
    ],
  },
  brainstorm: {
    title: "Brainstorm",
    prizePool: "Rs. 3500",
    rules: [
      "Select from 5–10 on-the-spot loglines and craft your script within both sides of the provided sheet.",
      "Submissions must follow the issued template, including synopsis, scene beats, and dialogue.",
      "Time Duration: 60 to 90 minutes to write and finalize your script.",
      "Maintain clean language – vulgarity, obscenity, or inappropriate themes will lead to disqualification.",
      "Preliminary screening decides the Top 10 finalists, who advance to judgment by the guest jury.",
    ],
  },
  adaptune: {
    title: "AdapTune",
    prizePool: "Rs. 3500",
    rules: [
      "Category: Solo and Duo entries permitted.",
      "2-minute mixed audio track featuring 2–4 impromptu music transitions.",
      "Complete registration before the deadline and assemble at the venue 10–15 minutes early.",
      "Be stage-ready on call; tardiness can lead to immediate disqualification.",
      "Maintain high sportsmanship, mutual respect, and discipline throughout the event.",
      "Jury decisions are final and binding.",
    ],
  },
}
