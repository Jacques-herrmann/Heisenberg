const NEW_BLOCK = ['', {
    type: 'p',
    content: '',
    layout: [],
    computed: ''
}]

const P = ["Je suis un paragraphe avec chaque mise en forme **gras**, *italique*, __underline__, ~~strike~~ et code!\n\n", {
    type: 'p',
    content: 'Je suis un paragraphe avec chaque mise en forme gras, italique, underline, strike et code!',
    layout: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", //*15
             "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-",
             "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-",
             "-", "-", "-", "b", "b", "b", "b", "-", "-", "i", "i", "i", "i", "i", "i",
             "i", "i", '-', '-', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', "-", "-",
             "s", "s", "s", "s", "s", "s", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    computed: 'Je suis un paragraphe avec chaque mise en forme <b>gras</b>, <i>italique</i>, <u>underline</u>, <s>strike</s> et code!'
}];

const UL = ["- First i**tem**\n* Secon*d* item\n+ Third item\n\n", {
    type: 'ul',
    content: ['First item', 'Second item', 'Third item'],
    layout:   [['-', '-', '-', '-', '-', '-', '-', 'b', 'b', 'b'], ['-', '-', '-', '-', '-', 'i', '-', '-', '-', '-', '-'], ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-']],
    computed: ['First i<b>tem</b>', 'Secon<i>d</i> item', 'Third item']
}];

const OL = ["1. First item\n2. Second item\n5. Third item\n\n", {
    type: 'ol',
    content: ['First item', 'Second item', 'Third item'],
    layout:  [['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'], ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'], ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-']],
    computed: ['First item', 'Second item', 'Third item']
}];

const H1 = ["# Je suis un titre de niveau 1\n\n", {
    type: 'h1',
    content: 'Je suis un titre de niveau 1',
    layout: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", //*15
             "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    computed: 'Je suis un titre de niveau 1'
}];

const H2 = ["## Je suis un titre de niveau 2\n\n", {
    type: 'h2',
    content: 'Je suis un titre de niveau 2',
    layout: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", //*15
             "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    computed: 'Je suis un titre de niveau 2'
}];

const H3 = ["### Je suis un titre de niveau 3\n\n", {
    type: 'h3',
    content: 'Je suis un titre de niveau 3',
    layout: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", //*15
             "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    computed: 'Je suis un titre de niveau 3'
}];

const QUOTE = ["> Je suis un paragraphe de type citation\n\n", {
    type: 'blockquote',
    content: 'Je suis un paragraphe de type citation',
    layout: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", //*15
             "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-",
             "-", "-", "-", "-", "-", "-", "-", "-"],
    computed: 'Je suis un paragraphe de type citation'
}];

const INFO = ["!!! info\nJe suis un paragraphe de type info\n\n", {
    type: 'info',
    content: 'Je suis un paragraphe de type info',
    layout: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", //*15
             "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-",
             "-", "-", "-", "-"],
    computed: 'Je suis un paragraphe de type info'
}];

const WARNING = ["!!! warning\nJe suis un paragraphe de type warning\n\n", {
    type: 'warning',
    content: 'Je suis un paragraphe de type warning',
    layout: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", //*15
             "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-",
             "-", "-", "-", "-", "-", "-", "-"],
    computed: 'Je suis un paragraphe de type warning'
}];

const DANGER = ["!!! danger\nJe suis un paragraphe de type danger\n\n", {
    type: 'danger',
    content: 'Je suis un paragraphe de type danger',
    layout: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", //*15
             "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-",
             "-", "-", "-", "-", "-", "-"],
    computed: 'Je suis un paragraphe de type danger'
}];

const FULL_MD = ["Petit éditeur **WYSIWYG**\n\n" +
"**Uti**lisable avec du markdown ou du RichText\n\n" +
"codé sous forme de composant Vue\n\n" +
"Enjoy\n\n" +
"# Je suis un titre de niveau 1\n\n" +
"## Je suis un titre de niveau 2\n\n" +
"### Je suis un titre de niveau 3\n\n" +
"> Je suis un paragraphe de type citation\n\n" +
"!!! info\nJe suis un paragraphe de type info\n\n" +
"!!! warning\nJe suis un paragraphe de type warning\n\n" +
"!!! danger\nJe suis un paragraphe de type danger\n\n" +
"Testons les listes :\n\n" +
"1. First item\n" +
"2. Second item\n" +
"5. Third item\n\n" +
"- First i**tem**\n" +
"* Secon*d* item\n" +
"+ Third item\n\n",
    [
    {
        type: 'p',
        content: 'Petit éditeur WYSIWYG',
        layout:  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "b", "b", "b", "b", "b", "b", "b"],
        computed: 'Petit éditeur <b>WYSIWYG</b>'
    },
    {
        type: 'p',
        content: 'Utilisable avec du markdown ou du RichText',
        layout:  ['b', 'b', 'b', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        computed: '<b>Uti</b>lisable avec du markdown ou du RichText'
    },
    {
        type: 'p',
        content: 'codé sous forme de composant Vue',
        layout:  ['-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        computed: 'codé sous forme de composant Vue'
    },
    {
        type: 'p',
        content: 'Enjoy',
        layout:  ['-', '-', '-', '-', '-'],
        computed: 'Enjoy'
    },
    {
        type: 'h1',
        content: 'Je suis un titre de niveau 1',
        layout: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", //*15
                 "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        computed: 'Je suis un titre de niveau 1'
    },
    {
        type: 'h2',
        content: 'Je suis un titre de niveau 2',
        layout: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", //*15
                 "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        computed: 'Je suis un titre de niveau 2'
    },
    {
        type: 'h3',
        content: 'Je suis un titre de niveau 3',
        layout: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", //*15
                 "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        computed: 'Je suis un titre de niveau 3'
    },
    {
        type: 'blockquote',
        content: 'Je suis un paragraphe de type citation',
        layout: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", //*15
                 "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-",
                 "-", "-", "-", "-", "-", "-", "-", "-"],
        computed: 'Je suis un paragraphe de type citation'
    },
    {
        type: 'info',
        content: 'Je suis un paragraphe de type info',
        layout: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", //*15
                 "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-",
                 "-", "-", "-", "-"],
        computed: 'Je suis un paragraphe de type info'
    },
    {
        type: 'warning',
        content: 'Je suis un paragraphe de type warning',
        layout: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", //*15
                 "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-",
                 "-", "-", "-", "-", "-", "-", "-"],
        computed: 'Je suis un paragraphe de type warning'
    },
    {
        type: 'danger',
        content: 'Je suis un paragraphe de type danger',
        layout: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", //*15
                 "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-",
                 "-", "-", "-", "-", "-", "-"],
        computed: 'Je suis un paragraphe de type danger'
    },
    {
        type: 'p',
        content: 'Testons les listes :',
        layout:  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        computed: 'Testons les listes :'
    },
    {
        type: 'ol',
        content: ['First item', 'Second item', 'Third item'],
        layout:  [['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'], ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'], ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-']],
        computed: ['First item', 'Second item', 'Third item']
    },
    {
        type: 'ul',
        content: ['First item', 'Second item', 'Third item'],
        layout:   [['-', '-', '-', '-', '-', '-', '-', 'b', 'b', 'b'], ['-', '-', '-', '-', '-', 'i', '-', '-', '-', '-', '-'], ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-']],
        computed: ['First i<b>tem</b>', 'Secon<i>d</i> item', 'Third item']
    },
    {
        type: 'p',
        content: '',
        layout: [],
        computed: ''
    }
    ],
"Petit éditeur **WYSIWYG**\n\n" +
"**Uti**lisable avec du markdown ou du RichText\n\n" +
"codé sous forme de composant Vue\n\n" +
"Enjoy\n\n" +
"# Je suis un titre de niveau 1\n\n" +
"## Je suis un titre de niveau 2\n\n" +
"### Je suis un titre de niveau 3\n\n" +
"> Je suis un paragraphe de type citation\n\n" +
"!!! info\nJe suis un paragraphe de type info\n\n" +
"!!! warning\nJe suis un paragraphe de type warning\n\n" +
"!!! danger\nJe suis un paragraphe de type danger\n\n" +
"Testons les listes :\n\n" +
"1. First item\n" +
"2. Second item\n" +
"3. Third item\n\n" +
"- First i**tem**\n" +
"- Secon*d* item\n" +
"- Third item\n\n" +
"\n\n"

];

export {
    NEW_BLOCK,
    P,
    OL,
    UL,
    H1,
    H2,
    H3,
    QUOTE,
    INFO,
    WARNING,
    DANGER,
    FULL_MD
}