<!--TODO :
    - Add a props to choose the v-model input format (RichText or MD)
    - Create classes to improve block management and to refactor code !!
    - Need to find a solution for drag and drop handle (text selection)
    - Allow escaped characters
    - Allow table, link and code section
    - Allow nested list
-->

<template>
    <div class="MDEditor" id="MDEditor">
        <transition name="fade">
            <div class="MDEditor__format-text"
                 v-if="internal.selection.content && internal.selection.type === 'text'"
                 :style="'top: ' + internal.selection.posY + 'px; left:'  + internal.selection.posX + 'px'"
            >
                <div class="MDEditor__format-text-pointer"/>
                <button class="MDEditor__format-text-button" @click="ui.formatSelection('b')"><i class="mdi mdi-format-bold"/></button>
                <button class="MDEditor__format-text-button" @click="ui.formatSelection('i')"><i class="mdi mdi-format-italic"/></button>
                <button class="MDEditor__format-text-button" @click="ui.formatSelection('u')"><i class="mdi mdi-format-underline"/></button>
                <button class="MDEditor__format-text-button" @click="ui.formatSelection('s')"><i class="mdi mdi-format-strikethrough"/></button>
                <button class="MDEditor__format-text-button MDEditor__button--disabled"><i class="mdi mdi-code-tags"/></button>
                <button class="MDEditor__format-text-button" @click="ui.formatSelection('f')"><i class="mdi mdi-square-root"/></button>
                <button class="MDEditor__format-text-button MDEditor__button--disabled"><i class="mdi mdi-link"/></button>
            </div>
            <div class="MDEditor__formula-edit"
                 v-if="internal.formulaEditVisible"
                 :style="'top: ' + internal.selection.posY + 'px; left:'  + internal.selection.posX + 'px'"
            >
                <span class="MDEditor__formula-edit__input-wrap">
                    <input type="text" v-model="internal.formulaEditContent" />
                    <span aria-hidden="true">{{internal.formulaEditContent}}</span>
                </span>
                <button @click="ui.updateFormula()">OK</button>
            </div>
        </transition>
        <div class="MDEditor__controls">
            <button class="MDEditor__button" @click="history.undoState()"><i class="mdi mdi-undo"/></button>
            <button class="MDEditor__button" @click="history.redoState()"><i class="mdi mdi-redo"/></button>
            <div class="MDEditor__controls-divider"></div>
            <button class="MDEditor__button" @click="blocks.changeBlockType('p')"><i class="mdi mdi-text-subject"/></button>
            <button class="MDEditor__button" @click="blocks.changeBlockType('h1')"><i class="mdi mdi-format-header-1"/></button>
            <button class="MDEditor__button" @click="blocks.changeBlockType('h2')"><i class="mdi mdi-format-header-2"/></button>
            <button class="MDEditor__button" @click="blocks.changeBlockType('h3')"><i class="mdi mdi-format-header-3"/></button>
            <div class="MDEditor__controls-divider"></div>
            <button class="MDEditor__button" @click="internal.selection.content ? ui.formatSelection('b') : null"><i class="mdi mdi-format-bold"/></button>
            <button class="MDEditor__button" @click="internal.selection.content ? ui.formatSelection('i') : null"><i class="mdi mdi-format-italic"/></button>
            <button class="MDEditor__button" @click="internal.selection.content ? ui.formatSelection('u') : null"><i class="mdi mdi-format-underline"/></button>
            <button class="MDEditor__button" @click="internal.selection.content ? ui.formatSelection('s') : null"><i class="mdi mdi-format-strikethrough"/></button>
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-code-tags"/></button>
            <button class="MDEditor__button" @click="internal.selection.content ? ui.formatSelection('f') : null"><i class="mdi mdi-square-root"/></button>
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-link"/></button>
            <div class="MDEditor__controls-divider"></div>
            <button class="MDEditor__button" @click="blocks.changeBlockType('ul')"><i class="mdi mdi-format-list-bulleted"/></button>
            <button class="MDEditor__button" @click="blocks.changeBlockType('ol')"><i class="mdi mdi-format-list-numbered"/></button>
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-table"/></button>
            <div class="MDEditor__controls-divider"></div>
            <button class="MDEditor__button" @click="blocks.changeBlockType('quote')"><i class="mdi mdi-format-quote-close"/></button>
            <button class="MDEditor__button" @click="blocks.changeBlockType('info')"><i class="mdi mdi-note-text"/></button>
            <button class="MDEditor__button" @click="blocks.changeBlockType('warning')"><i class="mdi mdi-alert-circle-outline"/></button>
            <button class="MDEditor__button" @click="blocks.changeBlockType('danger')"><i class="mdi mdi-alert-circle"/></button>
            <div class="MDEditor__controls-divider"></div>
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-image"/></button>
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-video"/></button>
        </div>
        <draggable :list="structuredContent" ghost-class='ghost' @start="ui.onDrag" @end="ui.onDrop">
            <transition-group type="transition" :name="'flip-list'">
                <div
                    :class="'MDEditor__md-block' +
                     (internal.currentItemIndex === index ? ' MDEditor__md-block--selected': '')"
                    v-for="(item, index) in structuredContent"
                    :key="item.id"
                    :id="item.id"
                    @keydown="ui.handleKeyDown($event)"
                    v-on:beforeinput="ui.handleInput($event)"
                >
                    <button class="MDEditor__button MDEditor__button--dragable"><i class="mdi mdi-drag-vertical"/></button>
                    <p class="MDEditor__content" :ref="item.id" v-if="item.type === 'p'" :contenteditable="editMode" v-html="item.computed" :data-block-id="item.id"/>
                    <h1 class="MDEditor__content" :ref="item.id" v-if="item.type === 'h1'" :contenteditable="editMode" v-html="item.computed" :data-block-id="item.id" />
                    <h2 class="MDEditor__content" :ref="item.id" v-if="item.type === 'h2'" :contenteditable="editMode" v-html="item.computed" :data-block-id="item.id" />
                    <h3 class="MDEditor__content" :ref="item.id" v-if="item.type === 'h3'" :contenteditable="editMode" v-html="item.computed" :data-block-id="item.id" />
                    <ul class="MDEditor__content" :ref="item.id" v-if="item.type === 'ul'">
                        <li
                            v-for="(li, i) in item.computed"
                            :key="li"
                            :data-block-id="item.id"
                            :data-item-index="i"
                            v-html="li"
                            :contenteditable="editMode"
                        />
                    </ul>
                    <ol class="MDEditor__content" :ref="item.id" v-if="item.type === 'ol'">
                        <li
                            v-for="(li, i) in item.computed"
                            :key="li"
                            :data-block-id="item.id"
                            :data-item-index="i"
                            v-html="li"
                            :contenteditable="editMode"
                        />
                    </ol>
                    <blockquote class="MDEditor__content" :ref="item.id" v-if="item.type === 'quote'" :contenteditable="editMode" v-html="item.computed" :data-block-id="item.id"/>
                    <div v-if="['info', 'warning', 'danger'].indexOf(item.type) !== -1"
                         :class="'MDEditor__content MDEditor__admonition MDEditor__admonition--' + item.type"
                    >
                        <div class="MDEditor__admonition-title"><i class="mdi mdi-note-text"/>{{ item.type }}</div>
                        <p :contenteditable="editMode" v-html="item.computed" :data-block-id="item.id" :data-item-index="-1"
                         :ref="item.id"/>
                    </div>
                    <button class="MDEditor__button MDEditor__button--delete" @click="blocks.deleteBlockAt(index)"><i class="mdi mdi-delete"/></button>
                </div>
            </transition-group>
        </draggable>
        <div
            v-if="!structuredContent.length"
            class="MDEditor__no-content"
        >
            <img :src="internal.constants.BLANK_DOC" alt="Blank document">
            <span class="MDEditor__no-content-title">Aucun contenu !</span>
            <span class="MDEditor__no-content-text">Ajouter un block et commencer à travailler</span>
            <button @click="blocks.addBlock(0)">Ajouter un block</button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { Component, Watch } from 'vue-property-decorator'
    import draggable from 'vuedraggable'
    import { renderToString } from 'katex'
    import { uuidv4 } from '@/lib/generators.js'
    import { splitArray } from '@/lib/utils.js'
    import blank from '@/assets/blank-document.png'

    export default @Component({
        props: {
            value: {
                type: String,
                default: ''
            },
            editMode: {
                type: Boolean,
                default: true
            }
        },
        components: {
            draggable,
        },
    })

     class MDEditor extends Vue {
        structuredContent = [];

        /**
         * Everything about internal states including constant, getters
         **/
        internal = {
            constants: {
                BLANK_DOC: blank,
            },
            currentItemIndex: 1,
            drag: false,
            formulaEditVisible: false,
            formulaEditContent: "",
            selection: {
                type: 'text',
                blockIndex: null,
                itemIndex: null,
                start: null,
                end: null,
                content: null,
                layout: null,
                posX: null,
                posY: null
            },

            /*-------------------------------------------------------------------------------------------*/
            _getCaretPosition: (block) => {
                //** see. https://stackoverflow.com/a/4812022/96100 **/
                let start = 0;
                let end = 0;
                let sel, range;
                let child = null;

                if (window.getSelection) {
                    sel = window.getSelection();
                    if (sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        for (let i = 0; i < block.childNodes.length; i++) {
                            child = block.childNodes[i];
                            if (['B', 'I'].indexOf(child.nodeName) !== -1) child = child.firstChild; //Emphasis
                            if (child === range.startContainer) { start = start + range.startOffset; break; }

                            if (child.nodeName === "DIV" && child.getAttribute('MDContent')) {  // Formula block
                                start = start + child.getAttribute('MDContent').length
                            }
                            else {
                                start = start + child.length;
                            }
                        }
                        for (let i = 0; i < block.childNodes.length; i++) {
                            child = block.childNodes[i];
                            if (['B', 'I'].indexOf(child.nodeName) !== -1) child = child.firstChild; //Emphasis
                            if (child === range.startContainer){ end = end + range.endOffset; break; }

                            if (child.nodeName === "DIV" && child.getAttribute('MDContent')) {  // Formula block
                                end = end + child.getAttribute('MDContent').length
                            }
                            else end = end + child.length;
                        }

                        // const preCaretRange = range.cloneRange();
                        // preCaretRange.selectNodeContents(block);
                        // preCaretRange.setEnd(range.startContainer, range.startOffset);
                        // // if (!preCaretRange.toString()) preCaretRange.setStart(range.startContainer, 0);
                        // console.log(preCaretRange.toString());
                        // start = preCaretRange.toString().length;
                        // preCaretRange.setEnd(range.endContainer, range.endOffset);
                        // end = preCaretRange.toString().length;
                    }
                }
                else if (document.selection && document.selection.createRange) {
                    range = document.selection.createRange();
                    const preCaretRange = doc.body.createTextRange();
                    preCaretRange.moveToElementText(block);
                    preCaretRange.setEndPoint('EndToStart', range);
                    start = preCaretRange.text.length;
                    preCaretRange.setEndPoint("EndToEnd", range);
                    end = preCaretRange.text.length;
                }
                return {start: start, end: end};
            },
            _setCaretPosition: (block, position=0, itemIndex=-1) => {
                let childIndex = 0;
                this.$nextTick(() => {
                    let selection = window.getSelection();
                    let range = document.createRange();
                    if (itemIndex !== -1) block = block.childNodes[itemIndex];
                    if (!block.childNodes.length) range.setStart(block, 0); // Set cursor to an empty block
                    else {
                        // Retrieve the childNodes and childNodes offset to target
                        for (let i=0; i < block.childNodes.length; i++) {
                            let content = block.childNodes[i];
                            if (['B', 'I'].indexOf(content.nodeName) !== -1) content = content.innerText;
                            if (content.nodeName === "DIV" && content.getAttribute('MDContent')) content = content.getAttribute('MDContent');
                            if (content.length < position) {
                                // If current childNode length smaller than specified position
                                if (i === block.childNodes.length - 1) {
                                    // And If position > sum childnodes.length set to the end of the last block
                                    childIndex = block.childNodes.length - 1;
                                    position = content.length
                                }
                                else {
                                    //else test the next childNode and substract length to position
                                    childIndex += 1;
                                    position -= content.length;
                                }
                            }
                            else break
                        }
                        if (['B', 'I'].indexOf(block.childNodes[childIndex].nodeName) !== -1) {
                            range.setStart(block.childNodes[childIndex].childNodes[0], position);
                            range.collapse(true);
                        }
                        else if (block.childNodes[childIndex].nodeName === "DIV" && block.childNodes[childIndex].getAttribute('MDContent')) {
                            range.setStart(block.childNodes[childIndex], 0);
                            range.setEnd(block.childNodes[childIndex], 1);
                        }
                        else {
                            range.setStart(block.childNodes[childIndex], position);
                            range.collapse(true);
                        }
                    }
                    selection.removeAllRanges();
                    selection.addRange(range);
                })
            },
            /*-------------------------------------------------------------------------------------------*/
            updateSelection: (event) => {
                const selection = window.getSelection();
                let content = selection.toString();
                const coordinate = selection.getRangeAt(0).getBoundingClientRect();
                const currentBlock = event.currentTarget.activeElement;
                let caret = this.internal._getCaretPosition(currentBlock);
                let blockID = currentBlock.parentNode.id;
                let itemIndex = -1;
                let layout = null;
                let type = 'text';
                if (!blockID) { // Case list or admonition
                    blockID = currentBlock.dataset['blockId'];
                    itemIndex = parseInt(currentBlock.dataset['itemIndex']);
                }
                const blockIndex = this.blocks.getBlockIndex(blockID);
                if (blockIndex) {
                    if (itemIndex >= 0) {
                        layout = this.structuredContent[blockIndex].layout[itemIndex].slice(caret.start, caret.end);
                    }
                    else {
                        layout = this.structuredContent[blockIndex].layout.slice(caret.start, caret.end);
                    }
                }

                if (selection.baseNode.className === "MDEditor__formula") {
                    type = 'formula';
                    content = selection.baseNode.getAttribute("MDContent");
                    caret = {
                        start: parseInt(selection.baseNode.getAttribute("start")),
                        end: parseInt(selection.baseNode.getAttribute("end"))
                    };
                    this.internal.formulaEditContent = content;
                    this.internal.formulaEditVisible = true;
                }
                else {
                    this.internal.formulaEditContent = "";
                    this.internal.formulaEditVisible = false;
                }

                this.internal.currentItemIndex = blockIndex;
                this.internal.selection = {
                    blockIndex: blockIndex,
                    type: type,
                    itemIndex: itemIndex,
                    start: caret.start,
                    end: caret.end,
                    content: content,
                    layout: layout,
                    posX: coordinate.left - 105 + coordinate.width/2, // 105 is the menu length/2
                    posY: coordinate.top - 45 + window.scrollY
                }
            },
        };

        /**
         * Everything about encoding/decoding markdown to array including methods, regex, etc.
         **/
        codec = {
            /** Block type regex pattern **/
            pattern: {
                h1: /^\# (.*)/,                                              // # ....
                h2: /^\#\# (.*)/,                                            // ## ....
                h3: /^\#\#\# (.*)/,                                          // ### ....
                ol: /^[0-9]+\.(.*)$/,                                        // 1.....
                ul: /^[\*\+\-] +(.*)$/,                                      // -.... or *..... or +.....
                // table: /|(?:([^\\r\\n|]*)\\|)+\\r?\\n\\|(?:(:?-+:?)\\|)+\\r?\\n(\\|(?:([^\\r\\n|]*)\\|)+\\r?\\n)+/,
                // | Syntax      | Description |
                // | ----------- | ----------- |
                // | Header      | Title       |
                // | Paragraph   | Text        |
                quote: /^\> (.*)/,                                          // > ....
                // code: /```(.*?)```/,                                     // ``` ....```
                admonition: /(\!\!\! )([^ ]*) ?([^\n]*)/,                   //
                // image: /\!\[([^[\]]*)\]\(([^\n]*)\)/,                    //
                // video: /(<video( controls)?( src="([\\\/A-Za-z0-9_:\-\. éèàùêâ~]*)"))>([^<]*)(<\/video>)/,
            },
            getBlockType: (md) => {
                let type = null;

                md.match(this.codec.pattern.h1) ? type = 'h1': null;
                !type && md.match(this.codec.pattern.h2) ? type = 'h2': null;
                !type && md.match(this.codec.pattern.h3) ? type = 'h3': null;

                !type && md.match(this.codec.pattern.ul) ? type = 'ul': null;
                !type && md.match(this.codec.pattern.ol) ? type = 'ol': null;
                // !type && md.match(this.codec.pattern.table) ? type = 'table': null;
                //
                !type && md.match(this.codec.pattern.quote) ? type = 'quote': null;
                // !type && md.match(this.codec.pattern.code) ? type = 'code': null;
                !type && md.match(this.codec.pattern.admonition) ? type = 'admonition': null;
                // !type && md.match(this.codec.pattern.image) ? type = 'image': null;
                // !type && md.match(this.codec.pattern.video) ? type = 'video': null;

                !type ? type = 'p': null;
                return type
            },

            /** Text regex pattern (bold, underline, italic,...)**/
            tags: {
                '-': { MD: ['', ''], HTML: ['', '']},
                'u': { MD: ['__', '__'], HTML: ['<u>', '</u>']},
                'i': { MD: ['*', '*'], HTML: ['<i>', '</i>']},
                'b': { MD: ['**', '**'], HTML: ['<b>', '</b>']},
                's': { MD: ['~~', '~~'], HTML: ['<s>', '</s>']},
                'f': { MD: ['$', '$'], HTML: ['', '']},
            },
            styles: {
                underline: /__(\S(.*?\S)?)__/gm,            // __.......__
                // boldItalic: /\*\*\*(\S(.*?\S)?)\*\*\*/gm,   // ***......***
                bold: /\*\*(\S(.*?\S)?)\*\*/gm,             // **........**
                italic: /\*(\S(.*?\S)?)\*/gm,               // *.......*
                strike: /~~(\S(.*?\S)?)~~/gm,               // ~~.......~~
                subscript: /<sub>(\S(.*?\S)?)<\/sub>/gm,    // <sub>.......<\sub>
                superscript: /<sup>(\S(.*?\S)?)<\/sup>/gm,  // <sup>.......<\sup>
                formula: /\$(\S(.*?\S)?)\$/gm,              // $.......$
                code: /`(\S(.*?\S)?)`/gm,                   // `.......`
                link: /\[([^\[]+)\]\(([^\)]+)\)/            // [...](...)
            },
            getLayout: (md) => {
                let layout = Array(md.length).fill('-');
                function getFormat(md, re, rplc, lgth) {
                    let match;
                    while ((match = re.exec(md)) !== null) {
                        layout.fill('r', match.index, match.index + lgth);
                        layout.fill(rplc, match.index + lgth, match.index + match[0].length - lgth);
                        layout.fill('r', match.index + match[0].length - lgth, match.index + match[0].length);
                    }

                    return md.replace(re, (match) => {
                        const temp = Array(match.length).fill(" ");
                        return temp.join('')
                    });
                }
                md = getFormat(md, this.codec.styles.underline, 'u', 2);
                md = getFormat(md, this.codec.styles.bold, 'b', 2);
                md = getFormat(md, this.codec.styles.italic, 'i', 1);
                md = getFormat(md, this.codec.styles.strike, 's', 2);
                getFormat(md, this.codec.styles.formula, 'f', 1);
                layout = layout.filter(rule => rule !== 'r');
                if (layout[layout.length - 1] === 'f') layout.push('-'); // Create a empty span after formula
                return layout
            },
            getContent: (md) => {
                let content = md.replace(this.codec.styles.underline, '$1');
                content = content.replace(this.codec.styles.bold, '$1');
                content = content.replace(this.codec.styles.italic, '$1');
                content = content.replace(this.codec.styles.strike, '$1');
                if (content.endsWith('$')) content = content + ' '; // Create a empty span after formula
                content = content.replace(this.codec.styles.formula, '$1');
                return content
            },
            computeTo: (format, content, layout) => {
                // format = MD or HTML
                let computed = '';
                let rule = null;
                let start = 0;
                for (let i = 0; i < layout.length; i++) {
                    rule = layout[i];
                    if (i === layout.length - 1 || rule !== layout[i + 1]) {
                        switch (rule) {
                            case 'f':
                                computed = computed + this.codec.computeFormula(format, content, start, i + 1);
                                break;
                            default:
                                computed = computed + this.codec.computeEmphasized(format, content, start, i + 1, rule);
                        }
                        start = i + 1;
                    }
                }
                return computed
            },
            computeEmphasized: (format, content, start, end, rule) => {
                return this.codec.tags[rule][format][0] + content.slice(start, end) + this.codec.tags[rule][format][1];
            },
            computeFormula: (format, content, start, end) => {
                const formula = content.slice(start, end);
                if (format === 'MD') return '$' + formula + '$';

                let container = document.createElement('div');
                container.setAttribute('MDContent', formula);
                container.setAttribute('start', start);
                container.setAttribute('end', end);
                container.classList.add('MDEditor__formula');

                let kat = document.createElement('span');
                kat.innerHTML = renderToString(formula, {throwOnError: false, output: 'html'});
                kat.setAttribute('contenteditable', false);
                kat.classList.add('MDEditor__formula--render');

                container.appendChild(kat);
                return container.outerHTML;
            },
            /** MarkDown to structured content array **/
            parseBlock: {
                paragraph: (md) => {
                    const content = this.codec.getContent(md);
                    const layout = this.codec.getLayout(md);
                    return {
                        id: uuidv4(),
                        type: 'p',
                        content: content,
                        layout: layout,
                        computed: this.codec.computeTo('HTML', content, layout),
                    };
                },
                title: (titleLevel, md) => {
                    const content = this.codec.getContent(md);
                    const layout = this.codec.getLayout(md);
                    return {
                        id: uuidv4(),
                        type: titleLevel,
                        content: content,
                        layout: layout,
                        computed: this.codec.computeTo('HTML', content, layout),
                    };
                },
                list: (listType, md) => {
                    const tree = md.slice(0, -1).split('\n').map(item => listType === 'ul' ? item.substr(2): item.substr(3));
                    const content = tree.map(item => this.codec.getContent(item));
                    const layout = tree.map(item => this.codec.getLayout(item));
                    return {
                        id: uuidv4(),
                        type: listType,
                        content: content,
                        layout: layout,
                        computed: tree.map(item => this.codec.computeTo('HTML', content[tree.indexOf(item)], layout[tree.indexOf(item)])),
                    }
                },
                quote: (md) => {
                    const content = this.codec.getContent(md);
                    const layout = this.codec.getLayout(md);
                    return {
                        id: uuidv4(),
                        type: 'quote',
                        content: content,
                        layout: layout,
                        computed: this.codec.computeTo('HTML', content, layout),
                    }
                },
                admonition: (md) => {
                    md = md.split('\n');
                    const type = md[0].substr(4);
                    const content = this.codec.getContent(md[1]);
                    const layout = this.codec.getLayout(md[1]);
                    return {
                        id: uuidv4(),
                        type: type,
                        content: content,
                        layout: layout,
                        computed: this.codec.computeTo('HTML', content, layout),
                    }
                },

            },
            encodeFromMD: (md) => {
                const rows = md.split('\n');
                let currentType = null;
                let previousType = null;
                let currentBlockContent = '';
                let structuredContent = [];

                for (let md of rows) {
                    /** Detect new block type if the currentType is null **/
                    if (!currentType) {
                        previousType = currentType;
                        currentType = this.codec.getBlockType(md);
                        currentBlockContent = '';
                    }

                    /** Fill currentBlock content if we still are in it else set currentType as null **/
                    if (currentType && currentType === 'p') {
                         if(!md.length) {
                            previousType = currentType;
                            currentType = null;
                        }
                        else currentBlockContent += md;
                    }
                    else if (currentType && ['h1', 'h2', 'h3'].indexOf(currentType) !== -1) {
                        if(!md.length) {
                            previousType = currentType;
                            currentType = null;
                        }
                        else currentBlockContent += md.substr(md.indexOf(' ') + 1);
                    }
                    else if (currentType && ['ul', 'ol'].indexOf(currentType) !== -1) {
                        if (!md.length){
                            previousType = currentType;
                            currentType = null;
                        }
                        else currentBlockContent += md + '\n';
                    }
                    else if (currentType && currentType === 'quote') {
                        if (!md.length){
                            previousType = currentType;
                            currentType = null;
                        }
                        else currentBlockContent += md.substr(2);
                    }
                    else if (currentType && currentType === 'admonition') {
                        if (!md.length){
                            previousType = currentType;
                            currentType = null;
                        }
                        else {
                            currentBlockContent += md;
                            if(this.codec.pattern.admonition.test(currentBlockContent)){
                                currentBlockContent += '\n';
                            }
                        }
                    }

                    /** If a new block is detected (currentType is null) add the currentBlockContent to the structuredContent **/
                    if (!currentType) {
                        if (previousType && previousType === 'p') {
                            structuredContent.splice(structuredContent.length, 0, this.codec.parseBlock.paragraph(currentBlockContent));
                        }
                        else if (previousType && ['h1', 'h2', 'h3'].indexOf(previousType) !== -1) {
                            structuredContent.splice(structuredContent.length, 0, this.codec.parseBlock.title(previousType, currentBlockContent));
                        }
                        else if (previousType && ['ul', 'ol'].indexOf(previousType) !== -1) {
                            structuredContent.splice(structuredContent.length, 0, this.codec.parseBlock.list(previousType, currentBlockContent));
                        }
                        else if (previousType && previousType === 'quote') {
                            structuredContent.splice(structuredContent.length, 0, this.codec.parseBlock.quote(currentBlockContent));
                        }
                        else if (previousType && previousType === 'admonition') {
                            structuredContent.splice(structuredContent.length, 0, this.codec.parseBlock.admonition(currentBlockContent));
                        }
                    }
                }
                return structuredContent;
            },
            /** Markdown text to HTML content **/
            encodeHtMLFromText: () => {},
            /** Translate structuredContent Array into markdown **/
            decodeMDFrom: (structuredContent) => {
                let output = '';
                for (const block of structuredContent) {
                    if (block.type === 'p') output = output + this.codec.computeTo('MD', block.content, block.layout) + '\n\n';
                    if (block.type === 'h1') output = output + '# ' + this.codec.computeTo('MD', block.content, block.layout) + '\n\n';
                    if (block.type === 'h2') output = output + '## ' + this.codec.computeTo('MD', block.content, block.layout) + '\n\n';
                    if (block.type === 'h3') output = output + '### ' + this.codec.computeTo('MD', block.content, block.layout) + '\n\n';
                    if (block.type === 'ul') {
                        output = output + block.content.map((item, i) => {return '- ' + this.codec.computeTo('MD', item, block.layout[i])}).join('\n') + '\n\n';
                    }
                    if (block.type === 'ol') {
                        output = output + block.content.map((item, i) => {return (i + 1).toString() + '. ' + this.codec.computeTo('MD', item, block.layout[i])}).join('\n') + '\n\n';
                    }
                    if (block.type === 'quote') output = output + '> ' + this.codec.computeTo('MD', block.content, block.layout) + '\n\n';
                    if (['info', 'warning', 'danger'].indexOf(block.type) !== -1) output = output + '!!! ' + block.type + '\n' + this.codec.computeTo('MD', block.content, block.layout) + '\n\n';
                }
                return output;
            },
        };

        /**
         * Everything about user interaction (button and keyboard event)
         **/
        ui = {
            /** Handling key event, event and respective behaviors functions **/
            keyboard: {
                arrowKeys: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
                notCharKeys: ['Enter', 'Delete', 'ArrowUp', 'ArrowDown', 'Tab', 'Backspace', 'Insert', 'Shift',
                    'Control', 'Alt', 'Meta', 'CapsLock', 'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8',
                    'F9', 'F10', 'F11', 'F12', 'AudioVolumeMute', 'AudioVolumeDown', 'AudioVolumeUp', 'AltGraph',
                    'ContextMenu', 'NumLock', 'Home', 'PageUp', 'End', 'PageDown', 'Clear', 'Dead', 'Super'],
                precedentKey: '',
            },
            handleKeyDown: (event) => {
                /** Handle keyboard event that doesn't trigger an InputEvent **/
                if (event && event instanceof KeyboardEvent) {
                    if (this.ui.keyboard.arrowKeys.indexOf(event.key) !== -1) {
                        event.preventDefault();
                        this.ui.behaviors.onArrows(event.target, event.key);
                    }
                    else if (this.ui.keyboard.precedentKey !== 'AltGraph' && !event.altKey && !event.ctrlKey && !event.metaKey &&
                        this.ui.keyboard.notCharKeys.indexOf(event.key) === -1){
                        event.preventDefault();
                        this.ui.behaviors.onCharacter(event.target, event.key);
                    }
                    this.ui.keyboard.precedentKey = event.key
                }
            },
            handleInput: (event) => {
                //** Handle the before input event to control his behaviour **/
                event.preventDefault();
                if (event && event instanceof InputEvent) {
                    switch (event.inputType) {
                        case 'insertText':
                            this.ui.behaviors.onCharacter(event.target, event.data);
                        break;
                        case 'insertParagraph':
                            this.ui.behaviors.onEnter(event.target);
                            break;
                        case 'deleteContentForward':
                            this.ui.behaviors.onDelete(event.target);
                            break;
                        case 'deleteContentBackward':
                            this.ui.behaviors.onBackspace(event.target);
                            break;
                        // Move Text by selection
                        case 'deleteByDrag':
                            this.ui.behaviors.onDragSelection(event);
                            break;
                        case 'insertFromDrop':
                            this.ui.behaviors.onDropSelection(event);
                            break;
                        default:
                            this.ui.behaviors.onUnHandle();
                    }
                }
            },
            behaviors: {
                onEnter: (target) => { /** Create a new block containing after caret content of current block **/
                    this.ui.removeSelection();
                    const selection = this.internal.selection;
                    let currentBlock = this.$refs[this.structuredContent[this.internal.currentItemIndex].id][0];
                    if (selection.itemIndex === -1){
                        this.blocks.splitBlock(this.internal.currentItemIndex, selection.start);
                        this.internal.currentItemIndex ++;
                    }
                    else if (selection.itemIndex === currentBlock.childNodes.length - 1 && currentBlock.childNodes[selection.itemIndex].innerText === ''){
                        this.blocks.removeItemAt(this.internal.currentItemIndex, selection.itemIndex);
                        this.blocks.addBlock(this.internal.currentItemIndex + 1);
                        this.internal.currentItemIndex ++;
                        selection.itemIndex = -1;
                    }
                    else {
                        this.blocks.splitListBlock(this.internal.currentItemIndex, selection.start, selection.itemIndex);
                        selection.itemIndex += 1;
                    }

                    this.$nextTick(() => {
                        /** Here we are waiting the DOM to rerender the new block before position caret on it**/
                        const newBlock = this.$refs[this.structuredContent[this.internal.currentItemIndex].id][0];
                        this.internal._setCaretPosition(newBlock, 0, selection.itemIndex);
                    });
                },
                onTab: () => {},
                onBackspace: (target) => {
                    /** Fusion current line with the precedent one if caretPosition === 0 **/
                    const selection = this.internal.selection;
                    const currentBlock = this.$refs[this.structuredContent[this.internal.currentItemIndex].id][0];
                    const precedentBlock = this.internal.currentItemIndex ?
                        this.$refs[this.structuredContent[this.internal.currentItemIndex - 1].id][0] : null;
                    let caretPos = precedentBlock ? this.structuredContent[this.internal.currentItemIndex - 1].content.length: 0;

                     /** Case merging list item together **/
                    if (selection.itemIndex > 0 && !selection.end) {
                        this.blocks.mergeItemWithPrecedent(this.internal.currentItemIndex, selection.itemIndex);
                        caretPos = currentBlock.childNodes[selection.itemIndex - 1].innerText.length;
                        selection.itemIndex -= 1;
                        this.internal._setCaretPosition(currentBlock, caretPos, selection.itemIndex);
                    }

                    /** Case merging block **/
                    else if (selection.itemIndex <=0 && !selection.end && precedentBlock) {
                        this.blocks.mergeBlockWithPrecedent(this.internal.currentItemIndex);
                        this.internal.currentItemIndex--;

                        /** Case precedent block is a list **/
                        if (precedentBlock && ['UL', 'OL'].indexOf(precedentBlock.nodeName) !== -1) {
                            caretPos = precedentBlock.childNodes[precedentBlock.childNodes.length - 1].innerText.length;
                            selection.itemIndex = precedentBlock.childNodes.length - 1;
                        }
                        else {
                            selection.itemIndex = -1;
                        }
                        this.internal._setCaretPosition(precedentBlock, caretPos, selection.itemIndex);
                    }

                     /** else simply remove precedent character or selection **/
                    else {
                        if (this.internal.selection.content) this.ui.removeSelection();
                        else {
                            this.blocks.removeAt(this.internal.currentItemIndex, selection.start - 1, selection.start, selection.itemIndex);
                            selection.start -= 1;
                        }
                        this.internal._setCaretPosition(currentBlock, selection.start, selection.itemIndex);
                    }
                },
                onDelete: (target) => {
                    const selection = this.internal.selection;
                    const currentBlock = this.$refs[this.structuredContent[this.internal.currentItemIndex].id][0];
                    const followingBlock = this.internal.currentItemIndex + 1 < this.structuredContent.length ?
                        this.$refs[this.structuredContent[this.internal.currentItemIndex + 1].id][0] : null;
                    let caretAtEndItem = false;
                    let caretAtEndBlock = false;

                    if (selection.itemIndex !== -1) {
                        caretAtEndItem = selection.end === currentBlock.childNodes[selection.itemIndex].innerText.length;
                        if (caretAtEndItem && selection.itemIndex === currentBlock.childNodes.length - 1) caretAtEndBlock = true;
                    }
                    else {
                        caretAtEndBlock = selection.end === currentBlock.innerText.length;
                    }

                    this.ui.removeSelection();
                    let selectionLength = this.internal.selection.content.length;
                    if (selectionLength) {
                        this.internal._setCaretPosition(currentBlock, selection.start, selection.itemIndex);
                    }
                    else {
                        /** Fusion current line with the following one if caret at the end of the line **/
                        if (followingBlock && caretAtEndBlock) {
                            this.blocks.mergeBlockWithPrecedent(this.internal.currentItemIndex + 1);
                        }
                        /** Case merging list item together**/
                        else if (caretAtEndItem) {
                            this.blocks.mergeItemWithPrecedent(this.internal.currentItemIndex, selection.itemIndex + 1)
                        }

                        /** else simply remove next character**/
                        else {
                            this.blocks.removeAt(this.internal.currentItemIndex, selection.start, selection.start + 1, selection.itemIndex);
                        }
                        this.internal._setCaretPosition(currentBlock, selection.start, selection.itemIndex);
                    }
                },
                onArrows: (target, key) => {
                    // const caret = this.internal._getCaretPosition(target);
                    const caret = {start : this.internal.selection.start, end: this.internal.selection.end }
                    const currentBlock = this.$refs[this.structuredContent[this.internal.currentItemIndex].id][0];
                    let itemIndex = -1;
                    let precedentBlock = this.internal.currentItemIndex ?
                        this.$refs[this.structuredContent[this.internal.currentItemIndex - 1].id][0] : null;
                    let nextBlock = this.internal.currentItemIndex < this.structuredContent.length - 1 ?
                        this.$refs[this.structuredContent[this.internal.currentItemIndex + 1].id][0] : null;

                    // Case current block is list Item
                    if (target.dataset['itemIndex'] && parseInt(target.dataset['itemIndex']) !== -1) {
                        itemIndex = parseInt(target.dataset['itemIndex']);
                        if (itemIndex) precedentBlock = currentBlock.childNodes[itemIndex - 1];
                        if (itemIndex !== currentBlock.childNodes.length - 1) nextBlock = currentBlock.childNodes[itemIndex + 1];
                    }
                    //Case precedentBlock/nextBlock is list item
                    if (precedentBlock && ['UL', 'OL'].indexOf(precedentBlock.nodeName) !== -1){
                        precedentBlock = precedentBlock.childNodes[precedentBlock.childNodes.length - 1];
                    }
                    if (nextBlock && ['UL', 'OL'].indexOf(nextBlock.nodeName) !== -1){
                        nextBlock = nextBlock.childNodes[0];
                    }
                    switch (key) {
                        case 'ArrowUp':
                            if (precedentBlock) {
                                this.internal._setCaretPosition(precedentBlock, caret.start);
                            }
                            break;
                        case 'ArrowDown':
                            if (nextBlock) {
                                this.internal._setCaretPosition(nextBlock, caret.start);
                            }
                            break;
                        case 'ArrowLeft':
                            if (!caret.start && precedentBlock) { /** Change block only if caret is in the beginning of the block**/
                                let precedentTextLength = this.structuredContent[this.internal.currentItemIndex - 1].content.length;
                                this.internal._setCaretPosition(precedentBlock, precedentTextLength);
                            }
                            else { this.internal._setCaretPosition(target, caret.start - 1); }
                            break;
                        case 'ArrowRight':
                            let currentTextLength = this.structuredContent[this.internal.currentItemIndex].content.length;
                            if (caret.end >= currentTextLength && nextBlock) { /** Change block only if caret is in the end of the block**/
                                this.internal._setCaretPosition(nextBlock);
                            }
                            else { this.internal._setCaretPosition(target, caret.end + 1); }
                            break;
                    }
                },
                onCharacter: (target , key) => {
                    this.ui.removeSelection();
                    const selection = this.internal.selection;
                    // Here if we use the selection start as caretPos, the editor loose correct caret position on fast typing
                    const caretPos = this.internal._getCaretPosition(target);
                    let currentBlock = this.$refs[this.structuredContent[this.internal.currentItemIndex].id][0];
                    this.blocks.insertAt(this.internal.currentItemIndex, caretPos.start, key, null, selection.itemIndex);
                    this.internal._setCaretPosition(currentBlock, caretPos.start + 1, selection.itemIndex);
                },
                onDragSelection: () => {
                    // const selection = this.internal.selection;
                    // this.blocks.removeAt(this.internal.currentItemIndex, selection.start, selection.end, selection.itemIndex);
                },
                onDropSelection: (event) => {
                    // const selection = this.internal.selection;
                    // const caret = this.internal._getCaretPosition(event.target);
                    //
                    // const index = this.blocks.getBlockIndex(event.currentTarget.id);
                    // const itemIndex = this.blocks.getItemIndex(event.currentTarget.id, event.currentTarget);
                    // if (index !== -1) this.blocks.insertAt(index, caret.start, selection.content, selection.layout, itemIndex);
                    // this.internal._setCaretPosition(event.target, caret.start, itemIndex);
                },
                onUnHandle: (event) => {},
            },
            /** Drag & Drop interaction **/
            onDrag: () => {
                this.internal.drag = true;
            },
            onDrop: () => {
                this.internal.drag = false;
            },
            /** Working with selection  **/
            removeSelection: () => {
                const selection = this.internal.selection;
                if (selection) {
                    this.blocks.removeAt(this.internal.currentItemIndex, selection.start, selection.end, selection.itemIndex);
                }
            },
            formatSelection: (format) => {
                //get selection, update structuredcontent layout and compute structuredcontent
                const selection = this.internal.selection;
                let currentBlock = this.structuredContent[selection.blockIndex];
                if (['ul', 'ol'].indexOf(currentBlock.type) !== -1) {
                    for (let i = selection.start; i < selection.end; i++) {
                        if (currentBlock.layout[selection.itemIndex][i] === format) currentBlock.layout[selection.itemIndex].splice(i, 1, '-');
                        else {
                            currentBlock.layout[selection.itemIndex].splice(i, 1, format);
                            if (format === 'f' && selection.end === currentBlock.content[selection.itemIndex].length) {
                                // Create a empty span after formula
                                currentBlock.content[selection.itemIndex] = currentBlock.content[selection.itemIndex] + ' ';
                                currentBlock.layout[selection.itemIndex].push('-')
                            }
                        }
                    }
                }
                else {
                    for (let i = selection.start; i < selection.end; i++) {
                        if (currentBlock.layout[i] === format) currentBlock.layout.splice(i, 1, '-');
                        else {
                            currentBlock.layout.splice(i, 1, format);
                            if (format === 'f' && selection.end === currentBlock.content.length) {
                                // Create a empty span after formula
                                currentBlock.content = currentBlock.content + ' ';
                                currentBlock.layout.push('-')
                            }
                        }
                    }
                }
                this.structuredContent.splice(this.internal.currentItemIndex, 1, this.blocks.computeBlock(currentBlock));
            },
            /** Working with formula edit div **/
            updateFormula: () => {
                const selection = this.internal.selection;
                let newFormula = this.internal.formulaEditContent;
                const currentBlock = this.$refs[this.structuredContent[this.internal.currentItemIndex].id][0];
                let layout = Array(newFormula.length).fill('f');

                // Remove old function
                this.blocks.removeAt(this.internal.currentItemIndex, selection.start, selection.end, selection.itemIndex);
                // And set the new one
                this.blocks.insertAt(this.internal.currentItemIndex, selection.start, newFormula, layout, selection.itemIndex);
                this.internal.formulaEditVisible = false;
            }
        };

        /**
         * Everything about blocks management
         **/
        blocks = {
            getBlockIndex: (blockId) => {
                for (const block of this.structuredContent) {
                    if (block.id === blockId) {
                        return this.structuredContent.indexOf(block);
                    }
                };
                return -1
            },
            getItemIndex: (blockId, node) => {
                const children = this.$refs[blockId][0].childNodes;
                for (let i = 0; i < children.length; i++) {
                    if (node === children[i]) return i
                }
                return -1
            },
            addBlock: (index) => {
                this.structuredContent.splice(index, 0, this.codec.parseBlock.paragraph(''));
            },
            deleteBlockAt: (index) => {
                this.structuredContent.splice(index, 1);
            },
            getTextAt: (index, start, end) => {
                return this.structuredContent[index].content.slice(start, end);
            },
            insertAt: (index, caretPos, char, layout=null, itemIndex=-1) => {
                const currentContent = this.structuredContent[index];
                if (['ul', 'ol'].indexOf(currentContent.type) === -1) {
                    if (!layout) layout = Array(char.length).fill(caretPos && currentContent.layout[caretPos - 1] ? currentContent.layout[caretPos - 1] : '-');
                    currentContent.content = currentContent.content.slice(0, caretPos) + char + currentContent.content.slice(caretPos);
                    currentContent.layout.splice(caretPos, 0, ...layout);
                    currentContent.computed = this.codec.computeTo('HTML', currentContent.content, currentContent.layout);
                }
                else{
                    if (!layout) layout = Array(char.length).fill(caretPos && currentContent.layout[itemIndex][caretPos - 1] ? currentContent.layout[itemIndex][caretPos - 1] : '-');
                    currentContent.content[itemIndex] = currentContent.content[itemIndex].slice(0, caretPos) + char + currentContent.content[itemIndex].slice(caretPos);
                    currentContent.layout[itemIndex].splice(caretPos, 0, ...layout);
                    currentContent.computed[itemIndex] = this.codec.computeTo('HTML', currentContent.content[itemIndex], currentContent.layout[itemIndex]);
                }
                this.structuredContent.splice(index, 1, currentContent);
            },
            removeAt: (blockIndex, start, end, itemIndex=-1) => {
                /** Remove content before the caret **/
                const block = this.structuredContent[blockIndex];
                if(itemIndex === -1) {
                    block.content = block.content.slice(0, start) + block.content.slice(end);
                    block.layout.splice(start, end - start);
                }
                else {
                    block.content[itemIndex] = block.content[itemIndex].slice(0, start) + block.content[itemIndex].slice(end);
                    block.layout[itemIndex].splice(start, end - start);
                }
                this.structuredContent.splice(blockIndex, 1, this.blocks.computeBlock(block));
            },
            removeItemAt: (blockIndex, itemIndex) => {
                /** Remove item from block (list block) **/
                const block = this.structuredContent[blockIndex];
                block.content.splice(itemIndex, 1);
                block.layout.splice(itemIndex, 1);
                this.structuredContent.splice(blockIndex, 1, this.blocks.computeBlock(block));
            },
            mergeBlockWithPrecedent: (index) => {
                const precedentBlock = this.structuredContent[index - 1];
                const currentBlock = this.structuredContent[index];

                if (['ul', 'ol'].indexOf(precedentBlock.type) !== -1) {
                    if (['ul', 'ol'].indexOf(currentBlock.type) !== -1) {
                        precedentBlock.content[precedentBlock.content.length - 1] += currentBlock.content.join('');

                        precedentBlock.layout[precedentBlock.layout.length - 1].push(...[].concat.apply([], currentBlock.layout));
                    }
                    else {
                        precedentBlock.content[precedentBlock.content.length - 1] += currentBlock.content;
                        precedentBlock.layout[precedentBlock.layout.length - 1].push(...currentBlock.layout);
                    }
                }
                else {
                    if (['ul', 'ol'].indexOf(currentBlock.type) !== -1) {
                        precedentBlock.content += currentBlock.content.join('');
                        precedentBlock.layout.push(...[].concat.apply([], currentBlock.layout));
                    }
                    else {
                        precedentBlock.content += currentBlock.content;
                        precedentBlock.layout.push(...currentBlock.layout);
                    }
                }
                this.structuredContent.splice(index - 1, 1, this.blocks.computeBlock(precedentBlock));
                this.structuredContent.splice(index, 1);
            },
            mergeItemWithPrecedent: (index, itemIndex) => {
                const block = this.structuredContent[index];

                block.content[itemIndex - 1] += block.content[itemIndex];
                block.content.splice(itemIndex, 1);
                block.layout[itemIndex - 1].push(...block.layout[itemIndex]);
                block.layout.splice(itemIndex, 1);

                this.structuredContent.splice(index, 1, this.blocks.computeBlock(block));
            },
            splitBlock: (index, caretPos) => {
                const newBlock = this.codec.parseBlock.paragraph('');
                const block = this.structuredContent[index];

                newBlock.content = block.content.substr(caretPos);
                newBlock.layout = block.layout.slice(caretPos);
                block.content = block.content.substr(0, caretPos);
                block.layout = block.layout.slice(0, caretPos);

                this.structuredContent.splice(index , 1, this.blocks.computeBlock(block));
                this.structuredContent.splice(index + 1, 0, this.blocks.computeBlock(newBlock));
            },
            splitListBlock: (index, caretPos, itemIndex) => {
                const block = this.structuredContent[index];
                const content = block.content[itemIndex];
                const layout = block.layout[itemIndex];

                block.content.splice(itemIndex, 1, content.substr(0, caretPos));
                block.content.splice(itemIndex + 1, 0, content.substr(caretPos));

                block.layout.splice(itemIndex, 1, layout.slice(0, caretPos));
                block.layout.splice(itemIndex + 1, 0, layout.slice(caretPos));

                this.structuredContent.splice(index , 1, this.blocks.computeBlock(block));
            },
            computeBlock: (block) => {
                if (['ul', 'ol'].indexOf(block.type) === -1) {
                    block.computed = this.codec.computeTo('HTML', block.content, block.layout);
                }
                else {
                    block.computed = block.content.map(item => this.codec.computeTo('HTML',
                        block.content[block.content.indexOf(item)], block.layout[block.content.indexOf(item)]))
                }
                return block;
            },
            changeBlockType: (newType) => {
                const currentBlock = this.structuredContent[this.internal.currentItemIndex];
                let content = currentBlock.content;
                let layout = currentBlock.layout;
                if (['ul', 'ol'].indexOf(currentBlock.type) !== -1) {
                    content = content.join('\n');
                    layout.forEach((elt) => elt.push('r'));
                    layout = layout.flat();
                    layout.splice(-1, 1);
                }

                currentBlock.type = newType;
                if (['ul', 'ol'].indexOf(currentBlock.type) !== -1) {
                    currentBlock.content = content.split('\n');
                    currentBlock.layout = splitArray(layout, 'r');
                }
                else {
                    currentBlock.content = content.replace(/\n/g, '');
                    currentBlock.layout = layout.filter(rule => rule !== 'r');
                }
                this.blocks.computeBlock(currentBlock);
            }
        };

        /**
         * Everything about importing content, media, formatted text (Work, HTML)
         **/
        importing = {
            onPaste: () => {},
            wordToMD: () => {},
            htmlToMD: () => {},
            importMedia: () => {},
        };

        /**
         * Everything about events
         **/
        events = {
            /** Input events => the v-model has changed
             * Return the current view translate into markdown
             **/
            input: () => {
                this.$emit('input', this.codec.decodeMDFrom(this.structuredContent));
            },
            listeners: {
                add: () => {
                    document.addEventListener('selectionchange', this.internal.updateSelection)
                },
                remove: () => {
                    document.removeEventListener('selectionchange', this.internal.updateSelection)
                }
            }
        };

        /**
         * Everything about undo and redo
         **/
        history = {
            historyIndex: -1,
            historyLength: 15,
            states: [],
            storeState: () => {
                if(JSON.stringify(this.structuredContent) !== JSON.stringify(this.history.states[this.history.historyIndex])) {
                    const snapshot = JSON.parse(JSON.stringify(this.structuredContent));
                    if (this.history.historyIndex < this.history.historyLength - 1) {
                        this.history.historyIndex = this.history.historyIndex + 1;
                        this.history.states.splice(this.history.historyIndex , this.history.historyLength, snapshot);
                    } else {
                        this.history.states.splice(0, 1);
                        this.history.states.splice(this.history.historyLength, 0, snapshot);
                    }
                }
            },
            undoState: () => {
                this.history.historyIndex = this.history.historyIndex - 1;
                this.history.historyIndex = Math.max(0, this.history.historyIndex);
                const snapshot = JSON.parse(JSON.stringify(this.history.states[this.history.historyIndex]));
                this.structuredContent.splice(0, this.structuredContent.length, ...snapshot);
            },
            redoState: () => {
                this.history.historyIndex = this.history.historyIndex + 1;
                this.history.historyIndex = Math.min(this.history.states.length - 1, this.history.historyIndex);
                const snapshot = JSON.parse(JSON.stringify(this.history.states[this.history.historyIndex]));
                this.structuredContent.splice(0, this.structuredContent.length, ...snapshot);
            },
        };

        mounted() {
            this.events.listeners.add();
            this.structuredContent.push(...this.codec.encodeFromMD(this.value)); /** Push allow us to not replace structuredContent value **/
        }

        destroyed() {
            this.events.listeners.remove();
        }

        @Watch('structuredContent', ({ immediate: true, deep: true }))
        function() {
            this.events.input();
            this.history.storeState();
        }
    }
</script>
<style lang="stylus">
/*@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;900&display=swap');*/
@import url('https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css');
resetButton()
    background transparent
    border-color transparent
    font-weight normal

*
    font-family "Rubik"
.katex *
    white-space nowrap !important
.MDEditor
    width 840px
    min-height 1000px
    margin 50px auto
    box-shadow 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
    &__format-text
        height 36px
        max-width 210px
        position absolute
        z-index 100
        display flex
        align-items center
        background-color #333
        border-radius 8px
        box-shadow 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
        &-button
            resetButton()
            height 36px
            width 30px
            color #EEE
            cursor pointer
            &:hover
                background-color #444
            &:nth-child(2)
                border-bottom-left-radius 8px
                border-top-left-radius 8px
            &:last-child
                border-bottom-right-radius 8px
                border-top-right-radius 8px
        &-pointer
            width 0
            height 0
            position absolute
            top 32px
            left 95px
            border-left 10px solid transparent
            border-right 10px solid transparent
            border-top 10px solid #333

    &__formula-edit {
        height 36px
        width max-content
        position absolute
        z-index 100
        display flex
        align-items center
        border-radius 4px
        padding 5px 15px
        background-color #f6f5f5
        box-shadow 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)
        &__input-wrap {
            position relative
            height 100%
            & > span {
                padding: 0 1rem;
                visibility hidden
            }
            & > input {
                resetButton()
                height: 30px
                width 100%
                position absolute
                left 0
                font-weight normal
            }
        }
        & > button {
            resetButton()
            cursor pointer
            font-weight 500
            background-color #ADC3D1
            border-radius 2px
            margin-left 15px
        }
    }
    &__controls
        height 40px
        background #eee
        position -webkit-sticky
        position sticky
        text-align left
        border-bottom 1px solid #ccc
        display flex
        align-items center
        &-divider
            height 60%
            width 1px
            margin  0 4px
            background-color rgba(0, 0, 0, .2)

    &__button
        resetButton()
        height 36px
        padding 8px
        color #888
        transition all 0.3s ease
        cursor pointer
        & i
            font-size 1.2em

        &--dragable
            cursor move

        &--delete
            cursor pointer

        &--disabled
            opacity 0.3
            cursor default
            &:hover
                color #888 !important

        &:hover
            color #333

    &__md-block
        display flex
        align-items center
        justify-content flex-start
        &--selected
            background-color #F8F8F8
        & button > i
            opacity: 0;
        &:hover
            background-color #F8F8F8
            & i
                opacity 1

    /** Remove default outline **/
    & *
        outline none
        white-space pre-wrap


    /** Content type style **/
    &__content
        flex-grow 2
    & p
        padding 8px
        margin 0

    &__admonition
        color white
        & > div:first-child
            text-transform uppercase
            font-weight bold
        &--info
            background-color blue
        &--warning
            background-color orange
        &--danger
            background-color red

    &__formula {
        display inline-block
        position relative
        &--render {
            background-color #f6f5f5
            border-radius 4px
            padding 5px 15px
            user-select all
        }
    }

    &__no-content
        width 100%
        padding 30px 0
        display flex
        align-items center
        flex-direction column
        & > *
            margin 5px
        & > img
            height 100px
        & > button
            resetButton()
            height 36px
            border-radius 4px
            display flex
            align-items center
            justify-content center
            text-transform uppercase
            font-weight 500
            background-color #ADC3D1
            cursor pointer
            transition all 0.3s ease-in-out
            &:hover
                background-color #759CC9
        &-title
            font-size 18px
            font-weight bolder
            color #333333
        &-text
            font-size 14px
            color #949494



/** Fade animation **/
.fade-enter-active, .fade-leave-active
    transition opacity .5s
    transition-delay 0.2s

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity 0


/** Drag & Drop animation (Vue Draggable)**/
.flip-list-move
    transition transform 0s

.no-move
    transition transform 0s

.sortable-drag
    opacity 0

.ghost
    border-left: 3px solid #333
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

</style>