// import { Plugin, PluginKey } from 'prosemirror-state';
// import { Decoration, DecorationSet } from 'prosemirror-view';
// import type { MilkdownPlugin } from '@milkdown/ctx';
// // import { editorViewCtx, pluginsCtx } from '@milkdown/core';

// export const runCodePluginKey = new PluginKey('run-code');

// export const runCodePlugin = new Plugin({
//   key: runCodePluginKey,
//   props: {
//     decorations(state) {
//       const decos: Decoration[] = [];
//       state.doc.descendants((node, pos) => {
//         if (node.type.name === 'fence') {
//           decos.push(
//             Decoration.node(pos, pos + node.nodeSize, {
//               class: 'code-block-with-run',
//             })
//           );
//         }
//         return true;
//       });
//       return DecorationSet.create(state.doc, decos);
//     },
//     handleDOMEvents: {
//       click(view, event) {
//         const t = event.target as HTMLElement;
//         if (t.classList.contains('run-button')) {
//           const codeEl = t.previousElementSibling as HTMLElement;
//           const code = codeEl.innerText;
//           const language = codeEl.getAttribute('data-language') || 'cpp';

//           fetch('/api/run', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ code, language }),
//           })
//             .then((r) => r.json())
//             .then((data) => {
//               const pre = document.createElement('pre');
//               pre.className = 'code-output';
//               pre.innerText = data.output || 'No output';
//               t.parentElement?.appendChild(pre);
//             })
//             .catch(() => {
//               const errPre = document.createElement('pre');
//               errPre.className = 'code-output';
//               errPre.innerText = 'Error running code';
//               t.parentElement?.appendChild(errPre);
//             });
//           return true;
//         }
//         return false;
//       },
//     },
//   },
//   view() {
//     return {
//       update(view) {
//         view.dom
//           .querySelectorAll<HTMLElement>('.code-block-with-run')
//           .forEach((block) => {
//             if (!block.querySelector('.run-button')) {
//               const btn = document.createElement('button');
//               btn.className = 'run-button';
//               btn.innerText = 'Run';
//               block.appendChild(btn);
//             }
//           });
//       },
//     };
//   },
// });

// // ✅ Wrap as MilkdownPlugin
// export const runCodeMilkdownPlugin: MilkdownPlugin = () => (ctx) => {
//   const oldPlugins = ctx.get(pluginsCtx);
//   ctx.set(pluginsCtx, [...oldPlugins, runCodePlugin]);
// };
