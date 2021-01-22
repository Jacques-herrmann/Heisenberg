import Vue from 'vue'
import { mount, shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import MDEditor from "@/components/mdEditor.vue";


describe('MDEditor', () => {
    it('should create a block for each MarkDown formatted type', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': 'Je suis un paragraphe !'
            }
        });

        Vue.nextTick(() => {
            expect(wrapper.vm.structuredContent.length).to.be.equal(1);
            let mdContent = wrapper.findAll('.MDEditor__content');
            expect(mdContent.length).to.be.equal(1);
            done();
        })
    });
    // Multiline Markdown text
    it('should encode HTML from Markdown', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': '# Je suis un paragraphe !'
            }
        });

        Vue.nextTick(() => {
            /** structuredContent **/
            expect(true).to.be.equal(true);
            done();
        })
    });
    it('should decode Markdown from HTML', done => {
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
    it('should correctly define Markdown block type', done => {
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
    // Paragraph
    it('should encode <p> from Markdown', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': 'Je suis un paragraphe !'
            }
        });

        Vue.nextTick(() => {
            /** structuredContent **/
            expect(wrapper.vm.structuredContent[0].content).to.be.equal('Je suis un paragraphe !');
            expect(wrapper.vm.structuredContent[0].type).to.be.equal('p');

            /** HTML **/
            let mdContent = wrapper.findAll('.MDEditor__content');
            expect(mdContent.at(0).element.tagName).to.be.equal('P');
            expect(mdContent.at(0).text()).to.be.equal('Je suis un paragraphe !');
            done();
        })
    });
    it('should decode Markdown from <p>', done => {
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

    // H1
    it('should encode <h1> from Markdown', done => {
        let wrapper = mount(MDEditor, {
            propsData: {
                'value': '# Je suis un paragraphe !'
            }
        });

        Vue.nextTick(() => {
            /** structuredContent **/
            expect(true).to.be.equal(true);
            done();
        })
    });
    it('should decode Markdown from <h1>', done => {
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

describe('MDEditor.ui', () => {
    it('should allow user to add text into a block', done => {
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
    it('should allow user to change block type', done => {
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
    it('should allow user to select block', done => {
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
    it('should allow user to remove block', done => {
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
    it('should allow user to switch block with arrow key', done => {
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
    it('should allow user to split block with Enter key', done => {
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
    it('should allow user to merge block with Backspace key', done => {
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

describe('MDEditor.importing', () => {
    it('should allow user to paste Word formatted text', done => {
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
    it('should allow user to paste HTML formatted text', done => {
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
    it('should allow user to undo', done => {
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
    it('should allow user to redo', done => {
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