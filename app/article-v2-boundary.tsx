import { Component, type ReactNode } from "react";

/** Small loading boundary only; the V2 pages and stylesheet stay in their async chunk. */
export class ArticleV2Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <section role="alert"><h2>暂时无法打开这篇文章</h2><p>学习记录仍保存在本机。如果是首次离线打开，请联网后再试。</p><button type="button" onClick={() => window.location.reload()}>重新载入</button></section>;
    return this.props.children;
  }
}
