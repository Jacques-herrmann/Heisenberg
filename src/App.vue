<template>
    <div id="app">
        <md-editor ></md-editor>
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
        test = "- First i**tem**\n* Secon*d* item\n+ Third item\n\n";
        md = `# Petit éditeur Markdown

Voici une formule : $f(x) = \\int_{-\\infty}^\\infty f(\\xi)\\,e^{2 \\pi i \\xi x} \\,d\\xi$ etetete

et $f(x) = ax +3$

## Introduction

**Markdown** est un language de balisage léger permettant de créer du texte formaté à l' aide d'un éditeur de texte brut. *John Gruber* et *Aaron Swartz* ont créé Markdown en 2004 en tant que langage de balisage qui séduit les lecteurs humains sous sa forme de code source. Markdown est largement utilisé dans les blogs , la messagerie instantanée , les forums en ligne , les logiciels collaboratifs , les pages de documentation et les fichiers README .
Vous pouvez retrouver l'ensemble des règles de syntaxe via ce lien [Syntaxe Markdown](https://www.markdownguide.org/basic-syntax/)

## Titres

## Paragraphe

## Formater le texte

## Citations

## Avertissements

## Listes

Voici une liste ordonnée :

1. First item
2. Second item
5. Third item
4. Fourth item
9. Fifth item

Et une non ordonnée :

- First i**tem**
- Second item
* Third item
* Fourt*h ite*m
* Fifth item

## Tableau

## Code

## Lien

## Formules

## Images

## Vidéo




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

$f(x) = ax +3$


        `;
        print(text) {
            console.log(text);
        }
    }
</script>
<style>
</style>