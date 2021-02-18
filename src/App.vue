<template>
    <div id="app">
        <md-editor v-model="md"></md-editor>
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
        test = "Je suis un paragraphe avec chaque mise en forme **gras**, *italique*, __underline__, ~~strike~~ et code!\n\n";
        md = `# Petit éditeur Markdown

## Introduction

**Markdown** est un language de balisage léger permettant de créer du texte formaté à l'aide d'un éditeur de texte brut. *John Gruber* et *Aaron Swartz* ont créé Markdown en 2004 en tant que langage de balisage qui séduit les lecteurs humains sous sa forme de code source. Markdown est largement utilisé dans les blogs, la messagerie instantanée , les forums en ligne , les logiciels collaboratifs , les pages de documentation et les fichiers README .
Vous pouvez retrouver l'ensemble des règles de syntaxe via ce lien [Syntaxe Markdown](https://www.markdownguide.org/basic-syntax/).

Vous trouverez ci-dessous les éléments actuellement disponibles dans cet éditeur ainsi que les règles associées :

## Titres

# Titre de niveau 1 (commence par # )

### Titre de niveau 2 (commence par ## )

### Titre de niveau 1 (commence par ### )

## Paragraphe

Un simple paragraphe contenant du texte. Ce texte peut être formaté de quatres façons différentes : **gras** (**), *italique* (*), __souligné__ (__) et ~~barré~~ (~~).

Vous avez également la possibilité d'ajouter des formules au sein de vos paragraphes. Ces formules doivent être écrites au format Latex et entourées de caractères ($).

Voici un exemple :  $f(x) = \\int_{-\\infty}^\\infty f(\\xi)\\,e^{2 \\pi i \\xi x} \\,d\\xi$

Les mises en forme et formules sont également disponibles pour les blocs de type titres, citations/avertissements et listes !

Les blocs aussi peuvent avoir une mise en forme particulière, il en existe 4 types (3 avertissements et une citation) :

## Citations

> Voici un exemple de citation, pour l'utiliser, ajoutez le caractère suivant '>', en début de paragraphe.

## Avertissements

### Info

!!!info
Voici un exemple de bloc INFO, pour l'utiliser, ajoutez la ligne suivante : !!!info , avant le paragraphe

### Warning

!!!warning
Voici un exemple de bloc WARNING, pour l'utiliser, ajoutez la ligne suivante : !!!warning , avant le paragraphe

### Danger

!!!danger
Voici un exemple de bloc DANGER, pour l'utiliser, ajoutez la ligne suivante : !!!danger , avant le paragraphe

## Listes

Voici une liste ordonnée :

1. First item
2. Second item
5. Third item
4. Fourth item
9. Fifth item

N'importe quel nombre suivi d'un point et d'un espace fonctionne pour créer un élément de la liste.

Et une non ordonnée :

- First i**tem**
- Second item
* Third item
* Fourt*h ite*m
* Fifth item

Ici il est possible d'utiliser trois caractères différents suivi d'un espace (*, -, +).

## Images

## Vidéo


## Ce qui ne fonctionne pas encore

## Tableau

## Code

## Lien
`;
        print(text) {
            console.log(text);
        }
    }
</script>
<style>
</style>