export type QuoteModel = {
  id: number;
  name: string;
  business_need_label: string;
  features: string[];
  addons: Addon[];
  price: number;
  description: string;
};

export type QuoteModelV2 = {
  id: number;
  name: string;
  business_need_label: string;
  features: {
    name: string;
    data: string[];
  }[];
  price: number;
  description: string;
};

export type Addon = {
  id: number;
  price: number;
  name: string;
};

type AddOneRange = {
  name?: string;
  from: number;
  to: number;
  price: number;
};

export type AddonV2 = {
  id: number;
  price: number;
  name: string;
  logo?: string;
  description?: string;
  addonType: AddonType;
  data: AddOneRange[];
  steps?: number;
};

export type AddonType = "DEFAULT" | "DROPDOWN" | "PLUS_MINUS";

export const quotesData: QuoteModel[] = [
  {
    id: 3,
    name: "companies",
    business_need_label: "company_needed",
    addons: [
      { name: "أضافة 1", price: 10, id: 1 },
      { name: "أضافة 2", price: 15, id: 2 },
    ],
    features: [
      "عدد مستخدمين 10",
      "جميع مميزات المكاتب",
      "خدمات المستأجر الذاتية",
      "خدمات المالك الذاتية",
      "المدفوعات الألكترونية بطاقة مدى",
      "ذكاء إصطناعي متابعة صيانة/تحصيل",
      "تعلم الآلة اختيار صور/تصحيح اخطاء",
    ],
    price: 1999,
    description:
      "الباقة المثالية للشركات العقارية التي تنشط في قطاع إدارة الأملاك العقارية والتي يكون عدد موظفيها المختصين بإدارة الأملاك في نطاق 10 موظفين، وتتميز الباقة ببوابات الخدمات الذاتية لتسهيل التواصل مع المالك والمستأجر، بالإضافة إلى التقارير المجمعة، وخدمات الربط مع الأنظمة المختلفة وخدمة التسويق العقاري بتمكينهم من إنشاء عروض الأسعار. بالإضافة إلى تنظيم السماحية (السداد اللاحق)، مع دعم مختلف والقوائم المالية (قائمة الدخل، والتدفقات النقدية، والمركز المالي، والتغير في حقوق الملكية).",
  },
  {
    id: 2,
    name: "offices",
    business_need_label: "office_needed",
    addons: [
      { name: "أضافة 1", price: 10, id: 1 },
      { name: "أضافة 2", price: 12, id: 2 },
      { name: "أضافة 3", price: 13, id: 3 },
      { name: "أضافة 4", price: 15, id: 4 },
    ],
    features: [
      "عدد مستخدمين 4",
      "جميع مميزات العقاري",
      "مؤشرات ورسوم بيانية يشمل",
      "نظام محاسبي آلي متكامل ",
      "تقارير تفصيلية مستوى وحدة/عقار",
      "نظام صيانة وتشغيل شامل",
    ],
    price: 699,
    description:
      "هذه الباقة مخصصة للوسطاء العقاريين المحترفين والمكاتب العقارية، لمتابعة العمليات اليومية بأتمتة كاملة لعمليات التأجير والتشغيل والصيانة ومتابعتها بتقارير تفصيلية قابلة للتخصيص، بالإضافة إلى شاشة المؤشرات الذكية، مع نظام محاسبي متكامل وفوترة آلية وإمكانية إصدار الفواتير وتوريد الضرائب نيابة عن طرف ثالث، وشاشة العقود المؤرشفة لمتابعة العقود المنتهية والملغية، وشاشة العقارات الشاغرة لمتابعة وحصر الوحدات الغير مؤجرة.",
  },
  {
    id: 1,
    name: "real-estate",
    business_need_label: "personal_needed",
    addons: [
      { name: "أضافة 1", price: 10, id: 1 },
      { name: "أضافة 2", price: 12, id: 2 },
      { name: "أضافة 3", price: 15, id: 3 },
    ],
    features: [
      "1 :عدد مستخدمين",
      "عدد العقارات/الوحدات غير محدودة",
      "عدد العقود غير محدود",
      "عدد العملاء غير محدودين",
      "فواتير إلكترونية يشمل",
      "المصروفات مستوى عقد/عقار",
      "العقود والتنبيهات شامل",
    ],
    price: 199,
    description:
      "صممت هذه الباقة لتلبية احتياجات العقاريين والملاك الأفراد وأصحاب المكاتب الناشئة، إذ تٌمكنهم من إدارة تحصيلات ومستحقات العقود، ومتابعة مصروفات العقار مع تنبيهات الدفعات وإنشاء سندات القبض آليًا، وإصدار الفواتير الإلكترونية المتوافقة مع معايير الهيئة، كما تزودهم بخاصيتي إخلاء الوحدات وتجديد العقود، كل هذا بإضافة عدد غير محدود من العقارات والوحدات، وعدد لا نهائي من العقود والمستأجرين.",
  },
];

export const quotesDataV2: QuoteModelV2[] = [
  {
    id: 1,
    name: "real-estate",
    business_need_label: "personal_needed",
    features: [
      {
        name: "Group A",
        data: [
          "مستخدم واحد",
          "عقارات ووحدات غير محدودة",
          "عقود غير محدودة",
          "300 رسالة جوال",
          "14 تقرير تفصيلي للعقارات والوحدات",
          "مصاريف الوحدات العقارية",
          "متابعة التحصيل وإشعارات المستأجرين",
          "اخلاء الوحدة/التأمين",
          "فاتورة إلكترونية متوافقة مع متطلبات هيئة الزكاة",
        ],
      },
    ],
    price: 199,
    description:
      "صممت هذه الباقة لتلبية احتياجات العقاريين والملاك الأفراد وأصحاب المكاتب الناشئة، إذ تٌمكنهم من إدارة تحصيلات ومستحقات العقود، ومتابعة مصروفات العقار مع تنبيهات الدفعات وإنشاء سندات القبض آليًا، وإصدار الفواتير الإلكترونية المتوافقة مع معايير الهيئة، كما تزودهم بخاصيتي إخلاء الوحدات وتجديد العقود، كل هذا بإضافة عدد غير محدود من العقارات والوحدات، وعدد لا نهائي من العقود والمستأجرين.",
  },
  {
    id: 2,
    name: "offices",
    business_need_label: "office_needed",
    features: [
      {
        name: "Group A",
        data: [
          "4 مستخدمين",
          "عقارات ووحدات غير محدودة",
          "عقود ومستأجرين غير محدودة",
          "1000 رسالة جوال",
          "36 تقرير تفصيلي للعقارات والوحدات",
          "مصاريف الوحدات العقارية",
          "متابعة التحصيل/إشعارات المستأجرين",
          "اخلاء الوحدة/التأمين",
          "فاتورة إلكترونية متوافقة مع متطلبات هيئة الزكاة",
        ],
      },
      {
        name: "Group B",
        data: ["الوحدات الشاغرة", "تجديد آلي وأرشفة للعقود"],
      },
      {
        name: "Group C",
        data: [
          "شاشة مؤشرات ورسوم بيانية",
          "نظام صيانة الوحدات والمرافق",
          "نظام محاسبي مالي (أساسي)",
        ],
      },
    ],
    price: 699,
    description:
      "هذه الباقة مخصصة للوسطاء العقاريين المحترفين والمكاتب العقارية، لمتابعة العمليات اليومية بأتمتة كاملة لعمليات التأجير والتشغيل والصيانة ومتابعتها بتقارير تفصيلية قابلة للتخصيص، بالإضافة إلى شاشة المؤشرات الذكية، مع نظام محاسبي متكامل وفوترة آلية وإمكانية إصدار الفواتير وتوريد الضرائب نيابة عن طرف ثالث، وشاشة العقود المؤرشفة لمتابعة العقود المنتهية والملغية، وشاشة العقارات الشاغرة لمتابعة وحصر الوحدات الغير مؤجرة.",
  },
  {
    id: 3,
    name: "companies",
    business_need_label: "company_needed",
    features: [
      {
        name: "Group A",
        data: [
          "10 مستخدمين",
          "عقارات ووحدات غير محدودة",
          "عقود ومستأجرين غير محدودة",
          "5000 رسالة جوال",
          "36 تقرير تفصيلي للعقارات والوحدات",
          "مصاريف الوحدات العقارية",
          "متابعة التحصيل/إشعارات المستأجرين",
          "اخلاء الوحدة/التأمين",
          "فاتورة إلكترونية متوافقة مع متطلبات هيئة الزكاة",
        ],
      },
      {
        name: "group B",
        data: ["الوحدات الشاغرة", "تجديد آلي وأرشفة للعقود"],
      },
      {
        name: "Group C",
        data: [
          "شاشة مؤشرات ورسوم بيانية",
          "نظام صيانة الوحدات والمرافق",
          "نظام محاسبي مالي (متكامل)",
        ],
      },
      {
        name: "Group D",
        data: [
          "بوابة الخدمات الذاتية للمالك",
          "بوابة الخدمات الذاتية للمستأجر",
          "بوابة الوسيط العقاري وعروض الأسعار",
        ],
      },
    ],
    price: 1999,
    description:
      "الباقة المثالية للشركات العقارية التي تنشط في قطاع إدارة الأملاك العقارية والتي يكون عدد موظفيها المختصين بإدارة الأملاك في نطاق 10 موظفين، وتتميز الباقة ببوابات الخدمات الذاتية لتسهيل التواصل مع المالك والمستأجر، بالإضافة إلى التقارير المجمعة، وخدمات الربط مع الأنظمة المختلفة وخدمة التسويق العقاري بتمكينهم من إنشاء عروض الأسعار. بالإضافة إلى تنظيم السماحية (السداد اللاحق)، مع دعم مختلف والقوائم المالية (قائمة الدخل، والتدفقات النقدية، والمركز المالي، والتغير في حقوق الملكية).",
  },
];

export const addonsData: AddonV2[] = [
  {
    id: 7,
    name: "الربط مع إيجار",
    price: 4999,
    logo: "/assets/images/ejar-logo-ar.svg",
    addonType: "DEFAULT",
    data: [],
    description: "",
  },
  {
    id: 4,
    name: "مستخدم إضافي",
    price: 0,
    logo: "",
    addonType: "PLUS_MINUS",
    description: "وسع قنواتك التسويقية ومصادر العملاء",
    data: [
      {
        from: 1,
        to: 10,
        price: 125,
      },
    ],
    steps: 1,
  },
  {
    id: 10,
    name: "مرسل SMS مخصص",
    price: 499,
    logo: "",
    addonType: "DROPDOWN",
    description: "",
    data: [
      {
        from: 101,
        to: 1000,
        price: 399,
      },
      {
        from: 501,
        to: 5000,
        price: 1499,
      },
      { from: 1001, to: 10000, price: 2499 },
      { from: 1001, to: 20000, price: 3999 },
    ],
    steps: 50,
  },
  {
    id: 9,
    name: "تطبيق الهاتف",
    price: 500,
    logo: "",
    addonType: "DEFAULT",
    description: "",
    data: [],
  },
  {
    id: 1,
    name: "أدخال العقود",
    price: 0,
    logo: "",
    addonType: "PLUS_MINUS",
    description: "وسع قنواتك التسويقية ومصادر العملاء",
    data: [
      {
        from: 1,
        to: 100,
        price: 10.0,
      },
      {
        from: 101,
        to: 500,
        price: 8.0,
      },
      {
        from: 501,
        to: 1000,
        price: 5.0,
      },
      {
        from: 1001,
        to: 2000,
        price: 2.5,
      },
    ],
  },
  {
    id: 2,
    name: "ادخال القيود",
    price: 0,
    logo: "",
    addonType: "PLUS_MINUS",
    description: "وسع قنواتك التسويقية ومصادر العملاء",
    data: [
      {
        from: 1,
        to: 100,
        price: 10.0,
      },
      {
        from: 101,
        to: 500,
        price: 8.0,
      },
      {
        from: 501,
        to: 1000,
        price: 5.0,
      },
      {
        from: 1001,
        to: 2000,
        price: 2.5,
      },
    ],
    steps: 50,
  },
  {
    id: 3,
    name: "عدد مستخدمين بوابات",
    price: 0,
    logo: "",
    addonType: "PLUS_MINUS",
    description: "وسع قنواتك التسويقية ومصادر العملاء",
    data: [
      {
        from: 1,
        to: 100,
        price: 50.0,
      },
      {
        from: 101,
        to: 500,
        price: 30.0,
      },
      {
        from: 501,
        to: 1000,
        price: 25.0,
      },
      {
        from: 1001,
        to: 2000,
        price: 20,
      },
    ],
    steps: 50,
  },
  {
    id: 5,
    name: "تسجيل حساب واتساب مخصص",
    price: 8999,
    logo: "https://simaat.sa/images/product/WhatsApp-Business.png",
    addonType: "DEFAULT",
    data: [],
    description: "وسع قنواتك التسويقية ومصادر العملاء",
  },
  {
    id: 6,
    name: "تفعيل حساب واتساب (مسجل مسبقاً)",
    price: 4999,
    logo: "https://simaat.sa/images/product/WhatsApp-Business.png",
    addonType: "DEFAULT",
    data: [],
    description: "وسع قنواتك التسويقية ومصادر العملاء",
  },
];
