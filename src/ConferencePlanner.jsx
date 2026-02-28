import { useState, useEffect, useRef } from "react";

const SESSIONS = [
  // SUNDAY MARCH 22
  {
    id: "s1", day: "Sunday, March 22", date: "2026-03-22", start: "5:00 PM", end: "7:00 PM",
    title: "Registration Open", room: "Convention Lounge", track: "Networking & Events", speakers: []
  },
  // MONDAY MARCH 23
  {
    id: "m1", day: "Monday, March 23", date: "2026-03-23", start: "9:00 AM", end: "6:00 PM",
    title: "Registration Open", room: "Convention Lounge", track: "Networking & Events", speakers: []
  },
  {
    id: "m2", day: "Monday, March 23", date: "2026-03-23", start: "9:00 AM", end: "12:00 PM",
    title: "Your Next Move: Designing Your Career with Intention", room: "Avignon", track: "Leading at the Edge", speakers: []
  },
  {
    id: "m3", day: "Monday, March 23", date: "2026-03-23", start: "9:30 AM", end: "10:30 AM",
    title: "First Time Attendee Welcome", room: "Bandol 2", track: "Culture + Belonging",
    speakers: ["Lindsey Caplan – The Gathering Effect", "Peter Phelan – ValuesCulture"]
  },
  {
    id: "m4", day: "Monday, March 23", date: "2026-03-23", start: "10:00 AM", end: "4:30 PM",
    title: "The EX Factor Summit", room: "Hermitage", track: "Networking & Events", speakers: []
  },
  {
    id: "m5", day: "Monday, March 23", date: "2026-03-23", start: "10:30 AM", end: "12:00 PM",
    title: "Keeping HR Human: When AI Becomes a Colleague, Not a Replacement", room: "Meursault 1–2", track: "AI + Humanity",
    speakers: ["Jamie Viramontes – Konnect", "Adit Jain – Leena AI"]
  },
  {
    id: "m6", day: "Monday, March 23", date: "2026-03-23", start: "10:30 AM", end: "12:00 PM",
    title: "Rethinking Health Benefits: Real-World Lessons from the Shift to ICHRA", room: "Pomerol", track: "Health + Wellbeing",
    speakers: ["Chris Ellis – Thatch", "Chad Schneider – Thatch", "Matt Roberts – Sequoia", "Alan Silver – Ambetter Health"]
  },
  {
    id: "m7", day: "Monday, March 23", date: "2026-03-23", start: "10:30 AM", end: "12:00 PM",
    title: "People Strategy & Analytics: A Hands-On Workshop Led by Experts & HR Leaders", room: "Bandol 1", track: "Performance Reimagined",
    speakers: ["Dirk Jonker – Crunchr"]
  },
  {
    id: "m8", day: "Monday, March 23", date: "2026-03-23", start: "12:00 PM", end: "1:30 PM",
    title: "Lunch & Networking", room: "Wynn Pavilion", track: "Networking & Events", speakers: []
  },
  {
    id: "m9", day: "Monday, March 23", date: "2026-03-23", start: "12:00 PM", end: "1:30 PM",
    title: "FastPass Meetings", room: "Lafite 1-3", track: "Networking & Events", speakers: []
  },
  {
    id: "m10", day: "Monday, March 23", date: "2026-03-23", start: "1:00 PM", end: "5:00 PM",
    title: "VC + PE Talent Partner Summit", room: "Musigny 1–2", track: "Networking & Events", speakers: []
  },
  {
    id: "m11", day: "Monday, March 23", date: "2026-03-23", start: "1:00 PM", end: "4:00 PM",
    title: "SemperVirens Summit: AI in the Workforce", room: "TBD", track: "Networking & Events", speakers: []
  },
  {
    id: "m12", day: "Monday, March 23", date: "2026-03-23", start: "1:00 PM", end: "2:30 PM",
    title: "Use AI to Make Better Hires, Faster", room: "Meursault 1–2", track: "AI + Humanity",
    speakers: ["Ariana Moon – Greenhouse", "Nkem Nwankwo – Greenhouse"]
  },
  {
    id: "m13", day: "Monday, March 23", date: "2026-03-23", start: "1:00 PM", end: "2:30 PM",
    title: "It's Complicated (and That's Okay): Rewriting the Rules of HR & Finance", room: "Bandol 2", track: "Culture + Belonging",
    speakers: ["Dr. Ken Matos – HiBob", "Brian Martell – HiBob", "Susy Martins – Advise2Rise", "Liana Rodriguez – Viz.ai"]
  },
  {
    id: "m14", day: "Monday, March 23", date: "2026-03-23", start: "1:00 PM", end: "2:30 PM",
    title: "Skills-First Strategies in the Age of AI: Building Resilient, Adaptable Workforces", room: "Bandol 1", track: "Performance Reimagined",
    speakers: ["Stacy Eng – AI Strategy Advisors"]
  },
  {
    id: "m15", day: "Monday, March 23", date: "2026-03-23", start: "2:30 PM", end: "4:00 PM",
    title: "Flexibility Without the Headache: Designing Benefits That Work Harder for Your Budget & Your People", room: "Pomerol", track: "Health + Wellbeing",
    speakers: ["Jaclyn Chen – Benepass", "Megan Burns – Benepass", "Nancy Hauge – Automation Anywhere", "Brandon Bouwkamp – Procore"]
  },
  {
    id: "m16", day: "Monday, March 23", date: "2026-03-23", start: "3:00 PM", end: "4:00 PM",
    title: "Smart Tools, Dumb People Decisions: Who's Actually Running This?", room: "Meursault 1–2", track: "AI + Humanity",
    speakers: ["Matt Poepsel, PhD. – The Predictive Index"]
  },
  {
    id: "m17", day: "Monday, March 23", date: "2026-03-23", start: "3:00 PM", end: "4:00 PM",
    title: "Calibration That Connects: Turning Performance Management into Strategic Advantage", room: "Bandol 2", track: "Culture + Belonging",
    speakers: ["Madeline Grecek – Remote", "Jessica Winder – Winder Law Firm"]
  },
  {
    id: "m18", day: "Monday, March 23", date: "2026-03-23", start: "4:00 PM", end: "5:00 PM",
    title: "The AI Game Show: CHROs Compete to Transform", room: "Bandol 1", track: "Performance Reimagined",
    speakers: ["Danny Guillory – Gametime", "Brandon Sammut – Zapier"]
  },
  {
    id: "m19", day: "Monday, March 23", date: "2026-03-23", start: "5:00 PM", end: "7:00 PM",
    title: "Official Kickoff Reception", room: "Wynn Pavilion", track: "Networking & Events", speakers: []
  },
  // TUESDAY MARCH 24
  {
    id: "t1", day: "Tuesday, March 24", date: "2026-03-24", start: "7:00 AM", end: "8:30 AM",
    title: "Breakfast", room: "TBD", track: "Networking & Events", speakers: []
  },
  {
    id: "t2", day: "Tuesday, March 24", date: "2026-03-24", start: "8:30 AM", end: "8:35 AM",
    title: "Welcome Remarks", room: "Lafite 4-9 (Plenary)", track: "Plenary Stage",
    speakers: ["Brian Elliott – Work Forward"]
  },
  {
    id: "t3", day: "Tuesday, March 24", date: "2026-03-24", start: "8:35 AM", end: "8:55 AM",
    title: "Leading through Uncertainty: How Brilliant Leaders Create Resilient Teams", room: "Lafite 4-9 (Plenary)", track: "Plenary Stage",
    speakers: ["Jon Levy – Influence Labs"]
  },
  {
    id: "t4", day: "Tuesday, March 24", date: "2026-03-24", start: "8:55 AM", end: "9:15 AM",
    title: "The Future of Work: Insights and Strategies from a CHRO", room: "Lafite 4-9 (Plenary)", track: "Plenary Stage",
    speakers: ["Kyle Forrest – Deloitte Consulting", "Inna Landman – Procore Technologies"]
  },
  {
    id: "t5", day: "Tuesday, March 24", date: "2026-03-24", start: "9:45 AM", end: "10:05 AM",
    title: "Making AI Work: A Playbook for Modern HR Leaders", room: "Lafite 4-9", track: "Plenary Stage",
    speakers: ["Lars Schmidt – Amplify Talent", "Jacqui Canney – ServiceNow"]
  },
  {
    id: "t6", day: "Tuesday, March 24", date: "2026-03-24", start: "10:05 AM", end: "10:25 AM",
    title: "Unlocking AI's Potential for Workers: Innovation from Government and Business", room: "Lafite 4-9 (Plenary)", track: "Plenary Stage",
    speakers: ["Jason Desentz – Toshiba", "Maral Kazanjian – Moody's", "Keith Sonderling – U.S. Dept. of Labor", "Dr. Amanda Welsh – Northeastern University"]
  },
  {
    id: "t7", day: "Tuesday, March 24", date: "2026-03-24", start: "10:30 AM", end: "11:00 AM",
    title: "Networking Break", room: "Convention Lounge", track: "Networking & Events", speakers: []
  },
  {
    id: "t8", day: "Tuesday, March 24", date: "2026-03-24", start: "10:45 AM", end: "11:15 AM",
    title: "The Human Edge: What AI Can't Scale – Why Emotional Fluency Is the Leadership Advantage of the Future", room: "EXP – Learning Lab by Deloitte", track: "Learning Lab by Deloitte",
    speakers: ["Claude Silver – VaynerMedia"]
  },
  {
    id: "t9", day: "Tuesday, March 24", date: "2026-03-24", start: "10:45 AM", end: "11:15 AM",
    title: "Building a Head and Heart Organization: The Next Leadership Revolution", room: "EXP – Horizons Stage", track: "Horizons Stage",
    speakers: ["Tracy Layney – Levi Strauss & Co.", "Eric Severson – Neiman Marcus"]
  },
  {
    id: "t10", day: "Tuesday, March 24", date: "2026-03-24", start: "11:20 AM", end: "11:50 AM",
    title: "Change, Disrupted: Humans x Machines Adoption in the AI Era", room: "EXP – Learning Lab by Deloitte", track: "Learning Lab by Deloitte",
    speakers: ["Allyson Dake – Deloitte", "Chris Norman – Deloitte Consulting"]
  },
  {
    id: "t11", day: "Tuesday, March 24", date: "2026-03-24", start: "11:20 AM", end: "11:50 AM",
    title: "The Parallel System: How AI Is About to Give Every Employee a Personal Health Advocate", room: "EXP – Horizons Stage", track: "Horizons Stage",
    speakers: ["Dr. Jordan Shlain – Private Medical"]
  },
  {
    id: "t12", day: "Tuesday, March 24", date: "2026-03-24", start: "11:55 AM", end: "12:25 PM",
    title: "AI@Work: Building Bots for Real-Time Employee Feedback", room: "EXP – Learning Lab by Deloitte", track: "Learning Lab by Deloitte",
    speakers: ["Iris McQuillan-Grace – Jellyfish"]
  },
  {
    id: "t13", day: "Tuesday, March 24", date: "2026-03-24", start: "11:55 AM", end: "12:25 PM",
    title: "Finding Untapped Talent and Breakthroughs at the Edges", room: "EXP – Horizons Stage", track: "Horizons Stage",
    speakers: ["Erskine Faush – 2150 CICG", "Melissa Thompson – Ford Motor Company", "Felice Ajlouny – LevelPath"]
  },
  {
    id: "t14", day: "Tuesday, March 24", date: "2026-03-24", start: "12:00 PM", end: "1:30 PM",
    title: "Lunch & Networking", room: "Wynn Pavilion", track: "Networking & Events", speakers: []
  },
  {
    id: "t15", day: "Tuesday, March 24", date: "2026-03-24", start: "12:00 PM", end: "12:45 PM",
    title: "The CHRO's Blueprint for Connected Talent Systems in the AI Era", room: "Meursault 1–2", track: "AI + Humanity",
    speakers: ["Stacey Harris – Sapient Insights Group", "Arnaud Grunwald – ClearCo"]
  },
  {
    id: "t16", day: "Tuesday, March 24", date: "2026-03-24", start: "12:00 PM", end: "12:45 PM",
    title: "The Rise of Predictive HR: Because Guessing Isn't a Strategy", room: "", track: "Performance Reimagined",
    speakers: ["Lana Peters – Klaar", "Sarika Lamont – Vidyard", "Sunita Solao – Upwork", "Mark Schaerrer – Verisys Corporation"]
  },
  {
    id: "t17", day: "Tuesday, March 24", date: "2026-03-24", start: "1:30 PM", end: "2:00 PM",
    title: "What Actually Changes when AI Enters the People Stack", room: "Meursault 1–2", track: "AI + Humanity",
    speakers: ["Giovanni Luperti – Humaans", "Kit Krugman – Foursquare", "Jevan Lenox – WRITER", "Josh Tanenbaum – Rebalance Capital"]
  },
  {
    id: "t18", day: "Tuesday, March 24", date: "2026-03-24", start: "1:30 PM", end: "2:00 PM",
    title: "The C-Suite Burnout Nobody Talks About", room: "Pomerol", track: "Health + Wellbeing",
    speakers: ["Brad Warga – Heidrick & Struggles", "Mandy Clark – Redwood Materials", "Donald Knight – Warner Bros. Discovery", "Elaine Page – Zinnia"]
  },
  {
    id: "t19", day: "Tuesday, March 24", date: "2026-03-24", start: "1:30 PM", end: "2:00 PM",
    title: "Growing Beyond Borders: Tactical Approaches to Faster Growth Through Global Hiring", room: "Bandol 2", track: "Culture + Belonging",
    speakers: ["Brandon Bouwkamp – Procore", "David Hughson – RemoFirst", "Linda Ho – Nearmap", "Jenny Dearborn – Greenfield Global"]
  },
  {
    id: "t20", day: "Tuesday, March 24", date: "2026-03-24", start: "1:30 PM", end: "2:00 PM",
    title: "Building a Culture of Performance: Insights from 1,800+ Organizations", room: "Bandol 1", track: "Performance Reimagined",
    speakers: ["Justin Angsuwat – Culture Amp", "Amy Lavoie – Culture Amp"]
  },
  {
    id: "t21", day: "Tuesday, March 24", date: "2026-03-24", start: "1:30 PM", end: "2:00 PM",
    title: "The Next Generation Manager: Leadership Skills for an AI-Accelerated Workplace", room: "Avignon", track: "Leading at the Edge",
    speakers: ["Tom Griffiths – Hone", "Amy Schabacker Dufrane – HRCI", "Jason Desentz – Toshiba", "Kaleen Love, PhD – Philip Morris International U.S."]
  },
  {
    id: "t22", day: "Tuesday, March 24", date: "2026-03-24", start: "2:05 PM", end: "2:35 PM",
    title: "How Hypergrowth Companies Compete for Talent in the Age of AI", room: "Meursault 1–2", track: "AI + Humanity",
    speakers: ["David Paffenholz – Juicebox", "Reggie Williams – Sequoia Capital", "Patrick Circelli – Cognition"]
  },
  {
    id: "t23", day: "Tuesday, March 24", date: "2026-03-24", start: "2:05 PM", end: "2:35 PM",
    title: "Mastering the Art of High-Performance Wellbeing", room: "Pomerol", track: "Health + Wellbeing",
    speakers: ["Polly Barnes – EQT", "Livia Martini – Wellhub"]
  },
  {
    id: "t24", day: "Tuesday, March 24", date: "2026-03-24", start: "2:05 PM", end: "2:35 PM",
    title: "Rebuilding Trust When Tough Decisions Have Broken It", room: "Bandol 2", track: "Culture + Belonging",
    speakers: ["Shannon Kirk – California Pizza Kitchen", "Myra Gregorian – Seattle Children's", "Elana Brickner – former CPO, Payoneer", "Julie Bank – Brighton Health Plan Solutions"]
  },
  {
    id: "t25", day: "Tuesday, March 24", date: "2026-03-24", start: "2:05 PM", end: "2:35 PM",
    title: "People Investment in the Age of AI: Trends Shaping Leadership Decisions", room: "Bandol 1", track: "Performance Reimagined",
    speakers: ["Michele Floriani – Sequoia", "Jennifer Christie – DocuSign"]
  },
  {
    id: "t26", day: "Tuesday, March 24", date: "2026-03-24", start: "2:05 PM", end: "2:35 PM",
    title: "Who Owns the Risk When AI Makes the Call?", room: "Avignon", track: "Leading at the Edge", speakers: []
  },
  {
    id: "t27", day: "Tuesday, March 24", date: "2026-03-24", start: "2:05 PM", end: "2:35 PM",
    title: "The Unshakeable Leader: How Deep Purpose Becomes Your Ultimate C-Suite Guide", room: "EXP – Horizons Stage", track: "Horizons Stage",
    speakers: ["Christina McClung – Capital One"]
  },
  {
    id: "t28", day: "Tuesday, March 24", date: "2026-03-24", start: "2:40 PM", end: "3:10 PM",
    title: "Driving HR Excellence in an AI-Centered World: Alight + IBM", room: "Meursault 1–2", track: "AI + Humanity",
    speakers: ["Donna Dorsey – Alight", "Madison Gooch – IBM"]
  },
  {
    id: "t29", day: "Tuesday, March 24", date: "2026-03-24", start: "2:40 PM", end: "3:10 PM",
    title: "The Multi-Generational Care Mandate: How Workplaces Are Rising to the Sandwich Challenge", room: "Pomerol", track: "Health + Wellbeing",
    speakers: ["Deborah Hanus – Sparrow", "Lucy Avsharyan – United Talent Agency", "Jessica Vanscavish – Guardian"]
  },
  {
    id: "t30", day: "Tuesday, March 24", date: "2026-03-24", start: "2:40 PM", end: "3:10 PM",
    title: "The Silent Fallout of DEI Rollbacks", room: "Bandol 2", track: "Culture + Belonging",
    speakers: ["Erin Dangerfield – Golden State Warriors", "Brian Little – Altera, an Intel Company"]
  },
  {
    id: "t31", day: "Tuesday, March 24", date: "2026-03-24", start: "2:40 PM", end: "3:10 PM",
    title: "Workforce Planning 2.0: The AI Signals HR Needs (Before the Board Asks)", room: "Bandol 1", track: "Performance Reimagined",
    speakers: ["Ben Grafentin – Rippling", "Kat Noren – Brightside Health"]
  },
  {
    id: "t32", day: "Tuesday, March 24", date: "2026-03-24", start: "2:40 PM", end: "3:10 PM",
    title: "C-Suite Succession in the Age of Disruption", room: "Avignon", track: "Leading at the Edge",
    speakers: ["Ana White – Lumen Technologies", "Caroline Stockdale – First Solar", "Suzan Morno-Wade – former CHRO, Xerox", "Jessica Swank – Box"]
  },
  {
    id: "t33", day: "Tuesday, March 24", date: "2026-03-24", start: "2:40 PM", end: "3:10 PM",
    title: "Transformation at Enterprise Scale: What the Next Decade Will Demand", room: "EXP – Horizons Stage", track: "Horizons Stage",
    speakers: ["Karen Higgins-Carter – Otsuko Pharma", "Karenann Terrell – AI Investor, former CIO at Walmart"]
  },
  {
    id: "t34", day: "Tuesday, March 24", date: "2026-03-24", start: "3:15 PM", end: "3:45 PM",
    title: "The Next Big Bet: VCs on Emerging Workforce Technologies", room: "Meursault 1–2", track: "AI + Humanity",
    speakers: ["Allison Baum Gates – SemperVirens VC", "Beth Karlsson – Lightspeed Venture Partners", "David ibnAle – Advance Venture Partners"]
  },
  {
    id: "t35", day: "Tuesday, March 24", date: "2026-03-24", start: "3:15 PM", end: "3:45 PM",
    title: "How Women in Sports Are Resetting the Mental Health Conversation", room: "Pomerol", track: "Health + Wellbeing",
    speakers: ["Mercedes Sullivan – McKinley Companies", "Kim Beauvais – FOX Sports", "Camye Mackey – Atlanta Hawks", "Jez Cartwright – Performance Intelligence"]
  },
  {
    id: "t36", day: "Tuesday, March 24", date: "2026-03-24", start: "3:15 PM", end: "3:45 PM",
    title: "Making Customer-First a Cultural Operating System", room: "Bandol 2", track: "Culture + Belonging",
    speakers: ["Lan Lee – San Francisco Giants", "Natasha Valani – Tubi", "Lucia Guillory – Virta Health", "Craig Forman – CultureC Consulting"]
  },
  {
    id: "t37", day: "Tuesday, March 24", date: "2026-03-24", start: "3:15 PM", end: "3:45 PM",
    title: "Fraud, Fakes, and the New Security Perimeter in Recruiting", room: "Avignon", track: "Leading at the Edge",
    speakers: ["Leigh Miller – Gem", "Jason Zoltak – tofu", "Ryan Colthorp – Okta"]
  },
  {
    id: "t38", day: "Tuesday, March 24", date: "2026-03-24", start: "3:50 PM", end: "4:20 PM",
    title: "Your Candidates Are Using AI. Here Is How You Level the Playing Field", room: "Meursault 1–2", track: "AI + Humanity",
    speakers: ["Aaron Wang – Alex.com", "Tim Sackett – HRUTech.com"]
  },
  {
    id: "t39", day: "Tuesday, March 24", date: "2026-03-24", start: "3:50 PM", end: "4:20 PM",
    title: "Designing the Workplace for a Hundred-Year Life", room: "Pomerol", track: "Health + Wellbeing",
    speakers: ["Ginny Cheng – ŌURA", "Cher Murphy – ON Partners", "Rochelle Noone – Stanford Medicine Partners", "Libby Juelsgaard – Function Health"]
  },
  {
    id: "t40", day: "Tuesday, March 24", date: "2026-03-24", start: "3:50 PM", end: "4:20 PM",
    title: "The Loneliness Epidemic: What Your Culture Is Really Creating", room: "Bandol 2", track: "Culture + Belonging",
    speakers: ["Scott Johnson – Motivosity", "Joe Lalley – Joe Lalley Experience Design", "Candice Chafey – Zeta Global"]
  },
  {
    id: "t41", day: "Tuesday, March 24", date: "2026-03-24", start: "3:50 PM", end: "4:20 PM",
    title: "Growing in an AI-Shaped World: Why Skills Now Matter More Than Titles", room: "Bandol 1", track: "Performance Reimagined",
    speakers: ["Tanya Moore – West Monroe", "Lauren Nunes – Twitch", "Helen Russell – HubSpot"]
  },
  {
    id: "t42", day: "Tuesday, March 24", date: "2026-03-24", start: "3:50 PM", end: "4:20 PM",
    title: "Using Strategic Discomfort to Accelerate Organizational Change", room: "Avignon", track: "Leading at the Edge",
    speakers: ["Pamela J. Brown – Crunch Fitness", "Mary-Jo Hewat – Sagen"]
  },
  {
    id: "t43", day: "Tuesday, March 24", date: "2026-03-24", start: "4:30 PM", end: "5:30 PM",
    title: "Official EXP Reception + Office Hours", room: "EXP", track: "Networking & Events", speakers: []
  },
  // WEDNESDAY MARCH 25
  {
    id: "w1", day: "Wednesday, March 25", date: "2026-03-25", start: "7:30 AM", end: "9:00 AM",
    title: "Networking Breakfast", room: "Lafite 1-3 | Sunset Terrace", track: "Networking & Events", speakers: []
  },
  {
    id: "w2", day: "Wednesday, March 25", date: "2026-03-25", start: "8:00 AM", end: "9:00 AM",
    title: "Breakfast Roundtables", room: "Lafite 1-3 | Sunset Terrace", track: "Roundtables", speakers: []
  },
  {
    id: "w3", day: "Wednesday, March 25", date: "2026-03-25", start: "9:00 AM", end: "9:05 AM",
    title: "Welcome Remarks", room: "Lafite 4-9 (Plenary)", track: "Plenary Stage",
    speakers: ["Brian Elliott – Work Forward"]
  },
  {
    id: "w4", day: "Wednesday, March 25", date: "2026-03-25", start: "9:05 AM", end: "9:25 AM",
    title: "Leveling the Playing Field: Reimagining Healthcare Access Through Work", room: "Lafite 4-9 (Plenary)", track: "Plenary Stage",
    speakers: ["Allison Baum Gates – SemperVirens VC", "Hala Borno – Trial Library", "Lance Armstrong – NEXT VENTURES"]
  },
  {
    id: "w5", day: "Wednesday, March 25", date: "2026-03-25", start: "9:25 AM", end: "9:55 AM",
    title: "The Now and Next of Work", room: "Lafite 4-9 (Plenary)", track: "Plenary Stage",
    speakers: ["Jena McGregor – Charter", "Claude Silver – VaynerMedia", "Danny Guillory – Gametime", "Michael Walters – Samsung Semiconductor"]
  },
  {
    id: "w6", day: "Wednesday, March 25", date: "2026-03-25", start: "9:55 AM", end: "10:15 AM",
    title: "Resilience 2.0: Building a Future-Proof Mindset", room: "Lafite 4-9 (Plenary)", track: "Plenary Stage",
    speakers: ["Katie Horwitch – WANT", "Kendall Ellis – Olympian, The Ellis Effect"]
  },
  {
    id: "w7", day: "Wednesday, March 25", date: "2026-03-25", start: "10:30 AM", end: "11:00 AM",
    title: "Networking Break", room: "TBD", track: "Networking & Events", speakers: []
  },
  {
    id: "w8", day: "Wednesday, March 25", date: "2026-03-25", start: "10:50 AM", end: "11:20 AM",
    title: "Win with Confidence: Organization Digital Twin™", room: "EXP – Learning Lab by Deloitte", track: "Learning Lab by Deloitte",
    speakers: ["Casey Caram – Deloitte", "Alex Belisle – Deloitte"]
  },
  {
    id: "w9", day: "Wednesday, March 25", date: "2026-03-25", start: "10:50 AM", end: "11:20 AM",
    title: "The Gen Z Behaviors Every Generation Should Adopt to Thrive at Work", room: "EXP – Horizons Stage", track: "Horizons Stage",
    speakers: ["Maureen Wiley Clough – It Gets Late Early", "Danielle Farage – Danielle Farage LLC"]
  },
  {
    id: "w10", day: "Wednesday, March 25", date: "2026-03-25", start: "11:00 AM", end: "11:30 AM",
    title: "From AI Anxiety to Advantage: How Tinuiti Is Building Bias-Aware Talent Workflows", room: "Meursault 1–2", track: "AI + Humanity",
    speakers: ["Christine Preizler – Sigma Squared", "Jeff Batuhan – Tinuiti", "Dr. Tanaya Devi – Sigma Squared", "Dave Kerr – Tinuiti"]
  },
  {
    id: "w11", day: "Wednesday, March 25", date: "2026-03-25", start: "11:00 AM", end: "11:30 AM",
    title: "The Truth About Workplace Silence: Why Speaking Up Isn't Safe for Everyone", room: "Bandol 2", track: "Culture + Belonging",
    speakers: ["Zech Dahms – achieve Engagement", "Angela Briggs-Paige – Acelero, Inc", "Loly Vadassery – Datamatics Business Solutions"]
  },
  {
    id: "w12", day: "Wednesday, March 25", date: "2026-03-25", start: "11:00 AM", end: "11:30 AM",
    title: "Blending People, Processes, and Values Through Mergers and Acquisition", room: "Bandol 1", track: "Performance Reimagined",
    speakers: ["Donna Flynn – Steelcase", "Emma Woodthorpe – Auralent HR", "Ali Raymond – DoorDash", "Heather Dunn – Brex"]
  },
  {
    id: "w13", day: "Wednesday, March 25", date: "2026-03-25", start: "11:00 AM", end: "11:30 AM",
    title: "When Managers Hold Teams Back: Breaking the Performance Bottleneck", room: "Avignon", track: "Leading at the Edge",
    speakers: ["Jenny Podewils – Leapsome", "Melisa Miller – TKO", "Apple Musni – REI", "John Ferguson – former CHRO, NASCAR"]
  },
  {
    id: "w14", day: "Wednesday, March 25", date: "2026-03-25", start: "11:25 AM", end: "11:55 AM",
    title: "Borders, Belonging & the Future Workforce: Immigration Policy, Automation & the Global Talent Crossroads", room: "EXP – Horizons Stage", track: "Horizons Stage",
    speakers: ["Hannah Spellmeyer – Slingshot Aerospace", "Dani Monaghan – Expedia Group", "Manjuri Sinha – Miro"]
  },
  {
    id: "w15", day: "Wednesday, March 25", date: "2026-03-25", start: "11:35 AM", end: "12:05 PM",
    title: "Why Your Team Doesn't Trust AI (and How to Change That)", room: "Meursault 1–2", track: "AI + Humanity",
    speakers: ["Cathy Peterman – Wayfair", "Lisa Fiondella – iCIMS", "Dan Riley – RADICL"]
  },
  {
    id: "w16", day: "Wednesday, March 25", date: "2026-03-25", start: "11:35 AM", end: "12:05 PM",
    title: "Personalized Benefits: The Promise Everyone Wants or the Reality No One Can Deliver?", room: "Pomerol", track: "Health + Wellbeing",
    speakers: ["Jason Fan – Forma", "Conor Sweeney – Form Health", "Paul E. Wolfe"]
  },
  {
    id: "w17", day: "Wednesday, March 25", date: "2026-03-25", start: "11:35 AM", end: "12:05 PM",
    title: "The Inclusion Gap in AI Adoption: Who Gets Left Behind?", room: "Bandol 2", track: "Culture + Belonging",
    speakers: ["Ryan Smith – AIG", "Mary Burke – Experian", "Leslie Hardy – former Director, Inclusion & Belonging, Pinterest"]
  },
  {
    id: "w18", day: "Wednesday, March 25", date: "2026-03-25", start: "11:35 AM", end: "12:05 PM",
    title: "Designing Compensation for the Modern Workforce", room: "Bandol 1", track: "Performance Reimagined",
    speakers: ["Anna Binder – Board Member & former CPO, Culture Amp / Asana"]
  },
  {
    id: "w19", day: "Wednesday, March 25", date: "2026-03-25", start: "11:35 AM", end: "12:05 PM",
    title: "The C-Suite Reset: Aligning People, Org, and Tech", room: "Avignon", track: "Leading at the Edge",
    speakers: ["Kyle Forrest – Deloitte Consulting", "Melanie Naranjo – Ethena", "Amanda Scott – Aon"]
  },
  {
    id: "w20", day: "Wednesday, March 25", date: "2026-03-25", start: "12:00 PM", end: "1:30 PM",
    title: "Lunch & Networking", room: "TBD", track: "Networking & Events", speakers: []
  },
  {
    id: "w21", day: "Wednesday, March 25", date: "2026-03-25", start: "1:05 PM", end: "1:35 PM",
    title: "Confidence vs. Capability: The AI Gap in HR", room: "EXP – Learning Lab by Deloitte", track: "Learning Lab by Deloitte",
    speakers: ["Theresa Fesinstine – peoplepower.ai"]
  },
  {
    id: "w22", day: "Wednesday, March 25", date: "2026-03-25", start: "1:30 PM", end: "2:00 PM",
    title: "Digital Teammates: Where AI Agents Fit on the Org Chart", room: "Meursault 1–2", track: "AI + Humanity",
    speakers: ["Q Hamirani – HighLevel", "Nancy Hauge – Automation Anywhere", "Danielle Korins – Napster (Infinite Reality)", "Tammy Perkins – Chief People Officer & Advisor"]
  },
  {
    id: "w23", day: "Wednesday, March 25", date: "2026-03-25", start: "1:30 PM", end: "2:00 PM",
    title: "Measuring the True Return on Your Social Impact Initiatives", room: "Bandol 2", track: "Culture + Belonging",
    speakers: ["Chandra Sanders – Heels N Hustle", "Nooshin Nathan – Natural History Museum of LA County", "Kendra Ross – Duolingo"]
  },
  {
    id: "w24", day: "Wednesday, March 25", date: "2026-03-25", start: "1:30 PM", end: "2:00 PM",
    title: "Turning AI Ambition into Action: How Microsoft Achieved 50% Faster Content Development with AIQ", room: "Bandol 1", track: "Performance Reimagined",
    speakers: ["Jeff Fissel – GP Strategies", "Darin Travis – Microsoft"]
  },
  {
    id: "w25", day: "Wednesday, March 25", date: "2026-03-25", start: "2:05 PM", end: "2:35 PM",
    title: "What Is a Job Now? Rethinking Work, Purpose, and Value in the Age of Algorithmic Tools", room: "Meursault 1–2", track: "AI + Humanity",
    speakers: ["June Dinitz – EPAM Systems", "Brian Christman – Circle"]
  },
  {
    id: "w26", day: "Wednesday, March 25", date: "2026-03-25", start: "2:05 PM", end: "2:35 PM",
    title: "Unlimited PTO, Remote Work, and the Flexibility Paradox", room: "Pomerol", track: "Health + Wellbeing",
    speakers: ["Sharpy Sandhu – Okta", "Natalie Breece – thredUp", "Gracie Mercado – Macmillan Publishers", "Kenny Mendes – Superhuman"]
  },
  {
    id: "w27", day: "Wednesday, March 25", date: "2026-03-25", start: "2:05 PM", end: "2:35 PM",
    title: "Refining Career Growth for a Nonlinear World", room: "Bandol 2", track: "Culture + Belonging",
    speakers: ["Dr. Nancy Nazer – OMERS", "Natasha Kehimkar – Malida Advisors", "Ashley Core – SoFi", "Shaun Mayo – Arizona Cardinals"]
  },
  {
    id: "w28", day: "Wednesday, March 25", date: "2026-03-25", start: "2:05 PM", end: "2:35 PM",
    title: "Building a L&D Ecosystem That Actually Moves the Needle", room: "Bandol 1", track: "Performance Reimagined",
    speakers: ["Marie Szuts – People Leader Accelerator", "Samantha Thomas – Anime Universe", "Elizabeth McSavaney – Zurich Canada", "Leanne Loveday-Smith – Earnest"]
  },
  {
    id: "w29", day: "Wednesday, March 25", date: "2026-03-25", start: "2:05 PM", end: "2:35 PM",
    title: "The Identity Crisis of the Modern CPO", room: "Avignon", track: "Leading at the Edge",
    speakers: ["Katya Laviolette – 1Password", "Leander LeSure – Smarsh", "Marina Hong – Bayer", "Adam Weber – Adam Weber Coaching"]
  },
  {
    id: "w30", day: "Wednesday, March 25", date: "2026-03-25", start: "2:15 PM", end: "2:45 PM",
    title: "Psychedelics, Therapy, and the New Health Frontier: The 2026 Trends Employers Can't Ignore", room: "EXP – Horizons Stage", track: "Horizons Stage",
    speakers: ["Steven Huang – MAPS", "Sherry Rais – Enthea"]
  },
  {
    id: "w31", day: "Wednesday, March 25", date: "2026-03-25", start: "2:40 PM", end: "3:10 PM",
    title: "The Efficiency Trap: Cognitive Load, Skill Atrophy, and Critical Thinking", room: "Meursault 1–2", track: "AI + Humanity",
    speakers: ["Greg Karanastasis – CVS Health", "Lance Bradshaw – Intermountain Health", "Naomi Titleman – future foHRward", "Shweta Vohra – GitHub/Microsoft"]
  },
  {
    id: "w32", day: "Wednesday, March 25", date: "2026-03-25", start: "2:40 PM", end: "3:10 PM",
    title: "Mental Health for the Global Workforce: Access & Equity at Scale", room: "Pomerol", track: "Health + Wellbeing",
    speakers: ["David Hanrahan – SolarWinds"]
  },
  {
    id: "w33", day: "Wednesday, March 25", date: "2026-03-25", start: "2:40 PM", end: "3:10 PM",
    title: "Inside the Glass Office: Building Radical Transparency", room: "Bandol 2", track: "Culture + Belonging",
    speakers: ["Al Dea – The Edge of Work", "Christopher Westcott – LinkedIn", "Tracy Ting – Encore Capital Group", "Laura Agharkar – Apex Fintech Solutions"]
  },
  {
    id: "w34", day: "Wednesday, March 25", date: "2026-03-25", start: "2:40 PM", end: "3:10 PM",
    title: "Future-Proofing the Talent Function for a Changing World of Work", room: "Bandol 1", track: "Performance Reimagined",
    speakers: ["Eric Trickett – Dropbox", "Becky McCullough – HubSpot"]
  },
  {
    id: "w35", day: "Wednesday, March 25", date: "2026-03-25", start: "2:50 PM", end: "3:20 PM",
    title: "Education Is Being Rewritten: What Comes After Degrees, Credentials, and Classrooms", room: "EXP – Horizons Stage", track: "Horizons Stage",
    speakers: ["Karen Fascenda – Udemy", "Dr. Patrick Fagan – New York City Public Schools"]
  },
  {
    id: "w36", day: "Wednesday, March 25", date: "2026-03-25", start: "3:15 PM", end: "4:00 PM",
    title: "AI Literacy Is a Leadership Issue—Not a Training Program", room: "Meursault 1–2", track: "AI + Humanity",
    speakers: ["Kyle Lagunas – Kyle & Co."]
  },
  {
    id: "w37", day: "Wednesday, March 25", date: "2026-03-25", start: "3:15 PM", end: "4:00 PM",
    title: "The Pathway from Fear to Freedom", room: "Pomerol", track: "Health + Wellbeing",
    speakers: ["Amon Woulfe – 432 Hz"]
  },
  {
    id: "w38", day: "Wednesday, March 25", date: "2026-03-25", start: "3:15 PM", end: "4:00 PM",
    title: "Measuring TA Success in the World of AI", room: "Bandol 1", track: "Performance Reimagined",
    speakers: ["Tim Sackett – HRUTech.com"]
  },
  {
    id: "w39", day: "Wednesday, March 25", date: "2026-03-25", start: "4:00 PM", end: "5:00 PM",
    title: "Official EXP Reception", room: "EXP", track: "Networking & Events", speakers: []
  },
  {
    id: "w40", day: "Wednesday, March 25", date: "2026-03-25", start: "4:15 PM", end: "4:45 PM",
    title: "Cocktails & Comedy w Peter Phelan", room: "EXP – Innovation Stage", track: "Innovation Stage by SemperVirens",
    speakers: ["Peter Phelan – ValuesCulture"]
  },
  {
    id: "w41", day: "Wednesday, March 25", date: "2026-03-25", start: "9:00 PM", end: "11:59 PM",
    title: "Official After Party", room: "Zouk Nightclub", track: "Networking & Events", speakers: []
  },
];


const TRACK_COLORS = {
  "Plenary Stage":                    { dark: { bg: "#1a1a2e", text: "#e8d5a3", dot: "#e8d5a3" }, light: { bg: "#fdf6e3", text: "#7a6520", dot: "#b8900a" } },
  "AI + Humanity":                    { dark: { bg: "#0d1f3c", text: "#7ab8ff", dot: "#4a90d9" }, light: { bg: "#eaf4ff", text: "#1a5fa0", dot: "#2a7abf" } },
  "Culture + Belonging":              { dark: { bg: "#1f1a2e", text: "#c4a7e7", dot: "#9b72d4" }, light: { bg: "#f5f0ff", text: "#6b3db8", dot: "#8b5cd4" } },
  "Health + Wellbeing":               { dark: { bg: "#0d2e1f", text: "#7aeba3", dot: "#3db87a" }, light: { bg: "#eafaf1", text: "#1a7a4a", dot: "#2a9a5a" } },
  "Performance Reimagined":           { dark: { bg: "#2e1a0d", text: "#f0b97a", dot: "#d4853d" }, light: { bg: "#fff8f0", text: "#a05a10", dot: "#c47020" } },
  "Leading at the Edge":              { dark: { bg: "#2e0d1a", text: "#f07ab4", dot: "#d43d73" }, light: { bg: "#fff0f5", text: "#a0204a", dot: "#c43060" } },
  "Horizons Stage":                   { dark: { bg: "#1a2e2e", text: "#7ae8e8", dot: "#3db8b8" }, light: { bg: "#eafaff", text: "#1a7a7a", dot: "#2a9a9a" } },
  "Learning Lab by Deloitte":         { dark: { bg: "#2e2a0d", text: "#e8e07a", dot: "#b8b03d" }, light: { bg: "#fffde8", text: "#7a7010", dot: "#9a9020" } },
  "Innovation Stage by SemperVirens": { dark: { bg: "#1a2e0d", text: "#a3e87a", dot: "#73b83d" }, light: { bg: "#f0faeb", text: "#3a7a10", dot: "#4a9a20" } },
  "Networking & Events":              { dark: { bg: "#1e1e1e", text: "#aaaaaa", dot: "#666666" }, light: { bg: "#f5f5f5", text: "#666666", dot: "#999999" } },
  "Roundtables":                      { dark: { bg: "#1e1e1e", text: "#aaaaaa", dot: "#666666" }, light: { bg: "#f5f5f5", text: "#666666", dot: "#999999" } },
  "EXP":                              { dark: { bg: "#1e1e1e", text: "#aaaaaa", dot: "#666666" }, light: { bg: "#f5f5f5", text: "#666666", dot: "#999999" } },
};

const DAYS = ["Sunday, March 22", "Monday, March 23", "Tuesday, March 24", "Wednesday, March 25"];

const timeToMins = (t) => {
  const [time, ampm] = t.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return h * 60 + m;
};

const sessionsOverlap = (a, b) => {
  if (a.date !== b.date) return false;
  const aIsOpen = ["Networking & Events", "Roundtables", "EXP"].includes(a.track);
  const bIsOpen = ["Networking & Events", "Roundtables", "EXP"].includes(b.track);
  if (aIsOpen || bIsOpen) return false;
  return timeToMins(a.start) < timeToMins(b.end) && timeToMins(b.start) < timeToMins(a.end);
};

const findConflict = (session, selectedMap) =>
  SESSIONS.find(s => s.id !== session.id && selectedMap[s.id] && sessionsOverlap(session, s));

const toICSDate = (date, timeStr) => {
  const [time, ampm] = timeStr.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return date.replace(/-/g, "") + "T" + String(h).padStart(2,"0") + String(m).padStart(2,"0") + "00";
};

const generateICS = (sessions) => {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Transform 2026 Planner//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  sessions.forEach(s => {
    lines.push(
      "BEGIN:VEVENT",
      `DTSTART:${toICSDate(s.date, s.start)}`,
      `DTEND:${toICSDate(s.date, s.end)}`,
      `SUMMARY:${s.title}`,
      `DESCRIPTION:${s.speakers.join(", ") || "Transform HR 2026"}`,
      `LOCATION:${s.room} – Transform HR 2026\, Las Vegas`,
      "END:VEVENT"
    );
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
};

const downloadICS = (sessions) => {
  const content = generateICS(sessions);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transform-2026-schedule.ics";
  a.click();
  URL.revokeObjectURL(url);
};

export default function ConferencePlanner() {
  const [selected, setSelected] = useState({});
  const [activeDay, setActiveDay] = useState("Monday, March 23");
  const [view, setView] = useState("all");
  const [filterTrack, setFilterTrack] = useState("All");
  const [loaded, setLoaded] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [conflictFlash, setConflictFlash] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("transform2026-selections");
      if (saved) setSelected(JSON.parse(saved));
      const savedTheme = localStorage.getItem("transform2026-theme");
      if (savedTheme !== null) setDarkMode(savedTheme === "dark");
    } catch (e) {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem("transform2026-selections", JSON.stringify(selected)); } catch (e) {}
  }, [selected, loaded]);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem("transform2026-theme", darkMode ? "dark" : "light"); } catch (e) {}
  }, [darkMode, loaded]);

  const T = darkMode ? {
    pageBg: "#0a0a0f", headerBg: "linear-gradient(180deg, #0f0f1a 0%, #0a0a0f 100%)",
    tabBg: "#0c0c14", cardBg: "#0f0f14", border: "#111", borderSubtle: "#1a1a1a",
    borderMid: "#222", text: "#e8e8e8", textMuted: "#666", textDim: "#555",
    textFaint: "#3a3a3a", textLabel: "#888", heading: "#f0e8d8", accent: "#c4a060",
    accentBg: "#0a0a0f", checkBorder: "#333", selectBg: "#0a0a0f", footerBg: "#0a0a0f",
    footerBorder: "#151515", footerText: "#444", dayInactive: "#555", themeIcon: "☀️",
  } : {
    pageBg: "#faf8f4", headerBg: "linear-gradient(180deg, #f0ece4 0%, #faf8f4 100%)",
    tabBg: "#f0ece4", cardBg: "#ffffff", border: "#e0dcd4", borderSubtle: "#e8e4dc",
    borderMid: "#d8d4cc", text: "#2a2820", textMuted: "#888", textDim: "#777",
    textFaint: "#bbb", textLabel: "#666", heading: "#1a1810", accent: "#a07828",
    accentBg: "#faf8f4", checkBorder: "#ccc", selectBg: "#faf8f4", footerBg: "#f0ece4",
    footerBorder: "#ddd", footerText: "#999", dayInactive: "#999", themeIcon: "🌙",
  };

  const toggle = (id) => {
    const session = SESSIONS.find(s => s.id === id);
    if (!selected[id]) {
      const conflict = findConflict(session, selected);
      if (conflict) {
        setConflictFlash({ blockerId: conflict.id, targetId: id, message: `Conflicts with "${conflict.title}" (${conflict.start}–${conflict.end})` });
        setTimeout(() => setConflictFlash(null), 3500);
        return;
      }
    }
    setConflictFlash(null);
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedSessions = SESSIONS.filter(s => selected[s.id]);
  const selectedCount = selectedSessions.length;

  const filteredSessions = SESSIONS.filter(s => {
    const dayMatch = view === "mine" ? true : s.day === activeDay;
    const selMatch = view === "mine" ? selected[s.id] : true;
    const trackMatch = filterTrack === "All" || s.track === filterTrack;
    return dayMatch && selMatch && trackMatch;
  });

  const groupedByDay = view === "mine"
    ? DAYS.reduce((acc, d) => { acc[d] = filteredSessions.filter(s => s.day === d); return acc; }, {})
    : { [activeDay]: filteredSessions };

  const allTracks = ["All", ...Array.from(new Set(SESSIONS.map(s => s.track))).filter(t =>
    !["Networking & Events", "Roundtables", "EXP", "Plenary Stage", "Innovation Stage by SemperVirens", "Learning Lab by Deloitte", "Horizons Stage"].includes(t))];

  const makeGcalLink = (s) => {
    const start = toICSDate(s.date, s.start);
    const end = toICSDate(s.date, s.end);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(s.title)}&dates=${start}/${end}&details=${encodeURIComponent(s.speakers.join(", "))}&location=${encodeURIComponent(s.room + " – Transform 2026, Las Vegas")}`;
  };

  const dayShort = (d) => d.split(", ")[0].slice(0, 3);
  const dayNum = (d) => d.split(" ").pop();

  const btnStyle = (active) => ({
    padding: "7px 16px", borderRadius: 2, border: "1px solid",
    borderColor: active ? T.accent : T.borderMid,
    background: active ? T.accent : "transparent",
    color: active ? T.accentBg : T.textLabel,
    cursor: "pointer", fontSize: 12, letterSpacing: 1, fontFamily: "monospace",
    display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s",
  });

  return (
    <div style={{ minHeight: "100vh", background: T.pageBg, color: T.text, fontFamily: "'Georgia', 'Times New Roman', serif", position: "relative", transition: "background 0.2s, color 0.2s" }}>

      <div style={{ borderBottom: `1px solid ${T.borderMid}`, padding: "28px 32px 20px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap", background: T.headerBg }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 4, color: T.textMuted, textTransform: "uppercase", marginBottom: 6, fontFamily: "monospace" }}>
            Transform HR · Las Vegas · March 22–25, 2026
          </div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 400, letterSpacing: 1, color: T.heading }}>Conference Planner</h1>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={() => setDarkMode(d => !d)} style={{ ...btnStyle(false), padding: "7px 12px", fontSize: 14, borderColor: T.borderSubtle }} title="Toggle light/dark mode">
            {T.themeIcon}
          </button>
          <button onClick={() => setView("all")} style={btnStyle(view === "all")}>Browse</button>
          <button onClick={() => setView("mine")} style={btnStyle(view === "mine")}>
            My Schedule {selectedCount > 0 && (
              <span style={{ background: view === "mine" ? T.accentBg : T.accent, color: view === "mine" ? T.accent : T.accentBg, borderRadius: "50%", width: 18, height: 18, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {selectedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {conflictFlash && (
        <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", background: darkMode ? "#2a1010" : "#fff0f0", border: `1px solid ${darkMode ? "#8b3a3a" : "#e08080"}`, borderRadius: 4, padding: "10px 18px", zIndex: 1000, maxWidth: 480, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 24px #00000040" }}>
          <span style={{ fontSize: 14 }}>⚠️</span>
          <span style={{ fontSize: 12, fontFamily: "monospace", color: darkMode ? "#f09090" : "#c04040", letterSpacing: 0.5, lineHeight: 1.5 }}>{conflictFlash.message}</span>
        </div>
      )}

      {view === "all" && (
        <div style={{ display: "flex", borderBottom: `1px solid ${T.borderSubtle}`, background: T.tabBg, padding: "0 32px" }}>
          {DAYS.map(d => (
            <button key={d} onClick={() => setActiveDay(d)} style={{ padding: "14px 20px", border: "none", background: "transparent", color: activeDay === d ? T.accent : T.dayInactive, borderBottom: activeDay === d ? `2px solid ${T.accent}` : "2px solid transparent", cursor: "pointer", fontSize: 12, letterSpacing: 1, fontFamily: "monospace", transition: "color 0.2s" }}>
              {dayShort(d)} {dayNum(d)}
              {SESSIONS.filter(s => s.day === d && selected[s.id]).length > 0 && <span style={{ marginLeft: 5, color: T.accent, fontSize: 9 }}>●</span>}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <select value={filterTrack} onChange={e => setFilterTrack(e.target.value)} style={{ background: T.selectBg, color: T.textLabel, border: "none", borderLeft: `1px solid ${T.borderSubtle}`, padding: "0 12px", fontSize: 11, fontFamily: "monospace", cursor: "pointer", letterSpacing: 0.5 }}>
            {allTracks.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      )}

      {view === "mine" && (
        <div style={{ padding: "14px 32px", borderBottom: `1px solid ${T.borderSubtle}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", background: T.tabBg }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, fontFamily: "monospace", color: T.textMuted, letterSpacing: 0.5 }}>
              {selectedCount} session{selectedCount !== 1 ? "s" : ""} selected
            </span>
            {selectedCount > 0 && (
              <button onClick={() => downloadICS(selectedSessions)} style={{ ...btnStyle(true), padding: "6px 14px", fontSize: 11 }} title="Download .ics to import into Google Calendar or Apple Calendar">
                ⬇ Export all to calendar
              </button>
            )}
            {selectedCount > 0 && (
              <button onClick={() => setSelected({})} style={{ ...btnStyle(false), padding: "6px 14px", fontSize: 11, borderColor: darkMode ? "#3a2a2a" : "#e0c0c0", color: darkMode ? "#8a4a4a" : "#c04040" }}>
                ✕ Deselect all
              </button>
            )}
          </div>
          <select value={filterTrack} onChange={e => setFilterTrack(e.target.value)} style={{ background: T.selectBg, color: T.textLabel, border: `1px solid ${T.borderMid}`, padding: "5px 10px", fontSize: 11, fontFamily: "monospace", cursor: "pointer", borderRadius: 2 }}>
            {allTracks.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      )}

      <div style={{ padding: "24px 32px 80px" }}>
        {view === "mine" && selectedCount === 0 && (
          <div style={{ textAlign: "center", padding: "80px 20px", color: T.textMuted }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>◎</div>
            <div style={{ fontSize: 14, letterSpacing: 1, fontFamily: "monospace" }}>No sessions selected yet.</div>
            <div style={{ fontSize: 12, color: T.textFaint, marginTop: 8 }}>Switch to Browse to start building your schedule.</div>
          </div>
        )}

        {Object.entries(groupedByDay).map(([day, sessions]) => {
          if (!sessions.length) return null;
          return (
            <div key={day} style={{ marginBottom: 40 }}>
              {view === "mine" && (
                <div style={{ fontSize: 11, fontFamily: "monospace", color: T.accent, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16, paddingBottom: 8, borderBottom: `1px solid ${T.borderSubtle}` }}>
                  {day}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {sessions.map((s) => {
                  const trackColors = TRACK_COLORS[s.track] || TRACK_COLORS["Networking & Events"];
                  const colors = trackColors[darkMode ? "dark" : "light"];
                  const isSelected = !!selected[s.id];
                  const isExpanded = expandedId === s.id;
                  const isNetworking = ["Networking & Events","Roundtables","EXP"].includes(s.track);
                  const conflictingWith = !isSelected ? findConflict(s, selected) : null;
                  const isBlocked = !!conflictingWith;
                  const isFlashing = conflictFlash && (conflictFlash.blockerId === s.id || conflictFlash.targetId === s.id);

                  return (
                    <div key={s.id} style={{
                      display: "flex", borderRadius: 3, overflow: "hidden",
                      border: `1px solid ${isFlashing ? (darkMode?"#8b3a3a":"#e08080") : isSelected ? colors.dot+"60" : isBlocked ? (darkMode?"#2a1a1a":"#f0dada") : T.border}`,
                      background: isFlashing ? (darkMode?"#1a0d0d":"#fff5f5") : isSelected ? colors.bg : isBlocked ? (darkMode?"#0d0a0a":"#fdf5f5") : T.cardBg,
                      transition: "all 0.15s",
                      opacity: (isNetworking && !isSelected) ? 0.6 : isBlocked ? 0.5 : 1,
                    }}>
                      <div onClick={() => toggle(s.id)} style={{ width: 44, minHeight: 54, display: "flex", alignItems: "center", justifyContent: "center", cursor: isBlocked ? "not-allowed" : "pointer", flexShrink: 0, background: isSelected ? colors.dot+"18" : "transparent", borderRight: `1px solid ${T.borderSubtle}`, transition: "background 0.15s" }}>
                        {isBlocked ? (
                          <div style={{ width: 16, height: 16, borderRadius: 2, border: `1.5px solid ${darkMode?"#4a2020":"#dda0a0"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: darkMode?"#6a3030":"#cc8080" }}>✕</div>
                        ) : (
                          <div style={{ width: 16, height: 16, borderRadius: 2, border: `1.5px solid ${isSelected ? colors.dot : T.checkBorder}`, background: isSelected ? colors.dot : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", fontSize: 10, color: darkMode?"#0a0a0f":"#fff" }}>
                            {isSelected && "✓"}
                          </div>
                        )}
                      </div>

                      <div style={{ width: 90, padding: "10px 12px", display: "flex", flexDirection: "column", justifyContent: "center", flexShrink: 0, borderRight: `1px solid ${T.borderSubtle}` }}>
                        <div style={{ fontSize: 11, fontFamily: "monospace", color: isSelected ? colors.text : T.textDim, letterSpacing: 0.5 }}>{s.start}</div>
                        <div style={{ fontSize: 10, fontFamily: "monospace", color: T.textFaint, marginTop: 1 }}>–{s.end}</div>
                      </div>

                      <div onClick={() => setExpandedId(isExpanded ? null : s.id)} style={{ flex: 1, padding: "10px 14px", cursor: "pointer", minWidth: 0 }}>
                        <div style={{ fontSize: 13, lineHeight: 1.4, color: isSelected ? T.heading : T.text, marginBottom: s.speakers.length > 0 ? 4 : 0 }}>
                          {s.title}
                        </div>
                        {s.speakers.length > 0 && !isExpanded && (
                          <div style={{ fontSize: 10, color: T.textDim, fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {s.speakers.slice(0,3).join(" · ")}{s.speakers.length > 3 ? ` +${s.speakers.length-3}` : ""}
                          </div>
                        )}
                        {isExpanded && s.speakers.length > 0 && (
                          <div style={{ marginTop: 6 }}>
                            {s.speakers.map((sp, i) => <div key={i} style={{ fontSize: 10, color: T.textLabel, fontFamily: "monospace", marginTop: 2 }}>{sp}</div>)}
                          </div>
                        )}
                        <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: 1, color: isSelected ? colors.dot : isBlocked ? (darkMode?"#5a2a2a":"#cc9090") : T.textFaint, textTransform: "uppercase" }}>
                            <span style={{ marginRight: 4, fontSize: 7 }}>●</span>{s.track}
                          </span>
                          <span style={{ fontSize: 9, color: T.textFaint, fontFamily: "monospace" }}>{s.room}</span>
                          {isBlocked && (
                            <span style={{ fontSize: 9, fontFamily: "monospace", color: darkMode?"#7a3030":"#cc6060", letterSpacing: 0.5 }}>
                              conflicts with: {conflictingWith.title.length > 38 ? conflictingWith.title.slice(0,38)+"…" : conflictingWith.title}
                            </span>
                          )}
                        </div>
                      </div>

                      {isSelected && (
                        <a href={makeGcalLink(s)} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} title="Add to Google Calendar"
                          style={{ width: 40, display: "flex", alignItems: "center", justifyContent: "center", color: T.textDim, textDecoration: "none", fontSize: 14, flexShrink: 0, borderLeft: `1px solid ${T.borderSubtle}`, transition: "color 0.1s" }}
                          onMouseOver={e => e.currentTarget.style.color = colors.dot}
                          onMouseOut={e => e.currentTarget.style.color = T.textDim}
                        >📅</a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: T.footerBg, borderTop: `1px solid ${T.footerBorder}`, padding: "10px 32px", display: "flex", gap: 16, alignItems: "center", overflowX: "auto", flexWrap: "nowrap" }}>
        {Object.entries(TRACK_COLORS).filter(([t]) => !["Networking & Events","Roundtables","EXP"].includes(t)).map(([track, tColors]) => (
          <div key={track} style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: tColors[darkMode ? "dark" : "light"].dot }} />
            <span style={{ fontSize: 9, fontFamily: "monospace", color: T.footerText, letterSpacing: 0.5, whiteSpace: "nowrap" }}>{track}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
