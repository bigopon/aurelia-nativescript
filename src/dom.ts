import {View} from 'tns-core-modules/ui/core/view';

export interface NsElement {
  new(): View
}

export type NsElementResolver = () => NsElement;
export interface NsElementMetadata {
  skipAddToDom?: boolean
  insertChild?(parent: View, child: View, position?: number): boolean
  removeChild?(parent: View, child: View): boolean
  listenable?: string[]
  observableProperties?: { [x: string]: string }
}

const elementRegistry: Map<string, { resolver: NsElementResolver, metadata: NsElementMetadata }> = new Map();
const camelCaseSplit = /([a-z0-9])([A-Z])/g;

export const DOM = {
  Element: View,
  createElement(name: string): NsElement {
    return null;
  },
  registerElement,
  getViewClass,
  getViewMetadata
}

function registerElement(elementName: string, resolver: NsElementResolver, meta?: NsElementMetadata) {
  if (elementRegistry.has(elementName)) {
    throw new Error(`Element for ${elementName} already registered.`);
  } else {
    const entry = { resolver: resolver, metadata: meta };
    elementRegistry.set(elementName, entry);
    elementRegistry.set(elementName.toLowerCase(), entry);
    elementRegistry.set(elementName.replace(camelCaseSplit, "$1-$2").toLowerCase(), entry);
  }
}

function getViewClass(elementName: string): NsElement {
  const entry = elementRegistry.get(elementName) || elementRegistry.get(elementName.toLowerCase());
  if (!entry) {
      throw new TypeError(`No known component for element ${elementName}.`);
  }

  try {
      return entry.resolver();
  } catch (e) {
      throw new TypeError(`Could not load view for: ${elementName}.${e}`);
  }
}

const defaultViewMeta: NsElementMetadata = { skipAddToDom: false };
function getViewMetadata(nodeName: string): NsElementMetadata {
  const entry = elementRegistry.get(nodeName) || elementRegistry.get(nodeName.toLowerCase());
  return (entry && entry.metadata) || defaultViewMeta;
}

// Register default NativeScript components
// Note: ActionBar related components are registerd together with action-bar directives.
registerElement("AbsoluteLayout", () => require("tns-core-modules/ui/layouts/absolute-layout").AbsoluteLayout);
registerElement("ActivityIndicator", () => require("tns-core-modules/ui/activity-indicator").ActivityIndicator);
registerElement("Border", () => require("tns-core-modules/ui/border").Border);
registerElement("Button", () => require("tns-core-modules/ui/button").Button);
registerElement("ContentView", () => require("tns-core-modules/ui/content-view").ContentView);
registerElement("DatePicker", () => require("tns-core-modules/ui/date-picker").DatePicker, {
  listenable: ['load', 'unload'],
  observableProperties: {
    date: 'dateChange'
  }
});
registerElement("DockLayout", () => require("tns-core-modules/ui/layouts/dock-layout").DockLayout);
registerElement("GridLayout", () => require("tns-core-modules/ui/layouts/grid-layout").GridLayout);
registerElement("HtmlView", () => require("tns-core-modules/ui/html-view").HtmlView);
registerElement("Image", () => require("tns-core-modules/ui/image").Image);
// Parse5 changes <Image> tags to <img>. WTF!
// Not if we use built in xml parser, but img is nice to have anw!
registerElement("img", () => require("tns-core-modules/ui/image").Image);
registerElement("Label", () => require("tns-core-modules/ui/label").Label);
registerElement("ListPicker", () => require("tns-core-modules/ui/list-picker").ListPicker, {
  listenable: ['load', 'unload'],
  observableProperties: {
    selectedIndex: 'selectedIndexChange'
  }
});
registerElement("ListView", () => require("tns-core-modules/ui/list-view").ListView);
registerElement("Page", () => require("tns-core-modules/ui/page").Page);
registerElement("Placeholder", () => require("tns-core-modules/ui/placeholder").Placeholder);
registerElement("Progress", () => require("tns-core-modules/ui/progress").Progress);
registerElement("ProxyViewContainer", () => require("tns-core-modules/ui/proxy-view-container").ProxyViewContainer);
registerElement("Repeater", () => require("tns-core-modules/ui/repeater").Repeater);
registerElement("ScrollView", () => require("tns-core-modules/ui/scroll-view").ScrollView);
registerElement("SearchBar", () => require("tns-core-modules/ui/search-bar").SearchBar, {
  listenable: ['touch', 'load', 'unload'],
  observableProperties: {
    text: 'textChange'
  }
});
registerElement("SegmentedBar", () => require("tns-core-modules/ui/segmented-bar").SegmentedBar, {
  listenable: ['load', 'unload'],
  observableProperties: {
    selectedIndex: 'selectedIndexChange'
  }
});
registerElement("SegmentedBarItem", () => require("tns-core-modules/ui/segmented-bar").SegmentedBarItem);
registerElement("Slider", () => require("tns-core-modules/ui/slider").Slider, {
  listenable: ['load', 'unload'],
  observableProperties: {
    value: 'valueChange'
  }
});
registerElement("StackLayout", () => require("tns-core-modules/ui/layouts/stack-layout").StackLayout);
registerElement("FlexboxLayout", () => require("tns-core-modules/ui/layouts/flexbox-layout").FlexboxLayout);
registerElement("Switch", () => require("tns-core-modules/ui/switch").Switch, {
  listenable: ['touch', 'load', 'unload'],
  observableProperties: {
    checked: 'checkedChange'
  }
});
registerElement("TabView", () => require("tns-core-modules/ui/tab-view").TabView, {
  listenable: ['load', 'unload'],
  observableProperties: {
    selectedIndex: 'selectedIndexChange'
  }
});
registerElement("TextField", () => require("tns-core-modules/ui/text-field").TextField, {
  listenable: ['touch', 'load', 'unload'],
  observableProperties: {
    text: 'textChange'
  }
});
registerElement("TextView", () => require("tns-core-modules/ui/text-view").TextView, {
  listenable: ['touch', 'load', 'unload'],
  observableProperties: {
    text: 'textChange'
  }
});
registerElement("TimePicker", () => require("tns-core-modules/ui/time-picker").TimePicker, {
  listenable: ['load', 'unload'],
  observableProperties: {
    time: 'timeChange'
  }
});
registerElement("WebView", () => require("tns-core-modules/ui/web-view").WebView);
registerElement("WrapLayout", () => require("tns-core-modules/ui/layouts/wrap-layout").WrapLayout);
registerElement("FormattedString", () => require("tns-core-modules/text/formatted-string").FormattedString);
registerElement("Span", () => require("tns-core-modules/text/span").Span);

registerElement("DetachedContainer", () => require("tns-core-modules/ui/proxy-view-container").ProxyViewContainer,
    { skipAddToDom: true });
