"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[886],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>m});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var u=n.createContext({}),s=function(e){var t=n.useContext(u),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=s(e.components);return n.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,u=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=s(a),m=r,y=p["".concat(u,".").concat(m)]||p[m]||c[m]||l;return a?n.createElement(y,o(o({ref:t},d),{},{components:a})):n.createElement(y,o({ref:t},d))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,o=new Array(l);o[0]=p;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var s=2;s<l;s++)o[s]=a[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}p.displayName="MDXCreateElement"},85162:(e,t,a)=>{a.d(t,{Z:()=>o});var n=a(67294),r=a(86010);const l="tabItem_Ymn6";function o(e){let{children:t,hidden:a,className:o}=e;return n.createElement("div",{role:"tabpanel",className:(0,r.Z)(l,o),hidden:a},t)}},74866:(e,t,a)=>{a.d(t,{Z:()=>S});var n=a(87462),r=a(67294),l=a(86010),o=a(12466),i=a(76775),u=a(91980),s=a(67392),d=a(50012);function c(e){return function(e){var t;return(null==(t=r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})))?void 0:t.filter(Boolean))??[]}(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:r}}=e;return{value:t,label:a,attributes:n,default:r}}))}function p(e){const{values:t,children:a}=e;return(0,r.useMemo)((()=>{const e=t??c(a);return function(e){const t=(0,s.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,a])}function m(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function y(e){let{queryString:t=!1,groupId:a}=e;const n=(0,i.k6)(),l=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:t,groupId:a});return[(0,u._X)(l),(0,r.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(n.location.search);t.set(l,e),n.replace({...n.location,search:t.toString()})}),[l,n])]}function f(e){const{defaultValue:t,queryString:a=!1,groupId:n}=e,l=p(e),[o,i]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=a.find((e=>e.default))??a[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:l}))),[u,s]=y({queryString:a,groupId:n}),[c,f]=function(e){let{groupId:t}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,l]=(0,d.Nk)(a);return[n,(0,r.useCallback)((e=>{a&&l.set(e)}),[a,l])]}({groupId:n}),k=(()=>{const e=u??c;return m({value:e,tabValues:l})?e:null})();(0,r.useLayoutEffect)((()=>{k&&i(k)}),[k]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);i(e),s(e),f(e)}),[s,f,l]),tabValues:l}}var k=a(72389);const h="tabList__CuJ",v="tabItem_LNqP";function b(e){let{className:t,block:a,selectedValue:i,selectValue:u,tabValues:s}=e;const d=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.o5)(),p=e=>{const t=e.currentTarget,a=d.indexOf(t),n=s[a].value;n!==i&&(c(t),u(n))},m=e=>{var t;let a=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const t=d.indexOf(e.currentTarget)+1;a=d[t]??d[0];break}case"ArrowLeft":{const t=d.indexOf(e.currentTarget)-1;a=d[t]??d[d.length-1];break}}null==(t=a)||t.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":a},t)},s.map((e=>{let{value:t,label:a,attributes:o}=e;return r.createElement("li",(0,n.Z)({role:"tab",tabIndex:i===t?0:-1,"aria-selected":i===t,key:t,ref:e=>d.push(e),onKeyDown:m,onClick:p},o,{className:(0,l.Z)("tabs__item",v,null==o?void 0:o.className,{"tabs__item--active":i===t})}),a??t)})))}function g(e){let{lazy:t,children:a,selectedValue:n}=e;const l=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===n));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},l.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function N(e){const t=f(e);return r.createElement("div",{className:(0,l.Z)("tabs-container",h)},r.createElement(b,(0,n.Z)({},e,t)),r.createElement(g,(0,n.Z)({},e,t)))}function S(e){const t=(0,k.Z)();return r.createElement(N,(0,n.Z)({key:String(t)},e))}},10703:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>u,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var n=a(87462),r=(a(67294),a(3905)),l=a(74866),o=a(85162);const i={title:"any",sidebar_custom_props:{code:!0}},u="Any",s={unversionedId:"schemas/any/index",id:"schemas/any/index",title:"any",description:"Defines an attribute containing any value. No validation is applied at run-time, and its type is resolved as unknown by default:",source:"@site/docs/4-schemas/5-any/index.md",sourceDirName:"4-schemas/5-any",slug:"/schemas/any/",permalink:"/docs/schemas/any/",draft:!1,tags:[],version:"current",frontMatter:{title:"any",sidebar_custom_props:{code:!0}},sidebar:"tutorialSidebar",previous:{title:"Custom Validation",permalink:"/docs/schemas/custom-validation/"},next:{title:"nul",permalink:"/docs/schemas/null/"}},d={},c=[{value:"Options",id:"options",level:2},{value:"<code>.required()</code>",id:"required",level:3},{value:"<code>.hidden()</code>",id:"hidden",level:3},{value:"<code>.key()</code>",id:"key",level:3},{value:"<code>.savedAs(...)</code>",id:"savedas",level:3},{value:"<code>.default(...)</code>",id:"default",level:3},{value:"<code>.link&lt;Schema&gt;(...)</code>",id:"linkschema",level:3},{value:"<code>.validate(...)</code>",id:"validate",level:3},{value:"<code>.castAs&lt;TYPE&gt;()</code>",id:"castastype",level:3}],p={toc:c};function m(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"any"},"Any"),(0,r.kt)("p",null,"Defines an attribute containing ",(0,r.kt)("strong",{parentName:"p"},"any value"),". No validation is applied at run-time, and its type is resolved as ",(0,r.kt)("inlineCode",{parentName:"p"},"unknown")," by default:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { any } from 'dynamodb-toolbox/attributes/any';\n\nconst pokemonSchema = schema({\n  ...\n  metadata: any(),\n});\n\ntype FormattedPokemon = FormattedItem<typeof PokemonEntity>;\n// => {\n//   ...\n//   metadata: unknown\n// }\n")),(0,r.kt)("h2",{id:"options"},"Options"),(0,r.kt)("h3",{id:"required"},(0,r.kt)("inlineCode",{parentName:"h3"},".required()")),(0,r.kt)("p",{style:{marginTop:"-15px"}},(0,r.kt)("i",null,(0,r.kt)("code",null,"string | undefined"))),(0,r.kt)("p",null,"Tags the attribute as ",(0,r.kt)("strong",{parentName:"p"},"required")," (at root level or within ",(0,r.kt)("a",{parentName:"p",href:"/docs/schemas/map/"},"Maps"),"). Possible values are:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("code",null,"'atLeastOnce' ",(0,r.kt)("i",null,"(default)")),": Required (starting value)"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"'always'"),": Always required (including updates)"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"'never'"),": Optional")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"// Equivalent\nconst metadataSchema = any()\nconst metadataSchema = any().required()\nconst metadataSchema = any({ required: 'atLeastOnce' })\n\n// shorthand for `.required('never')`\nconst metadataSchema = any().optional()\nconst metadataSchema = any({ required: 'never' })\n")),(0,r.kt)("h3",{id:"hidden"},(0,r.kt)("inlineCode",{parentName:"h3"},".hidden()")),(0,r.kt)("p",{style:{marginTop:"-15px"}},(0,r.kt)("i",null,(0,r.kt)("code",null,"boolean | undefined"))),(0,r.kt)("p",null,"Skips the attribute when formatting items:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"const metadataSchema = any().hidden()\nconst metadataSchema = any({ hidden: true })\n")),(0,r.kt)("h3",{id:"key"},(0,r.kt)("inlineCode",{parentName:"h3"},".key()")),(0,r.kt)("p",{style:{marginTop:"-15px"}},(0,r.kt)("i",null,(0,r.kt)("code",null,"boolean | undefined"))),(0,r.kt)("p",null,"Tags the attribute as needed to compute the primary key:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"// Note: The method also sets the `required` property to 'always'\n// (it is often the case in practice, you can still use `.optional()` if needed)\nconst metadataSchema = any().key()\nconst metadataSchema = any({\n  key: true,\n  required: 'always'\n})\n")),(0,r.kt)("h3",{id:"savedas"},(0,r.kt)("inlineCode",{parentName:"h3"},".savedAs(...)")),(0,r.kt)("p",{style:{marginTop:"-15px"}},(0,r.kt)("i",null,(0,r.kt)("code",null,"string"))),(0,r.kt)("p",null,"Renames the attribute during the ",(0,r.kt)("a",{parentName:"p",href:"/docs/schemas/actions/parse"},"transformation step")," (at root level or within ",(0,r.kt)("a",{parentName:"p",href:"/docs/schemas/map/"},"Maps"),"):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"const metadataSchema = any().savedAs('meta')\nconst metadataSchema = any({ savedAs: 'meta' })\n")),(0,r.kt)("h3",{id:"default"},(0,r.kt)("inlineCode",{parentName:"h3"},".default(...)")),(0,r.kt)("p",{style:{marginTop:"-15px"}},(0,r.kt)("i",null,(0,r.kt)("code",null,"ValueOrGetter<unknown>"))),(0,r.kt)("p",null,"Specifies default values for the attribute. See ",(0,r.kt)("a",{parentName:"p",href:"/docs/schemas/defaults-and-links/"},"Defaults and Links")," for more details:"),(0,r.kt)("admonition",{title:"Examples",type:"note"},(0,r.kt)(l.Z,{mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"put",label:"Put",mdxType:"TabItem"},(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"const metadataSchema = any().default({ any: 'value' })\n// \ud83d\udc47 Similar to\nconst metadataSchema = any().putDefault({ any: 'value' })\n// \ud83d\udc47 ...or\nconst metadataSchema = any({\n  defaults: {\n    key: undefined,\n    put: { any: 'value' },\n    update: undefined\n  }\n})\n\n// \ud83d\ude4c Getters also work!\nconst metadataSchema = any().default(() => ({\n  any: 'value'\n}))\n"))),(0,r.kt)(o.Z,{value:"key",label:"Key",mdxType:"TabItem"},(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"const metadataSchema = any().key().default('myKey')\n// \ud83d\udc47 Similar to\nconst metadataSchema = any().key().keyDefault('myKey')\n// \ud83d\udc47 ...or\nconst metadataSchema = any({\n  defaults: {\n    key: 'myKey',\n    // put & update defaults are not useful in `key` attributes\n    put: undefined,\n    update: undefined\n  },\n  key: true,\n  required: 'always'\n})\n"))),(0,r.kt)(o.Z,{value:"update",label:"Update",mdxType:"TabItem"},(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"const metadataSchema = any().updateDefault({\n  updated: true\n})\n// \ud83d\udc47 Similar to\nconst metadataSchema = any({\n  defaults: {\n    key: undefined,\n    put: undefined,\n    update: { updated: true }\n  }\n})\n"))))),(0,r.kt)("h3",{id:"linkschema"},(0,r.kt)("inlineCode",{parentName:"h3"},".link<Schema>(...)")),(0,r.kt)("p",{style:{marginTop:"-15px"}},(0,r.kt)("i",null,(0,r.kt)("code",null,"Link<SCHEMA, unknown>"))),(0,r.kt)("p",null,"Similar to ",(0,r.kt)("a",{parentName:"p",href:"#default"},(0,r.kt)("inlineCode",{parentName:"a"},".default(...)"))," but allows deriving the default value from other attributes. See ",(0,r.kt)("a",{parentName:"p",href:"/docs/schemas/defaults-and-links/"},"Defaults and Links")," for more details:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"const pokemonSchema = schema({\n  pokeTypes: string()\n}).and(prevSchema => ({\n  metadata: any().link<typeof prevSchema>(\n    // \ud83d\ude4c Correctly typed!\n    item => item.pokeTypes.join('#')\n  )\n}))\n")),(0,r.kt)("h3",{id:"validate"},(0,r.kt)("inlineCode",{parentName:"h3"},".validate(...)")),(0,r.kt)("p",{style:{marginTop:"-15px"}},(0,r.kt)("i",null,(0,r.kt)("code",null,"Validator<unknown>"))),(0,r.kt)("p",null,"Adds custom validation to the attribute. See ",(0,r.kt)("a",{parentName:"p",href:"/docs/schemas/custom-validation/"},"Custom Validation")," for more details:"),(0,r.kt)("admonition",{title:"Examples",type:"note"},(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"const metadataSchema = any().validate(\n  input => typeof input === 'object'\n)\n// \ud83d\udc47 Similar to\nconst metadataSchema = any().putValidate(\n  input => typeof input === 'object'\n)\n// \ud83d\udc47 ...or\nconst metadataSchema = any({\n  validators: {\n    key: undefined,\n    put: input => typeof input === 'object',\n    update: undefined\n  }\n})\n"))),(0,r.kt)("h3",{id:"castastype"},(0,r.kt)("inlineCode",{parentName:"h3"},".castAs<TYPE>()")),(0,r.kt)("p",{style:{marginTop:"-15px"}},(0,r.kt)("i",null,"(TypeScript only)")),(0,r.kt)("p",null,"Overrides the resolved type of the attribute:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"const metadataSchema = any().castAs<{ foo: 'bar' }>()\n")))}m.isMDXComponent=!0}}]);