<template>
    <div id="app">
        <md-editor></md-editor>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import mdEditor from './components/mdEditor.vue';

    export default @Component({
        components: {
            'md-editor': mdEditor,
        }
    })

     class App extends Vue {
        md = `# Petit <span style="font-style: italic; font-weight: bold">éditeur</span> Markdown

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


        `;
        print(text) {
            console.log(text);
        }
    }
</script>
<style>
</style>