<template>
    <div class="MDEditor">
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
                    @click="ui.selectBlock(index)"
                    @keydown="ui.handleKeyDown($event)"
                >
                    <button class="MDEditor__button MDEditor__button--dragable"><i class="mdi mdi-drag-vertical"/></button>
                    <p class="MDEditor__content" :ref="item.id" v-if="item.type === 'p'" :contenteditable="editMode">{{ item.content }}</p>
                    <button class="MDEditor__button MDEditor__button--delete" @click="ui.deleteBlockAt(index)"><i class="mdi mdi-delete"/></button>
                </div>
            </transition-group>
        </draggable>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import draggable from 'vuedraggable'
    import { uuidv4 } from '@/lib/generators.js'

    export default @Component({
        props: {
            value: {
                type: String,
                default: ""
            },
            editMode: {
                type: Boolean,
                default: true
            }
        },
        components: {
            draggable,
        }
    })

     class MDEditor extends Vue {
        structuredContent = [];
        /**
         * Everything about internal states including constant, getters
         **/
        internal = {
            currentItemIndex: 1,
            caretPos: 0,
            drag: false,
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
                let selection = window.getSelection();
                let range = document.createRange();
                range.setStart(block.childNodes[0], Math.min(position, block.childNodes[0].length));
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
            }
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
                let blockType = null;
                !block.length <=0 ? blockType = 'p': null;
                !blockType ? blockType = 'undefined': null;
                return blockType
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

                console.log(blocks);
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
            /** Translate HTML view into markdown **/
            decodeMDFrom: () => {},
        };

        /**
         * Everything about user interaction <=> block management including switch, remove, type change
         **/
        ui = {
            selectBlock: (index) => {
                this.internal.currentItemIndex = index;
            },
            deleteBlockAt: (index) => {
                this.structuredContent.splice(index, 1);
            },

            /** Handling keyup event and respective behaviors functions **/
            handleKeyDown: (event) => {
                const preventKeys = ['Enter', 'Delete', 'ArrowUp', 'ArrowDown', 'Tab', 'BackSpace'];
                console.log(event);
                if (event && event instanceof KeyboardEvent) {
                    if (event.key && preventKeys.indexOf(event.key) !== -1) event.preventDefault();
                    switch (event.key) {
                        case 'Enter':
                            this.ui.behaviors.onEnter();
                            break;
                        case 'Delete':
                            this.ui.behaviors.onDelete();
                            break;
                        case 'ArrowUp':
                        case 'ArrowDown':
                        case 'ArrowRight':
                        case 'ArrowLeft':
                            this.ui.behaviors.onArrows(event);
                            break;
                        case 'Tab':
                            this.ui.behaviors.onTab();
                            break;
                        case 'BackSpace':
                            this.ui.behaviors.onBackSpace();
                            break;
                        default:
                            this.ui.behaviors.onUnHandle();
                    }
                }
            },
            behaviors: {
                onEnter: () => {},
                onTab: () => {},
                onBackSpace: () => {},
                onDelete: () => {},
                onArrows: (event) => {
                    const caretPosition = this.internal._getCaretPosition(event.target);
                    const precedentBlock = this.$refs[this.structuredContent[this.internal.currentItemIndex - 1].id][0];
                    const nextBlock = this.$refs[this.structuredContent[this.internal.currentItemIndex + 1].id][0];

                    switch (event.key) {
                        case 'ArrowUp':
                            this.internal.currentItemIndex -= 1;
                            this.internal._setCaretPosition(precedentBlock, caretPosition);
                            break;
                        case 'ArrowDown':
                            this.internal.currentItemIndex += 1;
                            this.internal._setCaretPosition(nextBlock, caretPosition);
                            break;
                        case 'ArrowLeft':
                            if (!caretPosition) { /** Change block only if caret is in the beginning of the block**/
                                event.preventDefault();
                                const precedentTextLength = precedentBlock.childNodes[0].length
                                this.internal.currentItemIndex -= 1;
                                this.internal._setCaretPosition(precedentBlock, precedentTextLength);
                            }
                            break;
                        case 'ArrowRight':
                            const currentTextLength = this.structuredContent[this.internal.currentItemIndex].content.length;
                            if (caretPosition >= currentTextLength) { /** Change block only if caret is in the end of the block**/
                                event.preventDefault();
                                this.internal.currentItemIndex += 1;
                                this.internal._setCaretPosition(nextBlock);
                            }
                            break;
                    }
                },
                onUnHandle: () => {},
            },
            /** Drag & Drop interaction **/
            onDrag: () => {
                this.internal.drag = true;
            },
            onDrop: () => {
                this.internal.drag = false;
            },
        };
        /**
         * Everything about shortcut
         **/
        shortcut = {};

        /**
         * Everything about importing content, media, formatted text (Work, HTML)
         **/
        importing = {
            onPaste: () => {},
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
                this.$emit('input', this.codec.decodeMDFrom());
            },
            autoSave: () => {}
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
            this.structuredContent.push(...this.codec.encodeFromMD(this.value)); /** Push allow us to not replace structuredContent value **/
        }
    }
</script>
<style lang="stylus">
.MDEditor
    width 800px
    margin 50px auto
    box-shadow 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
    &__controls-bar
        height 40px
        background #eee
        position -webkit-sticky
        position sticky
        text-align left
        border-bottom 1px solid #ccc
    &__button
        background transparent
        border-color transparent
        font-weight normal
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

/** Drag & Drop animation **/
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