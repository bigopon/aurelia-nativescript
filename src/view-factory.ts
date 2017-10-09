export class ViewFactory {
  readonly astTree: ViewAstNode

  constructor(astTree: ViewAstNode) {
    this.astTree = astTree;
  }

  create() {

  }

  private walkAst(action) {
    let current: ViewAstNode = this.astTree;
    while (true) {
      
    }
  }
}

export class View {

}

export class ViewAstNode {
  /**
   * Name of the node
   */
  name: string
  /**
   * Attributes of an element
   */
  attributes: { [name: string]: string }
  /**
   * Children of an element
   */
  children: ViewAstNode[]
  /**
   * Text content of an element
   */
  content: string
}
