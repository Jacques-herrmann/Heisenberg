<!--TODO :
    - Add a props to choose the v-model input format (RichText or MD)
-->

<template>
    <div class="MDEditor" id="MDEditor">
        <transition name="fade">
            <div class="MDEditor__format-text"
                 v-if="internal.selection.content"
                 :style="'top: ' + internal.selection.posY + 'px; left:'  + internal.selection.posX + 'px'"
            >
                <div class="MDEditor__format-text-pointer"/>
                <button class="MDEditor__format-text-button" @click="ui.formatSelection('b')"><i class="mdi mdi-format-bold"/></button>
                <button class="MDEditor__format-text-button" @click="ui.formatSelection('i')"><i class="mdi mdi-format-italic"/></button>
                <button class="MDEditor__format-text-button" @click="ui.formatSelection('u')"><i class="mdi mdi-format-underline"/></button>
                <button class="MDEditor__format-text-button" @click="ui.formatSelection('s')"><i class="mdi mdi-format-strikethrough"/></button>
                <button class="MDEditor__format-text-button" @click="ui.formatSelection('c')"><i class="mdi mdi-code-tags"/></button>
                <button class="MDEditor__format-text-button" @click="ui.formatSelection('f')"><i class="mdi mdi-square-root"/></button>
                <button class="MDEditor__format-text-button" @click="ui.formatSelection('l')"><i class="mdi mdi-link"/></button>
            </div>
        </transition>

        <div class="MDEditor__controls">
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-undo"/></button>
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-redo"/></button>
            <div class="MDEditor__controls-divider"></div>
            <button class="MDEditor__button"><i class="mdi mdi-text-subject"/></button>
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-format-header-1"/></button>
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-format-header-2"/></button>
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-format-header-3"/></button>
            <div class="MDEditor__controls-divider"></div>
            <button class="MDEditor__button" @click="internal.selection.content ? ui.formatSelection('b') : null"><i class="mdi mdi-format-bold"/></button>
            <button class="MDEditor__button" @click="internal.selection.content ? ui.formatSelection('i') : null"><i class="mdi mdi-format-italic"/></button>
            <button class="MDEditor__button" @click="internal.selection.content ? ui.formatSelection('u') : null"><i class="mdi mdi-format-underline"/></button>
            <button class="MDEditor__button" @click="internal.selection.content ? ui.formatSelection('s') : null"><i class="mdi mdi-format-strikethrough"/></button>
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-code-tags"/></button>
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-square-root"/></button>
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-link"/></button>
            <div class="MDEditor__controls-divider"></div>
            <button class="MDEditor__button"><i class="mdi mdi-format-list-bulleted"/></button>
            <button class="MDEditor__button"><i class="mdi mdi-format-list-numbered"/></button>
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-table"/></button>
            <div class="MDEditor__controls-divider"></div>
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-format-quote-close"/></button>
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-note-text"/></button>
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-alert-circle-outline"/></button>
            <button class="MDEditor__button MDEditor__button--disabled"><i class="mdi mdi-alert-circle"/></button>
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
                    <p class="MDEditor__content" :ref="item.id" v-if="item.type === 'p'" :contenteditable="editMode" v-html="item.computed"/>
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
    import { uuidv4 } from '@/lib/generators.js'
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
            selection: {
                blockIndex: null,
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

                if (window.getSelection) {
                    sel = window.getSelection();
                    if (sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        const preCaretRange = range.cloneRange();
                        preCaretRange.selectNodeContents(block);
                        preCaretRange.setEnd(range.startContainer, range.startOffset);
                        // if (!preCaretRange.toString()) preCaretRange.setStart(range.startContainer, 0);
                        start = preCaretRange.toString().length;
                        preCaretRange.setEnd(range.endContainer, range.endOffset);
                        end = preCaretRange.toString().length;
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
            _setCaretPosition: (block, position=0) => {
                let childIndex = 0;
                this.$nextTick(() => {
                    let selection = window.getSelection();
                    let range = document.createRange();
                    if (!block.childNodes.length) range.setStart(block, 0); // Set cursor to an empty block
                    else {
                        // Retrieve the childNodes and childNodes offset to target
                        for (let i=0; i < block.childNodes.length; i++) {
                            let content = block.childNodes[i];
                            if (content instanceof HTMLElement) content = content.innerText;
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
                        if (block.childNodes[childIndex] instanceof HTMLElement) {
                            range.setStart(block.childNodes[childIndex].childNodes[0], position);
                        }
                        else {
                            range.setStart(block.childNodes[childIndex], position);
                        }
                    }
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                })
            },
            /*-------------------------------------------------------------------------------------------*/
            updateSelection: (event) => {
                const selection = window.getSelection();
                const currentBlock = event.currentTarget.activeElement;
                const caret = this.internal._getCaretPosition(currentBlock);
                const blockIdx = this.blocks.getBlockIndex(currentBlock.parentNode.id);
                this.internal.currentItemIndex = blockIdx;
                const layout = blockIdx !== -1 ? this.structuredContent[blockIdx].layout.slice(caret.start, caret.end): null;
                const coordinate  = selection.getRangeAt(0).getBoundingClientRect();
                this.internal.selection = {
                    blockIndex: blockIdx,
                    start: caret.start,
                    end: caret.end,
                    content: selection.toString(),
                    layout: layout,
                    posX: coordinate.left - 105 + coordinate.width/2, // 105 is the menu length/2
                    posY: coordinate.top - 45
                }
            },
        };

        /**
         * Everything about encoding/decoding markdown to array including methods, regex, etc.
         **/
        codec = {
            /** Block type regex pattern **/
            pattern: {
                title: '',
                title2: '',
                title3: '',
                orderedList: '',
                unorderedList: '',
                quote: '',
                code: '',
                admonition: /(\!\!\! )([^ ]*) ?([^\n]*)/,
                image: /\!\[([^[\]]*)\]\(([^\n]*)\)/,
                video: /(<video( controls)?( src="([\\\/A-Za-z0-9_:\-\. éèàùêâ~]*)"))>([^<]*)(<\/video>)/,
            },
            getBlockType: (block) => {
                return 'p'
            },

            /** Text regex pattern (bold, underline, italic,...)**/
            tags: {
                '-': { MD: '', HTML: ['', '']},
                'u': { MD: '__', HTML: ['<u>', '</u>']},
                'i': { MD: '*', HTML: ['<i>', '</i>']},
                'b': { MD: '**', HTML: ['<b>', '</b>']},
                's': { MD: '~~', HTML: ['<s>', '</s>']},
            },
            styles: {
                underline: /__(\S(.*?\S)?)__/gm,            // __.......__
                boldItalic: /\*\*\*(\S(.*?\S)?)\*\*\*/gm,   // ***......***
                bold: /\*\*(\S(.*?\S)?)\*\*/gm,             // **........**
                italic: /\*(\S(.*?\S)?)\*/gm,               // *.......*
                strike: /~~(\S(.*?\S)?)~~/gm,               // ~~.......~~
                subscript: /<sub>(\S(.*?\S)?)<\/sub>/gm,    // <sub>.......<\sub>
                superscript: /<sup>(\S(.*?\S)?)<\/sup>/gm,  // <sup>.......<\sup>
                formula: /\$(\S(.*?\S)?)\$/gm,              // $.......$
                code: /`(\S(.*?\S)?)`/gm,                  // `.......`
            },
            getLayout: (md) => {
                let layout = Array(md.length).fill('-');
                function getFormat(re, rplc, lgth) {
                    let match;
                    while ((match = re.exec(md)) !== null) {
                        layout.fill('r', match.index, match.index + lgth);
                        layout.fill(rplc, match.index + lgth, match.index + match[0].length - lgth);
                        layout.fill('r', match.index + match[0].length - lgth, match.index + match[0].length);
                    }
                }
                // getFormat(this.codec.styles.underline, 'u', 1);
                getFormat(this.codec.styles.italic, 'i', 1);
                getFormat(this.codec.styles.bold, 'b', 2);
                getFormat(this.codec.styles.strike, 's', 2);
                return layout.filter(rule => rule !== 'r')
            },
            getContent: (md) => {
                let content = md.replace(this.codec.styles.bold, '$1');
                content = content.replace(this.codec.styles.italic, '$1');
                return content
            },

            computeTo: (format, content, layout) => {
                // format = MD or HTML
                let computed = content;
                let lastRule = '-';
                for (let i = layout.length - 1; i >= 0; i--) {
                    const rule = layout[i];
                    if (rule !== lastRule) {
                        computed = computed.slice(0, i + 1) +
                                   this.codec.tags[rule][format][1] + this.codec.tags[lastRule][format][0] +
                                   computed.slice(i + 1, computed.length);
                    }
                    lastRule = rule;
                }
                return this.codec.tags[lastRule][format][0] + computed
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
                }
            },
            encodeFromMD: (md) => {
                const blocks = md.split('\n');
                let currentBlockType = null;
                let structuredContent = [];

                for (let block of blocks) {
                    currentBlockType = this.codec.getBlockType(block);

                    if (currentBlockType && currentBlockType === 'p') {
                        structuredContent.splice(structuredContent.length, 0, this.codec.parseBlock.paragraph(block))
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
                    if (block.type === 'p') output += this.codec.computeTo('MD', block.content, block.layout) + '\n'
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
                    const caret = this.internal._getCaretPosition(target);

                    this.blocks.splitBlock(this.internal.currentItemIndex, caret.start);
                    this.internal.currentItemIndex ++;
                    this.$nextTick(() => {
                        /** Here we are waiting the DOM to rerender the new block before position caret on it**/
                        const newBlock = this.$refs[this.structuredContent[this.internal.currentItemIndex].id][0];
                        this.internal._setCaretPosition(newBlock);
                    });
                },
                onTab: () => {},
                onBackspace: (target) => {
                    /** Fusion current line with the precedent one if caretPosition === 0 **/
                    const caret = this.internal._getCaretPosition(target);
                    const precedentBlock = this.internal.currentItemIndex ?
                        this.$refs[this.structuredContent[this.internal.currentItemIndex - 1].id][0] : null;
                    const precedentTextLength = precedentBlock ? this.structuredContent[this.internal.currentItemIndex - 1].content.length: 0;

                    if (!caret.end && precedentBlock) {
                        this.blocks.mergeBlockWithPrecedent(this.internal.currentItemIndex);
                        this.internal.currentItemIndex--;
                        this.internal._setCaretPosition(precedentBlock, precedentTextLength);
                    }
                     /** else simply remove precedent character or selection **/
                    else {
                        if (this.internal.selection.content) this.ui.removeSelection();
                        else {
                            this.blocks.removeAt(this.internal.currentItemIndex, caret.start - 1, caret.start);
                            caret.start -= 1;
                        }
                        this.internal._setCaretPosition(target, caret.start);
                    }
                },
                onDelete: (target) => {
                    const caret = this.internal._getCaretPosition(target);
                    const followingBlock = this.internal.currentItemIndex + 1 < this.structuredContent.length ?
                        this.$refs[this.structuredContent[this.internal.currentItemIndex + 1].id][0] : null;
                    const caretAtEnd = caret.end === this.structuredContent[this.internal.currentItemIndex].content.length;

                    this.ui.removeSelection();
                    let selectionLength = this.internal.selection.content.length;
                    if (selectionLength) {
                        this.internal._setCaretPosition(target, caret.start);
                    }
                    else {
                        /** Fusion current line with the following one if caret at the end of the line **/
                        if (followingBlock && caretAtEnd) {
                            this.blocks.mergeBlockWithPrecedent(this.internal.currentItemIndex + 1);
                        }

                        /** else simply remove next character**/
                        else {
                            this.blocks.removeAt(this.internal.currentItemIndex, caret.start, caret.start + 1);
                        }
                        this.internal._setCaretPosition(target, caret.start);
                    }

                },
                onArrows: (target, key) => {
                    const caret = this.internal._getCaretPosition(target);
                    const precedentBlock = this.internal.currentItemIndex ?
                        this.$refs[this.structuredContent[this.internal.currentItemIndex - 1].id][0] : null;
                    const nextBlock = this.internal.currentItemIndex < this.structuredContent.length - 1 ?
                        this.$refs[this.structuredContent[this.internal.currentItemIndex + 1].id][0] : null;

                    switch (key) {
                        case 'ArrowUp':
                            if (precedentBlock) {
                                this.internal.currentItemIndex --;
                                this.internal._setCaretPosition(precedentBlock, caret.start);
                            }
                            break;
                        case 'ArrowDown':
                            if (nextBlock) {
                                this.internal.currentItemIndex ++;
                                this.internal._setCaretPosition(nextBlock, caret.start);
                            }
                            break;
                        case 'ArrowLeft':
                            if (!caret.start && precedentBlock) { /** Change block only if caret is in the beginning of the block**/
                                const precedentTextLength = this.structuredContent[this.internal.currentItemIndex - 1].content.length;
                                this.internal.currentItemIndex --;
                                this.internal._setCaretPosition(precedentBlock, precedentTextLength);
                            }
                            else { this.internal._setCaretPosition(target, caret.start - 1); }
                            break;
                        case 'ArrowRight':
                            const currentTextLength = this.structuredContent[this.internal.currentItemIndex].content.length;
                            if (caret.end >= currentTextLength && nextBlock) { /** Change block only if caret is in the end of the block**/
                                this.internal.currentItemIndex ++;
                                this.internal._setCaretPosition(nextBlock);
                            }
                            else { this.internal._setCaretPosition(target, caret.start + 1); }
                            break;
                    }
                },
                onCharacter: (target , key) => {
                    this.ui.removeSelection();
                    const caret = this.internal._getCaretPosition(target);
                    this.blocks.insertAt(this.internal.currentItemIndex, caret.start, key);
                    this.internal._setCaretPosition(target, caret.start + 1);
                },
                onDragSelection: () => {
                    const selection = this.internal.selection;
                    this.blocks.removeAt(this.internal.currentItemIndex, selection.start, selection.end);
                },
                onDropSelection: (event) => {
                    if (this.internal.selection) {
                        const caret = this.internal._getCaretPosition(event.target);
                        const index = this.blocks.getBlockIndex(event.currentTarget.id);
                        if (index !== -1) this.blocks.insertAt(index, caret.start, this.internal.selection.content, this.internal.selection.layout);
                        this.internal._setCaretPosition(event.target, caret.start);
                    }
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
                    this.blocks.removeAt(this.internal.currentItemIndex, selection.start, selection.end);
                }
            },
            formatSelection: (format) => {
                //get selection, update structuredcontent layout and compute structuredcontent
                const selection = this.internal.selection;
                let currentBlock = this.structuredContent[selection.blockIndex];
                for (let i = selection.start; i < selection.end; i++) {
                    if (currentBlock.layout[i] === format) currentBlock.layout.splice(i, 1, '-');
                    else currentBlock.layout.splice(i, 1, format);
                }
                this.structuredContent.splice(this.internal.currentItemIndex, 1, {
                    id: currentBlock.id,
                    type: currentBlock.type,
                    content: currentBlock.content,
                    layout: currentBlock.layout,
                    computed: this.codec.computeTo('HTML', currentBlock.content, currentBlock.layout)
                });
            },
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
            addBlock: (index) => {
                this.structuredContent.splice(index, 0, this.codec.parseBlock.paragraph(''));
            },
            deleteBlockAt: (index) => {
                this.structuredContent.splice(index, 1);
            },
            getTextAt: (index, start, end) => {
                return this.structuredContent[index].content.slice(start, end);
            },
            insertAt: (index, caretPos, char, layout=null) => {
                const currentContent = this.structuredContent[index];
                if (!layout) layout = Array(char.length).fill(caretPos && currentContent.layout[caretPos - 1] ? currentContent.layout[caretPos - 1] : '-');
                currentContent.content = currentContent.content.slice(0, caretPos) + char + currentContent.content.slice(caretPos);
                currentContent.layout.splice(caretPos, 0, ...layout);
                currentContent.computed = this.codec.computeTo('HTML', currentContent.content, currentContent.layout);
                this.structuredContent.splice(index, 1, currentContent);
            },
            removeAt: (index, start, end) => {
                /** Remove content before the caret **/
                const block = this.structuredContent[index];
                block.content = block.content.slice(0, start) + block.content.slice(end);
                block.layout.splice(start, end - start);
                this.structuredContent.splice(index, 1, this.blocks.computeBlock(block));
            },
            mergeBlockWithPrecedent: (index) => {
                const precedentBlock = this.structuredContent[index - 1];
                precedentBlock.content += this.structuredContent[index].content;
                precedentBlock.layout.push(...this.structuredContent[index].layout);
                this.structuredContent.splice(index - 1, 1, this.blocks.computeBlock(precedentBlock));
                this.structuredContent.splice(index, 1);
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
            computeBlock: (block) => {
                block.computed = this.codec.computeTo('HTML', block.content, block.layout);
                return block;
            },
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
            states: [],
            storeState: () => {},
            undoState: () => {},
            redoState: () => {},
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
        }
    }
</script>
<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;900&display=swap');
resetButton()
    background transparent
    border-color transparent
    font-weight normal

*
    font-family "Rubik"

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
            opacity 0.5
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
        & i
            opacity: 0;
        &:hover
            background-color #F8F8F8
            & i
                opacity 1

    /** Content type style **/
    &__content
        flex-grow 2
    & p
        padding 8px
        margin 0

    /** Remove default outline **/
    & *
        outline none
        white-space pre-wrap

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