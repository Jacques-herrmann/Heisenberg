<template>
    <div class="MDEditor">
        <div class="MDEditor__controls-bar">
            <button><i class="mdi mdi-format-title"></i></button>
        </div>
        {{ value }}
    </div>
</template>

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'

    export default @Component({
        props: {
            value: {
                type: 'String',
                value: `
# Petit éditeur Markdown

![Visuel daccueil](https://img.over-blog-kiwi.com/2/64/72/73/20180516/ob_f05e5c_question-mark-png128.png)

!!! note
    Si vous voyez ce message, c'est que l'éditeur est en mode démonstration. Cet éditeur est utilisable dans une application Vue via l'utilisation de
    v-model.

## Ce qui fonctionne

### Affichage des artefacts Markdown

* headers (de 1 à 6)
* paragraphes simples
* formats admonition
* listes non ordonnées
* images
* vidéos (via code HTML)
* citations
* Formules

### Interactions utilisateur

* Possibilité de modifier les headers, paragraphes, admonition, citation et listes
* Possibilité d'utiliser la barre d'outils pour passer d'un type de format à un autre (header, paragraphe, etc.)
* Le Markdown correspondant à l'affichage est généré X milisecondes après une modification et émis via un événement change.
  Cela permet donc l'utilisation du composant via un v-model.

## Ce qui doit être ajouté

### Affichage des artefacts Markdown

* Tableaux
* formatage (liens, gras, italique, souligné, barré)

### Interactions utilisateur

* insérer une image
* modifier une image
* insérer une vidéo
* modifier une vidéo
* insérer une formule
* modifier une formule


## Exemples d'usage

### Vidéo avec légende

<video controls src="http://v2v.cc/~j/theora_testsuite/320x240.ogg">Texte alternatif</video>

> Légende d'un média ou citation


### Formule mathématique

$$f(x) = ax +3$$


        `
            }
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
            parseBlock: () => {},
            encodeFromMD: () => {},
            /** Markdown text to HTML content **/
            encodeHtMLFromText: () => {},
            /** Translate HTML view into markdown **/
            decodeMDFrom: () => {},
        };

        /**
         * Everything about user interaction <=> block management including switch, remove, type change
         **/
        ui = {
            deleteItemAt: () => {},
            moveItemAt: () => {},

            /** Handling keypress event and respective behaviors functions **/
            keyPressed: () => {},
            onEnter: () => {},
            onTab: () => {},
            onBackSpace: () => {},
            onDelete: () => {},
            onArrows: () => {},
            onUnHandle: () => {},
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
        }
    }
</script>

<style lang="stylus">
.MDEditor
    height 1000px
    width 1200px
    margin 50px auto
    box-shadow 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
    &__controls-bar
        height 46px
        background #eee
        position -webkit-sticky
        position sticky
        text-align left
        border-bottom 1px solid #ccc
        & button
            background transparent
            border-color transparent
            font-size 0.7em
            font-weight normal
            height 46px
            padding 12px 8px
            color #888
            transition all 0.3s ease
            & i
                font-size 2em

</style>