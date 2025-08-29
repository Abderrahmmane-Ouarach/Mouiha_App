// data/EducationalContent.ts

/**
 * Educational water conservation content for level completion
 * Includes facts, tips, and good practices for water awareness
 */
export const pollutedWaterFacts = [
  "L’eau polluée peut contenir des bactéries dangereuses pour la santé.",
  "Touchez une goutte polluée et vous perdez des points : c’est pour apprendre à trier l’eau.",
  "Les gouttes polluées représentent l’importance de purifier l’eau avant consommation.",
  "Les polluants dans l’eau peuvent provoquer des maladies si elle n’est pas traitée.",
  "Chaque goutte polluée évitée nous rapproche d’un environnement plus sain."
];


export interface EducationalContent {
    title: string;
    description: string;
    tip: string;
    fact: string;
  }
  
  export const educationalContent: EducationalContent[] = [
    {
      title: "توفير المياه في المنزل",
      description: "كل قطرة ماء نوفرها تساعد في الحفاظ على البيئة",
      tip: "أغلق الصنبور أثناء تنظيف الأسنان لتوفير 8 لترات يومياً",
      fact: "الشخص العادي يستخدم 300 لتر من الماء يومياً"
    },
    {
      title: "أصلح التسريبات فوراً",
      description: "التسريبات الصغيرة تؤدي إلى هدر كبير للمياه",
      tip: "فحص الأنابيب شهرياً يمنع هدر آلاف اللترات",
      fact: "تسريب صغير واحد يهدر 11,000 لتر سنوياً"
    },
    {
      title: "استخدم مياه الأمطار",
      description: "مياه الأمطار مصدر طبيعي ومجاني للري",
      tip: "اجمع مياه المطر في خزانات لسقي النباتات",
      fact: "1 ملم من المطر يعطي 1 لتر لكل متر مربع"
    },
    {
      title: "الاستحمام الذكي",
      description: "تقليل وقت الاستحمام يوفر كميات كبيرة من الماء",
      tip: "استحم لمدة 5 دقائق بدلاً من 10 دقائق",
      fact: "الاستحمام لـ5 دقائق يوفر 50 لتر من الماء الساخن"
    },
    {
      title: "المياه النظيفة حق للجميع",
      description: "ليس كل الناس محظوظون للحصول على مياه نظيفة",
      tip: "لا تهدر الماء، فكر في من لا يجده بسهولة",
      fact: "2.2 مليار شخص لا يحصلون على مياه شرب آمنة"
    },
    {
      title: "إعادة استخدام المياه",
      description: "يمكن استخدام المياه المستعملة في أغراض أخرى",
      tip: "استخدم ماء غسل الخضار لسقي النباتات",
      fact: "إعادة الاستخدام تقلل استهلاك المياه بنسبة 30%"
    },
    {
      title: "كفاءة الأجهزة المنزلية",
      description: "استخدام الأجهزة بذكاء يقلل استهلاك المياه",
      tip: "شغّل غسالة الأطباق عندما تكون ممتلئة فقط",
      fact: "الغسالات الحديثة توفر 40% من المياه"
    },
    {
      title: "حماية مصادر المياه",
      description: "المياه الملوثة تضر بالبيئة والصحة",
      tip: "لا ترمي الزيوت والمواد الكيميائية في المجاري",
      fact: "لتر واحد من الزيت يلوث مليون لتر من الماء"
    }
  ];