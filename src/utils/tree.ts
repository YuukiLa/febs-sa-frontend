import { Dept } from '@/api/system/dept'
import { Menu } from '@/api/system/menu'

export interface TreeNode {
  key: number | string
  title: string
  children: TreeNode[]
}

export function buildDeptTree(depts: Dept[]) {
  if (!depts) return []
  if (!depts.length) return []
  const handle = (id: number): TreeNode[] => {
    const arr: TreeNode[] = []
    depts.forEach((item) => {
      if (item.parentId === id) {
        const children = handle(item.deptId)
        const curr: TreeNode = {
          key: item.deptId,
          title: item.deptName,
          children,
        }
        // if (curr.children) curr.children = [...curr.children, ...children];
        // else curr.children = children;
        arr.push(curr)
      }
    })
    return arr
  }
  // console.log(listClone[0][idName])
  return handle(0)
}

export function buildMenuTree(menus: Menu[]) {
  if (!menus) return []
  if (!menus.length) return []
  const handle = (id: number): TreeNode[] => {
    const arr: TreeNode[] = []
    menus.forEach((item) => {
      if (item.parentId === id) {
        const children = handle(item.menuId)
        const curr: TreeNode = {
          key: item.menuId,
          title: item.menuName,
          children,
        }
        // if (curr.children) curr.children = [...curr.children, ...children];
        // else curr.children = children;
        arr.push(curr)
      }
    })
    return arr
  }
  // console.log(listClone[0][idName])
  return handle(0)
}
