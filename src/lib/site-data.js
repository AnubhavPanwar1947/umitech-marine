export const brand = {
  name: "UMITECH MARINE",
  tagline: "Marine Consultants",
};

export const navigation = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
];

export const hero = {
  headlinePrefix: "Your trusted partner ",
  headlineAccent: "at sea.",
  subheadlinePrefix: "Where Insight meets precision—",
  subheadlineAccent: "24/7 Consultancy",
  subheadlineSuffix: " you can trust.",
  lead:
    "Strategic guidance for the world's most demanding marine and engineering operations.",
  ctaLabel: "Explore services",
  ctaHref: "/services",
  image: "/images/heroImage.jpeg",
  imageAlt:
    "Aerial view of an LNG carrier at berth with spherical storage tanks and teal water",
};

export const servicesSection = {
  title: "Our Services",
  lead:
    "Four practices delivering technical excellence across naval architecture, engineering, surveying, and legal consultancy.",
};

export const services = [
  {
    title: "Naval Architecture",
    image: "/images/Naval.jpg",
    imageAlt:
      "White patrol vessel bow at a harbour pier with mast and radar equipment.",
  },
  {
    title: "Engineering",
    image: "/images/ENGINEERING.jpg",
    imageAlt:
      "Engineer in safety gear reviewing data on a laptop beside industrial machinery.",
  },
  {
    title: "Inspection, Audits and Surveying",
    image: "/images/Inspection.jpg",
    imageAlt:
      "Marine professionals in safety gear reviewing a laptop beside a vessel.",
  },
  {
    title: "Legal Consultancy",
    image: "/images/Law.jpg",
    imageAlt: "Gavel and scales of justice with a business handshake in the background",
  },
];

export const servicesPage = {
  intro: {
    title: "Our Services",
    lead:
      "Four practices delivering technical excellence across naval architecture, engineering, surveying, and legal consultancy.",
    bullets: [
      "Our team consists of accredited Sire inspectors, Flag state inspectors and experienced marine surveyors, each having previously served management roles while sailing onboard. We collectively bring together decades of experience in varied fields ranging from conventional shipping to oil and gas offshore industry and marine engineering.",
      "We believe that with our collective experience we can bring added value to our customers and help them enhance their services by taking the path of sustainable growth. Our core value lies in providing our clients with innovative ways to fulfil their requirements.",
    ],
  },
  practices: [
    {
      id: "naval",
      heading: "Naval Architecture",
      lead: "Hull form, structure and the analysis behind every design decision.",
      image: "/images/Naval-Architecture-Services.jpg",
      imageAlt:
        "Ship bow in a shipyard with scaffolding, dry-dock supports, and a crane.",
      imagePosition: "center 35%",
      variant: "alt",
      items: [
        {
          title: "Design and Analysis",
          slug: "design-and-analysis",
          detail: [
            "At the core of our services is a passion for innovation in marine and offshore engineering. We design a wide variety of vessels and offshore structures—fixed, floating, or mobile—catering to the Oil & Gas, Marine, and Renewable Energy industries.",
            "From initial concept to final design, we provide:",
          ],
          detailList: [
            "Conceptual Design",
            "FEED (Front-End Engineering Design) Studies",
            "Detailed Engineering",
          ],
          detailAfter: [
            "Our design process is client-driven and powered by a team of experienced professionals using cutting-edge, industry-standard software. We ensure every project meets technical, operational, and regulatory requirements—on time and with precision. Whether you need support with new builds or modifications, we bring expertise and innovation to every stage of the design journey.",
          ],
        },
        {
          title: "Engineering Analysis",
          slug: "engineering-analysis",
          detail: [
            "Our experienced engineering and design team provides reliable analysis services across all key phases of an asset’s lifecycle. We support projects through:",
          ],
          detailList: [
            "In-place Analysis – Ensuring long-term structural performance under operational and environmental loads.",
            "Pre-service Analysis – Evaluating conditions during fabrication, transportation, and installation, including temporary load scenarios.",
            "Fatigue Analysis – Assessing fatigue life using industry-accepted methods to help extend asset lifespan and plan maintenance.",
            "Decommissioning Analysis – Supporting safe and efficient removal planning through structural assessments and procedural reviews.",
          ],
          detailAfter: [
            "We apply a combination of trusted engineering tools and proven methodologies to deliver accurate, code-compliant results that help clients make informed decisions at every stage.",
          ],
        },
        {
          title: "Front-End Engineering Design Study",
          slug: "front-end-engineering-design-study",
          detail: [
            "Front-End Engineering Design (FEED) is the essential bridge between conceptual design and full-scale project execution. Conducted after the feasibility phase and before Engineering, Procurement, and Construction (EPC) begins, FEED lays the groundwork for a successful project.",
            "At this stage, our experienced team of naval architects and engineers carries out in-depth technical studies to identify potential design and operational challenges. We also provide preliminary cost estimates to give clients a clearer picture of project viability and investment requirements.",
            "Our FEED studies help clients make confident, informed decisions—reducing risk, refining project scope, and setting the foundation for cost-effective execution.",
          ],
        },
        {
          title: "Global and Local Strength Analysis",
          slug: "global-and-local-strength-analysis",
          detail: [
            "Our team conducts Global and Local Strength Analysis (GLSA) to evaluate the structural response of marine and offshore structures under extreme environmental loading. The analysis is grounded in first-principles methodologies, ensuring a physics-based, high-fidelity representation of structural behaviour.",
            "Extreme load assessments are performed across a range of dominant load cases, which are identified based on vessel or structure type. For each load case, an Equivalent Design Wave (EDW) is derived to represent the most critical sea state in a simplified regular wave format. This approach enables detailed yet computationally efficient structural simulations.",
            "GLSA is carried out using advanced finite element modelling to capture both global load distribution and localized stress concentrations. Our scope includes global structural analysis of jacket platforms, floating production units (FPUs), and self-elevating platforms (SEPs), all executed in full compliance with class and industry requirements. Our analyses have consistently met or exceeded client specifications, supporting both newbuild and in-service assessment projects.",
          ],
        },
        {
          title: "Finite Element Analysis",
          slug: "finite-element-analysis",
          detail: [
            "Finite Element Analysis (FEA) is a powerful computational method used to simulate and predict the structural and thermal behaviour of components and systems under real-world physical conditions such as mechanical loading, vibration, thermal gradients, and fluid interaction. While termed “analysis,” FEA is an integral part of the design and verification process, allowing engineers to anticipate structural performance, identify critical stress areas, and optimize designs before fabrication or physical testing.",
            "In the offshore and marine industry, FEA is extensively utilized to address complex engineering problems associated with floating and fixed structures. Applications include evaluating global structural integrity, local stress concentrations, fatigue life estimation, buckling assessments, and dynamic response to environmental loads.",
            "Our engineering team employs ANSYS, a leading FEA platform, to carry out high-fidelity simulations that support the structural design and assessment of offshore platforms, subsea equipment, riser systems, and hull structures. All analyses are performed in accordance with relevant industry codes and class society requirements, ensuring both safety and performance across the asset lifecycle.",
          ],
        },
        {
          title: "Vessel and Berth Mooring Compatibility Assessment",
          slug: "vessel-and-berth-mooring-compatibility-assessment",
          detail: [
            "Our team of experienced naval architects and engineers provides detailed mooring analysis for Ship To Ship (STS), Ship To Berth (STB) and other operations in both sheltered waters and open sea condition. Services include LNG carrier–shore interface compatibility studies, Single Buoy Mooring (SBM) and Floating Production Storage and Offloading (FPSO) system assessments, and comprehensive evaluations of mooring loads, line tensions, and structural integrity. All analyses are conducted in accordance with international standards and best practices to ensure the safety and operational efficiency of berthing and mooring systems.",
          ],
        },
        {
          title: "Ship Plans and Drawing",
          slug: "ship-plans-and-drawing",
          detail: [
            "Our team of experienced Naval Architects provides a full suite of plans and technical drawings essential throughout the lifecycle of a marine asset. We ensure all documentation is prepared in accordance with the requirements of the relevant flag state and tailored for approval by leading classification societies. Our deliverables include, but are not limited to:",
          ],
          detailList: [
            "General Arrangement (GA) Plans",
            "Structural Drawings",
            "Freeboard and Loadline Calculations & Plans",
            "Tonnage Calculations and Plans",
            "Tank Capacity Plans",
            "Docking Plans",
            "Outfitting and Piping Drawings",
            "Lines Plans",
            "Safety Manuals and Fire Control Plans",
            "Life-Saving Appliances (LSA) Plans",
            "Wheelhouse Visibility and Escape Route Plans",
            "Mooring and Towing Plans",
            "Wheelhouse Posters",
            "Light and Sound Signaling Plans",
          ],
          detailAfter: [
            "Our goal is to support vessel compliance, safety, and operational efficiency from concept to completion.",
          ],
        },
      ],
    },
    {
      id: "engineering",
      heading: "Engineering",
      lead:
        "The applied engineering that keeps assets designed, converted and operating safely.",
      image: "/images/Engineering-Services.jpg",
      imageAlt:
        "Two engineers in safety gear reviewing technical drawings beside industrial machinery.",
      imagePosition: "center 40%",
      variant: "default",
      items: [
        {
          title: "Conversion and Upgradation",
          slug: "conversion-and-upgradation",
          detail: [
            "Lifecycle Engineering & Asset Upgrades",
            "To stay ahead in today’s fast-evolving industry, upgrading assets with the latest technologies and equipment is essential. Our team of seasoned experts delivers comprehensive engineering solutions throughout the entire lifecycle of your assets. From concept to completion, we support your most ambitious conversion and upgrade projects across the offshore, marine, and renewable energy sectors—boosting performance, reliability, and efficiency every step of the way.",
          ],
        },
        {
          title: "Comprehensive Documentation and Manual Development Services",
          slug: "comprehensive-documentation-and-manual-development-services",
          detail: [
            "Equipped with the right knowledge, skills, and hands-on experience, our team has successfully prepared and delivered a wide range of procedural and operational manuals tailored to the specific needs of our clients across the maritime and offshore sectors. Our portfolio includes, but is not limited to, the following:",
          ],
          detailList: [
            "Operating Manuals for Vessels, Rigs, and Platforms",
            "Cargo Securing Manual",
            "ISPS (International Ship and Port Facility Security) Manual",
            "Man Overboard Recovery Manual",
            "Emergency Towing Booklet",
            "Biofouling Management Plan",
            "Ship-to-Ship (STS) Transfer Plan",
            "VOC (Volatile Organic Compounds) Management Plan",
            "VECS (Vapour Emission Control System) Manual",
            "Anchor Handling Manual",
            "Damage Control Booklet",
            "Stability Booklet",
            "FiFi (Fire Fighting) Operation Manual",
            "Helideck Operations Manual",
            "SOLAS Training Manual (including LSA and FFA Manuals)",
            "Ballast Water Management Plan",
            "Garbage Management Plan",
            "SOPEP (Shipboard Oil Pollution Emergency Plan) Manual",
            "SMPEP (Shipboard Marine Pollution Emergency Plan) Manual",
            "SEEMP (Ship Energy Efficiency Management Plan)",
            "Procedure and Arrangements Manual",
            "Feasibility Studies",
          ],
          detailAfter: [
            "Each document is developed in compliance with the latest IMO guidelines, flag state requirements, class standards, and best industry practices, ensuring safety, efficiency, and regulatory alignment for your operations.",
          ],
        },
        {
          title: "Hydrodynamic Calculations",
          slug: "hydrodynamic-calculations",
          detail: [
            "Marine environments are constantly changing—and so is vessel performance. Our expert team of naval architects and hydrodynamic engineers utilizes cutting-edge simulation tools and industry-leading software to accurately predict how marine assets will perform in real-world sea and weather conditions. From seakeeping and RAO calculations to resistance, motion response, multi-body dynamics, sloshing analysis, and propeller performance assessment—we provide end-to-end hydrodynamic solutions. Whether it’s during the design phase or in operational optimization, we help you enhance safety, efficiency, and reliability at sea.",
          ],
        },
        {
          title: "Loadout and Sea fastening calculations",
          slug: "loadout-and-sea-fastening-calculations",
          detail: [
            "When transporting cargo by sea, it is essential to secure it in a way that prevents any movement which could potentially damage the cargo or the vessel. Improperly secured cargo can shift during transit, posing serious risks to vessel stability and endangering both the crew and the cargo. This is especially critical when handling valuable assets such as machinery, equipment, fabricated structures, and marine components of varying sizes and complexities. Insurers often mandate that cargo is properly fastened to mitigate these risks. Our team of experienced engineers and naval architects ensures that loadout and sea fastening are executed to the highest standards—optimized for safety, efficiency, and in full compliance with the requirements of clients, insurers, and all relevant stakeholders.",
          ],
        },
        {
          title: "Computational Fluid Dynamics (CFD)",
          slug: "computational-fluid-dynamics-cfd",
          detail: [
            "At the forefront of engineering innovation, Computational Fluid Dynamics (CFD) is a core tool we use to simulate and optimize fluid flow behavior in complex systems. Whether designing next-generation wind turbines, high-performance marine vessels, or energy-efficient HVAC systems, CFD allows us to deliver data-driven solutions with precision and reliability.",
            "CFD involves the numerical analysis of fluid behavior based on physical parameters such as velocity, pressure, temperature, density, and viscosity. By replicating real-world fluid interactions within a virtual environment, we can accurately predict performance, identify inefficiencies, and refine designs long before any physical prototype is built.",
            "As a digital fluid dynamics simulator, CFD plays a critical role in high-end design optimization, reducing development time and cost while enhancing safety and functionality. Our team leverages advanced CFD tools and deep domain expertise to deliver customized solutions tailored to your engineering challenges.",
          ],
        },
        {
          title: "Heat Transfer Analysis",
          slug: "heat-transfer-analysis",
          detail: [
            "Our engineering team delivers high-performance heat transfer analysis solutions tailored for the maritime industry. We provide precise evaluation of temperature distribution and heat flux in structural components exposed to thermal loads, supporting both steady-state and transient conditions, as well as linear and non-linear material behavior.",
            "With proven expertise in handling high-temperature cargo scenarios, we ensure optimal thermal management and insulation design for vessels operating beyond typical ambient marine conditions. Our solutions help enhance safety, maintain cargo integrity, and improve energy efficiency—meeting the rigorous demands of modern shipping operations.",
          ],
        },
        {
          title: "Stability Calculation",
          slug: "stability-calculation",
          detail: [
            "At UMITECH Marine Solutions, we provide comprehensive stability calculations tailored to the needs of our offshore and main fleet clients. Our services encompass a wide range of stability-related tasks, ensuring the safe and efficient operation of vessels.",
            "Our expertise includes:",
          ],
          detailList: [
            "Loading Calculations: Accurate calculations to ensure proper weight distribution during loading.",
            "Weight Estimation: Determining the weight of cargo and vessel components to assess stability.",
            "Inclining Experiment: Performing inclining tests to verify the vessel’s stability characteristics.",
            "Hydrostatic Particulars: Providing detailed hydrostatic data, essential for operational safety.",
            "Intact and Damage Stability Calculations: Analyzing the vessel’s stability under intact and damage conditions to ensure compliance with international regulations.",
            "Loading Plan Development: Creating loading plans based on detailed stability analysis.",
          ],
          detailAfter: [
            "We are committed to delivering precise, reliable, and efficient stability solutions, supporting vessel safety and operational performance.",
          ],
        },
      ],
    },
    {
      id: "inspection",
      heading: "Inspection, Audits and Surveying",
      lead:
        "Accredited SIRE, Flag state and marine survey expertise from experienced inspectors.",
      image: "/images/Inspection-Audits-and-Surveying-Services.jpg",
      imageAlt:
        "Three marine inspectors in high-visibility vests reviewing plans beside a ship hull.",
      imagePosition: "center 30%",
      variant: "alt",
      items: [
        {
          title: "Marine Surveys",
          slug: "marine-surveys",
          detail: [
            "At Umitech Marine Solutions, we leverage the expertise of our team, comprising Master Mariners and Marine Engineers, to deliver precise and comprehensive marine and technical surveys. Our services cater to a wide range of vessel types, providing in-depth assessments to ensure operational efficiency, safety, and compliance with industry standards.",
            "Our clientele spans ship owners, operators, charterers, P&I clubs, insurers, financial institutions, flag states, and classification societies.",
          ],
          detailList: [
            "Condition Surveys: Comprehensive assessments on behalf of P&I clubs, H&M insurers, and individual clients to evaluate the overall condition of the vessel and identify potential risks.",
            "On-Hire/Off-Hire Condition Surveys: Detailed assessments to verify the condition of vessels at the time of charter hire, including equipment, machinery, and hull integrity.",
            "On-Hire/Off-Hire Bunker Surveys: Verification of bunker fuel quantities at the start and end of the charter, including fuel quality analysis.",
            "Pre-Loading Vessel Surveys: Technical inspections to ensure vessel readiness for cargo operations, focusing on structural integrity and load distribution.",
            "Project Cargo Loading & Lashing Approvals: Certification of appropriate cargo securing methods and compliance with maritime safety standards for heavy and oversized cargoes.",
            "Non-Exclusive Surveys: Independent, non-affiliated surveys to assess the condition and functionality of specific vessel systems or components.",
            "Bollard Pull & Winch Testing: Performance testing of towing and mooring systems, including winch load testing and bollard pull capacity measurements.",
            "Safety Attestations: Official certification for compliance with safety regulations from local authorities and flag state authorities.",
            "Carving and Marking Note Attestations: Verification of compliance with specific maritime regulations regarding vessel markings, including classification and ownership details.",
            "\"Fit for Purpose\" Approvals: Assessments and certifications for project-specific applications, ensuring that vessels and equipment meet operational requirements for particular tasks or cargo.",
            "Project Cargo Loading/Unloading Attendance: On-site supervision and technical support during the loading and unloading of project cargo, ensuring compliance with safety and operational protocols.",
            "Pre-Purchase Inspections: Detailed technical evaluations of vessels, focusing on mechanical, structural, and safety systems, to support the acquisition decision-making process.",
            "Valuation Reports: Expert evaluations of vessel market value, based on condition, market trends, and technical specifications.",
          ],
          detailAfter: [
            "With an unwavering focus on precision and adherence to international standards, Umitech Marine Solutions ensures the highest level of technical integrity and operational safety across all maritime operations.",
          ],
        },
        {
          title: "Audits and Inspections",
          slug: "audits-and-inspections",
          detail: [
            "At Umitech Marine Solutions, we understand the critical importance of compliance, operational integrity, and continuous improvement in the maritime industry. We perform systematic evaluations of vessel operations, shipboard practices, safety management frameworks, and navigational protocols. Our services are aligned with the latest IMO conventions, flag state requirements, OCIMF standards, and classification society guidelines.",
            "We conduct systematic examinations of vessel systems, onboard procedures, and management practices to verify that your Safety Management System (SMS) is properly implemented and adhered to by the crew. Each audit is meticulously carried out to support safety, efficiency, and compliance across all levels of maritime operations.",
          ],
          detailList: [
            "ISM Audit: Verification of compliance with the International Safety Management (ISM) Code.",
            "ISPS Audit: Evaluation of security measures under the International Ship and Port Facility Security (ISPS) Code.",
            "MLC Audit: Inspection under the Maritime Labour Convention (MLC) to ensure crew welfare and rights.",
            "Navigation Audit: Assessment of bridge team performance, passage planning, and navigational safety.",
            "VDR Audit: Review and analysis of Voyage Data Recorder (VDR) data for operational and incident evaluation.",
            "Operators Management Review: Systematic review of shore-based management systems and documentation.",
            "Marine Terminal Inspection: Evaluation of terminal operations, safety protocols, and compatibility with vessel systems.",
            "Flag State Inspection (Liberia): Authorized inspections under the Liberian Registry to ensure vessel compliance.",
            "Pre-Vetting Inspection: Preparatory inspections to ensure readiness for SIRE and other vetting programs.",
            "Pre-CDI Inspection: Comprehensive checks to meet Chemical Distribution Institute (CDI) audit standards.",
            "Pre-OVID Inspection: Offshore Vessel Inspection Database (OVID) pre-inspection for offshore support vessels.",
            "Third-Party Vetting & Clearance Assessments: Independent evaluations to meet charterer and stakeholder requirements.",
            "Bulk Carrier Inspection & Hold Preparation: Thorough inspection and preparation of cargo holds for dry bulk operations.",
          ],
        },
        {
          title: "Marine Warranty Surveys",
          slug: "marine-warranty-surveys",
          detail: [
            "We deliver independent third-party Marine Warranty Survey (MWS) services to support the safe, efficient, and compliant execution of high-value, high-risk marine projects.",
            "Our expert surveyors provide comprehensive technical review and approval for the handling, sea transportation, and offshore installation of critical marine assets—including fixed platforms, offshore wind turbines, subsea facilities, pipelines, power cables, and mooring systems.",
            "From initial planning to final execution, we ensure all operations meet international standards, satisfy insurance policy conditions, and fall within acceptable industry risk thresholds. Our mission is to protect your assets, reduce operational risk, and contribute to the successful, on-schedule delivery of offshore projects—safeguarding the interests of all stakeholders involved.",
          ],
        },
      ],
    },
    {
      id: "legal",
      heading: "Legal Consultancy",
      lead:
        "We specialize in drafting, reviewing, and analyzing contracts related to marine carriage, transportation, vessel sales, insurance, and international trade.",
      leadInTopicsColumn: true,
      image: "/images/Law.jpg",
      imageAlt:
        "Gavel and scales of justice with a business handshake in the background",
      variant: "default",
      items: [
        {
          title: "Legal Consultancy",
          slug: "legal-consultancy",
          detail: [
            "Our team of seasoned marine legal experts offers comprehensive legal support across the maritime sector. We specialize in drafting, reviewing, and analyzing contracts related to marine carriage, transportation, vessel sales, insurance, and international trade.",
            "We also provide document validation services on behalf of our clients, including verification of official records, vessel registry, labor agreements, and administrative contracts. As certified sworn translators, we can prepare and process all required legal documents in English with precision and accuracy.",
            "Our practicing maritime lawyers are equipped to negotiate on your behalf and safeguard your interests in both court proceedings and pre-litigation disputes. We represent clients across various jurisdictions—civil, criminal, labor, and administrative—and handle claims involving:",
          ],
          detailList: [
            "Loss prevention and damage claims",
            "Personal injury and liability cases",
            "Maritime fines and sanctions",
            "Preventive legal measures and ship arrests",
          ],
          detailAfter: [
            "Whether you're navigating complex commercial transactions or facing legal challenges at sea or ashore, we are committed to delivering expert legal representation tailored to the maritime industry.",
          ],
        },
      ],
    },
  ],
};

const LINKED_SERVICE_PRACTICE_IDS = new Set([
  "naval",
  "engineering",
  "inspection",
  "legal",
]);

export function getServiceTopicParams() {
  return servicesPage.practices
    .filter((practice) => LINKED_SERVICE_PRACTICE_IDS.has(practice.id))
    .flatMap((practice) =>
      practice.items
        .filter((item) => item.slug && item.detail?.length)
        .map((item) => ({
          practice: practice.id,
          slug: item.slug,
        }))
    );
}

export function getServiceTopic(practiceId, slug) {
  if (!LINKED_SERVICE_PRACTICE_IDS.has(practiceId)) {
    return null;
  }

  const practice = servicesPage.practices.find((entry) => entry.id === practiceId);
  if (!practice) {
    return null;
  }

  const item = practice.items.find((entry) => entry.slug === slug);
  if (!item?.detail?.length) {
    return null;
  }

  return { practice, item };
}

export const servicesDropdownItems = servicesPage.practices.map((practice) => ({
  label:
    practice.id === "naval" ? "Naval Architecture" : practice.heading,
  href: `/services#${practice.id}`,
}));

export const about = {
  eyebrow: "About Us",
  titlePrefix: "Practical expertise for demanding ",
  titleAccent: "marine operations",
  paragraphs: [
    "UMITECH MARINE began its journey in 2024, founded by experienced and forward-thinking professionals from the shipping and engineering industries. Established with a clear vision to deliver premium consultancy backed by practical, hands-on expertise, Umitech Marine is built on the foundation of technical excellence and real-world operational insight.",
    "We are driven by a commitment to precision, reliability and 24/7 support—delivering solutions that ensure maritime operations run safely, efficiently and seamlessly.",
  ],
  ctaLabel: "Know more",
  ctaHref: "/about",
  image: "/images/About.jpg",
  imageAlt:
    "Container ship underway, looking forward over stacked containers toward the bow, with coastline and city skyline ahead",
};

export const aboutPage = {
  intro: {
    eyebrow: "About Us",
    paragraphs: [
      "UMITECH MARINE began its journey in 2024, founded by experienced and forward-thinking professionals from the shipping and engineering industries. Established with a clear vision to deliver premium consultancy backed by practical, hands-on expertise, Umitech Marine is built on the foundation of technical excellence and real-world operational insight.",
      "With extensive experience spanning vessel operations, ship surveying, marine engineering & design and Clean fuel technology our team brings comprehensive expertise across every critical segment of the marine sector. We are driven by a commitment to precision, reliability and 24/7 support—delivering solutions that ensure maritime operations run safely, efficiently and seamlessly.",
    ],
    image: "/images/About.jpg",
    imageAlt:
      "Container ship underway, looking forward over stacked containers toward the bow, with coastline and city skyline ahead",
  },
  mission: {
    heading: "Mission",
    points: [
      "Drive shipping toward a sustainable, forward-thinking sector through innovation and technology",
      "Uphold discipline, transparency, and customer satisfaction",
      "Treat quality as a core value in the work and in the team",
    ],
  },
  vision: {
    heading: "Vision",
    body:
      "To redefine the future of marine, surveying, engineering, and design consultancy through bold innovation, unmatched expertise, and a relentless pursuit of excellence.",
  },
  values: {
    heading: "Values",
    items: [
      {
        title: "Sustainability",
        description:
          "We are committed to advancing eco-friendly practices in shipping, contributing to a cleaner and healthier ocean for future generations.",
        image: "/images/value-sustainability.jpg",
        imageAlt: "Sustainability",
      },
      {
        title: "Customer Satisfaction",
        description:
          "Our clients are at the heart of everything we do. We strive to exceed expectations through reliable service, personalized solutions, and long-term partnerships.",
        image: "/images/value-customer.jpg",
        imageAlt: "Customer Satisfaction",
      },
      {
        title: "Innovation",
        description:
          "We embrace forward-thinking solutions and continuously invest in new technologies to drive efficiency and excellence in maritime operations.",
        image: "/images/value-innovation.jpg",
        imageAlt: "Innovation",
      },
      {
        title: "Integrity",
        description:
          "We uphold the highest standards of ethics and professionalism, ensuring transparency, accountability, and trust in all our engagements.",
        image: "/images/value-integrity.jpg",
        imageAlt: "Integrity",
      },
    ],
  },
  coreValues: {
    heading: "Core Values",
    paragraphs: [
      "Our team is made up of Naval Architects, Engineers, accredited RightShip inspectors and highly experienced marine surveyors, each having served in senior shipboard management roles. With decades of combined expertise spanning conventional shipping, offshore oil and gas and marine engineering, we deliver trusted solutions across the maritime spectrum.",
      "At the core of our approach is a commitment to innovation, efficiency and sustainable growth. We partner closely with ship owners, charterers and operators to provide tailored strategies that drive operational excellence and long-term value.",
    ],
  },
};

export const contactPage = {
  title: "Contact",
  cards: [
    {
      title: "Visit Us",
      description:
        "4-54-6 UTSUKUSHIGAOKA, Aoba Ward, Yokohama City Postal Code- 225-0002",
      image: "/images/Visit-Us.png",
      imageAlt: "Visit Us",
    },
    {
      title: "Call Us",
      description: "+91 789 503 9068",
      href: "tel:+917895039068",
      image: "/images/Call-Us.png",
      imageAlt: "Call Us",
    },
    {
      title: "Contact Us",
      description: "info@umitech.co.jp",
      href: "mailto:info@umitech.co.jp",
      image: "/images/Contact-Us.png",
      imageAlt: "Contact Us",
    },
  ],
  form: {
    heading: "Reach us out!",
    submitLabel: "Submit",
    mailto: "info@umitech.co.jp",
  },
};

export const contactCta = {
  title: "Let’s Talk",
  lead: "Connect with us for your varied needs!",
  ctaLabel: "Connect now",
  ctaHref: "/contact",
};

export const teamPage = {
  intro: {
    title: "Team",
    eyebrow: "Naval architects and Master Mariners",
    lead:
      "A team that has designed structure and stood on deck — so the advice you receive is grounded in both the analysis and the operation.",
  },
  members: [
    {
      name: "Nishchay Maken",
      role: "Founder & Director",
      bio:
        "Nishchay founded Pelagic Marine to solve, through engineering and design, the problems most firms only survey. Across more than two decades, including over a decade at sea on tankers, he has specialised in project cargo workscopes and stability — the work that inspired UMISTAB-X. His wider expertise spans regulatory compliance, audits and inspections, loss prevention and incident investigation for leading P&I clubs.",
      image: "/images/nishchay.png",
      imageAlt: "Portrait of Nishchay Maken, Founder & Director",
    },
    {
      name: "Bhanu Prabhakar",
      role: "Co-Founder & Head of Engineering and Design",
      bio:
        "A Naval Architect with fifteen years across offshore structures and seagoing vessels, Bhanu leads Pelagic Marine's design and engineering practice. A graduate of IIT Kharagpur in Ocean Engineering and Naval Architecture, his core strengths lie in structural and finite-element analysis, intact and damage stability, hydrodynamics, mooring analysis and CFD.",
      image: "/images/bhanu.png",
      imageAlt:
        "Portrait of Bhanu Prabhakar, Co-Founder & Head of Engineering and Design",
    },
    {
      name: "Capt. Vipul Negi",
      role: "General Manager",
      bio:
        "A Master Mariner and an expert in chemical cargo handling, Capt. Negi brings more than two decades across the marine and petrochemical industries. He leads the firm's inspection and survey work — including CDI inspections, condition and pre-purchase surveys, and damage and P&I claim surveys — together with ISM, ISPS and MLC audits.",
      image: "/images/vipul.png",
      imageAlt: "Portrait of Capt. Vipul Negi, General Manager",
    },
    {
      name: "Capt. Abhinav Upadhyay",
      role: "Senior Marine Consultant | Clean Fuels",
      bio:
        "A Master Mariner with over twenty years in gas-carrier operations, Capt. Upadhyay is Pelagic Marine's specialist in clean and future fuels. He brings hands-on cargo experience across LNG, LPG, ethane, ethylene and ammonia, and advises on emerging fuels including methanol.",
      image: "/images/abhinav.png",
      imageAlt:
        "Portrait of Capt. Abhinav Upadhyay, Senior Marine Consultant | Clean Fuels",
    },
    {
      name: "Capt. Harjit Singh Sidhu",
      role: "Operations Manager",
      bio:
        "Capt. Sidhu brings a container-shipping background and sea time with Maersk to his role managing Pelagic Marine's operations and day-to-day delivery. He advises on container-ship stability, cargo planning and load optimisation, and is a certified practitioner of remote magnetic compass adjustment.",
      image: "/images/harjit.png",
      imageAlt: "Portrait of Capt. Harjit Singh Sidhu, Operations Manager",
    },
  ],
  cta: {
    heading: "Work with the people behind the work",
    lead: "Tell us what you are facing and we will point it to the right person.",
    ctaLabel: "Contact the team",
    ctaHref: "/contact",
  },
};

export const blogPage = {
  intro: {
    title: "Marine Insights",
    lead:
      "Articles on marine engineering, inspections, surveying, offshore operations, and maritime advisory topics.",
  },
  article: {
    slug: "marine-surveys-explained",
    title:
      "Marine Surveys Explained: What Shipowners, Operators and Insurers Need to Know",
    excerpt:
      "An introduction to marine surveys, common use cases across shipping and insurance, and the value of independent technical assessment.",
    image: "/images/Inspection.jpg",
    imageAlt:
      "Marine professionals in safety gear reviewing a laptop beside a vessel.",
    ctaLabel: "Read article",
    intro: [
      "At Umitech Marine Solutions, we leverage the expertise of our team, comprising Master Mariners and Marine Engineers, to deliver precise and comprehensive marine and technical surveys. Our services cater to a wide range of vessel types, providing in-depth assessments to ensure operational efficiency, safety, and compliance with industry standards.",
    ],
    sections: [
      {
        heading: "What is a marine survey?",
        paragraphs: [
          "At Umitech Marine Solutions, we leverage the expertise of our team, comprising Master Mariners and Marine Engineers, to deliver precise and comprehensive marine and technical surveys. Our services cater to a wide range of vessel types, providing in-depth assessments to ensure operational efficiency, safety, and compliance with industry standards.",
        ],
      },
      {
        heading: "When are marine surveys used?",
        paragraphs: [
          "Our clientele spans ship owners, operators, charterers, P&I clubs, insurers, financial institutions, flag states, and classification societies.",
        ],
      },
      {
        heading: "Common marine survey types",
        list: [
          "Condition Surveys: Comprehensive assessments on behalf of P&I clubs, H&M insurers, and individual clients to evaluate the overall condition of the vessel and identify potential risks.",
          "On-Hire/Off-Hire Condition Surveys: Detailed assessments to verify the condition of vessels at the time of charter hire, including equipment, machinery, and hull integrity.",
          "On-Hire/Off-Hire Bunker Surveys: Verification of bunker fuel quantities at the start and end of the charter, including fuel quality analysis.",
          "Pre-Loading Vessel Surveys: Technical inspections to ensure vessel readiness for cargo operations, focusing on structural integrity and load distribution.",
          "Project Cargo Loading & Lashing Approvals: Certification of appropriate cargo securing methods and compliance with maritime safety standards for heavy and oversized cargoes.",
          "Non-Exclusive Surveys: Independent, non-affiliated surveys to assess the condition and functionality of specific vessel systems or components.",
          "Bollard Pull & Winch Testing: Performance testing of towing and mooring systems, including winch load testing and bollard pull capacity measurements.",
          "Safety Attestations: Official certification for compliance with safety regulations from local authorities and flag state authorities.",
          "Carving and Marking Note Attestations: Verification of compliance with specific maritime regulations regarding vessel markings, including classification and ownership details.",
          "\"Fit for Purpose\" Approvals: Assessments and certifications for project-specific applications, ensuring that vessels and equipment meet operational requirements for particular tasks or cargo.",
          "Project Cargo Loading/Unloading Attendance: On-site supervision and technical support during the loading and unloading of project cargo, ensuring compliance with safety and operational protocols.",
          "Pre-Purchase Inspections: Detailed technical evaluations of vessels, focusing on mechanical, structural, and safety systems, to support the acquisition decision-making process.",
          "Valuation Reports: Expert evaluations of vessel market value, based on condition, market trends, and technical specifications.",
        ],
      },
      {
        heading: "What a survey report should provide",
        paragraphs: [
          "Condition surveys evaluate the overall condition of the vessel and identify potential risks. Pre-purchase inspections provide detailed technical evaluations of vessels, focusing on mechanical, structural, and safety systems, to support the acquisition decision-making process. Valuation reports provide expert evaluations of vessel market value, based on condition, market trends, and technical specifications.",
        ],
      },
      {
        heading: "Why independent expertise matters",
        paragraphs: [
          "Non-exclusive surveys provide independent, non-affiliated assessment of specific vessel systems or components. With an unwavering focus on precision and adherence to international standards, Umitech Marine Solutions ensures the highest level of technical integrity and operational safety across all maritime operations.",
        ],
      },
    ],
    cta: {
      heading: "Discuss a marine challenge",
      lead:
        "When you are ready to talk through a technical or operational question, our team is available to help.",
      ctaLabel: "Contact us",
      ctaHref: "/contact",
    },
  },
};

export function getBlogArticleParams() {
  return [{ slug: blogPage.article.slug }];
}

export function getBlogArticle(slug) {
  if (slug !== blogPage.article.slug) {
    return null;
  }

  return blogPage.article;
}

export const footer = {
  information: {
    heading: "INFORMATION",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
  },
  contact: {
    heading: "CONTACT",
    phone: "+91 789 503 9068",
    phoneHref: "tel:+917895039068",
    address:
      "4-54-6 UTSUKUSHIGAOKA, AOBA WARD, YOKOHAMA CITY -225-0002",
    email: "info@umitech.co.jp",
    emailHref: "mailto:info@umitech.co.jp",
  },
  legalLinks: [
    // TODO: Replace placeholder hrefs with real policy pages.
    { label: "PRIVACY POLICY", href: "#" },
    { label: "DISCLAIMER", href: "#" },
    { label: "COOKIES POLICY", href: "#" },
    { label: "TERMS & CONDITIONS", href: "#" },
    { label: "STANDARD T&C OF ENGAGEMENT", href: "#" },
  ],
};

export const searchIndex = [
  { label: "Home", href: "/", keywords: ["home"] },
  { label: "About", href: "/about", keywords: ["about", "about us"] },
  {
    label: "Services",
    href: "/services",
    keywords: ["services", "our services"],
  },
  {
    label: "Naval Architecture",
    href: "/services#naval",
    keywords: ["naval", "architecture", "naval architecture"],
  },
  {
    label: "Engineering",
    href: "/services#engineering",
    keywords: ["engineering"],
  },
  {
    label: "Inspection, Audits and Surveying",
    href: "/services#inspection",
    keywords: ["inspection", "audits", "surveying", "survey"],
  },
  {
    label: "Legal Consultancy",
    href: "/services#legal",
    keywords: ["legal", "consultancy", "law"],
  },
  {
    label: "Mission",
    href: "/about#mission",
    keywords: ["mission"],
  },
  {
    label: "Vision",
    href: "/about#vision",
    keywords: ["vision"],
  },
  {
    label: "Values",
    href: "/about#values",
    keywords: ["values", "core values", "sustainability", "integrity"],
  },
  {
    label: "Let's Talk",
    href: "/contact",
    keywords: ["lets talk", "let's talk", "talk"],
  },
  {
    label: "Contact",
    href: "/contact",
    keywords: ["contact", "connect"],
  },
  {
    label: "Team",
    href: "/team",
    keywords: ["team", "people", "staff"],
  },
  {
    label: "Blog",
    href: "/blog",
    keywords: ["blog", "insights", "articles", "marine insights"],
  },
];

export const searchPopular = [
  "Naval Architecture",
  "Surveying",
  "Engineering",
];
