(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "flui"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var flui_1 = require("flui");
    var renderer = new flui_1.CanvasRenderer(document.getElementById('canvas'));
    var gui = new flui_1.GUI(renderer);
    var doc = gui.document;
    doc.documentElement.style.position = 'absolute';
    doc.documentElement.style.left = 0;
    doc.documentElement.style.top = 0;
    doc.documentElement.style.right = 0;
    doc.documentElement.style.bottom = 0;
    doc.body.style.position = 'absolute';
    doc.body.style.left = 0;
    doc.body.style.top = 0;
    doc.body.style.right = 0;
    doc.body.style.bottom = 0;
    var root = doc.createElement('div');
    root.id = 'root';
    root.style.position = 'absolute';
    root.style.width = '100%';
    root.style.height = '100%';
    root.style.flexDirection = 'column';
    root.style.backgroundColor = 'blue';
    root.style.font = '16px arial';
    root.style.flex = '0 1 auto';
    root.style.overflow = 'auto';
    doc.body.append(root);
    var menuBar = gui.createElement('div');
    menuBar.id = 'menubar';
    menuBar.style.padding = 2;
    menuBar.style.width = '100%';
    menuBar.style.height = 'auto';
    menuBar.style.flexFlow = 'row wrap';
    menuBar.style.overflow = 'hidden';
    menuBar.style.flex = '0 0 auto';
    menuBar.style.justifyContent = 'space-between';
    menuBar.style.alignItems = 'center';
    menuBar.style.color = 'yellow';
    menuBar.style.backgroundColor = 'rgb(128,0,255)';
    root.appendChild(menuBar);
    var bar2 = gui.createElement('div');
    bar2.id = 'bar2';
    bar2.style.padding = '30px';
    bar2.style.flexDirection = 'column';
    bar2.style.flex = '0 0 auto';
    bar2.style.backgroundColor = '#ccb333';
    root.appendChild(bar2);
    var input = gui.createElement('input');
    input.id = 'input';
    input.style.margin = '20px 0';
    input.style.flex = '0 0 auto';
    input.style.color = '#000000';
    bar2.appendChild(input);
    var btnNewText = gui.createElement('button');
    btnNewText.id = 'new-text';
    btnNewText.style.alignSelf = 'flex-start';
    btnNewText.style.paddingLeft = 20;
    btnNewText.style.paddingRight = 20;
    btnNewText.style.flex = '0 0 auto';
    btnNewText.append('new text');
    bar2.append(btnNewText);
    var btnRemoveText = gui.createElement('button');
    btnRemoveText.id = 'remove-text';
    btnRemoveText.style.alignSelf = 'flex-start';
    btnRemoveText.style.paddingLeft = 20;
    btnRemoveText.style.paddingRight = 20;
    btnRemoveText.style.flex = '0 0 auto';
    btnRemoveText.append('remove text');
    bar2.append(btnRemoveText);
    var bar3 = gui.createElement('div');
    bar3.id = 'bar3';
    bar3.style.padding = 10;
    bar3.style.width = 'auto';
    bar3.style.flex = 1;
    bar3.style.flexDirection = 'row';
    bar3.style.backgroundColor = '#33b380';
    bar3.style.overflow = 'auto';
    root.appendChild(bar3);
    var listbox = gui.createElement('div');
    listbox.id = 'listbox';
    listbox.style.width = 120;
    listbox.style.backgroundColor = '#991a4d';
    listbox.style.flexDirection = 'column';
    listbox.style.padding = 5;
    listbox.style.marginBottom = '15px';
    listbox.style.marginRight = '10px';
    listbox.style.flex = '0 0 auto';
    listbox.style.overflow = 'auto';
    listbox.style.justifyContent = 'flex-start';
    listbox.style.alignItems = 'flex-start';
    bar3.appendChild(listbox);
    for (var i = 0; i < 30; i++) {
        bar3.append("Hello, world (" + i + ")");
    }
    for (var i = 0; i < 60; i++) {
        menuBar.append('Hello');
        listbox.append("Hello " + i);
    }
    btnNewText.addEventListener('click', function () {
        bar3.prepend('new text');
    });
    btnRemoveText.addEventListener('click', function () {
        if (bar3.firstChild) {
            bar3.removeChild(bar3.firstChild);
        }
    });
    function renderGUI() {
        gui.render();
        requestAnimationFrame(renderGUI);
    }
    requestAnimationFrame(renderGUI);
});
//# sourceMappingURL=test1.js.map