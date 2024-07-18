"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7495],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),d=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=d(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=d(n),m=a,y=u["".concat(s,".").concat(m)]||u[m]||p[m]||o;return n?r.createElement(y,i(i({ref:t},c),{},{components:n})):r.createElement(y,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var d=2;d<o;d++)i[d]=n[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},92117:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var r=n(87462),a=(n(67294),n(3905));const o={title:"Installation"},i="Installation",l={unversionedId:"getting-started/installation/index",id:"getting-started/installation/index",title:"Installation",description:"DynamoDB-Toolbox has @aws-sdk/client-dynamodb and @aws-sdk/lib-dynamodb as peer dependencies, so you have to install them as well:",source:"@site/docs/1-getting-started/2-installation/index.md",sourceDirName:"1-getting-started/2-installation",slug:"/getting-started/installation/",permalink:"/docs/getting-started/installation/",draft:!1,tags:[],version:"current",frontMatter:{title:"Installation"},sidebar:"tutorialSidebar",previous:{title:"Overview",permalink:"/docs/getting-started/overview/"},next:{title:"Usage",permalink:"/docs/getting-started/usage/"}},s={},d=[],c={toc:d};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"installation"},"Installation"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"# npm\nnpm install dynamodb-toolbox\n\n# yarn\nyarn add dynamodb-toolbox\n")),(0,a.kt)("p",null,"DynamoDB-Toolbox has ",(0,a.kt)("inlineCode",{parentName:"p"},"@aws-sdk/client-dynamodb")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"@aws-sdk/lib-dynamodb")," as peer dependencies, so you have to install them as well:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"# npm\nnpm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb\n\n# yarn\nyarn add @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb\n")))}p.isMDXComponent=!0}}]);