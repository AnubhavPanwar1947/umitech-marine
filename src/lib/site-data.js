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
    practiceId: "naval",
    title: "Naval Architecture",
    image: "/images/Naval.jpg",
    imageAlt:
      "Naval architecture studio with hull blueprints and a cargo-ship scale model on a drafting table, shipyard visible through the window.",
  },
  {
    practiceId: "engineering",
    title: "Engineering",
    image: "/images/ENGINEERING.jpg",
    imageAlt:
      "Empty ship engine room with diesel machinery, lagged pipes and steel gratings, no people.",
  },
  {
    practiceId: "inspection",
    title: "Inspection, Audits and Surveying",
    image: "/images/Inspection.jpg",
    imageAlt:
      "Unmarked vessel at berth with clipboard and closed tablet on the coaming, no people.",
  },
  {
    practiceId: "legal",
    title: "Loadicator",
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
    image: "/images/services-overview.jpg",
    imageAlt:
      "Marine technical studio with hull drawings and a ship model on a drafting table beside a shipyard window.",
  },
  practices: [
    {
      id: "naval",
      heading: "Naval Architecture",
      lead: "Hull form, structure and the analysis behind every design decision.",
      image: "/images/Naval-Architecture-Services.jpg",
      imageAlt:
        "Naval architecture studio with hull blueprints and drafting tools on a table, shipyard visible through the window.",
      imagePosition: "center 58%",
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
      image: "/images/Marine-Engine-Room-Thermal.jpg",
      imageAlt:
        "Marine engineer in boiler suit and ear defenders reviewing a marine diesel engine with red and orange exhaust paths and cyan cooling-water overlay on piping.",
      imagePosition: "72% 48%",
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
      image: "/images/Inspections-Audits-Surveying-Team.jpg",
      imageAlt:
        "Three marine surveyors and engineers in protective workwear reviewing a tablet and engineering blueprint at a commercial shipyard, with a cargo ship behind.",
      imagePosition: "center center",
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
      heading: "Loadicator",
      lead:
        "Class-approved loading and stability tools for crews and fleet technical teams.",
      leadInTopicsColumn: true,
      image: "/images/loadicator.png",
      imageAlt:
        "UMISTAB-X loadicator software screenshot showing stability validation table, shear-force and bending-moment plot, and vessel arrangement diagrams.",
      imageFit: "contain",
      imageAspectRatio: "1919 / 1033",
      variant: "default",
      items: [
        {
          title: "UMISTAB-X",
          slug: "legal-consultancy",
          detail: [
            "UMISTAB-X is a vessel-specific Windows loading instrument developed by Umitech Marine Solutions for bulk-carrier operations. It helps Masters and deck officers plan, evaluate, verify, and document cargo and ballast conditions. The manual applies to the bulk carrier Golden Soul (IMO No. 9950715), with approval stated for onboard use by ABS.",
            "The system supports entry and management of ballast, fuel, freshwater, lubricating oil, stores, constants, grain cargo, homogeneous and non-homogeneous dry bulk cargo, discrete cargo parcels, and icing loads. It automatically calculates key hydrostatic and stability parameters, including displacement, drafts, trim, KG/VCG, LCG, GM, free-surface effects, and tank moments.",
            "UMISTAB-X provides checks for intact stability, grain stability, damage stability, GZ curves, IMO criteria, visibility, draft surveys, and longitudinal strength. Shear forces and bending moments are calculated along the hull and compared with approved Class limits for intact conditions and predefined damage cases.",
          ],
          detailList: [
            "Ballast, fuel, freshwater, lubricating oil, stores, constants, and icing loads",
            "Grain cargo, homogeneous and non-homogeneous dry bulk cargo, and discrete cargo parcels",
            "Intact, grain, and damage stability checks, including GZ curves and IMO criteria",
            "Hydrostatic results including displacement, drafts, trim, KG/VCG, LCG, GM, free-surface effects, and tank moments",
            "Longitudinal strength, with shear forces and bending moments compared against approved Class limits",
            "Visibility and draft-survey checks",
            "Graphical arrangement views, floating summaries, validation results, and stability and strength plots",
            "Cargo and tank summaries and print-ready PDF reports for operational records, port authorities, surveyors, Class, and company review",
          ],
          detailAfter: [
            "UMISTAB-X incorporates vessel-approved data and supports compliance with applicable IMO Grain Code, SOLAS, MARPOL, BLU Code, Load Line, and classification requirements. Accuracy verification should be performed using approved test conditions after installation, updates, hardware changes, or whenever results are questioned.",
            "UMISTAB-X is an operational aid and does not replace the vessel’s approved Stability Booklet, Grain Loading Manual, SMS procedures, professional judgment, or the Master’s responsibility. Results depend on accurate user-entered data and must be cross-checked against actual onboard conditions. The software performs static calculations and does not replace assessment of dynamic wave effects, wind, sea state, hull deflection, or unapproved damage scenarios.",
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
    "Empty marine technical studio with hull model and drawings on a table, harbour light in the window.",
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
      "Empty marine technical studio with hull model and drawings on a table, harbour light in the window.",
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
        image: "/images/Sustainability.svg",
        imageAlt: "Sustainability",
      },
      {
        title: "Customer Satisfaction",
        description:
          "Our clients are at the heart of everything we do. We strive to exceed expectations through reliable service, personalized solutions, and long-term partnerships.",
        image: "/images/Customer Satisfaction.png",
        imageAlt: "Customer Satisfaction",
      },
      {
        title: "Innovation",
        description:
          "We embrace forward-thinking solutions and continuously invest in new technologies to drive efficiency and excellence in maritime operations.",
        image: "/images/Innovation.svg",
        imageAlt: "Innovation",
      },
      {
        title: "Integrity",
        description:
          "We uphold the highest standards of ethics and professionalism, ensuring transparency, accountability, and trust in all our engagements.",
        image: "/images/Integrity.svg",
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
      image: "/images/visit-us.svg",
      imageAlt: "Visit Us",
    },
    {
      title: "Call Us",
      description: "+91 789 503 9068",
      href: "tel:+917895039068",
      image: "/images/contact-us.svg",
      imageAlt: "Call Us",
    },
    {
      title: "Mail Us",
      description: "info@umitech.co.jp",
      href: "mailto:info@umitech.co.jp",
      image: "/images/mail-us.svg",
      imageAlt: "Mail Us",
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
      role: "Associate Consultant – Naval Architecture",
      bio:
        "A Naval Architect with fifteen years across offshore structures and seagoing vessels, Bhanu leads Pelagic Marine's design and engineering practice. A graduate of IIT Kharagpur in Ocean Engineering and Naval Architecture, his core strengths lie in structural and finite-element analysis, intact and damage stability, hydrodynamics, mooring analysis and CFD.",
      image: "/images/bhanu.png",
      imageAlt:
        "Portrait of Bhanu Prabhakar, Associate Consultant – Naval Architecture",
    },
    {
      name: "Capt. Vipul Negi",
      role: "Associate Consultant – Marine Operations",
      bio:
        "A Master Mariner and an expert in chemical cargo handling, Capt. Negi brings more than two decades across the marine and petrochemical industries. He leads the firm's inspection and survey work — including CDI inspections, condition and pre-purchase surveys, and damage and P&I claim surveys — together with ISM, ISPS and MLC audits.",
      image: "/images/vipul.png",
      imageAlt: "Portrait of Capt. Vipul Negi, Associate Consultant – Marine Operations",
    },
    {
      name: "Capt. Abhinav Upadhyay",
      role: "Associate Consultant – Clean Fuels",
      bio:
        "A Master Mariner with over twenty years in gas-carrier operations, Capt. Upadhyay is Pelagic Marine's specialist in clean and future fuels. He brings hands-on cargo experience across LNG, LPG, ethane, ethylene and ammonia, and advises on emerging fuels including methanol.",
      image: "/images/abhinav.png",
      imageAlt:
        "Portrait of Capt. Abhinav Upadhyay, Associate Consultant – Clean Fuels",
    },
    {
      name: "Capt. Harjit Singh Sidhu",
      role: "Associate Consultant – Marine Operations",
      bio:
        "Capt. Sidhu brings a container-shipping background and sea time with Maersk to his role managing Pelagic Marine's operations and day-to-day delivery. He advises on container-ship stability, cargo planning and load optimisation, and is a certified practitioner of remote magnetic compass adjustment.",
      image: "/images/harjit.png",
      imageAlt: "Portrait of Capt. Harjit Singh Sidhu, Associate Consultant – Marine Operations",
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
  articles: [
    {
      slug: "computational-fluid-dynamics",
      format: "docxHtml",
      title: "3% Resistance Reduction = 6-Figure Annual Savings",
      cardTitle: "Computational Fluid Dynamics",
      docxHtmlFile: "computational-fluid-dynamics.docx.html",
      excerpt: "That’s not theory. That’s operational mathematics.",
      summary:
        "CFD reveals how vessel-flow analysis can guide resistance reduction, fuel-efficiency improvements, and retrofit decisions before capital is committed.",
      image:
        "/blog/computational-fluid-dynamics/cfd-volume-fraction-contour.png",
      imageWidth: 1600,
      imageHeight: 758,
    imageAlt:
        "CFD Phase 2 volume fraction contour of a vessel hull at the free surface",
    ctaLabel: "Read article",
    },
  ],
};

export function getBlogArticleParams() {
  return blogPage.articles.map((article) => ({ slug: article.slug }));
}

export function getBlogArticle(slug) {
  return blogPage.articles.find((article) => article.slug === slug) ?? null;
}

export const standardTermsPage = {
  title: "Standard Terms & Conditions of Engagement",
  description:
    "Standard Terms and Conditions of Engagement for UMITECH MARINE consultancy services, including scope, fees, liability, and governing law.",
    sections: [
      {
      number: "1",
      heading: "Interpretation",
      intro: "In these Conditions, the following definitions apply:",
      definitions: [
        {
          term: "Agreement",
          text:
            "means the contract between Umitech Marine Solutions and the Client for the provision of professional consultancy Services, in accordance with the Engagement Letter and these Conditions.",
        },
        {
          term: "Client",
          text:
            "means the individual, company, firm, organization, or other legal entity identified in the Engagement Letter which has engaged the Company to provide Services.",
        },
        {
          term: "Client Group",
          text:
            "means the Client, its affiliates, subsidiaries, or holding company from time to time, and their respective officers, representatives, employees, agents, consultants, and subcontractors.",
        },
        {
          term: "Company",
          text:
            "means Umitech Marine Solutions, a company incorporated and operating under the laws of Japan, with its registered office in Yokohama, Japan, and where applicable, its representatives, employees, agents, consultants, and subcontractors.",
        },
        {
          term: "Company Group",
          text:
            "means the Company, its affiliates, subsidiaries, or holding company, and their respective officers, representatives, employees, agents, consultants, and subcontractors.",
        },
        {
          term: "Conditions",
          text:
            "means these Terms and Conditions of Engagement, as may be amended from time to time in writing.",
        },
        {
          term: "Engagement Letter",
          text:
            "means the Company’s written confirmation or proposal outlining the Services to be performed and the terms under which such Services are provided.",
        },
        {
          term: "Fee or Fees",
          text: "means the amount payable by the Client to the Company as remuneration for the Services.",
        },
        {
          term: "Services",
          text:
            "means the consultancy, technical, advisory, design, or project management services provided by the Company to the Client, as detailed in the Engagement Letter.",
        },
        {
          term: "Third Party",
          text:
            "means any person, company, or other legal entity which is not a member of either the Company Group or the Client Group.",
        },
      ],
    },
    {
      number: "2",
      heading: "Basis of Contract",
      clauses: [
        {
          id: "2.1",
          text:
            "These Conditions constitute the entire agreement between the Parties and supersede all prior discussions or representations. The Client acknowledges that it has not relied on any statement, promise, or representation not expressly set out in this Agreement.",
        },
        {
          id: "2.2",
          text:
            "These Conditions shall apply to all engagements between the Company and the Client to the exclusion of any terms proposed by the Client, whether implied by statute, trade, custom, or prior dealings.",
        },
        {
          id: "2.3",
          text:
            "The Agreement shall take effect on the earlier of (i) the Client’s written acceptance of the Engagement Letter or (ii) the commencement of performance by the Company, unless the Client objects in writing within forty-eight (48) hours.",
        },
        {
          id: "2.4",
          text:
            "The Company reserves the right to decline or suspend commencement of the Services until the Engagement Letter has been duly signed and any agreed deposit received.",
        },
      ],
    },
    {
      number: "3",
      heading: "Provision of Services",
      clauses: [
        {
          id: "3.1",
          text:
            "The Company shall perform the Services with reasonable care, diligence, skill, and in accordance with professional standards applicable to marine and engineering consultancy.",
        },
        {
          id: "3.2",
          text:
            "Any timeline or deliverable date provided by the Company is indicative only unless expressly agreed in writing. Time shall not be of the essence.",
        },
        {
          id: "3.3",
          text:
            "The Company may make changes to the Services to comply with applicable law, regulatory requirements, or to maintain safety or quality, provided such changes do not materially affect the nature or scope of the Services.",
        },
        {
          id: "3.4",
          text:
            "Unless otherwise agreed, the Company shall have no liability or duty of care toward any Third Party in connection with the Services.",
        },
        {
          id: "3.5",
          text:
            "Where the Services involve advice, analysis, recommendations, or interpretative data, such information represents professional opinion and judgment. The Client shall be solely responsible for decisions made based on such advice.",
        },
        {
          id: "3.6",
          text:
            "The Company shall not be required to act in contravention of any sanction, prohibition, or regulation imposed by any competent authority.",
        },
      ],
    },
    {
      number: "4",
      heading: "Client’s Obligations",
      clauses: [
        {
          id: "4.1",
          text: "The Client shall:",
          subItems: [
            "Provide the Company with all information, documentation, and access reasonably required to perform the Services effectively;",
            "Ensure that all information supplied is accurate and complete;",
            "Cooperate with the Company in all matters relating to the Services;",
            "Ensure safe access to premises, facilities, or vessels as may be necessary for performance; and",
            "Comply fully with its payment obligations.",
          ],
        },
        {
          id: "4.2",
          text:
            "If the Client’s failure or delay prevents or delays the Company’s performance, the Company shall be entitled to suspend performance and recover all additional costs incurred.",
        },
        {
          id: "4.3",
          text:
            "The Client agrees to indemnify the Company for any loss, cost, or liability arising directly or indirectly from the Client’s failure to fulfill its obligations or from reliance on inaccurate or incomplete information provided by the Client.",
        },
      ],
    },
    {
      number: "5",
      heading: "Fees and Payment",
      clauses: [
        {
          id: "5.1",
          text: "Fees shall be calculated in accordance with the terms set out in the Engagement Letter.",
        },
        {
          id: "5.2",
          text:
            "The Company is entitled to reimbursement of all reasonable expenses, including travel, accommodation, third-party costs, and other incidental expenses incurred in connection with the Services.",
        },
        {
          id: "5.3",
          text:
            "Unless otherwise stated, invoices are due within thirty (30) days of issuance. Delayed payments shall accrue interest at 3% per month, compounded quarterly, until settlement.",
        },
        {
          id: "5.4",
          text:
            "Fees are exclusive of any applicable taxes, including VAT, GST, or service tax, which shall be payable in addition.",
        },
        {
          id: "5.5",
          text:
            "Any dispute regarding an invoice must be notified within seven (7) days of receipt; undisputed portions shall remain payable within the stipulated timeframe.",
        },
        {
          id: "5.6",
          text:
            "The Company reserves the right to suspend work if payments are overdue or if requested funds on account are not received.",
        },
      ],
    },
    {
      number: "6",
      heading: "Limitation of Liability",
      clauses: [
        {
          id: "6.1",
          text:
            "The Company’s total aggregate liability, whether in contract, tort, or otherwise, shall not exceed the amount of the Fees paid for the Services giving rise to the claim, subject to a maximum liability cap of USD 100,000.",
        },
        {
          id: "6.2",
          text:
            "The Company shall not be liable for any indirect, consequential, or special loss, including but not limited to loss of profit, business interruption, loss of goodwill, or data.",
        },
        {
          id: "6.3",
          text:
            "The Client acknowledges that professional consultancy advice inherently carries an element of judgment and interpretation, and that absolute outcomes cannot be guaranteed.",
        },
      ],
    },
    {
      number: "7",
      heading: "Intellectual Property",
      clauses: [
        {
          text:
            "All intellectual property rights arising from the Services shall remain the exclusive property of the Company. The Client shall have a non-transferable, non-exclusive license to use deliverables solely for the purpose defined in the Engagement Letter, upon full payment of Fees.",
        },
      ],
    },
    {
      number: "8",
      heading: "Confidentiality",
      clauses: [
        {
          text:
            "Both Parties agree to maintain strict confidentiality regarding all proprietary or sensitive information exchanged in connection with the Services. This obligation shall survive termination for a period of five (5) years.",
        },
      ],
    },
    {
      number: "9",
      heading: "Termination",
      clauses: [
        {
          id: "9.1",
          text: "Either Party may terminate the Agreement with written notice if the other:",
          subItems: [
            "Commits a material breach and fails to remedy it within thirty (30) days; or",
            "Becomes insolvent, bankrupt, or ceases trading.",
          ],
        },
        {
          id: "9.2",
          text:
            "Upon termination, the Client shall immediately pay all outstanding Fees and expenses.",
        },
        {
          id: "9.3",
          text:
            "The Company may retain any deposit or advance payment to offset costs incurred.",
        },
      ],
    },
    {
      number: "10",
      heading: "Force Majeure",
      clauses: [
        {
          text:
            "Neither Party shall be liable for failure or delay in performance due to events beyond its reasonable control, including natural disasters, war, strikes, or governmental actions. If such circumstances persist for more than fourteen (14) days, either Party may terminate the Agreement with written notice.",
        },
      ],
    },
    {
      number: "11",
      heading: "Governing Law and Jurisdiction",
      clauses: [
        {
          text:
            "This Agreement shall be governed by and construed in accordance with the laws of Japan, and where applicable, Indian law.",
        },
        {
          text:
            "Any disputes shall be subject to the exclusive jurisdiction of the competent courts of Japan.",
        },
      ],
    },
    {
      number: "12",
      heading: "Contact",
      contact: true,
      intro:
        "For any contractual queries, notices, or communication, please contact:",
      email: "info@umitech.co.jp",
      location: "Yokohama, Japan",
    },
  ],
};

export const termsPage = {
  title: "Terms & Conditions",
  description:
    "Website Terms and Conditions for UMITECH MARINE — use of www.umitech.co.jp, content ownership, liability, and governing law.",
  sections: [
    {
      number: "1",
      heading: "Acceptance of Terms",
        paragraphs: [
        "By accessing and using www.umitech.co.jp (“the Website”), you agree to be bound by these Terms and Conditions. If you do not agree, please discontinue use immediately.",
        ],
      },
      {
      number: "2",
      heading: "Ownership and Copyright",
        paragraphs: [
        "All content, including text, images, logos, graphics, and materials on this Website, is the property of Umitech Marine Solutions unless otherwise stated. Unauthorized use, reproduction, or redistribution is prohibited.",
        ],
      },
      {
      number: "3",
      heading: "Use of the Website",
      paragraphs: [
        "You agree to use the Website lawfully and refrain from activities that:",
      ],
      listItems: [
        "Violate any applicable laws or regulations.",
        "Infringe upon the rights of others.",
        "Interfere with Website functionality or security.",
        ],
      },
      {
      number: "4",
      heading: "Accuracy of Information",
        paragraphs: [
        "We strive to maintain accurate and up-to-date information; however, Umitech Marine Solutions makes no warranties regarding completeness, accuracy, or reliability of content. The Website’s information is provided for general guidance only.",
        ],
      },
      {
      number: "5",
      heading: "Limitation of Liability",
        paragraphs: [
        "To the fullest extent permitted by law, Umitech Marine Solutions shall not be liable for any direct, indirect, incidental, or consequential damages resulting from use or inability to use this Website.",
      ],
    },
    {
      number: "6",
      heading: "Third-Party Links",
      paragraphs: [
        "This Website may contain links to external sites. We are not responsible for the content, policies, or practices of such third-party websites.",
      ],
    },
    {
      number: "7",
      heading: "Indemnity",
      paragraphs: [
        "Users agree to indemnify and hold harmless Umitech Marine Solutions, its officers, and employees from any claims arising from misuse of the Website or violation of these Terms.",
      ],
    },
    {
      number: "8",
      heading: "Governing Law and Jurisdiction",
      paragraphs: [
        "These Terms are governed by and construed in accordance with the laws of Japan, and where applicable, Indian law. Any disputes shall be subject to the exclusive jurisdiction of courts in Japan.",
      ],
    },
    {
      number: "9",
      heading: "Amendments",
      paragraphs: [
        "We may revise these Terms periodically. Continued use of the Website signifies acceptance of the updated Terms.",
      ],
    },
    {
      number: "10",
      heading: "Contact",
      contact: true,
      intro: "For any queries, please contact:",
      email: "info@umitech.co.jp",
    },
  ],
};

export const cookiesPolicyPage = {
  title: "Cookies Policy",
  description:
    "How UMITECH MARINE uses cookies and similar technologies on its website, including essential, performance, and functional cookies.",
  sections: [
    {
      number: "1",
      heading: "Introduction",
      paragraphs: [
        "This Cookies Policy explains how Umitech Marine Solutions (“we,” “our,” or “us”) uses cookies and similar technologies on our Website.",
      ],
    },
    {
      number: "2",
      heading: "What Are Cookies",
      paragraphs: [
        "Cookies are small text files stored on your device when you visit a website. They help us understand user preferences, improve site functionality, and enhance performance.",
      ],
    },
    {
      number: "3",
      heading: "Types of Cookies We Use",
      listItems: [
        "Essential cookies: Required for basic site operation and security.",
        "Performance cookies: Collect anonymous data on how visitors use our Website (e.g., Google Analytics).",
        "Functional cookies: Remember user preferences such as language and location.",
      ],
      paragraphsAfterList: [
        "We do not use cookies for marketing, advertising, or behavioural tracking.",
      ],
    },
    {
      number: "4",
      heading: "Managing Cookies",
      paragraphs: [
        "You can control and delete cookies through your browser settings. Disabling cookies may affect certain Website features.",
      ],
    },
    {
      number: "5",
      heading: "Consent",
      paragraphs: [
        "By continuing to use our Website, you consent to our use of cookies as outlined in this policy.",
      ],
    },
    {
      number: "6",
      heading: "Changes to this Policy",
      paragraphs: [
        "We may amend this Cookies Policy periodically. Updates will be posted on this page.",
      ],
    },
    {
      number: "7",
      heading: "Contact",
      contact: true,
      intro: "For cookie-related queries, contact:",
    email: "info@umitech.co.jp",
    },
  ],
};

export const privacyPolicyPage = {
  title: "Privacy Policy",
  description:
    "How UMITECH MARINE collects, uses, stores, and protects personal information on www.umitech.co.jp, and your privacy rights.",
  sections: [
    {
      number: "1",
      heading: "Introduction",
      paragraphs: [
        "Umitech Marine Solutions (“the Company,” “we,” “our,” or “us”) respects the privacy of all visitors to our website, www.umitech.co.jp (“the Website”). This Privacy Policy explains how we collect, use, store, and protect personal information obtained through the Website.",
        "By using our Website, you consent to the practices described in this policy.",
      ],
    },
    {
      number: "2",
      heading: "Information We Collect",
      intro: "We may collect the following types of information:",
      listItems: [
        "Personal information: Name, email address, phone number, company name, and any details voluntarily provided through our contact form or communications.",
        "Non-personal information: Browser type, device type, IP address, and usage statistics gathered through standard analytics tools.",
      ],
    },
    {
      number: "3",
      heading: "Purpose of Collection",
      intro: "We collect and process personal data for the following purposes:",
      listItems: [
        "To respond to inquiries or service requests.",
        "To provide information related to our services.",
        "To improve the Website’s performance and functionality.",
        "To comply with legal obligations.",
      ],
    },
    {
      number: "4",
      heading: "Legal Basis for Processing",
      intro: "Our legal bases for processing data include:",
      listItems: [
        "Consent – where you voluntarily provide data through our forms.",
        "Legitimate interest – to enhance user experience and ensure Website functionality.",
        "Legal compliance – where applicable under Japanese (APPI) and Indian IT laws.",
      ],
    },
    {
      number: "5",
      heading: "Data Retention",
      paragraphs: [
        "We retain personal information only as long as necessary to fulfil the purposes for which it was collected or to comply with legal requirements.",
      ],
    },
    {
      number: "6",
      heading: "Data Protection & Security",
      paragraphs: [
        "We employ appropriate administrative, technical, and organizational measures to protect personal data from unauthorized access, alteration, disclosure, or destruction.",
      ],
    },
    {
      number: "7",
      heading: "Third-Party Disclosure",
      intro:
        "We do not sell, rent, or share personal data with third parties, except where:",
      listItems: [
        "Required by law or court order.",
        "Necessary to protect our rights, property, or safety.",
        "Shared with trusted service providers who process data on our behalf under strict confidentiality.",
      ],
    },
    {
      number: "8",
      heading: "International Data Transfers",
      paragraphs: [
        "As Umitech Marine Solutions operates internationally, your data may be transferred and processed outside Japan, including in India. All such transfers comply with applicable data protection laws.",
      ],
    },
    {
      number: "9",
      heading: "Your Rights",
      intro: "Depending on your jurisdiction, you may have the right to:",
      listItems: [
        "Access, correct, or delete your personal information.",
        "Withdraw consent at any time.",
        "Lodge a complaint with a relevant supervisory authority.",
      ],
      paragraphsAfterList: ["Requests can be sent to info@umitech.co.jp."],
    },
    {
      number: "10",
      heading: "Updates to this Policy",
      paragraphs: [
        "We may update this Privacy Policy periodically. Updates will be posted on this page with the effective date.",
      ],
    },
    {
      number: "11",
      heading: "Contact Us",
      contact: true,
      intro:
        "If you have any questions about this Privacy Policy, please contact:",
      organization: "Umitech Marine Solutions",
      location: "Yokohama, Japan",
      email: "info@umitech.co.jp",
    },
  ],
};

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
    { label: "PRIVACY POLICY", href: "/privacy-policy" },
    { label: "DISCLAIMER", href: "#" },
    { label: "COOKIES POLICY", href: "/cookies-policy" },
    { label: "TERMS & CONDITIONS", href: "/terms-conditions" },
    {
      label: "STANDARD T&C OF ENGAGEMENT",
      href: "/standard-terms-conditions",
    },
  ],
};

export const searchPopular = [
  "Naval Architecture",
  "Marine Surveying",
  "Engineering",
  "CFD",
  "Ship Design",
  "Project Management",
  "Technical Consulting",
];

export const searchFilterGroups = [
  { id: "all", label: "All" },
  { id: "services", label: "Services" },
  { id: "articles", label: "Articles" },
  { id: "team", label: "Team" },
  { id: "about", label: "About" },
  { id: "legal", label: "Legal" },
];
