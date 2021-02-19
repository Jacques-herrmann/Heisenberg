import Vue from 'vue'
import { mount, shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import MDEditor from "@/components/mdEditor.vue";
import {NEW_BLOCK, P, UL, OL,H1, H2, H3, QUOTE, INFO, WARNING, DANGER, FULL_MD} from "./constants";

describe('MDEditor', () => {
    it('should create a block for each MarkDown formatted type', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': FULL_MD[0]
            }
        });

        Vue.nextTick(() => {
            expect(wrapper.vm.structuredContent.length).to.be.equal(FULL_MD[1].length);
            let mdContent = wrapper.findAll('.MDEditor__content');
            expect(mdContent.length).to.be.equal(FULL_MD[1].length);
            done();
        })
    });
    // Multiline Markdown text
    xit('should encode HTML from Markdown', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': 'Je suis un paragraphe !'
            }
        });

        Vue.nextTick(() => {
            /** structuredContent **/
            expect(true).to.be.equal(true);
            done();
        })
    });
    xit('should decode Markdown from HTML', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': 'Je suis un paragraphe !'
            }
        });

        Vue.nextTick(() => {
            expect(true).to.be.equal(true);
            done();
        })
    });
});

describe('MDEditor.codec', () => {
    // Paragraph
    it('should encode <p> from Markdown', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': P[0]
            }
        });

        Vue.nextTick(() => {
            /** structuredContent **/
            expect(wrapper.vm.structuredContent[0].content).to.be.equal(P[1].content);
            expect(wrapper.vm.structuredContent[0].type).to.be.equal(P[1].type);
            expect(wrapper.vm.structuredContent[0].layout).to.be.deep.equal(P[1].layout);
            expect(wrapper.vm.structuredContent[0].computed).to.be.equal(P[1].computed);

            /** HTML **/
            let mdContent = wrapper.findAll('.MDEditor__content');
            expect(mdContent.at(0).element.tagName).to.be.equal('P');
            expect(mdContent.at(0).text()).to.be.equal(P[1].content);
            done();
        })
    });
    it('should decode Markdown from <p>', () => {
        let wrapper = mount(MDEditor);
        let structuredContent = [P[1]];
        const md = wrapper.vm.codec.decodeMDFrom(structuredContent);

        expect(md).to.be.equal(P[0])
    });

    // H1
    it('should encode <h1> from Markdown', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': H1[0]
            }
        });

        Vue.nextTick(() => {
           /** structuredContent **/
            expect(wrapper.vm.structuredContent[0].content).to.be.equal(H1[1].content);
            expect(wrapper.vm.structuredContent[0].type).to.be.equal(H1[1].type);
            expect(wrapper.vm.structuredContent[0].layout).to.be.deep.equal(H1[1].layout);
            expect(wrapper.vm.structuredContent[0].computed).to.be.equal(H1[1].computed);

            /** HTML **/
            let mdContent = wrapper.findAll('.MDEditor__content');
            expect(mdContent.at(0).element.tagName).to.be.equal('H1');
            expect(mdContent.at(0).text()).to.be.equal(H1[1].content);
            done();
        })
    });
    it('should decode Markdown from <h1>', () => {
        let wrapper = mount(MDEditor);
        let structuredContent = [H1[1]];
        const md = wrapper.vm.codec.decodeMDFrom(structuredContent);

        expect(md).to.be.equal(H1[0])
    });

    // H2
    it('should encode <h2> from Markdown', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': H2[0]
            }
        });

        Vue.nextTick(() => {
           /** structuredContent **/
            expect(wrapper.vm.structuredContent[0].content).to.be.equal(H2[1].content);
            expect(wrapper.vm.structuredContent[0].type).to.be.equal(H2[1].type);
            expect(wrapper.vm.structuredContent[0].layout).to.be.deep.equal(H2[1].layout);
            expect(wrapper.vm.structuredContent[0].computed).to.be.equal(H2[1].computed);

            /** HTML **/
            let mdContent = wrapper.findAll('.MDEditor__content');
            expect(mdContent.at(0).element.tagName).to.be.equal('H2');
            expect(mdContent.at(0).text()).to.be.equal(H2[1].content);
            done();
        })
    });
    it('should decode Markdown from <h2>', () => {
        let wrapper = mount(MDEditor);
        let structuredContent = [H2[1]];
        const md = wrapper.vm.codec.decodeMDFrom(structuredContent);

        expect(md).to.be.equal(H2[0])
    });

    // H3
    it('should encode <h3> from Markdown', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': H3[0]
            }
        });

        Vue.nextTick(() => {
           /** structuredContent **/
            expect(wrapper.vm.structuredContent[0].content).to.be.equal(H3[1].content);
            expect(wrapper.vm.structuredContent[0].type).to.be.equal(H3[1].type);
            expect(wrapper.vm.structuredContent[0].layout).to.be.deep.equal(H3[1].layout);
            expect(wrapper.vm.structuredContent[0].computed).to.be.equal(H3[1].computed);

            /** HTML **/
            let mdContent = wrapper.findAll('.MDEditor__content');
            expect(mdContent.at(0).element.tagName).to.be.equal('H3');
            expect(mdContent.at(0).text()).to.be.equal(H3[1].content);
            done();
        })
    });
    it('should decode Markdown from <h3>', () => {
        let wrapper = mount(MDEditor);
        let structuredContent = [H3[1]];
        const md = wrapper.vm.codec.decodeMDFrom(structuredContent);

        expect(md).to.be.equal(H3[0])
    });
    
    // QUOTE
    it('should encode <blockquote> from Markdown', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': QUOTE[0]
            }
        });

        Vue.nextTick(() => {
           /** structuredContent **/
            expect(wrapper.vm.structuredContent[0].content).to.be.equal(QUOTE[1].content);
            expect(wrapper.vm.structuredContent[0].type).to.be.equal(QUOTE[1].type);
            expect(wrapper.vm.structuredContent[0].layout).to.be.deep.equal(QUOTE[1].layout);
            expect(wrapper.vm.structuredContent[0].computed).to.be.equal(QUOTE[1].computed);

            /** HTML **/
            let mdContent = wrapper.findAll('.MDEditor__content');
            expect(mdContent.at(0).element.tagName).to.be.equal('BLOCKQUOTE');
            expect(mdContent.at(0).text()).to.be.equal(QUOTE[1].content);
            done();
        })
    });
    it('should decode Markdown from <blockquote>', () => {
        let wrapper = mount(MDEditor);
        let structuredContent = [QUOTE[1]];
        const md = wrapper.vm.codec.decodeMDFrom(structuredContent);

        expect(md).to.be.equal(QUOTE[0])
    });    
    
    // INFO
    it('should encode <p> (INFO) from Markdown', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': INFO[0]
            }
        });

        Vue.nextTick(() => {
           /** structuredContent **/
            expect(wrapper.vm.structuredContent[0].content).to.be.equal(INFO[1].content);
            expect(wrapper.vm.structuredContent[0].type).to.be.equal(INFO[1].type);
            expect(wrapper.vm.structuredContent[0].layout).to.be.deep.equal(INFO[1].layout);
            expect(wrapper.vm.structuredContent[0].computed).to.be.equal(INFO[1].computed);

            /** HTML **/
            let mdContent = wrapper.findAll('.MDEditor__content');
            expect(mdContent.at(0).element.tagName).to.be.equal('DIV');
            expect(mdContent.at(0).text()).to.be.equal('info ' + INFO[1].content);
            done();
        })
    });
    it('should decode Markdown from <p> (INFO)', () => {
        let wrapper = mount(MDEditor);
        let structuredContent = [INFO[1]];
        const md = wrapper.vm.codec.decodeMDFrom(structuredContent);

        expect(md).to.be.equal(INFO[0])
    });
    
    // WARNING
    it('should encode <p> (WARNING) from Markdown', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': WARNING[0]
            }
        });

        Vue.nextTick(() => {
           /** structuredContent **/
            expect(wrapper.vm.structuredContent[0].content).to.be.equal(WARNING[1].content);
            expect(wrapper.vm.structuredContent[0].type).to.be.equal(WARNING[1].type);
            expect(wrapper.vm.structuredContent[0].layout).to.be.deep.equal(WARNING[1].layout);
            expect(wrapper.vm.structuredContent[0].computed).to.be.equal(WARNING[1].computed);

            /** HTML **/
            let mdContent = wrapper.findAll('.MDEditor__content');
            expect(mdContent.at(0).element.tagName).to.be.equal('DIV');
            expect(mdContent.at(0).text()).to.be.equal('warning ' + WARNING[1].content);
            done();
        })
    });
    it('should decode Markdown from <p> (WARNING)', () => {
        let wrapper = mount(MDEditor);
        let structuredContent = [WARNING[1]];
        const md = wrapper.vm.codec.decodeMDFrom(structuredContent);

        expect(md).to.be.equal(WARNING[0])
    });

    // DANGER
    it('should encode <p> (DANGER) from Markdown', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': DANGER[0]
            }
        });

        Vue.nextTick(() => {
           /** structuredContent **/
            expect(wrapper.vm.structuredContent[0].content).to.be.equal(DANGER[1].content);
            expect(wrapper.vm.structuredContent[0].type).to.be.equal(DANGER[1].type);
            expect(wrapper.vm.structuredContent[0].layout).to.be.deep.equal(DANGER[1].layout);
            expect(wrapper.vm.structuredContent[0].computed).to.be.equal(DANGER[1].computed);

            /** HTML **/
            let mdContent = wrapper.findAll('.MDEditor__content');
            expect(mdContent.at(0).element.tagName).to.be.equal('DIV');
            expect(mdContent.at(0).text()).to.be.equal('danger ' + DANGER[1].content);
            done();
        })
    });
    it('should decode Markdown from <p> (DANGER)', () => {
        let wrapper = mount(MDEditor);
        let structuredContent = [DANGER[1]];
        const md = wrapper.vm.codec.decodeMDFrom(structuredContent);

        expect(md).to.be.equal(DANGER[0])
    });

    // LIST
    it('should encode <ul> from Markdown', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': UL[0]
            }
        });

        Vue.nextTick(() => {
            /** structuredContent **/
            expect(wrapper.vm.structuredContent[0].content).to.be.deep.equal(UL[1].content);
            expect(wrapper.vm.structuredContent[0].type).to.be.equal(UL[1].type);
            expect(wrapper.vm.structuredContent[0].layout).to.be.deep.equal(UL[1].layout);
            expect(wrapper.vm.structuredContent[0].computed).to.be.deep.equal(UL[1].computed);

            /** HTML **/
            let mdContent = wrapper.findAll('.MDEditor__content');
            expect(mdContent.at(0).element.tagName).to.be.equal('UL');
            expect(mdContent.at(0).text()).to.be.equal(UL[1].content.join(''));
            done();
        })
    });
    it('should decode Markdown from <ul>', () => {
        let wrapper = mount(MDEditor);
        let structuredContent = [UL[1]];
        const md = wrapper.vm.codec.decodeMDFrom(structuredContent);

        expect(md).to.be.equal("- First i**tem**\n- Secon*d* item\n- Third item\n\n")
    });
    it('should encode <ol> from Markdown', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': OL[0]
            }
        });

        Vue.nextTick(() => {
            /** structuredContent **/
            expect(wrapper.vm.structuredContent[0].content).to.be.deep.equal(OL[1].content);
            expect(wrapper.vm.structuredContent[0].type).to.be.equal(OL[1].type);
            expect(wrapper.vm.structuredContent[0].layout).to.be.deep.equal(OL[1].layout);
            expect(wrapper.vm.structuredContent[0].computed).to.be.deep.equal(OL[1].computed);

            /** HTML **/
            let mdContent = wrapper.findAll('.MDEditor__content');
            expect(mdContent.at(0).element.tagName).to.be.equal('OL');
            expect(mdContent.at(0).text()).to.be.equal(OL[1].content.join(''));
            done();
        })
    });
    it('should decode Markdown from <ul>', () => {
        let wrapper = mount(MDEditor);
        let structuredContent = [OL[1]];
        const md = wrapper.vm.codec.decodeMDFrom(structuredContent);

        expect(md).to.be.equal("1. First item\n2. Second item\n3. Third item\n\n")
    });

    // ALL
    it('should encode html from Markdown', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': FULL_MD[0]
            }
        });

        Vue.nextTick(() => {
           /** structuredContent **/
           for (let i=0; i < wrapper.vm.structuredContent.length; i++) {
               expect(wrapper.vm.structuredContent[i].content).to.be.deep.equal(FULL_MD[1][i].content);
               expect(wrapper.vm.structuredContent[i].type).to.be.equal(FULL_MD[1][i].type);
               expect(wrapper.vm.structuredContent[i].layout).to.be.deep.equal(FULL_MD[1][i].layout);
               expect(wrapper.vm.structuredContent[i].computed).to.be.deep.equal(FULL_MD[1][i].computed);
           }
            done();
        })
    });
    it('should decode Markdown from html', () => {
        let wrapper = mount(MDEditor);
        let structuredContent = FULL_MD[1];
        const md = wrapper.vm.codec.decodeMDFrom(structuredContent);

        expect(md).to.be.equal(FULL_MD[2])
    });
});

describe('MDEditor.blocks', () => {
    it('should return the correct block index corresponding to the given id', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': FULL_MD[0]
            }
        });
        Vue.nextTick(() => {
            for (let i=0; i<FULL_MD[1].length; i++) {
                expect(wrapper.vm.blocks.getBlockIndex(wrapper.vm.structuredContent[i].id)).to.be.equal(i);
            }
            expect(wrapper.vm.blocks.getBlockIndex('Wrong id')).to.be.equal(-1);
            done();
        })
    });

    // it('should change the currentItemIndex on select block', done => {
    //     let wrapper = mount(MDEditor, {
    //         propsData: {
    //             'value': FULL_MD[0]
    //         }
    //     });
    //
    //     Vue.nextTick(() => {
    //         expect(true).to.be.equal(true);
    //         done();
    //     })
    // });

    it('should allow to add a block', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': FULL_MD[0]
            }
        });

        Vue.nextTick(() => {
            wrapper.vm.blocks.addBlock(2);
            expect(wrapper.vm.structuredContent.length).to.be.equal(16);
            expect(wrapper.vm.structuredContent[2].content).to.be.equal(NEW_BLOCK[1].content);
            expect(wrapper.vm.structuredContent[2].type).to.be.equal(NEW_BLOCK[1].type);
            expect(wrapper.vm.structuredContent[2].layout).to.be.deep.equal(NEW_BLOCK[1].layout);
            expect(wrapper.vm.structuredContent[2].computed).to.be.equal(NEW_BLOCK[1].computed);
            done();
        })
    });

    it('should allow to remove a block', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': FULL_MD[0]
            }
        });

        Vue.nextTick(() => {
            wrapper.vm.blocks.deleteBlockAt(2);
            expect(wrapper.vm.structuredContent.length).to.be.equal(14);
            expect(wrapper.vm.structuredContent[2].content).to.be.equal(FULL_MD[1][3].content);
            expect(wrapper.vm.structuredContent[2].type).to.be.equal(FULL_MD[1][3].type);
            expect(wrapper.vm.structuredContent[2].layout).to.be.deep.equal(FULL_MD[1][3].layout);
            expect(wrapper.vm.structuredContent[2].computed).to.be.equal(FULL_MD[1][3].computed);
            done();
        })
    });

    it('should allow to get text from block at index', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': FULL_MD[0]
            }
        });

        Vue.nextTick(() => {
            let text = wrapper.vm.blocks.getTextAt(1, 19, 27);
            expect(text).to.be.equal(FULL_MD[1][1].content.slice(19, 27));
            text = wrapper.vm.blocks.getTextAt(0, 0, 5);
            expect(text).to.be.equal(FULL_MD[1][0].content.slice(0, 5));
            text = wrapper.vm.blocks.getTextAt(3, 0, 5);
            expect(text).to.be.equal(FULL_MD[1][3].content.slice(0, 5));
            done();
        })
    });

    it('should allow to insert text inside a block', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': FULL_MD[0]
            }
        });
        Vue.nextTick(() => {
            // p block
            let newText = FULL_MD[1][3].content;
            let newLayout = FULL_MD[1][3].layout;
            let newComputed = FULL_MD[1][3].computed;

            wrapper.vm.blocks.insertAt(3, 5, ' new text', ['-', 'u', 'u', '-', 'i', 'i', '-', 'b', 'b']);

            newText = newText.slice(0, 5) + ' new text' + newText.slice(5, newText.length);
            newLayout.splice(5, 0, ...['-', 'u', 'u', '-', 'i', 'i', '-', 'b', 'b']);
            newComputed = newComputed.slice(0, 5) + ' <u>ne</u>w<i> t</i>e<b>xt</b>' + newComputed.slice(5);

            expect(wrapper.vm.structuredContent[3].content).to.be.equal(newText);
            expect(wrapper.vm.structuredContent[3].layout).to.be.deep.equal(newLayout);
            expect(wrapper.vm.structuredContent[3].computed).to.be.equal(newComputed);

            // list block
            newText = FULL_MD[1][12].content;
            newLayout = FULL_MD[1][12].layout;
            newComputed = FULL_MD[1][12].computed;

            wrapper.vm.blocks.insertAt(12, 2, ' new text', ['-', 'u', 'u', '-', 'i', 'i', '-', 'b', 'b'], 2);

            newText[2] = newText[2].slice(0, 2) + ' new text' + newText[2].slice(2, newText[2].length);
            newLayout[2].splice(2, 0, ...['-', 'u', 'u', '-', 'i', 'i', '-', 'b', 'b']);
            newComputed[2] = newComputed[2].slice(0, 2) + ' <u>ne</u>w<i> t</i>e<b>xt</b>' + newComputed[2].slice(2);

            expect(wrapper.vm.structuredContent[12].content).to.be.deep.equal(newText);
            expect(wrapper.vm.structuredContent[12].layout).to.be.deep.equal(newLayout);
            expect(wrapper.vm.structuredContent[12].computed).to.be.deep.equal(newComputed);
            done();
        })
    });

    it('should allow to remove text from a block', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': FULL_MD[0]
            }
        });

        Vue.nextTick(() => {
            wrapper.vm.blocks.removeAt(2, 5, 30);
            expect(wrapper.vm.structuredContent[2].content).to.be.equal('codé ue');
            expect(wrapper.vm.structuredContent[2].layout).to.be.deep.equal(['-', '-', '-', '-', '-', '-', '-']);
            expect(wrapper.vm.structuredContent[2].computed).to.be.equal('codé ue');

            wrapper.vm.blocks.removeAt(12, 2, 5, 2);
            expect(wrapper.vm.structuredContent[12].content).to.be.deep.equal(['First item', 'Second item', 'Th item']);
            expect(wrapper.vm.structuredContent[12].layout).to.be.deep.equal([['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
                ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'], ['-', '-', '-', '-', '-', '-', '-']]);
            expect(wrapper.vm.structuredContent[12].computed).to.be.deep.equal(['First item', 'Second item', 'Th item']);

            done();
        })
    });

    it('should allow to remove item from a list block', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': FULL_MD[0]
            }
        });

        Vue.nextTick(() => {
            wrapper.vm.blocks.removeItemAt(12, 2);
            expect(wrapper.vm.structuredContent[12].content).to.be.deep.equal(['First item', 'Second item']);
            expect(wrapper.vm.structuredContent[12].layout).to.be.deep.equal([['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
                ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']]);
            expect(wrapper.vm.structuredContent[12].computed).to.be.deep.equal(['First item', 'Second item']);

            done();
        })
    });

    it('should allow to merge a block with the precedent one', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': FULL_MD[0]
            }
        });

        Vue.nextTick(() => {
            wrapper.vm.blocks.mergeBlockWithPrecedent(1);
            expect( wrapper.vm.structuredContent.length).to.be.equal(14);
            expect(wrapper.vm.structuredContent[0].content).to.be.equal(FULL_MD[1][0].content + FULL_MD[1][1].content);
            expect(wrapper.vm.structuredContent[0].layout).to.be.deep.equal(FULL_MD[1][0].layout.concat(FULL_MD[1][1].layout));
            // Checking also format merge
            expect(wrapper.vm.structuredContent[0].computed).to.be.equal('Petit éditeur <b>WYSIWYGUti</b>lisable avec du markdown ou du RichText');

            // Checking list behavior
            wrapper.vm.blocks.mergeBlockWithPrecedent(12);
            expect( wrapper.vm.structuredContent.length).to.be.equal(13);
            expect(wrapper.vm.structuredContent[11].content).to.be.deep.equal(['First item', 'Second item', 'Third itemFirst itemSecond itemThird item']);
            expect(wrapper.vm.structuredContent[11].layout).to.be.deep.equal([['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'], ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
                ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'b', 'b', 'b', '-', '-', '-', '-', '-', 'i', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']]);
            expect(wrapper.vm.structuredContent[11].computed).to.be.deep.equal(['First item', 'Second item', 'Third itemFirst i<b>tem</b>Secon<i>d</i> itemThird item']);
            done();
        })
    });

    it('should allow to merge an item with the precedent one (list block)', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': FULL_MD[0]
            }
        });

        Vue.nextTick(() => {
            wrapper.vm.blocks.mergeItemWithPrecedent(13, 2);
            expect( wrapper.vm.structuredContent.length).to.be.equal(15);
            expect(wrapper.vm.structuredContent[13].content).to.be.deep.equal(['First item', 'Second itemThird item']);
            expect(wrapper.vm.structuredContent[13].layout).to.be.deep.equal([['-', '-', '-', '-', '-', '-', '-', 'b', 'b', 'b'],
                ['-', '-', '-', '-', '-', 'i', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']]);
            // Checking also format merge
            expect(wrapper.vm.structuredContent[13].computed).to.be.deep.equal(['First i<b>tem</b>', 'Secon<i>d</i> itemThird item']);

            done();
        })
    });

    it('should allow to split a text block', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': FULL_MD[0]
            }
        });

        Vue.nextTick(() => {
            wrapper.vm.blocks.splitBlock(0, 17);
            expect( wrapper.vm.structuredContent.length).to.be.equal(16);

            expect(wrapper.vm.structuredContent[0].content).to.be.equal(FULL_MD[1][0].content.slice(0, 17));
            expect(wrapper.vm.structuredContent[1].content).to.be.equal(FULL_MD[1][0].content.slice(17));

            expect(wrapper.vm.structuredContent[0].layout).to.be.deep.equal(FULL_MD[1][0].layout.slice(0, 17));
            expect(wrapper.vm.structuredContent[1].layout).to.be.deep.equal(FULL_MD[1][0].layout.slice(17));

            // Checking also format splitting
            expect(wrapper.vm.structuredContent[0].computed).to.be.equal('Petit éditeur <b>WYS</b>');
            expect(wrapper.vm.structuredContent[1].computed).to.be.equal('<b>IWYG</b>');

            done();
        })
    });

    it('should allow to split a list block', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': FULL_MD[0]
            }
        });

        Vue.nextTick(() => {
            wrapper.vm.blocks.splitListBlock(13, 5, 1);
            expect( wrapper.vm.structuredContent.length).to.be.equal(15);

            expect(wrapper.vm.structuredContent[13].content).to.be.deep.equal(['First item', 'Secon','d item', 'Third item']);

            expect(wrapper.vm.structuredContent[13].layout).to.be.deep.equal([['-', '-', '-', '-', '-', '-', '-', 'b', 'b', 'b'], ['-', '-', '-', '-', '-'], ['i', '-', '-', '-', '-', '-'], ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-']]);

            // Checking also format splitting
            expect(wrapper.vm.structuredContent[13].computed).to.be.deep.equal(['First i<b>tem</b>', 'Secon', '<i>d</i> item', 'Third item']);
            done();
        })
    });

    it('should allow to change a block type', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': FULL_MD[0]
            }
        });

        Vue.nextTick(() => {
            wrapper.vm.internal.currentItemIndex = 3;
            wrapper.vm.blocks.changeBlockType( 'ul');
            expect( wrapper.vm.structuredContent.length).to.be.equal(15);

            expect(wrapper.vm.structuredContent[3].type).to.be.equal('ul');
            expect(wrapper.vm.structuredContent[3].content).to.be.deep.equal(["Enjoy"]);
            expect(wrapper.vm.structuredContent[3].layout).to.be.deep.equal([['-', '-', '-', '-', '-']]);
            expect(wrapper.vm.structuredContent[3].computed).to.be.deep.equal(['Enjoy']);


            wrapper.vm.blocks.changeBlockType( 'ol');
            expect(wrapper.vm.structuredContent[3].type).to.be.equal('ol');
            expect(wrapper.vm.structuredContent[3].content).to.be.deep.equal(["Enjoy"]);
            expect(wrapper.vm.structuredContent[3].layout).to.be.deep.equal([['-', '-', '-', '-', '-']]);
            expect(wrapper.vm.structuredContent[3].computed).to.be.deep.equal(['Enjoy']);

            wrapper.vm.blocks.changeBlockType( 'p');
            expect(wrapper.vm.structuredContent[3].type).to.be.equal('p');
            expect(wrapper.vm.structuredContent[3].content).to.be.deep.equal("Enjoy");
            expect(wrapper.vm.structuredContent[3].layout).to.be.deep.equal(['-', '-', '-', '-', '-']);
            expect(wrapper.vm.structuredContent[3].computed).to.be.deep.equal('Enjoy');

            wrapper.vm.internal.currentItemIndex = 13;

            wrapper.vm.blocks.changeBlockType( 'p');
            expect(wrapper.vm.structuredContent[13].type).to.be.equal('p');
            expect(wrapper.vm.structuredContent[13].content).to.be.deep.equal('First itemSecond itemThird item');
            expect(wrapper.vm.structuredContent[13].layout).to.be.deep.equal(['-', '-', '-', '-', '-', '-', '-', 'b', 'b', 'b', '-', '-', '-', '-', '-', 'i', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']);
            expect(wrapper.vm.structuredContent[13].computed).to.be.deep.equal('First i<b>tem</b>Secon<i>d</i> itemThird item');

            done();
        })
    });
});

describe('MDEditor.importing', () => {
    xit('should allow user to paste Word formatted text', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': 'Je suis un paragraphe !'
            }
        });

        Vue.nextTick(() => {
            expect(true).to.be.equal(true);
            done();
        })
    });
    xit('should allow user to paste HTML formatted text', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': 'Je suis un paragraphe !'
            }
        });

        Vue.nextTick(() => {
            expect(true).to.be.equal(true);
            done();
        })
    });
})

describe('MDEditor.history', () => {
    it('should allow undo and redo snapshots of structuredContent state', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': 'Je suis un paragraphe !'
            }
        });
        Vue.nextTick(() => {
            expect(true).to.be.equal(true);
            expect(wrapper.vm.structuredContent).to.be.deep.equal(wrapper.vm.history.states[0]);
            expect(wrapper.vm.history.states.length).to.be.equal(1);

            wrapper.vm.blocks.addBlock(0);
            wrapper.vm.history.storeState();
            expect(wrapper.vm.structuredContent).to.be.deep.equal(wrapper.vm.history.states[1]);
            expect(wrapper.vm.history.states.length).to.be.equal(2);

            wrapper.vm.history.undoState();
            expect(wrapper.vm.structuredContent).to.be.deep.equal(wrapper.vm.history.states[0]);
            expect(wrapper.vm.history.states.length).to.be.equal(2);

            wrapper.vm.history.redoState();
            expect(wrapper.vm.structuredContent).to.be.deep.equal(wrapper.vm.history.states[1]);
            expect(wrapper.vm.history.states.length).to.be.equal(2);

            done();
        })
    });
})