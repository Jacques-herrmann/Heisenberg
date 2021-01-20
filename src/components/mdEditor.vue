<template>
    <div class="MDEditor">
        <div class="MDEditor__controls-bar">
            <button class="MDEditor__button">
                <i class="mdi mdi-format-title" />
            </button>
        </div>
        <draggable v-model="structuredContent" ghost-class='ghost' @start="ui.onDrag" @end="ui.onDrop">
            <transition-group type="transition" :name="'flip-list'">
                <div
                    :class="'MDEditor__md-block' +
                     (internal.currentItemIndex === index ? ' MDEditor__md-block--selected': '')"
                    v-for="(item, index) in structuredContent"
                    :key="item.id"
                    @click="ui.selectBlock(index)"
                >
                    <button class="MDEditor__button MDEditor__button--dragable">
                        <i class="mdi mdi-drag-vertical" />
                    </button>
                    <p class="MDEditor__content" v-if="item.type === 'p'" :contenteditable="editMode">{{ item.content }}</p>
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
            _getCaretPosition: () => {},
            _setCaretPosition: () => {}
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
                this.internal.currentItemIndex = index
            },
            deleteBlockAt: () => {},
            moveBlock: () => {},

            /** Handling keypress event and respective behaviors functions **/
            keyPressed: () => {},
            onEnter: () => {},
            onTab: () => {},
            onBackSpace: () => {},
            onDelete: () => {},
            onArrows: () => {},
            onUnHandle: () => {},
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
            input: () => {},
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
            this.structuredContent = this.codec.encodeFromMD(this.value);
        }
    }
</script>
<style lang="stylus">
.MDEditor
    width 1200px
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
        cursor pointer
        transition all 0.3s ease
        & i
            font-size 1.2em
        &--dragable
            cursor grab
    &__md-block
        display flex
        align-items center
        justify-content flex-start
        &--selected
            background-color #F8F8F8
        &:hover
            background-color #F8F8F8
    &__content
        flex-grow 2
        outline none
        cursor pointer
    & p
        padding 8px
        margin 0

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