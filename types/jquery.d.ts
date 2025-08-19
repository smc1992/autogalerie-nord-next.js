interface JQuery {
  empty(): JQuery;
  off(events: string): JQuery;
  on(events: string, handler: Function): JQuery;
  find(selector: string): JQuery;
  width(): number;
  height(): number;
  show(): JQuery;
  hide(): JQuery;
  text(value?: string): JQuery | string;
  html(value?: string): JQuery | string;
  addClass(className: string): JQuery;
  removeClass(className: string): JQuery;
  hasClass(className: string): boolean;
  attr(name: string, value?: string): JQuery | string;
  css(property: string | object, value?: string): JQuery | string;
  val(value?: string): JQuery | string;
  append(content: string | Element): JQuery;
  remove(): JQuery;
  add(elements: Element[] | JQuery | Element): JQuery;
  each(callback: (index: number, element: Element) => void): JQuery;
  ready(callback: () => void): JQuery;
  [index: number]: Element;
  length: number;
}

interface JQueryStatic {
  (selector: string | Element | Window | Document | DocumentFragment | null): JQuery;
  fn: any;
  ready(callback: () => void): void;
}

interface Window {
  jQuery?: JQueryStatic;
  $?: JQueryStatic;
}
