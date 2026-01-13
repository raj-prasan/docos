import { Extension } from '@tiptap/core'

declare module "@tiptap/core" {
  interface Commands<ReturnType>{
    lineHeight: {
      setLineHeight: (lineHeight: string) => ReturnType
      unsetLineHeight: () => ReturnType
    }
  }
}

export const LineHeightExtension = Extension.create({
  name: "lineHeight",
  addOptions() {
    return{
      types : ["paragraph", "heading"],
      defaultLineHeight: "normal"
    }
  },
  addGlobalAttributes(){
    return[
      {
        types: this.options.types,
        attributes:{
          lineHeight:{
            default: this.options.defaultLineHeight,
            renderHTML: attributes =>{
              if(!attributes.lineHeight){
                return {}
              }
              return{
                style: `line-height: ${attributes.lineHeight}`
              }
            },
            parseHTML: element =>{
              return element.style.lineHeight || this.options.defaultLineHeight
            }
          }
        }
      }
    ]
  },
  addCommands(){
    return {
      setLineHeight : (lineHeight: string) =>({tr, state, dispatch}) =>{
        const {selection} = state;
        tr = tr.setSelection(selection);
        const{from , to}  = selection;
        const allowedTypes = Array.isArray(this.options.types) ? this.options.types : [];
        state.doc.nodesBetween(from, to , (nodes, pos) =>{
          if(allowedTypes.includes(nodes.type.name)){
            tr = tr.setNodeMarkup(pos, undefined, {
              ...nodes.attrs,
              lineHeight
            })
          }
        })

        if(dispatch) dispatch(tr)
          return true

      },
      unsetLineHeight : () =>({tr, state , dispatch}) =>{
        const {selection} = state;
        tr = tr.setSelection(selection);
        const {from, to} = selection;
        const allowedTypes = Array.isArray(this.options.types) ? this.options.types : [];
        state.doc.nodesBetween(from , to , (node, pos) =>{
          if(allowedTypes.includes(node.type.name)){
            tr = tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              lineHeight: this.options.defaultLineHeight
            })
          }
        })
        if(dispatch) dispatch(tr)
          return true; 
      }
    }
  }
})