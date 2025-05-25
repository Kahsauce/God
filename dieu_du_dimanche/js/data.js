// Données du jeu "Dieu du Dimanche"

// Banque de choix divins absurdes
const DIVINE_CHOICES = [
    {
        id: 1,
        text: "Faire pleuvoir des spaghettis sur toute la planète",
        visual: "spaghetti",
        consequences: {
            immediate: "Une pluie de spaghettis s'abat sur votre mini-planète ! Les habitants sont d'abord surpris, puis commencent à collecter cette manne céleste.",
            longTerm: "Les habitants ont développé toute une culture autour des spaghettis. Des temples en forme de passoires géantes ont été construits et le 'Spaghetisme' est devenu la religion principale.",
            stats: { nature: -10, civilization: +5, chaos: +20, happiness: +15 }
        }
    },
    {
        id: 2,
        text: "Mettre les vaches au pouvoir",
        visual: "cow",
        consequences: {
            immediate: "Les vaches se tiennent soudain sur leurs pattes arrière et commencent à parler ! Elles organisent rapidement un coup d'État pacifique.",
            longTerm: "Le gouvernement bovin a instauré une société étonnamment stable. Le lait est devenu la monnaie officielle et les prairies sont désormais des zones protégées.",
            stats: { nature: +15, civilization: 0, chaos: +10, happiness: +5 }
        }
    },
    {
        id: 3,
        text: "Transformer les océans en Red Bull",
        visual: "energy",
        consequences: {
            immediate: "Les océans prennent une teinte bleu-argentée caractéristique. Les poissons nagent à une vitesse folle !",
            longTerm: "Toute la faune marine est hyperactive. Les habitants côtiers ne dorment plus et ont construit des villes entières en une semaine. Cependant, les écosystèmes marins sont en danger.",
            stats: { nature: -20, civilization: +15, chaos: +25, happiness: -5 }
        }
    },
    {
        id: 4,
        text: "Inverser la gravité pendant 24 heures",
        visual: "gravity",
        consequences: {
            immediate: "Tout le monde et tout flotte soudainement vers le ciel ! Les habitants s'accrochent désespérément à tout ce qui est fixé au sol.",
            longTerm: "Les habitants ont développé une architecture révolutionnaire avec des bâtiments suspendus. Une nouvelle discipline sportive de 'natation aérienne' est devenue populaire.",
            stats: { nature: 0, civilization: +10, chaos: +30, happiness: +5 }
        }
    },
    {
        id: 5,
        text: "Donner à chaque habitant un clone maléfique",
        visual: "clone",
        consequences: {
            immediate: "Des clones avec de petites moustaches apparaissent à côté de chaque habitant. La confusion est totale !",
            longTerm: "Étonnamment, la plupart des clones maléfiques se sont révélés être d'excellents comptables. Le taux de criminalité a augmenté, mais l'économie est florissante.",
            stats: { nature: -5, civilization: +10, chaos: +25, happiness: -10 }
        }
    },
    {
        id: 6,
        text: "Remplacer toutes les roues par des cubes",
        visual: "cube",
        consequences: {
            immediate: "Toutes les roues se transforment instantanément en cubes. Les véhicules s'arrêtent dans un concert de secousses et de bruits étranges.",
            longTerm: "Les habitants ont développé un système de transport basé sur le glissement et le rebond. Les routes sont maintenant faites de trampolines et de tobogans.",
            stats: { nature: +5, civilization: -5, chaos: +15, happiness: +10 }
        }
    },
    {
        id: 7,
        text: "Faire parler les plantes (et elles sont très bavardes)",
        visual: "plant",
        consequences: {
            immediate: "Toutes les plantes commencent à parler en même temps, partageant leurs pensées, leurs rêves et surtout leurs plaintes sur le manque d'eau.",
            longTerm: "Les forêts sont devenues des zones de méditation interdites car trop bruyantes. L'agriculture est devenue une profession thérapeutique, les fermiers passant leur journée à écouter les problèmes de leurs cultures.",
            stats: { nature: +20, civilization: +5, chaos: +10, happiness: +5 }
        }
    },
    {
        id: 8,
        text: "Transformer tous les chapeaux en animaux de compagnie vivants",
        visual: "hat",
        consequences: {
            immediate: "Les chapeaux s'animent soudainement ! Certains aboient, d'autres miaulent, créant une cacophonie sur les têtes des habitants.",
            longTerm: "Une nouvelle mode est née : les coiffures-animaux. Les salons de coiffure proposent maintenant des 'coupes-chiots' et des 'brushings-perroquets'.",
            stats: { nature: +10, civilization: 0, chaos: +15, happiness: +20 }
        }
    },
    {
        id: 9,
        text: "Installer un WiFi universel, mais qui ne fonctionne que quand on danse",
        visual: "wifi",
        consequences: {
            immediate: "Des routeurs WiFi apparaissent partout, mais les habitants découvrent rapidement qu'ils doivent danser pour maintenir la connexion.",
            longTerm: "La société est devenue incroyablement en forme. Les réunions de travail sont des dance-floors et les cafés ressemblent à des discothèques permanentes.",
            stats: { nature: 0, civilization: +15, chaos: +10, happiness: +15 }
        }
    },
    {
        id: 10,
        text: "Remplacer la pluie par des confettis",
        visual: "confetti",
        consequences: {
            immediate: "Les nuages déversent des confettis multicolores au lieu d'eau. C'est festif, mais les plantes semblent confuses.",
            longTerm: "Une grave sécheresse a frappé la planète, mais l'industrie du recyclage de confettis est florissante. Les habitants ont développé des systèmes complexes pour collecter la rosée matinale.",
            stats: { nature: -15, civilization: +5, chaos: +15, happiness: +10 }
        }
    },
    {
        id: 11,
        text: "Donner à tous les animaux la capacité de faire des tours de magie",
        visual: "magic",
        consequences: {
            immediate: "Les animaux commencent à faire apparaître et disparaître des objets. Les zoos sont pris d'assaut !",
            longTerm: "Les cirques animaliers dominent le divertissement mondial. Certains animaux sont devenus plus riches que leurs anciens propriétaires et vivent dans des manoirs.",
            stats: { nature: +10, civilization: +5, chaos: +15, happiness: +25 }
        }
    },
    {
        id: 12,
        text: "Transformer toutes les montagnes en géants endormis",
        visual: "giant",
        consequences: {
            immediate: "Les montagnes prennent lentement forme humanoïde et commencent à ronfler doucement. Le sol tremble légèrement.",
            longTerm: "Le tourisme d'alpinisme a été remplacé par des 'visites sur la pointe des pieds'. Des villes entières se sont spécialisées dans la fabrication de boules Quies géantes.",
            stats: { nature: +15, civilization: -5, chaos: +20, happiness: +10 }
        }
    },
    {
        id: 13,
        text: "Faire en sorte que les mensonges rendent temporairement invisible",
        visual: "truth",
        consequences: {
            immediate: "Les gens commencent à disparaître au milieu de conversations, surtout les politiciens lors de discours.",
            longTerm: "La société est devenue étonnamment honnête. Les entretiens d'embauche sont beaucoup plus courts, et les rendez-vous amoureux beaucoup plus gênants.",
            stats: { nature: 0, civilization: +10, chaos: +15, happiness: +5 }
        }
    },
    {
        id: 14,
        text: "Remplacer tous les instruments de musique par des poulets vivants",
        visual: "chicken",
        consequences: {
            immediate: "Les concerts sont interrompus alors que les musiciens se retrouvent soudain avec des poulets dans les mains au lieu de leurs instruments.",
            longTerm: "Une nouvelle forme de musique appelée 'Pouletphonie' est devenue le genre musical dominant. Les poulets de concert se vendent à prix d'or.",
            stats: { nature: +10, civilization: -5, chaos: +25, happiness: +15 }
        }
    },
    {
        id: 15,
        text: "Faire en sorte que les gens changent de couleur selon leur humeur",
        visual: "color",
        consequences: {
            immediate: "Les habitants commencent à changer de couleur comme des caméléons émotionnels. Les disputes deviennent très colorées !",
            longTerm: "Les vêtements transparents sont devenus la norme pour ne pas cacher son 'aura émotionnelle'. Les thérapies de groupe ressemblent à des arcs-en-ciel vivants.",
            stats: { nature: +5, civilization: +5, chaos: +10, happiness: +10 }
        }
    }
];

// Événements aléatoires qui peuvent se produire entre les choix divins
const RANDOM_EVENTS = [
    {
        id: 1,
        title: "Révolution des Objets",
        description: "Les objets inanimés se sont révoltés ! Les fourchettes refusent de piquer, les chaises rejettent les postérieurs, et les portes restent obstinément fermées.",
        stats: { nature: 0, civilization: -10, chaos: +20, happiness: -5 }
    },
    {
        id: 2,
        title: "Pluie d'Idées... Littéralement",
        description: "Des ampoules lumineuses tombent du ciel, chacune contenant une idée brillante. Les habitants deviennent soudainement très créatifs !",
        stats: { nature: 0, civilization: +15, chaos: +5, happiness: +10 }
    },
    {
        id: 3,
        title: "Migration des Nuages",
        description: "Les nuages ont décidé de vivre au niveau du sol. La visibilité est réduite, mais tout le monde peut maintenant toucher le ciel.",
        stats: { nature: +10, civilization: -5, chaos: +15, happiness: +5 }
    },
    {
        id: 4,
        title: "Épidémie de Fou Rire",
        description: "Une maladie étrange se propage : des fous rires incontrôlables qui durent des heures. La productivité est en chute libre, mais le moral est au plus haut !",
        stats: { nature: 0, civilization: -10, chaos: +10, happiness: +20 }
    },
    {
        id: 5,
        title: "Journée Inversée",
        description: "Tout fonctionne à l'envers aujourd'hui : l'eau coule vers le haut, les gens marchent à reculons, et le temps semble remonter.",
        stats: { nature: +5, civilization: -5, chaos: +25, happiness: +5 }
    }
];

// Niveaux de divinité que le joueur peut atteindre
const GOD_LEVELS = [
    { name: "Dieu Stagiaire", minDays: 0, description: "Vous débutez dans le métier divin. Vos pouvoirs sont limités, mais votre enthousiasme est grand !" },
    { name: "Dieu Amateur", minDays: 7, description: "Vous commencez à maîtriser quelques aspects de votre pouvoir divin. Les pantoufles vous vont bien !" },
    { name: "Dieu Confirmé", minDays: 14, description: "Votre réputation divine grandit. Les habitants commencent à construire de petits temples en votre honneur." },
    { name: "Dieu Professionnel", minDays: 28, description: "Vous êtes maintenant un dieu respecté. Vos décisions absurdes sont attendues avec impatience." },
    { name: "Dieu Expert", minDays: 49, description: "Votre maîtrise du chaos est impressionnante. Vos pantoufles sont désormais ornées de petits éclairs." },
    { name: "Dieu Suprême", minDays: 70, description: "Vous avez atteint le sommet de la hiérarchie divine ! Votre absurdité est légendaire dans tout le cosmos." }
];

// Médailles et récompenses que le joueur peut débloquer
const ACHIEVEMENTS = [
    { id: "first_choice", name: "Premier Caprice", description: "Vous avez pris votre première décision divine.", unlocked: false },
    { id: "chaos_master", name: "Maître du Chaos", description: "Atteindre 100% de chaos sur votre planète.", unlocked: false },
    { id: "harmony", name: "Harmonie Absurde", description: "Maintenir tous les stats au-dessus de 50% simultanément.", unlocked: false },
    { id: "extinction", name: "Oups...", description: "Provoquer l'extinction de la civilisation. Ce n'était pas le but, mais bon...", unlocked: false },
    { id: "utopia", name: "Utopie Étrange", description: "Atteindre 100% de bonheur malgré un chaos élevé.", unlocked: false },
    { id: "week_streak", name: "Régularité Divine", description: "Prendre des décisions pendant 7 dimanches consécutifs.", unlocked: false }
];

// Éléments visuels pour la planète
const PLANET_ELEMENTS = {
    nature: [
        { name: "forest", emoji: "🌳", threshold: 20 },
        { name: "flowers", emoji: "🌸", threshold: 40 },
        { name: "mountains", emoji: "⛰️", threshold: 60 },
        { name: "rainbow", emoji: "🌈", threshold: 80 }
    ],
    civilization: [
        { name: "house", emoji: "🏠", threshold: 20 },
        { name: "building", emoji: "🏢", threshold: 40 },
        { name: "castle", emoji: "🏰", threshold: 60 },
        { name: "rocket", emoji: "🚀", threshold: 80 }
    ],
    chaos: [
        { name: "tornado", emoji: "🌪️", threshold: 20 },
        { name: "fire", emoji: "🔥", threshold: 40 },
        { name: "alien", emoji: "👽", threshold: 60 },
        { name: "blackhole", emoji: "⚫", threshold: 80 }
    ],
    happiness: [
        { name: "smile", emoji: "😊", threshold: 20 },
        { name: "party", emoji: "🎉", threshold: 40 },
        { name: "music", emoji: "🎵", threshold: 60 },
        { name: "unicorn", emoji: "🦄", threshold: 80 }
    ]
};

// Classes de dieu disponibles
const GOD_CLASSES = [
    { id: "createur", name: "Créateur", modifiers: { nature: 5, civilization: 5 } },
    { id: "destructeur", name: "Destructeur", modifiers: { chaos: 5 } },
    { id: "bienfaiteur", name: "Bienfaiteur", modifiers: { happiness: 5 } }
];

// Artefacts pouvant être obtenus
const ARTIFACTS = [
    { id: "pantoufles_sacrees", name: "Pantoufles Sacrées", description: "Augmente les gains d'XP de 10%" },
    { id: "biscuit_eternel", name: "Biscuit Éternel", description: "Réduit le chaos de 5 lors de son utilisation" }
];

// Quêtes simples pour le système RPG
const QUESTS = [
    { id: "develop", description: "Atteindre 80% de civilisation", condition: { stat: "civilization", min: 80 }, reward: { xp: 20 } },
    { id: "nature", description: "Atteindre 80% de nature", condition: { stat: "nature", min: 80 }, reward: { xp: 20, artifact: "pantoufles_sacrees" } }
];

const XP_PER_CHOICE = 10;
