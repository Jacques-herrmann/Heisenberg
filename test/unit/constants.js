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

const FULL_MD = ["Petit éditeur **WYSIWYG**\n\n" +
"**Uti**lisable avec du markdown ou du RichText\n\n" +
"codé sous forme de compusant Vue\n\n" +
"Enjoy\n\n" +
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
        layout:  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        computed: 'codé sous forme de composant Vue'
    },
    {
        type: 'p',
        content: 'Enjoy',
        layout:  ['-', '-', '-', '-', '-'],
        computed: 'Enjoy'
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
    ]
];

export {
    NEW_BLOCK,
    P,
    OL,
    UL,
    FULL_MD
}