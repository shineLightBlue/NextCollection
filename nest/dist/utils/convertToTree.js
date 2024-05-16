"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToTree = void 0;
const convertToTree = (menuList, parentId = null) => {
    const tree = [];
    for (let i = 0; i < menuList.length; i++) {
        if (menuList[i].parentId === parentId) {
            const children = (0, exports.convertToTree)(menuList, menuList[i].id);
            if (children.length) {
                menuList[i].children = children;
            }
            tree.push(menuList[i]);
        }
    }
    return tree;
};
exports.convertToTree = convertToTree;
//# sourceMappingURL=convertToTree.js.map