export const convertToTree = (menuList, parentId: number | null = null) => {
    const tree = [];

    for (let i = 0; i < menuList.length; i++) {
        if (menuList[i].parentId === parentId) {
            const children = convertToTree(menuList, menuList[i].id);
            if (children.length) {
                menuList[i].children = children;
            }
            tree.push(menuList[i]);
        }
    }
    return tree;
};
//   [
//     Menu {
//       id: 1,
//       menuName: '父菜单1',
//       orderNum: 1,
//       parentId: null,
//       menuType: 'M',
//       icon: 'menu',
//       component: 'aa/dd',
//       path: 'dd',
//       createBy: null,
//       createTime: 2024-04-10T02:00:00.668Z,
//       updateTime: 2024-04-10T02:08:04.205Z
//     },
//     Menu {
//       id: 2,
//       menuName: '父菜单2',
//       orderNum: 2,
//       parentId: null,
//       menuType: 'M',
//       icon: 'menu',
//       component: 'aa/dd',
//       path: 'dd',
//       createBy: null,
//       createTime: 2024-04-10T02:04:47.283Z,
//       updateTime: 2024-04-10T02:08:07.352Z
//     },
//     Menu {
//       id: 3,
//       menuName: '子菜单1.1',
//       orderNum: 1,
//       parentId: 1,
//       menuType: 'M',
//       icon: 'menu',
//       component: 'aa/dd',
//       path: 'dd',
//       createBy: null,
//       createTime: 2024-04-10T02:05:39.921Z,
//       updateTime: 2024-04-10T02:08:09.834Z
//     },
//     Menu {
//       id: 4,
//       menuName: '子菜单1.2',
//       orderNum: 1,
//       parentId: 1,
//       menuType: 'M',
//       icon: 'menu',
//       component: 'aa/dd',
//       path: 'dd',
//       createBy: null,
//       createTime: 2024-04-10T02:06:07.507Z,
//       updateTime: 2024-04-10T02:08:12.216Z
//     },
//     Menu {
//       id: 5,
//       menuName: '子菜单1.3',
//       orderNum: 3,
//       parentId: 1,
//       menuType: 'M',
//       icon: 'menu',
//       component: 'aa/dd',
//       path: 'dd',
//       createBy: null,
//       createTime: 2024-04-10T02:06:32.234Z,
//       updateTime: 2024-04-10T02:08:14.567Z
//     },
//     Menu {
//       id: 6,
//       menuName: '子菜单2.1',
//       orderNum: 1,
//       parentId: 2,
//       menuType: 'M',
//       icon: 'menu',
//       component: 'aa/dd',
//       path: 'dd',
//       createBy: null,
//       createTime: 2024-04-10T02:06:53.884Z,
//       updateTime: 2024-04-10T02:08:20.696Z
//     },
//     Menu {
//       id: 7,
//       menuName: '子菜单2.2',
//       orderNum: 1,
//       parentId: 2,
//       menuType: 'M',
//       icon: 'menu',
//       component: 'aa/dd',
//       path: 'dd',
//       createBy: null,
//       createTime: 2024-04-10T02:07:09.686Z,
//       updateTime: 2024-04-10T02:08:23.226Z
//     },
//     Menu {
//       id: 8,
//       menuName: '子菜单2.3',
//       orderNum: 1,
//       parentId: 2,
//       menuType: 'M',
//       icon: 'menu',
//       component: 'aa/dd',
//       path: 'dd',
//       createBy: null,
//       createTime: 2024-04-10T02:07:15.304Z,
//       updateTime: 2024-04-10T02:08:26.090Z
//     },
//     Menu {
//       id: 9,
//       menuName: '子菜单2.3.1',
//       orderNum: 1,
//       parentId: 8,
//       menuType: 'M',
//       icon: 'menu',
//       component: 'aa/dd',
//       path: 'dd',
//       createBy: null,
//       createTime: 2024-04-10T02:07:31.940Z,
//       updateTime: 2024-04-10T02:08:29.621Z
//     },
//     Menu {
//       id: 10,
//       menuName: '子菜单2.2.1',
//       orderNum: 1,
//       parentId: 7,
//       menuType: 'M',
//       icon: 'menu',
//       component: 'aa/dd',
//       path: 'dd',
//       createBy: null,
//       createTime: 2024-04-10T02:07:44.734Z,
//       updateTime: 2024-04-10T02:08:32.745Z
//     },
//     Menu {
//       id: 11,
//       menuName: '子菜单2.2.2',
//       orderNum: 1,
//       parentId: 7,
//       menuType: 'M',
//       icon: 'menu',
//       component: 'aa/dd',
//       path: 'dd',
//       createBy: null,
//       createTime: 2024-04-10T02:07:53.362Z,
//       updateTime: 2024-04-10T02:08:37.841Z
//     }
//   ]