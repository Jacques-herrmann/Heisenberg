<template>
    <div class="MDEditor" id="MDEditor">
        <transition name="fade">
            <div class="MDEditor__format-text"
                 v-if="this.internal.selection"
                 :style="'top: ' + this.internal.selection.posY + 'px; left:'  + this.internal.selection.posX + 'px'"
            >
                <div class="MDEditor__format-text-pointer"/>
                <button class="MDEditor__format-text-button"><i class="mdi mdi-format-bold"/></button>
                <button class="MDEditor__format-text-button"><i class="mdi mdi-format-italic"/></button>
                <button class="MDEditor__format-text-button"><i class="mdi mdi-format-underline"/></button>
                <button class="MDEditor__format-text-button"><i class="mdi mdi-format-strikethrough"/></button>
                <button class="MDEditor__format-text-button"><i class="mdi mdi-code-tags"/></button>
                <button class="MDEditor__format-text-button"><i class="mdi mdi-square-root"/></button>
            </div>
        </transition>

        <div class="MDEditor__controls-bar">
            <button class="MDEditor__button">
                <i class="mdi mdi-format-title" />
            </button>
        </div>
        <draggable :list="structuredContent" ghost-class='ghost' @start="ui.onDrag" @end="ui.onDrop">
            <transition-group type="transition" :name="'flip-list'">
                <div
                    :class="'MDEditor__md-block' +
                     (internal.currentItemIndex === index ? ' MDEditor__md-block--selected': '')"
                    v-for="(item, index) in structuredContent"
                    :key="item.id"
                    :id="item.id"
                    @click="blocks.selectBlock(index)"
                    @keydown="ui.handleKeyDown($event)"
                    v-on:beforeinput="ui.handleInput($event)"
                >
                    <button class="MDEditor__button MDEditor__button--dragable"><i class="mdi mdi-drag-vertical"/></button>
                    <p class="MDEditor__content" :ref="item.id" v-if="item.type === 'p'" :contenteditable="editMode">{{ item.content }}</p>
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
            selection: null,

            /*-------------------------------------------------------------------------------------------*/
            _getCaretPosition: (block) => {
                let caretPos = 0,
                sel, range;
                if (window.getSelection) {
                    sel = window.getSelection();
                    if (sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        if (range.commonAncestorContainer.parentNode === block) {
                            caretPos = range.endOffset;
                        }
                    }
                }
                else if (document.selection && document.selection.createRange) {
                    range = document.selection.createRange();
                    if (range.parentElement() === block) {
                        let tempEl = document.createElement("span");
                        block.insertBefore(tempEl, block.firstChild);
                        let tempRange = range.duplicate();
                        tempRange.moveToElementText(tempEl);
                        tempRange.setEndPoint("EndToEnd", range);
                        caretPos = tempRange.text.length;
                    }
                }
                return caretPos;
            },
            _setCaretPosition: (block, position=0) => {
                this.$nextTick(() => {
                    let selection = window.getSelection();
                    let range = document.createRange();
                    range.setStart(block.childNodes[0], Math.min(position, block.childNodes[0].length));
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                })
            },
            /*-------------------------------------------------------------------------------------------*/
            updateSelection: () => {
                const selection = window.getSelection();
                if (selection.toString().length > 0) {
                    const selectionStart = Math.min(selection.focusOffset, selection.anchorOffset);
                    const selectionEnd = Math.max(selection.focusOffset, selection.anchorOffset);
                    const coordinate  = selection.getRangeAt(0).getBoundingClientRect();
                    this.internal.selection = {
                        caretPos: selectionStart,
                        length: selectionEnd - selectionStart,
                        content: selection.toString(),
                        posX: coordinate.left - 90 + coordinate.width/2, // 90 is the menu length/2
                        posY: coordinate.top - 45
                    }
                }
                else {
                    this.internal.selection = null;
                }
            },
        };

        /**
         * Everything about encoding/decoding markdown to array including methods, regex, etc.
         **/
        codec = {
            /** Block type regex pattern **/
            pattern: {},
            /** Text regex pattern (bold, underline, italic,...)**/
            styles: {},
            /*-------------------------------------------------------------------------------------------*/
            /** MarkDown to structured content array **/
            getBlockType: (block) => {
                return 'p'
            },
            parseBlock: {
                paragraph: (md) => {
                    return {
                        id: uuidv4(),
                        type: 'p',
                        content: md,
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
                    if (block.type === 'p') output += block.content + '\n'
                }
                return output;
            },
        };

        /**
         * Everything about user interaction <=> block management including switch, remove, type change
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
                    const selectionLength = this.internal.selection ? this.internal.selection.length : 0;
                    const caretPosition = this.internal._getCaretPosition(target) - selectionLength;

                    this.blocks.splitBlock(this.internal.currentItemIndex, caretPosition);
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
                    const caretPosition = this.internal._getCaretPosition(target);
                    const precedentBlock = this.internal.currentItemIndex ?
                        this.$refs[this.structuredContent[this.internal.currentItemIndex - 1].id][0] : null;
                    const precedentTextLength = precedentBlock ? precedentBlock.childNodes[0].length: 0;

                    if (!caretPosition && precedentBlock) {
                        this.blocks.mergeBlockWithPrecedent(this.internal.currentItemIndex);
                        this.internal.currentItemIndex--;
                        this.internal._setCaretPosition(precedentBlock, precedentTextLength);
                    }
                     /** else simply remove precedent character **/
                    else if (caretPosition){
                        this.ui.removeSelection();
                        let selectionLength = this.internal.selection ? this.internal.selection.length : 0;
                        if (!selectionLength) {
                            this.blocks.removeAt(this.internal.currentItemIndex, caretPosition);
                            selectionLength = 1;
                        }
                        this.internal._setCaretPosition(target, caretPosition - selectionLength);
                    }
                },
                onDelete: (target) => {
                    const caretPosition = this.internal._getCaretPosition(target);
                    const followingBlock = this.internal.currentItemIndex + 1 < this.structuredContent.length ?
                        this.$refs[this.structuredContent[this.internal.currentItemIndex + 1].id][0] : null;
                    const caretAtEnd = caretPosition === this.structuredContent[this.internal.currentItemIndex].content.length;

                    this.ui.removeSelection();
                    let selectionLength = this.internal.selection ? this.internal.selection.length : 0;
                    if (selectionLength) {
                        this.internal._setCaretPosition(target, caretPosition - selectionLength);
                    }
                    else {
                        /** Fusion current line with the following one if caret at the end of the line **/
                        if (followingBlock && caretAtEnd) {
                            this.blocks.mergeBlockWithPrecedent(this.internal.currentItemIndex + 1);
                        }

                        /** else simply remove next character**/
                        else {
                            this.blocks.removeAt(this.internal.currentItemIndex, caretPosition + 1);
                        }
                        this.internal._setCaretPosition(target, caretPosition);
                    }

                },
                onArrows: (target, key) => {
                    const caretPosition = this.internal._getCaretPosition(target);
                    const precedentBlock = this.internal.currentItemIndex ?
                        this.$refs[this.structuredContent[this.internal.currentItemIndex - 1].id][0] : null;
                    const nextBlock = this.internal.currentItemIndex < this.structuredContent.length - 1 ?
                        this.$refs[this.structuredContent[this.internal.currentItemIndex + 1].id][0] : null;

                    switch (key) {
                        case 'ArrowUp':
                            if (precedentBlock) {
                                this.internal.currentItemIndex --;
                                this.internal._setCaretPosition(precedentBlock, caretPosition);
                            }
                            break;
                        case 'ArrowDown':
                            if (nextBlock) {
                                this.internal.currentItemIndex ++;
                                this.internal._setCaretPosition(nextBlock, caretPosition);
                            }
                            break;
                        case 'ArrowLeft':
                            if (!caretPosition && precedentBlock) { /** Change block only if caret is in the beginning of the block**/
                                const precedentTextLength = precedentBlock.childNodes[0].length;
                                this.internal.currentItemIndex --;
                                this.internal._setCaretPosition(precedentBlock, precedentTextLength);
                            }
                            else { this.internal._setCaretPosition(target, caretPosition - 1); }
                            break;
                        case 'ArrowRight':
                            const currentTextLength = this.structuredContent[this.internal.currentItemIndex].content.length;
                            if (caretPosition >= currentTextLength && nextBlock) { /** Change block only if caret is in the end of the block**/
                                this.internal.currentItemIndex ++;
                                this.internal._setCaretPosition(nextBlock);
                            }
                            else { this.internal._setCaretPosition(target, caretPosition + 1); }
                            break;
                    }
                },
                onCharacter: (target , key) => {
                    this.ui.removeSelection();
                    const selectionLength = this.internal.selection ? this.internal.selection.length : 0;
                    const caretPosition = this.internal._getCaretPosition(target) - selectionLength;
                    this.blocks.insertAt(this.internal.currentItemIndex, caretPosition, key);
                    this.internal._setCaretPosition(target, caretPosition + 1);
                },
                onDragSelection: () => {
                    const selection = window.getSelection();
                    const selectionStart = Math.min(selection.focusOffset, selection.anchorOffset);
                    const selectionEnd = Math.max(selection.focusOffset, selection.anchorOffset);

                    this.internal.selection = this.blocks.getTextAt(this.internal.currentItemIndex, selectionStart, selectionEnd);
                    this.blocks.removeAt(this.internal.currentItemIndex, selectionEnd, selectionEnd - selectionStart);
                },
                onDropSelection: (event) => {
                    if (this.internal.selection) {
                        const caretPos = this.internal._getCaretPosition(event.target);
                        const index = this.blocks.getBlockIndex(event.currentTarget.id);

                        if (index !== -1) this.blocks.insertAt(index, caretPos, this.internal.selection);
                        this.internal._setCaretPosition(event.target, caretPos);
                        this.internal.selection = null;
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
            /** Removing selection and return selection length **/
            removeSelection: () => {
                const selection = this.internal.selection;
                if (selection) {
                    this.blocks.removeAt(this.internal.currentItemIndex, selection.caretPos + selection.length, selection.length);
                }
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
            selectBlock: (index) => {
                this.internal.currentItemIndex = index;
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
            insertAt: (index, caretPos, char) => {
                const currentContent = this.structuredContent[index];
                currentContent.content = currentContent.content.slice(0, caretPos) + char + currentContent.content.slice(caretPos);
                this.structuredContent.splice(index, 1, currentContent);
            },
            removeAt: (index, caretPos, length=1) => {
                /** Remove content before the caret **/
                const currentContent = this.structuredContent[index];
                currentContent.content = currentContent.content.slice(0, caretPos - length) + currentContent.content.slice(caretPos);
                this.structuredContent.splice(index, 1, currentContent);
            },
            mergeBlockWithPrecedent: (index) => {
                this.structuredContent[index - 1].content += this.structuredContent[index].content;
                this.structuredContent.splice(index, 1);
            },
            splitBlock: (index, caretPos) => {
                const beforeCaretContent = this.structuredContent[index].content.substr(0, caretPos);
                const afterCaretContent = this.structuredContent[index].content.substr(caretPos);
                this.structuredContent[index].content.slice(0, caretPos);
                this.structuredContent.splice(index , 1, ...this.codec.encodeFromMD(beforeCaretContent));
                this.structuredContent.splice(index + 1, 0, ...this.codec.encodeFromMD(afterCaretContent));
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
         * Everything about emit events
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
         * Everything about undo and redo change
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

        @Watch('structuredContent', ({immediate: true, deep: true}))
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
    width 800px
    min-height 1000px
    margin 50px auto
    box-shadow 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
    &__format-text
        height 36px
        max-width 180px
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
            left 80px
            border-left 10px solid transparent
            border-right 10px solid transparent
            border-top 10px solid #333

    &__controls-bar
        height 40px
        background #eee
        position -webkit-sticky
        position sticky
        text-align left
        border-bottom 1px solid #ccc
    &__button
        resetButton()
        height 36px
        padding 8px
        color #888
        transition all 0.3s ease
        & i
            font-size 1.2em
            opacity 0

        &--dragable
            cursor move

        &--delete
            cursor pointer

        &:hover
            color #333

    &__md-block
        display flex
        align-items center
        justify-content flex-start
        &--selected
            background-color #F8F8F8
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