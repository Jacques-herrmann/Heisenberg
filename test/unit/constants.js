const NEW_BLOCK = ['', {
    type: 'p',
    content: '',
    layout: [],
    computed: ''
}]

const P = ["Je suis un paragraphe avec chaque mise en forme **gras**, *italique*, _underline_, ~~strike~~, $formule$ et `code`!", {
    type: 'p',
    content: 'Je suis un paragraphe avec chaque mise en forme gras, italique, underline, strike, formule et code!',
    layout: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', "-", "-", "-", "-", "-", //*15
             "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-",
             "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-",
             "-", "-", "-", "b", "b", "b", "b", "-", "-", "i", "i", "i", "i", "i", "i",
             "i", "i", '-', '-', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', "-", "-",
             "s", "s", "s", "s", "s", "s", "-", "-", 'f', 'f', 'f', 'f', 'f', 'f', 'f',
             "-", "-", "-", "-", "c", "c", "c", "c", "-"],
    computed: 'Je suis un paragraphe avec chaque mise en forme <b>gras</b>, <i>italique</i>, <u>underline</u>, <s>strike</s>, <span>formule</span> et <span>code</span>!'
}];

const FULL_MD = ["Petit éditeur **WYSIWYG**\n**Uti**lisable avec du markdown ou du RichText\ncodé sous forme de compusant Vue\nEnjoy",
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
    ]
];

export {
    NEW_BLOCK,
    P,
    FULL_MD
}